const ALL_TOOLS = [
  { name: "BriefOS", desc: "AI intelligence brief generator", url: "https://briefos-silk.vercel.app", live: true },
  { name: "PostCraft", desc: "LinkedIn & X post writer", url: "https://postcraft-one.vercel.app", live: true },
  { name: "InvoiceKit", desc: "Professional invoice builder", url: "https://invoicekit-pi.vercel.app", live: true },
  { name: "DayForge", desc: "AI daily time-block planner", url: "https://dayforge-psi.vercel.app", live: true },
  { name: "MeetingMind", desc: "Meeting notes → actions", url: "https://meetingmind-pied-one.vercel.app", live: true },
  { name: "DevPulse", desc: "GitHub profile analytics", url: "https://devpulse-drab-alpha.vercel.app", live: true },
  { name: "PitchReady", desc: "Startup idea analyzer", url: "https://pitchready-two.vercel.app", live: true },
  { name: "ContractLens", desc: "Contract risk scanner", url: "https://contractlens-rho.vercel.app", live: true },
  { name: "ExposureWatch", desc: "Digital exposure checker", url: "https://exposure-watch.vercel.app", live: true },
  { name: "PortGuard", desc: "IP & port scanner", url: "https://portguard-six.vercel.app", live: true },
  { name: "SafeLink", desc: "URL phishing scanner", url: "https://safelink-wheat.vercel.app", live: true },
  { name: "SubnetPilot", desc: "CIDR subnet calculator", url: "https://subnetpilot.vercel.app", live: true },
  { name: "ThreatPulse", desc: "CVE threat feed", url: "https://threatpulse-six.vercel.app", live: true },
  { name: "TrustSignal", desc: "Domain security score", url: "https://trustsignal-delta.vercel.app", live: true },
  { name: "BreachCost", desc: "Data breach cost estimator", url: "https://breachcost.vercel.app", live: true },
  { name: "OpsIntel", desc: "Operations intelligence brief", url: null, live: false },
];

const CURRENT = "RoleForge";

export default function Footer() {
  const others = ALL_TOOLS.filter((t) => t.name !== CURRENT);
  return (
    <footer className="border-t border-border px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-6">More free tools</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {others.map((t) =>
            t.live && t.url ? (
              <a key={t.name} href={t.url} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-border bg-surface p-3 hover:border-accent/40 transition-colors group">
                <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{t.name}</p>
                <p className="text-xs text-muted mt-0.5">{t.desc}</p>
              </a>
            ) : (
              <div key={t.name} className="rounded-xl border border-border/40 bg-surface/50 p-3 opacity-50 cursor-default">
                <p className="text-sm font-semibold text-muted">{t.name}</p>
                <p className="text-xs text-muted/60 mt-0.5">{t.desc}</p>
                <span className="text-[10px] text-muted/50 mt-1 block">Coming soon</span>
              </div>
            )
          )}
        </div>
        <p className="mt-10 text-center text-xs text-muted/50">RoleForge · Built by <a href="https://arknet.digital" target="_blank" rel="noopener noreferrer" className="hover:text-muted transition-colors">ArkNet Digital</a></p>
      </div>
    </footer>
  );
}
