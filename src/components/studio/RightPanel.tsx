import { ColorRow, ParamSlider, Section, SelectRow, ToggleRow } from "./controls";
import { useStudio } from "@/lib/studio/store";
import { ANIM_PRESETS, LIGHTING_PRESETS } from "@/lib/studio/presets";
import { defaultProject } from "@/lib/studio/defaults";
import { cn } from "@/lib/utils";
import type { BlendMode, GratingPattern, HoloPattern, MaskType } from "@/lib/studio/types";

const TABS = [
  { id: "holographic", name: "Holo" },
  { id: "diffraction", name: "Grat." },
  { id: "iridescence", name: "Iri." },
  { id: "reflection", name: "Refl." },
  { id: "material", name: "Mat." },
  { id: "lighting", name: "Light" },
  { id: "effects", name: "FX" },
  { id: "animation", name: "Anim" },
] as const;

const HOLO_PATTERNS: { id: HoloPattern; name: string }[] = [
  { id: "linear", name: "Linear" },
  { id: "radial", name: "Radial" },
  { id: "circular", name: "Circular" },
  { id: "diamond", name: "Diamond" },
  { id: "grid", name: "Grid" },
  { id: "crosshatch", name: "Crosshatch" },
  { id: "microlines", name: "Micro-lines" },
  { id: "prism", name: "Prism" },
  { id: "shattered", name: "Shattered" },
  { id: "starburst", name: "Starburst" },
  { id: "spectrum", name: "Spectrum" },
  { id: "galaxy", name: "Galaxy" },
  { id: "aurora", name: "Aurora" },
  { id: "kaleidoscope", name: "Kaleidoscope" },
];

const GRAT_PATTERNS: { id: GratingPattern; name: string }[] = [
  { id: "lines", name: "Lines" },
  { id: "cross", name: "Cross" },
  { id: "radial", name: "Radial" },
  { id: "concentric", name: "Concentric" },
  { id: "hex", name: "Hex" },
  { id: "dots", name: "Dots" },
  { id: "wave", name: "Wave" },
  { id: "chevron", name: "Chevron" },
];

const BLENDS: { id: BlendMode; name: string }[] = [
  { id: "mix", name: "Mix" },
  { id: "add", name: "Add" },
  { id: "screen", name: "Screen" },
  { id: "overlay", name: "Overlay" },
  { id: "multiply", name: "Multiply" },
  { id: "softlight", name: "Soft light" },
  { id: "color", name: "Color" },
];

const MASKS: { id: MaskType; name: string }[] = [
  { id: "full", name: "Full card" },
  { id: "center", name: "Center" },
  { id: "border", name: "Border" },
  { id: "character", name: "Character" },
  { id: "reverse", name: "Reverse holo" },
  { id: "gradient", name: "Gradient" },
  { id: "luminance", name: "Luminance" },
  { id: "image", name: "Image mask" },
];

export function RightPanel() {
  const tab = useStudio((s) => s.rightTab);
  return (
    <aside className="flex h-full w-80 shrink-0 flex-col border-l border-border bg-panel">
      <div className="flex flex-wrap gap-0.5 border-b border-border px-1.5 py-1.5">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => useStudio.setState({ rightTab: t.id })}
            className={cn(
              "h-7 rounded-sm px-2 text-[11px]",
              tab === t.id ? "bg-elevated text-fg" : "text-muted hover:text-fg",
            )}
          >
            {t.name}
          </button>
        ))}
      </div>
      <div className="studio-scroll min-h-0 flex-1 overflow-y-auto">
        {tab === "holographic" && <HoloTab />}
        {tab === "diffraction" && <DiffTab />}
        {tab === "iridescence" && <IriTab />}
        {tab === "reflection" && <ReflTab />}
        {tab === "material" && <MatTab />}
        {tab === "lighting" && <LightTab />}
        {tab === "effects" && <FxTab />}
        {tab === "animation" && <AnimTab />}
      </div>
    </aside>
  );
}

