import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { ImageUploadProps } from '../types';

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => {
    if (!isLoading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files?.[0]) {
      onImageSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div 
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
        transition-all duration-300 ease-in-out transform hover:scale-[1.02]
        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}
        ${isLoading ? 'pointer-events-none opacity-75' : ''}
      `}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={isLoading}
      />
      
      <div className={`transition-transform duration-300 ${isLoading ? 'animate-bounce' : ''}`}>
        {isLoading ? (
          <div className="w-12 h-12 mx-auto mb-4">
            <div className="w-full h-full border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <Upload className="w-12 h-12 mx-auto mb-4 text-blue-500" />
        )}
      </div>

      <p className="text-lg font-medium text-gray-700">
        {isLoading ? 'Analyzing image...' : 'Drop your image here or click to upload'}
      </p>
      
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
        <ImageIcon className="w-4 h-4" />
        <p>Supports: JPG, PNG, GIF (max 5MB)</p>
      </div>

      {isDragging && (
        <div className="absolute inset-0 bg-blue-50 bg-opacity-50 rounded-lg flex items-center justify-center">
          <p className="text-lg font-medium text-blue-600">Drop image here</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;