import { useRef } from "react";
import {
  Type,
  Image as ImageIcon,
  Move3d,
  Layers,
  Palette,
  Plus,
  ChevronUp,
  ChevronDown,
  Trash2,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { store, useStore, newId } from "./store";
import type { ImageLayer, TextLayer } from "./types";
import { FONTS, ensureFontLoaded } from "./fonts";

export function RightPanel() {
  const layers = useStore((s) => s.layers);
  const selectedId = useStore((s) => s.selectedId);
  const bg = useStore((s) => s.background);
  const selected = layers.find((l) => l.id === selectedId);
  const fileRef = useRef<HTMLInputElement>(null);
  const bgFileRef = useRef<HTMLInputElement>(null);
  const screenshotRef = useRef<HTMLInputElement>(null);

  const addText = () => {
    const t: TextLayer = {
      id: newId(),
      type: "text",
      text: "New text",
      x: 0,
      y: 0,
      fontSize: 80,
      color: "#ffffff",
      fontWeight: 700,
      fontFamily: "Inter, system-ui, sans-serif",
      width: 900,
      align: "center",
    };
    store.addLayer(t);
  };

  const addImage = (src: string) => {
    const img: ImageLayer = {
      id: newId(),
      type: "image",
      src,
      x: 0,
      y: 0,
      width: 300,
      height: 300,
      rotation: 0,
      opacity: 1,
    };
    store.addLayer(img);
  };

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => addImage(r.result as string);
    r.readAsDataURL(f);
    e.target.value = "";
  };

  const onUploadBg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () =>
      store.set({ background: { ...bg, kind: "image", image: r.result as string } });
    r.readAsDataURL(f);
    e.target.value = "";
  };

  const onUploadScreenshot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const dev = layers.find((l) => l.type === "device");
    if (!dev) return;
    const r = new FileReader();
    r.onload = () => store.updateLayer(dev.id, { screenshot: r.result as string });
    r.readAsDataURL(f);
    e.target.value = "";
  };

  return (
    <aside className="flex h-full w-full md:w-80 flex-col gap-2 border-l border-border bg-sidebar p-3">
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" className="flex-1" onClick={addText}>
          <Type className="mr-1.5 h-3.5 w-3.5" /> Text
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="flex-1"
          onClick={() => fileRef.current?.click()}
        >
          <ImageIcon className="mr-1.5 h-3.5 w-3.5" /> Image
        </Button>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={onUploadImage} />
      </div>

      <Button
        size="sm"
        variant="outline"
        className="w-full"
        onClick={() => screenshotRef.current?.click()}
      >
        <Plus className="mr-1.5 h-3.5 w-3.5" /> Upload Screenshot to Phone
      </Button>
      <input
        ref={screenshotRef}
        type="file"
        accept="image/*"
        hidden
        onChange={onUploadScreenshot}
      />

      <div className="flex-1 overflow-y-auto pr-1">
        <Accordion type="multiple" defaultValue={["bg", "layers", "selected"]} className="w-full">
          <AccordionItem value="bg">
            <AccordionTrigger className="text-sm">
              <span className="flex items-center gap-2">
                <Palette className="h-4 w-4" /> Background
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              <div className="flex gap-1">
                {(["solid", "gradient", "image"] as const).map((k) => (
                  <Button
                    key={k}
                    size="sm"
                    variant={bg.kind === k ? "default" : "secondary"}
                    className="flex-1 capitalize"
                    onClick={() => store.set({ background: { ...bg, kind: k } })}
                  >
                    {k}
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Color 1</Label>
                  <Input
                    type="color"
                    value={bg.color1}
                    onChange={(e) => store.set({ background: { ...bg, color1: e.target.value } })}
                    className="h-9 cursor-pointer p-1"
                  />
                </div>
                {bg.kind === "gradient" && (
                  <div>
                    <Label className="text-xs">Color 2</Label>
                    <Input
                      type="color"
                      value={bg.color2}
                      onChange={(e) => store.set({ background: { ...bg, color2: e.target.value } })}
                      className="h-9 cursor-pointer p-1"
                    />
                  </div>
                )}
              </div>
              {bg.kind === "gradient" && (
                <div>
                  <Label className="text-xs">Angle: {bg.angle}°</Label>
                  <Slider
                    value={[bg.angle]}
                    min={0}
                    max={360}
                    onValueChange={([v]) => store.set({ background: { ...bg, angle: v } })}
                  />
                </div>
              )}
              {bg.kind === "image" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => bgFileRef.current?.click()}
                >
                  <ImageIcon className="mr-1.5 h-3.5 w-3.5" /> Upload BG image
                </Button>
              )}
              <input ref={bgFileRef} type="file" accept="image/*" hidden onChange={onUploadBg} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="layers">
            <AccordionTrigger className="text-sm">
              <span className="flex items-center gap-2">
                <Layers className="h-4 w-4" /> Layers ({layers.length})
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-1">
              {[...layers].reverse().map((l) => (
                <div
                  key={l.id}
                  onClick={() => store.select(l.id)}
                  className={`group flex cursor-pointer items-center gap-2 rounded-md border px-2 py-1.5 text-xs ${
                    selectedId === l.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-surface hover:bg-surface-2"
                  }`}
                  style={{ background: selectedId === l.id ? undefined : "var(--surface)" }}
                >
                  <span className="flex-1 truncate">
                    {l.type === "text"
                      ? `T: ${(l as TextLayer).text}`
                      : l.type === "image"
                        ? "Image"
                        : `Phone (${(l as { platform: string }).platform})`}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      store.reorder(l.id, "up");
                    }}
                  >
                    <ChevronUp className="h-3.5 w-3.5 opacity-60 hover:opacity-100" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      store.reorder(l.id, "down");
                    }}
                  >
                    <ChevronDown className="h-3.5 w-3.5 opacity-60 hover:opacity-100" />
                  </button>
                  {l.type !== "device" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        store.removeLayer(l.id);
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5 opacity-60 hover:text-destructive hover:opacity-100" />
                    </button>
                  )}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          {selected && (
            <AccordionItem value="selected">
              <AccordionTrigger className="text-sm">
                <span className="flex items-center gap-2">
                  <Move3d className="h-4 w-4" /> Selected Layer
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-3">
                <SelectedEditor />
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    </aside>
  );
}

