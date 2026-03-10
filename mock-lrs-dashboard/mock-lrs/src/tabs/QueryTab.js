import React, { useState } from "react";
import VerbTag from "../components/VerbTag";
import { STUDENTS, WEEKS, queryStatements } from "../data";

const VERBS = ["all","launched","experienced","attempted","answered","completed","scored"];

export default function QueryTab() {
  const [queryVerb,    setQueryVerb]    = useState("all");
  const [queryWeek,    setQueryWeek]    = useState("all");
  const [queryStudent, setQueryStudent] = useState("all");
  const [expandedStmt, setExpandedStmt] = useState(null);

  const results = queryStatements({ verb: queryVerb, week: queryWeek, studentId: queryStudent });

  const selectStyle = {
    background: "#152035", border: "1px solid #334155", borderRadius: 6,
    color: "#e2e8f0", padding: "7px 12px", fontSize: 11,
    fontFamily: "'Syne', sans-serif", cursor: "pointer", minWidth: 140, appearance: "none",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Filters */}
      <div style={{ background: "#0f1729", borderRadius: 12, padding: "20px", border: "1px solid #1e2d45" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginBottom: 14, letterSpacing: 0.8 }}>QUERY STATEMENTS</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-end" }}>

          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ fontSize: 10, color: "#64748b", letterSpacing: 0.5 }}>VERB</span>
            <select value={queryVerb} onChange={e => setQueryVerb(e.target.value)} style={selectStyle}>
              {VERBS.map(v => <option key={v} value={v}>{v === "all" ? "All Verbs" : v}</option>)}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ fontSize: 10, color: "#64748b", letterSpacing: 0.5 }}>WEEK</span>
            <select value={queryWeek} onChange={e => setQueryWeek(e.target.value)} style={selectStyle}>
              <option value="all">All Weeks</option>
              {WEEKS.map(w => <option key={w} value={String(w)}>Week {w}</option>)}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ fontSize: 10, color: "#64748b", letterSpacing: 0.5 }}>STUDENT</span>
            <select value={queryStudent} onChange={e => setQueryStudent(e.target.value)} style={{ ...selectStyle, minWidth: 180 }}>
              <option value="all">All Students</option>
              {STUDENTS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>

          <div style={{ marginLeft: "auto", fontSize: 11, color: "#64748b", fontFamily: "'JetBrains Mono', monospace", paddingBottom: 2 }}>
            {results.length} results
          </div>
        </div>
      </div>

      {/* Statement list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {results.map(stmt => (
          <div key={stmt.id}
            onClick={() => setExpandedStmt(expandedStmt === stmt.id ? null : stmt.id)}
            style={{
              background: "#0f1729", borderRadius: 8, border: "1px solid #1e2d45",
              cursor: "pointer", overflow: "hidden",
              borderLeft: `3px solid ${{ launched:"#3B82F6", experienced:"#06B6D4", attempted:"#10B981", answered:"#14B8A6", completed:"#F59E0B", scored:"#8B5CF6" }[stmt.verb] || "#334155"}`,
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px" }}>
              <VerbTag verb={stmt.verb} />
              <span style={{ fontSize: 11, color: "#cbd5e1", fontWeight: 600, flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {stmt.actor.name}
              </span>
              <span style={{ fontSize: 11, color: "#64748b", whiteSpace: "nowrap" }}>{stmt.objectName}</span>
              <span style={{ fontSize: 10, color: "#475569", fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>
                {new Date(stmt.timestamp).toLocaleDateString()}
              </span>
              <span style={{ fontSize: 10, color: "#334155" }}>{expandedStmt === stmt.id ? "▲" : "▼"}</span>
            </div>

            {expandedStmt === stmt.id && (
              <div style={{ padding: "0 16px 14px", borderTop: "1px solid #1e2d45" }}>
                <pre style={{ fontSize: 10, color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace", margin: "12px 0 0", lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
{JSON.stringify({
  id: stmt.id,
  actor: { name: stmt.actor.name, mbox: `mailto:${stmt.actor.email}` },
  verb: { id: `https://adlnet.gov/expapi/verbs/${stmt.verb}`, display: { "en-US": stmt.verb } },
  object: { id: `https://university.edu/courses/qrm/${stmt.object}`, definition: { name: { "en-US": stmt.objectName } } },
  result: stmt.result,
  context: { extensions: stmt.extensions },
  timestamp: stmt.timestamp,
}, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
