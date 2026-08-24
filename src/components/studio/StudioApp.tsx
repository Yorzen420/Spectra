import { useEffect, useRef, useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { PanelLeft, PanelRight } from "lucide-react";
import { TopBar } from "./TopBar";
import { LeftPanel } from "./LeftPanel";
import { RightPanel } from "./RightPanel";
import { BottomBar } from "./BottomBar";
import { Viewport } from "./Viewport";
import { ExportDialog } from "./ExportDialog";
import { IconBtn } from "./controls";
import type { CardRenderer } from "@/lib/studio/renderer";
import { useStudio } from "@/lib/studio/store";
import { loadProject, saveProject } from "@/lib/studio/project";

export function StudioApp() {
  const rendererRef = useRef<CardRenderer | null>(null);
  const toast = useStudio((s) => s.toast);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);

  useEffect(() => {
    let alive = true;
    loadProject()
      .then((p) => {
        if (alive && p) {
          useStudio.getState().loadProject(p, false);
          useStudio.setState({ hydrated: true, toast: "Restored last project" });
        } else {
          useStudio.setState({ hydrated: true });
        }
      })
      .catch(() => useStudio.setState({ hydrated: true }));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    const unsub = useStudio.subscribe(() => {
      clearTimeout(t);
      t = setTimeout(() => {
        void saveProject(useStudio.getState().asProject()).catch(() => {
          /* quota — ignore autosave */
        });
      }, 1600);
    });
    return () => {
      unsub();
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => useStudio.getState().setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) useStudio.getState().redo();
        else useStudio.getState().undo();
      }
      if (meta && e.key.toLowerCase() === "s") {
        e.preventDefault();
        void saveProject(useStudio.getState().asProject()).then(() =>
          useStudio.getState().setToast("Saved"),
        );
      }
      if (meta && e.key.toLowerCase() === "e") {
        e.preventDefault();
        useStudio.setState({ exportOpen: true });
      }
      if (e.code === "Space" && (e.target as HTMLElement).tagName !== "INPUT") {
        e.preventDefault();
        const playing = useStudio.getState().animation.playing;
        useStudio.getState().setAnim({ playing: !playing });
      }
      if (e.key.toLowerCase() === "f" && !meta) {
        rendererRef.current?.flip();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <Tooltip.Provider delayDuration={250}>
      <div className="flex h-dvh flex-col overflow-hidden bg-bg text-fg">
        <TopBar />
        <div className="relative flex min-h-0 flex-1">
          <div className="hidden h-full md:flex">
            <LeftPanel />
          </div>
          {left ? (
            <div className="absolute inset-0 z-30 md:hidden">
              <button
                type="button"
                className="absolute inset-0 bg-bg/70"
                aria-label="Close library"
                onClick={() => setLeft(false)}
              />
              <div className="relative h-full w-72 max-w-[85vw] shadow-border">
                <LeftPanel />
              </div>
            </div>
          ) : null}
          <div className="relative flex min-w-0 flex-1 flex-col">
            <div className="pointer-events-none absolute top-2 left-2 z-20 flex gap-1 md:hidden">
              <span className="pointer-events-auto">
                <IconBtn label="Toggle library" onClick={() => setLeft((v) => !v)}>
                  <PanelLeft className="size-3.5" />
                </IconBtn>
              </span>
            </div>
            <div className="pointer-events-none absolute top-2 right-2 z-20 flex gap-1 md:hidden">
              <span className="pointer-events-auto">
                <IconBtn label="Toggle inspector" onClick={() => setRight((v) => !v)}>
                  <PanelRight className="size-3.5" />
                </IconBtn>
              </span>
            </div>
            <Viewport rendererRef={rendererRef} />
          </div>
          <div className="hidden h-full md:flex">
            <RightPanel />
          </div>
          {right ? (
            <div className="absolute inset-0 z-30 flex justify-end md:hidden">
              <button
                type="button"
                className="absolute inset-0 bg-bg/70"
                aria-label="Close inspector"
                onClick={() => setRight(false)}
              />
              <div className="relative h-full w-80 max-w-[90vw] shadow-border">
                <RightPanel />
              </div>
            </div>
          ) : null}
        </div>
        <BottomBar rendererRef={rendererRef} />
        <ExportDialog rendererRef={rendererRef} />
        {toast ? (
          <div className="pointer-events-none fixed bottom-16 left-1/2 z-50 -translate-x-1/2 rounded-sm bg-elevated px-3 py-1.5 text-xs text-fg shadow-border">
            {toast}
          </div>
        ) : null}
      </div>
    </Tooltip.Provider>
  );
}
