"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-radial-glow" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-glow animation-delay-300" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">
              Trusted by 2,000+ companies
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-up">
            <span className="text-white">The AI Agent That Processes</span>
            <br />
            <span className="text-gradient">All of Your Invoices</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-3xl mx-auto animate-slide-up animation-delay-100">
            Stop wasting hours on manual data entry. krinAI intelligently captures, extracts, and validates invoice information with{" "}
            <span className="text-white font-semibold">99.2% accuracy</span> — so your finance team can focus on strategic work, not paperwork.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animation-delay-200">
            <Link
              href="#demo"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 px-8 py-4 rounded-xl transition-all shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
            >
              Request a Demo
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-slate-700 hover:border-slate-600 bg-slate-800/50 hover:bg-slate-800 px-8 py-4 rounded-xl transition-all"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 animate-fade-in animation-delay-400">
            <p className="text-sm text-slate-500 mb-6">
              Processing over 5 million invoices annually
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
              {["SAP", "Oracle", "NetSuite", "QuickBooks", "Xero"].map((brand) => (
                <div
                  key={brand}
                  className="text-lg font-semibold text-slate-400"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero visual */}
        <div className="mt-20 relative animate-scale-in animation-delay-300">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 pointer-events-none" />
          <div className="relative mx-auto max-w-5xl">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-8 backdrop-blur-sm shadow-2xl">
              {/* Mock dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Invoice card */}
                <div className="lg:col-span-2 bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-3 w-24 bg-slate-700 rounded" />
                    <div className="h-6 w-20 bg-green-500/20 rounded-full flex items-center justify-center">
                      <span className="text-xs text-green-400 font-medium">Paid</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 w-3/4 bg-slate-700/50 rounded" />
                    <div className="h-3 w-1/2 bg-slate-700/50 rounded" />
                    <div className="h-3 w-2/3 bg-slate-700/50 rounded" />
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-700/50 flex justify-between items-end">
                    <div className="space-y-2">
                      <div className="h-2 w-16 bg-slate-700/50 rounded" />
                      <div className="h-4 w-24 bg-blue-500/30 rounded" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">$24,850.00</div>
                    </div>
                  </div>
                </div>

                {/* Stats sidebar */}
                <div className="space-y-4">
                  <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                    <div className="text-xs text-slate-500 mb-1">Extracted</div>
                    <div className="text-lg font-semibold text-white">12 fields</div>
                    <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-11/12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                    <div className="text-xs text-slate-500 mb-1">Confidence</div>
                    <div className="text-lg font-semibold text-green-400">99.2%</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                    <div className="text-xs text-slate-500 mb-1">Processing</div>
                    <div className="text-lg font-semibold text-white">1.2s</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
