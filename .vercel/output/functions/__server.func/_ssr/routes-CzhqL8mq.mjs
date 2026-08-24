import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { C as Download, S as EyeOff, _ as Lock, a as Undo2, b as FolderOpen, c as Sparkles, d as Redo2, f as Plus, g as PanelLeft, h as PanelRight, i as Upload, l as Save, m as Pause, n as ZoomOut, p as Play, r as X, s as Trash2, t as ZoomIn, u as RotateCcw, v as LockOpen, w as Copy, x as Eye, y as Layers } from "../_libs/lucide-react.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as Trigger, i as Root3, n as Portal, r as Provider, t as Content2 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { n as SwitchThumb, t as Switch } from "../_libs/radix-ui__react-switch.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as subscribeWithSelector } from "../_libs/zustand.mjs";
import { _ as UniformsUtils, a as DataTexture, c as MeshBasicMaterial, d as RepeatWrapping, f as SRGBColorSpace, g as Timer, h as Texture, i as Color, l as PerspectiveCamera, m as ShaderMaterial, n as BoxGeometry, o as Group, p as Scene, r as CanvasTexture, s as Mesh, t as WebGLRenderer, u as PlaneGeometry, v as Vector2, y as Vector3 } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CzhqL8mq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Tip({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root3, {
		delayDuration: 280,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
			asChild: true,
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
			side: "bottom",
			className: "z-80 rounded-sm bg-elevated px-2 py-1 text-xs text-fg shadow-border",
			children: label
		}) })]
	});
}
function Section({ title, onReset, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border-b border-border px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-[11px] font-medium tracking-[0.14em] text-muted uppercase",
				children: title
			}), onReset ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onReset,
				className: "rounded-xs p-1 text-subtle hover:text-fg",
				"aria-label": `Reset ${title}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3" })
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-2.5",
			children
		})]
	});
}
function ParamSlider({ label, value, min, max, step = .01, onChange, onCommit, format }) {
	const shown = format ? format(value) : value.toFixed(step < .1 ? 2 : 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-1 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-muted",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "number",
					className: "h-5 w-14 rounded-xs border-0 bg-elevated px-1 text-right font-mono text-[11px] text-fg tabular-nums outline-none ring-0 focus:shadow-border",
					value: Number.isFinite(value) ? value : 0,
					min,
					max,
					step,
					onChange: (e) => onChange(Number(e.target.value)),
					onBlur: onCommit
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider, {
				className: "relative flex h-4 w-full touch-none items-center select-none",
				value: [value],
				min,
				max,
				step,
				onValueChange: ([v]) => onChange(v ?? min),
				onValueCommit: onCommit,
				"aria-label": label,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
					className: "relative h-px grow rounded-full bg-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-accent/80" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-3 rounded-full bg-accent shadow-border hover:scale-110 focus:outline-none" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: shown
			})
		]
	});
}
function ToggleRow({ label, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex h-8 items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[11px] text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked,
			onCheckedChange: onChange,
			className: cn("relative h-4 w-7 rounded-full transition-colors duration-150", checked ? "bg-accent" : "bg-border"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("block size-3 translate-x-0.5 rounded-full bg-accent-fg transition-transform duration-150", checked && "translate-x-3.5") })
		})]
	});
}
function SelectRow({ label, value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[11px] text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "h-8 rounded-sm border-0 bg-elevated px-2 text-xs text-fg shadow-border outline-none",
			children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: o.id,
				children: o.name
			}, o.id))
		})]
	});
}
function ColorRow({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex h-8 items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[11px] text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "color",
				value,
				onChange: (e) => onChange(e.target.value),
				className: "size-6 cursor-pointer rounded-xs border-0 bg-transparent"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value,
				onChange: (e) => onChange(e.target.value),
				className: "h-6 w-20 rounded-xs bg-elevated px-1.5 font-mono text-[10px] text-muted outline-none"
			})]
		})]
	});
}
function IconBtn({ label, onClick, active, children, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
		label,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": label,
			disabled,
			onClick,
			className: cn("inline-flex size-8 items-center justify-center rounded-sm text-muted transition-colors duration-150 hover:bg-elevated hover:text-fg disabled:opacity-40", active && "bg-elevated text-fg"),
			children
		})
	});
}
function PrimaryBtn({ children, onClick, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		disabled,
		onClick,
		className: "inline-flex h-8 items-center gap-1.5 rounded-sm bg-accent px-3 text-xs font-medium text-accent-fg transition-opacity duration-150 hover:opacity-90 disabled:opacity-40",
		children
	});
}
function GhostBtn({ children, onClick, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		disabled,
		onClick,
		className: "inline-flex h-8 items-center gap-1.5 rounded-sm px-2.5 text-xs text-muted shadow-border transition-colors duration-150 hover:bg-elevated hover:text-fg disabled:opacity-40",
		children
	});
}
function defaultArt() {
	return {
		src: null,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		crop: 0,
		fit: "fill",
		opacity: 1,
		brightness: 1,
		contrast: 1,
		saturation: 1,
		hue: 0,
		gamma: 1,
		blur: 0,
		sharpen: 0,
		blend: "mix"
	};
}
function defaultCard() {
	return {
		widthMm: 63,
		heightMm: 88,
		cornerRadius: .045,
		borderThickness: .035,
		borderStyle: "foil",
		depth: .028,
		background: "#0b0d12",
		edgeColor: "#c9d0da",
		edgeMetal: .85
	};
}
function defaultHolo() {
	return {
		intensity: .85,
		opacity: .72,
		spectralDispersion: .85,
		rainbowStrength: .9,
		hueShift: .08,
		saturation: 1.15,
		contrast: 1.1,
		frequency: 6.5,
		scale: 1,
		direction: .15,
		rotation: .2,
		distortion: .25,
		noise: .2,
		turbulence: .35,
		sharpness: .55,
		blend: "screen",
		animation: .15,
		viewResponse: 1,
		pattern: "linear",
		mask: "full"
	};
}
function defaultDiffraction() {
	return {
		frequency: 18,
		density: 1.1,
		scale: 1,
		angle: .35,
		direction: 0,
		spectralDispersion: 1.1,
		wavelengthSpread: 1,
		rainbowIntensity: .8,
		hueOffset: .12,
		contrast: 1.15,
		sharpness: .6,
		distortion: .12,
		perspective: .7,
		falloff: .25,
		lightInteraction: .8,
		pattern: "lines",
		opacity: .7
	};
}
function defaultIridescence() {
	return {
		intensity: .45,
		viewSensitivity: .7,
		hueRange: .2,
		colorSpread: .65,
		saturation: 1.05,
		roughness: .22,
		metallic: .7,
		fresnel: .55,
		specular: .8,
		clearcoat: .65,
		clearcoatRoughness: .12
	};
}
function defaultReflection() {
	return {
		cloneCount: 0,
		cloneSpacing: .35,
		cloneScale: 1,
		cloneRotation: 0,
		cloneOpacity: .45,
		reflectionAngle: 0,
		reflectionBlur: 0,
		reflectionDistortion: .05,
		mirrorAxis: 0,
		horizontalMirror: false,
		verticalMirror: false,
		radialReflection: false,
		kaleidoscope: false,
		kaleidoSegments: 6,
		falloff: .6,
		blend: "screen"
	};
}
function defaultMaterial() {
	return {
		metallic: .55,
		roughness: .22,
		gloss: .72,
		specular: .8,
		fresnel: .5,
		clearcoat: .6,
		clearcoatRoughness: .14,
		reflection: .45,
		refraction: .05,
		iridescence: .4,
		surfaceDistortion: .08,
		microSurface: .35,
		grain: .18,
		noise: .08,
		bumpStrength: .22,
		scratches: .28,
		microScratches: .2
	};
}
function defaultLighting() {
	return {
		key: {
			enabled: true,
			azimuth: .55,
			elevation: .62,
			intensity: 1.15,
			size: .6,
			softness: .45,
			color: "#f2f4f8"
		},
		fill: {
			enabled: true,
			azimuth: 3.4,
			elevation: .25,
			intensity: .28,
			size: 1,
			softness: .8,
			color: "#9aa8bc"
		},
		rim: {
			enabled: true,
			azimuth: 2.6,
			elevation: .4,
			intensity: .55,
			size: .4,
			softness: .3,
			color: "#d5e2f0"
		},
		ambientIntensity: .22,
		ambientColor: "#8b93a3",
		specularLight: 1,
		envIntensity: .5,
		shadowStrength: .45,
		followMouse: true
	};
}
function defaultLayers() {
	const mk = (id, name, kind, opacity = 1) => ({
		id,
		name,
		kind,
		visible: true,
		locked: false,
		opacity,
		blend: "mix",
		mask: "none"
	});
	return [
		mk("base", "Card Base", "base"),
		mk("artwork", "Artwork", "artwork"),
		mk("border", "Border", "border"),
		mk("foil", "Foil", "foil", .85),
		mk("diffraction", "Diffraction", "diffraction", .9),
		mk("holographic", "Holographic Pattern", "holographic"),
		mk("iridescence", "Iridescence", "iridescence", .9),
		mk("reflection", "Reflection", "reflection", .7),
		mk("texture", "Texture", "texture", .8),
		mk("scratches", "Scratches", "scratches", .75),
		mk("gloss", "Gloss", "gloss"),
		mk("lighting", "Lighting", "lighting")
	];
}
function defaultTextures() {
	const base = {
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
		blend: "mix",
		animation: 0,
		enabled: true,
		src: "",
		builtin: true
	};
	return [
		{
			...base,
			id: "tex-grain",
			name: "Paper Grain",
			kind: "grain"
		},
		{
			...base,
			id: "tex-scratch",
			name: "Micro Scratches",
			kind: "scratch"
		},
		{
			...base,
			id: "tex-foil",
			name: "Foil Grain",
			kind: "foil"
		},
		{
			...base,
			id: "tex-bump",
			name: "Micro Bump",
			kind: "bump"
		},
		{
			...base,
			id: "tex-dots",
			name: "Dot Screen",
			kind: "mask",
			enabled: false
		},
		{
			...base,
			id: "tex-stars",
			name: "Star Field",
			kind: "overlay",
			enabled: false
		},
		{
			...base,
			id: "tex-lines",
			name: "Line Grating",
			kind: "diffraction",
			enabled: false
		},
		{
			...base,
			id: "tex-hex",
			name: "Hex Cells",
			kind: "holo",
			enabled: false
		}
	];
}
function defaultAnimation() {
	return {
		preset: "idle",
		playing: false,
		duration: 6,
		fps: 30,
		rotationSpeed: .35,
		rotationDirection: 1,
		tilt: .22,
		cameraMove: .15,
		zoomPulse: 0,
		lightMove: .4,
		holoAnim: .3,
		reflectionAnim: .1,
		textureAnim: .05,
		loop: true,
		easing: "easeInOut",
		autoRotate: false
	};
}
function defaultCamera() {
	return {
		distance: 3.15,
		fov: 28,
		rotX: -.18,
		rotY: .32,
		rotZ: 0,
		zoom: 1,
		perspective: 1
	};
}
function defaultExport() {
	return {
		format: "png",
		resolution: 2048,
		fps: 20,
		duration: 4,
		quality: .85,
		dither: true,
		transparent: false,
		background: "studio",
		solidColor: "#0a0a0c",
		shadow: true,
		loop: true,
		bitrate: 6e6
	};
}
function defaultProject() {
	return {
		version: 1,
		name: "Untitled Card",
		card: defaultCard(),
		front: defaultArt(),
		back: defaultArt(),
		holo: defaultHolo(),
		diffraction: defaultDiffraction(),
		iridescence: defaultIridescence(),
		reflection: defaultReflection(),
		material: defaultMaterial(),
		lighting: defaultLighting(),
		layers: defaultLayers(),
		textures: defaultTextures(),
		animation: defaultAnimation(),
		camera: defaultCamera(),
		quality: "high",
		advanced: false
	};
}
var MATERIAL_PRESETS = [
	{
		id: "classic",
		name: "Classic Holographic",
		blurb: "Traditional collectible rainbow foil"
	},
	{
		id: "rainbow",
		name: "Rainbow Prism",
		blurb: "Sharp spectral breaks"
	},
	{
		id: "aurora",
		name: "Aurora",
		blurb: "Atmospheric iridescent wash"
	},
	{
		id: "diamond",
		name: "Diamond",
		blurb: "Crystalline sparkle"
	},
	{
		id: "galaxy",
		name: "Galaxy",
		blurb: "Dark foil, spectral stars"
	},
	{
		id: "shattered",
		name: "Shattered Glass",
		blurb: "Aggressive reflective shards"
	},
	{
		id: "chrome",
		name: "Chrome",
		blurb: "Mirror metal"
	},
	{
		id: "gold",
		name: "Gold Luxury",
		blurb: "Warm metallic foil"
	},
	{
		id: "silver",
		name: "Silver Luxury",
		blurb: "Cool high-end foil"
	},
	{
		id: "retro",
		name: "Retro 90s Holo",
		blurb: "Vintage card shimmer"
	},
	{
		id: "modern",
		name: "Modern Premium",
		blurb: "Quiet luxury foil"
	},
	{
		id: "hyper",
		name: "Hyper Holo",
		blurb: "Maximum spectral response"
	},
	{
		id: "oilslick",
		name: "Oil Slick",
		blurb: "Angle-heavy color shift"
	},
	{
		id: "crystal",
		name: "Crystal",
		blurb: "Geometric refraction"
	}
];
function applyMaterialPreset(base, id) {
	const p = structuredClone(base);
	const h = p.holo;
	const d = p.diffraction;
	const i = p.iridescence;
	const r = p.reflection;
	const m = p.material;
	const l = p.lighting;
	Object.assign(h, defaultProject().holo);
	Object.assign(d, defaultProject().diffraction);
	Object.assign(i, defaultProject().iridescence);
	Object.assign(r, defaultProject().reflection);
	Object.assign(m, defaultProject().material);
	switch (id) {
		case "classic":
			h.pattern = "linear";
			h.frequency = 6.2;
			h.rainbowStrength = .95;
			d.pattern = "lines";
			d.frequency = 16;
			break;
		case "rainbow":
			h.pattern = "prism";
			h.frequency = 9;
			h.sharpness = .85;
			h.spectralDispersion = 1.2;
			h.rainbowStrength = 1.2;
			d.pattern = "chevron";
			d.frequency = 22;
			d.sharpness = .85;
			d.rainbowIntensity = 1.1;
			i.intensity = .35;
			break;
		case "aurora":
			h.pattern = "aurora";
			h.frequency = 3.2;
			h.turbulence = .8;
			h.distortion = .55;
			h.rainbowStrength = .7;
			h.opacity = .6;
			d.opacity = .35;
			d.frequency = 8;
			i.intensity = .85;
			i.colorSpread = 1.1;
			i.viewSensitivity = .85;
			m.roughness = .32;
			m.gloss = .55;
			break;
		case "diamond":
			h.pattern = "starburst";
			h.frequency = 11;
			h.sharpness = .9;
			h.noise = .45;
			d.pattern = "hex";
			d.frequency = 14;
			d.sharpness = .9;
			r.kaleidoscope = true;
			r.kaleidoSegments = 8;
			r.cloneCount = 3;
			r.cloneOpacity = .3;
			m.gloss = .92;
			m.clearcoat = .9;
			m.scratches = .12;
			i.intensity = .55;
			break;
		case "galaxy":
			h.pattern = "galaxy";
			h.frequency = 4.5;
			h.rainbowStrength = .75;
			h.opacity = .55;
			h.mask = "luminance";
			d.opacity = .45;
			d.falloff = .55;
			i.intensity = .7;
			i.hueRange = .55;
			m.metallic = .4;
			m.roughness = .38;
			l.key.intensity = .9;
			l.ambientIntensity = .12;
			p.card.background = "#05060a";
			break;
		case "shattered":
			h.pattern = "shattered";
			h.frequency = 8;
			h.sharpness = .95;
			h.distortion = .4;
			d.pattern = "cross";
			d.frequency = 20;
			r.cloneCount = 6;
			r.cloneSpacing = .5;
			r.reflectionDistortion = .35;
			r.cloneOpacity = .55;
			m.gloss = .88;
			m.microSurface = .7;
			break;
		case "chrome":
			h.opacity = .18;
			h.rainbowStrength = .15;
			d.opacity = .12;
			i.intensity = .12;
			m.metallic = 1;
			m.roughness = .06;
			m.gloss = .98;
			m.clearcoat = .85;
			m.specular = 1;
			m.reflection = .9;
			m.scratches = .35;
			p.card.edgeColor = "#e8edf2";
			p.card.borderStyle = "metallic";
			l.key.intensity = 1.35;
			break;
		case "gold":
			h.pattern = "radial";
			h.hueShift = .08;
			h.rainbowStrength = .35;
			h.opacity = .4;
			h.saturation = 1.3;
			d.hueOffset = .08;
			d.rainbowIntensity = .35;
			d.opacity = .3;
			i.intensity = .3;
			i.hueRange = .05;
			m.metallic = .92;
			m.roughness = .18;
			m.gloss = .8;
			p.card.edgeColor = "#e4d5b0";
			p.card.borderStyle = "metallic";
			l.key.color = "#fff4e0";
			l.fill.color = "#c4a070";
			break;
		case "silver":
			h.opacity = .32;
			h.rainbowStrength = .28;
			h.saturation = .55;
			d.opacity = .22;
			d.rainbowIntensity = .25;
			i.intensity = .22;
			m.metallic = .95;
			m.roughness = .12;
			m.gloss = .9;
			p.card.edgeColor = "#dfe6ee";
			p.card.borderStyle = "metallic";
			break;
		case "retro":
			h.pattern = "grid";
			h.frequency = 7.5;
			h.rainbowStrength = 1;
			h.opacity = .8;
			h.mask = "reverse";
			d.pattern = "lines";
			d.frequency = 28;
			d.angle = .6;
			i.intensity = .25;
			m.grain = .35;
			m.scratches = .4;
			m.roughness = .28;
			m.gloss = .6;
			break;
		case "modern":
			h.pattern = "spectrum";
			h.frequency = 3.8;
			h.opacity = .38;
			h.rainbowStrength = .4;
			h.sharpness = .3;
			d.opacity = .22;
			d.frequency = 10;
			i.intensity = .4;
			m.metallic = .45;
			m.roughness = .2;
			m.gloss = .7;
			m.grain = .08;
			m.scratches = .1;
			break;
		case "hyper":
			h.pattern = "kaleidoscope";
			h.frequency = 12;
			h.intensity = 1.2;
			h.opacity = 1;
			h.rainbowStrength = 1.35;
			h.spectralDispersion = 1.4;
			h.viewResponse = 1.4;
			h.animation = .45;
			d.frequency = 32;
			d.rainbowIntensity = 1.3;
			d.opacity = 1;
			i.intensity = .9;
			i.colorSpread = 1.2;
			r.kaleidoscope = true;
			r.kaleidoSegments = 10;
			r.cloneCount = 4;
			m.gloss = .95;
			break;
		case "oilslick":
			h.pattern = "circular";
			h.frequency = 5;
			h.turbulence = .7;
			h.distortion = .6;
			h.viewResponse = 1.3;
			h.rainbowStrength = 1.1;
			d.pattern = "wave";
			d.frequency = 12;
			d.distortion = .4;
			i.intensity = 1;
			i.viewSensitivity = 1;
			i.colorSpread = 1.3;
			m.roughness = .16;
			m.metallic = .8;
			break;
		case "crystal":
			h.pattern = "diamond";
			h.frequency = 8;
			h.sharpness = .8;
			d.pattern = "hex";
			d.frequency = 16;
			r.kaleidoscope = true;
			r.kaleidoSegments = 6;
			r.radialReflection = true;
			r.cloneCount = 4;
			r.cloneOpacity = .4;
			i.intensity = .6;
			m.clearcoat = 1;
			m.clearcoatRoughness = .05;
			m.gloss = .95;
			m.refraction = .25;
	}
	return p;
}
var ANIM_PRESETS = [
	{
		id: "slow",
		name: "Slow Luxury",
		blurb: "Gentle studio turn"
	},
	{
		id: "sweep",
		name: "Holographic Sweep",
		blurb: "Light travels the foil"
	},
	{
		id: "prism",
		name: "Prism Reveal",
		blurb: "Dramatic spectral shift"
	},
	{
		id: "product",
		name: "Premium Product Shot",
		blurb: "Subtle camera drift"
	},
	{
		id: "spin360",
		name: "360° Showcase",
		blurb: "Full rotation, both faces"
	},
	{
		id: "flip",
		name: "Flip Reveal",
		blurb: "Front, flip, back, return"
	},
	{
		id: "hyper",
		name: "Hyper Holo",
		blurb: "Aggressive motion"
	},
	{
		id: "cinematic",
		name: "Cinematic",
		blurb: "Slow dramatic orbit"
	},
	{
		id: "retro",
		name: "Retro Collectible",
		blurb: "Vintage shimmer turn"
	},
	{
		id: "custom",
		name: "Custom",
		blurb: "Manual parameters"
	}
];
function applyAnimPreset(base, id) {
	const p = structuredClone(base);
	const a = p.animation;
	a.preset = id;
	a.loop = true;
	a.easing = "easeInOut";
	a.playing = true;
	a.autoRotate = false;
	switch (id) {
		case "slow":
			a.duration = 10;
			a.rotationSpeed = .18;
			a.tilt = .12;
			a.lightMove = .25;
			a.holoAnim = .15;
			a.cameraMove = .08;
			a.zoomPulse = 0;
			break;
		case "sweep":
			a.duration = 6;
			a.rotationSpeed = .08;
			a.tilt = .18;
			a.lightMove = 1;
			a.holoAnim = .6;
			a.cameraMove = .05;
			break;
		case "prism":
			a.duration = 7;
			a.rotationSpeed = .4;
			a.tilt = .35;
			a.lightMove = .7;
			a.holoAnim = .85;
			a.easing = "cubic";
			break;
		case "product":
			a.duration = 8;
			a.rotationSpeed = .12;
			a.tilt = .1;
			a.cameraMove = .35;
			a.zoomPulse = .08;
			a.lightMove = .2;
			a.holoAnim = .1;
			break;
		case "spin360":
			a.duration = 8;
			a.rotationSpeed = 1;
			a.tilt = .08;
			a.lightMove = .3;
			a.easing = "linear";
			break;
		case "flip":
			a.duration = 6;
			a.rotationSpeed = 1;
			a.tilt = .05;
			a.lightMove = .2;
			a.easing = "easeInOut";
			break;
		case "hyper":
			a.duration = 4;
			a.rotationSpeed = .7;
			a.tilt = .45;
			a.lightMove = 1;
			a.holoAnim = 1;
			a.reflectionAnim = .6;
			a.textureAnim = .4;
			a.easing = "cubic";
			break;
		case "cinematic":
			a.duration = 12;
			a.rotationSpeed = .22;
			a.tilt = .2;
			a.cameraMove = .45;
			a.zoomPulse = .12;
			a.lightMove = .35;
			a.holoAnim = .2;
			a.easing = "smoothstep";
			break;
		case "retro":
			a.duration = 5;
			a.rotationSpeed = .3;
			a.tilt = .28;
			a.lightMove = .55;
			a.holoAnim = .5;
			break;
		case "custom": a.playing = false;
	}
	return p;
}
var LIGHTING_PRESETS = [
	{
		id: "product",
		name: "Product Photography"
	},
	{
		id: "softbox",
		name: "Softbox"
	},
	{
		id: "studio",
		name: "Studio"
	},
	{
		id: "dramatic",
		name: "Dramatic"
	},
	{
		id: "rim",
		name: "Rim Light"
	},
	{
		id: "top",
		name: "Top Light"
	},
	{
		id: "side",
		name: "Side Light"
	},
	{
		id: "back",
		name: "Back Light"
	},
	{
		id: "luxury",
		name: "Luxury"
	},
	{
		id: "rainbow",
		name: "Rainbow Studio"
	}
];
function applyLightingPreset(base, id) {
	const p = structuredClone(base);
	const l = p.lighting;
	l.followMouse = true;
	switch (id) {
		case "product":
			l.key = {
				...l.key,
				azimuth: .6,
				elevation: .7,
				intensity: 1.2,
				softness: .5,
				color: "#f4f6fa"
			};
			l.fill = {
				...l.fill,
				azimuth: 3.5,
				elevation: .2,
				intensity: .3,
				color: "#a8b4c4"
			};
			l.rim = {
				...l.rim,
				azimuth: 2.7,
				elevation: .35,
				intensity: .45,
				color: "#dce6f0"
			};
			l.ambientIntensity = .2;
			break;
		case "softbox":
			l.key.softness = .9;
			l.key.intensity = 1;
			l.fill.intensity = .5;
			l.rim.intensity = .2;
			l.ambientIntensity = .32;
			break;
		case "studio":
			l.key.intensity = 1.1;
			l.fill.intensity = .35;
			l.rim.intensity = .4;
			l.ambientIntensity = .22;
			break;
		case "dramatic":
			l.key = {
				...l.key,
				azimuth: .9,
				elevation: .45,
				intensity: 1.4,
				softness: .15,
				color: "#fff6ee"
			};
			l.fill.intensity = .08;
			l.rim.intensity = .7;
			l.ambientIntensity = .08;
			l.shadowStrength = .75;
			break;
		case "rim":
			l.key.intensity = .35;
			l.rim.intensity = 1.2;
			l.fill.intensity = .15;
			break;
		case "top":
			l.key.elevation = 1.35;
			l.key.azimuth = 0;
			l.key.intensity = 1.25;
			l.fill.intensity = .2;
			break;
		case "side":
			l.key.azimuth = 1.4;
			l.key.elevation = .2;
			l.key.intensity = 1.3;
			l.fill.azimuth = -1.4;
			l.fill.intensity = .25;
			break;
		case "back":
			l.key.azimuth = 3.14;
			l.key.elevation = .4;
			l.key.intensity = .5;
			l.rim.intensity = 1.1;
			l.ambientIntensity = .18;
			break;
		case "luxury":
			l.key.color = "#fff4e8";
			l.key.intensity = 1.15;
			l.fill.color = "#9aa8c0";
			l.rim.color = "#e8f0ff";
			l.rim.intensity = .6;
			l.ambientIntensity = .18;
			break;
		case "rainbow":
			l.key.color = "#ffe8f0";
			l.fill.color = "#c0e8ff";
			l.rim.color = "#e8ffd8";
			l.key.intensity = 1.1;
			l.fill.intensity = .4;
			l.rim.intensity = .7;
			l.followMouse = true;
	}
	return p;
}
function pickProject(s) {
	return {
		version: 1,
		name: s.name,
		card: s.card,
		front: s.front,
		back: s.back,
		holo: s.holo,
		diffraction: s.diffraction,
		iridescence: s.iridescence,
		reflection: s.reflection,
		material: s.material,
		lighting: s.lighting,
		layers: s.layers,
		textures: s.textures,
		animation: s.animation,
		camera: s.camera,
		quality: s.quality,
		advanced: s.advanced
	};
}
function serial(p) {
	const slim = {
		...p,
		front: {
			...p.front,
			src: p.front.src ? "[img]" : null
		},
		back: {
			...p.back,
			src: p.back.src ? "[img]" : null
		},
		textures: p.textures.map((t) => ({
			...t,
			src: t.builtin ? "" : "[img]"
		}))
	};
	return JSON.stringify(slim);
}
var useStudio = create()(subscribeWithSelector((set, get) => {
	return {
		...defaultProject(),
		export: defaultExport(),
		side: "front",
		leftTab: "presets",
		rightTab: "holographic",
		exportOpen: false,
		exporting: false,
		exportProgress: 0,
		exportError: null,
		toast: null,
		fps: 0,
		webglOk: true,
		hydrated: true,
		past: [],
		future: [],
		snapshot: () => {
			const s = serial(pickProject(get()));
			set((st) => ({
				past: [...st.past.slice(-79), s],
				future: []
			}));
		},
		undo: () => {
			const { past, future } = get();
			if (!past.length) return;
			const cur = serial(pickProject(get()));
			const prev = past[past.length - 1];
			try {
				set({
					...JSON.parse(prev),
					past: past.slice(0, -1),
					future: [...future, cur]
				});
			} catch {}
		},
		redo: () => {
			const { past, future } = get();
			if (!future.length) return;
			const cur = serial(pickProject(get()));
			const next = future[future.length - 1];
			try {
				set({
					...JSON.parse(next),
					future: future.slice(0, -1),
					past: [...past, cur]
				});
			} catch {}
		},
		apply: (patch, history = true) => {
			if (history) get().snapshot();
			set(patch);
		},
		setCard: (patch) => {
			get().snapshot();
			set((s) => ({ card: {
				...s.card,
				...patch
			} }));
		},
		setArt: (side, patch) => {
			get().snapshot();
			set((s) => side === "front" ? { front: {
				...s.front,
				...patch
			} } : { back: {
				...s.back,
				...patch
			} });
		},
		setHolo: (patch) => {
			set((s) => ({ holo: {
				...s.holo,
				...patch
			} }));
		},
		setDiff: (patch) => {
			set((s) => ({ diffraction: {
				...s.diffraction,
				...patch
			} }));
		},
		setIri: (patch) => {
			set((s) => ({ iridescence: {
				...s.iridescence,
				...patch
			} }));
		},
		setRefl: (patch) => {
			set((s) => ({ reflection: {
				...s.reflection,
				...patch
			} }));
		},
		setMat: (patch) => {
			set((s) => ({ material: {
				...s.material,
				...patch
			} }));
		},
		setLight: (patch) => {
			set((s) => ({ lighting: {
				...s.lighting,
				...patch
			} }));
		},
		setAnim: (patch) => {
			set((s) => ({ animation: {
				...s.animation,
				...patch
			} }));
		},
		setCam: (patch) => {
			set((s) => ({ camera: {
				...s.camera,
				...patch
			} }));
		},
		setExport: (patch) => set((s) => ({ export: {
			...s.export,
			...patch
		} })),
		setQuality: (quality) => set({ quality }),
		setSide: (side) => set({ side }),
		setLayer: (id, patch) => {
			set((s) => ({ layers: s.layers.map((l) => l.id === id ? {
				...l,
				...patch
			} : l) }));
		},
		reorderLayers: (from, to) => {
			get().snapshot();
			set((s) => {
				const layers = s.layers.slice();
				const [item] = layers.splice(from, 1);
				if (!item) return {};
				layers.splice(to, 0, item);
				return { layers };
			});
		},
		addLayer: () => {
			get().snapshot();
			const id = `layer-${Date.now()}`;
			set((s) => ({ layers: [...s.layers, {
				id,
				name: "Custom Layer",
				kind: "custom",
				visible: true,
				locked: false,
				opacity: 1,
				blend: "mix",
				mask: "none"
			}] }));
		},
		duplicateLayer: (id) => {
			get().snapshot();
			set((s) => {
				const i = s.layers.findIndex((l) => l.id === id);
				if (i < 0) return {};
				const src = s.layers[i];
				const copy = {
					...src,
					id: `${src.id}-copy-${Date.now()}`,
					name: `${src.name} copy`
				};
				const layers = s.layers.slice();
				layers.splice(i + 1, 0, copy);
				return { layers };
			});
		},
		deleteLayer: (id) => {
			get().snapshot();
			set((s) => ({ layers: s.layers.filter((l) => l.id !== id) }));
		},
		setTexture: (id, patch) => {
			set((s) => ({ textures: s.textures.map((t) => t.id === id ? {
				...t,
				...patch
			} : t) }));
		},
		addTexture: (tex) => {
			get().snapshot();
			set((s) => ({ textures: [...s.textures, tex] }));
		},
		applyPreset: (id) => {
			get().snapshot();
			set({ ...applyMaterialPreset(pickProject(get()), id) });
		},
		applyAnim: (id) => {
			get().snapshot();
			set({ ...applyAnimPreset(pickProject(get()), id) });
		},
		applyLightPreset: (id) => {
			get().snapshot();
			set({ ...applyLightingPreset(pickProject(get()), id) });
		},
		resetSection: (section) => {
			get().snapshot();
			const d = defaultProject();
			set({ [section]: d[section] });
		},
		resetAll: () => {
			get().snapshot();
			const d = defaultProject();
			const { front, back } = get();
			set({
				...d,
				front: {
					...d.front,
					src: front.src
				},
				back: {
					...d.back,
					src: back.src
				}
			});
		},
		loadProject: (p, history = true) => {
			if (history) get().snapshot();
			set({ ...p });
		},
		asProject: () => pickProject(get()),
		setToast: (toast) => set({ toast })
	};
}));
var DB_NAME = "spectra-studio";
var STORE = "projects";
var KEY = "current";
var LS_KEY = "spectra-studio-v1";
function openDb() {
	return new Promise((resolve, reject) => {
		const req = indexedDB.open(DB_NAME, 1);
		req.onupgradeneeded = () => {
			const db = req.result;
			if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}
async function saveProject(p) {
	try {
		const db = await openDb();
		await new Promise((resolve, reject) => {
			const tx = db.transaction(STORE, "readwrite");
			tx.objectStore(STORE).put(p, KEY);
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error);
		});
		db.close();
		try {
			const slim = {
				...p,
				front: {
					...p.front,
					src: null
				},
				back: {
					...p.back,
					src: null
				}
			};
			localStorage.setItem(LS_KEY, JSON.stringify(slim));
		} catch {}
	} catch (err) {
		try {
			localStorage.setItem(LS_KEY, JSON.stringify(p));
		} catch {
			throw err instanceof Error ? err : /* @__PURE__ */ new Error("Save failed — storage is full");
		}
	}
}
async function loadProject() {
	try {
		const db = await openDb();
		const p = await new Promise((resolve, reject) => {
			const req = db.transaction(STORE, "readonly").objectStore(STORE).get(KEY);
			req.onsuccess = () => resolve(req.result ?? null);
			req.onerror = () => reject(req.error);
		});
		db.close();
		if (p && p.version === 1) return p;
	} catch {}
	try {
		const raw = localStorage.getItem(LS_KEY);
		if (!raw) return null;
		const p = JSON.parse(raw);
		if (p?.version === 1) return p;
	} catch {}
	return null;
}
function exportProjectJson(p) {
	return new Blob([JSON.stringify(p)], { type: "application/json" });
}
function parseProjectJson(text) {
	const p = JSON.parse(text);
	if (!p || p.version !== 1) throw new Error("Unrecognized project file");
	const d = defaultProject();
	return {
		...d,
		...p,
		card: {
			...d.card,
			...p.card
		},
		front: {
			...d.front,
			...p.front
		},
		back: {
			...d.back,
			...p.back
		},
		holo: {
			...d.holo,
			...p.holo
		},
		diffraction: {
			...d.diffraction,
			...p.diffraction
		},
		iridescence: {
			...d.iridescence,
			...p.iridescence
		},
		reflection: {
			...d.reflection,
			...p.reflection
		},
		material: {
			...d.material,
			...p.material
		},
		lighting: {
			...d.lighting,
			...p.lighting
		},
		animation: {
			...d.animation,
			...p.animation
		},
		camera: {
			...d.camera,
			...p.camera
		},
		layers: p.layers?.length ? p.layers : d.layers,
		textures: p.textures?.length ? p.textures : d.textures
	};
}
function downloadBlob(blob, filename) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.rel = "noopener";
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 1500);
}
function readFileAsDataUrl(file) {
	return new Promise((resolve, reject) => {
		if (!file.type.startsWith("image/") && !file.name.match(/\.(svg|png|jpe?g|webp)$/i)) {
			reject(/* @__PURE__ */ new Error("Unsupported image type. Use PNG, JPG, WEBP, or SVG."));
			return;
		}
		if (file.size > 26214400) {
			reject(/* @__PURE__ */ new Error("Image is too large (max 25 MB)."));
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			const img = new Image();
			img.crossOrigin = "anonymous";
			img.onload = () => {
				const max = 2048;
				let { width, height } = img;
				if (width > max || height > max) {
					const s = max / Math.max(width, height);
					width = Math.round(width * s);
					height = Math.round(height * s);
				}
				const c = document.createElement("canvas");
				c.width = width;
				c.height = height;
				const ctx = c.getContext("2d");
				if (!ctx) {
					reject(/* @__PURE__ */ new Error("Could not process image"));
					return;
				}
				ctx.drawImage(img, 0, 0, width, height);
				resolve(c.toDataURL("image/png"));
			};
			img.onerror = () => reject(/* @__PURE__ */ new Error("Could not decode image"));
			img.src = reader.result;
		};
		reader.onerror = () => reject(/* @__PURE__ */ new Error("Could not read file"));
		reader.readAsDataURL(file);
	});
}
function TopBar() {
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
			useStudio.setState({ toast: e instanceof Error ? e.message : "Save failed" });
		}
	};
	const onExportJson = () => {
		downloadBlob(exportProjectJson(useStudio.getState().asProject()), `${name.replace(/\s+/g, "-").toLowerCase() || "spectra"}.json`);
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
				useStudio.setState({ toast: e instanceof Error ? e.message : "Could not open project" });
			}
		};
		input.click();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex h-12 shrink-0 items-center gap-2 border-b border-border bg-panel px-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-2.5 pr-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-6 place-items-center rounded-xs bg-elevated shadow-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-accent" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 leading-tight",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[13px] font-semibold tracking-[0.18em] text-fg uppercase",
						children: "Spectra"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden text-[10px] tracking-wide text-subtle sm:block",
						children: "Holographic Card Studio"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden h-5 w-px bg-border sm:block" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex items-center gap-0.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
						label: "New project",
						onClick: () => {
							const d = defaultProject();
							const { front, back } = useStudio.getState();
							useStudio.getState().loadProject({
								...d,
								front: {
									...d.front,
									src: front.src
								},
								back: {
									...d.back,
									src: back.src
								}
							});
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-medium",
							children: "New"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
						label: "Open project JSON",
						onClick: onOpen,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "size-3.5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
						label: "Save project",
						onClick: () => void onSave(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-3.5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
						label: "Export project JSON",
						onClick: onExportJson,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
						label: "Undo",
						disabled: !past,
						onClick: () => useStudio.getState().undo(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { className: "size-3.5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
						label: "Redo",
						disabled: !future,
						onClick: () => useStudio.getState().redo(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Redo2, { className: "size-3.5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-2 hidden min-w-0 flex-1 md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: name,
					onChange: (e) => useStudio.setState({ name: e.target.value }),
					className: "h-8 w-full max-w-xs rounded-sm bg-elevated px-2.5 text-xs text-fg outline-none shadow-border",
					"aria-label": "Project name"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ml-auto flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: "",
						"aria-label": "Material presets",
						onChange: (e) => {
							const id = e.target.value;
							if (id) useStudio.getState().applyPreset(id);
							e.target.value = "";
						},
						className: "hidden h-8 rounded-sm bg-elevated px-2 text-xs text-muted shadow-border outline-none lg:block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Presets"
						}), MATERIAL_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: p.id,
							children: p.name
						}, p.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: quality,
						onChange: (e) => useStudio.getState().setQuality(e.target.value),
						className: "h-8 rounded-sm bg-elevated px-2 text-xs text-muted shadow-border outline-none",
						"aria-label": "Preview quality",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "draft",
								children: "Draft"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "high",
								children: "High"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ultra",
								children: "Ultra"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
						onClick: () => useStudio.setState({ advanced: !advanced }),
						children: advanced ? "Basic" : "Advanced"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryBtn, {
						onClick: () => useStudio.setState({ exportOpen: true }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "Export"]
					})
				]
			})
		]
	});
}
var CARD_PRESETS = [
	{
		id: "standard",
		name: "Standard (63×88)",
		w: 63,
		h: 88
	},
	{
		id: "tarot",
		name: "Tarot (70×120)",
		w: 70,
		h: 120
	},
	{
		id: "square",
		name: "Square (70×70)",
		w: 70,
		h: 70
	},
	{
		id: "mini",
		name: "Mini (41×63)",
		w: 41,
		h: 63
	},
	{
		id: "bridge",
		name: "Bridge (56×87)",
		w: 56,
		h: 87
	},
	{
		id: "poker",
		name: "Poker (63.5×88.9)",
		w: 63.5,
		h: 88.9
	},
	{
		id: "japanese",
		name: "Japanese (59×86)",
		w: 59,
		h: 86
	},
	{
		id: "oversized",
		name: "Oversized (80×120)",
		w: 80,
		h: 120
	}
];
/** Procedural collectible-card faces so the studio looks premium with no upload. */
function roundRect(ctx, x, y, w, h, r) {
	const rr = Math.min(r, w / 2, h / 2);
	ctx.beginPath();
	ctx.moveTo(x + rr, y);
	ctx.arcTo(x + w, y, x + w, y + h, rr);
	ctx.arcTo(x + w, y + h, x, y + h, rr);
	ctx.arcTo(x, y + h, x, y, rr);
	ctx.arcTo(x, y, x + w, y, rr);
	ctx.closePath();
}
function stars(ctx, w, h, n, seed) {
	for (let i = 0; i < n; i++) {
		const x = (Math.sin(seed + i * 12.9898) * 43758.5453 % 1 + 1) % 1;
		const y = (Math.sin(seed + i * 78.233) * 24634.634 % 1 + 1) % 1;
		const s = .4 + (Math.sin(seed + i * 4.1) * 1.7 % 1 + 1) % 1 * 1.4;
		ctx.fillStyle = `rgba(230,236,245,${.15 + i % 5 * .12})`;
		ctx.fillRect(x * w, y * h, s, s);
	}
}
function crystal(ctx, cx, cy, s, rot) {
	ctx.save();
	ctx.translate(cx, cy);
	ctx.rotate(rot);
	ctx.beginPath();
	const pts = 6;
	for (let i = 0; i < pts; i++) {
		const a = i / pts * Math.PI * 2 - Math.PI / 2;
		const r = i % 2 === 0 ? s : s * .52;
		const x = Math.cos(a) * r;
		const y = Math.sin(a) * r;
		if (i === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	}
	ctx.closePath();
	const g = ctx.createLinearGradient(-s, -s, s, s);
	g.addColorStop(0, "rgba(210,228,240,0.95)");
	g.addColorStop(.35, "rgba(120,170,200,0.7)");
	g.addColorStop(.7, "rgba(70,100,140,0.55)");
	g.addColorStop(1, "rgba(20,28,42,0.8)");
	ctx.fillStyle = g;
	ctx.fill();
	ctx.strokeStyle = "rgba(230,240,250,0.55)";
	ctx.lineWidth = Math.max(1, s * .03);
	ctx.stroke();
	ctx.restore();
}
function generateFrontArt(preset = "aurora", w = 1024, h = 1430) {
	const c = document.createElement("canvas");
	c.width = w;
	c.height = h;
	const ctx = c.getContext("2d");
	if (!ctx) return c;
	const [bg0, bg1, mid, accent, ink] = {
		aurora: [
			"#07090e",
			"#101828",
			"#1c3348",
			"#8eb4c8",
			"#e8f2f8"
		],
		void: [
			"#050508",
			"#12101a",
			"#2a2438",
			"#a89bb8",
			"#efeaf6"
		],
		ember: [
			"#0c0806",
			"#1a100c",
			"#3a2218",
			"#c4a090",
			"#f3e6dc"
		],
		tide: [
			"#050b0e",
			"#0c1c22",
			"#16343c",
			"#7fb0b8",
			"#dff0f2"
		],
		geometry: [
			"#09090b",
			"#16161c",
			"#2a2a32",
			"#c9d0da",
			"#f4f4f5"
		]
	}[preset];
	const bg = ctx.createLinearGradient(0, 0, 0, h);
	bg.addColorStop(0, bg1);
	bg.addColorStop(.45, bg0);
	bg.addColorStop(1, "#050506");
	ctx.fillStyle = bg;
	ctx.fillRect(0, 0, w, h);
	const vg = ctx.createRadialGradient(w * .5, h * .38, 20, w * .5, h * .4, h * .7);
	vg.addColorStop(0, mid + "88");
	vg.addColorStop(1, "transparent");
	ctx.fillStyle = vg;
	ctx.fillRect(0, 0, w, h);
	stars(ctx, w, h, 180, preset.length * 9.1);
	ctx.save();
	ctx.strokeStyle = accent + "55";
	ctx.lineWidth = 10;
	roundRect(ctx, 36, 36, w - 72, h - 72, 28);
	ctx.stroke();
	ctx.strokeStyle = ink + "22";
	ctx.lineWidth = 2;
	roundRect(ctx, 52, 52, w - 104, h - 104, 22);
	ctx.stroke();
	ctx.restore();
	const ax = 80;
	const ay = 150;
	const aw = w - 160;
	const ah = h * .52;
	ctx.save();
	roundRect(ctx, ax, ay, aw, ah, 16);
	ctx.clip();
	const win = ctx.createLinearGradient(ax, ay, ax + aw, ay + ah);
	win.addColorStop(0, mid);
	win.addColorStop(1, bg0);
	ctx.fillStyle = win;
	ctx.fillRect(ax, ay, aw, ah);
	for (let i = 0; i < 7; i++) {
		ctx.globalAlpha = .08;
		ctx.fillStyle = accent;
		ctx.beginPath();
		const y = ay + ah * (.15 + i * .12);
		ctx.ellipse(w * .5, y, aw * .55, 28 + i * 6, -.2 + i * .05, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.globalAlpha = 1;
	const cx = w * .5;
	const cy = ay + ah * .52;
	crystal(ctx, cx, cy, Math.min(aw, ah) * .28, 0);
	crystal(ctx, cx, cy, Math.min(aw, ah) * .16, Math.PI / 6);
	crystal(ctx, cx - 90, cy + 40, 48, .4);
	crystal(ctx, cx + 96, cy - 30, 40, -.5);
	crystal(ctx, cx + 20, cy - 110, 32, .2);
	ctx.beginPath();
	ctx.arc(cx, cy, Math.min(aw, ah) * .34, 0, Math.PI * 2);
	ctx.strokeStyle = accent + "66";
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.restore();
	const [title, sub] = {
		aurora: ["AURORA", "PRISMATIC GUARDIAN"],
		void: ["NYX", "UMBRAL SENTINEL"],
		ember: ["SOLARIS", "CINDER SOVEREIGN"],
		tide: ["AEGIR", "TIDAL ORACLE"],
		geometry: ["MONOLITH", "EUCLIDEAN RELIC"]
	}[preset];
	ctx.fillStyle = bg0 + "ee";
	roundRect(ctx, 80, ay + ah + 18, w - 160, 118, 10);
	ctx.fill();
	ctx.strokeStyle = accent + "44";
	ctx.lineWidth = 1.5;
	roundRect(ctx, 80, ay + ah + 18, w - 160, 118, 10);
	ctx.stroke();
	ctx.fillStyle = ink;
	ctx.font = "600 54px 'Outfit', 'Segoe UI', sans-serif";
	ctx.textAlign = "center";
	ctx.fillText(title, w / 2, ay + ah + 72);
	ctx.fillStyle = accent;
	ctx.font = "500 18px 'Outfit', 'Segoe UI', sans-serif";
	ctx.letterSpacing = "0.28em";
	ctx.fillText(sub, w / 2, ay + ah + 104);
	ctx.letterSpacing = "0";
	const statsY = ay + ah + 160;
	[
		["LUM", "120"],
		["PRISM", "A"],
		["SET", "01"]
	].forEach((st, i) => {
		const x = 80 + i * ((w - 160) / 3);
		const sw = (w - 160) / 3 - 12;
		ctx.fillStyle = bg1;
		roundRect(ctx, x, statsY, sw, 72, 8);
		ctx.fill();
		ctx.fillStyle = accent + "99";
		ctx.font = "500 12px 'Outfit', 'Segoe UI', sans-serif";
		ctx.textAlign = "center";
		ctx.fillText(st[0], x + sw / 2, statsY + 24);
		ctx.fillStyle = ink;
		ctx.font = "600 26px 'Outfit', 'Segoe UI', sans-serif";
		ctx.fillText(st[1], x + sw / 2, statsY + 54);
	});
	ctx.fillStyle = accent + "99";
	ctx.font = "400 15px 'Outfit', 'Segoe UI', sans-serif";
	ctx.textAlign = "center";
	ctx.fillText({
		aurora: "Light folds through her like a blade through silk.",
		void: "She keeps the dark from remembering its name.",
		ember: "Every orbit ends in gold and ash.",
		tide: "The sea writes its laws on her skin.",
		geometry: "A theorem given mass and hunger."
	}[preset], w / 2, h - 88);
	ctx.fillStyle = ink + "55";
	ctx.font = "500 11px 'Outfit', 'Segoe UI', sans-serif";
	ctx.fillText("SPECTRA  ·  HOLOGRAPHIC SERIES  ·  001", w / 2, h - 58);
	return c;
}
function generateBackArt(w = 1024, h = 1430) {
	const c = document.createElement("canvas");
	c.width = w;
	c.height = h;
	const ctx = c.getContext("2d");
	if (!ctx) return c;
	const bg = ctx.createLinearGradient(0, 0, w, h);
	bg.addColorStop(0, "#0c0c10");
	bg.addColorStop(1, "#16161c");
	ctx.fillStyle = bg;
	ctx.fillRect(0, 0, w, h);
	ctx.save();
	ctx.translate(w / 2, h / 2);
	ctx.strokeStyle = "rgba(201,208,218,0.12)";
	for (let i = 0; i < 18; i++) {
		ctx.beginPath();
		ctx.arc(0, 0, 40 + i * 28, 0, Math.PI * 2);
		ctx.lineWidth = i % 3 === 0 ? 1.4 : .6;
		ctx.stroke();
	}
	for (let i = 0; i < 16; i++) {
		const a = i / 16 * Math.PI * 2;
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(Math.cos(a) * 520, Math.sin(a) * 520);
		ctx.stroke();
	}
	ctx.restore();
	ctx.strokeStyle = "rgba(201,208,218,0.28)";
	ctx.lineWidth = 8;
	roundRect(ctx, 40, 40, w - 80, h - 80, 26);
	ctx.stroke();
	ctx.lineWidth = 2;
	roundRect(ctx, 62, 62, w - 124, h - 124, 20);
	ctx.stroke();
	crystal(ctx, w / 2, h / 2 - 40, 90, 0);
	ctx.fillStyle = "#e8eef4";
	ctx.font = "600 42px 'Outfit', 'Segoe UI', sans-serif";
	ctx.textAlign = "center";
	ctx.fillText("SPECTRA", w / 2, h / 2 + 120);
	ctx.fillStyle = "rgba(201,208,218,0.7)";
	ctx.font = "500 14px 'Outfit', 'Segoe UI', sans-serif";
	ctx.fillText("HOLOGRAPHIC CARD STUDIO", w / 2, h / 2 + 150);
	return c;
}
var TABS$1 = [
	{
		id: "presets",
		name: "Presets"
	},
	{
		id: "card",
		name: "Card"
	},
	{
		id: "assets",
		name: "Assets"
	},
	{
		id: "layers",
		name: "Layers"
	},
	{
		id: "textures",
		name: "Textures"
	}
];
var ART_PRESETS = [
	{
		id: "aurora",
		name: "Aurora"
	},
	{
		id: "void",
		name: "Nyx"
	},
	{
		id: "ember",
		name: "Solaris"
	},
	{
		id: "tide",
		name: "Aegir"
	},
	{
		id: "geometry",
		name: "Monolith"
	}
];
function LeftPanel() {
	const tab = useStudio((s) => s.leftTab);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "flex h-full w-72 shrink-0 flex-col border-r border-border bg-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-0.5 overflow-x-auto border-b border-border px-1.5 py-1.5",
			children: TABS$1.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => useStudio.setState({ leftTab: t.id }),
				className: cn("h-7 shrink-0 rounded-sm px-2 text-[11px] tracking-wide", tab === t.id ? "bg-elevated text-fg" : "text-muted hover:text-fg"),
				children: t.name
			}, t.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "studio-scroll min-h-0 flex-1 overflow-y-auto",
			children: [
				tab === "presets" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PresetsTab, {}),
				tab === "card" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTab, {}),
				tab === "assets" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetsTab, {}),
				tab === "layers" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayersTab, {}),
				tab === "textures" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TexturesTab, {})
			]
		})]
	});
}
function PresetsTab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		title: "Foil library",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-1",
			children: MATERIAL_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => useStudio.getState().applyPreset(p.id),
				className: "rounded-sm px-2 py-2 text-left hover:bg-elevated",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-medium text-fg",
					children: p.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] text-subtle",
					children: p.blurb
				})]
			}, p.id))
		})
	});
}
function CardTab() {
	const card = useStudio((s) => s.card);
	const setCard = useStudio((s) => s.setCard);
	const snap = useStudio((s) => s.snapshot);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		title: "Format",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectRow, {
				label: "Preset",
				value: `${card.widthMm}x${card.heightMm}`,
				options: CARD_PRESETS.map((p) => ({
					id: `${p.w}x${p.h}`,
					name: p.name
				})),
				onChange: (v) => {
					const [w, h] = v.split("x").map(Number);
					setCard({
						widthMm: w ?? 63,
						heightMm: h ?? 88
					});
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Width (mm)",
				value: card.widthMm,
				min: 40,
				max: 90,
				step: .5,
				onChange: (v) => useStudio.setState((s) => ({ card: {
					...s.card,
					widthMm: v
				} })),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Height (mm)",
				value: card.heightMm,
				min: 50,
				max: 130,
				step: .5,
				onChange: (v) => useStudio.setState((s) => ({ card: {
					...s.card,
					heightMm: v
				} })),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Corner radius",
				value: card.cornerRadius,
				min: 0,
				max: .12,
				step: .001,
				onChange: (v) => useStudio.setState((s) => ({ card: {
					...s.card,
					cornerRadius: v
				} })),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Border thickness",
				value: card.borderThickness,
				min: 0,
				max: .1,
				step: .001,
				onChange: (v) => useStudio.setState((s) => ({ card: {
					...s.card,
					borderThickness: v
				} })),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Depth",
				value: card.depth,
				min: .008,
				max: .08,
				step: .001,
				onChange: (v) => useStudio.setState((s) => ({ card: {
					...s.card,
					depth: v
				} })),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectRow, {
				label: "Border style",
				value: card.borderStyle,
				options: [
					{
						id: "foil",
						name: "Foil"
					},
					{
						id: "metallic",
						name: "Metallic"
					},
					{
						id: "matte",
						name: "Matte"
					},
					{
						id: "inset",
						name: "Inset"
					},
					{
						id: "ornate",
						name: "Ornate"
					}
				],
				onChange: (v) => setCard({ borderStyle: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorRow, {
				label: "Background",
				value: card.background,
				onChange: (v) => setCard({ background: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorRow, {
				label: "Edge",
				value: card.edgeColor,
				onChange: (v) => setCard({ edgeColor: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Edge metal",
				value: card.edgeMetal,
				min: 0,
				max: 1,
				onChange: (v) => useStudio.setState((s) => ({ card: {
					...s.card,
					edgeMetal: v
				} })),
				onCommit: snap
			})
		]
	}) });
}
function AssetsTab() {
	const side = useStudio((s) => s.side);
	const art = useStudio((s) => s.side === "front" ? s.front : s.back);
	const setArt = useStudio((s) => s.setArt);
	const snap = useStudio((s) => s.snapshot);
	const upload = (which) => {
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
				useStudio.setState({ toast: e instanceof Error ? e.message : "Could not load image" });
			}
		};
		input.click();
	};
	const applyBuiltIn = (id) => {
		const c = generateFrontArt(id);
		useStudio.getState().setArt("front", { src: c.toDataURL("image/png") });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		title: "Artwork",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
					onClick: () => upload("front"),
					children: "Load front"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
					onClick: () => upload("back"),
					children: "Load back"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-subtle",
				children: "PNG, JPG, WEBP, SVG. Images stay on this device."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-1",
				children: ART_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => applyBuiltIn(p.id),
					className: "h-8 rounded-sm bg-elevated text-[11px] text-muted hover:text-fg",
					children: p.name
				}, p.id))
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		title: `${side === "front" ? "Front" : "Back"} transform`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Position X",
				value: art.posX,
				min: -.5,
				max: .5,
				onChange: (v) => useStudio.setState((s) => ({ [side]: {
					...side === "front" ? s.front : s.back,
					posX: v
				} })),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Position Y",
				value: art.posY,
				min: -.5,
				max: .5,
				onChange: (v) => useStudio.setState((s) => ({ [side]: {
					...side === "front" ? s.front : s.back,
					posY: v
				} })),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Scale",
				value: art.scale,
				min: .2,
				max: 3,
				onChange: (v) => useStudio.setState((s) => ({ [side]: {
					...side === "front" ? s.front : s.back,
					scale: v
				} })),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Rotation",
				value: art.rotation,
				min: -Math.PI,
				max: Math.PI,
				onChange: (v) => useStudio.setState((s) => ({ [side]: {
					...side === "front" ? s.front : s.back,
					rotation: v
				} })),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectRow, {
				label: "Fit",
				value: art.fit,
				options: [
					{
						id: "fill",
						name: "Fill"
					},
					{
						id: "fit",
						name: "Fit"
					},
					{
						id: "crop",
						name: "Crop"
					}
				],
				onChange: (v) => setArt(side, { fit: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Opacity",
				value: art.opacity,
				min: 0,
				max: 1,
				onChange: (v) => useStudio.setState((s) => ({ [side]: {
					...side === "front" ? s.front : s.back,
					opacity: v
				} })),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Brightness",
				value: art.brightness,
				min: .2,
				max: 2,
				onChange: (v) => useStudio.setState((s) => ({ [side]: {
					...side === "front" ? s.front : s.back,
					brightness: v
				} })),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Contrast",
				value: art.contrast,
				min: .2,
				max: 2,
				onChange: (v) => useStudio.setState((s) => ({ [side]: {
					...side === "front" ? s.front : s.back,
					contrast: v
				} })),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Saturation",
				value: art.saturation,
				min: 0,
				max: 2,
				onChange: (v) => useStudio.setState((s) => ({ [side]: {
					...side === "front" ? s.front : s.back,
					saturation: v
				} })),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Hue",
				value: art.hue,
				min: -1,
				max: 1,
				onChange: (v) => useStudio.setState((s) => ({ [side]: {
					...side === "front" ? s.front : s.back,
					hue: v
				} })),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Gamma",
				value: art.gamma,
				min: .4,
				max: 2.2,
				onChange: (v) => useStudio.setState((s) => ({ [side]: {
					...side === "front" ? s.front : s.back,
					gamma: v
				} })),
				onCommit: snap
			})
		]
	})] });
}
function LayersTab() {
	const layers = useStudio((s) => s.layers);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		title: "Stack",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostBtn, {
			onClick: () => useStudio.getState().addLayer(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" }), " Add layer"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-0.5",
			children: layers.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-1 rounded-sm bg-elevated/60 px-1.5 py-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3 text-subtle" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-0 flex-1 truncate text-[11px] text-fg",
						children: l.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": l.visible ? "Hide" : "Show",
						onClick: () => useStudio.getState().setLayer(l.id, { visible: !l.visible }),
						className: "p-1 text-muted hover:text-fg",
						children: l.visible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-3" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": l.locked ? "Unlock" : "Lock",
						onClick: () => useStudio.getState().setLayer(l.id, { locked: !l.locked }),
						className: "p-1 text-muted hover:text-fg",
						children: l.locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "size-3" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Duplicate",
						onClick: () => useStudio.getState().duplicateLayer(l.id),
						className: "p-1 text-muted hover:text-fg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Delete",
						onClick: () => useStudio.getState().deleteLayer(l.id),
						className: "p-1 text-muted hover:text-danger",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 0,
						max: 1,
						step: .01,
						value: l.opacity,
						"aria-label": `${l.name} opacity`,
						onChange: (e) => useStudio.getState().setLayer(l.id, { opacity: Number(e.target.value) }),
						className: "w-12"
					}),
					i > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-[10px] text-subtle",
						onClick: () => useStudio.getState().reorderLayers(i, i - 1),
						children: "Up"
					}) : null
				]
			}, l.id))
		})]
	});
}
function TexturesTab() {
	const textures = useStudio((s) => s.textures);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		title: "Surface maps",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-subtle",
				children: "Built-in grain, scratches, foil and masks. Toggle to mix into the foil engine."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-1.5",
				children: textures.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => useStudio.getState().setTexture(t.id, { enabled: !t.enabled }),
					className: cn("rounded-sm px-2 py-2 text-left shadow-border", t.enabled ? "bg-elevated text-fg" : "text-muted"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] font-medium",
						children: t.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] text-subtle",
						children: t.kind
					})]
				}, t.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
				onClick: () => {
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
								enabled: true
							});
						} catch (e) {
							useStudio.setState({ toast: e instanceof Error ? e.message : "Texture load failed" });
						}
					};
					input.click();
				},
				children: "Import texture"
			})
		]
	});
}
var TABS = [
	{
		id: "holographic",
		name: "Holo"
	},
	{
		id: "diffraction",
		name: "Grat."
	},
	{
		id: "iridescence",
		name: "Iri."
	},
	{
		id: "reflection",
		name: "Refl."
	},
	{
		id: "material",
		name: "Mat."
	},
	{
		id: "lighting",
		name: "Light"
	},
	{
		id: "effects",
		name: "FX"
	},
	{
		id: "animation",
		name: "Anim"
	}
];
var HOLO_PATTERNS = [
	{
		id: "linear",
		name: "Linear"
	},
	{
		id: "radial",
		name: "Radial"
	},
	{
		id: "circular",
		name: "Circular"
	},
	{
		id: "diamond",
		name: "Diamond"
	},
	{
		id: "grid",
		name: "Grid"
	},
	{
		id: "crosshatch",
		name: "Crosshatch"
	},
	{
		id: "microlines",
		name: "Micro-lines"
	},
	{
		id: "prism",
		name: "Prism"
	},
	{
		id: "shattered",
		name: "Shattered"
	},
	{
		id: "starburst",
		name: "Starburst"
	},
	{
		id: "spectrum",
		name: "Spectrum"
	},
	{
		id: "galaxy",
		name: "Galaxy"
	},
	{
		id: "aurora",
		name: "Aurora"
	},
	{
		id: "kaleidoscope",
		name: "Kaleidoscope"
	}
];
var GRAT_PATTERNS = [
	{
		id: "lines",
		name: "Lines"
	},
	{
		id: "cross",
		name: "Cross"
	},
	{
		id: "radial",
		name: "Radial"
	},
	{
		id: "concentric",
		name: "Concentric"
	},
	{
		id: "hex",
		name: "Hex"
	},
	{
		id: "dots",
		name: "Dots"
	},
	{
		id: "wave",
		name: "Wave"
	},
	{
		id: "chevron",
		name: "Chevron"
	}
];
var BLENDS = [
	{
		id: "mix",
		name: "Mix"
	},
	{
		id: "add",
		name: "Add"
	},
	{
		id: "screen",
		name: "Screen"
	},
	{
		id: "overlay",
		name: "Overlay"
	},
	{
		id: "multiply",
		name: "Multiply"
	},
	{
		id: "softlight",
		name: "Soft light"
	},
	{
		id: "color",
		name: "Color"
	}
];
var MASKS = [
	{
		id: "full",
		name: "Full card"
	},
	{
		id: "center",
		name: "Center"
	},
	{
		id: "border",
		name: "Border"
	},
	{
		id: "character",
		name: "Character"
	},
	{
		id: "reverse",
		name: "Reverse holo"
	},
	{
		id: "gradient",
		name: "Gradient"
	},
	{
		id: "luminance",
		name: "Luminance"
	},
	{
		id: "image",
		name: "Image mask"
	}
];
function RightPanel() {
	const tab = useStudio((s) => s.rightTab);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "flex h-full w-80 shrink-0 flex-col border-l border-border bg-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-0.5 border-b border-border px-1.5 py-1.5",
			children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => useStudio.setState({ rightTab: t.id }),
				className: cn("h-7 rounded-sm px-2 text-[11px]", tab === t.id ? "bg-elevated text-fg" : "text-muted hover:text-fg"),
				children: t.name
			}, t.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "studio-scroll min-h-0 flex-1 overflow-y-auto",
			children: [
				tab === "holographic" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloTab, {}),
				tab === "diffraction" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiffTab, {}),
				tab === "iridescence" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IriTab, {}),
				tab === "reflection" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReflTab, {}),
				tab === "material" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatTab, {}),
				tab === "lighting" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LightTab, {}),
				tab === "effects" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FxTab, {}),
				tab === "animation" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimTab, {})
			]
		})]
	});
}
function HoloTab() {
	const h = useStudio((s) => s.holo);
	const adv = useStudio((s) => s.advanced);
	const snap = useStudio((s) => s.snapshot);
	const patch = (p) => useStudio.setState((s) => ({ holo: {
		...s.holo,
		...p
	} }));
	const set = (k, v) => patch({ [k]: v });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		title: "Holographic foil",
		onReset: () => useStudio.getState().resetSection("holo"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectRow, {
				label: "Pattern",
				value: h.pattern,
				options: HOLO_PATTERNS,
				onChange: (v) => useStudio.getState().setHolo({ pattern: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectRow, {
				label: "Mask",
				value: h.mask,
				options: MASKS,
				onChange: (v) => useStudio.getState().setHolo({ mask: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectRow, {
				label: "Blend",
				value: h.blend,
				options: BLENDS,
				onChange: (v) => useStudio.getState().setHolo({ blend: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Intensity",
				value: h.intensity,
				min: 0,
				max: 1.5,
				onChange: (v) => set("intensity", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Opacity",
				value: h.opacity,
				min: 0,
				max: 1,
				onChange: (v) => set("opacity", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Rainbow",
				value: h.rainbowStrength,
				min: 0,
				max: 1.5,
				onChange: (v) => set("rainbowStrength", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Dispersion",
				value: h.spectralDispersion,
				min: 0,
				max: 2,
				onChange: (v) => set("spectralDispersion", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Frequency",
				value: h.frequency,
				min: .5,
				max: 24,
				step: .1,
				onChange: (v) => set("frequency", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "View response",
				value: h.viewResponse,
				min: 0,
				max: 2,
				onChange: (v) => set("viewResponse", v),
				onCommit: snap
			}),
			adv ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Hue shift",
					value: h.hueShift,
					min: 0,
					max: 1,
					onChange: (v) => set("hueShift", v),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Saturation",
					value: h.saturation,
					min: 0,
					max: 2,
					onChange: (v) => set("saturation", v),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Contrast",
					value: h.contrast,
					min: .2,
					max: 2,
					onChange: (v) => set("contrast", v),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Scale",
					value: h.scale,
					min: .2,
					max: 3,
					onChange: (v) => set("scale", v),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Direction",
					value: h.direction,
					min: -3.14,
					max: 3.14,
					onChange: (v) => set("direction", v),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Rotation",
					value: h.rotation,
					min: -3.14,
					max: 3.14,
					onChange: (v) => set("rotation", v),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Distortion",
					value: h.distortion,
					min: 0,
					max: 1.5,
					onChange: (v) => set("distortion", v),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Noise",
					value: h.noise,
					min: 0,
					max: 1,
					onChange: (v) => set("noise", v),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Turbulence",
					value: h.turbulence,
					min: 0,
					max: 1.5,
					onChange: (v) => set("turbulence", v),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Sharpness",
					value: h.sharpness,
					min: 0,
					max: 1,
					onChange: (v) => set("sharpness", v),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Animation",
					value: h.animation,
					min: 0,
					max: 2,
					onChange: (v) => set("animation", v),
					onCommit: snap
				})
			] }) : null
		]
	});
}
function DiffTab() {
	const d = useStudio((s) => s.diffraction);
	const adv = useStudio((s) => s.advanced);
	const snap = useStudio((s) => s.snapshot);
	const set = (k, v) => useStudio.setState((s) => ({ diffraction: {
		...s.diffraction,
		[k]: v
	} }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		title: "Diffraction grating",
		onReset: () => useStudio.getState().resetSection("diffraction"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectRow, {
				label: "Pattern",
				value: d.pattern,
				options: GRAT_PATTERNS,
				onChange: (v) => useStudio.getState().setDiff({ pattern: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Frequency",
				value: d.frequency,
				min: 1,
				max: 48,
				step: .1,
				onChange: (v) => set("frequency", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Density",
				value: d.density,
				min: .2,
				max: 3,
				onChange: (v) => set("density", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Rainbow",
				value: d.rainbowIntensity,
				min: 0,
				max: 1.5,
				onChange: (v) => set("rainbowIntensity", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Opacity",
				value: d.opacity,
				min: 0,
				max: 1,
				onChange: (v) => set("opacity", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Angle",
				value: d.angle,
				min: -3.14,
				max: 3.14,
				onChange: (v) => set("angle", v),
				onCommit: snap
			}),
			adv ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Scale",
					value: d.scale,
					min: .2,
					max: 3,
					onChange: (v) => set("scale", v),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Dispersion",
					value: d.spectralDispersion,
					min: 0,
					max: 2,
					onChange: (v) => set("spectralDispersion", v),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Wavelength spread",
					value: d.wavelengthSpread,
					min: .2,
					max: 2,
					onChange: (v) => set("wavelengthSpread", v),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Hue offset",
					value: d.hueOffset,
					min: 0,
					max: 1,
					onChange: (v) => set("hueOffset", v),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Contrast",
					value: d.contrast,
					min: .2,
					max: 2,
					onChange: (v) => set("contrast", v),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Sharpness",
					value: d.sharpness,
					min: 0,
					max: 1,
					onChange: (v) => set("sharpness", v),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Distortion",
					value: d.distortion,
					min: 0,
					max: 1,
					onChange: (v) => set("distortion", v),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Perspective",
					value: d.perspective,
					min: 0,
					max: 2,
					onChange: (v) => set("perspective", v),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Falloff",
					value: d.falloff,
					min: 0,
					max: 1,
					onChange: (v) => set("falloff", v),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Light interaction",
					value: d.lightInteraction,
					min: 0,
					max: 1,
					onChange: (v) => set("lightInteraction", v),
					onCommit: snap
				})
			] }) : null
		]
	});
}
function IriTab() {
	const i = useStudio((s) => s.iridescence);
	const snap = useStudio((s) => s.snapshot);
	const set = (k, v) => useStudio.setState((s) => ({ iridescence: {
		...s.iridescence,
		[k]: v
	} }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		title: "Iridescence",
		onReset: () => useStudio.getState().resetSection("iridescence"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Intensity",
				value: i.intensity,
				min: 0,
				max: 1.5,
				onChange: (v) => set("intensity", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "View sensitivity",
				value: i.viewSensitivity,
				min: 0,
				max: 1.5,
				onChange: (v) => set("viewSensitivity", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Hue range",
				value: i.hueRange,
				min: 0,
				max: 1,
				onChange: (v) => set("hueRange", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Color spread",
				value: i.colorSpread,
				min: 0,
				max: 2,
				onChange: (v) => set("colorSpread", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Saturation",
				value: i.saturation,
				min: 0,
				max: 2,
				onChange: (v) => set("saturation", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Fresnel",
				value: i.fresnel,
				min: 0,
				max: 1,
				onChange: (v) => set("fresnel", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Specular",
				value: i.specular,
				min: 0,
				max: 1.5,
				onChange: (v) => set("specular", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Clearcoat",
				value: i.clearcoat,
				min: 0,
				max: 1,
				onChange: (v) => set("clearcoat", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Clearcoat roughness",
				value: i.clearcoatRoughness,
				min: 0,
				max: 1,
				onChange: (v) => set("clearcoatRoughness", v),
				onCommit: snap
			})
		]
	});
}
function ReflTab() {
	const r = useStudio((s) => s.reflection);
	const snap = useStudio((s) => s.snapshot);
	const set = (k, v) => useStudio.setState((s) => ({ reflection: {
		...s.reflection,
		[k]: v
	} }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		title: "Reflection cloning",
		onReset: () => useStudio.getState().resetSection("reflection"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Clones",
				value: r.cloneCount,
				min: 0,
				max: 8,
				step: 1,
				onChange: (v) => set("cloneCount", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Spacing",
				value: r.cloneSpacing,
				min: 0,
				max: 1.5,
				onChange: (v) => set("cloneSpacing", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Scale",
				value: r.cloneScale,
				min: .2,
				max: 2,
				onChange: (v) => set("cloneScale", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Opacity",
				value: r.cloneOpacity,
				min: 0,
				max: 1,
				onChange: (v) => set("cloneOpacity", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Kaleido segments",
				value: r.kaleidoSegments,
				min: 2,
				max: 16,
				step: 1,
				onChange: (v) => set("kaleidoSegments", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
				label: "Kaleidoscope",
				checked: r.kaleidoscope,
				onChange: (v) => useStudio.getState().setRefl({ kaleidoscope: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
				label: "Horizontal mirror",
				checked: r.horizontalMirror,
				onChange: (v) => useStudio.getState().setRefl({ horizontalMirror: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
				label: "Vertical mirror",
				checked: r.verticalMirror,
				onChange: (v) => useStudio.getState().setRefl({ verticalMirror: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
				label: "Radial",
				checked: r.radialReflection,
				onChange: (v) => useStudio.getState().setRefl({ radialReflection: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Falloff",
				value: r.falloff,
				min: 0,
				max: 1.5,
				onChange: (v) => set("falloff", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Distortion",
				value: r.reflectionDistortion,
				min: 0,
				max: 1,
				onChange: (v) => set("reflectionDistortion", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectRow, {
				label: "Blend",
				value: r.blend,
				options: BLENDS,
				onChange: (v) => useStudio.getState().setRefl({ blend: v })
			})
		]
	});
}
function MatTab() {
	const m = useStudio((s) => s.material);
	const snap = useStudio((s) => s.snapshot);
	const set = (k, v) => useStudio.setState((s) => ({ material: {
		...s.material,
		[k]: v
	} }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		title: "Physical material",
		onReset: () => useStudio.getState().resetSection("material"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Metallic",
				value: m.metallic,
				min: 0,
				max: 1,
				onChange: (v) => set("metallic", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Roughness",
				value: m.roughness,
				min: 0,
				max: 1,
				onChange: (v) => set("roughness", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Gloss",
				value: m.gloss,
				min: 0,
				max: 1,
				onChange: (v) => set("gloss", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Specular",
				value: m.specular,
				min: 0,
				max: 1.5,
				onChange: (v) => set("specular", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Fresnel",
				value: m.fresnel,
				min: 0,
				max: 1,
				onChange: (v) => set("fresnel", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Clearcoat",
				value: m.clearcoat,
				min: 0,
				max: 1,
				onChange: (v) => set("clearcoat", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Reflection",
				value: m.reflection,
				min: 0,
				max: 1,
				onChange: (v) => set("reflection", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Grain",
				value: m.grain,
				min: 0,
				max: 1,
				onChange: (v) => set("grain", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Bump",
				value: m.bumpStrength,
				min: 0,
				max: 1,
				onChange: (v) => set("bumpStrength", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Scratches",
				value: m.scratches,
				min: 0,
				max: 1,
				onChange: (v) => set("scratches", v),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Micro scratches",
				value: m.microScratches,
				min: 0,
				max: 1,
				onChange: (v) => set("microScratches", v),
				onCommit: snap
			})
		]
	});
}
function LightTab() {
	const l = useStudio((s) => s.lighting);
	const snap = useStudio((s) => s.snapshot);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			title: "Studio presets",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-1",
				children: LIGHTING_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => useStudio.getState().applyLightPreset(p.id),
					className: "h-8 rounded-sm bg-elevated text-[11px] text-muted hover:text-fg",
					children: p.name
				}, p.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
				label: "Light follows pointer",
				checked: l.followMouse,
				onChange: (v) => useStudio.getState().setLight({ followMouse: v })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			title: "Key light",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					label: "Enabled",
					checked: l.key.enabled,
					onChange: (v) => useStudio.setState((s) => ({ lighting: {
						...s.lighting,
						key: {
							...s.lighting.key,
							enabled: v
						}
					} }))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Azimuth",
					value: l.key.azimuth,
					min: -3.14,
					max: 3.14,
					onChange: (v) => useStudio.setState((s) => ({ lighting: {
						...s.lighting,
						key: {
							...s.lighting.key,
							azimuth: v
						}
					} })),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Elevation",
					value: l.key.elevation,
					min: -.2,
					max: 1.5,
					onChange: (v) => useStudio.setState((s) => ({ lighting: {
						...s.lighting,
						key: {
							...s.lighting.key,
							elevation: v
						}
					} })),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Intensity",
					value: l.key.intensity,
					min: 0,
					max: 2,
					onChange: (v) => useStudio.setState((s) => ({ lighting: {
						...s.lighting,
						key: {
							...s.lighting.key,
							intensity: v
						}
					} })),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Softness",
					value: l.key.softness,
					min: 0,
					max: 1,
					onChange: (v) => useStudio.setState((s) => ({ lighting: {
						...s.lighting,
						key: {
							...s.lighting.key,
							softness: v
						}
					} })),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorRow, {
					label: "Color",
					value: l.key.color,
					onChange: (v) => useStudio.setState((s) => ({ lighting: {
						...s.lighting,
						key: {
							...s.lighting.key,
							color: v
						}
					} }))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			title: "Fill / rim / ambient",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Fill intensity",
					value: l.fill.intensity,
					min: 0,
					max: 1.5,
					onChange: (v) => useStudio.setState((s) => ({ lighting: {
						...s.lighting,
						fill: {
							...s.lighting.fill,
							intensity: v
						}
					} })),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Rim intensity",
					value: l.rim.intensity,
					min: 0,
					max: 1.5,
					onChange: (v) => useStudio.setState((s) => ({ lighting: {
						...s.lighting,
						rim: {
							...s.lighting.rim,
							intensity: v
						}
					} })),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Ambient",
					value: l.ambientIntensity,
					min: 0,
					max: 1,
					onChange: (v) => useStudio.setState((s) => ({ lighting: {
						...s.lighting,
						ambientIntensity: v
					} })),
					onCommit: snap
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorRow, {
					label: "Ambient color",
					value: l.ambientColor,
					onChange: (v) => useStudio.getState().setLight({ ambientColor: v })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
					label: "Shadow",
					value: l.shadowStrength,
					min: 0,
					max: 1,
					onChange: (v) => useStudio.setState((s) => ({ lighting: {
						...s.lighting,
						shadowStrength: v
					} })),
					onCommit: snap
				})
			]
		})
	] });
}
function FxTab() {
	const cam = useStudio((s) => s.camera);
	const snap = useStudio((s) => s.snapshot);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		title: "Camera",
		onReset: () => useStudio.getState().resetSection("camera"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Distance",
				value: cam.distance,
				min: 1.2,
				max: 5,
				onChange: (v) => useStudio.setState((s) => ({ camera: {
					...s.camera,
					distance: v
				} })),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Field of view",
				value: cam.fov,
				min: 18,
				max: 55,
				step: .5,
				onChange: (v) => useStudio.setState((s) => ({ camera: {
					...s.camera,
					fov: v
				} })),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Zoom",
				value: cam.zoom,
				min: .45,
				max: 2.4,
				onChange: (v) => useStudio.setState((s) => ({ camera: {
					...s.camera,
					zoom: v
				} })),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Roll",
				value: cam.rotZ,
				min: -.4,
				max: .4,
				onChange: (v) => useStudio.setState((s) => ({ camera: {
					...s.camera,
					rotZ: v
				} })),
				onCommit: snap
			})
		]
	});
}
function AnimTab() {
	const a = useStudio((s) => s.animation);
	const snap = useStudio((s) => s.snapshot);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		title: "Showcase",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-1",
			children: ANIM_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => useStudio.getState().applyAnim(p.id),
				className: cn("rounded-sm px-2 py-2 text-left", a.preset === p.id ? "bg-elevated" : "hover:bg-elevated/60"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-fg",
					children: p.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] text-subtle",
					children: p.blurb
				})]
			}, p.id))
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		title: "Timeline",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
				label: "Playing",
				checked: a.playing,
				onChange: (v) => useStudio.getState().setAnim({ playing: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
				label: "Loop",
				checked: a.loop,
				onChange: (v) => useStudio.getState().setAnim({ loop: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
				label: "Auto-rotate",
				checked: a.autoRotate,
				onChange: (v) => useStudio.getState().setAnim({ autoRotate: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Duration (s)",
				value: a.duration,
				min: 1,
				max: 16,
				step: .1,
				onChange: (v) => useStudio.setState((s) => ({ animation: {
					...s.animation,
					duration: v
				} })),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "FPS",
				value: a.fps,
				min: 8,
				max: 60,
				step: 1,
				onChange: (v) => useStudio.setState((s) => ({ animation: {
					...s.animation,
					fps: v
				} })),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Rotation speed",
				value: a.rotationSpeed,
				min: 0,
				max: 1.5,
				onChange: (v) => useStudio.setState((s) => ({ animation: {
					...s.animation,
					rotationSpeed: v
				} })),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Tilt",
				value: a.tilt,
				min: 0,
				max: 1,
				onChange: (v) => useStudio.setState((s) => ({ animation: {
					...s.animation,
					tilt: v
				} })),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Light movement",
				value: a.lightMove,
				min: 0,
				max: 1.5,
				onChange: (v) => useStudio.setState((s) => ({ animation: {
					...s.animation,
					lightMove: v
				} })),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
				label: "Holo animation",
				value: a.holoAnim,
				min: 0,
				max: 1.5,
				onChange: (v) => useStudio.setState((s) => ({ animation: {
					...s.animation,
					holoAnim: v
				} })),
				onCommit: snap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectRow, {
				label: "Easing",
				value: a.easing,
				options: [
					{
						id: "linear",
						name: "Linear"
					},
					{
						id: "easeIn",
						name: "Ease in"
					},
					{
						id: "easeOut",
						name: "Ease out"
					},
					{
						id: "easeInOut",
						name: "Ease in-out"
					},
					{
						id: "cubic",
						name: "Cubic"
					},
					{
						id: "smoothstep",
						name: "Smoothstep"
					}
				],
				onChange: (v) => useStudio.getState().setAnim({ easing: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "h-8 rounded-sm text-[11px] text-muted hover:text-fg",
				onClick: () => useStudio.setState({ animation: defaultProject().animation }),
				children: "Reset animation"
			})
		]
	})] });
}
function BottomBar({ rendererRef }) {
	const side = useStudio((s) => s.side);
	const playing = useStudio((s) => s.animation.playing);
	const fps = useStudio((s) => s.fps);
	const zoom = useStudio((s) => s.camera.zoom);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "flex h-11 shrink-0 items-center gap-2 border-t border-border bg-panel px-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex rounded-sm bg-elevated p-0.5",
				children: ["front", "back"].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						useStudio.getState().setSide(s);
						if (s === "back") rendererRef.current?.flip();
					},
					className: cn("h-7 rounded-xs px-3 text-[11px] capitalize", side === s ? "bg-surface text-fg" : "text-muted"),
					children: s
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
				onClick: () => rendererRef.current?.flip(),
				children: "Flip"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
				label: playing ? "Pause" : "Play",
				onClick: () => useStudio.getState().setAnim({ playing: !playing }),
				children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5 ml-px" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
				label: "Reset view",
				onClick: () => {
					rendererRef.current?.resetView();
					useStudio.getState().setAnim({
						playing: false,
						autoRotate: false
					});
					useStudio.getState().setCam({
						zoom: 1,
						rotX: -.18,
						rotY: .32
					});
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
				label: "Zoom out",
				onClick: () => useStudio.getState().setCam({ zoom: Math.max(.45, zoom * .9) }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, { className: "size-3.5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "w-10 text-center font-mono text-[10px] text-subtle tabular-nums",
				children: [Math.round(zoom * 100), "%"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
				label: "Zoom in",
				onClick: () => useStudio.getState().setCam({ zoom: Math.min(2.4, zoom * 1.1) }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "size-3.5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ml-auto flex items-center gap-3 font-mono text-[10px] text-subtle tabular-nums",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fps ? `${Math.round(fps)} FPS` : "— FPS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden sm:inline",
					children: "GPU foil engine"
				})]
			})
		]
	});
}
/** GLSL holographic foil engine — view-angle spectral diffraction, iridescence, clones. */
var CARD_VERT = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPos;
varying vec3 vViewDir;
varying vec3 vObjectPos;

void main() {
  vUv = uv;
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorldPos = world.xyz;
  vObjectPos = position;
  vNormal = normalize(mat3(modelMatrix) * normal);
  vViewDir = normalize(cameraPosition - world.xyz);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;
var CARD_FRAG = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPos;
varying vec3 vViewDir;
varying vec3 vObjectPos;

uniform sampler2D uArt;
uniform sampler2D uMask;
uniform sampler2D uScratch;
uniform sampler2D uGrain;
uniform sampler2D uFoil;
uniform sampler2D uBump;
uniform vec2 uArtSize;
uniform float uHasArt;
uniform float uHasMask;

uniform float uTime;
uniform float uQuality;
uniform float uSide; // 0 front, 1 back
uniform vec2 uCardSize;
uniform float uCorner;
uniform float uBorder;
uniform float uBorderStyle;

// Art transform
uniform vec2 uArtPos;
uniform float uArtScale;
uniform float uArtRot;
uniform float uArtOpacity;
uniform float uArtBright;
uniform float uArtContrast;
uniform float uArtSat;
uniform float uArtHue;
uniform float uArtGamma;
uniform float uArtBlur;
uniform float uFit; // 0 fill, 1 fit

// Holo
uniform float uHoloInt;
uniform float uHoloOp;
uniform float uHoloDisp;
uniform float uHoloRain;
uniform float uHoloHue;
uniform float uHoloSat;
uniform float uHoloCon;
uniform float uHoloFreq;
uniform float uHoloScale;
uniform float uHoloDir;
uniform float uHoloRot;
uniform float uHoloDist;
uniform float uHoloNoise;
uniform float uHoloTurb;
uniform float uHoloSharp;
uniform float uHoloAnim;
uniform float uHoloView;
uniform float uHoloPattern;
uniform float uHoloMask;
uniform float uHoloBlend;

// Diffraction
uniform float uGratFreq;
uniform float uGratDens;
uniform float uGratScale;
uniform float uGratAng;
uniform float uGratDir;
uniform float uGratDisp;
uniform float uGratSpread;
uniform float uGratRain;
uniform float uGratHue;
uniform float uGratCon;
uniform float uGratSharp;
uniform float uGratDist;
uniform float uGratPersp;
uniform float uGratFall;
uniform float uGratLight;
uniform float uGratPat;
uniform float uGratOp;

// Iridescence
uniform float uIriInt;
uniform float uIriView;
uniform float uIriHue;
uniform float uIriSpread;
uniform float uIriSat;
uniform float uIriRough;
uniform float uMetallic;
uniform float uFresnel;
uniform float uSpecular;
uniform float uClearcoat;
uniform float uCcRough;

// Reflection clones
uniform float uCloneN;
uniform float uCloneSp;
uniform float uCloneSc;
uniform float uCloneRot;
uniform float uCloneOp;
uniform float uReflAng;
uniform float uReflBlur;
uniform float uReflDist;
uniform float uMirrorAx;
uniform float uHMirror;
uniform float uVMirror;
uniform float uRadRefl;
uniform float uKaleido;
uniform float uKaleidoSeg;
uniform float uReflFall;
uniform float uReflBlend;

// Material
uniform float uGloss;
uniform float uReflect;
uniform float uRefract;
uniform float uGrainAmt;
uniform float uBumpAmt;
uniform float uScratchAmt;
uniform float uMicroScratch;
uniform float uMicroSurf;
uniform float uSurfDist;
uniform float uMatNoise;

// Lighting
uniform vec3 uKeyDir;
uniform vec3 uKeyCol;
uniform float uKeyInt;
uniform float uKeySoft;
uniform vec3 uFillDir;
uniform vec3 uFillCol;
uniform float uFillInt;
uniform vec3 uRimDir;
uniform vec3 uRimCol;
uniform float uRimInt;
uniform vec3 uAmbCol;
uniform float uAmbInt;
uniform float uSpecLight;
uniform float uEnvInt;
uniform float uShadow;

uniform vec3 uEdgeCol;
uniform float uEdgeMetal;
uniform vec3 uBgCol;
uniform float uLayerBase;
uniform float uLayerArt;
uniform float uLayerBorder;
uniform float uLayerFoil;
uniform float uLayerDiff;
uniform float uLayerHolo;
uniform float uLayerIri;
uniform float uLayerRefl;
uniform float uLayerTex;
uniform float uLayerScratch;
uniform float uLayerGloss;
uniform float uLayerLight;

// ---- helpers ----
float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
vec2 hash22(vec2 p) {
  float n = hash21(p);
  return vec2(n, hash21(p + n));
}
float noise21(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise21(p);
    p = p * 2.07 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}
vec3 hueRotate(vec3 c, float h) {
  float a = h * 6.2831853;
  float cosA = cos(a);
  float sinA = sin(a);
  mat3 m = mat3(
    0.299+0.701*cosA+0.168*sinA, 0.299-0.299*cosA-0.328*sinA, 0.299-0.300*cosA+1.250*sinA,
    0.587-0.587*cosA+0.330*sinA, 0.587+0.413*cosA+0.035*sinA, 0.587-0.588*cosA-1.050*sinA,
    0.114-0.114*cosA-0.497*sinA, 0.114-0.114*cosA+0.292*sinA, 0.114+0.886*cosA-0.203*sinA
  );
  return clamp(c * m, 0.0, 1.0);
}
vec3 satContrast(vec3 c, float s, float con) {
  float l = dot(c, vec3(0.299, 0.587, 0.114));
  c = mix(vec3(l), c, s);
  c = (c - 0.5) * con + 0.5;
  return c;
}
vec3 blendOverlay(vec3 b, vec3 o) {
  return mix(2.0 * b * o, 1.0 - 2.0 * (1.0 - b) * (1.0 - o), step(0.5, b));
}
vec3 blendSoft(vec3 b, vec3 o) {
  return (1.0 - 2.0 * o) * b * b + 2.0 * o * b;
}
vec3 applyBlend(vec3 b, vec3 o, float mode, float op) {
  vec3 r = o;
  if (mode < 0.5) r = mix(b, o, 1.0);
  else if (mode < 1.5) r = b + o;
  else if (mode < 2.5) r = 1.0 - (1.0 - b) * (1.0 - o);
  else if (mode < 3.5) r = blendOverlay(b, o);
  else if (mode < 4.5) r = b * o;
  else if (mode < 5.5) r = blendSoft(b, o);
  else {
    float l = dot(b, vec3(0.299, 0.587, 0.114));
    r = o * l / max(dot(o, vec3(0.299, 0.587, 0.114)), 0.001);
  }
  return mix(b, r, op);
}

// CIE-ish wavelength to RGB (380–780 nm)
vec3 wavelengthRGB(float nm) {
  vec3 col = vec3(0.0);
  if (nm >= 380.0 && nm < 440.0) {
    col = vec3(-(nm - 440.0) / 60.0, 0.0, 1.0);
  } else if (nm < 490.0) {
    col = vec3(0.0, (nm - 440.0) / 50.0, 1.0);
  } else if (nm < 510.0) {
    col = vec3(0.0, 1.0, -(nm - 510.0) / 20.0);
  } else if (nm < 580.0) {
    col = vec3((nm - 510.0) / 70.0, 1.0, 0.0);
  } else if (nm < 645.0) {
    col = vec3(1.0, -(nm - 645.0) / 65.0, 0.0);
  } else if (nm <= 780.0) {
    col = vec3(1.0, 0.0, 0.0);
  }
  float fac = 1.0;
  if (nm > 700.0) fac = 0.3 + 0.7 * (780.0 - nm) / 80.0;
  else if (nm < 420.0) fac = 0.3 + 0.7 * (nm - 380.0) / 40.0;
  return col * fac;
}

vec2 rotate2(vec2 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec2(c * p.x - s * p.y, s * p.x + c * p.y);
}

float sdRoundBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

vec2 voronoi(vec2 p) {
  vec2 n = floor(p);
  vec2 f = fract(p);
  float md = 8.0;
  vec2 mr = vec2(0.0);
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = hash22(n + g);
      vec2 r = g + o - f;
      float d = dot(r, r);
      if (d < md) {
        md = d;
        mr = r;
      }
    }
  }
  return vec2(md, atan(mr.y, mr.x));
}

vec2 kaleidoUv(vec2 uv, float segs) {
  vec2 p = uv - 0.5;
  float a = atan(p.y, p.x);
  float r = length(p);
  float seg = 6.2831853 / max(segs, 2.0);
  a = mod(a, seg);
  a = abs(a - seg * 0.5);
  return vec2(cos(a), sin(a)) * r + 0.5;
}

vec2 artUv(vec2 uv) {
  vec2 p = uv - 0.5 - uArtPos;
  p = rotate2(p, uArtRot);
  p /= max(uArtScale, 0.05);
  // aspect-aware fit/fill
  float cardA = uCardSize.x / max(uCardSize.y, 0.001);
  float artA = uArtSize.x / max(uArtSize.y, 0.001);
  if (uFit < 0.5) {
    // fill
    if (artA > cardA) p.x *= cardA / artA;
    else p.y *= artA / cardA;
  } else {
    // fit
    if (artA > cardA) p.y *= artA / cardA;
    else p.x *= cardA / artA;
  }
  return p + 0.5;
}

vec3 sampleArt(vec2 uv) {
  if (uHasArt < 0.5) {
    // fallback dark field
    return uBgCol;
  }
  vec2 suv = artUv(uv);
  vec4 t = texture2D(uArt, clamp(suv, 0.0, 1.0));
  float inb = step(0.0, suv.x) * step(suv.x, 1.0) * step(0.0, suv.y) * step(suv.y, 1.0);
  vec3 c = mix(uBgCol, t.rgb, inb * t.a);
  c *= uArtBright;
  c = (c - 0.5) * uArtContrast + 0.5;
  c = satContrast(c, uArtSat, 1.0);
  c = hueRotate(c, uArtHue);
  c = pow(max(c, 0.0), vec3(1.0 / max(uArtGamma, 0.1)));
  return mix(uBgCol, c, uArtOpacity);
}

float foilMask(vec2 uv, vec3 art) {
  float m = 1.0;
  float d = sdRoundBox((uv - 0.5) * 2.0, vec2(1.0), uCorner * 2.0);
  float borderM = smoothstep(-uBorder * 4.0, -uBorder * 1.2, -d);
  float cx = 1.0 - smoothstep(0.15, 0.55, length(uv - 0.5));
  float lum = dot(art, vec3(0.299, 0.587, 0.114));
  if (uHoloMask < 0.5) m = 1.0;
  else if (uHoloMask < 1.5) m = 1.0;
  else if (uHoloMask < 2.5) m = cx;
  else if (uHoloMask < 3.5) m = borderM;
  else if (uHoloMask < 4.5) m = smoothstep(0.12, 0.45, lum) * (1.0 - borderM * 0.5);
  else if (uHoloMask < 5.5) m = (1.0 - smoothstep(0.15, 0.5, lum)) * 0.85 + borderM * 0.4;
  else if (uHoloMask < 6.5) m = smoothstep(0.0, 1.0, uv.y);
  else if (uHoloMask < 7.5) {
    if (uHasMask > 0.5) m = texture2D(uMask, uv).r;
  } else {
    m = smoothstep(0.2, 0.7, lum);
  }
  return clamp(m, 0.0, 1.0);
}

float patternCoord(vec2 uv, vec3 viewT, float pat) {
  vec2 p = (uv - 0.5) / max(uHoloScale, 0.05);
  p = rotate2(p, uHoloRot + uHoloDir);
  float t = uTime * uHoloAnim * 0.35;
  float n = fbm(p * 3.0 + t) * uHoloTurb;
  p += n * uHoloDist * 0.25;
  float c = 0.0;
  if (pat < 0.5) {
    c = p.x;
  } else if (pat < 1.5) {
    c = length(p);
  } else if (pat < 2.5) {
    c = atan(p.y, p.x) / 3.14159;
  } else if (pat < 3.5) {
    c = abs(p.x) + abs(p.y);
  } else if (pat < 4.5) {
    c = p.x * 1.7 + p.y * 0.3;
    c = mix(c, p.y * 1.7, 0.35);
  } else if (pat < 5.5) {
    c = p.x + p.y;
    c = mix(c, p.x - p.y, 0.5);
  } else if (pat < 6.5) {
    c = p.x * 8.0;
  } else if (pat < 7.5) {
    vec2 q = abs(fract(p * 2.0) - 0.5);
    c = max(q.x * 0.866 + q.y * 0.5, q.y);
  } else if (pat < 8.5) {
    vec2 v = voronoi(p * 4.0);
    c = v.x * 2.0 + v.y * 0.15;
  } else if (pat < 9.5) {
    c = atan(p.y, p.x) / 3.14159 * 4.0 + length(p) * 2.0;
  } else if (pat < 10.5) {
    c = p.x;
  } else if (pat < 11.5) {
    c = fbm(p * 2.5 + viewT.xy) * 2.0 - 1.0;
  } else if (pat < 12.5) {
    c = sin(p.x * 3.0 + fbm(p + t) * 2.0) + p.y * 0.6;
  } else {
    vec2 k = kaleidoUv(uv, 8.0) - 0.5;
    c = k.x * 2.0 + k.y;
  }
  c += viewT.x * uHoloView * 0.65 + viewT.y * uHoloView * 0.25;
  c += t;
  return c;
}

vec3 spectralFrom(float coord, float freq, float spread, float hueOff, float disp, vec3 viewT) {
  float g = coord * freq;
  // grating equation analogue: wavelength shifts with view
  float phase = fract(g + viewT.x * disp * 1.8 + viewT.y * disp * 0.6 + hueOff);
  float nm = mix(380.0, 780.0, fract(phase * spread));
  vec3 a = wavelengthRGB(nm);
  vec3 b = wavelengthRGB(mix(380.0, 780.0, fract(phase * spread + 0.18)));
  vec3 c = wavelengthRGB(mix(380.0, 780.0, fract(phase * spread + 0.33)));
  vec3 spec = a * 0.55 + b * 0.3 + c * 0.15;
  float env = 0.55 + 0.45 * sin(g * 6.28318);
  spec *= mix(1.0, env, 0.45);
  return spec;
}

vec3 gratingColor(vec2 uv, vec3 viewT, vec3 L) {
  vec2 p = (uv - 0.5) / max(uGratScale, 0.05);
  p = rotate2(p, uGratAng + uGratDir);
  p += fbm(p * 4.0) * uGratDist * 0.2;
  float coord = 0.0;
  if (uGratPat < 0.5) coord = p.x;
  else if (uGratPat < 1.5) coord = p.x + p.y;
  else if (uGratPat < 2.5) coord = length(p);
  else if (uGratPat < 3.5) coord = length(p);
  else if (uGratPat < 4.5) {
    vec2 q = abs(fract(p * 3.0) - 0.5);
    coord = max(q.x * 0.866 + q.y * 0.5, q.y);
  } else if (uGratPat < 5.5) {
    coord = length(fract(p * uGratDens) - 0.5);
  } else if (uGratPat < 6.5) {
    coord = p.x + 0.25 * sin(p.y * 8.0);
  } else {
    coord = abs(p.x) + 0.15 * p.y;
  }
  coord *= uGratFreq * uGratDens;
  // perspective warp
  coord += viewT.x * uGratPersp * 2.0;
  vec3 spec = spectralFrom(coord, 1.0, uGratSpread, uGratHue, uGratDisp, viewT);
  spec = satContrast(spec, 1.0, uGratCon);
  float sharp = mix(0.35, 1.0, uGratSharp);
  spec = pow(max(spec, 0.0), vec3(mix(0.85, 1.6, sharp)));
  float ndl = pow(max(dot(normalize(vNormal), L), 0.0), 1.0);
  spec *= mix(1.0, 0.45 + 0.7 * ndl, uGratLight);
  float fall = 1.0 - uGratFall * pow(length(uv - 0.5) * 1.4, 2.0);
  return spec * uGratRain * uGratOp * max(fall, 0.0);
}

vec3 iridescence(vec3 N, vec3 V, vec3 L) {
  float ndv = pow(1.0 - max(dot(N, V), 0.0), mix(1.0, 5.0, uIriView));
  float ndl = max(dot(N, L), 0.0);
  float film = ndv * 6.28318 * (1.0 + uIriSpread * 2.0) + uIriHue * 6.28318;
  vec3 iri = 0.5 + 0.5 * vec3(sin(film), sin(film + 2.094), sin(film + 4.188));
  iri = satContrast(iri, uIriSat, 1.1);
  float fres = pow(1.0 - max(dot(N, V), 0.0), mix(2.0, 5.0, uFresnel));
  return iri * uIriInt * (0.35 + 0.65 * ndv) * (0.4 + 0.6 * ndl) * (0.5 + 0.5 * fres);
}

vec2 cloneUv(vec2 uv) {
  vec2 p = uv - 0.5;
  if (uHMirror > 0.5) p.x = abs(p.x);
  if (uVMirror > 0.5) p.y = abs(p.y);
  if (uRadRefl > 0.5) {
    float r = length(p);
    float a = atan(p.y, p.x);
    a = abs(mod(a + 3.14159, 3.14159) - 1.5708);
    p = vec2(cos(a), sin(a)) * r;
  }
  if (uKaleido > 0.5) {
    return kaleidoUv(uv, uKaleidoSeg);
  }
  p = rotate2(p, uCloneRot + uReflAng);
  p /= max(uCloneSc, 0.2);
  return p + 0.5;
}

vec3 reflectionClones(vec2 uv, vec3 base) {
  if (uCloneN < 0.5 && uKaleido < 0.5 && uHMirror < 0.5 && uVMirror < 0.5) {
    return vec3(0.0);
  }
  vec3 acc = vec3(0.0);
  float n = max(uCloneN, 1.0);
  for (int i = 0; i < 8; i++) {
    if (float(i) >= n) break;
    float fi = float(i);
    vec2 off = rotate2(vec2(uCloneSp * (fi + 1.0) * 0.12, 0.0), uMirrorAx + fi * 0.785);
    vec2 cuv = cloneUv(uv + off * 0.15);
    cuv += (fbm(cuv * 6.0) - 0.5) * uReflDist * 0.15;
    vec3 s = sampleArt(fract(cuv));
    float w = exp(-fi * uReflFall * 0.65) * uCloneOp;
    acc += s * w;
  }
  return acc / max(n * 0.55, 1.0);
}

void main() {
  vec2 uv = vUv;
  // rounded-rect SDF in uv space
  vec2 p = (uv - 0.5) * 2.0;
  float aspect = uCardSize.x / max(uCardSize.y, 0.001);
  p.x *= aspect;
  float radius = uCorner * 2.0 * min(aspect, 1.0);
  vec2 halfb = vec2(aspect, 1.0);
  float sdf = sdRoundBox(p, halfb, radius);
  if (sdf > 0.002) discard;
  float aa = 0.004;
  float alpha = 1.0 - smoothstep(-aa, aa, sdf);

  vec3 N = normalize(vNormal);
  vec3 V = normalize(vViewDir);
  vec3 L = normalize(uKeyDir);
  vec3 viewT = vec3(dot(V, vec3(1.0, 0.0, 0.0)), dot(V, vec3(0.0, 1.0, 0.0)), dot(V, N));

  // micro-surface bump
  float bump = (noise21(uv * 90.0) - 0.5) * uBumpAmt * 0.35;
  bump += (texture2D(uBump, uv * 4.0).r - 0.5) * uBumpAmt * 0.4;
  N = normalize(N + vec3(bump, bump * 0.6, 0.0) * uMicroSurf);

  vec3 art = sampleArt(uv);
  if (uLayerArt < 0.01) art = uBgCol;
  art *= uLayerArt;

  float mask = foilMask(uv, art);

  // base
  vec3 col = mix(uBgCol, art, uLayerBase);

  // reflection clones
  vec3 clones = reflectionClones(uv, art) * uLayerRefl;
  col = applyBlend(col, clones, uReflBlend, uCloneOp * 0.65 * uLayerRefl);

  // holographic pattern
  float coord = patternCoord(uv, viewT, uHoloPattern);
  vec3 holoSpec = spectralFrom(coord, uHoloFreq, 1.0 + uHoloDisp, uHoloHue, uHoloDisp, viewT);
  holoSpec = satContrast(holoSpec, uHoloSat, uHoloCon);
  holoSpec = pow(max(holoSpec, 0.0), vec3(mix(0.7, 1.8, uHoloSharp)));
  holoSpec *= uHoloRain;
  float nH = fbm(uv * 12.0 + uTime * 0.05) * uHoloNoise;
  holoSpec *= 0.75 + 0.5 * nH;
  holoSpec *= mask * uHoloInt * uHoloOp * uLayerHolo;
  col = applyBlend(col, holoSpec, uHoloBlend, clamp(uHoloOp * mask * uLayerHolo, 0.0, 1.0));

  // diffraction grating overlay
  vec3 grat = gratingColor(uv, viewT, L) * mask * uLayerDiff;
  col = applyBlend(col, grat, 1.0, clamp(uGratOp * mask * uLayerDiff, 0.0, 1.0));

  // iridesescence
  vec3 iri = iridescence(N, V, L) * mask * uLayerIri;
  col += iri;

  // foil texture
  vec3 foilTex = texture2D(uFoil, uv * 3.0 + viewT.xy * 0.15).rgb;
  col = mix(col, blendOverlay(col, foilTex), 0.12 * uLayerFoil * mask);

  // grain / noise
  float grain = (texture2D(uGrain, uv * 8.0).r - 0.5) * uGrainAmt;
  grain += (hash21(uv * vec2(1920.0, 1080.0) + fract(uTime) * 10.0) - 0.5) * uMatNoise * 0.08;
  col += grain * 0.18 * uLayerTex;

  // scratches catching light
  float sc = texture2D(uScratch, uv * vec2(1.6, 3.2)).r;
  float sc2 = texture2D(uScratch, uv.yx * vec2(4.0, 1.2) + 0.37).g;
  vec3 H = normalize(L + V);
  float spec = pow(max(dot(N, H), 0.0), mix(8.0, 96.0, uGloss));
  float aniso = pow(abs(sin((uv.x * 80.0 + uv.y * 6.0) * 3.14159)), 4.0);
  float scratchLit = pow(sc, 3.0) * spec * uScratchAmt;
  scratchLit += pow(sc2, 4.0) * spec * uMicroScratch * 0.6;
  scratchLit += aniso * spec * uMicroScratch * 0.25;
  col += vec3(scratchLit) * uLayerScratch;

  // lighting
  float ndl = max(dot(N, L), 0.0);
  ndl = mix(ndl, smoothstep(0.0, 1.0, ndl), uKeySoft);
  float fill = max(dot(N, normalize(uFillDir)), 0.0);
  float rim = pow(1.0 - max(dot(N, V), 0.0), 3.0) * max(dot(N, normalize(uRimDir)), 0.0);
  float fres = pow(1.0 - max(dot(N, V), 0.0), mix(1.5, 5.0, uFresnel));

  vec3 lighting = uAmbCol * uAmbInt;
  lighting += uKeyCol * uKeyInt * ndl;
  lighting += uFillCol * uFillInt * fill;
  lighting += uRimCol * uRimInt * rim;
  lighting += vec3(spec) * uSpecular * uSpecLight * (0.4 + 0.6 * uMetallic);
  lighting += vec3(fres) * uClearcoat * (1.0 - uCcRough) * 0.55;
  lighting += vec3(spec * spec) * uGloss * uLayerGloss * 0.8;

  // metallic sheen
  vec3 metalTint = mix(vec3(1.0), art * 1.4 + holoSpec * 0.5, uMetallic);
  col = col * mix(vec3(1.0), lighting, 0.85 * uLayerLight) * mix(vec3(1.0), metalTint, uMetallic * 0.45);
  col += lighting * uReflect * 0.12 * metalTint;

  // border treatment
  float borderMask = 1.0 - smoothstep(-uBorder * 3.5, -uBorder * 0.4, sdf);
  vec3 borderCol = uEdgeCol;
  if (uBorderStyle < 0.5) {
    borderCol = mix(uEdgeCol, holoSpec * 1.4 + gratingColor(uv * 1.8, viewT, L), 0.65);
  } else if (uBorderStyle < 1.5) {
    borderCol = mix(uEdgeCol, lighting * metalTint, 0.7);
  } else if (uBorderStyle < 2.5) {
    borderCol = uEdgeCol * 0.7;
  } else if (uBorderStyle < 3.5) {
    borderCol = mix(uEdgeCol * 0.4, col * 0.5, 0.4);
  } else {
    float orn = step(0.7, fract((uv.x + uv.y) * 18.0));
    borderCol = mix(uEdgeCol, uEdgeCol * 1.4 + holoSpec * 0.3, orn);
  }
  col = mix(col, borderCol, borderMask * uLayerBorder * 0.92);

  // edge darkening / thickness cue
  float edgeShade = smoothstep(-0.04, 0.0, sdf);
  col *= 1.0 - edgeShade * 0.55 * uShadow;

  col = clamp(col, 0.0, 8.0);
  // mild tonemap
  col = col / (1.0 + col * 0.15);
  col = pow(max(col, 0.0), vec3(0.95));

  gl_FragColor = vec4(col, alpha);
}
`;
var EDGE_VERT = `
varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vWorldPos;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorldPos = world.xyz;
  vNormal = normalize(mat3(modelMatrix) * normal);
  vViewDir = normalize(cameraPosition - world.xyz);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;
var EDGE_FRAG = `
varying vec3 vNormal;
varying vec3 vViewDir;
uniform vec3 uColor;
uniform float uMetal;
uniform vec3 uKeyDir;
uniform vec3 uKeyCol;
uniform float uKeyInt;
void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vViewDir);
  vec3 L = normalize(uKeyDir);
  float ndl = max(dot(N, L), 0.0);
  float spec = pow(max(dot(N, normalize(L + V)), 0.0), 32.0);
  float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
  vec3 col = uColor * (0.18 + 0.82 * ndl) * uKeyCol * uKeyInt;
  col += vec3(spec) * mix(0.25, 1.1, uMetal);
  col += vec3(fres) * 0.35 * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`;
var BG_VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;
var BG_FRAG = `
varying vec2 vUv;
uniform vec3 uA;
uniform vec3 uB;
uniform float uVignette;
uniform float uStudio;
void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float r = length(p * vec2(1.0, 0.85));
  vec3 col = mix(uA, uB, smoothstep(-0.2, 1.1, vUv.y + r * 0.15));
  // studio cove
  float cove = smoothstep(1.15, 0.25, r);
  col = mix(col * 0.55, col, mix(1.0, cove, uStudio * 0.7));
  float vig = smoothstep(1.35, 0.25, r);
  col *= mix(1.0, vig, uVignette);
  gl_FragColor = vec4(col, 1.0);
}
`;
function dirFromSpherical(azimuth, elevation) {
	const el = elevation;
	const az = azimuth;
	const y = Math.sin(el);
	const r = Math.cos(el);
	return new Vector3(Math.cos(az) * r, y, Math.sin(az) * r).normalize();
}
function blendToFloat(mode) {
	switch (mode) {
		case "mix": return 0;
		case "add": return 1;
		case "screen": return 2;
		case "overlay": return 3;
		case "multiply": return 4;
		case "softlight": return 5;
		case "color": return 6;
		default: return 0;
	}
}
function layerOpacity(p, kind) {
	const layer = p.layers.find((l) => l.kind === kind);
	if (!layer) return 1;
	return layer.visible ? layer.opacity : 0;
}
var HOLO_PAT = {
	linear: 0,
	radial: 1,
	circular: 2,
	diamond: 3,
	grid: 4,
	crosshatch: 5,
	microlines: 6,
	prism: 7,
	shattered: 8,
	starburst: 9,
	spectrum: 10,
	galaxy: 11,
	aurora: 12,
	kaleidoscope: 13
};
var GRAT_PAT = {
	lines: 0,
	cross: 1,
	radial: 2,
	concentric: 3,
	hex: 4,
	dots: 5,
	wave: 6,
	chevron: 7
};
var BORDER_STYLE = {
	foil: 0,
	metallic: 1,
	matte: 2,
	inset: 3,
	ornate: 4
};
var MASK_TYPE = {
	none: 0,
	full: 1,
	center: 2,
	border: 3,
	character: 4,
	reverse: 5,
	gradient: 6,
	image: 7,
	luminance: 8
};
function emptyTex() {
	const data = new Uint8Array([
		20,
		22,
		28,
		255
	]);
	const t = new DataTexture(data, 1, 1);
	t.needsUpdate = true;
	return t;
}
function canvasTex(c, aniso) {
	const t = new CanvasTexture(c);
	t.colorSpace = SRGBColorSpace;
	t.anisotropy = aniso;
	t.wrapS = t.wrapT = RepeatWrapping;
	t.needsUpdate = true;
	return t;
}
var CardRenderer = class {
	canvas;
	renderer;
	scene = new Scene();
	camera;
	clock = new Timer();
	cardGroup = new Group();
	viewCanvas = null;
	blitCtx = null;
	frontMat;
	backMat;
	edgeMat;
	bgMat;
	frontMesh;
	backMesh;
	edgeMesh;
	shadowMesh;
	dummy = emptyTex();
	frontTex = this.dummy;
	backTex = this.dummy;
	maskTex = this.dummy;
	scratchTex = this.dummy;
	grainTex = this.dummy;
	foilTex = this.dummy;
	bumpTex = this.dummy;
	raf = 0;
	running = false;
	project = null;
	pointer = {
		x: 0,
		y: 0,
		down: false,
		lx: 0,
		ly: 0
	};
	tilt = {
		x: 0,
		y: 0
	};
	orbit = {
		x: -.18,
		y: .32
	};
	targetOrbit = {
		x: -.18,
		y: .32
	};
	animTime = 0;
	fpsAccum = 0;
	fpsFrames = 0;
	fps = 60;
	onFps;
	lost = false;
	webgl = true;
	dprCap = 1.5;
	exportMode = false;
	constructor(canvas) {
		this.canvas = canvas;
		try {
			this.renderer = new WebGLRenderer({
				canvas,
				antialias: true,
				alpha: true,
				powerPreference: "high-performance",
				preserveDrawingBuffer: true
			});
		} catch {
			this.webgl = false;
			this.renderer = null;
			this.camera = new PerspectiveCamera();
			this.frontMat = this.backMat = this.edgeMat = this.bgMat = null;
			this.frontMesh = this.backMesh = this.edgeMesh = this.shadowMesh = null;
			return;
		}
		this.webgl = true;
		this.renderer.debug.checkShaderErrors = true;
		this.renderer.debug.onShaderError = (gl, _program, vs, fs) => {
			const vlog = gl.getShaderInfoLog(vs);
			const flog = gl.getShaderInfoLog(fs);
			console.error("[spectra] vertex shader", vlog);
			console.error("[spectra] fragment shader", flog);
		};
		this.renderer.setClearColor(789778, 1);
		this.renderer.outputColorSpace = SRGBColorSpace;
		this.renderer.toneMapping = 4;
		this.renderer.toneMappingExposure = 1.05;
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.dprCap));
		this.camera = new PerspectiveCamera(28, 1, .05, 40);
		this.camera.position.set(0, 0, 3.15);
		this.camera.lookAt(0, 0, 0);
		const uniforms = this.makeUniforms();
		this.frontMat = new ShaderMaterial({
			vertexShader: CARD_VERT,
			fragmentShader: CARD_FRAG,
			uniforms: UniformsUtils.clone(uniforms),
			transparent: true,
			side: 0,
			depthWrite: false
		});
		this.backMat = new ShaderMaterial({
			vertexShader: CARD_VERT,
			fragmentShader: CARD_FRAG,
			uniforms: UniformsUtils.clone(uniforms),
			transparent: true,
			side: 0,
			depthWrite: false
		});
		this.edgeMat = new ShaderMaterial({
			vertexShader: EDGE_VERT,
			fragmentShader: EDGE_FRAG,
			uniforms: {
				uColor: { value: new Color("#c9d0da") },
				uMetal: { value: .85 },
				uKeyDir: { value: new Vector3(.4, .7, .6) },
				uKeyCol: { value: new Color("#f2f4f8") },
				uKeyInt: { value: 1.1 }
			}
		});
		this.bgMat = new ShaderMaterial({
			vertexShader: BG_VERT,
			fragmentShader: BG_FRAG,
			uniforms: {
				uA: { value: new Color("#08080a") },
				uB: { value: new Color("#14141a") },
				uVignette: { value: .85 },
				uStudio: { value: 1 }
			},
			depthTest: false,
			depthWrite: false
		});
		const bg = new Mesh(new PlaneGeometry(2, 2), this.bgMat);
		bg.frustumCulled = false;
		bg.renderOrder = -10;
		this.scene.add(bg);
		const plane = new PlaneGeometry(1, 1, 1, 1);
		this.frontMesh = new Mesh(plane, this.frontMat);
		this.backMesh = new Mesh(plane.clone(), this.backMat);
		this.backMesh.rotation.y = Math.PI;
		this.edgeMesh = new Mesh(new BoxGeometry(1, 1, 1), this.edgeMat);
		this.cardGroup.add(this.edgeMesh, this.frontMesh, this.backMesh);
		const shadowGeo = new PlaneGeometry(1.4, 1.9);
		const shadowMat = new MeshBasicMaterial({
			color: 0,
			transparent: true,
			opacity: .35,
			depthWrite: false
		});
		this.shadowMesh = new Mesh(shadowGeo, shadowMat);
		this.shadowMesh.rotation.x = -Math.PI / 2;
		this.shadowMesh.position.y = -.95;
		this.scene.add(this.shadowMesh);
		this.scene.add(this.cardGroup);
		canvas.addEventListener("webglcontextlost", this.onLost);
		canvas.addEventListener("webglcontextrestored", this.onRestored);
	}
	makeUniforms() {
		const z = () => ({ value: 0 });
		const o = () => ({ value: 1 });
		const v3 = (x = 0, y = 0, zc = 1) => ({ value: new Vector3(x, y, zc) });
		const c = (hex) => ({ value: new Color(hex) });
		return {
			uArt: { value: this.dummy },
			uMask: { value: this.dummy },
			uScratch: { value: this.dummy },
			uGrain: { value: this.dummy },
			uFoil: { value: this.dummy },
			uBump: { value: this.dummy },
			uArtSize: { value: new Vector2(1, 1) },
			uHasArt: z(),
			uHasMask: z(),
			uTime: z(),
			uQuality: o(),
			uSide: z(),
			uCardSize: { value: new Vector2(63, 88) },
			uCorner: { value: .045 },
			uBorder: { value: .035 },
			uBorderStyle: z(),
			uArtPos: { value: new Vector2() },
			uArtScale: o(),
			uArtRot: z(),
			uArtOpacity: o(),
			uArtBright: o(),
			uArtContrast: o(),
			uArtSat: o(),
			uArtHue: z(),
			uArtGamma: o(),
			uArtBlur: z(),
			uFit: z(),
			uHoloInt: { value: .85 },
			uHoloOp: { value: .72 },
			uHoloDisp: { value: .85 },
			uHoloRain: { value: .9 },
			uHoloHue: { value: .08 },
			uHoloSat: { value: 1.15 },
			uHoloCon: { value: 1.1 },
			uHoloFreq: { value: 6.5 },
			uHoloScale: o(),
			uHoloDir: { value: .15 },
			uHoloRot: { value: .2 },
			uHoloDist: { value: .25 },
			uHoloNoise: { value: .2 },
			uHoloTurb: { value: .35 },
			uHoloSharp: { value: .55 },
			uHoloAnim: { value: .15 },
			uHoloView: o(),
			uHoloPattern: z(),
			uHoloMask: { value: 1 },
			uHoloBlend: { value: 2 },
			uGratFreq: { value: 18 },
			uGratDens: { value: 1.1 },
			uGratScale: o(),
			uGratAng: { value: .35 },
			uGratDir: z(),
			uGratDisp: { value: 1.1 },
			uGratSpread: o(),
			uGratRain: { value: .8 },
			uGratHue: { value: .12 },
			uGratCon: { value: 1.15 },
			uGratSharp: { value: .6 },
			uGratDist: { value: .12 },
			uGratPersp: { value: .7 },
			uGratFall: { value: .25 },
			uGratLight: { value: .8 },
			uGratPat: z(),
			uGratOp: { value: .7 },
			uIriInt: { value: .45 },
			uIriView: { value: .7 },
			uIriHue: { value: .2 },
			uIriSpread: { value: .65 },
			uIriSat: { value: 1.05 },
			uIriRough: { value: .22 },
			uMetallic: { value: .7 },
			uFresnel: { value: .55 },
			uSpecular: { value: .8 },
			uClearcoat: { value: .65 },
			uCcRough: { value: .12 },
			uCloneN: z(),
			uCloneSp: { value: .35 },
			uCloneSc: o(),
			uCloneRot: z(),
			uCloneOp: { value: .45 },
			uReflAng: z(),
			uReflBlur: z(),
			uReflDist: { value: .05 },
			uMirrorAx: z(),
			uHMirror: z(),
			uVMirror: z(),
			uRadRefl: z(),
			uKaleido: z(),
			uKaleidoSeg: { value: 6 },
			uReflFall: { value: .6 },
			uReflBlend: { value: 2 },
			uGloss: { value: .72 },
			uReflect: { value: .45 },
			uRefract: { value: .05 },
			uGrainAmt: { value: .18 },
			uBumpAmt: { value: .22 },
			uScratchAmt: { value: .28 },
			uMicroScratch: { value: .2 },
			uMicroSurf: { value: .35 },
			uSurfDist: { value: .08 },
			uMatNoise: { value: .08 },
			uKeyDir: v3(.4, .7, .6),
			uKeyCol: c("#f2f4f8"),
			uKeyInt: { value: 1.15 },
			uKeySoft: { value: .45 },
			uFillDir: v3(-.5, .2, .4),
			uFillCol: c("#9aa8bc"),
			uFillInt: { value: .28 },
			uRimDir: v3(-.3, .2, -.7),
			uRimCol: c("#d5e2f0"),
			uRimInt: { value: .55 },
			uAmbCol: c("#8b93a3"),
			uAmbInt: { value: .22 },
			uSpecLight: o(),
			uEnvInt: { value: .5 },
			uShadow: { value: .45 },
			uEdgeCol: c("#c9d0da"),
			uEdgeMetal: { value: .85 },
			uBgCol: c("#0b0d12"),
			uLayerBase: o(),
			uLayerArt: o(),
			uLayerBorder: o(),
			uLayerFoil: o(),
			uLayerDiff: o(),
			uLayerHolo: o(),
			uLayerIri: o(),
			uLayerRefl: o(),
			uLayerTex: o(),
			uLayerScratch: o(),
			uLayerGloss: o(),
			uLayerLight: o()
		};
	}
	setMaps(maps) {
		if (!this.webgl) return;
		const aniso = this.renderer.capabilities.getMaxAnisotropy();
		const bind = (src, prev) => {
			if (!src) return prev;
			if (src instanceof Texture) return src;
			if (prev !== this.dummy) prev.dispose();
			return canvasTex(src, aniso);
		};
		if (maps.front !== void 0) this.frontTex = bind(maps.front, this.frontTex);
		if (maps.back !== void 0) this.backTex = bind(maps.back, this.backTex);
		if (maps.mask !== void 0) this.maskTex = bind(maps.mask, this.maskTex);
		if (maps.scratch) this.scratchTex = bind(maps.scratch, this.scratchTex);
		if (maps.grain) this.grainTex = bind(maps.grain, this.grainTex);
		if (maps.foil) this.foilTex = bind(maps.foil, this.foilTex);
		if (maps.bump) this.bumpTex = bind(maps.bump, this.bumpTex);
		this.applyTextures();
	}
	applyTextures() {
		const apply = (mat, tex, side) => {
			const u = mat.uniforms;
			u.uArt.value = tex;
			u.uHasArt.value = tex === this.dummy ? 0 : 1;
			u.uMask.value = this.maskTex;
			u.uHasMask.value = this.maskTex === this.dummy ? 0 : 1;
			u.uScratch.value = this.scratchTex;
			u.uGrain.value = this.grainTex;
			u.uFoil.value = this.foilTex;
			u.uBump.value = this.bumpTex;
			u.uSide.value = side;
			const img = tex.image;
			if (img?.width && img?.height) u.uArtSize.value.set(img.width, img.height);
		};
		apply(this.frontMat, this.frontTex, 0);
		apply(this.backMat, this.backTex, 1);
	}
	setProject(p) {
		this.project = p;
		if (!this.webgl) return;
		this.syncFromProject(p, 0);
	}
	syncFromProject(p, time) {
		const aspect = p.card.widthMm / p.card.heightMm;
		const h = 1.28;
		const w = h * aspect;
		const d = p.card.depth * 1.2;
		this.frontMesh.scale.set(w, h, 1);
		this.backMesh.scale.set(w, h, 1);
		this.frontMesh.position.z = d / 2 + 8e-4;
		this.backMesh.position.z = -(d / 2 + 8e-4);
		this.edgeMesh.scale.set(w * .992, h * .992, Math.max(d, .008));
		this.shadowMesh.scale.set(w * 1.15, 1, h * 1.05);
		this.shadowMesh.position.y = -.7936;
		this.shadowMesh.material.opacity = .22 * p.lighting.shadowStrength;
		this.camera.fov = p.camera.fov;
		this.camera.position.z = p.camera.distance / Math.max(p.camera.zoom, .2);
		this.camera.updateProjectionMatrix();
		const dpr = p.quality === "ultra" ? 2 : p.quality === "high" ? 1.5 : 1;
		this.dprCap = dpr;
		if (!this.exportMode) this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dpr));
		this.pushUniforms(this.frontMat, p, time, p.front);
		this.pushUniforms(this.backMat, p, time, p.back);
		const keyDir = dirFromSpherical(p.lighting.key.azimuth, p.lighting.key.elevation);
		this.edgeMat.uniforms.uColor.value.set(p.card.edgeColor);
		this.edgeMat.uniforms.uMetal.value = p.card.edgeMetal;
		this.edgeMat.uniforms.uKeyDir.value.copy(keyDir);
		this.edgeMat.uniforms.uKeyCol.value.set(p.lighting.key.color);
		this.edgeMat.uniforms.uKeyInt.value = p.lighting.key.intensity;
	}
	pushUniforms(mat, p, time, art) {
		const u = mat.uniforms;
		const h = p.holo;
		const d = p.diffraction;
		const ir = p.iridescence;
		const r = p.reflection;
		const m = p.material;
		const L = p.lighting;
		u.uTime.value = time;
		u.uQuality.value = p.quality === "ultra" ? 2 : p.quality === "high" ? 1 : 0;
		u.uCardSize.value.set(p.card.widthMm, p.card.heightMm);
		u.uCorner.value = p.card.cornerRadius;
		u.uBorder.value = p.card.borderThickness;
		u.uBorderStyle.value = BORDER_STYLE[p.card.borderStyle] ?? 0;
		u.uArtPos.value.set(art.posX, art.posY);
		u.uArtScale.value = art.scale;
		u.uArtRot.value = art.rotation;
		u.uArtOpacity.value = art.opacity;
		u.uArtBright.value = art.brightness;
		u.uArtContrast.value = art.contrast;
		u.uArtSat.value = art.saturation;
		u.uArtHue.value = art.hue;
		u.uArtGamma.value = art.gamma;
		u.uArtBlur.value = art.blur;
		u.uFit.value = art.fit === "fit" ? 1 : 0;
		u.uHoloInt.value = h.intensity;
		u.uHoloOp.value = h.opacity;
		u.uHoloDisp.value = h.spectralDispersion;
		u.uHoloRain.value = h.rainbowStrength;
		u.uHoloHue.value = h.hueShift;
		u.uHoloSat.value = h.saturation;
		u.uHoloCon.value = h.contrast;
		u.uHoloFreq.value = h.frequency;
		u.uHoloScale.value = h.scale;
		u.uHoloDir.value = h.direction;
		u.uHoloRot.value = h.rotation;
		u.uHoloDist.value = h.distortion;
		u.uHoloNoise.value = h.noise;
		u.uHoloTurb.value = h.turbulence;
		u.uHoloSharp.value = h.sharpness;
		u.uHoloAnim.value = h.animation + p.animation.holoAnim * (p.animation.playing ? 1 : 0);
		u.uHoloView.value = h.viewResponse;
		u.uHoloPattern.value = HOLO_PAT[h.pattern] ?? 0;
		u.uHoloMask.value = MASK_TYPE[h.mask] ?? 1;
		u.uHoloBlend.value = blendToFloat(h.blend);
		u.uGratFreq.value = d.frequency;
		u.uGratDens.value = d.density;
		u.uGratScale.value = d.scale;
		u.uGratAng.value = d.angle;
		u.uGratDir.value = d.direction;
		u.uGratDisp.value = d.spectralDispersion;
		u.uGratSpread.value = d.wavelengthSpread;
		u.uGratRain.value = d.rainbowIntensity;
		u.uGratHue.value = d.hueOffset;
		u.uGratCon.value = d.contrast;
		u.uGratSharp.value = d.sharpness;
		u.uGratDist.value = d.distortion;
		u.uGratPersp.value = d.perspective;
		u.uGratFall.value = d.falloff;
		u.uGratLight.value = d.lightInteraction;
		u.uGratPat.value = GRAT_PAT[d.pattern] ?? 0;
		u.uGratOp.value = d.opacity;
		u.uIriInt.value = ir.intensity;
		u.uIriView.value = ir.viewSensitivity;
		u.uIriHue.value = ir.hueRange;
		u.uIriSpread.value = ir.colorSpread;
		u.uIriSat.value = ir.saturation;
		u.uIriRough.value = ir.roughness;
		u.uMetallic.value = m.metallic;
		u.uFresnel.value = m.fresnel;
		u.uSpecular.value = m.specular;
		u.uClearcoat.value = m.clearcoat;
		u.uCcRough.value = m.clearcoatRoughness;
		u.uCloneN.value = r.cloneCount;
		u.uCloneSp.value = r.cloneSpacing;
		u.uCloneSc.value = r.cloneScale;
		u.uCloneRot.value = r.cloneRotation + (p.animation.playing ? p.animation.reflectionAnim * time * .15 : 0);
		u.uCloneOp.value = r.cloneOpacity;
		u.uReflAng.value = r.reflectionAngle;
		u.uReflBlur.value = r.reflectionBlur;
		u.uReflDist.value = r.reflectionDistortion;
		u.uMirrorAx.value = r.mirrorAxis;
		u.uHMirror.value = r.horizontalMirror ? 1 : 0;
		u.uVMirror.value = r.verticalMirror ? 1 : 0;
		u.uRadRefl.value = r.radialReflection ? 1 : 0;
		u.uKaleido.value = r.kaleidoscope ? 1 : 0;
		u.uKaleidoSeg.value = r.kaleidoSegments;
		u.uReflFall.value = r.falloff;
		u.uReflBlend.value = blendToFloat(r.blend);
		u.uGloss.value = m.gloss;
		u.uReflect.value = m.reflection;
		u.uRefract.value = m.refraction;
		u.uGrainAmt.value = m.grain;
		u.uBumpAmt.value = m.bumpStrength;
		u.uScratchAmt.value = m.scratches;
		u.uMicroScratch.value = m.microScratches;
		u.uMicroSurf.value = m.microSurface;
		u.uSurfDist.value = m.surfaceDistortion;
		u.uMatNoise.value = m.noise;
		let az = L.key.azimuth;
		let el = L.key.elevation;
		if (L.followMouse && !this.pointer.down) {
			az += this.pointer.x * .9;
			el += this.pointer.y * .45;
		}
		u.uKeyDir.value.copy(dirFromSpherical(az, el));
		u.uKeyCol.value.set(L.key.color);
		u.uKeyInt.value = L.key.enabled ? L.key.intensity : 0;
		u.uKeySoft.value = L.key.softness;
		u.uFillDir.value.copy(dirFromSpherical(L.fill.azimuth, L.fill.elevation));
		u.uFillCol.value.set(L.fill.color);
		u.uFillInt.value = L.fill.enabled ? L.fill.intensity : 0;
		u.uRimDir.value.copy(dirFromSpherical(L.rim.azimuth, L.rim.elevation));
		u.uRimCol.value.set(L.rim.color);
		u.uRimInt.value = L.rim.enabled ? L.rim.intensity : 0;
		u.uAmbCol.value.set(L.ambientColor);
		u.uAmbInt.value = L.ambientIntensity;
		u.uSpecLight.value = L.specularLight;
		u.uEnvInt.value = L.envIntensity;
		u.uShadow.value = L.shadowStrength;
		u.uEdgeCol.value.set(p.card.edgeColor);
		u.uEdgeMetal.value = p.card.edgeMetal;
		u.uBgCol.value.set(p.card.background);
		u.uLayerBase.value = layerOpacity(p, "base");
		u.uLayerArt.value = layerOpacity(p, "artwork");
		u.uLayerBorder.value = layerOpacity(p, "border");
		u.uLayerFoil.value = layerOpacity(p, "foil");
		u.uLayerDiff.value = layerOpacity(p, "diffraction");
		u.uLayerHolo.value = layerOpacity(p, "holographic");
		u.uLayerIri.value = layerOpacity(p, "iridescence");
		u.uLayerRefl.value = layerOpacity(p, "reflection");
		u.uLayerTex.value = layerOpacity(p, "texture");
		u.uLayerScratch.value = layerOpacity(p, "scratches");
		u.uLayerGloss.value = layerOpacity(p, "gloss");
		u.uLayerLight.value = layerOpacity(p, "lighting");
	}
	attachView(el) {
		this.viewCanvas = el;
		this.blitCtx = el.getContext("2d");
	}
	resize(w, h) {
		if (!this.webgl) return;
		const pw = Math.max(1, Math.floor(w));
		const ph = Math.max(1, Math.floor(h));
		this.renderer.setSize(pw, ph, false);
		this.camera.aspect = pw / ph;
		this.camera.updateProjectionMatrix();
		if (this.viewCanvas) {
			this.viewCanvas.width = pw;
			this.viewCanvas.height = ph;
		}
	}
	pointerMove(nx, ny, buttons) {
		if (buttons) {
			const dx = nx - this.pointer.lx;
			const dy = ny - this.pointer.ly;
			this.targetOrbit.y += dx * 2.6;
			this.targetOrbit.x += dy * 2.2;
			this.targetOrbit.x = Math.max(-1.15, Math.min(1.15, this.targetOrbit.x));
			this.pointer.down = true;
		} else this.pointer.down = false;
		this.pointer.x = nx;
		this.pointer.y = ny;
		this.pointer.lx = nx;
		this.pointer.ly = ny;
	}
	pointerUp() {
		this.pointer.down = false;
	}
	wheel(delta) {
		if (!this.project) return;
		const z = Math.max(.45, Math.min(2.4, this.project.camera.zoom * (delta > 0 ? .94 : 1.06)));
		this.project.camera.zoom = z;
	}
	resetView() {
		this.targetOrbit.x = -.18;
		this.targetOrbit.y = .32;
		this.orbit.x = -.18;
		this.orbit.y = .32;
		if (this.project) this.project.camera.zoom = 1;
	}
	flip() {
		this.targetOrbit.y += Math.PI;
	}
	start() {
		if (!this.webgl || this.running) return;
		this.running = true;
		this.clock.connect(document);
		this.frame();
		const loop = () => {
			if (!this.running) return;
			this.raf = requestAnimationFrame(loop);
			this.frame();
		};
		this.raf = requestAnimationFrame(loop);
	}
	stop() {
		this.running = false;
		cancelAnimationFrame(this.raf);
	}
	frame() {
		if (!this.webgl || !this.project) return;
		try {
			this.clock.update();
			const dt = Math.min(this.clock.getDelta(), .1);
			const p = this.project;
			this.orbit.x += (this.targetOrbit.x - this.orbit.x) * (1 - Math.exp(-10 * dt));
			this.orbit.y += (this.targetOrbit.y - this.orbit.y) * (1 - Math.exp(-10 * dt));
			if (p.lighting.followMouse && !this.pointer.down && !p.animation.playing) {
				this.tilt.x += (this.pointer.y * .22 - this.tilt.x) * (1 - Math.exp(-8 * dt));
				this.tilt.y += (this.pointer.x * .35 - this.tilt.y) * (1 - Math.exp(-8 * dt));
			} else {
				this.tilt.x += (0 - this.tilt.x) * (1 - Math.exp(-6 * dt));
				this.tilt.y += (0 - this.tilt.y) * (1 - Math.exp(-6 * dt));
			}
			let extraY = 0;
			let extraX = 0;
			let lightSweep = 0;
			if (p.animation.playing || p.animation.autoRotate) {
				this.animTime += dt;
				const T = Math.max(p.animation.duration, .1);
				const t = p.animation.loop ? this.animTime % T / T : Math.min(this.animTime / T, 1);
				const e = ease(t, p.animation.easing);
				const dir = p.animation.rotationDirection;
				if (p.animation.preset === "flip") extraY = (t < .5 ? e * 2 : 1 + ease((t - .5) * 2, p.animation.easing)) * Math.PI * dir;
				else if (p.animation.preset === "spin360") extraY = t * Math.PI * 2 * dir;
				else {
					extraY = Math.sin(e * Math.PI * 2) * .85 * p.animation.rotationSpeed * dir;
					extraX = Math.sin(e * Math.PI * 2 + .6) * p.animation.tilt;
				}
				lightSweep = Math.sin(t * Math.PI * 2) * p.animation.lightMove;
				const zoom = 1 + Math.sin(t * Math.PI * 2) * p.animation.zoomPulse * .12;
				this.camera.position.z = p.camera.distance / Math.max(p.camera.zoom, .2) / zoom;
				this.camera.position.x = Math.sin(t * Math.PI * 2) * p.animation.cameraMove * .15;
				this.camera.position.y = Math.cos(t * Math.PI * 2) * p.animation.cameraMove * .08;
				this.camera.lookAt(0, 0, 0);
			} else {
				this.camera.position.x = 0;
				this.camera.position.y = 0;
				this.camera.lookAt(0, 0, 0);
			}
			this.cardGroup.rotation.x = this.orbit.x + this.tilt.x + extraX;
			this.cardGroup.rotation.y = this.orbit.y + this.tilt.y + extraY;
			this.cardGroup.rotation.z = p.camera.rotZ;
			if (p.animation.playing) p.lighting.key.azimuth = .55 + lightSweep * 1.2;
			this.syncFromProject(p, this.animTime);
			this.renderer.render(this.scene, this.camera);
			if (this.blitCtx && this.viewCanvas) this.blitCtx.drawImage(this.canvas, 0, 0, this.viewCanvas.width, this.viewCanvas.height);
			this.fpsAccum += dt;
			this.fpsFrames++;
			if (this.fpsAccum >= .5) {
				this.fps = this.fpsFrames / this.fpsAccum;
				this.fpsAccum = 0;
				this.fpsFrames = 0;
				this.onFps?.(this.fps);
			}
		} catch (err) {
			console.error("[spectra] frame", err);
		}
	}
	/** Render one animation sample at normalized time 0..1 for export. */
	renderAt(normT, width, height, transparent) {
		if (!this.webgl || !this.project) return;
		const p = this.project;
		const t = (normT % 1 + 1) % 1;
		const e = ease(t, p.animation.easing);
		const dir = p.animation.rotationDirection;
		let extraY = 0;
		let extraX = 0;
		if (p.animation.preset === "flip") extraY = (t < .5 ? e * 2 : 1 + ease((t - .5) * 2, p.animation.easing)) * Math.PI * dir;
		else if (p.animation.preset === "spin360") extraY = t * Math.PI * 2 * dir;
		else {
			extraY = Math.sin(e * Math.PI * 2) * .85 * p.animation.rotationSpeed * dir;
			extraX = Math.sin(e * Math.PI * 2 + .6) * p.animation.tilt;
		}
		this.cardGroup.rotation.x = this.orbit.x + extraX;
		this.cardGroup.rotation.y = this.orbit.y + extraY;
		p.lighting.key.azimuth = .55 + Math.sin(t * Math.PI * 2) * p.animation.lightMove * 1.2;
		this.syncFromProject(p, t * p.animation.duration);
		this.exportMode = true;
		this.renderer.setPixelRatio(1);
		this.renderer.setSize(width, height, false);
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
		this.renderer.setClearColor(0, transparent ? 0 : 1);
		this.renderer.render(this.scene, this.camera);
		if (this.blitCtx && this.viewCanvas) this.blitCtx.drawImage(this.canvas, 0, 0, this.viewCanvas.width, this.viewCanvas.height);
	}
	capturePng(width, height, transparent) {
		return new Promise((resolve, reject) => {
			try {
				this.renderAt(.08, width, height, transparent);
				this.canvas.toBlob((b) => b ? resolve(b) : reject(/* @__PURE__ */ new Error("PNG encode failed")), "image/png");
			} catch (err) {
				reject(err);
			}
		});
	}
	readPixels(width, height) {
		const gl = this.renderer.getContext();
		const buf = new Uint8Array(width * height * 4);
		gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, buf);
		const out = new Uint8ClampedArray(width * height * 4);
		const row = width * 4;
		for (let y = 0; y < height; y++) out.set(buf.subarray((height - 1 - y) * row, (height - y) * row), y * row);
		return out;
	}
	restoreView(w, h) {
		this.exportMode = false;
		this.resize(w, h);
		this.renderer.setClearColor(0, 0);
	}
	onLost = (e) => {
		e.preventDefault();
		this.lost = true;
		this.stop();
	};
	onRestored = () => {
		this.lost = false;
		this.start();
	};
	dispose() {
		this.stop();
		if (!this.webgl) return;
		this.canvas.removeEventListener("webglcontextlost", this.onLost);
		this.canvas.removeEventListener("webglcontextrestored", this.onRestored);
		this.frontMat.dispose();
		this.backMat.dispose();
		this.edgeMat.dispose();
		this.bgMat.dispose();
		this.frontMesh.geometry.dispose();
		this.edgeMesh.geometry.dispose();
		this.renderer.dispose();
	}
};
function ease(t, name) {
	t = Math.min(1, Math.max(0, t));
	switch (name) {
		case "linear": return t;
		case "easeIn": return t * t;
		case "easeOut": return 1 - (1 - t) * (1 - t);
		case "easeInOut": return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
		case "cubic": return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
		case "smoothstep": return t * t * (3 - 2 * t);
		default: return t;
	}
}
/** Procedural surface maps: grain, scratches, foil, bump, noise, masks. */
function makeCanvas(w, h) {
	const c = document.createElement("canvas");
	c.width = w;
	c.height = h;
	const ctx = c.getContext("2d", { willReadFrequently: true });
	if (!ctx) throw new Error("2D context unavailable");
	return {
		c,
		ctx
	};
}
function hash(i, j) {
	const n = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
	return n - Math.floor(n);
}
function makeGrain(w = 512, h = 512) {
	const { c, ctx } = makeCanvas(w, h);
	const img = ctx.createImageData(w, h);
	for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
		const n = hash(x, y) * 255 | 0;
		const i = (y * w + x) * 4;
		img.data[i] = n;
		img.data[i + 1] = n;
		img.data[i + 2] = n;
		img.data[i + 3] = 255;
	}
	ctx.putImageData(img, 0, 0);
	return c;
}
function makeScratches(w = 1024, h = 1024) {
	const { c, ctx } = makeCanvas(w, h);
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "rgba(255,255,255,0.55)";
	for (let i = 0; i < 90; i++) {
		ctx.globalAlpha = .08 + hash(i, 2) * .35;
		ctx.lineWidth = .4 + hash(i, 3) * 1.4;
		const x = hash(i, 4) * w;
		const y = hash(i, 5) * h;
		const len = 40 + hash(i, 6) * 380;
		const a = (hash(i, 7) - .5) * .5;
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
		ctx.stroke();
	}
	for (let i = 0; i < 40; i++) {
		ctx.globalAlpha = .04 + hash(i, 9) * .12;
		ctx.lineWidth = .3;
		const y = hash(i, 10) * h;
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.bezierCurveTo(w * .3, y + 8, w * .6, y - 10, w, y + 4);
		ctx.stroke();
	}
	ctx.globalAlpha = 1;
	return c;
}
function makeFoil(w = 512, h = 512) {
	const { c, ctx } = makeCanvas(w, h);
	const img = ctx.createImageData(w, h);
	for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
		const n = hash(x * .35, y * .35);
		const m = hash(x * .08 + 3, y * .08);
		const v = Math.pow(n * .7 + m * .3, 1.4);
		const i = (y * w + x) * 4;
		img.data[i] = 180 + v * 75;
		img.data[i + 1] = 190 + v * 65;
		img.data[i + 2] = 205 + v * 50;
		img.data[i + 3] = 255;
	}
	ctx.putImageData(img, 0, 0);
	return c;
}
function makeBump(w = 512, h = 512) {
	const { c, ctx } = makeCanvas(w, h);
	const img = ctx.createImageData(w, h);
	for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
		const n = (hash(x * .2, y * .2) * .5 + hash(x * .05, y * .05) * .35 + hash(x, y) * .15) * 255 | 0;
		const i = (y * w + x) * 4;
		img.data[i] = n;
		img.data[i + 1] = n;
		img.data[i + 2] = n;
		img.data[i + 3] = 255;
	}
	ctx.putImageData(img, 0, 0);
	return c;
}
function loadImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onload = () => {
			const c = document.createElement("canvas");
			c.width = img.naturalWidth || img.width;
			c.height = img.naturalHeight || img.height;
			const ctx = c.getContext("2d");
			if (!ctx) {
				reject(/* @__PURE__ */ new Error("2D context failed"));
				return;
			}
			ctx.drawImage(img, 0, 0);
			resolve(c);
		};
		img.onerror = () => reject(/* @__PURE__ */ new Error("Image decode failed"));
		img.src = src;
	});
}
function Viewport({ rendererRef }) {
	const wrapRef = (0, import_react.useRef)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const webglOk = useStudio((s) => s.webglOk);
	const frontSrc = useStudio((s) => s.front.src);
	const backSrc = useStudio((s) => s.back.src);
	const readyRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
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
				const front = state.front.src ? await loadImage(state.front.src) : generateFrontArt("aurora", 768, 1072);
				const back = state.back.src ? await loadImage(state.back.src) : generateBackArt(768, 1072);
				if (cancelled) return;
				renderer.setMaps({
					front,
					back,
					scratch,
					grain,
					foil,
					bump
				});
				readyRef.current = true;
				if (!state.front.src || !state.back.src) {
					const f = front.toDataURL("image/jpeg", .82);
					const b = back.toDataURL("image/jpeg", .82);
					if (cancelled) return;
					useStudio.setState({
						front: {
							...useStudio.getState().front,
							src: f
						},
						back: {
							...useStudio.getState().back,
							src: b
						}
					});
				}
			} catch (e) {
				if (!cancelled) setError(e instanceof Error ? e.message : "Could not initialize artwork");
			}
		})();
		const unsub = useStudio.subscribe(() => {
			renderer.setProject(useStudio.getState().asProject());
		});
		const onMove = (e) => {
			const rec = wrap.getBoundingClientRect();
			const nx = (e.clientX - rec.left) / rec.width * 2 - 1;
			const ny = -((e.clientY - rec.top) / rec.height * 2 - 1);
			renderer.pointerMove(nx, ny, e.buttons);
		};
		const onUp = () => renderer.pointerUp();
		const onWheel = (e) => {
			e.preventDefault();
			renderer.wheel(e.deltaY);
			const z = rendererRef.current ? useStudio.getState().camera.zoom : 1;
			useStudio.setState((s) => ({ camera: {
				...s.camera,
				zoom: z
			} }));
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
	(0, import_react.useEffect)(() => {
		const renderer = rendererRef.current;
		if (!renderer?.webgl || !readyRef.current) return;
		let cancelled = false;
		(async () => {
			try {
				const maps = {};
				if (frontSrc) maps.front = await loadImage(frontSrc);
				if (backSrc) maps.back = await loadImage(backSrc);
				if (!cancelled) renderer.setMaps(maps);
			} catch (e) {
				if (!cancelled) useStudio.setState({ toast: e instanceof Error ? e.message : "Artwork failed to apply" });
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [
		frontSrc,
		backSrc,
		rendererRef
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapRef,
		className: "relative min-h-0 min-w-0 flex-1 touch-none bg-bg",
		style: { touchAction: "none" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				className: "holo-canvas pointer-events-none hidden",
				"aria-hidden": "true"
			}),
			!webglOk || error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 grid place-items-center bg-bg px-6 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-fg",
					children: "Preview unavailable"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-sm text-xs text-muted",
					children: error ?? "WebGL context was lost. Reload the studio to restore the holographic engine."
				})] })
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute bottom-3 left-3 text-[10px] tracking-[0.18em] text-subtle uppercase",
				children: "Drag to orbit · Scroll to zoom · Move to light"
			})
		]
	});
}
function yieldFrame() {
	return new Promise((r) => requestAnimationFrame(() => r()));
}
async function loadGifenc() {
	const mod = await import("../_libs/gifenc.mjs").then((n) => n.t);
	const src = (mod.GIFEncoder ? mod : mod.default) ?? mod;
	return {
		GIFEncoder: src.GIFEncoder,
		quantize: src.quantize,
		applyPalette: src.applyPalette
	};
}
async function exportStill(renderer, settings, viewW, viewH, onProgress) {
	onProgress(5, "Rendering");
	const res = settings.resolution;
	const aspect = 63 / 88;
	const h = res;
	const w = Math.round(res * aspect);
	const transparent = settings.transparent || settings.background === "transparent";
	renderer.renderAt(.12, w, h, transparent);
	onProgress(70, "Encoding");
	const mime = settings.format === "jpg" ? "image/jpeg" : settings.format === "webp" ? "image/webp" : "image/png";
	const blob = await new Promise((resolve, reject) => {
		renderer.canvas.toBlob((b) => b ? resolve(b) : reject(/* @__PURE__ */ new Error("Encode failed")), mime, settings.quality);
	});
	renderer.restoreView(viewW, viewH);
	downloadBlob(blob, `spectra-card.${settings.format === "jpg" ? "jpg" : settings.format === "webp" ? "webp" : "png"}`);
	onProgress(100, "Done");
}
async function exportGif(renderer, settings, viewW, viewH, onProgress) {
	const { GIFEncoder, quantize, applyPalette } = await loadGifenc();
	const res = Math.min(settings.resolution, 720);
	const aspect = 63 / 88;
	const h = res;
	const w = Math.round(res * aspect);
	const fps = Math.max(6, Math.min(settings.fps, 20));
	const duration = Math.max(.5, Math.min(settings.duration, 8));
	const frames = Math.max(4, Math.round(fps * duration));
	const delay = Math.round(1e3 / fps);
	const transparent = settings.background === "transparent";
	const gif = GIFEncoder();
	let palette = null;
	for (let i = 0; i < frames; i++) {
		onProgress(Math.round(i / frames * 90), `Frame ${i + 1} / ${frames}`);
		renderer.renderAt(i / frames, w, h, transparent);
		const rgba = renderer.readPixels(w, h);
		if (!palette) palette = quantize(rgba, settings.quality > .7 ? 256 : 128, { format: "rgba4444" });
		const index = applyPalette(rgba, palette);
		gif.writeFrame(index, w, h, {
			palette,
			delay,
			repeat: i === 0 ? settings.loop ? 0 : -1 : void 0
		});
		await yieldFrame();
	}
	gif.finish();
	renderer.restoreView(viewW, viewH);
	const bytes = gif.bytes();
	const copy = new Uint8Array(bytes.byteLength);
	copy.set(bytes);
	downloadBlob(new Blob([copy], { type: "image/gif" }), "spectra-card.gif");
	onProgress(100, "Done");
}
async function exportVideo(renderer, settings, viewW, viewH, onProgress) {
	const res = Math.min(settings.resolution, 1080);
	const aspect = 63 / 88;
	const h = res;
	const w = Math.round(res * aspect) & -2;
	const fps = Math.max(12, Math.min(settings.fps, 30));
	const duration = Math.max(1, Math.min(settings.duration, 12));
	const transparent = false;
	const mime = [
		"video/webm;codecs=vp9",
		"video/webm;codecs=vp8",
		"video/webm",
		"video/mp4"
	].find((m) => {
		try {
			return typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(m);
		} catch {
			return false;
		}
	});
	if (!mime || typeof MediaRecorder === "undefined") throw new Error("Video recording is not supported in this browser. Export a GIF instead.");
	renderer.renderAt(0, w, h, transparent);
	const stream = renderer.canvas.captureStream(fps);
	const rec = new MediaRecorder(stream, {
		mimeType: mime,
		videoBitsPerSecond: settings.bitrate
	});
	const chunks = [];
	rec.ondataavailable = (e) => {
		if (e.data.size) chunks.push(e.data);
	};
	const done = new Promise((resolve, reject) => {
		rec.onstop = () => resolve(new Blob(chunks, { type: mime.split(";")[0] }));
		rec.onerror = () => reject(/* @__PURE__ */ new Error("Recording failed"));
	});
	rec.start();
	const frames = Math.round(fps * duration);
	for (let i = 0; i < frames; i++) {
		onProgress(Math.round(i / frames * 90), `Recording ${i + 1} / ${frames}`);
		renderer.renderAt(i / frames, w, h, transparent);
		await yieldFrame();
	}
	rec.stop();
	const blob = await done;
	renderer.restoreView(viewW, viewH);
	downloadBlob(blob, `spectra-card.${mime.includes("mp4") ? "mp4" : "webm"}`);
	onProgress(100, "Done");
}
async function runExport(renderer, settings, viewW, viewH, onProgress) {
	if (settings.format === "gif") return exportGif(renderer, settings, viewW, viewH, onProgress);
	if (settings.format === "webm" || settings.format === "mp4") return exportVideo(renderer, settings, viewW, viewH, onProgress);
	return exportStill(renderer, settings, viewW, viewH, onProgress);
}
function ExportDialog({ rendererRef }) {
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
		const rec = renderer.renderer.domElement.parentElement?.getBoundingClientRect();
		const vw = rec?.width ?? 800;
		const vh = rec?.height ?? 800;
		useStudio.setState({
			exporting: true,
			exportProgress: 0,
			exportError: null
		});
		try {
			await runExport(renderer, exp, vw, vh, (pct, label) => {
				useStudio.setState({
					exportProgress: pct,
					toast: label
				});
			});
			useStudio.setState({
				toast: "Export complete",
				exportOpen: false
			});
		} catch (e) {
			useStudio.setState({ exportError: e instanceof Error ? e.message : "Export failed" });
		} finally {
			useStudio.setState({
				exporting: false,
				exportProgress: 0
			});
		}
	};
	const est = exp.format === "gif" ? Math.round(exp.resolution / 512 * exp.duration * exp.fps * 18) : exp.format === "webm" || exp.format === "mp4" ? Math.round(exp.bitrate * exp.duration * 125e-6) : Math.round(exp.resolution * exp.resolution * 63 / 88 / 900);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => useStudio.setState({ exportOpen: v }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-bg/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "fixed top-1/2 left-1/2 z-50 w-[min(92vw,440px)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-surface p-4 shadow-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-sm font-medium tracking-wide text-fg",
					children: "Export"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					className: "rounded-sm p-1 text-muted hover:text-fg",
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectRow, {
						label: "Format",
						value: exp.format,
						options: [
							{
								id: "png",
								name: "PNG still"
							},
							{
								id: "jpg",
								name: "JPG still"
							},
							{
								id: "webp",
								name: "WebP still"
							},
							{
								id: "gif",
								name: "GIF animation"
							},
							{
								id: "webm",
								name: "WebM video"
							},
							{
								id: "mp4",
								name: "MP4 video (if supported)"
							}
						],
						onChange: (v) => useStudio.getState().setExport({ format: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectRow, {
						label: "Resolution",
						value: String(exp.resolution),
						options: [
							{
								id: "512",
								name: "512"
							},
							{
								id: "1024",
								name: "1024"
							},
							{
								id: "2048",
								name: "2048"
							},
							{
								id: "4096",
								name: "4096 (stills)"
							}
						],
						onChange: (v) => useStudio.getState().setExport({ resolution: Number(v) })
					}),
					(exp.format === "gif" || exp.format === "webm" || exp.format === "mp4") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
							label: "FPS",
							value: exp.fps,
							min: 8,
							max: 30,
							step: 1,
							onChange: (v) => useStudio.getState().setExport({ fps: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
							label: "Duration (s)",
							value: exp.duration,
							min: 1,
							max: 10,
							step: .5,
							onChange: (v) => useStudio.getState().setExport({ duration: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
							label: "Loop",
							checked: exp.loop,
							onChange: (v) => useStudio.getState().setExport({ loop: v })
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectRow, {
						label: "Background",
						value: exp.background,
						options: [
							{
								id: "studio",
								name: "Studio"
							},
							{
								id: "solid",
								name: "Solid"
							},
							{
								id: "transparent",
								name: "Transparent (PNG/GIF)"
							}
						],
						onChange: (v) => useStudio.getState().setExport({
							background: v,
							transparent: v === "transparent"
						})
					}),
					exp.background === "solid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorRow, {
						label: "Solid color",
						value: exp.solidColor,
						onChange: (v) => useStudio.getState().setExport({ solidColor: v })
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Shadow",
						checked: exp.shadow,
						onChange: (v) => useStudio.getState().setExport({ shadow: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
						label: "Quality",
						value: exp.quality,
						min: .4,
						max: 1,
						onChange: (v) => useStudio.getState().setExport({ quality: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-subtle",
						children: [
							"Estimated size ~",
							est,
							" KB. Animation export captures the card only, not the UI. GIF is limited to ~720px for memory. Video uses the browser MediaRecorder API."
						]
					}),
					err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-danger",
						children: err
					}) : null,
					exporting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1 overflow-hidden rounded-full bg-elevated",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-accent transition-[width] duration-150",
							style: { width: `${progress}%` }
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
						onClick: () => void start(),
						disabled: exporting,
						children: exporting ? `Exporting ${progress}%` : "Render & download"
					})
				]
			})]
		})] })
	});
}
function StudioApp() {
	const rendererRef = (0, import_react.useRef)(null);
	const toast = useStudio((s) => s.toast);
	const [left, setLeft] = (0, import_react.useState)(false);
	const [right, setRight] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let alive = true;
		loadProject().then((p) => {
			if (alive && p) {
				useStudio.getState().loadProject(p, false);
				useStudio.setState({
					hydrated: true,
					toast: "Restored last project"
				});
			} else useStudio.setState({ hydrated: true });
		}).catch(() => useStudio.setState({ hydrated: true }));
		return () => {
			alive = false;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		let t;
		const unsub = useStudio.subscribe(() => {
			clearTimeout(t);
			t = setTimeout(() => {
				saveProject(useStudio.getState().asProject()).catch(() => {});
			}, 1600);
		});
		return () => {
			unsub();
			clearTimeout(t);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!toast) return;
		const t = setTimeout(() => useStudio.getState().setToast(null), 2400);
		return () => clearTimeout(t);
	}, [toast]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const meta = e.metaKey || e.ctrlKey;
			if (meta && e.key.toLowerCase() === "z") {
				e.preventDefault();
				if (e.shiftKey) useStudio.getState().redo();
				else useStudio.getState().undo();
			}
			if (meta && e.key.toLowerCase() === "s") {
				e.preventDefault();
				saveProject(useStudio.getState().asProject()).then(() => useStudio.getState().setToast("Saved"));
			}
			if (meta && e.key.toLowerCase() === "e") {
				e.preventDefault();
				useStudio.setState({ exportOpen: true });
			}
			if (e.code === "Space" && e.target.tagName !== "INPUT") {
				e.preventDefault();
				const playing = useStudio.getState().animation.playing;
				useStudio.getState().setAnim({ playing: !playing });
			}
			if (e.key.toLowerCase() === "f" && !meta) rendererRef.current?.flip();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
		delayDuration: 250,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-dvh flex-col overflow-hidden bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex min-h-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden h-full md:flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeftPanel, {})
						}),
						left ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-0 z-30 md:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "absolute inset-0 bg-bg/70",
								"aria-label": "Close library",
								onClick: () => setLeft(false)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative h-full w-72 max-w-[85vw] shadow-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeftPanel, {})
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex min-w-0 flex-1 flex-col",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pointer-events-none absolute top-2 left-2 z-20 flex gap-1 md:hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "pointer-events-auto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
											label: "Toggle library",
											onClick: () => setLeft((v) => !v),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeft, { className: "size-3.5" })
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pointer-events-none absolute top-2 right-2 z-20 flex gap-1 md:hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "pointer-events-auto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
											label: "Toggle inspector",
											onClick: () => setRight((v) => !v),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelRight, { className: "size-3.5" })
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, { rendererRef })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden h-full md:flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RightPanel, {})
						}),
						right ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-0 z-30 flex justify-end md:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "absolute inset-0 bg-bg/70",
								"aria-label": "Close inspector",
								onClick: () => setRight(false)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative h-full w-80 max-w-[90vw] shadow-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RightPanel, {})
							})]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomBar, { rendererRef }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportDialog, { rendererRef }),
				toast ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none fixed bottom-16 left-1/2 z-50 -translate-x-1/2 rounded-sm bg-elevated px-3 py-1.5 text-xs text-fg shadow-border",
					children: toast
				}) : null
			]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioApp, {});
}
//#endregion
export { Home as component };
