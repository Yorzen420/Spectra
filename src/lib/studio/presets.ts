import { defaultProject } from "./defaults";
import type { StudioProject } from "./types";

export type MaterialPresetId =
  | "classic"
  | "rainbow"
  | "aurora"
  | "diamond"
  | "galaxy"
  | "shattered"
  | "chrome"
  | "gold"
  | "silver"
  | "retro"
  | "modern"
  | "hyper"
  | "oilslick"
  | "crystal";

export const MATERIAL_PRESETS: { id: MaterialPresetId; name: string; blurb: string }[] = [
  { id: "classic", name: "Classic Holographic", blurb: "Traditional collectible rainbow foil" },
  { id: "rainbow", name: "Rainbow Prism", blurb: "Sharp spectral breaks" },
  { id: "aurora", name: "Aurora", blurb: "Atmospheric iridescent wash" },
  { id: "diamond", name: "Diamond", blurb: "Crystalline sparkle" },
  { id: "galaxy", name: "Galaxy", blurb: "Dark foil, spectral stars" },
  { id: "shattered", name: "Shattered Glass", blurb: "Aggressive reflective shards" },
  { id: "chrome", name: "Chrome", blurb: "Mirror metal" },
  { id: "gold", name: "Gold Luxury", blurb: "Warm metallic foil" },
  { id: "silver", name: "Silver Luxury", blurb: "Cool high-end foil" },
  { id: "retro", name: "Retro 90s Holo", blurb: "Vintage card shimmer" },
  { id: "modern", name: "Modern Premium", blurb: "Quiet luxury foil" },
  { id: "hyper", name: "Hyper Holo", blurb: "Maximum spectral response" },
  { id: "oilslick", name: "Oil Slick", blurb: "Angle-heavy color shift" },
  { id: "crystal", name: "Crystal", blurb: "Geometric refraction" },
];

