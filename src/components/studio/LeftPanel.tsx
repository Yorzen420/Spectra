import {
  Copy,
  Eye,
  EyeOff,
  Layers,
  Lock,
  Plus,
  Trash2,
  Unlock,
} from "lucide-react";
import { ColorRow, GhostBtn, ParamSlider, Section, SelectRow } from "./controls";
import { useStudio } from "@/lib/studio/store";
import { CARD_PRESETS } from "@/lib/studio/types";
import { MATERIAL_PRESETS } from "@/lib/studio/presets";
import { readFileAsDataUrl } from "@/lib/studio/project";
import { generateFrontArt, type ArtPresetId } from "@/lib/studio/artwork";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "presets", name: "Presets" },
  { id: "card", name: "Card" },
  { id: "assets", name: "Assets" },
  { id: "layers", name: "Layers" },
  { id: "textures", name: "Textures" },
] as const;

const ART_PRESETS: { id: ArtPresetId; name: string }[] = [
  { id: "aurora", name: "Aurora" },
  { id: "void", name: "Nyx" },
  { id: "ember", name: "Solaris" },
  { id: "tide", name: "Aegir" },
  { id: "geometry", name: "Monolith" },
];

export function LeftPanel() {
  const tab = useStudio((s) => s.leftTab);
  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-border bg-panel">
      <div className="flex gap-0.5 overflow-x-auto border-b border-border px-1.5 py-1.5">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => useStudio.setState({ leftTab: t.id })}
            className={cn(
              "h-7 shrink-0 rounded-sm px-2 text-[11px] tracking-wide",
              tab === t.id ? "bg-elevated text-fg" : "text-muted hover:text-fg",
            )}
          >
            {t.name}
          </button>
        ))}
      </div>
      <div className="studio-scroll min-h-0 flex-1 overflow-y-auto">
        {tab === "presets" && <PresetsTab />}
        {tab === "card" && <CardTab />}
        {tab === "assets" && <AssetsTab />}
        {tab === "layers" && <LayersTab />}
        {tab === "textures" && <TexturesTab />}
      </div>
    </aside>
  );
}

function PresetsTab() {
  return (
    <Section title="Foil library">
      <div className="grid grid-cols-1 gap-1">
        {MATERIAL_PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => useStudio.getState().applyPreset(p.id)}
            className="rounded-sm px-2 py-2 text-left hover:bg-elevated"
          >
            <div className="text-xs font-medium text-fg">{p.name}</div>
            <div className="text-[11px] text-subtle">{p.blurb}</div>
          </button>
        ))}
      </div>
    </Section>
  );
}

function CardTab() {
  const card = useStudio((s) => s.card);
  const setCard = useStudio((s) => s.setCard);
  const snap = useStudio((s) => s.snapshot);
  return (
    <>
      <Section title="Format">
        <SelectRow
          label="Preset"
          value={`${card.widthMm}x${card.heightMm}`}
          options={CARD_PRESETS.map((p) => ({
            id: `${p.w}x${p.h}`,
            name: p.name,
          }))}
          onChange={(v) => {
            const [w, h] = v.split("x").map(Number);
            setCard({ widthMm: w ?? 63, heightMm: h ?? 88 });
          }}
        />
        <ParamSlider
          label="Width (mm)"
          value={card.widthMm}
          min={40}
          max={90}
          step={0.5}
          onChange={(v) => useStudio.setState((s) => ({ card: { ...s.card, widthMm: v } }))}
          onCommit={snap}
        />
        <ParamSlider
          label="Height (mm)"
          value={card.heightMm}
          min={50}
          max={130}
          step={0.5}
          onChange={(v) => useStudio.setState((s) => ({ card: { ...s.card, heightMm: v } }))}
          onCommit={snap}
        />
        <ParamSlider
          label="Corner radius"
          value={card.cornerRadius}
          min={0}
          max={0.12}
          step={0.001}
          onChange={(v) => useStudio.setState((s) => ({ card: { ...s.card, cornerRadius: v } }))}
          onCommit={snap}
        />
        <ParamSlider
          label="Border thickness"
          value={card.borderThickness}
          min={0}
          max={0.1}
          step={0.001}
          onChange={(v) =>
            useStudio.setState((s) => ({ card: { ...s.card, borderThickness: v } }))
          }
          onCommit={snap}
        />
        <ParamSlider
          label="Depth"
          value={card.depth}
          min={0.008}
          max={0.08}
          step={0.001}
          onChange={(v) => useStudio.setState((s) => ({ card: { ...s.card, depth: v } }))}
          onCommit={snap}
        />
        <SelectRow
          label="Border style"
          value={card.borderStyle}
          options={[
            { id: "foil", name: "Foil" },
            { id: "metallic", name: "Metallic" },
            { id: "matte", name: "Matte" },
            { id: "inset", name: "Inset" },
            { id: "ornate", name: "Ornate" },
          ]}
          onChange={(v) => setCard({ borderStyle: v as typeof card.borderStyle })}
        />
        <ColorRow label="Background" value={card.background} onChange={(v) => setCard({ background: v })} />
        <ColorRow label="Edge" value={card.edgeColor} onChange={(v) => setCard({ edgeColor: v })} />
        <ParamSlider
          label="Edge metal"
          value={card.edgeMetal}
          min={0}
          max={1}
          onChange={(v) => useStudio.setState((s) => ({ card: { ...s.card, edgeMetal: v } }))}
          onCommit={snap}
        />
      </Section>
    </>
  );
}

