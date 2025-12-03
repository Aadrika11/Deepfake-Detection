import { Shield, Zap, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  onStartAnalysis: () => void;
}

const HeroSection = ({ onStartAnalysis }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge variant="glow" className="mb-6 animate-fade-in">
            <Zap className="h-3 w-3 mr-1" />
            Advanced AI-Powered Detection
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Detect <span className="text-gradient">Deepfakes</span>
            <br />
            With Confidence
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            State-of-the-art neural network analysis to identify manipulated media. 
            Protect yourself from synthetic content with military-grade detection accuracy.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button variant="hero" size="xl" onClick={onStartAnalysis}>
              <Eye className="h-5 w-5" />
              Analyze Media
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button variant="outline" size="xl">
              View Documentation
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">99.7%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">&lt;2s</div>
              <div className="text-sm text-muted-foreground">Analysis Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">10M+</div>
              <div className="text-sm text-muted-foreground">Media Scanned</div>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-16 relative max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-1 overflow-hidden">
            {/* Scan Line Animation */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 animate-scan-line" />
            </div>
            
            {/* Mock Interface Preview */}
            <div className="bg-card rounded-xl p-6 min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <Shield className="h-12 w-12 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm">Drop media here or click to upload</p>
              </div>
            </div>
          </div>
          
          {/* Corner Decorations */}
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-primary rounded-tl-lg" />
          <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-primary rounded-tr-lg" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-primary rounded-bl-lg" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-primary rounded-br-lg" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
