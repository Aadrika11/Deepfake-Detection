import { useEffect, useState } from "react";
import { Loader2, Scan, Brain, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface AnalysisProgressProps {
  isAnalyzing: boolean;
  onComplete: () => void;
}

const stages = [
  { id: 1, label: "Detecting faces", icon: Scan },
  { id: 2, label: "Extracting features", icon: Brain },
  { id: 3, label: "Running neural analysis", icon: Brain },
  { id: 4, label: "Generating report", icon: CheckCircle },
];

const AnalysisProgress = ({ isAnalyzing, onComplete }: AnalysisProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (!isAnalyzing) {
      setProgress(0);
      setCurrentStage(0);
      return;
    }

    const duration = 3000; // 3 seconds total
    const interval = 50;
    const increment = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        
        // Update current stage based on progress
        if (next >= 25 && currentStage < 1) setCurrentStage(1);
        if (next >= 50 && currentStage < 2) setCurrentStage(2);
        if (next >= 75 && currentStage < 3) setCurrentStage(3);
        
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isAnalyzing, onComplete, currentStage]);

  if (!isAnalyzing) return null;

  return (
    <Card variant="glow" className="animate-scale-in">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          {/* Animated Scanner */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="h-10 w-10 text-primary animate-pulse" />
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-2">Analyzing Media</h3>
          <p className="text-muted-foreground text-sm">
            Our neural network is processing your file...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-mono font-semibold text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} variant="glow" className="h-3" />
        </div>

        {/* Stages */}
        <div className="space-y-3">
          {stages.map((stage, index) => {
            const isActive = index === currentStage;
            const isComplete = index < currentStage || progress >= 100;
            
            return (
              <div 
                key={stage.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  isActive ? 'bg-primary/10 border border-primary/30' : 
                  isComplete ? 'bg-success/10' : 'bg-secondary/50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isComplete ? 'bg-success text-success-foreground' :
                  isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                }`}>
                  {isComplete ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : isActive ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <stage.icon className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <span className={`text-sm ${
                  isActive || isComplete ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisProgress;
