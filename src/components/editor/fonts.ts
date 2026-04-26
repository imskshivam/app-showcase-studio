// Font catalog: system stacks + curated Google Fonts.
// Google Fonts are loaded on demand the first time they are used.

export type FontDef = {
  label: string;
  family: string; // CSS font-family value (already quoted if needed)
  google?: string; // Google Fonts family name (no weights). Omit for system fonts.
  category: "Sans" | "Serif" | "Display" | "Handwriting" | "Mono" | "System";
};

// Curated Google Fonts list — covers most popular faces for app store screenshots.
const G = (name: string, category: FontDef["category"]): FontDef => ({
  label: name,
  family: `"${name}", system-ui, sans-serif`,
  google: name,
  category,
});

export const FONTS: FontDef[] = [
  // System
  { label: "System UI", family: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif", category: "System" },
  { label: "Sans (default)", family: "Inter, system-ui, sans-serif", google: "Inter", category: "Sans" },
  { label: "Serif", family: 'Georgia, "Times New Roman", serif', category: "System" },
  { label: "Mono", family: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace', category: "System" },

  // Sans
  ...["Inter", "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins", "Nunito", "Nunito Sans",
      "Work Sans", "Source Sans 3", "Manrope", "Plus Jakarta Sans", "DM Sans", "Outfit",
      "Rubik", "Mulish", "Karla", "Hind", "Quicksand", "Cabin", "Oxygen", "Barlow",
      "PT Sans", "Fira Sans", "Heebo", "Bebas Neue", "Anton", "Archivo", "Be Vietnam Pro",
      "Sora", "Space Grotesk", "Urbanist", "Public Sans", "IBM Plex Sans", "Noto Sans",
      "Asap", "Catamaran", "Exo 2", "Josefin Sans", "Kanit", "Maven Pro", "Mukta",
      "Overpass", "Prompt", "Questrial", "Signika", "Titillium Web", "Varela Round"]
    .map((n) => G(n, "Sans")),

  // Serif
  ...["Playfair Display", "Merriweather", "Lora", "PT Serif", "Cormorant Garamond",
      "EB Garamond", "Crimson Pro", "Source Serif 4", "Bitter", "Libre Baskerville",
      "Spectral", "Cardo", "Domine", "Roboto Slab", "Slabo 27px", "Zilla Slab",
      "DM Serif Display", "DM Serif Text", "Noto Serif", "IBM Plex Serif",
      "Old Standard TT", "Vollkorn", "Arvo", "Cormorant", "Frank Ruhl Libre"]
    .map((n) => G(n, "Serif")),

  // Display
  ...["Oswald", "Righteous", "Black Ops One", "Press Start 2P", "Bungee", "Permanent Marker",
      "Russo One", "Alfa Slab One", "Fjalla One", "Abril Fatface", "Ultra", "Staatliches",
      "Squada One", "Bowlby One", "Faster One", "Major Mono Display", "Monoton",
      "Bungee Shade", "Audiowide", "Orbitron", "Saira Stencil One", "Shrikhand",
      "Leckerli One", "Lobster", "Pacifico", "Bangers", "Fredoka", "Chewy", "Concert One"]
    .map((n) => G(n, "Display")),

  // Handwriting
  ...["Caveat", "Great Vibes", "Dancing Script", "Sacramento", "Satisfy", "Allura",
      "Kalam", "Indie Flower", "Shadows Into Light", "Patrick Hand", "Amatic SC",
      "Architects Daughter", "Gloria Hallelujah", "Homemade Apple", "Marck Script",
      "Tangerine", "Yellowtail", "Cookie", "Parisienne", "Pinyon Script"]
    .map((n) => G(n, "Handwriting")),

  // Mono
  ...["JetBrains Mono", "Fira Code", "Source Code Pro", "IBM Plex Mono", "Inconsolata",
      "Roboto Mono", "Space Mono", "Ubuntu Mono", "Cousine", "Anonymous Pro"]
    .map((n) => G(n, "Mono")),
];

const loaded = new Set<string>();

/** Inject a Google Fonts <link> for the given family if not yet loaded. */
export function ensureFontLoaded(family: string) {
  if (typeof document === "undefined") return;
  const def = FONTS.find((f) => f.family === family);
  if (!def?.google || loaded.has(def.google)) return;
  loaded.add(def.google);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    def.google,
  )}:wght@300;400;500;600;700;800;900&display=swap`;
  document.head.appendChild(link);
}

/** Preload Google Fonts API connection (small perf win). */
export function preconnectGoogleFonts() {
  if (typeof document === "undefined") return;
  if (document.querySelector('link[data-gf-preconnect]')) return;
  const a = document.createElement("link");
  a.rel = "preconnect";
  a.href = "https://fonts.googleapis.com";
  a.setAttribute("data-gf-preconnect", "1");
  const b = document.createElement("link");
  b.rel = "preconnect";
  b.href = "https://fonts.gstatic.com";
  b.crossOrigin = "anonymous";
  b.setAttribute("data-gf-preconnect", "1");
  document.head.append(a, b);
}
