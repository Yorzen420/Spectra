/** Procedural collectible-card faces so the studio looks premium with no upload. */

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function stars(ctx: CanvasRenderingContext2D, w: number, h: number, n: number, seed: number) {
  for (let i = 0; i < n; i++) {
    const x = ((Math.sin(seed + i * 12.9898) * 43758.5453) % 1 + 1) % 1;
    const y = ((Math.sin(seed + i * 78.233) * 24634.634) % 1 + 1) % 1;
    const s = 0.4 + ((Math.sin(seed + i * 4.1) * 1.7) % 1 + 1) % 1 * 1.4;
    ctx.fillStyle = `rgba(230,236,245,${0.15 + (i % 5) * 0.12})`;
    ctx.fillRect(x * w, y * h, s, s);
  }
}

function crystal(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number, rot: number) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rot);
  ctx.beginPath();
  const pts = 6;
  for (let i = 0; i < pts; i++) {
    const a = (i / pts) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? s : s * 0.52;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  const g = ctx.createLinearGradient(-s, -s, s, s);
  g.addColorStop(0, "rgba(210,228,240,0.95)");
  g.addColorStop(0.35, "rgba(120,170,200,0.7)");
  g.addColorStop(0.7, "rgba(70,100,140,0.55)");
  g.addColorStop(1, "rgba(20,28,42,0.8)");
  ctx.fillStyle = g;
  ctx.fill();
  ctx.strokeStyle = "rgba(230,240,250,0.55)";
  ctx.lineWidth = Math.max(1, s * 0.03);
  ctx.stroke();
  ctx.restore();
}

export type ArtPresetId = "aurora" | "void" | "ember" | "tide" | "geometry";

