import { FormEvent, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Sparkles } from "lucide-react";

type Mode = "login" | "signup";

export const AuthOverlay = () => {
  const { login, signup, loginAsGuest } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const switchMode = (next: Mode) => {
    setMode(next);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim() || (mode === "signup" && !name.trim())) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      if (mode === "login") await login(email, password);
      else await signup(name, email, password);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ backgroundColor: "hsl(var(--auth-bg))" }}
      role="dialog"
      aria-modal="true"
      aria-label={mode === "login" ? "Sign in to Zyneria" : "Create your Zyneria account"}
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-32 -left-24 h-80 w-80 rounded-full blur-3xl opacity-40"
          style={{ background: "hsl(var(--auth-accent))" }}
        />
        <div
          className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full blur-3xl opacity-30"
          style={{ background: "hsl(var(--auth-secondary))" }}
        />
      </div>

      <div className="auth-glass relative w-full max-w-md rounded-2xl p-7 sm:p-8 shadow-2xl animate-fade-in">
        <header className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl auth-glow-btn animate-glow-pulse">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1
            className="text-2xl font-semibold tracking-tight"
            style={{ color: "hsl(var(--auth-text))" }}
          >
            {mode === "login" ? "Welcome back" : "Join Zyneria"}
          </h1>
          <p className="mt-1 text-sm" style={{ color: "hsl(var(--auth-muted))" }}>
            {mode === "login"
              ? "Sign in to continue to Zyneria"
              : "Create your account in seconds"}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="animate-fade-in">
              <label
                htmlFor="name"
                className="mb-1.5 block text-xs font-medium"
                style={{ color: "hsl(var(--auth-muted))" }}
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="auth-input w-full rounded-lg px-3.5 py-2.5 text-sm transition"
                autoComplete="name"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-medium"
              style={{ color: "hsl(var(--auth-muted))" }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@zyneria.app"
              className="auth-input w-full rounded-lg px-3.5 py-2.5 text-sm transition"
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-medium"
              style={{ color: "hsl(var(--auth-muted))" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="auth-input w-full rounded-lg px-3.5 py-2.5 text-sm transition"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </div>

          {error && (
            <p
              role="alert"
              className="text-sm animate-fade-in"
              style={{ color: "hsl(0 84% 60%)" }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="auth-glow-btn flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading
              ? mode === "login"
                ? "Signing in…"
                : "Creating account…"
              : mode === "login"
                ? "Login"
                : "Sign up"}
          </button>

          <button
            type="button"
            onClick={loginAsGuest}
            disabled={loading}
            className="auth-input w-full rounded-lg px-4 py-2.5 text-sm font-medium transition hover:opacity-80 disabled:opacity-60"
          >
            Continue as Guest
          </button>
        </form>

        <p
          className="mt-6 text-center text-sm"
          style={{ color: "hsl(var(--auth-muted))" }}
        >
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => switchMode(mode === "login" ? "signup" : "login")}
            className="font-semibold underline-offset-4 hover:underline"
            style={{ color: "hsl(var(--auth-accent))" }}
          >
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthOverlay;
