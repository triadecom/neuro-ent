import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";

const NeuroMentorFeatures = dynamic(() =>
  import("@/components/NeuroMentorFeatures").then((m) => ({ default: m.NeuroMentorFeatures }))
);
const SecuritySection = dynamic(() =>
  import("@/components/SecuritySection").then((m) => ({ default: m.SecuritySection }))
);
const PricingSection = dynamic(() =>
  import("@/components/PricingSection").then((m) => ({ default: m.PricingSection }))
);

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <ProblemSection />
      <NeuroMentorFeatures />
      <SecuritySection />
      <PricingSection />
    </>
  );
}
