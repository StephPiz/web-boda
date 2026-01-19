// invitation.js (COMPLETO)

function qs(key) {
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setHref(id, value) {
  const el = document.getElementById(id);
  if (el) el.setAttribute("href", value);
}

let lang = "es";
let guestName = "";

const T = {
  es: {
    back: "← Volver",
    menu: {
      inicio: "Inicio",
      fecha: "Fecha",
      detalles: "Detalles",
      direccion: "Dirección",
      itinerario: "Itinerario",
      musica: "Musica",
      fotos: "Fotos",
      faq: "FAQ",
      rsvp: "RSVP",
    },
    heroTitle: (name) => (name ? `Hola ${name}` : "Bienvenidos"),
    moreBtn: "Ver más",
    // títulos ejemplo para secciones (los podrás cambiar)
    section: {
      fecha: "Fecha",
      detalles: "Detalles",
      direccion: "Dirección",
      itinerario: "Itinerario",
      musica: "Música",
      fotos: "Fotos",
      faq: "FAQ",
      rsvp: "RSVP",
    },
  },

  it: {
    back: "← Indietro",
    menu: {
      inicio: "Inizio",
      fecha: "Data",
      detalles: "Dettagli",
      direccion: "Indirizzo",
      itinerario: "Programma",
      musica: "Musica",
      fotos: "Foto",
      faq: "FAQ",
      rsvp: "RSVP",
    },
    heroTitle: (name) => (name ? `Ciao ${name}` : "Benvenuti"),
    moreBtn: "Vedi di più",
    section: {
      fecha: "Data",
      detalles: "Dettagli",
      direccion: "Indirizzo",
      itinerario: "Programma",
      musica: "Musica",
      fotos: "Foto",
      faq: "FAQ",
      rsvp: "RSVP",
    },
  },
};

window.addEventListener("load", () => {
  lang = (qs("lang") || "es").toLowerCase();
  guestName = qs("name") || "";
  const t = T[lang] || T.es;

  // --------- Botón volver (a index.html manteniendo params)
  const backUrl = new URL("index.html", window.location.href);
  backUrl.searchParams.set("lang", lang);
  if (guestName) backUrl.searchParams.set("name", guestName);

  const backBtn = document.getElementById("backBtn");
  if (backBtn) {
    backBtn.textContent = t.back;
    backBtn.addEventListener("click", () => {
      window.location.href = backUrl.toString();
    });
  }

  // --------- Menú
  setText("navInicio", t.menu.inicio);
  setText("navFecha", t.menu.fecha);
  setText("navDetalles", t.menu.detalles);
  setText("navDireccion", t.menu.direccion);
  setText("navItinerario", t.menu.itinerario);
  setText("navMusica", t.menu.musica);
  setText("navFotos", t.menu.fotos);
  setText("navFaq", t.menu.faq);
  setText("navRsvp", t.menu.rsvp);

  // --------- Links del menú (anclas a secciones)
  setHref("navInicioLink", "#inicio");
  setHref("navFechaLink", "#fecha");
  setHref("navDetallesLink", "#detalles");
  setHref("navDireccionLink", "#direccion");
  setHref("navItinerarioLink", "#itinerario");
  setHref("navMusicaLink", "#musica");
  setHref("navFotosLink", "#fotos");
  setHref("navFaqLink", "#faq");
  setHref("navRsvpLink", "#rsvp");

  // --------- (Opcional) título / saludo / texto con el nombre
  // Si tienes un elemento con id="guestName", lo rellenamos:
  setText("guestName", guestName);

  // Si tienes un elemento con id="heroTitle" (opcional):
  setText("heroTitle", t.heroTitle(guestName));

  // --------- Botón "Ver más / Vedi di più"
  setText("moreBtn", t.moreBtn);

  // --------- Títulos de secciones (si los usas)
  setText("secFechaTitle", t.section.fecha);
  setText("secDetallesTitle", t.section.detalles);
  setText("secDireccionTitle", t.section.direccion);
  setText("secItinerarioTitle", t.section.itinerario);
  setText("secMusicaTitle", t.section.musica);
  setText("secFotosTitle", t.section.fotos);
  setText("secFaqTitle", t.section.faq);
  setText("secRsvpTitle", t.section.rsvp);
});

function addToCalendar(){
  // iOS (iPhone/iPad) -> ICS
  const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if(isiOS){
    window.location.href = 'assets/save.ics';
    return;
  }

  // Google Calendar (Android / desktop)
  // 13 Jun 2026 11:30 en España = 09:30 UTC (porque es CEST, UTC+2)
  // Fin 13:00 España = 11:00 UTC
  const url =
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    '&text=' + encodeURIComponent('Matrimonio Stephany y Alessandro') +
    '&dates=20260613T093000Z/20260613T110000Z' +
    '&details=' + encodeURIComponent('¡Reserva la fecha! Te esperamos para celebrar juntos. Ceremonia: Catedral de Segovia.') +
    '&location=' + encodeURIComponent('Catedral de Segovia');

  window.open(url, '_blank', 'noopener');
}

// =========================
// INVITATION.JS
// - Idioma (si lo usas)
// - RSVP modal
// - Envío a Google Forms
// =========================

// ---------- RSVP MODAL ----------
document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openRsvp");
  const modal = document.getElementById("rsvpModal");
  const form = document.getElementById("rsvpForm");

  if (!modal) return;

  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // abrir modal
  if (openBtn) {
    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  }

  // cerrar por backdrop o X
  modal.addEventListener("click", (e) => {
    if (e.target?.dataset?.close === "true") closeModal();
  });

  // cerrar con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  // ---------- ENVÍO GOOGLE FORMS (POST formResponse) ----------
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const attendance = form.querySelector('[name="attendance"]').value.trim();
    const diet = form.querySelector('[name="diet"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    // URL correcta para enviar respuestas:
    const googleFormURL =
      "https://docs.google.com/forms/d/e/1FAIpQLSeqXOMdN2yYAvtjHspbOrj5HdDImgDWqViJSf9DFqoNIDdQWQ/formResponse";

    const formData = new FormData();
    formData.append("entry.975976503", name);
    formData.append("entry.921828906", attendance);
    formData.append("entry.680500779", diet);
    formData.append("entry.1650746140", message);

    try {
      await fetch(googleFormURL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      alert("¡Gracias! 💛 Hemos recibido tu confirmación.");
      form.reset();
      closeModal();
    } catch (err) {
      alert("Ups, hubo un problema. Intenta nuevamente.");
    }
  });
});

// Pasar lang/name a links que van a faq.html#...
document.querySelectorAll('a[href^="faq.html#"]').forEach(a => {
  const href = a.getAttribute("href"); // ej: faq.html#aeropuerto
  const u = new URL(href, window.location.href);
  u.searchParams.set("lang", lang);
  if (guestName) u.searchParams.set("name", guestName);
  a.setAttribute("href", u.toString());
});
