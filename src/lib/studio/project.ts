import type { StudioProject } from "./types";
import { defaultProject } from "./defaults";

const DB_NAME = "spectra-studio";
const STORE = "projects";
const KEY = "current";
const LS_KEY = "spectra-studio-v1";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveProject(p: StudioProject): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(p, KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
    try {
      const slim = { ...p, front: { ...p.front, src: null }, back: { ...p.back, src: null } };
      localStorage.setItem(LS_KEY, JSON.stringify(slim));
    } catch {
      /* quota */
    }
  } catch (err) {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(p));
    } catch {
      throw err instanceof Error ? err : new Error("Save failed — storage is full");
    }
  }
}

export async function loadProject(): Promise<StudioProject | null> {
  try {
    const db = await openDb();
    const p = await new Promise<StudioProject | null>((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).get(KEY);
      req.onsuccess = () => resolve((req.result as StudioProject) ?? null);
      req.onerror = () => reject(req.error);
    });
    db.close();
    if (p && p.version === 1) return p;
  } catch {
    /* fall through */
  }
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as StudioProject;
    if (p?.version === 1) return p;
  } catch {
    /* ignore */
  }
  return null;
}

export function exportProjectJson(p: StudioProject): Blob {
  return new Blob([JSON.stringify(p)], { type: "application/json" });
}

export function parseProjectJson(text: string): StudioProject {
  const p = JSON.parse(text) as StudioProject;
  if (!p || p.version !== 1) throw new Error("Unrecognized project file");
  const d = defaultProject();
  return {
    ...d,
    ...p,
    card: { ...d.card, ...p.card },
    front: { ...d.front, ...p.front },
    back: { ...d.back, ...p.back },
    holo: { ...d.holo, ...p.holo },
    diffraction: { ...d.diffraction, ...p.diffraction },
    iridescence: { ...d.iridescence, ...p.iridescence },
    reflection: { ...d.reflection, ...p.reflection },
    material: { ...d.material, ...p.material },
    lighting: { ...d.lighting, ...p.lighting },
    animation: { ...d.animation, ...p.animation },
    camera: { ...d.camera, ...p.camera },
    layers: p.layers?.length ? p.layers : d.layers,
    textures: p.textures?.length ? p.textures : d.textures,
  };
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/") && !file.name.match(/\.(svg|png|jpe?g|webp)$/i)) {
      reject(new Error("Unsupported image type. Use PNG, JPG, WEBP, or SVG."));
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      reject(new Error("Image is too large (max 25 MB)."));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const max = 2048;
        let { width, height } = img;
        if (width > max || height > max) {
          const s = max / Math.max(width, height);
          width = Math.round(width * s);
          height = Math.round(height * s);
        }
        const c = document.createElement("canvas");
        c.width = width;
        c.height = height;
        const ctx = c.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not process image"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(c.toDataURL("image/png"));
      };
      img.onerror = () => reject(new Error("Could not decode image"));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}
