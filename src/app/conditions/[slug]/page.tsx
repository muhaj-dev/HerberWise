"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import HerbCard from "@/components/herbs/HerbCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";
import { useCondition } from "@/hooks/useCondition";
import { useComments } from "@/hooks/useComments";
import { createClient } from "@/lib/supabase/client";

export default function ConditionDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { data: condition, isLoading } = useCondition(slug);
  const { data: comments } = useComments(undefined, condition?.id);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [user, setUser] = useState<{ id: string } | null>(null);

  React.useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !user || !condition) return;

    setIsSubmitting(true);
    const supabase = createClient();
    const { error } = await supabase.from("comments").insert({
      user_id: user.id,
      condition_id: condition.id,
      content: commentText.trim(),
    });

    if (!error) {
      setCommentText("");
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    }
    setIsSubmitting(false);
  };

  if (isLoading) return <LoadingSpinner />;
  if (!condition)
    return <EmptyState message="Condition not found." />;

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#718096] mb-6">
          <Link href="/conditions" className="hover:text-[#2D5A3D]">
            Conditions
          </Link>
          <span className="mx-2">›</span>
          <span className="text-[#1C3A2A] font-medium">{condition.name}</span>
        </nav>

        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="w-16 h-16 bg-[#E8F0E9] rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
            {condition.emoji || "🌿"}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#1C3A2A] mb-2">
              {condition.name}
            </h1>
            {condition.category && <Badge>{condition.category.name}</Badge>}
            <p className="text-[#4A5568] mt-3">{condition.description}</p>
          </div>
        </div>

        {/* Recommended Herbs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1C3A2A] mb-6">
            Herbal Remedies for {condition.name}
          </h2>
          {condition.herbs && condition.herbs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {condition.herbs.map((herb) => (
                <HerbCard key={herb.id} herb={herb} />
              ))}
            </div>
          ) : (
            <EmptyState message="No herbal remedies linked to this condition yet." />
          )}
        </section>

        {/* Comments Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1C3A2A] mb-6">
            Community Comments
          </h2>

          {comments && comments.length > 0 ? (
            <div className="space-y-4 mb-8">
              {comments.map((comment) => (
                <Card key={comment.id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#D4EAD7] flex items-center justify-center text-[#2D5A3D] font-semibold text-sm flex-shrink-0">
                    {comment.profiles?.full_name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-[#1C3A2A] text-sm">
                        {comment.profiles?.full_name || "Anonymous"}
                      </span>
                      <span className="text-xs text-[#718096]">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-[#4A5568] text-sm">{comment.content}</p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-[#718096] mb-6">
              No comments yet. Be the first to share your experience!
            </p>
          )}

          {user ? (
            <form onSubmit={handleSubmitComment}>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your experience with remedies for this condition..."
                className="w-full p-4 border border-[#E2E8F0] rounded-2xl text-sm text-[#4A5568] focus:outline-none focus:ring-2 focus:ring-[#2D5A3D] resize-none"
                rows={3}
              />
              <div className="mt-3 flex items-center gap-3">
                <Button
                  type="submit"
                  variant="filled"
                  size="sm"
                  disabled={isSubmitting || !commentText.trim()}
                >
                  {isSubmitting ? "Submitting..." : "Submit Comment"}
                </Button>
                {submitSuccess && (
                  <span className="text-[#2D5A3D] text-sm font-medium">
                    ✓ Comment submitted for approval!
                  </span>
                )}
              </div>
            </form>
          ) : (
            <Card className="text-center py-6">
              <p className="text-[#718096] mb-3">
                Sign in to leave a comment
              </p>
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            </Card>
          )}
        </section>

        {/* Safety Note */}
        <div className="bg-[#FEF3C7] border-l-4 border-red-500 rounded-2xl p-6 flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-[#4A5568] text-sm">
            Always consult a healthcare professional before using herbal
            remedies for this condition. The information on this page is for
            educational purposes only and should not replace medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
