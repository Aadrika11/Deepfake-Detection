import { useRef } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import AnalyzerSection from "@/components/AnalyzerSection";
import Footer from "@/components/Footer";

const Index = () => {
  const analyzerRef = useRef<HTMLElement>(null);

  const scrollToAnalyzer = () => {
    analyzerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection onStartAnalysis={scrollToAnalyzer} />
        <FeaturesSection />
        <HowItWorksSection />
        <AnalyzerSection ref={analyzerRef} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
