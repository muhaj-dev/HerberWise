import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`bg-[#D4EAD7] text-[#2D5A3D] text-xs font-medium px-3 py-1 rounded-full ${className}`}
    >
      {children}
    </span>
  );
}
