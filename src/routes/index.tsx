import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Smartphone,
  Layers,
  Wand2,
  Download,
  Type,
  Image as ImageIcon,
  Check,
  Plus,
  Menu,
  X,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "ShotForge — AI-crafted App Store screenshots in minutes" },
      {
        name: "description",
        content:
          "ShotForge is the modern studio for App Store & Play Store screenshots. Designed with AI-grade craft, exported in seconds.",
      },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { property: "og:title", content: "ShotForge — AI-crafted App Store screenshots" },
      {
        property: "og:description",
        content:
          "Design beautiful screenshots with iOS & Android frames, 3D depth, kinetic text, and one-click export.",
      },
    ],
  }),
});

function Home() {
  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] text-white antialiased overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <Product />
      <Features />
      <Showcase />
      <FAQ />
      <Footer />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-[#0a0a0a]/70 border-b border-white/5" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <LogoMark />
          <span className="font-semibold tracking-tight">ShotForge</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#product" className="hover:text-white transition">Product</a>
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#showcase" className="hover:text-white transition">Showcase</a>
          <a href="#faq" className="hover:text-white transition">FAQ</a>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/editor"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
          >
            Open Studio
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden h-10 w-10 grid place-items-center rounded-full border border-white/10"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#0a0a0a]/95 backdrop-blur-xl">
          <div className="flex flex-col px-5 py-4 gap-4 text-sm">
            <a href="#product" onClick={() => setOpen(false)}>Product</a>
            <a href="#features" onClick={() => setOpen(false)}>Features</a>
            <a href="#showcase" onClick={() => setOpen(false)}>Showcase</a>
            <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
            <Link
              to="/editor"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Open Studio <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function LogoMark() {
  return (
    <span className="relative inline-flex h-7 w-7 items-center justify-center">
      <span className="absolute inset-0 rounded-full bg-primary/20 blur-md" />
      <span className="relative h-7 w-7 rounded-full bg-gradient-to-br from-primary to-primary/40 grid place-items-center">
        <span className="h-3 w-3 rounded-full bg-[#0a0a0a]" />
      </span>
    </span>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24 md:pt-44 md:pb-36">
      <ParticleField />
      <GradientGlow />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          AI-crafted · Built for App Store & Play Store
        </div>

        <h1 className="mt-8 text-balance font-display text-5xl md:text-7xl lg:text-[5.75rem] leading-[0.95] tracking-tight">
          <span className="block text-white/95">Screenshots that</span>
          <span className="block">
            <span className="bg-gradient-to-r from-primary via-primary to-white bg-clip-text text-transparent">
              sell your app.
            </span>
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-base md:text-lg text-white/60 leading-relaxed">
          ShotForge is the modern studio for store screenshots. Designed with the craft of an AI
          atelier — drag, type, frame, export. No designer required.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/editor"
            className="group relative inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:scale-[1.02] transition-transform"
          >
            <span className="absolute inset-0 rounded-full bg-primary blur-xl opacity-40 group-hover:opacity-60 transition" />
            <span className="relative">Launch the Studio</span>
            <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#product"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white/80 hover:bg-white/10 transition"
          >
            See the product
          </a>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}

function ParticleField() {
  // deterministic particle positions
  const dots = Array.from({ length: 60 }).map((_, i) => {
    const seed = i * 9301 + 49297;
    const x = (seed % 100) + ((i * 37) % 50) / 50;
    const y = ((seed * 7) % 100);
    const size = ((i * 13) % 3) + 1;
    const delay = (i % 10) * 0.4;
    return { x, y, size, delay, i };
  });
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {dots.map((d) => (
        <span
          key={d.i}
          className="absolute rounded-full bg-primary/60 animate-pulse"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            opacity: 0.35,
            animationDelay: `${d.delay}s`,
            animationDuration: `${3 + (d.i % 4)}s`,
          }}
        />
      ))}
    </div>
  );
}

function GradientGlow() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--primary) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
    </>
  );
}

function HeroPreview() {
  // Mock screenshot mockup - three phones with green accent
  return (
    <div className="relative mt-20 mx-auto max-w-5xl">
      <div className="absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[3rem] bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-2xl" />
      <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-4 md:p-8 backdrop-blur-sm">
        <div className="grid grid-cols-3 gap-3 md:gap-6 items-end">
          <PhoneMock variant="left" />
          <PhoneMock variant="center" />
          <PhoneMock variant="right" />
        </div>
      </div>
    </div>
  );
}

