import { Box, Square, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { store, useStore } from "./store";

export function TopBar() {
  const viewMode = useStore((s) => s.viewMode);
  const screens = useStore((s) => s.screens);

  return (
    <div className="flex h-12 sm:h-14 items-center justify-between gap-2 border-b border-border bg-sidebar px-2 sm:px-4">
      <Button
        size="sm"
        variant="secondary"
        onClick={() => store.addScreen()}
        className="shrink-0"
      >
        <Plus className="mr-1 h-4 w-4 sm:mr-1.5" />
        <span className="hidden xs:inline sm:inline">Add Screenshot</span>
        <span className="xs:hidden sm:hidden">Add</span>
      </Button>

      <div className="flex items-center gap-1 rounded-full border border-border bg-surface p-1">
        <button
          onClick={() => store.set({ viewMode: "flat" })}
          className={`flex items-center gap-1.5 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium transition ${
            viewMode === "flat"
              ? "bg-background text-foreground shadow"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Square className="h-3.5 w-3.5" /> Flat
        </button>
        <button
          onClick={() => store.set({ viewMode: "3d" })}
          className={`flex items-center gap-1.5 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium transition ${
            viewMode === "3d"
              ? "bg-background text-foreground shadow"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Box className="h-3.5 w-3.5" /> 3D
        </button>
      </div>

      <div className="hidden sm:block text-xs text-muted-foreground">
        {screens.length} screen{screens.length === 1 ? "" : "s"}
      </div>
    </div>
  );
}
