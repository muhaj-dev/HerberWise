"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useRemedyRequests } from "@/hooks/useRemedyRequests";
import { createClient } from "@/lib/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { queryClient } from "@/lib/queryClient";
import type { Profile, Comment } from "@/types";

const requestSchema = z.object({
  conditionName: z.string().min(1, "Condition name is required"),
  description: z.string().min(1, "Description is required"),
});

type RequestForm = z.infer<typeof requestSchema>;

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  reviewing: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  declined: "bg-red-100 text-red-800",
};

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { data: requests, isLoading: requestsLoading } = useRemedyRequests();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RequestForm>({
    resolver: zodResolver(requestSchema),
  });

  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      setProfile(profileData as Profile);

      const { data: commentsData } = await supabase
        .from("comments")
        .select("*, profiles(full_name)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setComments((commentsData as Comment[]) || []);
      setIsLoadingProfile(false);
    };

    loadData();
  }, []);

  const onSubmitRequest = async (data: RequestForm) => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("remedy_requests").insert({
      user_id: user.id,
      condition_name: data.conditionName,
      description: data.description,
    });

    if (!error) {
      reset();
      setSubmitSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["remedy-requests"] });
      setTimeout(() => setSubmitSuccess(false), 3000);
    }
  };

  if (isLoadingProfile) return <LoadingSpinner />;

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1C3A2A] mb-1">
            My Dashboard
          </h1>
          <p className="text-[#718096]">
            Welcome back, {profile?.full_name || "User"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Remedy Requests */}
          <Card>
            <h2 className="text-xl font-bold text-[#1C3A2A] mb-4">
              My Remedy Requests
            </h2>
            {requestsLoading ? (
              <LoadingSpinner />
            ) : requests && requests.length > 0 ? (
              <div className="space-y-3">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className="p-3 border border-[#E2E8F0] rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-[#1C3A2A] text-sm">
                        {req.condition_name}
                      </h3>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          statusColors[req.status] || ""
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>
                    <p className="text-[#718096] text-xs line-clamp-2">
                      {req.description}
                    </p>
                    <p className="text-[#718096] text-xs mt-1">
                      {new Date(req.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#718096] text-sm">
                No remedy requests yet.
              </p>
            )}
          </Card>

          {/* Submit Remedy Request */}
          <Card>
            <h2 className="text-xl font-bold text-[#1C3A2A] mb-4">
              Request a Remedy
            </h2>
            <form onSubmit={handleSubmit(onSubmitRequest)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1C3A2A] mb-1">
                  Condition Name
                </label>
                <input
                  type="text"
                  {...register("conditionName")}
                  className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm text-[#4A5568] focus:outline-none focus:ring-2 focus:ring-[#2D5A3D]"
                  placeholder="e.g. Migraine, Joint Pain..."
                />
                {errors.conditionName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.conditionName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1C3A2A] mb-1">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm text-[#4A5568] focus:outline-none focus:ring-2 focus:ring-[#2D5A3D] resize-none"
                  rows={3}
                  placeholder="Describe your condition and what you're looking for..."
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                variant="filled"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
              {submitSuccess && (
                <p className="text-[#2D5A3D] text-sm font-medium">
                  ✓ Request submitted successfully!
                </p>
              )}
            </form>
          </Card>

          {/* My Comments */}
          <Card className="lg:col-span-2">
            <h2 className="text-xl font-bold text-[#1C3A2A] mb-4">
              My Comments
            </h2>
            {comments.length > 0 ? (
              <div className="space-y-3">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-3 border border-[#E2E8F0] rounded-xl"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          comment.is_approved
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {comment.is_approved ? "Approved" : "Pending"}
                      </span>
                      <span className="text-xs text-[#718096]">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-[#4A5568] text-sm">{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#718096] text-sm">
                No comments yet. Visit an herb or condition page to leave a
                comment.
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
