import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { isSupabaseConfigured } from "../lib/supabase";

const TOGGLES = [
  { label: "ALERT SOUND", key: "alertSound", defaultVal: true },
  { label: "DEMO MODE SIMULATION", key: "demoSim", defaultVal: true },
  { label: "AUTO-ACKNOWLEDGE LOW ALERTS", key: "autoAck", defaultVal: false },
  { label: "AI DETECTION OVERLAYS", key: "aiOverlays", defaultVal: true },
  { label: "ZONE OVERLAYS", key: "zoneOverlays", defaultVal: true },
];

export default function Settings() {
  const { user, isDemo } = useAuth();
  const [saved, setSaved] = useState(false);
  const [toggles, setToggles] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(TOGGLES.map(t => [t.key, t.defaultVal]))
  );

  const flipToggle = (key: string) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="p-4 space-y-4 max-w-3xl">
      <div>
        <div className="font-mono text-xs text-cyan-700 tracking-widest">IBVAP / SETTINGS</div>
        <h1 className="font-display font-bold text-2xl text-white tracking-wide">Settings</h1>
      </div>

      {/* User info */}
      <div className="glass-panel p-4">
        <div className="font-mono text-xs text-cyan-400 mb-4">OPERATOR PROFILE</div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 border border-cyan-700 flex items-center justify-center font-mono text-xl text-cyan-400" style={{ background: "rgba(34,211,238,0.1)" }}>
            {user?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || "O"}
          </div>
          <div>
            <div className="font-mono text-sm text-white">{user?.full_name || "Demo Operator"}</div>
            <div className="font-mono text-xs text-slate-500">{user?.email}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-xs px-1.5 py-0.5 border border-cyan-900 text-cyan-400">{user?.role}</span>
              {isDemo && <span className="font-mono text-xs px-1.5 py-0.5 border border-amber-800 text-amber-400">DEMO MODE</span>}
            </div>
          </div>
        </div>
        {!isDemo && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[["Full Name", user?.full_name || ""], ["Email", user?.email || ""]].map(([label, val]) => (
              <div key={label}>
                <label className="block font-mono text-[10px] text-cyan-700 mb-1">{(label as string).toUpperCase()}</label>
                <input defaultValue={val as string} className="w-full px-3 py-2 font-mono text-sm text-slate-200 border border-slate-700 focus:border-cyan-500 outline-none" style={{ background: "rgba(15,23,42,0.8)" }} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Platform config */}
      <div className="glass-panel p-4">
        <div className="font-mono text-xs text-cyan-400 mb-4">PLATFORM CONFIGURATION</div>
        <div className="space-y-3">
          {TOGGLES.map(({ label, key }) => (
            <div key={key} className="flex items-center justify-between py-2 border-b border-slate-800/40">
              <span className="font-mono text-xs text-slate-400">{label}</span>
              <button
                onClick={() => flipToggle(key)}
                className="w-10 h-5 relative rounded-full transition-colors"
                style={{ background: toggles[key] ? "rgba(34,211,238,0.2)" : "rgba(51,65,85,0.5)", border: `1px solid ${toggles[key] ? "#22d3ee40" : "#33415580"}` }}
              >
                <div className="absolute top-0.5 h-4 w-4 rounded-full transition-all" style={{ left: toggles[key] ? "calc(100% - 18px)" : "2px", background: toggles[key] ? "#22d3ee" : "#475569" }} />
              </button>
            </div>
          ))}
        </div>
      </div>

      

      <div className="flex items-center gap-3">
        <button onClick={save} className="px-6 py-2 font-mono text-sm tracking-widest transition-all" style={{ background: "#22d3ee", color: "#020817" }}>
          {saved ? "✓ SAVED" : "SAVE SETTINGS"}
        </button>
        <div className="font-mono text-xs text-slate-600">SIH26187 | BWU NEURAL NEXUS | SMART INDIA HACKATHON 2026</div>
      </div>
    </div>
  );
}
