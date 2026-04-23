import { useUser as useUserContext } from '@/context/UserContext';

export default function useUser() {
  return useUserContext();
}
