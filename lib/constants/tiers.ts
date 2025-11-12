import { Tier } from "@/lib/types/api";

type TierConfig = {
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
};

// Support both new tier names (MONITOR, ALERT, ACTION) and legacy names (INFORM, WATCH, CRISIS)
export const TIER_CONFIG: Record<string, TierConfig> = {
  // New tier naming (primary)
  ACTION: {
    label: "Action",
    color: "destructive",
    bgColor: "bg-destructive/10",
    textColor: "text-destructive",
    borderColor: "border-destructive",
  },
  ALERT: {
    label: "Alert",
    color: "orange",
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-600",
    borderColor: "border-orange-500",
  },
  MONITOR: {
    label: "Monitor",
    color: "blue",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-600",
    borderColor: "border-blue-500",
  },
  // Legacy tier naming (for backward compatibility)
  CRISIS: {
    label: "Crisis",
    color: "destructive",
    bgColor: "bg-destructive/10",
    textColor: "text-destructive",
    borderColor: "border-destructive",
  },
  WATCH: {
    label: "Watch",
    color: "orange",
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-600",
    borderColor: "border-orange-500",
  },
  INFORM: {
    label: "Inform",
    color: "blue",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-600",
    borderColor: "border-blue-500",
  },
};

export const TIER_THRESHOLDS = {
  ACTION: 60,
  ALERT: 40,
  MONITOR: 0,
};
