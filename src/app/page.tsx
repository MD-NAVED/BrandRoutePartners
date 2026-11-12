'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, MotionConfig, type Variants } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'

const EMAIL = 'fuzail@brandroutepartner.com'
const PHONE = '+91 80852 58803'
const PHONE_TEL = '+918085258803'
const WHATSAPP_URL = 'https://wa.me/918085258803?text=Hi%20BrandRoute%20Partners%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: EASE },
  }),
}

type Offering = {
  name: string
  tagline: string
  description: string
  badge: string
  category: 'Growth & Outreach' | 'AI & Engineering'
  features: string[]
  ambientGlow: string
}

const marketingOfferings: Offering[] = [
  {
    name: 'Personal Branding',
    badge: '01 / Authority',
    tagline: 'Authority & Executive Inbound',
    category: 'Growth & Outreach',
    description:
      'We optimize your LinkedIn profile and ghostwrite weekly authority content so B2B decision-makers reach out to you via inbound.',
    features: ['Profile Optimization', 'Ghostwritten Authority Content', 'Inbound DM Funnel'],
    ambientGlow: 'from-[#78E6C3]/35 via-[#1A604D]/25 to-transparent',
  },
  {
    name: 'High-Intent Lead Generation',
    badge: '02 / Pipeline',
    tagline: 'Verified B2B Decision Makers',
    category: 'Growth & Outreach',
    description:
      'We research, verify, and deliver handpicked B2B decision-makers matching your exact ICP — 100% verified, zero scrape waste.',
    features: ['Verified Decision Makers', 'Zero Scrape Waste', 'Custom ICP Targeting'],
    ambientGlow: 'from-[#DFFF9A]/35 via-[#103D2E]/25 to-transparent',
  },
  {
    name: 'Cold Email Infrastructure',
    badge: '03 / Outbound',
    tagline: 'Spam-Proof Outbound Setup',
    category: 'Growth & Outreach',
    description:
      'We set up isolated secondary domains with SPF/DKIM/DMARC and warm-up routines to send executive outreach straight to primary inboxes.',
    features: ['Secondary Domain Setup', 'SPF / DKIM / DMARC Security', 'Automated Warmup & Copy'],
    ambientGlow: 'from-[#78E6C3]/35 via-[#0D382B]/25 to-transparent',
  },
  {
    name: 'Sales Support & Deal Closing',
    badge: '04 / Velocity',
    tagline: 'Replies to Booked Calls',
    category: 'Growth & Outreach',
    description:
      'We manage incoming replies, handle prospect objections in real-time, and route qualified decision-makers straight to your calendar.',
    features: ['Real-Time Reply Handling', 'Objection Handling', 'Direct Calendar Bookings'],
    ambientGlow: 'from-[#DFFF9A]/30 via-[#1A604D]/20 to-transparent',
  },
]

const techOfferings: Offering[] = [
  {
    name: 'Full-Stack SaaS Development',
    badge: '01 / Architecture',
    tagline: 'Multi-Tenant Cloud Platforms',
    category: 'AI & Engineering',
    description:
      'We build production-ready SaaS platforms with Next.js 15, PostgreSQL, Stripe subscription billing, and bulletproof auth.',
    features: ['Multi-Tenant Cloud SaaS', 'Stripe Billing & Subscriptions', 'Next.js 15 & PostgreSQL'],
    ambientGlow: 'from-[#78E6C3]/35 via-[#1A604D]/25 to-transparent',
  },
  {
    name: 'Rapid MVP in 2–4 Weeks',
    badge: '02 / Speed',
    tagline: 'From Idea to Live Software in 14–30 Days',
    category: 'AI & Engineering',
    description:
      'We design, build, and launch functional, investor-ready MVPs in 2 to 4 weeks so you can start acquiring paying users immediately.',
    features: ['14–30 Days Turnaround', 'Production-Ready Codebase', '100% Code Handover'],
    ambientGlow: 'from-[#DFFF9A]/35 via-[#103D2E]/25 to-transparent',
  },
  {
    name: 'Custom AI Chatbots & RAG',
    badge: '03 / Intelligence',
    tagline: '24/7 Context-Aware AI Agents',
    category: 'AI & Engineering',
    description:
      'We build AI chatbots trained on your company data and CRM that qualify inbound leads and answer customer inquiries 24/7 without hallucinations.',
    features: ['Vector RAG Knowledge Base', '24/7 Lead Qualification', 'Zero Hallucinations'],
    ambientGlow: 'from-[#78E6C3]/35 via-[#0D382B]/25 to-transparent',
  },
  {
    name: 'AI Automation & Agentic Workflows',
    badge: '04 / Autonomy',
    tagline: 'Autonomous AI Workflows',
    category: 'AI & Engineering',
    description:
      'We automate repetitive manual tasks using custom LLM agents, document parsing, and seamless cross-platform API connectors.',
    features: ['Autonomous Agent Pipelines', 'Document & PDF Parsing', 'Cross-App Integrations'],
    ambientGlow: 'from-[#DFFF9A]/30 via-[#1A604D]/20 to-transparent',
  },
]

// Backward-compatible array for footer & navigation
const services: Offering[] = [...marketingOfferings, ...techOfferings]

