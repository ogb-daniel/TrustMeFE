"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGenerateResponse } from "@/lib/hooks/mutations/use-generate-response";
import { useApproveAlert } from "@/lib/hooks/mutations/use-approve-alert";
import { useRejectAlert } from "@/lib/hooks/mutations/use-reject-alert";
import { GeneratedResponse } from "@/lib/types/cluster";

interface ResponseSuggestionProps {
  clusterId: string;
  generatedResponse?: GeneratedResponse;
  variant?: "preview" | "full";
  onViewFullResponse?: () => void;
}

export function ResponseSuggestion({ clusterId, generatedResponse, variant = "full", onViewFullResponse }: ResponseSuggestionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [response, setResponse] = useState("");
  const [alertId, setAlertId] = useState<string | null>(null);

  const generateMutation = useGenerateResponse();
  const approveMutation = useApproveAlert();
  const rejectMutation = useRejectAlert();

  useEffect(() => {
    // If generated_response exists in cluster detail, use it
    if (generatedResponse?.text) {
      setResponse(generatedResponse.text);
      return;
    }

    // Otherwise, call the generate endpoint as fallback
    if (clusterId && !generatedResponse) {
      generateMutation.mutate(
        { cluster_id: clusterId },
        {
          onSuccess: (data) => {
            setResponse(data.response_text || "");
            setAlertId(data.id);
          },
        }
      );
    }
  }, [clusterId, generatedResponse]);

  const handleApprove = () => {
    if (!alertId) return;
    approveMutation.mutate({
      alertId,
      request: {
        user_id: "user_001",
        edited_response: response,
        notes: "Approved from dashboard",
      },
    });
  };

  const handleReject = () => {
    if (!alertId) return;
    rejectMutation.mutate({
      alertId,
      request: {
        user_id: "user_001",
        reason: "false_alarm",
        notes: "This alert was marked as a false alarm by the user.",
      },
    });
  };

  const isLoading =
    generateMutation.isPending ||
    approveMutation.isPending ||
    rejectMutation.isPending;

  // Preview variant - show just the text with a "Read more" link
  if (variant === "preview") {
    // Show loading only if we don't have generated_response and mutation is pending
    if (!generatedResponse && generateMutation.isPending) {
      return (
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
        </div>
      );
    }

    const preview = response.length > 120 ? response.substring(0, 120) + "..." : response;

    return (
      <>
        <p className="text-sm text-foreground leading-relaxed">
          {preview || "No response generated yet."}
        </p>
        {response && onViewFullResponse && (
          <Button
            onClick={onViewFullResponse}
            variant="link"
            className="p-0 h-auto text-secondary-foreground hover:text-secondary-foreground/80 mt-2"
          >
            Read more →
          </Button>
        )}
      </>
    );
  }

  // Full variant - show the complete component with editing and actions
  return (
    <Card className="p-6 bg-card border border-border/50">
      {/* <h2 className="text-lg font-semibold text-foreground mb-6">Suggested Response</h2> */}

      {!generatedResponse && generateMutation.isPending ? (
        <div className="space-y-4">
          <div className="h-32 bg-muted animate-pulse rounded" />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="h-8 bg-muted animate-pulse rounded" />
            <div className="h-8 bg-muted animate-pulse rounded" />
            <div className="h-8 bg-muted animate-pulse rounded" />
            <div className="h-8 bg-muted animate-pulse rounded" />
          </div>
        </div>
      ) : isEditing ? (
        <div className="space-y-4">
          <Textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="min-h-[120px] resize-none bg-background border-border/50"
            placeholder="Enter your response..."
          />
          <div className="flex gap-3">
            <Button
              size="sm"
              onClick={() => setIsEditing(false)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Save
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="border-border/50 text-foreground hover:bg-muted"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-background/60 border border-border/30 min-h-[120px]">
            <p className="text-sm text-foreground leading-relaxed">
              {response || "No response generated yet."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Button
              size="sm"
              onClick={() => setIsEditing(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading || !response}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleApprove}
              className="border-border/50 text-foreground hover:bg-muted bg-transparent"
              disabled={isLoading || !alertId}
            >
              Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleReject}
              className="border-destructive/20 text-foreground hover:bg-destructive/5 bg-transparent"
              disabled={isLoading || !alertId}
            >
              False Alarm
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-border/50 text-foreground hover:bg-muted bg-transparent"
              disabled={isLoading}
            >
              Escalate
            </Button>
          </div>
        </div>
      )}

      <div className="mt-5 pt-5 border-t border-border/30 text-xs text-muted-foreground">
        Response template:{" "}
        <span className="font-medium text-foreground">INFORM</span> (Low-key
        acknowledgment)
      </div>
    </Card>
  );
}
