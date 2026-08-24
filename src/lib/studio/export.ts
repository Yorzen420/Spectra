import type { CardRenderer } from "./renderer";
import type { ExportSettings } from "./types";
import { downloadBlob } from "./project";

export interface ExportProgress {
  (pct: number, label: string): void;
}

function yieldFrame() {
  return new Promise<void>((r) => requestAnimationFrame(() => r()));
}

async function loadGifenc() {
  const mod = (await import("gifenc")) as Record<string, unknown>;
  const src = (mod.GIFEncoder ? mod : (mod.default as Record<string, unknown>)) ?? mod;
  return {
    GIFEncoder: src.GIFEncoder as (options?: { auto?: boolean }) => {
      writeFrame: (
        index: Uint8Array | Uint8ClampedArray,
        width: number,
        height: number,
        opts?: { palette?: number[][]; delay?: number; repeat?: number },
      ) => void;
      finish: () => void;
      bytes: () => Uint8Array;
    },
    quantize: src.quantize as (
      rgba: Uint8Array | Uint8ClampedArray,
      maxColors: number,
      options?: { format?: string },
    ) => number[][],
    applyPalette: src.applyPalette as (
      rgba: Uint8Array | Uint8ClampedArray,
      palette: number[][],
      format?: string,
    ) => Uint8Array,
  };
}

export async function exportStill(
  renderer: CardRenderer,
  settings: ExportSettings,
  viewW: number,
  viewH: number,
  onProgress: ExportProgress,
) {
  onProgress(5, "Rendering");
  const res = settings.resolution;
  const aspect = 63 / 88;
  const h = res;
  const w = Math.round(res * aspect);
  const transparent = settings.transparent || settings.background === "transparent";
  renderer.renderAt(0.12, w, h, transparent);

  onProgress(70, "Encoding");
  const mime =
    settings.format === "jpg"
      ? "image/jpeg"
      : settings.format === "webp"
        ? "image/webp"
        : "image/png";
  const blob: Blob = await new Promise((resolve, reject) => {
    renderer.canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Encode failed"))),
      mime,
      settings.quality,
    );
  });
  renderer.restoreView(viewW, viewH);
  const ext = settings.format === "jpg" ? "jpg" : settings.format === "webp" ? "webp" : "png";
  downloadBlob(blob, `spectra-card.${ext}`);
  onProgress(100, "Done");
}

export async function exportGif(
  renderer: CardRenderer,
  settings: ExportSettings,
  viewW: number,
  viewH: number,
  onProgress: ExportProgress,
) {
  const { GIFEncoder, quantize, applyPalette } = await loadGifenc();
  const res = Math.min(settings.resolution, 720);
  const aspect = 63 / 88;
  const h = res;
  const w = Math.round(res * aspect);
  const fps = Math.max(6, Math.min(settings.fps, 20));
  const duration = Math.max(0.5, Math.min(settings.duration, 8));
  const frames = Math.max(4, Math.round(fps * duration));
  const delay = Math.round(1000 / fps);
  const transparent = settings.background === "transparent";

  const gif = GIFEncoder();
  let palette: number[][] | null = null;

  for (let i = 0; i < frames; i++) {
    onProgress(Math.round((i / frames) * 90), `Frame ${i + 1} / ${frames}`);
    renderer.renderAt(i / frames, w, h, transparent);
    const rgba = renderer.readPixels(w, h);
    if (!palette) {
      palette = quantize(rgba, settings.quality > 0.7 ? 256 : 128, { format: "rgba4444" });
    }
    const index = applyPalette(rgba, palette);
    gif.writeFrame(index, w, h, {
      palette,
      delay,
      repeat: i === 0 ? (settings.loop ? 0 : -1) : undefined,
    });
    await yieldFrame();
  }
  gif.finish();
  renderer.restoreView(viewW, viewH);
  const bytes = gif.bytes();
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  const blob = new Blob([copy], { type: "image/gif" });
  downloadBlob(blob, "spectra-card.gif");
  onProgress(100, "Done");
}

export async function exportVideo(
  renderer: CardRenderer,
  settings: ExportSettings,
  viewW: number,
  viewH: number,
  onProgress: ExportProgress,
) {
  const res = Math.min(settings.resolution, 1080);
  const aspect = 63 / 88;
  const h = res;
  const w = Math.round(res * aspect) & ~1;
  const fps = Math.max(12, Math.min(settings.fps, 30));
  const duration = Math.max(1, Math.min(settings.duration, 12));
  const transparent = false;

  const mimeCandidates = [
    "video/webm;codecs=vp9",
    "video/webm;codecs=vp8",
    "video/webm",
    "video/mp4",
  ];
  const mime = mimeCandidates.find((m) => {
    try {
      return typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(m);
    } catch {
      return false;
    }
  });
  if (!mime || typeof MediaRecorder === "undefined") {
    throw new Error("Video recording is not supported in this browser. Export a GIF instead.");
  }

  renderer.renderAt(0, w, h, transparent);
  const stream = renderer.canvas.captureStream(fps);
  const rec = new MediaRecorder(stream, {
    mimeType: mime,
    videoBitsPerSecond: settings.bitrate,
  });
  const chunks: Blob[] = [];
  rec.ondataavailable = (e) => {
    if (e.data.size) chunks.push(e.data);
  };

  const done = new Promise<Blob>((resolve, reject) => {
    rec.onstop = () => resolve(new Blob(chunks, { type: mime.split(";")[0] }));
    rec.onerror = () => reject(new Error("Recording failed"));
  });

  rec.start();
  const frames = Math.round(fps * duration);
  for (let i = 0; i < frames; i++) {
    onProgress(Math.round((i / frames) * 90), `Recording ${i + 1} / ${frames}`);
    renderer.renderAt(i / frames, w, h, transparent);
    await yieldFrame();
  }
  rec.stop();
  const blob = await done;
  renderer.restoreView(viewW, viewH);
  const ext = mime.includes("mp4") ? "mp4" : "webm";
  downloadBlob(blob, `spectra-card.${ext}`);
  onProgress(100, "Done");
}

export async function runExport(
  renderer: CardRenderer,
  settings: ExportSettings,
  viewW: number,
  viewH: number,
  onProgress: ExportProgress,
) {
  if (settings.format === "gif") return exportGif(renderer, settings, viewW, viewH, onProgress);
  if (settings.format === "webm" || settings.format === "mp4") {
    return exportVideo(renderer, settings, viewW, viewH, onProgress);
  }
  return exportStill(renderer, settings, viewW, viewH, onProgress);
}
