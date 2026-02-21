"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/client";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Leaf className="h-8 w-8 text-[#2D5A3D]" />
          <span className="text-2xl font-bold text-[#1C3A2A]">HerbWise</span>
        </div>

        <h1 className="text-2xl font-bold text-[#1C3A2A] text-center mb-2">
          Welcome back
        </h1>
        <p className="text-[#718096] text-center text-sm mb-6">
          Sign in to your account to continue
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1C3A2A] mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm text-[#4A5568] focus:outline-none focus:ring-2 focus:ring-[#2D5A3D]"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1C3A2A] mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm text-[#4A5568] focus:outline-none focus:ring-2 focus:ring-[#2D5A3D]"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="filled"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm text-[#718096] mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-[#2D5A3D] font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
}
