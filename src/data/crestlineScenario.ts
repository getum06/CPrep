export type StakeholderReaction = {
  role: string;
  concern: string;
  response: string;
};

export type DecisionOption = {
  id: "A" | "B" | "C" | "D";
  text: string;
  score: number;
  feedback: string;
  whyTempting: string;
  whyItFails: string;
  strongRGMResponse: string;
};

export type ScenarioStep = {
  id: string;
  title: string;
  difficulty: "Manager" | "Director" | "VP" | "Executive";
  context: string;
  keyMetrics: string[];
  tension: string;
  question: string;
  options: DecisionOption[];
  bestAnswerId: DecisionOption["id"];
  teachingPoint: string;
  stakeholderPushback: StakeholderReaction[];
  executiveLens: string;
};

export type FinalDebrief = {
  executiveTalkTrack: string;
  practiceAreas: { area: string; description: string }[];
};

export type RgmScenario = {
  title: string;
  company: string;
  metrics: string[];
  steps: ScenarioStep[];
  finalDebrief: FinalDebrief;
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
    "38% of promotional events are margin-negative",
    "Top 20 SKUs drive 82% of profit",
    "Tail SKUs create complexity and weak velocity",
    "Largest grocery customer resisting list price increases",
  ],
  steps: [
    {
      id: "step-1",
      title: "Executive Framing",
      difficulty: "VP",
      context:
        "The CFO has flagged declining EVA for the third consecutive quarter. Volume is down 4%, trade rate has climbed to 23%, and 38% of promotional events are margin-negative. Finance wants cost action. Sales wants retailer relief. Marketing wants brand investment. RGM has been asked to present a recovery plan to the executive team in two weeks.",
      keyMetrics: [
        "EVA: declining for 3 consecutive quarters",
        "Trade rate: up 4pp over two years to 23%",
        "38% of promo events margin-negative",
        "Volume trajectory: −4% YoY",
        "No recovery plan currently aligned cross-functionally",
      ],
      tension:
        "Every function sees a different problem and will frame the narrative in a way that favors their agenda. The executive team will default to whoever makes the loudest case. If RGM doesn't own this diagnostic, Finance will reframe it as a cost problem.",
      question:
        "Who should initiate the RGM intervention and what should the first executive conversation focus on?",
      bestAnswerId: "C",
      teachingPoint:
        "RGM owns the diagnostic and cross-functional alignment. The first executive conversation must be a P&L bridge with named owners — not a functional update from Sales, Finance, or Marketing.",
      options: [
        {
          id: "A",
          text: "Sales should lead because retailer negotiations are the immediate issue.",
          score: 45,
          feedback:
            "Sales is central to execution, but making this only a retailer negotiation misses the broader margin, mix, and portfolio problem.",
          whyTempting:
            "The retailer standoff is the most visible and urgent symptom. Leading with Sales signals decisiveness and responsiveness to the biggest near-term commercial risk.",
          whyItFails:
            "Sales will solve the retailer problem by trading margin for volume — the exact wrong tradeoff when margin is already the critical issue. Pricing, mix, and assortment stay unaddressed.",
          strongRGMResponse:
            "Sales should have a seat at the table, but the enterprise narrative cannot be led by a function whose primary KPI is volume and distribution. We need one story that connects volume, mix, and margin.",
        },
        {
          id: "B",
          text: "Finance should lead because the P&L is under pressure.",
          score: 55,
          feedback:
            "Finance pressure is real, but a finance-led intervention over-indexes on cost control without solving channel, consumer, and assortment choices.",
          whyTempting:
            "The P&L is the hard evidence everyone agrees on. Finance has the board's ear and a clear burning platform that cuts through functional politics.",
          whyItFails:
            "Finance-led interventions default to cost reduction. They underfund commercial investments — like a premium architecture launch — that drive structural margin recovery rather than one-time cost savings.",
          strongRGMResponse:
            "Finance should own P&L validation and financial guardrails. But the growth and commercial strategy cannot be led by a function whose instinct is to cut the budget.",
        },
        {
          id: "C",
          text: "RGM should lead the diagnostic, align Sales, Finance, and Marketing, and frame the issue as a cross-functional margin and growth challenge.",
          score: 100,
          feedback:
            "Best answer. This frames the issue as enterprise value creation, not a single-function problem, and gives executives a clear structure to align on tradeoffs.",
          whyTempting:
            "RGM has the cross-functional view that no single function can replicate — and the P&L diagnostic skills to build a credible recovery narrative.",
          whyItFails: "",
          strongRGMResponse:
            "Open with: 'We have a commercial system problem, not a single-function problem. The P&L bridge shows four levers — pricing, mix, trade efficiency, and assortment — each owned by a different function. I'm proposing a six-week diagnostic with a joint workplan. I need 30 minutes with the executive team this week and a decision on governance structure.'",
        },
        {
          id: "D",
          text: "Marketing should lead because brand equity is the long-term concern.",
          score: 50,
          feedback:
            "Brand equity matters, but the immediate decision requires a commercial system view across price, pack, trade, channel, and mix.",
          whyTempting:
            "Brand equity is genuinely declining, and Marketing has the strongest consumer insight. Brand-led recovery stories often resonate well with boards.",
          whyItFails:
            "Marketing will prioritize media investment and brand equity — valid long-term, but insufficient as a P&L recovery narrative without connecting to price, pack, and trade architecture.",
          strongRGMResponse:
            "Marketing's insight on consumer preference shifts is critical input, especially for the premium architecture decision. But the recovery narrative must be a commercial system story, not a brand story.",
        },
      ],
      stakeholderPushback: [
        {
          role: "Sales VP",
          concern:
            "We're about to lose 6 facings at our biggest account. I need RGM to back us on trade funding right now — not in six weeks.",
          response:
            "I hear the urgency. But if we fund trade to hold facings without fixing the underlying mix and margin structure, we'll be back in this conversation in six months with less leverage. Let's solve the immediate issue with a targeted format play while we build the broader case.",
        },
        {
          role: "Finance Director",
          concern:
            "Gross margin is down 2 points. Before we talk about growth investments, I need a cost reduction plan on the table.",
          response:
            "Agreed — margin recovery is the goal. The distinction is cost-led margin recovery, which is one-time, versus commercial-led margin recovery, which is structural. The trade efficiency and PPA work alone can deliver 1.5 to 2 points of GM permanently.",
        },
        {
          role: "Marketing VP",
          concern:
            "We have underinvested in brand for two years. If we don't fix brand equity, no price increase will hold.",
          response:
            "Brand equity and price realization are directly linked — you are right. That is exactly why the premium architecture is the first commercial move. We are not cutting media; we are redirecting it toward the positioning that commands the price we need.",
        },
        {
          role: "Retailer Buyer",
          concern:
            "I have been hearing about Crestline's recovery plan for a year. My category manager is asking why I should give you more shelf when your velocity is declining.",
          response:
            "Fair challenge. We are coming back with a shelf architecture that includes a premium format exclusive to your channel and a rationalized base assortment that improves your category turns. The velocity story changes with the new architecture.",
        },
      ],
      executiveLens:
        "Frame to the CFO as a commercial system diagnostic, not a margin recovery project. Open with the P&L bridge: here is where we are, here is the trajectory if we do nothing, here are the four levers, and here is who owns each. Close with a specific ask: 'I need two decisions today — budget authority for the diagnostic workstream and a named executive sponsor from your team.'",
    },
    {
      id: "step-2",
      title: "Price Pack Architecture",
      difficulty: "Director",
      context:
        "Scanner data confirms the category is bifurcating. Premium tortilla chips are growing at 14% — driven by ingredient claims, better-for-you positioning, and a $0.42/oz average price point. Private label is growing at 11% on value and convenience. Crestline sits at $0.31/oz in the branded mid-tier, the segment losing share on both ends.",
      keyMetrics: [
        "Crestline avg price: $0.31/oz",
        "Premium segment avg: $0.42/oz (+35% premium over Crestline)",
        "Private label avg: $0.19/oz",
        "Premium segment GM profile: ~38% vs Crestline at 31%",
        "Crestline core volume: −4% while premium and value both grow",
      ],
      tension:
        "Sales wants large value bags to defend volume. Brand wants a premium launch. Finance wants a clear ROI before approving either. Each function has a plausible case, and doing nothing also looks defensible as a cost-preservation move.",
      question: "The category is bifurcating into value and premium. What is the best PPA move?",
      bestAnswerId: "B",
      teachingPoint:
        "In a bifurcating category, the mid-tier is the most dangerous place to stay. The right sequence is to capture premium margin first — because premium consumers are growing, margins are higher, and brand permission is easier to build from above. Value gap management via entry packs is targeted, not wholesale price reduction.",
      options: [
        {
          id: "A",
          text: "Cut core list price broadly to close the gap with private label.",
          score: 35,
          feedback:
            "This protects short-term volume but trains consumers to expect lower prices, compresses margins further, and removes funding for premium innovation.",
          whyTempting:
            "The volume decline looks like a price competitiveness problem, and closing the private label gap feels like the fastest way to stop the bleeding.",
          whyItFails:
            "Broad price cuts are irreversible in practice. Once consumers and retailers anchor to a lower price, recovering that ground takes years and margin investment you do not have. It also signals that Crestline is competing on value rather than quality.",
          strongRGMResponse:
            "A broad price cut at 31% gross margin accelerates the death spiral — you lose margin without necessarily winning back consumers who have already shifted their purchase behavior. We compete on value with precision, not across the board.",
        },
        {
          id: "B",
          text: "Launch a premium architecture first, then selectively address value gaps through entry packs.",
          score: 100,
          feedback:
            "Best answer. This captures the fastest-growing segment at higher margins, while using targeted entry packs to defend accessibility without collapsing the price ladder.",
          whyTempting:
            "The premium segment is growing fast and the margin profile is better than Crestline's core. Moving there first makes both strategic and financial sense.",
          whyItFails: "",
          strongRGMResponse:
            "To the CFO: 'The premium segment is growing at 14% with a 38% GM profile versus our current 31%. A $6M investment in a premium SKU launch has a payback period of under 18 months at conservative velocity assumptions. Simultaneously, we address affordability with a 1oz entry pack at $1.29 — no broad price reduction required.'",
        },
        {
          id: "C",
          text: "Add larger value bags everywhere to defend share against private label.",
          score: 60,
          feedback:
            "Value packs may have a role, but leading with them worsens mix, trains the market to expect lower effective prices, and ignores the premium opportunity entirely.",
          whyTempting:
            "Large value bags increase household penetration, drive volume, and create price-per-ounce competitiveness with private label — all things Sales will advocate for.",
          whyItFails:
            "Bigger bags at lower per-ounce prices erode revenue per unit and attract price-sensitive consumers who are the first to defect. You end up trading margin for volume in a market where you need both.",
          strongRGMResponse:
            "Value pack sizing has a role in specific channels and retailers, but it cannot be the lead move when the premium segment is growing 14% and you have brand permission to participate in it.",
        },
        {
          id: "D",
          text: "Hold the current pack architecture until inflation eases.",
          score: 25,
          feedback:
            "Waiting cedes both ends of the market and allows premium competitors to establish trial and loyalty before Crestline can respond.",
          whyTempting:
            "With cost pressure, launching new SKUs is expensive and risky. Waiting for inflation to ease before making architecture changes feels like financial discipline.",
          whyItFails:
            "Category bifurcation is a structural trend, not an inflation artifact. Competitors capturing premium consumers now are building distribution, trial, and loyalty that becomes very expensive to dislodge later.",
          strongRGMResponse:
            "Inflation is not the cause of the bifurcation — it is accelerating a trend that was already underway. The cost of not acting is consumer loss to premium and private label simultaneously.",
        },
      ],
      stakeholderPushback: [
        {
          role: "Sales VP",
          concern:
            "My accounts are asking for larger value bags. That is what moves in their stores. A premium launch will take 12 months to scale.",
          response:
            "The account feedback is real, but we should separate what retailers are asking for from what the category data says will grow. We can give specific accounts a value pack while we build the premium architecture — but the growth story and the margin story both require moving up, not down.",
        },
        {
          role: "Finance Director",
          concern:
            "A new premium SKU launch requires packaging, formulation, and a retailer sell-in investment. What is the ROI and the payback period?",
          response:
            "At a $0.42/oz price point, 1,000 stores, and conservative velocity of 0.8 units per store per week, the revenue impact is $17.5M annualized at a 38% GM. Against a $5–6M launch investment, payback is under 18 months. I can walk you through the full model.",
        },
        {
          role: "Marketing VP",
          concern:
            "We finally have budget to support the core brand. Launching a premium line splits our media investment and could confuse brand equity.",
          response:
            "The premium architecture reinforces brand equity — it does not dilute it. Premium adjacency raises the consumer's perception of the parent brand. Think of it as a halo investment, not a distraction.",
        },
        {
          role: "Retailer Buyer",
          concern:
            "I already have three premium tortilla brands on shelf. What makes Crestline premium different, and why should I give you a facing?",
          response:
            "Crestline has 14% share in your category with strong regional loyalty. Our premium entry comes with a heritage narrative and a price point that sits between mass premium and artisan. We are not asking for a new section — we are asking to trade up two facings from our core while your category grows.",
        },
      ],
      executiveLens:
        "Tell the CMO and CFO together: 'The category architecture is moving and our current position is the least defensible spot in the market. The P&L case for moving premium is stronger than staying in place — higher margin, faster-growing segment, and defensible brand positioning. The risk of inaction is not neutral. It is compounding.' Show the consumer decision tree, the competitive white space, and the margin bridge.",
    },
    {
      id: "step-3",
      title: "Channel Strategy",
      difficulty: "VP",
      context:
        "Your largest grocery account — responsible for $42M in revenue, or 23% of total — is in annual joint business planning. They want an additional 2 points of margin support or they will reduce Crestline from 14 facings to 8. Their category manager has flagged declining velocity and is benchmarking Crestline against a private label alternative.",
      keyMetrics: [
        "Account revenue: $42M (23% of total)",
        "Current account margin contribution: 18% (retailer target: 20%)",
        "Facing reduction risk: 14 → 8 facings, est. revenue impact −$6–8M",
        "Trade rate for this account: 26% vs portfolio avg 23%",
        "Private label alternative under evaluation by retailer",
      ],
      tension:
        "Sales wants to fund the additional support to protect the relationship. Finance says trade is already over-allocated to this account. A broad funding concession sets a cross-account precedent that every other retailer will reference in their next JBP.",
      question:
        "A major retailer wants margin support and threatens to reduce shelf space. What channel strategy is strongest?",
      bestAnswerId: "C",
      teachingPoint:
        "Channel strategy is strongest when it creates retailer-specific value without setting a price or margin precedent across the market. An exclusive format solves the retailer's margin math through product differentiation — not pure trade funding.",
      options: [
        {
          id: "A",
          text: "Fund a deeper temporary price reduction to preserve current shelf space.",
          score: 40,
          feedback:
            "This buys time but increases trade dependence, does not solve the retailer's underlying margin gap, and establishes a funding expectation that is hard to unwind.",
          whyTempting:
            "The revenue at risk is real. A $6–8M facing reduction is a material downside. Funding the gap seems like the lowest-risk path to preserve the account.",
          whyItFails:
            "Temporary price reductions become permanent in practice. Every other account will hear about it and request the same treatment. You have also not given the retailer a reason to believe the velocity problem is solved.",
          strongRGMResponse:
            "A trade rate of 26% on this account is already above portfolio average. Adding more funding without changing the commercial structure guarantees you are in the same negotiation next year, with even less leverage.",
        },
        {
          id: "B",
          text: "Refuse additional support and accept the shelf space risk.",
          score: 30,
          feedback:
            "Holding the line protects margin integrity in theory but ignores the account risk and offers no constructive commercial alternative.",
          whyTempting:
            "Refusing to fund trains retailers that Crestline will not capitulate, which protects long-term pricing integrity and avoids setting a precedent.",
          whyItFails:
            "Without an alternative value proposition, refusing support is not a negotiation — it is a withdrawal. The retailer proceeds with the shelf reduction and you lose both the facings and the relationship.",
          strongRGMResponse:
            "Holding the line is the right principle, but the execution requires offering an alternative. You cannot just say no — you have to say no and here is something better.",
        },
        {
          id: "C",
          text: "Offer an exclusive channel-specific format with clear price-pack differentiation.",
          score: 100,
          feedback:
            "Best answer. A retailer-exclusive format improves their margin math through product differentiation, not pure trade funding — and protects cross-channel price integrity.",
          whyTempting:
            "Creating something exclusive for the retailer addresses their margin need with a structural solution rather than a one-time concession.",
          whyItFails: "",
          strongRGMResponse:
            "To the retailer: 'We are not in a position to fund 2 more points of trade across the board — that would undermine our pricing architecture at every other account. What we can do is design a format exclusive to your channel: a premium multipack with a $0.38/oz effective price point. Your margin improves through the mix shift, not through our trade investment. And it solves the velocity problem.'",
        },
        {
          id: "D",
          text: "Shift more national media spend into that retailer's shopper marketing program.",
          score: 55,
          feedback:
            "Shopper marketing can support the plan but does not solve the retailer's margin need or address the competitive velocity issue at its root.",
          whyTempting:
            "Redirecting media to shopper marketing looks like brand support rather than trade funding, which keeps the trade rate clean on paper and gives the retailer something to point to.",
          whyItFails:
            "Shopper marketing spend does not improve the retailer's margin math in a way they can show their own leadership. They need a structural margin improvement, not incremental display activity.",
          strongRGMResponse:
            "Shopper marketing is a useful component of the account plan, but it cannot substitute for a price-pack architecture that works for both sides of the P&L.",
        },
      ],
      stakeholderPushback: [
        {
          role: "Sales VP",
          concern:
            "This is our single largest account. I am not walking into that JBP without being able to offer them something tangible on margin. Give me a number.",
          response:
            "I will give you something better than a number — I will give you a format they cannot get anywhere else. An exclusive multipack with a better per-unit margin for them and a better mix story for us. That is a stronger negotiating position than incremental trade funding.",
        },
        {
          role: "Finance Director",
          concern:
            "We are already at 26% trade rate on this account. If we add more funding here, every other retailer will ask for the same.",
          response:
            "Exactly right — that is why we are not proposing more trade funding. The exclusive format solves their margin requirement through product architecture, not through incremental investment. The trade rate stays clean.",
        },
        {
          role: "Marketing VP",
          concern:
            "An exclusive format for one retailer fragments our brand architecture and makes it harder to tell a consistent brand story.",
          response:
            "The exclusive format is a pack size and price point variant, not a different brand identity. Think of it as a channel-specific expression of the premium architecture we are launching anyway. The brand story stays consistent.",
        },
        {
          role: "Retailer Buyer",
          concern:
            "I asked for margin support and you are offering me a new product I have not tested. How do I know this will move?",
          response:
            "Fair concern. We are proposing a sell-in with a 90-day velocity guarantee. If the format does not hit threshold velocity, we fund the margin gap for that quarter. We are putting real skin in the game on the new format.",
        },
      ],
      executiveLens:
        "Present to the President as a channel architecture decision, not a negotiation outcome. The question is not whether to give this account more margin — it is how to give them value without destroying your pricing system at every other account. Say: 'We have designed a channel-specific solution that improves their economics through product differentiation. This is the sustainable model. The alternative is a trade concession that becomes the floor for every JBP conversation we have for the next three years.'",
    },
    {
      id: "step-4",
      title: "Assortment and Mix",
      difficulty: "Director",
      context:
        "An SKU rationalization analysis shows 40 tail SKUs with average velocity of 0.3 units per store per week — well below the 0.8 threshold for efficient replenishment. These SKUs represent 8% of profit but 22% of supply chain complexity and an average cost-to-serve 2.4x higher than core SKUs. However, 12 of the 40 are in regional grocery accounts where Crestline holds 14%+ share.",
      keyMetrics: [
        "40 tail SKUs: 8% of profit, 22% of supply chain complexity",
        "Average velocity: 0.3 units/store/week vs 0.8 threshold",
        "Cost-to-serve: 2.4x core SKU average",
        "12 of 40 SKUs in regional accounts with 14%+ Crestline share",
        "Complexity reduction potential: est. $2–3M annual COGS savings",
      ],
      tension:
        "Supply chain wants a clean cut to realize the savings immediately. Regional sales teams warn that cutting those 12 SKUs damages relationships with high-share accounts. Finance wants the savings now. The right answer requires discipline about which items to protect and why.",
      question:
        "The bottom 40 SKUs represent only 8% of profit but are important to some regional retailers. What is the best assortment move?",
      bestAnswerId: "B",
      teachingPoint:
        "Assortment rationalization creates value only when it is surgical. A blunt cut maximizes complexity savings but damages strategically important retail relationships. The right move is to use velocity, profitability, and retailer strategic value as three distinct filters — not one.",
      options: [
        {
          id: "A",
          text: "Eliminate all bottom 40 SKUs to simplify operations quickly.",
          score: 50,
          feedback:
            "This captures the complexity savings but is too blunt — it damages regional accounts where Crestline has meaningful share and real shelf relationships.",
          whyTempting:
            "Eliminating all 40 SKUs is clean, fast, and delivers the full $2–3M savings without requiring a lengthy SKU-by-SKU analysis.",
          whyItFails:
            "12 of those 40 SKUs are in accounts where Crestline has 14%+ share. Cutting them hands share to competitors in markets where you are actually winning. You save complexity cost while creating a strategic hole.",
          strongRGMResponse:
            "A blunt cut optimizes one variable — complexity — while ignoring strategic shelf position. The supply chain savings are real, but losing 14% share accounts is not a cost-free trade-off.",
        },
        {
          id: "B",
          text: "Rationalize the tail selectively, protect regionally strategic items, and reinvest support behind high-velocity core SKUs.",
          score: 100,
          feedback:
            "Best answer. This balances complexity reduction, regional retailer nuance, and reinvestment behind the SKUs that actually drive profit and velocity.",
          whyTempting:
            "A selective approach captures most of the complexity savings while protecting the shelf positions that matter most — a better risk-adjusted outcome than a full cut.",
          whyItFails: "",
          strongRGMResponse:
            "To Finance: 'A selective rationalization of 28 SKUs delivers $1.8–2.2M in COGS savings and frees up supply chain capacity. The 12 regionally strategic items stay, but we are requiring a velocity improvement plan from each regional team within 90 days. This is complexity reduction with commercial intelligence, not a blunt cut.'",
        },
        {
          id: "C",
          text: "Keep the full assortment because regional retailers value choice.",
          score: 35,
          feedback:
            "This avoids conflict but leaves complexity costs intact, drains supply chain capacity, and does nothing to solve the core business decline.",
          whyTempting:
            "Regional retailers have explicitly said they value the full assortment. Cutting SKUs risks antagonizing accounts that have been loyal distribution partners.",
          whyItFails:
            "Keeping every SKU because someone somewhere values it is not a portfolio strategy. At 0.3 units per store per week and 2.4x cost-to-serve, you are paying to maintain inventory and complexity that destroys margin.",
          strongRGMResponse:
            "Assortment decisions should be driven by velocity, margin, and strategic value — not by the path of least resistance. Keeping every tail SKU because someone might complain is not a defensible commercial position.",
        },
        {
          id: "D",
          text: "Move all tail SKUs to e-commerce only.",
          score: 55,
          feedback:
            "This preserves availability but treats e-commerce as a complexity disposal channel rather than a strategic one, and does not reduce supply chain cost.",
          whyTempting:
            "Moving tail SKUs to e-commerce keeps them available for the consumers who want them while removing them from physical retail complexity.",
          whyItFails:
            "E-commerce does not eliminate manufacturing, planning, or inventory complexity — it just moves where the product ships from. And low-velocity SKUs do not typically drive e-commerce demand either.",
          strongRGMResponse:
            "E-commerce should be a strategic channel choice, not a tail SKU retirement home. Moving low-velocity SKUs there without a demand rationale does not solve the underlying problem.",
        },
      ],
      stakeholderPushback: [
        {
          role: "Sales VP",
          concern:
            "If we cut regional SKUs, I am going to lose three accounts that have been with us for 10 years. That is not a complexity savings — that is a relationship problem.",
          response:
            "I am not proposing we cut the regionally strategic items. I am proposing we protect 12 of the 40 based on share position and shelf relationship value, and rationalize the other 28 where we have low velocity and no strategic rationale. The 12 you care about most are protected.",
        },
        {
          role: "Finance Director",
          concern:
            "The full cut saves $2–3M. The selective cut saves $1.8–2.2M. Why are we leaving $500K on the table for relationship management?",
          response:
            "Because the cost of losing a 14% share account is not zero. If three regional accounts reduce our facings in response, the revenue impact exceeds the $500K in complexity savings within one quarter. We are protecting the margin that matters most.",
        },
        {
          role: "Marketing VP",
          concern:
            "Some of these tail SKUs are limited editions and regional flavors that drive brand affinity. Cutting them makes us look like we are retreating.",
          response:
            "Brand affinity is real, but brand affinity built on a SKU moving 0.3 units per store per week is not measurable. If a limited edition has regional significance, it should show up in velocity — and those are the 12 we are protecting.",
        },
        {
          role: "Retailer Buyer",
          concern:
            "You just told me Crestline is growing. Now you are telling me you are cutting SKUs. Which story is it?",
          response:
            "Both can be true. We are focusing the growth story on the SKUs that are actually growing — the premium architecture and core high-velocity items. The items we are rationalizing are not driving your category turns. In fact, freeing that shelf space for our new premium format will improve your category velocity metrics.",
        },
      ],
      executiveLens:
        "Frame to the CFO as margin recapture with surgical precision. Say: 'We are not cutting the product line — we are reallocating complexity cost into our highest-profit SKUs and protecting the regional shelf positions that represent real strategic equity. The $1.8M in savings goes directly back into trade support for the premium launch and core velocity investment. This is a commercial decision, not a cost-cutting exercise.'",
    },
    {
      id: "step-5",
      title: "Executive Recommendation",
      difficulty: "Executive",
      context:
        "After six weeks of cross-functional analysis, RGM has recommendations across PPA, trade efficiency, channel strategy, and assortment. The executive team has 30 minutes. The CFO is skeptical and wants to see numbers. The CMO wants brand investment protected. The Sales VP wants retailer wins. The President wants a coherent strategy, not a functional update.",
      keyMetrics: [
        "Combined lever potential: +$14M gross profit over 18 months",
        "GM improvement: +1.8pp from current 31% to target 32.8%",
        "Volume stabilization: trajectory from −4% to −1% in year one",
        "Trade efficiency improvement: 38% → 22% margin-negative events",
        "SKU rationalization savings: $1.8–2.2M annually",
      ],
      tension:
        "Each executive will pull toward the element that benefits their function. If the recommendation is not framed as a single integrated P&L story, it will be picked apart lever by lever and each function will fund the part they like while resisting the part they do not.",
      question: "How should this be presented to the executive team?",
      bestAnswerId: "D",
      teachingPoint:
        "Executives make decisions when you give them a P&L bridge, a clear ask, and named ownership. Everything else is an update. The goal of the executive presentation is not to inform — it is to get a decision and resource commitment.",
      options: [
        {
          id: "A",
          text: "As a brand strategy update focused on premium innovation.",
          score: 45,
          feedback:
            "Premium innovation is part of the answer, but framing it as brand strategy loses the CFO and does not give anyone a decision to make.",
          whyTempting:
            "The premium architecture is the most tangible new initiative. Framing the presentation around it gives a clear narrative arc and gets Marketing's buy-in immediately.",
          whyItFails:
            "The CFO will disengage when the framing shifts to brand equity and consumer trends. Without the P&L bridge, you have not answered the question the executive team actually has: what is the financial return and when?",
          strongRGMResponse:
            "Brand strategy is the input. P&L recovery is the output. Lead with the output and work backwards to show how the brand decisions support the financial case.",
        },
        {
          id: "B",
          text: "As a sales negotiation plan for the largest grocery customer.",
          score: 50,
          feedback:
            "The retailer issue is urgent, but positioning the plan this way underplays pricing, portfolio, assortment, and enterprise tradeoffs — and loses the CFO and CMO early.",
          whyTempting:
            "The retailer negotiation is the most time-sensitive issue and the most concrete commercial action. Starting with what Sales is doing signals responsiveness.",
          whyItFails:
            "Framing the presentation as a sales plan makes it a functional update, not a strategy. The CFO and CMO will disengage, and the President will ask why this needed 30 minutes of executive time.",
          strongRGMResponse:
            "The retailer negotiation is one output of the strategy. It should appear in the P&L bridge as the channel lever, not as the organizing frame for the entire recommendation.",
        },
        {
          id: "C",
          text: "As a cost takeout program to restore gross margin.",
          score: 40,
          feedback:
            "Cost discipline is relevant, but this framing positions RGM as a cost function and misses the growth architecture, channel strategy, and commercial choices that make the plan sustainable.",
          whyTempting:
            "The CFO's primary concern is margin. Framing the presentation around cost and margin recovery seems like speaking the CFO's language directly.",
          whyItFails:
            "Cost framing alienates Marketing and Sales before you have started. It also undersells the commercial upside — $14M in gross profit through growth levers, not just cost reduction.",
          strongRGMResponse:
            "Cost efficiency is one component of the P&L bridge. It is not the strategy. If the only story you can tell is cost reduction, you have not built the commercial case.",
        },
        {
          id: "D",
          text: "As a full P&L bridge showing price, mix, trade, volume, and COGS impacts.",
          score: 100,
          feedback:
            "Best answer. A P&L bridge gives executives the financial logic, the integrated view across all levers, and a structure for making cross-functional decisions.",
          whyTempting:
            "A P&L bridge speaks every executive's language simultaneously — it shows CFO the numbers, CMO the investment logic, Sales VP the commercial plan, and the President the strategic coherence.",
          whyItFails: "",
          strongRGMResponse:
            "Open with: 'Here is where we are today. Here is the trajectory if we do nothing. Here is the recovery scenario with our four commercial levers. The total gross profit impact over 18 months is $14M — a 1.8 point GM improvement. I need three decisions today: budget authority for the premium SKU launch, alignment on the channel strategy for our top account, and a cross-functional governance cadence to track execution.' Then stop and ask for questions.",
        },
      ],
      stakeholderPushback: [
        {
          role: "Sales VP",
          concern:
            "This presentation spends three slides on pricing and assortment and one slide on the retailer. My team is in JBP right now. I need executive air cover.",
          response:
            "The channel strategy slide directly addresses your JBP position. The exclusive format we are proposing gives you a stronger negotiating tool than incremental trade funding. I need the executive team to authorize that approach so you can take it into the account conversation.",
        },
        {
          role: "Finance Director",
          concern:
            "The $14M gross profit projection depends on the premium launch hitting velocity targets that I am not confident in. What is the downside scenario?",
          response:
            "The risk-adjusted case assumes 60% of base velocity and delivers $8.4M in gross profit. Even in the downside, the trade efficiency and assortment rationalization deliver $4M in savings that are not dependent on volume. The floor is defensible.",
        },
        {
          role: "Marketing VP",
          concern:
            "The P&L bridge does not show the brand equity investment. If we do not show media support, the CFO will cut it.",
          response:
            "The media investment is in the premium launch line — it is included in the P&L. I structured it as a commercial investment with a volume return, not as a brand expense line. That framing protects it from the CFO's cost-reduction lens.",
        },
        {
          role: "Retailer Buyer",
          concern:
            "I heard you are taking a new strategy to your executive team. Before you do, I want to make sure our account priorities are reflected in whatever plan gets approved.",
          response:
            "Your account is specifically addressed in the channel strategy lever. The exclusive format proposal we are bringing to your JBP is part of the executive-approved plan. That gives it more authority and staying power than a one-off sales commitment.",
        },
      ],
      executiveLens:
        "Lead the executive room with the P&L bridge on screen. Do not start with background or context — they know the context. Start with the gap: 'Here is what happens to this business if we do nothing over the next 18 months.' Then show the recovery scenario lever by lever. Close with three specific asks and the names of who owns each one. The President will remember the ask. The CFO will remember the numbers. Make sure both are unmissable.",
    },
  ],
  finalDebrief: {
    executiveTalkTrack:
      "The Crestline situation is a textbook bifurcation trap: we are stranded in the branded mid-tier while both ends of the market grow. The RGM response is not a single lever — it is a coordinated commercial system. We upgrade the pack architecture to capture premium margin, rationalize the tail with surgical precision, renegotiate the top account through product differentiation rather than trade funding, and we get the integrated P&L story in front of leadership before Finance reframes it as a cost problem. Every week we delay, a premium competitor is building trial and loyalty that becomes very expensive to dislodge. The four levers together deliver $14M in gross profit over 18 months at a defensible risk-adjusted floor of $8.4M. That is the case I am taking to the executive team, and I need two decisions: budget authority and a governance cadence.",
    practiceAreas: [
      {
        area: "Executive Framing and P&L Storytelling",
        description:
          "Practice translating commercial recommendations into a P&L bridge that CFOs and Presidents can act on. The goal is a decision, not an update.",
      },
      {
        area: "Price Pack Architecture",
        description:
          "Deepen your ability to read category bifurcation signals and design pack architectures that capture premium margin without sacrificing affordability levers.",
      },
      {
        area: "Channel Strategy and Account Negotiation",
        description:
          "Build the skill of creating retailer-specific value through product differentiation rather than incremental trade investment.",
      },
      {
        area: "Assortment and Mix Management",
        description:
          "Practice applying velocity, profitability, and strategic value as three distinct filters for SKU rationalization decisions.",
      },
    ],
  },
};
