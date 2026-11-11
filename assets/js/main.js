(function () {
  'use strict';

  // 밝은 화면 / 어두운 화면 전환
  var root = document.documentElement;
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    var giscus = document.querySelector('iframe.giscus-frame');
    if (giscus) giscus.contentWindow.postMessage({ giscus: { setConfig: { theme: next } } }, 'https://giscus.app');
  });

  // 코드 블록 복사 버튼
  document.querySelectorAll('.prose div.highlighter-rouge').forEach(function (block) {
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.type = 'button';
    btn.textContent = '복사';
    btn.addEventListener('click', function () {
      var code = block.querySelector('pre');
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(code.innerText.replace(/\n$/, '')).then(function () {
        btn.textContent = '복사됨';
        setTimeout(function () { btn.textContent = '복사'; }, 1500);
      });
    });
    block.appendChild(btn);
  });

  // 목차: 넓은 화면에서만 보이고, 소제목이 2개 이상일 때만 만듭니다.
  var toc = document.getElementById('toc');
  var content = document.getElementById('post-content');
  if (toc && content) {
    var heads = content.querySelectorAll('h2[id], h3[id]');
    if (heads.length >= 2) {
      var ol = document.createElement('ol');
      var links = [];
      heads.forEach(function (h) {
        var li = document.createElement('li');
        if (h.tagName === 'H3') li.className = 'sub';
        var a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent;
        li.appendChild(a);
        ol.appendChild(li);
        links.push([a, h]);
      });
      toc.appendChild(ol);
      var update = function () {
        var cur = links[0];
        links.forEach(function (l) { if (l[1].getBoundingClientRect().top < 120) cur = l; });
        links.forEach(function (l) { l[0].classList.toggle('active', l === cur); });
      };
      window.addEventListener('scroll', update, { passive: true });
      update();
    }
  }

  // 검색: 버튼을 누르거나 / 키를 누르면 열립니다.
  var modal = document.getElementById('search');
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  var index = null, sel = -1;

  function esc(s) {
    return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  function render() {
    var q = input.value.trim().toLowerCase();
    sel = -1;
    if (!q || !index) { results.innerHTML = ''; return; }
    var hits = index.filter(function (p) {
      return (p.title + ' ' + p.tags + ' ' + p.content).toLowerCase().indexOf(q) > -1;
    }).sort(function (a, b) {
      return (b.title.toLowerCase().indexOf(q) > -1) - (a.title.toLowerCase().indexOf(q) > -1);
    }).slice(0, 10);
    results.innerHTML = hits.length
      ? hits.map(function (p) { return '<li><a href="' + p.url + '"><time>' + esc(p.date) + '</time>' + esc(p.title) + '</a></li>'; }).join('')
      : '<li class="none">찾은 글이 없습니다.</li>';
  }
  function open() {
    modal.hidden = false;
    input.focus();
    if (!index) fetch(window.SEARCH_URL).then(function (r) { return r.json(); }).then(function (d) { index = d; render(); });
  }
  function close() { modal.hidden = true; }

  if (modal) {
    document.querySelectorAll('[data-search-open]').forEach(function (b) { b.addEventListener('click', open); });
    modal.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close')) close(); });
    input.addEventListener('input', render);
    document.addEventListener('keydown', function (e) {
      var tag = (document.activeElement || {}).tagName;
      if (e.key === '/' && modal.hidden && tag !== 'INPUT' && tag !== 'TEXTAREA') { e.preventDefault(); open(); return; }
      if (modal.hidden) return;
      var items = results.querySelectorAll('a');
      if (e.key === 'Escape') close();
      else if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && items.length) {
        e.preventDefault();
        sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
        items.forEach(function (a, i) { a.classList.toggle('sel', i === sel); });
      } else if (e.key === 'Enter' && items[sel]) location.href = items[sel].href;
    });
  }

  // 맨 위로 버튼
  var top = document.getElementById('to-top');
  if (top) {
    var showTop = function () { top.hidden = window.scrollY < 600; };
    window.addEventListener('scroll', showTop, { passive: true });
    top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    showTop();
  }
  // 소개 페이지: Experience 탭 전환
  document.querySelectorAll('[data-tabs]').forEach(function (bar) {
    var list = document.getElementById(bar.getAttribute('data-tabs'));
    if (!list) return;
    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-tab]');
      if (!btn) return;
      var id = btn.getAttribute('data-tab');
      bar.querySelectorAll('[data-tab]').forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      list.querySelectorAll('[data-period]').forEach(function (li) {
        li.hidden = !(id === 'all' || li.getAttribute('data-period') === id);
      });
      list.classList.remove('fade');
      void list.offsetWidth;
      list.classList.add('fade');
    });
  });

  // 스크롤하면 섹션이 부드럽게 나타나는 효과
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('js-reveal');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }
})();
