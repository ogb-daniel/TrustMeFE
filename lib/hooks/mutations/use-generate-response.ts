"use client";

import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { alertsApi } from "@/lib/api/endpoints/alerts";
import { GenerateResponseRequest, Alert } from "@/lib/types/alert";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { toast } from "sonner";
import { USE_MOCK } from "@/lib/api/client";

// Mock alert response
const generateMockResponse = (request: GenerateResponseRequest): Promise<Alert> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockAlert: Alert = {
        id: `alert_${Date.now()}`,
        cluster_id: request.cluster_id,
        narrative: "Misinformation about ATM failures spreading",
        tier: request.tier || "CRISIS",
        risk_score: 87,
        confidence: 0.85,
        created_at: new Date().toISOString(),
        status: "pending_approval",
        response_text: "We are aware of recent social media posts regarding ATM service disruptions. Our internal monitoring systems show 97.3% uptime across all ATM networks, with normal transaction volumes. These claims do not reflect our actual system performance. We are actively monitoring the situation and will provide updates as needed. For immediate assistance, customers can contact our 24/7 support line.",
        response_word_count: 62,
        generation_method: "openai",
        safety_flags: [],
        suggested_channels: ["twitter", "facebook", "press_release"],
        approval_required: true,
      };
      resolve(mockAlert);
    }, 800); // Simulate API delay
  });
};

export const useGenerateResponse = (
  options?: Omit<
    UseMutationOptions<Alert, Error, GenerateResponseRequest>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useMutation<Alert, Error, GenerateResponseRequest>({
    mutationFn: (request) => {
      if (USE_MOCK) {
        return generateMockResponse(request);
      }
      return alertsApi.generate(request);
    },
    onSuccess: (data, variables) => {
      toast.success("Response generated successfully", {
        description: `Method: ${data.generation_method}`,
      });

      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.alerts] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.clusterDetail, variables.cluster_id],
      });
    },
    onError: (error) => {
      toast.error("Failed to generate response", {
        description: error.message,
      });
    },
    ...options,
  });
};
