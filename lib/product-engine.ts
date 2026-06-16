export type IntelligenceInput = { input?: string };
const product = {
  "repo": "roleforge",
  "brand": "RoleForge",
  "suite": "AI Productivity Suite",
  "domain": "Org design",
  "accent": "from-violet-300 via-indigo-300 to-sky-300",
  "hero": "Forge roles that make teams clearer instead of heavier.",
  "sub": "RoleForge helps founders and operators design roles, responsibilities, scorecards, and hiring briefs before the org chart becomes confusion.",
  "input": "Need a founding operations lead who owns support, reporting, vendor follow-up, and daily execution rhythm",
  "cta": "Forge role brief",
  "score": "Role clarity",
  "modules": [
    [
      "Responsibility map",
      "Convert vague job ideas into clear ownership."
    ],
    [
      "Scorecard builder",
      "Define outcomes, metrics, and first 90 days."
    ],
    [
      "Collaboration boundaries",
      "Show who the role works with and where handoffs happen."
    ],
    [
      "Hiring brief",
      "Prepare a role summary candidates and advisors understand."
    ]
  ],
  "rows": [
    [
      "Role mission",
      "Leadership",
      "High",
      "Say why this role exists now."
    ],
    [
      "90-day outcomes",
      "Execution",
      "High",
      "Define measurable proof of fit."
    ],
    [
      "Decision rights",
      "Org design",
      "Medium",
      "Clarify what the role can decide."
    ],
    [
      "Interview signals",
      "Hiring",
      "Medium",
      "Turn needs into practical questions."
    ]
  ],
  "missions": [
    [
      "Org chart memory",
      "Track roles and responsibilities over time."
    ],
    [
      "Hiring scorecards",
      "Generate interview rubrics from role outcomes."
    ],
    [
      "Responsibility conflict detector",
      "Find overlapping ownership and gaps."
    ],
    [
      "Compensation bands",
      "Add market-informed range guidance."
    ]
  ]
} as const;
function scoreFor(subject: string) { let score = 56 + Math.min(31, Math.floor(subject.length / 6)); if (/risk|breach|trust|domain|role|ops|cost|email|launch|customer|incident/i.test(subject)) score += 8; return Math.min(98, score); }
export function generateIntelligence({ input = '' }: IntelligenceInput) { const subject = input.trim() || product.input; const score = scoreFor(subject); return { product: product.brand, suite: product.suite, domain: product.domain, subject, score, status: score >= 86 ? 'strong' : score >= 72 ? 'ready' : 'needs review', executive_summary: product.sub, intelligence_map: product.modules.map(([label,value]) => ({ label, value, status: score >= 72 ? 'priority' : 'review' })), action_queue: product.rows.slice(0,3).map(([item,owner,priority,note]) => ({ action: item + ' - ' + owner, priority, impact: note })), contributor_lanes: product.missions.map(([lane,mission]) => ({ lane, mission })), generated_at: new Date().toISOString() }; }
