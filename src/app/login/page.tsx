"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

function GoogleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.8 1.1 7.9 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 15 18.9 12 24 12c3 0 5.8 1.1 7.9 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.4 4.3-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.3 35.1 26.8 36 24 36c-5.3 0-9.8-3.3-11.5-8l-6.5 5C9.3 39.6 16.1 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.2 5.3-6 6.8l.1-.1 6.3 5.3C35.2 40.4 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);

    await signIn("google", {
      callbackUrl,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300">
        <div className="card-body p-8 text-center">

          {/* Logo */}
          <div className="mx-auto mb-5">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-primary" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="text-base-content/60 mt-2">
            Sign in to continue shopping with ShopNest
          </p>

          <div className="divider my-6">
            Continue with
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            aria-label="Continue with Google"
            className="btn btn-outline w-full gap-3 hover:scale-[1.02] transition-all duration-200"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Signing in...
              </>
            ) : (
              <>
                <GoogleIcon />
                Continue with Google
              </>
            )}
          </button>

          {/* Footer */}
          <p className="text-sm text-base-content/50 mt-6 leading-relaxed">
            By continuing, you agree to our{" "}
            <a href="/terms" className="link link-primary">
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="link link-primary">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}