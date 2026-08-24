/** GLSL holographic foil engine — view-angle spectral diffraction, iridescence, clones. */

export const CARD_VERT = /* glsl */ `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPos;
varying vec3 vViewDir;
varying vec3 vObjectPos;

void main() {
  vUv = uv;
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorldPos = world.xyz;
  vObjectPos = position;
  vNormal = normalize(mat3(modelMatrix) * normal);
  vViewDir = normalize(cameraPosition - world.xyz);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

export const CARD_FRAG = /* glsl */ `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPos;
varying vec3 vViewDir;
varying vec3 vObjectPos;

uniform sampler2D uArt;
uniform sampler2D uMask;
uniform sampler2D uScratch;
uniform sampler2D uGrain;
uniform sampler2D uFoil;
uniform sampler2D uBump;
uniform vec2 uArtSize;
uniform float uHasArt;
uniform float uHasMask;

uniform float uTime;
uniform float uQuality;
uniform float uSide; // 0 front, 1 back
uniform vec2 uCardSize;
uniform float uCorner;
uniform float uBorder;
uniform float uBorderStyle;

// Art transform
uniform vec2 uArtPos;
uniform float uArtScale;
uniform float uArtRot;
uniform float uArtOpacity;
uniform float uArtBright;
uniform float uArtContrast;
uniform float uArtSat;
uniform float uArtHue;
uniform float uArtGamma;
uniform float uArtBlur;
uniform float uFit; // 0 fill, 1 fit

// Holo
uniform float uHoloInt;
uniform float uHoloOp;
uniform float uHoloDisp;
uniform float uHoloRain;
uniform float uHoloHue;
uniform float uHoloSat;
uniform float uHoloCon;
uniform float uHoloFreq;
uniform float uHoloScale;
uniform float uHoloDir;
uniform float uHoloRot;
uniform float uHoloDist;
uniform float uHoloNoise;
uniform float uHoloTurb;
uniform float uHoloSharp;
uniform float uHoloAnim;
uniform float uHoloView;
uniform float uHoloPattern;
uniform float uHoloMask;
uniform float uHoloBlend;

// Diffraction
uniform float uGratFreq;
uniform float uGratDens;
uniform float uGratScale;
uniform float uGratAng;
uniform float uGratDir;
uniform float uGratDisp;
uniform float uGratSpread;
uniform float uGratRain;
uniform float uGratHue;
uniform float uGratCon;
uniform float uGratSharp;
uniform float uGratDist;
uniform float uGratPersp;
uniform float uGratFall;
uniform float uGratLight;
uniform float uGratPat;
uniform float uGratOp;

// Iridescence
uniform float uIriInt;
uniform float uIriView;
uniform float uIriHue;
uniform float uIriSpread;
uniform float uIriSat;
uniform float uIriRough;
uniform float uMetallic;
uniform float uFresnel;
uniform float uSpecular;
uniform float uClearcoat;
uniform float uCcRough;

// Reflection clones
uniform float uCloneN;
uniform float uCloneSp;
uniform float uCloneSc;
uniform float uCloneRot;
uniform float uCloneOp;
uniform float uReflAng;
uniform float uReflBlur;
uniform float uReflDist;
uniform float uMirrorAx;
uniform float uHMirror;
uniform float uVMirror;
uniform float uRadRefl;
uniform float uKaleido;
uniform float uKaleidoSeg;
uniform float uReflFall;
uniform float uReflBlend;

// Material
uniform float uGloss;
uniform float uReflect;
uniform float uRefract;
uniform float uGrainAmt;
uniform float uBumpAmt;
uniform float uScratchAmt;
uniform float uMicroScratch;
uniform float uMicroSurf;
uniform float uSurfDist;
uniform float uMatNoise;

// Lighting
uniform vec3 uKeyDir;
uniform vec3 uKeyCol;
uniform float uKeyInt;
uniform float uKeySoft;
uniform vec3 uFillDir;
uniform vec3 uFillCol;
uniform float uFillInt;
uniform vec3 uRimDir;
uniform vec3 uRimCol;
uniform float uRimInt;
uniform vec3 uAmbCol;
uniform float uAmbInt;
uniform float uSpecLight;
uniform float uEnvInt;
uniform float uShadow;

