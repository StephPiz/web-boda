let lang = 'es';
let guestName = '';

const T = {
  es: {
    langTitle: 'Selecciona idioma',
    langHint: 'Luego te pediremos un código (nombre).',
    codeTitle: 'Coloca tu código',
    codeHint: '* Utiliza el código que te enviamos por WhatsApp.',
    enter: 'Entrar',
    viewInvite: 'Ver invitación',
    invalid: 'Código incorrecto. Revisa tu invitación.',
    singular: (name) => `${name}, estás cordialmente invitado a nuestra boda`,
    plural:   (name) => `${name}, están cordialmente invitados a nuestra boda`,
  },
  it: {
    langTitle: 'Scegli la lingua',
    langHint: 'Poi ti chiederemo un codice (nome).',
    codeTitle: 'Inserisci il codice',
    codeHint: '*Utilizza il codice che ti abbiamo inviato tramite WhatsApp.',
    enter: 'Entra',
    viewInvite: 'Vedi invito',
    invalid: 'Codice non valido. Controlla il tuo invito.',
    singular: (name) => `${name}, sei cordialmente invitato al nostro matrimonio`,
    plural:   (name) => `${name}, siete cordialmente invitati al nostro matrimonio`,
  }
};

function norm(s){
  return (s || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

function containsToken(s, token){
  const n = ` ${norm(s)} `;
  return n.includes(` ${token} `);
}

function autoLangFromText(text){
  // Si contiene " e " => italiano
  if (containsToken(text, 'e')) return 'it';
  // Si contiene " y " => español
  if (containsToken(text, 'y')) return 'es';
  // si no, deja el idioma elegido antes
  return lang;
}

function setLang(l){
  lang = l;

  document.getElementById('langTitle').textContent = T[lang].langTitle;
  document.getElementById('langHint').textContent  = T[lang].langHint;
  document.getElementById('codeTitle').textContent = T[lang].codeTitle;
  document.getElementById('codeHint').textContent  = T[lang].codeHint;
  document.getElementById('enterBtn').textContent  = T[lang].enter;

  const err = document.getElementById('codeError');
  if(err) err.textContent = '';

  document.getElementById('lang-screen').classList.remove('active');
  document.getElementById('code-screen').classList.add('active');
}

function isPlural(name){
  return containsToken(name, 'y') || containsToken(name, 'e');
}

function findCode(input){
  if(typeof CODES === 'undefined') return null;
  const n = norm(input);
  return CODES.find(item => norm(item.code) === n) || null;
}

function submitCode(){
  const raw = document.getElementById('codeInput').value;
  const input = raw.trim();
  if(!input) return;

  const err = document.getElementById('codeError');
  if(err) err.textContent = '';

  const found = findCode(input);
  if(!found){
    if(err) err.textContent = T[lang].invalid;
    return;
  }

  //xd

  guestName = found.name;

  // ✅ idioma automático según " e " o " y "
  lang = autoLangFromText(found.code) || autoLangFromText(guestName) || lang;

  const plural = isPlural(found.code) || isPlural(guestName);
  const line = plural ? T[lang].plural(guestName) : T[lang].singular(guestName);

  // Oculta pantallas
  document.getElementById('code-screen').classList.remove('active');
  document.getElementById('code-screen').style.display = 'none';
  document.getElementById('lang-screen').style.display = 'none';

  // Muestra landing
  document.getElementById('page').classList.remove('hidden');

  document.getElementById('heroText').textContent = line;
  document.getElementById('heroBtn').textContent = T[lang].viewInvite;

  window.scrollTo({ top: 0, behavior: 'instant' });
}

function goToInvitationPage(){
  const url = new URL('invitation.html', window.location.href);
  url.searchParams.set('lang', lang);
  if(guestName) url.searchParams.set('name', guestName);
  window.location.href = url.toString();
}

window.addEventListener('load', () => {
  const input = document.getElementById('codeInput');
  if(input){
    input.addEventListener('keydown', (e) => {
      if(e.key === 'Enter') submitCode();
    });
  }
});


/* =========================================================
   BOLOCHO: Drag en DESKTOP (mobile no)
   - arrastras dentro del banner
========================================================= */
(() => {
  const isDesktop = window.matchMedia("(min-width: 769px)").matches;
  if (!isDesktop) return;

  const hero = document.querySelector(".bolo-hero");
  const items = document.querySelectorAll(".bolo-hero .bolo-item");
  if (!hero || !items.length) return;

  const heroRect = () => hero.getBoundingClientRect();

  items.forEach((el) => {
    // init offsets
    el.style.setProperty("--dx", "0px");
    el.style.setProperty("--dy", "0px");

    let startX = 0, startY = 0;
    let startDx = 0, startDy = 0;
    let elRect0;

    const getPx = (v) => parseFloat(String(v).replace("px","")) || 0;

    el.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      el.setPointerCapture(e.pointerId);

      startX = e.clientX;
      startY = e.clientY;

      startDx = getPx(getComputedStyle(el).getPropertyValue("--dx"));
      startDy = getPx(getComputedStyle(el).getPropertyValue("--dy"));

      // rect del elemento al inicio (para clamps)
      elRect0 = el.getBoundingClientRect();

      const onMove = (ev) => {
        const hr = heroRect();

        let dx = startDx + (ev.clientX - startX);
        let dy = startDy + (ev.clientY - startY);

        // Clamp para que NO salga del banner (se queda dentro)
        // (si quieres que se pueda ir fuera y desaparecer, te lo cambio luego)
        const minDx = startDx + (hr.left - elRect0.left);
        const maxDx = startDx + (hr.right - elRect0.right);
        const minDy = startDy + (hr.top - elRect0.top);
        const maxDy = startDy + (hr.bottom - elRect0.bottom);

        dx = Math.max(minDx, Math.min(maxDx, dx));
        dy = Math.max(minDy, Math.min(maxDy, dy));

        el.style.setProperty("--dx", `${dx}px`);
        el.style.setProperty("--dy", `${dy}px`);
      };

      const onUp = (ev) => {
        el.releasePointerCapture(ev.pointerId);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    });
  });
})();
