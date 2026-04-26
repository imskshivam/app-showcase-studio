import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { Canvas } from "@/components/editor/Canvas";
import { LeftSidebar } from "@/components/editor/LeftSidebar";
import { RightPanel } from "@/components/editor/RightPanel";
import { TopBar } from "@/components/editor/TopBar";

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
    ],
  }),
});

function Editor() {
  const canvasRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      <LeftSidebar canvasRef={canvasRef} />
      <main className="flex flex-1 flex-col">
        <TopBar />
        <div className="flex-1 overflow-hidden">
          <Canvas ref={canvasRef} />
        </div>
      </main>
      <RightPanel />
    </div>
  );
}
