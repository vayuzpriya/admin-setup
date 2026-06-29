import React from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    // Temporary login
    localStorage.setItem("token", "dummy-token");

    // Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-indigo-700 to-violet-700"></div>

        <div className="absolute w-72 h-72 rounded-full bg-cyan-400/30 blur-3xl -top-12 -left-12"></div>
        <div className="absolute w-96 h-96 rounded-full bg-violet-500/20 blur-3xl bottom-0 right-0"></div>

        <div className="relative z-10 flex flex-col justify-center px-20 text-white">
          <span className="inline-flex w-fit rounded-full bg-white/10 backdrop-blur-md px-4 py-2 text-sm">
            👋 Welcome Back
          </span>

          <h1 className="mt-8 text-6xl font-black leading-tight">
            Continue
            <br />
            Your Journey.
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-8 text-slate-200">
            Sign in to access your dashboard, manage your projects, connect
            with others, and continue where you left off.
          </p>

          <div className="mt-14 flex gap-10">
            <div>
              <h2 className="text-3xl font-bold">24/7</h2>
              <p className="text-slate-300">Support</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">99.9%</h2>
              <p className="text-slate-300">Uptime</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">Secure</h2>
              <p className="text-slate-300">Authentication</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,.5)]">

          <div className="text-center">
            <h2 className="text-4xl font-bold text-white">
              Sign In
            </h2>

            <p className="mt-3 text-slate-400">
              Welcome back! Please login to your account.
            </p>
          </div>

          <form  onSubmit={handleSubmit} className="mt-10 space-y-6">

            <Input
              label="Email Address"
              type="email"
              placeholder="john@example.com"
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-violet-600"
                />
                Remember me
              </label>

             <Link
  to="/forgot-password"
  className="text-violet-400 hover:text-violet-300 transition"
>
  Forgot Password?
</Link>
            </div>

            <Button type="submit">
              Sign In
            </Button>

          </form>

          <div className="mt-8 border-t border-slate-700 pt-6">
            <p className="text-center text-slate-400">
              Don't have an account?
              <Link
  to="/signup"
  className="ml-2 font-semibold text-violet-400 hover:text-violet-300 transition"
>
  Create Account
</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;