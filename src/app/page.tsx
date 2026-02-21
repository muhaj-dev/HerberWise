"use client";

import React from "react";
import Link from "next/link";
import {
  Leaf,
  Search,
  Shield,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import HerbCard from "@/components/herbs/HerbCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";
import { useHerbs } from "@/hooks/useHerbs";


const categories = [
  { name: "Pain Relief", emoji: "🌿", slug: "pain-relief" },
  { name: "Sleep & Relaxation", emoji: "🌙", slug: "sleep-relaxation" },
  { name: "Digestive Health", emoji: "🌱", slug: "digestive-health" },
  { name: "Immune Support", emoji: "🍓", slug: "immune-support" },
  { name: "Energy & Focus", emoji: "⚡", slug: "energy-focus" },
  { name: "Skin Care", emoji: "🌿", slug: "skin-care" },
];

const howItWorks = [
  {
    icon: Search,
    title: "Describe Your Concern",
    description:
      "Tell us about your health concern or browse our curated categories to find relevant conditions.",
  },
  {
    icon: BookOpen,
    title: "Review Recommendations",
    description:
      "Get matched with traditional herbal remedies that have been used for centuries for your condition.",
  },
  {
    icon: CheckCircle2,
    title: "Get Clear Instructions",
    description:
      "Each remedy includes preparation methods, dosage guidelines, and easy-to-follow instructions.",
  },
  {
    icon: Shield,
    title: "Understand Safety",
    description:
      "Every herb includes safety warnings, contraindications, and when to consult a healthcare professional.",
  },
];

export default function HomePage() {
  const { data: herbs, isLoading, isError } = useHerbs();

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="bg-[#E8F0E9] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <span className="text-sm">🌱</span>
            <span className="text-sm font-medium text-[#2D5A3D]">
              Trusted by 10,000+ natural wellness seekers
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C3A2A] mb-6">
            Find Natural Remedies
            <br />
            <span className="text-[#2D5A3D]">You Can Trust</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[#718096] text-lg max-w-xl mx-auto mb-8">
            Discover traditional herbal remedies backed by centuries of use.
            Safe, natural solutions for everyday health concerns.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/find-a-remedy">
              <Button variant="filled" size="lg">
                🔍 Find a Remedy
              </Button>
            </Link>
            <Link href="/herbs">
              <Button variant="outline" size="lg">
                🌿 Browse Herbs
              </Button>
            </Link>
          </div>

          {/* Trust Icons Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#D4EAD7] rounded-full flex items-center justify-center">
                <Leaf className="h-5 w-5 text-[#2D5A3D]" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-[#1C3A2A]">
                  100% Natural
                </p>
                <p className="text-xs text-[#718096]">Plant-based remedies</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#D4EAD7] rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-[#2D5A3D]" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-[#1C3A2A]">
                  Safety First
                </p>
                <p className="text-xs text-[#718096]">
                  Clear warnings included
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#D4EAD7] rounded-full flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-[#2D5A3D]" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-[#1C3A2A]">
                  Easy to Follow
                </p>
                <p className="text-xs text-[#718096]">Simple instructions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BROWSE BY CATEGORY ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1C3A2A] mb-3">
              Browse by Category
            </h2>
            <p className="text-[#718096] max-w-lg mx-auto">
              Explore our curated categories to find herbal remedies for your
              specific health concerns.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/conditions?category=${cat.slug}`}
              >
                <Card className="text-center hover:shadow-md transition-shadow duration-200 cursor-pointer group">
                  <div className="text-4xl mb-3">{cat.emoji}</div>
                  <h3 className="text-[#1C3A2A] font-semibold group-hover:text-[#2D5A3D] transition-colors">
                    {cat.name}
                  </h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1C3A2A] mb-3">
              How It Works
            </h2>
            <p className="text-[#718096] max-w-lg mx-auto">
              Finding the right herbal remedy is simple with our guided process.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {howItWorks.map((step, idx) => (
              <Card key={idx} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#D4EAD7] rounded-full flex items-center justify-center mb-4">
                  <step.icon className="h-6 w-6 text-[#2D5A3D]" />
                </div>
                <h3 className="text-[#1C3A2A] font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-[#718096] text-sm">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POPULAR REMEDIES ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1C3A2A] mb-3">
              Popular Remedies
            </h2>
            <p className="text-[#718096] max-w-lg mx-auto">
              Explore our most recommended herbal remedies trusted by the
              community.
            </p>
          </div>

          {isLoading ? (
            <LoadingSpinner />
          ) : isError ? (
            <EmptyState message="Unable to load herbs. Please try again later." />
          ) : herbs && herbs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {herbs.slice(0, 6).map((herb) => (
                <HerbCard key={herb.id} herb={herb} />
              ))}
            </div>
          ) : (
            <EmptyState message="No herbs found." />
          )}

          <div className="text-center mt-8">
            <Link href="/herbs">
              <Button variant="outline">View All Herbs →</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SAFETY BANNER ===== */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FEF3C7] border-l-4 border-red-500 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-[#1C3A2A] font-semibold text-lg mb-1">
                Important Safety Information
              </h3>
              <p className="text-[#4A5568] text-sm">
                Herbal remedies can interact with medications and may not be
                suitable for everyone. Always consult a qualified healthcare
                professional before starting any new herbal remedy, especially
                if you are pregnant, nursing, or taking medications.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link href="/safety">
                <Button variant="filled" size="sm">
                  Read Safety Guidelines
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
