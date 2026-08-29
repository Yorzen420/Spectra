import type {
  AnimationSettings,
  ArtSettings,
  CameraSettings,
  CardSettings,
  DiffractionSettings,
  ExportSettings,
  HoloSettings,
  IridescenceSettings,
  Layer,
  LightingSettings,
  MaterialSettings,
  ReflectionSettings,
  StudioProject,
  TextureAsset,
} from "./types";

export function defaultArt(): ArtSettings {
  return {
    src: null,
    posX: 0,
    posY: 0,
    scale: 1,
    rotation: 0,
    crop: 0,
    fit: "fill",
    opacity: 1,
    brightness: 1,
    contrast: 1,
    saturation: 1,
    hue: 0,
    gamma: 1,
    blur: 0,
    sharpen: 0,
    blend: "mix",
  };
}

export function defaultCard(): CardSettings {
  return {
    widthMm: 63,
    heightMm: 88,
    cornerRadius: 0,
    borderThickness: 0,
    borderStyle: "foil",
    depth: 0.008,
    background: "#0b0d12",
    edgeColor: "#c9d0da",
    edgeMetal: 0.85,
  };
}

export function defaultHolo(): HoloSettings {
  return {
    intensity: 0.85,
    opacity: 0.72,
    spectralDispersion: 0.85,
    rainbowStrength: 0.9,
    hueShift: 0.08,
    saturation: 1.15,
    contrast: 1.1,
    frequency: 6.5,
    scale: 1,
    direction: 0.15,
    rotation: 0.2,
    distortion: 0.25,
    noise: 0.2,
    turbulence: 0.35,
    sharpness: 0.55,
    blend: "screen",
    animation: 0.15,
    viewResponse: 1,
    pattern: "linear",
    mask: "full",
  };
}

export function defaultDiffraction(): DiffractionSettings {
  return {
    frequency: 18,
    density: 1.1,
    scale: 1,
    angle: 0.35,
    direction: 0,
    spectralDispersion: 1.1,
    wavelengthSpread: 1,
    rainbowIntensity: 0.8,
    hueOffset: 0.12,
    contrast: 1.15,
    sharpness: 0.6,
    distortion: 0.12,
    perspective: 0.7,
    falloff: 0.25,
    lightInteraction: 0.8,
    pattern: "lines",
    opacity: 0.7,
  };
}

export function defaultIridescence(): IridescenceSettings {
  return {
    intensity: 0.45,
    viewSensitivity: 0.7,
    hueRange: 0.2,
    colorSpread: 0.65,
    saturation: 1.05,
    roughness: 0.22,
    metallic: 0.7,
    fresnel: 0.55,
    specular: 0.8,
    clearcoat: 0.65,
    clearcoatRoughness: 0.12,
  };
}

export function defaultReflection(): ReflectionSettings {
  return {
    cloneCount: 0,
    cloneSpacing: 0.35,
    cloneScale: 1,
    cloneRotation: 0,
    cloneOpacity: 0.45,
    reflectionAngle: 0,
    reflectionBlur: 0,
    reflectionDistortion: 0.05,
    mirrorAxis: 0,
    horizontalMirror: false,
    verticalMirror: false,
    radialReflection: false,
    kaleidoscope: false,
    kaleidoSegments: 6,
    falloff: 0.6,
    blend: "screen",
  };
}

export function defaultMaterial(): MaterialSettings {
  return {
    metallic: 0.55,
    roughness: 0.22,
    gloss: 0.72,
    specular: 0.8,
    fresnel: 0.5,
    clearcoat: 0.6,
    clearcoatRoughness: 0.14,
    reflection: 0.45,
    refraction: 0.05,
    iridescence: 0.4,
    surfaceDistortion: 0.08,
    microSurface: 0.35,
    grain: 0.18,
    noise: 0.08,
    bumpStrength: 0.22,
    scratches: 0.28,
    microScratches: 0.2,
  };
}

export function defaultLighting(): LightingSettings {
  return {
    key: {
      enabled: true,
      azimuth: 0.55,
      elevation: 0.62,
      intensity: 1.15,
      size: 0.6,
      softness: 0.45,
      color: "#f2f4f8",
    },
    fill: {
      enabled: true,
      azimuth: 3.4,
      elevation: 0.25,
      intensity: 0.28,
      size: 1,
      softness: 0.8,
      color: "#9aa8bc",
    },
    rim: {
      enabled: true,
      azimuth: 2.6,
      elevation: 0.4,
      intensity: 0.55,
      size: 0.4,
      softness: 0.3,
      color: "#d5e2f0",
    },
    ambientIntensity: 0.22,
    ambientColor: "#8b93a3",
    specularLight: 1,
    envIntensity: 0.5,
    shadowStrength: 0.45,
    followMouse: false,
  };
}

