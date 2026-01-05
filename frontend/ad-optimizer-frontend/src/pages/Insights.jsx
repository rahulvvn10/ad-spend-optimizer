import { useEffect, useState } from "react";

import Card from "../components/Card";

function Insights() {
  const [markers, setMarkers] = useState(null);

  useEffect(() => {
    fetchInsights({
      price: 3000,
      discount: 5,
      ad_spend: 12000,
      page_quality: 4,
      targeting_low: 0,
      targeting_medium: 0,
      creative_offer: 1,
      creative_urgency: 0,
      region_low: 0
    }).then(res => setMarkers(res.data.markers));
  }, []);

  return (
    <div className="page">
      <h2>Insights</h2>

      {markers && (
        <Card>
          <p>Budget Cap: ₹ {markers.budget_cap}</p>
          <p>Stop Spend: ₹ {markers.stop_spend}</p>
          <p>Recommended Spend: ₹ {markers.recommended_spend}</p>
        </Card>
      )}
    </div>
  );
}

export default Insights;
