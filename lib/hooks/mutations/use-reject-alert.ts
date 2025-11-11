"use client";

import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { alertsApi } from "@/lib/api/endpoints/alerts";
import { RejectAlertRequest, AlertActionResponse } from "@/lib/types/alert";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { toast } from "sonner";

interface RejectAlertVariables {
  alertId: string;
  request: RejectAlertRequest;
}

export const useRejectAlert = (
  options?: Omit<
    UseMutationOptions<AlertActionResponse, Error, RejectAlertVariables>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useMutation<AlertActionResponse, Error, RejectAlertVariables>({
    mutationFn: ({ alertId, request }) => alertsApi.reject(alertId, request),
    onSuccess: (data) => {
      toast.success("Alert rejected", {
        description: "Feedback recorded for model improvement",
      });

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.alerts] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.clusters] });
    },
    onError: (error) => {
      toast.error("Failed to reject alert", {
        description: error.message,
      });
    },
    ...options,
  });
};
