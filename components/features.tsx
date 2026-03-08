"use client";

import { useEffect, useRef, useState } from "react";
import {
  FileSearch,
  ShieldCheck,
  RefreshCw,
  CheckSquare,
  BarChart3,
  Lock,
} from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Automated Data Extraction",
    description:
      "Our advanced OCR and machine learning models extract line items, vendor details, tax information, and payment terms from any invoice format — PDFs, scanned documents, images, and even handwritten notes.",
  },
  {
    icon: ShieldCheck,
    title: "Smart Validation & Matching",
    description:
      "krinAI automatically cross-references invoice data against purchase orders, contracts, and historical records. Flag discrepancies, duplicates, and potential fraud before they become costly errors.",
  },
  {
    icon: RefreshCw,
    title: "Seamless ERP Integration",
    description:
      "Direct integrations with SAP, Oracle, NetSuite, QuickBooks, Xero, and 40+ other platforms. Invoices flow directly into your existing workflows with no manual intervention required.",
  },
  {
    icon: CheckSquare,
    title: "Custom Approval Workflows",
    description:
      "Define routing rules based on amount, vendor, department, or custom criteria. Approvers receive instant notifications and can review and approve from any device.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics Dashboard",
    description:
      "Gain visibility into invoice volumes, processing times, vendor performance, and cash flow forecasting. Make data-driven decisions with comprehensive reporting.",
  },
  {
    icon: Lock,
    title: "Enterprise-Grade Security",
    description:
      "SOC 2 Type II certified with end-to-end encryption. Your financial data is protected with the same security standards used by leading banks and financial institutions.",
  },
];

export function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={ref}
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute inset-0 bg-radial-glow-bottom" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <span className="text-sm font-medium text-blue-300">
              Powerful Features
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Intelligent Invoice Processing,
            <br />
            <span className="text-gradient">End-to-End</span>
          </h2>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group relative bg-gradient-to-br from-slate-800/30 to-slate-900/30 rounded-2xl p-8 border border-slate-700/30 hover:border-blue-500/30 transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
