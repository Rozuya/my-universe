(() => {
  const trigger = document.getElementById('envelope-button');
  const paper = document.getElementById('letter-paper');
  const close = document.getElementById('letter-close');
  if (!trigger || !paper) return;
  const openLetter = () => {
    if (!paper.hidden) return;
    trigger.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    trigger.querySelector('.envelope-prompt').textContent = 'La lettre est ouverte';
    window.setTimeout(() => {
      paper.hidden = false;
      paper.focus({ preventScroll: true });
      paper.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 420);
  };
  const closeLetter = () => {
    paper.hidden = true;
    trigger.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.querySelector('.envelope-prompt').textContent = "Clique sur l'enveloppe pour l'ouvrir";
    trigger.focus();
  };
  trigger.addEventListener('click', openLetter);
  trigger.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openLetter(); }
  });
  close?.addEventListener('click', closeLetter);
})();
