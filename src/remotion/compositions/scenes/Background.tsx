import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Noise } from "../../library/components/effects/Noise";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Slowly drifting gradient orbs
  const orbX1 = 25 + Math.sin(time * 0.3) * 8;
  const orbY1 = 20 + Math.cos(time * 0.2) * 6;
  const orbX2 = 70 + Math.sin(time * 0.25 + 1) * 10;
  const orbY2 = 65 + Math.cos(time * 0.35 + 2) * 8;
  const orbX3 = 50 + Math.sin(time * 0.15 + 3) * 12;
  const orbY3 = 85 + Math.cos(time * 0.28 + 1) * 5;

  // Subtle grid pulse
  const gridOpacity = interpolate(
    Math.sin(time * 0.5),
    [-1, 1],
    [0.03, 0.07]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#121212" }}>
      {/* Gradient orbs */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at ${orbX1}% ${orbY1}%, rgba(0,98,57,0.35), transparent 45%),
            radial-gradient(circle at ${orbX2}% ${orbY2}%, rgba(62,207,142,0.15), transparent 40%),
            radial-gradient(circle at ${orbX3}% ${orbY3}%, rgba(0,98,57,0.12), transparent 50%)
          `,
        }}
      />

      {/* Subtle dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, rgba(62,207,142,0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          opacity: gridOpacity,
        }}
      />

      {/* Film grain */}
      <Noise type="subtle" intensity={0.3} speed={0.5} opacity={0.4} blend="overlay" />
    </AbsoluteFill>
  );
};
