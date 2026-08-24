import * as THREE from "three";
import type { BlendMode, LayerKind, StudioProject } from "./types";

export function hexToVec3(hex: string): THREE.Vector3 {
  const c = new THREE.Color(hex);
  return new THREE.Vector3(c.r, c.g, c.b);
}

export function dirFromSpherical(azimuth: number, elevation: number): THREE.Vector3 {
  const el = elevation;
  const az = azimuth;
  const y = Math.sin(el);
  const r = Math.cos(el);
  return new THREE.Vector3(Math.cos(az) * r, y, Math.sin(az) * r).normalize();
}

export function blendToFloat(mode: BlendMode): number {
  switch (mode) {
    case "mix":
      return 0;
    case "add":
      return 1;
    case "screen":
      return 2;
    case "overlay":
      return 3;
    case "multiply":
      return 4;
    case "softlight":
      return 5;
    case "color":
      return 6;
    default:
      return 0;
  }
}

export function patternIndex(_p: string): number {
  return 0;
}

export function layerOpacity(p: StudioProject, kind: LayerKind): number {
  const layer = p.layers.find((l) => l.kind === kind);
  if (!layer) return 1;
  return layer.visible ? layer.opacity : 0;
}
