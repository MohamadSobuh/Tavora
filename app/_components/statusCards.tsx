import { LucideIcon } from "lucide-react";

type StatsCardProps = {
  name: string;
  numTasks: number;
  note?: string;
  st?: "green" | "yellow" | "red" | "gold" | "blue";
  icon: LucideIcon;
};

export default function StatusCards({
  name,
  icon: Icon,
  numTasks,
  note,
  st = "gold",
}: StatsCardProps) {
  const statusColors: Record<NonNullable<StatsCardProps["st"]>, string> = {
    green: "text-success bg-success-bg/45 ring-success/20",
    yellow: "text-warning bg-warning-bg/45 ring-warning/20",
    red: "text-danger bg-danger-bg/45 ring-danger/20",
    gold: "text-gold-300 bg-gold-500/10 ring-gold-500/20",
    blue: "text-info bg-info-bg/45 ring-info/20",
  };

  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-[0_16px_42px_rgba(2,6,23,0.24)] transition hover:border-border-hover hover:bg-card-hover">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-muted">{name}</p>
          <p className="mt-3 text-3xl font-semibold tracking-normal text-text">
            {numTasks}
          </p>
        </div>
        <span className={`rounded-lg p-2 ring-1 ${statusColors[st]}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      {note ? <p className="mt-4 text-sm text-text-secondary">{note}</p> : null}
    </div>
  );
}
