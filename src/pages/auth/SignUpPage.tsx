import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import AuthLayout from "./AuthLayout";

export default function SignUpPage() {
  const { signUp, signInWithGoogle } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    const result = await signUp(email, password, name);
    setLoading(false);
    if (result.error) setError(result.error);
    else setSuccess(true);
  };

  if (success) return (
    <AuthLayout>
      <div className="animate-fade-in text-center space-y-4">
        <div className="w-12 h-12 border border-cyan-400 flex items-center justify-center mx-auto" style={{ background: "rgba(34,211,238,0.1)" }}>
          <span className="text-cyan-400 text-xl">✓</span>
        </div>
        <h2 className="font-display font-bold text-2xl text-white">Account Created</h2>
        <p className="text-slate-400 text-sm">Check your email to confirm your account before signing in.</p>
        <Link to="/login" className="block mt-4 text-cyan-500 font-mono text-sm hover:text-cyan-300">← Back to Sign In</Link>
      </div>
    </AuthLayout>
  );

  return (
    <AuthLayout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <div className="font-mono text-xs text-cyan-600 tracking-widest mb-2">OPERATOR REGISTRATION</div>
          <h1 className="font-display font-bold text-3xl text-white tracking-wide mb-2">Create Operator Account</h1>
          <p className="text-slate-500 text-sm">Register for secure platform access.</p>
        </div>

        {error && (
          <div className="mb-4 px-3 py-2 border border-red-800 text-red-400 text-sm font-mono" style={{ background: "rgba(239,68,68,0.07)" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "FULL NAME", type: "text", value: name, set: setName, placeholder: "Operator Full Name" },
            { label: "EMAIL ADDRESS", type: "email", value: email, set: setEmail, placeholder: "operator@ibvap.gov.in" },
            { label: "PASSWORD", type: "password", value: password, set: setPassword, placeholder: "Min. 8 characters" },
            { label: "CONFIRM PASSWORD", type: "password", value: confirm, set: setConfirm, placeholder: "Repeat password" },
          ].map(({ label, type, value, set, placeholder }) => (
            <div key={label}>
              <label className="block text-xs font-mono text-cyan-700 tracking-widest mb-1">{label}</label>
              <input
                type={type}
                value={value}
                onChange={e => set(e.target.value)}
                placeholder={placeholder}
                required
                className="w-full px-3 py-2.5 text-sm text-slate-200 font-mono border border-slate-700 focus:border-cyan-500 outline-none transition-colors"
                style={{ background: "rgba(15,23,42,0.8)" }}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 font-display font-bold text-sm tracking-widest disabled:opacity-50 transition-all"
            style={{ background: "#22d3ee", color: "#020817" }}
          >
            {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-800" />
          <span className="text-slate-600 text-xs font-mono">OR</span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        <button
          onClick={() => signInWithGoogle()}
          className="w-full py-2.5 border border-slate-700 text-slate-300 text-sm font-mono tracking-wide hover:border-slate-500 transition-colors flex items-center justify-center gap-2"
          style={{ background: "rgba(15,23,42,0.5)" }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continue with Google
        </button>

        <div className="mt-6 text-center">
          <span className="text-slate-600 text-xs">Already have an account? </span>
          <Link to="/login" className="text-cyan-500 text-xs font-mono hover:text-cyan-300 transition-colors">Sign In</Link>
        </div>
      </div>
    </AuthLayout>
  );
}
