document.addEventListener("DOMContentLoaded", async () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const nav = document.querySelector(".page-13jun26 .invite-nav");
  const seatingMap = document.querySelector(".seating-map");
  const guestsModal = document.getElementById("guestsModal");
  const openGuestsModalBtn = document.getElementById("openGuestsModal");
  const songbookSearch = document.getElementById("songbookSearch");
  const songbookResults = document.getElementById("songbookResults");
  const songbookDetail = document.getElementById("songbookDetail");

  const normalize = (value) =>
    (value || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ");

  const SONGBOOK_PATH = "assets/data/songbook.json";

  let SONGBOOK_DATA = [];

  if (seatingMap) {
    const params = new URLSearchParams(window.location.search);
    const guestName = normalize(params.get("name"));
    const guestCode = (params.get("code") || "").trim();

    if (guestName.includes("katherine") || guestCode === "2705") {
      seatingMap.classList.add("show-seat-katy");
    }
  }

  if (songbookSearch && songbookResults && songbookDetail) {
    try {
      const response = await fetch(SONGBOOK_PATH, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      SONGBOOK_DATA = Array.isArray(payload) ? payload : [];
    } catch (error) {
      console.warn("No se pudo cargar songbook.json", error);
      SONGBOOK_DATA = [];
    }

    let activeId = SONGBOOK_DATA[0]?.id || null;

    const renderDetail = (song) => {
      if (!song) {
        songbookDetail.innerHTML =
          '<p class="songbook-empty-13jun26">No encontramos coincidencias. Cuando me pases la lista de canciones, aquí mostraremos la letra clave, el artista y el acceso directo a Spotify.</p>';
        return;
      }

      const tags = (song.tags || [])
        .map((tag) => `<span class="songbook-detail-tag-13jun26">${tag}</span>`)
        .join("");

      songbookDetail.innerHTML = `
        <h3 class="songbook-detail-title-13jun26">${song.title}</h3>
        <p class="songbook-detail-artist-13jun26">${song.artist}</p>
        <div class="songbook-detail-snippet-13jun26">${(song.lyrics || song.snippet || "").replace(/\n/g, "<br>")}</div>
        <div class="songbook-detail-tags-13jun26">${tags}</div>
        <a class="songbook-detail-link-13jun26" href="${song.spotify}" target="_blank" rel="noopener">Escuchar en Spotify</a>
      `;
    };

    const renderResults = (songs) => {
      if (!songs.length) {
        songbookResults.innerHTML =
          '<p class="songbook-empty-13jun26">No hay resultados todavía. Prueba con otra palabra o pásame más canciones para ampliar el cancionero.</p>';
        renderDetail(null);
        return;
      }

      if (!songs.some((song) => song.id === activeId)) {
        activeId = songs[0].id;
      }

      songbookResults.innerHTML = songs
        .map(
          (song) => `
            <button class="songbook-result-card-13jun26${song.id === activeId ? " is-active" : ""}" type="button" data-song-id="${song.id}">
              <span class="songbook-result-title-13jun26">${song.title}</span>
              <span class="songbook-result-meta-13jun26">${song.artist}</span>
            </button>
          `
        )
        .join("");

      renderDetail(songs.find((song) => song.id === activeId) || songs[0]);
    };

    const getMatches = (query) => {
      const normalizedQuery = normalize(query);
      if (!normalizedQuery) return SONGBOOK_DATA;

      return SONGBOOK_DATA.filter((song) => {
        const haystack = [
          song.title,
          song.artist,
          ...(song.tags || []),
          ...(song.search || []),
          song.lyrics,
          song.snippet,
        ]
          .map(normalize)
          .join(" ");

        return haystack.includes(normalizedQuery);
      });
    };

    renderResults(SONGBOOK_DATA);

    songbookSearch.addEventListener("input", () => {
      renderResults(getMatches(songbookSearch.value));
    });

    songbookResults.addEventListener("click", (event) => {
      const button = event.target.closest("[data-song-id]");
      if (!button) return;

      activeId = button.dataset.songId;
      renderResults(getMatches(songbookSearch.value));
    });
  }

  if (guestsModal && openGuestsModalBtn) {
    const openGuestsModal = () => {
      guestsModal.classList.add("is-open");
      guestsModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    const closeGuestsModal = () => {
      guestsModal.classList.remove("is-open");
      guestsModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    openGuestsModalBtn.addEventListener("click", openGuestsModal);

    guestsModal.addEventListener("click", (event) => {
      const target = event.target;
      if (target?.dataset?.close === "true") closeGuestsModal();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && guestsModal.classList.contains("is-open")) {
        closeGuestsModal();
      }
    });
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


// ── SUBIDA DE FOTOS A GOOGLE DRIVE ──────────────────────────────
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw3xGmTaprfOV0b8s7wgyMc3jb5rwJjmPyTs1E-2nfpusprTeQD_U3aD9o3nbGgTvDhcQ/exec';

document.getElementById('btnNormal').addEventListener('click', () => {
  document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', async (e) => {
  const files = Array.from(e.target.files);
  if (!files.length) return;

  const status = document.getElementById('uploadStatus');
  status.textContent = `Subiendo ${files.length} foto(s)... ⏳`;

  let ok = 0, fail = 0;

  for (const file of files) {
    try {
      const base64 = await toBase64(file);
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          filename: `${Date.now()}_${file.name}`,
          mimeType: file.type,
          data: base64
        })
      });
      const json = await res.json();
      if (json.status === 'ok') ok++;
      else fail++;
    } catch {
      fail++;
    }
  }

  status.textContent = `✅ ${ok} subida(s) correctamente${fail ? ` · ❌ ${fail} fallida(s)` : ''}`;
  e.target.value = '';
});

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}