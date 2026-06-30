import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-[0_0_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Dashboard</p>
        <h1 className="text-3xl font-semibold tracking-tight">Welcome to the Oil Branch Control Center</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Review current stock, delivery movements, and branch performance from one premium operations dashboard.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href="/inventory/stocks" className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/20">
          View stock levels
        </Link>
        <Link href="/reports/branch-performance" className="rounded-full border border-border/60 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted/60">
          Review branch analytics
        </Link>
      </div>
    </div>
  );
}
