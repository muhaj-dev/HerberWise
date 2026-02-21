"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { createClient } from "@/lib/supabase/client";
import { upsertHerb } from "../../actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const herbSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  latin_name: z.string().default(""),
  description: z.string().min(1, "Description is required"),
  traditional_uses: z.string().default(""),
  preparation_dosage: z.string().default(""),
  safety_warnings: z.string().default(""),
  is_published: z.boolean().default(false),
  tags: z.string().default(""),
});

type HerbForm = z.infer<typeof herbSchema>;

export default function AdminHerbEditPage() {
  const params = useParams();
  const router = useRouter();
  const herbId = params.id as string;
  const isNew = herbId === "new";
  const [isLoading, setIsLoading] = useState(!isNew);
  const [conditions, setConditions] = useState<
    { id: string; name: string }[]
  >([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<HerbForm>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(herbSchema) as any,
    defaultValues: { is_published: false },
  });

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();

      // Load all conditions for the picker
      const { data: condData } = await supabase
        .from("conditions")
        .select("id, name")
        .order("name");
      setConditions((condData as { id: string; name: string }[]) || []);

      if (!isNew) {
        const { data: herb } = await supabase
          .from("herbs")
          .select("*, herb_tags(*), herb_conditions(condition_id)")
          .eq("id", herbId)
          .single();

        if (herb) {
          setValue("name", herb.name);
          setValue("slug", herb.slug);
          setValue("latin_name", herb.latin_name || "");
          setValue("description", herb.description);
          setValue("traditional_uses", herb.traditional_uses || "");
          setValue("preparation_dosage", herb.preparation_dosage || "");
          setValue("safety_warnings", herb.safety_warnings || "");
          setValue("is_published", herb.is_published);
          setValue(
            "tags",
            herb.herb_tags?.map((t: { tag: string }) => t.tag).join(", ") || ""
          );
          setSelectedConditions(
            herb.herb_conditions?.map(
              (hc: { condition_id: string }) => hc.condition_id
            ) || []
          );
        }
        setIsLoading(false);
      }
    };
    load();
  }, [herbId, isNew, setValue]);

  const onSubmit = async (data: HerbForm) => {
    const tags = data.tags
      ? data.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    await upsertHerb(
      {
        id: isNew ? undefined : herbId,
        name: data.name,
        slug: data.slug,
        latin_name: data.latin_name || "",
        description: data.description,
        traditional_uses: data.traditional_uses || "",
        preparation_dosage: data.preparation_dosage || "",
        safety_warnings: data.safety_warnings || "",
        is_published: data.is_published,
      },
      tags,
      selectedConditions
    );

    router.push("/admin/herbs");
  };

  const toggleCondition = (id: string) => {
    setSelectedConditions((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  if (isLoading) return <LoadingSpinner />;

  const inputClass =
    "w-full px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm text-[#4A5568] focus:outline-none focus:ring-2 focus:ring-[#2D5A3D]";

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-[#1C3A2A] mb-6">
        {isNew ? "Add New Herb" : "Edit Herb"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <h2 className="text-lg font-bold text-[#1C3A2A] mb-4">
            Basic Information
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
            <div>
              <label className="block text-xs font-medium text-[#1C3A2A] mb-1">
                Latin Name
              </label>
              <input {...register("latin_name")} className={inputClass} />
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
            <div>
              <label className="block text-xs font-medium text-[#1C3A2A] mb-1">
                Tags (comma separated)
              </label>
              <input
                {...register("tags")}
                className={inputClass}
                placeholder="Anti-inflammatory, Antioxidant, Relaxant"
              />
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-bold text-[#1C3A2A] mb-4">
            Detailed Content
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#1C3A2A] mb-1">
                Traditional Uses
              </label>
              <textarea
                {...register("traditional_uses")}
                className={`${inputClass} resize-none`}
                rows={4}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#1C3A2A] mb-1">
                Preparation & Dosage
              </label>
              <textarea
                {...register("preparation_dosage")}
                className={`${inputClass} resize-none`}
                rows={4}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#1C3A2A] mb-1">
                Safety & Warnings
              </label>
              <textarea
                {...register("safety_warnings")}
                className={`${inputClass} resize-none`}
                rows={4}
              />
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-bold text-[#1C3A2A] mb-4">
            Linked Conditions
          </h2>
          <div className="flex flex-wrap gap-2">
            {conditions.map((cond) => (
              <button
                key={cond.id}
                type="button"
                onClick={() => toggleCondition(cond.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedConditions.includes(cond.id)
                    ? "bg-[#1C3A2A] text-white"
                    : "bg-white text-[#4A5568] border border-[#E2E8F0] hover:border-[#1C3A2A]"
                }`}
              >
                {cond.name}
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register("is_published")}
              id="isPublished"
              className="w-4 h-4 rounded accent-[#2D5A3D]"
            />
            <label
              htmlFor="isPublished"
              className="text-sm font-medium text-[#1C3A2A]"
            >
              Publish this herb (make it visible to users)
            </label>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" variant="filled" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isNew ? "Create Herb" : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/herbs")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
