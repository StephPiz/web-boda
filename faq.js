function qs(key){
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
}

const I18N = {
  es: {
    page_title: "FAQ",
    back_invite: "← Inicio",
    faq_title: "FAQ",
    airport_title: "Vengo desde el Aeropuerto de Madrid",
    airport_intro:
      "Si llegas al Aeropuerto de Madrid-Barajas (MAD), queremos ayudarte a que el trayecto hasta Segovia sea lo más simple posible. Sabemos que muchos vienen desde Italia, quizás es la primera vez en Madrid o llegan cansados después del vuelo, así que aquí explicamos todas las opciones con tiempos, precios y detalles prácticos.",
    airport_opt1_title: "1. Aeropuerto → Tren (RENFE) → Segovia",
    airport_opt1_li1: "Salida desde el intercambiador / terminal (según horarios).",
    airport_opt1_li2: "Duración aproximada: 1h 20m – 1h 45m.",
    airport_opt1_li3: "Pros: directo, cómodo.",
    airport_opt1_li4: "Consejo: compra online si puedes.",
    airport_opt2_title: "Opción B: Tren (Cercanías + AVE)",
    airport_opt2_li1: "Cercanías desde el aeropuerto a Chamartín.",
    airport_opt2_li2: "AVE/Media Distancia a Segovia-Guiomar.",
    airport_opt2_li3: "Taxi/bus al centro de Segovia.",
    airport_opt3_title: "Opción C: Taxi / Uber / Cabify",
    airport_opt3_body:
      "Recomendado si llegan tarde, van con maletas pesadas o son varios.",
    airport_opt4_title: "Opción D: Alquiler de coche",
    airport_opt4_body: "Ideal si piensas moverte por Segovia y alrededores.",
    madrid_title: "Vengo desde Madrid",
    madrid_intro:
      "Si ya te encuentras en Madrid (porque llegaste antes, te quedas unos días o vienes desde otra ciudad)...",
    madrid_opt1_title: "Opción A: Tren (AVE) desde Chamartín",
    madrid_opt1_li1: "Duración: ~30 min a Segovia-Guiomar",
    madrid_opt1_li2: "Luego: taxi/bus al centro",
    madrid_opt2_title: "Opción B: Bus desde Moncloa",
    madrid_opt2_li1: "Duración: 1h 20m – 1h 45m",
    madrid_opt2_li2: "Muy práctico si estás cerca de Moncloa",
    madrid_opt3_title: "Opción C: Coche",
    madrid_opt3_body: "Madrid → Segovia suele ser ~1h 15m (depende tráfico).",
  },
  it: {
    page_title: "FAQ",
    back_invite: "← Inizio",
    faq_title: "FAQ",
    airport_title: "Arrivo dall'Aeroporto di Madrid",
    airport_intro:
      "Se arrivi all'Aeroporto di Madrid-Barajas (MAD), vogliamo aiutarti a rendere il tragitto fino a Segovia il più semplice possibile. Sappiamo che molti arrivano dall'Italia, forse è la prima volta a Madrid o arrivano stanchi dopo il volo, quindi qui spieghiamo tutte le opzioni con tempi, prezzi e dettagli pratici.",
    airport_opt1_title: "1. Aeroporto → Treno (RENFE) → Segovia",
    airport_opt1_li1: "Partenza dall'intercambiador / terminal (in base agli orari).",
    airport_opt1_li2: "Durata approssimativa: 1h 20m – 1h 45m.",
    airport_opt1_li3: "Pro: diretto, comodo.",
    airport_opt1_li4: "Consiglio: acquista online se puoi.",
    airport_opt2_title: "Opzione B: Treno (Cercanías + AVE)",
    airport_opt2_li1: "Cercanías dall'aeroporto a Chamartín.",
    airport_opt2_li2: "AVE/Media Distanza fino a Segovia-Guiomar.",
    airport_opt2_li3: "Taxi/bus verso il centro di Segovia.",
    airport_opt3_title: "Opzione C: Taxi / Uber / Cabify",
    airport_opt3_body:
      "Consigliato se arrivate tardi, con valigie pesanti o siete in tanti.",
    airport_opt4_title: "Opzione D: Noleggio auto",
    airport_opt4_body: "Ideale se pensi di muoverti a Segovia e dintorni.",
    madrid_title: "Arrivo da Madrid",
    madrid_intro:
      "Se ti trovi già a Madrid (perché sei arrivato prima, ti fermi qualche giorno o vieni da un'altra città)...",
    madrid_opt1_title: "Opzione A: Treno (AVE) da Chamartín",
    madrid_opt1_li1: "Durata: ~30 min fino a Segovia-Guiomar",
    madrid_opt1_li2: "Poi: taxi/bus verso il centro",
    madrid_opt2_title: "Opzione B: Bus da Moncloa",
    madrid_opt2_li1: "Durata: 1h 20m – 1h 45m",
    madrid_opt2_li2: "Molto pratico se sei vicino a Moncloa",
    madrid_opt3_title: "Opzione C: Auto",
    madrid_opt3_body: "Madrid → Segovia di solito ~1h 15m (dipende dal traffico).",
  },
};

function applyI18n(dict) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });
}

window.addEventListener("load", () => {
  const lang = (qs("lang") || "es").toLowerCase();
  const name = qs("name") || "";
  const ui = I18N[lang] || I18N.es;

  document.documentElement.lang = lang;
  if (ui.page_title) document.title = ui.page_title;
  applyI18n(ui);

  // back button a invitation.html manteniendo params
  const back = document.getElementById("backToInvite");
  if (back) {
    const inviteUrl = new URL("invitation.html", window.location.href);
    inviteUrl.searchParams.set("lang", lang);
    if (name) inviteUrl.searchParams.set("name", name);
    back.href = inviteUrl.toString();
  }

  // scroll suave si hay hash (#aeropuerto, #madrid, etc.)
  if (window.location.hash) {
    const el = document.querySelector(window.location.hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});
