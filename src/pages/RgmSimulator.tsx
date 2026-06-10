import { useMemo, useState, type CSSProperties } from "react";
import {
  crestlineScenario,
  type DecisionOption,
  type ScenarioStep,
} from "../data/crestlineScenario";

type AnswerMap = Partial<Record<string, DecisionOption>>;

function getMaturityRating(scorePercent: number) {
  if (scorePercent >= 90) return "Executive-ready";
  if (scorePercent >= 80) return "VP-ready";
  if (scorePercent >= 65) return "Director";
  if (scorePercent >= 50) return "Manager";
  return "Analyst";
}

function getScoreMessage(score: number) {
  if (score === 100) return "Best answer";
  if (score >= 70) return "Solid partial answer";
  if (score >= 50) return "Incomplete answer";
  return "High-risk answer";
}

function getAnsweredOptions(steps: ScenarioStep[], answers: AnswerMap) {
  return steps
    .map((step) => answers[step.id])
    .filter((option): option is DecisionOption => Boolean(option));
}

export default function RgmSimulator() {
  const scenario = crestlineScenario;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentStep = scenario.steps[currentStepIndex];
  const selectedOption = answers[currentStep.id];
  const answeredOptions = getAnsweredOptions(scenario.steps, answers);
  const totalPossibleScore = scenario.steps.length * 100;
  const totalScore = answeredOptions.reduce((sum, option) => sum + option.score, 0);
  const scorePercent = Math.round((totalScore / totalPossibleScore) * 100);
  const maturityRating = getMaturityRating(scorePercent);

  const resultDetails = useMemo(() => {
    const missedSteps = scenario.steps.filter((step) => {
      const answer = answers[step.id];
      return answer && answer.score < 80;
    });
    const bestAnswerCount = scenario.steps.filter(
      (step) => answers[step.id]?.id === step.bestAnswerId,
    ).length;

    return {
      bestAnswerCount,
      missedSteps,
      strongestStep:
        scenario.steps.find((step) => answers[step.id]?.score === 100)?.title ??
        "No best-answer decisions yet",
    };
  }, [answers, scenario.steps]);

  function handleAnswer(option: DecisionOption) {
    if (selectedOption) return;
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentStep.id]: option,
    }));
  }

  function handleContinue() {
    if (!selectedOption) return;

    if (currentStepIndex === scenario.steps.length - 1) {
      setIsFinished(true);
      return;
    }

    setCurrentStepIndex((stepIndex) => stepIndex + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleRestart() {
    setAnswers({});
    setCurrentStepIndex(0);
    setIsFinished(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (isFinished) {
    return (
      <main style={styles.page}>
        <section style={styles.container}>
          <div style={styles.kicker}>RGM Scenario Simulator</div>
          <h1 style={styles.heading}>Final Results</h1>
          <p style={styles.lede}>
            You completed the Crestline Snacks scenario with a score of{" "}
            <strong>{scorePercent}%</strong>.
          </p>

          <div style={styles.cardGrid}>
            <div style={styles.card}>
              <span style={styles.cardLabel}>Total score</span>
              <strong style={styles.score}>{totalScore}</strong>
              <span style={styles.muted}>out of {totalPossibleScore} points</span>
            </div>
            <div style={styles.card}>
              <span style={styles.cardLabel}>Best answers</span>
              <strong style={styles.score}>{resultDetails.bestAnswerCount}/5</strong>
              <span style={styles.muted}>decision quality</span>
            </div>
            <div style={styles.card}>
              <span style={styles.cardLabel}>Maturity rating</span>
              <strong style={styles.score}>{maturityRating}</strong>
              <span style={styles.muted}>based on basic score bands</span>
            </div>
          </div>

          <div style={styles.scoreBarTrack} aria-label={`Score ${scorePercent}%`}>
            <div style={{ ...styles.scoreBarFill, width: `${scorePercent}%` }} />
          </div>

          <section style={styles.card}>
            <h2 style={styles.sectionTitle}>Readout</h2>
            <p style={styles.bodyCopy}>
              Strongest area: <strong>{resultDetails.strongestStep}</strong>
            </p>
            <p style={styles.bodyCopy}>
              Development focus:{" "}
              <strong>
                {resultDetails.missedSteps.length > 0
                  ? resultDetails.missedSteps.map((step) => step.title).join(", ")
                  : "No major gaps in this run"}
              </strong>
            </p>
          </section>

          <section style={styles.card}>
            <h2 style={styles.sectionTitle}>Decision Review</h2>
            <div style={styles.reviewList}>
              {scenario.steps.map((step) => {
                const answer = answers[step.id];
                return (
                  <div key={step.id} style={styles.reviewItem}>
                    <div>
                      <strong>{step.title}</strong>
                      <p style={styles.reviewText}>
                        {answer?.id}. {answer?.text}
                      </p>
                    </div>
                    <span style={styles.pill}>{answer?.score ?? 0}/100</span>
                  </div>
                );
              })}
            </div>
          </section>

          <button type="button" style={styles.primaryButton} onClick={handleRestart}>
            Replay scenario
          </button>
        </section>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <div style={styles.kicker}>RGM Scenario Simulator</div>
        <h1 style={styles.heading}>{scenario.title}</h1>
        <p style={styles.lede}>{scenario.company}</p>

        <div style={styles.cardGrid}>
          <section style={styles.card}>
            <h2 style={styles.sectionTitle}>Business Context</h2>
            <p style={styles.bodyCopy}>
              Crestline needs to defend profit while making sharper choices across price,
              pack, trade, channel, and assortment.
            </p>
          </section>

          <section style={styles.card}>
            <h2 style={styles.sectionTitle}>Key Metrics</h2>
            <ul style={styles.metricList}>
              {scenario.metrics.map((metric) => (
                <li key={metric}>{metric}</li>
              ))}
            </ul>
          </section>
        </div>

        <section style={styles.decisionPanel}>
          <div style={styles.stepMeta}>
            Step {currentStepIndex + 1} of {scenario.steps.length} · {currentStep.title}
          </div>
          <h2 style={styles.question}>{currentStep.question}</h2>

          <div style={styles.options}>
            {currentStep.options.map((option) => {
              const isSelected = selectedOption?.id === option.id;
              const showBestAnswer = selectedOption && option.id === currentStep.bestAnswerId;

              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={Boolean(selectedOption)}
                  onClick={() => handleAnswer(option)}
                  style={{
                    ...styles.optionButton,
                    ...(isSelected ? styles.selectedOption : {}),
                    ...(showBestAnswer ? styles.bestOption : {}),
                  }}
                >
                  <span style={styles.optionId}>{option.id}</span>
                  <span>{option.text}</span>
                </button>
              );
            })}
          </div>
        </section>

        {selectedOption ? (
          <section style={styles.feedbackPanel}>
            <div style={styles.feedbackHeader}>
              <strong>{getScoreMessage(selectedOption.score)}</strong>
              <span style={styles.pill}>{selectedOption.score}/100</span>
            </div>
            <p style={styles.bodyCopy}>{selectedOption.feedback}</p>
            <p style={styles.bodyCopy}>
              <strong>Teaching point:</strong> {currentStep.teachingPoint}
            </p>
            <button type="button" style={styles.primaryButton} onClick={handleContinue}>
              {currentStepIndex === scenario.steps.length - 1
                ? "View final results"
                : "Continue"}
            </button>
          </section>
        ) : (
          <p style={styles.helperText}>Choose one answer to see immediate feedback.</p>
        )}

        <footer style={styles.footerScore}>
          Current score: <strong>{totalScore}</strong> / {totalPossibleScore}
        </footer>
      </section>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    color: "#172033",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    padding: "40px 20px",
  },
  container: {
    maxWidth: 1040,
    margin: "0 auto",
  },
  kicker: {
    color: "#42526e",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  heading: {
    margin: "10px 0 12px",
    fontSize: "clamp(32px, 5vw, 52px)",
    lineHeight: 1.05,
  },
  lede: {
    maxWidth: 840,
    color: "#42526e",
    fontSize: 18,
    lineHeight: 1.6,
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 16,
    marginTop: 24,
  },
  card: {
    background: "#ffffff",
    border: "1px solid #dfe4ea",
    borderRadius: 16,
    boxShadow: "0 10px 24px rgba(23, 32, 51, 0.06)",
    padding: 22,
  },
  cardLabel: {
    color: "#5d6b82",
    display: "block",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  score: {
    display: "block",
    fontSize: 34,
    marginTop: 8,
  },
  muted: {
    color: "#6b778c",
    display: "block",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    margin: "0 0 12px",
  },
  bodyCopy: {
    color: "#42526e",
    lineHeight: 1.6,
    margin: "8px 0",
  },
  metricList: {
    color: "#42526e",
    display: "grid",
    gap: 8,
    margin: 0,
    paddingLeft: 18,
  },
  decisionPanel: {
    background: "#ffffff",
    border: "1px solid #ccd6e0",
    borderRadius: 20,
    boxShadow: "0 18px 40px rgba(23, 32, 51, 0.08)",
    marginTop: 24,
    padding: 28,
  },
  stepMeta: {
    color: "#516173",
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 10,
  },
  question: {
    fontSize: 26,
    lineHeight: 1.25,
    margin: "0 0 22px",
  },
  options: {
    display: "grid",
    gap: 12,
  },
  optionButton: {
    alignItems: "flex-start",
    background: "#f9fafb",
    border: "1px solid #dfe4ea",
    borderRadius: 14,
    color: "#172033",
    cursor: "pointer",
    display: "flex",
    font: "inherit",
    gap: 14,
    padding: 16,
    textAlign: "left",
  },
  selectedOption: {
    borderColor: "#315efb",
    boxShadow: "0 0 0 3px rgba(49, 94, 251, 0.14)",
  },
  bestOption: {
    background: "#effbf3",
    borderColor: "#2f9e44",
  },
  optionId: {
    alignItems: "center",
    background: "#172033",
    borderRadius: "50%",
    color: "#ffffff",
    display: "inline-flex",
    flex: "0 0 30px",
    fontWeight: 800,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  feedbackPanel: {
    background: "#ffffff",
    border: "1px solid #b7d2ff",
    borderRadius: 16,
    marginTop: 18,
    padding: 22,
  },
  feedbackHeader: {
    alignItems: "center",
    display: "flex",
    gap: 12,
    justifyContent: "space-between",
  },
  pill: {
    background: "#e8efff",
    borderRadius: 999,
    color: "#174ea6",
    display: "inline-block",
    fontSize: 13,
    fontWeight: 800,
    padding: "6px 10px",
    whiteSpace: "nowrap",
  },
  primaryButton: {
    background: "#172033",
    border: 0,
    borderRadius: 12,
    color: "#ffffff",
    cursor: "pointer",
    font: "inherit",
    fontWeight: 800,
    marginTop: 14,
    padding: "12px 18px",
  },
  helperText: {
    color: "#516173",
    marginTop: 16,
  },
  footerScore: {
    color: "#516173",
    marginTop: 18,
  },
  scoreBarTrack: {
    background: "#dfe4ea",
    borderRadius: 999,
    height: 12,
    margin: "24px 0",
    overflow: "hidden",
  },
  scoreBarFill: {
    background: "#315efb",
    height: "100%",
  },
  reviewList: {
    display: "grid",
    gap: 12,
  },
  reviewItem: {
    alignItems: "flex-start",
    borderBottom: "1px solid #edf0f3",
    display: "flex",
    gap: 16,
    justifyContent: "space-between",
    paddingBottom: 12,
  },
  reviewText: {
    color: "#42526e",
    lineHeight: 1.5,
    margin: "6px 0 0",
  },
};
