"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/client";

const signupSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupForm = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
    setIsLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Leaf className="h-8 w-8 text-[#2D5A3D]" />
            <span className="text-2xl font-bold text-[#1C3A2A]">HerbWise</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1C3A2A] mb-3">
            Check your email
          </h1>
          <p className="text-[#718096] text-sm mb-6">
            We&apos;ve sent a confirmation link to your email address. Please
            click the link to verify your account.
          </p>
          <Link href="/auth/login">
            <Button variant="outline">Back to Sign In</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Leaf className="h-8 w-8 text-[#2D5A3D]" />
          <span className="text-2xl font-bold text-[#1C3A2A]">HerbWise</span>
        </div>

        <h1 className="text-2xl font-bold text-[#1C3A2A] text-center mb-2">
          Create an account
        </h1>
        <p className="text-[#718096] text-center text-sm mb-6">
          Join HerbWise to save remedies and leave comments
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1C3A2A] mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("fullName")}
              className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm text-[#4A5568] focus:outline-none focus:ring-2 focus:ring-[#2D5A3D]"
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

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

          <div>
            <label className="block text-sm font-medium text-[#1C3A2A] mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm text-[#4A5568] focus:outline-none focus:ring-2 focus:ring-[#2D5A3D]"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="filled"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-sm text-[#718096] mt-6">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-[#2D5A3D] font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
