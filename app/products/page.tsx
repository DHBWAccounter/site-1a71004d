"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  BarChart3,
  Layers,
  Bot,
  FileSearch,
  Workflow,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const products = [
  {
    id: "invoice-ai",
    icon: FileSearch,
    name: "InvoiceAI Pro",
    tagline: "Intelligent Invoice Processing",
    description:
      "Extract, validate, and process invoices with 99.2% accuracy. Our flagship AI engine handles any format, any language, any volume.",
    features: [
      "Multi-format OCR extraction",
      "Smart vendor matching",
      "Duplicate detection",
      "Real-time validation",
    ],
    stats: { accuracy: "99.2%", speed: "1.2s", volume: "5M+" },
    gradient: "from-blue-500 to-cyan-400",
    glow: "blue",
    popular: true,
  },
  {
    id: "workflow-automation",
    icon: Workflow,
    name: "FlowEngine",
    tagline: "Automated Approval Workflows",
    description:
      "Design custom approval workflows that adapt to your business rules. Route invoices intelligently based on amount, department, or vendor.",
    features: [
      "Visual workflow builder",
      "Smart routing rules",
      "Mobile approvals",
      "SLA tracking",
    ],
    stats: { time: "85%", errors: "99%", satisfaction: "4.9/5" },
    gradient: "from-purple-500 to-pink-400",
    glow: "purple",
    popular: false,
  },
  {
    id: "analytics-suite",
    icon: BarChart3,
    name: "InsightHub",
    tagline: "Real-Time Analytics Dashboard",
    description:
      "Transform invoice data into actionable insights. Track spending patterns, vendor performance, and cash flow forecasts in real-time.",
    features: [
      "Custom dashboards",
      "Predictive analytics",
      "Vendor scoring",
      "Cash flow forecasting",
    ],
    stats: { insights: "500+", reports: "50+", users: "10K+" },
    gradient: "from-emerald-500 to-teal-400",
    glow: "emerald",
    popular: false,
  },
  {
    id: "fraud-detection",
    icon: Shield,
    name: "FraudGuard",
    tagline: "AI-Powered Fraud Prevention",
    description:
      "Detect anomalies and prevent fraud before it happens. Machine learning models trained on millions of invoices identify suspicious patterns instantly.",
    features: [
      "Anomaly detection",
      "Risk scoring",
      "Audit trail",
      "Compliance alerts",
    ],
    stats: { detection: "99.9%", false: "<0.1%", savings: "$2M+" },
    gradient: "from-orange-500 to-amber-400",
    glow: "orange",
    popular: false,
  },
  {
    id: "integration-hub",
    icon: Layers,
    name: "ConnectHub",
    tagline: "Universal ERP Integration",
    description:
      "Seamlessly connect with 40+ ERP and accounting systems. Two-way sync ensures your data is always up-to-date across all platforms.",
    features: [
      "40+ integrations",
      "Real-time sync",
      "Custom field mapping",
      "API access",
    ],
    stats: { platforms: "40+", uptime: "99.99%", latency: "<100ms" },
    gradient: "from-rose-500 to-pink-400",
    glow: "rose",
    popular: false,
  },
  {
    id: "ai-assistant",
    icon: Bot,
    name: "krinAI Assistant",
    tagline: "Your AI-Powered Finance Copilot",
    description:
      "Ask questions in natural language and get instant answers about your invoices, vendors, and spending patterns. Powered by advanced LLMs.",
    features: [
      "Natural language queries",
      "Contextual insights",
      "Report generation",
      "Voice commands",
    ],
    stats: { queries: "1M+", accuracy: "98%", languages: "20+" },
    gradient: "from-indigo-500 to-violet-400",
    glow: "indigo",
    popular: true,
  },
];