export function applyMaterialPreset(base: StudioProject, id: MaterialPresetId): StudioProject {
  const p = structuredClone(base);
  const h = p.holo;
  const d = p.diffraction;
  const i = p.iridescence;
  const r = p.reflection;
  const m = p.material;
  const l = p.lighting;

  // reset to a known-good classic, then specialize
  Object.assign(h, defaultProject().holo);
  Object.assign(d, defaultProject().diffraction);
  Object.assign(i, defaultProject().iridescence);
  Object.assign(r, defaultProject().reflection);
  Object.assign(m, defaultProject().material);

  switch (id) {
    case "classic":
      h.pattern = "linear";
      h.frequency = 6.2;
      h.rainbowStrength = 0.95;
      d.pattern = "lines";
      d.frequency = 16;
      break;
    case "rainbow":
      h.pattern = "prism";
      h.frequency = 9;
      h.sharpness = 0.85;
      h.spectralDispersion = 1.2;
      h.rainbowStrength = 1.2;
      d.pattern = "chevron";
      d.frequency = 22;
      d.sharpness = 0.85;
      d.rainbowIntensity = 1.1;
      i.intensity = 0.35;
      break;
    case "aurora":
      h.pattern = "aurora";
      h.frequency = 3.2;
      h.turbulence = 0.8;
      h.distortion = 0.55;
      h.rainbowStrength = 0.7;
      h.opacity = 0.6;
      d.opacity = 0.35;
      d.frequency = 8;
      i.intensity = 0.85;
      i.colorSpread = 1.1;
      i.viewSensitivity = 0.85;
      m.roughness = 0.32;
      m.gloss = 0.55;
      break;
    case "diamond":
      h.pattern = "starburst";
      h.frequency = 11;
      h.sharpness = 0.9;
      h.noise = 0.45;
      d.pattern = "hex";
      d.frequency = 14;
      d.sharpness = 0.9;
      r.kaleidoscope = true;
      r.kaleidoSegments = 8;
      r.cloneCount = 3;
      r.cloneOpacity = 0.3;
      m.gloss = 0.92;
      m.clearcoat = 0.9;
      m.scratches = 0.12;
      i.intensity = 0.55;
      break;
    case "galaxy":
      h.pattern = "galaxy";
      h.frequency = 4.5;
      h.rainbowStrength = 0.75;
      h.opacity = 0.55;
      h.mask = "luminance";
      d.opacity = 0.45;
      d.falloff = 0.55;
      i.intensity = 0.7;
      i.hueRange = 0.55;
      m.metallic = 0.4;
      m.roughness = 0.38;
      l.key.intensity = 0.9;
      l.ambientIntensity = 0.12;
      p.card.background = "#05060a";
      break;
    case "shattered":
      h.pattern = "shattered";
      h.frequency = 8;
      h.sharpness = 0.95;
      h.distortion = 0.4;
      d.pattern = "cross";
      d.frequency = 20;
      r.cloneCount = 6;
      r.cloneSpacing = 0.5;
      r.reflectionDistortion = 0.35;
      r.cloneOpacity = 0.55;
      m.gloss = 0.88;
      m.microSurface = 0.7;
      break;
    case "chrome":
      h.opacity = 0.18;
      h.rainbowStrength = 0.15;
      d.opacity = 0.12;
      i.intensity = 0.12;
      m.metallic = 1;
      m.roughness = 0.06;
      m.gloss = 0.98;
      m.clearcoat = 0.85;
      m.specular = 1;
      m.reflection = 0.9;
      m.scratches = 0.35;
      p.card.edgeColor = "#e8edf2";
      p.card.borderStyle = "metallic";
      l.key.intensity = 1.35;
      break;
    case "gold":
      h.pattern = "radial";
      h.hueShift = 0.08;
      h.rainbowStrength = 0.35;
      h.opacity = 0.4;
      h.saturation = 1.3;
      d.hueOffset = 0.08;
      d.rainbowIntensity = 0.35;
      d.opacity = 0.3;
      i.intensity = 0.3;
      i.hueRange = 0.05;
      m.metallic = 0.92;
      m.roughness = 0.18;
      m.gloss = 0.8;
      p.card.edgeColor = "#e4d5b0";
      p.card.borderStyle = "metallic";
      l.key.color = "#fff4e0";
      l.fill.color = "#c4a070";
      break;
    case "silver":
      h.opacity = 0.32;
      h.rainbowStrength = 0.28;
      h.saturation = 0.55;
      d.opacity = 0.22;
      d.rainbowIntensity = 0.25;
      i.intensity = 0.22;
      m.metallic = 0.95;
      m.roughness = 0.12;
      m.gloss = 0.9;
      p.card.edgeColor = "#dfe6ee";
      p.card.borderStyle = "metallic";
      break;
    case "retro":
      h.pattern = "grid";
      h.frequency = 7.5;
      h.rainbowStrength = 1;
      h.opacity = 0.8;
      h.mask = "reverse";
      d.pattern = "lines";
      d.frequency = 28;
      d.angle = 0.6;
      i.intensity = 0.25;
      m.grain = 0.35;
      m.scratches = 0.4;
      m.roughness = 0.28;
      m.gloss = 0.6;
      break;
    case "modern":
      h.pattern = "spectrum";
      h.frequency = 3.8;
      h.opacity = 0.38;
      h.rainbowStrength = 0.4;
      h.sharpness = 0.3;
      d.opacity = 0.22;
      d.frequency = 10;
      i.intensity = 0.4;
      m.metallic = 0.45;
      m.roughness = 0.2;
      m.gloss = 0.7;
      m.grain = 0.08;
      m.scratches = 0.1;
      break;
    case "hyper":
      h.pattern = "kaleidoscope";
      h.frequency = 12;
      h.intensity = 1.2;
      h.opacity = 1;
      h.rainbowStrength = 1.35;
      h.spectralDispersion = 1.4;
      h.viewResponse = 1.4;
      h.animation = 0.45;
      d.frequency = 32;
      d.rainbowIntensity = 1.3;
      d.opacity = 1;
      i.intensity = 0.9;
      i.colorSpread = 1.2;
      r.kaleidoscope = true;
      r.kaleidoSegments = 10;
      r.cloneCount = 4;
      m.gloss = 0.95;
      break;
    case "oilslick":
      h.pattern = "circular";
      h.frequency = 5;
      h.turbulence = 0.7;
      h.distortion = 0.6;
      h.viewResponse = 1.3;
      h.rainbowStrength = 1.1;
      d.pattern = "wave";
      d.frequency = 12;
      d.distortion = 0.4;
      i.intensity = 1;
      i.viewSensitivity = 1;
      i.colorSpread = 1.3;
      m.roughness = 0.16;
      m.metallic = 0.8;
      break;
    case "crystal":
      h.pattern = "diamond";
      h.frequency = 8;
      h.sharpness = 0.8;
      d.pattern = "hex";
      d.frequency = 16;
      r.kaleidoscope = true;
      r.kaleidoSegments = 6;
      r.radialReflection = true;
      r.cloneCount = 4;
      r.cloneOpacity = 0.4;
      i.intensity = 0.6;
      m.clearcoat = 1;
      m.clearcoatRoughness = 0.05;
      m.gloss = 0.95;
      m.refraction = 0.25;
      break;
  }
  return p;
}

