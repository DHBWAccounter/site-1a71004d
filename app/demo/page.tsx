"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Play,
  Pause,
  CheckCircle2,
  Zap,
  TrendingUp,
  Shield,
  Bot,
  FileSearch,
  Workflow,
  BarChart3,
  Layers,
  ChevronRight,
  MousePointer2,
  Gauge,
  Activity,
  Clock,
  DollarSign,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
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
    gradient: "from-blue-500 to-cyan-400",
    color: "blue",
  },
  {
    id: "workflow-automation",
    icon: Workflow,
    name: "FlowEngine",
    tagline: "Automated Approval Workflows",
    description:
      "Design custom approval workflows that adapt to your business rules. Route invoices intelligently based on amount, department, or vendor.",
    gradient: "from-purple-500 to-pink-400",
    color: "purple",
  },
  {
    id: "analytics-suite",
    icon: BarChart3,
    name: "InsightHub",
    tagline: "Real-Time Analytics Dashboard",
    description:
      "Transform invoice data into actionable insights. Track spending patterns, vendor performance, and cash flow forecasts in real-time.",
    gradient: "from-emerald-500 to-teal-400",
    color: "emerald",
  },
  {
    id: "fraud-detection",
    icon: Shield,
    name: "FraudGuard",
    tagline: "AI-Powered Fraud Prevention",
    description:
      "Detect anomalies and prevent fraud before it happens. Machine learning models trained on millions of invoices identify suspicious patterns instantly.",
    gradient: "from-orange-500 to-amber-400",
    color: "orange",
  },
  {
    id: "integration-hub",
    icon: Layers,
    name: "ConnectHub",
    tagline: "Universal ERP Integration",
    description:
      "Seamlessly connect with 40+ ERP and accounting systems. Two-way sync ensures your data is always up-to-date across all platforms.",
    gradient: "from-rose-500 to-pink-400",
    color: "rose",
  },
  {
    id: "ai-assistant",
    icon: Bot,
    name: "krinAI Assistant",
    tagline: "Your AI-Powered Finance Copilot",
    description:
      "Ask questions in natural language and get instant answers about your invoices, vendors, and spending patterns. Powered by advanced LLMs.",
    gradient: "from-indigo-500 to-violet-400",
    color: "indigo",
  },
];

// Invoice processing simulation data
const invoiceData = {
  vendor: "Acme Corporation",
  invoiceNumber: "INV-2024-0847",
  amount: "$24,850.00",
  date: "2024-01-15",
  dueDate: "2024-02-15",
  items: [
    { description: "Enterprise Software License", quantity: 1, unitPrice: "$15,000.00", total: "$15,000.00" },
    { description: "Implementation Services", quantity: 40, unitPrice: "$200.00", total: "$8,000.00" },
    { description: "Annual Support Package", quantity: 1, unitPrice: "$1,850.00", total: "$1,850.00" },
  ],
  extractedFields: [
    { label: "Vendor Name", value: "Acme Corporation", confidence: 99.8 },
    { label: "Invoice Number", value: "INV-2024-0847", confidence: 100 },
    { label: "Invoice Date", value: "Jan 15, 2024", confidence: 99.5 },
    { label: "Due Date", value: "Feb 15, 2024", confidence: 98.9 },
    { label: "Total Amount", value: "$24,850.00", confidence: 100 },
    { label: "Tax Amount", value: "$2,485.00", confidence: 99.7 },
    { label: "Payment Terms", value: "Net 30", confidence: 99.2 },
    { label: "Line Items", value: "3 items", confidence: 99.9 },
  ],
};

