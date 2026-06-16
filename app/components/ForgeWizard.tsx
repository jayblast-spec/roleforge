"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ForgeOutput, Role } from "../api/forge/route";

const INDUSTRIES = [
  { id: "Technology / SaaS", icon: "💻", label: "Technology / SaaS" },
  { id: "Finance & Banking", icon: "🏦", label: "Finance & Banking" },
  { id: "Healthcare", icon: "🏥", label: "Healthcare" },
  { id: "Retail & E-commerce", icon: "🛍️", label: "Retail & E-commerce" },
  { id: "Logistics & Supply Chain", icon: "🚚", label: "Logistics" },
  { id: "Energy & Utilities", icon: "⚡", label: "Energy" },
  { id: "Government & Public Sector", icon: "🏛️", label: "Government" },
  { id: "Education", icon: "🎓", label: "Education" },
  { id: "Media & Entertainment", icon: "🎬", label: "Media" },
];

const STAGES = [
  { id: "Pre-seed / Idea Stage", label: "Pre-seed", sub: "Idea stage, founding team" },
  { id: "Seed Stage", label: "Seed", sub: "First product, early customers" },
  { id: "Early Growth", label: "Early Growth", sub: "PMF found, scaling ops" },
  { id: "Scale-up", label: "Scale-up", sub: "Rapid expansion, 50–500 people" },
  { id: "Enterprise", label: "Enterprise", sub: "500+ people, complex systems" },
];

const GAPS = [
  "AI adoption is lagging behind competitors",
  "No dedicated AI or data strategy",
  "Fragmented systems that don't communicate",
  "Manual workflows dominating operations",
  "Lack of real-time operational visibility",
  "AI compliance and governance exposure",
  "Talent gaps in technical leadership",
  "No adaptive infrastructure under stress",
];

const TEAM_SIZES = [
  { id: "Solo or 1–5", label: "1–5", sub: "Solo founder or tiny team" },
  { id: "6–20", label: "6–20", sub: "Early team" },
  { id: "21–100", label: "21–100", sub: "Growing fast" },
  { id: "101–500", label: "101–500", sub: "Scaling up" },
  { id: "500+", label: "500+", sub: "Enterprise" },
];

const PRIORITY_COLORS: Record<string, string> = {
  "Hire Now": "border-danger/40 bg-danger/10 text-danger",
  "Q1": "border-warn/40 bg-warn/10 text-warn",
  "Q2": "border-accent/40 bg-accent/10 text-accent-2",
  "Year 2": "border-border bg-surface-2 text-muted",
};

const READINESS_COLORS: Record<string, string> = {
  Lagging: "text-danger",
  Developing: "text-warn",
  Maturing: "text-accent-2",
  Leading: "text-success",
};

const FORGE_STEPS = [
  "Analysing your profile...",
  "Mapping intelligence gaps...",
  "Generating role architecture...",
  "Calibrating build sequence...",
  "Finalising your org blueprint...",
];

