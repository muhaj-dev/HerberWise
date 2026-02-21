"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ConditionCard from "@/components/conditions/ConditionCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";
import { useHerb } from "@/hooks/useHerb";
import { useComments } from "@/hooks/useComments";
import { createClient } from "@/lib/supabase/client";

export default function HerbDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { data: herb, isLoading } = useHerb(slug);
  const { data: comments } = useComments(herb?.id, undefined);
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
    if (!commentText.trim() || !user || !herb) return;

    setIsSubmitting(true);
    const supabase = createClient();
    const { error } = await supabase.from("comments").insert({
      user_id: user.id,
      herb_id: herb.id,
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
  if (!herb) return <EmptyState message="Herb not found." />;

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#718096] mb-6">
          <Link href="/herbs" className="hover:text-[#2D5A3D]">
            Herbs
          </Link>
          <span className="mx-2">›</span>
          <span className="text-[#1C3A2A] font-medium">{herb.name}</span>
        </nav>

        {/* Hero Image Placeholder */}
        <div className="w-full h-48 md:h-64 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 text-sm mb-8">
          [IMAGE: {herb.name} hero image placeholder]
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1C3A2A] mb-1">
            {herb.name}
          </h1>
          {herb.latin_name && (
            <p className="text-[#718096] italic mb-3">{herb.latin_name}</p>
          )}
          {herb.herb_tags && herb.herb_tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {herb.herb_tags.map((tag) => (
                <Badge key={tag.id}>{tag.tag}</Badge>
              ))}
            </div>
          )}
          <p className="text-[#4A5568]">{herb.description}</p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 mb-12">
          {herb.traditional_uses && (
            <Card>
              <h2 className="text-xl font-bold text-[#1C3A2A] mb-3">
                Traditional Uses
              </h2>
              <p className="text-[#4A5568] leading-relaxed">
                {herb.traditional_uses}
              </p>
            </Card>
          )}

          {herb.preparation_dosage && (
            <Card>
              <h2 className="text-xl font-bold text-[#1C3A2A] mb-3">
                Preparation & Dosage
              </h2>
              <p className="text-[#4A5568] leading-relaxed">
                {herb.preparation_dosage}
              </p>
            </Card>
          )}

          {herb.safety_warnings && (
            <Card className="border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xl font-bold text-[#1C3A2A] mb-3">
                    Safety & Warnings
                  </h2>
                  <p className="text-[#4A5568] leading-relaxed">
                    {herb.safety_warnings}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Related Conditions */}
        {herb.conditions && herb.conditions.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#1C3A2A] mb-6">
              Helps With
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {herb.conditions.map((condition) => (
                <ConditionCard key={condition.id} condition={condition} />
              ))}
            </div>
          </section>
        )}

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
                placeholder="Share your experience with this herb..."
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
              <p className="text-[#718096] mb-3">Sign in to leave a comment</p>
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
}
