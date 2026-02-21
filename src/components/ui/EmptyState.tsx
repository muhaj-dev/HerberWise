import React from "react";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({
  message = "No results found",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <SearchX className="h-12 w-12 text-gray-300 mb-4" />
      <p className="text-[#718096] text-lg">{message}</p>
    </div>
  );
}
