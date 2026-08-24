import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { CardRenderer } from "@/lib/studio/renderer";
import { useStudio } from "@/lib/studio/store";
import { generateBackArt, generateFrontArt } from "@/lib/studio/artwork";
import {
  makeBump,
  makeFoil,
  makeGrain,
  makeScratches,
} from "@/lib/studio/textures";

function loadImage(src: string): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.naturalWidth || img.width;
      c.height = img.naturalHeight || img.height;
      const ctx = c.getContext("2d");
      if (!ctx) {
        reject(new Error("2D context failed"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      resolve(c);
    };
    img.onerror = () => reject(new Error("Image decode failed"));
    img.src = src;
  });
}

export function Viewport({
  rendererRef,
}: {
  rendererRef: MutableRefObject<CardRenderer | null>;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const webglOk = useStudio((s) => s.webglOk);
  const frontSrc = useStudio((s) => s.front.src);
  const backSrc = useStudio((s) => s.back.src);
  const readyRef = useRef(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.opacity = "0";
    canvas.style.pointerEvents = "none";
    wrap.appendChild(canvas);

    const view = document.createElement("canvas");
    view.style.display = "block";
    view.style.width = "100%";
    view.style.height = "100%";
    view.style.pointerEvents = "none";
    wrap.appendChild(view);

    const renderer = new CardRenderer(canvas);
    renderer.attachView(view);
    rendererRef.current = renderer;
    if (!renderer.webgl) {
      useStudio.setState({ webglOk: false });
      setError("WebGL is unavailable. Holographic preview needs a GPU-capable browser.");
      canvas.remove();
      return;
    }

    renderer.setProject(useStudio.getState().asProject());
    renderer.onFps = (n) => useStudio.setState({ fps: n });

    const ro = new ResizeObserver(() => {
      const r = wrap.getBoundingClientRect();
      renderer.resize(r.width, r.height);
    });
    ro.observe(wrap);
    const r0 = wrap.getBoundingClientRect();
    renderer.resize(r0.width, r0.height);
    renderer.start();

    let cancelled = false;
    (async () => {
      try {
        const grain = makeGrain(256, 256);
        const scratch = makeScratches(512, 512);
        const foil = makeFoil(256, 256);
        const bump = makeBump(256, 256);
        const state = useStudio.getState();
        const front = state.front.src
          ? await loadImage(state.front.src)
          : generateFrontArt("aurora", 768, 1072);
        const back = state.back.src
          ? await loadImage(state.back.src)
          : generateBackArt(768, 1072);
        if (cancelled) return;
        renderer.setMaps({ front, back, scratch, grain, foil, bump });
        readyRef.current = true;
        if (!state.front.src || !state.back.src) {
          const f = front.toDataURL("image/jpeg", 0.82);
          const b = back.toDataURL("image/jpeg", 0.82);
          if (cancelled) return;
          useStudio.setState({
            front: { ...useStudio.getState().front, src: f },
            back: { ...useStudio.getState().back, src: b },
          });
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Could not initialize artwork");
        }
      }
    })();

    const unsub = useStudio.subscribe(() => {
      renderer.setProject(useStudio.getState().asProject());
    });

    const onMove = (e: PointerEvent) => {
      const rec = wrap.getBoundingClientRect();
      const nx = ((e.clientX - rec.left) / rec.width) * 2 - 1;
      const ny = -(((e.clientY - rec.top) / rec.height) * 2 - 1);
      renderer.pointerMove(nx, ny, e.buttons);
    };
    const onUp = () => renderer.pointerUp();
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      renderer.wheel(e.deltaY);
      const z = rendererRef.current ? useStudio.getState().camera.zoom : 1;
      useStudio.setState((s) => ({ camera: { ...s.camera, zoom: z } }));
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerup", onUp);
    wrap.addEventListener("pointerleave", onUp);
    wrap.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelled = true;
      unsub();
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerup", onUp);
      wrap.removeEventListener("pointerleave", onUp);
      wrap.removeEventListener("wheel", onWheel);
      renderer.dispose();
      rendererRef.current = null;
      readyRef.current = false;
      canvas.remove();
      view.remove();
    };
  }, [rendererRef]);

  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer?.webgl || !readyRef.current) return;
    let cancelled = false;
    (async () => {
      try {
        const maps: { front?: HTMLCanvasElement; back?: HTMLCanvasElement } = {};
        if (frontSrc) maps.front = await loadImage(frontSrc);
        if (backSrc) maps.back = await loadImage(backSrc);
        if (!cancelled) renderer.setMaps(maps);
      } catch (e) {
        if (!cancelled) {
          useStudio.setState({
            toast: e instanceof Error ? e.message : "Artwork failed to apply",
          });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [frontSrc, backSrc, rendererRef]);

  return (
    <div
      ref={wrapRef}
      className="relative min-h-0 min-w-0 flex-1 touch-none bg-bg"
      style={{ touchAction: "none" }}
    >
      <canvas className="holo-canvas pointer-events-none hidden" aria-hidden="true" />
      {!webglOk || error ? (
        <div className="absolute inset-0 grid place-items-center bg-bg px-6 text-center">
          <div>
            <p className="text-sm font-medium text-fg">Preview unavailable</p>
            <p className="mt-2 max-w-sm text-xs text-muted">
              {error ??
                "WebGL context was lost. Reload the studio to restore the holographic engine."}
            </p>
          </div>
        </div>
      ) : null}
      <div className="pointer-events-none absolute bottom-3 left-3 text-[10px] tracking-[0.18em] text-subtle uppercase">
        Drag to orbit · Scroll to zoom · Move to light
      </div>
    </div>
  );
}