uniform vec3 uEdgeCol;
uniform float uEdgeMetal;
uniform vec3 uBgCol;
uniform float uLayerBase;
uniform float uLayerArt;
uniform float uLayerBorder;
uniform float uLayerFoil;
uniform float uLayerDiff;
uniform float uLayerHolo;
uniform float uLayerIri;
uniform float uLayerRefl;
uniform float uLayerTex;
uniform float uLayerScratch;
uniform float uLayerGloss;
uniform float uLayerLight;

// ---- helpers ----
float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
vec2 hash22(vec2 p) {
  float n = hash21(p);
  return vec2(n, hash21(p + n));
}
float noise21(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise21(p);
    p = p * 2.07 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}
vec3 hueRotate(vec3 c, float h) {
  float a = h * 6.2831853;
  float cosA = cos(a);
  float sinA = sin(a);
  mat3 m = mat3(
    0.299+0.701*cosA+0.168*sinA, 0.299-0.299*cosA-0.328*sinA, 0.299-0.300*cosA+1.250*sinA,
    0.587-0.587*cosA+0.330*sinA, 0.587+0.413*cosA+0.035*sinA, 0.587-0.588*cosA-1.050*sinA,
    0.114-0.114*cosA-0.497*sinA, 0.114-0.114*cosA+0.292*sinA, 0.114+0.886*cosA-0.203*sinA
  );
  return clamp(c * m, 0.0, 1.0);
}
vec3 satContrast(vec3 c, float s, float con) {
  float l = dot(c, vec3(0.299, 0.587, 0.114));
  c = mix(vec3(l), c, s);
  c = (c - 0.5) * con + 0.5;
  return c;
}
vec3 blendOverlay(vec3 b, vec3 o) {
  return mix(2.0 * b * o, 1.0 - 2.0 * (1.0 - b) * (1.0 - o), step(0.5, b));
}
vec3 blendSoft(vec3 b, vec3 o) {
  return (1.0 - 2.0 * o) * b * b + 2.0 * o * b;
}
vec3 applyBlend(vec3 b, vec3 o, float mode, float op) {
  vec3 r = o;
  if (mode < 0.5) r = mix(b, o, 1.0);
  else if (mode < 1.5) r = b + o;
  else if (mode < 2.5) r = 1.0 - (1.0 - b) * (1.0 - o);
  else if (mode < 3.5) r = blendOverlay(b, o);
  else if (mode < 4.5) r = b * o;
  else if (mode < 5.5) r = blendSoft(b, o);
  else {
    float l = dot(b, vec3(0.299, 0.587, 0.114));
    r = o * l / max(dot(o, vec3(0.299, 0.587, 0.114)), 0.001);
  }
  return mix(b, r, op);
}

// CIE-ish wavelength to RGB (380–780 nm)
vec3 wavelengthRGB(float nm) {
  vec3 col = vec3(0.0);
  if (nm >= 380.0 && nm < 440.0) {
    col = vec3(-(nm - 440.0) / 60.0, 0.0, 1.0);
  } else if (nm < 490.0) {
    col = vec3(0.0, (nm - 440.0) / 50.0, 1.0);
  } else if (nm < 510.0) {
    col = vec3(0.0, 1.0, -(nm - 510.0) / 20.0);
  } else if (nm < 580.0) {
    col = vec3((nm - 510.0) / 70.0, 1.0, 0.0);
  } else if (nm < 645.0) {
    col = vec3(1.0, -(nm - 645.0) / 65.0, 0.0);
  } else if (nm <= 780.0) {
    col = vec3(1.0, 0.0, 0.0);
  }
  float fac = 1.0;
  if (nm > 700.0) fac = 0.3 + 0.7 * (780.0 - nm) / 80.0;
  else if (nm < 420.0) fac = 0.3 + 0.7 * (nm - 380.0) / 40.0;
  return col * fac;
}

