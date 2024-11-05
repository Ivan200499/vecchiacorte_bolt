import { useEffect } from 'react';
import { useOrderStore } from '../store/orderStore';

export function useSocket() {
  const initializeSocket = useOrderStore((state) => state.initializeSocket);

  useEffect(() => {
    initializeSocket();
  }, [initializeSocket]);
}