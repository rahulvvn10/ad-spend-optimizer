import { useEffect, useState } from "react";
import { fetchStrategies } from "../services/api";
import StrategyCard from "../components/StrategyCard";
import "../styles/strategyComparison.css";

export default function Strategies() {
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStrategies({
      price: 3000,
      discount: 5,
      ad_spend: 12000,
      page_quality: 7,
      targeting_level: 2,
      creative_level: 1
    })
      .then((res) => {
        setStrategies(res.data.strategies || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Strategy fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading strategies...</p>;
  }

  if (strategies.length === 0) {
    return <p style={{ padding: "20px" }}>No strategies available</p>;
  }

  return (
    <div className="strategy-page">
      <h2>Strategy Comparison</h2>
      <p className="subtitle">
        Compare growth strategies based on risk, ROI, and profit
      </p>

      <div className="strategy-grid">
        {strategies.map((s) => (
          <StrategyCard key={s.name} strategy={s} />
        ))}
      </div>
    </div>
  );
}
