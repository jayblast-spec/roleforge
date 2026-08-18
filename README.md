<div align="center">

# RoleForge

### AI Org-Design Copilot For Founders Building Their First Team

RoleForge is an AI org role generator built on Next.js and Groq. A founder describes a hiring need in plain language and RoleForge forges a role brief — responsibility map, 90-day scorecard, collaboration boundaries, and a hiring brief — through its `/api/forge` and `/api/intelligence` routes, which call Groq's chat completions API and fall back to a deterministic local engine when no key is configured.

<p>
  <a href="https://roleforge-five.vercel.app"><img alt="Live Demo" src="https://img.shields.io/badge/Live-Demo-1D4ED8?style=for-the-badge&logo=vercel&logoColor=white"></a>
  <a href="https://github.com/jayblast-spec/roleforge"><img alt="GitHub Repo" src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white"></a>
</p>

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white">
  <img alt="Framer Motion" src="https://img.shields.io/badge/Framer%20Motion-1D4ED8?style=flat-square&logo=framer&logoColor=white">
  <img alt="Groq" src="https://img.shields.io/badge/Groq-F55036?style=flat-square">
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white">
</p>

<p>
  <img alt="Animated RoleForge headline" src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=18&duration=2600&pause=650&color=1D4ED8&center=true&vCenter=true&width=760&lines=Describe+the+role+you+need;Forge+a+responsibility+map+%2B+scorecard;Org+clarity+without+the+blank+page;Powered+by+Groq+on+Vercel">
</p>

</div>

## What It Does

- Takes a plain-language hiring need (e.g. "founding operations lead who owns support, reporting, vendor follow-up") and turns it into a structured role brief
- Generates a responsibility map, a 90-day scorecard, collaboration boundaries, and a hiring brief for each role
- Scores organizational readiness ("Lagging" → "Leading") and returns a prioritized build sequence for the roles a team is missing
- Runs with zero login and zero cost — no account required to generate output

## How It Works

- `app/api/forge/route.ts` calls Groq's `chat/completions` endpoint against a typed `ForgeOutput` schema (readiness score, role list, build sequence), and degrades to a fixed demo output when `GROQ_API_KEY` is absent, so the product stays usable without a backend.
- UI is a single client component (`app/page.tsx`) built with Tailwind CSS 4 and Framer Motion, no database or auth layer.

## Engineering Notes

**The real problem:** "what roles do I need to hire first" is a sequencing problem, not a list problem — a founder who hires a designer before validating the idea and a founder who hires an engineer too late are both making the same mistake in different directions.

**The approach:** `ForgeOutput` forces the model to return roles *and* a build sequence together, not just a flat list — so the output states not just who to hire but in what order, tied to a readiness score for the stage the company is actually at.

**One real number:** the demo fallback is a fully worked role list and build sequence, not a placeholder — the product is honestly demoable without a Groq key.

**Not handled yet:** `app/api/intelligence` is a separate, disconnected decorative endpoint (`lib/product-engine.ts`) — it does not call Groq and isn't part of the real role-forging pipeline.

## Live

https://roleforge-five.vercel.app

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| UI Library | React 19 |
| AI | Groq (`GROQ_API_KEY`, chat completions) |
| Styling | Tailwind CSS 4 |
| Motion | Framer Motion |
| Deployment | Vercel |

<br>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=rect&height=70&color=0:1D4ED8,55:0B1E3D,100:020617&text=ArkNet%20Digital%20%7C%20RoleForge&fontColor=FAFAFA&fontSize=18&fontAlign=50&animation=fadeIn">
</p>

<p align="center">
Built by <a href="https://arknet.digital">ArkNet Digital</a> · <a href="mailto:michael@arknet.digital">michael@arknet.digital</a>
</p>
