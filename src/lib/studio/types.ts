export type HoloPattern =
  | "linear"
  | "radial"
  | "circular"
  | "diamond"
  | "grid"
  | "crosshatch"
  | "microlines"
  | "prism"
  | "shattered"
  | "starburst"
  | "spectrum"
  | "galaxy"
  | "aurora"
  | "kaleidoscope";

export type GratingPattern =
  | "lines"
  | "cross"
  | "radial"
  | "concentric"
  | "hex"
  | "dots"
  | "wave"
  | "chevron";

export type BlendMode =
  | "mix"
  | "add"
  | "screen"
  | "overlay"
  | "multiply"
  | "softlight"
  | "color";

export type MaskType =
  | "none"
  | "full"
  | "center"
  | "border"
  | "character"
  | "reverse"
  | "gradient"
  | "image"
  | "luminance";

export type LayerKind =
  | "base"
  | "artwork"
  | "border"
  | "foil"
  | "diffraction"
  | "holographic"
  | "iridescence"
  | "reflection"
  | "texture"
  | "scratches"
  | "gloss"
  | "lighting"
  | "custom";

export type QualityLevel = "draft" | "high" | "ultra";
export type CardSide = "front" | "back";
export type FitMode = "fill" | "fit" | "crop";
export type EasingName =
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "cubic"
  | "smoothstep";

export interface ArtSettings {
  src: string | null;
  posX: number;
  posY: number;
  scale: number;
  rotation: number;
  crop: number;
  fit: FitMode;
  opacity: number;
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
  gamma: number;
  blur: number;
  sharpen: number;
  blend: BlendMode;
}

export interface CardSettings {
  widthMm: number;
  heightMm: number;
  cornerRadius: number;
  borderThickness: number;
  borderStyle: "foil" | "metallic" | "matte" | "inset" | "ornate";
  depth: number;
  background: string;
  edgeColor: string;
  edgeMetal: number;
}

export interface HoloSettings {
  intensity: number;
  opacity: number;
  spectralDispersion: number;
  rainbowStrength: number;
  hueShift: number;
  saturation: number;
  contrast: number;
  frequency: number;
  scale: number;
  direction: number;
  rotation: number;
  distortion: number;
  noise: number;
  turbulence: number;
  sharpness: number;
  blend: BlendMode;
  animation: number;
  viewResponse: number;
  pattern: HoloPattern;
  mask: MaskType;
}

export interface DiffractionSettings {
  frequency: number;
  density: number;
  scale: number;
  angle: number;
  direction: number;
  spectralDispersion: number;
  wavelengthSpread: number;
  rainbowIntensity: number;
  hueOffset: number;
  contrast: number;
  sharpness: number;
  distortion: number;
  perspective: number;
  falloff: number;
  lightInteraction: number;
  pattern: GratingPattern;
  opacity: number;
}

export interface IridescenceSettings {
  intensity: number;
  viewSensitivity: number;
  hueRange: number;
  colorSpread: number;
  saturation: number;
  roughness: number;
  metallic: number;
  fresnel: number;
  specular: number;
  clearcoat: number;
  clearcoatRoughness: number;
}

export interface ReflectionSettings {
  cloneCount: number;
  cloneSpacing: number;
  cloneScale: number;
  cloneRotation: number;
  cloneOpacity: number;
  reflectionAngle: number;
  reflectionBlur: number;
  reflectionDistortion: number;
  mirrorAxis: number;
  horizontalMirror: boolean;
  verticalMirror: boolean;
  radialReflection: boolean;
  kaleidoscope: boolean;
  kaleidoSegments: number;
  falloff: number;
  blend: BlendMode;
}

export interface MaterialSettings {
  metallic: number;
  roughness: number;
  gloss: number;
  specular: number;
  fresnel: number;
  clearcoat: number;
  clearcoatRoughness: number;
  reflection: number;
  refraction: number;
  iridescence: number;
  surfaceDistortion: number;
  microSurface: number;
  grain: number;
  noise: number;
  bumpStrength: number;
  scratches: number;
  microScratches: number;
}

export interface Light {
  enabled: boolean;
  azimuth: number;
  elevation: number;
  intensity: number;
  size: number;
  softness: number;
  color: string;
}

export interface LightingSettings {
  key: Light;
  fill: Light;
  rim: Light;
  ambientIntensity: number;
  ambientColor: string;
  specularLight: number;
  envIntensity: number;
  shadowStrength: number;
  followMouse: boolean;
}

export interface Layer {
  id: string;
  name: string;
  kind: LayerKind;
  visible: boolean;
  locked: boolean;
  opacity: number;
  blend: BlendMode;
  mask: MaskType;
}

export interface TextureAsset {
  id: string;
  name: string;
  kind:
    | "holo"
    | "foil"
    | "diffraction"
    | "scratch"
    | "grain"
    | "noise"
    | "imperfection"
    | "mask"
    | "reflection"
    | "bump"
    | "overlay";
  src: string;
  builtin: boolean;
  scale: number;
  rotation: number;
  posX: number;
  posY: number;
  repeat: number;
  mirror: boolean;
  opacity: number;
  brightness: number;
  contrast: number;
  hue: number;
  saturation: number;
  distortion: number;
  blur: number;
  blend: BlendMode;
  animation: number;
  enabled: boolean;
}

export interface AnimationSettings {
  preset: string;
  playing: boolean;
  duration: number;
  fps: number;
  rotationSpeed: number;
  rotationDirection: 1 | -1;
  tilt: number;
  cameraMove: number;
  zoomPulse: number;
  lightMove: number;
  holoAnim: number;
  reflectionAnim: number;
  textureAnim: number;
  loop: boolean;
  easing: EasingName;
  autoRotate: boolean;
}

export interface CameraSettings {
  distance: number;
  fov: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  zoom: number;
  perspective: number;
}

export interface ExportSettings {
  format: "png" | "jpg" | "webp" | "gif" | "webm" | "mp4";
  resolution: number;
  fps: number;
  duration: number;
  quality: number;
  dither: boolean;
  transparent: boolean;
  background: "transparent" | "solid" | "studio";
  solidColor: string;
  shadow: boolean;
  loop: boolean;
  bitrate: number;
}

export interface StudioProject {
  version: 1;
  name: string;
  card: CardSettings;
  front: ArtSettings;
  back: ArtSettings;
  holo: HoloSettings;
  diffraction: DiffractionSettings;
  iridescence: IridescenceSettings;
  reflection: ReflectionSettings;
  material: MaterialSettings;
  lighting: LightingSettings;
  layers: Layer[];
  textures: TextureAsset[];
  animation: AnimationSettings;
  camera: CameraSettings;
  quality: QualityLevel;
  advanced: boolean;
}

export const CARD_PRESETS: { id: string; name: string; w: number; h: number }[] = [
  { id: "standard", name: "Standard (63×88)", w: 63, h: 88 },
  { id: "tarot", name: "Tarot (70×120)", w: 70, h: 120 },
  { id: "square", name: "Square (70×70)", w: 70, h: 70 },
  { id: "mini", name: "Mini (41×63)", w: 41, h: 63 },
  { id: "bridge", name: "Bridge (56×87)", w: 56, h: 87 },
  { id: "poker", name: "Poker (63.5×88.9)", w: 63.5, h: 88.9 },
  { id: "japanese", name: "Japanese (59×86)", w: 59, h: 86 },
  { id: "oversized", name: "Oversized (80×120)", w: 80, h: 120 },
];
