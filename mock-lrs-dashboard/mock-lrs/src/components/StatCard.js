import React from "react";

export default function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{
      background: "#0f1729",
      border: `1px solid ${accent}30`,
      borderRadius: 10,
      padding: "16px 20px",
      flex: 1,
      minWidth: 120,
      borderTop: `3px solid ${accent}`,
    }}>
      <div style={{ fontSize: 26, fontWeight: 800, color: accent, fontFamily: "'Syne', sans-serif" }}>{value}</div>
      <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{label}</div>
      {sub && <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}
