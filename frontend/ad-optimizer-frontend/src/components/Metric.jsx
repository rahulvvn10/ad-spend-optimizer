function Metric({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: "26px", fontWeight: 600 }}>
        {value}
      </div>
      <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>
        {label}
      </div>
    </div>
  );
}

export default Metric;
