import { create } from 'zustand';

interface ScanStore {
  totalScans: number;
  incrementScans: () => void;
}

export const useScanStore = create<ScanStore>((set) => ({
  totalScans: 0,
  incrementScans: () => set((state) => ({ totalScans: state.totalScans + 1 })),
}));