function AssetsTab() {
  const side = useStudio((s) => s.side);
  const art = useStudio((s) => (s.side === "front" ? s.front : s.back));
  const setArt = useStudio((s) => s.setArt);
  const snap = useStudio((s) => s.snapshot);

  const upload = (which: "front" | "back") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png,image/jpeg,image/webp,image/svg+xml";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const src = await readFileAsDataUrl(file);
        useStudio.getState().setArt(which, { src });
        useStudio.getState().setToast(`${which === "front" ? "Front" : "Back"} artwork loaded`);
      } catch (e) {
        useStudio.setState({
          toast: e instanceof Error ? e.message : "Could not load image",
        });
      }
    };
    input.click();
  };

  const applyBuiltIn = (id: ArtPresetId) => {
    const c = generateFrontArt(id);
    useStudio.getState().setArt("front", { src: c.toDataURL("image/png") });
  };

  return (
    <>
      <Section title="Artwork">
        <div className="flex gap-1">
          <GhostBtn onClick={() => upload("front")}>Load front</GhostBtn>
          <GhostBtn onClick={() => upload("back")}>Load back</GhostBtn>
        </div>
        <p className="text-[11px] text-subtle">PNG, JPG, WEBP, SVG. Images stay on this device.</p>
        <div className="grid grid-cols-2 gap-1">
          {ART_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => applyBuiltIn(p.id)}
              className="h-8 rounded-sm bg-elevated text-[11px] text-muted hover:text-fg"
            >
              {p.name}
            </button>
          ))}
        </div>
      </Section>
      <Section title={`${side === "front" ? "Front" : "Back"} transform`}>
        <ParamSlider label="Position X" value={art.posX} min={-0.5} max={0.5} onChange={(v) => useStudio.setState((s) => ({ [side]: { ...(side === "front" ? s.front : s.back), posX: v } }))} onCommit={snap} />
        <ParamSlider label="Position Y" value={art.posY} min={-0.5} max={0.5} onChange={(v) => useStudio.setState((s) => ({ [side]: { ...(side === "front" ? s.front : s.back), posY: v } }))} onCommit={snap} />
        <ParamSlider label="Scale" value={art.scale} min={0.2} max={3} onChange={(v) => useStudio.setState((s) => ({ [side]: { ...(side === "front" ? s.front : s.back), scale: v } }))} onCommit={snap} />
        <ParamSlider label="Rotation" value={art.rotation} min={-Math.PI} max={Math.PI} onChange={(v) => useStudio.setState((s) => ({ [side]: { ...(side === "front" ? s.front : s.back), rotation: v } }))} onCommit={snap} />
        <SelectRow
          label="Fit"
          value={art.fit}
          options={[
            { id: "fill", name: "Fill" },
            { id: "fit", name: "Fit" },
            { id: "crop", name: "Crop" },
          ]}
          onChange={(v) => setArt(side, { fit: v as typeof art.fit })}
        />
        <ParamSlider label="Opacity" value={art.opacity} min={0} max={1} onChange={(v) => useStudio.setState((s) => ({ [side]: { ...(side === "front" ? s.front : s.back), opacity: v } }))} onCommit={snap} />
        <ParamSlider label="Brightness" value={art.brightness} min={0.2} max={2} onChange={(v) => useStudio.setState((s) => ({ [side]: { ...(side === "front" ? s.front : s.back), brightness: v } }))} onCommit={snap} />
        <ParamSlider label="Contrast" value={art.contrast} min={0.2} max={2} onChange={(v) => useStudio.setState((s) => ({ [side]: { ...(side === "front" ? s.front : s.back), contrast: v } }))} onCommit={snap} />
        <ParamSlider label="Saturation" value={art.saturation} min={0} max={2} onChange={(v) => useStudio.setState((s) => ({ [side]: { ...(side === "front" ? s.front : s.back), saturation: v } }))} onCommit={snap} />
        <ParamSlider label="Hue" value={art.hue} min={-1} max={1} onChange={(v) => useStudio.setState((s) => ({ [side]: { ...(side === "front" ? s.front : s.back), hue: v } }))} onCommit={snap} />
        <ParamSlider label="Gamma" value={art.gamma} min={0.4} max={2.2} onChange={(v) => useStudio.setState((s) => ({ [side]: { ...(side === "front" ? s.front : s.back), gamma: v } }))} onCommit={snap} />
      </Section>
    </>
  );
}

