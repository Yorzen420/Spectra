import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { defaultExport, defaultProject } from "./defaults";
import {
  applyAnimPreset,
  applyLightingPreset,
  applyMaterialPreset,
  type AnimPresetId,
  type LightingPresetId,
  type MaterialPresetId,
} from "./presets";
import type {
  ArtSettings,
  CardSide,
  ExportSettings,
  Layer,
  QualityLevel,
  StudioProject,
  TextureAsset,
} from "./types";

const HISTORY_MAX = 80;

type Patch = Partial<StudioProject>;

interface StudioStore extends StudioProject {
  export: ExportSettings;
  side: CardSide;
  leftTab: "assets" | "layers" | "textures" | "presets" | "card";
  rightTab:
    | "material"
    | "holographic"
    | "diffraction"
    | "reflection"
    | "iridescence"
    | "lighting"
    | "effects"
    | "animation";
  exportOpen: boolean;
  exporting: boolean;
  exportProgress: number;
  exportError: string | null;
  toast: string | null;
  fps: number;
  webglOk: boolean;
  hydrated: boolean;
  past: string[];
  future: string[];

  snapshot: () => void;
  undo: () => void;
  redo: () => void;
  apply: (patch: Patch, history?: boolean) => void;
  setCard: (patch: Partial<StudioProject["card"]>) => void;
  setArt: (side: CardSide, patch: Partial<ArtSettings>) => void;
  setHolo: (patch: Partial<StudioProject["holo"]>) => void;
  setDiff: (patch: Partial<StudioProject["diffraction"]>) => void;
  setIri: (patch: Partial<StudioProject["iridescence"]>) => void;
  setRefl: (patch: Partial<StudioProject["reflection"]>) => void;
  setMat: (patch: Partial<StudioProject["material"]>) => void;
  setLight: (patch: Partial<StudioProject["lighting"]>) => void;
  setAnim: (patch: Partial<StudioProject["animation"]>) => void;
  setCam: (patch: Partial<StudioProject["camera"]>) => void;
  setExport: (patch: Partial<ExportSettings>) => void;
  setQuality: (q: QualityLevel) => void;
  setSide: (s: CardSide) => void;
  setLayer: (id: string, patch: Partial<Layer>) => void;
  reorderLayers: (from: number, to: number) => void;
  addLayer: () => void;
  duplicateLayer: (id: string) => void;
  deleteLayer: (id: string) => void;
  setTexture: (id: string, patch: Partial<TextureAsset>) => void;
  addTexture: (tex: TextureAsset) => void;
  applyPreset: (id: MaterialPresetId) => void;
  applyAnim: (id: AnimPresetId) => void;
  applyLightPreset: (id: LightingPresetId) => void;
  resetSection: (section: keyof StudioProject) => void;
  resetAll: () => void;
  loadProject: (p: StudioProject, history?: boolean) => void;
  asProject: () => StudioProject;
  setToast: (t: string | null) => void;
}

function pickProject(s: StudioStore): StudioProject {
  return {
    version: 1,
    name: s.name,
    card: s.card,
    front: s.front,
    back: s.back,
    holo: s.holo,
    diffraction: s.diffraction,
    iridescence: s.iridescence,
    reflection: s.reflection,
    material: s.material,
    lighting: s.lighting,
    layers: s.layers,
    textures: s.textures,
    animation: s.animation,
    camera: s.camera,
    quality: s.quality,
    advanced: s.advanced,
  };
}

function serial(p: StudioProject) {
  const slim = {
    ...p,
    front: { ...p.front, src: p.front.src ? "[img]" : null },
    back: { ...p.back, src: p.back.src ? "[img]" : null },
    textures: p.textures.map((t) => ({ ...t, src: t.builtin ? "" : "[img]" })),
  };
  return JSON.stringify(slim);
}

