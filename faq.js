function qs(key){
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
}

window.addEventListener("load", () => {
  const lang = (qs("lang") || "es").toLowerCase();
  const name = qs("name") || "";

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
