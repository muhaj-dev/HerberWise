import React from "react";

interface CategoryPillProps {
  active: boolean;
  label: string;
  emoji?: string;
  onClick: () => void;
}

export default function CategoryPill({
  active,
  label,
  emoji,
  onClick,
}: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
        active
          ? "bg-[#1C3A2A] text-white"
          : "bg-white text-[#4A5568] border border-[#E2E8F0] hover:border-[#1C3A2A] hover:text-[#1C3A2A]"
      }`}
    >
      {emoji && <span>{emoji}</span>}
      {label}
    </button>
  );
}