function SelectedEditor() {
  const selectedId = useStore((s) => s.selectedId);
  const layers = useStore((s) => s.layers);
  const viewMode = useStore((s) => s.viewMode);
  const layer = layers.find((l) => l.id === selectedId);
  if (!layer) return null;

  if (layer.type === "text") {
    return (
      <div className="space-y-3">
        <div>
          <Label className="text-xs">Text</Label>
          <Textarea
            value={layer.text}
            onChange={(e) => store.updateLayer(layer.id, { text: e.target.value })}
            rows={2}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs">Color</Label>
            <Input
              type="color"
              value={layer.color}
              onChange={(e) => store.updateLayer(layer.id, { color: e.target.value })}
              className="h-9 cursor-pointer p-1"
            />
          </div>
          <div>
            <Label className="text-xs">Weight</Label>
            <Input
              type="number"
              min={100}
              max={900}
              step={100}
              value={layer.fontWeight}
              onChange={(e) =>
                store.updateLayer(layer.id, { fontWeight: parseInt(e.target.value) || 400 })
              }
            />
          </div>
        </div>
        <div>
          <Label className="text-xs">Font size: {layer.fontSize}px</Label>
          <Slider
            value={[layer.fontSize]}
            min={20}
            max={300}
            onValueChange={([v]) => store.updateLayer(layer.id, { fontSize: v })}
          />
        </div>
        <div>
          <Label className="text-xs">Width: {layer.width}px</Label>
          <Slider
            value={[layer.width]}
            min={200}
            max={2400}
            onValueChange={([v]) => store.updateLayer(layer.id, { width: v })}
          />
        </div>
        <div className="flex gap-1">
          {(["left", "center", "right"] as const).map((a) => (
            <Button
              key={a}
              size="sm"
              variant={layer.align === a ? "default" : "secondary"}
              className="flex-1 capitalize"
              onClick={() => store.updateLayer(layer.id, { align: a })}
            >
              {a}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  if (layer.type === "image") {
    return (
      <div className="space-y-3">
        <div>
          <Label className="text-xs">Width: {layer.width}px</Label>
          <Slider
            value={[layer.width]}
            min={50}
            max={2400}
            onValueChange={([v]) => store.updateLayer(layer.id, { width: v })}
          />
        </div>
        <div>
          <Label className="text-xs">Height: {layer.height}px</Label>
          <Slider
            value={[layer.height]}
            min={50}
            max={2400}
            onValueChange={([v]) => store.updateLayer(layer.id, { height: v })}
          />
        </div>
        <div>
          <Label className="text-xs">Rotation: {layer.rotation}°</Label>
          <Slider
            value={[layer.rotation]}
            min={-180}
            max={180}
            onValueChange={([v]) => store.updateLayer(layer.id, { rotation: v })}
          />
        </div>
        <div>
          <Label className="text-xs">Opacity: {Math.round(layer.opacity * 100)}%</Label>
          <Slider
            value={[layer.opacity * 100]}
            min={0}
            max={100}
            onValueChange={([v]) => store.updateLayer(layer.id, { opacity: v / 100 })}
          />
        </div>
      </div>
    );
  }

  // device
  return (
    <div className="space-y-3">
      <div className="flex gap-1">
        {(["black", "silver", "gold"] as const).map((c) => (
          <Button
            key={c}
            size="sm"
            variant={layer.color === c ? "default" : "secondary"}
            className="flex-1 capitalize"
            onClick={() => store.updateLayer(layer.id, { color: c })}
          >
            {c}
          </Button>
        ))}
      </div>
      <DeviceScale layerId={layer.id} scale={layer.scale} />

      <div>
        <Label className="text-xs">Z rotation: {layer.rotation.rz}°</Label>
        <Slider
          value={[layer.rotation.rz]}
          min={-180}
          max={180}
          onValueChange={([v]) =>
            store.updateLayer(layer.id, { rotation: { ...layer.rotation, rz: v } })
          }
        />
      </div>
      {viewMode === "3d" && (
        <>
          <div>
            <Label className="text-xs">Tilt X: {layer.rotation.rx}°</Label>
            <Slider
              value={[layer.rotation.rx]}
              min={-60}
              max={60}
              onValueChange={([v]) =>
                store.updateLayer(layer.id, { rotation: { ...layer.rotation, rx: v } })
              }
            />
          </div>
          <div>
            <Label className="text-xs">Tilt Y: {layer.rotation.ry}°</Label>
            <Slider
              value={[layer.rotation.ry]}
              min={-60}
              max={60}
              onValueChange={([v]) =>
                store.updateLayer(layer.id, { rotation: { ...layer.rotation, ry: v } })
              }
            />
          </div>
          <p className="text-[11px] text-muted-foreground">
            3D mode reveals the side depth of the device.
          </p>
        </>
      )}
    </div>
  );
}

function DeviceScale({ layerId, scale }: { layerId: string; scale: number }) {
  const canvas = useStore((s) => s.canvas);
  // Phone frame base size lives in PhoneFrame.tsx (420 x 860).
  // Compute the maximum uniform scale that still fits inside the canvas
  // (with a small margin) so the device never overflows. Aspect ratio is
  // preserved — no stretching.
  const FRAME_W = 420;
  const FRAME_H = 860;
  const margin = 40;
  const maxScale = Math.min(
    (canvas.width - margin * 2) / FRAME_W,
    (canvas.height - margin * 2) / FRAME_H,
  );
  const clampedMax = Math.max(0.5, Math.min(maxScale, 6));

  // If current scale exceeds the max for this canvas, clamp it down.
  if (scale > clampedMax) {
    queueMicrotask(() => store.updateLayer(layerId, { scale: clampedMax }));
  }

  const sliderMax = Math.round(clampedMax * 100);
  const sliderMin = 30;
  const value = Math.min(Math.round(scale * 100), sliderMax);

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <Label className="text-xs">Mobile size: {scale.toFixed(2)}x</Label>
        <button
          onClick={() => store.updateLayer(layerId, { scale: clampedMax })}
          className="text-[10px] font-semibold uppercase tracking-wider text-primary hover:underline"
        >
          Fit
        </button>
      </div>
      <Slider
        value={[value]}
        min={sliderMin}
        max={sliderMax}
        onValueChange={([v]) => store.updateLayer(layerId, { scale: v / 100 })}
      />
      <p className="mt-1 text-[10px] text-muted-foreground">
        Aspect ratio is locked — phone won't stretch or exceed the canvas.
      </p>
    </div>
  );
}

