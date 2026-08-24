import type { MutableRefObject } from "react";
import { Pause, Play, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { GhostBtn, IconBtn } from "./controls";
import { useStudio } from "@/lib/studio/store";
import type { CardRenderer } from "@/lib/studio/renderer";
import { cn } from "@/lib/utils";

export function BottomBar({
  rendererRef,
}: {
  rendererRef: MutableRefObject<CardRenderer | null>;
}) {
  const side = useStudio((s) => s.side);
  const playing = useStudio((s) => s.animation.playing);
  const fps = useStudio((s) => s.fps);
  const zoom = useStudio((s) => s.camera.zoom);

  return (
    <footer className="flex h-11 shrink-0 items-center gap-2 border-t border-border bg-panel px-3">
      <div className="flex rounded-sm bg-elevated p-0.5">
        {(["front", "back"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              useStudio.getState().setSide(s);
              if (s === "back") rendererRef.current?.flip();
            }}
            className={cn(
              "h-7 rounded-xs px-3 text-[11px] capitalize",
              side === s ? "bg-surface text-fg" : "text-muted",
            )}
          >
            {s}
          </button>
        ))}
      </div>
      <GhostBtn onClick={() => rendererRef.current?.flip()}>Flip</GhostBtn>
      <IconBtn
        label={playing ? "Pause" : "Play"}
        onClick={() => useStudio.getState().setAnim({ playing: !playing })}
      >
        {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5 ml-px" />}
      </IconBtn>
      <IconBtn
        label="Reset view"
        onClick={() => {
          rendererRef.current?.resetView();
          useStudio.getState().setAnim({ playing: false, autoRotate: false });
          useStudio.getState().setCam({ zoom: 1, rotX: -0.18, rotY: 0.32 });
        }}
      >
        <RotateCcw className="size-3.5" />
      </IconBtn>
      <IconBtn
        label="Zoom out"
        onClick={() =>
          useStudio.getState().setCam({ zoom: Math.max(0.45, zoom * 0.9) })
        }
      >
        <ZoomOut className="size-3.5" />
      </IconBtn>
      <span className="w-10 text-center font-mono text-[10px] text-subtle tabular-nums">
        {Math.round(zoom * 100)}%
      </span>
      <IconBtn
        label="Zoom in"
        onClick={() =>
          useStudio.getState().setCam({ zoom: Math.min(2.4, zoom * 1.1) })
        }
      >
        <ZoomIn className="size-3.5" />
      </IconBtn>
      <div className="ml-auto flex items-center gap-3 font-mono text-[10px] text-subtle tabular-nums">
        <span>{fps ? `${Math.round(fps)} FPS` : "— FPS"}</span>
        <span className="hidden sm:inline">GPU foil engine</span>
      </div>
    </footer>
  );
}
