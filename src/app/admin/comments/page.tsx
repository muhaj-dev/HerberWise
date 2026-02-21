"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { createClient } from "@/lib/supabase/client";
import { approveComment, deleteComment } from "../actions";

interface AdminComment {
  id: string;
  content: string;
  is_approved: boolean;
  created_at: string;
  profiles: { full_name: string } | null;
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"pending" | "approved" | "all">("pending");

  const fetchComments = async () => {
    const supabase = createClient();
    let query = supabase
      .from("comments")
      .select("*, profiles(full_name)")
      .order("created_at", { ascending: false });

    if (filter === "pending") query = query.eq("is_approved", false);
    if (filter === "approved") query = query.eq("is_approved", true);

    const { data } = await query;
    setComments((data as AdminComment[]) || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [filter]);

  const handleApprove = async (id: string) => {
    await approveComment(id);
    fetchComments();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this comment?")) return;
    await deleteComment(id);
    fetchComments();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1C3A2A] mb-6">
        Manage Comments
      </h1>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {(["pending", "approved", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f
                ? "bg-[#1C3A2A] text-white"
                : "bg-white text-[#4A5568] border border-[#E2E8F0] hover:border-[#1C3A2A]"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map((comment) => (
            <Card key={comment.id} className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-[#1C3A2A] text-sm">
                    {comment.profiles?.full_name || "Unknown"}
                  </span>
                  <span className="text-xs text-[#718096]">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      comment.is_approved
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {comment.is_approved ? "Approved" : "Pending"}
                  </span>
                </div>
                <p className="text-[#4A5568] text-sm">{comment.content}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {!comment.is_approved && (
                  <Button
                    variant="filled"
                    size="sm"
                    onClick={() => handleApprove(comment.id)}
                  >
                    Approve
                  </Button>
                )}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(comment.id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-[#718096]">No comments found.</p>
      )}
    </div>
  );
}
