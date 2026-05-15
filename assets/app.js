/* ===== Shared shell (topbar + sidebar) ===== */
function renderShell() {
  const topMount = document.getElementById('topbar-mount');
  const sideMount = document.getElementById('sidebar-mount');
  if (topMount) {
    topMount.outerHTML = `
      <header class="topbar">
        <div class="topbar-inner">
          <a class="brand-link" href="index.html">
            <div class="logo">B</div>
            <div>
              <h1>Baropharm Design System</h1>
              <p>Figma 토큰 기반 컬러 · 타이포그래피 · 컴포넌트 가이드</p>
            </div>
          </a>
          <div class="pills">
            <span class="pill">Pretendard</span>
            <span class="pill">13 Color Scales</span>
            <span class="pill">6 Service Primaries</span>
            <span class="pill">22 Partner Brands</span>
          </div>
        </div>
      </header>
    `;
  }
  if (sideMount) {
    sideMount.outerHTML = `
      <aside class="sidebar">
        <a class="nav-link" href="index.html">Overview</a>

        <div class="nav-group">Foundation</div>
        <a class="nav-link" href="typography.html">Typography</a>
        <button class="nav-parent" aria-expanded="false" id="color-toggle">
          Color
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>
        </button>
        <div class="nav-children" id="color-children">
          <a class="nav-link" href="color.html#text">Text</a>
          <a class="nav-link" href="color.html#surface">Surface</a>
          <a class="nav-link" href="color.html#primary">Primary</a>
          <a class="nav-link" href="color.html#services">Service Primaries <span class="count">6</span></a>
          <a class="nav-link" href="color.html#status">Status</a>
          <a class="nav-link" href="color.html#service-misc">Service Misc</a>
          <a class="nav-link" href="color.html#palette">Palette <span class="count">13</span></a>
          <a class="nav-link" href="color.html#membership">Membership <span class="count">7</span></a>
          <a class="nav-link" href="color.html#partners">Partners <span class="count">22</span></a>
        </div>

        <div class="nav-group">Brand</div>
        <a class="nav-link" href="logos.html">Logos</a>

        <div class="nav-group">Components</div>
        <a class="nav-link" href="components.html">Mobile UI</a>
      </aside>
    `;
  }
}

/* ===== Toast + Copy helpers ===== */
let toastTimer;
function showToast(text) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1400);
}
function flashCopied(el) {
  if (!el) return;
  el.classList.remove('copied');
  void el.offsetWidth;
  el.classList.add('copied');
  setTimeout(() => el.classList.remove('copied'), 900);
}
function copyText(text, el, toastLabel) {
  navigator.clipboard.writeText(text).then(() => {
    showToast((toastLabel || text) + ' 복사됨');
    flashCopied(el);
  });
}

/* ===== Sidebar: active state based on current page + Color accordion ===== */
function initSidebar() {
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const isColorPage = path === 'color.html';

  const navLinks = document.querySelectorAll('.sidebar a.nav-link');
  navLinks.forEach(a => {
    const href = a.getAttribute('href') || '';
    const target = href.split('#')[0].toLowerCase();
    if (!isColorPage && target === path) a.classList.add('active');
  });

  const colorToggle = document.getElementById('color-toggle');
  const colorChildren = document.getElementById('color-children');
  if (colorToggle && colorChildren) {
    const expandedInitially = isColorPage;
    colorChildren.classList.toggle('open', expandedInitially);
    colorToggle.setAttribute('aria-expanded', expandedInitially ? 'true' : 'false');
    if (isColorPage) colorToggle.classList.add('active');
    colorToggle.addEventListener('click', () => {
      const open = colorChildren.classList.toggle('open');
      colorToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  if (isColorPage) {
    const subSections = Array.from(navLinks)
      .filter(a => (a.getAttribute('href') || '').includes('color.html#'))
      .map(a => ({ link: a, section: document.querySelector('#' + a.getAttribute('href').split('#')[1]) }))
      .filter(x => x.section);
    if (subSections.length) {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            subSections.forEach(({ link }) => {
              link.classList.toggle('active', link.getAttribute('href').endsWith('#' + id));
            });
          }
        });
      }, { rootMargin: '-30% 0px -60% 0px' });
      subSections.forEach(({ section }) => obs.observe(section));
    }
  }
}

/* ===== Render: Swatches ===== */
function renderSwatches() {
  document.querySelectorAll('[data-swatches]').forEach(el => {
    const key = el.dataset.swatches;
    const items = swatchData[key];
    if (!items) return;
    el.innerHTML = items.map(([name, hex]) => {
      const needsBorder = hex.toLowerCase() === '#ffffff';
      return `
        <div class="swatch" data-hex="${hex}">
          <div class="chip ${needsBorder ? 'bordered' : ''}" style="background:${hex}"></div>
          <div class="meta">
            <div class="name">${name}</div>
            <div class="hex">${hex}</div>
          </div>
        </div>`;
    }).join('');
    el.querySelectorAll('.swatch').forEach(s => {
      s.addEventListener('click', () => copyText(s.dataset.hex, s));
    });
  });
}

