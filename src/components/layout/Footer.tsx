import React from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1C3A2A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-[#D4EAD7]" />
              <span className="text-lg font-bold">HerbWise</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Your trusted companion for natural herbal remedies, find safe,
              effective solutions for everyday wellness.
            </p>
          </div>

          {/* Col 2 — Explore */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-200">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/find-a-remedy"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Find a Remedy
                </Link>
              </li>
              <li>
                <Link
                  href="/conditions"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Browse Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/herbs"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Herb Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 — Resources */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-200">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/safety"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Safety Information
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/about#sources"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Our Sources
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 — Important */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-200">
              Important
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              This site provides general information only. Always consult a
              healthcare professional before starting any herbal remedy.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-gray-400">
            © 2024 HerbWise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
