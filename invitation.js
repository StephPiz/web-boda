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

function updateParamLinks(selector) {
  document.querySelectorAll(selector).forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;
    const u = new URL(href, window.location.href);
    u.searchParams.set("lang", lang);
    if (guestName) u.searchParams.set("name", guestName);
    a.setAttribute("href", u.toString());
  });
}

function updateFaqLinks() {
  const target = lang === "it" ? "faq-it.html" : "faq.html";
  document.querySelectorAll("[data-faq-link]").forEach((a) => {
    const href = a.getAttribute("href") || "";
    const hashIndex = href.indexOf("#");
    const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
    const u = new URL(target + hash, window.location.href);
    u.searchParams.set("lang", lang);
    if (guestName) u.searchParams.set("name", guestName);
    a.setAttribute("href", u.toString());
  });
}

function goToHistoria() {
  const target = lang === "it" ? "historia-it.html" : "historia.html";
  const url = new URL(target, window.location.href);
  url.searchParams.set("lang", lang);
  if (guestName) url.searchParams.set("name", guestName);
  window.location.href = url.toString();
}

let lang = "es";
let guestName = "";
let ui = null;

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

const I18N = {
  es: {
    page_title: "Invitación",
    nav_inicio: "Inicio",
    nav_fecha: "Fecha",
    nav_detalles: "Detalles",
    nav_musica: "Música",
    nav_faq: "FAQ",
    nav_13jun: "13 JUN",
    nav_rsvp: "RSVP",
    intro_text:
      "Después de muchas mudanzas, un perro adoptado, dos culturas, varios cafés y un amanecer inolvidable en Venecia… ¡decidimos decir Sí a esta vida juntos!",
    intro_more: "Ver más",
    date_month: "JUNIO",
    date_day_l: "L",
    date_day_m: "M",
    date_day_x: "X",
    date_day_j: "J",
    date_day_v: "V",
    date_day_s: "S",
    date_day_d: "D",
    heart_alt: "Corazón",
    save_date_alt: "Save the date",
    cathedral_alt: "Catedral de Segovia",
    details_ceremony_title: "Ceremonia",
    ceremony_time: "<b>HORA:</b> 12:00 (llegar 30 min antes)",
    ceremony_place: "<b>LUGAR:</b> Catedral de Segovia",
    details_map: "Ver mapa",
    details_celebration_title: "Celebración",
    celebration_cocktail: "<b>HORA:</b> 14:00",
    celebration_banquet: "<b>BANQUETE:</b> 15:00",
    celebration_place: "<b>LUGAR:</b> Zibá José María Eventos",
    dance_alt: "Baile",
    dress_title: "DRESS CODE",
    dress_alt: "Dress Code",
    music_title: "MUSIC",
    music_sub: "que nos une",
    music_text:
      "En nuestra boda se unen dos culturas, la italiana y la peruana. La música será el punto de encuentro, por eso hemos preparado una playlist con canciones italianas, peruanas, latinas e internacionales. La idea es que te sientas cómodo y disfrutes este momento con nosotros desde el inicio.",
    spotify_open_app: "Abrir app",
    music_banner_alt: "Recuerdos de viaje",
    gift_title: "Un detalle",
    gift_intro:
      "No tenemos lista de regalos. Si deseas acompañarnos con un detalle, puedes hacerlo mediante transferencia bancaria.",
    gift_beneficiary: "Beneficiario",
    gift_beneficiary_value:
      "NOMBRE: Alessandro Albanese<br>APELLIDO: Stephany Pizan",
    gift_bank: "Banco",
    gift_corr: "BIC banco corresponsal",
    faq_title: "FAQ",
    faq_more: "Ver más",
    faq_airport_q: "Vengo desde el Aeropuerto de Madrid",
    faq_airport_a:
      "Si llegas al Aeropuerto de Madrid-Barajas (MAD), queremos ayudarte a que el trayecto hasta Segovia sea lo más simple posible. Sabemos que muchos vienen desde Italia, quizás es la primera vez en Madrid o llegan cansados después del vuelo, así que aquí explicamos todas las opciones con tiempos, precios y detalles prácticos.",
    faq_madrid_q: "Vengo desde Madrid",
    faq_madrid_a:
      "Si ya te encuentras en Madrid (porque llegaste antes, te quedas unos días o vienes desde otra ciudad), estas son las formas más fáciles de llegar a Segovia desde el centro.",
    faq_rent_q: "¿Dónde puedo alquilar un auto?",
    faq_rent_a:
      "Si estás pensando en alquilar un auto, hacerlo desde el aeropuerto es la opción más fácil. Allí se concentran las principales empresas y el proceso es más simple, especialmente si llegas desde el extranjero.",
    faq_parking_q: "Parkings en Segovia",
    faq_parking_a:
      "Aquí tienes la sección de parkings en Segovia con distancias aproximadas caminando hasta la Catedral y el Acueducto, tiempo aproximado caminando y en taxi, y opciones gratis o de pago, para que tus lectores en tu blog tengan toda la info clara",
    faq_stay_q: "¿Dónde alojarse en Segovia?",
    faq_stay_a:
      "Te dejamos una sección para tu blog con <b>hoteles céntricos en Segovia </b>(enlaces a Booking), qué tan cerca están de la Catedral, y el tiempo caminando / en coche (aprox.).",
    faq_rsvp_q: "¿Hasta cuándo puedo confirmar mi asistencia?",
    faq_rsvp_a:
      "Para poder organizarnos bien y coordinar todos los detalles de la boda, necesitamos que nos confirmes tu asistencia hasta el <b>10 de Mayo 2026</b>.",
    faq_gifts_q: "¿Hay lista de regalos?",
    faq_gifts_a:
      "No tenemos lista de regalos pero <b>puedes colaborar con nosotros</b>, hemos habilitado algunas opciones según el país, para que te resulte más fácil.",
    faq_reception_q: "¿Dónde será la recepción?",
    faq_reception_a:
      "La recepción se llevará a cabo en <b>ZIBA</b>, luego de la ceremonia religiosa.",
    faq_transfer_q: "¿Cómo me muevo entre la Catedral y ZIBA?",
    faq_transfer_a:
      "Ambos lugares están relativamente cerca.\nPuedes ir caminando, en taxi o en auto. En el blog encontrarás opciones de parking y tiempos aproximados.",
    faq_dress_q: "¿Cuál es el código de vestimenta?",
    faq_dress_a:
      "El código de vestimenta es formal / elegante.\n<b>Queremos que se sientan cómodos</b>, pero arreglados para celebrar juntos este día tan especial.",
    faq_plusone_q: "¿Puedo llevar acompañante?",
    faq_plusone_a:
      "La invitación es personal.\nSi tienes dudas sobre acompañantes, por favor <b>escríbenos directamente</b> y lo vemos con cariño.",
    faq_language_q: "¿Cómo sobrevivir sin hablar el mismo idioma?",
    faq_language_a:
      "Sabemos que en la boda se juntan personas que hablan español, italiano y otros idiomas, y queremos que sepas algo desde ya: <b>no hay que preocuparse</b>.",
    faq_music_q: "¿Y la Música?",
    faq_music_a:
      "<b>Hemos preparado una playlist / setlist</b> pensada con mucho cariño, mezclando canciones italianas, peruanas, latinas e internacionales. La idea es que puedas familiarizarte con el ambiente musical de la boda y sentirte cómodo desde el primer momento.",
    faq_help_q: "¿¿A quién puedo escribir si tengo dudas o problemas durante el viaje??",
    faq_help_a:
      "<b>Si en cualquier momento tienes dudas</b>, problemas con el transporte, el idioma o necesitas ayuda, estaremos en contacto y disponibles para ayudarte.",
    menu_close_aria: "Cerrar menú",
    rsvp_close_aria: "Cerrar",
    rsvp_subtitle:
      "Confírmanos tu asistencia antes del <b>10 de Mayo 2026</b>.",
    rsvp_name_label: "Nombre y apellido",
    rsvp_name_placeholder: "Ej: Laura Rossi",
    rsvp_attendance_label: "¿Asistirás?",
    rsvp_attendance_prompt: "Selecciona una opción",
    rsvp_attendance_yes: "Sí, asistiré",
    rsvp_attendance_no: "No podré asistir",
    rsvp_diet_label: "Alergias / restricciones (opcional)",
    rsvp_diet_placeholder: "Ej: sin gluten, vegetariano...",
    rsvp_message_label: "Mensaje para los novios (opcional)",
    rsvp_message_placeholder: "Escribe algo bonito…",
    rsvp_submit: "Enviar",
    rsvp_note: "Nos vemos pronto!",
    rsvp_alert_success: "¡Gracias! 💛 Hemos recibido tu confirmación.",
    calendar_title: "Matrimonio Stephany y Alessandro",
    calendar_details:
      "¡Reserva la fecha! Te esperamos para celebrar juntos. Ceremonia: Catedral de Segovia.",
    calendar_location: "Catedral de Segovia",
  },
  it: {
    page_title: "Invito",
    nav_inicio: "Inizio",
    nav_fecha: "Data",
    nav_detalles: "Dettagli",
    nav_musica: "Musica",
    nav_faq: "FAQ",
    nav_13jun: "13 GIU",
    nav_rsvp: "RSVP",
    intro_text:
      "Dopo molti traslochi, un cane adottato, due culture, tanti caffè e un'alba indimenticabile a Venezia… abbiamo deciso di dire Sì a questa vita insieme!",
    intro_more: "Vedi di più",
    date_month: "GIUGNO",
    date_day_l: "L",
    date_day_m: "M",
    date_day_x: "M",
    date_day_j: "G",
    date_day_v: "V",
    date_day_s: "S",
    date_day_d: "D",
    heart_alt: "Cuore",
    save_date_alt: "Segna la data",
    cathedral_alt: "Cattedrale di Segovia",
    details_ceremony_title: "Cerimonia",
    ceremony_time: "<b>ORA:</b> 12:00 (arrivare 30 min prima)",
    ceremony_place: "<b>LUOGO:</b> Cattedrale di Segovia",
    details_map: "Vedi mappa",
    details_celebration_title: "Celebrazione",
    celebration_cocktail: "<b>ORA:</b> 14:00",
    celebration_banquet: "<b>BANCHETTO:</b> 15:00",
    celebration_place: "<b>LUOGO:</b> Zibá José María Eventos",
    dance_alt: "Ballo",
    dress_title: "DRESS CODE",
    dress_alt: "Dress code",
    music_title: "MUSICA",
    music_sub: "che ci unisce",
    music_text:
      "Al nostro matrimonio si incontrano due culture, quella italiana e quella peruviana. La musica sarà il punto di incontro, per questo abbiamo preparato una playlist con canzoni italiane, peruviane, latine e internazionali. L'idea è che tu possa sentirti a tuo agio e goderti questo momento con noi fin dall'inizio.",
    spotify_open_app: "Apri app",
    music_banner_alt: "Ricordi di viaggio",
    gift_title: "Un pensiero",
    gift_intro:
      "Non abbiamo una lista regalo. Se vuoi accompagnarci con un pensiero, puoi farlo tramite bonifico bancario.",
    gift_beneficiary: "Beneficiario",
    gift_beneficiary_value:
      "NOME: Alessandro Albanese<br>COGNOME: Stephany Pizan",
    gift_bank: "Banca",
    gift_corr: "BIC banca corrispondente",
    faq_title: "FAQ",
    faq_more: "Vedi di più",
    faq_airport_q: "Arrivo dall'Aeroporto di Madrid",
    faq_airport_a:
      "Se arrivi all'Aeroporto di Madrid-Barajas (MAD), vogliamo aiutarti a rendere il tragitto fino a Segovia il più semplice possibile. Sappiamo che molti arrivano dall'Italia, forse è la prima volta a Madrid o arrivano stanchi dopo il volo, quindi qui spieghiamo tutte le opzioni con tempi, prezzi e dettagli pratici.",
    faq_madrid_q: "Arrivo da Madrid",
    faq_madrid_a:
      "Se ti trovi già a Madrid (perché sei arrivato prima, ti fermi qualche giorno o vieni da un'altra città), queste sono le opzioni più semplici per raggiungere Segovia dal centro.",
    faq_rent_q: "Dove posso noleggiare un'auto?",
    faq_rent_a:
      "Se stai pensando di noleggiare un'auto, farlo dall'aeroporto è l'opzione più semplice. Lì si concentrano le principali compagnie e il processo è più rapido, soprattutto se arrivi dall'estero.",
    faq_parking_q: "Parcheggi a Segovia",
    faq_parking_a:
      "Qui trovi la sezione sui parcheggi a Segovia con distanze approssimative a piedi fino alla Cattedrale e all'Acquedotto, tempi indicativi a piedi e in taxi, e opzioni gratuite o a pagamento, così avrai tutte le informazioni chiare.",
    faq_stay_q: "Dove alloggiare a Segovia?",
    faq_stay_a:
      "Ti lasciamo una sezione per il tuo blog con <b>hotel centrali a Segovia</b> (link a Booking), quanto sono vicini alla Cattedrale e i tempi a piedi / in auto (circa).",
    faq_rsvp_q: "Entro quando posso confermare la mia presenza?",
    faq_rsvp_a:
      "Per organizzarci al meglio e coordinare tutti i dettagli del matrimonio, abbiamo bisogno che tu confermi la tua presenza entro il <b>10 maggio 2026</b>.",
    faq_gifts_q: "C'è una lista regali?",
    faq_gifts_a:
      "Non abbiamo una lista regali ma <b>puoi contribuire con noi</b>; abbiamo attivato alcune opzioni in base al Paese, per renderti tutto più semplice.",
    faq_reception_q: "Dove sarà il ricevimento?",
    faq_reception_a:
      "Il ricevimento si terrà a <b>ZIBA</b>, dopo la cerimonia religiosa.",
    faq_transfer_q: "Come mi sposto tra la Cattedrale e ZIBA?",
    faq_transfer_a:
      "Entrambi i luoghi sono relativamente vicini.\nPuoi andare a piedi, in taxi o in auto. Nel blog troverai opzioni di parcheggio e tempi indicativi.",
    faq_dress_q: "Qual è il dress code?",
    faq_dress_a:
      "Il dress code è formale / elegante.\n<b>Vogliamo che vi sentiate a vostro agio</b>, ma curati per celebrare insieme questa giornata speciale.",
    faq_plusone_q: "Posso portare un accompagnatore?",
    faq_plusone_a:
      "L'invito è personale.\nSe hai dubbi sugli accompagnatori, per favore <b>scrivici direttamente</b> e lo vediamo con calma.",
    faq_language_q: "Come sopravvivere senza parlare la stessa lingua?",
    faq_language_a:
      "Sappiamo che al matrimonio si incontrano persone che parlano spagnolo, italiano e altre lingue, e vogliamo che tu lo sappia fin da subito: <b>non c'è da preoccuparsi</b>.",
    faq_music_q: "E la Musica?",
    faq_music_a:
      "<b>Abbiamo preparato una playlist / setlist</b> con tanto affetto, mescolando canzoni italiane, peruviane, latine e internazionali. L'idea è che tu possa familiarizzare con l'atmosfera musicale del matrimonio e sentirti a tuo agio fin dal primo momento.",
    faq_help_q: "A chi posso scrivere se ho dubbi o problemi durante il viaggio?",
    faq_help_a:
      "<b>Se in qualsiasi momento hai dubbi</b>, problemi con il trasporto, la lingua o hai bisogno di aiuto, saremo in contatto e disponibili ad aiutarti.",
    menu_close_aria: "Chiudi menu",
    rsvp_close_aria: "Chiudi",
    rsvp_subtitle:
      "Conferma la tua partecipazione entro il <b>10 maggio 2026</b>.",
    rsvp_name_label: "Nome e cognome",
    rsvp_name_placeholder: "Es: Laura Rossi",
    rsvp_attendance_label: "Parteciperai?",
    rsvp_attendance_prompt: "Seleziona un'opzione",
    rsvp_attendance_yes: "Sì, parteciperò",
    rsvp_attendance_no: "Non potrò partecipare",
    rsvp_diet_label: "Allergie / restrizioni (opzionale)",
    rsvp_diet_placeholder: "Es: senza glutine, vegetariano...",
    rsvp_message_label: "Messaggio per gli sposi (opzionale)",
    rsvp_message_placeholder: "Scrivi qualcosa di carino…",
    rsvp_submit: "Invia",
    rsvp_note: "A presto!",
    rsvp_alert_success: "Grazie! 💛 Abbiamo ricevuto la tua conferma.",
    calendar_title: "Matrimonio Stephany e Alessandro",
    calendar_details:
      "Segna la data! Ti aspettiamo per celebrare insieme. Cerimonia: Cattedrale di Segovia.",
    calendar_location: "Cattedrale di Segovia",
  },
};

