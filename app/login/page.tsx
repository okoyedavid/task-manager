"use client";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("demo@taskflow.com");
  const [password, setPassword] = useState("demo123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    router.push("/");
    try {
      const success = await login(email, password);
      if (!success) {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-black text-slate-50`}>
      <section className="md:grid md:grid-cols-2 items-center justify-center">
        <div className="relative h-screen">
          <Image
            alt="login image"
            src="/login.jpeg"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className=" text-white">
              <h1 className="text-center text-8xl">Zentry</h1>
              <p>Welcome back, Login to your account to continue</p>

              <div className="md:hidden rounded-2xl mt-6 max-w-md w-full border border-green-400/20 bg-black/40 backdrop-blur-xl p-4 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6 text-white">
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-green-400 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 `}
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-black/60 text-white border border-green-500/30 placeholder-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-green-400 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 `}
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-black/60 text-white border border-green-500/30 placeholder-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-300 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
                      <p className="text-red-600 dark:text-red-400 text-sm">
                        {error}
                      </p>
                    </div>
                  )}
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-500 hover:bg-green-400 disabled:bg-green-800 text-black font-semibold py-3 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 shadow-[0_0_15px_#00ff88aa]"
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </button>
                </form>
                {/* Footer */}
                <div className="mt-6 text-center">
                  <p className={`text-sm `}>
                    Don&apos;t have an account?{" "}
                    <button className="text-green-400 hover:text-green-300 font-medium transition-colors">
                      Sign up
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-full hidden md:flex items-center justify-center">
          {/* Login Form */}
          <div className="rounded-2xl max-w-md mx-4 w-full border border-green-400/20 bg-black/40 backdrop-blur-xl shadow-[0_0_10px_#00ff88aa] p-6">
            <form onSubmit={handleSubmit} className="space-y-6 text-white">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-green-400 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 `}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-black/60 text-white border border-green-500/30 placeholder-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-green-400 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 `}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-black/60 text-white border border-green-500/30 placeholder-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <p className="text-red-600 dark:text-red-400 text-sm">
                    {error}
                  </p>
                </div>
              )}
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-500 hover:bg-green-400 disabled:bg-green-800 text-black font-semibold py-3 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 shadow-[0_0_15px_#00ff88aa]"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>
            {/* Footer */}
            <div className="mt-6 text-center">
              <p className={`text-sm `}>
                Don&apos;t have an account?{" "}
                <button className="text-green-400 hover:text-green-300 font-medium transition-colors">
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
