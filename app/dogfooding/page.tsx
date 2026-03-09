"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  CheckCircle2,
  Play,
  Pause,
  Activity,
  BarChart3,
  FileSearch,
  Bot,
  Shield,
  Layers,
  Workflow,
  Heart,
  Coffee,
  Rocket,
  Target,
  Award,
  ChevronRight,
  Quote,
  Star,
  Building2,
  Globe,
  Timer,
  TrendingDown,
  ArrowUpRight,
  CircleDot,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// Real metrics showing how we use our own products
const ourMetrics = {
  invoicesProcessed: {
    value: 847293,
    label: "Invoices Processed",
    change: "+12,847 this month",
    icon: FileSearch,
  },
  timeSaved: {
    value: 12456,
    label: "Hours Saved",
    change: "This year alone",
    icon: Clock,
  },
  accuracy: {
    value: 99.7,
    label: "Accuracy Rate",
    change: "Above industry avg",
    icon: Target,
  },
  costReduction: {
    value: 73,
    label: "Cost Reduction",
    change: "vs. manual processing",
    icon: DollarSign,
  },
};

// Products we use internally
const productsWeUse = [
  {
    id: "invoice-ai",
    icon: FileSearch,
    name: "InvoiceAI Pro",
    description: "We process every incoming invoice through our own AI engine",
    stats: [
      { label: "Daily Volume", value: "2,400+" },
      { label: "Avg Processing", value: "0.8s" },
      { label: "Auto-Approved", value: "94%" },
    ],
    gradient: "from-blue-500 to-cyan-400",
    color: "blue",
    quote: "We dogfood InvoiceAI for all our vendor invoices. It's processed over $47M in invoices for us this year with zero errors.",
    quoteAuthor: "Sarah Chen, CFO",
  },
  {
    id: "workflow",
    icon: Workflow,
    name: "FlowEngine",
    description: "All our approvals run through our own workflow automation",
    stats: [
      { label: "Active Workflows", value: "23" },
      { label: "Avg Approval", value: "2.3h" },
      { label: "Auto-Routed", value: "100%" },
    ],
    gradient: "from-purple-500 to-pink-400",
    color: "purple",
    quote: "Our approval cycles dropped from 5 days to 4 hours. We practice what we preach.",
    quoteAuthor: "Marcus Johnson, VP Operations",
  },
  {
    id: "analytics",
    icon: BarChart3,
    name: "InsightHub",
    description: "Real-time visibility into our own financial operations",
    stats: [
      { label: "Dashboards", value: "12" },
      { label: "Reports Generated", value: "847" },
      { label: "Insights/Month", value: "340+" },
    ],
    gradient: "from-emerald-500 to-teal-400",
    color: "emerald",
    quote: "I start every morning with our InsightHub dashboard. It's how we caught a $127K billing error last quarter.",
    quoteAuthor: "David Park, CEO",
  },
  {
    id: "fraud",
    icon: Shield,
    name: "FraudGuard",
    description: "Protecting our own finances with our fraud detection system",
    stats: [
      { label: "Threats Blocked", value: "23" },
      { label: "False Positives", value: "0" },
      { label: "Money Saved", value: "$89K" },
    ],
    gradient: "from-orange-500 to-amber-400",
    color: "orange",
    quote: "FraudGuard caught a sophisticated vendor impersonation attempt that could have cost us $89,000.",
    quoteAuthor: "Lisa Wong, Head of Security",
  },
  {
    id: "integration",
    icon: Layers,
    name: "ConnectHub",
    description: "Seamless integration with our entire tech stack",
    stats: [
      { label: "Integrations", value: "8" },
      { label: "Data Sync", value: "Real-time" },
      { label: "Uptime", value: "99.99%" },
    ],
    gradient: "from-rose-500 to-pink-400",
    color: "rose",
    quote: "Our NetSuite, SAP, and 6 other systems stay perfectly in sync. Zero manual data entry.",
    quoteAuthor: "Tom Richards, IT Director",
  },
  {
    id: "assistant",
    icon: Bot,
    name: "krinAI Assistant",
    description: "Our AI copilot helps every team member daily",
    stats: [
      { label: "Queries/Day", value: "340+" },
      { label: "User Adoption", value: "100%" },
      { label: "Time Saved", value: "2.5h/day" },
    ],
    gradient: "from-indigo-500 to-violet-400",
    color: "indigo",
    quote: "I ask our AI assistant questions like 'What's our burn rate?' and get instant answers. It's like having a financial analyst on demand.",
    quoteAuthor: "Jennifer Kim, Head of FP&A",
  },
];

