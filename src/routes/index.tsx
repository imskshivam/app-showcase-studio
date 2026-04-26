import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Menu, SlidersHorizontal } from "lucide-react";
import { Canvas } from "@/components/editor/Canvas";
import { LeftSidebar } from "@/components/editor/LeftSidebar";
import { RightPanel } from "@/components/editor/RightPanel";
import { TopBar } from "@/components/editor/TopBar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Route = createFileRoute("/")({
  component: Editor,
  head: () => ({
    meta: [
      { title: "ShotForge — App Store & Play Store Screenshot Generator" },
      {
        name: "description",
        content:
          "Design beautiful App Store and Play Store screenshots. iOS & Android frames, 3D depth, draggable text and images, instant PNG export.",
      },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
    ],
  }),
});

function Editor() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <div className="flex h-[100dvh] w-screen overflow-hidden bg-background text-foreground">
      {/* Desktop left sidebar */}
      <div className="hidden md:flex">
        <LeftSidebar canvasRef={canvasRef} />
      </div>

      <main className="flex flex-1 flex-col min-w-0">
        {/* Mobile header */}
        <div className="flex md:hidden h-12 items-center justify-between border-b border-border bg-sidebar px-2">
          <Sheet open={leftOpen} onOpenChange={setLeftOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-surface"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0 bg-sidebar">
              <div onClick={() => setLeftOpen(false)}>
                <LeftSidebar canvasRef={canvasRef} />
              </div>
            </SheetContent>
          </Sheet>

          <span className="text-sm font-bold">ShotForge</span>

          <Sheet open={rightOpen} onOpenChange={setRightOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open editor"
                className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-surface"
              >
                <SlidersHorizontal className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm p-0 bg-sidebar">
              <RightPanel />
            </SheetContent>
          </Sheet>
        </div>

        <TopBar />
        <div className="flex-1 overflow-hidden">
          <Canvas ref={canvasRef} />
        </div>
      </main>

      {/* Desktop right panel */}
      <div className="hidden md:flex">
        <RightPanel />
      </div>
    </div>
  );
}
