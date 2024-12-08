import React from 'react';
import { PredictionResponse } from '../types';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface PredictionResultProps {
  prediction: PredictionResponse | null;
}

const PredictionResult: React.FC<PredictionResultProps> = ({ prediction }) => {
  if (!prediction) return null;

  const confidencePercentage = (prediction.confidence * 100).toFixed(1);
  const isHighConfidence = prediction.confidence > 0.8;

  return (
    <div className="mt-6 overflow-hidden">
      <div className="animate-slideIn bg-white rounded-lg shadow-lg border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            {isHighConfidence ? (
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            ) : (
              <AlertCircle className="w-6 h-6 text-yellow-500" />
            )}
            <h3 className="text-lg font-semibold text-gray-800">Analysis Result</h3>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Detected Sign</p>
            <p className="text-xl font-semibold text-gray-800">{prediction.class}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Confidence Level</p>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-100">
                    {confidencePercentage}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                <div
                  style={{ width: `${confidencePercentage}%` }}
                  className="animate-widthGrow shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-gray-50">
            <p className="text-sm text-gray-600">
              {isHighConfidence
                ? "High confidence prediction! This result is very reliable."
                : "Moderate confidence level. Consider retaking the photo in better lighting conditions."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;