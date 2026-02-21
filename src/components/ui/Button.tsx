import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  variant = "filled",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 cursor-pointer";

  const sizeClasses = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2 text-sm",
    lg: "px-8 py-3 text-base",
  };

  const variantClasses = {
    filled:
      "bg-[#1C3A2A] text-white hover:bg-[#2D5A3D] active:scale-[0.98]",
    outline:
      "border border-[#1C3A2A] text-[#1C3A2A] hover:bg-[#1C3A2A] hover:text-white active:scale-[0.98]",
    danger:
      "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]",
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
