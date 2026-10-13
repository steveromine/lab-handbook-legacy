/* Lab Handbook site script: nav toggle and colour theme only. No dependencies, no network. */
(function () {
  'use strict';
  var STORE_KEY = 'lab-handbook-theme';
  var root = document.documentElement;

  // --- theme ---
  try {
    var saved = localStorage.getItem(STORE_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'ftcb') root.setAttribute('data-theme', saved);
  } catch (e) {}
  var themeBtn = document.querySelector('[data-theme-toggle]');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      if (!current) {
        current = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      }
      var next = current === 'light' ? 'dark' : (current === 'ftcb' ? 'dark' : 'light');
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(STORE_KEY, next); } catch (e) {}
    });
  }

  // --- hidden theme: FTCB (hold the theme button for 1.5s) ---
  if (themeBtn) {
    var HOLD_MS = 1500, holdTimer = null;
    var engage = function () {
      root.setAttribute('data-theme', 'ftcb');
      try { localStorage.setItem(STORE_KEY, 'ftcb'); } catch (e) {}
      themeBtn.setAttribute('title', 'FTCB');
      holdTimer = null;
    };
    var startHold = function () { if (!holdTimer) holdTimer = setTimeout(engage, HOLD_MS); };
    var cancelHold = function () { if (holdTimer) { clearTimeout(holdTimer); holdTimer = null; } };
    ['mousedown', 'touchstart', 'pointerdown'].forEach(function (ev) { themeBtn.addEventListener(ev, startHold); });
    ['mouseup', 'mouseleave', 'touchend', 'touchcancel', 'pointerup', 'pointerleave'].forEach(function (ev) { themeBtn.addEventListener(ev, cancelHold); });
  }

  // --- nav toggle (small screens) ---
  var navBtn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (navBtn && nav) {
    navBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // --- gpu-budget legend (gpu-budget page only) ---
  var gpuBox = document.querySelector('[data-gpu-budget]');
  if (gpuBox) {
    var gpuNote = gpuBox.querySelector('[data-gpu-note]');
    var gpuBase = gpuNote ? gpuNote.textContent : '';
    var gpuSegs = gpuBox.querySelectorAll('.gpu-seg');
    var gpuText = {
      resident: 'The resident language model holds roughly 5 GB of the 8 GB card and is not evicted while it is loaded.',
      stream: 'The image model streams its modules on demand, so it costs well under 1 GB at steady state.',
      transcode: 'Hardware transcoding is bursty and latency tolerant - it yields to the other workloads.',
      free: 'The remaining headroom, estimated from documented configuration rather than live telemetry.'
    };
    var gpuBtns = gpuBox.querySelectorAll('[data-gpu-focus]');
    Array.prototype.forEach.call(gpuBtns, function (btn) {
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-gpu-focus');
        var wasOn = btn.getAttribute('aria-pressed') === 'true';
        Array.prototype.forEach.call(gpuBtns, function (b) { b.setAttribute('aria-pressed', 'false'); });
        Array.prototype.forEach.call(gpuSegs, function (s) { s.style.opacity = ''; });
        if (wasOn) { if (gpuNote) { gpuNote.textContent = gpuBase; } return; }
        btn.setAttribute('aria-pressed', 'true');
        Array.prototype.forEach.call(gpuSegs, function (s) {
          if (s.getAttribute('data-seg') !== key) { s.style.opacity = '0.3'; }
        });
        if (gpuNote && gpuText[key]) { gpuNote.textContent = gpuText[key]; }
      });
    });
  }
})();

