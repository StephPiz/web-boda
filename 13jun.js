// ===== COUNTDOWN =====
// Fecha objetivo: 13 Jun 2026 12:00 (España) -> ajusta hora si quieres
// Si quieres que sea 00:00, cambia a: "2026-06-13T00:00:00"
const TARGET_DATE = new Date("2026-06-13T12:00:00");

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

  el.textContent = `${days}D ${pad(hours)}:${pad(mins)}:${pad(secs)}`;
}

setInterval(updateCountdown, 1000);
updateCountdown();


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

  // Por ahora (sin Google Forms): solo confirma
  if (form){
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("¡Gracias! RSVP recibido 💛");
      form.reset();
      closeModal();
    });
  }
});