function HoloTab() {
  const h = useStudio((s) => s.holo);
  const adv = useStudio((s) => s.advanced);
  const snap = useStudio((s) => s.snapshot);
  const patch = (p: Partial<typeof h>) => useStudio.setState((s) => ({ holo: { ...s.holo, ...p } }));
  const set = (k: string, v: number) => patch({ [k]: v } as Partial<typeof h>);
  return (
    <Section title="Holographic foil" onReset={() => useStudio.getState().resetSection("holo")}>
      <SelectRow label="Pattern" value={h.pattern} options={HOLO_PATTERNS} onChange={(v) => useStudio.getState().setHolo({ pattern: v as HoloPattern })} />
      <SelectRow label="Mask" value={h.mask} options={MASKS} onChange={(v) => useStudio.getState().setHolo({ mask: v as MaskType })} />
      <SelectRow label="Blend" value={h.blend} options={BLENDS} onChange={(v) => useStudio.getState().setHolo({ blend: v as BlendMode })} />
      <ParamSlider label="Intensity" value={h.intensity} min={0} max={1.5} onChange={(v) => set("intensity", v as never)} onCommit={snap} />
      <ParamSlider label="Opacity" value={h.opacity} min={0} max={1} onChange={(v) => set("opacity", v as never)} onCommit={snap} />
      <ParamSlider label="Rainbow" value={h.rainbowStrength} min={0} max={1.5} onChange={(v) => set("rainbowStrength", v as never)} onCommit={snap} />
      <ParamSlider label="Dispersion" value={h.spectralDispersion} min={0} max={2} onChange={(v) => set("spectralDispersion", v as never)} onCommit={snap} />
      <ParamSlider label="Frequency" value={h.frequency} min={0.5} max={24} step={0.1} onChange={(v) => set("frequency", v as never)} onCommit={snap} />
      <ParamSlider label="View response" value={h.viewResponse} min={0} max={2} onChange={(v) => set("viewResponse", v as never)} onCommit={snap} />
      {adv ? (
        <>
          <ParamSlider label="Hue shift" value={h.hueShift} min={0} max={1} onChange={(v) => set("hueShift", v as never)} onCommit={snap} />
          <ParamSlider label="Saturation" value={h.saturation} min={0} max={2} onChange={(v) => set("saturation", v as never)} onCommit={snap} />
          <ParamSlider label="Contrast" value={h.contrast} min={0.2} max={2} onChange={(v) => set("contrast", v as never)} onCommit={snap} />
          <ParamSlider label="Scale" value={h.scale} min={0.2} max={3} onChange={(v) => set("scale", v as never)} onCommit={snap} />
          <ParamSlider label="Direction" value={h.direction} min={-3.14} max={3.14} onChange={(v) => set("direction", v as never)} onCommit={snap} />
          <ParamSlider label="Rotation" value={h.rotation} min={-3.14} max={3.14} onChange={(v) => set("rotation", v as never)} onCommit={snap} />
          <ParamSlider label="Distortion" value={h.distortion} min={0} max={1.5} onChange={(v) => set("distortion", v as never)} onCommit={snap} />
          <ParamSlider label="Noise" value={h.noise} min={0} max={1} onChange={(v) => set("noise", v as never)} onCommit={snap} />
          <ParamSlider label="Turbulence" value={h.turbulence} min={0} max={1.5} onChange={(v) => set("turbulence", v as never)} onCommit={snap} />
          <ParamSlider label="Sharpness" value={h.sharpness} min={0} max={1} onChange={(v) => set("sharpness", v as never)} onCommit={snap} />
          <ParamSlider label="Animation" value={h.animation} min={0} max={2} onChange={(v) => set("animation", v as never)} onCommit={snap} />
        </>
      ) : null}
    </Section>
  );
}

