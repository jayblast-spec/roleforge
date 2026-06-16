"use client";

import { useRef } from "react";
import HeroSection from "./components/HeroSection";
import ForgeWizard from "./components/ForgeWizard";
import Footer from "./components/Footer";

export default function Home() {
  const wizardRef = useRef<HTMLDivElement>(null);

  function scrollToWizard() {
    wizardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main>
      <HeroSection onStartClick={scrollToWizard} />
      <div ref={wizardRef} className="scroll-mt-0">
        <ForgeWizard />
      </div>
      <Footer />
    </main>
  );
}
