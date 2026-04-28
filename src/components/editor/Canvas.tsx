import { forwardRef, useEffect, useRef, useState } from "react";
import { store, useStore } from "./store";
import { DraggableLayer } from "./DraggableLayer";
import { PhoneFrame } from "./PhoneFrame";
import { ensureFontLoaded, preconnectGoogleFonts } from "./fonts";
import type { Background, Layer } from "./types";
import { Trash2 } from "lucide-react";

export const Canvas = forwardRef<HTMLDivElement>((_props, ref) => {
  const canvas = useStore((s) => s.canvas);
  const screens = useStore((s) => s.screens);
  const activeScreenId = useStore((s) => s.activeScreenId);
  const viewMode = useStore((s) => s.viewMode);

  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    preconnectGoogleFonts();
  }, []);

  useEffect(() => {
    screens.forEach((sc) =>
      sc.layers.forEach((l) => {
        if (l.type === "text") ensureFontLoaded(l.fontFamily);
      }),
    );
  }, [screens]);

  // Fit ALL screens into the viewport horizontally with a small gap
  useEffect(() => {
    const update = () => {
      const el = wrapRef.current;
      if (!el) return;
      const pad = 32;
      const gap = 24;
      const totalW = screens.length * canvas.width + (screens.length - 1) * gap;
      const sx = (el.clientWidth - pad) / totalW;
      const sy = (el.clientHeight - pad) / canvas.height;
      setScale(Math.min(sx, sy, 1));
    };
    update();
    const ro = new ResizeObserver(update);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [canvas.width, canvas.height, screens.length]);

  return (
    <div
      ref={wrapRef}
      className="flex h-full w-full items-center justify-center overflow-auto bg-background p-4"
      style={{ touchAction: "none" }}
      onPointerDown={() => store.select(null)}
    >
      <div
        className="flex items-center"
        style={{ gap: 24 * scale, perspective: 1600 }}
      >
        {screens.map((sc) => (
          <ScreenView
            key={sc.id}
            isActive={sc.id === activeScreenId}
            isOnly={screens.length === 1}
            screenId={sc.id}
            background={sc.background}
            layers={sc.layers}
            selectedLayerId={sc.selectedLayerId}
            canvasW={canvas.width}
            canvasH={canvas.height}
            scale={scale}
            viewMode={viewMode}
            // The export ref must point at the active screen so PNG export captures it
            exportRef={sc.id === activeScreenId ? ref : undefined}
          />
        ))}
      </div>
    </div>
  );
});
Canvas.displayName = "Canvas";

type ScreenViewProps = {
  isActive: boolean;
  isOnly: boolean;
  screenId: string;
  background: Background;
  layers: Layer[];
  selectedLayerId: string | null;
  canvasW: number;
  canvasH: number;
  scale: number;
  viewMode: "flat" | "3d";
  exportRef?: React.ForwardedRef<HTMLDivElement>;
};

