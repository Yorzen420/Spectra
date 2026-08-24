import * as THREE from "three";
import { BG_FRAG, BG_VERT, CARD_FRAG, CARD_VERT, EDGE_FRAG, EDGE_VERT } from "./shaders";
import type { StudioProject } from "./types";
import { blendToFloat, dirFromSpherical, hexToVec3, layerOpacity, patternIndex } from "./uniforms";

const HOLO_PAT: Record<string, number> = {
  linear: 0, radial: 1, circular: 2, diamond: 3, grid: 4, crosshatch: 5,
  microlines: 6, prism: 7, shattered: 8, starburst: 9, spectrum: 10,
  galaxy: 11, aurora: 12, kaleidoscope: 13,
};
const GRAT_PAT: Record<string, number> = {
  lines: 0, cross: 1, radial: 2, concentric: 3, hex: 4, dots: 5, wave: 6, chevron: 7,
};
const BORDER_STYLE: Record<string, number> = {
  foil: 0, metallic: 1, matte: 2, inset: 3, ornate: 4,
};
const MASK_TYPE: Record<string, number> = {
  none: 0, full: 1, center: 2, border: 3, character: 4, reverse: 5,
  gradient: 6, image: 7, luminance: 8,
};

function emptyTex() {
  const data = new Uint8Array([20, 22, 28, 255]);
  const t = new THREE.DataTexture(data, 1, 1);
  t.needsUpdate = true;
  return t;
}

function canvasTex(c: HTMLCanvasElement, aniso: number) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = aniso;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.needsUpdate = true;
  return t;
}

export class CardRenderer {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;
  readonly clock = new THREE.Timer();
  readonly cardGroup = new THREE.Group();
  viewCanvas: HTMLCanvasElement | null = null;
  private blitCtx: CanvasRenderingContext2D | null = null;

  private frontMat: THREE.ShaderMaterial;
  private backMat: THREE.ShaderMaterial;
  private edgeMat: THREE.ShaderMaterial;
  private bgMat: THREE.ShaderMaterial;
  private frontMesh: THREE.Mesh;
  private backMesh: THREE.Mesh;
  private edgeMesh: THREE.Mesh;
  private shadowMesh: THREE.Mesh;
  private dummy = emptyTex();
  private frontTex: THREE.Texture = this.dummy;
  private backTex: THREE.Texture = this.dummy;
  private maskTex: THREE.Texture = this.dummy;
  private scratchTex: THREE.Texture = this.dummy;
  private grainTex: THREE.Texture = this.dummy;
  private foilTex: THREE.Texture = this.dummy;
  private bumpTex: THREE.Texture = this.dummy;
  private raf = 0;
  private running = false;
  private project: StudioProject | null = null;
  private pointer = { x: 0, y: 0, down: false, lx: 0, ly: 0 };
  private tilt = { x: 0, y: 0 };
  private orbit = { x: -0.18, y: 0.32 };
  private targetOrbit = { x: -0.18, y: 0.32 };
  private animTime = 0;
  private fpsAccum = 0;
  private fpsFrames = 0;
  fps = 60;
  onFps?: (n: number) => void;
  lost = false;
  webgl = true;
  private dprCap = 1.5;
  private exportMode = false;