/* ===== Render: Service Panel + Tabs ===== */
function renderServicePanel(container, service) {
  container.innerHTML = service.steps.map((hex, i) => `
    <div class="service-step" data-hex="${hex}">
      <div class="chip" style="background:${hex}"></div>
      <div class="info">
        <div class="label">${stepLabels[i]}</div>
        <div class="hex">${hex}</div>
      </div>
    </div>
  `).join('');
  container.querySelectorAll('.service-step').forEach(s => {
    s.addEventListener('click', () => copyText(s.dataset.hex, s));
  });
}
function renderServiceTabs() {
  const tabsEl = document.getElementById('service-tabs');
  const panelEl = document.getElementById('service-panel');
  if (!tabsEl || !panelEl) return;
  services.forEach((s, idx) => {
    const btn = document.createElement('button');
    btn.className = 'tab' + (idx === 0 ? ' active' : '');
    btn.innerHTML = `<span class="dot" style="background:${s.steps[5]}"></span>${s.name}`;
    btn.onclick = () => {
      tabsEl.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      renderServicePanel(panelEl, s);
    };
    tabsEl.appendChild(btn);
  });
  renderServicePanel(panelEl, services[0]);
}
function renderDefaultPrimary() {
  document.querySelectorAll('[data-service-panel]').forEach(el => {
    const svc = services.find(s => s.name === el.dataset.servicePanel);
    if (svc) renderServicePanel(el, svc);
  });
}

/* ===== Render: Palette ===== */
function renderPalette() {
  const paletteEl = document.getElementById('palette-list');
  if (!paletteEl) return;
  Object.entries(palette).forEach(([name, steps]) => {
    const block = document.createElement('div');
    block.className = 'group';
    block.innerHTML = `
      <h3 class="group-title">${name} <small>Colors/${name}/1 – 10</small></h3>
      <div class="scale">
        ${steps.map((hex, i) => `
          <div class="step" data-hex="${hex}">
            <div class="chip" style="background:${hex}"></div>
            <div class="info">
              <div class="num">${i + 1}</div>
              <div class="hex">${hex}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    paletteEl.appendChild(block);
    block.querySelectorAll('.step').forEach(s => {
      s.addEventListener('click', () => copyText(s.dataset.hex, s));
    });
  });
}

/* ===== Render: Membership ===== */
function renderMembership() {
  const memberEl = document.getElementById('membership-list');
  if (!memberEl) return;
  memberships.forEach(m => {
    const card = document.createElement('div');
    card.className = 'membership-card';
    card.innerHTML = `
      <div class="preview" style="background:${m.bg}">
        <span class="pill" style="background:${m.fg}">${m.name} 멤버십</span>
      </div>
      <div class="tokens">
        <div class="row" data-hex="${m.fg}">
          <span class="swatch-mini" style="background:${m.fg}"></span>
          <span>FG</span>
          <span class="hex">${m.fg}</span>
        </div>
        <div class="row" data-hex="${m.bg}">
          <span class="swatch-mini" style="background:${m.bg}"></span>
          <span>BG</span>
          <span class="hex">${m.bg}</span>
        </div>
      </div>
    `;
    memberEl.appendChild(card);
    card.querySelectorAll('.row').forEach(r => {
      r.addEventListener('click', () => copyText(r.dataset.hex, r));
    });
  });
}

/* ===== Render: Partners ===== */
function renderPartners() {
  const partnersEl = document.getElementById('partners-list');
  const input = document.getElementById('partner-search-input');
  if (!partnersEl) return;
  function paint(filter = '') {
    const f = filter.toLowerCase().trim();
    const filtered = partners.filter(([name, hex]) =>
      !f || name.toLowerCase().includes(f) || hex.toLowerCase().includes(f)
    );
    partnersEl.innerHTML = filtered.map(([name, hex]) => `
      <div class="brand" data-hex="${hex}">
        <div class="dot" style="background:${hex}"></div>
        <div class="info">
          <div class="name">${name}</div>
          <div class="hex">${hex}</div>
        </div>
      </div>
    `).join('') || '<div style="padding:20px;color:var(--text-tertiary);font-size:13px">검색 결과 없음</div>';
    partnersEl.querySelectorAll('.brand').forEach(b => {
      b.addEventListener('click', () => copyText(b.dataset.hex, b));
    });
  }
  paint();
  if (input) input.addEventListener('input', e => paint(e.target.value));
}

/* ===== Render: Brand Logos ===== */
function renderBrandLogos() {
  const root = document.getElementById('logos-list');
  if (!root) return;
  root.innerHTML = brandLogos.map(brand => `
    <section class="brand-section">
      <div class="brand-head">
        <span class="b-dot" style="background:${brand.color}"></span>
        <span class="b-name">${brand.name}</span>
        <span class="b-hex">${brand.color}</span>
      </div>
      <div class="logo-grid">
        ${brand.files.map(f => `
          <div class="logo-card">
            <div class="preview"><img src="${f.file}" alt="${brand.name} ${f.label}" /></div>
            <div class="meta">
              <div class="info">
                <div class="name">${f.label}</div>
                <div class="desc">${f.desc}</div>
              </div>
              <div class="actions">
                <a href="${f.file}" download>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M6 9l6 6 6-6"/><path d="M5 21h14"/></svg>
                  Download
                </a>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `).join('');
}

/* ===== Typography click-to-copy ===== */
function bindTypographyCopy() {
  document.querySelectorAll('.type-row[data-css]').forEach(row => {
    row.addEventListener('click', () => {
      const css = row.dataset.css;
      copyText(css, row);
    });
  });
}

/* ===== Init dispatch ===== */
document.addEventListener('DOMContentLoaded', () => {
  renderShell();
  initSidebar();
  renderSwatches();
  renderDefaultPrimary();
  renderServiceTabs();
  renderPalette();
  renderMembership();
  renderPartners();
  renderBrandLogos();
  bindTypographyCopy();
});
