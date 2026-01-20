// ===== COUNTDOWN =====
// Fecha objetivo: 13 Jun 2026 12:00 (España) -> ajusta hora si quieres
// Si quieres que sea 00:00, cambia a: "2026-06-13T00:00:00"
const TARGET_DATE = new Date("2026-06-13T12:00:00");

function qs(key) {
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
}

let lang = "es";
let guestName = "";
let ui = {
  countdown_day_suffix: "D",
  rsvp_alert_success: "¡Gracias! 💛 Hemos recibido tu confirmación.",
};

function pad(n){ return String(n).padStart(2, "0"); }

function updateCountdown(){
  const now = new Date();
  let diff = TARGET_DATE - now;

  const el = document.getElementById("countdown");
  if (!el) return;

  if (diff <= 0){
    el.textContent = "0D 00:00:00";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const dayLabel = (ui && ui.countdown_day_suffix) || "D";
  el.textContent = `${days}${dayLabel} ${pad(hours)}:${pad(mins)}:${pad(secs)}`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

const I18N = {
  es: {
    page_title: "13 JUN – Cuenta regresiva",
    back_invite: "← Inicio",
    rsvp_button: "RSVP",
    hero_alt: "Foto fondo",
    names_alt: "Stephany y Alessandro",
    rsvp_close_aria: "Cerrar",
    rsvp_subtitle: "Confírmanos tu asistencia antes del <b>10 de Mayo 2026</b>.",
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
    rsvp_alert_success: "¡Gracias! 💛 Hemos recibido tu confirmación.",
    countdown_day_suffix: "D",
  },
  it: {
    page_title: "13 GIU – Conto alla rovescia",
    back_invite: "← Inizio",
    rsvp_button: "RSVP",
    hero_alt: "Foto di sfondo",
    names_alt: "Stephany e Alessandro",
    rsvp_close_aria: "Chiudi",
    rsvp_subtitle: "Conferma la tua partecipazione entro il <b>10 maggio 2026</b>.",
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
    rsvp_alert_success: "Grazie! 💛 Abbiamo ricevuto la tua conferma.",
    countdown_day_suffix: "G",
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
  ui = I18N[lang] || I18N.es;

  document.documentElement.lang = lang;
  if (ui.page_title) document.title = ui.page_title;
  applyI18n(ui);

  const back = document.getElementById("backToInvite");
  if (back) {
    const inviteUrl = new URL("invitation.html", window.location.href);
    inviteUrl.searchParams.set("lang", lang);
    if (guestName) inviteUrl.searchParams.set("name", guestName);
    back.href = inviteUrl.toString();
  }
});

// ===== RSVP MODAL =====
document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openRsvp");
  const modal = document.getElementById("rsvpModal");
  const form = document.getElementById("rsvpForm");

  if (!modal) return;

  function openModal(){
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal(){
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (openBtn){
    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target?.dataset?.close === "true") closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  if (form){
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
  }
});
