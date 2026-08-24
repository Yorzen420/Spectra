import type { MutableRefObject } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ColorRow, ParamSlider, PrimaryBtn, SelectRow, ToggleRow } from "./controls";
import { useStudio } from "@/lib/studio/store";
import { runExport } from "@/lib/studio/export";
import type { CardRenderer } from "@/lib/studio/renderer";
import type { ExportSettings } from "@/lib/studio/types";

export function ExportDialog({
  rendererRef,
}: {
  rendererRef: MutableRefObject<CardRenderer | null>;
}) {
  const open = useStudio((s) => s.exportOpen);
  const exp = useStudio((s) => s.export);
  const exporting = useStudio((s) => s.exporting);
  const progress = useStudio((s) => s.exportProgress);
  const err = useStudio((s) => s.exportError);

  const start = async () => {
    const renderer = rendererRef.current;
    if (!renderer?.webgl) {
      useStudio.setState({ exportError: "Renderer is not ready." });
      return;
    }
    const wrap = renderer.renderer.domElement.parentElement;
    const rec = wrap?.getBoundingClientRect();
    const vw = rec?.width ?? 800;
    const vh = rec?.height ?? 800;
    useStudio.setState({ exporting: true, exportProgress: 0, exportError: null });
    try {
      await runExport(renderer, exp, vw, vh, (pct, label) => {
        useStudio.setState({ exportProgress: pct, toast: label });
      });
      useStudio.setState({ toast: "Export complete", exportOpen: false });
    } catch (e) {
      useStudio.setState({
        exportError: e instanceof Error ? e.message : "Export failed",
      });
    } finally {
      useStudio.setState({ exporting: false, exportProgress: 0 });
    }
  };

  const est =
    exp.format === "gif"
      ? Math.round((exp.resolution / 512) * exp.duration * exp.fps * 18)
      : exp.format === "webm" || exp.format === "mp4"
        ? Math.round(exp.bitrate * exp.duration * 0.000125)
        : Math.round((exp.resolution * exp.resolution * 63) / 88 / 900);

  return (
    <Dialog.Root open={open} onOpenChange={(v) => useStudio.setState({ exportOpen: v })}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-bg/70" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[min(92vw,440px)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-surface p-4 shadow-border">
          <div className="mb-3 flex items-center justify-between">
            <Dialog.Title className="text-sm font-medium tracking-wide text-fg">
              Export
            </Dialog.Title>
            <Dialog.Close className="rounded-sm p-1 text-muted hover:text-fg" aria-label="Close">
              <X className="size-4" />
            </Dialog.Close>
          </div>
          <div className="flex flex-col gap-3">
            <SelectRow
              label="Format"
              value={exp.format}
              options={[
                { id: "png", name: "PNG still" },
                { id: "jpg", name: "JPG still" },
                { id: "webp", name: "WebP still" },
                { id: "gif", name: "GIF animation" },
                { id: "webm", name: "WebM video" },
                { id: "mp4", name: "MP4 video (if supported)" },
              ]}
              onChange={(v) => useStudio.getState().setExport({ format: v as ExportSettings["format"] })}
            />
            <SelectRow
              label="Resolution"
              value={String(exp.resolution)}
              options={[
                { id: "512", name: "512" },
                { id: "1024", name: "1024" },
                { id: "2048", name: "2048" },
                { id: "4096", name: "4096 (stills)" },
              ]}
              onChange={(v) => useStudio.getState().setExport({ resolution: Number(v) })}
            />
            {(exp.format === "gif" || exp.format === "webm" || exp.format === "mp4") && (
              <>
                <ParamSlider
                  label="FPS"
                  value={exp.fps}
                  min={8}
                  max={30}
                  step={1}
                  onChange={(v) => useStudio.getState().setExport({ fps: v })}
                />
                <ParamSlider
                  label="Duration (s)"
                  value={exp.duration}
                  min={1}
                  max={10}
                  step={0.5}
                  onChange={(v) => useStudio.getState().setExport({ duration: v })}
                />
                <ToggleRow
                  label="Loop"
                  checked={exp.loop}
                  onChange={(v) => useStudio.getState().setExport({ loop: v })}
                />
              </>
            )}
            <SelectRow
              label="Background"
              value={exp.background}
              options={[
                { id: "studio", name: "Studio" },
                { id: "solid", name: "Solid" },
                { id: "transparent", name: "Transparent (PNG/GIF)" },
              ]}
              onChange={(v) =>
                useStudio.getState().setExport({
                  background: v as ExportSettings["background"],
                  transparent: v === "transparent",
                })
              }
            />
            {exp.background === "solid" ? (
              <ColorRow
                label="Solid color"
                value={exp.solidColor}
                onChange={(v) => useStudio.getState().setExport({ solidColor: v })}
              />
            ) : null}
            <ToggleRow
              label="Shadow"
              checked={exp.shadow}
              onChange={(v) => useStudio.getState().setExport({ shadow: v })}
            />
            <ParamSlider
              label="Quality"
              value={exp.quality}
              min={0.4}
              max={1}
              onChange={(v) => useStudio.getState().setExport({ quality: v })}
            />
            <p className="text-[11px] text-subtle">
              Estimated size ~{est} KB. Animation export captures the card only, not the UI.
              GIF is limited to ~720px for memory. Video uses the browser MediaRecorder API.
            </p>
            {err ? <p className="text-xs text-danger">{err}</p> : null}
            {exporting ? (
              <div className="h-1 overflow-hidden rounded-full bg-elevated">
                <div
                  className="h-full bg-accent transition-[width] duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
            ) : null}
            <PrimaryBtn onClick={() => void start()} disabled={exporting}>
              {exporting ? `Exporting ${progress}%` : "Render & download"}
            </PrimaryBtn>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
