import React from "react";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import ChartTooltip from "../components/ChartTooltip";
import { STUDENTS, WEEKS, getStudentProfile } from "../data";

export default function CohortTab({ cohortStats, onSelectStudent }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Top charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

        {/* Submissions */}
        <div style={{ background: "#0f1729", borderRadius: 12, padding: "20px", border: "1px solid #1e2d45" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", marginBottom: 16, letterSpacing: 0.8 }}>SUBMISSIONS PER WEEK</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={cohortStats} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
              <XAxis dataKey="week" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 25]} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="completions" name="On-Time" fill="#3B82F6" radius={[4,4,0,0]} />
              <Bar dataKey="lateCount"   name="Late"    fill="#F43F5E" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            {[["#3B82F6","On-Time"],["#F43F5E","Late"]].map(([c,l]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: "#64748b" }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />{l}
              </div>
            ))}
          </div>
        </div>

        {/* Avg score */}
        <div style={{ background: "#0f1729", borderRadius: 12, padding: "20px", border: "1px solid #1e2d45" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", marginBottom: 16, letterSpacing: 0.8 }}>AVG SCORE BY WEEK (out of 10)</div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={cohortStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
              <XAxis dataKey="week" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 10]} />
              <Tooltip content={<ChartTooltip />} />
              <Line type="monotone" dataKey="avgScore" name="Avg Score" stroke="#F59E0B" strokeWidth={2.5} dot={{ fill: "#F59E0B", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Word count */}
      <div style={{ background: "#0f1729", borderRadius: 12, padding: "20px", border: "1px solid #1e2d45" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", marginBottom: 16, letterSpacing: 0.8 }}>AVG TOTAL WORD COUNT PER SUBMISSION</div>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={cohortStats} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
            <XAxis dataKey="week" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="avgWordCount" name="Avg Words" fill="#10B981" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Heatmap */}
      <div style={{ background: "#0f1729", borderRadius: 12, padding: "20px", border: "1px solid #1e2d45" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", marginBottom: 16, letterSpacing: 0.8 }}>
          COHORT COMPLETION HEATMAP — Click a student to drill down
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
            <thead>
              <tr>
                <th style={{ color: "#64748b", padding: "6px 12px", textAlign: "left", fontWeight: 600 }}>Student</th>
                {WEEKS.map(w => (
                  <th key={w} style={{ color: "#64748b", padding: "6px 8px", textAlign: "center", fontWeight: 600 }}>Wk {w}</th>
                ))}
                <th style={{ color: "#64748b", padding: "6px 12px", textAlign: "center", fontWeight: 600 }}>Avg Score</th>
              </tr>
            </thead>
            <tbody>
              {STUDENTS.map(student => {
                const profile = getStudentProfile(student.id);
                const scored  = profile.filter(p => p.score !== null);
                const avgSc   = scored.length ? (scored.reduce((a, p) => a + p.score, 0) / scored.length).toFixed(1) : "—";
                return (
                  <tr key={student.id}
                    onClick={() => onSelectStudent(student.id)}
                    style={{ cursor: "pointer", borderTop: "1px solid #1a2740" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#152035"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "7px 12px", color: "#cbd5e1", fontWeight: 600, whiteSpace: "nowrap" }}>{student.name}</td>
                    {profile.map((p, i) => (
                      <td key={i} style={{ padding: "7px 8px", textAlign: "center" }}>
                        {p.completed
                          ? <div style={{ width: 18, height: 18, borderRadius: 4, background: p.late ? "#F43F5E40" : "#10B98140", border: `1.5px solid ${p.late ? "#F43F5E" : "#10B981"}`, margin: "auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: p.late ? "#F43F5E" : "#10B981" }}>{p.late ? "L" : "✓"}</div>
                          : <div style={{ width: 18, height: 18, borderRadius: 4, background: "#1e2d45", margin: "auto" }} />}
                      </td>
                    ))}
                    <td style={{ padding: "7px 12px", textAlign: "center", color: "#F59E0B", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{avgSc}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
          {[["#10B981","On-time"],["#F43F5E","Late (L)"],["#1e2d45","Missing"]].map(([c,l]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: "#64748b" }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: c }} />{l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
