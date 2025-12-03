import { useState, useCallback, forwardRef } from "react";
import { Scan, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import MediaUploader from "./MediaUploader";
import AnalysisProgress from "./AnalysisProgress";
import AnalysisResults from "./AnalysisResults";

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

// Simulated analysis function
const simulateAnalysis = (file: File): Promise<AnalysisResult> => {
  return new Promise((resolve) => {
    // Simulate different results based on filename patterns
    const filename = file.name.toLowerCase();
    const isFake = filename.includes('fake') || filename.includes('deepfake') || Math.random() > 0.6;
    
    const isVideo = file.type.startsWith('video/');
    
    setTimeout(() => {
      resolve({
        isReal: !isFake,
        confidence: isFake ? 75 + Math.random() * 20 : 92 + Math.random() * 7,
        processingTime: 1.2 + Math.random() * 0.8,
        metrics: {
          accuracy: 0.95 + Math.random() * 0.04,
          precision: 0.93 + Math.random() * 0.05,
          recall: 0.94 + Math.random() * 0.04,
          f1Score: 0.94 + Math.random() * 0.04,
        },
        detectedArtifacts: isFake ? [
          "Unnatural eye blinking pattern detected",
          "Facial boundary inconsistencies found",
          "Texture anomalies in skin regions",
          "Temporal inconsistencies between frames",
        ].slice(0, 2 + Math.floor(Math.random() * 3)) : [],
        facesDetected: 1 + Math.floor(Math.random() * 2),
        framesAnalyzed: isVideo ? 30 + Math.floor(Math.random() * 90) : 1,
      });
    }, 3500);
  });
};

const AnalyzerSection = forwardRef<HTMLElement>((_, ref) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setResult(null);
    
    // Create preview
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const handleClear = useCallback(() => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    setResult(null);
    
    const analysisResult = await simulateAnalysis(selectedFile);
    setResult(analysisResult);
  }, [selectedFile]);

  const handleAnalysisComplete = useCallback(() => {
    setIsAnalyzing(false);
  }, []);

  const isVideo = selectedFile?.type.startsWith('video/') || false;

  return (
    <section ref={ref} id="analyze" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute inset-0 bg-gradient-hero" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Analyze Your <span className="text-gradient">Media</span>
          </h2>
          <p className="text-muted-foreground">
            Upload an image or video to detect potential deepfake manipulation.
            Our AI will analyze facial features and temporal patterns.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Uploader */}
          {!isAnalyzing && !result && (
            <MediaUploader
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              onClear={handleClear}
            />
          )}

          {/* Analyze Button */}
          {selectedFile && !isAnalyzing && !result && (
            <div className="flex justify-center animate-fade-in">
              <Button variant="hero" size="xl" onClick={handleAnalyze}>
                <Scan className="h-5 w-5" />
                Start Analysis
              </Button>
            </div>
          )}

          {/* Analysis Progress */}
          {isAnalyzing && (
            <AnalysisProgress
              isAnalyzing={isAnalyzing}
              onComplete={handleAnalysisComplete}
            />
          )}

          {/* Results */}
          {result && !isAnalyzing && (
            <>
              <AnalysisResults
                result={result}
                preview={preview}
                isVideo={isVideo}
              />
              
              {/* Analyze Another */}
              <div className="flex justify-center pt-4">
                <Button variant="outline" size="lg" onClick={handleClear}>
                  <RefreshCw className="h-4 w-4" />
                  Analyze Another File
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
});

AnalyzerSection.displayName = "AnalyzerSection";

export default AnalyzerSection;
