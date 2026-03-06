import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Img,
  interpolate,
} from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";

const SUPABASE_LOGO =
  "https://api.iconify.design/simple-icons/supabase.svg?color=%233ECF8E&width=48&height=48";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Logo
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
    delay: 5,
  });
  const logoGlow = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA button
  const btnScale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 90 },
    delay: 35,
  });
  const btnOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing glow behind button
  const pulseScale = 1 + Math.sin(time * 2.5) * 0.04;

  // URL entrance
  const urlOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const urlY = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
    delay: 50,
  });

  // Decorative rings
  const ring1 = spring({
    frame,
    fps,
    config: { damping: 25, stiffness: 40 },
    delay: 8,
  });
  const ring2 = spring({
    frame,
    fps,
    config: { damping: 25, stiffness: 40 },
    delay: 15,
  });

  return (
    <AbsoluteFill
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(62,207,142,0.18), transparent 70%)",
          opacity: logoGlow,
          transform: `scale(${pulseScale})`,
        }}
      />

      {/* Decorative rings */}
      <div
        style={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          border: "1px solid rgba(62,207,142,0.08)",
          opacity: ring1,
          transform: `scale(${ring1}) rotate(${time * 8}deg)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 240,
          height: 240,
          borderRadius: "50%",
          border: "1px solid rgba(62,207,142,0.06)",
          opacity: ring2,
          transform: `scale(${ring2}) rotate(${-time * 12}deg)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
        }}
      >
        {/* Logo */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            filter: `drop-shadow(0 0 ${logoGlow * 30}px rgba(62,207,142,0.45))`,
          }}
        >
          <Img src={SUPABASE_LOGO} style={{ width: 60, height: 60 }} />
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
            fontSize: 54,
            fontWeight: 700,
            color: "#FAFAFA",
            letterSpacing: "-0.02em",
            textAlign: "center",
          }}
        >
          Start Building Today
        </TextAnimation>

        {/* Subtitle */}
        <TextAnimation
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "words" });
            tl.from(split.words, {
              opacity: 0,
              y: 12,
              stagger: 0.05,
              duration: 0.4,
              ease: "power2.out",
            });
            return tl;
          }}
          startFrom={28}
          style={{
            fontSize: 20,
            color: "rgba(250,250,250,0.55)",
            fontWeight: 400,
            textAlign: "center",
            letterSpacing: "0.02em",
          }}
        >
          Free tier included. No credit card required.
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
              padding: "16px 48px",
              background: "linear-gradient(135deg, #006239, #3ECF8E)",
              borderRadius: 10,
              fontSize: 19,
              fontWeight: 600,
              color: "#FAFAFA",
              boxShadow:
                "0 4px 30px rgba(62,207,142,0.35), 0 0 60px rgba(62,207,142,0.12)",
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
            style={{
              fontSize: 17,
              color: "rgba(250,250,250,0.5)",
              fontWeight: 400,
              letterSpacing: "0.06em",
            }}
          >
            supabase.com
          </TextAnimation>
        </div>
      </div>
    </AbsoluteFill>
  );
};
