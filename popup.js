'use strict';

(function () {
  var input = document.getElementById('input');
  var output = document.getElementById('output');
  var modeButtons = Array.prototype.slice.call(document.querySelectorAll('.mode'));
  var copyBtn = document.getElementById('copy');
  var swapBtn = document.getElementById('swap');
  var clearBtn = document.getElementById('clear');
  var statusEl = document.getElementById('status');

  var STORE_KEY = 'uz-translit-state';
  var mode = 'newlatin';
  var statusTimer = null;

  var converters = {
    cyrillic: UzConverter.toCyrillic,
    latin: UzConverter.toLatin,
    newlatin: UzConverter.toNewLatin
  };

  function loadState() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return;
      var s = JSON.parse(raw);
      if (s && converters[s.mode]) mode = s.mode;
      if (s && typeof s.text === 'string') input.value = s.text;
    } catch (e) { /* storage may be unavailable */ }
  }

  function saveState() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ mode: mode, text: input.value }));
    } catch (e) { /* ignore */ }
  }

  function setActiveButton() {
    modeButtons.forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-mode') === mode);
    });
  }

  function convert() {
    output.value = input.value ? converters[mode](input.value) : '';
    saveState();
  }

  function flash(msg) {
    statusEl.textContent = msg;
    if (statusTimer) clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { statusEl.textContent = ''; }, 1500);
  }

  modeButtons.forEach(function (b) {
    b.addEventListener('click', function () {
      mode = b.getAttribute('data-mode');
      setActiveButton();
      convert();
    });
  });

  input.addEventListener('input', convert);

  copyBtn.addEventListener('click', function () {
    if (!output.value) return;
    var done = function () { flash('Nusxa olindi'); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(output.value).then(done, function () {
        output.select(); document.execCommand('copy'); done();
      });
    } else {
      output.select(); document.execCommand('copy'); done();
    }
  });

  swapBtn.addEventListener('click', function () {
    if (!output.value) return;
    input.value = output.value;
    convert();
    input.focus();
  });

  clearBtn.addEventListener('click', function () {
    input.value = '';
    output.value = '';
    saveState();
    input.focus();
  });

  loadState();
  setActiveButton();
  convert();
})();
