import type { DeviceLayer } from "./types";

/**
 * Realistic phone frames built with SVG/CSS.
 * iPhone (Dynamic Island) and Android (centered punch hole).
 * Reference dimensions: width=420, height=860.
 */

type Props = {
  layer: DeviceLayer;
  is3D: boolean;
};

const FRAME_W = 420;
const FRAME_H = 860;

export function PhoneFrame({ layer, is3D }: Props) {
  const isIOS = layer.platform === "ios";
  const bezel = isIOS ? 14 : 12;
  const radius = isIOS ? 58 : 46;
  const innerRadius = radius - bezel;

  const bodyColor =
    layer.color === "silver" ? "#d4d4d8" : layer.color === "gold" ? "#d4af7a" : "#0a0a0a";
  const sideColor =
    layer.color === "silver" ? "#a1a1aa" : layer.color === "gold" ? "#9c8055" : "#1c1c1e";

  const transform = is3D
    ? `rotateX(${layer.rotation.rx}deg) rotateY(${layer.rotation.ry}deg) rotateZ(${layer.rotation.rz}deg)`
    : `rotate(${layer.rotation.rz}deg)`;

  return (
    <div
      style={{
        width: FRAME_W,
        height: FRAME_H,
        transform: `${transform} scale(${layer.scale})`,
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease",
        position: "relative",
      }}
    >
      {/* Side depth (visible in 3D) */}
      {is3D && (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: radius,
              background: sideColor,
              transform: "translateZ(-12px)",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.4)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: radius,
              background: `linear-gradient(90deg, ${sideColor}, ${bodyColor}, ${sideColor})`,
              transform: "translateZ(-6px)",
              opacity: 0.9,
            }}
          />
        </>
      )}

      {/* Body */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          background: `linear-gradient(135deg, ${bodyColor} 0%, ${sideColor} 50%, ${bodyColor} 100%)`,
          padding: bezel,
          boxShadow: is3D
            ? "0 40px 80px -20px rgba(0,0,0,0.5), inset 0 0 0 1.5px rgba(255,255,255,0.08)"
            : "0 20px 60px -15px rgba(0,0,0,0.5), inset 0 0 0 1.5px rgba(255,255,255,0.08)",
        }}
      >
        {/* Screen */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: innerRadius,
            background: "#000",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {layer.screenshot ? (
            <img
              src={layer.screenshot}
              alt="screenshot"
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                userSelect: "none",
                pointerEvents: "none",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#444",
                fontSize: 14,
                background:
                  "repeating-linear-gradient(45deg, #0a0a0a, #0a0a0a 12px, #111 12px, #111 24px)",
              }}
            >
              No screenshot
            </div>
          )}

          {/* iOS Dynamic Island */}
          {isIOS && (
            <div
              style={{
                position: "absolute",
                top: 10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 110,
                height: 32,
                background: "#000",
                borderRadius: 18,
                zIndex: 2,
              }}
            />
          )}

          {/* Android punch hole */}
          {!isIOS && (
            <div
              style={{
                position: "absolute",
                top: 14,
                left: "50%",
                transform: "translateX(-50%)",
                width: 18,
                height: 18,
                background: "#000",
                borderRadius: 9,
                boxShadow: "inset 0 0 0 1px #222",
                zIndex: 2,
              }}
            />
          )}
        </div>

        {/* Side buttons */}
        <div
          style={{
            position: "absolute",
            left: -2,
            top: 140,
            width: 3,
            height: 30,
            background: sideColor,
            borderRadius: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -2,
            top: 200,
            width: 3,
            height: 50,
            background: sideColor,
            borderRadius: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -2,
            top: 270,
            width: 3,
            height: 50,
            background: sideColor,
            borderRadius: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -2,
            top: 200,
            width: 3,
            height: 70,
            background: sideColor,
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
}

export const PHONE_FRAME_SIZE = { width: FRAME_W, height: FRAME_H };
