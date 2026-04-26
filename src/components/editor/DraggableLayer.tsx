import { useEffect, useRef, type ReactNode } from "react";
import { store } from "./store";

type Props = {
  id: string;
  x: number;
  y: number;
  selected: boolean;
  scale: number; // canvas display scale
  children: ReactNode;
  onChange: (x: number, y: number) => void;
};

export function DraggableLayer({ id, x, y, selected, scale, children, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!drag.current) return;
      const dx = (e.clientX - drag.current.sx) / scale;
      const dy = (e.clientY - drag.current.sy) / scale;
      onChange(drag.current.ox + dx, drag.current.oy + dy);
    };
    const onUp = () => (drag.current = null);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [scale, onChange]);

  return (
    <div
      ref={ref}
      onPointerDown={(e) => {
        e.stopPropagation();
        store.select(id);
        drag.current = { sx: e.clientX, sy: e.clientY, ox: x, oy: y };
      }}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        cursor: "move",
        outline: selected ? "2px dashed rgba(190, 240, 100, 0.9)" : "none",
        outlineOffset: 6,
      }}
    >
      {children}
    </div>
  );
}
