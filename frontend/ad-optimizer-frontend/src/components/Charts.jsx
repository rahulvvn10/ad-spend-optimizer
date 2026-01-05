import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

function Charts({ data, markers }) {
  if (!data || data.length === 0) {
    return <p style={{ color: "var(--text-secondary)" }}>No data</p>;
  }

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis
            dataKey="ad_spend"
            tickFormatter={(v) => `₹${v / 1000}k`}
          />
          <YAxis
            tickFormatter={(v) => `${Math.round(v)}`}
            label={{
              value: "ROI",
              angle: -90,
              position: "insideLeft"
            }}
          />
          <Tooltip
            formatter={(v) => v.toFixed(2)}
            labelFormatter={(l) => `Ad Spend: ₹${l}`}
          />

          {/* ROI Line */}
          <Line
            type="monotone"
            dataKey="roi"
            stroke="#38bdf8"
            strokeWidth={2}
            dot={false}
          />

          {/* Stop Spend Marker */}
          {markers?.stop_spend && (
            <ReferenceLine
              x={markers.stop_spend}
              stroke="#ef4444"
              strokeDasharray="4 4"
              label="Stop Spend"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Charts;
