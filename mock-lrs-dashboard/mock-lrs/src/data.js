// ─── STUDENTS ────────────────────────────────────────────────────────────────

export const STUDENTS = [
  { id: "s01", name: "Amara Osei",          email: "aosei@university.edu" },
  { id: "s02", name: "Blake Nguyen",         email: "bnguyen@university.edu" },
  { id: "s03", name: "Carmen Reyes",         email: "creyes@university.edu" },
  { id: "s04", name: "Darius Kim",           email: "dkim@university.edu" },
  { id: "s05", name: "Elena Marchetti",      email: "emarchetti@university.edu" },
  { id: "s06", name: "Felix Abara",          email: "fabara@university.edu" },
  { id: "s07", name: "Grace Liu",            email: "gliu@university.edu" },
  { id: "s08", name: "Hiro Tanaka",          email: "htanaka@university.edu" },
  { id: "s09", name: "Imani Walker",         email: "iwalker@university.edu" },
  { id: "s10", name: "Jonas Eriksson",       email: "jeriksson@university.edu" },
  { id: "s11", name: "Kira Patel",           email: "kpatel@university.edu" },
  { id: "s12", name: "Luca Ferraro",         email: "lferraro@university.edu" },
  { id: "s13", name: "Maya Chen",            email: "mchen@university.edu" },
  { id: "s14", name: "Niko Papadopoulos",    email: "npapadopoulos@university.edu" },
  { id: "s15", name: "Olivia Mensah",        email: "omensah@university.edu" },
  { id: "s16", name: "Pedro Alves",          email: "palves@university.edu" },
  { id: "s17", name: "Quinn Nakamura",       email: "qnakamura@university.edu" },
  { id: "s18", name: "Rania Haddad",         email: "rhaddad@university.edu" },
  { id: "s19", name: "Samuel Boateng",       email: "sboateng@university.edu" },
  { id: "s20", name: "Tanya Volkov",         email: "tvolkov@university.edu" },
  { id: "s21", name: "Uma Krishnan",         email: "ukrishnan@university.edu" },
  { id: "s22", name: "Victor Okonkwo",       email: "vokonkwo@university.edu" },
  { id: "s23", name: "Wren Castellano",      email: "wcastellano@university.edu" },
  { id: "s24", name: "Xara Petrov",          email: "xpetrov@university.edu" },
  { id: "s25", name: "Yusuf Ibrahim",        email: "yibrahim@university.edu" },
];

export const WEEKS   = [1, 2, 3, 4, 5, 6, 7];
export const MODULES = [
  "Sampling Bias", "Confounding Variables", "Validity Threats",
  "Research Design", "Causal Inference", "Measurement Error", "Ethics & Equity",
];
const CRITIQUE_FOCUS  = ["selection-bias","confounding","internal-validity","external-validity","causal-interpretation","measurement-bias","ethical-concern"];
const QUESTION_TYPES  = ["gap","ambiguity","missing-info"];

// ─── SEEDED PRNG ─────────────────────────────────────────────────────────────

function seededRand(seed) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
}

// ─── STATEMENT GENERATION ────────────────────────────────────────────────────

