"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CategoryPill from "@/components/ui/CategoryPill";
import ConditionCard from "@/components/conditions/ConditionCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";
import { useConditions } from "@/hooks/useConditions";
import { useCategories } from "@/hooks/useCategories";

export default function ConditionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || undefined;

  const { data: categories } = useCategories();
  const { data: conditions, isLoading } = useConditions();

  const setCategory = (slug?: string) => {
    if (slug) {
      router.push(`/conditions?category=${slug}`);
    } else {
      router.push("/conditions");
    }
  };

  // Group conditions by category for display
  const groupedConditions = conditions?.reduce(
    (acc, condition) => {
      const catSlug = condition.category?.slug || "other";
      if (!acc[catSlug]) {
        acc[catSlug] = {
          category: condition.category,
          conditions: [],
        };
      }
      acc[catSlug].conditions.push(condition);
      return acc;
    },
    {} as Record<
      string,
      {
        category: { name: string; emoji: string; slug: string };
        conditions: typeof conditions;
      }
    >
  );

  // Filter to active category if set
  const filteredGroups = activeCategory
    ? Object.fromEntries(
        Object.entries(groupedConditions || {}).filter(
          ([slug]) => slug === activeCategory
        )
      )
    : groupedConditions;

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#1C3A2A] mb-3">
            Browse Conditions
          </h1>
          <p className="text-[#718096] max-w-xl mx-auto">
            Explore health conditions and discover the herbal remedies that may
            help.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <CategoryPill
            active={!activeCategory}
            label="All"
            onClick={() => setCategory(undefined)}
          />
          {categories?.map((cat) => (
            <CategoryPill
              key={cat.id}
              active={activeCategory === cat.slug}
              label={cat.name}
              emoji={cat.emoji}
              onClick={() =>
                setCategory(
                  activeCategory === cat.slug ? undefined : cat.slug
                )
              }
            />
          ))}
        </div>

        {/* Grouped Conditions List */}
        {isLoading ? (
          <LoadingSpinner />
        ) : filteredGroups && Object.keys(filteredGroups).length > 0 ? (
          <div className="space-y-10">
            {Object.entries(filteredGroups).map(([slug, group]) => (
              <div key={slug}>
                <h2 className="text-xl font-bold text-[#1C3A2A] mb-4 flex items-center gap-2">
                  <span className="text-2xl">{group.category?.emoji}</span>
                  {group.category?.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.conditions.map((condition) => (
                    <ConditionCard key={condition.id} condition={condition} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState message="No conditions found." />
        )}
      </div>
    </div>
  );
}