const engines = [
  {
    name: 'Media & Growth',
    role: 'The Attention Engine',
    theme: 'mint',
    description:
      'Personal branding, content, outreach, and automation — the system that turns founders into recognized industry authorities while their calendars fill with qualified inbound calls.',
    chips: ['Personal Branding', 'Content & Outreach', 'Lead Generation Engine'],
  },
  {
    name: 'Engineering',
    role: 'The Build Engine',
    theme: 'lime',
    description:
      'AI-assisted product engineering that designs, ships, and tests high-performance platforms, multi-tenant SaaS, and LLM-powered applications — built for rock-solid scale.',
    chips: ['SaaS Development', 'Rapid MVP Launch', 'Custom AI Chatbots', 'AI Automation Workflows'],
  },
]

function useCopyEmail() {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = EMAIL
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }, [])

  return { copied, copy }
}

function useCopyPhone() {
  const [copiedPhone, setCopiedPhone] = useState(false)

  const copyPhone = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PHONE)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = PHONE
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopiedPhone(true)
    window.setTimeout(() => setCopiedPhone(false), 2000)
  }, [])

  return { copiedPhone, copyPhone }
}

function SectionDivider() {
  return (
    <div className="relative mx-auto max-w-6xl px-5 sm:px-8" aria-hidden="true">
      <div className="pointer-events-none absolute inset-x-20 top-1/2 -translate-y-1/2 h-8 bg-gradient-to-r from-transparent via-[#78E6C3]/15 to-transparent blur-md" />
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[#294438] to-transparent" />
    </div>
  )
}

function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#061A15]"
    >
      {/* Soft, Silky, Luxury Fluted Light Curtain (Crowns the Hero & Header at the top) */}
      <div className="absolute inset-x-0 top-0 h-[640px] sm:h-[720px] overflow-hidden select-none">
        {/* Layer 1: Rich deep emerald, mint & lime auroral gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, #DFFF9A 0%, #78E6C3 14%, #1A604D 30%, #0F3D30 50%, #0B241C 70%, #061A15 88%, #061A15 100%)',
          }}
        />

        {/* Layer 2: Soft, silky light ripples (gentle wave, NO harsh lines) */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay blur-[2px]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              to right,
              transparent 0px,
              rgba(255, 255, 255, 0.45) 32px,
              transparent 64px
            )`,
            backgroundSize: '64px 100%',
          }}
        />

        {/* Layer 3: Soft ambient column shading */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-multiply blur-[3px]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              to right,
              rgba(0, 0, 0, 0.4) 0px,
              transparent 28px,
              transparent 64px
            )`,
            backgroundSize: '64px 100%',
          }}
        />

        {/* Layer 4: Soft curved top light glow */}
        <div
          className="absolute inset-0 opacity-35 mix-blend-screen"
          style={{
            backgroundImage: `radial-gradient(ellipse 32px 24px at 32px 0px, rgba(223, 255, 154, 0.7) 0%, transparent 100%)`,
            backgroundSize: '64px 100%',
            backgroundRepeat: 'repeat-x',
          }}
        />

        {/* Layer 5: Native 1:1 SVG Film Grain */}
        <svg
          className="absolute inset-0 h-full w-full opacity-35 mix-blend-overlay"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="fluted-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#fluted-grain)" />
        </svg>

        {/* Layer 6: Smooth fade to deep emerald page background */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-[#061A15]/80 to-[#061A15]" />
      </div>

      {/* Atmospheric Ambient Lighting throughout the page body */}
      {/* Mid-page ambient emerald & mint spotlights (Services & About) */}
      <div className="pointer-events-none absolute left-1/2 top-[28%] -translate-x-1/2 h-[700px] w-[1000px] rounded-full bg-[#78E6C3]/14 blur-[180px]" />
      <div className="pointer-events-none absolute -right-28 top-[38%] h-[650px] w-[650px] rounded-full bg-[#1A604D]/22 blur-[160px]" />
      <div className="pointer-events-none absolute -left-28 top-[50%] h-[650px] w-[650px] rounded-full bg-[#DFFF9A]/14 blur-[160px]" />

      {/* Lower-mid emerald & mint spotlight (Process section) */}
      <div className="pointer-events-none absolute left-1/2 top-[64%] -translate-x-1/2 h-[750px] w-[1100px] rounded-full bg-[#78E6C3]/16 blur-[180px]" />
      <div className="pointer-events-none absolute right-[-5%] top-[70%] h-[650px] w-[650px] rounded-full bg-[#0F3D30]/24 blur-[160px]" />
      <div className="pointer-events-none absolute left-[-5%] top-[76%] h-[650px] w-[650px] rounded-full bg-[#DFFF9A]/14 blur-[160px]" />

      {/* Luminous Warm Horizon at the bottom of the page (Contact & Footer) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[900px] bg-gradient-to-t from-[#0B241C]/65 via-[#061A15]/40 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 bottom-20 -translate-x-1/2 h-[550px] w-[1100px] rounded-full bg-[#78E6C3]/18 blur-[170px]" />
      <div className="pointer-events-none absolute left-1/2 bottom-8 -translate-x-1/2 h-[350px] w-[800px] rounded-full bg-[#DFFF9A]/16 blur-[140px]" />
      <div className="pointer-events-none absolute left-[8%] bottom-[12%] h-[550px] w-[550px] rounded-full bg-[#1A604D]/20 blur-[160px]" />
      <div className="pointer-events-none absolute right-[8%] bottom-[8%] h-[550px] w-[550px] rounded-full bg-[#78E6C3]/16 blur-[160px]" />
    </div>
  )
}

function BrandWordmark({ size = 'default' }: { size?: 'default' | 'large' }) {
  const isLarge = size === 'large'
  return (
    <div className="flex flex-col select-none leading-none">
      <span
        className={`font-black uppercase tracking-[0.18em] text-[#78E6C3] drop-shadow-[0_0_14px_rgba(120,230,195,0.45)] transition-colors group-hover:text-white ${
          isLarge ? 'text-xl sm:text-2xl' : 'text-[13.5px] sm:text-[15px]'
        }`}
      >
        BRANDROUTE
      </span>
      <span
        className={`font-mono uppercase font-semibold text-[#B5C2B9] tracking-[0.40em] transition-colors group-hover:text-[#DFFF9A] ${
          isLarge ? 'text-[10px] sm:text-[11px] mt-1.5' : 'text-[8.5px] sm:text-[9.5px] mt-1'
        } pl-[1px]`}
      >
        PARTNERS
      </span>
    </div>
  )
}

function BrandLogo({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center transition-transform group-hover:scale-105 ${className}`}
    >
      <img
        src="/logo-concept-3.svg"
        alt="BrandRoute Partners Logo"
        className="h-full w-full object-contain drop-shadow-[0_0_16px_rgba(120,230,195,0.4)]"
      />
    </span>
  )
}

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Process', href: '#process' },
  { name: 'Contact', href: '#contact' },
]

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="sticky top-3 sm:top-5 z-50 px-3 sm:px-6 w-full">
      <header className="relative mx-auto flex h-14 sm:h-16 max-w-5xl items-center justify-between rounded-full border border-[#294438] bg-[#0B241C]/85 px-4 sm:px-6 backdrop-blur-2xl shadow-[0_12px_36px_rgba(0,0,0,0.65),0_0_0_1px_rgba(120,230,195,0.06),inset_0_1px_1px_rgba(120,230,195,0.25)] transition-all">
        {/* Subtle top light reflection edge */}
        <div className="pointer-events-none absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#78E6C3]/40 to-transparent" />

        {/* Brand Wordmark (Matching uploaded reference screenshot) */}
        <a
          href="#top"
          className="group flex items-center gap-2 select-none py-1 transition-transform hover:scale-[1.02]"
          aria-label="BrandRoute Partners — back to top"
        >
          <BrandWordmark />
        </a>

        {/* Center Pill Dock */}
        <nav
          className="hidden md:flex items-center gap-1 rounded-full border border-[#294438] bg-black/40 p-1 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"
          aria-label="Primary"
        >
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-[#B5C2B9] transition-all duration-200 hover:bg-white/[0.08] hover:text-[#DFFF9A] hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Right CTA + Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Lime to Mint Header CTA */}
          <a
            href={`mailto:${EMAIL}`}
            className="group relative inline-flex h-9 sm:h-10 items-center gap-1.5 sm:gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#DFFF9A] to-[#78E6C3] px-3.5 sm:px-4 text-[12px] sm:text-[13px] font-bold text-[#061A15] shadow-[0_4px_20px_rgba(120,230,195,0.35),inset_0_1px_1px_rgba(255,255,255,0.7)] transition-all hover:scale-[1.02] hover:shadow-[0_4px_28px_rgba(120,230,195,0.55)]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            <span>Book a call</span>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#294438] bg-white/[0.04] text-[#F3F5F0] transition hover:bg-white/[0.1] hover:text-[#78E6C3] md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Pill Island */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-5xl rounded-3xl border border-[#294438] bg-[#0B241C]/95 p-3 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.85)] md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-[#B5C2B9] transition hover:bg-white/[0.06] hover:text-[#DFFF9A]"
                >
                  <span>{item.name}</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                </a>
              ))}
              <div className="mt-2 border-t border-[#294438] pt-2 flex flex-col gap-1.5">
                <a
                  href={`tel:${PHONE_TEL}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-xl bg-white/[0.04] px-4 py-2 text-xs font-semibold text-[#78E6C3] transition hover:bg-white/[0.08]"
                >
                  <Phone className="h-3.5 w-3.5 text-[#78E6C3]" />
                  <span>Call {PHONE}</span>
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-xl bg-white/[0.04] px-4 py-2 text-xs font-semibold text-[#25D366] transition hover:bg-white/[0.08]"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Floating translucent glass pills
function FloatingPill({
  text,
  className = '',
  dotPosition,
  yOffset = 6,
  duration = 4.2,
  delay = 0,
}: {
  text: string
  className?: string
  dotPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  yOffset?: number
  duration?: number
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -yOffset, 0],
      }}
      transition={{
        opacity: { duration: 0.7, delay: delay * 0.15 },
        scale: { duration: 0.7, delay: delay * 0.15 },
        y: {
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay * 0.3,
        },
      }}
      className={`group relative inline-flex items-center rounded-full border border-[#294438] bg-[#0B241C]/90 px-4 py-1.5 backdrop-blur-sm shadow-[0_6px_24px_rgba(0,0,0,0.6)] transition-all hover:border-[#78E6C3]/75 hover:bg-[#102D22] hover:shadow-[0_8px_30px_rgba(120,230,195,0.25)] ${className}`}
    >
      <span className="text-xs sm:text-sm font-medium tracking-wide text-[#F3F5F0] group-hover:text-white transition-colors">
        {text}
      </span>
    </motion.div>
  )
}

