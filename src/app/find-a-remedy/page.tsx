"use client";

import React, { useState, useEffect } from "react";
import SearchInput from "@/components/ui/SearchInput";
import CategoryPill from "@/components/ui/CategoryPill";
import ConditionCard from "@/components/conditions/ConditionCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";
import { useConditions } from "@/hooks/useConditions";
import { useCategories } from "@/hooks/useCategories";

export default function FindARemedyPage() {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    undefined
  );

  const { data: categories } = useCategories();
  const { data: conditions, isLoading } = useConditions(activeCategory);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchValue), 300);
    return () => clearTimeout(timer);
  }, [searchValue]);

  // Filter conditions by search term (client-side)
  const filteredConditions = conditions?.filter((c) =>
    c.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#1C3A2A] mb-3">
            Find Your Remedy
          </h1>
          <p className="text-[#718096] max-w-xl mx-auto">
            Describe your health concern or browse by category to find safe and
            natural herbal solutions
          </p>
        </div>

        {/* Search Input */}
        <div className="max-w-2xl mx-auto mb-6">
          <SearchInput
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search for a condition (e.g. headache, insomnia, stress...)"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <CategoryPill
            active={!activeCategory}
            label="All"
            onClick={() => setActiveCategory(undefined)}
          />
          {categories?.map((cat) => (
            <CategoryPill
              key={cat.id}
              active={activeCategory === cat.slug}
              label={cat.name}
              emoji={cat.emoji}
              onClick={() =>
                setActiveCategory(
                  activeCategory === cat.slug ? undefined : cat.slug
                )
              }
            />
          ))}
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <LoadingSpinner />
        ) : filteredConditions && filteredConditions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredConditions.map((condition) => (
              <ConditionCard key={condition.id} condition={condition} />
            ))}
          </div>
        ) : (
          <EmptyState message="No conditions found. Try adjusting your search or category filter." />
        )}
      </div>
    </div>
  );
}
