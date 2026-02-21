"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/find-a-remedy", label: "Find a Remedy" },
  { href: "/conditions", label: "Conditions" },
  { href: "/herbs", label: "Herbs" },
  { href: "/safety", label: "Safety" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setProfile(data as Profile | null);
      }
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Don't show public navbar on admin routes
  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-7 w-7 text-[#2D5A3D]" />
            <span className="text-xl font-bold text-[#1C3A2A]">HerbWise</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-[#1C3A2A] font-bold underline underline-offset-4 decoration-[#2D5A3D] decoration-2"
                      : "text-[#4A5568] hover:text-[#1C3A2A]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                {profile?.role === "admin" && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm">
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Link href="/dashboard">
                  <div className="w-9 h-9 rounded-full bg-[#D4EAD7] flex items-center justify-center text-[#2D5A3D] font-semibold text-sm">
                    {profile?.full_name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                </Link>
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="filled" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#4A5568] hover:text-[#1C3A2A]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-[#1C3A2A] font-bold bg-[#E8F0E9]"
                      : "text-[#4A5568] hover:bg-[#E8F0E9]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-[#E2E8F0] space-y-2">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-medium text-[#4A5568] hover:bg-[#E8F0E9] rounded-lg"
                  >
                    My Dashboard
                  </Link>
                  {profile?.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-sm font-medium text-[#4A5568] hover:bg-[#E8F0E9] rounded-lg"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="filled" size="sm" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
