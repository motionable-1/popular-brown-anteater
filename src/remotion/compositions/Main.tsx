import { AbsoluteFill, Artifact, useCurrentFrame } from "remotion";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import {
  TransitionSeries,
  springTiming,
} from "../library/components/layout/Transition";
import {
  blurDissolve,
  flashBlack,
  maskReveal,
} from "../library/components/layout/transitions/presentations";
import { Vignette } from "../library/components/effects/Vignette";

import { Background } from "./scenes/Background";
import { HeroScene } from "./scenes/HeroScene";
import { FeatureScene } from "./scenes/FeatureScene";
import { SocialProofScene } from "./scenes/SocialProofScene";
import { CTAScene } from "./scenes/CTAScene";

const { fontFamily: headingFont } = loadSpaceGrotesk();
const { fontFamily: bodyFont } = loadInter();

// Transition duration
const T = 15;

// Scene durations (including overlap from transitions)
const HERO_DUR = 120;
const FEAT1_DUR = 110;
const FEAT2_DUR = 110;
const FEAT3_DUR = 110;
const SOCIAL_DUR = 100;
const CTA_DUR = 110;

// Feature data
const FEATURES = [
  {
    iconUrl: "https://api.iconify.design/lucide/database-zap.svg?color=%233ECF8E&width=36",
    title: "Postgres Database with Instant APIs",
    description:
      "Full Postgres database with auto-generated REST and GraphQL APIs. Build faster with row-level security and real-time subscriptions out of the box.",
    index: 1,
  },
  {
    iconUrl: "https://api.iconify.design/lucide/shield.svg?color=%233ECF8E&width=36",
    title: "Built-in Auth & Realtime",
    description:
      "Authentication with 20+ providers, magic links, and SSO. Realtime subscriptions that keep your app data perfectly in sync.",
    index: 2,
  },
  {
    iconUrl: "https://api.iconify.design/lucide/zap.svg?color=%233ECF8E&width=36",
    title: "Edge Functions & AI Vectors",
    description:
      "Deploy serverless functions globally at the edge. Store and query vector embeddings for modern AI applications with pgvector.",
    index: 3,
  },
];

export const Main: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}
      <AbsoluteFill style={{ fontFamily: `${headingFont}, ${bodyFont}, sans-serif` }}>
        {/* Persistent animated background */}
        <Background />

        {/* Scene transitions */}
        <TransitionSeries>
          {/* Hero */}
          <TransitionSeries.Sequence durationInFrames={HERO_DUR}>
            <HeroScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
          />

          {/* Feature 1 - Postgres */}
          <TransitionSeries.Sequence durationInFrames={FEAT1_DUR}>
            <FeatureScene {...FEATURES[0]} />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={flashBlack()}
            timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
          />

          {/* Feature 2 - Auth */}
          <TransitionSeries.Sequence durationInFrames={FEAT2_DUR}>
            <FeatureScene {...FEATURES[1]} />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={flashBlack()}
            timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
          />

          {/* Feature 3 - Edge Functions */}
          <TransitionSeries.Sequence durationInFrames={FEAT3_DUR}>
            <FeatureScene {...FEATURES[2]} />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={maskReveal()}
            timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
          />

          {/* Social Proof */}
          <TransitionSeries.Sequence durationInFrames={SOCIAL_DUR}>
            <SocialProofScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
          />

          {/* CTA */}
          <TransitionSeries.Sequence durationInFrames={CTA_DUR}>
            <CTAScene />
          </TransitionSeries.Sequence>
        </TransitionSeries>

        {/* Vignette overlay */}
        <Vignette intensity={0.5} size={0.35} />
      </AbsoluteFill>
    </>
  );
};
