document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const pageLang = (params.get("lang") || "es").toLowerCase();
  const invitationParams = new URLSearchParams();
  ["lang", "code", "name"].forEach((key) => {
    const value = params.get(key);
    if (value) invitationParams.set(key, value);
  });
  const invitationHref = `invitation.html${invitationParams.toString() ? `?${invitationParams.toString()}` : ""}`;
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

  const T = {
    es: {
      title: "13 JUN 26",
      nav: ["Inicio", "Fotos", "Asiento", "Menú", "Canciones", "Staff"],
      intro:
        "<strong>Bienvenidos a esta experiencia</strong><br>Gracias por ser parte de nuestra historia italoperuana en suelo español.<br>Que disfruten cada momento, rían, bailen y celebren el amor junto a nosotros.",
      familyTitles: [
        "Padres de la Novia",
        "Padres del Novio",
        "Testigos",
        "Testigos",
        "Damas de Honor",
        "Testigos",
      ],
      photosTitle: "Captura el Momento",
      photosText: "Ayúdanos a guardar los instantes más bonitos de nuestro gran día",
      uploadBtn: "Subir fotos aqui",
      seatTitle: "Encuentra tu lugar",
      guestsBtn: "Invitados",
      menuTitle: "Un recorrido de sabores",
      menuCourses: ["ENTRADA", "SORBETE", "PRINCIPAL", "POSTRE"],
      menuTexts: [
        ["Carpaccio de presa con helado de queso"],
        ['Sorbete de Mandarina y Pago de Carraovejas<br>"Autor" Jose Maria'],
        ['Cochinillo asado de nuestra carta y horneado D.O.<br>Marca de Garantia "Cochinillo asado de Segovia"'],
        [
          "Mousse de choco negro con espejo de caramelo<br>y helado de mandarina",
          "Esfera de queso castellanos con arandanos y<br>helado de frutos rojos",
          '<span class="menu-course-subtitle-13jun26">BODEGA</span><strong>Vino Blanco:</strong> Quintaluna de Ossian<br><strong>Vino Tinto:</strong> "Pago de Carravovejas" Autor D.O. Ribera de Duero',
        ],
      ],
      songbookTitle: "Cancionero",
      songbookIntro:
        "Busca una canción por título, artista o una frase que recuerdes. Aquí iremos reuniendo las favoritas de la boda.",
      songbookOpen: "Abrir playlist",
      songbookSearchLabel: "Buscar canción",
      songbookSearchPlaceholder: "Ej: artista, título o frase",
      songbookEmpty:
        "No encontramos coincidencias. Cuando me pases la lista de canciones, aquí mostraremos la letra clave, el artista y el acceso directo a Spotify.",
      songbookNoResults:
        "No hay resultados todavía. Prueba con otra palabra o pásame más canciones para ampliar el cancionero.",
      spotifyListen: "Escuchar en Spotify",
      letrasListen: "Buscar letra en Letras.com",
      songbookNoLyrics:
        "Todavía no hay letra guardada aquí. Puedes buscar esta canción en Letras.com mientras completas el cancionero.",
      staffTitle: "Staff",
      staffIntro: "Estamos muy agradecidos de contar con el trabajo de",
      staffRoles: [
        "Ilustradora",
        "Fotografa",
        "Wedding Filmmaker",
        "Cantante / Guitarrista",
        "Baterista",
        "Cantante / Pianista",
        "Wedding Planner de Ziba Eventos",
      ],
      closing: [
        ["LO", "MEJOR", "DE", "LA"],
        ["FELICIDAD", "ES"],
        ["CUANDO", "LA"],
        ["COMPARTES"],
        ["CON", "LAS", "PERSONAS", "QUE"],
        ["HACEN", "QUE", "LA VIDA"],
        ["MEREZCA", "LA PENA"],
      ],
      modalTitle: "Invitados",
      modalClose: "Cerrar invitados",
      modalFamilyTitles: ["Padres de la Novia", "Padres del Novio"],
    },
    it: {
      title: "13 GIU 26",
      nav: ["Inizio", "Foto", "Posto", "Menu", "Canzoni", "Staff"],
      intro:
        "<strong>Benvenuti in questa esperienza</strong><br>Grazie per far parte della nostra storia italo-peruviana in terra spagnola.<br>Godetevi ogni momento, ridete, ballate e celebrate l’amore insieme a noi.",
      familyTitles: [
        "Genitori della Sposa",
        "Genitori dello Sposo",
        "Testimoni",
        "Testimoni",
        "Damigelle d'Onore",
        "Testimoni",
      ],
      photosTitle: "Cattura il Momento",
      photosText: "Aiutaci a conservare gli istanti più belli del nostro grande giorno",
      uploadBtn: "Carica le foto qui",
      seatTitle: "Trova il tuo posto",
      guestsBtn: "Invitati",
      menuTitle: "Un percorso di sapori",
      menuCourses: ["ANTIPASTO", "SORBETTO", "PORTATA PRINCIPALE", "DESSERT"],
      menuTexts: [
        ["Carpaccio di presa con gelato al formaggio"],
        ['Sorbetto al mandarino e Pago de Carraovejas<br>"Autor" Jose Maria'],
        ['Maialino da latte arrosto della nostra carta e cotto al forno D.O.<br>Marchio di Garanzia "Cochinillo asado de Segovia"'],
        [
          "Mousse di cioccolato fondente con specchio al caramello<br>e gelato al mandarino",
          "Sfera di formaggio castigliano con mirtilli rossi e<br>gelato ai frutti rossi",
          '<span class="menu-course-subtitle-13jun26">BODEGA</span><strong>Vino Bianco:</strong> Quintaluna de Ossian<br><strong>Vino Rosso:</strong> "Pago de Carravovejas" Autor D.O. Ribera de Duero',
        ],
      ],
      songbookTitle: "Canzoniere",
      songbookIntro:
        "Cerca una canzone per titolo, artista o una frase che ricordi. Qui raccoglieremo le preferite del matrimonio.",
      songbookOpen: "Apri playlist",
      songbookSearchLabel: "Cerca canzone",
      songbookSearchPlaceholder: "Es: artista, titolo o frase",
      songbookEmpty:
        "Non abbiamo trovato corrispondenze. Quando mi passerai la lista delle canzoni, qui mostreremo il testo chiave, l’artista e l’accesso diretto a Spotify.",
      songbookNoResults:
        "Non ci sono ancora risultati. Prova con un’altra parola oppure passami più canzoni per ampliare il canzoniere.",
      spotifyListen: "Ascolta su Spotify",
      letrasListen: "Cerca testo su Letras.com",
      songbookNoLyrics:
        "Qui non c'è ancora il testo salvato. Puoi cercare questa canzone su Letras.com mentre completi il canzoniere.",
      staffTitle: "Staff",
      staffIntro: "Siamo molto grati di poter contare sul lavoro di",
      staffRoles: [
        "Illustratrice",
        "Fotografa",
        "Wedding Filmmaker",
        "Cantante / Chitarrista",
        "Batterista",
        "Cantante / Pianista",
        "Wedding Planner di Ziba Eventos",
      ],
      closing: [
        ["LA", "COSA", "PIÙ", "BELLA DELLA"],
        ["FELICITÀ", "È"],
        ["QUANDO", "LA"],
        ["CONDIVIDI"],
        ["CON", "LE", "PERSONE", "CHE"],
        ["RENDONO", "LA", "VITA"],
        ["DEGNA", "DI ESSERE VISSUTA"],
      ],
      modalTitle: "Invitati",
      modalClose: "Chiudi invitati",
      modalFamilyTitles: ["Genitori della Sposa", "Genitori dello Sposo"],
    },
  };

  const copy = T[pageLang] || T.es;

  const applyPageI18n = () => {
    document.documentElement.lang = pageLang;
    document.title = copy.title;

    const navLinks = [
      ...document.querySelectorAll(".invite-nav-inner a"),
      ...document.querySelectorAll(".mobile-menu-links a"),
    ];
    navLinks.forEach((link, index) => {
      if (copy.nav[index % copy.nav.length]) link.textContent = copy.nav[index % copy.nav.length];
    });
    navLinks.forEach((link, index) => {
      if (index === 0) link.href = invitationHref;
    });

    const introText = document.querySelector(".intro-text-13jun26");
    if (introText) introText.innerHTML = copy.intro;

    document.querySelectorAll(".inicio-family-card-13jun26 h3").forEach((el, index) => {
      if (copy.familyTitles[index]) el.textContent = copy.familyTitles[index];
    });

    const titles = document.querySelectorAll(".capture-title-13jun26");
    if (titles[0]) titles[0].textContent = copy.photosTitle;
    if (titles[1]) titles[1].textContent = copy.seatTitle;
    if (titles[2]) titles[2].textContent = copy.menuTitle;
    if (titles[3]) titles[3].textContent = copy.songbookTitle;
    if (titles[4]) titles[4].textContent = copy.staffTitle;

    const photoText = document.querySelector(".capture-text-13jun26");
    if (photoText) photoText.textContent = copy.photosText;

    const uploadBtn = document.getElementById("btnNormal");
    if (uploadBtn) uploadBtn.textContent = copy.uploadBtn;

    const guestsBtn = document.getElementById("openGuestsModal");
    if (guestsBtn) guestsBtn.textContent = copy.guestsBtn;

    document.querySelectorAll(".menu-course-13jun26 h3").forEach((el, index) => {
      if (copy.menuCourses[index]) el.textContent = copy.menuCourses[index];
    });
    document.querySelectorAll(".menu-course-13jun26").forEach((courseEl, index) => {
      const texts = copy.menuTexts[index] || [];
      courseEl.querySelectorAll("p").forEach((p, pIndex) => {
        if (texts[pIndex]) p.innerHTML = texts[pIndex];
      });
    });

    const songbookIntro = document.querySelector(".songbook-intro-13jun26");
    if (songbookIntro) songbookIntro.textContent = copy.songbookIntro;
    const songbookSpotifyBtn = document.querySelector(".songbook-spotify-btn-13jun26");
    if (songbookSpotifyBtn) songbookSpotifyBtn.textContent = copy.songbookOpen;
    const songbookSearchLabel = document.querySelector(".songbook-search-label-13jun26");
    if (songbookSearchLabel) songbookSearchLabel.textContent = copy.songbookSearchLabel;
    const songbookSearchInput = document.getElementById("songbookSearch");
    if (songbookSearchInput) songbookSearchInput.placeholder = copy.songbookSearchPlaceholder;
    const songbookInitialEmpty = document.querySelector(".songbook-empty-13jun26");
    if (songbookInitialEmpty) songbookInitialEmpty.textContent = copy.songbookEmpty;

    const staffIntro = document.querySelector(".staff-intro-13jun26");
    if (staffIntro) staffIntro.textContent = copy.staffIntro;
    document.querySelectorAll(".staff-role-13jun26").forEach((el, index) => {
      if (copy.staffRoles[index]) el.textContent = copy.staffRoles[index];
    });

    const closingLines = document.querySelectorAll(".closing-banner-line-13jun26");
    copy.closing.forEach((line, index) => {
      const lineEl = closingLines[index];
      if (!lineEl) return;
      const spans = lineEl.querySelectorAll(".closing-word-13jun26");
      spans.forEach((span, spanIndex) => {
        if (line[spanIndex]) span.textContent = line[spanIndex];
      });
    });

    const modalTitle = document.getElementById("guestsModalTitle");
    if (modalTitle) modalTitle.textContent = copy.modalTitle;
    const modalClose = document.querySelector(".guests-modal-close-13jun26");
    if (modalClose) modalClose.setAttribute("aria-label", copy.modalClose);
    document.querySelectorAll(".guests-modal-family-13jun26 h4").forEach((el, index) => {
      if (copy.modalFamilyTitles[index]) el.textContent = copy.modalFamilyTitles[index];
    });
  };

  applyPageI18n();

  const SONGBOOK_PATH = "assets/data/songbook.json?v=20260530-2";

  const HEY_JUDE_IT = {
    "Oye, Jude, no te pongas mal": "Ehi Jude, non prenderla male",
    "Toma una canción triste y hazla mejor": "Prendi una canzone triste e rendila migliore",
    "Recuerda dejarla entrar en tu corazón": "Ricorda di lasciarla entrare nel tuo cuore",
    "Entonces podrás empezar a mejorarla": "Allora potrai cominciare a migliorarla",
    "Oye, Jude, no tengas miedo": "Ehi Jude, non avere paura",
    "Naciste para ir a conquistarla": "Sei nato per andarla a conquistare",
    "En el momento que te permitas sentirla": "Nel momento in cui ti permetti di sentirla",
    "Entonces comenzarás a mejorarla": "Allora comincerai a migliorarla",
    "Y siempre que sientas el dolor": "E ogni volta che sentirai il dolore",
    "Oye, Jude, tómalo con calma": "Ehi Jude, prendila con calma",
    "No lleves el mundo sobre tus hombros": "Non portarti il mondo sulle spalle",
    "Sabes muy bien que eso es una tontería": "Sai benissimo che è una sciocchezza",
    "El que actúa como si nada": "Chi fa finta di niente",
    "Por hacer su mundo un poco más frío": "Rendendo il suo mondo un po' più freddo",
    "Oye, Jude, no me defraudes": "Ehi Jude, non deludermi",
    "La encontraste, ahora ve y conquístala": "L'hai trovata, ora vai e conquistala",
    "Así que déjalo salir y déjalo entrar": "Quindi lascialo uscire e lascialo entrare",
    "Oye, Jude, empieza": "Ehi Jude, comincia",
    "Estás esperando alguien para lograr cosas": "Stai aspettando qualcuno con cui farlo",
    "¿Y no sabes que ese alguien es nadie más que tú?": "E non sai che quel qualcuno sei proprio tu?",
    "Oye, Jude, vas a lograrlo": "Ehi Jude, ce la farai",
    "El movimiento que necesitas está sobre tus hombros": "Il movimento di cui hai bisogno è sulle tue spalle",
    "(Mejorar, mejorar, mejorar, mejorar, mejorar, oh, sí)": "(Meglio, meglio, meglio, meglio, meglio, oh sì)",
  };

  let SONGBOOK_DATA = [];

  const dedupeSongbookData = (songs) => {
    const byId = new Map();
    songs.forEach((song) => {
      const existing = byId.get(song.id);
      if (!existing) {
        byId.set(song.id, song);
        return;
      }
      const score = (entry) =>
        (entry.lyrics || "").trim().length +
        (entry.snippet || "").trim().length +
        (entry.artist || "").length;
      if (score(song) > score(existing)) byId.set(song.id, song);
    });
    return [...byId.values()];
  };

  const ENGLISH_HINTS =
    /\b(the|and|you|your|don't|cant|can't|love|heart|baby|time|night|day|take|make|better|under|with|when|what|how|all|now|feel|little|forever|together|rain|eyes|more|silence|walking|through|tears|here|story|goodbye|there|just|face|this|breaking|memories|children|nothing|say)\b/i;
  const ROMANCE_HINTS =
    /[¿¡áéíóúñ]| \b(que|como|cuando|donde|dime|amor|vida|para|con|sin|por|non|che|sei|una|nel|cuore|ehi|ricorda)\b/i;

  const getLanguageBucket = (line) => {
    const text = (line || "").trim();
    if (!text) return "other";
    if (ENGLISH_HINTS.test(text) && !ROMANCE_HINTS.test(text)) return "en";
    if (ROMANCE_HINTS.test(text)) return "romance";
    if (/^[A-Za-z0-9 ,.'?!;:()&-]+$/.test(text) && text.split(/\s+/).length >= 2) return "en";
    return "other";
  };

  const formatBilingualLyrics = (value, translationMap = null) => {
    const lines = (value || "")
      .replace(/\\n/g, "\n")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const blocks = [];
    for (let i = 0; i < lines.length; i += 2) {
      const first = lines[i];
      const second = lines[i + 1];
      const firstLang = getLanguageBucket(first);
      const secondLang = getLanguageBucket(second);
      const firstIsTranslation = firstLang === "romance" && secondLang === "en";
      const secondIsTranslation = firstLang === "en" && secondLang === "romance";
      const translation = firstIsTranslation ? first : secondIsTranslation ? second : first;
      const original = firstIsTranslation ? second : secondIsTranslation ? first : second;
      if (!original && !translation) continue;
      const localizedTranslation =
        pageLang === "it" && translationMap ? translationMap[translation] || translation : translation;
      blocks.push(
        `<p class="songbook-lyrics-paragraph-13jun26 songbook-lyrics-bilingual-13jun26">` +
          (original
            ? `<span class="songbook-lyrics-line-13jun26 songbook-lyrics-line-primary-13jun26">${original}</span>`
            : "") +
          (localizedTranslation
            ? `<span class="songbook-lyrics-line-13jun26 songbook-lyrics-line-translation-13jun26">${localizedTranslation}</span>`
            : "") +
        `</p>`
      );
    }

    return blocks.join("");
  };

  const extractEnglishFromBilingual = (value) =>
    (value || "")
      .replace(/\\n/g, "\n")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .filter((line) => getLanguageBucket(line) === "en")
      .join("\n");

  const detectSongLanguage = (song) => {
    const text = (song?.lyrics || "").slice(0, 1200);
    if (!text.trim()) return null;
    if (/[¿¡áéíóúñ]|\b(que|como|cuando|donde|amor|vida|para|conmigo|ojos|corazón|quiero|noche|canción)\b/i.test(text)) {
      return "es";
    }
    if (/\b(perché|lassù|partigiano|libertà|portami|svegliato|mattina|fiore|conoscendo|soltanto|affrontarlo|pioggia|vederti)\b/i.test(text)) {
      return "it";
    }
    if (/\b(che|non|sei|della|cuore|amore)\b/i.test(text) && !/\b(que|como|cuando|donde|quiero|ojos|corazón)\b/i.test(text)) {
      return "it";
    }
    return null;
  };

  const formatTranslatedLyrics = (originalText, translatedText) => {
    const normalizeParagraphs = (text) =>
      (text || "")
        .replace(/\\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .split(/\n{2,}/)
        .map((paragraph) =>
          paragraph
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
        )
        .filter((lines) => lines.length);

    const originalParagraphs = normalizeParagraphs(originalText);
    const translatedParagraphs = normalizeParagraphs(translatedText);

    const originalLines = originalParagraphs.flat();
    const translatedLines = translatedParagraphs.flat();

    if (
      originalLines.length &&
      translatedLines.length &&
      Math.abs(originalLines.length - translatedLines.length) <= 2
    ) {
      const blocks = [];
      const count = Math.max(originalLines.length, translatedLines.length);
      for (let i = 0; i < count; i += 1) {
        const originalLine = originalLines[i] || "";
        const translatedLine = translatedLines[i] || "";
        if (!originalLine && !translatedLine) continue;
        blocks.push(
          `<p class="songbook-lyrics-paragraph-13jun26 songbook-lyrics-bilingual-13jun26">` +
            (originalLine
              ? `<span class="songbook-lyrics-line-13jun26 songbook-lyrics-line-primary-13jun26">${originalLine}</span>`
              : "") +
            (translatedLine
              ? `<span class="songbook-lyrics-line-13jun26 songbook-lyrics-line-translation-13jun26">${translatedLine}</span>`
              : "") +
          `</p>`
        );
      }
      return blocks.join("");
    }

    const originalParagraphsGrouped = originalParagraphs;
    const translatedParagraphsGrouped = translatedParagraphs;
    const count = Math.max(originalParagraphsGrouped.length, translatedParagraphsGrouped.length);
    const blocks = [];
    for (let i = 0; i < count; i += 1) {
      const originalGroup = originalParagraphsGrouped[i] || [];
      const translatedGroup = translatedParagraphsGrouped[i] || [];
      blocks.push(
        `<p class="songbook-lyrics-paragraph-13jun26 songbook-lyrics-bilingual-13jun26">` +
          (originalGroup.length
            ? `<span class="songbook-lyrics-line-13jun26 songbook-lyrics-line-primary-13jun26">${originalGroup.join("<br>")}</span>`
            : "") +
          (translatedGroup.length
            ? `<span class="songbook-lyrics-line-13jun26 songbook-lyrics-line-translation-13jun26">${translatedGroup.join("<br>")}</span>`
            : "") +
        `</p>`
      );
    }
    return blocks.join("");
  };

  const shouldUseBilingualLayout = (text) => {
    const lines = (text || "")
      .replace(/\\n/g, "\n")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    let mixedPairs = 0;
    for (let i = 0; i < lines.length - 1; i += 2) {
      const a = getLanguageBucket(lines[i]);
      const b = getLanguageBucket(lines[i + 1]);
      if ((a === "en" && b === "romance") || (a === "romance" && b === "en")) {
        mixedPairs += 1;
      }
    }
    return mixedPairs >= 2;
  };

  const INLINE_BILINGUAL_IDS = new Set([
    "hey-jude",
    "knowing-me-knowing-you",
  ]);

  const formatSongLyrics = (song) => {
    const text = (song?.lyrics || "").trim();
    if (!text) return "";

    const inlineTranslation =
      pageLang === "es"
        ? song?.translations?.es || ""
        : pageLang === "it"
          ? song?.translations?.it || ""
          : "";

    if (INLINE_BILINGUAL_IDS.has(song?.id) && shouldUseBilingualLayout(text) && inlineTranslation.trim()) {
      return formatTranslatedLyrics(extractEnglishFromBilingual(text), inlineTranslation);
    }

    if (INLINE_BILINGUAL_IDS.has(song?.id) && shouldUseBilingualLayout(text)) {
      return formatBilingualLyrics(text);
    }

    const originalLang = detectSongLanguage(song);
    const alternateTranslation =
      pageLang === "es"
        ? originalLang === "it"
          ? song?.translations?.es || ""
          : originalLang === "en"
            ? song?.translations?.es || ""
            : ""
        : pageLang === "it"
          ? originalLang === "es"
            ? song?.translations?.it || ""
            : originalLang === "en"
              ? song?.translations?.it || ""
              : ""
          : "";

    if (alternateTranslation.trim()) {
      return formatTranslatedLyrics(text, alternateTranslation);
    }

    if (song?.id === "hey-jude") {
      return formatBilingualLyrics(text, HEY_JUDE_IT);
    }

    const normalized = text.replace(/\\n/g, "\n");
    const compacted = normalized.replace(/\n{3,}/g, "\n\n");
    const paragraphSeed = compacted.includes("\n\n")
      ? compacted
      : compacted
          .replace(/([.!?])\s+([A-ZÁÉÍÓÚÑÜ])/g, "$1\n\n$2")
          .replace(/([a-záéíóúñü])\n([A-ZÁÉÍÓÚÑÜ])/g, "$1\n\n$2");

    return text
      && paragraphSeed
      .split(/\n{2,}/)
      .map((paragraph) =>
        `<p class="songbook-lyrics-paragraph-13jun26">${paragraph
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .join("<br>")}</p>`
      )
      .join("");
  };

  if (seatingMap) {
    const guestName = normalize(params.get("name"));
    const guestCode = (params.get("code") || "").trim();
    const SEAT_CODE_MAP = {
      "0909": ["olivero", "manuela"],
      "2306": ["andrea", "sara"],
      "2005": ["vane-right", "simone-right"],
      "2010": ["mauro", "josefina"],
      "2705": ["katy"],
      "2712": ["enzo"],
      "0712": ["fabri"],
      "4523": ["chari"],
      "0709": ["nose-top", "vale-top"],
      "1914": ["bea-top", "manu-top"],
      "2107": ["aldo-right", "azzurra-right"],
      "2004": ["miguel"],
      "2003": ["susi"],
      "2729": ["manu-right", "sofi"],
      "1025": ["nito"],
      "1101": ["ale"],
      "2504": ["sebas"],
      "1501": ["ruben", "vicky"],
      "0704": ["diego"],
      "0619": ["fio", "sergio"],
      "2012": ["martin"],
      "2204": ["maria-luisa", "benito-2"],
      "2205": ["juani", "benito-1"],
      "1107": ["brenda", "roberto"],
      "0225": ["sam-top", "clau-top"],
    };

    const SEAT_NAME_MAP = [
      { match: ["katherine"], seats: ["katy"] },
      { match: ["katy"], seats: ["katy"] },
      { match: ["oliviero", "manuela"], seats: ["olivero", "manuela"] },
      { match: ["andrea", "sara"], seats: ["andrea", "sara"] },
      { match: ["vanessa", "simone"], seats: ["vane-right", "simone-right"] },
      { match: ["mauro", "josefina"], seats: ["mauro", "josefina"] },
      { match: ["enzo"], seats: ["enzo"] },
      { match: ["fabrizio"], seats: ["fabri"] },
      { match: ["chiara"], seats: ["chari"] },
      { match: ["gianluca", "valentina"], seats: ["nose-top", "vale-top"] },
      { match: ["beatrice", "manuel"], seats: ["bea-top", "manu-top"] },
      { match: ["aldo", "azzurra"], seats: ["aldo-right", "azzurra-right"] },
      { match: ["miguel"], seats: ["miguel"] },
      { match: ["susana"], seats: ["susi"] },
      { match: ["manuel", "sofia"], seats: ["manu-right", "sofi"] },
      { match: ["nito"], seats: ["nito"] },
      { match: ["alejandro"], seats: ["ale"] },
      { match: ["sebastian"], seats: ["sebas"] },
      { match: ["ruben", "victoria"], seats: ["ruben", "vicky"] },
      { match: ["diego"], seats: ["diego"] },
      { match: ["fiorella", "sergio"], seats: ["fio", "sergio"] },
      { match: ["martin"], seats: ["martin"] },
      { match: ["maria luisa", "benito"], seats: ["maria-luisa", "benito-2"] },
      { match: ["juani", "benito"], seats: ["juani", "benito-1"] },
      { match: ["brenda", "roberto"], seats: ["brenda", "roberto"] },
      { match: ["samuele", "claudia"], seats: ["sam-top", "clau-top"] },
    ];

    const SEAT_HIGHLIGHT_CLASS_MAP = {
      enzo: "seat-highlight-Enzo",
      katy: "seat-highlight-Katy",
      josefina: "seat-highlight-Josefina",
      mauro: "seat-highlight-Mauro",
      manuela: "seat-highlight-Manuela",
      olivero: "seat-highlight-Oliviero",
      andrea: "seat-highlight-Andrea",
      sara: "seat-highlight-Sara",
      "aldo-right": "seat-highlight-Aldo",
      "azzurra-right": "seat-highlight-Azzurra",
      "vane-right": "seat-highlight-Vane",
      "simone-right": "seat-highlight-Simone",
      sofi: "seat-highlight-Sofi",
      "manu-right": "seat-highlight-ManuRight",
      chari: "seat-highlight-Chari",
      nito: "seat-highlight-Nito",
      sebas: "seat-highlight-Sebas",
      miguel: "seat-highlight-Miguel",
      martin: "seat-highlight-Martin",
      fio: "seat-highlight-Fio",
      sergio: "seat-highlight-Sergio",
      roberto: "seat-highlight-Roberto",
      brenda: "seat-highlight-Brenda",
      ale: "seat-highlight-Ale",
      susi: "seat-highlight-Susi",
      diego: "seat-highlight-Diego",
      vicky: "seat-highlight-Vicky",
      ruben: "seat-highlight-Ruben",
      "benito-2": "seat-highlight-Benito2",
      "maria-luisa": "seat-highlight-MLuisa",
      juani: "seat-highlight-Juani",
      "benito-1": "seat-highlight-Benito1",
      "vale-top": "seat-highlight-Vale",
      "nose-top": "seat-highlight-Nose",
      fabri: "seat-highlight-Fabri",
      "sam-top": "seat-highlight-Sam",
      "clau-top": "seat-highlight-Clau",
      "bea-top": "seat-highlight-Bea",
      "manu-top": "seat-highlight-ManuTop",
    };

    const SEAT_HIGHLIGHT_ALIAS_MAP = {
      "aldo-right": ["seat-highlight-Aldo"],
      "azzurra-right": ["seat-highlight-Azzurra"],
      "vane-right": ["seat-highlight-Vane"],
      "simone-right": ["seat-highlight-Simone"],
      sofi: ["seat-highlight-Sofi"],
      "manu-right": ["seat-highlight-ManuRight"],
      chari: ["seat-highlight-Chari"],
      nito: ["seat-highlight-Nito"],
      sebas: ["seat-highlight-Sebas"],
      miguel: ["seat-highlight-Miguel"],
      martin: ["seat-highlight-Martin"],
      fio: ["seat-highlight-Fio"],
      sergio: ["seat-highlight-Sergio"],
      roberto: ["seat-highlight-Roberto"],
      brenda: ["seat-highlight-Brenda"],
      ale: ["seat-highlight-Ale"],
      susi: ["seat-highlight-Susi"],
      diego: ["seat-highlight-Diego"],
      vicky: ["seat-highlight-Vicky"],
      ruben: ["seat-highlight-Ruben"],
      "benito-2": ["seat-highlight-Benito2"],
      "maria-luisa": ["seat-highlight-MLuisa"],
      juani: ["seat-highlight-Juani"],
      "benito-1": ["seat-highlight-Benito1"],
      "vale-top": ["seat-highlight-Vale"],
      "nose-top": ["seat-highlight-Nose"],
      fabri: ["seat-highlight-Fabri"],
      "sam-top": ["seat-highlight-Sam"],
      "clau-top": ["seat-highlight-Clau"],
      "bea-top": ["seat-highlight-Bea"],
      "manu-top": ["seat-highlight-ManuTop", "seat-highlight-Manu"],
      enzo: ["seat-highlight-Enzo"],
      katy: ["seat-highlight-Katy"],
      josefina: ["seat-highlight-Josefina"],
      mauro: ["seat-highlight-Mauro"],
      manuela: ["seat-highlight-Manuela"],
      olivero: ["seat-highlight-Oliviero"],
      andrea: ["seat-highlight-Andrea"],
      sara: ["seat-highlight-Sara"],
    };

    const findSeatTargets = () => {
      if (SEAT_CODE_MAP[guestCode]) return SEAT_CODE_MAP[guestCode];
      return (
        SEAT_NAME_MAP.find(({ match }) => match.every((token) => guestName.includes(token)))?.seats || []
      );
    };

    const createHighlight = (seatId) => {
      const highlight = document.createElement("div");
      const highlightClass = SEAT_HIGHLIGHT_CLASS_MAP[seatId] || `seat-highlight-${seatId}`;
      const aliasClasses = SEAT_HIGHLIGHT_ALIAS_MAP[seatId] || [];
      highlight.className = `seat-highlight dynamic-seat-highlight ${[highlightClass, ...aliasClasses].join(" ")}`;
      highlight.style.display = "block";
      highlight.setAttribute("aria-hidden", "true");
      return highlight;
    };

    const renderSeatHighlights = () => {
      seatingMap.querySelectorAll(".seat-highlight.dynamic-seat-highlight").forEach((node) => node.remove());
      const seats = findSeatTargets();
      seats.forEach((seatId) => {
        const highlight = createHighlight(seatId);
        seatingMap.appendChild(highlight);
      });
    };

    renderSeatHighlights();
  }

  if (songbookSearch && songbookResults && songbookDetail) {
    try {
      const response = await fetch(SONGBOOK_PATH, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      SONGBOOK_DATA = dedupeSongbookData(Array.isArray(payload) ? payload : []);
    } catch (error) {
      console.warn("No se pudo cargar songbook.json, uso fallback en JS", error);
      SONGBOOK_DATA = dedupeSongbookData(
        Array.isArray(window.SONGBOOK_DATA_13JUN26) ? window.SONGBOOK_DATA_13JUN26 : []
      );
    }

    let activeId = SONGBOOK_DATA[0]?.id || null;

    const renderDetail = (song) => {
      if (!song) {
        songbookDetail.innerHTML =
          `<p class="songbook-empty-13jun26">${copy.songbookEmpty}</p>`;
        return;
      }

      const tags = (song.tags || [])
        .map((tag) => `<span class="songbook-detail-tag-13jun26">${tag}</span>`)
        .join("");
      const rawLyrics = song.lyrics || song.snippet || "";
      const hasLyrics = Boolean(rawLyrics.trim());
      const letrasQuery = encodeURIComponent(`${song.title} ${song.artist}`);
      const letrasUrl = song.lyricsUrl || `https://www.letras.com/?q=${letrasQuery}`;
      const lyricsMarkup = hasLyrics
        ? `<div class="songbook-detail-snippet-13jun26">${formatSongLyrics(song)}</div>`
        : `<p class="songbook-detail-empty-13jun26">${copy.songbookNoLyrics}</p>`;

      songbookDetail.innerHTML = `
        <h3 class="songbook-detail-title-13jun26">${song.title}</h3>
        <p class="songbook-detail-artist-13jun26">${song.artist}</p>
        ${lyricsMarkup}
        <div class="songbook-detail-tags-13jun26">${tags}</div>
        <div class="songbook-detail-actions-13jun26">
          <a class="songbook-detail-link-13jun26" href="${song.spotify}" target="_blank" rel="noopener">${copy.spotifyListen}</a>
          <a class="songbook-detail-link-13jun26 songbook-detail-link-secondary-13jun26" href="${letrasUrl}" target="_blank" rel="noopener">${copy.letrasListen}</a>
        </div>
      `;
    };

    const renderResults = (songs) => {
      if (!songs.length) {
        songbookResults.innerHTML =
          `<p class="songbook-empty-13jun26">${copy.songbookNoResults}</p>`;
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
