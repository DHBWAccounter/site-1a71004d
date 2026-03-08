"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$299",
    period: "/month",
    description: "Perfect for growing teams",
    features: [
      "Up to 500 invoices/month",
      "5 user seats",
      "Email and upload capture",
      "Standard integrations",
      "Basic reporting",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$799",
    period: "/month",
    description: "For established finance operations",
    features: [
      "Up to 2,500 invoices/month",
      "20 user seats",
      "All capture methods including API",
      "Advanced ERP integrations",
      "Custom workflows",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large-scale organizations",
    features: [
      "Unlimited invoice volume",
      "Unlimited users",
      "Dedicated implementation team",
      "Custom integrations",
      "SLA guarantees",
      "Dedicated success manager",
      "On-premise deployment options",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function Pricing() {
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
      id="pricing"
      ref={ref}
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <span className="text-sm font-medium text-blue-300">Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Plans That Scale
            <br />
            <span className="text-gradient">With Your Business</span>
          </h2>
        </div>

        {/* Pricing grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-500 ${
                plan.highlighted
                  ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/50 scale-105 shadow-xl shadow-blue-500/20"
                  : "bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-slate-600"
              } ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Popular badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-400">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-slate-400">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#demo"
                className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-500/25"
                    : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
