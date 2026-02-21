import React from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import type { Condition } from "@/types";

interface ConditionCardProps {
  condition: Condition;
}

export default function ConditionCard({ condition }: ConditionCardProps) {
  return (
    <Link href={`/conditions/${condition.slug}`}>
      <div className="bg-white rounded-2xl shadow-sm p-5 flex gap-4 hover:shadow-md transition-shadow duration-200 cursor-pointer group">
        <div className="flex-shrink-0 w-14 h-14 bg-[#E8F0E9] rounded-xl flex items-center justify-center text-2xl">
          {condition.emoji || "🌿"}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[#1C3A2A] font-semibold text-base group-hover:text-[#2D5A3D] transition-colors">
            {condition.name}
          </h3>
          <p className="text-[#718096] text-sm mt-1 line-clamp-2">
            {condition.description}
          </p>
          {condition.category && (
            <div className="mt-3">
              <Badge>{condition.category.name}</Badge>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