  constructor(readonly canvas: HTMLCanvasElement) {
    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: true,
      });
    } catch {
      this.webgl = false;
      this.renderer = null as unknown as THREE.WebGLRenderer;
      this.camera = new THREE.PerspectiveCamera();
      this.frontMat = this.backMat = this.edgeMat = this.bgMat =
        null as unknown as THREE.ShaderMaterial;
      this.frontMesh = this.backMesh = this.edgeMesh = this.shadowMesh =
        null as unknown as THREE.Mesh;
      return;
    }
    this.webgl = true;
    this.renderer.debug.checkShaderErrors = true;
    this.renderer.debug.onShaderError = (gl, _program, vs, fs) => {
      const vlog = gl.getShaderInfoLog(vs);
      const flog = gl.getShaderInfoLog(fs);
      console.error("[spectra] vertex shader", vlog);
      console.error("[spectra] fragment shader", flog);
    };
    this.renderer.setClearColor(0x0c0d12, 1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.dprCap));

    this.camera = new THREE.PerspectiveCamera(28, 1, 0.05, 40);
    this.camera.position.set(0, 0, 3.15);
    this.camera.lookAt(0, 0, 0);

    const uniforms = this.makeUniforms();
    this.frontMat = new THREE.ShaderMaterial({
      vertexShader: CARD_VERT,
      fragmentShader: CARD_FRAG,
      uniforms: THREE.UniformsUtils.clone(uniforms),
      transparent: true,
      side: THREE.FrontSide,
      depthWrite: false,
    });
    this.backMat = new THREE.ShaderMaterial({
      vertexShader: CARD_VERT,
      fragmentShader: CARD_FRAG,
      uniforms: THREE.UniformsUtils.clone(uniforms),
      transparent: true,
      side: THREE.FrontSide,
      depthWrite: false,
    });
    this.edgeMat = new THREE.ShaderMaterial({
      vertexShader: EDGE_VERT,
      fragmentShader: EDGE_FRAG,
      uniforms: {
        uColor: { value: new THREE.Color("#c9d0da") },
        uMetal: { value: 0.85 },
        uKeyDir: { value: new THREE.Vector3(0.4, 0.7, 0.6) },
        uKeyCol: { value: new THREE.Color("#f2f4f8") },
        uKeyInt: { value: 1.1 },
      },
    });
    this.bgMat = new THREE.ShaderMaterial({
      vertexShader: BG_VERT,
      fragmentShader: BG_FRAG,
      uniforms: {
        uA: { value: new THREE.Color("#08080a") },
        uB: { value: new THREE.Color("#14141a") },
        uVignette: { value: 0.85 },
        uStudio: { value: 1 },
      },
      depthTest: false,
      depthWrite: false,
    });

    const bg = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.bgMat);
    bg.frustumCulled = false;
    bg.renderOrder = -10;
    this.scene.add(bg);

    const plane = new THREE.PlaneGeometry(1, 1, 1, 1);
    this.frontMesh = new THREE.Mesh(plane, this.frontMat);
    this.backMesh = new THREE.Mesh(plane.clone(), this.backMat);
    this.backMesh.rotation.y = Math.PI;
    this.edgeMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this.edgeMat);
    this.cardGroup.add(this.edgeMesh, this.frontMesh, this.backMesh);

    const shadowGeo = new THREE.PlaneGeometry(1.4, 1.9);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    this.shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    this.shadowMesh.rotation.x = -Math.PI / 2;
    this.shadowMesh.position.y = -0.95;
    this.scene.add(this.shadowMesh);
    this.scene.add(this.cardGroup);

    canvas.addEventListener("webglcontextlost", this.onLost);
    canvas.addEventListener("webglcontextrestored", this.onRestored);
  }

  private makeUniforms(): Record<string, THREE.IUniform> {
    const z = () => ({ value: 0 });
    const o = () => ({ value: 1 });
    const v3 = (x = 0, y = 0, zc = 1) => ({ value: new THREE.Vector3(x, y, zc) });
    const c = (hex: string) => ({ value: new THREE.Color(hex) });
    return {
      uArt: { value: this.dummy },
      uMask: { value: this.dummy },
      uScratch: { value: this.dummy },
      uGrain: { value: this.dummy },
      uFoil: { value: this.dummy },
      uBump: { value: this.dummy },
      uArtSize: { value: new THREE.Vector2(1, 1) },
      uHasArt: z(),
      uHasMask: z(),
      uTime: z(),
      uQuality: o(),
      uSide: z(),
      uCardSize: { value: new THREE.Vector2(63, 88) },
      uCorner: { value: 0.045 },
      uBorder: { value: 0.035 },
      uBorderStyle: z(),
      uArtPos: { value: new THREE.Vector2() },
      uArtScale: o(),
      uArtRot: z(),
      uArtOpacity: o(),
      uArtBright: o(),
      uArtContrast: o(),
      uArtSat: o(),
      uArtHue: z(),
      uArtGamma: o(),
      uArtBlur: z(),
      uFit: z(),
      uHoloInt: { value: 0.85 },
      uHoloOp: { value: 0.72 },
      uHoloDisp: { value: 0.85 },
      uHoloRain: { value: 0.9 },
      uHoloHue: { value: 0.08 },
      uHoloSat: { value: 1.15 },
      uHoloCon: { value: 1.1 },
      uHoloFreq: { value: 6.5 },
      uHoloScale: o(),
      uHoloDir: { value: 0.15 },
      uHoloRot: { value: 0.2 },
      uHoloDist: { value: 0.25 },
      uHoloNoise: { value: 0.2 },
      uHoloTurb: { value: 0.35 },
      uHoloSharp: { value: 0.55 },
      uHoloAnim: { value: 0.15 },
      uHoloView: o(),
      uHoloPattern: z(),
      uHoloMask: { value: 1 },
      uHoloBlend: { value: 2 },
      uGratFreq: { value: 18 },
      uGratDens: { value: 1.1 },
      uGratScale: o(),
      uGratAng: { value: 0.35 },
      uGratDir: z(),
      uGratDisp: { value: 1.1 },
      uGratSpread: o(),
      uGratRain: { value: 0.8 },
      uGratHue: { value: 0.12 },
      uGratCon: { value: 1.15 },
      uGratSharp: { value: 0.6 },
      uGratDist: { value: 0.12 },
      uGratPersp: { value: 0.7 },
      uGratFall: { value: 0.25 },
      uGratLight: { value: 0.8 },
      uGratPat: z(),
      uGratOp: { value: 0.7 },
      uIriInt: { value: 0.45 },
      uIriView: { value: 0.7 },
      uIriHue: { value: 0.2 },
      uIriSpread: { value: 0.65 },
      uIriSat: { value: 1.05 },
      uIriRough: { value: 0.22 },
      uMetallic: { value: 0.7 },
      uFresnel: { value: 0.55 },
      uSpecular: { value: 0.8 },
      uClearcoat: { value: 0.65 },
      uCcRough: { value: 0.12 },
      uCloneN: z(),
      uCloneSp: { value: 0.35 },
      uCloneSc: o(),
      uCloneRot: z(),
      uCloneOp: { value: 0.45 },
      uReflAng: z(),
      uReflBlur: z(),
      uReflDist: { value: 0.05 },
      uMirrorAx: z(),
      uHMirror: z(),
      uVMirror: z(),
      uRadRefl: z(),
      uKaleido: z(),
      uKaleidoSeg: { value: 6 },
      uReflFall: { value: 0.6 },
      uReflBlend: { value: 2 },
      uGloss: { value: 0.72 },
      uReflect: { value: 0.45 },
      uRefract: { value: 0.05 },
      uGrainAmt: { value: 0.18 },
      uBumpAmt: { value: 0.22 },
      uScratchAmt: { value: 0.28 },
      uMicroScratch: { value: 0.2 },
      uMicroSurf: { value: 0.35 },
      uSurfDist: { value: 0.08 },
      uMatNoise: { value: 0.08 },
      uKeyDir: v3(0.4, 0.7, 0.6),
      uKeyCol: c("#f2f4f8"),
      uKeyInt: { value: 1.15 },
      uKeySoft: { value: 0.45 },
      uFillDir: v3(-0.5, 0.2, 0.4),
      uFillCol: c("#9aa8bc"),
      uFillInt: { value: 0.28 },
      uRimDir: v3(-0.3, 0.2, -0.7),
      uRimCol: c("#d5e2f0"),
      uRimInt: { value: 0.55 },
      uAmbCol: c("#8b93a3"),
      uAmbInt: { value: 0.22 },
      uSpecLight: o(),
      uEnvInt: { value: 0.5 },
      uShadow: { value: 0.45 },
      uEdgeCol: c("#c9d0da"),
      uEdgeMetal: { value: 0.85 },
      uBgCol: c("#0b0d12"),
      uLayerBase: o(),
      uLayerArt: o(),
      uLayerBorder: o(),
      uLayerFoil: o(),
      uLayerDiff: o(),
      uLayerHolo: o(),
      uLayerIri: o(),
      uLayerRefl: o(),
      uLayerTex: o(),
      uLayerScratch: o(),
      uLayerGloss: o(),
      uLayerLight: o(),
    };
  }

  setMaps(maps: {
    front?: THREE.Texture | HTMLCanvasElement | null;
    back?: THREE.Texture | HTMLCanvasElement | null;
    mask?: THREE.Texture | HTMLCanvasElement | null;
    scratch?: HTMLCanvasElement | null;
    grain?: HTMLCanvasElement | null;
    foil?: HTMLCanvasElement | null;
    bump?: HTMLCanvasElement | null;
  }) {
    if (!this.webgl) return;
    const aniso = this.renderer.capabilities.getMaxAnisotropy();
    const bind = (src: THREE.Texture | HTMLCanvasElement | null | undefined, prev: THREE.Texture) => {
      if (!src) return prev;
      if (src instanceof THREE.Texture) return src;
      if (prev !== this.dummy) prev.dispose();
      return canvasTex(src, aniso);
    };
    if (maps.front !== undefined) {
      this.frontTex = bind(maps.front, this.frontTex);
    }
    if (maps.back !== undefined) {
      this.backTex = bind(maps.back, this.backTex);
    }
    if (maps.mask !== undefined) this.maskTex = bind(maps.mask, this.maskTex);
    if (maps.scratch) this.scratchTex = bind(maps.scratch, this.scratchTex);
    if (maps.grain) this.grainTex = bind(maps.grain, this.grainTex);
    if (maps.foil) this.foilTex = bind(maps.foil, this.foilTex);
    if (maps.bump) this.bumpTex = bind(maps.bump, this.bumpTex);
    this.applyTextures();
  }

  private applyTextures() {
    const apply = (mat: THREE.ShaderMaterial, tex: THREE.Texture, side: number) => {
      const u = mat.uniforms;
      u.uArt.value = tex;
      u.uHasArt.value = tex === this.dummy ? 0 : 1;
      u.uMask.value = this.maskTex;
      u.uHasMask.value = this.maskTex === this.dummy ? 0 : 1;
      u.uScratch.value = this.scratchTex;
      u.uGrain.value = this.grainTex;
      u.uFoil.value = this.foilTex;
      u.uBump.value = this.bumpTex;
      u.uSide.value = side;
      const img = tex.image as { width?: number; height?: number } | undefined;
      if (img?.width && img?.height) {
        u.uArtSize.value.set(img.width, img.height);
      }
    };
    apply(this.frontMat, this.frontTex, 0);
    apply(this.backMat, this.backTex, 1);
  }

  setProject(p: StudioProject) {
    this.project = p;
    if (!this.webgl) return;
    this.syncFromProject(p, 0);
  }

  private syncFromProject(p: StudioProject, time: number) {
    const aspect = p.card.widthMm / p.card.heightMm;
    const h = 1.28;
    const w = h * aspect;
    const d = p.card.depth * 1.2;
    this.frontMesh.scale.set(w, h, 1);
    this.backMesh.scale.set(w, h, 1);
    this.frontMesh.position.z = d / 2 + 0.0008;
    this.backMesh.position.z = -(d / 2 + 0.0008);
    this.edgeMesh.scale.set(w * 0.992, h * 0.992, Math.max(d, 0.008));
    this.shadowMesh.scale.set(w * 1.15, 1, h * 1.05);
    this.shadowMesh.position.y = -h * 0.62;
    (this.shadowMesh.material as THREE.MeshBasicMaterial).opacity = 0.22 * p.lighting.shadowStrength;

    this.camera.fov = p.camera.fov;
    this.camera.position.z = p.camera.distance / Math.max(p.camera.zoom, 0.2);
    this.camera.updateProjectionMatrix();

    const dpr =
      p.quality === "ultra" ? 2 : p.quality === "high" ? 1.5 : 1;
    this.dprCap = dpr;
    if (!this.exportMode) {
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dpr));
    }

    this.pushUniforms(this.frontMat, p, time, p.front);
    this.pushUniforms(this.backMat, p, time, p.back);

    const keyDir = dirFromSpherical(p.lighting.key.azimuth, p.lighting.key.elevation);
    this.edgeMat.uniforms.uColor.value.set(p.card.edgeColor);
    this.edgeMat.uniforms.uMetal.value = p.card.edgeMetal;
    this.edgeMat.uniforms.uKeyDir.value.copy(keyDir);
    this.edgeMat.uniforms.uKeyCol.value.set(p.lighting.key.color);
    this.edgeMat.uniforms.uKeyInt.value = p.lighting.key.intensity;
  }

  private pushUniforms(
    mat: THREE.ShaderMaterial,
    p: StudioProject,
    time: number,
    art: StudioProject["front"],
  ) {
    const u = mat.uniforms;
    const h = p.holo;
    const d = p.diffraction;
    const ir = p.iridescence;
    const r = p.reflection;
    const m = p.material;
    const L = p.lighting;

    u.uTime.value = time;
    u.uQuality.value = p.quality === "ultra" ? 2 : p.quality === "high" ? 1 : 0;
    u.uCardSize.value.set(p.card.widthMm, p.card.heightMm);
    u.uCorner.value = p.card.cornerRadius;
    u.uBorder.value = p.card.borderThickness;
    u.uBorderStyle.value = BORDER_STYLE[p.card.borderStyle] ?? 0;
    u.uArtPos.value.set(art.posX, art.posY);
    u.uArtScale.value = art.scale;
    u.uArtRot.value = art.rotation;
    u.uArtOpacity.value = art.opacity;
    u.uArtBright.value = art.brightness;
    u.uArtContrast.value = art.contrast;
    u.uArtSat.value = art.saturation;
    u.uArtHue.value = art.hue;
    u.uArtGamma.value = art.gamma;
    u.uArtBlur.value = art.blur;
    u.uFit.value = art.fit === "fit" ? 1 : 0;

    u.uHoloInt.value = h.intensity;
    u.uHoloOp.value = h.opacity;
    u.uHoloDisp.value = h.spectralDispersion;
    u.uHoloRain.value = h.rainbowStrength;
    u.uHoloHue.value = h.hueShift;
    u.uHoloSat.value = h.saturation;
    u.uHoloCon.value = h.contrast;
    u.uHoloFreq.value = h.frequency;
    u.uHoloScale.value = h.scale;
    u.uHoloDir.value = h.direction;
    u.uHoloRot.value = h.rotation;
    u.uHoloDist.value = h.distortion;
    u.uHoloNoise.value = h.noise;
    u.uHoloTurb.value = h.turbulence;
    u.uHoloSharp.value = h.sharpness;
    u.uHoloAnim.value = h.animation + p.animation.holoAnim * (p.animation.playing ? 1 : 0);
    u.uHoloView.value = h.viewResponse;
    u.uHoloPattern.value = HOLO_PAT[h.pattern] ?? 0;
    u.uHoloMask.value = MASK_TYPE[h.mask] ?? 1;
    u.uHoloBlend.value = blendToFloat(h.blend);

    u.uGratFreq.value = d.frequency;
    u.uGratDens.value = d.density;
    u.uGratScale.value = d.scale;
    u.uGratAng.value = d.angle;
    u.uGratDir.value = d.direction;
    u.uGratDisp.value = d.spectralDispersion;
    u.uGratSpread.value = d.wavelengthSpread;
    u.uGratRain.value = d.rainbowIntensity;
    u.uGratHue.value = d.hueOffset;
    u.uGratCon.value = d.contrast;
    u.uGratSharp.value = d.sharpness;
    u.uGratDist.value = d.distortion;
    u.uGratPersp.value = d.perspective;
    u.uGratFall.value = d.falloff;
    u.uGratLight.value = d.lightInteraction;
    u.uGratPat.value = GRAT_PAT[d.pattern] ?? 0;
    u.uGratOp.value = d.opacity;

    u.uIriInt.value = ir.intensity;
    u.uIriView.value = ir.viewSensitivity;
    u.uIriHue.value = ir.hueRange;
    u.uIriSpread.value = ir.colorSpread;
    u.uIriSat.value = ir.saturation;
    u.uIriRough.value = ir.roughness;
    u.uMetallic.value = m.metallic;
    u.uFresnel.value = m.fresnel;
    u.uSpecular.value = m.specular;
    u.uClearcoat.value = m.clearcoat;
    u.uCcRough.value = m.clearcoatRoughness;

    u.uCloneN.value = r.cloneCount;
    u.uCloneSp.value = r.cloneSpacing;
    u.uCloneSc.value = r.cloneScale;
    u.uCloneRot.value = r.cloneRotation + (p.animation.playing ? p.animation.reflectionAnim * time * 0.15 : 0);
    u.uCloneOp.value = r.cloneOpacity;
    u.uReflAng.value = r.reflectionAngle;
    u.uReflBlur.value = r.reflectionBlur;
    u.uReflDist.value = r.reflectionDistortion;
    u.uMirrorAx.value = r.mirrorAxis;
    u.uHMirror.value = r.horizontalMirror ? 1 : 0;
    u.uVMirror.value = r.verticalMirror ? 1 : 0;
    u.uRadRefl.value = r.radialReflection ? 1 : 0;
    u.uKaleido.value = r.kaleidoscope ? 1 : 0;
    u.uKaleidoSeg.value = r.kaleidoSegments;
    u.uReflFall.value = r.falloff;
    u.uReflBlend.value = blendToFloat(r.blend);

    u.uGloss.value = m.gloss;
    u.uReflect.value = m.reflection;
    u.uRefract.value = m.refraction;
    u.uGrainAmt.value = m.grain;
    u.uBumpAmt.value = m.bumpStrength;
    u.uScratchAmt.value = m.scratches;
    u.uMicroScratch.value = m.microScratches;
    u.uMicroSurf.value = m.microSurface;
    u.uSurfDist.value = m.surfaceDistortion;
    u.uMatNoise.value = m.noise;

    let az = L.key.azimuth;
    let el = L.key.elevation;
    if (L.followMouse && !this.pointer.down) {
      az += this.pointer.x * 0.9;
      el += this.pointer.y * 0.45;
    }
    u.uKeyDir.value.copy(dirFromSpherical(az, el));
    u.uKeyCol.value.set(L.key.color);
    u.uKeyInt.value = L.key.enabled ? L.key.intensity : 0;
    u.uKeySoft.value = L.key.softness;
    u.uFillDir.value.copy(dirFromSpherical(L.fill.azimuth, L.fill.elevation));
    u.uFillCol.value.set(L.fill.color);
    u.uFillInt.value = L.fill.enabled ? L.fill.intensity : 0;
    u.uRimDir.value.copy(dirFromSpherical(L.rim.azimuth, L.rim.elevation));
    u.uRimCol.value.set(L.rim.color);
    u.uRimInt.value = L.rim.enabled ? L.rim.intensity : 0;
    u.uAmbCol.value.set(L.ambientColor);
    u.uAmbInt.value = L.ambientIntensity;
    u.uSpecLight.value = L.specularLight;
    u.uEnvInt.value = L.envIntensity;
    u.uShadow.value = L.shadowStrength;
    u.uEdgeCol.value.set(p.card.edgeColor);
    u.uEdgeMetal.value = p.card.edgeMetal;
    u.uBgCol.value.set(p.card.background);

    u.uLayerBase.value = layerOpacity(p, "base");
    u.uLayerArt.value = layerOpacity(p, "artwork");
    u.uLayerBorder.value = layerOpacity(p, "border");
    u.uLayerFoil.value = layerOpacity(p, "foil");
    u.uLayerDiff.value = layerOpacity(p, "diffraction");
    u.uLayerHolo.value = layerOpacity(p, "holographic");
    u.uLayerIri.value = layerOpacity(p, "iridescence");
    u.uLayerRefl.value = layerOpacity(p, "reflection");
    u.uLayerTex.value = layerOpacity(p, "texture");
    u.uLayerScratch.value = layerOpacity(p, "scratches");
    u.uLayerGloss.value = layerOpacity(p, "gloss");
    u.uLayerLight.value = layerOpacity(p, "lighting");
  }

  attachView(el: HTMLCanvasElement) {
    this.viewCanvas = el;
    this.blitCtx = el.getContext("2d");
  }

  resize(w: number, h: number) {
    if (!this.webgl) return;
    const pw = Math.max(1, Math.floor(w));
    const ph = Math.max(1, Math.floor(h));
    this.renderer.setSize(pw, ph, false);
    this.camera.aspect = pw / ph;
    this.camera.updateProjectionMatrix();
    if (this.viewCanvas) {
      this.viewCanvas.width = pw;
      this.viewCanvas.height = ph;
    }
  }

  pointerMove(nx: number, ny: number, buttons: number) {
    if (buttons) {
      const dx = nx - this.pointer.lx;
      const dy = ny - this.pointer.ly;
      this.targetOrbit.y += dx * 2.6;
      this.targetOrbit.x += dy * 2.2;
      this.targetOrbit.x = Math.max(-1.15, Math.min(1.15, this.targetOrbit.x));
      this.pointer.down = true;
    } else {
      this.pointer.down = false;
    }
    this.pointer.x = nx;
    this.pointer.y = ny;
    this.pointer.lx = nx;
    this.pointer.ly = ny;
  }

  pointerUp() {
    this.pointer.down = false;
  }

  wheel(delta: number) {
    if (!this.project) return;
    const z = Math.max(0.45, Math.min(2.4, this.project.camera.zoom * (delta > 0 ? 0.94 : 1.06)));
    this.project.camera.zoom = z;
  }

  resetView() {
    this.targetOrbit.x = -0.18;
    this.targetOrbit.y = 0.32;
    this.orbit.x = -0.18;
    this.orbit.y = 0.32;
    if (this.project) this.project.camera.zoom = 1;
  }

  flip() {
    this.targetOrbit.y += Math.PI;
  }

  start() {
    if (!this.webgl || this.running) return;
    this.running = true;
    this.clock.connect(document);
    this.frame();
    const loop = () => {
      if (!this.running) return;
      this.raf = requestAnimationFrame(loop);
      this.frame();
    };
    this.raf = requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  private frame() {
    if (!this.webgl || !this.project) return;
    try {
      this.clock.update();
    const dt = Math.min(this.clock.getDelta(), 0.1);
    const p = this.project;

    this.orbit.x += (this.targetOrbit.x - this.orbit.x) * (1 - Math.exp(-10 * dt));
    this.orbit.y += (this.targetOrbit.y - this.orbit.y) * (1 - Math.exp(-10 * dt));

    if (p.lighting.followMouse && !this.pointer.down && !p.animation.playing) {
      this.tilt.x += (this.pointer.y * 0.22 - this.tilt.x) * (1 - Math.exp(-8 * dt));
      this.tilt.y += (this.pointer.x * 0.35 - this.tilt.y) * (1 - Math.exp(-8 * dt));
    } else {
      this.tilt.x += (0 - this.tilt.x) * (1 - Math.exp(-6 * dt));
      this.tilt.y += (0 - this.tilt.y) * (1 - Math.exp(-6 * dt));
    }

    let extraY = 0;
    let extraX = 0;
    let lightSweep = 0;
    if (p.animation.playing || p.animation.autoRotate) {
      this.animTime += dt;
      const T = Math.max(p.animation.duration, 0.1);
      const t = p.animation.loop ? (this.animTime % T) / T : Math.min(this.animTime / T, 1);
      const e = ease(t, p.animation.easing);
      const dir = p.animation.rotationDirection;
      if (p.animation.preset === "flip") {
        const cycle = t < 0.5 ? e * 2 : 1 + ease((t - 0.5) * 2, p.animation.easing);
        extraY = cycle * Math.PI * dir;
      } else if (p.animation.preset === "spin360") {
        extraY = t * Math.PI * 2 * dir;
      } else {
        extraY = Math.sin(e * Math.PI * 2) * 0.85 * p.animation.rotationSpeed * dir;
        extraX = Math.sin(e * Math.PI * 2 + 0.6) * p.animation.tilt;
      }
      lightSweep = Math.sin(t * Math.PI * 2) * p.animation.lightMove;
      const zoom = 1 + Math.sin(t * Math.PI * 2) * p.animation.zoomPulse * 0.12;
      this.camera.position.z = (p.camera.distance / Math.max(p.camera.zoom, 0.2)) / zoom;
      this.camera.position.x = Math.sin(t * Math.PI * 2) * p.animation.cameraMove * 0.15;
      this.camera.position.y = Math.cos(t * Math.PI * 2) * p.animation.cameraMove * 0.08;
      this.camera.lookAt(0, 0, 0);
    } else {
      this.camera.position.x = 0;
      this.camera.position.y = 0;
      this.camera.lookAt(0, 0, 0);
    }

    this.cardGroup.rotation.x = this.orbit.x + this.tilt.x + extraX;
    this.cardGroup.rotation.y = this.orbit.y + this.tilt.y + extraY;
    this.cardGroup.rotation.z = p.camera.rotZ;

    if (p.animation.playing) {
      p.lighting.key.azimuth = 0.55 + lightSweep * 1.2;
    }

    this.syncFromProject(p, this.animTime);
    this.renderer.render(this.scene, this.camera);
    if (this.blitCtx && this.viewCanvas) {
      this.blitCtx.drawImage(this.canvas, 0, 0, this.viewCanvas.width, this.viewCanvas.height);
    }

    this.fpsAccum += dt;
    this.fpsFrames++;
    if (this.fpsAccum >= 0.5) {
      this.fps = this.fpsFrames / this.fpsAccum;
      this.fpsAccum = 0;
      this.fpsFrames = 0;
      this.onFps?.(this.fps);
    }
    } catch (err) {
      console.error("[spectra] frame", err);
    }
  }

  /** Render one animation sample at normalized time 0..1 for export. */
  renderAt(normT: number, width: number, height: number, transparent: boolean) {
    if (!this.webgl || !this.project) return;
    const p = this.project;
    const t = ((normT % 1) + 1) % 1;
    const e = ease(t, p.animation.easing);
    const dir = p.animation.rotationDirection;
    let extraY = 0;
    let extraX = 0;
    if (p.animation.preset === "flip") {
      const cycle = t < 0.5 ? e * 2 : 1 + ease((t - 0.5) * 2, p.animation.easing);
      extraY = cycle * Math.PI * dir;
    } else if (p.animation.preset === "spin360") {
      extraY = t * Math.PI * 2 * dir;
    } else {
      extraY = Math.sin(e * Math.PI * 2) * 0.85 * p.animation.rotationSpeed * dir;
      extraX = Math.sin(e * Math.PI * 2 + 0.6) * p.animation.tilt;
    }
    this.cardGroup.rotation.x = this.orbit.x + extraX;
    this.cardGroup.rotation.y = this.orbit.y + extraY;
    p.lighting.key.azimuth = 0.55 + Math.sin(t * Math.PI * 2) * p.animation.lightMove * 1.2;
    this.syncFromProject(p, t * p.animation.duration);
    this.exportMode = true;
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setClearColor(0x000000, transparent ? 0 : 1);
    this.renderer.render(this.scene, this.camera);
    if (this.blitCtx && this.viewCanvas) {
      this.blitCtx.drawImage(this.canvas, 0, 0, this.viewCanvas.width, this.viewCanvas.height);
    }
  }

  capturePng(width: number, height: number, transparent: boolean): Promise<Blob> {
    return new Promise((resolve, reject) => {
      try {
        this.renderAt(0.08, width, height, transparent);
        this.canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("PNG encode failed"))),
          "image/png",
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  readPixels(width: number, height: number): Uint8ClampedArray {
    const gl = this.renderer.getContext();
    const buf = new Uint8Array(width * height * 4);
    gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, buf);
    // flip Y
    const out = new Uint8ClampedArray(width * height * 4);
    const row = width * 4;
    for (let y = 0; y < height; y++) {
      out.set(buf.subarray((height - 1 - y) * row, (height - y) * row), y * row);
    }
    return out;
  }

  restoreView(w: number, h: number) {
    this.exportMode = false;
    this.resize(w, h);
    this.renderer.setClearColor(0x000000, 0);
  }

  private onLost = (e: Event) => {
    e.preventDefault();
    this.lost = true;
    this.stop();
  };
  private onRestored = () => {
    this.lost = false;
    this.start();
  };

  dispose() {
    this.stop();
    if (!this.webgl) return;
    this.canvas.removeEventListener("webglcontextlost", this.onLost);
    this.canvas.removeEventListener("webglcontextrestored", this.onRestored);
    this.frontMat.dispose();
    this.backMat.dispose();
    this.edgeMat.dispose();
    this.bgMat.dispose();
    this.frontMesh.geometry.dispose();
    this.edgeMesh.geometry.dispose();
    this.renderer.dispose();
  }
}

function ease(t: number, name: string) {
  t = Math.min(1, Math.max(0, t));
  switch (name) {
    case "linear":
      return t;
    case "easeIn":
      return t * t;
    case "easeOut":
      return 1 - (1 - t) * (1 - t);
    case "easeInOut":
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    case "cubic":
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    case "smoothstep":
      return t * t * (3 - 2 * t);
    default:
      return t;
  }
}

// silence unused import if tree-shaken oddly
void patternIndex;
void hexToVec3;