function LayersTab() {
  const layers = useStudio((s) => s.layers);
  return (
    <Section title="Stack">
      <GhostBtn onClick={() => useStudio.getState().addLayer()}>
        <Plus className="size-3" /> Add layer
      </GhostBtn>
      <ul className="flex flex-col gap-0.5">
        {layers.map((l, i) => (
          <li
            key={l.id}
            className="flex items-center gap-1 rounded-sm bg-elevated/60 px-1.5 py-1"
          >
            <Layers className="size-3 text-subtle" />
            <span className="min-w-0 flex-1 truncate text-[11px] text-fg">{l.name}</span>
            <button
              type="button"
              aria-label={l.visible ? "Hide" : "Show"}
              onClick={() => useStudio.getState().setLayer(l.id, { visible: !l.visible })}
              className="p-1 text-muted hover:text-fg"
            >
              {l.visible ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
            </button>
            <button
              type="button"
              aria-label={l.locked ? "Unlock" : "Lock"}
              onClick={() => useStudio.getState().setLayer(l.id, { locked: !l.locked })}
              className="p-1 text-muted hover:text-fg"
            >
              {l.locked ? <Lock className="size-3" /> : <Unlock className="size-3" />}
            </button>
            <button
              type="button"
              aria-label="Duplicate"
              onClick={() => useStudio.getState().duplicateLayer(l.id)}
              className="p-1 text-muted hover:text-fg"
            >
              <Copy className="size-3" />
            </button>
            <button
              type="button"
              aria-label="Delete"
              onClick={() => useStudio.getState().deleteLayer(l.id)}
              className="p-1 text-muted hover:text-danger"
            >
              <Trash2 className="size-3" />
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={l.opacity}
              aria-label={`${l.name} opacity`}
              onChange={(e) =>
                useStudio.getState().setLayer(l.id, { opacity: Number(e.target.value) })
              }
              className="w-12"
            />
            {i > 0 ? (
              <button
                type="button"
                className="text-[10px] text-subtle"
                onClick={() => useStudio.getState().reorderLayers(i, i - 1)}
              >
                Up
              </button>
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}

function TexturesTab() {
  const textures = useStudio((s) => s.textures);
  return (
    <Section title="Surface maps">
      <p className="text-[11px] text-subtle">
        Built-in grain, scratches, foil and masks. Toggle to mix into the foil engine.
      </p>
      <div className="grid grid-cols-2 gap-1.5">
        {textures.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => useStudio.getState().setTexture(t.id, { enabled: !t.enabled })}
            className={cn(
              "rounded-sm px-2 py-2 text-left shadow-border",
              t.enabled ? "bg-elevated text-fg" : "text-muted",
            )}
          >
            <div className="text-[11px] font-medium">{t.name}</div>
            <div className="text-[10px] text-subtle">{t.kind}</div>
          </button>
        ))}
      </div>
      <GhostBtn
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;
            try {
              const src = await readFileAsDataUrl(file);
              useStudio.getState().addTexture({
                id: `tex-${Date.now()}`,
                name: file.name,
                kind: "overlay",
                src,
                builtin: false,
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
                blend: "overlay",
                animation: 0,
                enabled: true,
              });
            } catch (e) {
              useStudio.setState({
                toast: e instanceof Error ? e.message : "Texture load failed",
              });
            }
          };
          input.click();
        }}
      >
        Import texture
      </GhostBtn>
    </Section>
  );
}
