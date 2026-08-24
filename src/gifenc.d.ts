declare module "gifenc" {
  export function GIFEncoder(options?: { auto?: boolean }): {
    writeFrame: (
      index: Uint8Array | Uint8ClampedArray,
      width: number,
      height: number,
      opts?: {
        palette?: number[][];
        delay?: number;
        repeat?: number;
        transparent?: boolean;
        dispose?: number;
      },
    ) => void;
    finish: () => void;
    bytes: () => Uint8Array;
    bytesView: () => Uint8Array;
  };
  export function quantize(
    rgba: Uint8Array | Uint8ClampedArray,
    maxColors: number,
    options?: { format?: string; oneBitAlpha?: boolean | number },
  ): number[][];
  export function applyPalette(
    rgba: Uint8Array | Uint8ClampedArray,
    palette: number[][],
    format?: string,
  ): Uint8Array;
}
