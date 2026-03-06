import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";

const COMPANIES = [
  { name: "GitHub", icon: "https://api.iconify.design/simple-icons/github.svg?color=%23FAFAFA&width=40" },
  { name: "Mozilla", icon: "https://api.iconify.design/simple-icons/mozilla.svg?color=%23FAFAFA&width=40" },
  { name: "1Password", icon: "https://api.iconify.design/simple-icons/1password.svg?color=%23FAFAFA&width=40" },
  { name: "PWC", icon: "https://api.iconify.design/simple-icons/pwc.svg?color=%23FAFAFA&width=40" },
];

const STATS = [
  { value: "1M+", label: "Applications" },
  { value: "200K+", label: "Developers" },
  { value: "99.9%", label: "Uptime" },
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
          top: "18%",
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
            fontSize: 18,
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

      {/* Stats row */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          display: "flex",
          alignItems: "center",
          gap: 100,
        }}
      >
        {STATS.map((stat, i) => {
          const statScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, delay: 12 + i * 6 });
          const statOpacity = interpolate(frame, [12 + i * 6, 25 + i * 6], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                opacity: statOpacity,
                transform: `scale(${statScale})`,
              }}
            >
              <span
                style={{
                  fontSize: 44,
                  fontWeight: 700,
                  color: "#3ECF8E",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "rgba(250,250,250,0.4)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase" as const,
                }}
              >
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Company logos */}
      <div
        style={{
          position: "absolute",
          top: "62%",
          display: "flex",
          alignItems: "center",
          gap: 70,
        }}
      >
        {COMPANIES.map((company, i) => {
          const companyScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, delay: 30 + i * 7 });
          const companyOpacity = interpolate(frame, [30 + i * 7, 45 + i * 7], [0, 1], {
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

      {/* Bottom glow line */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          width: interpolate(frame, [55, 80], [0, 500], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(62,207,142,0.3), transparent)",
        }}
      />
    </AbsoluteFill>
  );
};
