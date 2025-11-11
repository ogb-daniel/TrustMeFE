"use client";

import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { alertsApi } from "@/lib/api/endpoints/alerts";
import { ApproveAlertRequest, AlertActionResponse } from "@/lib/types/alert";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { toast } from "sonner";

interface ApproveAlertVariables {
  alertId: string;
  request: ApproveAlertRequest;
}

export const useApproveAlert = (
  options?: Omit<
    UseMutationOptions<AlertActionResponse, Error, ApproveAlertVariables>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useMutation<AlertActionResponse, Error, ApproveAlertVariables>({
    mutationFn: ({ alertId, request }) => alertsApi.approve(alertId, request),
    onSuccess: (data) => {
      toast.success("Alert approved", {
        description: `Published to ${data.published_channels?.join(", ")}`,
      });

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.alerts] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.clusters] });
    },
    onError: (error) => {
      toast.error("Failed to approve alert", {
        description: error.message,
      });
    },
    ...options,
  });
};
