"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How accurate is krinAI's data extraction?",
    answer:
      "Our extraction accuracy consistently exceeds 99% for standard invoice formats. For complex or unusual layouts, our human-in-the-loop feedback system continuously improves performance over time.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Most customers are fully operational within 2-4 weeks. Our dedicated onboarding team handles ERP integration, workflow configuration, and user training.",
  },
  {
    question: "What file formats does krinAI support?",
    answer:
      "We process PDFs, JPEGs, PNGs, TIFFs, and even Excel files. Whether invoices arrive as email attachments, scanned documents, or photos from a mobile device, krinAI handles them all.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Absolutely. We're SOC 2 Type II certified, GDPR compliant, and use bank-level 256-bit encryption. Your data is never shared or used for model training without explicit consent.",
  },
  {
    question: "Can krinAI handle multiple languages and currencies?",
    answer:
      "Yes. krinAI currently supports invoice processing in 45+ languages and 150+ currencies, making it ideal for global operations.",
  },
  {
    question: "What if an invoice has an error or exception?",
    answer:
      "krinAI automatically flags exceptions and routes them to the appropriate team member through your configured workflow. The system learns from corrections to improve future accuracy.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950" />

      <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <span className="text-sm font-medium text-blue-300">FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Frequently Asked
            <br />
            <span className="text-gradient">Questions</span>
          </h2>
        </div>

        {/* FAQ accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-medium text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-slate-400 flex-shrink-0 transition-transform duration-300",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