export const useStudio = create<StudioStore>()(
  subscribeWithSelector((set, get) => {
    const d = defaultProject();
    return {
      ...d,
      export: defaultExport(),
      side: "front",
      leftTab: "presets",
      rightTab: "holographic",
      exportOpen: false,
      exporting: false,
      exportProgress: 0,
      exportError: null,
      toast: null,
      fps: 0,
      webglOk: true,
      hydrated: true,
      past: [],
      future: [],

      snapshot: () => {
        const s = serial(pickProject(get()));
        set((st) => ({
          past: [...st.past.slice(-HISTORY_MAX + 1), s],
          future: [],
        }));
      },
      undo: () => {
        const { past, future } = get();
        if (!past.length) return;
        const cur = serial(pickProject(get()));
        const prev = past[past.length - 1];
        try {
          const parsed = JSON.parse(prev) as StudioProject;
          set({
            ...parsed,
            past: past.slice(0, -1),
            future: [...future, cur],
          });
        } catch {
          /* ignore */
        }
      },
      redo: () => {
        const { past, future } = get();
        if (!future.length) return;
        const cur = serial(pickProject(get()));
        const next = future[future.length - 1];
        try {
          const parsed = JSON.parse(next) as StudioProject;
          set({
            ...parsed,
            future: future.slice(0, -1),
            past: [...past, cur],
          });
        } catch {
          /* ignore */
        }
      },
      apply: (patch, history = true) => {
        if (history) get().snapshot();
        set(patch as Partial<StudioStore>);
      },
      setCard: (patch) => {
        get().snapshot();
        set((s) => ({ card: { ...s.card, ...patch } }));
      },
      setArt: (side, patch) => {
        get().snapshot();
        set((s) =>
          side === "front"
            ? { front: { ...s.front, ...patch } }
            : { back: { ...s.back, ...patch } },
        );
      },
      setHolo: (patch) => {
        set((s) => ({ holo: { ...s.holo, ...patch } }));
      },
      setDiff: (patch) => {
        set((s) => ({ diffraction: { ...s.diffraction, ...patch } }));
      },
      setIri: (patch) => {
        set((s) => ({ iridescence: { ...s.iridescence, ...patch } }));
      },
      setRefl: (patch) => {
        set((s) => ({ reflection: { ...s.reflection, ...patch } }));
      },
      setMat: (patch) => {
        set((s) => ({ material: { ...s.material, ...patch } }));
      },
      setLight: (patch) => {
        set((s) => ({ lighting: { ...s.lighting, ...patch } }));
      },
      setAnim: (patch) => {
        set((s) => ({ animation: { ...s.animation, ...patch } }));
      },
      setCam: (patch) => {
        set((s) => ({ camera: { ...s.camera, ...patch } }));
      },
      setExport: (patch) => set((s) => ({ export: { ...s.export, ...patch } })),
      setQuality: (quality) => set({ quality }),
      setSide: (side) => set({ side }),
      setLayer: (id, patch) => {
        set((s) => ({
          layers: s.layers.map((l) => (l.id === id ? { ...l, ...patch } : l)),
        }));
      },
      reorderLayers: (from, to) => {
        get().snapshot();
        set((s) => {
          const layers = s.layers.slice();
          const [item] = layers.splice(from, 1);
          if (!item) return {};
          layers.splice(to, 0, item);
          return { layers };
        });
      },
      addLayer: () => {
        get().snapshot();
        const id = `layer-${Date.now()}`;
        set((s) => ({
          layers: [
            ...s.layers,
            {
              id,
              name: "Custom Layer",
              kind: "custom",
              visible: true,
              locked: false,
              opacity: 1,
              blend: "mix",
              mask: "none",
            },
          ],
        }));
      },
      duplicateLayer: (id) => {
        get().snapshot();
        set((s) => {
          const i = s.layers.findIndex((l) => l.id === id);
          if (i < 0) return {};
          const src = s.layers[i]!;
          const copy: Layer = {
            ...src,
            id: `${src.id}-copy-${Date.now()}`,
            name: `${src.name} copy`,
          };
          const layers = s.layers.slice();
          layers.splice(i + 1, 0, copy);
          return { layers };
        });
      },
      deleteLayer: (id) => {
        get().snapshot();
        set((s) => ({ layers: s.layers.filter((l) => l.id !== id) }));
      },
      setTexture: (id, patch) => {
        set((s) => ({
          textures: s.textures.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        }));
      },
      addTexture: (tex) => {
        get().snapshot();
        set((s) => ({ textures: [...s.textures, tex] }));
      },
      applyPreset: (id) => {
        get().snapshot();
        const next = applyMaterialPreset(pickProject(get()), id);
        set({ ...next });
      },
      applyAnim: (id) => {
        get().snapshot();
        const next = applyAnimPreset(pickProject(get()), id);
        set({ ...next });
      },
      applyLightPreset: (id) => {
        get().snapshot();
        const next = applyLightingPreset(pickProject(get()), id);
        set({ ...next });
      },
      resetSection: (section) => {
        get().snapshot();
        const d = defaultProject();
        set({ [section]: d[section] } as Partial<StudioStore>);
      },
      resetAll: () => {
        get().snapshot();
        const d = defaultProject();
        const { front, back } = get();
        set({ ...d, front: { ...d.front, src: front.src }, back: { ...d.back, src: back.src } });
      },
      loadProject: (p, history = true) => {
        if (history) get().snapshot();
        set({ ...p });
      },
      asProject: () => pickProject(get()),
      setToast: (toast) => set({ toast }),
    };
  }),
);

export function projectFromStore(): StudioProject {
  return useStudio.getState().asProject();
}
