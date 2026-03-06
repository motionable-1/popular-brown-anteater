import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, Img, interpolate } from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";

const SUPABASE_LOGO = "https://api.iconify.design/simple-icons/supabase.svg?color=%233ECF8E&width=48&height=48";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Logo
  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, delay: 5 });
  const logoGlow = interpolate(frame, [10, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // CTA button
  const btnScale = spring({ frame, fps, config: { damping: 10, stiffness: 90 }, delay: 35 });
  const btnOpacity = interpolate(frame, [35, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Pulsing glow behind button
  const pulseScale = 1 + Math.sin(time * 2.5) * 0.03;

  // URL entrance
  const urlOpacity = interpolate(frame, [50, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const urlY = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, delay: 50 });

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(62,207,142,0.15), transparent 70%)",
          opacity: logoGlow,
          transform: `scale(${pulseScale})`,
        }}
      />

      <div style={{ position: "absolute", display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        {/* Logo */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            filter: `drop-shadow(0 0 ${logoGlow * 25}px rgba(62,207,142,0.4))`,
          }}
        >
          <Img src={SUPABASE_LOGO} style={{ width: 56, height: 56 }} />
        </div>

        {/* Main CTA text */}
        <TextAnimation
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "chars" });
            tl.from(split.chars, {
              opacity: 0,
              scale: 0.5,
              stagger: 0.03,
              duration: 0.5,
              ease: "back.out(1.5)",
            });
            return tl;
          }}
          startFrom={12}
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#FAFAFA",
            letterSpacing: "-0.02em",
            textAlign: "center",
          }}
        >
          Start Building Today
        </TextAnimation>

        {/* CTA Button */}
        <div
          style={{
            opacity: btnOpacity,
            transform: `scale(${btnScale})`,
          }}
        >
          <div
            style={{
              padding: "14px 40px",
              background: "linear-gradient(135deg, #006239, #3ECF8E)",
              borderRadius: 10,
              fontSize: 18,
              fontWeight: 600,
              color: "#FAFAFA",
              boxShadow: "0 4px 24px rgba(62,207,142,0.3)",
              letterSpacing: "0.02em",
            }}
          >
            Start Your Project →
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            opacity: urlOpacity,
            transform: `translateY(${(1 - urlY) * 15}px)`,
          }}
        >
          <TextAnimation
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "chars" });
              tl.from(split.chars, {
                opacity: 0,
                stagger: 0.02,
                duration: 0.3,
                ease: "power2.out",
              });
              return tl;
            }}
            startFrom={55}
            style={{ fontSize: 16, color: "rgba(250,250,250,0.4)", fontWeight: 400, letterSpacing: "0.05em" }}
          >
            supabase.com
          </TextAnimation>
        </div>
      </div>
    </AbsoluteFill>
  );
};
