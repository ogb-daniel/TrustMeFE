"use client";

import { AlertTriangle } from "lucide-react";
import { ClusterDetail } from "@/lib/types/cluster";
import { TIER_CONFIG } from "@/lib/constants/tiers";
import { useState } from "react";
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
  // Safety checks for nested properties
  const riskTier = cluster?.risk_analysis?.risk_tier || "ACTION";
  const riskScore = cluster?.risk_analysis?.risk_score ?? 0;

  const tierConfig = TIER_CONFIG[riskTier] || TIER_CONFIG["ACTION"];
  const isHighRisk = riskScore >= 70;
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                    {riskScore.toFixed(1)}%
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
                <div className="mt-2">
                  <ResponseSuggestion
                    clusterId={cluster.cluster_id}
                    generatedResponse={cluster.generated_response}
                    variant="preview"
                    onViewFullResponse={() => setIsModalOpen(true)}
                  />
                </div>
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
            <ResponseSuggestion
              clusterId={cluster.cluster_id}
              generatedResponse={cluster.generated_response}
              variant="full"
            />
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
  );
}
