import { Upload, Scan, Database, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Media",
    description: "Drop your image or video file into the analyzer. Supports MP4, AVI, MOV, JPG, PNG formats.",
  },
  {
    icon: Scan,
    title: "Face Detection",
    description: "Our MTCNN algorithm locates and extracts facial regions with precision alignment.",
  },
  {
    icon: Database,
    title: "Neural Analysis",
    description: "Deep CNN processes spatial features, detecting artifacts and inconsistencies.",
  },
  {
    icon: CheckCircle,
    title: "Get Results",
    description: "Receive a detailed report with authenticity score and highlighted detection areas.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground">
            Our detection pipeline processes your media through multiple stages of analysis 
            to ensure the highest accuracy in identifying manipulated content.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={step.title} 
                className="relative flex flex-col items-center text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center z-10">
                  {index + 1}
                </div>
                
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center group hover:border-primary/50 hover:glow-primary transition-all duration-300">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                
                {/* Arrow - Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-10 -right-4 text-primary/50">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
