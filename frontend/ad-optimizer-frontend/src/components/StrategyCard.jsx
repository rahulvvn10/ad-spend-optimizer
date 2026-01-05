export default function StrategyCard({ strategy }) {
  if (!strategy) return null;

  const riskColor =
    strategy.risk === "Low"
      ? "risk-low"
      : strategy.risk === "Medium"
      ? "risk-medium"
      : "risk-high";

  return (
    <div className={`strategy-card ${riskColor}`}>
      <h3>{strategy.name}</h3>
      <p className="objective">{strategy.objective}</p>

      <div className="metrics">
        <p><strong>Ad Spend:</strong> ₹{strategy.ad_spend}</p>
        <p><strong>Discount:</strong> {strategy.discount}%</p>
        <p><strong>Sales:</strong> {strategy.sales}</p>
        <p><strong>Profit:</strong> ₹{strategy.profit}</p>
        <p><strong>ROI:</strong> {strategy.roi}</p>
      </div>

      <div className="meta">
        <p><strong>Risk:</strong> {strategy.risk}</p>
        <p><strong>Best For:</strong> {strategy.best_for}</p>
        <p><strong>Stop Condition:</strong> {strategy.stop_condition}</p>
        <p className="tradeoff">⚠ {strategy.tradeoff}</p>
      </div>
    </div>
  );
}
