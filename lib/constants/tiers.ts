import { Tier } from "@/lib/types/api";

export const TIER_CONFIG: Record<
  Tier,
  {
    label: string;
    color: string;
    bgColor: string;
    textColor: string;
    borderColor: string;
  }
> = {
  CRISIS: {
    label: "Crisis",
    color: "destructive",
    bgColor: "bg-destructive/10",
    textColor: "text-destructive",
    borderColor: "border-destructive",
  },
  ACTION: {
    label: "Action",
    color: "orange",
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-600",
    borderColor: "border-orange-500",
  },
  WATCH: {
    label: "Watch",
    color: "yellow",
    bgColor: "bg-yellow-500/10",
    textColor: "text-yellow-600",
    borderColor: "border-yellow-500",
  },
  INFORM: {
    label: "Info",
    color: "blue",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-600",
    borderColor: "border-blue-500",
  },
};

export const TIER_THRESHOLDS = {
  CRISIS: 80,
  ACTION: 60,
  WATCH: 40,
  INFORM: 0,
};