function DiffTab() {
  const d = useStudio((s) => s.diffraction);
  const adv = useStudio((s) => s.advanced);
  const snap = useStudio((s) => s.snapshot);
  const set = (k: string, v: number) =>
    useStudio.setState((s) => ({ diffraction: { ...s.diffraction, [k]: v } }));
  return (
    <Section title="Diffraction grating" onReset={() => useStudio.getState().resetSection("diffraction")}>
      <SelectRow label="Pattern" value={d.pattern} options={GRAT_PATTERNS} onChange={(v) => useStudio.getState().setDiff({ pattern: v as GratingPattern })} />
      <ParamSlider label="Frequency" value={d.frequency} min={1} max={48} step={0.1} onChange={(v) => set("frequency", v as never)} onCommit={snap} />
      <ParamSlider label="Density" value={d.density} min={0.2} max={3} onChange={(v) => set("density", v as never)} onCommit={snap} />
      <ParamSlider label="Rainbow" value={d.rainbowIntensity} min={0} max={1.5} onChange={(v) => set("rainbowIntensity", v as never)} onCommit={snap} />
      <ParamSlider label="Opacity" value={d.opacity} min={0} max={1} onChange={(v) => set("opacity", v as never)} onCommit={snap} />
      <ParamSlider label="Angle" value={d.angle} min={-3.14} max={3.14} onChange={(v) => set("angle", v as never)} onCommit={snap} />
      {adv ? (
        <>
          <ParamSlider label="Scale" value={d.scale} min={0.2} max={3} onChange={(v) => set("scale", v as never)} onCommit={snap} />
          <ParamSlider label="Dispersion" value={d.spectralDispersion} min={0} max={2} onChange={(v) => set("spectralDispersion", v as never)} onCommit={snap} />
          <ParamSlider label="Wavelength spread" value={d.wavelengthSpread} min={0.2} max={2} onChange={(v) => set("wavelengthSpread", v as never)} onCommit={snap} />
          <ParamSlider label="Hue offset" value={d.hueOffset} min={0} max={1} onChange={(v) => set("hueOffset", v as never)} onCommit={snap} />
          <ParamSlider label="Contrast" value={d.contrast} min={0.2} max={2} onChange={(v) => set("contrast", v as never)} onCommit={snap} />
          <ParamSlider label="Sharpness" value={d.sharpness} min={0} max={1} onChange={(v) => set("sharpness", v as never)} onCommit={snap} />
          <ParamSlider label="Distortion" value={d.distortion} min={0} max={1} onChange={(v) => set("distortion", v as never)} onCommit={snap} />
          <ParamSlider label="Perspective" value={d.perspective} min={0} max={2} onChange={(v) => set("perspective", v as never)} onCommit={snap} />
          <ParamSlider label="Falloff" value={d.falloff} min={0} max={1} onChange={(v) => set("falloff", v as never)} onCommit={snap} />
          <ParamSlider label="Light interaction" value={d.lightInteraction} min={0} max={1} onChange={(v) => set("lightInteraction", v as never)} onCommit={snap} />
        </>
      ) : null}
    </Section>
  );
}

function IriTab() {
  const i = useStudio((s) => s.iridescence);
  const snap = useStudio((s) => s.snapshot);
  const set = (k: string, v: number) =>
    useStudio.setState((s) => ({ iridescence: { ...s.iridescence, [k]: v } }));
  return (
    <Section title="Iridescence" onReset={() => useStudio.getState().resetSection("iridescence")}>
      <ParamSlider label="Intensity" value={i.intensity} min={0} max={1.5} onChange={(v) => set("intensity", v as never)} onCommit={snap} />
      <ParamSlider label="View sensitivity" value={i.viewSensitivity} min={0} max={1.5} onChange={(v) => set("viewSensitivity", v as never)} onCommit={snap} />
      <ParamSlider label="Hue range" value={i.hueRange} min={0} max={1} onChange={(v) => set("hueRange", v as never)} onCommit={snap} />
      <ParamSlider label="Color spread" value={i.colorSpread} min={0} max={2} onChange={(v) => set("colorSpread", v as never)} onCommit={snap} />
      <ParamSlider label="Saturation" value={i.saturation} min={0} max={2} onChange={(v) => set("saturation", v as never)} onCommit={snap} />
      <ParamSlider label="Fresnel" value={i.fresnel} min={0} max={1} onChange={(v) => set("fresnel", v as never)} onCommit={snap} />
      <ParamSlider label="Specular" value={i.specular} min={0} max={1.5} onChange={(v) => set("specular", v as never)} onCommit={snap} />
      <ParamSlider label="Clearcoat" value={i.clearcoat} min={0} max={1} onChange={(v) => set("clearcoat", v as never)} onCommit={snap} />
      <ParamSlider label="Clearcoat roughness" value={i.clearcoatRoughness} min={0} max={1} onChange={(v) => set("clearcoatRoughness", v as never)} onCommit={snap} />
    </Section>
  );
}

