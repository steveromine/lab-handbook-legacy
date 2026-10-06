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