// Team testimonials
const teamTestimonials = [
  {
    name: "David Park",
    role: "CEO & Co-founder",
    image: "DP",
    quote: "We built krinAI because we were frustrated with manual invoice processing. Now we use it every day. If it's not good enough for us, it's not good enough for our customers.",
    highlight: "Every feature we build is tested internally first",
  },
  {
    name: "Sarah Chen",
    role: "CFO",
    image: "SC",
    quote: "I've seen both sides - the old way and the krinAI way. We've reduced our AP team's workload by 73% while improving accuracy. They now focus on strategic vendor relationships instead of data entry.",
    highlight: "73% reduction in manual workload",
  },
  {
    name: "Marcus Johnson",
    role: "VP of Operations",
    image: "MJ",
    quote: "Our approval workflows used to be a bottleneck. Now they're a competitive advantage. We've had vendors comment on how fast we process payments.",
    highlight: "From 5 days to 4 hours approval time",
  },
];

// Timeline of our internal adoption
const adoptionTimeline = [
  {
    year: "2021",
    title: "Built for Ourselves",
    description: "Started developing krinAI to solve our own invoice processing headaches",
    icon: Coffee,
  },
  {
    year: "2022",
    title: "Full Internal Rollout",
    description: "Every team member using krinAI for all invoice operations",
    icon: Rocket,
  },
  {
    year: "2023",
    title: "Product Launch",
    description: "After 18 months of internal refinement, we launched to the public",
    icon: Globe,
  },
  {
    year: "2024",
    title: "Industry Leader",
    description: "Now serving 2,000+ companies with the same tools we use daily",
    icon: Award,
  },
];

// Live metrics simulation
const liveMetricsData = {
  processedToday: 2847,
  avgProcessingTime: 0.82,
  autoApproved: 94.2,
  pendingReview: 165,
  totalSavings: 127840,
  activeUsers: 47,
};

