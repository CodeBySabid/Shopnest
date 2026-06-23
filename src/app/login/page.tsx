"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ShoppingBag, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";


type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const registered = searchParams.get("registered");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push(callbackUrl);
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body p-8">

          {/* Logo */}
          <div className="text-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full inline-block mb-3">
              <ShoppingBag size={40} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p className="text-base-content/60 mt-2">
              Sign in to continue to ShopNest
            </p>
          </div>

          {/* Registration success message */}
          {registered && (
            <div className="alert alert-success mb-4">
              <span>✅ Account created! Please login.</span>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className={`input input-bordered w-full ${errors.email ? "input-error" : ""
                  }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-error text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  className={`input input-bordered w-full pr-10 ${errors.password ? "input-error" : ""
                    }`}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-error text-xs mt-1">
                  {errors.password.message}
                </span>
              )}
              <label className="label flex justify-end">
                <Link
                  href="/forgot-password"
                  className="label-text-alt link link-primary"
                >
                  Forgot password?
                </Link>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="divider">OR</div>

          {/* Google Login */}
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="btn btn-outline w-full gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-sm mt-4">
            New to ShopNest?{" "}
            <Link href="/register" className="link link-primary font-medium">
              Create an account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}