// Analytics data for charts
const analyticsData = {
  monthlySpend: [
    { month: "Jul", amount: 145000 },
    { month: "Aug", amount: 162000 },
    { month: "Sep", amount: 158000 },
    { month: "Oct", amount: 189000 },
    { month: "Nov", amount: 175000 },
    { month: "Dec", amount: 198000 },
  ],
  topVendors: [
    { name: "Acme Corp", spend: 125000, invoices: 47 },
    { name: "TechSupply Inc", spend: 98000, invoices: 32 },
    { name: "Global Services", spend: 87000, invoices: 28 },
    { name: "Prime Logistics", spend: 65000, invoices: 19 },
  ],
  metrics: [
    { label: "Processed Today", value: "247", change: "+12%", positive: true },
    { label: "Avg Processing Time", value: "1.2s", change: "-0.3s", positive: true },
    { label: "Accuracy Rate", value: "99.2%", change: "+0.1%", positive: true },
    { label: "Cost Savings", value: "$48K", change: "+$8K", positive: true },
  ],
};

// Workflow steps
const workflowSteps = [
  { id: 1, name: "Invoice Received", icon: FileSearch, status: "complete" },
  { id: 2, name: "Data Extraction", icon: Zap, status: "complete" },
  { id: 3, name: "Validation", icon: CheckCircle2, status: "complete" },
  { id: 4, name: "PO Matching", icon: RefreshCw, status: "processing" },
  { id: 5, name: "Approval Routing", icon: Users, status: "pending" },
  { id: 6, name: "Payment", icon: DollarSign, status: "pending" },
];

