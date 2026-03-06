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
import { ShapeAnimation } from "../../library/components/effects/ShapeAnimation";

interface FeatureSceneProps {
  iconUrl: string;
  title: string;
  description: string;
  index: number;
  bullets?: string[];
  codeSnippet?: string;
}

export const FeatureScene: React.FC<FeatureSceneProps> = ({
  iconUrl,
  title,
  description,
  index,
  bullets = [],
  codeSnippet,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Icon entrance
  const iconScale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 90 },
    delay: 5,
  });
  const iconOpacity = interpolate(frame, [5, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Decorative ring
  const ringScale = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 60 },
    delay: 3,
  });
  const ringOpacity = interpolate(frame, [3, 20], [0, 0.18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Accent line
  const lineScale = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 140 },
    delay: 20,
  });

  // Feature number
  const numOpacity = interpolate(frame, [0, 15], [0, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const numScale = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 60 },
    delay: 0,
  });

  // Floating accent dots
  const dots = Array.from({ length: 5 }, (_, i) => ({
    x: 62 + i * 8 + Math.sin(time * 0.6 + i) * 5,
    y: 20 + i * 14 + Math.cos(time * 0.5 + i * 1.5) * 8,
    opacity: interpolate(
      frame,
      [15 + i * 4, 30 + i * 4],
      [0, 0.2 + Math.sin(time + i) * 0.1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    ),
    size: 3 + i,
  }));

  // Right panel entrance
  const rightPanelOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightPanelX = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 80 },
    delay: 25,
  });

  return (
    <AbsoluteFill
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {/* Large background number with parallax drift */}
      <div
        style={{
          position: "absolute",
          right: `${6 + Math.sin(time * 0.15) * 1.5}%`,
          top: `${6 + Math.cos(time * 0.12) * 1}%`,
          fontSize: 300,
          fontWeight: 900,
          color: "#3ECF8E",
          opacity: numOpacity,
          transform: `scale(${numScale})`,
          lineHeight: 1,
        }}
      >
        0{index}
      </div>

      {/* Floating accent dots */}
      {dots.map((d, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            borderRadius: "50%",
            backgroundColor: "#3ECF8E",
            opacity: d.opacity,
          }}
        />
      ))}

      {/* Main content - left aligned */}
      <div
        style={{
          position: "absolute",
          left: "8%",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 22,
          maxWidth: "44%",
        }}
      >
        {/* Icon with ring */}
        <div style={{ position: "relative", width: 72, height: 72 }}>
          {/* Background ring */}
          <div
            style={{
              position: "absolute",
              top: -14,
              left: -14,
              width: 100,
              height: 100,
              borderRadius: "50%",
              border: "2px solid #3ECF8E",
              opacity: ringOpacity,
              transform: `scale(${ringScale})`,
            }}
          />
          {/* Rotating decorative shape */}
          <div style={{ position: "absolute", top: -40, left: -40 }}>
            <ShapeAnimation
              shape="hexagon"
              animation="rotate"
              size={152}
              color="transparent"
              strokeColor="#3ECF8E"
              strokeWidth={1}
              speed={0.06}
              opacity={0.12}
            />
          </div>
          {/* Icon */}
          <div
            style={{
              transform: `scale(${iconScale})`,
              opacity: iconOpacity,
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "rgba(62,207,142,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(62,207,142,0.25)",
            }}
          >
            <Img src={iconUrl} style={{ width: 36, height: 36 }} />
          </div>
        </div>

        {/* Title */}
        <TextAnimation
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "words" });
            tl.from(split.words, {
              opacity: 0,
              y: 30,
              stagger: 0.05,
              duration: 0.5,
              ease: "power3.out",
            });
            return tl;
          }}
          startFrom={10}
          style={{
            fontSize: 46,
            fontWeight: 700,
            color: "#FAFAFA",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </TextAnimation>

        {/* Green accent line */}
        <div
          style={{
            width: `${lineScale * 90}px`,
            height: 3,
            background: "linear-gradient(90deg, #3ECF8E, transparent)",
            borderRadius: 2,
            boxShadow: "0 0 8px rgba(62,207,142,0.25)",
          }}
        />

        {/* Description */}
        <TextAnimation
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "words" });
            tl.from(split.words, {
              opacity: 0,
              y: 12,
              stagger: 0.02,
              duration: 0.4,
              ease: "power2.out",
            });
            return tl;
          }}
          startFrom={25}
          style={{
            fontSize: 20,
            color: "rgba(250,250,250,0.7)",
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: 520,
          }}
        >
          {description}
        </TextAnimation>
      </div>

      {/* Right panel — bullets + code */}
      <div
        style={{
          position: "absolute",
          right: "8%",
          top: "50%",
          transform: `translateY(-50%) translateX(${(1 - rightPanelX) * 40}px)`,
          opacity: rightPanelOpacity,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: "36%",
        }}
      >
        {/* Bullet points */}
        {bullets.map((bullet, i) => {
          const bulletDelay = 30 + i * 7;
          const bulletOpacity = interpolate(
            frame,
            [bulletDelay, bulletDelay + 15],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const bulletX = interpolate(
            frame,
            [bulletDelay, bulletDelay + 15],
            [-20, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                opacity: bulletOpacity,
                transform: `translateX(${bulletX}px)`,
                padding: "14px 20px",
                background: "rgba(62,207,142,0.04)",
                border: "1px solid rgba(62,207,142,0.1)",
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#3ECF8E",
                  flexShrink: 0,
                  boxShadow: "0 0 8px rgba(62,207,142,0.5)",
                }}
              />
              <span
                style={{
                  color: "rgba(250,250,250,0.8)",
                  fontSize: 17,
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                }}
              >
                {bullet}
              </span>
            </div>
          );
        })}

        {/* Code snippet */}
        {codeSnippet && (
          <div
            style={{
              opacity: interpolate(frame, [65, 80], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              background: "rgba(250,250,250,0.03)",
              border: "1px solid rgba(62,207,142,0.12)",
              borderRadius: 10,
              padding: "14px 20px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: "rgba(250,250,250,0.5)",
              lineHeight: 1.7,
              whiteSpace: "pre",
            }}
          >
            {codeSnippet}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
