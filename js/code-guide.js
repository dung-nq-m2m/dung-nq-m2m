/**
 * Hướng dẫn code từng bước (khóa tuần tự + trắc nghiệm xác nhận)
 * Sai trắc nghiệm → chờ 1 phút mới nộp lại (countdown)
 */

const CodeGuide = {
  COOLDOWN_MS: 60 * 1000,

  storageKey(lessonId) {
    return `turtle-code-guide-${lessonId}`;
  },

  loadProgress(lessonId) {
    try {
      const raw = localStorage.getItem(this.storageKey(lessonId));
      const data = raw ? JSON.parse(raw) : {};
      const completed = (Array.isArray(data.completed) ? data.completed : [])
        .map(n => Number(n))
        .filter(n => Number.isInteger(n) && n >= 0);
      let expanded = Number(data.expanded);
      if (!Number.isInteger(expanded) || expanded < 0) {
        expanded = Number(data.current);
      }
      if (!Number.isInteger(expanded) || expanded < 0) expanded = 0;

      const cooldowns = {};
      if (data.cooldowns && typeof data.cooldowns === 'object') {
        Object.keys(data.cooldowns).forEach((k) => {
          const until = Number(data.cooldowns[k]);
          if (Number.isFinite(until) && until > Date.now()) {
            cooldowns[String(k)] = until;
          }
        });
      }
      return { completed, expanded, cooldowns };
    } catch {
      return { completed: [], expanded: 0, cooldowns: {} };
    }
  },

  saveProgress(lessonId, progress) {
    localStorage.setItem(this.storageKey(lessonId), JSON.stringify({
      completed: progress.completed,
      expanded: progress.expanded,
      current: progress.expanded,
      cooldowns: progress.cooldowns || {}
    }));
  },

  cooldownUntil(progress, stepIndex) {
    return Number(progress?.cooldowns?.[String(stepIndex)]) || 0;
  },

  cooldownRemainingMs(progress, stepIndex) {
    return Math.max(0, this.cooldownUntil(progress, stepIndex) - Date.now());
  },

  formatCountdown(ms) {
    const totalSec = Math.ceil(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  },

  startQuizCooldown(lessonId, stepIndex) {
    const progress = this.loadProgress(lessonId);
    if (!progress.cooldowns) progress.cooldowns = {};
    progress.cooldowns[String(stepIndex)] = Date.now() + this.COOLDOWN_MS;
    this.saveProgress(lessonId, progress);
    return progress;
  },

  clearStepCooldown(progress, stepIndex) {
    if (!progress.cooldowns) return progress;
    delete progress.cooldowns[String(stepIndex)];
    return progress;
  },

  nextWorkingIndex(stepsLen, completed) {
    for (let i = 0; i < stepsLen; i++) {
      if (!completed.includes(i)) return i;
    }
    return Math.max(0, stepsLen - 1);
  },

  isUnlocked(index, completed) {
    return index === 0 || completed.includes(index - 1);
  },

  escape(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  },

  gradeQuiz(root, step, stepIndex) {
    const questions = step.quiz || [];
    const quizEl = root.querySelector(`[data-guide-quiz="${stepIndex}"]`);
    const feedback = quizEl?.querySelector('[data-guide-feedback]');
    let wrong = 0;
    let unanswered = 0;

    questions.forEach((q, qi) => {
      const qEl = quizEl?.querySelector(`[data-guide-q="${qi}"]`);
      const selected = qEl?.querySelector(`input[name="guide-q-${stepIndex}-${qi}"]:checked`);
      qEl?.classList.remove('is-correct', 'is-wrong');

      if (!selected) {
        unanswered += 1;
        qEl?.classList.add('is-wrong');
        return;
      }

      if (Number(selected.value) === q.correct) {
        qEl?.classList.add('is-correct');
      } else {
        wrong += 1;
        qEl?.classList.add('is-wrong');
      }
    });

    if (!feedback) return { ok: false, reason: 'missing' };
    feedback.hidden = false;

    if (unanswered > 0) {
      feedback.className = 'code-guide-quiz-feedback is-error';
      feedback.textContent = `Em còn ${unanswered} câu chưa chọn đáp án. Hãy trả lời đủ rồi nộp lại.`;
      return { ok: false, reason: 'unanswered' };
    }
    if (wrong > 0) {
      feedback.className = 'code-guide-quiz-feedback is-error';
      feedback.innerHTML =
        `Chưa đúng ${wrong} câu.`
        + '<br><span class="code-guide-quiz-hint-text">Em đọc lại giải thích / checklist / gợi ý code, rồi thử lại sau 1 phút.</span>';
      return { ok: false, reason: 'wrong', wrong };
    }

    feedback.className = 'code-guide-quiz-feedback is-ok';
    feedback.textContent = 'Chính xác! Em đã nắm bước này — mở khóa bước tiếp theo.';
    return { ok: true };
  },

  setQuizInteractive(quizEl, enabled) {
    if (!quizEl) return;
    quizEl.querySelectorAll('input[type="radio"]').forEach((el) => {
      el.disabled = !enabled;
    });
    const btn = quizEl.querySelector('[data-guide-action="submit-quiz"]');
    if (btn) btn.disabled = !enabled;
  },

  updateCooldownBanner(quizEl, remainingMs) {
    if (!quizEl) return;
    let banner = quizEl.querySelector('[data-guide-cooldown]');
    if (remainingMs <= 0) {
      banner?.remove();
      quizEl.classList.remove('is-cooling');
      this.setQuizInteractive(quizEl, true);
      const feedback = quizEl.querySelector('[data-guide-feedback]');
      if (feedback && feedback.classList.contains('is-error')) {
        feedback.hidden = false;
        feedback.className = 'code-guide-quiz-feedback is-ok';
        feedback.textContent = 'Đã hết thời gian chờ — em có thể nộp bài lại.';
      }
      const waitRef = quizEl.closest('.code-guide-step')
        ?.querySelector('.code-guide-wait-ref');
      waitRef?.remove();
      return;
    }

    quizEl.classList.add('is-cooling');
    if (!banner) {
      banner = document.createElement('div');
      banner.className = 'code-guide-quiz-cooldown';
      banner.setAttribute('data-guide-cooldown', '');
      const actions = quizEl.querySelector('.code-guide-actions');
      if (actions) quizEl.insertBefore(banner, actions);
      else quizEl.appendChild(banner);
    }

    banner.innerHTML = `
      <div class="code-guide-cooldown-title">⏳ Chờ 1 phút rồi thử lại</div>
      <p class="code-guide-cooldown-msg">
        Trắc nghiệm chưa đúng. Em đọc lại giải thích và gợi ý code của bước này,
        đừng đoán bừa nhé!
      </p>
      <div class="code-guide-countdown" aria-live="polite">
        Còn <strong data-guide-countdown-sec>${this.formatCountdown(remainingMs)}</strong> mới nộp được lại
      </div>
    `;
    this.setQuizInteractive(quizEl, false);

    const waitRef = quizEl.closest('.code-guide-step')
      ?.querySelector('.code-guide-wait-ref');
    if (waitRef) {
      waitRef.textContent = `⏳ Chờ ${this.formatCountdown(remainingMs)} để thử lại`;
    }
  },

  stopCooldownTicker() {
    if (this._cooldownTimer) {
      clearInterval(this._cooldownTimer);
      this._cooldownTimer = null;
    }
  },

  startCooldownTicker(container, lessonId, stepIndex) {
    this.stopCooldownTicker();
    const tick = () => {
      const progress = this.loadProgress(lessonId);
      const left = this.cooldownRemainingMs(progress, stepIndex);
      const quizEl = container.querySelector(`[data-guide-quiz="${stepIndex}"]`);
      this.updateCooldownBanner(quizEl, left);
      if (left <= 0) {
        this.stopCooldownTicker();
        if (progress.cooldowns?.[String(stepIndex)]) {
          this.clearStepCooldown(progress, stepIndex);
          this.saveProgress(lessonId, progress);
        }
      }
    };
    tick();
    this._cooldownTimer = setInterval(tick, 250);
  },

  quizHtml(step, stepIndex, reviewMode, cooldownMs = 0) {
    if (reviewMode) {
      return `
        <div class="code-guide-quiz code-guide-quiz-review">
          <div class="code-guide-quiz-title">✅ Em đã vượt qua trắc nghiệm bước này</div>
          <p class="code-guide-quiz-note">Chế độ xem lại — em có thể đọc lại nội dung bên trên.</p>
        </div>`;
    }

    const questions = step.quiz || [];
    if (!questions.length) {
      return `
        <div class="code-guide-actions">
          <button type="button" class="btn btn-primary" data-guide-action="complete" data-step="${stepIndex}">
            ✅ Em đã hoàn thành bước này
          </button>
        </div>`;
    }

    const locked = cooldownMs > 0;
    const cooldownBlock = locked ? `
      <div class="code-guide-quiz-cooldown" data-guide-cooldown>
        <div class="code-guide-cooldown-title">⏳ Chờ 1 phút rồi thử lại</div>
        <p class="code-guide-cooldown-msg">
          Trắc nghiệm chưa đúng. Em đọc lại giải thích và gợi ý code của bước này,
          đừng đoán bừa nhé!
        </p>
        <div class="code-guide-countdown" aria-live="polite">
          Còn <strong data-guide-countdown-sec>${this.formatCountdown(cooldownMs)}</strong> mới nộp được lại
        </div>
      </div>` : '';

    return `
      <div class="code-guide-quiz ${locked ? 'is-cooling' : ''}" data-guide-quiz="${stepIndex}">
        <div class="code-guide-quiz-title">❓ Kiểm tra nhanh — trả lời đúng mới sang bước tiếp</div>
        <p class="code-guide-quiz-note">Em cần nắm chắc nội dung bước này trước khi mở khóa bước sau.</p>
        ${questions.map((q, qi) => `
          <div class="code-guide-q" data-guide-q="${qi}">
            <div class="code-guide-q-text"><strong>Câu ${qi + 1}.</strong> ${q.question}</div>
            <div class="code-guide-q-options">
              ${(q.options || []).map((opt, oi) => `
                <label class="code-guide-q-option">
                  <input type="radio" name="guide-q-${stepIndex}-${qi}" value="${oi}"${locked ? ' disabled' : ''}>
                  <span>${opt}</span>
                </label>
              `).join('')}
            </div>
          </div>
        `).join('')}
        <div class="code-guide-quiz-feedback" data-guide-feedback hidden></div>
        ${cooldownBlock}
        <div class="code-guide-actions">
          <button type="button" class="btn btn-primary" data-guide-action="submit-quiz" data-step="${stepIndex}"${locked ? ' disabled' : ''}>
            ✅ Nộp bài & mở bước tiếp
          </button>
        </div>
      </div>`;
  },

  bodyHtml(step, i, { reviewMode, workingIndex, stepsLen, cooldownMs }) {
    return `
      <div class="code-guide-step-body">
        <div class="code-guide-explain">${step.explain || ''}</div>
        ${step.checklist?.length ? `
          <ul class="code-guide-checklist">
            ${step.checklist.map(item => `<li>${item}</li>`).join('')}
          </ul>
        ` : ''}
        ${step.hintCode ? `
          <details class="code-guide-hint" ${reviewMode || cooldownMs > 0 ? 'open' : ''}>
            <summary>💡 Gợi ý code (xem khi cần)</summary>
            <pre class="code-guide-hint-code">${this.escape(step.hintCode)}</pre>
          </details>
        ` : ''}
        ${step.goal ? `<p class="code-guide-goal"><strong>Kiểm tra thực hành:</strong> ${step.goal}</p>` : ''}
        ${this.quizHtml(step, i, reviewMode, cooldownMs || 0)}
        ${reviewMode ? `
          <div class="code-guide-actions" style="margin-top:0.75rem">
            ${i + 1 < stepsLen ? `
              <button type="button" class="btn btn-outline" data-guide-action="open" data-step="${i + 1}">
                Bước tiếp →
              </button>
            ` : ''}
            ${workingIndex !== i ? `
              <button type="button" class="btn btn-primary" data-guide-action="open" data-step="${workingIndex}">
                ← Quay lại bước đang làm
              </button>
            ` : ''}
          </div>
        ` : ''}
      </div>`;
  },

  render(container, guide, lessonId) {
    if (!container || !guide?.steps?.length) return;

    const steps = guide.steps;
    const self = this;

    // Gắn listener 1 lần (delegation) — tránh mất sự kiện sau mỗi lần render
    if (container.dataset.guideBound !== '1') {
      container.dataset.guideBound = '1';
      container.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-guide-action]');
        if (!btn || !container.contains(btn)) return;

        const action = btn.getAttribute('data-guide-action');
        const stepIndex = Number(btn.getAttribute('data-step'));
        const progress = self.loadProgress(lessonId);

        if (action === 'open') {
          if (!Number.isInteger(stepIndex)) return;
          if (!self.isUnlocked(stepIndex, progress.completed)
              && !progress.completed.includes(stepIndex)) {
            return;
          }
          progress.expanded = stepIndex;
          self.saveProgress(lessonId, progress);
          paint();
          container.querySelector(`[data-guide-step="${stepIndex}"]`)
            ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          return;
        }

        if (action === 'complete') {
          if (!progress.completed.includes(stepIndex)) {
            progress.completed.push(stepIndex);
          }
          progress.expanded = self.nextWorkingIndex(steps.length, progress.completed);
          self.saveProgress(lessonId, progress);
          paint();
          return;
        }

        if (action === 'submit-quiz') {
          if (self.cooldownRemainingMs(progress, stepIndex) > 0) {
            const quizEl = container.querySelector(`[data-guide-quiz="${stepIndex}"]`);
            self.updateCooldownBanner(quizEl, self.cooldownRemainingMs(progress, stepIndex));
            return;
          }

          const step = steps[stepIndex];
          const result = self.gradeQuiz(container, step, stepIndex);
          if (!result.ok) {
            if (result.reason === 'wrong') {
              self.startQuizCooldown(lessonId, stepIndex);
              const hint = container.querySelector(`[data-guide-step="${stepIndex}"] .code-guide-hint`);
              if (hint && !hint.open) hint.open = true;
              self.startCooldownTicker(container, lessonId, stepIndex);
            }
            return;
          }

          btn.disabled = true;
          setTimeout(() => {
            const p = self.loadProgress(lessonId);
            if (!p.completed.includes(stepIndex)) p.completed.push(stepIndex);
            self.clearStepCooldown(p, stepIndex);
            p.expanded = self.nextWorkingIndex(steps.length, p.completed);
            self.saveProgress(lessonId, p);
            self.stopCooldownTicker();
            paint();
            container.querySelector(`[data-guide-step="${p.expanded}"]`)
              ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 600);
          return;
        }

        if (action === 'reset') {
          if (!confirm('Xóa tiến độ hướng dẫn và làm lại từ bước 1?')) return;
          self.stopCooldownTicker();
          self.saveProgress(lessonId, { completed: [], expanded: 0, cooldowns: {} });
          paint();
        }
      });
    }

    const paint = () => {
      self.stopCooldownTicker();
      const progress = self.loadProgress(lessonId);
      const doneCount = progress.completed.length;
      const allDone = doneCount >= steps.length;
      const workingIndex = self.nextWorkingIndex(steps.length, progress.completed);

      let expanded = progress.expanded;
      if (!self.isUnlocked(expanded, progress.completed)
          && !progress.completed.includes(expanded)) {
        expanded = workingIndex;
      }

      container.innerHTML = `
        <p class="code-guide-intro">${guide.intro || 'Làm theo từng bước — trả lời đúng trắc nghiệm mới mở bước sau.'}</p>
        <div class="code-guide-progress">
          <div class="code-guide-progress-bar">
            <div class="code-guide-progress-fill" style="width:${(doneCount / steps.length) * 100}%"></div>
          </div>
          <span class="code-guide-progress-text">${doneCount}/${steps.length} bước</span>
        </div>
        <div class="code-guide-list">
          ${steps.map((step, i) => {
            const isDone = progress.completed.includes(i);
            const unlocked = self.isUnlocked(i, progress.completed);
            const isExpanded = unlocked && i === expanded;
            const reviewMode = isExpanded && isDone;
            const working = isExpanded && !isDone;
            const cooldownMs = working ? self.cooldownRemainingMs(progress, i) : 0;

            let stateClass = 'locked';
            if (working) stateClass = cooldownMs > 0 ? 'current cooling' : 'current';
            else if (reviewMode) stateClass = 'review';
            else if (isDone) stateClass = 'done';
            else if (unlocked) stateClass = 'unlocked';

            let actions = '';
            if (!unlocked) {
              actions = `<p class="code-guide-locked-msg">Hoàn thành và trả lời đúng trắc nghiệm bước ${i} trước để mở khóa.</p>`;
            } else if (isExpanded) {
              actions = self.bodyHtml(step, i, {
                reviewMode,
                workingIndex,
                stepsLen: steps.length,
                cooldownMs
              });
              if (reviewMode && i + 1 < steps.length && !self.isUnlocked(i + 1, progress.completed)) {
                actions = actions.replace(
                  /<button type="button" class="btn btn-outline" data-guide-action="open" data-step="\d+">\s*Bước tiếp →\s*<\/button>/,
                  ''
                );
              }
            } else {
              actions = `
                <button type="button" class="btn btn-outline code-guide-reopen"
                        data-guide-action="open" data-step="${i}">
                  ${isDone ? '👁️ Xem lại' : '📂 Mở'} bước ${i + 1}
                </button>`;
            }

            return `
              <div class="code-guide-step ${stateClass}" data-guide-step="${i}">
                <div class="code-guide-step-header"
                     ${unlocked && !isExpanded ? `role="button" tabindex="0" data-guide-action="open" data-step="${i}" style="cursor:pointer"` : ''}>
                  <span class="code-guide-badge">${isDone ? '✓' : unlocked ? i + 1 : '🔒'}</span>
                  <div class="code-guide-step-meta">
                    <div class="code-guide-step-title">${step.title}</div>
                    ${step.flowLabel ? `<div class="code-guide-flow-ref">📍 Biểu đồ: ${step.flowLabel}</div>` : ''}
                    ${reviewMode ? '<div class="code-guide-flow-ref">👁️ Đang xem lại</div>' : ''}
                    ${cooldownMs > 0 ? `<div class="code-guide-flow-ref code-guide-wait-ref">⏳ Chờ ${self.formatCountdown(cooldownMs)} để thử lại</div>` : ''}
                    ${unlocked && !isExpanded ? '<div class="code-guide-flow-ref">Nhấn để mở</div>' : ''}
                  </div>
                </div>
                ${actions}
              </div>`;
          }).join('')}
        </div>
        ${allDone ? `
          <div class="code-guide-finish">
            🏆 Em đã hoàn thành toàn bộ các bước và vượt qua trắc nghiệm! Ghép code lại và chạy file game.
            <div style="margin-top:0.75rem">
              <button type="button" class="btn btn-outline" data-guide-action="reset">🔄 Làm lại từ đầu</button>
            </div>
          </div>
        ` : ''}`;

      const coolLeft = self.cooldownRemainingMs(progress, expanded);
      if (coolLeft > 0 && !progress.completed.includes(expanded)) {
        self.startCooldownTicker(container, lessonId, expanded);
      }
    };

    paint();
  }
};
