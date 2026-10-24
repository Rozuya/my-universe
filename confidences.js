(() => {
  const status = document.getElementById('confidence-status');
  const safeGet = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const safeSet = (key, value) => { try { localStorage.setItem(key, value); return true; } catch { return false; } };
  document.querySelectorAll('.accordion-trigger').forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      if (panel) panel.hidden = expanded;
      const symbol = button.querySelector('.accordion-symbol');
      if (symbol) symbol.textContent = expanded ? '＋' : '−';
    });
  });
  document.querySelectorAll('[data-storage-key]').forEach(field => {
    const key = field.dataset.storageKey;
    const saved = safeGet(key);
    if (saved !== null) {
      if (field.isContentEditable) field.innerHTML = saved;
      else field.value = saved;
    }
    const save = () => {
      const value = field.isContentEditable ? field.innerHTML : field.value;
      const ok = safeSet(key, value);
      if (status) status.textContent = ok ? 'Modifications enregistrées dans ce navigateur.' : 'La sauvegarde locale est indisponible dans ce navigateur. Copie tes changements ailleurs avant de quitter cette page.';
    };
    field.addEventListener(field.isContentEditable ? 'input' : 'input', save);
    if (field.isContentEditable) field.addEventListener('paste', event => {
      // Paste as plain text to avoid inserting external markup into the editable area.
      event.preventDefault();
      const text = event.clipboardData?.getData('text/plain') || '';
      document.execCommand('insertText', false, text);
    });
  });
})();
