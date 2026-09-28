import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import AuthLayout from "./AuthLayout";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await resetPassword(email);
    setLoading(false);
    if (result.error) setError(result.error);
    else setSent(true);
  };

  return (
    <AuthLayout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <div className="font-mono text-xs text-cyan-600 tracking-widest mb-2">ACCESS RECOVERY</div>
          <h1 className="font-display font-bold text-3xl text-white tracking-wide mb-2">Recover Access</h1>
          <p className="text-slate-500 text-sm">Enter your registered email address to receive a reset link.</p>
        </div>

        {sent ? (
          <div className="space-y-4">
            <div className="px-4 py-3 border border-cyan-800 text-cyan-400 text-sm font-mono" style={{ background: "rgba(34,211,238,0.07)" }}>
              Reset link sent to <strong>{email}</strong>. Check your inbox.
            </div>
            <Link to="/login" className="block text-center text-cyan-500 font-mono text-sm hover:text-cyan-300 mt-4">← Back to Sign In</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="px-3 py-2 border border-red-800 text-red-400 text-sm font-mono" style={{ background: "rgba(239,68,68,0.07)" }}>
                {error}
              </div>
            )}
            <div>
              <label className="block text-xs font-mono text-cyan-700 tracking-widest mb-1">REGISTERED EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="operator@ibvap.gov.in"
                required
                className="w-full px-3 py-2.5 text-sm text-slate-200 font-mono border border-slate-700 focus:border-cyan-500 outline-none transition-colors"
                style={{ background: "rgba(15,23,42,0.8)" }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 font-display font-bold text-sm tracking-widest disabled:opacity-50"
              style={{ background: "#22d3ee", color: "#020817" }}
            >
              {loading ? "SENDING..." : "SEND RESET LINK"}
            </button>
            <div className="text-center mt-4">
              <Link to="/login" className="text-cyan-600 font-mono text-xs hover:text-cyan-400 transition-colors">← Back to Sign In</Link>
            </div>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}