function ReflTab() {
  const r = useStudio((s) => s.reflection);
  const snap = useStudio((s) => s.snapshot);
  const set = (k: string, v: number) =>
    useStudio.setState((s) => ({ reflection: { ...s.reflection, [k]: v } }));
  return (
    <Section title="Reflection cloning" onReset={() => useStudio.getState().resetSection("reflection")}>
      <ParamSlider label="Clones" value={r.cloneCount} min={0} max={8} step={1} onChange={(v) => set("cloneCount", v as never)} onCommit={snap} />
      <ParamSlider label="Spacing" value={r.cloneSpacing} min={0} max={1.5} onChange={(v) => set("cloneSpacing", v as never)} onCommit={snap} />
      <ParamSlider label="Scale" value={r.cloneScale} min={0.2} max={2} onChange={(v) => set("cloneScale", v as never)} onCommit={snap} />
      <ParamSlider label="Opacity" value={r.cloneOpacity} min={0} max={1} onChange={(v) => set("cloneOpacity", v as never)} onCommit={snap} />
      <ParamSlider label="Kaleido segments" value={r.kaleidoSegments} min={2} max={16} step={1} onChange={(v) => set("kaleidoSegments", v as never)} onCommit={snap} />
      <ToggleRow label="Kaleidoscope" checked={r.kaleidoscope} onChange={(v) => useStudio.getState().setRefl({ kaleidoscope: v })} />
      <ToggleRow label="Horizontal mirror" checked={r.horizontalMirror} onChange={(v) => useStudio.getState().setRefl({ horizontalMirror: v })} />
      <ToggleRow label="Vertical mirror" checked={r.verticalMirror} onChange={(v) => useStudio.getState().setRefl({ verticalMirror: v })} />
      <ToggleRow label="Radial" checked={r.radialReflection} onChange={(v) => useStudio.getState().setRefl({ radialReflection: v })} />
      <ParamSlider label="Falloff" value={r.falloff} min={0} max={1.5} onChange={(v) => set("falloff", v as never)} onCommit={snap} />
      <ParamSlider label="Distortion" value={r.reflectionDistortion} min={0} max={1} onChange={(v) => set("reflectionDistortion", v as never)} onCommit={snap} />
      <SelectRow label="Blend" value={r.blend} options={BLENDS} onChange={(v) => useStudio.getState().setRefl({ blend: v as BlendMode })} />
    </Section>
  );
}

function MatTab() {
  const m = useStudio((s) => s.material);
  const snap = useStudio((s) => s.snapshot);
  const set = (k: string, v: number) =>
    useStudio.setState((s) => ({ material: { ...s.material, [k]: v } }));
  return (
    <Section title="Physical material" onReset={() => useStudio.getState().resetSection("material")}>
      <ParamSlider label="Metallic" value={m.metallic} min={0} max={1} onChange={(v) => set("metallic", v as never)} onCommit={snap} />
      <ParamSlider label="Roughness" value={m.roughness} min={0} max={1} onChange={(v) => set("roughness", v as never)} onCommit={snap} />
      <ParamSlider label="Gloss" value={m.gloss} min={0} max={1} onChange={(v) => set("gloss", v as never)} onCommit={snap} />
      <ParamSlider label="Specular" value={m.specular} min={0} max={1.5} onChange={(v) => set("specular", v as never)} onCommit={snap} />
      <ParamSlider label="Fresnel" value={m.fresnel} min={0} max={1} onChange={(v) => set("fresnel", v as never)} onCommit={snap} />
      <ParamSlider label="Clearcoat" value={m.clearcoat} min={0} max={1} onChange={(v) => set("clearcoat", v as never)} onCommit={snap} />
      <ParamSlider label="Reflection" value={m.reflection} min={0} max={1} onChange={(v) => set("reflection", v as never)} onCommit={snap} />
      <ParamSlider label="Grain" value={m.grain} min={0} max={1} onChange={(v) => set("grain", v as never)} onCommit={snap} />
      <ParamSlider label="Bump" value={m.bumpStrength} min={0} max={1} onChange={(v) => set("bumpStrength", v as never)} onCommit={snap} />
      <ParamSlider label="Scratches" value={m.scratches} min={0} max={1} onChange={(v) => set("scratches", v as never)} onCommit={snap} />
      <ParamSlider label="Micro scratches" value={m.microScratches} min={0} max={1} onChange={(v) => set("microScratches", v as never)} onCommit={snap} />
    </Section>
  );
}

