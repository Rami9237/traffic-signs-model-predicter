import axios from 'axios';


export interface PredictionResponse {
  class: string;
  confidence: number;
}


export const analyzeImage = async (image: File): Promise<PredictionResponse> => {
  const formData = new FormData();
  formData.append('image', image);
  try {
    const response = await axios.post<PredictionResponse>('http://localhost:5000/api/predict-traffic-sign', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Traffic sign prediction error:', error);

    throw new Error('Failed to predict traffic sign');
  }
};