export type DecisionOption = {
  id: "A" | "B" | "C" | "D";
  text: string;
  score: number;
  feedback: string;
};

export type ScenarioStep = {
  id: string;
  title: string;
  question: string;
  options: DecisionOption[];
  bestAnswerId: DecisionOption["id"];
  teachingPoint: string;
};

export type RgmScenario = {
  title: string;
  company: string;
  metrics: string[];
  steps: ScenarioStep[];
};

export const crestlineScenario: RgmScenario = {
  title: "Crestline Snacks: Defending Growth in a Bifurcating Tortilla Chip Category",
  company:
    "Crestline Snacks is a $180M tortilla chip brand with strong regional equity but under pressure from private label, premium entrants, retailer margin demands, and inflation-fatigued consumers.",
  metrics: [
    "Net revenue: $180M",
    "Gross margin: 31%",
    "Category growth: 2%",
    "Premium tortilla segment growth: 14%",
    "Value/private label growth: 11%",
    "Core Crestline volume: -4%",
    "Trade rate: 23%",
    "Promo ROI is mixed, with 38% of events margin-negative",
    "Top 20 SKUs drive 82% of profit",
    "Tail SKUs create complexity and weak velocity",
    "Largest grocery customer is resisting list price increases",
  ],
  steps: [
    {
      id: "step-1",
      title: "Executive Framing",
      question:
        "Who should initiate the RGM intervention and what should the first executive conversation focus on?",
      bestAnswerId: "C",
      teachingPoint:
        "RGM owns the diagnostic and cross-functional alignment, but executives need a concise P&L bridge and strategic narrative.",
      options: [
        {
          id: "A",
          text: "Sales should lead because retailer negotiations are the immediate issue.",
          score: 45,
          feedback:
            "Sales is central to execution, but making this only a retailer negotiation misses the broader margin, mix, and portfolio problem.",
        },
        {
          id: "B",
          text: "Finance should lead because the P&L is under pressure.",
          score: 55,
          feedback:
            "Finance pressure is real, but a finance-led intervention may over-index on cost control without solving channel, consumer, and assortment choices.",
        },
        {
          id: "C",
          text: "RGM should lead the diagnostic, align Sales, Finance, and Marketing, and frame the issue as a cross-functional margin and growth challenge.",
          score: 100,
          feedback:
            "Best answer. This frames the issue as enterprise value creation, not a single-function problem, and gives executives a clear way to align tradeoffs.",
        },
        {
          id: "D",
          text: "Marketing should lead because brand equity is the long-term concern.",
          score: 50,
          feedback:
            "Brand equity matters, but the immediate decision requires a commercial system view across price, pack, trade, channel, and mix.",
        },
      ],
    },
    {
      id: "step-2",
      title: "Price Pack Architecture",
      question: "The category is bifurcating into value and premium. What is the best PPA move?",
      bestAnswerId: "B",
      teachingPoint:
        "A bifurcating category usually requires protecting premium upside while managing entry accessibility without collapsing the core price ladder.",
      options: [
        {
          id: "A",
          text: "Cut core list price broadly to close the gap with private label.",
          score: 35,
          feedback:
            "This protects short-term volume but risks training consumers down, compressing margins, and making it harder to fund premium innovation.",
        },
        {
          id: "B",
          text: "Launch a premium architecture first, then selectively address value gaps through entry packs.",
          score: 100,
          feedback:
            "Best answer. This captures fast-growing premium demand while using targeted entry packs to manage affordability without weakening the full portfolio.",
        },
        {
          id: "C",
          text: "Add larger value bags everywhere to defend share against private label.",
          score: 60,
          feedback:
            "Larger value packs may have a role, but leading with them can worsen mix and make the brand look reactive in a category where premium is growing faster.",
        },
        {
          id: "D",
          text: "Hold the current pack architecture until inflation eases.",
          score: 25,
          feedback:
            "Waiting leaves Crestline exposed on both ends of the market and does not address the current volume and margin pressure.",
        },
      ],
    },
    {
      id: "step-3",
      title: "Channel Strategy",
      question:
        "A major retailer wants margin support and threatens to reduce shelf space. What channel strategy is strongest?",
      bestAnswerId: "C",
      teachingPoint:
        "Channel strategy is strongest when it creates retailer-specific value without destroying price integrity across the market.",
      options: [
        {
          id: "A",
          text: "Fund a deeper temporary price reduction to preserve current shelf space.",
          score: 40,
          feedback:
            "This may buy time, but it increases trade dependence and does not solve the retailer's margin need or Crestline's profitability problem.",
        },
        {
          id: "B",
          text: "Refuse additional support and accept the shelf space risk.",
          score: 30,
          feedback:
            "Holding the line may protect margin in theory, but it ignores the account risk and lacks a constructive commercial alternative.",
        },
        {
          id: "C",
          text: "Offer an exclusive channel-specific format with clear price-pack differentiation.",
          score: 100,
          feedback:
            "Best answer. A differentiated format can improve retailer economics while limiting cross-channel price conflict and protecting the brand architecture.",
        },
        {
          id: "D",
          text: "Shift more national media spend into that retailer's shopper marketing program.",
          score: 55,
          feedback:
            "Shopper marketing can support the plan, but it is not a substitute for a price-pack and margin structure that works for both sides.",
        },
      ],
    },
    {
      id: "step-4",
      title: "Assortment And Mix",
      question:
        "The bottom 40 SKUs represent only 8% of profit but are important to some regional retailers. What is the best assortment move?",
      bestAnswerId: "B",
      teachingPoint:
        "Good assortment work separates low-value complexity from strategically important regional demand instead of applying a blunt cut.",
      options: [
        {
          id: "A",
          text: "Eliminate all bottom 40 SKUs to simplify operations quickly.",
          score: 50,
          feedback:
            "This improves complexity, but it is too blunt and could damage regional relationships or remove locally meaningful items.",
        },
        {
          id: "B",
          text: "Rationalize the tail selectively, protect regionally strategic items, and reinvest support behind high-velocity core SKUs.",
          score: 100,
          feedback:
            "Best answer. This balances complexity reduction, retailer nuance, and reinvestment behind the SKUs that actually create profit.",
        },
        {
          id: "C",
          text: "Keep the full assortment because regional retailers value choice.",
          score: 35,
          feedback:
            "This avoids conflict, but it leaves weak velocity and complexity costs untouched while the core business is already declining.",
        },
        {
          id: "D",
          text: "Move all tail SKUs to e-commerce only.",
          score: 55,
          feedback:
            "This may help some items, but it treats e-commerce as a cleanup channel rather than making disciplined choices by profit, velocity, and retailer role.",
        },
      ],
    },
    {
      id: "step-5",
      title: "Executive Recommendation",
      question: "How should this be presented to the executive team?",
      bestAnswerId: "D",
      teachingPoint:
        "Executives need a decision-ready P&L story that connects actions to price, mix, trade, volume, cost, risk, and ownership.",
      options: [
        {
          id: "A",
          text: "As a brand strategy update focused on premium innovation.",
          score: 45,
          feedback:
            "Premium innovation is part of the answer, but the executive team needs the full commercial and financial case.",
        },
        {
          id: "B",
          text: "As a sales negotiation plan for the largest grocery customer.",
          score: 50,
          feedback:
            "The retailer issue is urgent, but positioning the plan this way underplays pricing, portfolio, assortment, and enterprise tradeoffs.",
        },
        {
          id: "C",
          text: "As a cost takeout program to restore gross margin.",
          score: 40,
          feedback:
            "Cost discipline may matter, but this framing misses the growth and commercial architecture choices that make the plan sustainable.",
        },
        {
          id: "D",
          text: "As a full P&L bridge showing price, mix, trade, volume, and COGS impacts.",
          score: 100,
          feedback:
            "Best answer. A P&L bridge gives executives the financial logic, strategic tradeoffs, and cross-functional accountability needed to make the call.",
        },
      ],
    },
  ],
};
