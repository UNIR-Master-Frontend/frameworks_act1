import { useContext } from 'react';
import { LoadingContext } from '@/context/LoadingContext';

export default function useLoading() {
  const context = useContext(LoadingContext);
  return context;
}