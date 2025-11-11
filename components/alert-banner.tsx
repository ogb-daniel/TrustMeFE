"use client";

import { AlertTriangle } from "lucide-react";
import { ClusterDetail } from "@/lib/types/cluster";
import { TIER_CONFIG } from "@/lib/constants/tiers";
import { useGenerateResponse } from "@/lib/hooks/mutations/use-generate-response";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/components/ui/dialog";
import { ResponseSuggestion } from "@/components/response-suggestion";
import { Button } from "@/components/ui/button";

interface AlertBannerProps {
  cluster: ClusterDetail;
}

export function AlertBanner({ cluster }: AlertBannerProps) {
  const tierConfig = TIER_CONFIG[cluster.tier];
  const isHighRisk = cluster.risk_score >= 70;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responsePreview, setResponsePreview] = useState<string>("");

  const generateMutation = useGenerateResponse();

  useEffect(() => {
    if (cluster.id) {
      generateMutation.mutate(
        { cluster_id: cluster.id },
        {
          onSuccess: (data) => {
            const fullResponse = data.response_text || "";
            // Create preview: first 120 characters
            const preview =
              fullResponse.length > 120
                ? fullResponse.substring(0, 120) + "..."
                : fullResponse;
            setResponsePreview(preview);
          },
        }
      );
    }
  }, [cluster.id]);

  return (
    <>
      <div
        className={`relative overflow-hidden rounded-lg border ${isHighRisk ? "border-destructive/20 bg-gradient-to-r from-destructive/10" : "border-yellow-500/20 bg-gradient-to-r from-yellow-500/10"} via-transparent to-transparent p-6`}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 pt-0.5">
            <AlertTriangle
              className={`h-6 w-6 ${isHighRisk ? "text-destructive" : "text-yellow-500"}`}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wide">
                    Risk Level
                  </p>
                  <p
                    className={`text-2xl font-bold mt-1 ${isHighRisk ? "text-destructive" : "text-yellow-500"}`}
                  >
                    {cluster.risk_score}%
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-muted-foreground text-xs uppercase tracking-wide">
                    Tier
                  </p>
                  <p
                    className={`text-2xl font-bold mt-1 ${tierConfig.textColor}`}
                  >
                    {tierConfig.label.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-muted-foreground text-xs uppercase tracking-wide">
                  Suggested Response
                </p>
                {generateMutation.isPending ? (
                  <div className="mt-2 space-y-2">
                    <div className="h-4 w-full bg-muted animate-pulse rounded" />
                    <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-foreground mt-2 leading-relaxed">
                      {responsePreview || "No response generated yet."}
                    </p>
                    {responsePreview && (
                      <Button
                        onClick={() => setIsModalOpen(true)}
                        variant="link"
                        className="p-0 h-auto text-secondary-foreground hover:text-secondary-foreground/80 mt-2"
                      >
                        Read more →
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for full response */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent onClose={() => setIsModalOpen(false)}>
          <DialogHeader>
            <DialogTitle>Suggested Response</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <ResponseSuggestion clusterId={cluster.id} />
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
  );
}
