export interface PredictionResponse {
  class: string;
  confidence: number;
}

export interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  isLoading: boolean;
}