function applyI18n(dict) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.dataset.i18nHtml;
    if (dict[key]) el.innerHTML = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (dict[key]) el.setAttribute("placeholder", dict[key]);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.dataset.i18nAria;
    if (dict[key]) el.setAttribute("aria-label", dict[key]);
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const key = el.dataset.i18nAlt;
    if (dict[key]) el.setAttribute("alt", dict[key]);
  });
}

window.addEventListener("load", () => {
  lang = (qs("lang") || "es").toLowerCase();
  guestName = qs("name") || "";
  const t = T[lang] || T.es;
  ui = I18N[lang] || I18N.es;

  document.documentElement.lang = lang;
  if (ui.page_title) document.title = ui.page_title;
  applyI18n(ui);
  updateFaqLinks();
  updateParamLinks('a[href^="13jun.html"]');
  const historyBtn = document.getElementById("historyBtn");
  if (historyBtn) {
    historyBtn.addEventListener("click", goToHistoria);
  }

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
  const ui = I18N[lang] || I18N.es;
  const url =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent(ui.calendar_title) +
    "&dates=20260613T093000Z/20260613T110000Z" +
    "&details=" + encodeURIComponent(ui.calendar_details) +
    "&location=" + encodeURIComponent(ui.calendar_location);

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
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const modal = document.getElementById("rsvpModal");
  const form = document.getElementById("rsvpForm");

  if (!modal) return;

  let closeMenu = () => {};

  if (mobileMenuBtn && mobileMenu) {
    const openMenu = () => {
      mobileMenu.classList.add("is-open");
      mobileMenu.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    closeMenu = () => {
      mobileMenu.classList.remove("is-open");
      mobileMenu.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    mobileMenuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openMenu();
    });

    mobileMenu.addEventListener("click", (e) => {
      const target = e.target;
      if (target?.dataset?.close === "true") closeMenu();
      if (target?.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) closeMenu();
    });
  }

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
  document.querySelectorAll("[data-open-rsvp]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      closeMenu();
      openModal();
    });
  });

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

  form.addEventListener("submit", () => {

    const name = form.querySelector('[name="name"]').value.trim();
    const attendance = form.querySelector('[name="attendance"]').value.trim();
    const diet = form.querySelector('[name="diet"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    const entryName = form.querySelector("#rsvpEntryName");
    const entryAttendance = form.querySelector("#rsvpEntryAttendance");
    const entryDiet = form.querySelector("#rsvpEntryDiet");
    const entryMessage = form.querySelector("#rsvpEntryMessage");

    if (entryName) entryName.value = name;
    if (entryAttendance) entryAttendance.value = attendance;
    if (entryDiet) entryDiet.value = diet;
    if (entryMessage) entryMessage.value = message;

    setTimeout(() => {
      const message = (ui && ui.rsvp_alert_success) || I18N.es.rsvp_alert_success;
      alert(message);
      form.reset();
      closeModal();
    }, 0);
  });
});

