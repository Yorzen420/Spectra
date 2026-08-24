import * as Slider from "@radix-ui/react-slider";
import * as Switch from "@radix-ui/react-switch";
import * as Tooltip from "@radix-ui/react-tooltip";
import { RotateCcw } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Tooltip.Root delayDuration={280}>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="bottom"
          className="z-80 rounded-sm bg-elevated px-2 py-1 text-xs text-fg shadow-border"
        >
          {label}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

export function Section({
  title,
  onReset,
  children,
}: {
  title: string;
  onReset?: () => void;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-border px-3 py-3">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
          {title}
        </h3>
        {onReset ? (
          <button
            type="button"
            onClick={onReset}
            className="rounded-xs p-1 text-subtle hover:text-fg"
            aria-label={`Reset ${title}`}
          >
            <RotateCcw className="size-3" />
          </button>
        ) : null}
      </div>
      <div className="flex flex-col gap-2.5">{children}</div>
    </section>
  );
}

export function ParamSlider({
  label,
  value,
  min,
  max,
  step = 0.01,
  onChange,
  onCommit,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  onCommit?: () => void;
  format?: (v: number) => string;
}) {
  const shown = format ? format(value) : value.toFixed(step < 0.1 ? 2 : 0);
  return (
    <label className="block">
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="text-[11px] text-muted">{label}</span>
        <input
          type="number"
          className="h-5 w-14 rounded-xs border-0 bg-elevated px-1 text-right font-mono text-[11px] text-fg tabular-nums outline-none ring-0 focus:shadow-border"
          value={Number.isFinite(value) ? value : 0}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          onBlur={onCommit}
        />
      </div>
      <Slider.Root
        className="relative flex h-4 w-full touch-none items-center select-none"
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(v ?? min)}
        onValueCommit={onCommit}
        aria-label={label}
      >
        <Slider.Track className="relative h-px grow rounded-full bg-border">
          <Slider.Range className="absolute h-full bg-accent/80" />
        </Slider.Track>
        <Slider.Thumb className="block size-3 rounded-full bg-accent shadow-border hover:scale-110 focus:outline-none" />
      </Slider.Root>
      <span className="sr-only">{shown}</span>
    </label>
  );
}

export function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex h-8 items-center justify-between gap-3">
      <span className="text-[11px] text-muted">{label}</span>
      <Switch.Root
        checked={checked}
        onCheckedChange={onChange}
        className={cn(
          "relative h-4 w-7 rounded-full transition-colors duration-150",
          checked ? "bg-accent" : "bg-border",
        )}
      >
        <Switch.Thumb
          className={cn(
            "block size-3 translate-x-0.5 rounded-full bg-accent-fg transition-transform duration-150",
            checked && "translate-x-3.5",
          )}
        />
      </Switch.Root>
    </label>
  );
}

export function SelectRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { id: string; name: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[11px] text-muted">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 rounded-sm border-0 bg-elevated px-2 text-xs text-fg shadow-border outline-none"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ColorRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex h-8 items-center justify-between gap-3">
      <span className="text-[11px] text-muted">{label}</span>
      <span className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="size-6 cursor-pointer rounded-xs border-0 bg-transparent"
        />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-6 w-20 rounded-xs bg-elevated px-1.5 font-mono text-[10px] text-muted outline-none"
        />
      </span>
    </label>
  );
}

export function IconBtn({
  label,
  onClick,
  active,
  children,
  disabled,
}: {
  label: string;
  onClick?: () => void;
  active?: boolean;
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <Tip label={label}>
      <button
        type="button"
        aria-label={label}
        disabled={disabled}
        onClick={onClick}
        className={cn(
          "inline-flex size-8 items-center justify-center rounded-sm text-muted transition-colors duration-150 hover:bg-elevated hover:text-fg disabled:opacity-40",
          active && "bg-elevated text-fg",
        )}
      >
        {children}
      </button>
    </Tip>
  );
}

export function PrimaryBtn({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-accent px-3 text-xs font-medium text-accent-fg transition-opacity duration-150 hover:opacity-90 disabled:opacity-40"
    >
      {children}
    </button>
  );
}

export function GhostBtn({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-8 items-center gap-1.5 rounded-sm px-2.5 text-xs text-muted shadow-border transition-colors duration-150 hover:bg-elevated hover:text-fg disabled:opacity-40"
    >
      {children}
    </button>
  );
}