vec2 rotate2(vec2 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec2(c * p.x - s * p.y, s * p.x + c * p.y);
}

float sdRoundBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

vec2 voronoi(vec2 p) {
  vec2 n = floor(p);
  vec2 f = fract(p);
  float md = 8.0;
  vec2 mr = vec2(0.0);
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = hash22(n + g);
      vec2 r = g + o - f;
      float d = dot(r, r);
      if (d < md) {
        md = d;
        mr = r;
      }
    }
  }
  return vec2(md, atan(mr.y, mr.x));
}

vec2 kaleidoUv(vec2 uv, float segs) {
  vec2 p = uv - 0.5;
  float a = atan(p.y, p.x);
  float r = length(p);
  float seg = 6.2831853 / max(segs, 2.0);
  a = mod(a, seg);
  a = abs(a - seg * 0.5);
  return vec2(cos(a), sin(a)) * r + 0.5;
}

vec2 artUv(vec2 uv) {
  vec2 p = uv - 0.5 - uArtPos;
  p = rotate2(p, uArtRot);
  p /= max(uArtScale, 0.05);
  // aspect-aware fit/fill
  float cardA = uCardSize.x / max(uCardSize.y, 0.001);
  float artA = uArtSize.x / max(uArtSize.y, 0.001);
  if (uFit < 0.5) {
    // fill
    if (artA > cardA) p.x *= cardA / artA;
    else p.y *= artA / cardA;
  } else {
    // fit
    if (artA > cardA) p.y *= artA / cardA;
    else p.x *= cardA / artA;
  }
  return p + 0.5;
}

vec3 sampleArt(vec2 uv) {
  if (uHasArt < 0.5) {
    // fallback dark field
    return uBgCol;
  }
  vec2 suv = artUv(uv);
  vec4 t = texture2D(uArt, clamp(suv, 0.0, 1.0));
  float inb = step(0.0, suv.x) * step(suv.x, 1.0) * step(0.0, suv.y) * step(suv.y, 1.0);
  vec3 c = mix(uBgCol, t.rgb, inb * t.a);
  c *= uArtBright;
  c = (c - 0.5) * uArtContrast + 0.5;
  c = satContrast(c, uArtSat, 1.0);
  c = hueRotate(c, uArtHue);
  c = pow(max(c, 0.0), vec3(1.0 / max(uArtGamma, 0.1)));
  return mix(uBgCol, c, uArtOpacity);
}

float foilMask(vec2 uv, vec3 art) {
  float m = 1.0;
  float d = sdRoundBox((uv - 0.5) * 2.0, vec2(1.0), uCorner * 2.0);
  float borderM = smoothstep(-uBorder * 4.0, -uBorder * 1.2, -d);
  float cx = 1.0 - smoothstep(0.15, 0.55, length(uv - 0.5));
  float lum = dot(art, vec3(0.299, 0.587, 0.114));
  if (uHoloMask < 0.5) m = 1.0;
  else if (uHoloMask < 1.5) m = 1.0;
  else if (uHoloMask < 2.5) m = cx;
  else if (uHoloMask < 3.5) m = borderM;
  else if (uHoloMask < 4.5) m = smoothstep(0.12, 0.45, lum) * (1.0 - borderM * 0.5);
  else if (uHoloMask < 5.5) m = (1.0 - smoothstep(0.15, 0.5, lum)) * 0.85 + borderM * 0.4;
  else if (uHoloMask < 6.5) m = smoothstep(0.0, 1.0, uv.y);
  else if (uHoloMask < 7.5) {
    if (uHasMask > 0.5) m = texture2D(uMask, uv).r;
  } else {
    m = smoothstep(0.2, 0.7, lum);
  }
  return clamp(m, 0.0, 1.0);
}

