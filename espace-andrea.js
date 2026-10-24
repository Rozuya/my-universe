(() => {
  const title = document.getElementById('message-title');
  const body = document.getElementById('message-body');
  const canvas = document.getElementById('message-canvas');
  const placeholder = document.getElementById('preview-placeholder');
  const download = document.getElementById('download-image');
  const status = document.getElementById('space-status');
  const count = document.getElementById('char-count');
  const splitNote = document.getElementById('image-split-note');
  if (!title || !body || !canvas || !download) return;
  const ctx = canvas.getContext('2d');
  let generated = false;
  const get = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const set = (key, value) => { try { localStorage.setItem(key, value); return true; } catch { return false; } };
  const announce = message => { if (status) status.textContent = message; };
  const updateCount = () => { const n = body.value.length; count.textContent = `${n.toLocaleString('fr-FR')} caractère${n > 1 ? 's' : ''}`; };
  title.value = get('andrea-space-title') ?? '';
  body.value = get('andrea-space-body') ?? '';
  updateCount();
  const saveDraft = (quiet = false) => {
    const a = set('andrea-space-title', title.value);
    const b = set('andrea-space-body', body.value);
    if (!quiet) announce(a && b ? 'Brouillon enregistré sur cet appareil.' : 'Le navigateur ne permet pas la sauvegarde locale. Copie ton texte pour ne pas le perdre.');
    return a && b;
  };
  title.addEventListener('input', () => { saveDraft(true); generated = false; download.disabled = true; updateCount(); });
  body.addEventListener('input', () => { saveDraft(true); generated = false; download.disabled = true; updateCount(); });
  document.getElementById('save-draft').addEventListener('click', () => saveDraft());
  document.getElementById('clear-draft').addEventListener('click', () => {
    if (!window.confirm('Effacer le brouillon enregistré et vider les deux champs sur cet appareil ? Cette action ne peut pas être annulée.')) return;
    title.value = ''; body.value = '';
    try { localStorage.removeItem('andrea-space-title'); localStorage.removeItem('andrea-space-body'); } catch {}
    generated = false; download.disabled = true; canvas.hidden = true; placeholder.hidden = false;
    if (splitNote) { splitNote.hidden = true; splitNote.textContent = ''; }
    updateCount(); announce('Le brouillon a été effacé de ce navigateur.');
  });
  document.getElementById('copy-text').addEventListener('click', async () => {
    const text = `${title.value.trim() ? title.value.trim() + '\n\n' : ''}${body.value}`;
    if (!text.trim()) { announce('Écris quelque chose avant de copier le texte.'); return; }
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
      else {
        const temp = document.createElement('textarea'); temp.value = text; temp.style.position = 'fixed'; temp.style.opacity = '0'; document.body.appendChild(temp); temp.select();
        const ok = document.execCommand('copy'); temp.remove(); if (!ok) throw new Error('copy failed');
      }
      announce('Le texte a été copié.');
    } catch { announce('La copie automatique a échoué. Sélectionne le texte et copie-le manuellement.'); }
  });
  const roundedRect = (c, x, y, w, h, r) => { c.beginPath(); c.moveTo(x+r,y); c.arcTo(x+w,y,x+w,y+h,r); c.arcTo(x+w,y+h,x,y+h,r); c.arcTo(x,y+h,x,y,r); c.arcTo(x,y,x+w,y,r); c.closePath(); };
  const wrapText = (context, text, maxWidth) => {
    const lines = [];
    for (const paragraph of text.split('\n')) {
      if (paragraph === '') { lines.push(''); continue; }
      const words = paragraph.split(/\s+/); let line = '';
      for (const word of words) {
        if (context.measureText(word).width > maxWidth) {
          if (line) { lines.push(line); line = ''; }
          let chunk = '';
          for (const char of word) { if (context.measureText(chunk + char).width > maxWidth && chunk) { lines.push(chunk); chunk = char; } else chunk += char; }
          line = chunk; continue;
        }
        const test = line ? `${line} ${word}` : word;
        if (context.measureText(test).width > maxWidth && line) { lines.push(line); line = word; } else line = test;
      }
      if (line) lines.push(line);
    }
    return lines;
  };
  const drawStars = (c, w, h) => {
    // Deterministic positions ensure the preview and download match exactly.
    for (let i = 0; i < 48; i++) {
      const x = ((i * 97 + 29) % 997) / 997 * w;
      const y = ((i * 173 + 41) % 991) / 991 * h;
      c.beginPath(); c.arc(x, y, i % 9 === 0 ? 2.2 : 1.1, 0, Math.PI * 2);
      c.fillStyle = i % 3 === 0 ? 'rgba(222,214,255,.72)' : 'rgba(182,170,255,.43)'; c.fill();
    }
  };
  const generate = () => {
    const message = body.value.trim(); const heading = title.value.trim();
    if (!message) { announce('Écris un message avant de créer ton image.'); body.focus(); return; }
    const W = 1000, padX = 86, padTop = 100, padBottom = 84, maxTextW = W - padX * 2;
    const c = ctx; c.font = '32px "DM Sans", Arial, sans-serif';
    const lines = wrapText(c, message, maxTextW);
    const titleLines = heading ? wrapText(c, heading, maxTextW) : [];
    const titleLineH = 47, bodyLineH = 49, gap = heading ? 38 : 8;
    const contentH = titleLines.length * titleLineH + gap + lines.length * bodyLineH;
    const H = Math.max(650, padTop + contentH + padBottom + 44);
    canvas.width = W; canvas.height = H;
    const grad = c.createLinearGradient(0, 0, W, H); grad.addColorStop(0, '#19143d'); grad.addColorStop(.52, '#292054'); grad.addColorStop(1, '#11102f');
    c.fillStyle = grad; c.fillRect(0,0,W,H);
    const glow = c.createRadialGradient(W*.82,H*.12,10,W*.82,H*.12,Math.max(W,H)*.65); glow.addColorStop(0,'rgba(165,143,255,.22)'); glow.addColorStop(1,'rgba(165,143,255,0)'); c.fillStyle=glow;c.fillRect(0,0,W,H);
    drawStars(c,W,H);
    c.strokeStyle='rgba(218,208,255,.45)';c.lineWidth=2;roundedRect(c,30,30,W-60,H-60,25);c.stroke();
    c.strokeStyle='rgba(218,208,255,.18)';c.lineWidth=1;roundedRect(c,43,43,W-86,H-86,19);c.stroke();
    c.fillStyle='#d8ceff';c.font='34px Georgia, serif';c.textAlign='center';c.fillText('✦',W/2,78);
    let y = padTop + 26;
    if (heading) {
      c.fillStyle='#e8e0ff'; c.font='600 39px "Playfair Display", Georgia, serif'; c.textAlign='center';
      for (const line of titleLines) { c.fillText(line, W/2, y, maxTextW); y += titleLineH; }
      y += gap;
    } else y += 0;
    c.strokeStyle='rgba(201,187,255,.48)';c.lineWidth=1;c.beginPath();c.moveTo(W/2-45,y-14);c.lineTo(W/2+45,y-14);c.stroke();
    c.fillStyle='#f8f5ff';c.font='32px "DM Sans", Arial, sans-serif';c.textAlign='center';
    for (const line of lines) { c.fillText(line, W/2, y+28, maxTextW); y += bodyLineH; }
    c.fillStyle='rgba(213,202,255,.72)';c.font='24px Georgia, serif';c.fillText('☾',W/2,H-63);
    canvas.hidden = false; placeholder.hidden = true; download.disabled = false; generated = true;
    if (splitNote) { splitNote.hidden = false; splitNote.textContent = H > 2400 ? `Ton message est long : l'image fait ${H}px de haut pour préserver le texte. Si elle est trop grande pour être pratique, raccourcis le message puis crée une nouvelle image.` : `Image générée en ${W} × ${H} px. Tout le texte est conservé dans une seule image.`; }
    announce('Aperçu créé. Tu peux télécharger le PNG quand tu veux.');
  };
  document.getElementById('create-image').addEventListener('click', generate);
  download.addEventListener('click', () => {
    if (!generated) { announce('Crée d’abord l’image pour pouvoir la télécharger.'); return; }
    try {
      canvas.toBlob(blob => {
        if (!blob) { announce('Impossible de créer le fichier PNG dans ce navigateur. Essaie de nouveau.'); return; }
        const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'message-pour-yaya.png'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
        announce('Téléchargement du PNG lancé. Ouvre ensuite Discord et joins l’image toi-même.');
      }, 'image/png');
    } catch { announce('Le téléchargement a échoué. Essaie un autre navigateur ou enregistre le texte séparément.'); }
  });
})();
