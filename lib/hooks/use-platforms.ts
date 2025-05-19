import { useQuery } from "@tanstack/react-query";

export function usePlatforms() {
  return useQuery({
    queryKey: ["platforms"],
    queryFn: async () => [], // TODO: החלף למקור נתונים חדש
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 24 * 60 * 60 * 1000, // 24 hours since platforms rarely change
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
