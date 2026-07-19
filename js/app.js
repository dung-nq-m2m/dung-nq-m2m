/**
 * Shared utilities for Học viện Turtle Python
 */

const TurtleAcademy = {
  basePath: '',
  CODE_UNLOCK_KEY: 'turtle_gv_unlocked_lessons',
  teacherPin: 'dungnq',
  teacherDisplay: 'Ths. Nguyễn Quốc Dũng',
  codeLockMessage: 'Code chỉ hiển thị khi giáo viên mở khóa bài này.',

  async initConfig() {
    try {
      const cfg = await this.loadJSON('data/config.json');
      this.teacherPin = cfg.teacherPin || this.teacherPin;
      this.codeLockMessage = cfg.codeLockMessage || this.codeLockMessage;
      if (cfg.teacher?.display) this.teacherDisplay = cfg.teacher.display;
    } catch (_) { /* dùng mặc định */ }
    this._migrateGlobalUnlock();
  },

  _migrateGlobalUnlock() {
    const legacy = sessionStorage.getItem('turtle_gv_code_unlocked');
    if (legacy !== '1') return;
    sessionStorage.removeItem('turtle_gv_code_unlocked');
    ['game-hung-tao', 'game-ne-bom', 'game-me-cung', 'game-dua-xe', 'game-ban-bong'].forEach(id => this._addUnlockedLesson(id));
  },

  _readUnlockedLessons() {
    try {
      const raw = sessionStorage.getItem(this.CODE_UNLOCK_KEY);
      const list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (_) {
      return [];
    }
  },

  _writeUnlockedLessons(list) {
    sessionStorage.setItem(this.CODE_UNLOCK_KEY, JSON.stringify([...new Set(list)]));
  },

  _addUnlockedLesson(lessonId) {
    const list = this._readUnlockedLessons();
    if (!list.includes(lessonId)) {
      list.push(lessonId);
      this._writeUnlockedLessons(list);
    }
  },

  getUnlockedLessons() {
    return this._readUnlockedLessons();
  },

  isCodeUnlocked(lessonId) {
    if (!lessonId) return false;
    return this._readUnlockedLessons().includes(lessonId);
  },

  unlockCode(pin, lessonId) {
    if (!lessonId) return false;
    if (String(pin).trim() === this.teacherPin) {
      this._addUnlockedLesson(lessonId);
      window.dispatchEvent(new CustomEvent('code-unlocked', { detail: { lessonId } }));
      return true;
    }
    return false;
  },

  lockCode(lessonId) {
    if (!lessonId) return;
    const list = this._readUnlockedLessons().filter(id => id !== lessonId);
    this._writeUnlockedLessons(list);
    window.dispatchEvent(new CustomEvent('code-locked', { detail: { lessonId } }));
  },

  lockAllCode() {
    this._writeUnlockedLessons([]);
    window.dispatchEvent(new Event('code-lock-all'));
  },

  initSiteBranding() {
    document.querySelectorAll('#site-teacher').forEach(el => {
      el.textContent = this.teacherDisplay;
    });
    document.querySelectorAll('#site-footer-teacher').forEach(el => {
      el.textContent = this.teacherDisplay;
    });
  },

  async loadJSON(path) {
    const res = await fetch(`${this.basePath}${path}`);
    if (!res.ok) throw new Error(`Không tải được: ${path}`);
    return res.json();
  },

  getLessonIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('lesson') || params.get('id');
  },

  showToast(message, duration = 2500) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
  },

  markLessonComplete(lessonId) {
    const completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    if (!completed.includes(lessonId)) {
      completed.push(lessonId);
      localStorage.setItem('completedLessons', JSON.stringify(completed));
    }
  },

  isLessonComplete(lessonId) {
    const completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    return completed.includes(lessonId);
  },

  getCompletedCount() {
    return JSON.parse(localStorage.getItem('completedLessons') || '[]').length;
  },

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};

/**
 * Render sidebar navigation from chapters.json
 */
async function renderSidebar(activePage = '', activeLesson = '') {
  const sidebar = document.getElementById('sidebar-chapters');
  if (!sidebar) return;

  try {
    const data = await TurtleAcademy.loadJSON('data/chapters.json');
    sidebar.innerHTML = data.chapters.map(ch => `
      <li class="chapter-item ${activeLesson && ch.lessons.some(l => l.id === activeLesson) ? 'open' : ''}">
        <button class="chapter-toggle" aria-expanded="false">
          <span>${ch.icon}</span>
          <span>Chương ${ch.number}. ${ch.title}</span>
        </button>
        <ul class="lesson-list">
          ${ch.lessons.map(l => `
            <li>
              <a href="lesson.html?lesson=${l.id}" 
                 class="${l.id === activeLesson ? 'active' : ''}"
                 ${TurtleAcademy.isLessonComplete(l.id) ? 'title="Đã hoàn thành ✓"' : ''}>
                ${TurtleAcademy.isLessonComplete(l.id) ? '✓ ' : ''}${l.title}
              </a>
            </li>
          `).join('')}
        </ul>
      </li>
    `).join('');

    sidebar.querySelectorAll('.chapter-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.chapter-item').classList.toggle('open');
      });
    });
  } catch (e) {
    sidebar.innerHTML = '<li>Không tải được danh sách bài học</li>';
  }
}

function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  if (!toggle || !sidebar) return;

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay?.classList.toggle('show');
  });

  overlay?.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  });
}

function initContentProtection() {
  const block = (e) => e.preventDefault();

  document.addEventListener('contextmenu', block);
  document.addEventListener('copy', block);
  document.addEventListener('cut', block);
  document.addEventListener('selectstart', block);
  document.addEventListener('dragstart', block);

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      const key = e.key.toLowerCase();
      if (['c', 'u', 's', 'a', 'p', 'x'].includes(key)) {
        e.preventDefault();
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await TurtleAcademy.initConfig();
  TurtleAcademy.initSiteBranding();
  initMobileMenu();
  initContentProtection();
});
