import React from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { Link } from "react-router-dom";
function Signup() {
    return (
        <div className="min-h-screen flex bg-slate-950">
            {/* Left Side */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-700 via-indigo-700 to-cyan-600" />

                <div className="absolute w-72 h-72 rounded-full bg-pink-500/30 blur-3xl top-10 -left-16"></div>
                <div className="absolute w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl bottom-0 right-0"></div>

                <div className="relative z-10 flex flex-col justify-center px-20 text-white">
                    <span className="inline-flex w-fit rounded-full bg-white/10 px-4 py-2 backdrop-blur-md text-sm">
                        🚀 Join Our Community
                    </span>

                    <h1 className="mt-8 text-6xl font-black leading-tight">
                        Build.
                        <br />
                        Connect.
                        <br />
                        Grow.
                    </h1>

                    <p className="mt-8 text-lg text-slate-200 leading-8 max-w-lg">
                        Create your account and start connecting with developers,
                        sharing ideas, building projects, and growing together.
                    </p>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex w-full lg:w-1/2 items-center justify-center p-6 bg-slate-950">
                <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 shadow-[0_20px_80px_rgba(0,0,0,.5)]">

                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-white">
                            Create Account
                        </h2>

                        <p className="mt-3 text-slate-400">
                            Join thousands of developers today.
                        </p>
                    </div>

                    <form className="mt-10 space-y-6">

                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                        />

                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="john@example.com"
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                        />

                        <Input
                            label="Confirm Password"
                            type="password"
                            placeholder="••••••••"
                        />

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                className="h-5 w-5 accent-violet-600"
                            />

                            <p className="text-sm text-slate-400">
                                I agree to the{" "}
                                <span className="text-violet-400 hover:underline cursor-pointer">
                                    Terms & Conditions
                                </span>
                            </p>
                        </div>

                        <Button>
                            Create Account
                        </Button>

                    </form>

                    <p className="mt-8 text-center text-slate-400">
                        Already have an account?
                        <Link
                            to="/"
                            className="ml-2 font-semibold text-violet-400 hover:text-violet-300 transition"
                        >
                            Sign In
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Signup;