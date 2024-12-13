import React from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ThemeToggle } from './components/ThemeToggle';
import { Stats } from './components/Stats';
import { Brain } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <ThemeToggle />
      <Stats />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Brain className="w-16 h-16 text-blue-600 dark:text-blue-400 animate-pulse-slow" />
              <div className="absolute inset-0 animate-ping opacity-20">
                <Brain className="w-16 h-16 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 
                         hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Computer Vision Analyzer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Upload an image and let AI analyze it for you
          </p>
        </div>

        <ImageUploader />
      </div>
    </div>
  );
}