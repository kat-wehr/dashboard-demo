import React from "react";

export const VERB_COLORS = {
  launched:   "#3B82F6",
  experienced:"#06B6D4",
  attempted:  "#10B981",
  answered:   "#14B8A6",
  completed:  "#F59E0B",
  scored:     "#8B5CF6",
};

export default function VerbTag({ verb }) {
  const color = VERB_COLORS[verb] || "#94a3b8";
  return (
    <span style={{
      padding: "2px 8px", borderRadius: 12, fontSize: 10, fontWeight: 700,
      background: color + "20", color,
      border: `1px solid ${color}40`,
      fontFamily: "monospace", whiteSpace: "nowrap",
    }}>{verb}</span>
  );
}
