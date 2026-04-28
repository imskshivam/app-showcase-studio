import { useSyncExternalStore } from "react";
import type { Background, CanvasSize, Layer, Platform, Screen, ViewMode } from "./types";
import { PRESET_SIZES } from "./types";

type State = {
  platform: Platform;
  viewMode: ViewMode;
  canvas: CanvasSize;
  screens: Screen[];
  activeScreenId: string;
};

const uid = () => Math.random().toString(36).slice(2, 10);

// Pleasant palette of starter gradients so each new screen feels unique.
const PALETTES: Array<[string, string, number]> = [
  ["#7c3aed", "#ec4899", 135],
  ["#0ea5e9", "#22c55e", 135],
  ["#f59e0b", "#ef4444", 135],
  ["#06b6d4", "#8b5cf6", 135],
  ["#84cc16", "#0ea5e9", 135],
  ["#f43f5e", "#8b5cf6", 135],
];

const HEADLINES = [
  "Your Headline Here",
  "Built for Speed",
  "Stay Productive",
  "Powerful & Simple",
  "Beautiful by Default",
  "Made for You",
];

function makeScreen(index = 0): Screen {
  const [c1, c2, angle] = PALETTES[index % PALETTES.length];
  return {
    id: uid(),
    background: { kind: "gradient", color1: c1, color2: c2, angle },
    selectedLayerId: null,
    layers: [
      {
        id: uid(),
        type: "device",
        platform: "ios",
        x: 0,
        y: 60,
        scale: 1,
        rotation: { rx: 0, ry: 0, rz: 0 },
        color: "black",
      },
      {
        id: uid(),
        type: "text",
        text: HEADLINES[index % HEADLINES.length],
        x: 0,
        y: -700,
        fontSize: 110,
        color: "#ffffff",
        fontWeight: 800,
        fontFamily: "Inter, system-ui, sans-serif",
        width: 1100,
        align: "center",
      },
    ],
  };
}

const firstScreen = makeScreen(0);

const initial: State = {
  platform: "ios",
  viewMode: "flat",
  canvas: PRESET_SIZES[0],
  screens: [firstScreen],
  activeScreenId: firstScreen.id,
};

let state: State = initial;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

const getActive = (s: State = state) =>
  s.screens.find((sc) => sc.id === s.activeScreenId) ?? s.screens[0];

const mapActive = (fn: (sc: Screen) => Screen) => {
  state = {
    ...state,
    screens: state.screens.map((sc) => (sc.id === state.activeScreenId ? fn(sc) : sc)),
  };
  emit();
};

export const store = {
  get: () => state,
  set: (next: Partial<State>) => {
    state = { ...state, ...next };
    emit();
  },
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },

  // ---- Screen-level ----
  addScreen: () => {
    const sc = makeScreen(state.screens.length);
    // Match current platform
    sc.layers = sc.layers.map((l) =>
      l.type === "device" ? { ...l, platform: state.platform } : l,
    );
    state = {
      ...state,
      screens: [...state.screens, sc],
      activeScreenId: sc.id,
    };
    emit();
  },
  selectScreen: (id: string) => {
    if (!state.screens.some((s) => s.id === id)) return;
    state = { ...state, activeScreenId: id };
    emit();
  },
  removeScreen: (id: string) => {
    if (state.screens.length <= 1) return;
    const next = state.screens.filter((s) => s.id !== id);
    state = {
      ...state,
      screens: next,
      activeScreenId: state.activeScreenId === id ? next[0].id : state.activeScreenId,
    };
    emit();
  },
  setBackground: (bg: Background) => mapActive((sc) => ({ ...sc, background: bg })),

  // ---- Layer-level (operate on active screen) ----
  updateLayer: (id: string, patch: Partial<Layer>) =>
    mapActive((sc) => ({
      ...sc,
      layers: sc.layers.map((l) => (l.id === id ? ({ ...l, ...patch } as Layer) : l)),
    })),
  addLayer: (layer: Layer) =>
    mapActive((sc) => ({
      ...sc,
      layers: [...sc.layers, layer],
      selectedLayerId: layer.id,
    })),
  removeLayer: (id: string) =>
    mapActive((sc) => ({
      ...sc,
      layers: sc.layers.filter((l) => l.id !== id),
      selectedLayerId: sc.selectedLayerId === id ? null : sc.selectedLayerId,
    })),
  reorder: (id: string, dir: "up" | "down") =>
    mapActive((sc) => {
      const idx = sc.layers.findIndex((l) => l.id === id);
      if (idx < 0) return sc;
      const target = dir === "up" ? idx + 1 : idx - 1;
      if (target < 0 || target >= sc.layers.length) return sc;
      const arr = [...sc.layers];
      [arr[idx], arr[target]] = [arr[target], arr[idx]];
      return { ...sc, layers: arr };
    }),
  select: (id: string | null) => mapActive((sc) => ({ ...sc, selectedLayerId: id })),
};

// ---- Backward-compatible selector helpers ----
export const selectActiveScreen = (s: State) => getActive(s);
export const selectLayers = (s: State) => getActive(s).layers;
export const selectBackground = (s: State) => getActive(s).background;
export const selectSelectedId = (s: State) => getActive(s).selectedLayerId;

export function useStore<T>(selector: (s: State) => T): T {
  return useSyncExternalStore(
    (cb) => store.subscribe(cb),
    () => selector(store.get()),
    () => selector(initial),
  );
}

export const newId = uid;
