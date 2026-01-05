function Card({ title, children }) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #1f2933"
      }}
    >
      {title && (
        <h3 style={{ marginBottom: "12px", color: "var(--accent)" }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

export default Card;
