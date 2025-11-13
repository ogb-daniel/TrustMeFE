import { Card } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Info } from "lucide-react";
import { TelemetryCheck as TelemetryCheckType } from "@/lib/types/cluster";
import { Telemetry } from "@/lib/types/cluster";
import { AlertTriangle, TrendingUp, Activity } from "lucide-react";

interface TelemetryCheckProps {
  telemetryCheck: TelemetryCheckType;
  telemetry: Telemetry;
}

export function TelemetryCheck({
  telemetryCheck,
  telemetry,
}: TelemetryCheckProps) {
  const hasMismatch = telemetryCheck.mismatch;
  const confidencePercentage = (telemetryCheck.confidence * 100).toFixed(0);
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/20";
      case "HIGH":
        return "text-orange-600 dark:text-orange-400 bg-orange-500/10 border-orange-500/20";
      case "MODERATE":
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      case "LOW":
        return "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20";
      default:
        return "text-muted-foreground bg-muted/30 border-border/30";
    }
  };

  const formatMetricKey = (key: string): string => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatMetricValue = (value: any): string => {
    if (typeof value === "number") {
      if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(2)}M`;
      }
      if (value >= 1000) {
        return value.toFixed(2);
      }
      return value.toString();
    }
    return String(value);
  };
  return (
    <Card className="p-6 bg-card border border-border/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">
          Telemetry Check
        </h2>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Info className="h-3.5 w-3.5" />
          <span>Confidence: {confidencePercentage}%</span>
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${getSeverityColor(telemetry.severity)}`}
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            {telemetry.severity}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div
          className={`flex items-start gap-3 p-4 rounded-lg ${
            hasMismatch
              ? "bg-destructive/5 border border-destructive/20"
              : "bg-emerald-500/5 border border-emerald-500/20"
          }`}
        >
          {hasMismatch ? (
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          ) : (
            <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1 min-w-0">
            <p
              className={`text-sm font-medium ${hasMismatch ? "text-destructive" : "text-emerald-600 dark:text-emerald-400"}`}
            >
              {hasMismatch ? "Mismatch Detected" : "No Mismatch Detected"}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {telemetryCheck.explanation}
            </p>
          </div>
        </div>
      </div>

      {/* Narrative Confirmation */}
      <div
        className={`mb-6 p-4 rounded-lg border ${telemetry.confirms_narrative ? "bg-destructive/5 border-destructive/20" : "bg-emerald-500/5 border-emerald-500/20"}`}
      >
        <div className="flex items-center gap-2">
          {telemetry.confirms_narrative ? (
            <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0" />
          ) : (
            <Activity className="h-4 w-4 text-emerald-500 flex-shrink-0" />
          )}
          <p
            className={`text-sm font-medium ${telemetry.confirms_narrative ? "text-destructive" : "text-emerald-600 dark:text-emerald-400"}`}
          >
            {telemetry.confirms_narrative
              ? "Telemetry data confirms the narrative"
              : "Telemetry data does not confirm the narrative"}
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Market Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(telemetry.metrics).map(([key, value]) => (
            <div
              key={key}
              className="p-3 rounded-lg bg-background/50 border border-border/30"
            >
              <p className="text-xs text-muted-foreground mb-1">
                {formatMetricKey(key)}
              </p>
              <p className="text-base font-semibold text-foreground">
                {formatMetricValue(value)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Timestamp */}
      <div className="mt-4 pt-4 border-t border-border/30">
        <p className="text-xs text-muted-foreground">
          Last updated: {new Date(telemetry.timestamp).toLocaleString()}
        </p>
      </div>
    </Card>
  );
}
