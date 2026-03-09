"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Building2,
  Globe,
  Users,
  CheckCircle2,
  ChevronDown,
  Zap,
  Shield,
  Heart,
  Star,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const contactMethods = [
  {
    id: "email",
    icon: Mail,
    title: "Email Us",
    description: "Get a response within 2 hours",
    value: "hello@krinai.com",
    gradient: "from-blue-500 to-cyan-400",
    available: true,
  },
  {
    id: "phone",
    icon: Phone,
    title: "Call Us",
    description: "Mon-Fri, 9am-6pm EST",
    value: "+1 (888) 555-KRIN",
    gradient: "from-purple-500 to-pink-400",
    available: true,
  },
  {
    id: "chat",
    icon: MessageSquare,
    title: "Live Chat",
    description: "Average response: 30 seconds",
    value: "Start a conversation",
    gradient: "from-emerald-500 to-teal-400",
    available: true,
  },
  {
    id: "meeting",
    icon: Users,
    title: "Schedule a Demo",
    description: "Book a personalized walkthrough",
    value: "Pick a time that works",
    gradient: "from-orange-500 to-amber-400",
    available: true,
  },
];

const offices = [
  {
    city: "San Francisco",
    country: "United States",
    address: "100 California Street, Suite 500",
    timezone: "PST (UTC-8)",
    employees: 120,
    icon: Building2,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    city: "New York",
    country: "United States",
    address: "350 Fifth Avenue, Floor 42",
    timezone: "EST (UTC-5)",
    employees: 85,
    icon: Globe,
    gradient: "from-purple-500 to-pink-400",
  },
  {
    city: "London",
    country: "United Kingdom",
    address: "30 St Mary Axe, Level 15",
    timezone: "GMT (UTC+0)",
    employees: 65,
    icon: Building2,
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    city: "Singapore",
    country: "Singapore",
    address: "Marina Bay Financial Centre",
    timezone: "SGT (UTC+8)",
    employees: 45,
    icon: Globe,
    gradient: "from-orange-500 to-amber-400",
  },
];

const faqs = [
  {
    question: "How quickly can I get started with krinAI?",
    answer: "Most customers are up and running within 24 hours. Our onboarding team will guide you through the setup process, including ERP integration and team training. Enterprise customers typically see full deployment within 1-2 weeks.",
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required. You can process up to 100 invoices during the trial period to experience the full power of our platform.",
  },
  {
    question: "What integrations do you support?",
    answer: "We integrate with 40+ ERP and accounting systems including SAP, Oracle, NetSuite, QuickBooks, Xero, and many more. Our API also allows custom integrations for enterprise customers.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We're SOC 2 Type II certified and GDPR compliant. All data is encrypted at rest and in transit. We use enterprise-grade security infrastructure with 99.99% uptime SLA.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades apply at the start of your next billing cycle. No hidden fees or penalties.",
  },
];

