import { Card } from "@/components/ui/card"
import { CheckCircle, AlertCircle } from "lucide-react"
import { TelemetryCheck as TelemetryCheckType } from "@/lib/types/risk"

interface TelemetryCheckProps {
  telemetryCheck: TelemetryCheckType
}

export function TelemetryCheck({ telemetryCheck }: TelemetryCheckProps) {
  const hasMismatch = telemetryCheck.mismatch

  return (
    <Card className="p-6 bg-card border border-border/50">
      <h2 className="text-lg font-semibold text-foreground mb-6">Telemetry Check</h2>

      <div className="space-y-4">
        <div
          className={`flex items-start gap-3 p-3 rounded-lg ${
            hasMismatch
              ? "bg-destructive/5 border border-destructive/20"
              : "bg-background/40 border border-border/30"
          }`}
        >
          {hasMismatch ? (
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          ) : (
            <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">{telemetryCheck.metric}</p>
            <p className={`text-sm mt-0.5 ${hasMismatch ? "text-destructive" : "text-muted-foreground"}`}>
              Claim: {telemetryCheck.claim_assertion}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Actual: {telemetryCheck.actual_value}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 p-4 rounded-lg bg-muted/30 border border-border/30">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Key Finding:</span> {telemetryCheck.explanation}
        </p>
      </div>
    </Card>
  )
}