// (links con params se actualizan en window.load)

(function(){
  function initDraggableLayer(bannerSelector, layerSelector, itemSelector){
    const banner = document.querySelector(bannerSelector);
    const layer  = document.querySelector(layerSelector);
    const items = document.querySelectorAll(itemSelector);

    if (!banner || !layer || !items.length) return;

    const isDesktop = () => window.matchMedia('(min-width: 900px)').matches;

    let active = null;
    let offsetX = 0;
    let offsetY = 0;

    function rect(el){ return el.getBoundingClientRect(); }

    function onDown(e){
      if (!isDesktop()) return;

      active = e.currentTarget;
      active.setPointerCapture?.(e.pointerId);

      const r = rect(active);
      offsetX = e.clientX - r.left;
      offsetY = e.clientY - r.top;
    }

    function onMove(e){
      if (!active) return;

      const b = rect(layer);
      const x = e.clientX - b.left - offsetX + (rect(active).width / 2);
      const y = e.clientY - b.top  - offsetY + (rect(active).height / 2);

      const xp = (x / b.width) * 100;
      const yp = (y / b.height) * 100;

      active.style.setProperty('--x', xp + '%');
      active.style.setProperty('--y', yp + '%');
    }

    function onUp(){
      if (!active) return;

      const b = rect(layer);
      const r = rect(active);

      const cx = r.left + r.width / 2;
      const cy = r.top  + r.height / 2;

      const outside =
        (cx < b.left) || (cx > b.right) || (cy < b.top) || (cy > b.bottom);

      if (outside){
        active.style.opacity = '0';
        active.style.pointerEvents = 'none';
      }

      active = null;
    }

    items.forEach(item => {
      item.addEventListener('pointerdown', onDown);
    });

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }

  initDraggableLayer('.invite-hero', '.banner-stickers', '.banner-stickers .sticker');
  initDraggableLayer('.bolo-hero', '.bolo-overlay', '.bolo-overlay .bolo-item');
})();
