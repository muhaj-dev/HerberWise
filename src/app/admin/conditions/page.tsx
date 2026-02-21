"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { createClient } from "@/lib/supabase/client";
import { upsertCondition, deleteCondition } from "../actions";
import { Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const conditionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  emoji: z.string().min(1, "Emoji is required"),
  category_id: z.string().min(1, "Category is required"),
});

type ConditionForm = z.infer<typeof conditionSchema>;

interface AdminCondition {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  description: string;
  category_id: string;
  category: { name: string; emoji: string } | null;
}

interface AdminCategory {
  id: string;
  name: string;
  emoji: string;
}

export default function AdminConditionsPage() {
  const [conditions, setConditions] = useState<AdminCondition[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ConditionForm>({
    resolver: zodResolver(conditionSchema),
  });

  const fetchData = async () => {
    const supabase = createClient();
    const [{ data: condData }, { data: catData }] = await Promise.all([
      supabase
        .from("conditions")
        .select("*, category:categories(name, emoji)")
        .order("name"),
      supabase.from("categories").select("id, name, emoji").order("name"),
    ]);
    setConditions((condData as AdminCondition[]) || []);
    setCategories((catData as AdminCategory[]) || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const startEdit = (cond: AdminCondition) => {
    setEditingId(cond.id);
    setShowForm(true);
    setValue("name", cond.name);
    setValue("slug", cond.slug);
    setValue("description", cond.description);
    setValue("emoji", cond.emoji);
    setValue("category_id", cond.category_id);
  };

  const startNew = () => {
    setEditingId(null);
    setShowForm(true);
    reset();
  };

  const onSubmit = async (data: ConditionForm) => {
    await upsertCondition({
      id: editingId || undefined,
      ...data,
    });
    setShowForm(false);
    setEditingId(null);
    reset();
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this condition?")) return;
    await deleteCondition(id);
    fetchData();
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm text-[#4A5568] focus:outline-none focus:ring-2 focus:ring-[#2D5A3D]";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1C3A2A]">
          Manage Conditions
        </h1>
        <Button variant="filled" size="sm" onClick={startNew}>
          <Plus className="h-4 w-4 mr-1 inline" />
          Add Condition
        </Button>
      </div>

      {/* Create/Edit Form */}
      {showForm && (
        <Card className="mb-6">
          <h2 className="text-lg font-bold text-[#1C3A2A] mb-4">
            {editingId ? "Edit Condition" : "New Condition"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#1C3A2A] mb-1">
                  Name *
                </label>
                <input {...register("name")} className={inputClass} />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-[#1C3A2A] mb-1">
                  Slug *
                </label>
                <input {...register("slug")} className={inputClass} />
                {errors.slug && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.slug.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-[#1C3A2A] mb-1">
                  Emoji *
                </label>
                <input {...register("emoji")} className={inputClass} />
                {errors.emoji && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emoji.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#1C3A2A] mb-1">
                Category *
              </label>
              <select {...register("category_id")} className={inputClass}>
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.category_id.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-[#1C3A2A] mb-1">
                Description *
              </label>
              <textarea
                {...register("description")}
                className={`${inputClass} resize-none`}
                rows={3}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="submit" variant="filled" disabled={isSubmitting}>
                {isSubmitting
                  ? "Saving..."
                  : editingId
                  ? "Save Changes"
                  : "Create Condition"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  reset();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Table */}
      {isLoading ? (
        <LoadingSpinner />
      ) : conditions.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F8FAF8] border-b border-[#E2E8F0]">
                <th className="text-left text-xs font-semibold text-[#718096] px-6 py-3">
                  Condition
                </th>
                <th className="text-left text-xs font-semibold text-[#718096] px-6 py-3">
                  Category
                </th>
                <th className="text-right text-xs font-semibold text-[#718096] px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {conditions.map((cond) => (
                <tr
                  key={cond.id}
                  className="border-b border-[#E2E8F0] last:border-0"
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{cond.emoji}</span>
                      <span className="text-sm font-medium text-[#1C3A2A]">
                        {cond.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-[#718096]">
                    {cond.category?.emoji} {cond.category?.name}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEdit(cond)}
                      >
                        Edit
                      </Button>
                      <button
                        onClick={() => handleDelete(cond.id)}
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
        <p className="text-[#718096]">No conditions found.</p>
      )}
    </div>
  );
}
