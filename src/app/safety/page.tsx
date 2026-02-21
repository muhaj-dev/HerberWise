import React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Heart,
  Leaf,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const guidelineCards = [
  {
    title: "When to Seek Medical Help",
    items: [
      "Symptoms are severe or worsening",
      "You experience an allergic reaction",
      "You are pregnant or breastfeeding",
      "Symptoms persist for more than 2 weeks",
      "You have a chronic medical condition",
    ],
  },
  {
    title: "Drug Interactions",
    items: [
      "Always inform your doctor about herbal supplements",
      "Some herbs interact with blood thinners",
      "St. John's Wort interacts with many medications",
      "Herbs can affect how anaesthesia works",
      "Check interactions before combining herbs",
    ],
  },
  {
    title: "Special Populations",
    items: [
      "Children may need different doses",
      "Elderly may be more sensitive to herbs",
      "Pregnant women should avoid most herbs",
      "Breastfeeding mothers should consult a doctor",
      "People with autoimmune conditions should be cautious",
    ],
  },
  {
    title: "General Safety Tips",
    items: [
      "Start with the lowest recommended dose",
      "Buy from reputable sources only",
      "Check for quality certifications",
      "Stop use if side effects occur",
      "Keep a record of what you take",
    ],
  },
];

export default function SafetyPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <ShieldAlert className="h-12 w-12 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold text-[#1C3A2A] mb-3">
            Safety & Disclaimer
          </h1>
          <p className="text-[#718096] max-w-xl mx-auto">
            Your safety is our top priority. Please read the following important
            information before using any herbal remedies.
          </p>
        </div>

        {/* Medical Disclaimer Card */}
        <Card className="border-l-4 border-red-500 mb-10">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xl font-bold text-[#1C3A2A] mb-3">
                Important Medical Disclaimer
              </h2>
              <p className="text-[#4A5568] mb-3">
                The information provided on HerbWise is for educational and
                informational purposes only and is not intended as a substitute
                for professional medical advice, diagnosis, or treatment. Always
                seek the advice of your physician or other qualified health
                provider with any questions you may have regarding a medical
                condition.
              </p>
              <p className="text-[#4A5568]">
                Never disregard professional medical advice or delay in seeking
                it because of something you have read on this website. If you
                think you may have a medical emergency, call your doctor, go to
                the emergency department, or call emergency services immediately.
              </p>
            </div>
          </div>
        </Card>

        {/* Safety Guidelines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {guidelineCards.map((card, idx) => (
            <Card key={idx}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#D4EAD7] rounded-full flex items-center justify-center">
                  <Leaf className="h-4 w-4 text-[#2D5A3D]" />
                </div>
                <h3 className="text-lg font-bold text-[#1C3A2A]">
                  {card.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {card.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#2D5A3D] flex-shrink-0 mt-0.5" />
                    <span className="text-[#4A5568] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Emergency Card */}
        <Card className="border-l-4 border-red-500 mb-10">
          <div className="flex items-start gap-3">
            <Heart className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xl font-bold text-[#1C3A2A] mb-3">
                In Case of Emergency
              </h2>
              <p className="text-[#4A5568] mb-4">
                If you or someone else is experiencing a medical emergency due
                to ingestion of an herbal product or an allergic reaction, seek
                immediate medical attention.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 font-semibold rounded-full px-4 py-2 text-sm">
                  🚨 Emergency: 911
                </span>
                <span className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 font-semibold rounded-full px-4 py-2 text-sm">
                  ☎️ Poison: 1-800-222-1222
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Learn More CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/about">
            <Button variant="outline">About Our Sources</Button>
          </Link>
          <Link href="/herbs">
            <Button variant="filled">Explore Herbs</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
