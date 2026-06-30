export default function InventoryStocksPage() {
  return (
    <div className="rounded-3xl border border-border/60 bg-background/70 p-8 shadow-[0_0_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <h1 className="text-3xl font-semibold tracking-tight">Stock Levels</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Monitor real-time stock balances by branch, oil type, and storage capacity.
      </p>
    </div>
  );
}
