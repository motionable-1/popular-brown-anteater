import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, Img, interpolate } from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";

const SUPABASE_LOGO = "https://api.iconify.design/simple-icons/supabase.svg?color=%233ECF8E&width=64&height=64";

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance with spring
  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 }, delay: 5 });
  const logoRotate = interpolate(logoScale, [0, 1], [45, 0]);
  const logoGlow = interpolate(frame, [15, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Decorative green line
  const lineWidth = spring({ frame, fps, config: { damping: 20, stiffness: 120 }, delay: 35 });

  // Floating particles
  const time = frame / fps;
  const particles = Array.from({ length: 6 }, (_, i) => {
    const x = 15 + i * 14 + Math.sin(time * 0.5 + i * 1.2) * 8;
    const y = 20 + Math.cos(time * 0.4 + i * 0.8) * 15 + i * 10;
    const size = 3 + i * 0.5;
    const opacity = interpolate(frame, [10 + i * 5, 25 + i * 5], [0, 0.3 + Math.sin(time + i) * 0.15], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return { x, y, size, opacity };
  });

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: "#3ECF8E",
            opacity: p.opacity,
            filter: "blur(1px)",
          }}
        />
      ))}

      {/* Center content */}
      <div style={{ position: "absolute", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        {/* Logo */}
        <div
          style={{
            transform: `scale(${logoScale}) rotate(${logoRotate}deg)`,
            filter: `drop-shadow(0 0 ${logoGlow * 30}px rgba(62,207,142,0.5))`,
          }}
        >
          <Img src={SUPABASE_LOGO} style={{ width: 80, height: 80 }} />
        </div>

        {/* Brand name */}
        <TextAnimation
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "chars" });
            tl.from(split.chars, {
              opacity: 0,
              y: 40,
              rotateX: -90,
              stagger: 0.04,
              duration: 0.6,
              ease: "back.out(1.7)",
            });
            return tl;
          }}
          startFrom={12}
          style={{ fontSize: 72, fontWeight: 700, color: "#FAFAFA", letterSpacing: "-0.02em" }}
          perspective={600}
        >
          supabase
        </TextAnimation>

        {/* Green accent line */}
        <div
          style={{
            width: `${lineWidth * 120}px`,
            height: 3,
            background: "linear-gradient(90deg, transparent, #3ECF8E, transparent)",
            borderRadius: 2,
          }}
        />

        {/* Tagline */}
        <TextAnimation
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "words" });
            tl.from(split.words, {
              opacity: 0,
              y: 15,
              stagger: 0.06,
              duration: 0.4,
              ease: "power2.out",
            });
            return tl;
          }}
          startFrom={50}
          style={{ fontSize: 22, color: "rgba(250,250,250,0.6)", fontWeight: 400, letterSpacing: "0.03em" }}
        >
          Build in a weekend. Scale to millions.
        </TextAnimation>

        {/* Sub tagline */}
        <TextAnimation
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "words" });
            tl.from(split.words, {
              opacity: 0,
              y: 10,
              stagger: 0.05,
              duration: 0.35,
              ease: "power2.out",
            });
            return tl;
          }}
          startFrom={70}
          style={{ fontSize: 16, color: "#3ECF8E", fontWeight: 500, letterSpacing: "0.05em" }}
        >
          The Open Source Firebase Alternative
        </TextAnimation>
      </div>
    </AbsoluteFill>
  );
};
