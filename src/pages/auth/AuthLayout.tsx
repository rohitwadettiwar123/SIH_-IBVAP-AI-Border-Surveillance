import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex" style={{ background: "#020817" }}>
      {/* LEFT — cinematic border surveillance visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-10" style={{ background: "linear-gradient(135deg, #020817 0%, #0a1628 50%, #0f1e3d 100%)" }}>
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-bg opacity-60" />

        {/* Scanning line */}
        <div className="absolute left-0 right-0 h-px opacity-20 animate-scan" style={{ background: "linear-gradient(90deg, transparent, #22d3ee, transparent)", top: 0 }} />

        {/* Radar circle */}
        <div className="absolute bottom-20 right-16 w-64 h-64 opacity-10">
          <div className="absolute inset-0 border border-cyan-400 rounded-full" />
          <div className="absolute inset-4 border border-cyan-400 rounded-full" />
          <div className="absolute inset-8 border border-cyan-400 rounded-full" />
          <div className="absolute inset-16 border border-cyan-400 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-32 origin-bottom animate-radar" style={{ background: "linear-gradient(transparent, #22d3ee)", transformOrigin: "bottom center" }} />
        </div>

        {/* Corner HUD markers */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400 opacity-60" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400 opacity-60" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400 opacity-60" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400 opacity-60" />

        {/* Surveillance illustration — abstract border scene with SVG */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg viewBox="0 0 400 300" className="w-4/5 opacity-15" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Horizon */}
            <line x1="0" y1="200" x2="400" y2="200" stroke="#22d3ee" strokeWidth="0.5" />
            {/* Watch tower */}
            <rect x="170" y="100" width="60" height="100" stroke="#22d3ee" strokeWidth="0.8" />
            <rect x="155" y="90" width="90" height="20" stroke="#22d3ee" strokeWidth="0.8" />
            <line x1="200" y1="70" x2="200" y2="90" stroke="#22d3ee" strokeWidth="0.8" />
            <polygon points="200,55 205,70 195,70" stroke="#22d3ee" strokeWidth="0.5" fill="#22d3ee" fillOpacity="0.3" />
            {/* Fence */}
            {[0, 20, 40, 60, 80, 100, 120, 140, 260, 280, 300, 320, 340, 360, 380, 400].map((x, i) => (
              <line key={i} x1={x} y1="185" x2={x} y2="215" stroke="#22d3ee" strokeWidth="0.5" />
            ))}
            <line x1="0" y1="185" x2="155" y2="185" stroke="#22d3ee" strokeWidth="0.5" />
            <line x1="245" y1="185" x2="400" y2="185" stroke="#22d3ee" strokeWidth="0.5" />
            {/* CCTV camera on tower */}
            <rect x="215" y="130" width="15" height="8" rx="2" stroke="#22d3ee" strokeWidth="0.8" />
            <line x1="230" y1="134" x2="240" y2="134" stroke="#22d3ee" strokeWidth="0.8" />
            {/* Detection circles */}
            <circle cx="80" cy="190" r="15" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2,2" />
            <circle cx="80" cy="190" r="25" stroke="#ef4444" strokeWidth="0.3" strokeDasharray="3,4" />
            <text x="70" y="175" fill="#ef4444" fontSize="6" fontFamily="monospace">P-021</text>
            {/* AI scan lines */}
            <line x1="215" y1="134" x2="80" y2="190" stroke="#22d3ee" strokeWidth="0.3" strokeDasharray="4,4" opacity="0.5" />
            <line x1="215" y1="134" x2="320" y2="195" stroke="#22d3ee" strokeWidth="0.3" strokeDasharray="4,4" opacity="0.3" />
            {/* Mountains */}
            <polyline points="0,200 50,155 90,175 130,140 180,180 220,145 270,165 310,135 360,160 400,150 400,200" stroke="#22d3ee" strokeWidth="0.3" fill="none" />
            {/* Stars */}
            {[[20, 30], [60, 20], [120, 40], [300, 25], [350, 35], [380, 15]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1" fill="#22d3ee" opacity="0.6" />
            ))}
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 border border-cyan-400 flex items-center justify-center" style={{ background: "rgba(34,211,238,0.1)" }}>
              <span className="text-cyan-400 text-xs font-mono font-bold">IB</span>
            </div>
            <div>
              <div className="text-cyan-400 font-display font-bold text-xl tracking-widest">IBVAP</div>
              <div className="text-slate-500 font-mono text-xs tracking-wider">INTELLIGENT BORDER VIDEO ANALYTICS PLATFORM</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xs" style={{ fontFamily: "Inter, sans-serif" }}>
              AI-powered surveillance, detection and threat intelligence for intelligent border security.
            </p>
          </div>

          <div className="space-y-2">
            {["Real-time AI Object Detection", "Multi-Camera Surveillance", "Threat Intelligence & Scoring", "Incident Management"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                <span className="text-slate-400 text-xs font-mono">{item}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-cyan-900 pt-4">
            <div className="text-slate-600 font-mono text-xs space-y-1">
              <div>BWU NEURAL NEXUS</div>
              <div>SMART INDIA HACKATHON 2026</div>
              <div className="text-cyan-700">SIH26187</div>
            </div>
          </div>
        </div>

        {/* Status indicators */}
        <div className="absolute top-8 right-8 space-y-1">
          {[["AI ENGINE", "#22d3ee"], ["STREAM", "#22c55e"], ["SECURE", "#22c55e"]].map(([label, color]) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse-cyan" style={{ background: color as string }} />
              <span className="font-mono text-xs" style={{ color: color as string }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — form area */}
      <div className="flex-1 flex items-center justify-center p-8" style={{ background: "#020817" }}>
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
