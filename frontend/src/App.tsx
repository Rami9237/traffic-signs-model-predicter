import React, { useState } from 'react';
import { SignpostBig } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import PredictionResult from './components/PredictionResult';
import { predictTrafficSign } from './services/predictionService';
import { PredictionResponse } from './types';

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageSelect = async (file: File) => {
    setIsLoading(true);
    setSelectedImage(URL.createObjectURL(file));
    
    try {
      const result = await predictTrafficSign(file);
      setPrediction(result);
    } catch (error) {
      console.error('Prediction failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-full mb-6 shadow-lg">
            <SignpostBig className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Traffic Sign Classifier
          </h1>
          <p className="text-xl text-gray-600">
            Upload an image of a traffic sign and let AI identify it
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-xl p-6 transform transition-all duration-300 hover:shadow-2xl">
            <ImageUpload onImageSelect={handleImageSelect} isLoading={isLoading} />
          </div>
          
          {selectedImage && (
            <div className="animate-fadeIn bg-white rounded-xl shadow-xl p-6">
              <p className="text-lg font-medium text-gray-700 mb-4">Uploaded Image</p>
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Selected traffic sign"
                  className="w-full h-auto rounded-lg transform transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>
            </div>
          )}

          <PredictionResult prediction={prediction} />
        </div>
      </div>
    </div>
  );
}

export default App;