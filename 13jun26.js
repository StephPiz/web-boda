document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const nav = document.querySelector(".page-13jun26 .invite-nav");
  const seatingMap = document.querySelector(".seating-map");

  if (seatingMap) {
    const params = new URLSearchParams(window.location.search);
    const normalize = (value) =>
      (value || "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, " ");

    const guestName = normalize(params.get("name"));
    const guestCode = (params.get("code") || "").trim();

    if (guestName.includes("katherine") || guestCode === "2705") {
      seatingMap.classList.add("show-seat-katy");
    }
  }

  if (nav) {
    const placeholder = document.createElement("div");
    placeholder.className = "invite-nav-placeholder-13jun26";
    nav.parentNode.insertBefore(placeholder, nav);

    let stickyStart = 0;

    const recalcStickyStart = () => {
      nav.classList.remove("is-fixed-13jun26");
      placeholder.style.height = "0px";
      stickyStart = nav.getBoundingClientRect().top + window.scrollY;
      updateStickyState();
    };

    const updateStickyState = () => {
      if (window.scrollY >= stickyStart) {
        if (!nav.classList.contains("is-fixed-13jun26")) {
          nav.classList.add("is-fixed-13jun26");
          placeholder.style.height = nav.offsetHeight + "px";
        }
      } else {
        nav.classList.remove("is-fixed-13jun26");
        placeholder.style.height = "0px";
      }
    };

    window.addEventListener("scroll", updateStickyState, { passive: true });
    window.addEventListener("resize", recalcStickyStart);
    window.addEventListener("load", recalcStickyStart);
    recalcStickyStart();
  }

  if (!mobileMenuBtn || !mobileMenu) return;

  const openMenu = () => {
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  mobileMenuBtn.addEventListener("click", (event) => {
    event.preventDefault();
    openMenu();
  });

  mobileMenu.addEventListener("click", (event) => {
    const target = event.target;
    if (target?.dataset?.close === "true") closeMenu();
    if (target?.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu.classList.contains("is-open")) {
      closeMenu();
    }
  });

  window.initDraggableLayer?.(".hero-13jun26", ".hero-13jun26 .banner-stickers", ".hero-13jun26 .banner-stickers .sticker");
});

(function () {
  function initDraggableLayer(bannerSelector, layerSelector, itemSelector) {
    const banner = document.querySelector(bannerSelector);
    const layer = document.querySelector(layerSelector);
    const items = document.querySelectorAll(itemSelector);

    if (!banner || !layer || !items.length) return;

    const isDesktop = () => window.matchMedia("(min-width: 900px)").matches;

    let active = null;
    let offsetX = 0;
    let offsetY = 0;

    function rect(el) {
      return el.getBoundingClientRect();
    }

    function onDown(e) {
      if (!isDesktop()) return;

      active = e.currentTarget;
      active.setPointerCapture?.(e.pointerId);

      const r = rect(active);
      offsetX = e.clientX - r.left;
      offsetY = e.clientY - r.top;
    }

    function onMove(e) {
      if (!active) return;

      const b = rect(layer);
      const x = e.clientX - b.left - offsetX + rect(active).width / 2;
      const y = e.clientY - b.top - offsetY + rect(active).height / 2;

      const xp = (x / b.width) * 100;
      const yp = (y / b.height) * 100;

      active.style.setProperty("--x", xp + "%");
      active.style.setProperty("--y", yp + "%");
    }

    function onUp() {
      if (!active) return;

      const b = rect(layer);
      const r = rect(active);

      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;

      const outside = cx < b.left || cx > b.right || cy < b.top || cy > b.bottom;

      if (outside) {
        active.style.opacity = "0";
        active.style.pointerEvents = "none";
      }

      active = null;
    }

    items.forEach((item) => {
      item.addEventListener("pointerdown", onDown);
    });

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  window.initDraggableLayer = initDraggableLayer;
})();

document.addEventListener("DOMContentLoaded", () => {
  const btnVintage = document.getElementById("btnVintage");
  if (btnVintage) {
    btnVintage.addEventListener("click", () => {
      // Abre la cámara HUJI
      window.location.href = "huji.html";
      // Si prefieres en nueva pestaña:
      // window.open("huji.html", "_blank");
    });
  }
});
