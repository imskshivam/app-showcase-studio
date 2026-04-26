import { Box, Square, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { store, useStore, newId } from "./store";

export function TopBar() {
  const viewMode = useStore((s) => s.viewMode);
  const platform = useStore((s) => s.platform);
  const layers = useStore((s) => s.layers);
  const screenshots = layers.filter((l) => l.type === "device").length;

  const addPhone = () => {
    store.addLayer({
      id: newId(),
      type: "device",
      platform,
      x: 0,
      y: 60,
      scale: 1,
      rotation: { rx: 0, ry: 0, rz: 0 },
      color: "black",
    });
  };

  return (
    <div className="flex h-14 items-center justify-between border-b border-border bg-sidebar px-4">
      <Button size="sm" variant="secondary" onClick={addPhone}>
        <Plus className="mr-1.5 h-4 w-4" /> Add Screenshot
      </Button>

      <div className="flex items-center gap-1 rounded-full border border-border bg-surface p-1">
        <button
          onClick={() => store.set({ viewMode: "flat" })}
          className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition ${
            viewMode === "flat"
              ? "bg-background text-foreground shadow"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Square className="h-3.5 w-3.5" /> Flat
        </button>
        <button
          onClick={() => store.set({ viewMode: "3d" })}
          className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition ${
            viewMode === "3d"
              ? "bg-background text-foreground shadow"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Box className="h-3.5 w-3.5" /> 3D
        </button>
      </div>

      <div className="text-xs text-muted-foreground">
        {screenshots} screenshot{screenshots === 1 ? "" : "s"}
      </div>
    </div>
  );
}