function LightTab() {
  const l = useStudio((s) => s.lighting);
  const snap = useStudio((s) => s.snapshot);
  return (
    <>
      <Section title="Studio presets">
        <div className="grid grid-cols-2 gap-1">
          {LIGHTING_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => useStudio.getState().applyLightPreset(p.id)}
              className="h-8 rounded-sm bg-elevated text-[11px] text-muted hover:text-fg"
            >
              {p.name}
            </button>
          ))}
        </div>
        <ToggleRow label="Light follows pointer" checked={l.followMouse} onChange={(v) => useStudio.getState().setLight({ followMouse: v })} />
      </Section>
      <Section title="Key light">
        <ToggleRow label="Enabled" checked={l.key.enabled} onChange={(v) => useStudio.setState((s) => ({ lighting: { ...s.lighting, key: { ...s.lighting.key, enabled: v } } }))} />
        <ParamSlider label="Azimuth" value={l.key.azimuth} min={-3.14} max={3.14} onChange={(v) => useStudio.setState((s) => ({ lighting: { ...s.lighting, key: { ...s.lighting.key, azimuth: v } } }))} onCommit={snap} />
        <ParamSlider label="Elevation" value={l.key.elevation} min={-0.2} max={1.5} onChange={(v) => useStudio.setState((s) => ({ lighting: { ...s.lighting, key: { ...s.lighting.key, elevation: v } } }))} onCommit={snap} />
        <ParamSlider label="Intensity" value={l.key.intensity} min={0} max={2} onChange={(v) => useStudio.setState((s) => ({ lighting: { ...s.lighting, key: { ...s.lighting.key, intensity: v } } }))} onCommit={snap} />
        <ParamSlider label="Softness" value={l.key.softness} min={0} max={1} onChange={(v) => useStudio.setState((s) => ({ lighting: { ...s.lighting, key: { ...s.lighting.key, softness: v } } }))} onCommit={snap} />
        <ColorRow label="Color" value={l.key.color} onChange={(v) => useStudio.setState((s) => ({ lighting: { ...s.lighting, key: { ...s.lighting.key, color: v } } }))} />
      </Section>
      <Section title="Fill / rim / ambient">
        <ParamSlider label="Fill intensity" value={l.fill.intensity} min={0} max={1.5} onChange={(v) => useStudio.setState((s) => ({ lighting: { ...s.lighting, fill: { ...s.lighting.fill, intensity: v } } }))} onCommit={snap} />
        <ParamSlider label="Rim intensity" value={l.rim.intensity} min={0} max={1.5} onChange={(v) => useStudio.setState((s) => ({ lighting: { ...s.lighting, rim: { ...s.lighting.rim, intensity: v } } }))} onCommit={snap} />
        <ParamSlider label="Ambient" value={l.ambientIntensity} min={0} max={1} onChange={(v) => useStudio.setState((s) => ({ lighting: { ...s.lighting, ambientIntensity: v } }))} onCommit={snap} />
        <ColorRow label="Ambient color" value={l.ambientColor} onChange={(v) => useStudio.getState().setLight({ ambientColor: v })} />
        <ParamSlider label="Shadow" value={l.shadowStrength} min={0} max={1} onChange={(v) => useStudio.setState((s) => ({ lighting: { ...s.lighting, shadowStrength: v } }))} onCommit={snap} />
      </Section>
    </>
  );
}

