import { useSyncExternalStore } from "react";
import type { Background, CanvasSize, Layer, Platform, ViewMode } from "./types";
import { PRESET_SIZES } from "./types";

type State = {
  platform: Platform;
  viewMode: ViewMode;
  canvas: CanvasSize;
  background: Background;
  layers: Layer[];
  selectedId: string | null;
};

const uid = () => Math.random().toString(36).slice(2, 10);

const initial: State = {
  platform: "ios",
  viewMode: "flat",
  canvas: PRESET_SIZES[0],
  background: {
    kind: "gradient",
    color1: "#7c3aed",
    color2: "#ec4899",
    angle: 135,
  },
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
      text: "Your Headline Here",
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
  selectedId: null,
};

let state: State = initial;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

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
  updateLayer: (id: string, patch: Partial<Layer>) => {
    state = {
      ...state,
      layers: state.layers.map((l) => (l.id === id ? ({ ...l, ...patch } as Layer) : l)),
    };
    emit();
  },
  addLayer: (layer: Layer) => {
    state = { ...state, layers: [...state.layers, layer], selectedId: layer.id };
    emit();
  },
  removeLayer: (id: string) => {
    state = {
      ...state,
      layers: state.layers.filter((l) => l.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    };
    emit();
  },
  reorder: (id: string, dir: "up" | "down") => {
    const idx = state.layers.findIndex((l) => l.id === id);
    if (idx < 0) return;
    const target = dir === "up" ? idx + 1 : idx - 1;
    if (target < 0 || target >= state.layers.length) return;
    const arr = [...state.layers];
    [arr[idx], arr[target]] = [arr[target], arr[idx]];
    state = { ...state, layers: arr };
    emit();
  },
  select: (id: string | null) => {
    state = { ...state, selectedId: id };
    emit();
  },
};

export function useStore<T>(selector: (s: State) => T): T {
  return useSyncExternalStore(
    (cb) => store.subscribe(cb),
    () => selector(store.get()),
    () => selector(initial),
  );
}

export const newId = uid;
