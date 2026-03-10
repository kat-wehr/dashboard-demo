import React, { useState, useMemo } from "react";
import StatCard from "./components/StatCard";
import CohortTab from "./tabs/CohortTab";
import LearnerTab from "./tabs/LearnerTab";
import QueryTab from "./tabs/QueryTab";
import { ALL_STATEMENTS, STUDENTS, getCohortStats, getStudentProfile } from "./data";

const TABS = [
  { id: "cohort",  label: "Cohort Overview" },
  { id: "learner", label: "Learner Progress" },
  { id: "query",   label: "Statement Explorer" },
];

export default function App() {
  const [tab,             setTab]             = useState("cohort");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const cohortStats    = useMemo(() => getCohortStats(), []);
  const studentProfile = useMemo(() => selectedStudent ? getStudentProfile(selectedStudent) : null, [selectedStudent]);

  // Summary stats
  const totalStmts      = ALL_STATEMENTS.length;
  const completions     = ALL_STATEMENTS.filter(s => s.verb === "completed");
  const scores          = ALL_STATEMENTS.filter(s => s.verb === "scored");
  const completionRate  = Math.round((completions.length / (STUDENTS.length * 7)) * 100);
  const avgScore        = scores.length
    ? (scores.reduce((a, s) => a + (s.result?.score?.raw || 0), 0) / scores.length).toFixed(1)
    : "—";
  const lateCount       = completions.filter(s => s.extensions?.submissionStatus === "late").length;
  const lateRate        = completions.length ? Math.round((lateCount / completions.length) * 100) : 0;

  const handleSelectStudent = (id) => {
    setSelectedStudent(id);
    setTab("learner");
  };

  return (
    <div style={{ background: "#080e1a", minHeight: "100vh", fontFamily: "'Syne', sans-serif", color: "#e2e8f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
        * { box-sizing: border-box; }
        select { appearance: none; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0f1729; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
      `}</style>

      {/* ── Header ── */}
      <div style={{ background: "#0a1120", borderBottom: "1px solid #1e2d45", padding: "16px 28px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚡</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: -0.3 }}>Mock LRS</div>
            <div style={{ fontSize: 10, color: "#64748b" }}>QRM 501 · Fall 2025 · Micro-Critique Assignment</div>
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981" }} />
          <span style={{ fontSize: 11, color: "#10B981", fontFamily: "'JetBrains Mono', monospace" }}>{totalStmts.toLocaleString()} statements</span>
        </div>
      </div>

      {/* ── Stat bar ── */}
      <div style={{ display: "flex", gap: 12, padding: "16px 28px", borderBottom: "1px solid #1e2d45", flexWrap: "wrap" }}>
        <StatCard label="Total Statements"   value={totalStmts}          sub="across all weeks"           accent="#3B82F6" />
        <StatCard label="Completion Rate"    value={`${completionRate}%`} sub="of expected submissions"   accent="#10B981" />
        <StatCard label="Avg Score"          value={`${avgScore}/10`}     sub="instructor rubric"          accent="#F59E0B" />
        <StatCard label="Late Submissions"   value={`${lateRate}%`}       sub="of completed critiques"     accent="#F43F5E" />
        <StatCard label="Active Learners"    value={STUDENTS.length}      sub="enrolled students"          accent="#8B5CF6" />
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: "flex", padding: "0 28px", borderBottom: "1px solid #1e2d45" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: "none", border: "none", padding: "12px 20px", cursor: "pointer",
            color: tab === t.id ? "#3B82F6" : "#64748b",
            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 0.5,
            borderBottom: tab === t.id ? "2px solid #3B82F6" : "2px solid transparent",
            transition: "all 0.15s",
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <div style={{ padding: "24px 28px" }}>
        {tab === "cohort"  && <CohortTab  cohortStats={cohortStats} onSelectStudent={handleSelectStudent} />}
        {tab === "learner" && <LearnerTab selectedStudent={selectedStudent} setSelectedStudent={setSelectedStudent} studentProfile={studentProfile} />}
        {tab === "query"   && <QueryTab />}
      </div>
    </div>
  );
}