const departments = [
  { value: "sales", label: "Sales - Product inquiries & pricing" },
  { value: "support", label: "Support - Technical assistance" },
  { value: "partnerships", label: "Partnerships - Business development" },
  { value: "careers", label: "Careers - Job opportunities" },
  { value: "press", label: "Press - Media inquiries" },
  { value: "other", label: "Other - General questions" },
];

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    department: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeOffice, setActiveOffice] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [typingText, setTypingText] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [chatInput, setChatInput] = useState("");

  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Initialize animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Typing animation for hero
  useEffect(() => {
    const texts = ["Let's Talk", "Get in Touch", "Start a Conversation"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        setTypingText(currentText.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypingText(currentText.substring(0, charIndex + 1));
        charIndex++;
      }

      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => (isDeleting = true), 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
    };

    const interval = setInterval(type, 100);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate offices
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOffice((prev) => (prev + 1) % offices.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Initialize chat
  useEffect(() => {
    if (showChat && chatMessages.length === 0) {
      setChatMessages([
        { role: "assistant", content: "Hi there! 👋 I'm the krinAI assistant. How can I help you today?" },
      ]);
    }
  }, [showChat, chatMessages.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [...prev, { role: "user", content: chatInput }]);
    setChatInput("");

    setTimeout(() => {
      const responses = [
        "Great question! Our team typically responds within 2 hours during business hours. For urgent matters, I recommend using our live chat feature.",
        "I'd be happy to help you with that! You can also reach our sales team at sales@krinai.com for detailed pricing information.",
        "That's a common question! Our platform supports over 40 ERP integrations including SAP, Oracle, and NetSuite. Would you like me to connect you with a specialist?",
        "I understand you're interested in our enterprise plan. Let me connect you with our sales team who can provide a customized quote.",
      ];
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: responses[Math.floor(Math.random() * responses.length)] },
      ]);
    }, 1500);
  };

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
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-float animation-delay-300" />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-float animation-delay-500" />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full animate-pulse-glow"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Animated connection lines */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg className="w-full h-full opacity-10">
              <defs>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              {[...Array(5)].map((_, i) => (
                <line
                  key={i}
                  x1={`${Math.random() * 100}%`}
                  y1={`${Math.random() * 100}%`}
                  x2={`${Math.random() * 100}%`}
                  y2={`${Math.random() * 100}%`}
                  stroke="url(#line-gradient)"
                  strokeWidth="1"
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              ))}
            </svg>
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
                  We'd Love to Hear From You
                </span>
              </div>

              {/* Headline with typing effect */}
              <h1
                className={`text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 ${
                  isVisible ? "animate-slide-up animation-delay-100" : "opacity-0"
                }`}
              >
                <span className="text-white">{typingText}</span>
                <span className="animate-bounce text-blue-400">|</span>
              </h1>

              {/* Subheadline */}
              <p
                className={`text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-3xl mx-auto ${
                  isVisible ? "animate-slide-up animation-delay-200" : "opacity-0"
                }`}
              >
                Have questions about krinAI? Want to see our platform in action?
                <span className="text-white font-semibold"> Our team is ready to help</span> —
                reach out through any channel below.
              </p>

              {/* Quick contact buttons */}
              <div
                className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${
                  isVisible ? "animate-slide-up animation-delay-300" : "opacity-0"
                }`}
              >
                <Link
                  href="#contact-form"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-8 py-4 rounded-xl transition-all shadow-xl shadow-blue-500/25 hover:shadow-purple-500/40 hover:scale-105"
                >
                  <Send className="h-4 w-4" />
                  Send a Message
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={() => setShowChat(true)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-slate-700 hover:border-slate-600 bg-slate-800/50 hover:bg-slate-800 px-8 py-4 rounded-xl transition-all"
                >
                  <MessageSquare className="h-4 w-4" />
                  Start Live Chat
                </button>
              </div>
            </div>

            {/* Stats bar */}
            <div
              className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 ${
                isVisible ? "animate-fade-in animation-delay-400" : "opacity-0"
              }`}
            >
              {[
                { value: "<2h", label: "Avg Response Time", icon: Zap },
                { value: "24/7", label: "Support Available", icon: Clock },
                { value: "98%", label: "Satisfaction Rate", icon: Star },
                { value: "50+", label: "Countries Served", icon: Globe },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-6 rounded-2xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-sm hover:border-blue-500/30 transition-all group"
                >
                  <stat.icon className="h-6 w-6 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Methods Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950" />
          <div className="absolute inset-0 bg-radial-glow-bottom" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Get in <span className="text-gradient">Touch</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Choose your preferred way to reach us. We're here to help.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <div
                    key={method.id}
                    className={`group relative ${isVisible ? "animate-slide-up" : "opacity-0"}`}
                    style={{ animationDelay: `${index * 100 + 500}ms` }}
                  >
                    <div className="relative h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 overflow-hidden transition-all duration-500 hover:border-slate-600 hover:shadow-2xl hover:scale-[1.02] cursor-pointer">
                      {/* Gradient overlay on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                      />

                      {/* Animated glow effect */}
                      <div
                        className={`absolute -inset-1 bg-gradient-to-r ${method.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
                      />

                      <div className="relative p-6">
                        {/* Icon */}
                        <div
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${method.gradient} mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>

                        {/* Content */}
                        <h3 className="text-lg font-bold text-white mb-1">{method.title}</h3>
                        <p className="text-sm text-slate-400 mb-3">{method.description}</p>
                        <p className={`text-sm font-medium bg-gradient-to-r ${method.gradient} bg-clip-text text-transparent`}>
                          {method.value}
                        </p>

                        {/* Availability badge */}
                        {method.available && (
                          <div className="mt-4 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-xs text-emerald-400">Available now</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form & Map Section */}
        <section id="contact-form" className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className={` ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Send us a message</h3>
                  <p className="text-slate-400 mb-8">Fill out the form below and we'll get back to you within 2 hours.</p>

                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 mb-6 animate-scale-in">
                        <CheckCircle2 className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                      <p className="text-slate-400 mb-6">Thank you for reaching out. We'll get back to you shortly.</p>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormState({ name: "", email: "", company: "", department: "", message: "" });
                        }}
                        className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            required
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            required
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">
                            Company
                          </label>
                          <input
                            type="text"
                            id="company"
                            value={formState.company}
                            onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            placeholder="Acme Inc."
                          />
                        </div>
                        <div>
                          <label htmlFor="department" className="block text-sm font-medium text-slate-300 mb-2">
                            Department
                          </label>
                          <select
                            id="department"
                            value={formState.department}
                            onChange={(e) => setFormState({ ...formState, department: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          >
                            <option value="">Select a department</option>
                            {departments.map((dept) => (
                              <option key={dept.value} value={dept.value}>
                                {dept.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={5}
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                          placeholder="Tell us how we can help..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full group inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-8 py-4 rounded-xl transition-all shadow-xl shadow-blue-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send Message
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Office Locations */}
              <div className={` ${isVisible ? "animate-slide-up animation-delay-200" : "opacity-0"}`}>
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Our Offices</h3>
                  <p className="text-slate-400 mb-8">Visit us at one of our global locations.</p>

                  {/* Office carousel */}
                  <div className="relative">
                    <div className="overflow-hidden">
                      <div
                        className="flex transition-transform duration-500"
                        style={{ transform: `translateX(-${activeOffice * 100}%)` }}
                      >
                        {offices.map((office, index) => {
                          const Icon = office.icon;
                          return (
                            <div key={index} className="w-full flex-shrink-0 px-1">
                              <div className="relative bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 overflow-hidden group">
                                {/* Gradient glow */}
                                <div
                                  className={`absolute inset-0 bg-gradient-to-br ${office.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                                />

                                <div className="relative">
                                  <div
                                    className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${office.gradient} mb-4`}
                                  >
                                    <Icon className="h-5 w-5 text-white" />
                                  </div>

                                  <h4 className="text-xl font-bold text-white mb-1">{office.city}</h4>
                                  <p className="text-sm text-slate-400 mb-4">{office.country}</p>

                                  <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                      <MapPin className="h-4 w-4 text-slate-500 mt-0.5" />
                                      <span className="text-sm text-slate-300">{office.address}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <Clock className="h-4 w-4 text-slate-500" />
                                      <span className="text-sm text-slate-300">{office.timezone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <Users className="h-4 w-4 text-slate-500" />
                                      <span className="text-sm text-slate-300">{office.employees} team members</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Office indicators */}
                    <div className="flex justify-center gap-2 mt-6">
                      {offices.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveOffice(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            activeOffice === index
                              ? "bg-blue-500 w-6"
                              : "bg-slate-700 hover:bg-slate-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quick info */}
                  <div className="mt-8 pt-8 border-t border-slate-700/50">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-500/10">
                          <Shield className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">SOC 2 Certified</div>
                          <div className="text-xs text-slate-500">Enterprise security</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                          <Globe className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">GDPR Compliant</div>
                          <div className="text-xs text-slate-500">Data protection</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950" />
          <div className="absolute inset-0 bg-radial-glow" />

          <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h2>
              <p className="text-lg text-slate-400">
                Quick answers to common questions. Can't find what you're looking for? Contact us.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden transition-all ${
                    openFaq === index ? "border-blue-500/50" : ""
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="text-lg font-medium text-white pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-slate-400 transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <p className="px-6 pb-6 text-slate-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />

          <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <Sparkles className="h-12 w-12 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your
              <span className="text-gradient"> Invoice Processing?</span>
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              Join thousands of companies already saving time and money with krinAI.
              Start your free trial today — no credit card required.
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
                className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-slate-700 hover:border-slate-600 bg-slate-800/50 hover:bg-slate-800 px-8 py-4 rounded-xl transition-all"
              >
                View Products
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Live Chat Widget */}
      {showChat && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] animate-scale-in">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
            {/* Chat header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">krinAI Support</div>
                  <div className="text-xs text-white/80 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Online now
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>

            {/* Chat messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-2 ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800 text-slate-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat input */}
            <form onSubmit={handleChatSubmit} className="p-4 border-t border-slate-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating chat button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/25 hover:scale-110 transition-transform flex items-center justify-center group"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
        </button>
      )}

      <Footer />
    </>
  );
}