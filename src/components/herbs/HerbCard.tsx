import React from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { Herb } from "@/types";

interface HerbCardProps {
  herb: Herb;
}

export default function HerbCard({ herb }: HerbCardProps) {
  return (
    <Link href={`/herbs/${herb.slug}`}>
      <div className="bg-white rounded-2xl shadow-sm p-5 flex gap-4 hover:shadow-md transition-shadow duration-200 cursor-pointer group">
        <div className="flex-shrink-0 w-14 h-14 bg-[#D4EAD7] rounded-xl flex items-center justify-center">
          <Leaf className="h-7 w-7 text-[#2D5A3D]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[#1C3A2A] font-semibold text-base group-hover:text-[#2D5A3D] transition-colors">
            {herb.name}
          </h3>
          {herb.latin_name && (
            <p className="text-[#718096] text-sm italic">{herb.latin_name}</p>
          )}
          <p className="text-[#4A5568] text-sm mt-1 line-clamp-2">
            {herb.description}
          </p>
          {herb.herb_tags && herb.herb_tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {herb.herb_tags.slice(0, 2).map((tag) => (
                <Badge key={tag.id}>{tag.tag}</Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