float patternCoord(vec2 uv, vec3 viewT, float pat) {
  vec2 p = (uv - 0.5) / max(uHoloScale, 0.05);
  p = rotate2(p, uHoloRot + uHoloDir);
  float t = uTime * uHoloAnim * 0.35;
  float n = fbm(p * 3.0 + t) * uHoloTurb;
  p += n * uHoloDist * 0.25;
  float c = 0.0;
  if (pat < 0.5) {
    c = p.x;
  } else if (pat < 1.5) {
    c = length(p);
  } else if (pat < 2.5) {
    c = atan(p.y, p.x) / 3.14159;
  } else if (pat < 3.5) {
    c = abs(p.x) + abs(p.y);
  } else if (pat < 4.5) {
    c = p.x * 1.7 + p.y * 0.3;
    c = mix(c, p.y * 1.7, 0.35);
  } else if (pat < 5.5) {
    c = p.x + p.y;
    c = mix(c, p.x - p.y, 0.5);
  } else if (pat < 6.5) {
    c = p.x * 8.0;
  } else if (pat < 7.5) {
    vec2 q = abs(fract(p * 2.0) - 0.5);
    c = max(q.x * 0.866 + q.y * 0.5, q.y);
  } else if (pat < 8.5) {
    vec2 v = voronoi(p * 4.0);
    c = v.x * 2.0 + v.y * 0.15;
  } else if (pat < 9.5) {
    c = atan(p.y, p.x) / 3.14159 * 4.0 + length(p) * 2.0;
  } else if (pat < 10.5) {
    c = p.x;
  } else if (pat < 11.5) {
    c = fbm(p * 2.5 + viewT.xy) * 2.0 - 1.0;
  } else if (pat < 12.5) {
    c = sin(p.x * 3.0 + fbm(p + t) * 2.0) + p.y * 0.6;
  } else {
    vec2 k = kaleidoUv(uv, 8.0) - 0.5;
    c = k.x * 2.0 + k.y;
  }
  c += viewT.x * uHoloView * 0.65 + viewT.y * uHoloView * 0.25;
  c += t;
  return c;
}

vec3 spectralFrom(float coord, float freq, float spread, float hueOff, float disp, vec3 viewT) {
  float g = coord * freq;
  // grating equation analogue: wavelength shifts with view
  float phase = fract(g + viewT.x * disp * 1.8 + viewT.y * disp * 0.6 + hueOff);
  float nm = mix(380.0, 780.0, fract(phase * spread));
  vec3 a = wavelengthRGB(nm);
  vec3 b = wavelengthRGB(mix(380.0, 780.0, fract(phase * spread + 0.18)));
  vec3 c = wavelengthRGB(mix(380.0, 780.0, fract(phase * spread + 0.33)));
  vec3 spec = a * 0.55 + b * 0.3 + c * 0.15;
  float env = 0.55 + 0.45 * sin(g * 6.28318);
  spec *= mix(1.0, env, 0.45);
  return spec;
}

vec3 gratingColor(vec2 uv, vec3 viewT, vec3 L) {
  vec2 p = (uv - 0.5) / max(uGratScale, 0.05);
  p = rotate2(p, uGratAng + uGratDir);
  p += fbm(p * 4.0) * uGratDist * 0.2;
  float coord = 0.0;
  if (uGratPat < 0.5) coord = p.x;
  else if (uGratPat < 1.5) coord = p.x + p.y;
  else if (uGratPat < 2.5) coord = length(p);
  else if (uGratPat < 3.5) coord = length(p);
  else if (uGratPat < 4.5) {
    vec2 q = abs(fract(p * 3.0) - 0.5);
    coord = max(q.x * 0.866 + q.y * 0.5, q.y);
  } else if (uGratPat < 5.5) {
    coord = length(fract(p * uGratDens) - 0.5);
  } else if (uGratPat < 6.5) {
    coord = p.x + 0.25 * sin(p.y * 8.0);
  } else {
    coord = abs(p.x) + 0.15 * p.y;
  }
  coord *= uGratFreq * uGratDens;
  // perspective warp
  coord += viewT.x * uGratPersp * 2.0;
  vec3 spec = spectralFrom(coord, 1.0, uGratSpread, uGratHue, uGratDisp, viewT);
  spec = satContrast(spec, 1.0, uGratCon);
  float sharp = mix(0.35, 1.0, uGratSharp);
  spec = pow(max(spec, 0.0), vec3(mix(0.85, 1.6, sharp)));
  float ndl = pow(max(dot(normalize(vNormal), L), 0.0), 1.0);
  spec *= mix(1.0, 0.45 + 0.7 * ndl, uGratLight);
  float fall = 1.0 - uGratFall * pow(length(uv - 0.5) * 1.4, 2.0);
  return spec * uGratRain * uGratOp * max(fall, 0.0);
}

