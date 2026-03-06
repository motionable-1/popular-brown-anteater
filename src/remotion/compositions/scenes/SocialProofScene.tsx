import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
} from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";

const COMPANIES = [
  {
    name: "GitHub",
    icon: "https://api.iconify.design/simple-icons/github.svg?color=%23FAFAFA&width=36",
  },
  {
    name: "Mozilla",
    icon: "https://api.iconify.design/simple-icons/mozilla.svg?color=%23FAFAFA&width=36",
  },
  {
    name: "1Password",
    icon: "https://api.iconify.design/simple-icons/1password.svg?color=%23FAFAFA&width=36",
  },
  {
    name: "Notion",
    icon: "https://api.iconify.design/simple-icons/notion.svg?color=%23FAFAFA&width=36",
  },
];

interface StatItem {
  endValue: number;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  { endValue: 1, suffix: "M+", label: "Applications" },
  { endValue: 200, suffix: "K+", label: "Developers" },
  { endValue: 99.9, suffix: "%", label: "Uptime SLA" },
];

/** Animated counter */
const AnimatedStat: React.FC<{
  stat: StatItem;
  delay: number;
}> = ({ stat, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(frame, [delay, delay + 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Ease out cubic
  const eased = 1 - Math.pow(1 - progress, 3);
  const current = stat.endValue * eased;

  // Format value
  let display: string;
  if (stat.endValue < 10) {
    display = current.toFixed(0);
  } else if (stat.endValue === 99.9) {
    display = current.toFixed(1);
  } else {
    display = Math.round(current).toString();
  }

  const scale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
    delay,
  });
  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <span
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#3ECF8E",
            letterSpacing: "-0.02em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {display}
        </span>
        <span
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "#3ECF8E",
            opacity: 0.7,
            marginLeft: 2,
          }}
        >
          {stat.suffix}
        </span>
      </div>
      <span
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: "rgba(250,250,250,0.5)",
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
        }}
      >
        {stat.label}
      </span>
    </div>
  );
};

export const SocialProofScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  return (
    <AbsoluteFill
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {/* Header text */}
      <div
        style={{
          position: "absolute",
          top: "16%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
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
            color: "rgba(250,250,250,0.5)",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
          }}
        >
          Trusted by industry leaders
        </TextAnimation>

        {/* Green line */}
        <div
          style={{
            width:
              spring({
                frame,
                fps,
                config: { damping: 18, stiffness: 100 },
                delay: 15,
              }) * 80,
            height: 2,
            background: "#3ECF8E",
            borderRadius: 1,
            boxShadow: "0 0 8px rgba(62,207,142,0.3)",
          }}
        />
      </div>

      {/* Stats row */}
      <div
        style={{
          position: "absolute",
          top: "33%",
          display: "flex",
          alignItems: "center",
          gap: 120,
        }}
      >
        {STATS.map((stat, i) => (
          <AnimatedStat key={stat.label} stat={stat} delay={12 + i * 8} />
        ))}
      </div>

      {/* Divider */}
      <div
        style={{
          position: "absolute",
          top: "54%",
          width: interpolate(frame, [40, 60], [0, 600], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(62,207,142,0.2), transparent)",
        }}
      />

      {/* Company logos */}
      <div
        style={{
          position: "absolute",
          top: "62%",
          display: "flex",
          alignItems: "center",
          gap: 80,
        }}
      >
        {COMPANIES.map((company, i) => {
          const companyScale = spring({
            frame,
            fps,
            config: { damping: 12, stiffness: 80 },
            delay: 35 + i * 7,
          });
          const companyOpacity = interpolate(
            frame,
            [35 + i * 7, 50 + i * 7],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
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
                <Img
                  src={company.icon}
                  style={{ width: 32, height: 32 }}
                />
              </div>
              <span
                style={{
                  fontSize: 15,
                  color: "rgba(250,250,250,0.55)",
                  fontWeight: 500,
                }}
              >
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
          bottom: "12%",
          width: interpolate(frame, [60, 85], [0, 500], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(62,207,142,0.25), transparent)",
        }}
      />
    </AbsoluteFill>
  );
};
