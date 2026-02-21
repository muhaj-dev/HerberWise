import React from "react";
import { createClient } from "@/lib/supabase/server";
import Card from "@/components/ui/Card";
import { Sprout, Stethoscope, Mail, MessageSquare } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = createClient();

  const [
    { count: herbCount },
    { count: conditionCount },
    { count: pendingRequestCount },
    { count: pendingCommentCount },
  ] = await Promise.all([
    supabase.from("herbs").select("*", { count: "exact", head: true }),
    supabase.from("conditions").select("*", { count: "exact", head: true }),
    supabase
      .from("remedy_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("comments")
      .select("*", { count: "exact", head: true })
      .eq("is_approved", false),
  ]);

  // Recent requests
  const { data: recentRequests } = await supabase
    .from("remedy_requests")
    .select("*, profiles(full_name)")
    .order("created_at", { ascending: false })
    .limit(5);

  // Recent pending comments
  const { data: recentComments } = await supabase
    .from("comments")
    .select("*, profiles(full_name)")
    .eq("is_approved", false)
    .order("created_at", { ascending: false })
    .limit(5);

  const stats = [
    {
      label: "Total Herbs",
      value: herbCount || 0,
      icon: Sprout,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Total Conditions",
      value: conditionCount || 0,
      icon: Stethoscope,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Pending Requests",
      value: pendingRequestCount || 0,
      icon: Mail,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Pending Comments",
      value: pendingCommentCount || 0,
      icon: MessageSquare,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  const statusColors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800",
    reviewing: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    declined: "bg-red-100 text-red-800",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1C3A2A] mb-6">
        Admin Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}
            >
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1C3A2A]">{stat.value}</p>
              <p className="text-xs text-[#718096]">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Two-column recent data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Remedy Requests */}
        <Card>
          <h2 className="text-lg font-bold text-[#1C3A2A] mb-4">
            Recent Remedy Requests
          </h2>
          {recentRequests && recentRequests.length > 0 ? (
            <div className="space-y-3">
              {recentRequests.map((req: Record<string, unknown>) => (
                <div
                  key={req.id as string}
                  className="flex items-center justify-between py-2 border-b border-[#E2E8F0] last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-[#1C3A2A]">
                      {req.condition_name as string}
                    </p>
                    <p className="text-xs text-[#718096]">
                      by {(req.profiles as Record<string, string>)?.full_name || "Unknown"}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      statusColors[req.status as string] || ""
                    }`}
                  >
                    {req.status as string}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#718096] text-sm">No recent requests.</p>
          )}
        </Card>

        {/* Recent Comments Awaiting Approval */}
        <Card>
          <h2 className="text-lg font-bold text-[#1C3A2A] mb-4">
            Comments Awaiting Approval
          </h2>
          {recentComments && recentComments.length > 0 ? (
            <div className="space-y-3">
              {recentComments.map((comment: Record<string, unknown>) => (
                <div
                  key={comment.id as string}
                  className="py-2 border-b border-[#E2E8F0] last:border-0"
                >
                  <p className="text-sm text-[#4A5568] line-clamp-2">
                    {comment.content as string}
                  </p>
                  <p className="text-xs text-[#718096] mt-1">
                    by {(comment.profiles as Record<string, string>)?.full_name || "Unknown"} ·{" "}
                    {new Date(comment.created_at as string).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#718096] text-sm">No pending comments.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