// --- static search (search-index.json, runs entirely in the browser) ---
(function () {
  'use strict';
  var dialog = document.getElementById('search-dialog');
  var openBtn = document.querySelector('[data-search-open]');
  var input = document.getElementById('q');
  var results = document.getElementById('search-results');
  if (!dialog || !openBtn || !input || !results) return;
  var index = null;
  var loading = false;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function load() {
    if (index || loading) return Promise.resolve(index);
    loading = true;
    return fetch('/search-index.json').then(function (r) { return r.json(); }).then(function (data) {
      index = data; loading = false; return index;
    }).catch(function () { loading = false; return []; });
  }

  function score(item, terms) {
    var text = (item.t + ' ' + item.x).toLowerCase();
    var total = 0;
    for (var i = 0; i < terms.length; i++) {
      var t = terms[i];
      if (!t) continue;
      var at = text.indexOf(t);
      if (at === -1) return 0;
      total += 1 + (item.t.toLowerCase().indexOf(t) !== -1 ? 3 : 0);
    }
    return total;
  }

  function render(terms) {
    if (!terms.length) { results.innerHTML = '<p class="hint">Type to search pages, headings and body text.</p>'; return; }
    var scored = index.map(function (item) { return { item: item, s: score(item, terms) }; })
      .filter(function (x) { return x.s > 0; })
      .sort(function (a, b) { return b.s - a.s; })
      .slice(0, 12);
    if (!scored.length) { results.innerHTML = '<p class="hint">No matches.</p>'; return; }
    results.innerHTML = scored.map(function (x) {
      var snippet = x.item.x.slice(0, 190);
      return '<a href="' + x.item.u + '"><strong>' + esc(x.item.t) + '</strong> <span class="hint">- ' + esc(x.item.k) + '</span><br><span class="hint">' + esc(snippet) + '...</span></a>';
    }).join('');
  }

  function run() {
    var q = (input.value || '').trim().toLowerCase();
    var terms = q.split(/\s+/).filter(function (t) { return t.length > 1; });
    load().then(function () { render(terms); });
  }

  openBtn.addEventListener('click', function () {
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', 'open');
    load().then(function () { render([]); });
    setTimeout(function () { if (input) input.focus(); }, 20);
  });
  input.addEventListener('input', run);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      var first = results.querySelector('a');
      if (first) window.location.href = first.getAttribute('href');
    }
  });
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openBtn.click();
    }
  });
})();

// --- public backlog: request form (proof-of-work) + reviewed list ---
(function () {
  'use strict';
  var enc = new TextEncoder();

  async function digestHex(s) {
    var buf = await crypto.subtle.digest('SHA-256', enc.encode(s));
    return Array.prototype.map.call(new Uint8Array(buf), function (b) {
      return ('0' + b.toString(16)).slice(-2);
    }).join('');
  }

  async function solve(ts, sig, difficulty) {
    var target = '0'.repeat(difficulty);
    var n = 0;
    for (;;) {
      var h = await digestHex(ts + ':' + sig + ':' + n);
      if (h.indexOf(target) === 0) return n;
      n++;
      if (n > 5000000) return null;
    }
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var form = document.getElementById('request-form');
  if (form) {
    var status = document.getElementById('rq-status');
    var submit = document.getElementById('rq-submit');
    var sending = false;
    submit.disabled = false;
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (sending || !form.reportValidity()) return;
      sending = true;
      submit.disabled = true;
      status.textContent = 'Preparing your submission…';
      try {
        if (!window.crypto || !crypto.subtle) throw new Error('A secure, modern browser is required.');
        // Obtain a fresh challenge for every attempt, including retries and second requests.
        var r = await fetch('/api/challenge', { cache: 'no-store' });
        if (!r.ok) throw new Error('Could not prepare the submission. Please retry.');
        var c = await r.json();
        var started = Date.now();
        var nonce = await solve(c.ts, c.sig, c.difficulty || 4);
        if (nonce === null) throw new Error('Preparation timed out. Please retry.');
        await new Promise(function (resolve) { setTimeout(resolve, Math.max(0, 3100 - (Date.now() - started))); });
        var body = new URLSearchParams(new FormData(form));
        body.set('ts', c.ts); body.set('sig', c.sig); body.set('nonce', nonce);
        status.textContent = 'Sending…';
        r = await fetch('/api/request', { method: 'POST', body: body });
        var result = await r.json();
        if (!r.ok || !result.ok) throw new Error(result.error || result.message || 'Could not submit. Please retry.');
        status.textContent = result.message || 'Queued for review.';
        form.reset();
      } catch (error) {
        status.textContent = error.message || 'Could not reach the server. Please retry.';
      } finally {
        sending = false;
        submit.disabled = false;
      }
    });
  }

  var list = document.getElementById('backlog-list');
  if (list) {
    fetch('/api/backlog').then(function (r) { return r.json(); }).then(function (d) {
      var items = (d && d.items) || [];
      if (!items.length) {
        list.innerHTML = '<p class="fine">Nothing has been accepted yet. Yours could be the first.</p>';
        return;
      }
      list.innerHTML = items.map(function (it) {
        return '<article class="backlog-item">' +
          '<h3>' + esc(it.title) + '</h3>' +
          '<p class="fine"><span class="pill pill-live">' + esc(it.kind || 'request') + '</span> ' +
          '<span class="pill">' + esc(it.state || it.status || 'open') + '</span>' +
          (it.who ? ' · asked by ' + esc(it.who) : ' · anonymous') + '</p>' +
          '<p>' + esc(it.detail) + '</p>' +
          '</article>';
      }).join('');
    }).catch(function () {
      list.innerHTML = '<p class="fine">The backlog is unavailable right now.</p>';
    });
  }
})();