function FxTab() {
  const cam = useStudio((s) => s.camera);
  const snap = useStudio((s) => s.snapshot);
  return (
    <Section title="Camera" onReset={() => useStudio.getState().resetSection("camera")}>
      <ParamSlider label="Distance" value={cam.distance} min={1.2} max={5} onChange={(v) => useStudio.setState((s) => ({ camera: { ...s.camera, distance: v } }))} onCommit={snap} />
      <ParamSlider label="Field of view" value={cam.fov} min={18} max={55} step={0.5} onChange={(v) => useStudio.setState((s) => ({ camera: { ...s.camera, fov: v } }))} onCommit={snap} />
      <ParamSlider label="Zoom" value={cam.zoom} min={0.45} max={2.4} onChange={(v) => useStudio.setState((s) => ({ camera: { ...s.camera, zoom: v } }))} onCommit={snap} />
      <ParamSlider label="Roll" value={cam.rotZ} min={-0.4} max={0.4} onChange={(v) => useStudio.setState((s) => ({ camera: { ...s.camera, rotZ: v } }))} onCommit={snap} />
    </Section>
  );
}

function AnimTab() {
  const a = useStudio((s) => s.animation);
  const snap = useStudio((s) => s.snapshot);
  return (
    <>
      <Section title="Showcase">
        <div className="grid grid-cols-1 gap-1">
          {ANIM_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => useStudio.getState().applyAnim(p.id)}
              className={cn(
                "rounded-sm px-2 py-2 text-left",
                a.preset === p.id ? "bg-elevated" : "hover:bg-elevated/60",
              )}
            >
              <div className="text-xs text-fg">{p.name}</div>
              <div className="text-[11px] text-subtle">{p.blurb}</div>
            </button>
          ))}
        </div>
      </Section>
      <Section title="Timeline">
        <ToggleRow label="Playing" checked={a.playing} onChange={(v) => useStudio.getState().setAnim({ playing: v })} />
        <ToggleRow label="Loop" checked={a.loop} onChange={(v) => useStudio.getState().setAnim({ loop: v })} />
        <ToggleRow label="Auto-rotate" checked={a.autoRotate} onChange={(v) => useStudio.getState().setAnim({ autoRotate: v })} />
        <ParamSlider label="Duration (s)" value={a.duration} min={1} max={16} step={0.1} onChange={(v) => useStudio.setState((s) => ({ animation: { ...s.animation, duration: v } }))} onCommit={snap} />
        <ParamSlider label="FPS" value={a.fps} min={8} max={60} step={1} onChange={(v) => useStudio.setState((s) => ({ animation: { ...s.animation, fps: v } }))} onCommit={snap} />
        <ParamSlider label="Rotation speed" value={a.rotationSpeed} min={0} max={1.5} onChange={(v) => useStudio.setState((s) => ({ animation: { ...s.animation, rotationSpeed: v } }))} onCommit={snap} />
        <ParamSlider label="Tilt" value={a.tilt} min={0} max={1} onChange={(v) => useStudio.setState((s) => ({ animation: { ...s.animation, tilt: v } }))} onCommit={snap} />
        <ParamSlider label="Light movement" value={a.lightMove} min={0} max={1.5} onChange={(v) => useStudio.setState((s) => ({ animation: { ...s.animation, lightMove: v } }))} onCommit={snap} />
        <ParamSlider label="Holo animation" value={a.holoAnim} min={0} max={1.5} onChange={(v) => useStudio.setState((s) => ({ animation: { ...s.animation, holoAnim: v } }))} onCommit={snap} />
        <SelectRow
          label="Easing"
          value={a.easing}
          options={[
            { id: "linear", name: "Linear" },
            { id: "easeIn", name: "Ease in" },
            { id: "easeOut", name: "Ease out" },
            { id: "easeInOut", name: "Ease in-out" },
            { id: "cubic", name: "Cubic" },
            { id: "smoothstep", name: "Smoothstep" },
          ]}
          onChange={(v) => useStudio.getState().setAnim({ easing: v as typeof a.easing })}
        />
        <button
          type="button"
          className="h-8 rounded-sm text-[11px] text-muted hover:text-fg"
          onClick={() => useStudio.setState({ animation: defaultProject().animation })}
        >
          Reset animation
        </button>
      </Section>
    </>
  );
}