export type AnimPresetId =
  | "slow"
  | "sweep"
  | "prism"
  | "product"
  | "spin360"
  | "flip"
  | "hyper"
  | "cinematic"
  | "retro"
  | "custom";

export const ANIM_PRESETS: { id: AnimPresetId; name: string; blurb: string }[] = [
  { id: "slow", name: "Slow Luxury", blurb: "Gentle studio turn" },
  { id: "sweep", name: "Holographic Sweep", blurb: "Light travels the foil" },
  { id: "prism", name: "Prism Reveal", blurb: "Dramatic spectral shift" },
  { id: "product", name: "Premium Product Shot", blurb: "Subtle camera drift" },
  { id: "spin360", name: "360° Showcase", blurb: "Full rotation, both faces" },
  { id: "flip", name: "Flip Reveal", blurb: "Front, flip, back, return" },
  { id: "hyper", name: "Hyper Holo", blurb: "Aggressive motion" },
  { id: "cinematic", name: "Cinematic", blurb: "Slow dramatic orbit" },
  { id: "retro", name: "Retro Collectible", blurb: "Vintage shimmer turn" },
  { id: "custom", name: "Custom", blurb: "Manual parameters" },
];

export function applyAnimPreset(base: StudioProject, id: AnimPresetId): StudioProject {
  const p = structuredClone(base);
  const a = p.animation;
  a.preset = id;
  a.loop = true;
  a.easing = "easeInOut";
  a.playing = true;
  a.autoRotate = false;
  switch (id) {
    case "slow":
      a.duration = 10;
      a.rotationSpeed = 0.18;
      a.tilt = 0.12;
      a.lightMove = 0.25;
      a.holoAnim = 0.15;
      a.cameraMove = 0.08;
      a.zoomPulse = 0;
      break;
    case "sweep":
      a.duration = 6;
      a.rotationSpeed = 0.08;
      a.tilt = 0.18;
      a.lightMove = 1;
      a.holoAnim = 0.6;
      a.cameraMove = 0.05;
      break;
    case "prism":
      a.duration = 7;
      a.rotationSpeed = 0.4;
      a.tilt = 0.35;
      a.lightMove = 0.7;
      a.holoAnim = 0.85;
      a.easing = "cubic";
      break;
    case "product":
      a.duration = 8;
      a.rotationSpeed = 0.12;
      a.tilt = 0.1;
      a.cameraMove = 0.35;
      a.zoomPulse = 0.08;
      a.lightMove = 0.2;
      a.holoAnim = 0.1;
      break;
    case "spin360":
      a.duration = 8;
      a.rotationSpeed = 1;
      a.tilt = 0.08;
      a.lightMove = 0.3;
      a.easing = "linear";
      break;
    case "flip":
      a.duration = 6;
      a.rotationSpeed = 1;
      a.tilt = 0.05;
      a.lightMove = 0.2;
      a.easing = "easeInOut";
      break;
    case "hyper":
      a.duration = 4;
      a.rotationSpeed = 0.7;
      a.tilt = 0.45;
      a.lightMove = 1;
      a.holoAnim = 1;
      a.reflectionAnim = 0.6;
      a.textureAnim = 0.4;
      a.easing = "cubic";
      break;
    case "cinematic":
      a.duration = 12;
      a.rotationSpeed = 0.22;
      a.tilt = 0.2;
      a.cameraMove = 0.45;
      a.zoomPulse = 0.12;
      a.lightMove = 0.35;
      a.holoAnim = 0.2;
      a.easing = "smoothstep";
      break;
    case "retro":
      a.duration = 5;
      a.rotationSpeed = 0.3;
      a.tilt = 0.28;
      a.lightMove = 0.55;
      a.holoAnim = 0.5;
      break;
    case "custom":
      a.playing = false;
      break;
  }
  return p;
}