function RoleCard({ role, index }: { role: Role; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="rounded-2xl border border-border bg-surface p-5 hover:border-accent/40 transition-colors"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-bold text-foreground text-base">{role.title}</h3>
          <p className="text-xs text-muted mt-0.5">{role.department} · Reports to {role.reportsTo}</p>
        </div>
        <span className={`text-xs font-semibold rounded-full border px-2.5 py-1 flex-shrink-0 ${PRIORITY_COLORS[role.priority]}`}>
          {role.priority}
        </span>
      </div>
      <p className="text-sm text-muted leading-relaxed mb-3">{role.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {role.keySkills.map((s) => (
          <span key={s} className="text-xs rounded-full bg-surface-2 border border-border px-2 py-0.5 text-muted">{s}</span>
        ))}
      </div>
      <p className="text-xs font-semibold text-accent-2">{role.salaryRange}</p>
    </motion.div>
  );
}

export default function ForgeWizard() {
  const [step, setStep] = useState(0);
  const [industry, setIndustry] = useState("");
  const [stage, setStage] = useState("");
  const [gaps, setGaps] = useState<string[]>([]);
  const [teamSize, setTeamSize] = useState("");
  const [forging, setForging] = useState(false);
  const [forgeStep, setForgeStep] = useState(0);
  const [result, setResult] = useState<ForgeOutput | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [error, setError] = useState("");

  function toggleGap(g: string) {
    setGaps((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]);
  }

  const forge = useCallback(async () => {
    setForging(true);
    setForgeStep(0);
    setError("");
    const interval = setInterval(() => {
      setForgeStep((i) => Math.min(i + 1, FORGE_STEPS.length - 1));
    }, 800);

    try {
      const res = await fetch("/api/forge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry, stage, gaps, teamSize }),
      });
      clearInterval(interval);
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Something went wrong."); setForging(false); return; }
      setResult(data.result as ForgeOutput);
      setIsDemo(data.demo === true);
      setForging(false);
      setStep(5);
    } catch {
      clearInterval(interval);
      setError("Network error. Try again.");
      setForging(false);
    }
  }, [industry, stage, gaps, teamSize]);

  const slideVariants = {
    enter: { x: 60, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -60, opacity: 0 },
  };

  if (forging) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative mx-auto mb-8 h-24 w-24">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-accent/30 border-t-accent"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-3 rounded-full bg-accent/20 flex items-center justify-center"
            >
              <span className="text-2xl">⚒️</span>
            </motion.div>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Forging your org blueprint</h2>
          <p className="text-sm text-muted mb-8">Building intelligence infrastructure roles for your profile</p>
          <div className="space-y-2 text-left w-64 mx-auto">
            {FORGE_STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full flex-shrink-0 transition-colors duration-500 ${i < forgeStep ? "bg-success" : i === forgeStep ? "bg-accent forge-pulse" : "bg-border"}`} />
                <span className={`text-xs transition-colors duration-300 ${i <= forgeStep ? "text-muted" : "text-border"}`}>{s}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (step === 5 && result) {
    return (
      <div className="min-h-screen px-4 py-16">
        <div className="mx-auto max-w-3xl">
          {isDemo && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 rounded-xl border border-warn/30 bg-warn/10 px-4 py-2 text-xs text-warn">
              Demo blueprint — add Groq API key for a real analysis tailored to your company.
            </motion.div>
          )}

          {/* Readiness header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 rounded-2xl border border-border bg-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-1">AI Infrastructure Readiness</p>
            <div className="flex items-center gap-4 mb-3">
              <span className={`text-4xl font-bold ${READINESS_COLORS[result.readinessLabel]}`}>{result.readinessLabel}</span>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-muted">Score</span>
                  <span className="text-xs font-bold text-foreground">{result.readinessScore}/100</span>
                </div>
                <div className="h-2 rounded-full bg-surface-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.readinessScore}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full rounded-full bg-accent"
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-muted leading-relaxed">{result.summary}</p>
          </motion.div>

          {/* Roles */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">Roles to build · {result.roles.length} identified</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {result.roles.map((role, i) => <RoleCard key={i} role={role} index={i} />)}
            </div>
          </motion.div>

          {/* Build sequence */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6 rounded-2xl border border-accent/20 bg-accent-soft p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Build sequence</p>
            {result.buildSequence.map((step, i) => (
              <div key={i} className="flex gap-3 mb-3 last:mb-0">
                <span className="text-accent font-bold text-sm flex-shrink-0 w-5">{i + 1}.</span>
                <p className="text-sm text-muted">{step}</p>
              </div>
            ))}
          </motion.div>

          {/* Warning */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 rounded-2xl border border-danger/30 bg-danger/8 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-danger/80 mb-2">Critical warning</p>
            <p className="text-sm text-muted">{result.criticalWarning}</p>
          </motion.div>

          {/* Start over */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8 text-center">
            <button
              onClick={() => { setStep(0); setResult(null); setIndustry(""); setStage(""); setGaps([]); setTeamSize(""); }}
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              ← Forge a new blueprint
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Progress bar */}
      <div className="h-0.5 bg-surface-2">
        <motion.div
          className="h-full bg-accent"
          animate={{ width: `${(step / 4) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <AnimatePresence mode="wait">
          {/* Step 0: Industry */}
          {step === 0 && (
            <motion.div key="s0" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="w-full max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Step 1 of 4</p>
              <h2 className="text-2xl font-bold text-foreground mb-2">What&apos;s your industry?</h2>
              <p className="text-sm text-muted mb-8">We&apos;ll generate roles specific to how intelligence infrastructure is evolving in your sector.</p>
              <div className="grid grid-cols-3 gap-3">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => { setIndustry(ind.id); setTimeout(() => setStep(1), 200); }}
                    className={`rounded-2xl border p-4 text-left transition-all hover:border-accent/60 ${industry === ind.id ? "border-accent bg-accent-soft" : "border-border bg-surface hover:bg-surface-2"}`}
                  >
                    <span className="text-2xl block mb-2">{ind.icon}</span>
                    <span className="text-sm font-medium text-foreground">{ind.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 1: Stage */}
          {step === 1 && (
            <motion.div key="s1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="w-full max-w-lg">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Step 2 of 4</p>
              <h2 className="text-2xl font-bold text-foreground mb-2">What stage is your company?</h2>
              <p className="text-sm text-muted mb-8">The roles you need depend heavily on how fast you&apos;re growing and how complex your systems are.</p>
              <div className="space-y-3">
                {STAGES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setStage(s.id); setTimeout(() => setStep(2), 200); }}
                    className={`w-full rounded-2xl border px-5 py-4 text-left transition-all hover:border-accent/60 ${stage === s.id ? "border-accent bg-accent-soft" : "border-border bg-surface hover:bg-surface-2"}`}
                  >
                    <p className="font-semibold text-foreground">{s.label}</p>
                    <p className="text-xs text-muted mt-0.5">{s.sub}</p>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(0)} className="mt-6 text-xs text-muted hover:text-foreground transition-colors">← Back</button>
            </motion.div>
          )}

          {/* Step 2: Gaps */}
          {step === 2 && (
            <motion.div key="s2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="w-full max-w-lg">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Step 3 of 4</p>
              <h2 className="text-2xl font-bold text-foreground mb-2">Where are your gaps?</h2>
              <p className="text-sm text-muted mb-8">Select all that apply. These gaps shape which roles you need most urgently.</p>
              <div className="space-y-2 mb-6">
                {GAPS.map((g) => (
                  <button
                    key={g}
                    onClick={() => toggleGap(g)}
                    className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${gaps.includes(g) ? "border-accent bg-accent-soft text-foreground" : "border-border bg-surface text-muted hover:border-accent/40"}`}
                  >
                    <span className={`h-4 w-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${gaps.includes(g) ? "bg-accent border-accent" : "border-border"}`}>
                      {gaps.includes(g) && <span className="text-white text-[10px]">✓</span>}
                    </span>
                    {g}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="text-xs text-muted hover:text-foreground transition-colors">← Back</button>
                <button
                  onClick={() => setStep(3)}
                  disabled={gaps.length === 0}
                  className="ml-auto rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Next →
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Team size */}
          {step === 3 && (
            <motion.div key="s3" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="w-full max-w-lg">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Step 4 of 4</p>
              <h2 className="text-2xl font-bold text-foreground mb-2">How big is your team?</h2>
              <p className="text-sm text-muted mb-8">Team size determines the depth and sequence of roles you can realistically build.</p>
              <div className="space-y-3 mb-6">
                {TEAM_SIZES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTeamSize(t.id)}
                    className={`w-full flex items-center justify-between rounded-2xl border px-5 py-4 transition-all hover:border-accent/60 ${teamSize === t.id ? "border-accent bg-accent-soft" : "border-border bg-surface hover:bg-surface-2"}`}
                  >
                    <div>
                      <p className="font-semibold text-foreground">{t.label} people</p>
                      <p className="text-xs text-muted mt-0.5">{t.sub}</p>
                    </div>
                    {teamSize === t.id && <span className="text-accent text-lg">✓</span>}
                  </button>
                ))}
              </div>
              {error && <p className="text-xs text-danger mb-3">{error}</p>}
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="text-xs text-muted hover:text-foreground transition-colors">← Back</button>
                <button
                  onClick={forge}
                  disabled={!teamSize}
                  className="ml-auto rounded-xl bg-accent px-8 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Forge my blueprint ⚒️
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