function generateStatements() {
  const stmts = [];
  let id = 1000;

  STUDENTS.forEach((student, si) => {
    const rand = seededRand(si * 137 + 42);
    const engagementLevel = rand();
    const isStruggling = engagementLevel < 0.25;
    const isExcellent  = engagementLevel > 0.75;

    WEEKS.forEach((week, wi) => {
      const weekRand  = seededRand(si * 31 + wi * 17 + 99);
      const skipsWeek = weekRand() < (isStruggling ? 0.35 : 0.08);
      if (skipsWeek) return;

      const base      = new Date(2025, 8, 1 + wi * 7);
      const submitHour = Math.floor(weekRand() * 18) + 6;
      const isLate     = weekRand() < (isStruggling ? 0.4 : 0.1);
      const lateHours  = isLate ? parseFloat((weekRand() * 36 + 1).toFixed(1)) : 0;
      const readMin    = Math.floor(weekRand() * 20 + (isExcellent ? 15 : 5));
      const focus      = CRITIQUE_FOCUS[wi % CRITIQUE_FOCUS.length];
      const module     = MODULES[wi];

      const ts = (offsetMin = 0) => {
        const d = new Date(base);
        d.setHours(submitHour, Math.floor(weekRand() * 60) + offsetMin);
        return d.toISOString();
      };

      // launched
      stmts.push({ id: `stmt-${id++}`, actor: student, verb: "launched", week, module, focus,
        object: `week${week}-article`, objectName: `Week ${week} Empirical Article`,
        result: { completion: false },
        extensions: { weekNumber: week, moduleTheme: module, articleDOI: `10.1037/edu000${week}`, readDurationMinutes: readMin },
        timestamp: ts(0) });

      // experienced
      stmts.push({ id: `stmt-${id++}`, actor: student, verb: "experienced", week, module, focus,
        object: `week${week}-article`, objectName: `Week ${week} Empirical Article`,
        result: { completion: true, duration: `PT${readMin}M` },
        extensions: { weekNumber: week, moduleTheme: module, readDurationMinutes: readMin },
        timestamp: ts(readMin) });

      // step 1
      const wc1 = Math.floor(weekRand() * 30 + (isExcellent ? 40 : 15));
      stmts.push({ id: `stmt-${id++}`, actor: student, verb: "attempted", week, module, focus,
        object: `week${week}-step1`, objectName: `Step 1: Identification — Week ${week}`,
        result: { completion: false },
        extensions: { weekNumber: week, critiqueFocus: focus },
        timestamp: ts(readMin + 2) });
      stmts.push({ id: `stmt-${id++}`, actor: student, verb: "answered", week, module, focus,
        object: `week${week}-step1`, objectName: `Step 1: Identification — Week ${week}`,
        result: { completion: true, duration: `PT${Math.floor(weekRand()*8+3)}M`, wordCount: wc1 },
        extensions: { weekNumber: week, critiqueFocus: focus, wordCount: wc1 },
        timestamp: ts(readMin + 10) });

      // step 2
      const wc2 = Math.floor(weekRand() * 50 + (isExcellent ? 60 : 30));
      stmts.push({ id: `stmt-${id++}`, actor: student, verb: "attempted", week, module, focus,
        object: `week${week}-step2`, objectName: `Step 2: Significance — Week ${week}`,
        result: { completion: false },
        extensions: { weekNumber: week, priorStepCompleted: true },
        timestamp: ts(readMin + 12) });
      stmts.push({ id: `stmt-${id++}`, actor: student, verb: "answered", week, module, focus,
        object: `week${week}-step2`, objectName: `Step 2: Significance — Week ${week}`,
        result: { completion: true, duration: `PT${Math.floor(weekRand()*10+5)}M`, wordCount: wc2 },
        extensions: { weekNumber: week, critiqueFocus: focus, wordCount: wc2 },
        timestamp: ts(readMin + 25) });

      // step 3
      const wc3   = Math.floor(weekRand() * 20 + (isExcellent ? 25 : 10));
      const qtype = QUESTION_TYPES[Math.floor(weekRand() * 3)];
      stmts.push({ id: `stmt-${id++}`, actor: student, verb: "attempted", week, module, focus,
        object: `week${week}-step3`, objectName: `Step 3: Critical Inquiry — Week ${week}`,
        result: { completion: false },
        extensions: { weekNumber: week, priorStepsCompleted: 2 },
        timestamp: ts(readMin + 27) });
      stmts.push({ id: `stmt-${id++}`, actor: student, verb: "answered", week, module, focus,
        object: `week${week}-step3`, objectName: `Step 3: Critical Inquiry — Week ${week}`,
        result: { completion: true, duration: `PT${Math.floor(weekRand()*6+3)}M`, wordCount: wc3 },
        extensions: { weekNumber: week, critiqueFocus: focus, wordCount: wc3, questionType: qtype },
        timestamp: ts(readMin + 35) });

      // completed
      const totalWC  = wc1 + wc2 + wc3;
      const totalDur = readMin + Math.floor(weekRand() * 20 + 35);
      stmts.push({ id: `stmt-${id++}`, actor: student, verb: "completed", week, module, focus,
        object: `week${week}-critique`, objectName: `Micro-Critique Week ${week}`,
        result: { completion: true, success: true, duration: `PT${totalDur}M` },
        extensions: { weekNumber: week, moduleTheme: module, totalWordCount: totalWC,
          submissionStatus: isLate ? "late" : "on-time", hoursAfterDeadline: lateHours, allStepsCompleted: true },
        timestamp: ts(readMin + 38) });

      // scored
      const scoreRaw = isExcellent
        ? Math.floor(weekRand() * 2 + 8)
        : isStruggling
        ? Math.floor(weekRand() * 3 + 5)
        : Math.floor(weekRand() * 3 + 6);
      stmts.push({ id: `stmt-${id++}`,
        actor: { id: "instructor01", name: "Dr. Rivera", email: "mrivera@university.edu" },
        verb: "scored", week, module, focus,
        object: `week${week}-critique`, objectName: `Micro-Critique Week ${week} — Score`,
        result: { score: { raw: scoreRaw, max: 10 }, success: scoreRaw >= 7 },
        extensions: { weekNumber: week, studentId: student.id, rubricDimension: "all", feedbackLength: Math.floor(weekRand() * 80 + 20) },
        studentId: student.id,
        timestamp: ts(readMin + 50) });
    });
  });

  return stmts;
}

