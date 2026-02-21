"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { createClient } from "@/lib/supabase/client";
import { publishHerb, deleteHerb } from "../actions";
import { Leaf, Plus, Eye, EyeOff, Trash2 } from "lucide-react";
import Link from "next/link";

interface AdminHerb {
  id: string;
  name: string;
  slug: string;
  latin_name: string;
  is_published: boolean;
  created_at: string;
}

export default function AdminHerbsPage() {
  const [herbs, setHerbs] = useState<AdminHerb[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHerbs = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("herbs")
      .select("id, name, slug, latin_name, is_published, created_at")
      .order("name");
    setHerbs((data as AdminHerb[]) || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchHerbs();
  }, []);

  const handleTogglePublish = async (herb: AdminHerb) => {
    await publishHerb(herb.id, !herb.is_published);
    fetchHerbs();
  };

  const handleDelete = async (herb: AdminHerb) => {
    if (!confirm(`Delete "${herb.name}"? This cannot be undone.`)) return;
    await deleteHerb(herb.id);
    fetchHerbs();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1C3A2A]">Manage Herbs</h1>
        <Link href="/admin/herbs/new">
          <Button variant="filled" size="sm">
            <Plus className="h-4 w-4 mr-1 inline" />
            Add Herb
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : herbs.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F8FAF8] border-b border-[#E2E8F0]">
                <th className="text-left text-xs font-semibold text-[#718096] px-6 py-3">
                  Name
                </th>
                <th className="text-left text-xs font-semibold text-[#718096] px-6 py-3">
                  Latin Name
                </th>
                <th className="text-left text-xs font-semibold text-[#718096] px-6 py-3">
                  Status
                </th>
                <th className="text-right text-xs font-semibold text-[#718096] px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {herbs.map((herb) => (
                <tr
                  key={herb.id}
                  className="border-b border-[#E2E8F0] last:border-0"
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-[#2D5A3D]" />
                      <span className="text-sm font-medium text-[#1C3A2A]">
                        {herb.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-[#718096] italic">
                    {herb.latin_name}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        herb.is_published
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {herb.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/herbs/${herb.id}`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <button
                        onClick={() => handleTogglePublish(herb)}
                        className="p-1.5 text-[#718096] hover:text-[#2D5A3D] transition-colors"
                        title={
                          herb.is_published ? "Unpublish" : "Publish"
                        }
                      >
                        {herb.is_published ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(herb)}
                        className="p-1.5 text-[#718096] hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-[#718096]">No herbs found.</p>
      )}
    </div>
  );
}
