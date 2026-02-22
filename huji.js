const app = document.getElementById("app");
const video = document.getElementById("camera");
const canvas = document.getElementById("captureCanvas");
const flash = document.getElementById("flash");
const countdownEl = document.getElementById("countdown");
const toast = document.getElementById("toast");
const developingScreen = document.getElementById("developingScreen");
const previewScreen = document.getElementById("previewScreen");
const previewImage = document.getElementById("previewImage");
const randomLightsLayer = document.getElementById("randomLights");

const saveBtn = document.getElementById("saveBtn");
const previewSaveBtn = document.getElementById("previewSaveBtn");
const retakeBtn = document.getElementById("retakeBtn");
const shutterBtn = document.getElementById("shutterBtn");
const flipBtn = document.getElementById("flipBtn");
const lightsBtn = document.getElementById("lightsBtn");
const moreBtn = document.getElementById("moreBtn");
const timerButtons = [...document.querySelectorAll(".timer-btn")];

let stream = null;
let facingMode = "environment";
let selectedTimer = 1;
let isBusy = false;
let lastCaptureUrl = "";
let lightsEnabled = false;
let lightPulseInterval = null;
let toastTimeout = null;

function getOrientationAngle() {
  if (screen.orientation && typeof screen.orientation.angle === "number") {
    return screen.orientation.angle;
  }
  if (typeof window.orientation === "number") {
    return Number(window.orientation) || 0;
  }
  return 0;
}

function syncUiRotation() {
  const angle = getOrientationAngle();
  app.style.setProperty("--ui-rotation", `${angle}deg`);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 1600);
}

function formatStamp(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function triggerFlash() {
  flash.classList.remove("active");
  void flash.offsetWidth;
  flash.classList.add("active");
}

function stopStream() {
  if (!stream) return;
  stream.getTracks().forEach((track) => track.stop());
  stream = null;
}

async function startCamera(mode = facingMode) {
  stopStream();

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: { ideal: mode },
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      }
    });
  } catch (error) {
    if (mode !== "user") {
      return startCamera("user");
    }
    showToast("No se pudo abrir la cámara");
    return;
  }

  facingMode = mode;
  video.srcObject = stream;
  await video.play().catch(() => {});
  showToast(mode === "environment" ? "Cámara trasera" : "Cámara frontal");
}

function setTimer(seconds) {
  selectedTimer = seconds;
  timerButtons.forEach((btn) => {
    btn.classList.toggle("is-active", Number(btn.dataset.timer) === seconds);
  });
}

function ensureRandomLights() {
  if (randomLightsLayer.childElementCount > 0) return;

  for (let i = 0; i < 13; i += 1) {
    const dot = document.createElement("span");
    dot.className = "random-light";
    randomLightsLayer.appendChild(dot);
  }
}

function randomizeLights() {
  const colors = [
    "rgba(255, 245, 145, 0.9)",
    "rgba(142, 240, 255, 0.9)",
    "rgba(255, 157, 230, 0.9)",
    "rgba(176, 255, 154, 0.85)",
    "rgba(255, 208, 129, 0.9)"
  ];

  [...randomLightsLayer.children].forEach((light) => {
    light.style.setProperty("--x", `${Math.random() * 100}%`);
    light.style.setProperty("--y", `${Math.random() * 100}%`);
    light.style.setProperty("--size", `${38 + Math.random() * 110}px`);
    light.style.setProperty("--delay", `${Math.random() * 1.2}s`);
    light.style.setProperty("--color", colors[Math.floor(Math.random() * colors.length)]);
  });
}

function toggleLights() {
  lightsEnabled = !lightsEnabled;

  if (lightsEnabled) {
    ensureRandomLights();
    randomLightsLayer.classList.add("is-on");
    randomizeLights();
    lightPulseInterval = setInterval(randomizeLights, 1200);
    lightsBtn.textContent = "Luces On";
    showToast("Luces aleatorias ON");
  } else {
    randomLightsLayer.classList.remove("is-on");
    clearInterval(lightPulseInterval);
    lightPulseInterval = null;
    lightsBtn.textContent = "Luces Off";
    showToast("Luces aleatorias OFF");
  }
}

