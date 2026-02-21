"use client";

import React, { useState, useEffect } from "react";
import SearchInput from "@/components/ui/SearchInput";
import HerbCard from "@/components/herbs/HerbCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";
import { useHerbs } from "@/hooks/useHerbs";

export default function HerbsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data: herbs, isLoading } = useHerbs(debouncedSearch || undefined);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchValue), 300);
    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#1C3A2A] mb-3">
            Herb Library
          </h1>
          <p className="text-[#718096] max-w-xl mx-auto">
            Explore our comprehensive collection of healing herbs and their
            traditional uses.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <SearchInput
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search herbs by name…"
          />
        </div>

        {/* Herb Grid */}
        {isLoading ? (
          <LoadingSpinner />
        ) : herbs && herbs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {herbs.map((herb) => (
              <HerbCard key={herb.id} herb={herb} />
            ))}
          </div>
        ) : (
          <EmptyState message="No herbs found. Try adjusting your search." />
        )}
      </div>
    </div>
  );
}
