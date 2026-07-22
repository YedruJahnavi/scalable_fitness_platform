"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button }   from "@/components/ui/button";
import { Card }     from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input }    from "@/components/ui/input";
import {
  EyeIcon, EyeOffIcon,
  Mail, Lock, Zap, AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Main component ─────────────────────────────────────────── */
export function LoginPage1({ onSubmit, isLoading = false, error = "" }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) await onSubmit(email, password);
  };

  return (
    <section className="relative isolate flex min-h-dvh w-full items-center justify-center overflow-hidden bg-slate-50">
      <div className="relative z-10 w-full max-w-md px-4 py-12">
        <Card className="w-full border border-slate-200 bg-white p-8 shadow-md rounded-3xl">

          {/* ── Brand header ── */}
          <div className="mb-8 flex flex-col items-center gap-4">
            {/* Logo mark */}
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-sm text-white">
              <Zap className="h-7 w-7" fill="currentColor" />
            </div>

            <div className="text-center">
              <h1 className="font-space text-2xl font-bold tracking-tight text-slate-900">
                Welcome back
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Sign in to continue your fitness journey
              </p>
            </div>
          </div>

          {/* ── Error banner ── */}
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-50 px-4 py-3">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div className="relative">
              <Input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className={cn(
                  "h-11 border-slate-200 bg-white pl-10 text-sm text-slate-900 placeholder:text-slate-400",
                  "rounded-xl focus-visible:ring-blue-600 focus-visible:border-blue-600 focus-visible:ring-offset-0",
                  "transition-colors"
                )}
              />
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>

            {/* Password */}
            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className={cn(
                  "h-11 border-slate-200 bg-white pl-10 pr-11 text-sm text-slate-900 placeholder:text-slate-400",
                  "rounded-xl focus-visible:ring-blue-600 focus-visible:border-blue-600 focus-visible:ring-offset-0",
                  "transition-colors"
                )}
              />
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-9 w-9 -translate-y-1/2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                onClick={() => setShowPassword((p) => !p)}
              >
                {showPassword
                  ? <EyeIcon className="h-4 w-4" />
                  : <EyeOffIcon className="h-4 w-4" />
                }
              </Button>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <Checkbox
                  id="login-remember"
                  checked={remember}
                  onCheckedChange={setRemember}
                  className="border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-white"
                />
                <span className="text-sm text-slate-500">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-blue-600 underline-offset-4 hover:underline transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <Button
              id="login-submit"
              type="submit"
              disabled={isLoading}
              className={cn(
                "h-11 w-full rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-sm",
                "hover:bg-blue-700",
                "disabled:opacity-60 disabled:cursor-not-allowed",
                "transition-all duration-200"
              )}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Signing in…
                </span>
              ) : (
                "Sign In"
              )}
            </Button>


          </form>

          {/* ── Footer ── */}
          <p className="mt-7 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 underline-offset-4 hover:underline font-medium"
            >
              Create one
            </Link>
          </p>
        </Card>

        {/* Small branding line below the card */}
        <p className="mt-5 text-center text-xs text-slate-400">
          FitTrack Elite Core · Secure, encrypted session
        </p>
      </div>
    </section>
  );
}

export default LoginPage1;
