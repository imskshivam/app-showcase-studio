export type Platform = "ios" | "android";
export type ViewMode = "flat" | "3d";

export type Rotation3D = {
  rx: number; // tilt X (deg)
  ry: number; // tilt Y (deg)
  rz: number; // in-plane rotation (deg)
};

export type DeviceLayer = {
  id: string;
  type: "device";
  platform: Platform;
  screenshot?: string; // data URL
  x: number;
  y: number;
  scale: number;
  rotation: Rotation3D;
  color: "black" | "silver" | "gold";
};

export type TextLayer = {
  id: string;
  type: "text";
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontWeight: number;
  fontFamily: string;
  width: number;
  align: "left" | "center" | "right";
};

export type ImageLayer = {
  id: string;
  type: "image";
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
};

export type Layer = DeviceLayer | TextLayer | ImageLayer;

export type Background = {
  kind: "solid" | "gradient" | "image";
  color1: string;
  color2: string;
  angle: number;
  image?: string;
};

export type CanvasSize = {
  width: number;
  height: number;
  label: string;
};

export const PRESET_SIZES: CanvasSize[] = [
  { label: "iPhone 6.7\" (1290x2796)", width: 1290, height: 2796 },
  { label: "iPhone 6.5\" (1242x2688)", width: 1242, height: 2688 },
  { label: "iPad 12.9\" (2048x2732)", width: 2048, height: 2732 },
  { label: "Android Phone (1080x1920)", width: 1080, height: 1920 },
  { label: "Android Tablet (1600x2560)", width: 1600, height: 2560 },
];
