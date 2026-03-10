import React from "react";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import ChartTooltip from "../components/ChartTooltip";
import { STUDENTS } from "../data";

export default function LearnerTab({ selectedStudent, setSelectedStudent, studentProfile }) {
  const selStudent = selectedStudent ? STUDENTS.find(s => s.id === selectedStudent) : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Selector */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, color: "#64748b" }}>Select learner:</span>
        <select value={selectedStudent || ""} onChange={e => setSelectedStudent(e.target.value || null)}
          style={{ background: "#0f1729", border: "1px solid #334155", borderRadius: 8, color: "#e2e8f0", padding: "8px 14px", fontSize: 12, fontFamily: "'Syne', sans-serif", cursor: "pointer", minWidth: 200, appearance: "none" }}>
          <option value="">— choose a student —</option>
          {STUDENTS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>

      {selStudent && studentProfile ? (
        <>
          {/* Profile header */}
          <div style={{ background: "#0f1729", borderRadius: 12, padding: "20px", border: "1px solid #3B82F630", borderLeft: "4px solid #3B82F6" }}>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{selStudent.name}</div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 2, fontFamily: "'JetBrains Mono', monospace" }}>{selStudent.email}</div>
            <div style={{ display: "flex", gap: 28, marginTop: 14, flexWrap: "wrap" }}>
              {[
                ["Weeks Completed", `${studentProfile.filter(p => p.completed).length}/${studentProfile.length}`, "#10B981"],
                ["Late Submissions", studentProfile.filter(p => p.late).length, "#F43F5E"],
                ["Avg Score", (studentProfile.filter(p => p.score !== null).reduce((a, p) => a + p.score, 0) / Math.max(1, studentProfile.filter(p => p.score !== null).length)).toFixed(1) + "/10", "#F59E0B"],
                ["Avg Read Time", Math.round(studentProfile.filter(p => p.readMin).reduce((a, p) => a + p.readMin, 0) / Math.max(1, studentProfile.filter(p => p.readMin).length)) + " min", "#8B5CF6"],
              ].map(([l, v, c]) => (
                <div key={l}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: c }}>{v}</div>
                  <div style={{ fontSize: 10, color: "#64748b", marginTop: 1 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Charts */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: "#0f1729", borderRadius: 12, padding: "20px", border: "1px solid #1e2d45" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginBottom: 14, letterSpacing: 0.8 }}>SCORE OVER WEEKS</div>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={studentProfile.filter(p => p.score !== null)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
                  <XAxis dataKey="week" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 10]} />
                  <Tooltip content={<ChartTooltip />} />
                  <Line type="monotone" dataKey="score" name="Score" stroke="#F59E0B" strokeWidth={2} dot={{ fill: "#F59E0B", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div style={{ background: "#0f1729", borderRadius: 12, padding: "20px", border: "1px solid #1e2d45" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginBottom: 14, letterSpacing: 0.8 }}>WORD COUNT OVER WEEKS</div>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={studentProfile.filter(p => p.wordCount !== null)} barSize={18}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
                  <XAxis dataKey="week" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="wordCount" name="Words" fill="#10B981" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Week-by-week detail */}
          <div style={{ background: "#0f1729", borderRadius: 12, padding: "20px", border: "1px solid #1e2d45" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginBottom: 14, letterSpacing: 0.8 }}>WEEKLY DETAIL</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {studentProfile.map((p, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 14px", borderRadius: 8,
                  background: p.completed ? "#0a1829" : "#12100e",
                  border: `1px solid ${p.completed ? (p.late ? "#F43F5E30" : "#10B98130") : "#2a1f1f"}`,
                }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: "#94a3b8", width: 36 }}>Wk {i + 1}</div>
                  <div style={{ flex: 1, display: "flex", gap: 20, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, color: p.completed ? (p.late ? "#F59E0B" : "#10B981") : "#F43F5E" }}>
                      {p.completed ? (p.late ? "⚠ Late" : "✓ Submitted") : "✗ Missing"}
                    </span>
                    {p.score  !== null && <span style={{ fontSize: 11, color: "#F59E0B" }}>Score: {p.score}/10</span>}
                    {p.wordCount       && <span style={{ fontSize: 11, color: "#64748b" }}>{p.wordCount} words</span>}
                    {p.readMin         && <span style={{ fontSize: 11, color: "#8B5CF6" }}>Read: {p.readMin} min</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div style={{ color: "#475569", textAlign: "center", padding: 60, fontSize: 14 }}>
          Select a student above — or click any row in the Cohort heatmap
        </div>
      )}
    </div>
  );
}
