"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Clock, DollarSign, Zap } from "lucide-react";

const stats = [
  {
    icon: CheckCircle2,
    value: "99.2%",
    label: "Extraction Accuracy",
    description: "Industry-leading precision",
  },
  {
    icon: Clock,
    value: "85%",
    label: "Reduction in Processing Time",
    description: "From days to minutes",
  },
  {
    icon: DollarSign,
    value: "$47",
    label: "Average Cost Savings",
    description: "Per invoice processed",
  },
  {
    icon: Zap,
    value: "24/7",
    label: "Always-On Processing",
    description: "Never stop working",
  },
];

export function Stats() {
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
    <section ref={ref} className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Real Results for Finance Teams
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Our customers consistently report significant improvements in operational efficiency within the first 90 days of implementation.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`relative group bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-4">
                    <Icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-slate-300 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-500">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
