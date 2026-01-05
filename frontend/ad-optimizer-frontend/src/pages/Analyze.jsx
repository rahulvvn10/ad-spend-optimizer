import { useEffect, useState } from "react";
import Card from "../components/Card";
import Metric from "../components/Metric";
import Charts from "../components/Charts";
import "../styles/analyze.css";
import { analyzeWhatIf } from "../services/api";

function Analyze() {
  const [inputs, setInputs] = useState({
    price: 3000,
    ad_spend: 11000,
    discount: 5,
    page_quality: 4,
    targeting_level: 2, // 1=Low, 2=Medium, 3=High
    creative_level: 1   // 1=Basic, 2=Strong
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // -------------------------------
  // LIVE MULTI-FEATURE WHAT-IF
  // -------------------------------
  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      analyzeWhatIf(inputs)
        .then(res => setResult(res.data))
        .finally(() => setLoading(false));
    }, 700); // debounce

    return () => clearTimeout(timeout);
  }, [inputs]);

  return (
    <div className="page">
      <h2>What-If Scenario Analysis</h2>
      <p style={{ color: "var(--text-secondary)", maxWidth: "700px" }}>
        Adjust multiple business levers below to see how they jointly affect
        sales, profit, and ROI.
      </p>

      {/* ================= CONTROLS ================= */}
      <Card title="Scenario Controls">

        {/* Ad Spend */}
        <label>Ad Spend (₹)</label>
        <input
          type="range"
          min="3000"
          max="25000"
          step="1000"
          value={inputs.ad_spend}
          onChange={(e) =>
            setInputs({ ...inputs, ad_spend: Number(e.target.value) })
          }
        />
        <p>₹ {inputs.ad_spend}</p>

        {/* Discount */}
        <label>Discount (%)</label>
        <input
          type="range"
          min="0"
          max="30"
          step="1"
          value={inputs.discount}
          onChange={(e) =>
            setInputs({ ...inputs, discount: Number(e.target.value) })
          }
        />
        <p>{inputs.discount}%</p>

        {/* Page Quality */}
        <label>Landing Page Quality</label>
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={inputs.page_quality}
          onChange={(e) =>
            setInputs({ ...inputs, page_quality: Number(e.target.value) })
          }
        />
        <p>{inputs.page_quality} / 5</p>

        {/* Targeting */}
        <label>Targeting Strength</label>
        <input
          type="range"
          min="1"
          max="3"
          step="1"
          value={inputs.targeting_level}
          onChange={(e) =>
            setInputs({ ...inputs, targeting_level: Number(e.target.value) })
          }
        />
        <p>{["Low", "Medium", "High"][inputs.targeting_level - 1]}</p>

        {/* Creative */}
        <label>Creative Quality</label>
        <input
          type="range"
          min="1"
          max="2"
          step="1"
          value={inputs.creative_level}
          onChange={(e) =>
            setInputs({ ...inputs, creative_level: Number(e.target.value) })
          }
        />
        <p>{inputs.creative_level === 1 ? "Basic" : "Strong"}</p>

      </Card>

      {loading && (
        <p style={{ color: "var(--text-muted)", marginTop: "20px" }}>
          Running scenario analysis…
        </p>
      )}

      {result && (
        <>
          {/* ================= METRICS ================= */}
          <div className="grid grid-3" style={{ marginTop: "30px" }}>
            <Card>
              <Metric label="Predicted Sales" value={result.user_what_if.sales} />
            </Card>
            <Card>
              <Metric label="Profit" value={`₹ ${result.user_what_if.profit}`} />
            </Card>
            <Card>
              <Metric label="ROI" value={result.user_what_if.roi} />
            </Card>
          </div>

          {/* ================= DECISION INSIGHTS ================= */}
          <Card title="Decision Insights">
  <p>🟢 Recommended Spend: ₹ {result.recommended_spend}</p>
  <p>🔴 Stop Spend: ₹ {result.stop_spend}</p>
  <p>🟡 Budget Cap: ₹ {result.budget_cap}</p>

  {result.user_what_if.roi < result.min_acceptable_roi && (
    <p style={{ color: "#f87171", marginTop: "10px" }}>
      ⚠ ROI has dropped below the acceptable threshold. Further spend may be inefficient.
    </p>
  )}
</Card>


          {/* ================= CHART ================= */}
          <Card title="ROI vs Ad Spend" style={{ marginTop: "30px" }}>
  <Charts
    data={result.what_if_curve}
    markers={{
      stop_spend: result.stop_spend
    }}
  />
</Card>

        </>
      )}
    </div>
  );
}

export default Analyze;