export default function DogfoodingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [animatedMetrics, setAnimatedMetrics] = useState({
    invoices: 0,
    hours: 0,
    accuracy: 0,
    cost: 0,
  });
  const [liveMetrics, setLiveMetrics] = useState(liveMetricsData);
  const [pulseEffect, setPulseEffect] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  // Initialize animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animate metrics on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate numbers
          const duration = 2000;
          const steps = 60;
          const interval = duration / steps;

          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setAnimatedMetrics({
              invoices: Math.floor(ourMetrics.invoicesProcessed.value * easeOut),
              hours: Math.floor(ourMetrics.timeSaved.value * easeOut),
              accuracy: Math.floor(ourMetrics.accuracy.value * easeOut * 10) / 10,
              cost: Math.floor(ourMetrics.costReduction.value * easeOut),
            });

            if (step >= steps) clearInterval(timer);
          }, interval);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Live metrics simulation
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setLiveMetrics((prev) => ({
        ...prev,
        processedToday: prev.processedToday + Math.floor(Math.random() * 5),
        avgProcessingTime: 0.75 + Math.random() * 0.15,
        autoApproved: 93 + Math.random() * 2,
        pendingReview: Math.max(100, prev.pendingReview + Math.floor(Math.random() * 20 - 10)),
        totalSavings: prev.totalSavings + Math.floor(Math.random() * 50),
      }));
      setPulseEffect(true);
      setTimeout(() => setPulseEffect(false), 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Auto-rotate products
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveProduct((prev) => (prev + 1) % productsWeUse.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

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
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 right-20 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-float animation-delay-300" />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-float animation-delay-500" />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse-glow"
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
                <Heart className="h-4 w-4 text-pink-400" />
                <span className="text-sm font-medium text-blue-300">
                  We Use What We Build
                </span>
              </div>

              {/* Headline */}
              <h1
                className={`text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 ${
                  isVisible ? "animate-slide-up animation-delay-100" : "opacity-0"
                }`}
              >
                <span className="text-white">We Don't Just Build</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  We Use It Every Day
                </span>
              </h1>

              {/* Subheadline */}
              <p
                className={`text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-3xl mx-auto ${
                  isVisible ? "animate-slide-up animation-delay-200" : "opacity-0"
                }`}
              >
                Every feature in krinAI was born from our own frustration with manual processes.
                <span className="text-white font-semibold"> We're our own toughest customer</span> —
                and that's exactly why our product works so well.
              </p>

              {/* CTA buttons */}
              <div
                className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${
                  isVisible ? "animate-slide-up animation-delay-300" : "opacity-0"
                }`}
              >
                <Link
                  href="#live-metrics"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-8 py-4 rounded-xl transition-all shadow-xl shadow-blue-500/25 hover:shadow-purple-500/40 hover:scale-105"
                >
                  See Our Live Metrics
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-slate-700 hover:border-slate-600 bg-slate-800/50 hover:bg-slate-800 px-8 py-4 rounded-xl transition-all"
                >
                  <Play className="h-4 w-4" />
                  Try It Yourself
                </Link>
              </div>
            </div>

            {/* Hero visual - Live dashboard preview */}
            <div
              className={`mt-20 relative ${
                isVisible ? "animate-scale-in animation-delay-400" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 pointer-events-none" />
              <div className="relative mx-auto max-w-6xl">
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-3xl border border-slate-700/50 p-8 backdrop-blur-xl shadow-2xl">
                  {/* Dashboard header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-sm font-medium text-slate-300">Live Internal Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Clock className="h-4 w-4" />
                      <span>Updated 3 seconds ago</span>
                    </div>
                  </div>

                  {/* Live metrics grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: "Processed Today", value: liveMetrics.processedToday.toLocaleString(), icon: FileSearch, color: "blue" },
                      { label: "Avg Time", value: `${liveMetrics.avgProcessingTime.toFixed(2)}s`, icon: Timer, color: "purple" },
                      { label: "Auto-Approved", value: `${liveMetrics.autoApproved.toFixed(1)}%`, icon: CheckCircle2, color: "emerald" },
                      { label: "Savings Today", value: `$${liveMetrics.totalSavings.toLocaleString()}`, icon: DollarSign, color: "amber" },
                    ].map((metric) => {
                      const Icon = metric.icon;
                      return (
                        <div
                          key={metric.label}
                          className={`relative bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 transition-all ${
                            pulseEffect ? "scale-[1.02] border-blue-500/30" : ""
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className={`h-4 w-4 text-${metric.color}-400`} />
                            <span className="text-xs text-slate-500">{metric.label}</span>
                          </div>
                          <div className="text-2xl font-bold text-white">{metric.value}</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Activity feed */}
                  <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
                    <div className="flex items-center gap-2 mb-3">
                      <Activity className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-medium text-slate-300">Live Activity</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { action: "Invoice processed", vendor: "Acme Corp", amount: "$12,450", time: "Just now" },
                        { action: "Auto-approved", vendor: "TechSupply Inc", amount: "$8,200", time: "12s ago" },
                        { action: "Flagged for review", vendor: "New Vendor Co", amount: "$45,000", time: "34s ago" },
                      ].map((activity, i) => (
                        <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-slate-700/30 last:border-0">
                          <div className="flex items-center gap-3">
                            <CircleDot className={`h-2 w-2 ${i === 0 ? "text-green-400" : i === 1 ? "text-blue-400" : "text-amber-400"}`} />
                            <span className="text-slate-300">{activity.action}</span>
                            <span className="text-slate-500">{activity.vendor}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-white font-medium">{activity.amount}</span>
                            <span className="text-slate-500 text-xs">{activity.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Metrics Section */}
        <section
          ref={metricsRef}
          className="relative py-20 lg:py-28 overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-slate-950" />
          <div className="absolute inset-0 bg-radial-glow-bottom" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6">
                <BarChart3 className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">
                  Our Internal Metrics
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                The Numbers Don't Lie
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Here's what happened when we applied krinAI to our own operations
              </p>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { metric: ourMetrics.invoicesProcessed, value: animatedMetrics.invoices.toLocaleString(), suffix: "" },
                { metric: ourMetrics.timeSaved, value: animatedMetrics.hours.toLocaleString(), suffix: "" },
                { metric: ourMetrics.accuracy, value: animatedMetrics.accuracy.toFixed(1), suffix: "%" },
                { metric: ourMetrics.costReduction, value: animatedMetrics.cost, suffix: "%" },
              ].map((item, index) => {
                const Icon = item.metric.icon;
                return (
                  <div
                    key={item.metric.label}
                    className="relative group bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-500"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-4">
                        <Icon className="h-6 w-6 text-blue-400" />
                      </div>
                      <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                        {item.value}{item.suffix}
                      </div>
                      <div className="text-sm text-slate-400 mb-1">{item.metric.label}</div>
                      <div className="text-xs text-emerald-400">{item.metric.change}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Products We Use Section */}
        <section id="live-metrics" className="relative py-20 lg:py-28 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6">
                <Zap className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">
                  Our Product Stack
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Every Product, <span className="text-gradient">Every Day</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                We use every single product in our suite for our own operations
              </p>
            </div>

            {/* Products showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {productsWeUse.map((product, index) => {
                const Icon = product.icon;
                const isActive = activeProduct === index;

                return (
                  <div
                    key={product.id}
                    className={`group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border transition-all duration-500 ${
                      isActive
                        ? `border-${product.color}-500/50 shadow-xl shadow-${product.color}-500/10`
                        : "border-slate-700/50 hover:border-slate-600"
                    }`}
                    onMouseEnter={() => setActiveProduct(index)}
                  >
                    {/* Gradient overlay */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                    />

                    <div className="relative p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div
                            className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${product.gradient} shadow-lg`}
                          >
                            <Icon className="h-7 w-7 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{product.name}</h3>
                            <p className="text-sm text-slate-400">{product.description}</p>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {product.stats.map((stat) => (
                          <div
                            key={stat.label}
                            className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30"
                          >
                            <div className="text-lg font-bold text-white">{stat.value}</div>
                            <div className="text-xs text-slate-500">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Quote */}
                      <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/30">
                        <Quote className="h-5 w-5 text-slate-600 mb-2" />
                        <p className="text-sm text-slate-300 italic mb-3">"{product.quote}"</p>
                        <p className="text-xs text-slate-500">— {product.quoteAuthor}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-slate-950" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 mb-6">
                <Rocket className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-300">
                  Our Journey
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Built From <span className="text-gradient">Necessity</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                We didn't start as a product company. We started as a team frustrated with manual processes.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-pink-500/50 hidden lg:block" />

              <div className="space-y-12 lg:space-y-0">
                {adoptionTimeline.map((item, index) => {
                  const Icon = item.icon;
                  const isLeft = index % 2 === 0;

                  return (
                    <div
                      key={item.year}
                      className={`relative lg:flex lg:items-center ${
                        isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                      }`}
                    >
                      {/* Content */}
                      <div className={`lg:w-1/2 ${isLeft ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50 hover:border-blue-500/30 transition-all">
                          <div className={`flex items-center gap-3 mb-4 ${isLeft ? "lg:justify-end" : ""}`}>
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                              <Icon className="h-5 w-5 text-blue-400" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                              {item.year}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                          <p className="text-slate-400">{item.description}</p>
                        </div>
                      </div>

                      {/* Center dot */}
                      <div className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-4 border-slate-950" />
                      </div>

                      {/* Spacer for opposite side */}
                      <div className="lg:w-1/2" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Team Testimonials */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 mb-6">
                <Users className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-300">
                  From Our Team
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Hear It From <span className="text-gradient">The Users</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Our own team members are krinAI's biggest advocates
              </p>
            </div>

            {/* Testimonials grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {teamTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 hover:border-blue-500/30 transition-all duration-500"
                >
                  {/* Highlight badge */}
                  <div className="absolute -top-3 left-6">
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-xs font-semibold text-white shadow-lg">
                      {testimonial.highlight}
                    </div>
                  </div>

                  <div className="p-8 pt-10">
                    {/* Quote */}
                    <Quote className="h-8 w-8 text-slate-700 mb-4" />
                    <p className="text-slate-300 leading-relaxed mb-6">
                      "{testimonial.quote}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {testimonial.image}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-sm text-slate-400">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
          <div className="absolute inset-0 bg-slate-950/80" />

          <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Experience What We
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Use Every Day?
              </span>
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              Join 2,000+ companies using the same tools we built for ourselves.
              Start your free trial today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/demo"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-8 py-4 rounded-xl transition-all shadow-xl shadow-blue-500/25 hover:shadow-purple-500/40 hover:scale-105"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-slate-600 hover:border-slate-500 bg-slate-800/50 hover:bg-slate-800 px-8 py-4 rounded-xl transition-all"
              >
                View All Products
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="text-sm">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="text-sm">14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="text-sm">Cancel anytime</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
