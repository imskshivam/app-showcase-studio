import { Smartphone, Download, Image as ImageIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { store, useStore } from "./store";
import { PRESET_SIZES } from "./types";
import { toPng } from "html-to-image";

type Props = { canvasRef: React.RefObject<HTMLDivElement | null> };

export function LeftSidebar({ canvasRef }: Props) {
  const platform = useStore((s) => s.platform);
  const canvas = useStore((s) => s.canvas);
  const layers = useStore((s) => s.layers);

  const exportPng = async () => {
    const node = canvasRef.current;
    if (!node) return;
    const dataUrl = await toPng(node, {
      width: canvas.width,
      height: canvas.height,
      pixelRatio: 1,
      cacheBust: true,
      style: { transform: "scale(1)", transformOrigin: "top left" },
    });
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${platform}-screenshot-${Date.now()}.png`;
    a.click();
  };

  const clearAll = () => {
    if (!confirm("Clear all layers and reset?")) return;
    store.set({ layers: [] });
  };

  return (
    <aside className="flex w-64 flex-col gap-4 border-r border-border bg-sidebar p-4">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Smartphone className="h-4 w-4" />
        </div>
        <div>
          <h1 className="text-sm font-bold leading-none">ShotForge</h1>
          <p className="text-[11px] text-muted-foreground">App store screenshots</p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Smartphone className="h-3.5 w-3.5" /> Device / Store
        </label>
        <Select
          value={platform}
          onValueChange={(v: "ios" | "android") => {
            store.set({ platform: v });
            // also update existing device layers
            store.get().layers.forEach((l) => {
              if (l.type === "device") store.updateLayer(l.id, { platform: v });
            });
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ios">iOS — App Store</SelectItem>
            <SelectItem value="android">Android — Play Store</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <ImageIcon className="h-3.5 w-3.5" /> Export Size
        </label>
        <Select
          value={canvas.label}
          onValueChange={(v) => {
            const found = PRESET_SIZES.find((p) => p.label === v);
            if (found) store.set({ canvas: found });
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PRESET_SIZES.map((p) => (
              <SelectItem key={p.label} value={p.label}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={exportPng} className="w-full font-semibold">
        <Download className="mr-2 h-4 w-4" /> Export PNG
      </Button>

      <button
        onClick={clearAll}
        className="text-xs text-muted-foreground transition hover:text-destructive"
      >
        <Trash2 className="mr-1 inline h-3 w-3" /> Clear All Data
      </button>

      <div className="mt-auto rounded-lg border border-border bg-surface p-3 text-[11px] leading-relaxed text-muted-foreground">
        <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-primary">
          {layers.length} layer{layers.length === 1 ? "" : "s"}
        </div>
        Drag layers on the canvas. Use the right panel to add text, images, and tweak 3D depth.
      </div>
    </aside>
  );
}