vec3 iridescence(vec3 N, vec3 V, vec3 L) {
  float ndv = pow(1.0 - max(dot(N, V), 0.0), mix(1.0, 5.0, uIriView));
  float ndl = max(dot(N, L), 0.0);
  float film = ndv * 6.28318 * (1.0 + uIriSpread * 2.0) + uIriHue * 6.28318;
  vec3 iri = 0.5 + 0.5 * vec3(sin(film), sin(film + 2.094), sin(film + 4.188));
  iri = satContrast(iri, uIriSat, 1.1);
  float fres = pow(1.0 - max(dot(N, V), 0.0), mix(2.0, 5.0, uFresnel));
  return iri * uIriInt * (0.35 + 0.65 * ndv) * (0.4 + 0.6 * ndl) * (0.5 + 0.5 * fres);
}

vec2 cloneUv(vec2 uv) {
  vec2 p = uv - 0.5;
  if (uHMirror > 0.5) p.x = abs(p.x);
  if (uVMirror > 0.5) p.y = abs(p.y);
  if (uRadRefl > 0.5) {
    float r = length(p);
    float a = atan(p.y, p.x);
    a = abs(mod(a + 3.14159, 3.14159) - 1.5708);
    p = vec2(cos(a), sin(a)) * r;
  }
  if (uKaleido > 0.5) {
    return kaleidoUv(uv, uKaleidoSeg);
  }
  p = rotate2(p, uCloneRot + uReflAng);
  p /= max(uCloneSc, 0.2);
  return p + 0.5;
}

vec3 reflectionClones(vec2 uv, vec3 base) {
  if (uCloneN < 0.5 && uKaleido < 0.5 && uHMirror < 0.5 && uVMirror < 0.5) {
    return vec3(0.0);
  }
  vec3 acc = vec3(0.0);
  float n = max(uCloneN, 1.0);
  for (int i = 0; i < 8; i++) {
    if (float(i) >= n) break;
    float fi = float(i);
    vec2 off = rotate2(vec2(uCloneSp * (fi + 1.0) * 0.12, 0.0), uMirrorAx + fi * 0.785);
    vec2 cuv = cloneUv(uv + off * 0.15);
    cuv += (fbm(cuv * 6.0) - 0.5) * uReflDist * 0.15;
    vec3 s = sampleArt(fract(cuv));
    float w = exp(-fi * uReflFall * 0.65) * uCloneOp;
    acc += s * w;
  }
  return acc / max(n * 0.55, 1.0);
}

