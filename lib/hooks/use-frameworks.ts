import { useQuery } from "@tanstack/react-query";

export function useFrameworks(platform: string) {
  return useQuery({
    queryKey: ["frameworks", platform],
    queryFn: async () => [], // TODO: החלף למקור נתונים חדש
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 24 * 60 * 60 * 1000, // 24 hours since frameworks rarely change
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: !!platform,
  });
}

export function useWebFrameworks(type: "frontend" | "backend") {
  return useQuery({
    queryKey: ["frameworks", "web", type],
    queryFn: async () => [], // TODO: החלף למקור נתונים חדש
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 24 * 60 * 60 * 1000, // 24 hours since frameworks rarely change
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
