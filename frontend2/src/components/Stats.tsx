import React from 'react';
import { Activity } from 'lucide-react';
import { useScanStore } from '../store/scanStore';

export function Stats() {
  const totalScans = useScanStore((state) => state.totalScans);

  return (
    <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 
                    flex items-center space-x-2 animate-fade-in">
      <Activity className="w-5 h-5 text-blue-500" />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Total Scans: {totalScans}
      </span>
    </div>
  );
}