export function generateFrontArt(preset: ArtPresetId = "aurora", w = 1024, h = 1430): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) return c;

  const palettes: Record<ArtPresetId, [string, string, string, string, string]> = {
    aurora: ["#07090e", "#101828", "#1c3348", "#8eb4c8", "#e8f2f8"],
    void: ["#050508", "#12101a", "#2a2438", "#a89bb8", "#efeaf6"],
    ember: ["#0c0806", "#1a100c", "#3a2218", "#c4a090", "#f3e6dc"],
    tide: ["#050b0e", "#0c1c22", "#16343c", "#7fb0b8", "#dff0f2"],
    geometry: ["#09090b", "#16161c", "#2a2a32", "#c9d0da", "#f4f4f5"],
  };
  const [bg0, bg1, mid, accent, ink] = palettes[preset];

  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, bg1);
  bg.addColorStop(0.45, bg0);
  bg.addColorStop(1, "#050506");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const vg = ctx.createRadialGradient(w * 0.5, h * 0.38, 20, w * 0.5, h * 0.4, h * 0.7);
  vg.addColorStop(0, mid + "88");
  vg.addColorStop(1, "transparent");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, w, h);

  stars(ctx, w, h, 180, preset.length * 9.1);

  // frame
  ctx.save();
  ctx.strokeStyle = accent + "55";
  ctx.lineWidth = 10;
  roundRect(ctx, 36, 36, w - 72, h - 72, 28);
  ctx.stroke();
  ctx.strokeStyle = ink + "22";
  ctx.lineWidth = 2;
  roundRect(ctx, 52, 52, w - 104, h - 104, 22);
  ctx.stroke();
  ctx.restore();

  // art window
  const ax = 80;
  const ay = 150;
  const aw = w - 160;
  const ah = h * 0.52;
  ctx.save();
  roundRect(ctx, ax, ay, aw, ah, 16);
  ctx.clip();
  const win = ctx.createLinearGradient(ax, ay, ax + aw, ay + ah);
  win.addColorStop(0, mid);
  win.addColorStop(1, bg0);
  ctx.fillStyle = win;
  ctx.fillRect(ax, ay, aw, ah);

  // atmospheric bands
  for (let i = 0; i < 7; i++) {
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = accent;
    ctx.beginPath();
    const y = ay + ah * (0.15 + i * 0.12);
    ctx.ellipse(w * 0.5, y, aw * 0.55, 28 + i * 6, -0.2 + i * 0.05, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  const cx = w * 0.5;
  const cy = ay + ah * 0.52;
  crystal(ctx, cx, cy, Math.min(aw, ah) * 0.28, 0);
  crystal(ctx, cx, cy, Math.min(aw, ah) * 0.16, Math.PI / 6);
  crystal(ctx, cx - 90, cy + 40, 48, 0.4);
  crystal(ctx, cx + 96, cy - 30, 40, -0.5);
  crystal(ctx, cx + 20, cy - 110, 32, 0.2);

  // inner ring
  ctx.beginPath();
  ctx.arc(cx, cy, Math.min(aw, ah) * 0.34, 0, Math.PI * 2);
  ctx.strokeStyle = accent + "66";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // name plate
  const names: Record<ArtPresetId, [string, string]> = {
    aurora: ["AURORA", "PRISMATIC GUARDIAN"],
    void: ["NYX", "UMBRAL SENTINEL"],
    ember: ["SOLARIS", "CINDER SOVEREIGN"],
    tide: ["AEGIR", "TIDAL ORACLE"],
    geometry: ["MONOLITH", "EUCLIDEAN RELIC"],
  };
  const [title, sub] = names[preset];

  ctx.fillStyle = bg0 + "ee";
  roundRect(ctx, 80, ay + ah + 18, w - 160, 118, 10);
  ctx.fill();
  ctx.strokeStyle = accent + "44";
  ctx.lineWidth = 1.5;
  roundRect(ctx, 80, ay + ah + 18, w - 160, 118, 10);
  ctx.stroke();

  ctx.fillStyle = ink;
  ctx.font = "600 54px 'Outfit', 'Segoe UI', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(title, w / 2, ay + ah + 72);
  ctx.fillStyle = accent;
  ctx.font = "500 18px 'Outfit', 'Segoe UI', sans-serif";
  ctx.letterSpacing = "0.28em";
  ctx.fillText(sub, w / 2, ay + ah + 104);
  ctx.letterSpacing = "0";

  // stats row
  const statsY = ay + ah + 160;
  const stats = [
    ["LUM", "120"],
    ["PRISM", "A"],
    ["SET", "01"],
  ];
  stats.forEach((st, i) => {
    const x = 80 + i * ((w - 160) / 3);
    const sw = (w - 160) / 3 - 12;
    ctx.fillStyle = bg1;
    roundRect(ctx, x, statsY, sw, 72, 8);
    ctx.fill();
    ctx.fillStyle = accent + "99";
    ctx.font = "500 12px 'Outfit', 'Segoe UI', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(st[0], x + sw / 2, statsY + 24);
    ctx.fillStyle = ink;
    ctx.font = "600 26px 'Outfit', 'Segoe UI', sans-serif";
    ctx.fillText(st[1], x + sw / 2, statsY + 54);
  });

  // flavor
  ctx.fillStyle = accent + "99";
  ctx.font = "400 15px 'Outfit', 'Segoe UI', sans-serif";
  ctx.textAlign = "center";
  const flavors: Record<ArtPresetId, string> = {
    aurora: "Light folds through her like a blade through silk.",
    void: "She keeps the dark from remembering its name.",
    ember: "Every orbit ends in gold and ash.",
    tide: "The sea writes its laws on her skin.",
    geometry: "A theorem given mass and hunger.",
  };
  ctx.fillText(flavors[preset], w / 2, h - 88);

  ctx.fillStyle = ink + "55";
  ctx.font = "500 11px 'Outfit', 'Segoe UI', sans-serif";
  ctx.fillText("SPECTRA  ·  HOLOGRAPHIC SERIES  ·  001", w / 2, h - 58);

  return c;
}

export function generateBackArt(w = 1024, h = 1430): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) return c;

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "#0c0c10");
  bg.addColorStop(1, "#16161c");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.strokeStyle = "rgba(201,208,218,0.12)";
  for (let i = 0; i < 18; i++) {
    ctx.beginPath();
    ctx.arc(0, 0, 40 + i * 28, 0, Math.PI * 2);
    ctx.lineWidth = i % 3 === 0 ? 1.4 : 0.6;
    ctx.stroke();
  }
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(a) * 520, Math.sin(a) * 520);
    ctx.stroke();
  }
  ctx.restore();

  ctx.strokeStyle = "rgba(201,208,218,0.28)";
  ctx.lineWidth = 8;
  roundRect(ctx, 40, 40, w - 80, h - 80, 26);
  ctx.stroke();
  ctx.lineWidth = 2;
  roundRect(ctx, 62, 62, w - 124, h - 124, 20);
  ctx.stroke();

  crystal(ctx, w / 2, h / 2 - 40, 90, 0);
  ctx.fillStyle = "#e8eef4";
  ctx.font = "600 42px 'Outfit', 'Segoe UI', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("SPECTRA", w / 2, h / 2 + 120);
  ctx.fillStyle = "rgba(201,208,218,0.7)";
  ctx.font = "500 14px 'Outfit', 'Segoe UI', sans-serif";
  ctx.fillText("HOLOGRAPHIC CARD STUDIO", w / 2, h / 2 + 150);

  return c;
}

export function canvasToDataUrl(c: HTMLCanvasElement, type = "image/png", q?: number) {
  return c.toDataURL(type, q);
}
