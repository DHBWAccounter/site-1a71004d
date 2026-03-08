"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, Search, CheckCircle, Send, Link2 } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "Step 1",
    title: "Capture",
    description:
      "Invoices arrive via email, upload portal, or direct integration. krinAI accepts all formats — no standardized templates required.",
  },
  {
    icon: Search,
    step: "Step 2",
    title: "Extract",
    description:
      "Our AI engine reads and extracts every relevant field: vendor name, invoice number, dates, line items, amounts, tax codes, and custom fields you define.",
  },
  {
    icon: CheckCircle,
    step: "Step 3",
    title: "Validate",
    description:
      "Automatic three-way matching against POs and receipts. Exception handling routes discrepancies to the right person for quick resolution.",
  },
  {
    icon: Send,
    step: "Step 4",
    title: "Approve",
    description:
      "Configurable approval workflows ensure the right people review the right invoices. Mobile-friendly approval means faster cycle times.",
  },
  {
    icon: Link2,
    step: "Step 5",
    title: "Integrate",
    description:
      "Approved invoices sync automatically to your ERP or accounting system, ready for payment processing.",
  },
];

export function Timeline() {
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
      id="how-it-works"
      ref={ref}
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <span className="text-sm font-medium text-cyan-300">
              Simple Process
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            How <span className="text-gradient">krinAI</span> Works
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            From invoice receipt to payment-ready in five seamless steps
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-cyan-500/50 to-blue-500/50" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.title}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-8 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                    transition: "all 0.6s ease-out",
                  }}
                >
                  {/* Content */}
                  <div
                    className={`${
                      isEven ? "lg:text-right lg:pr-12" : "lg:col-start-2 lg:pl-12"
                    }`}
                  >
                    <div
                      className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50 hover:border-blue-500/30 transition-all ${
                        isEven ? "lg:ml-auto" : ""
                      } max-w-lg`}
                    >
                      <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
                        {step.step}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center icon */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                  </div>

                  {/* Mobile icon */}
                  <div className="lg:hidden flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                      {step.step}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