void main() {
  vec2 uv = vUv;
  // rounded-rect SDF in uv space
  vec2 p = (uv - 0.5) * 2.0;
  float aspect = uCardSize.x / max(uCardSize.y, 0.001);
  p.x *= aspect;
  float radius = uCorner * 2.0 * min(aspect, 1.0);
  vec2 halfb = vec2(aspect, 1.0);
  float sdf = sdRoundBox(p, halfb, radius);
  if (sdf > 0.002) discard;
  float aa = 0.004;
  float alpha = 1.0 - smoothstep(-aa, aa, sdf);

  vec3 N = normalize(vNormal);
  vec3 V = normalize(vViewDir);
  vec3 L = normalize(uKeyDir);
  vec3 viewT = vec3(dot(V, vec3(1.0, 0.0, 0.0)), dot(V, vec3(0.0, 1.0, 0.0)), dot(V, N));

  // micro-surface bump
  float bump = (noise21(uv * 90.0) - 0.5) * uBumpAmt * 0.35;
  bump += (texture2D(uBump, uv * 4.0).r - 0.5) * uBumpAmt * 0.4;
  N = normalize(N + vec3(bump, bump * 0.6, 0.0) * uMicroSurf);

  vec3 art = sampleArt(uv);
  if (uLayerArt < 0.01) art = uBgCol;
  art *= uLayerArt;

  float mask = foilMask(uv, art);

  // base
  vec3 col = mix(uBgCol, art, uLayerBase);

  // reflection clones
  vec3 clones = reflectionClones(uv, art) * uLayerRefl;
  col = applyBlend(col, clones, uReflBlend, uCloneOp * 0.65 * uLayerRefl);

  // holographic pattern
  float coord = patternCoord(uv, viewT, uHoloPattern);
  vec3 holoSpec = spectralFrom(coord, uHoloFreq, 1.0 + uHoloDisp, uHoloHue, uHoloDisp, viewT);
  holoSpec = satContrast(holoSpec, uHoloSat, uHoloCon);
  holoSpec = pow(max(holoSpec, 0.0), vec3(mix(0.7, 1.8, uHoloSharp)));
  holoSpec *= uHoloRain;
  float nH = fbm(uv * 12.0 + uTime * 0.05) * uHoloNoise;
  holoSpec *= 0.75 + 0.5 * nH;
  holoSpec *= mask * uHoloInt * uHoloOp * uLayerHolo;
  col = applyBlend(col, holoSpec, uHoloBlend, clamp(uHoloOp * mask * uLayerHolo, 0.0, 1.0));

  // diffraction grating overlay
  vec3 grat = gratingColor(uv, viewT, L) * mask * uLayerDiff;
  col = applyBlend(col, grat, 1.0, clamp(uGratOp * mask * uLayerDiff, 0.0, 1.0));

  // iridesescence
  vec3 iri = iridescence(N, V, L) * mask * uLayerIri;
  col += iri;

  // foil texture
  vec3 foilTex = texture2D(uFoil, uv * 3.0 + viewT.xy * 0.15).rgb;
  col = mix(col, blendOverlay(col, foilTex), 0.12 * uLayerFoil * mask);

  // grain / noise
  float grain = (texture2D(uGrain, uv * 8.0).r - 0.5) * uGrainAmt;
  grain += (hash21(uv * vec2(1920.0, 1080.0) + fract(uTime) * 10.0) - 0.5) * uMatNoise * 0.08;
  col += grain * 0.18 * uLayerTex;

  // scratches catching light
  float sc = texture2D(uScratch, uv * vec2(1.6, 3.2)).r;
  float sc2 = texture2D(uScratch, uv.yx * vec2(4.0, 1.2) + 0.37).g;
  vec3 H = normalize(L + V);
  float spec = pow(max(dot(N, H), 0.0), mix(8.0, 96.0, uGloss));
  float aniso = pow(abs(sin((uv.x * 80.0 + uv.y * 6.0) * 3.14159)), 4.0);
  float scratchLit = pow(sc, 3.0) * spec * uScratchAmt;
  scratchLit += pow(sc2, 4.0) * spec * uMicroScratch * 0.6;
  scratchLit += aniso * spec * uMicroScratch * 0.25;
  col += vec3(scratchLit) * uLayerScratch;

  // lighting
  float ndl = max(dot(N, L), 0.0);
  ndl = mix(ndl, smoothstep(0.0, 1.0, ndl), uKeySoft);
  float fill = max(dot(N, normalize(uFillDir)), 0.0);
  float rim = pow(1.0 - max(dot(N, V), 0.0), 3.0) * max(dot(N, normalize(uRimDir)), 0.0);
  float fres = pow(1.0 - max(dot(N, V), 0.0), mix(1.5, 5.0, uFresnel));

  vec3 lighting = uAmbCol * uAmbInt;
  lighting += uKeyCol * uKeyInt * ndl;
  lighting += uFillCol * uFillInt * fill;
  lighting += uRimCol * uRimInt * rim;
  lighting += vec3(spec) * uSpecular * uSpecLight * (0.4 + 0.6 * uMetallic);
  lighting += vec3(fres) * uClearcoat * (1.0 - uCcRough) * 0.55;
  lighting += vec3(spec * spec) * uGloss * uLayerGloss * 0.8;

  // metallic sheen
  vec3 metalTint = mix(vec3(1.0), art * 1.4 + holoSpec * 0.5, uMetallic);
  col = col * mix(vec3(1.0), lighting, 0.85 * uLayerLight) * mix(vec3(1.0), metalTint, uMetallic * 0.45);
  col += lighting * uReflect * 0.12 * metalTint;

  // border treatment
  float borderMask = 1.0 - smoothstep(-uBorder * 3.5, -uBorder * 0.4, sdf);
  vec3 borderCol = uEdgeCol;
  if (uBorderStyle < 0.5) {
    borderCol = mix(uEdgeCol, holoSpec * 1.4 + gratingColor(uv * 1.8, viewT, L), 0.65);
  } else if (uBorderStyle < 1.5) {
    borderCol = mix(uEdgeCol, lighting * metalTint, 0.7);
  } else if (uBorderStyle < 2.5) {
    borderCol = uEdgeCol * 0.7;
  } else if (uBorderStyle < 3.5) {
    borderCol = mix(uEdgeCol * 0.4, col * 0.5, 0.4);
  } else {
    float orn = step(0.7, fract((uv.x + uv.y) * 18.0));
    borderCol = mix(uEdgeCol, uEdgeCol * 1.4 + holoSpec * 0.3, orn);
  }
  col = mix(col, borderCol, borderMask * uLayerBorder * 0.92);

  // edge darkening / thickness cue
  float edgeShade = smoothstep(-0.04, 0.0, sdf);
  col *= 1.0 - edgeShade * 0.55 * uShadow;

  col = clamp(col, 0.0, 8.0);
  // mild tonemap
  col = col / (1.0 + col * 0.15);
  col = pow(max(col, 0.0), vec3(0.95));

  gl_FragColor = vec4(col, alpha);
}
`;

export const EDGE_VERT = /* glsl */ `
varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vWorldPos;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorldPos = world.xyz;
  vNormal = normalize(mat3(modelMatrix) * normal);
  vViewDir = normalize(cameraPosition - world.xyz);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

