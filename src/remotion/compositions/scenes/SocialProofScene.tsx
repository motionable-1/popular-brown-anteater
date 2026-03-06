import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";

const COMPANIES = [
  { name: "GitHub", icon: "https://api.iconify.design/simple-icons/github.svg?color=%23FAFAFA&width=40" },
  { name: "Mozilla", icon: "https://api.iconify.design/simple-icons/mozilla.svg?color=%23FAFAFA&width=40" },
  { name: "1Password", icon: "https://api.iconify.design/simple-icons/1password.svg?color=%23FAFAFA&width=40" },
];

export const SocialProofScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Header text */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <TextAnimation
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "words" });
            tl.from(split.words, {
              opacity: 0,
              y: 25,
              stagger: 0.06,
              duration: 0.5,
              ease: "power3.out",
            });
            return tl;
          }}
          startFrom={5}
          style={{
            fontSize: 20,
            color: "rgba(250,250,250,0.45)",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}
        >
          Trusted by industry leaders
        </TextAnimation>

        {/* Green line */}
        <div
          style={{
            width: spring({ frame, fps, config: { damping: 18, stiffness: 100 }, delay: 15 }) * 60,
            height: 2,
            background: "#3ECF8E",
            borderRadius: 1,
          }}
        />
      </div>

      {/* Company logos */}
      <div
        style={{
          position: "absolute",
          top: "48%",
          display: "flex",
          alignItems: "center",
          gap: 80,
        }}
      >
        {COMPANIES.map((company, i) => {
          const companyScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, delay: 15 + i * 8 });
          const companyOpacity = interpolate(frame, [15 + i * 8, 30 + i * 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const floatY = Math.sin(time * 0.8 + i * 1.2) * 3;

          return (
            <div
              key={company.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
                opacity: companyOpacity,
                transform: `scale(${companyScale}) translateY(${floatY}px)`,
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 16,
                  background: "rgba(250,250,250,0.05)",
                  border: "1px solid rgba(250,250,250,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={company.icon} style={{ width: 32, height: 32 }} />
              </div>
              <span style={{ fontSize: 15, color: "rgba(250,250,250,0.5)", fontWeight: 500 }}>
                {company.name}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