function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-6xl px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-14 lg:pt-16"
    >
      {/* Dedicated Headline Showcase Stage */}
      <div className="relative mx-auto max-w-4xl py-6 sm:py-8 text-center">
        {/* Tagline Badge */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
          <span className="inline-flex items-center rounded-full border border-[#294438] bg-[#0B241C]/80 px-4 py-1.5 text-xs text-[#F3F5F0] shadow-[0_0_20px_rgba(11,36,28,0.4)]">
            <span className="font-semibold tracking-[0.15em] uppercase text-[#DFFF9A]">
              BRANDING × LEADS × TECHNOLOGY
            </span>
          </span>
        </motion.div>

        {/* Hero Title - Dual-Tone (White + Accent Lime to Mint Gradient) */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.5rem]"
        >
          <span className="text-[#F3F5F0]">Build Your Brand.</span>
          <br />
          <span className="bg-gradient-to-r from-[#DFFF9A] via-[#A8F3AD] to-[#78E6C3] bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(120,230,195,0.3)]">
            Generate More Leads.
          </span>
        </motion.h1>

        {/* Service Pills - Balanced showcase with ZERO text overlap */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-8 sm:mt-10 mx-auto max-w-3xl flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
        >
          <FloatingPill text="Personal Branding" delay={0.1} yOffset={4} duration={4.2} />
          <FloatingPill text="SaaS & MVP Build" delay={0.2} yOffset={5} duration={4.6} />
          <FloatingPill text="Cold Email Marketing" delay={0.3} yOffset={4} duration={4.0} />
          <FloatingPill text="AI Chatbots & Automation" delay={0.4} yOffset={5} duration={4.5} />
          <FloatingPill text="Lead Generation" delay={0.5} yOffset={4} duration={4.3} />
        </motion.div>
      </div>

      {/* 3. Subtitle & CTAs */}
      <div className="mx-auto mt-2 sm:mt-4 max-w-2xl text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="text-pretty text-base leading-relaxed text-[#B5C2B9] sm:text-lg"
        >
          Strategy, lead gen, and marketing systems for ambitious businesses.
          One system builds your reputation while the other fills your calendar
          — backed by high-performance engineering.
        </motion.p>

        {/* Button Combination: Lime to Mint Gradient + Outline Glass */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row"
        >
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#DFFF9A] to-[#78E6C3] px-8 text-sm font-bold text-[#061A15] shadow-[0_10px_35px_-8px_rgba(120,230,195,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.8)] transition-all hover:scale-[1.02] hover:shadow-[0_12px_45px_-4px_rgba(120,230,195,0.7)] sm:w-auto"
          >
            <span>Book a Strategy Call</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#services"
            className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[#294438] bg-[#0B241C]/60 backdrop-blur-md px-7 text-sm font-medium text-[#F3F5F0] shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all hover:border-[#78E6C3]/60 hover:bg-[#102D22]/80 hover:text-[#78E6C3] sm:w-auto"
          >
            Explore Services
            <ArrowDown className="h-4 w-4 text-[#78E6C3] transition-transform group-hover:translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  id,
  center = false,
}: {
  eyebrow: string
  title: string
  subtitle: string
  id: string
  center?: boolean
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      custom={0}
      className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}
    >
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#78E6C3]">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 text-3xl font-semibold tracking-tight text-balance text-[#F3F5F0] sm:text-4xl"
      >
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-pretty text-[#B5C2B9]">
        {subtitle}
      </p>
    </motion.div>
  )
}

type Pillar = 'marketing' | 'tech'

function DualEngineHub() {
  const [activePillar, setActivePillar] = useState<Pillar>('marketing')
  const [activeMarketingTab, setActiveMarketingTab] = useState<string>('Personal Branding')
  const [activeTechTab, setActiveTechTab] = useState<string>('Full-Stack SaaS Development')

  // Available buttons for Marketing (Kaise Karte Hain Vo removed)
  const marketingTabs = [
    { id: 'Personal Branding', label: 'Personal Branding' },
    { id: 'High-Intent Lead Generation', label: 'Lead Generation' },
    { id: 'Cold Email Infrastructure', label: 'Cold Email Setup' },
    { id: 'Sales Support & Deal Closing', label: 'Sales Support' },
  ]

  // Available buttons for Tech (Kaise Karte Hain Vo removed)
  const techTabs = [
    { id: 'Full-Stack SaaS Development', label: 'SaaS Development' },
    { id: 'Rapid MVP in 2–4 Weeks', label: 'Rapid MVP (2-4 Wks)' },
    { id: 'Custom AI Chatbots & RAG', label: 'AI Chatbots' },
    { id: 'AI Automation & Agentic Workflows', label: 'AI Automation' },
    { id: 'tech-stack', label: 'Tech Stack' },
  ]

  const currentMarketingOffering = marketingOfferings.find((s) => s.name === activeMarketingTab)
  const currentTechOffering = techOfferings.find((s) => s.name === activeTechTab)

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-title"
      className="relative scroll-mt-20 py-16 sm:py-20 overflow-hidden"
    >
      {/* Anchor targets so navbar links (#services & #process) navigate seamlessly */}
      <div id="services" className="-top-24 absolute pointer-events-none" />
      <div id="process" className="-top-24 absolute pointer-events-none" />

      {/* Atmospheric soft glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[650px] rounded-full bg-[#78E6C3]/08 blur-[140px]" />
      <div className="pointer-events-none absolute right-[10%] top-1/2 h-[320px] w-[320px] rounded-full bg-[#DFFF9A]/06 blur-[130px]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        {/* Section Heading - Short, Punchy & Clean */}
        <SectionHeading
          id="capabilities-title"
          eyebrow="02 / What we do"
          title="Pick a service. See what we do."
          subtitle="Tap any button below to see the exact work we deliver."
          center
        />

        {/* 1. Main 2-Pillar Engine Toggle */}
        <div className="mt-7 flex justify-center">
          <div className="relative inline-flex items-center rounded-full border border-[#294438] bg-[#0B241C]/90 p-1.5 backdrop-blur-2xl shadow-[0_12px_36px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(120,230,195,0.2)]">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#78E6C3]/40 to-transparent" />

            <button
              type="button"
              onClick={() => setActivePillar('marketing')}
              className={`relative z-10 flex items-center justify-center rounded-full px-5 py-2 sm:px-6 sm:py-2 text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 ${
                activePillar === 'marketing'
                  ? 'bg-gradient-to-r from-[#DFFF9A] to-[#78E6C3] text-[#061A15] shadow-[0_4px_16px_rgba(120,230,195,0.4)] scale-[1.02]'
                  : 'text-[#B5C2B9] hover:text-[#F3F5F0]'
              }`}
            >
              <span>Marketing & Growth</span>
            </button>

            <button
              type="button"
              onClick={() => setActivePillar('tech')}
              className={`relative z-10 flex items-center justify-center rounded-full px-5 py-2 sm:px-6 sm:py-2 text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 ${
                activePillar === 'tech'
                  ? 'bg-gradient-to-r from-[#DFFF9A] to-[#78E6C3] text-[#061A15] shadow-[0_4px_16px_rgba(120,230,195,0.4)] scale-[1.02]'
                  : 'text-[#B5C2B9] hover:text-[#F3F5F0]'
              }`}
            >
              <span>Tech Stack & Engineering</span>
            </button>
          </div>
        </div>

        {/* 2. Chote-Chote Service Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {activePillar === 'marketing' ? (
            marketingTabs.map((tab) => {
              const isSelected = activeMarketingTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveMarketingTab(tab.id)}
                  className={`group relative flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold transition-all duration-150 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#DFFF9A] to-[#78E6C3] text-[#061A15] shadow-[0_3px_12px_rgba(120,230,195,0.35)] scale-[1.03]'
                      : 'border border-[#294438] bg-[#0B241C]/80 text-[#B5C2B9] hover:border-[#78E6C3]/40 hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              )
            })
          ) : (
            techTabs.map((tab) => {
              const isSelected = activeTechTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTechTab(tab.id)}
                  className={`group relative flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold transition-all duration-150 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#DFFF9A] to-[#78E6C3] text-[#061A15] shadow-[0_3px_12px_rgba(120,230,195,0.35)] scale-[1.03]'
                      : 'border border-[#294438] bg-[#0B241C]/80 text-[#B5C2B9] hover:border-[#DFFF9A]/40 hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              )
            })
          )}
        </div>

        {/* 3. Single Minimal Showcase Card */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            {activePillar === 'marketing' ? (
              /* Marketing Service Detail: Pure Kaam, Minimal Text */
              currentMarketingOffering && (() => {
                return (
                  <motion.div
                    key={currentMarketingOffering.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: EASE }}
                    className="relative overflow-hidden rounded-3xl border border-[#294438] bg-gradient-to-b from-[#102D22]/90 via-[#0B241C]/90 to-[#061A15] p-5 sm:p-7 shadow-[0_20px_50px_rgba(6,26,21,0.5)]"
                  >
                    <div className="pointer-events-none absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#78E6C3]/40 to-transparent" />

                    {/* Header Row */}
                    <div className="flex items-center justify-between pb-4 border-b border-[#294438]/60">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#F3F5F0]">
                          {currentMarketingOffering.name}
                        </h3>
                        <p className="text-xs text-[#78E6C3]">
                          {currentMarketingOffering.tagline}
                        </p>
                      </div>
                      <span className="font-mono text-[10px] text-[#DFFF9A] px-2.5 py-0.5 rounded-full bg-[#061A15] border border-[#294438]">
                        {currentMarketingOffering.badge}
                      </span>
                    </div>

                    {/* Core Content: Kaam Kya Karte Hain */}
                    <div className="mt-4 space-y-3.5">
                      <p className="text-xs sm:text-sm leading-relaxed text-[#F3F5F0]">
                        {currentMarketingOffering.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {currentMarketingOffering.features.map((feature) => (
                          <span
                            key={feature}
                            className="inline-flex items-center rounded-lg border border-[#294438] bg-[#061A15]/80 px-2.5 py-1 text-xs text-[#78E6C3]"
                          >
                            <span>{feature}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Row */}
                    <div className="mt-6 pt-4 border-t border-[#294438]/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <span className="text-xs text-[#B5C2B9]">
                        Done-for-you execution. Zero manual work on your end.
                      </span>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <a
                          href={`mailto:${EMAIL}?subject=Inquiry:%20${encodeURIComponent(currentMarketingOffering.name)}`}
                          className="inline-flex h-9 w-full sm:w-auto items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#DFFF9A] to-[#78E6C3] px-5 text-xs font-bold text-[#061A15] shadow-[0_4px_14px_rgba(120,230,195,0.3)] transition hover:scale-105"
                        >
                          <span>Get Started</span>
                          <ArrowRight className="h-3 w-3" />
                        </a>
                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 w-full sm:w-auto items-center justify-center gap-1.5 rounded-full border border-[#294438] bg-[#0B241C] px-3.5 text-xs font-semibold text-[#B5C2B9] hover:text-[#25D366] transition"
                        >
                          <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )
              })()
            ) : activeTechTab === 'tech-stack' ? (
              /* Tech Stack: Clean Minimal Grid */
              <motion.div
                key="tech-stack-view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="relative overflow-hidden rounded-3xl border border-[#294438] bg-gradient-to-b from-[#102D22]/90 via-[#0B241C]/90 to-[#061A15] p-5 sm:p-7 shadow-[0_20px_50px_rgba(6,26,21,0.5)]"
              >
                <div className="pointer-events-none absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#DFFF9A]/40 to-transparent" />

                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#294438]/60">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#F3F5F0]">
                      Tech Stack • Modern & Scalable
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-[#78E6C3] px-2.5 py-0.5 rounded-full bg-[#061A15] border border-[#294438]">
                    Zero Legacy Bloat
                  </span>
                </div>

                {/* Categories */}
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#294438]/70 bg-[#061A15]/70 p-3">
                    <span className="text-[11px] font-mono uppercase text-[#DFFF9A] font-bold">
                      Frontend & Interfaces
                    </span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {['Next.js 15 (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion'].map((s) => (
                        <span key={s} className="rounded bg-[#0B241C] border border-[#294438]/70 px-2 py-0.5 text-[11px] text-[#B5C2B9]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#294438]/70 bg-[#061A15]/70 p-3">
                    <span className="text-[11px] font-mono uppercase text-[#DFFF9A] font-bold">
                      Backend & Databases
                    </span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Supabase', 'Prisma ORM'].map((s) => (
                        <span key={s} className="rounded bg-[#0B241C] border border-[#294438]/70 px-2 py-0.5 text-[11px] text-[#B5C2B9]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#294438]/70 bg-[#061A15]/70 p-3">
                    <span className="text-[11px] font-mono uppercase text-[#DFFF9A] font-bold">
                      AI & LLMs
                    </span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {['OpenAI GPT-4o', 'Claude 3.5 Sonnet', 'LangChain', 'Vector RAG (pgvector)'].map((s) => (
                        <span key={s} className="rounded bg-[#0B241C] border border-[#294438]/70 px-2 py-0.5 text-[11px] text-[#B5C2B9]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#294438]/70 bg-[#061A15]/70 p-3">
                    <span className="text-[11px] font-mono uppercase text-[#DFFF9A] font-bold">
                      DevOps & Cloud
                    </span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {['Vercel', 'Docker', 'AWS (Lambda/S3)', 'GitHub Actions CI/CD'].map((s) => (
                        <span key={s} className="rounded bg-[#0B241C] border border-[#294438]/70 px-2 py-0.5 text-[11px] text-[#B5C2B9]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-[#294438]/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-[#B5C2B9]">
                    100% type-safe, tested code with complete source ownership handover.
                  </span>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-full sm:w-auto items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#DFFF9A] to-[#78E6C3] px-5 text-xs font-bold text-[#061A15] shadow-[0_4px_14px_rgba(120,230,195,0.3)] transition hover:scale-105"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-[#061A15]" />
                    <span>WhatsApp Developer</span>
                  </a>
                </div>
              </motion.div>
            ) : (
              /* Tech Service Detail: Pure Kaam, Minimal Text */
              currentTechOffering && (() => {
                return (
                  <motion.div
                    key={currentTechOffering.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: EASE }}
                    className="relative overflow-hidden rounded-3xl border border-[#294438] bg-gradient-to-b from-[#102D22]/90 via-[#0B241C]/90 to-[#061A15] p-5 sm:p-7 shadow-[0_20px_50px_rgba(6,26,21,0.5)]"
                  >
                    <div className="pointer-events-none absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#DFFF9A]/40 to-transparent" />

                    {/* Header Row */}
                    <div className="flex items-center justify-between pb-4 border-b border-[#294438]/60">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#F3F5F0]">
                          {currentTechOffering.name}
                        </h3>
                        <p className="text-xs text-[#DFFF9A]">
                          {currentTechOffering.tagline}
                        </p>
                      </div>
                      <span className="font-mono text-[10px] text-[#78E6C3] px-2.5 py-0.5 rounded-full bg-[#061A15] border border-[#294438]">
                        {currentTechOffering.badge}
                      </span>
                    </div>

                    {/* Core Content: Kaam Kya Karte Hain */}
                    <div className="mt-4 space-y-3.5">
                      <p className="text-xs sm:text-sm leading-relaxed text-[#F3F5F0]">
                        {currentTechOffering.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {currentTechOffering.features.map((feature) => (
                          <span
                            key={feature}
                            className="inline-flex items-center rounded-lg border border-[#294438] bg-[#061A15]/80 px-2.5 py-1 text-xs text-[#DFFF9A]"
                          >
                            <span>{feature}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Row */}
                    <div className="mt-6 pt-4 border-t border-[#294438]/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <span className="text-xs text-[#B5C2B9]">
                        Full source code ownership, clean architecture, and deployment included.
                      </span>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <a
                          href={`mailto:${EMAIL}?subject=Tech%20Inquiry:%20${encodeURIComponent(currentTechOffering.name)}`}
                          className="inline-flex h-9 w-full sm:w-auto items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#DFFF9A] to-[#78E6C3] px-5 text-xs font-bold text-[#061A15] shadow-[0_4px_14px_rgba(120,230,195,0.3)] transition hover:scale-105"
                        >
                          <span>Discuss Architecture</span>
                          <ArrowRight className="h-3 w-3" />
                        </a>
                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 w-full sm:w-auto items-center justify-center gap-1.5 rounded-full border border-[#294438] bg-[#0B241C] px-3.5 text-xs font-semibold text-[#B5C2B9] hover:text-[#25D366] transition"
                        >
                          <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )
              })()
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative scroll-mt-20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="about-title"
          eyebrow="01 / Who we are"
          title="Two engines. One route."
          subtitle="A branding and lead-generation house backed by serious engineering — one side builds your reputation and pipeline, the other builds the platforms they run on."
        />

        {/* Dual Companion Slabs: Media & Growth (Mint) vs Engineering (Lime) */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {engines.map((engine, i) => {
            const isMint = engine.theme === 'mint'
            return (
              <motion.article
                key={engine.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                custom={i}
              >
                <div
                  className={`group relative h-full overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:shadow-[0_20px_55px_rgba(11,36,28,0.5)] ${
                    isMint
                      ? 'border-[#294438] bg-gradient-to-b from-[#102D22]/95 via-[#0B241C]/95 to-[#061A15] hover:border-[#78E6C3]/50 shadow-[0_16px_50px_rgba(6,26,21,0.4)]'
                      : 'border-[#294438] bg-gradient-to-b from-[#0D281E]/95 via-[#082017]/95 to-[#061A15] hover:border-[#DFFF9A]/50 shadow-[0_16px_50px_rgba(6,26,21,0.4)]'
                  }`}
                >
                  {/* Subtle top rim specular light */}
                  <div className="pointer-events-none absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#78E6C3]/40 to-transparent" />
                  {/* Ambient glow at the bottom */}
                  <div className="pointer-events-none absolute -bottom-10 inset-x-0 h-32 bg-gradient-to-t from-[#78E6C3]/15 to-transparent blur-xl" />
                  <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-[#78E6C3]/0 blur-3xl transition-colors duration-500 group-hover:bg-[#78E6C3]/15" />
                  
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#78E6C3]/90">
                        {engine.role}
                      </p>
                      <h3 className="mt-1 text-2xl font-bold tracking-tight text-[#F3F5F0]">
                        {engine.name}
                      </h3>
                    </div>
                    <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-[#061A15] border border-[#294438] text-[#DFFF9A]">
                      {`0${i + 1}`}
                    </span>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-[#B5C2B9]">
                    {engine.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {engine.chips.map((chip) => (
                      <li
                        key={chip}
                        className="rounded-full border border-[#294438] bg-[#061A15]/80 px-3 py-1 text-xs text-[#B5C2B9]"
                      >
                        {chip}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const { copied, copy } = useCopyEmail()
  const { copiedPhone, copyPhone } = useCopyPhone()

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative scroll-mt-20 py-20 sm:py-28 overflow-hidden"
    >
      {/* Ambient emerald atmospheric glow behind Contact Section */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[850px] rounded-full bg-[#78E6C3]/16 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          custom={0}
          className="relative overflow-hidden rounded-3xl border border-[#294438] bg-gradient-to-b from-[#102D22]/95 via-[#0B241C]/95 to-[#061A15] px-6 py-16 text-center sm:px-12 sm:py-20 shadow-[0_30px_90px_rgba(6,26,21,0.5),inset_0_1px_1px_rgba(120,230,195,0.25)]"
        >
          {/* Specular top rim light reflection */}
          <div className="pointer-events-none absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#78E6C3]/50 to-transparent" />

          {/* Spotlight glow from top */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#78E6C3]/20 blur-[120px]"
          />

          {/* Warm mint & emerald lamp glow from bottom */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-14 inset-x-0 h-52 bg-gradient-to-t from-[#78E6C3]/25 via-[#1A604D]/15 to-transparent blur-2xl"
          />

          <p className="relative font-mono text-xs uppercase tracking-[0.25em] text-[#78E6C3]">
            03 / Get in touch
          </p>
          <h2
            id="contact-title"
            className="relative mt-4 text-balance text-3xl font-semibold tracking-tight text-[#F3F5F0] sm:text-5xl"
          >
            Book your strategy call.
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#B5C2B9]">
            Thirty minutes. Your brand, your goals, your market — and a clear
            route to more leads. No obligation, no black box.
          </p>

          <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#DFFF9A] to-[#78E6C3] px-7 text-sm font-bold text-[#061A15] shadow-[0_10px_35px_-8px_rgba(120,230,195,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.8)] transition-all hover:scale-[1.02] sm:w-auto"
            >
              <span>Book a Strategy Call</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[#294438] bg-[#0B241C]/60 backdrop-blur-md px-6 text-sm font-semibold text-[#F3F5F0] shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition hover:border-[#78E6C3]/60 hover:bg-[#102D22]/80 hover:text-[#78E6C3] sm:w-auto"
            >
              <Phone className="h-4 w-4 text-[#78E6C3]" />
              Call Directly
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[#294438] bg-[#0B241C]/60 backdrop-blur-md px-6 text-sm font-semibold text-[#F3F5F0] shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition hover:border-[#25D366]/60 hover:bg-[#102D22]/80 hover:text-[#25D366] sm:w-auto"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              WhatsApp
            </a>
          </div>

          {/* Direct channels bar */}
          <div className="relative mt-10 pt-8 border-t border-[#294438]/70 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-[#B5C2B9]">
            <div className="flex items-center gap-1.5">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-1.5 transition hover:text-[#78E6C3]"
              >
                <Mail className="h-4 w-4 text-[#78E6C3]" />
                <span>{EMAIL}</span>
              </a>
              <button
                type="button"
                onClick={copy}
                title="Copy email"
                aria-label={copied ? 'Email copied' : 'Copy email'}
                className="p-1 text-[#B5C2B9]/60 hover:text-[#78E6C3] transition"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-[#78E6C3]" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>

            <span className="hidden sm:inline text-[#294438]">•</span>

            <div className="flex items-center gap-1.5">
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-1.5 transition hover:text-[#78E6C3]"
              >
                <Phone className="h-4 w-4 text-[#78E6C3]" />
                <span>{PHONE}</span>
              </a>
              <button
                type="button"
                onClick={copyPhone}
                title="Copy phone"
                aria-label={copiedPhone ? 'Phone copied' : 'Copy phone'}
                className="p-1 text-[#B5C2B9]/60 hover:text-[#78E6C3] transition"
              >
                {copiedPhone ? <Check className="h-3.5 w-3.5 text-[#78E6C3]" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>

            <span className="hidden sm:inline text-[#294438]">•</span>

            <span className="inline-flex items-center gap-1.5 text-[#B5C2B9]/70">
              <MapPin className="h-4 w-4 text-[#78E6C3]" />
              <span>India — working worldwide</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative z-10 mt-auto overflow-hidden border-t border-[#294438] pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-16">
      {/* Top light reflection border edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#78E6C3]/40 to-transparent" />

      {/* Atmospheric horizon across the footer */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#0B241C]/40 via-[#061A15]/25 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 h-64 w-[800px] rounded-full bg-[#78E6C3]/18 blur-[130px]" />
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-36 w-[600px] rounded-full bg-[#DFFF9A]/10 blur-[100px]" />

      {/* Giant background wordmark in subtle mint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-3 select-none overflow-hidden text-center sm:top-6"
      >
        <span className="whitespace-nowrap bg-gradient-to-b from-[#78E6C3]/[0.10] via-[#DFFF9A]/[0.04] to-transparent bg-clip-text text-[13vw] font-bold leading-none tracking-tighter text-transparent">
          BRANDROUTE
        </span>
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div>
            <a href="#top" className="group flex flex-col items-start leading-none select-none transition-transform hover:scale-[1.02]" aria-label="Back to top">
              <BrandWordmark size="large" />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#B5C2B9]">
              Personal branding, lead generation, and marketing automation —
              backed by high-performance engineering.
            </p>
            <div className="mt-4 flex flex-col gap-2.5 text-sm">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 text-[#78E6C3] transition hover:text-[#DFFF9A]"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>{EMAIL}</span>
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-2 text-[#B5C2B9] transition hover:text-[#78E6C3]"
              >
                <Phone className="h-3.5 w-3.5 text-[#78E6C3]" />
                <span>{PHONE}</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#B5C2B9] transition hover:text-[#25D366]"
              >
                <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Company */}
          <nav aria-label="Company">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#B5C2B9]/50">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#about" className="text-[#B5C2B9] transition hover:text-[#78E6C3]">
                  About Us
                </a>
              </li>
              <li>
                <a href="#process" className="text-[#B5C2B9] transition hover:text-[#78E6C3]">
                  Our Process
                </a>
              </li>
              <li>
                <a href="#contact" className="text-[#B5C2B9] transition hover:text-[#78E6C3]">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#B5C2B9]/50">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href="#services"
                    className="text-[#B5C2B9] transition hover:text-[#78E6C3]"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#B5C2B9]/50">
              Ready to grow?
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[#B5C2B9]">
              See exactly how your brand and pipeline would grow — on a free
              strategy call.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#DFFF9A] to-[#78E6C3] px-5 text-[13px] font-bold text-[#061A15] shadow-[0_4px_20px_rgba(120,230,195,0.3),inset_0_1px_1px_rgba(255,255,255,0.8)] transition hover:opacity-95 hover:scale-[1.02]"
              >
                Book a Call
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-[#294438] bg-[#0B241C]/60 px-4 text-[13px] font-semibold text-[#78E6C3] transition hover:border-[#78E6C3]/60 hover:text-white"
              >
                <Phone className="h-3.5 w-3.5" />
                Call Now
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#294438] pt-6 text-xs text-[#B5C2B9]/50 sm:flex-row">
          <p>© 2026 BrandRoute Partners. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.22em] text-[#78E6C3]/70">
            Same Goals. A Calmer, Sharper Look.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative isolate flex min-h-screen flex-col bg-[#061A15] font-sans text-[#F3F5F0] antialiased">
        <Background />
        <Header />
        <main className="relative z-10 flex-1">
          <Hero />
          <SectionDivider />
          <AboutSection />
          <SectionDivider />
          <DualEngineHub />
          <SectionDivider />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