export function defaultLayers(): Layer[] {
  const mk = (
    id: string,
    name: string,
    kind: Layer["kind"],
    opacity = 1,
  ): Layer => ({
    id,
    name,
    kind,
    visible: true,
    locked: false,
    opacity,
    blend: "mix",
    mask: "none",
  });
  return [
    mk("base", "Card Base", "base"),
    mk("artwork", "Artwork", "artwork"),
    mk("foil", "Foil", "foil", 0.85),
    mk("diffraction", "Diffraction", "diffraction", 0.9),
    mk("holographic", "Holographic Pattern", "holographic"),
    mk("iridescence", "Iridescence", "iridescence", 0.9),
    mk("reflection", "Reflection", "reflection", 0.7),
    mk("texture", "Texture", "texture", 0.8),
    mk("scratches", "Scratches", "scratches", 0.75),
    mk("gloss", "Gloss", "gloss"),
    mk("lighting", "Lighting", "lighting"),
    mk("border", "Border", "border", false, 0.01)
  ];
}

export function defaultTextures(): TextureAsset[] {
  const base = {
    scale: 1,
    rotation: 0,
    posX: 0,
    posY: 0,
    repeat: 1,
    mirror: false,
    opacity: 1,
    brightness: 1,
    contrast: 1,
    hue: 0,
    saturation: 1,
    distortion: 0,
    blur: 0,
    blend: "mix" as const,
    animation: 0,
    enabled: true,
    src: "",
    builtin: true,
  };
  return [
    { ...base, id: "tex-grain", name: "Paper Grain", kind: "grain" },
    { ...base, id: "tex-scratch", name: "Micro Scratches", kind: "scratch" },
    { ...base, id: "tex-foil", name: "Foil Grain", kind: "foil" },
    { ...base, id: "tex-bump", name: "Micro Bump", kind: "bump" },
    { ...base, id: "tex-dots", name: "Dot Screen", kind: "mask", enabled: false },
    { ...base, id: "tex-stars", name: "Star Field", kind: "overlay", enabled: false },
    { ...base, id: "tex-lines", name: "Line Grating", kind: "diffraction", enabled: false },
    { ...base, id: "tex-hex", name: "Hex Cells", kind: "holo", enabled: false },
  ];
}

export function defaultAnimation(): AnimationSettings {
  return {
    preset: "idle",
    playing: false,
    duration: 6,
    fps: 30,
    rotationSpeed: 0.35,
    rotationDirection: 1,
    tilt: 0.22,
    cameraMove: 0.15,
    zoomPulse: 0,
    lightMove: 0.4,
    holoAnim: 0.3,
    reflectionAnim: 0.1,
    textureAnim: 0.05,
    loop: true,
    easing: "easeInOut",
    autoRotate: false,
  };
}

export function defaultCamera(): CameraSettings {
  return {
    distance: 3.15,
    fov: 28,
    rotX: -0.18,
    rotY: 0.32,
    rotZ: 0,
    zoom: 1,
    perspective: 1,
  };
}

export function defaultExport(): ExportSettings {
  return {
    format: "png",
    resolution: 2048,
    fps: 20,
    duration: 4,
    quality: 0.85,
    dither: true,
    transparent: false,
    background: "studio",
    solidColor: "#0a0a0c",
    shadow: true,
    loop: true,
    bitrate: 6_000_000,
  };
}

export function defaultProject(): StudioProject {
  return {
    version: 1,
    name: "Untitled Card",
    card: defaultCard(),
    front: defaultArt(),
    back: defaultArt(),
    holo: defaultHolo(),
    diffraction: defaultDiffraction(),
    iridescence: defaultIridescence(),
    reflection: defaultReflection(),
    material: defaultMaterial(),
    lighting: defaultLighting(),
    layers: defaultLayers(),
    textures: defaultTextures(),
    animation: defaultAnimation(),
    camera: defaultCamera(),
    quality: "ultra",
    advanced: false,
  };
}
