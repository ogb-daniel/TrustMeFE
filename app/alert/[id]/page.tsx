"use client";

import { useRouter, useParams } from "next/navigation";
import { AlertBanner } from "@/components/alert-banner";
import { SentimentAnalysis } from "@/components/sentiment-analysis";
import { RiskBreakdown } from "@/components/risk-breakdown";
import { EvidenceSection } from "@/components/evidence-section";
import { ChevronLeft } from "lucide-react";
import { useClusterDetail } from "@/lib/hooks/queries/use-cluster-detail";
import { useRiskAnalysis } from "@/lib/hooks/queries/use-risk-analysis";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AlertDetailPage() {
  const router = useRouter();
  const params = useParams();
  const clusterId = params.id as string;

  const {
    data: cluster,
    isLoading: isLoadingCluster,
    error: clusterError,
  } = useClusterDetail(clusterId);
  const {
    data: riskAnalysis,
    isLoading: isLoadingRisk,
    error: riskError,
  } = useRiskAnalysis(clusterId);

  const isLoading = isLoadingCluster || isLoadingRisk;
  const error = clusterError || riskError;

  if (error) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 bg-card border border-border/50 max-w-md">
          <h2 className="text-lg font-semibold text-destructive mb-2">
            Error Loading Alert Details
          </h2>
          <p className="text-muted-foreground">{error.message}</p>
          <div className="flex gap-2 mt-4">
            <Button onClick={() => window.location.reload()}>Retry</Button>
            <Button onClick={() => router.back()} variant="outline">
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-8 w-48 bg-muted animate-pulse rounded mb-6" />
          <div className="mb-8">
            <div className="h-10 w-96 bg-muted animate-pulse rounded mb-2" />
            <div className="h-5 w-[500px] bg-muted animate-pulse rounded" />
          </div>
          <div className="h-32 bg-muted animate-pulse rounded mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="h-64 bg-muted animate-pulse rounded" />
            <div className="lg:col-span-2 h-64 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-background/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground text-balance">
            {cluster?.narrative || "Alert Details"}
          </h1>
        </div>

        {/* Alert Banner */}
        {cluster && (
          <div className="mb-6">
            <AlertBanner cluster={cluster} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column: Sentiment */}
          {cluster && (
            <div className="lg:col-span-1">
              <SentimentAnalysis cluster={cluster} />
            </div>
          )}

          {/* Right Column: Virality */}
          {/* TODO: Velocity chart data not available in current API */}
          {cluster && false && (
            <div className="lg:col-span-2">
              <div className="p-6 rounded-lg border border-border/50 bg-card">
                <h2 className="text-lg font-semibold mb-4">Virality Over Time</h2>
                <p className="text-sm text-muted-foreground">Velocity chart data coming soon...</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column: Risk Breakdown */}
          {riskAnalysis && (
            <div className="lg:col-span-1">
              <RiskBreakdown riskAnalysis={riskAnalysis} />
            </div>
          )}

          {/* Right Column: Evidence */}
          {cluster && (
            <div className="lg:col-span-2">
              <EvidenceSection posts={cluster.posts} />
            </div>
          )}
        </div>

        {/* Telemetry Check - Contradictions and Supports */}
        {cluster?.divergence_analysis && (cluster.divergence_analysis.contradictions?.length > 0 || cluster.divergence_analysis.supports?.length > 0) && (
          <div className="mb-6">
            <Card className="p-6 bg-card border border-border/50">
              <h2 className="text-lg font-semibold text-foreground mb-6">Telemetry Check</h2>
              <div className="space-y-4">
                {cluster.divergence_analysis.contradictions && cluster.divergence_analysis.contradictions.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <span className="text-destructive">⚠️</span> Contradictions Found
                    </p>
                    <div className="space-y-2">
                      {cluster.divergence_analysis.contradictions.map((contradiction, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{contradiction}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {cluster.divergence_analysis.supports && cluster.divergence_analysis.supports.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <span className="text-emerald-500">✓</span> Supporting Evidence
                    </p>
                    <div className="space-y-2">
                      {cluster.divergence_analysis.supports.map((support, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{support}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
