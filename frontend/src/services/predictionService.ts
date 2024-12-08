import axios from 'axios';
import { PredictionResponse } from '../types';

export const predictTrafficSign = async (image: File): Promise<PredictionResponse> => {
  // Create a FormData object to send the image file
  const formData = new FormData();
  formData.append('image', image);
  try {
    // Make a POST request to the prediction endpoint
    const response = await axios.post<PredictionResponse>('http://localhost:5000/api/predict-traffic-sign', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('response', response);
    // Return the prediction response
    return response.data;
  } catch (error) {
    // Handle any errors that occur during the prediction
    console.error('Traffic sign prediction error:', error);

    // You might want to throw a custom error or return a default response
    throw new Error('Failed to predict traffic sign');
  }
};