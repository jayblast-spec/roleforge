export const maxDuration = 30;

export type Role = {
  title: string;
  department: string;
  priority: "Hire Now" | "Q1" | "Q2" | "Year 2";
  description: string;
  keySkills: string[];
  reportsTo: string;
  salaryRange: string;
};

export type ForgeOutput = {
  readinessScore: number;
  readinessLabel: "Lagging" | "Developing" | "Maturing" | "Leading";
  summary: string;
  roles: Role[];
  buildSequence: string[];
  criticalWarning: string;
};

const DEMO: ForgeOutput = {
  readinessScore: 38,
  readinessLabel: "Developing",
  summary: "Your organisation is in the early stages of intelligent infrastructure adoption. You have the awareness but lack the dedicated roles to execute. The window to establish an AI-native operational advantage is 12–18 months — and the clock is running.",
  roles: [
    {
      title: "AI Operations Lead",
      department: "Operations",
      priority: "Hire Now",
      description: "Owns the integration of AI tools into day-to-day workflows. Bridges engineering and business teams to embed intelligence into existing systems.",
      keySkills: ["LLM tooling", "Process automation", "Stakeholder management", "Data fluency"],
      reportsTo: "COO",
      salaryRange: "$90K–$130K",
    },
    {
      title: "Adaptive Systems Architect",
      department: "Technology",
      priority: "Hire Now",
      description: "Designs infrastructure that learns and reconfigures under pressure. Responsible for ensuring systems don't just operate — they adapt.",
      keySkills: ["Systems design", "ML infrastructure", "Distributed systems", "Resilience engineering"],
      reportsTo: "CTO",
      salaryRange: "$130K–$180K",
    },
    {
      title: "Operational Intelligence Strategist",
      department: "Strategy",
      priority: "Q1",
      description: "Aligns AI capability with logistics, finance, and operations strategy. Translates technical possibilities into business outcomes.",
      keySkills: ["Strategic planning", "AI product sense", "Financial modelling", "Executive communication"],
      reportsTo: "CEO",
      salaryRange: "$110K–$150K",
    },
    {
      title: "AI Governance Engineer",
      department: "Compliance",
      priority: "Q1",
      description: "Encodes intelligence into compliance and trust frameworks. Ensures AI decisions are auditable, fair, and legally defensible.",
      keySkills: ["AI ethics", "Regulatory compliance", "Technical writing", "Risk management"],
      reportsTo: "General Counsel",
      salaryRange: "$95K–$135K",
    },
    {
      title: "Resilience Signal Analyst",
      department: "Operations",
      priority: "Q2",
      description: "Maps how your infrastructure responds dynamically to stress events. Monitors signals that indicate system degradation before failure occurs.",
      keySkills: ["Data analysis", "Incident management", "Observability tooling", "Statistical modelling"],
      reportsTo: "AI Operations Lead",
      salaryRange: "$75K–$105K",
    },
  ],
  buildSequence: [
    "Hire AI Operations Lead to own the integration roadmap immediately",
    "Bring in Adaptive Systems Architect to redesign core infrastructure",
    "Add AI Governance Engineer before scaling any customer-facing AI",
    "Promote or hire Operational Intelligence Strategist once AI is embedded in 2+ departments",
    "Grow a Resilience Signal Analyst team as systems scale into production",
  ],
  criticalWarning: "Organisations that delay AI infrastructure roles by 12+ months face a compounding disadvantage — competitors embed intelligence faster, attracting the talent and the customers. The cost of catching up is 3–5× the cost of building now.",
};

const SYSTEM = `You are an expert AI organisational strategist and workforce architect. Based on the company profile provided, generate a set of intelligent infrastructure roles this organisation needs to build for the next decade.

Draw from the emerging discipline of "intelligence as infrastructure" — where AI is not an add-on but the operational foundation of systems. Reference role categories like:
- Adaptive Systems Architect
- Operational Intelligence Strategist
- Resilience Signal Analyst
- Continuity Auditor
- AI Governance Engineer
- Ethics of Intelligent Infrastructure Designer
- Intelligence Infrastructure Lead

Tailor roles specifically to the company's industry, stage, gaps, and team size. Be specific and actionable, not generic.

Return ONLY valid JSON with this exact structure:
{
  "readinessScore": number (0-100),
  "readinessLabel": "Lagging" | "Developing" | "Maturing" | "Leading",
  "summary": string (2-3 sentences on their current state and urgency),
  "roles": [
    {
      "title": string,
      "department": string,
      "priority": "Hire Now" | "Q1" | "Q2" | "Year 2",
      "description": string (2 sentences — what they own and why it matters),
      "keySkills": string[] (4 specific skills),
      "reportsTo": string,
      "salaryRange": string (e.g. "$90K–$130K")
    }
  ],
  "buildSequence": string[] (5 ordered steps — what to hire/build first and why),
  "criticalWarning": string (1-2 sentences on the cost of inaction)
}

Generate 5–7 roles. No markdown. No explanation. Only JSON.`;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const industry = body?.industry as string;
  const stage = body?.stage as string;
  const gaps = Array.isArray(body?.gaps) ? (body.gaps as string[]) : [];
  const teamSize = body?.teamSize as string;

  if (!industry || !stage || gaps.length === 0 || !teamSize) {
    return Response.json({ error: "Please complete all steps before forging." }, { status: 400 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    await new Promise((r) => setTimeout(r, 1800));
    return Response.json({ demo: true, result: DEMO });
  }

  const prompt = `Company profile:
- Industry: ${industry}
- Stage: ${stage}
- Team size: ${teamSize} people
- Current operational gaps: ${gaps.join(", ")}

Generate the intelligent infrastructure roles this company needs to build now and over the next 12–24 months.`;

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: prompt },
        ],
        temperature: 0.4,
        max_tokens: 2000,
      }),
    });

    if (!groqRes.ok) {
      return Response.json({ error: "AI service unavailable. Try again shortly." }, { status: 502 });
    }

    const data = await groqRes.json();
    const raw = data?.choices?.[0]?.message?.content ?? "";

    let result: ForgeOutput;
    try {
      const match = raw.match(/\{[\s\S]*\}/);
      result = JSON.parse(match ? match[0] : raw) as ForgeOutput;
    } catch {
      return Response.json({ error: "AI returned an unexpected response. Try again." }, { status: 500 });
    }

    return Response.json({ demo: false, result });
  } catch {
    return Response.json({ error: "Something went wrong. Try again." }, { status: 502 });
  }
}