const categories = [
  { name: "All Products", filter: "all" },
  { name: "AI & Automation", filter: "ai" },
  { name: "Analytics", filter: "analytics" },
  { name: "Security", filter: "security" },
  { name: "Integrations", filter: "integrations" },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Header />
      <main className="relative">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute inset-0 bg-radial-glow" />

          {/* Animated background orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-float animation-delay-300" />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-float animation-delay-500" />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-pulse-glow"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-8 ${
                  isVisible ? "animate-slide-up" : "opacity-0"
                }`}
              >
                <Sparkles className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">
                  Introducing Our Product Suite
                </span>
              </div>

              {/* Headline */}
              <h1
                className={`text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 ${
                  isVisible ? "animate-slide-up animation-delay-100" : "opacity-0"
                }`}
              >
                <span className="text-white">Powerful Products,</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Extraordinary Results
                </span>
              </h1>

              {/* Subheadline */}
              <p
                className={`text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-3xl mx-auto ${
                  isVisible ? "animate-slide-up animation-delay-200" : "opacity-0"
                }`}
              >
                Discover our suite of AI-powered products designed to transform your
                invoice processing workflow. Each product is crafted to deliver
                <span className="text-white font-semibold"> maximum impact</span> with
                <span className="text-white font-semibold"> minimum effort</span>.
              </p>

              {/* CTA buttons */}
              <div
                className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${
                  isVisible ? "animate-slide-up animation-delay-300" : "opacity-0"
                }`}
              >
                <Link
                  href="#products"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-8 py-4 rounded-xl transition-all shadow-xl shadow-blue-500/25 hover:shadow-purple-500/40 hover:scale-105"
                >
                  Explore Products
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/#demo"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-slate-700 hover:border-slate-600 bg-slate-800/50 hover:bg-slate-800 px-8 py-4 rounded-xl transition-all"
                >
                  Request Demo
                </Link>
              </div>
            </div>

            {/* Stats bar */}
            <div
              className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 ${
                isVisible ? "animate-fade-in animation-delay-400" : "opacity-0"
              }`}
            >
              {[
                { value: "6", label: "Products" },
                { value: "99.2%", label: "Accuracy" },
                { value: "5M+", label: "Invoices/Year" },
                { value: "40+", label: "Integrations" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-6 rounded-2xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-sm"
                >
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid Section */}
        <section id="products" className="relative py-20 lg:py-28 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-slate-950" />
          <div className="absolute inset-0 bg-radial-glow-bottom" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Our <span className="text-gradient">Product Suite</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Each product is designed to work standalone or together as a powerful
                integrated platform.
              </p>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category.filter}
                  onClick={() => setActiveCategory(category.filter)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category.filter
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                      : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white border border-slate-700/50"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => {
                const Icon = product.icon;
                const isHovered = hoveredProduct === product.id;

                return (
                  <div
                    key={product.id}
                    className={`group relative ${
                      isVisible ? "animate-slide-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 100 + 500}ms` }}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    {/* Popular badge */}
                    {product.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                        <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-xs font-semibold text-white shadow-lg">
                          Most Popular
                        </div>
                      </div>
                    )}

                    {/* Card */}
                    <div
                      className={`relative h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 overflow-hidden transition-all duration-500 hover:border-slate-600 hover:shadow-2xl ${
                        isHovered ? "scale-[1.02] -translate-y-2" : ""
                      }`}
                    >
                      {/* Gradient overlay on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                      />

                      {/* Animated glow effect */}
                      <div
                        className={`absolute -inset-1 bg-gradient-to-r ${product.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
                      />

                      <div className="relative p-8">
                        {/* Icon */}
                        <div
                          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${product.gradient} mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </div>

                        {/* Content */}
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {product.name}
                        </h3>
                        <p
                          className={`text-sm font-medium bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent mb-4`}
                        >
                          {product.tagline}
                        </p>
                        <p className="text-slate-400 leading-relaxed mb-6">
                          {product.description}
                        </p>

                        {/* Features */}
                        <ul className="space-y-2 mb-8">
                          {product.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center gap-2 text-sm text-slate-300"
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${product.gradient}`}
                              />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-700/50">
                          {Object.entries(product.stats).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className="text-lg font-bold text-white">
                                {value}
                              </div>
                              <div className="text-xs text-slate-500 capitalize">
                                {key}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-6 pt-6 border-t border-slate-700/50">
                          <Link
                            href="#demo"
                            className={`group/btn inline-flex items-center justify-center w-full gap-2 text-sm font-semibold text-white bg-gradient-to-r ${product.gradient} px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]`}
                          >
                            Learn More
                            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Feature Showcase Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left content */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                  <Zap className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-300">
                    Why Choose Our Products
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                  Built for <span className="text-gradient">Scale</span>,
                  <br />
                  Designed for <span className="text-gradient">Simplicity</span>
                </h2>
                <p className="text-lg text-slate-300 mb-8">
                  Our products are engineered to handle enterprise-scale workloads
                  while remaining intuitive enough for teams of any size. No complex
                  setup, no steep learning curve.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      icon: Zap,
                      title: "Lightning Fast",
                      description: "Process thousands of invoices in seconds",
                    },
                    {
                      icon: Shield,
                      title: "Enterprise Security",
                      description: "SOC 2 Type II certified with end-to-end encryption",
                    },
                    {
                      icon: BarChart3,
                      title: "Real-Time Insights",
                      description: "Instant analytics and reporting dashboards",
                    },
                  ].map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-slate-600 transition-colors"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                          <ItemIcon className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">
                            {item.title}
                          </h4>
                          <p className="text-sm text-slate-400">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right visual */}
              <div className="relative">
                {/* Animated visualization */}
                <div className="relative aspect-square max-w-lg mx-auto">
                  {/* Central hub */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/30 animate-pulse-glow">
                    <div className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center">
                      <Sparkles className="h-12 w-12 text-blue-400" />
                    </div>
                  </div>

                  {/* Orbiting products */}
                  {products.slice(0, 6).map((product, index) => {
                    const angle = (index * 60 - 90) * (Math.PI / 180);
                    const x = Math.cos(angle) * 180;
                    const y = Math.sin(angle) * 180;
                    const Icon = product.icon;

                    return (
                      <div
                        key={product.id}
                        className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2"
                        style={{
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        }}
                      >
                        <div
                          className={`w-full h-full rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center shadow-lg animate-float`}
                          style={{ animationDelay: `${index * 200}ms` }}
                        >
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        {/* Connection line */}
                        <div
                          className="absolute top-1/2 left-1/2 w-[180px] h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent origin-left"
                          style={{
                            transform: `rotate(${index * 60}deg)`,
                          }}
                        />
                      </div>
                    );
                  })}

                  {/* Glow effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-3xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10" />
          <div className="absolute inset-0 bg-grid opacity-30" />

          <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your
              <br />
              <span className="text-gradient">Invoice Processing?</span>
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              Join thousands of companies already saving time and money with our
              AI-powered products. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#demo"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-8 py-4 rounded-xl transition-all shadow-xl shadow-blue-500/25 hover:shadow-purple-500/40 hover:scale-105"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-slate-700 hover:border-slate-600 bg-slate-800/50 hover:bg-slate-800 px-8 py-4 rounded-xl transition-all"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}