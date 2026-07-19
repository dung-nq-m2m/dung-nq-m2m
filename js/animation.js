/**
 * Turtle animation demos for lessons
 */

const TurtleAnimation = {
  render(container, config) {
    if (!container || !config) return;

    const type = config.type || 'forward';

    switch (type) {
      case 'forward':
        this.renderForward(container, config);
        break;
      case 'backward':
        this.renderBackward(container, config);
        break;
      case 'left':
        this.renderRotate(container, config, 'left');
        break;
      case 'right':
        this.renderRotate(container, config, 'right');
        break;
      case 'intro':
        this.renderIntro(container);
        break;
      case 'install':
        this.renderInstall(container);
        break;
      case 'penup':
        this.renderPenup(container);
        break;
      case 'pencolor':
        this.renderPencolor(container, config);
        break;
      case 'fillcolor':
        this.renderFillcolor(container, config);
        break;
      case 'begin-fill':
        this.renderBeginFill(container, config);
        break;
      case 'end-fill':
        this.renderEndFill(container, config);
        break;
      case 'square':
        this.renderSquare(container, config);
        break;
      case 'triangle':
        this.renderTriangle(container, config);
        break;
      case 'star':
        this.renderStar(container, config);
        break;
      case 'polygon':
        this.renderPolygon(container, config);
        break;
      case 'onclick':
        this.renderOnclick(container, config);
        break;
      case 'onscreenclick':
        this.renderOnscreenclick(container, config);
        break;
      case 'onkeypress':
        this.renderOnkeypress(container, config);
        break;
      case 'listen':
        this.renderListen(container, config);
        break;
      case 'game-apple':
        this.renderGameApple(container, config);
        break;
      case 'game-bomb':
        this.renderGameBomb(container, config);
        break;
      case 'game-shoot':
        this.renderGameShoot(container, config);
        break;
      case 'game-maze':
        this.renderGameMaze(container, config);
        break;
      case 'game-race':
        this.renderGameRace(container, config);
        break;
      default:
        this.renderForward(container, config);
    }
  },

  renderForward(container, config) {
    const distance = Math.min(config.distance || 100, 200);
    container.innerHTML = `
      <p><strong>${config.label || 'forward()'}</strong></p>
      <div class="turtle-demo-canvas" style="--distance: ${distance}px">
        <div class="demo-trail" id="demo-trail"></div>
        <div class="demo-turtle" id="demo-turtle">🐢</div>
      </div>
      <button class="btn btn-orange btn-sm" id="play-animation">▶ Xem animation</button>
    `;

    document.getElementById('play-animation')?.addEventListener('click', () => {
      const turtle = document.getElementById('demo-turtle');
      const trail = document.getElementById('demo-trail');
      turtle?.classList.remove('animate-forward');
      trail?.classList.remove('animate-forward');
      void turtle?.offsetWidth;
      turtle?.classList.add('animate-forward');
      trail?.classList.add('animate-forward');
    });

    setTimeout(() => document.getElementById('play-animation')?.click(), 500);
  },

  renderBackward(container, config) {
    const distance = Math.min(config.distance || 100, 150);
    container.innerHTML = `
      <p><strong>${config.label || 'backward()'}</strong></p>
      <div class="turtle-demo-canvas" style="--distance: ${distance}px">
        <div class="demo-trail animate-forward" style="width: ${distance}px; left: 50px;"></div>
        <div class="demo-turtle" id="demo-turtle" style="left: calc(20px + ${distance}px)">🐢</div>
      </div>
      <p style="margin-top:0.5rem;color:#666">🐢 ←──────── lùi lại</p>
      <button class="btn btn-orange" id="play-animation">▶ Xem animation</button>
    `;

    document.getElementById('play-animation')?.addEventListener('click', () => {
      const turtle = document.getElementById('demo-turtle');
      if (turtle) {
        turtle.style.left = '20px';
        turtle.style.transition = 'left 1s ease-in-out';
      }
    });
  },

  renderRotate(container, config, direction) {
    const arrow = direction === 'left' ? '→' : '→';
    const label = config.label || `${direction}(90)`;
    container.innerHTML = `
      <p><strong>${label}</strong></p>
      <div class="rotate-demo">
        <span class="rotate-arrow" id="rotate-arrow">${arrow}</span>
        <span style="font-size:3rem">🐢</span>
      </div>
      <p style="margin-top:1rem;color:#666">
        ${direction === 'left' ? '↑ quay trái 90°' : '↓ quay phải 90°'}
      </p>
      <button class="btn btn-orange" id="play-animation">▶ Xem animation</button>
    `;

    document.getElementById('play-animation')?.addEventListener('click', () => {
      const arrow = document.getElementById('rotate-arrow');
      arrow?.classList.toggle(direction === 'left' ? 'animate-left' : 'animate-right');
    });

    setTimeout(() => document.getElementById('play-animation')?.click(), 500);
  },

  renderIntro(container) {
    container.innerHTML = `
      <div style="font-size:4rem;animation: bounce 1s infinite alternate">🐢</div>
      <p><strong>Chào em! Mình là Rùa Turtle!</strong></p>
      <p style="color:#666">Em sẽ ra lệnh, mình sẽ vẽ cho em xem 🎨</p>
      <style>
        @keyframes bounce {
          from { transform: translateY(0); }
          to { transform: translateY(-10px); }
        }
      </style>
    `;
  },

  renderInstall(container) {
    container.innerHTML = `
      <div style="text-align:left;max-width:300px;margin:0 auto">
        <p>1️⃣ python.org → Download</p>
        <p>2️⃣ ☑ Add Python to PATH</p>
        <p>3️⃣ Install → Mở IDLE</p>
        <p>4️⃣ Chạy <code>print("Hello!")</code></p>
      </div>
    `;
  },

  renderPenup(container) {
    container.innerHTML = `
      <p><strong>penup() → di chuyển → pendown()</strong></p>
      <svg viewBox="0 0 300 60" width="100%" style="max-width:350px">
        <line x1="20" y1="30" x2="100" y2="30" stroke="#4c97ff" stroke-width="3"/>
        <line x1="100" y1="30" x2="160" y2="30" stroke="#ccc" stroke-width="2" stroke-dasharray="5,5"/>
        <line x1="160" y1="30" x2="240" y2="30" stroke="#4c97ff" stroke-width="3"/>
        <text x="105" y="20" font-size="10" fill="#999">penup()</text>
        <text x="20" y="50" font-size="20">🐢</text>
      </svg>
      <p style="color:#666;font-size:0.85rem">Đường nét đứt = rùa đi không vẽ</p>
    `;
  },

  renderPencolor(container, config) {
    const colors = config.colors || ['#ff6680', '#4c97ff', '#59c059', '#ffab19'];
    container.innerHTML = `
      <p><strong>${config.label || 'pencolor()'}</strong></p>
      <svg viewBox="0 0 320 60" width="100%" style="max-width:360px" id="color-demo">
        ${colors.map((c, i) => `
          <line x1="${20 + i * 70}" y1="30" x2="${80 + i * 70}" y2="30"
                stroke="${c}" stroke-width="5" class="color-line" style="opacity:0"/>
        `).join('')}
        <text x="15" y="52" font-size="18">🐢</text>
      </svg>
      <p style="color:#666;margin-top:0.5rem">Mỗi đoạn một màu pencolor khác nhau</p>
      <button class="btn btn-orange" id="play-animation">▶ Xem animation</button>
    `;
    document.getElementById('play-animation')?.addEventListener('click', () => {
      document.querySelectorAll('.color-line').forEach((line, i) => {
        setTimeout(() => { line.style.opacity = '1'; line.style.transition = 'opacity 0.4s'; }, i * 400);
      });
    });
    setTimeout(() => document.getElementById('play-animation')?.click(), 500);
  },

  renderFillcolor(container, config) {
    const fill = config.fillColor || '#ffab19';
    const stroke = config.strokeColor || '#4c97ff';
    container.innerHTML = `
      <p><strong>${config.label || 'fillcolor()'}</strong></p>
      <svg viewBox="0 0 120 120" width="140" id="fill-demo">
        <rect x="20" y="20" width="80" height="80" fill="none" stroke="${stroke}" stroke-width="3" id="fill-rect"/>
      </svg>
      <p style="color:#666">Viền = pencolor · Ruột = fillcolor</p>
      <button class="btn btn-orange" id="play-animation">▶ Tô màu!</button>
    `;
    document.getElementById('play-animation')?.addEventListener('click', () => {
      const rect = document.getElementById('fill-rect');
      if (rect) {
        rect.style.transition = 'fill 0.8s';
        rect.setAttribute('fill', fill);
      }
    });
    setTimeout(() => document.getElementById('play-animation')?.click(), 500);
  },

  renderBeginFill(container, config) {
    container.innerHTML = `
      <p><strong>${config.label || 'begin_fill()'}</strong></p>
      <div style="display:flex;align-items:center;justify-content:center;gap:1rem;flex-wrap:wrap">
        <div style="padding:0.5rem 1rem;background:#eef6ff;border-radius:8px;border:2px dashed #4c97ff">1. fillcolor()</div>
        <span>→</span>
        <div style="padding:0.5rem 1rem;background:#fff8e6;border-radius:8px;border:2px solid #ffab19;font-weight:bold">2. begin_fill()</div>
        <span>→</span>
        <div style="padding:0.5rem 1rem;background:#eef6ff;border-radius:8px;border:2px dashed #4c97ff">3. Vẽ hình</div>
        <span>→</span>
        <div style="padding:0.5rem 1rem;background:#e8f8e8;border-radius:8px;border:2px solid #59c059">4. end_fill()</div>
      </div>
    `;
  },

  renderEndFill(container, config) {
    const fill = config.fillColor || '#59c059';
    container.innerHTML = `
      <p><strong>${config.label || 'end_fill()'}</strong></p>
      <svg viewBox="0 0 140 140" width="160" id="star-demo">
        <polygon points="70,15 85,55 130,55 95,80 108,125 70,100 32,125 45,80 10,55 55,55"
                 fill="none" stroke="gold" stroke-width="2" id="star-shape"/>
      </svg>
      <button class="btn btn-orange" id="play-animation">▶ end_fill() — tô màu!</button>
    `;
    document.getElementById('play-animation')?.addEventListener('click', () => {
      const star = document.getElementById('star-shape');
      if (star) {
        star.style.transition = 'fill 0.8s';
        star.setAttribute('fill', fill);
      }
    });
    setTimeout(() => document.getElementById('play-animation')?.click(), 500);
  },

  renderSquare(container, config) {
    container.innerHTML = `
      <p><strong>${config.label || 'Hình vuông'}</strong></p>
      <svg viewBox="0 0 120 120" width="140" id="sq-demo">
        <rect x="20" y="20" width="0" height="0" fill="none" stroke="#4c97ff" stroke-width="3" id="sq-path"/>
      </svg>
      <button class="btn btn-orange" id="play-animation">▶ Vẽ hình vuông</button>
    `;
    document.getElementById('play-animation')?.addEventListener('click', () => {
      const r = document.getElementById('sq-path');
      if (r) {
        r.setAttribute('x', '20'); r.setAttribute('y', '20');
        r.setAttribute('width', '80'); r.setAttribute('height', '80');
        r.style.transition = 'all 1s';
        r.setAttribute('fill', 'lightblue');
      }
    });
    setTimeout(() => document.getElementById('play-animation')?.click(), 500);
  },

  renderTriangle(container, config) {
    container.innerHTML = `
      <p><strong>${config.label || 'Tam giác đều'}</strong></p>
      <svg viewBox="0 0 130 120" width="140">
        <polygon points="65,15 120,105 10,105" fill="lightgreen" stroke="green" stroke-width="2" id="tri-shape" style="opacity:0"/>
      </svg>
      <p style="color:#666;font-size:0.85rem">left(120) × 3 lần</p>
      <button class="btn btn-orange" id="play-animation">▶ Vẽ tam giác</button>
    `;
    document.getElementById('play-animation')?.addEventListener('click', () => {
      const t = document.getElementById('tri-shape');
      if (t) { t.style.transition = 'opacity 0.8s'; t.style.opacity = '1'; }
    });
    setTimeout(() => document.getElementById('play-animation')?.click(), 500);
  },

  renderStar(container, config) {
    container.innerHTML = `
      <p><strong>${config.label || 'Ngôi sao 5 cánh'}</strong></p>
      <svg viewBox="0 0 120 120" width="140">
        <polygon points="60,8 72,42 108,42 80,64 92,98 60,78 28,98 40,64 12,42 48,42"
                 fill="yellow" stroke="gold" stroke-width="2" id="star-shape" style="opacity:0;transform-origin:center"/>
      </svg>
      <p style="color:#666;font-size:0.85rem">right(144) × 5 lần</p>
      <button class="btn btn-orange" id="play-animation">▶ Vẽ ngôi sao</button>
    `;
    document.getElementById('play-animation')?.addEventListener('click', () => {
      const s = document.getElementById('star-shape');
      if (s) { s.style.transition = 'opacity 0.8s'; s.style.opacity = '1'; }
    });
    setTimeout(() => document.getElementById('play-animation')?.click(), 500);
  },

  renderPolygon(container, config) {
    const sides = config.sides || 6;
    container.innerHTML = `
      <p><strong>${config.label || `Đa giác ${sides} cạnh`}</strong></p>
      <svg viewBox="0 0 120 120" width="140">
        <polygon points="60,10 110,35 110,85 60,110 10,85 10,35"
                 fill="lavender" stroke="purple" stroke-width="2" id="poly-shape" style="opacity:0"/>
      </svg>
      <p style="color:#666;font-size:0.85rem">Góc = 360 ÷ ${sides} = ${360 / sides}°</p>
      <button class="btn btn-orange" id="play-animation">▶ Vẽ đa giác</button>
    `;
    document.getElementById('play-animation')?.addEventListener('click', () => {
      const p = document.getElementById('poly-shape');
      if (p) { p.style.transition = 'opacity 0.8s'; p.style.opacity = '1'; }
    });
    setTimeout(() => document.getElementById('play-animation')?.click(), 500);
  },

  renderOnclick(container, config) {
    container.innerHTML = `
      <p><strong>${config.label || 'onclick()'}</strong></p>
      <div style="font-size:3rem;cursor:pointer" id="click-turtle">🐢</div>
      <p id="click-msg" style="color:#666">👆 Bấm vào rùa!</p>
    `;
    document.getElementById('click-turtle')?.addEventListener('click', () => {
      const msg = document.getElementById('click-msg');
      const t = document.getElementById('click-turtle');
      if (msg) msg.textContent = '🎉 onclick() — hàm đã chạy!';
      if (t) t.style.color = t.style.color === 'red' ? 'green' : 'red';
    });
  },

  renderOnscreenclick(container, config) {
    container.innerHTML = `
      <p><strong>${config.label || 'onscreenclick(x, y)'}</strong></p>
      <div id="click-area" style="background:#eef6ff;border:2px dashed #4c97ff;border-radius:12px;height:100px;position:relative;cursor:crosshair">
        <span style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#999;font-size:0.85rem">Bấm bất kỳ đây</span>
      </div>
    `;
    document.getElementById('click-area')?.addEventListener('click', (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dot = document.createElement('div');
      dot.style.cssText = `position:absolute;left:${x - 6}px;top:${y - 6}px;width:12px;height:12px;background:red;border-radius:50%`;
      e.currentTarget.appendChild(dot);
    });
  },

  renderOnkeypress(container, config) {
    container.innerHTML = `
      <p><strong>${config.label || 'onkey()'}</strong></p>
      <div style="font-size:2.5rem" id="key-turtle">🐢</div>
      <div style="display:flex;gap:0.5rem;justify-content:center;margin:0.5rem 0;font-size:1.5rem">
        <span>↑</span><span>↓</span><span>←</span><span>→</span>
      </div>
      <p id="key-msg" style="color:#666;font-size:0.85rem">Nhấn phím mũi tên trên bàn phím</p>
    `;
    const turtle = document.getElementById('key-turtle');
    const msg = document.getElementById('key-msg');
    const labels = { ArrowUp: '↑ lên', ArrowDown: '↓ xuống', ArrowLeft: '← trái', ArrowRight: '→ phải' };
    document.addEventListener('keydown', function handler(e) {
      if (!labels[e.key] || !container.isConnected) return;
      if (msg) msg.textContent = `Phím ${labels[e.key]} — onkey() hoạt động!`;
      if (turtle) {
        const moves = { ArrowUp: [0,-15], ArrowDown: [0,15], ArrowLeft: [-15,0], ArrowRight: [15,0] };
        const m = moves[e.key];
        turtle.style.display = 'inline-block';
        turtle.style.transform = `translate(${m[0]}px, ${m[1]}px)`;
        turtle.style.transition = 'transform 0.2s';
      }
    });
  },

  renderListen(container, config) {
    container.innerHTML = `
      <p><strong>${config.label || 'listen()'}</strong></p>
      <div style="font-size:2rem;margin:0.5rem 0">👂 → ⌨️ → 🐢</div>
      <p style="color:#666">listen() = bật tai nghe phím</p>
      <div style="margin-top:0.75rem;padding:0.75rem;background:#e8f8e8;border-radius:8px;font-size:0.9rem">
        onkey() → <strong>listen()</strong> → phím hoạt động ✅
      </div>
    `;
  },

  renderGameApple(container, config) {
    container.innerHTML = `
      <p><strong>${config.label || 'Hứng táo'}</strong></p>
      <div style="position:relative;height:100px;background:lightblue;border-radius:12px;overflow:hidden;max-width:280px;margin:0 auto">
        <div id="fall-apple" style="position:absolute;top:10px;left:50%;font-size:1.5rem;transition:top 2s linear">🍎</div>
        <div style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);font-size:2rem">🐢</div>
      </div>
      <p style="color:#666;font-size:0.85rem;margin-top:0.5rem">← → di chuyển · Space hứng</p>
      <button class="btn btn-orange" id="play-animation">▶ Xem táo rơi</button>
    `;
    document.getElementById('play-animation')?.addEventListener('click', () => {
      const a = document.getElementById('fall-apple');
      if (a) { a.style.top = '10px'; void a.offsetWidth; a.style.top = '70px'; }
    });
    setTimeout(() => document.getElementById('play-animation')?.click(), 500);
  },

  renderGameBomb(container, config) {
    container.innerHTML = `
      <p><strong>${config.label || 'Né bom'}</strong></p>
      <div style="position:relative;height:100px;background:#222;border-radius:12px;overflow:hidden;max-width:280px;margin:0 auto">
        <div id="fall-bomb" style="position:absolute;top:5px;left:40%;font-size:1.5rem;transition:top 1.5s linear">💣</div>
        <div id="dodge-turtle" style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);font-size:2rem;transition:left 0.3s">🐢</div>
      </div>
      <p style="color:#666;font-size:0.85rem;margin-top:0.5rem">← → né bom!</p>
      <button class="btn btn-orange" id="play-animation">▶ Xem demo</button>
    `;
    document.getElementById('play-animation')?.addEventListener('click', () => {
      const b = document.getElementById('fall-bomb');
      const t = document.getElementById('dodge-turtle');
      if (b) { b.style.top = '5px'; void b.offsetWidth; b.style.top = '65px'; }
      if (t) t.style.left = '70%';
    });
    setTimeout(() => document.getElementById('play-animation')?.click(), 500);
  },

  renderGameShoot(container, config) {
    container.innerHTML = `
      <p><strong>${config.label || 'Bắn bóng'}</strong></p>
      <div style="position:relative;height:110px;background:navy;border-radius:12px;overflow:hidden;max-width:280px;margin:0 auto">
        <div style="position:absolute;top:15px;left:30%;font-size:1.2rem">🟠</div>
        <div style="position:absolute;top:15px;left:50%;font-size:1.2rem">🟠</div>
        <div style="position:absolute;top:15px;left:70%;font-size:1.2rem">🟠</div>
        <div id="bullet" style="position:absolute;bottom:35px;left:50%;font-size:0.8rem;opacity:0">⚪</div>
        <div style="position:absolute;bottom:5px;left:50%;transform:translateX(-50%);font-size:1.5rem">🔺</div>
      </div>
      <p style="color:#666;font-size:0.85rem;margin-top:0.5rem">Space bắn · ← → di chuyển</p>
      <button class="btn btn-orange" id="play-animation">▶ Bắn!</button>
    `;
    document.getElementById('play-animation')?.addEventListener('click', () => {
      const bullet = document.getElementById('bullet');
      if (bullet) {
        bullet.style.opacity = '1';
        bullet.style.transition = 'bottom 1s linear, opacity 0.3s';
        bullet.style.bottom = '35px';
        void bullet.offsetWidth;
        bullet.style.bottom = '80px';
      }
    });
    setTimeout(() => document.getElementById('play-animation')?.click(), 500);
  },

  renderGameMaze(container, config) {
    container.innerHTML = `
      <p><strong>${config.label || 'Mê cung'}</strong></p>
      <div style="position:relative;height:110px;background:#fafafa;border:2px solid #1a3a6b;border-radius:12px;overflow:hidden;max-width:280px;margin:0 auto">
        <div style="position:absolute;top:12px;left:18px;width:70%;height:8px;background:#1a3a6b"></div>
        <div style="position:absolute;top:12px;right:18px;width:8px;height:55%;background:#1a3a6b"></div>
        <div style="position:absolute;bottom:20px;left:30%;width:50%;height:8px;background:#1a3a6b"></div>
        <div id="maze-turtle" style="position:absolute;top:28px;left:22px;font-size:1.4rem;transition:top 0.8s,left 0.8s">🐢</div>
        <div style="position:absolute;bottom:12px;right:24px;font-size:1.2rem">⭐</div>
      </div>
      <p style="color:#666;font-size:0.85rem;margin-top:0.5rem">↑↓←→ tìm đích vàng</p>
      <button class="btn btn-orange" id="play-animation">▶ Xem đường đi</button>
    `;
    document.getElementById('play-animation')?.addEventListener('click', () => {
      const t = document.getElementById('maze-turtle');
      if (t) {
        t.style.top = '28px';
        t.style.left = '22px';
        void t.offsetWidth;
        t.style.top = '68px';
        t.style.left = '200px';
      }
    });
    setTimeout(() => document.getElementById('play-animation')?.click(), 500);
  },

  renderGameRace(container, config) {
    container.innerHTML = `
      <p><strong>${config.label || 'Đua xe'}</strong></p>
      <div style="position:relative;height:120px;background:#6b6b6b;border-radius:12px;overflow:hidden;max-width:220px;margin:0 auto">
        <div style="position:absolute;left:33%;top:0;bottom:0;width:2px;background:#ccc;opacity:0.5"></div>
        <div style="position:absolute;left:66%;top:0;bottom:0;width:2px;background:#ccc;opacity:0.5"></div>
        <div id="race-enemy" style="position:absolute;top:8px;left:50%;transform:translateX(-50%);font-size:1.2rem;transition:top 1.2s linear">🚗</div>
        <div id="race-car" style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);font-size:1.4rem;transition:left 0.3s">🚙</div>
      </div>
      <p style="color:#666;font-size:0.85rem;margin-top:0.5rem">← → đổi làn · né xe!</p>
      <button class="btn btn-orange" id="play-animation">▶ Xem demo</button>
    `;
    document.getElementById('play-animation')?.addEventListener('click', () => {
      const e = document.getElementById('race-enemy');
      const c = document.getElementById('race-car');
      if (e) { e.style.top = '8px'; void e.offsetWidth; e.style.top = '90px'; }
      if (c) c.style.left = '22%';
    });
    setTimeout(() => document.getElementById('play-animation')?.click(), 500);
  },

  renderResultSVG(lessonId) {
    const previews = {
      forward: `<svg viewBox="0 0 200 80" width="200"><line x1="20" y1="40" x2="170" y2="40" stroke="#4c97ff" stroke-width="3"/><text x="15" y="35" font-size="18">🐢</text></svg>`,
      backward: `<svg viewBox="0 0 200 80" width="200"><line x1="20" y1="40" x2="120" y2="40" stroke="#4c97ff" stroke-width="3"/><line x1="120" y1="40" x2="70" y2="40" stroke="#59c059" stroke-width="3"/><text x="65" y="35" font-size="18">🐢</text></svg>`,
      left: `<svg viewBox="0 0 120 120" width="120"><line x1="60" y1="60" x2="60" y2="20" stroke="#4c97ff" stroke-width="3"/><text x="55" y="75" font-size="18">🐢</text></svg>`,
      right: `<svg viewBox="0 0 120 120" width="120"><line x1="20" y1="60" x2="80" y2="60" stroke="#4c97ff" stroke-width="3"/><line x1="80" y1="60" x2="80" y2="100" stroke="#4c97ff" stroke-width="3"/><text x="75" y="55" font-size="18">🐢</text></svg>`,
      'chuong-trinh-dau-tien': `<svg viewBox="0 0 200 80" width="200"><line x1="20" y1="40" x2="90" y2="40" stroke="#4c97ff" stroke-width="3"/><text x="15" y="35" font-size="18">🐢</text></svg>`,
      'penup-pendown': `<svg viewBox="0 0 250 60" width="250"><line x1="10" y1="30" x2="70" y2="30" stroke="#4c97ff" stroke-width="3"/><line x1="70" y1="30" x2="130" y2="30" stroke="#ccc" stroke-dasharray="4" stroke-width="2"/><line x1="130" y1="30" x2="200" y2="30" stroke="#4c97ff" stroke-width="3"/></svg>`,
      pencolor: `<svg viewBox="0 0 200 60" width="200"><line x1="10" y1="30" x2="60" y2="30" stroke="red" stroke-width="4"/><line x1="60" y1="30" x2="110" y2="30" stroke="blue" stroke-width="4"/><line x1="110" y1="30" x2="160" y2="30" stroke="green" stroke-width="4"/></svg>`,
      fillcolor: `<svg viewBox="0 0 100 100" width="100"><rect x="15" y="15" width="70" height="70" fill="yellow" stroke="blue" stroke-width="3"/></svg>`,
      'begin-fill': `<svg viewBox="0 0 120 110" width="110"><polygon points="60,10 110,100 10,100" fill="lightblue" stroke="navy" stroke-width="2"/></svg>`,
      'end-fill': `<svg viewBox="0 0 120 120" width="110"><polygon points="60,10 72,45 110,45 80,68 92,105 60,85 28,105 40,68 10,45 48,45" fill="red" stroke="gold" stroke-width="2"/></svg>`,
      'hinh-vuong': `<svg viewBox="0 0 100 100" width="100"><rect x="15" y="15" width="70" height="70" fill="lightblue" stroke="blue" stroke-width="3"/></svg>`,
      'tam-giac': `<svg viewBox="0 0 110 100" width="110"><polygon points="55,10 100,90 10,90" fill="lightgreen" stroke="green" stroke-width="2"/></svg>`,
      'ngoi-sao': `<svg viewBox="0 0 110 110" width="110"><polygon points="55,5 65,38 98,38 72,58 83,92 55,72 27,92 38,58 12,38 45,38" fill="yellow" stroke="gold" stroke-width="2"/></svg>`,
      'da-giac': `<svg viewBox="0 0 110 110" width="110"><polygon points="55,8 98,28 98,72 55,92 12,72 12,28" fill="lavender" stroke="purple" stroke-width="2"/></svg>`,
      onclick: `<svg viewBox="0 0 120 60" width="120"><text x="40" y="40" font-size="30">🐢</text><text x="75" y="35" font-size="20">👆</text></svg>`,
      onscreenclick: `<svg viewBox="0 0 150 80" width="150"><rect x="5" y="5" width="140" height="70" fill="#eef6ff" stroke="#4c97ff" stroke-dasharray="4"/><circle cx="50" cy="40" r="5" fill="red"/><circle cx="100" cy="25" r="5" fill="red"/></svg>`,
      onkeypress: `<svg viewBox="0 0 140 60" width="140"><text x="10" y="25" font-size="14">↑↓←→</text><text x="60" y="40" font-size="24">🐢</text></svg>`,
      listen: `<svg viewBox="0 0 140 50" width="140"><text x="10" y="35" font-size="28">👂⌨️🐢</text></svg>`,
      'game-hung-tao': `<svg viewBox="0 0 120 80" width="120"><rect width="120" height="80" fill="lightblue"/><text x="50" y="25" font-size="16">🍎</text><text x="45" y="70" font-size="20">🐢</text></svg>`,
      'game-ne-bom': `<svg viewBox="0 0 120 80" width="120"><rect width="120" height="80" fill="#222"/><text x="48" y="25" font-size="16">💣</text><text x="45" y="70" font-size="20">🐢</text></svg>`,
      'game-ban-bong': `<svg viewBox="0 0 120 80" width="120"><rect width="120" height="80" fill="navy"/><circle cx="40" cy="20" r="8" fill="orange"/><circle cx="80" cy="20" r="8" fill="orange"/><text x="52" y="75" font-size="14">🔺</text></svg>`,
      'game-me-cung': `<svg viewBox="0 0 120 80" width="120"><rect width="120" height="80" fill="#fafafa" stroke="#1a3a6b"/><path d="M15 15 h90 v20 h-40 v30 h40" fill="none" stroke="#1a3a6b" stroke-width="4"/><text x="18" y="40" font-size="14">🐢</text><text x="88" y="68" font-size="14">⭐</text></svg>`,
      'game-dua-xe': `<svg viewBox="0 0 120 80" width="120"><rect width="120" height="80" fill="#6b6b6b"/><line x1="40" y1="0" x2="40" y2="80" stroke="#ccc" stroke-dasharray="4"/><line x1="80" y1="0" x2="80" y2="80" stroke="#ccc" stroke-dasharray="4"/><text x="50" y="25" font-size="14">🚗</text><text x="50" y="70" font-size="14">🚙</text></svg>`
    };
    return previews[lessonId] || previews.forward;
  }
};
