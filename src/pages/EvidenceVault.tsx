import { useState } from "react";
import { DEMO_EVIDENCE } from "../services/demoData";
import type { Evidence } from "../types";

const RISK_COLORS: Record<string, string> = { CRITICAL: "#ef4444", HIGH: "#f97316", MEDIUM: "#f59e0b", LOW: "#22c55e" };
const STATUS_COLORS: Record<string, string> = { VERIFIED: "#22c55e", PENDING: "#f59e0b", FLAGGED: "#ef4444" };

export default function EvidenceVault() {
  const [evidence] = useState<Evidence[]>(DEMO_EVIDENCE);
  const [filterRisk, setFilterRisk] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const filtered = evidence.filter(e =>
    (filterRisk === "ALL" || e.risk_level === filterRisk) &&
    (filterStatus === "ALL" || e.operator_status === filterStatus)
  );

  const downloadMetadata = (ev: Evidence) => {
    const data = JSON.stringify({ ...ev, image_url: undefined, video_url: undefined }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${ev.evidence_id}-metadata.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="font-mono text-xs text-cyan-700 tracking-widest">IBVAP / EVIDENCE</div>
          <h1 className="font-display font-bold text-2xl text-white tracking-wide">Evidence Vault</h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"].map(r => (
            <button key={r} onClick={() => setFilterRisk(r)} className={`px-2 py-0.5 font-mono text-xs border transition-colors ${filterRisk === r ? "border-cyan-500 text-cyan-400" : "border-slate-700 text-slate-500 hover:border-slate-600"}`}>
              {r}
            </button>
          ))}
          <div className="w-px h-4 bg-slate-800" />
          {["ALL", "VERIFIED", "PENDING", "FLAGGED"].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`px-2 py-0.5 font-mono text-xs border transition-colors ${filterStatus === s ? "border-cyan-500 text-cyan-400" : "border-slate-700 text-slate-500 hover:border-slate-600"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map(ev => (
          <div key={ev.id} className="glass-panel p-3 space-y-3">
            {/* Evidence image placeholder */}
            <div className="relative h-32 overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0f1e, #0f172a)" }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-mono text-xs text-cyan-600">{ev.evidence_id}</div>
                  <div className="font-mono text-[10px] text-slate-700 mt-1">EVIDENCE FRAME</div>
                </div>
              </div>
              {/* Corner brackets */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-cyan-700" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-cyan-700" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-cyan-700" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-cyan-700" />
              <div className="absolute top-1 right-1 px-1.5 py-0.5 font-mono text-[9px]" style={{ background: `${RISK_COLORS[ev.risk_level || "LOW"]}20`, color: RISK_COLORS[ev.risk_level || "LOW"], border: `1px solid ${RISK_COLORS[ev.risk_level || "LOW"]}40` }}>
                {ev.risk_level}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-1 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-600">Evidence ID</span>
                <span className="text-cyan-400">{ev.evidence_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Incident</span>
                <span className="text-slate-300">{ev.incident_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Camera</span>
                <span className="text-slate-300">{ev.camera_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Object</span>
                <span className="text-slate-300">{ev.object_class} / {ev.tracking_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Confidence</span>
                <span className="text-slate-300">{ev.confidence}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Threat Score</span>
                <span style={{ color: RISK_COLORS[ev.risk_level || "LOW"] }}>{ev.threat_score}/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Status</span>
                <span style={{ color: STATUS_COLORS[ev.operator_status] }}>{ev.operator_status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Timestamp</span>
                <span className="text-slate-500 text-[10px]">{new Date(ev.timestamp).toLocaleString()}</span>
              </div>
            </div>

            {/* Hash */}
            <div className="border-t border-slate-800 pt-2">
              <div className="font-mono text-[9px] text-slate-700 break-all">{ev.hash}</div>
            </div>

            {/* Actions */}
            <div className="flex gap-1.5">
              <button className="flex-1 py-1 font-mono text-[10px] text-cyan-400 border border-cyan-900 hover:border-cyan-600 transition-colors">VIEW</button>
              <button onClick={() => downloadMetadata(ev)} className="flex-1 py-1 font-mono text-[10px] text-slate-400 border border-slate-700 hover:border-slate-500 transition-colors">METADATA</button>
              <button className="flex-1 py-1 font-mono text-[10px] text-slate-400 border border-slate-700 hover:border-slate-500 transition-colors">INCIDENT</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
