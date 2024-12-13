import React, { useCallback, useState, useRef } from 'react';
import { analyzeImage, PredictionResponse } from '../services/visionService';
import { UploadZone } from './UploadZone';
import { useScanStore } from '../store/scanStore';
import { X } from 'lucide-react'; // Assuming you're using lucide-react for icons

export function ImageUploader() {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const incrementScans = useScanStore((state) => state.incrementScans);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsLoading(true);
    setImage(URL.createObjectURL(file));

    try {
      const result = await analyzeImage(file);
      setPrediction(result);
      incrementScans();
    } catch (error) {
      console.error('Error analyzing image:', error);
      alert('Error analyzing image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [incrementScans]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  }, [handleImageUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  }, [handleImageUpload]);

  const handleZoneClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // New method to reset the image state
  const handleClearImage = useCallback(() => {
    setImage(null);
    setPrediction(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input
    }
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div
        className={`relative border-2 border-dashed rounded-lg transition-all duration-300 cursor-pointer
                   ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105' :
            'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500'}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={handleZoneClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileInput}
          accept="image/*"
        />

        {image ? (
          <div className="relative">
            {/* Close button added here */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the upload zone click
                handleClearImage();
              }}
              className="absolute top-2 right-2 z-10 bg-white/80 dark:bg-black/50 rounded-full p-1 
                         hover:bg-white/90 dark:hover:bg-black/70 transition-all"
              aria-label="Remove image"
            >
              <X className="h-6 w-6 text-gray-700 dark:text-white" />
            </button>

            <img
              src={image}
              alt="Uploaded"
              className="w-full h-[600px] object-contain rounded-lg"
            />
            {isLoading && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg 
                            flex items-center justify-center animate-fade-in">
                <div className="relative">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent" />
                  <div className="absolute inset-0 rounded-full animate-ping border-2 border-white opacity-20" />
                </div>
              </div>
            )}
          </div>
        ) : (
          <UploadZone isDragging={isDragging} />
        )}
      </div>

      {prediction && (
        <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg animate-fade-in">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Analysis Results
          </h3>
          <div className="space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              Predicted Class: <span className="font-medium">{prediction.class}</span>
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 
                          animate-slide-right"
                style={{ width: `${prediction.confidence * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Confidence: {(prediction.confidence * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}