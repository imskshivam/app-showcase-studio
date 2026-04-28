import { U as jsxRuntimeExports, r as reactExports } from "./worker-entry-CHlHWJTC.js";
import { L as Link } from "./router--lziPub5.js";
import { c as createLucideIcon, X, M as Menu, C as Check, P as Plus, S as Smartphone, L as Layers, D as Download, T as Type, I as Image } from "./x-BqHYml6w.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$3 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
      key: "ul74o6"
    }
  ],
  ["path", { d: "m14 7 3 3", key: "1r5n42" }],
  ["path", { d: "M5 6v4", key: "ilb8ba" }],
  ["path", { d: "M19 14v4", key: "blhpug" }],
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M7 8H3", key: "zfb6yr" }],
  ["path", { d: "M21 16h-4", key: "1cnmox" }],
  ["path", { d: "M11 3H9", key: "1obp7u" }]
];
const WandSparkles = createLucideIcon("wand-sparkles", __iconNode);
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[100dvh] bg-[#0a0a0a] text-white antialiased overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Marquee, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Product, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Features, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Showcase, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FAQ, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Nav() {
  const [open, setOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-xl bg-[#0a0a0a]/70 border-b border-white/5" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogoMark, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold tracking-tight", children: "Markva" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-8 text-sm text-white/70", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#product", className: "hover:text-white transition", children: "Product" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#features", className: "hover:text-white transition", children: "Features" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#showcase", className: "hover:text-white transition", children: "Showcase" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#faq", className: "hover:text-white transition", children: "FAQ" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/editor", className: "group inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition", children: [
        "Open Studio",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": "Menu", onClick: () => setOpen((v) => !v), className: "md:hidden h-10 w-10 grid place-items-center rounded-full border border-white/10", children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden border-t border-white/5 bg-[#0a0a0a]/95 backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col px-5 py-4 gap-4 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#product", onClick: () => setOpen(false), children: "Product" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#features", onClick: () => setOpen(false), children: "Features" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#showcase", onClick: () => setOpen(false), children: "Showcase" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#faq", onClick: () => setOpen(false), children: "FAQ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/editor", className: "mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground", children: [
        "Open Studio ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4" })
      ] })
    ] }) })
  ] });
}
function LogoMark() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-flex h-7 w-7 items-center justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-full bg-primary/20 blur-md" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative h-7 w-7 rounded-full bg-gradient-to-br from-primary to-primary/40 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-[#0a0a0a]" }) })
  ] });
}
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative isolate overflow-hidden pt-32 pb-24 md:pt-44 md:pb-36", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ParticleField, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GradientGlow, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-6xl px-5 md:px-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 animate-fade-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-primary" })
        ] }),
        "AI-crafted · Built for App Store & Play Store"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-8 text-balance font-display text-5xl md:text-7xl lg:text-[5.75rem] leading-[0.95] tracking-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-white/95", children: "Screenshots that" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-primary via-primary to-white bg-clip-text text-transparent", children: "sell your app." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-7 max-w-2xl text-base md:text-lg text-white/60 leading-relaxed", children: "Markva is the modern studio for store screenshots. Designed with the craft of an AI atelier — drag, type, frame, export. No designer required." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-col sm:flex-row items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/editor", className: "group relative inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:scale-[1.02] transition-transform", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-full bg-primary blur-xl opacity-40 group-hover:opacity-60 transition" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative", children: "Launch the Studio" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "relative h-4 w-4 transition-transform group-hover:translate-x-0.5" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#product", className: "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white/80 hover:bg-white/10 transition", children: "See the product" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeroPreview, {})
    ] })
  ] });
}
function ParticleField() {
  const dots = Array.from({
    length: 60
  }).map((_, i) => {
    const seed = i * 9301 + 49297;
    const x = seed % 100 + i * 37 % 50 / 50;
    const y = seed * 7 % 100;
    const size = i * 13 % 3 + 1;
    const delay = i % 10 * 0.4;
    return {
      x,
      y,
      size,
      delay,
      i
    };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 -z-10", children: dots.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute rounded-full bg-primary/60 animate-pulse", style: {
    left: `${d.x}%`,
    top: `${d.y}%`,
    width: d.size,
    height: d.size,
    opacity: 0.35,
    animationDelay: `${d.delay}s`,
    animationDuration: `${3 + d.i % 4}s`
  } }, d.i)) });
}
function GradientGlow() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute -top-40 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-3xl", style: {
      background: "radial-gradient(closest-side, var(--primary) 0%, transparent 70%)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-0 -z-20", style: {
      backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
      backgroundSize: "32px 32px",
      maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)"
    } })
  ] });
}
function HeroPreview() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-20 mx-auto max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[3rem] bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-2xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-4 md:p-8 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 md:gap-6 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneMock, { variant: "left" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneMock, { variant: "center" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneMock, { variant: "right" })
    ] }) })
  ] });
}
function PhoneMock({
  variant
}) {
  const tilt = variant === "left" ? "md:-rotate-6 md:translate-y-6" : variant === "right" ? "md:rotate-6 md:translate-y-6" : "";
  const headlines = {
    left: "Fast.",
    center: "Beautiful.",
    right: "Yours."
  };
  const sub = {
    left: "Frame in seconds",
    center: "Pixel-perfect studio",
    right: "Export instantly"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `group relative ${tilt} transition-transform duration-700 hover:-translate-y-2`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[9/19] rounded-[1.6rem] md:rounded-[2rem] border border-white/15 bg-gradient-to-br from-[#111] to-[#0a0a0a] p-2 shadow-2xl shadow-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full w-full overflow-hidden rounded-[1.2rem] md:rounded-[1.6rem] bg-gradient-to-br from-[#0d2818] via-[#0a0a0a] to-[#0a0a0a]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 top-2 h-3 w-12 -translate-x-1/2 rounded-full bg-black/80" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-end p-4 md:p-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-10 left-0 right-0 px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] md:text-xs text-primary/80 uppercase tracking-[0.25em]", children: "Markva" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 text-xl md:text-3xl font-display font-semibold leading-tight", children: headlines[variant] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10px] md:text-xs text-white/50", children: sub[variant] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-7 rounded-md bg-gradient-to-br from-primary to-primary/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-16 rounded-full bg-white/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-1.5 w-10 rounded-full bg-white/15" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-x-10 top-0 h-40 bg-gradient-to-b from-primary/20 to-transparent blur-2xl" }) })
  ] }) }) });
}
function Marquee() {
  const items = ["iOS Frames", "Android Frames", "3D Depth", "Kinetic Text", "Custom Sizes", "Instant PNG", "Drag & Drop", "Studio-grade"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-white/5 py-6 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-12 whitespace-nowrap animate-[marquee_30s_linear_infinite]", children: [...items, ...items, ...items].map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-white/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary/60" }),
    t
  ] }, i)) }) });
}
function Product() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "product", className: "relative py-24 md:py-36", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-5 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-12 gap-10 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-primary/80", children: "The Product" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 text-4xl md:text-6xl font-display tracking-tight leading-[1]", children: [
        "Markva ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "Studio" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-white/60 leading-relaxed max-w-md", children: "A focused canvas built for one job — making your app look unforgettable on the App Store and Play Store. Drag layers, swap devices, type kinetic headlines, export to any pixel size." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-8 space-y-3 text-sm text-white/70", children: ["iOS & Android device frames", "Custom px × px export sizes", "Draggable text & image layers", "Instant PNG export"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-5 w-5 place-items-center rounded-full bg-primary/15 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) }),
        t
      ] }, t)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/editor", className: "group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:scale-[1.02] transition-transform", children: [
          "Open the Studio",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/40", children: "Free to use · No signup" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, {}) })
  ] }) }) });
}
function ProductCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/editor", className: "group block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f1a14] via-[#0a0a0a] to-[#0a0a0a] p-6 md:p-10 transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_60px_-15px_rgba(120,220,80,0.3)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none", style: {
      background: "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(160,230,90,0.08), transparent 40%)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-11 w-11 rounded-xl bg-gradient-to-br from-primary to-primary/30 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: "Markva Studio" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/50", children: "Screenshot generator · v1" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 transition-transform group-hover:rotate-45", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MiniSpec, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-4 w-4" }), label: "Devices", value: "iOS · Android" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MiniSpec, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4" }), label: "Layers", value: "Text + Image" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MiniSpec, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "h-4 w-4" }), label: "Effects", value: "3D Depth" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MiniSpec, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }), label: "Export", value: "PNG · custom px" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center justify-between text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/50", children: "Click anywhere on this card to launch →" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: "Live" })
    ] })
  ] }) });
}
function MiniSpec({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/8 bg-white/[0.02] p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-white/50 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: icon }),
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm font-medium", children: value })
  ] });
}
function Features() {
  const items = [{
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-5 w-5" }),
    title: "Real device frames",
    desc: "Pixel-accurate iOS and Android frames with proper bezels and notches."
  }, {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "h-5 w-5" }),
    title: "Kinetic typography",
    desc: "Type that reads like a campaign. Multiple fonts, weights, gradients."
  }, {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-5 w-5" }),
    title: "Drag any layer",
    desc: "Move, scale, rotate. Your canvas behaves like a pro design tool."
  }, {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "h-5 w-5" }),
    title: "3D depth presets",
    desc: "One-click perspective, tilt, and depth — instantly cinematic."
  }, {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-5 w-5" }),
    title: "Custom px sizes",
    desc: "Any width × height in pixels. Built for every store spec."
  }, {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-5 w-5" }),
    title: "Instant PNG export",
    desc: "Hi-res, transparent-ready, ready to upload. Zero friction."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "features", className: "py-24 md:py-32 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-5 md:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-primary/80", children: "Features" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 text-4xl md:text-6xl font-display tracking-tight leading-[1]", children: [
        "Studio-grade, ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "made simple." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden", children: items.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureCell, { ...f }, i)) })
  ] }) });
}
function FeatureCell({
  icon,
  title,
  desc
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative bg-[#0a0a0a] p-8 transition-colors hover:bg-[#0d100c]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-lg font-semibold", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-white/55 leading-relaxed", children: desc }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" })
  ] });
}
function Showcase() {
  const tiles = [{
    tag: "Onboarding",
    color: "from-emerald-400/30 to-emerald-900/10"
  }, {
    tag: "Hero shot",
    color: "from-lime-300/30 to-lime-900/10"
  }, {
    tag: "Feature",
    color: "from-teal-300/25 to-teal-900/10"
  }, {
    tag: "Compare",
    color: "from-green-300/30 to-green-900/10"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "showcase", className: "py-24 md:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-5 md:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between flex-wrap gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-primary/80", children: "Showcase" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 text-4xl md:text-6xl font-display tracking-tight leading-[1]", children: [
          "Crafted for every ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "story." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/editor", className: "inline-flex items-center gap-2 text-sm text-white/70 hover:text-white", children: [
        "Try a template ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4", children: tiles.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `group relative aspect-[3/4] rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br ${t.color}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-[55%] aspect-[9/19] rounded-2xl border border-white/20 bg-[#0a0a0a] p-1.5 transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full rounded-xl bg-gradient-to-br from-white/10 to-white/0" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-4 right-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/70", children: t.tag }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-7 w-7 place-items-center rounded-full bg-white/10 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }) })
      ] })
    ] }, i)) })
  ] }) });
}
function FAQ() {
  const items = [{
    q: "What is Markva?",
    a: "Markva is an AI-grade studio for designing App Store and Play Store screenshots. Drag layers, swap device frames, write headlines, and export production-ready PNGs."
  }, {
    q: "Do I need a design background?",
    a: "Not at all. Markva gives you sensible defaults, snapping, and presets so anyone can produce store-ready shots in minutes."
  }, {
    q: "Can I export at any pixel size?",
    a: "Yes. Pick a preset for the App Store and Play Store, or type a custom width × height in pixels."
  }, {
    q: "Is it free?",
    a: "Markva is free to use. Open the Studio and start designing — no signup required."
  }];
  const [open, setOpen] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "faq", className: "py-24 md:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-5 md:px-8 grid lg:grid-cols-12 gap-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-primary/80", children: "FAQ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 text-4xl md:text-6xl font-display tracking-tight leading-[1]", children: [
        "Questions, ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "answered." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-white/55 max-w-sm", children: "Everything you need to know before launching the Studio." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-7 divide-y divide-white/5 border-y border-white/5", children: items.map((it, i) => {
      const isOpen = open === i;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(isOpen ? null : i), className: "w-full text-left py-6 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base md:text-lg font-medium", children: it.q }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 transition-transform ${isOpen ? "rotate-45 bg-primary text-primary-foreground border-primary" : "bg-white/5"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/55 leading-relaxed max-w-xl", children: it.a }) }) })
      ] }, i);
    }) })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-white/5 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-5 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LogoMark, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Markva" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-3 text-xs text-white/40", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear()
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 text-sm text-white/55", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#product", className: "hover:text-white", children: "Product" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#features", className: "hover:text-white", children: "Features" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#faq", className: "hover:text-white", children: "FAQ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/editor", className: "text-primary hover:opacity-80", children: "Open Studio →" })
    ] })
  ] }) });
}
export {
  Home as component
};