// --- handbook chat (grounded, local model, refuses rather than guesses) ---
(function () {
  'use strict';
  var form = document.getElementById('chat-form');
  if (!form) return;
  var log = document.getElementById('chat-log');
  var statusEl = document.getElementById('chat-status');
  var input = document.getElementById('chat-q');
  var btn = document.getElementById('chat-send');

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function add(cls, who, text, sources) {
    var d = document.createElement('div');
    d.className = 'chat-msg ' + cls;
    var body = '<p class="chat-who">' + esc(who) + '</p><p>' + esc(text) + '</p>';
    if (sources && sources.length) {
      body += '<p class="fine">Sources: ' + sources.map(function (s) {
        return '<a href="' + esc(s.u) + '">' + esc(s.t) + '</a>';
      }).join(' · ') + '</p>';
    }
    d.innerHTML = body;
    log.appendChild(d);
    d.scrollIntoView({ block: 'nearest' });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = input.value.trim();
    if (q.length < 3) { if (statusEl) statusEl.textContent = 'Please type a longer question.'; return; }
    add('me', 'You', q);
    input.value = '';
    if (btn) btn.disabled = true;
    if (statusEl) statusEl.textContent = 'Thinking…';
    var enc2 = new TextEncoder();
    function dhex(s) {
      return crypto.subtle.digest('SHA-256', enc2.encode(s)).then(function (b) {
        return Array.prototype.map.call(new Uint8Array(b), function (x) { return ('0' + x.toString(16)).slice(-2); }).join('');
      });
    }
    function solve2(ts, sig, diff) {
      var target = '0'.repeat(diff), n = 0;
      return (function step() {
        return dhex(ts + ':' + sig + ':' + n).then(function (h) {
          if (h.indexOf(target) === 0) return n;
          n++; if (n > 5000000) return null;
          return step();
        });
      })();
    }
    fetch('/api/challenge').then(function (r) { return r.json(); }).then(function (c) {
      return solve2(c.ts, c.sig, c.difficulty || 4).then(function (nonce) {
        return { ts: c.ts, sig: c.sig, nonce: nonce };
      });
    }).then(function (ch) {
      return fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: q, ts: ch.ts, sig: ch.sig, nonce: ch.nonce })
      });
    }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (statusEl) statusEl.textContent = '';
        if (res.j && res.j.answer) add('bot', 'Handbook', res.j.answer, res.j.sources);
        else add('bot', 'Handbook', (res.j && res.j.error) || 'Something went wrong - try again.');
      })
      .catch(function () { if (statusEl) statusEl.textContent = 'Could not reach the assistant.'; })
      .then(function () { if (btn) btn.disabled = false; });
  });
})();
