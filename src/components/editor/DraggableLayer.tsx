import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
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
  const innerRef = useRef<HTMLDivElement>(null);
  const resize = useRef<{ startDist: number } | null>(null);
  // Visible (transformed) bounds of the children, in CSS pixels relative to the wrapper center.
  const [bounds, setBounds] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  // Measure the rendered size of the children so the resize handle can sit on
  // the visible bottom-right corner even when children apply their own scale
  // transform (e.g. PhoneFrame scaled by layer.scale).
  useLayoutEffect(() => {
    if (!innerRef.current || !ref.current) return;
    const measure = () => {
      const inner = innerRef.current?.getBoundingClientRect();
      if (!inner) return;
      // Divide by the canvas display scale by comparing to wrapper rect — but
      // since both are in the same scaled coordinate space, raw pixel size is
      // fine for placing the absolute-positioned handle.
      setBounds({ w: inner.width, h: inner.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(innerRef.current);
    // Also re-measure when ancestors change (transform updates trigger this via children)
    const id = setInterval(measure, 250);
    return () => {
      ro.disconnect();
      clearInterval(id);
    };
  });

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
      {selected && showResizeHandle && onResize && (
        <div
          onPointerDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            const rect = ref.current?.getBoundingClientRect();
            if (!rect) return;
            const startDiag = Math.hypot(rect.width, rect.height) || 1;
            const startX = e.clientX;
            const startY = e.clientY;
            // Outward direction from element center to the handle (bottom-right).
            // Project pointer movement onto this direction so dragging
            // out = grow, dragging in = shrink, regardless of angle.
            const dirX = Math.SQRT1_2;
            const dirY = Math.SQRT1_2;
            let lastFactor = 1;
            const move = (ev: PointerEvent) => {
              const dx = ev.clientX - startX;
              const dy = ev.clientY - startY;
              const projected = dx * dirX + dy * dirY; // screen px along diagonal
              // Convert screen delta to factor relative to original diagonal.
              // Multiply by ~2 because diagonal grows on both sides of center.
              const factor = Math.max(
                0.1,
                1 + (projected * 2) / startDiag,
              );
              const delta = factor / lastFactor;
              if (Math.abs(delta - 1) > 0.001) {
                onResize(delta);
                lastFactor = factor;
              }
            };
            const up = () => {
              window.removeEventListener("pointermove", move);
              window.removeEventListener("pointerup", up);
              window.removeEventListener("pointercancel", up);
            };
            window.addEventListener("pointermove", move);
            window.addEventListener("pointerup", up);
            window.addEventListener("pointercancel", up);
          }}
          title="Drag to resize"
          style={{
            position: "absolute",
            right: -10,
            bottom: -10,
            width: 20,
            height: 20,
            borderRadius: 4,
            background: "rgba(190, 240, 100, 0.95)",
            border: "2px solid rgba(20, 30, 10, 0.6)",
            cursor: "nwse-resize",
            touchAction: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
}