function PhoneMock({ variant }: { variant: "left" | "center" | "right" }) {
  const tilt =
    variant === "left" ? "md:-rotate-6 md:translate-y-6" : variant === "right" ? "md:rotate-6 md:translate-y-6" : "";
  const headlines = {
    left: "Fast.",
    center: "Beautiful.",
    right: "Yours.",
  } as const;
  const sub = {
    left: "Frame in seconds",
    center: "Pixel-perfect studio",
    right: "Export instantly",
  } as const;
  return (
    <div className={`group relative ${tilt} transition-transform duration-700 hover:-translate-y-2`}>
      <div className="relative aspect-[9/19] rounded-[1.6rem] md:rounded-[2rem] border border-white/15 bg-gradient-to-br from-[#111] to-[#0a0a0a] p-2 shadow-2xl shadow-primary/5">
        <div className="relative h-full w-full overflow-hidden rounded-[1.2rem] md:rounded-[1.6rem] bg-gradient-to-br from-[#0d2818] via-[#0a0a0a] to-[#0a0a0a]">
          {/* notch */}
          <div className="absolute left-1/2 top-2 h-3 w-12 -translate-x-1/2 rounded-full bg-black/80" />
          <div className="absolute inset-0 flex flex-col items-center justify-end p-4 md:p-6 text-center">
            <div className="absolute top-10 left-0 right-0 px-4">
              <p className="text-[10px] md:text-xs text-primary/80 uppercase tracking-[0.25em]">ShotForge</p>
              <h3 className="mt-2 text-xl md:text-3xl font-display font-semibold leading-tight">
                {headlines[variant]}
              </h3>
              <p className="mt-1 text-[10px] md:text-xs text-white/50">{sub[variant]}</p>
            </div>
            {/* mock app card */}
            <div className="w-full rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-md bg-gradient-to-br from-primary to-primary/40" />
                <div className="flex-1 text-left">
                  <div className="h-2 w-16 rounded-full bg-white/40" />
                  <div className="mt-1 h-1.5 w-10 rounded-full bg-white/15" />
                </div>
              </div>
            </div>
          </div>
          {/* shimmer */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute -inset-x-10 top-0 h-40 bg-gradient-to-b from-primary/20 to-transparent blur-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- MARQUEE ---------------- */
function Marquee() {
  const items = [
    "iOS Frames",
    "Android Frames",
    "3D Depth",
    "Kinetic Text",
    "Custom Sizes",
    "Instant PNG",
    "Drag & Drop",
    "Studio-grade",
  ];
  return (
    <section className="border-y border-white/5 py-6 overflow-hidden">
      <div className="flex gap-12 whitespace-nowrap animate-[marquee_30s_linear_infinite]">
        {[...items, ...items, ...items].map((t, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-white/40">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
            {t}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- PRODUCT ---------------- */
function Product() {
  return (
    <section id="product" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.3em] text-primary/80">The Product</p>
            <h2 className="mt-4 text-4xl md:text-6xl font-display tracking-tight leading-[1]">
              ShotForge <span className="text-white/40">Studio</span>
            </h2>
            <p className="mt-6 text-white/60 leading-relaxed max-w-md">
              A focused canvas built for one job — making your app look unforgettable on the App
              Store and Play Store. Drag layers, swap devices, type kinetic headlines, export to
              any pixel size.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/70">
              {[
                "iOS & Android device frames",
                "Custom px × px export sizes",
                "Draggable text & image layers",
                "Instant PNG export",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex items-center gap-3">
              <Link
                to="/editor"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:scale-[1.02] transition-transform"
              >
                Open the Studio
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <span className="text-xs text-white/40">Free to use · No signup</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ProductCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard() {
  return (
    <Link to="/editor" className="group block">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f1a14] via-[#0a0a0a] to-[#0a0a0a] p-6 md:p-10 transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_60px_-15px_rgba(120,220,80,0.3)]">
        {/* glow on hover */}
        <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(160,230,90,0.08), transparent 40%)"
          }}
        />
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary to-primary/30 grid place-items-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">ShotForge Studio</h3>
              <p className="text-xs text-white/50">Screenshot generator · v1</p>
            </div>
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 transition-transform group-hover:rotate-45">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <MiniSpec icon={<Smartphone className="h-4 w-4" />} label="Devices" value="iOS · Android" />
          <MiniSpec icon={<Layers className="h-4 w-4" />} label="Layers" value="Text + Image" />
          <MiniSpec icon={<Wand2 className="h-4 w-4" />} label="Effects" value="3D Depth" />
          <MiniSpec icon={<Download className="h-4 w-4" />} label="Export" value="PNG · custom px" />
        </div>

        <div className="mt-8 flex items-center justify-between text-sm">
          <span className="text-white/50">Click anywhere on this card to launch →</span>
          <span className="text-primary font-medium">Live</span>
        </div>
      </div>
    </Link>
  );
}

function MiniSpec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
      <div className="flex items-center gap-2 text-white/50 text-xs">
        <span className="text-primary">{icon}</span>
        {label}
      </div>
      <div className="mt-2 text-sm font-medium">{value}</div>
    </div>
  );
}

/* ---------------- FEATURES ---------------- */
function Features() {
  const items = [
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: "Real device frames",
      desc: "Pixel-accurate iOS and Android frames with proper bezels and notches.",
    },
    {
      icon: <Type className="h-5 w-5" />,
      title: "Kinetic typography",
      desc: "Type that reads like a campaign. Multiple fonts, weights, gradients.",
    },
    {
      icon: <ImageIcon className="h-5 w-5" />,
      title: "Drag any layer",
      desc: "Move, scale, rotate. Your canvas behaves like a pro design tool.",
    },
    {
      icon: <Wand2 className="h-5 w-5" />,
      title: "3D depth presets",
      desc: "One-click perspective, tilt, and depth — instantly cinematic.",
    },
    {
      icon: <Layers className="h-5 w-5" />,
      title: "Custom px sizes",
      desc: "Any width × height in pixels. Built for every store spec.",
    },
    {
      icon: <Download className="h-5 w-5" />,
      title: "Instant PNG export",
      desc: "Hi-res, transparent-ready, ready to upload. Zero friction.",
    },
  ];
  return (
    <section id="features" className="py-24 md:py-32 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-primary/80">Features</p>
          <h2 className="mt-4 text-4xl md:text-6xl font-display tracking-tight leading-[1]">
            Studio-grade, <span className="text-white/40">made simple.</span>
          </h2>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {items.map((f, i) => (
            <FeatureCell key={i} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCell({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="group relative bg-[#0a0a0a] p-8 transition-colors hover:bg-[#0d100c]">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-white/55 leading-relaxed">{desc}</p>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

/* ---------------- SHOWCASE ---------------- */
function Showcase() {
  const tiles = [
    { tag: "Onboarding", color: "from-emerald-400/30 to-emerald-900/10" },
    { tag: "Hero shot", color: "from-lime-300/30 to-lime-900/10" },
    { tag: "Feature", color: "from-teal-300/25 to-teal-900/10" },
    { tag: "Compare", color: "from-green-300/30 to-green-900/10" },
  ];
  return (
    <section id="showcase" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-primary/80">Showcase</p>
            <h2 className="mt-4 text-4xl md:text-6xl font-display tracking-tight leading-[1]">
              Crafted for every <span className="text-white/40">story.</span>
            </h2>
          </div>
          <Link
            to="/editor"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            Try a template <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {tiles.map((t, i) => (
            <div
              key={i}
              className={`group relative aspect-[3/4] rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br ${t.color}`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="relative w-[55%] aspect-[9/19] rounded-2xl border border-white/20 bg-[#0a0a0a] p-1.5 transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-1">
                  <div className="h-full w-full rounded-xl bg-gradient-to-br from-white/10 to-white/0" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-xs text-white/70">{t.tag}</span>
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 backdrop-blur">
                  <Plus className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const items = [
    {
      q: "What is ShotForge?",
      a: "ShotForge is an AI-grade studio for designing App Store and Play Store screenshots. Drag layers, swap device frames, write headlines, and export production-ready PNGs.",
    },
    {
      q: "Do I need a design background?",
      a: "Not at all. ShotForge gives you sensible defaults, snapping, and presets so anyone can produce store-ready shots in minutes.",
    },
    {
      q: "Can I export at any pixel size?",
      a: "Yes. Pick a preset for the App Store and Play Store, or type a custom width × height in pixels.",
    },
    {
      q: "Is it free?",
      a: "ShotForge is free to use. Open the Studio and start designing — no signup required.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.3em] text-primary/80">FAQ</p>
          <h2 className="mt-4 text-4xl md:text-6xl font-display tracking-tight leading-[1]">
            Questions, <br />
            <span className="text-white/40">answered.</span>
          </h2>
          <p className="mt-6 text-white/55 max-w-sm">
            Everything you need to know before launching the Studio.
          </p>
        </div>
        <div className="lg:col-span-7 divide-y divide-white/5 border-y border-white/5">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <button
                key={i}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full text-left py-6 group"
              >
                <div className="flex items-center justify-between gap-6">
                  <h3 className="text-base md:text-lg font-medium">{it.q}</h3>
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 transition-transform ${
                      isOpen ? "rotate-45 bg-primary text-primary-foreground border-primary" : "bg-white/5"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </div>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-white/55 leading-relaxed max-w-xl">{it.a}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-5 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <LogoMark />
          <span className="font-semibold">ShotForge</span>
          <span className="ml-3 text-xs text-white/40">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-white/55">
          <a href="#product" className="hover:text-white">Product</a>
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
          <Link to="/editor" className="text-primary hover:opacity-80">Open Studio →</Link>
        </div>
      </div>
    </footer>
  );
}
