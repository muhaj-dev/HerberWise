"use client";

import React, { useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { createClient } from "@/lib/supabase/client";
import { updateUserRole } from "../actions";

interface AdminUser {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    setUsers((data as AdminUser[]) || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleRole = async (user: AdminUser) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    if (
      !confirm(
        `Change ${user.full_name || "this user"}'s role to ${newRole}?`
      )
    )
      return;
    await updateUserRole(user.id, newRole as "user" | "admin");
    fetchUsers();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1C3A2A] mb-6">Manage Users</h1>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F8FAF8] border-b border-[#E2E8F0]">
                <th className="text-left text-xs font-semibold text-[#718096] px-6 py-3">
                  Name
                </th>
                <th className="text-left text-xs font-semibold text-[#718096] px-6 py-3">
                  Role
                </th>
                <th className="text-left text-xs font-semibold text-[#718096] px-6 py-3">
                  Joined
                </th>
                <th className="text-right text-xs font-semibold text-[#718096] px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-[#E2E8F0] last:border-0"
                >
                  <td className="px-6 py-3">
                    <p className="text-sm font-medium text-[#1C3A2A]">
                      {user.full_name || "—"}
                    </p>
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-[#718096]">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleRole(user)}
                    >
                      {user.role === "admin" ? "Demote" : "Promote"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