export const LIGHTING_PRESETS = [
  { id: "product", name: "Product Photography" },
  { id: "softbox", name: "Softbox" },
  { id: "studio", name: "Studio" },
  { id: "dramatic", name: "Dramatic" },
  { id: "rim", name: "Rim Light" },
  { id: "top", name: "Top Light" },
  { id: "side", name: "Side Light" },
  { id: "back", name: "Back Light" },
  { id: "luxury", name: "Luxury" },
  { id: "rainbow", name: "Rainbow Studio" },
] as const;

export type LightingPresetId = (typeof LIGHTING_PRESETS)[number]["id"];

export function applyLightingPreset(base: StudioProject, id: LightingPresetId): StudioProject {
  const p = structuredClone(base);
  const l = p.lighting;
  l.followMouse = true;
  switch (id) {
    case "product":
      l.key = { ...l.key, azimuth: 0.6, elevation: 0.7, intensity: 1.2, softness: 0.5, color: "#f4f6fa" };
      l.fill = { ...l.fill, azimuth: 3.5, elevation: 0.2, intensity: 0.3, color: "#a8b4c4" };
      l.rim = { ...l.rim, azimuth: 2.7, elevation: 0.35, intensity: 0.45, color: "#dce6f0" };
      l.ambientIntensity = 0.2;
      break;
    case "softbox":
      l.key.softness = 0.9;
      l.key.intensity = 1;
      l.fill.intensity = 0.5;
      l.rim.intensity = 0.2;
      l.ambientIntensity = 0.32;
      break;
    case "studio":
      l.key.intensity = 1.1;
      l.fill.intensity = 0.35;
      l.rim.intensity = 0.4;
      l.ambientIntensity = 0.22;
      break;
    case "dramatic":
      l.key = { ...l.key, azimuth: 0.9, elevation: 0.45, intensity: 1.4, softness: 0.15, color: "#fff6ee" };
      l.fill.intensity = 0.08;
      l.rim.intensity = 0.7;
      l.ambientIntensity = 0.08;
      l.shadowStrength = 0.75;
      break;
    case "rim":
      l.key.intensity = 0.35;
      l.rim.intensity = 1.2;
      l.fill.intensity = 0.15;
      break;
    case "top":
      l.key.elevation = 1.35;
      l.key.azimuth = 0;
      l.key.intensity = 1.25;
      l.fill.intensity = 0.2;
      break;
    case "side":
      l.key.azimuth = 1.4;
      l.key.elevation = 0.2;
      l.key.intensity = 1.3;
      l.fill.azimuth = -1.4;
      l.fill.intensity = 0.25;
      break;
    case "back":
      l.key.azimuth = 3.14;
      l.key.elevation = 0.4;
      l.key.intensity = 0.5;
      l.rim.intensity = 1.1;
      l.ambientIntensity = 0.18;
      break;
    case "luxury":
      l.key.color = "#fff4e8";
      l.key.intensity = 1.15;
      l.fill.color = "#9aa8c0";
      l.rim.color = "#e8f0ff";
      l.rim.intensity = 0.6;
      l.ambientIntensity = 0.18;
      break;
    case "rainbow":
      l.key.color = "#ffe8f0";
      l.fill.color = "#c0e8ff";
      l.rim.color = "#e8ffd8";
      l.key.intensity = 1.1;
      l.fill.intensity = 0.4;
      l.rim.intensity = 0.7;
      l.followMouse = true;
      break;
  }
  return p;
}
