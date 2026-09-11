import {
  Bell,
  Check,
  Moon,
  Palette,
  Shield,
  SlidersHorizontal,
  UserRound,
} from "lucide-react";

const preferences = [
  {
    icon: Bell,
    title: "Task reminders",
    text: "Show gentle reminders for due and overdue tasks.",
    enabled: true,
  },
  {
    icon: Moon,
    title: "Quiet workspace",
    text: "Reduce extra visual emphasis during focused work.",
    enabled: true,
  },
  {
    icon: Shield,
    title: "Private by default",
    text: "Keep personal boards visible only to you.",
    enabled: false,
  },
];

export default function SettingsPage() {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
        <p className="text-sm font-medium uppercase tracking-wide text-gold-400">
          Settings
        </p>
        <h1 className="mt-2 text-4xl font-semibold text-text">
          Workspace preferences
        </h1>
        <p className="mt-3 text-base leading-7 text-text-secondary">
          Tune the look and feel of Tavora so the workspace fits the way you
          like to move through tasks.
        </p>

        <div className="mt-8 rounded-lg border border-border bg-background-secondary p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gold-500 text-background">
              <UserRound className="h-7 w-7" />
            </div>
            <div>
              <p className="font-semibold text-text">Ahmad</p>
              <p className="mt-1 text-sm text-muted">Personal workspace</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <Palette className="h-5 w-5 text-gold-400" />
            <h2 className="text-xl font-semibold text-text">Theme colors</h2>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-5">
            {[
              ["Gold", "bg-gold-500"],
              ["Success", "bg-success"],
              ["Warning", "bg-warning"],
              ["Danger", "bg-danger"],
              ["Info", "bg-info"],
            ].map(([label, color]) => (
              <div
                key={label}
                className="rounded-lg border border-border bg-background-secondary p-3"
              >
                <div className={`h-12 rounded ${color}`} />
                <p className="mt-3 text-sm font-medium text-text">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="h-5 w-5 text-gold-400" />
            <h2 className="text-xl font-semibold text-text">Preferences</h2>
          </div>
          <div className="mt-6 divide-y divide-border">
            {preferences.map(({ icon: Icon, title, text, enabled }) => (
              <div
                key={title}
                className="flex flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-background-secondary text-gold-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-text">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">{text}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className={`flex h-7 w-12 items-center rounded-full p-1 transition ${
                    enabled ? "bg-gold-500" : "bg-border"
                  }`}
                  title={enabled ? "Enabled" : "Disabled"}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full bg-text transition ${
                      enabled ? "translate-x-5 text-gold-500" : "text-border"
                    }`}
                  >
                    {enabled ? <Check className="h-3.5 w-3.5" /> : null}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