function ScreenView({
  isActive,
  isOnly,
  screenId,
  background: bg,
  layers,
  selectedLayerId,
  canvasW,
  canvasH,
  scale,
  viewMode,
  exportRef,
}: ScreenViewProps) {
  const bgStyle =
    bg.kind === "solid"
      ? { background: bg.color1 }
      : bg.kind === "gradient"
        ? { background: `linear-gradient(${bg.angle}deg, ${bg.color1}, ${bg.color2})` }
        : {
            background: `url(${bg.image}) center/cover no-repeat, ${bg.color1}`,
          };

  const handleSelectScreen = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (!isActive) store.selectScreen(screenId);
    store.select(null);
  };

  return (
    <div
      style={{
        width: canvasW * scale,
        height: canvasH * scale,
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* Active outline */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: -6,
          borderRadius: 14,
          pointerEvents: "none",
          outline: isActive ? "2px solid hsl(var(--primary, 142 76% 60%))" : "none",
          outlineOffset: 0,
          transition: "outline-color 0.15s ease",
          boxShadow: isActive ? "0 0 0 4px rgba(132, 204, 22, 0.15)" : "none",
        }}
      />

      {/* Per-screen toolbar */}
      {!isOnly && (
        <button
          onPointerDown={(e) => {
            e.stopPropagation();
            if (confirm("Delete this screen?")) store.removeScreen(screenId);
          }}
          className="absolute -top-7 right-0 flex h-6 items-center gap-1 rounded-md bg-surface px-2 text-[11px] text-muted-foreground hover:text-destructive"
          aria-label="Delete screen"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      )}

      <div
        ref={exportRef}
        data-canvas
        onPointerDown={handleSelectScreen}
        style={{
          width: canvasW,
          height: canvasH,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "relative",
          overflow: "hidden",
          borderRadius: 8,
          boxShadow: "0 20px 60px -10px rgba(0,0,0,0.6)",
          cursor: isActive ? "default" : "pointer",
          ...bgStyle,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            perspective: 2000,
          }}
        >
          {layers.map((l) => {
            const sel = isActive && l.id === selectedLayerId;
            // When a screen isn't active, swallow pointer events on its layers
            // so clicking anywhere selects the screen instead of dragging.
            const interactive = isActive;
            const wrapper = (child: React.ReactNode) =>
              interactive ? (
                child
              ) : (
                <div style={{ pointerEvents: "none" }}>{child}</div>
              );

            if (l.type === "device") {
              return (
                <div key={l.id}>
                  {wrapper(
                    <DraggableLayer
                      id={l.id}
                      x={l.x}
                      y={l.y}
                      selected={sel}
                      scale={scale}
                      onChange={(x, y) => store.updateLayer(l.id, { x, y })}
                      showResizeHandle
                      onResize={(factor) => {
                        const nextScale = Math.min(6, Math.max(0.3, l.scale * factor));
                        store.updateLayer(l.id, { scale: nextScale });
                      }}
                      onGesture={({ scaleDelta, rotateDelta }) => {
                        const nextScale = Math.min(
                          6,
                          Math.max(0.3, l.scale * (scaleDelta ?? 1)),
                        );
                        store.updateLayer(l.id, {
                          scale: nextScale,
                          rotation: {
                            ...l.rotation,
                            rz: l.rotation.rz + (rotateDelta ?? 0),
                          },
                        });
                      }}
                    >
                      <PhoneFrame layer={l} is3D={viewMode === "3d"} />
                    </DraggableLayer>,
                  )}
                </div>
              );
            }
            if (l.type === "text") {
              return (
                <div key={l.id}>
                  {wrapper(
                    <DraggableLayer
                      id={l.id}
                      x={l.x}
                      y={l.y}
                      selected={sel}
                      scale={scale}
                      onChange={(x, y) => store.updateLayer(l.id, { x, y })}
                      showResizeHandle
                      onResize={(factor) => {
                        store.updateLayer(l.id, {
                          fontSize: Math.min(800, Math.max(8, l.fontSize * factor)),
                          width: Math.min(4000, Math.max(40, l.width * factor)),
                        });
                      }}
                    >
                      <div
                        style={{
                          width: l.width,
                          fontSize: l.fontSize,
                          color: l.color,
                          fontWeight: l.fontWeight,
                          fontFamily: l.fontFamily,
                          textAlign: l.align,
                          lineHeight: 1.15,
                          userSelect: "none",
                        }}
                      >
                        {l.text}
                      </div>
                    </DraggableLayer>,
                  )}
                </div>
              );
            }
            return (
              <div key={l.id}>
                {wrapper(
                  <DraggableLayer
                    id={l.id}
                    x={l.x}
                    y={l.y}
                    selected={sel}
                    scale={scale}
                    onChange={(x, y) => store.updateLayer(l.id, { x, y })}
                    showResizeHandle
                    onResize={(factor) => {
                      store.updateLayer(l.id, {
                        width: Math.min(4000, Math.max(20, l.width * factor)),
                        height: Math.min(4000, Math.max(20, l.height * factor)),
                      });
                    }}
                  >
                    <img
                      src={l.src}
                      alt=""
                      draggable={false}
                      style={{
                        width: l.width,
                        height: l.height,
                        transform: `rotate(${l.rotation}deg)`,
                        opacity: l.opacity,
                        pointerEvents: "none",
                        userSelect: "none",
                      }}
                    />
                  </DraggableLayer>,
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
