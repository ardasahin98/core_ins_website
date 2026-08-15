/* ============================================================
   Site behaviour and rendering. Plain JavaScript, no framework.

   Sections of this file:
     1. content    — get the data (Firestore if configured, else placeholder)
     2. motion     — scroll reveals and the hero cross-section drift
     3. chrome     — mobile menu, platform links, placeholder banner
     4. render     — the list and detail pages
     5. form       — the quote request
   ============================================================ */

(function () {
  'use strict';

  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const param = (key) => new URLSearchParams(location.search).get(key);

  /* ========================================================== 1. content */

  const seed = window.CORE_DATA || {};
  const cache = {};

  async function load(name) {
    if (cache[name]) return cache[name];
    let rows = [];
    if (window.CoreDB && window.CoreDB.enabled()) {
      rows = await window.CoreDB.getCollection(name);
      rows = rows.filter((r) => r.published !== false);
    }
    if (!rows.length) rows = (seed[name] || []).slice();
    cache[name] = rows;
    return rows;
  }

  const byOrder = (a, b) =>
    (a.order == null ? 999 : a.order) - (b.order == null ? 999 : b.order) ||
    String(a.name || a.title || '').localeCompare(String(b.name || b.title || ''));

  const bySlug = (rows, slug) => rows.find((r) => r.slug === slug) || null;

  /* =========================================================== 2. motion */

  function reveals() {
    const els = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const siblings = Array.from(entry.target.parentNode.children);
        const i = Math.min(siblings.indexOf(entry.target), 5);
        entry.target.style.transitionDelay = i * 70 + 'ms';
        entry.target.classList.add('in');
        io.unobserve(entry.target);       // fire once, never re-animate
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
    els.forEach((e) => io.observe(e));
  }

  function heroDrift() {
    const svg = $('#xsec');
    if (!svg) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const groups = [
      [$$('.L1', svg), -10], [$$('.L2', svg), 6],
      [$$('.L3', svg), 20],  [$$('.L4', svg), 4],
    ];
    let frame = 0;
    function update() {
      frame = 0;
      const rect = svg.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const p = Math.min(1, Math.max(0, -rect.top / window.innerHeight + 0.35));
      groups.forEach(([nodes, dist]) => {
        nodes.forEach((n) => { n.style.transform = 'translateY(' + (p * dist).toFixed(2) + 'px)'; });
      });
    }
    window.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(update); },
      { passive: true });
    update();
  }

  /* =========================================================== 3. chrome */

  function chrome() {
    const btn = $('.menu-btn');
    const nav = $('nav.mobile');
    if (btn && nav) {
      btn.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
      });
    }

    const url = window.CORE_PLATFORM_URL || '#';
    $$('[data-platform]').forEach((a) => { a.href = url; });

    if (!(window.CoreDB && window.CoreDB.enabled())) {
      const bar = $('#placeholder-notice');
      if (bar) bar.hidden = false;
    }
  }

  /* =========================================================== 4. render */

  function sectorCard(s) {
    return `<a class="card reveal" href="/sector?s=${esc(s.slug)}">
      <div><h3>${esc(s.name)}</h3><p>${esc(s.summary)}</p></div>
      <span class="more">Projects &amp; instruments →</span><span class="ring"></span></a>`;
  }

  function projectCard(p) {
    const meta = [p.country, p.year].filter(Boolean).join(' · ');
    const stats = (p.stats || []).slice(0, 2).map((s) =>
      `<div><dd class="tnum">${esc(s.value)}</dd><dt>${esc(s.label)}</dt></div>`).join('');
    const photo = p.heroImage
      ? `<div class="ph" style="background-image:url('${esc(p.heroImage)}')"></div>`
      : `<div class="ph">Project photo</div>`;
    return `<a class="pcard reveal" href="/project?p=${esc(p.slug)}">${photo}
      <div class="body"><p class="meta">${esc(meta)}</p><h3>${esc(p.title)}</h3>
      <p>${esc(p.summary)}</p>${stats ? `<dl>${stats}</dl>` : ''}</div></a>`;
  }

  function instrumentCard(i) {
    return `<a class="card sm reveal" href="/instrument?i=${esc(i.slug)}">
      <div><div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start">
        <h3>${esc(i.name)}</h3>${i.rentable ? '<span class="tag">Rental</span>' : ''}</div>
        <p>${esc(i.summary)}</p></div>
      <span class="more">Specifications →</span></a>`;
  }

  async function renderHome() {
    const [sectors, projects, services] = await Promise.all([
      load('sectors'), load('projects'), load('services'),
    ]);
    const grid = $('#home-sectors');
    if (grid) grid.innerHTML = sectors.slice().sort(byOrder).map(sectorCard).join('');

    const featured = projects.filter((p) => p.featured);
    const list = (featured.length ? featured : projects).slice(0, 3);
    const pg = $('#home-projects');
    if (pg) pg.innerHTML = list.map(projectCard).join('');

    const sv = $('#home-services');
    if (sv) sv.innerHTML = services.slice().sort(byOrder).map((s, n) =>
      `<div class="row reveal"><span class="n">${String(n + 1).padStart(2, '0')}</span>
       <h3>${esc(s.name)}</h3><p>${esc(s.summary)}</p></div>`).join('');
  }

  async function renderSectors() {
    const sectors = (await load('sectors')).slice().sort(byOrder);
    const grid = $('#sector-grid');
    if (grid) grid.innerHTML = sectors.map(sectorCard).join('');
  }

  async function renderSector() {
    const slug = param('s');
    const [sectors, projects, instruments] = await Promise.all([
      load('sectors'), load('projects'), load('instruments'),
    ]);
    const s = bySlug(sectors, slug);
    if (!s) { location.replace('/sectors'); return; }

    document.title = s.name + ' · CORE Instrumentation & Monitoring';
    $('#s-name').textContent = s.name;
    $('#s-crumb').textContent = s.name;
    $('#s-lead').textContent = s.intro || s.summary;
    $('#s-cta-name').textContent = s.name.toLowerCase();

    const measures = s.measures || [];
    const mWrap = $('#s-measures-wrap');
    if (measures.length) {
      $('#s-measures').innerHTML = measures.map((m) =>
        `<div class="reveal"><h3 style="font-size:15px;font-weight:400;color:var(--ink-2)">
         <span style="display:inline-block;width:6px;height:6px;border-radius:50%;
         background:var(--ember);margin-right:10px;vertical-align:middle"></span>${esc(m)}</h3></div>`).join('');
    } else if (mWrap) { mWrap.hidden = true; }

    const mine = projects.filter((p) => (p.sectorSlugs || []).indexOf(s.slug) !== -1);
    $('#s-projects').innerHTML = mine.length
      ? mine.map(projectCard).join('')
      : `<div class="empty" style="grid-column:1/-1">No projects published in this sector yet.</div>`;

    const kit = (s.instrumentSlugs || []).map((x) => bySlug(instruments, x)).filter(Boolean);
    const iWrap = $('#s-instruments-wrap');
    if (kit.length) $('#s-instruments').innerHTML = kit.map(instrumentCard).join('');
    else if (iWrap) iWrap.hidden = true;

    reveals();
  }

  async function renderProjects() {
    const projects = await load('projects');
    projects.sort((a, b) => (b.year || 0) - (a.year || 0));
    $('#project-grid').innerHTML = projects.map(projectCard).join('');
  }

  async function renderProject() {
    const slug = param('p');
    const [projects, instruments, sectors] = await Promise.all([
      load('projects'), load('instruments'), load('sectors'),
    ]);
    const p = bySlug(projects, slug);
    if (!p) { location.replace('/projects'); return; }

    document.title = p.title + ' · CORE Instrumentation & Monitoring';
    $('#p-title').textContent = p.title;
    $('#p-crumb').textContent = p.title;
    $('#p-meta').textContent = [p.location, p.country, p.year].filter(Boolean).join(' · ');
    $('#p-summary').textContent = p.summary;

    const tags = (p.sectorSlugs || []).map((x) => bySlug(sectors, x)).filter(Boolean);
    $('#p-sectors').innerHTML = tags.map((s) =>
      `<a class="chip" style="border-color:var(--slate-line);color:#B9C7CE;background:transparent"
        href="/sector?s=${esc(s.slug)}">${esc(s.name)}</a>`).join('');

    $('#p-stats').innerHTML = (p.stats || []).map((s) =>
      `<div><dd class="tnum">${esc(s.value)}</dd><dt>${esc(s.label)}</dt></div>`).join('');

    const todo = 'To be written — add this in Firebase.';
    $('#p-challenge').textContent = p.challenge || todo;
    $('#p-solution').textContent  = p.solution  || todo;
    $('#p-outcome').textContent   = p.outcome   || todo;

    const kit = (p.instrumentSlugs || []).map((x) => bySlug(instruments, x)).filter(Boolean);
    const wrap = $('#p-instruments-wrap');
    if (kit.length) $('#p-instruments').innerHTML = kit.map(instrumentCard).join('');
    else if (wrap) wrap.hidden = true;

    reveals();
  }

  async function renderInstruments() {
    const [instruments, categories] = await Promise.all([load('instruments'), load('categories')]);
    categories.sort(byOrder);
    instruments.sort(byOrder);

    $('#cat-nav').innerHTML = categories.map((c) =>
      `<a class="chip" href="#${esc(c.slug)}">${esc(c.name)}</a>`).join('');

    $('#cat-list').innerHTML = categories.map((c) => {
      const items = instruments.filter((i) => i.categorySlug === c.slug);
      if (!items.length) return '';
      return `<div id="${esc(c.slug)}" style="scroll-margin-top:110px;margin-bottom:72px">
        <div class="reveal" style="border-bottom:1px solid var(--line);padding-bottom:20px;margin-bottom:28px">
          <p class="eb">${String(c.order == null ? 0 : c.order).padStart(2, '0')}</p>
          <h2 style="font-size:26px">${esc(c.name)}</h2>
          ${c.summary ? `<p style="margin-top:8px;font-size:15.5px;color:var(--ink-2)">${esc(c.summary)}</p>` : ''}
        </div>
        <div class="grid4">${items.map(instrumentCard).join('')}</div></div>`;
    }).join('');

    reveals();
  }

  async function renderInstrument() {
    const slug = param('i');
    const [instruments, categories] = await Promise.all([load('instruments'), load('categories')]);
    const it = bySlug(instruments, slug);
    if (!it) { location.replace('/instruments'); return; }
    const cat = categories.find((c) => c.slug === it.categorySlug);

    document.title = it.name + ' · CORE Instrumentation & Monitoring';
    $('#i-name').textContent = it.name;
    $('#i-crumb').textContent = it.name;
    $('#i-cat').textContent = cat ? cat.name : '';
    $('#i-catcrumb').textContent = cat ? cat.name : 'Category';
    $('#i-catcrumb').href = '/instruments#' + esc(it.categorySlug);
    $('#i-summary').textContent = it.summary;
    $('#i-quote').href = '/contact?instrument=' + encodeURIComponent(it.slug);
    $('#i-quote2').href = '/contact?instrument=' + encodeURIComponent(it.slug);
    $('#i-quote2').textContent = 'Ask about ' + it.name + ' →';

    if (it.datasheetUrl) { const a = $('#i-datasheet'); a.hidden = false; a.href = it.datasheetUrl; }
    if (it.manualUrl)    { const a = $('#i-manual');    a.hidden = false; a.href = it.manualUrl; }

    const block = (id, wrapId, html) => {
      if (html) $(id).innerHTML = html; else $(wrapId).hidden = true;
    };
    block('#i-measures', '#i-measures-wrap', it.measures ? esc(it.measures) : '');
    block('#i-desc', '#i-desc-wrap', it.description ? esc(it.description) : '');
    block('#i-features', '#i-features-wrap',
      (it.features || []).map((f) => `<li>${esc(f)}</li>`).join(''));
    block('#i-apps', '#i-apps-wrap',
      (it.applications || []).map((a) => `<span class="chip">${esc(a)}</span>`).join(' '));

    const specs = it.specs || [];
    if (!specs.length) { $('#i-specs-wrap').hidden = true; }
    else {
      const hasImperial = specs.some((s) => s.imperial);
      if (!hasImperial) $('#i-units').hidden = true;
      const draw = (imperial) => {
        $('#i-specs').innerHTML = specs.map((s) =>
          `<div class="r"><dt>${esc(s.label)}</dt>
           <dd class="tnum">${esc(imperial && s.imperial ? s.imperial : s.value)}</dd></div>`).join('');
      };
      draw(false);
      $$('#i-units button').forEach((b) => {
        b.addEventListener('click', () => {
          const imperial = b.dataset.unit === 'imperial';
          $$('#i-units button').forEach((x) =>
            x.setAttribute('aria-pressed', String((x.dataset.unit === 'imperial') === imperial)));
          draw(imperial);
        });
      });
    }

    const related = instruments
      .filter((x) => x.categorySlug === it.categorySlug && x.slug !== it.slug).slice(0, 4);
    if (related.length) {
      $('#i-related').innerHTML = related.map(instrumentCard).join('');
      $('#i-related-title').textContent = 'More in ' + (cat ? cat.name : 'this category');
    } else { $('#i-related-wrap').hidden = true; }

    reveals();
  }

  async function renderServices() {
    const services = (await load('services')).slice().sort(byOrder);
    $('#service-list').innerHTML = services.map((s, n) => `
      <div class="row reveal" style="display:grid;grid-template-columns:auto 1fr 1fr;gap:32px">
        <span class="n">${String(n + 1).padStart(2, '0')}</span>
        <div><h3 style="margin:0;font-size:22px">${esc(s.name)}</h3>
          <p style="margin:12px 0 0">${esc(s.summary)}</p></div>
        <ul class="bullets" style="margin:0">${(s.bullets || []).map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
      </div>`).join('');
    reveals();
  }

  async function renderTeam() {
    const team = (await load('team')).slice().sort(byOrder);
    const grid = $('#team-grid');
    if (!grid) return;
    grid.innerHTML = team.map((m) => `
      <div class="person reveal">
        <div class="ph"${m.photo ? ` style="background-image:url('${esc(m.photo)}')"` : ''}>${m.photo ? '' : 'Photo'}</div>
        <div class="body"><h3>${esc(m.name)}</h3><p class="role">${esc(m.role)}</p>
        ${m.bio ? `<p>${esc(m.bio)}</p>` : ''}</div></div>`).join('');
    reveals();
  }

  /* ============================================================= 5. form */

  function quoteForm() {
    const form = $('#quote-form');
    if (!form) return;

    const instrument = param('instrument');
    if (instrument) {
      const note = $('#q-instrument');
      note.hidden = false;
      note.innerHTML = 'Asking about: <strong>' + esc(instrument) + '</strong>';
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const msg = $('#q-msg');
      const btn = $('#q-submit');
      msg.hidden = true;

      const fd = new FormData(form);
      if (fd.get('company_website')) return;        // honeypot

      const record = {
        name: String(fd.get('name') || '').trim(),
        email: String(fd.get('email') || '').trim(),
        company: String(fd.get('company') || '').trim(),
        phone: String(fd.get('phone') || '').trim(),
        country: String(fd.get('country') || '').trim(),
        projectType: String(fd.get('projectType') || '').trim(),
        message: String(fd.get('message') || '').trim(),
        instrumentSlugs: instrument ? [instrument] : [],
        source: 'website',
        status: 'new',
        createdAt: new Date().toISOString(),
      };

      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(record.email)) {
        msg.hidden = false; msg.className = 'form-msg err';
        msg.textContent = 'That email address does not look right.';
        return;
      }

      btn.disabled = true; btn.textContent = 'Sending…';
      try {
        await window.CoreDB.createDoc('inquiries', record);
        form.innerHTML = `<div class="form-msg ok" style="padding:32px;text-align:center">
          <h2 style="font-size:22px;margin:0 0 10px;max-width:none">Thank you — it is with us.</h2>
          <p style="margin:0;font-size:15.5px;line-height:1.6;color:var(--ink-2)">
          Someone from the team will reply within one working day. If it is urgent, call the
          number on this page rather than waiting on email.</p></div>`;
      } catch (err) {
        btn.disabled = false; btn.textContent = 'Send request';
        msg.hidden = false; msg.className = 'form-msg err';
        msg.textContent = 'We could not send that. Please email us directly — ' + err.message;
      }
    });
  }

  /* ============================================================== start */

  document.addEventListener('DOMContentLoaded', function () {
    chrome();
    heroDrift();
    quoteForm();

    const page = document.body.dataset.page;
    const jobs = {
      home: renderHome, sectors: renderSectors, sector: renderSector,
      projects: renderProjects, project: renderProject,
      instruments: renderInstruments, instrument: renderInstrument,
      services: renderServices, about: renderTeam,
    };
    const job = jobs[page];
    if (job) { job().then(reveals).catch((e) => { console.error(e); reveals(); }); }
    else { reveals(); }
  });
})();
