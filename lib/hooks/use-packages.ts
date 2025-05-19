import { useQuery } from "@tanstack/react-query";
import type { Package } from "@/lib/store/project-config";

export function usePackages(frameworkId: string) {
  return useQuery<Package[]>({
    queryKey: ["packages", frameworkId],
    queryFn: async () => [], // TODO: החלף למקור נתונים חדש
    enabled: !!frameworkId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