export const ALL_STATEMENTS = generateStatements();

// ─── QUERY ENGINE ─────────────────────────────────────────────────────────────

export function queryStatements({ verb, week, studentId, limit = 50 }) {
  let results = [...ALL_STATEMENTS];
  if (verb      && verb      !== "all") results = results.filter(s => s.verb === verb);
  if (week      && week      !== "all") results = results.filter(s => s.week === Number(week));
  if (studentId && studentId !== "all") results = results.filter(s => s.actor.id === studentId || s.studentId === studentId);
  return results.slice(0, limit);
}

// ─── ANALYTICS ───────────────────────────────────────────────────────────────

export function getCohortStats() {
  const completions = ALL_STATEMENTS.filter(s => s.verb === "completed");
  const scores      = ALL_STATEMENTS.filter(s => s.verb === "scored");
  return WEEKS.map(w => {
    const wc      = completions.filter(s => s.week === w);
    const ws      = scores.filter(s => s.week === w);
    const avgScore = ws.length ? (ws.reduce((a, s) => a + s.result.score.raw, 0) / ws.length).toFixed(1) : 0;
    const lateCount = wc.filter(s => s.extensions.submissionStatus === "late").length;
    const totalWC   = wc.reduce((a, s) => a + (s.extensions.totalWordCount || 0), 0);
    const avgWC     = wc.length ? Math.round(totalWC / wc.length) : 0;
    return { week: `Wk ${w}`, completions: wc.length, avgScore: Number(avgScore), lateCount, avgWordCount: avgWC };
  });
}

export function getStudentProfile(studentId) {
  return WEEKS.map(w => {
    const completion = ALL_STATEMENTS.find(s => s.verb === "completed" && s.actor.id === studentId && s.week === w);
    const score      = ALL_STATEMENTS.find(s => s.verb === "scored"    && s.studentId  === studentId && s.week === w);
    const read       = ALL_STATEMENTS.find(s => s.verb === "experienced" && s.actor.id === studentId && s.week === w);
    return {
      week:      `Wk ${w}`,
      completed: !!completion,
      late:      completion?.extensions?.submissionStatus === "late",
      score:     score?.result?.score?.raw ?? null,
      wordCount: completion?.extensions?.totalWordCount ?? null,
      readMin:   read?.extensions?.readDurationMinutes ?? null,
    };
  });
}