export const EDGE_FRAG = /* glsl */ `
varying vec3 vNormal;
varying vec3 vViewDir;
uniform vec3 uColor;
uniform float uMetal;
uniform vec3 uKeyDir;
uniform vec3 uKeyCol;
uniform float uKeyInt;
void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vViewDir);
  vec3 L = normalize(uKeyDir);
  float ndl = max(dot(N, L), 0.0);
  float spec = pow(max(dot(N, normalize(L + V)), 0.0), 32.0);
  float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
  vec3 col = uColor * (0.18 + 0.82 * ndl) * uKeyCol * uKeyInt;
  col += vec3(spec) * mix(0.25, 1.1, uMetal);
  col += vec3(fres) * 0.35 * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`;

export const BG_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const BG_FRAG = /* glsl */ `
varying vec2 vUv;
uniform vec3 uA;
uniform vec3 uB;
uniform float uVignette;
uniform float uStudio;
void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float r = length(p * vec2(1.0, 0.85));
  vec3 col = mix(uA, uB, smoothstep(-0.2, 1.1, vUv.y + r * 0.15));
  // studio cove
  float cove = smoothstep(1.15, 0.25, r);
  col = mix(col * 0.55, col, mix(1.0, cove, uStudio * 0.7));
  float vig = smoothstep(1.35, 0.25, r);
  col *= mix(1.0, vig, uVignette);
  gl_FragColor = vec4(col, 1.0);
}
`;
