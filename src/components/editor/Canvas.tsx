import { forwardRef, useEffect, useRef, useState } from "react";
import { store, useStore } from "./store";
import { DraggableLayer } from "./DraggableLayer";
import { PhoneFrame } from "./PhoneFrame";

export const Canvas = forwardRef<HTMLDivElement>((_props, ref) => {
  const canvas = useStore((s) => s.canvas);
  const bg = useStore((s) => s.background);
  const layers = useStore((s) => s.layers);
  const selectedId = useStore((s) => s.selectedId);
  const viewMode = useStore((s) => s.viewMode);

  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const update = () => {
      const el = wrapRef.current;
      if (!el) return;
      const pad = 32;
      const sx = (el.clientWidth - pad) / canvas.width;
      const sy = (el.clientHeight - pad) / canvas.height;
      setScale(Math.min(sx, sy, 1));
    };
    update();
    const ro = new ResizeObserver(update);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [canvas.width, canvas.height]);

  const bgStyle =
    bg.kind === "solid"
      ? { background: bg.color1 }
      : bg.kind === "gradient"
        ? { background: `linear-gradient(${bg.angle}deg, ${bg.color1}, ${bg.color2})` }
        : {
            background: `url(${bg.image}) center/cover no-repeat, ${bg.color1}`,
          };

  return (
    <div
      ref={wrapRef}
      className="flex h-full w-full items-center justify-center overflow-hidden bg-background p-4"
      onPointerDown={() => store.select(null)}
    >
      <div
        style={{
          width: canvas.width * scale,
          height: canvas.height * scale,
          perspective: 1600,
        }}
      >
        <div
          ref={ref}
          data-canvas
          style={{
            width: canvas.width,
            height: canvas.height,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "relative",
            overflow: "hidden",
            borderRadius: 8,
            boxShadow: "0 20px 60px -10px rgba(0,0,0,0.6)",
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
              const sel = l.id === selectedId;
              if (l.type === "device") {
                return (
                  <DraggableLayer
                    key={l.id}
                    id={l.id}
                    x={l.x}
                    y={l.y}
                    selected={sel}
                    scale={scale}
                    onChange={(x, y) => store.updateLayer(l.id, { x, y })}
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
                  </DraggableLayer>
                );
              }
              if (l.type === "text") {
                return (
                  <DraggableLayer
                    key={l.id}
                    id={l.id}
                    x={l.x}
                    y={l.y}
                    selected={sel}
                    scale={scale}
                    onChange={(x, y) => store.updateLayer(l.id, { x, y })}
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
                  </DraggableLayer>
                );
              }
              return (
                <DraggableLayer
                  key={l.id}
                  id={l.id}
                  x={l.x}
                  y={l.y}
                  selected={sel}
                  scale={scale}
                  onChange={(x, y) => store.updateLayer(l.id, { x, y })}
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
                </DraggableLayer>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});
Canvas.displayName = "Canvas";
