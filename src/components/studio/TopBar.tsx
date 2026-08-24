import {
  Download,
  FolderOpen,
  Redo2,
  Save,
  Sparkles,
  Undo2,
  Upload,
} from "lucide-react";
import { GhostBtn, IconBtn, PrimaryBtn } from "./controls";
import { useStudio } from "@/lib/studio/store";
import { downloadBlob, exportProjectJson, parseProjectJson, saveProject } from "@/lib/studio/project";
import { defaultProject } from "@/lib/studio/defaults";
import { MATERIAL_PRESETS } from "@/lib/studio/presets";

export function TopBar() {
  const name = useStudio((s) => s.name);
  const quality = useStudio((s) => s.quality);
  const advanced = useStudio((s) => s.advanced);
  const past = useStudio((s) => s.past.length);
  const future = useStudio((s) => s.future.length);

  const onSave = async () => {
    try {
      await saveProject(useStudio.getState().asProject());
      useStudio.getState().setToast("Project saved locally");
    } catch (e) {
      useStudio.setState({
        toast: e instanceof Error ? e.message : "Save failed",
      });
    }
  };

  const onExportJson = () => {
    const blob = exportProjectJson(useStudio.getState().asProject());
    downloadBlob(blob, `${name.replace(/\s+/g, "-").toLowerCase() || "spectra"}.json`);
  };

  const onOpen = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        useStudio.getState().loadProject(parseProjectJson(text));
        useStudio.getState().setToast("Project loaded");
      } catch (e) {
        useStudio.setState({
          toast: e instanceof Error ? e.message : "Could not open project",
        });
      }
    };
    input.click();
  };

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border bg-panel px-3">
      <div className="flex min-w-0 items-center gap-2.5 pr-3">
        <span className="grid size-6 place-items-center rounded-xs bg-elevated shadow-border">
          <Sparkles className="size-3.5 text-accent" />
        </span>
        <div className="min-w-0 leading-tight">
          <div className="text-[13px] font-semibold tracking-[0.18em] text-fg uppercase">
            Spectra
          </div>
          <div className="hidden text-[10px] tracking-wide text-subtle sm:block">
            Holographic Card Studio
          </div>
        </div>
      </div>

      <div className="hidden h-5 w-px bg-border sm:block" />

      <nav className="flex items-center gap-0.5">
        <IconBtn
          label="New project"
          onClick={() => {
            const d = defaultProject();
            const { front, back } = useStudio.getState();
            useStudio.getState().loadProject({
              ...d,
              front: { ...d.front, src: front.src },
              back: { ...d.back, src: back.src },
            });
          }}
        >
          <span className="text-[11px] font-medium">New</span>
        </IconBtn>
        <IconBtn label="Open project JSON" onClick={onOpen}>
          <FolderOpen className="size-3.5" />
        </IconBtn>
        <IconBtn label="Save project" onClick={() => void onSave()}>
          <Save className="size-3.5" />
        </IconBtn>
        <IconBtn label="Export project JSON" onClick={onExportJson}>
          <Upload className="size-3.5" />
        </IconBtn>
        <IconBtn label="Undo" disabled={!past} onClick={() => useStudio.getState().undo()}>
          <Undo2 className="size-3.5" />
        </IconBtn>
        <IconBtn label="Redo" disabled={!future} onClick={() => useStudio.getState().redo()}>
          <Redo2 className="size-3.5" />
        </IconBtn>
      </nav>

      <div className="mx-2 hidden min-w-0 flex-1 md:block">
        <input
          value={name}
          onChange={(e) => useStudio.setState({ name: e.target.value })}
          className="h-8 w-full max-w-xs rounded-sm bg-elevated px-2.5 text-xs text-fg outline-none shadow-border"
          aria-label="Project name"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <select
          value=""
          aria-label="Material presets"
          onChange={(e) => {
            const id = e.target.value;
            if (id) useStudio.getState().applyPreset(id as (typeof MATERIAL_PRESETS)[number]["id"]);
            e.target.value = "";
          }}
          className="hidden h-8 rounded-sm bg-elevated px-2 text-xs text-muted shadow-border outline-none lg:block"
        >
          <option value="">Presets</option>
          {MATERIAL_PRESETS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <select
          value={quality}
          onChange={(e) => useStudio.getState().setQuality(e.target.value as typeof quality)}
          className="h-8 rounded-sm bg-elevated px-2 text-xs text-muted shadow-border outline-none"
          aria-label="Preview quality"
        >
          <option value="draft">Draft</option>
          <option value="high">High</option>
          <option value="ultra">Ultra</option>
        </select>
        <GhostBtn
          onClick={() => useStudio.setState({ advanced: !advanced })}
        >
          {advanced ? "Basic" : "Advanced"}
        </GhostBtn>
        <PrimaryBtn onClick={() => useStudio.setState({ exportOpen: true })}>
          <Download className="size-3.5" />
          Export
        </PrimaryBtn>
      </div>
    </header>
  );
}
