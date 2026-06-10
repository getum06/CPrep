# RGM Scenario Simulator Build Instructions

## Goal
Build an interactive RGM / Commercial Excellence training simulator for CPG executive skill-building.

The app should help the user practice strategic RGM judgment through realistic CPG scenarios, stakeholder pushback, scoring, and executive-level coaching.

## User Context
The user has strong consulting and transformation experience in:
- Pricing
- Promotions
- TPM/TPO
- Analytics
- Commercial Excellence
- Executive stakeholder management

The development goal is to build deeper CPG-native judgment for industry roles and executive conversations.

The simulator should not feel like a basic quiz. It should feel like an executive decision simulator.

---

# Phase 1: Foundation

## Build
Create the basic simulator structure.

Required:
- TypeScript types
- Scenario data model
- Crestline Snacks scenario data
- Simulator page/route
- Ability to render Step 1 with decision options

## Scenario
Use this initial scenario:

Title:
Crestline Snacks: Defending Growth in a Bifurcating Tortilla Chip Category

Company:
Crestline Snacks is a $180M tortilla chip brand with strong regional equity but under pressure from private label, premium entrants, retailer margin demands, and inflation-fatigued consumers.

Metrics:
- Net revenue: $180M
- Gross margin: 31%
- Category growth: 2%
- Premium tortilla segment growth: 14%
- Value/private label growth: 11%
- Core Crestline volume: -4%
- Trade rate: 23%
- Promo ROI: mixed, with 38% of events margin-negative
- Top 20 SKUs drive 82% of profit
- Tail SKUs create complexity and weak velocity
- Largest grocery customer is resisting list price increases

Step 1:
Question:
Who should initiate the RGM intervention and what should the first executive conversation focus on?

Options:
A. Sales should lead because retailer negotiations are the immediate issue.
B. Finance should lead because the P&L is under pressure.
C. RGM should lead the diagnostic, align Sales/Finance/Marketing, and frame the issue as a cross-functional margin and growth challenge.
D. Marketing should lead because brand equity is the long-term concern.

Best answer:
C

Teaching point:
RGM owns the diagnostic and cross-functional alignment, but executives need a concise P&L bridge and strategic narrative.

---

# Phase 2: Scenario Engine

Add full multi-step scenario flow.

The user should be able to:
- Move through all 5 decision points
- Select one answer per step
- See feedback after each decision
- Continue to the next decision
- Replay the scenario

Steps to include:

Step 2:
Question:
The category is bifurcating into value and premium. What is the best PPA move?

Best answer:
Launch a premium architecture first, then selectively address value gaps through entry packs.

Step 3:
Question:
A major retailer wants margin support and threatens to reduce shelf space. What channel strategy is strongest?

Best answer:
Offer an exclusive channel-specific format with clear price-pack differentiation.

Step 4:
Question:
The bottom 40 SKUs represent only 8% of profit but are important to some regional retailers. What is the best assortment move?

Best answer:
Rationalize the tail selectively, protect regionally strategic items, and reinvest support behind high-velocity core SKUs.

Step 5:
Question:
How should this be presented to the executive team?

Best answer:
As a full P&L bridge showing price, mix, trade, volume, and COGS impacts.

---

# Phase 3: Scoring

Add scoring across five dimensions:
- Financial Impact: 30%
- Strategic Logic: 25%
- Consumer Impact: 15%
- Retailer Impact: 15%
- Organizational Alignment: 15%

Show:
- Score per decision
- Cumulative score
- Strengths
- Gaps
- Final maturity rating

Maturity levels:
- Analyst
- Manager
- Director
- VP-ready
- Executive-ready

---

# Phase 4: Stakeholder Debate

After each major decision, show stakeholder pushback from:
- Sales VP
- Marketing VP
- Finance Director
- Category Management Lead
- Retailer Buyer
- CFO / President for final step

Each stakeholder should include:
- Concern
- Objection
- Strong response the user should give

---

# Phase 5: Executive Coaching

After each decision, show four levels of communication:

## Analyst Lens
Data and facts.

## Manager Lens
Diagnosis and decision quality.

## Director Lens
Recommendation, tradeoffs, and cross-functional alignment.

## Executive Lens
Enterprise value, P&L bridge, risk, and strategic narrative.

---

# Phase 6: Go Deeper

Add a “Go Deeper” button after each step.

It should expand:
- Why the best answer is best
- Why the wrong answers fail
- What real CPG leaders would watch for
- What interview language to use
- What metrics to mention

---

# Phase 7: Competency Dashboard

Track competency scores across:
- Pricing
- Trade Promotions
- PPA
- Channel Strategy
- Assortment / Mix
- Retailer Negotiation
- Executive Communication
- P&L Storytelling

After completing the scenario, show:
- Total score
- Competency scores
- Maturity rating
- Strongest area
- Biggest development gap
- Suggested next scenario
- Replay button
- Go deeper on this case button

---

# UI Requirements

Use a clean, professional layout.

Required UI sections:
- Scenario header
- Business context card
- Key metrics card
- Decision options
- Feedback panel
- Stakeholder reactions
- Executive coaching panel
- Scorecard
- Final dashboard

The tool should feel like executive training, not a school quiz.

---

# Suggested Files

Use the current project structure, but prefer something like:

src/data/rgm-scenarios.ts
src/types/rgm-simulator.ts
src/components/rgm/ScenarioPlayer.tsx
src/components/rgm/ScenarioStep.tsx
src/components/rgm/DecisionCard.tsx
src/components/rgm/Scorecard.tsx
src/components/rgm/StakeholderPanel.tsx
src/components/rgm/ExecutiveCoachingPanel.tsx
src/components/rgm/CompetencyDashboard.tsx
src/pages/RgmSimulator.tsx

Adjust file paths if the app uses Next.js App Router or a different structure.

---

# Implementation Rules

- Use TypeScript.
- Keep components modular.
- Keep scenario content data-driven.
- Do not hardcode scenario logic into UI components.
- Do not remove existing functionality.
- Do not build all phases at once unless specifically instructed.
- Work phase by phase.
- After each phase, stop and summarize:
  - Files changed
  - Route/URL to test
  - Commands to run
  - Recommended next phase