function drawTimestamp(ctx, w, h, stampText) {
  const fontSize = Math.max(24, Math.round(w * 0.028));
  const x = w - Math.round(w * 0.04);
  const y = h - Math.round(h * 0.045);

  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  ctx.font = `700 ${fontSize}px Montserrat, Arial, sans-serif`;

  ctx.lineWidth = Math.max(4, Math.round(fontSize * 0.2));
  ctx.strokeStyle = "rgba(0,0,0,0.55)";
  ctx.strokeText(stampText, x, y);

  ctx.fillStyle = "rgba(255, 238, 142, 0.98)";
  ctx.fillText(stampText, x, y);
}

function captureToDataUrl() {
  const width = video.videoWidth || 1080;
  const height = video.videoHeight || 1920;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, width, height);
  drawTimestamp(ctx, width, height, formatStamp(new Date()));

  return canvas.toDataURL("image/jpeg", 0.95);
}

async function runTimer() {
  if (selectedTimer <= 0) {
    countdownEl.textContent = "";
    return;
  }

  let current = selectedTimer;
  while (current > 0) {
    countdownEl.textContent = String(current);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    current -= 1;
  }
  countdownEl.textContent = "";
}

function downloadDataUrl(dataUrl) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = `huji-${stamp}.jpg`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

async function takePhotoFlow() {
  if (isBusy) return;
  if (!stream) {
    showToast("Cámara no disponible");
    return;
  }

  isBusy = true;

  try {
    await runTimer();
    triggerFlash();

    const shot = captureToDataUrl();
    lastCaptureUrl = shot;

    developingScreen.classList.remove("hidden");
    await new Promise((resolve) => setTimeout(resolve, 1300));

    previewImage.src = shot;
    developingScreen.classList.add("hidden");
    previewScreen.classList.remove("hidden");
  } finally {
    isBusy = false;
  }
}

function closePreview() {
  previewScreen.classList.add("hidden");
}

async function handleFlipCamera() {
  if (isBusy) return;
  const nextMode = facingMode === "environment" ? "user" : "environment";
  await startCamera(nextMode);
}

function setupEvents() {
  shutterBtn.addEventListener("click", takePhotoFlow);
  flipBtn.addEventListener("click", handleFlipCamera);
  lightsBtn.addEventListener("click", toggleLights);

  moreBtn.addEventListener("click", () => {
    showToast("Opciones extra próximamente");
  });

  saveBtn.addEventListener("click", () => {
    if (!lastCaptureUrl) {
      showToast("Toma una foto primero");
      return;
    }
    downloadDataUrl(lastCaptureUrl);
  });

  previewSaveBtn.addEventListener("click", () => {
    if (!lastCaptureUrl) return;
    downloadDataUrl(lastCaptureUrl);
  });

  retakeBtn.addEventListener("click", closePreview);

  timerButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setTimer(Number(btn.dataset.timer));
      showToast(`Temporizador ${btn.dataset.timer}s`);
    });
  });

  window.addEventListener("resize", syncUiRotation);
  window.addEventListener("orientationchange", syncUiRotation);
  if (screen.orientation) {
    screen.orientation.addEventListener?.("change", syncUiRotation);
  }
}

async function init() {
  syncUiRotation();
  setupEvents();

  if (!navigator.mediaDevices?.getUserMedia) {
    showToast("Este navegador no soporta cámara web");
    return;
  }

  await startCamera("environment");
  setTimer(1);
}

document.addEventListener("visibilitychange", async () => {
  if (document.hidden) {
    stopStream();
    return;
  }
  if (!stream) {
    await startCamera(facingMode);
  }
});

window.addEventListener("beforeunload", stopStream);

init();
