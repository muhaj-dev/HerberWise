"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { createClient } from "@/lib/supabase/client";
import { updateRequestStatus } from "../actions";

interface AdminRequest {
  id: string;
  condition_name: string;
  description: string;
  status: string;
  admin_notes: string | null;
  created_at: string;
  profiles: { full_name: string } | null;
}

const statusOptions = ["pending", "reviewing", "completed", "declined"];
const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  reviewing: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  declined: "bg-red-100 text-red-800",
};

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<AdminRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");

  const fetchRequests = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("remedy_requests")
      .select("*, profiles(full_name)")
      .order("created_at", { ascending: false });
    setRequests((data as AdminRequest[]) || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const startEdit = (req: AdminRequest) => {
    setEditingId(req.id);
    setEditStatus(req.status);
    setEditNotes(req.admin_notes || "");
  };

  const handleSave = async () => {
    if (!editingId) return;
    await updateRequestStatus(editingId, editStatus, editNotes);
    setEditingId(null);
    fetchRequests();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1C3A2A] mb-6">
        Remedy Requests
      </h1>

      {isLoading ? (
        <LoadingSpinner />
      ) : requests.length > 0 ? (
        <div className="space-y-3">
          {requests.map((req) => (
            <Card key={req.id}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-[#1C3A2A]">
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
                  <p className="text-[#4A5568] text-sm mb-2">
                    {req.description}
                  </p>
                  <p className="text-xs text-[#718096]">
                    by {req.profiles?.full_name || "Unknown"} ·{" "}
                    {new Date(req.created_at).toLocaleDateString()}
                  </p>
                  {req.admin_notes && (
                    <p className="text-xs text-[#718096] mt-1 italic">
                      Admin: {req.admin_notes}
                    </p>
                  )}
                </div>
                <div className="flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startEdit(req)}
                  >
                    Update
                  </Button>
                </div>
              </div>

              {editingId === req.id && (
                <div className="mt-4 pt-4 border-t border-[#E2E8F0] space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#1C3A2A] mb-1">
                      Status
                    </label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A3D]"
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1C3A2A] mb-1">
                      Admin Notes
                    </label>
                    <textarea
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A3D] resize-none"
                      rows={2}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="filled" size="sm" onClick={handleSave}>
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-[#718096]">No remedy requests found.</p>
      )}
    </div>
  );
}
