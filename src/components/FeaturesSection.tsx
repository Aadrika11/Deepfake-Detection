import { Brain, Cpu, Clock, Shield, Layers, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "Deep Learning CNN",
    description: "Advanced convolutional neural networks trained on FaceForensics++, Celeb-DF, and DFDC datasets for superior detection.",
  },
  {
    icon: Target,
    title: "Face Detection",
    description: "Precise facial region extraction using MTCNN with automatic alignment and normalization for consistent analysis.",
  },
  {
    icon: Layers,
    title: "Artifact Analysis",
    description: "Identifies blending inconsistencies, unnatural textures, and warped boundaries invisible to the human eye.",
  },
  {
    icon: Clock,
    title: "Real-Time Speed",
    description: "Optimized lightweight models deliver results in under 2 seconds, even on compressed low-quality media.",
  },
  {
    icon: Cpu,
    title: "Temporal Analysis",
    description: "Frame-by-frame video analysis detects inconsistencies across time that reveal synthetic manipulation.",
  },
  {
    icon: Shield,
    title: "Multi-Metric Scoring",
    description: "Comprehensive results with accuracy, precision, recall, and F1-score for complete transparency.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Advanced Detection <span className="text-gradient">Technology</span>
          </h2>
          <p className="text-muted-foreground">
            Powered by state-of-the-art machine learning models trained on millions of samples 
            to identify even the most sophisticated deepfake manipulations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              variant="gradient" 
              className="group hover:border-primary/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:glow-primary transition-all duration-300">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
