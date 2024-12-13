import React from 'react';
import { Upload } from 'lucide-react';

interface UploadZoneProps {
  isDragging: boolean;
}

export function UploadZone({ isDragging }: UploadZoneProps) {
  return (
    <div className="h-[600px] flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 group">
      <Upload className="w-12 h-12 mb-4 transform transition-transform duration-300 
                        group-hover:scale-110 group-hover:text-blue-500" />
      <div className="transform transition-all duration-300 group-hover:scale-105">
        <p className="text-lg font-medium group-hover:text-blue-500">
          Drop your image here or click to upload
        </p>
        <p className="text-sm mt-2 opacity-75 group-hover:opacity-100">
          Supports: JPG, PNG, GIF (max 5MB)
        </p>
      </div>
      
      {/* Animated border gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                      opacity-0 group-hover:opacity-20 dark:group-hover:opacity-10 
                      transition-opacity duration-300 rounded-lg" />
      
      {/* Pulse animation on hover */}
      <div className={`absolute inset-0 transition-transform duration-500
                      ${isDragging ? 'scale-105' : 'group-hover:scale-[1.02]'}`}>
        <div className="absolute inset-0 animate-pulse-slow rounded-lg 
                      bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 
                      opacity-0 group-hover:opacity-100" />
      </div>
    </div>
  );
}