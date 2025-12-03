import { CheckCircle, AlertTriangle, XCircle, Info, Eye, Cpu, Clock, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface AnalysisResult {
  isReal: boolean;
  confidence: number;
  processingTime: number;
  metrics: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
  };
  detectedArtifacts: string[];
  facesDetected: number;
  framesAnalyzed: number;
}

interface AnalysisResultsProps {
  result: AnalysisResult;
  preview: string | null;
  isVideo: boolean;
}

const AnalysisResults = ({ result, preview, isVideo }: AnalysisResultsProps) => {
  const getConfidenceStatus = (confidence: number) => {
    if (confidence >= 90) return "success";
    if (confidence >= 70) return "warning";
    return "destructive";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Result Card */}
      <Card variant={result.isReal ? "glow" : "gradient"} className={result.isReal ? "" : "border-destructive/50"}>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Result Icon & Status */}
            <div className="flex flex-col items-center">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
                result.isReal 
                  ? 'bg-success/10 border-2 border-success glow-success' 
                  : 'bg-destructive/10 border-2 border-destructive glow-destructive'
              }`}>
                {result.isReal ? (
                  <CheckCircle className="h-12 w-12 text-success" />
                ) : (
                  <XCircle className="h-12 w-12 text-destructive" />
                )}
              </div>
              <Badge variant={result.isReal ? "glowSuccess" : "glowDestructive"} className="text-lg px-4 py-2">
                {result.isReal ? "AUTHENTIC" : "DEEPFAKE DETECTED"}
              </Badge>
            </div>

            {/* Confidence Score */}
            <div className="flex-1 w-full">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Confidence Score</span>
                  <span className={`text-3xl font-bold ${
                    result.isReal ? 'text-success' : 'text-destructive'
                  }`}>
                    {result.confidence.toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={result.confidence} 
                  status={getConfidenceStatus(result.confidence)}
                  className="h-4"
                />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-lg bg-secondary/50">
                  <Clock className="h-4 w-4 mx-auto mb-1 text-primary" />
                  <div className="text-lg font-semibold">{result.processingTime}s</div>
                  <div className="text-xs text-muted-foreground">Processing</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary/50">
                  <Target className="h-4 w-4 mx-auto mb-1 text-primary" />
                  <div className="text-lg font-semibold">{result.facesDetected}</div>
                  <div className="text-xs text-muted-foreground">Faces Found</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary/50">
                  <Eye className="h-4 w-4 mx-auto mb-1 text-primary" />
                  <div className="text-lg font-semibold">{result.framesAnalyzed}</div>
                  <div className="text-xs text-muted-foreground">{isVideo ? 'Frames' : 'Regions'}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Detection Metrics */}
        <Card variant="gradient">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Cpu className="h-5 w-5 text-primary" />
              Detection Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Accuracy", value: result.metrics.accuracy },
              { label: "Precision", value: result.metrics.precision },
              { label: "Recall", value: result.metrics.recall },
              { label: "F1 Score", value: result.metrics.f1Score },
            ].map((metric) => (
              <div key={metric.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{metric.label}</span>
                  <span className="font-mono font-semibold">{(metric.value * 100).toFixed(1)}%</span>
                </div>
                <Progress value={metric.value * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Detected Artifacts */}
        <Card variant="gradient">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Analysis Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result.detectedArtifacts.length > 0 ? (
              <div className="space-y-2">
                {result.detectedArtifacts.map((artifact, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-2 p-3 rounded-lg bg-secondary/50"
                  >
                    <Info className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                    <span className="text-sm">{artifact}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-success/10 text-success">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">No manipulation artifacts detected</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Visual Analysis Preview */}
      {preview && (
        <Card variant="gradient">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Visual Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative rounded-xl overflow-hidden bg-secondary">
              {isVideo ? (
                <video src={preview} controls className="w-full max-h-96 object-contain" />
              ) : (
                <img src={preview} alt="Analyzed media" className="w-full max-h-96 object-contain" />
              )}
              
              {/* Overlay with detection box simulation */}
              {!result.isReal && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-destructive/50 rounded-lg animate-pulse">
                    <div className="absolute -top-6 left-0 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
                      Suspicious Region
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnalysisResults;
