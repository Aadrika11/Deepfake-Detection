import { useState, useCallback } from "react";
import { Upload, Image, Video, X, FileWarning } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MediaUploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
}

const MediaUploader = ({ onFileSelect, selectedFile, onClear }: MediaUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const processFile = (file: File) => {
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (!isImage && !isVideo) {
      return;
    }

    onFileSelect(file);

    // Create preview
    if (isImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else if (isVideo) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleClear = () => {
    setPreview(null);
    onClear();
  };

  const isImage = selectedFile?.type.startsWith('image/');
  const isVideo = selectedFile?.type.startsWith('video/');

  return (
    <Card 
      variant="gradient" 
      className={`relative overflow-hidden transition-all duration-300 ${
        isDragging ? 'border-primary glow-primary' : 'border-border/50'
      }`}
    >
      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="p-8 md:p-12"
        >
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileInput}
            className="hidden"
            id="media-upload"
          />
          <label 
            htmlFor="media-upload" 
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            {/* Upload Icon */}
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
              isDragging 
                ? 'bg-primary/20 border-primary glow-primary' 
                : 'bg-primary/10 border border-primary/30'
            }`}>
              <Upload className={`h-10 w-10 transition-colors ${isDragging ? 'text-primary' : 'text-primary/70'}`} />
            </div>

            {/* Text */}
            <h3 className="text-xl font-semibold mb-2">
              {isDragging ? 'Drop your file here' : 'Upload Media'}
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Drag and drop or click to browse
            </p>

            {/* Supported Formats */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="outline" className="text-xs">
                <Image className="h-3 w-3 mr-1" />
                JPG, PNG, WEBP
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Video className="h-3 w-3 mr-1" />
                MP4, AVI, MOV
              </Badge>
            </div>

            {/* File Size Limit */}
            <p className="text-xs text-muted-foreground mt-4">
              Maximum file size: 100MB
            </p>
          </label>
        </div>
      ) : (
        <div className="p-6">
          {/* Preview */}
          <div className="relative rounded-xl overflow-hidden bg-secondary mb-4">
            {isImage && preview && (
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-64 object-contain"
              />
            )}
            {isVideo && preview && (
              <video 
                src={preview} 
                controls 
                className="w-full h-64 object-contain"
              />
            )}
            
            {/* Clear Button */}
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-3 right-3"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Media Type Badge */}
            <Badge 
              variant="glow" 
              className="absolute bottom-3 left-3"
            >
              {isImage ? <Image className="h-3 w-3 mr-1" /> : <Video className="h-3 w-3 mr-1" />}
              {isImage ? 'Image' : 'Video'}
            </Badge>
          </div>

          {/* File Info */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground font-medium truncate max-w-[200px]">
              {selectedFile.name}
            </span>
            <span className="text-muted-foreground">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default MediaUploader;
