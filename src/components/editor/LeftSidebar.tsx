import { Smartphone, Download, Image as ImageIcon, Trash2, LogIn, LogOut, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { store, useStore } from "./store";
import { PRESET_SIZES } from "./types";
import { toPng } from "html-to-image";
import { useState } from "react";
import { signInWithGoogle, signOut, useAuth, GOOGLE_CLIENT_ID } from "./auth";
import { toast } from "sonner";

type Props = { canvasRef: React.RefObject<HTMLDivElement | null> };

const CUSTOM_LABEL = "Custom (px × px)";

export function LeftSidebar({ canvasRef }: Props) {
  const platform = useStore((s) => s.platform);
  const canvas = useStore((s) => s.canvas);
  const layers = useStore((s) => s.layers);
  const user = useAuth();

  const isCustom = !PRESET_SIZES.some((p) => p.label === canvas.label);
  const [customW, setCustomW] = useState<string>(String(canvas.width));
  const [customH, setCustomH] = useState<string>(String(canvas.height));

  const applyCustomSize = () => {
    const w = Math.max(100, Math.min(8000, parseInt(customW) || 0));
    const h = Math.max(100, Math.min(8000, parseInt(customH) || 0));
    if (!w || !h) {
      toast.error("Enter valid width & height in pixels (100–8000).");
      return;
    }
    store.set({ canvas: { width: w, height: h, label: `Custom ${w}x${h}` } });
  };

  const exportPng = async () => {
    if (!user) {
      try {
        await signInWithGoogle();
        toast.success("Signed in. Tap Export again to download.");
      } catch (e: any) {
        toast.error(e?.message ?? "Sign-in failed.");
      }
      return;
    }
    const node = canvasRef.current;
    if (!node) return;
    try {
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
    } catch {
      toast.error("Export failed. Try again.");
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Signed in with Google.");
    } catch (e: any) {
      toast.error(e?.message ?? "Sign-in failed.");
    }
  };

  const clearAll = () => {
    if (!confirm("Clear all layers and reset?")) return;
    store.set({ layers: [] });
  };

  return (
    <aside className="flex h-full w-full md:w-64 flex-col gap-4 border-r border-border bg-sidebar p-4 overflow-y-auto">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Smartphone className="h-4 w-4" />
        </div>
        <div>
          <h1 className="text-sm font-bold leading-none">ShotForge</h1>
          <p className="text-[11px] text-muted-foreground">App store screenshots</p>
        </div>
      </div>

      {/* Auth */}
      <div className="rounded-lg border border-border bg-surface p-2">
        {user ? (
          <div className="flex items-center gap-2">
            {user.picture ? (
              <img
                src={user.picture}
                alt={user.name}
                className="h-7 w-7 rounded-full"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                {user.name.charAt(0)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-medium">{user.name}</div>
              <div className="truncate text-[10px] text-muted-foreground">{user.email}</div>
            </div>
            <button
              onClick={signOut}
              className="rounded p-1 text-muted-foreground hover:text-destructive"
              aria-label="Sign out"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <Button size="sm" variant="secondary" className="w-full" onClick={handleSignIn}>
            <LogIn className="mr-1.5 h-3.5 w-3.5" /> Sign in with Google
          </Button>
        )}
        {!GOOGLE_CLIENT_ID && (
          <p className="mt-1 text-[10px] leading-tight text-muted-foreground">
            Add your Google OAuth Client ID in <code>auth.ts</code> to enable sign-in.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Smartphone className="h-3.5 w-3.5" /> Device / Store
        </label>
        <Select
          value={platform}
          onValueChange={(v: "ios" | "android") => {
            store.set({ platform: v });
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
          value={isCustom ? CUSTOM_LABEL : canvas.label}
          onValueChange={(v) => {
            if (v === CUSTOM_LABEL) {
              setCustomW(String(canvas.width));
              setCustomH(String(canvas.height));
              return;
            }
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
            <SelectItem value={CUSTOM_LABEL}>{CUSTOM_LABEL}</SelectItem>
          </SelectContent>
        </Select>

        {isCustom && (
          <div className="rounded-md border border-border bg-surface p-2 space-y-2">
            <Label className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Ruler className="h-3 w-3" /> Custom canvas (pixels)
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-[10px]">Width</Label>
                <Input
                  type="number"
                  min={100}
                  max={8000}
                  value={customW}
                  onChange={(e) => setCustomW(e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              <div>
                <Label className="text-[10px]">Height</Label>
                <Input
                  type="number"
                  min={100}
                  max={8000}
                  value={customH}
                  onChange={(e) => setCustomH(e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
            </div>
            <Button size="sm" variant="secondary" className="w-full" onClick={applyCustomSize}>
              Apply size
            </Button>
            <p className="text-[10px] text-muted-foreground">
              Current: {canvas.width} × {canvas.height}px
            </p>
          </div>
        )}
      </div>

      <Button onClick={exportPng} className="w-full font-semibold">
        <Download className="mr-2 h-4 w-4" />
        {user ? "Export PNG" : "Sign in to Export"}
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
        Drag layers on the canvas. Editing is free — sign in with Google to export.
      </div>
    </aside>
  );
}
