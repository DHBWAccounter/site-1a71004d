"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export function CTA() {
  return (
    <section id="demo" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Transform Your
          <br />
          Invoice Processing?
        </h2>
        <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Schedule a personalized demo and see how krinAI can save your team 20+ hours per week on accounts payable.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-600 bg-white hover:bg-blue-50 px-8 py-4 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Request a Demo
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white border-2 border-white/30 hover:border-white/50 hover:bg-white/10 px-8 py-4 rounded-xl transition-all"
          >
            <Play className="h-4 w-4" />
            Start Free Trial
          </Link>
        </div>

        <p className="mt-6 text-sm text-blue-200">
          14 days free • No credit card required
        </p>
      </div>
    </section>
  );
}
