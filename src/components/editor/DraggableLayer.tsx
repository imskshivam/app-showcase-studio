import { useEffect, useRef, type ReactNode } from "react";
import { store } from "./store";

type GestureUpdate = {
  scaleDelta?: number; // multiplicative (e.g. 1.05)
  rotateDelta?: number; // degrees added to rz
};

type Props = {
  id: string;
  x: number;
  y: number;
  selected: boolean;
  scale: number; // canvas display scale
  children: ReactNode;
  onChange: (x: number, y: number) => void;
  onGesture?: (g: GestureUpdate) => void;
  /** Optional cursor-driven resize. Receives a multiplicative scale factor relative to gesture start. */
  onResize?: (factor: number) => void;
  /** When true, render a visible corner handle (used on desktop). */
  showResizeHandle?: boolean;
};

export function DraggableLayer({
  id,
  x,
  y,
  selected,
  scale,
  children,
  onChange,
  onGesture,
  onResize,
  showResizeHandle,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const resize = useRef<{ startDist: number } | null>(null);

  // Active pointers tracked on this layer (for pinch / rotate)
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  // Single-finger drag origin
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);
  // Two-finger gesture origin
  const gesture = useRef<{ dist: number; angle: number } | null>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!pointers.current.has(e.pointerId)) return;
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      // Two-finger pinch / rotate
      if (pointers.current.size >= 2 && onGesture) {
        const pts = Array.from(pointers.current.values());
        const dx = pts[1].x - pts[0].x;
        const dy = pts[1].y - pts[0].y;
        const dist = Math.hypot(dx, dy);
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        if (gesture.current) {
          const scaleDelta = dist / gesture.current.dist;
          const rotateDelta = angle - gesture.current.angle;
          if (scaleDelta !== 1 || rotateDelta !== 0) {
            onGesture({ scaleDelta, rotateDelta });
          }
        }
        gesture.current = { dist, angle };
        // Cancel single-finger drag while gesturing
        drag.current = null;
        return;
      }

      // Single-finger drag
      if (drag.current && pointers.current.size === 1) {
        const dx = (e.clientX - drag.current.sx) / scale;
        const dy = (e.clientY - drag.current.sy) / scale;
        onChange(drag.current.ox + dx, drag.current.oy + dy);
      }
    };

    const onUp = (e: PointerEvent) => {
      pointers.current.delete(e.pointerId);
      if (pointers.current.size < 2) gesture.current = null;
      if (pointers.current.size === 0) drag.current = null;
      else if (pointers.current.size === 1) {
        // Reset drag origin to remaining finger
        const [pt] = Array.from(pointers.current.values());
        drag.current = { sx: pt.x, sy: pt.y, ox: x, oy: y };
      }
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [scale, onChange, onGesture, x, y]);

  return (
    <div
      ref={ref}
      onPointerDown={(e) => {
        e.stopPropagation();
        store.select(id);
        pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pointers.current.size === 1) {
          drag.current = { sx: e.clientX, sy: e.clientY, ox: x, oy: y };
        } else if (pointers.current.size === 2) {
          const pts = Array.from(pointers.current.values());
          const dx = pts[1].x - pts[0].x;
          const dy = pts[1].y - pts[0].y;
          gesture.current = {
            dist: Math.hypot(dx, dy),
            angle: (Math.atan2(dy, dx) * 180) / Math.PI,
          };
          drag.current = null;
        }
      }}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        cursor: "move",
        outline: selected ? "2px dashed rgba(190, 240, 100, 0.9)" : "none",
        outlineOffset: 6,
        touchAction: "none", // disable browser pan/zoom so we own gestures
      }}
    >
      {children}
    </div>
  );
}
