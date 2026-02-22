import React from "react";
import Link from "next/link";
import {
  Leaf,
  Heart,
  BookOpen,
  Users,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const values = [
  {
    icon: Heart,
    emoji: "❤️",
    title: "Safety First",
    description:
      "Every herb includes clear safety warnings, contraindications, and guidance on when to consult a healthcare professional.",
  },
  {
    icon: BookOpen,
    emoji: "📖",
    title: "Education Focused",
    description:
      "We provide evidence-informed, well-researched content so you can make informed decisions about natural remedies.",
  },
  {
    icon: Users,
    emoji: "👥",
    title: "Accessible to All",
    description:
      "Our platform is free and accessible. Everyone deserves access to reliable herbal remedy information.",
  },
];

const approachItems = [
  "Research from peer-reviewed journals and traditional medicine texts",
  "Clear dosage and preparation instructions for every remedy",
  "Safety warnings and known drug interactions",
  "Traditional and historical context for each herb",
  "Regular content reviews and updates",
];

const sources = [
  {
    name: "NCCIH",
    fullName: "National Center for Complementary and Integrative Health",
    description:
      "The U.S. government's lead agency for scientific research on complementary and integrative health approaches.",
    url: "https://nccih.nih.gov",
  },
  {
    name: "WHO",
    fullName: "World Health Organization",
    description:
      "Global authority providing guidelines on traditional medicine safety and efficacy.",
    url: "https://www.who.int",
  },
  {
    name: "American Botanical Council",
    fullName: "American Botanical Council",
    description:
      "Leading independent, nonprofit research and education organisation promoting responsible use of herbal medicine.",
    url: "https://www.herbalgram.org",
  },
  {
    name: "EMA",
    fullName: "European Medicines Agency",
    description:
      "Provides herbal monographs and community-level assessments of traditional herbal medicinal products.",
    url: "https://www.ema.europa.eu",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#E8F0E9] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#D4EAD7] rounded-full flex items-center justify-center">
              <Leaf className="h-8 w-8 text-[#2D5A3D]" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1C3A2A] mb-4">
            About HerbWise
          </h1>
          <p className="text-[#718096] text-lg max-w-2xl mx-auto">
            We are on a mission to make traditional herbal knowledge accessible,
            safe, and easy to understand for everyone.
          </p>
        </div>

        {/* Our Mission Card */}
        <Card className="max-w-4xl mx-auto mb-20 p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-[#1C3A2A] mb-6">
            Our Mission
          </h2>
          <p className="text-[#4A5568] text-lg leading-relaxed">
            HerbWise was created to bridge the gap between traditional herbal
            knowledge and modern safety standards. We believe that everyone
            should have access to well-researched, clearly presented information
            about natural remedies — complete with proper safety warnings and
            preparation guidelines. Our goal is not to replace medical advice,
            but to empower you with knowledge about the natural world.
          </p>
        </Card>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-[#1C3A2A] text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <Card key={idx} className="flex flex-col items-center text-center p-8">
                <div className="text-4xl mb-6">{val.emoji}</div>
                <h3 className="text-xl font-bold text-[#1C3A2A] mb-4">
                  {val.title}
                </h3>
                <p className="text-[#718096] leading-relaxed">
                  {val.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Our Approach */}
        <Card className="max-w-4xl mx-auto mb-20 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-[#1C3A2A] mb-8 text-center md:text-left">
            Our Approach
          </h2>
          <ul className="space-y-4">
            {approachItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <div className="mt-1 bg-[#D4EAD7] rounded-full p-1">
                  <CheckCircle2 className="h-4 w-4 text-[#2D5A3D]" />
                </div>
                <span className="text-[#4A5568] text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Our Sources */}
        <div className="mb-20" id="sources">
          <h2 className="text-3xl font-bold text-[#1C3A2A] text-center mb-12">
            Our Sources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sources.map((source, idx) => (
              <Card key={idx} className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#1C3A2A]">
                    {source.name}
                  </h3>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#718096] hover:text-[#2D5A3D] transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
                <p className="text-[#718096] leading-relaxed">
                  {source.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Ready to Explore CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#1C3A2A] mb-8">
            Ready to Explore?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/find-a-remedy">
              <Button variant="filled" size="lg" className="w-full sm:w-auto">
                Find a Remedy
              </Button>
            </Link>
            <Link href="/safety">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white hover:bg-gray-50">
                Read Safety Guidelines
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

