/** Procedural surface maps: grain, scratches, foil, bump, noise, masks. */

function makeCanvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2D context unavailable");
  return { c, ctx };
}

function hash(i: number, j: number) {
  const n = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

export function makeGrain(w = 512, h = 512): HTMLCanvasElement {
  const { c, ctx } = makeCanvas(w, h);
  const img = ctx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const n = (hash(x, y) * 255) | 0;
      const i = (y * w + x) * 4;
      img.data[i] = n;
      img.data[i + 1] = n;
      img.data[i + 2] = n;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

export function makeScratches(w = 1024, h = 1024): HTMLCanvasElement {
  const { c, ctx } = makeCanvas(w, h);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(255,255,255,0.55)";
  for (let i = 0; i < 90; i++) {
    ctx.globalAlpha = 0.08 + hash(i, 2) * 0.35;
    ctx.lineWidth = 0.4 + hash(i, 3) * 1.4;
    const x = hash(i, 4) * w;
    const y = hash(i, 5) * h;
    const len = 40 + hash(i, 6) * 380;
    const a = (hash(i, 7) - 0.5) * 0.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
    ctx.stroke();
  }
  for (let i = 0; i < 40; i++) {
    ctx.globalAlpha = 0.04 + hash(i, 9) * 0.12;
    ctx.lineWidth = 0.3;
    const y = hash(i, 10) * h;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(w * 0.3, y + 8, w * 0.6, y - 10, w, y + 4);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  return c;
}

export function makeFoil(w = 512, h = 512): HTMLCanvasElement {
  const { c, ctx } = makeCanvas(w, h);
  const img = ctx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const n = hash(x * 0.35, y * 0.35);
      const m = hash(x * 0.08 + 3, y * 0.08);
      const v = Math.pow(n * 0.7 + m * 0.3, 1.4);
      const i = (y * w + x) * 4;
      img.data[i] = 180 + v * 75;
      img.data[i + 1] = 190 + v * 65;
      img.data[i + 2] = 205 + v * 50;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

export function makeBump(w = 512, h = 512): HTMLCanvasElement {
  const { c, ctx } = makeCanvas(w, h);
  const img = ctx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const v =
        hash(x * 0.2, y * 0.2) * 0.5 +
        hash(x * 0.05, y * 0.05) * 0.35 +
        hash(x, y) * 0.15;
      const n = (v * 255) | 0;
      const i = (y * w + x) * 4;
      img.data[i] = n;
      img.data[i + 1] = n;
      img.data[i + 2] = n;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

export function makeDotMask(w = 512, h = 512): HTMLCanvasElement {
  const { c, ctx } = makeCanvas(w, h);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  const step = 14;
  for (let y = 8; y < h; y += step) {
    for (let x = 8; x < w; x += step) {
      ctx.beginPath();
      ctx.arc(x, y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  return c;
}

export function makeStarMask(w = 512, h = 512): HTMLCanvasElement {
  const { c, ctx } = makeCanvas(w, h);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  for (let i = 0; i < 70; i++) {
    const x = hash(i, 1) * w;
    const y = hash(i, 2) * h;
    const s = 4 + hash(i, 3) * 10;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(hash(i, 4) * Math.PI);
    ctx.beginPath();
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2;
      const r = k % 2 === 0 ? s : s * 0.4;
      const px = Math.cos(a) * r;
      const py = Math.sin(a) * r;
      if (k === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  return c;
}

export function makeLineGrating(w = 512, h = 512): HTMLCanvasElement {
  const { c, ctx } = makeCanvas(w, h);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 3) {
    ctx.globalAlpha = 0.35 + (x % 9 === 0 ? 0.4 : 0);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  return c;
}

export function makeHexMask(w = 512, h = 512): HTMLCanvasElement {
  const { c, ctx } = makeCanvas(w, h);
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(255,255,255,0.7)";
  ctx.lineWidth = 1;
  const r = 16;
  const hstep = r * 1.732;
  for (let row = 0; row < h / (r * 1.5) + 2; row++) {
    for (let col = 0; col < w / hstep + 2; col++) {
      const x = col * hstep + (row % 2) * (hstep / 2);
      const y = row * r * 1.5;
      ctx.beginPath();
      for (let k = 0; k < 6; k++) {
        const a = (k / 6) * Math.PI * 2 + Math.PI / 6;
        const px = x + Math.cos(a) * r;
        const py = y + Math.sin(a) * r;
        if (k === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }
  return c;
}

export function canvasTextureSource(c: HTMLCanvasElement): string {
  return c.toDataURL("image/png");
}
