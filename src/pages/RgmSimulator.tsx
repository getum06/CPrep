import { useState, type CSSProperties } from "react";
import {
  crestlineScenario,
  type DecisionOption,
  type ScenarioStep,
  type StakeholderReaction,
} from "../data/crestlineScenario";

type AnswerMap = Partial<Record<string, DecisionOption>>;

const DIFFICULTY_COLORS: Record<string, string> = {
  Manager: "#1d4ed8",
  Director: "#7c3aed",
  VP: "#c2410c",
  Executive: "#991b1b",
};

function getMaturityRating(pct: number) {
  if (pct >= 90) return "Executive-ready";
  if (pct >= 80) return "VP-ready";
  if (pct >= 65) return "Director";
  if (pct >= 50) return "Manager";
  return "Analyst";
}

function getScoreLabel(score: number) {
  if (score === 100) return "Best answer";
  if (score >= 70) return "Solid answer";
  if (score >= 50) return "Incomplete answer";
  return "High-risk answer";
}

function getScoreLabelColor(score: number) {
  if (score === 100) return "#166534";
  if (score >= 70) return "#1d4ed8";
  if (score >= 50) return "#92400e";
  return "#991b1b";
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function DifficultyBadge({ level }: { level: ScenarioStep["difficulty"] }) {
  return (
    <span
      style={{
        ...styles.difficultyBadge,
        background: DIFFICULTY_COLORS[level] + "18",
        color: DIFFICULTY_COLORS[level],
        borderColor: DIFFICULTY_COLORS[level] + "40",
      }}
    >
      {level}
    </span>
  );
}

function StepContext({ step }: { step: ScenarioStep }) {
  return (
    <div style={styles.contextBlock}>
      <div style={styles.contextGrid}>
        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Situation</h2>
          <p style={styles.bodyCopy}>{step.context}</p>
          <div style={styles.tensionBox}>
            <span style={styles.tensionLabel}>Executive tension</span>
            <p style={{ ...styles.bodyCopy, margin: 0 }}>{step.tension}</p>
          </div>
        </section>
        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Key Metrics</h2>
          <ul style={styles.metricList}>
            {step.keyMetrics.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function FeedbackPanel({
  step,
  selected,
  onContinue,
  isLast,
}: {
  step: ScenarioStep;
  selected: DecisionOption;
  onContinue: () => void;
  isLast: boolean;
}) {
  const isBest = selected.id === step.bestAnswerId;

  return (
    <section style={styles.feedbackPanel}>
      {/* Score header */}
      <div style={styles.feedbackHeader}>
        <strong
          style={{
            color: getScoreLabelColor(selected.score),
            fontSize: 18,
          }}
        >
          {getScoreLabel(selected.score)}
        </strong>
        <span
          style={{
            ...styles.pill,
            background: isBest ? "#dcfce7" : "#fef3c7",
            color: isBest ? "#166534" : "#92400e",
          }}
        >
          {selected.score}/100
        </span>
      </div>

      <p style={styles.bodyCopy}>{selected.feedback}</p>

      {/* Wrong answer breakdown */}
      {!isBest && (
        <div style={styles.wrongAnswerBox}>
          <div style={styles.wrongRow}>
            <span style={styles.wrongLabel}>Why it seems right</span>
            <p style={{ ...styles.bodyCopy, margin: 0 }}>{selected.whyTempting}</p>
          </div>
          <div style={styles.wrongRow}>
            <span style={{ ...styles.wrongLabel, color: "#991b1b" }}>Why it fails</span>
            <p style={{ ...styles.bodyCopy, margin: 0 }}>{selected.whyItFails}</p>
          </div>
        </div>
      )}

      {/* RGM response */}
      <div style={styles.rgmResponseBox}>
        <span style={styles.rgmResponseLabel}>
          {isBest ? "Strong RGM talk track" : "What to say instead"}
        </span>
        <p style={{ ...styles.bodyCopy, margin: 0, fontStyle: "italic" }}>
          {selected.strongRGMResponse}
        </p>
      </div>

      {/* Teaching point */}
      <p style={styles.teachingPoint}>
        <strong>Teaching point: </strong>
        {step.teachingPoint}
      </p>

      <button type="button" style={styles.primaryButton} onClick={onContinue}>
        {isLast ? "View final results" : "Continue →"}
      </button>
    </section>
  );
}

function StakeholderCard({ reaction }: { reaction: StakeholderReaction }) {
  const roleColors: Record<string, string> = {
    "Sales VP": "#166534",
    "Finance Director": "#1d4ed8",
    "Marketing VP": "#7c3aed",
    "Retailer Buyer": "#c2410c",
  };
  const color = roleColors[reaction.role] ?? "#172033";

  return (
    <div style={styles.stakeholderCard}>
      <span style={{ ...styles.stakeholderRole, color }}>{reaction.role}</span>
      <p style={styles.stakeholderConcern}>
        <em>"{reaction.concern}"</em>
      </p>
      <div style={styles.stakeholderResponse}>
        <span style={styles.stakeholderResponseLabel}>Strong response</span>
        <p style={{ ...styles.bodyCopy, margin: 0 }}>{reaction.response}</p>
      </div>
    </div>
  );
}

function StakeholderSection({ step }: { step: ScenarioStep }) {
  return (
    <section style={styles.stakeholderSection}>
      <h3 style={styles.sectionTitle}>Stakeholder Pushback</h3>
      <p style={{ ...styles.bodyCopy, marginBottom: 14 }}>
        These are the cross-functional tensions you would face in this decision. Know how to respond
        to each one.
      </p>
      <div style={styles.stakeholderGrid}>
        {step.stakeholderPushback.map((r) => (
          <StakeholderCard key={r.role} reaction={r} />
        ))}
      </div>
    </section>
  );
}

function ExecutiveLens({ text }: { text: string }) {
  return (
    <section style={styles.executiveLensPanel}>
      <span style={styles.executiveLensLabel}>Executive Lens — How to frame this to a CFO or President</span>
      <p style={{ ...styles.bodyCopy, margin: "10px 0 0", color: "#1e293b" }}>{text}</p>
    </section>
  );
}

// ─── Final Results ────────────────────────────────────────────────────────────

function FinalResults({
  answers,
  onRestart,
}: {
  answers: AnswerMap;
  onRestart: () => void;
}) {
  const scenario = crestlineScenario;
  const totalPossible = scenario.steps.length * 100;
  const totalScore = scenario.steps.reduce(
    (sum, step) => sum + (answers[step.id]?.score ?? 0),
    0,
  );
  const pct = Math.round((totalScore / totalPossible) * 100);
  const maturity = getMaturityRating(pct);

  const gotRight = scenario.steps.filter((s) => (answers[s.id]?.score ?? 0) === 100);
  const missed = scenario.steps.filter((s) => (answers[s.id]?.score ?? 0) < 80);

  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <div style={styles.kicker}>RGM Scenario Simulator — Final Debrief</div>
        <h1 style={styles.heading}>Crestline Snacks: Results</h1>

        {/* Score cards */}
        <div style={styles.cardGrid}>
          <div style={styles.card}>
            <span style={styles.cardLabel}>Total score</span>
            <strong style={styles.scoreNum}>{totalScore}</strong>
            <span style={styles.muted}>out of {totalPossible} points</span>
          </div>
          <div style={styles.card}>
            <span style={styles.cardLabel}>Best answers</span>
            <strong style={styles.scoreNum}>{gotRight.length}/5</strong>
            <span style={styles.muted}>decisions at full quality</span>
          </div>
          <div style={styles.card}>
            <span style={styles.cardLabel}>Maturity rating</span>
            <strong style={styles.scoreNum}>{maturity}</strong>
            <span style={styles.muted}>based on decision quality</span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={styles.scoreBarTrack} aria-label={`Score ${pct}%`}>
          <div style={{ ...styles.scoreBarFill, width: `${pct}%` }} />
        </div>

        {/* What you got right */}
        {gotRight.length > 0 && (
          <section style={{ ...styles.card, marginTop: 16 }}>
            <h2 style={styles.sectionTitle}>What You Got Right</h2>
            {gotRight.map((step) => (
              <div key={step.id} style={styles.debriefItem}>
                <div style={styles.debriefCheck}>✓</div>
                <div>
                  <strong>{step.title}</strong>
                  <p style={styles.bodyCopy}>{answers[step.id]?.text}</p>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* What you missed */}
        {missed.length > 0 && (
          <section style={{ ...styles.card, marginTop: 16 }}>
            <h2 style={styles.sectionTitle}>What You Missed</h2>
            {missed.map((step) => {
              const chosen = answers[step.id];
              const best = step.options.find((o) => o.id === step.bestAnswerId);
              return (
                <div key={step.id} style={styles.debriefItem}>
                  <div style={{ ...styles.debriefCheck, background: "#fee2e2", color: "#991b1b" }}>
                    ✗
                  </div>
                  <div>
                    <strong>{step.title}</strong>
                    <p style={styles.bodyCopy}>
                      You chose: {chosen?.id}. {chosen?.text}
                    </p>
                    <p style={{ ...styles.bodyCopy, color: "#166534" }}>
                      Strongest answer: {best?.text}
                    </p>
                    <p style={styles.bodyCopy}>{step.teachingPoint}</p>
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {/* Executive talk track */}
        <section style={{ ...styles.card, marginTop: 16 }}>
          <h2 style={styles.sectionTitle}>Executive Talk Track</h2>
          <p style={styles.bodyCopy}>
            Here is how a strong RGM leader would summarize this case to a CFO or President:
          </p>
          <blockquote style={styles.talkTrack}>
            {scenario.finalDebrief.executiveTalkTrack}
          </blockquote>
        </section>

        {/* Practice areas */}
        <section style={{ ...styles.card, marginTop: 16 }}>
          <h2 style={styles.sectionTitle}>Suggested Areas to Practice Next</h2>
          <div style={styles.practiceGrid}>
            {scenario.finalDebrief.practiceAreas.map((pa) => (
              <div key={pa.area} style={styles.practiceCard}>
                <strong style={styles.practiceArea}>{pa.area}</strong>
                <p style={{ ...styles.bodyCopy, margin: "6px 0 0" }}>{pa.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Decision review */}
        <section style={{ ...styles.card, marginTop: 16 }}>
          <h2 style={styles.sectionTitle}>Decision Review</h2>
          <div style={styles.reviewList}>
            {scenario.steps.map((step) => {
              const ans = answers[step.id];
              const isBest = ans?.id === step.bestAnswerId;
              return (
                <div key={step.id} style={styles.reviewItem}>
                  <div style={{ flex: 1 }}>
                    <strong>{step.title}</strong>
                    <DifficultyBadge level={step.difficulty} />
                    <p style={styles.reviewText}>
                      {ans?.id}. {ans?.text}
                    </p>
                  </div>
                  <span
                    style={{
                      ...styles.pill,
                      background: isBest ? "#dcfce7" : "#fef9c3",
                      color: isBest ? "#166534" : "#92400e",
                    }}
                  >
                    {ans?.score ?? 0}/100
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <button type="button" style={styles.primaryButton} onClick={onRestart}>
          Replay scenario
        </button>
      </section>
    </main>
  );
}

// ─── Main simulator ───────────────────────────────────────────────────────────

export default function RgmSimulator() {
  const scenario = crestlineScenario;
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [finished, setFinished] = useState(false);

  const step = scenario.steps[stepIndex];
  const selected = answers[step.id];
  const totalPossible = scenario.steps.length * 100;
  const totalScore = scenario.steps.reduce(
    (sum, s) => sum + (answers[s.id]?.score ?? 0),
    0,
  );

  function handleAnswer(option: DecisionOption) {
    if (selected) return;
    setAnswers((prev) => ({ ...prev, [step.id]: option }));
    setTimeout(() => window.scrollTo({ top: 600, behavior: "smooth" }), 50);
  }

  function handleContinue() {
    if (!selected) return;
    if (stepIndex === scenario.steps.length - 1) {
      setFinished(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setStepIndex((i) => i + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleRestart() {
    setAnswers({});
    setStepIndex(0);
    setFinished(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (finished) {
    return <FinalResults answers={answers} onRestart={handleRestart} />;
  }

  return (
    <main style={styles.page}>
      <section style={styles.container}>
        {/* Header */}
        <div style={styles.kicker}>RGM Scenario Simulator</div>
        <h1 style={styles.heading}>{scenario.title}</h1>
        <p style={styles.lede}>{scenario.company}</p>

        {/* Scenario-level metrics */}
        <section style={{ ...styles.card, marginTop: 18 }}>
          <h2 style={styles.sectionTitle}>Scenario Metrics</h2>
          <ul style={styles.metricListInline}>
            {scenario.metrics.map((m) => (
              <li key={m} style={styles.metricChip}>
                {m}
              </li>
            ))}
          </ul>
        </section>

        {/* Step context */}
        <StepContext step={step} />

        {/* Decision panel */}
        <section style={styles.decisionPanel}>
          <div style={styles.stepMeta}>
            Step {stepIndex + 1} of {scenario.steps.length} &nbsp;·&nbsp; {step.title}
            &nbsp;&nbsp;
            <DifficultyBadge level={step.difficulty} />
          </div>
          <h2 style={styles.question}>{step.question}</h2>

          <div style={styles.options}>
            {step.options.map((option) => {
              const isSelected = selected?.id === option.id;
              const showBest = selected && option.id === step.bestAnswerId;
              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={Boolean(selected)}
                  onClick={() => handleAnswer(option)}
                  style={{
                    ...styles.optionButton,
                    ...(isSelected ? styles.selectedOption : {}),
                    ...(showBest ? styles.bestOption : {}),
                  }}
                >
                  <span style={styles.optionId}>{option.id}</span>
                  <span>{option.text}</span>
                </button>
              );
            })}
          </div>

          {!selected && (
            <p style={styles.helperText}>Select one answer to see immediate feedback.</p>
          )}
        </section>

        {/* Post-answer sections */}
        {selected && (
          <>
            <FeedbackPanel
              step={step}
              selected={selected}
              onContinue={handleContinue}
              isLast={stepIndex === scenario.steps.length - 1}
            />
            <StakeholderSection step={step} />
            <ExecutiveLens text={step.executiveLens} />
          </>
        )}

        {/* Running score */}
        <footer style={styles.footerScore}>
          Running score: <strong>{totalScore}</strong> / {totalPossible}
        </footer>
      </section>
    </main>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f1f5f9",
    color: "#172033",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    padding: "40px 20px 80px",
  },
  container: {
    maxWidth: 1060,
    margin: "0 auto",
  },
  kicker: {
    color: "#475569",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  heading: {
    margin: "10px 0 12px",
    fontSize: "clamp(26px, 4vw, 44px)",
    lineHeight: 1.1,
  },
  lede: {
    maxWidth: 860,
    color: "#475569",
    fontSize: 17,
    lineHeight: 1.65,
    margin: 0,
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    boxShadow: "0 4px 16px rgba(15, 23, 42, 0.06)",
    padding: 22,
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 14,
    marginTop: 20,
  },
  cardLabel: {
    color: "#64748b",
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
  },
  scoreNum: {
    display: "block",
    fontSize: 32,
    marginTop: 6,
  },
  muted: {
    color: "#94a3b8",
    display: "block",
    fontSize: 13,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    margin: "0 0 12px",
  },
  bodyCopy: {
    color: "#475569",
    lineHeight: 1.65,
    margin: "8px 0",
    fontSize: 15,
  },
  metricList: {
    color: "#475569",
    display: "grid",
    gap: 8,
    fontSize: 14,
    margin: 0,
    paddingLeft: 18,
    lineHeight: 1.5,
  },
  metricListInline: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 8,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  metricChip: {
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    borderRadius: 999,
    color: "#334155",
    fontSize: 13,
    fontWeight: 500,
    padding: "4px 12px",
  },
  contextBlock: {
    marginTop: 20,
  },
  contextGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 14,
  },
  tensionBox: {
    background: "#fff7ed",
    border: "1px solid #fed7aa",
    borderRadius: 10,
    marginTop: 14,
    padding: 14,
  },
  tensionLabel: {
    color: "#c2410c",
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.06em",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  decisionPanel: {
    background: "#ffffff",
    border: "1px solid #cbd5e1",
    borderRadius: 20,
    boxShadow: "0 12px 36px rgba(15, 23, 42, 0.08)",
    marginTop: 20,
    padding: 28,
  },
  stepMeta: {
    alignItems: "center",
    color: "#64748b",
    display: "flex",
    flexWrap: "wrap" as const,
    fontSize: 13,
    fontWeight: 700,
    gap: 8,
    marginBottom: 12,
  },
  question: {
    fontSize: 22,
    lineHeight: 1.3,
    margin: "0 0 20px",
  },
  options: {
    display: "grid",
    gap: 10,
  },
  optionButton: {
    alignItems: "flex-start",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    color: "#172033",
    cursor: "pointer",
    display: "flex",
    font: "inherit",
    fontSize: 15,
    gap: 14,
    padding: "14px 16px",
    textAlign: "left",
    transition: "border-color 0.15s",
  },
  selectedOption: {
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 3px rgba(59,130,246,0.15)",
  },
  bestOption: {
    background: "#f0fdf4",
    borderColor: "#22c55e",
  },
  optionId: {
    alignItems: "center",
    background: "#172033",
    borderRadius: "50%",
    color: "#ffffff",
    display: "inline-flex",
    flex: "0 0 28px",
    fontSize: 13,
    fontWeight: 800,
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  helperText: {
    color: "#94a3b8",
    fontSize: 14,
    marginTop: 14,
  },
  feedbackPanel: {
    background: "#ffffff",
    border: "1px solid #bfdbfe",
    borderRadius: 16,
    marginTop: 16,
    padding: 24,
  },
  feedbackHeader: {
    alignItems: "center",
    display: "flex",
    gap: 12,
    justifyContent: "space-between",
    marginBottom: 6,
  },
  pill: {
    borderRadius: 999,
    display: "inline-block",
    fontSize: 13,
    fontWeight: 800,
    padding: "5px 10px",
    whiteSpace: "nowrap",
  },
  wrongAnswerBox: {
    background: "#fff8f1",
    border: "1px solid #fde8d8",
    borderRadius: 12,
    display: "grid",
    gap: 14,
    marginTop: 14,
    padding: 16,
  },
  wrongRow: {
    display: "grid",
    gap: 4,
  },
  wrongLabel: {
    color: "#92400e",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  rgmResponseBox: {
    background: "#f0f9ff",
    border: "1px solid #bae6fd",
    borderRadius: 12,
    marginTop: 14,
    padding: 16,
  },
  rgmResponseLabel: {
    color: "#0369a1",
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.06em",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  teachingPoint: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    color: "#334155",
    fontSize: 14,
    lineHeight: 1.6,
    marginTop: 14,
    padding: 14,
  },
  primaryButton: {
    background: "#172033",
    border: 0,
    borderRadius: 12,
    color: "#ffffff",
    cursor: "pointer",
    font: "inherit",
    fontSize: 15,
    fontWeight: 700,
    marginTop: 16,
    padding: "12px 20px",
  },
  stakeholderSection: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    marginTop: 16,
    padding: 24,
  },
  stakeholderGrid: {
    display: "grid",
    gap: 14,
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  },
  stakeholderCard: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 16,
  },
  stakeholderRole: {
    display: "block",
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: "0.04em",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  stakeholderConcern: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 1.6,
    margin: "0 0 10px",
  },
  stakeholderResponse: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    padding: 12,
  },
  stakeholderResponseLabel: {
    color: "#64748b",
    display: "block",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.07em",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  executiveLensPanel: {
    background: "#0f172a",
    border: "1px solid #1e3a5f",
    borderRadius: 16,
    marginTop: 16,
    padding: 24,
  },
  executiveLensLabel: {
    color: "#93c5fd",
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
  },
  footerScore: {
    color: "#94a3b8",
    fontSize: 14,
    marginTop: 20,
    textAlign: "right" as const,
  },
  difficultyBadge: {
    border: "1px solid",
    borderRadius: 999,
    display: "inline-block",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.06em",
    padding: "3px 9px",
    textTransform: "uppercase",
  },
  scoreBarTrack: {
    background: "#e2e8f0",
    borderRadius: 999,
    height: 10,
    margin: "18px 0",
    overflow: "hidden",
  },
  scoreBarFill: {
    background: "#3b82f6",
    height: "100%",
    transition: "width 0.6s ease",
  },
  debriefItem: {
    alignItems: "flex-start",
    borderBottom: "1px solid #f1f5f9",
    display: "flex",
    gap: 14,
    paddingBottom: 14,
    marginBottom: 14,
  },
  debriefCheck: {
    alignItems: "center",
    background: "#dcfce7",
    borderRadius: "50%",
    color: "#166534",
    display: "inline-flex",
    flex: "0 0 28px",
    fontWeight: 800,
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  talkTrack: {
    background: "#f8fafc",
    borderLeft: "4px solid #3b82f6",
    borderRadius: "0 10px 10px 0",
    color: "#1e293b",
    fontStyle: "italic",
    lineHeight: 1.75,
    margin: "12px 0 0",
    padding: "14px 18px",
  },
  practiceGrid: {
    display: "grid",
    gap: 12,
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    marginTop: 10,
  },
  practiceCard: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    padding: 14,
  },
  practiceArea: {
    color: "#1d4ed8",
    display: "block",
    fontSize: 14,
    marginBottom: 4,
  },
  reviewList: {
    display: "grid",
    gap: 12,
  },
  reviewItem: {
    alignItems: "flex-start",
    borderBottom: "1px solid #f1f5f9",
    display: "flex",
    gap: 14,
    justifyContent: "space-between",
    paddingBottom: 12,
  },
  reviewText: {
    color: "#64748b",
    fontSize: 14,
    lineHeight: 1.5,
    margin: "4px 0 0",
  },
};