export default function DemoPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [processingStep, setProcessingStep] = useState(0);
  const [extractedCount, setExtractedCount] = useState(0);
  const [chartBars, setChartBars] = useState<number[]>([]);
  const [workflowStep, setWorkflowStep] = useState(0);
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [fraudAlerts, setFraudAlerts] = useState<typeof fraudAlertsData>([]);
  const [selectedProduct, setSelectedProduct] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);

  // Fraud alerts data
  const fraudAlertsData = [
    { id: 1, type: "duplicate", severity: "high", message: "Duplicate invoice detected", invoice: "INV-2024-0847", vendor: "Acme Corp" },
    { id: 2, type: "anomaly", severity: "medium", message: "Unusual amount pattern", invoice: "INV-2024-0892", vendor: "TechSupply Inc" },
    { id: 3, type: "vendor", severity: "low", message: "New vendor verification needed", invoice: "INV-2024-0901", vendor: "New Vendor Co" },
  ];

  // Initialize animations
  useEffect(() => {
    setIsVisible(true);
    setActiveDemo("invoice-ai");
  }, []);

  // Invoice processing animation
  useEffect(() => {
    if (activeDemo === "invoice-ai" && isPlaying) {
      const interval = setInterval(() => {
        setProcessingStep((prev) => (prev + 1) % 4);
        setExtractedCount((prev) => (prev >= invoiceData.extractedFields.length ? 0 : prev + 1));
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [activeDemo, isPlaying]);

  // Chart animation
  useEffect(() => {
    if (activeDemo === "analytics-suite") {
      const animateChart = () => {
        analyticsData.monthlySpend.forEach((_, index) => {
          setTimeout(() => {
            setChartBars((prev) => {
              const newBars = [...prev];
              newBars[index] = analyticsData.monthlySpend[index].amount / 2200;
              return newBars;
            });
          }, index * 200);
        });
      };
      animateChart();
      const interval = setInterval(animateChart, 2000);
      return () => clearInterval(interval);
    }
  }, [activeDemo]);

  // Workflow animation
  useEffect(() => {
    if (activeDemo === "workflow-automation" && isPlaying) {
      const interval = setInterval(() => {
        setWorkflowStep((prev) => (prev + 1) % (workflowSteps.length + 2));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [activeDemo, isPlaying]);

  // AI Chat simulation
  useEffect(() => {
    if (activeDemo === "ai-assistant" && chatMessages.length === 0) {
      setChatMessages([
        { role: "assistant", content: "Hello! I'm your AI finance assistant. Ask me anything about your invoices, vendors, or spending patterns." },
      ]);
    }
  }, [activeDemo, chatMessages.length]);

  // Fraud detection animation
  useEffect(() => {
    if (activeDemo === "fraud-detection") {
      const showAlert = (index: number) => {
        if (index < fraudAlertsData.length) {
          setTimeout(() => {
            setFraudAlerts((prev) => [...prev, fraudAlertsData[index]]);
            showAlert(index + 1);
          }, 1500);
        }
      };
      setFraudAlerts([]);
      showAlert(0);
    }
  }, [activeDemo]);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [...prev, { role: "user", content: chatInput }]);
    setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "Based on your data, you've processed 247 invoices today with an average processing time of 1.2 seconds. Your accuracy rate is 99.2%.",
        "Your top vendor this month is Acme Corp with $125,000 in spend across 47 invoices. That's 15% higher than last month.",
        "I found 3 invoices pending approval. The total value is $48,750. Would you like me to show you the details?",
        "Your cash flow forecast shows a projected spend of $198,000 for December, which is 13% higher than November.",
      ];
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: responses[Math.floor(Math.random() * responses.length)] },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <Header />
      <main className="relative">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden"
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
            {[...Array(30)].map((_, i) => (
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
                <Play className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">
                  Interactive Product Demonstrations
                </span>
              </div>

              {/* Headline */}
              <h1
                className={`text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 ${
                  isVisible ? "animate-slide-up animation-delay-100" : "opacity-0"
                }`}
              >
                <span className="text-white">See Our Products</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  In Action
                </span>
              </h1>

              {/* Subheadline */}
              <p
                className={`text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-3xl mx-auto ${
                  isVisible ? "animate-slide-up animation-delay-200" : "opacity-0"
                }`}
              >
                Experience the power of our AI-driven platform through interactive demonstrations.
                <span className="text-white font-semibold"> Watch, interact, and be amazed.</span>
              </p>

              {/* CTA buttons */}
              <div
                className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${
                  isVisible ? "animate-slide-up animation-delay-300" : "opacity-0"
                }`}
              >
                <Link
                  href="#demos"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-8 py-4 rounded-xl transition-all shadow-xl shadow-blue-500/25 hover:shadow-purple-500/40 hover:scale-105"
                >
                  Start Exploring
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-slate-700 hover:border-slate-600 bg-slate-800/50 hover:bg-slate-800 px-8 py-4 rounded-xl transition-all"
                >
                  View All Products
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Product Selector */}
        <section id="demos" className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950" />
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {products.map((product, index) => {
                const Icon = product.icon;
                const isActive = activeDemo === product.id;
                return (
                  <button
                    key={product.id}
                    onClick={() => {
                      setActiveDemo(product.id);
                      setSelectedProduct(index);
                      setExtractedCount(0);
                      setChartBars([]);
                      setWorkflowStep(0);
                      setFraudAlerts([]);
                    }}
                    className={`group relative flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-r ${product.gradient} text-white shadow-lg`
                        : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white border border-slate-700/50"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="hidden sm:inline">{product.name}</span>
                    {isActive && (
                      <div className={`absolute -inset-1 bg-gradient-to-r ${product.gradient} rounded-xl opacity-30 blur-lg -z-10`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950" />
          <div className="absolute inset-0 bg-radial-glow-bottom" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            {/* InvoiceAI Pro Demo */}
            {activeDemo === "invoice-ai" && (
              <div className="animate-fade-in">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    InvoiceAI Pro <span className="text-gradient">Live Demo</span>
                  </h2>
                  <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    Watch as our AI extracts and validates invoice data in real-time with 99.2% accuracy.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Invoice Preview */}
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-50" />
                    <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700/50 p-8 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                            <FileSearch className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <div className="text-lg font-bold text-white">{invoiceData.vendor}</div>
                            <div className="text-sm text-slate-400">{invoiceData.invoiceNumber}</div>
                          </div>
                        </div>
                        <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          processingStep >= 2 ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                        }`}>
                          {processingStep === 0 && "Scanning..."}
                          {processingStep === 1 && "Extracting..."}
                          {processingStep === 2 && "Validating..."}
                          {processingStep === 3 && "Complete"}
                        </div>
                      </div>

                      {/* Invoice details */}
                      <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs text-slate-500 mb-1">Invoice Date</div>
                            <div className="text-sm text-white">{invoiceData.date}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500 mb-1">Due Date</div>
                            <div className="text-sm text-white">{invoiceData.dueDate}</div>
                          </div>
                        </div>

                        {/* Line items */}
                        <div className="border-t border-slate-700/50 pt-4">
                          <div className="text-xs text-slate-500 mb-3">Line Items</div>
                          <div className="space-y-2">
                            {invoiceData.items.map((item, i) => (
                              <div key={i} className="flex justify-between text-sm">
                                <span className="text-slate-300">{item.description}</span>
                                <span className="text-white font-medium">{item.total}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="border-t border-slate-700/50 pt-4 flex justify-between items-center">
                        <span className="text-lg font-semibold text-white">Total Amount</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                          {invoiceData.amount}
                        </span>
                      </div>

                      {/* Scanning animation overlay */}
                      {processingStep < 2 && (
                        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent animate-scan" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Extraction Results */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Extracted Fields</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-400">Auto-play</span>
                          <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className={`w-10 h-6 rounded-full transition-colors ${
                              isPlaying ? "bg-blue-500" : "bg-slate-700"
                            }`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                              isPlaying ? "translate-x-5" : "translate-x-1"
                            }`} />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {invoiceData.extractedFields.map((field, index) => (
                          <div
                            key={field.label}
                            className={`flex items-center justify-between p-3 rounded-lg transition-all duration-500 ${
                              index < extractedCount
                                ? "bg-slate-800/50 border border-slate-700/50"
                                : "bg-slate-900/30 border border-transparent"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {index < extractedCount ? (
                                <CheckCircle2 className="h-4 w-4 text-green-400" />
                              ) : (
                                <div className="h-4 w-4 rounded-full border-2 border-slate-600" />
                              )}
                              <div>
                                <div className="text-xs text-slate-500">{field.label}</div>
                                <div className={`text-sm font-medium transition-all ${
                                  index < extractedCount ? "text-white" : "text-slate-600"
                                }`}>
                                  {index < extractedCount ? field.value : "---"}
                                </div>
                              </div>
                            </div>
                            {index < extractedCount && (
                              <div className="flex items-center gap-1.5">
                                <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
                                    style={{ width: `${field.confidence}%` }}
                                  />
                                </div>
                                <span className="text-xs text-green-400 font-medium">
                                  {field.confidence}%
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Processing stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 p-4 text-center">
                        <div className="text-2xl font-bold text-white">1.2s</div>
                        <div className="text-xs text-slate-400">Processing Time</div>
                      </div>
                      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 p-4 text-center">
                        <div className="text-2xl font-bold text-green-400">99.2%</div>
                        <div className="text-xs text-slate-400">Accuracy</div>
                      </div>
                      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 p-4 text-center">
                        <div className="text-2xl font-bold text-white">8</div>
                        <div className="text-xs text-slate-400">Fields Extracted</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FlowEngine Demo */}
            {activeDemo === "workflow-automation" && (
              <div className="animate-fade-in">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    FlowEngine <span className="text-gradient">Live Demo</span>
                  </h2>
                  <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    Watch invoices flow through intelligent approval workflows automatically.
                  </p>
                </div>

                {/* Workflow visualization */}
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-50" />
                  <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700/50 p-8 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-lg font-semibold text-white">Invoice Approval Workflow</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-400">Auto-play</span>
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className={`w-10 h-6 rounded-full transition-colors ${
                            isPlaying ? "bg-purple-500" : "bg-slate-700"
                          }`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                            isPlaying ? "translate-x-5" : "translate-x-1"
                          }`} />
                        </button>
                      </div>
                    </div>

                    {/* Workflow steps */}
                    <div className="relative">
                      {/* Connection line */}
                      <div className="absolute top-8 left-0 right-0 h-0.5 bg-slate-700" />
                      <div
                        className="absolute top-8 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000"
                        style={{ width: `${(workflowStep / (workflowSteps.length - 1)) * 100}%` }}
                      />

                      <div className="relative grid grid-cols-6 gap-4">
                        {workflowSteps.map((step, index) => {
                          const Icon = step.icon;
                          const isActive = index === workflowStep;
                          const isComplete = index < workflowStep;
                          const isPending = index > workflowStep;

                          return (
                            <div key={step.id} className="flex flex-col items-center">
                              <div
                                className={`relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                  isComplete
                                    ? "bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30"
                                    : isActive
                                    ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500 animate-pulse"
                                    : "bg-slate-800 border border-slate-700"
                                }`}
                              >
                                <Icon
                                  className={`h-7 w-7 transition-all ${
                                    isComplete || isActive ? "text-white" : "text-slate-500"
                                  }`}
                                />
                                {isActive && (
                                  <div className="absolute -inset-2 bg-purple-500/20 rounded-2xl animate-ping" />
                                )}
                              </div>
                              <div className="mt-3 text-center">
                                <div className={`text-xs font-medium ${
                                  isComplete || isActive ? "text-white" : "text-slate-500"
                                }`}>
                                  {step.name}
                                </div>
                                <div className={`text-xs mt-1 ${
                                  isComplete ? "text-green-400" : isActive ? "text-purple-400" : "text-slate-600"
                                }`}>
                                  {isComplete ? "Complete" : isActive ? "Processing" : isPending ? "Pending" : ""}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Current step details */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                        <div className="flex items-center gap-3 mb-3">
                          <Clock className="h-5 w-5 text-purple-400" />
                          <span className="text-sm font-medium text-white">Processing Time</span>
                        </div>
                        <div className="text-2xl font-bold text-white">2.4s</div>
                        <div className="text-xs text-green-400 mt-1">85% faster than manual</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                        <div className="flex items-center gap-3 mb-3">
                          <Users className="h-5 w-5 text-purple-400" />
                          <span className="text-sm font-medium text-white">Approvers</span>
                        </div>
                        <div className="text-2xl font-bold text-white">3</div>
                        <div className="text-xs text-slate-400 mt-1">Auto-routed based on amount</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                        <div className="flex items-center gap-3 mb-3">
                          <CheckCircle2 className="h-5 w-5 text-purple-400" />
                          <span className="text-sm font-medium text-white">SLA Status</span>
                        </div>
                        <div className="text-2xl font-bold text-green-400">On Track</div>
                        <div className="text-xs text-slate-400 mt-1">Due in 4 hours</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* InsightHub Demo */}
            {activeDemo === "analytics-suite" && (
              <div className="animate-fade-in">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    InsightHub <span className="text-gradient">Live Demo</span>
                  </h2>
                  <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    Real-time analytics and insights from your invoice data.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Metrics cards */}
                  <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {analyticsData.metrics.map((metric, index) => (
                      <div
                        key={metric.label}
                        className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 p-5"
                      >
                        <div className="text-sm text-slate-400 mb-2">{metric.label}</div>
                        <div className="text-2xl font-bold text-white">{metric.value}</div>
                        <div className={`text-xs mt-1 ${metric.positive ? "text-green-400" : "text-red-400"}`}>
                          {metric.change}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chart */}
                  <div className="lg:col-span-2 relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-2xl opacity-50" />
                    <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700/50 p-6 backdrop-blur-sm">
                      <h3 className="text-lg font-semibold text-white mb-6">Monthly Spend Trend</h3>
                      <div className="flex items-end justify-between h-48 gap-4">
                        {analyticsData.monthlySpend.map((data, index) => (
                          <div key={data.month} className="flex-1 flex flex-col items-center">
                            <div className="relative w-full flex justify-center">
                              <div
                                className="w-full max-w-12 bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-lg transition-all duration-1000 ease-out"
                                style={{ height: `${chartBars[index] || 0}px` }}
                              >
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white font-medium whitespace-nowrap">
                                  ${(data.amount / 1000).toFixed(0)}K
                                </div>
                              </div>
                            </div>
                            <div className="text-xs text-slate-400 mt-2">{data.month}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Top vendors */}
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Top Vendors</h3>
                    <div className="space-y-4">
                      {analyticsData.topVendors.map((vendor, index) => (
                        <div key={vendor.name} className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-sm font-bold text-emerald-400">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-white">{vendor.name}</div>
                            <div className="text-xs text-slate-400">{vendor.invoices} invoices</div>
                          </div>
                          <div className="text-sm font-semibold text-white">
                            ${(vendor.spend / 1000).toFixed(0)}K
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FraudGuard Demo */}
            {activeDemo === "fraud-detection" && (
              <div className="animate-fade-in">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    FraudGuard <span className="text-gradient">Live Demo</span>
                  </h2>
                  <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    Real-time fraud detection and prevention in action.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Alert feed */}
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-3xl blur-2xl opacity-50" />
                    <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700/50 p-6 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Live Alert Feed</h3>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          <span className="text-xs text-slate-400">Monitoring</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {fraudAlerts.map((alert, index) => (
                          <div
                            key={alert.id}
                            className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 animate-slide-up"
                            style={{ animationDelay: `${index * 200}ms` }}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                alert.severity === "high"
                                  ? "bg-red-500/20"
                                  : alert.severity === "medium"
                                  ? "bg-yellow-500/20"
                                  : "bg-blue-500/20"
                              }`}>
                                <AlertTriangle className={`h-5 w-5 ${
                                  alert.severity === "high"
                                    ? "text-red-400"
                                    : alert.severity === "medium"
                                    ? "text-yellow-400"
                                    : "text-blue-400"
                                }`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-white">{alert.message}</span>
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                                    alert.severity === "high"
                                      ? "bg-red-500/20 text-red-400"
                                      : alert.severity === "medium"
                                      ? "bg-yellow-500/20 text-yellow-400"
                                      : "bg-blue-500/20 text-blue-400"
                                  }`}>
                                    {alert.severity}
                                  </span>
                                </div>
                                <div className="text-xs text-slate-400 mt-1">
                                  {alert.invoice} • {alert.vendor}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {fraudAlerts.length === 0 && (
                          <div className="text-center py-8 text-slate-500">
                            <Shield className="h-12 w-12 mx-auto mb-3 opacity-50" />
                            <p>Scanning invoices for anomalies...</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="h-5 w-5 text-orange-400" />
                          <span className="text-sm text-slate-400">Threats Blocked</span>
                        </div>
                        <div className="text-3xl font-bold text-white">247</div>
                        <div className="text-xs text-green-400 mt-1">$2.1M saved</div>
                      </div>
                      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="h-5 w-5 text-orange-400" />
                          <span className="text-sm text-slate-400">Detection Rate</span>
                        </div>
                        <div className="text-3xl font-bold text-green-400">99.9%</div>
                        <div className="text-xs text-slate-400 mt-1">False positive: 0.1%</div>
                      </div>
                    </div>

                    {/* Risk score gauge */}
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Current Risk Level</h3>
                      <div className="relative h-4 bg-slate-700 rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 opacity-30" />
                        <div
                          className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full transition-all duration-1000"
                          style={{ width: "25%" }}
                        />
                        <div
                          className="absolute top-1/2 -translate-y-1/2 w-3 h-6 bg-white rounded shadow-lg transition-all duration-1000"
                          style={{ left: "calc(25% - 6px)" }}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-slate-400">
                        <span>Low</span>
                        <span>Medium</span>
                        <span>High</span>
                      </div>
                      <div className="mt-4 text-center">
                        <span className="text-2xl font-bold text-green-400">Low Risk</span>
                        <p className="text-sm text-slate-400 mt-1">All systems operating normally</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ConnectHub Demo */}
            {activeDemo === "integration-hub" && (
              <div className="animate-fade-in">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    ConnectHub <span className="text-gradient">Live Demo</span>
                  </h2>
                  <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    Seamless integration with 40+ ERP and accounting systems.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-50" />
                  <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700/50 p-8 backdrop-blur-sm">
                    {/* Central hub */}
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-rose-500/30">
                          <Layers className="h-16 w-16 text-white" />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-rose-500/30 animate-ping" />
                      </div>
                      <h3 className="text-xl font-bold text-white mt-6">krinAI Hub</h3>
                      <p className="text-sm text-slate-400 mt-2">Central integration platform</p>
                    </div>

                    {/* Connected systems */}
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                      {["SAP", "Oracle", "NetSuite", "QuickBooks", "Xero", "Sage", "Dynamics", "FreshBooks"].map((system, index) => (
                        <div
                          key={system}
                          className="group relative bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-rose-500/50 transition-all hover:scale-105"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center">
                              <CheckCircle2 className="h-5 w-5 text-green-400" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">{system}</div>
                              <div className="text-xs text-green-400">Connected</div>
                            </div>
                          </div>
                          {/* Animated connection line */}
                          <div className="absolute top-1/2 -right-6 w-6 h-0.5 bg-gradient-to-r from-rose-500/50 to-transparent group-hover:from-rose-500 transition-colors" />
                        </div>
                      ))}
                    </div>

                    {/* Sync stats */}
                    <div className="mt-8 grid grid-cols-3 gap-4">
                      <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-white">40+</div>
                        <div className="text-xs text-slate-400">Integrations</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-green-400">99.99%</div>
                        <div className="text-xs text-slate-400">Uptime</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-white">&lt;100ms</div>
                        <div className="text-xs text-slate-400">Latency</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Assistant Demo */}
            {activeDemo === "ai-assistant" && (
              <div className="animate-fade-in">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    krinAI Assistant <span className="text-gradient">Live Demo</span>
                  </h2>
                  <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    Ask questions in natural language and get instant answers about your invoices.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Chat interface */}
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 rounded-3xl blur-2xl opacity-50" />
                    <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700/50 backdrop-blur-sm overflow-hidden">
                      {/* Chat header */}
                      <div className="bg-slate-800/50 border-b border-slate-700/50 p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                            <Bot className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">krinAI Assistant</div>
                            <div className="text-xs text-green-400 flex items-center gap-1">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                              Online
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="h-80 overflow-y-auto p-4 space-y-4">
                        {chatMessages.map((message, index) => (
                          <div
                            key={index}
                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                                message.role === "user"
                                  ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white"
                                  : "bg-slate-700/50 text-white"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                            </div>
                          </div>
                        ))}
                        {isTyping && (
                          <div className="flex justify-start">
                            <div className="bg-slate-700/50 rounded-2xl px-4 py-3">
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce animation-delay-100" />
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce animation-delay-200" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Input */}
                      <form onSubmit={handleChatSubmit} className="border-t border-slate-700/50 p-4">
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Ask about your invoices..."
                            className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-opacity"
                          >
                            Send
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Try asking:</h3>
                      <div className="space-y-3">
                        {[
                          "How many invoices were processed today?",
                          "Who is my top vendor this month?",
                          "Show me pending approvals",
                          "What's my cash flow forecast?",
                        ].map((question, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setChatInput(question);
                            }}
                            className="w-full text-left px-4 py-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-indigo-500/50 text-sm text-slate-300 hover:text-white transition-all"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <Gauge className="h-5 w-5 text-indigo-400" />
                          <span className="text-sm text-slate-400">Response Time</span>
                        </div>
                        <div className="text-2xl font-bold text-white">&lt;1s</div>
                      </div>
                      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-5 w-5 text-indigo-400" />
                          <span className="text-sm text-slate-400">Accuracy</span>
                        </div>
                        <div className="text-2xl font-bold text-green-400">98%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute inset-0 bg-radial-glow" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-8">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">Ready to Transform Your Workflow?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Experience the Power of
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                AI-Driven Invoice Processing
              </span>
            </h2>

            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
              Join thousands of companies already saving time and money with krinAI.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#demo"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-8 py-4 rounded-xl transition-all shadow-xl shadow-blue-500/25 hover:shadow-purple-500/40 hover:scale-105"
              >
                Request a Demo
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-slate-700 hover:border-slate-600 bg-slate-800/50 hover:bg-slate-800 px-8 py-4 rounded-xl transition-all"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
