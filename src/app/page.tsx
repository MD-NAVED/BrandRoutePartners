'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, MotionConfig, type Variants } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Cpu,
  Fingerprint,
  Headset,
  Mail,
  MapPin,
  Menu,
  PenTool,
  PhoneCall,
  Rocket,
  Route,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Workflow,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'

const EMAIL = 'hello@brandroutepartners.com'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: EASE },
  }),
}

type Service = {
  name: string
  tagline: string
  description: string
  icon: LucideIcon
  badge: string
  gradient: string
  ambientGlow: string
}

const services: Service[] = [
  {
    name: 'Personal Branding',
    tagline: 'Turn authority into inbound pipeline',
    description:
      'Your profile becomes a 24/7 revenue engine that positions you as the leading voice in your industry — building authority before you ever speak.',
    icon: Fingerprint,
    badge: '01 / Authority',
    gradient: 'from-[#1e1006] via-[#140b05] to-[#45220a]',
    ambientGlow: 'from-[#e68324]/35 via-[#c05c12]/20 to-transparent',
  },
  {
    name: 'Lead Generation',
    tagline: 'High-ticket buyers, warmed and verified',
    description:
      'Qualified decision-makers, not bloated scrape lists. Every account is researched, validated, and warmed before it ever reaches your calendar.',
    icon: Target,
    badge: '02 / Pipeline',
    gradient: 'from-[#221307] via-[#140a04] to-[#4c290c]',
    ambientGlow: 'from-[#f7d984]/30 via-[#d4973b]/20 to-transparent',
  },
  {
    name: 'Cold Email Marketing',
    tagline: 'Bespoke outreach written like a human',
    description:
      'Zero-spam infrastructure with isolated custom domains, calibrated warmup routines, and messages that read like an executive wrote them.',
    icon: Send,
    badge: '03 / Outbound',
    gradient: 'from-[#1a0e05] via-[#120803] to-[#3f1f08]',
    ambientGlow: 'from-[#f5a742]/30 via-[#b85b14]/15 to-transparent',
  },
  {
    name: 'Sales Support',
    tagline: 'From first reply to booked call',
    description:
      'We manage the inbox friction, qualify incoming replies in real time, and route eager prospects straight to your calendar without deal drop-off.',
    icon: Headset,
    badge: '04 / Velocity',
    gradient: 'from-[#241408] via-[#160b05] to-[#46230b]',
    ambientGlow: 'from-[#FFEB97]/25 via-[#9e5210]/15 to-transparent',
  },
  {
    name: 'Marketing Automation',
    tagline: 'Hands-off engines that scale automatically',
    description:
      'Automated nurture funnels, CRM synchronization, and weekly transparent reporting. The machine keeps running while you run the business.',
    icon: Workflow,
    badge: '05 / Scale',
    gradient: 'from-[#190f07] via-[#110904] to-[#3a1d08]',
    ambientGlow: 'from-[#d4973b]/30 via-[#7a3709]/15 to-transparent',
  },
]

type ProcessStep = {
  step: string
  title: string
  stage: string
  timeline: string
  highlight: string
  description: string
  icon: LucideIcon
  ambientGlow: string
}

const processSteps: ProcessStep[] = [
  {
    step: '01',
    stage: 'Discovery',
    timeline: 'Day 1',
    icon: PhoneCall,
    title: 'Strategy Call',
    highlight: 'Zero-pressure alignment & positioning',
    description:
      'We unpack your positioning, ideal decision-makers, and market bottlenecks to architect an exact route to qualified pipeline.',
    ambientGlow: 'from-[#e68324]/45 via-[#c05c12]/30 to-transparent',
  },
  {
    step: '02',
    stage: 'Architecture',
    timeline: 'Week 1',
    icon: PenTool,
    title: 'Build the System',
    highlight: 'Done-for-you authority & cold outreach',
    description:
      'Profile assets, high-authority content engines, and custom cold email infrastructure designed and calibrated around your voice.',
    ambientGlow: 'from-[#f7d984]/40 via-[#d4973b]/25 to-transparent',
  },
  {
    step: '03',
    stage: 'Deployment',
    timeline: 'Week 2',
    icon: Rocket,
    title: 'Launch & Reach',
    highlight: 'Multi-channel outbound campaign go-live',
    description:
      'Content goes live, outbound sequences launch, and verified decision-makers start seeing your brand authority. You do nothing.',
    ambientGlow: 'from-[#f5a742]/40 via-[#b85b14]/25 to-transparent',
  },
  {
    step: '04',
    stage: 'Velocity',
    timeline: 'Continuous',
    icon: TrendingUp,
    title: 'Scale & Report',
    highlight: 'Compound pipeline growth & booked calls',
    description:
      'Weekly transparent reports — zero black box. We continuously optimize message variants, reply rates, and meetings booked.',
    ambientGlow: 'from-[#d4973b]/40 via-[#e67e22]/25 to-transparent',
  },
]

const engines = [
  {
    icon: Sparkles,
    name: 'Media & Growth',
    role: 'The Attention Engine',
    theme: 'gold',
    description:
      'Personal branding, content, outreach, and automation — the system that turns founders into recognized industry authorities while their calendars fill with qualified inbound calls.',
    chips: ['Personal Branding', 'Content & Outreach', 'Lead Generation Engine'],
  },
  {
    icon: Cpu,
    name: 'Engineering',
    role: 'The Build Engine',
    theme: 'bronze',
    description:
      'AI-assisted product engineering that designs, ships, and tests high-performance platforms, multi-tenant SaaS, and LLM-powered applications — built for rock-solid scale.',
    chips: ['High-Performance SaaS', 'AI & LLM Systems', 'Full-Stack Architecture'],
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

function SectionDivider() {
  return (
    <div className="relative mx-auto max-w-6xl px-5 sm:px-8" aria-hidden="true">
      <div className="pointer-events-none absolute inset-x-20 top-1/2 -translate-y-1/2 h-8 bg-gradient-to-r from-transparent via-[#e67e22]/12 to-transparent blur-md" />
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[#FFEB97]/25 to-transparent" />
    </div>
  )
}

function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#070504]"
    >
      {/* Soft, Silky, Luxury Fluted Light Curtain (Crowns the Hero & Header at the top) */}
      <div className="absolute inset-x-0 top-0 h-[640px] sm:h-[720px] overflow-hidden select-none">
        {/* Layer 1: Rich warm sunset amber gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, #FFF4CE 0%, #F5B041 12%, #D35400 28%, #6E2C00 48%, #2C1100 68%, #070504 88%, #070504 100%)',
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
            backgroundImage: `radial-gradient(ellipse 32px 24px at 32px 0px, rgba(255, 245, 210, 0.7) 0%, transparent 100%)`,
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

        {/* Layer 6: Smooth fade to deep obsidian page background */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-[#070504]/80 to-[#070504]" />
      </div>

      {/* Warm Atmospheric Ambient Lighting throughout the page body */}
      {/* Mid-page warm amber spotlights (Services & About) */}
      <div className="pointer-events-none absolute left-1/2 top-[28%] -translate-x-1/2 h-[700px] w-[1000px] rounded-full bg-[#e67e22]/18 blur-[180px]" />
      <div className="pointer-events-none absolute -right-28 top-[38%] h-[650px] w-[650px] rounded-full bg-[#d35400]/20 blur-[160px]" />
      <div className="pointer-events-none absolute -left-28 top-[50%] h-[650px] w-[650px] rounded-full bg-[#f5b041]/18 blur-[160px]" />

      {/* Lower-mid warm bronze spotlight (Process section) */}
      <div className="pointer-events-none absolute left-1/2 top-[64%] -translate-x-1/2 h-[750px] w-[1100px] rounded-full bg-[#d46a16]/22 blur-[180px]" />
      <div className="pointer-events-none absolute right-[-5%] top-[70%] h-[650px] w-[650px] rounded-full bg-[#e67e22]/20 blur-[160px]" />
      <div className="pointer-events-none absolute left-[-5%] top-[76%] h-[650px] w-[650px] rounded-full bg-[#f5b041]/18 blur-[160px]" />

      {/* Luminous Warm Sunset Horizon at the bottom of the page (Contact & Footer) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[900px] bg-gradient-to-t from-[#6e2a05]/50 via-[#3a1804]/35 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 bottom-20 -translate-x-1/2 h-[550px] w-[1100px] rounded-full bg-[#e67e22]/28 blur-[170px]" />
      <div className="pointer-events-none absolute left-1/2 bottom-8 -translate-x-1/2 h-[350px] w-[800px] rounded-full bg-[#f5b041]/22 blur-[140px]" />
      <div className="pointer-events-none absolute left-[8%] bottom-[12%] h-[550px] w-[550px] rounded-full bg-[#e67e22]/22 blur-[160px]" />
      <div className="pointer-events-none absolute right-[8%] bottom-[8%] h-[550px] w-[550px] rounded-full bg-[#d4973b]/24 blur-[160px]" />
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
        className="h-full w-full object-contain drop-shadow-[0_0_16px_rgba(255,235,151,0.35)]"
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
      <header className="relative mx-auto flex h-14 sm:h-16 max-w-5xl items-center justify-between rounded-full border border-[#FFEB97]/20 bg-[#120a05]/80 px-3.5 sm:px-5 backdrop-blur-2xl shadow-[0_12px_36px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,235,151,0.06),inset_0_1px_1px_rgba(255,235,151,0.25)] transition-all">
        {/* Subtle top light reflection edge */}
        <div className="pointer-events-none absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFEB97]/40 to-transparent" />

        {/* Brand */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 sm:gap-3"
          aria-label="BrandRoute Partners — back to top"
        >
          <div className="relative">
            <BrandLogo className="h-8 w-8 sm:h-9 sm:w-9" />
            <div className="absolute inset-0 rounded-full bg-[#FFEB97]/15 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[14px] sm:text-[15px] font-bold tracking-tight text-[#FAF6EE] group-hover:text-white transition-colors">
              BrandRoute
            </span>
            <span className="rounded-full bg-[#FFEB97]/10 border border-[#FFEB97]/20 px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[#FFEB97]">
              Partners
            </span>
          </div>
        </a>

        {/* Center Pill Dock */}
        <nav
          className="hidden md:flex items-center gap-1 rounded-full border border-[#FFEB97]/15 bg-black/40 p-1 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"
          aria-label="Primary"
        >
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-[#FAF6EE]/75 transition-all duration-200 hover:bg-white/[0.08] hover:text-[#FFEB97] hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Right CTA + Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Liquid Gold Header CTA */}
          <a
            href={`mailto:${EMAIL}`}
            className="group relative inline-flex h-9 sm:h-10 items-center gap-1.5 sm:gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#FFEB97] via-[#f7d984] to-[#d4973b] px-3.5 sm:px-4 text-[12px] sm:text-[13px] font-bold text-[#180e04] shadow-[0_4px_20px_rgba(255,235,151,0.25),inset_0_1px_1px_rgba(255,255,255,0.7)] transition-all hover:scale-[1.02] hover:shadow-[0_4px_28px_rgba(255,235,151,0.45)]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            <CalendarCheck className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">Book a Strategy Call</span>
            <span className="inline sm:hidden">Book Call</span>
            <ArrowRight className="hidden sm:inline h-3 w-3 -mr-0.5 opacity-60 transition-transform group-hover:translate-x-0.5" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FFEB97]/20 bg-white/[0.04] text-[#FAF6EE] transition hover:bg-white/[0.1] hover:text-[#FFEB97] md:hidden"
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
            className="mx-auto mt-2 max-w-5xl rounded-3xl border border-[#FFEB97]/20 bg-[#120a05]/95 p-3 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.85)] md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-[#FAF6EE]/80 transition hover:bg-white/[0.06] hover:text-[#FFEB97]"
                >
                  <span>{item.name}</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CircularBadge({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 160 160"
        className="h-28 w-28 sm:h-32 sm:w-32 animate-spin-slow select-none"
      >
        <path
          id="circlePath"
          d="M 80, 80 m -56, 0 a 56,56 0 1,1 112,0 a 56,56 0 1,1 -112,0"
          fill="none"
        />
        <text className="text-[9.5px] font-mono uppercase tracking-[0.24em] fill-[#FFEB97]/80">
          <textPath href="#circlePath" startOffset="0%">
            BRANDROUTE PARTNERS • TECHNOLOGY × MEDIA • 2026 •
          </textPath>
        </text>
      </svg>
      <div className="absolute flex h-9 w-9 items-center justify-center rounded-full border border-[#FFEB97]/35 bg-[#583714]/40 backdrop-blur-sm shadow-[0_0_20px_rgba(255,235,151,0.3)]">
        <Sparkles className="h-4 w-4 text-[#FFEB97]" />
      </div>
    </div>
  )
}

// Floating translucent glass pills with pulsing pearl dots (Reference Image 1 upgrade)
function FloatingPill({
  text,
  className = '',
  dotPosition = 'top-left',
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
      className={`group relative inline-flex items-center rounded-full border border-[#FFEB97]/30 bg-[#140c06]/90 px-4 py-1.5 backdrop-blur-sm shadow-[0_6px_24px_rgba(0,0,0,0.6)] transition-all hover:border-[#FFEB97]/75 hover:bg-[#1f130a]/95 hover:shadow-[0_8px_30px_rgba(88,55,20,0.45)] ${className}`}
    >
      {/* Attached luminous pearl dot with breathing glow */}
      <span
        className={`absolute h-2.5 w-2.5 rounded-full bg-[#FFF4CE] shadow-[0_0_10px_#FFEB97,0_0_20px_rgba(255,235,151,0.5)] ${
          dotPosition === 'top-left'
            ? '-left-1 -top-1'
            : dotPosition === 'top-right'
            ? '-right-1 -top-1'
            : dotPosition === 'bottom-left'
            ? '-bottom-1 -left-1'
            : '-bottom-1 -right-1'
        }`}
      >
        <span className="absolute inset-0 rounded-full bg-[#FFEB97] opacity-60 animate-ping" />
      </span>
      <span className="text-xs sm:text-sm font-medium tracking-wide text-[#FAF6EE] group-hover:text-white transition-colors">
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
      {/* Dedicated Headline Showcase Stage with Floating Pills around it */}
      <div className="relative mx-auto max-w-4xl py-6 sm:py-10 text-center">
        {/* Floating Pills - Perfectly mapped with ZERO overlap (Desktop & Tablet) */}
        <div className="pointer-events-none hidden lg:block">
          {/* Top Left Pill */}
          <div className="pointer-events-auto absolute -top-4 left-6 xl:left-12">
            <FloatingPill
              text="Personal Branding"
              dotPosition="top-left"
              delay={0.2}
              yOffset={7}
              duration={4.4}
            />
          </div>

          {/* Top Right Pill (well away from Circular Badge) */}
          <div className="pointer-events-auto absolute -top-4 right-16 xl:right-28">
            <FloatingPill
              text="Lead Generation"
              dotPosition="top-right"
              delay={0.5}
              yOffset={8}
              duration={4.8}
            />
          </div>

          {/* Mid Left Pill (to the side of Generate More Leads) */}
          <div className="pointer-events-auto absolute top-1/2 -translate-y-1/2 -left-6 xl:-left-16">
            <FloatingPill
              text="Cold Email Marketing"
              dotPosition="bottom-left"
              delay={0.8}
              yOffset={7}
              duration={4.0}
            />
          </div>

          {/* Mid Right Pill (safely below Circular Badge) */}
          <div className="pointer-events-auto absolute top-[65%] -right-4 xl:-right-12">
            <FloatingPill
              text="Sales Support"
              dotPosition="bottom-right"
              delay={1.1}
              yOffset={8}
              duration={4.6}
            />
          </div>

          {/* Bottom Center Pill (isolated inside the heading stage, well above subtitle) */}
          <div className="pointer-events-auto absolute -bottom-5 left-1/2 -translate-x-1/2">
            <FloatingPill
              text="Marketing Automation"
              dotPosition="top-left"
              delay={1.4}
              yOffset={6}
              duration={4.2}
            />
          </div>
        </div>

        {/* Circular Rotating Badge in the open space on the right (XL screens) */}
        <div className="hidden xl:block absolute -right-24 top-0 pointer-events-none">
          <CircularBadge />
        </div>

        {/* Tagline Badge */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FFEB97]/30 bg-[#583714]/35 px-4 py-1.5 text-xs text-[#FAF6EE] shadow-[0_0_20px_rgba(88,55,20,0.35)]">
            <Sparkles className="h-3.5 w-3.5 text-[#FFEB97]" />
            <span className="font-semibold tracking-[0.15em] uppercase text-[#FFEB97]">
              BRANDING × LEADS × TECHNOLOGY
            </span>
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.5rem]"
        >
          Build Your Brand.
          <br />
          <span className="bg-gradient-to-r from-[#FFEB97] via-[#ffd675] to-[#d4973b] bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(255,235,151,0.3)]">
            Generate More Leads.
          </span>
        </motion.h1>
      </div>

      {/* 3. Subtitle & CTAs (Placed cleanly below the heading stage, with 0 interference) */}
      <div className="mx-auto mt-6 max-w-2xl text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="text-pretty text-base leading-relaxed text-[#FAF6EE]/65 sm:text-lg"
        >
          Strategy, lead gen, and marketing systems for ambitious businesses.
          One system builds your reputation while the other fills your calendar
          — backed by high-performance engineering.
        </motion.p>

        {/* Liquid Gold Button Combination */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row"
        >
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FFEB97] via-[#f7d984] to-[#d4973b] px-8 text-sm font-semibold text-[#180e04] shadow-[0_10px_35px_-8px_rgba(255,235,151,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.7)] transition-all hover:scale-[1.02] hover:shadow-[0_12px_45px_-4px_rgba(255,235,151,0.7)] sm:w-auto"
          >
            <CalendarCheck className="h-4 w-4" />
            Book a Strategy Call
          </a>
          <a
            href="#services"
            className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[#FFEB97]/25 bg-[#140c06]/60 backdrop-blur-md px-7 text-sm font-medium text-[#FAF6EE]/80 shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all hover:border-[#FFEB97]/60 hover:bg-[#1f130a]/80 hover:text-white sm:w-auto"
          >
            Explore Services
            <ArrowDown className="h-4 w-4 text-[#FFEB97] transition-transform group-hover:translate-y-0.5" />
          </a>
        </motion.div>

        {/* Mobile & Tablet Pill cluster */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 lg:hidden">
          {services.map((s, idx) => (
            <FloatingPill
              key={s.name}
              text={s.name}
              delay={idx * 0.15}
              dotPosition={idx % 2 === 0 ? 'top-left' : 'top-right'}
            />
          ))}
        </div>
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
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#FFEB97]">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 text-3xl font-semibold tracking-tight text-balance text-[#FAF6EE] sm:text-4xl"
      >
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-pretty text-[#FAF6EE]/60">
        {subtitle}
      </p>
    </motion.div>
  )
}

function ServicesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const isMobile = useIsMobile()
  const total = services.length
  const lastActionTime = useRef(0)

  const handlePrev = useCallback(() => {
    const now = performance.now()
    if (now - lastActionTime.current < 280) return
    lastActionTime.current = now
    setActiveIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  const handleNext = useCallback(() => {
    const now = performance.now()
    if (now - lastActionTime.current < 280) return
    lastActionTime.current = now
    setActiveIndex((prev) => (prev + 1) % total)
  }, [total])

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext])

  return (
    <div className="relative mx-auto mt-10 sm:mt-14 w-full max-w-5xl select-none">
      {/* 1. Architectural Crosshair Grid Background (from reference video) */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        {/* Dual-layer ambient warm sunset lamp centered behind cards */}
        <div className="absolute h-[520px] w-[580px] rounded-full bg-[#e67e22]/32 blur-[130px]" />
        <div className="absolute h-[340px] w-[400px] rounded-full bg-[#f7d984]/22 blur-[90px]" />

        {/* Minimalist grid lines */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 235, 151, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 235, 151, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: isMobile ? '80px 80px' : '120px 120px',
            backgroundPosition: 'center center',
          }}
        />

        {/* Crosshair (+) markers at grid corners */}
        <div className="absolute inset-x-6 inset-y-6 sm:inset-x-12 sm:inset-y-10 flex flex-col justify-between font-mono text-xs text-[#FFEB97]/40">
          <div className="flex justify-between">
            <span>+</span><span>+</span><span>+</span>
          </div>
          <div className="flex justify-between">
            <span>+</span><span>+</span><span>+</span>
          </div>
          <div className="flex justify-between">
            <span>+</span><span>+</span><span>+</span>
          </div>
        </div>
      </div>

      {/* 2. 3D Card Stack Stage - Supports gesture pan across entire stage */}
      <motion.div
        className="relative mx-auto flex h-[490px] sm:h-[540px] items-center justify-center overflow-hidden touch-pan-y"
        style={{ perspective: 1200 }}
        onPanEnd={(_, info) => {
          const swipeThreshold = 35
          const velocityThreshold = 250
          if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
            handleNext()
          } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
            handlePrev()
          }
        }}
      >
        <div className="relative flex h-full w-full items-center justify-center">
          {services.map((service, index) => {
            // Forward circular slot index: 0 = center, 1 = right, 2 = parked right, 3 = parked left, 4 = left
            const dForward = (index - activeIndex + total) % total

            const isActive = dForward === 0
            const isRight = dForward === 1
            const isLeft = dForward === 4
            const isVisible = isActive || isRight || isLeft

            // Smooth deterministic 3D values with zero wrap jumps
            let x = 0
            let scale = 1
            let rotateY = 0
            let opacity = 1
            let zIndex = 30
            let pointerEvents: 'auto' | 'none' = 'auto'

            if (isActive) {
              x = 0
              scale = 1
              rotateY = 0
              opacity = 1
              zIndex = 30
              pointerEvents = 'auto'
            } else if (isRight) {
              x = isMobile ? 140 : 275
              scale = isMobile ? 0.83 : 0.86
              rotateY = isMobile ? -14 : -19
              opacity = isMobile ? 0.45 : 0.65
              zIndex = 20
              pointerEvents = 'auto'
            } else if (isLeft) {
              x = isMobile ? -140 : -275
              scale = isMobile ? 0.83 : 0.86
              rotateY = isMobile ? 14 : 19
              opacity = isMobile ? 0.45 : 0.65
              zIndex = 20
              pointerEvents = 'auto'
            } else if (dForward === 2) {
              // Parked on right, smoothly waiting to enter into right slot
              x = isMobile ? 220 : 430
              scale = 0.72
              rotateY = -26
              opacity = 0
              zIndex = 10
              pointerEvents = 'none'
            } else {
              // dForward === 3: Parked on left, smoothly waiting to enter into left slot
              x = isMobile ? -220 : -430
              scale = 0.72
              rotateY = 26
              opacity = 0
              zIndex = 10
              pointerEvents = 'none'
            }

            const Icon = service.icon

            return (
              <motion.div
                key={service.name}
                initial={false}
                animate={{
                  x,
                  scale,
                  rotateY,
                  opacity,
                  zIndex,
                }}
                transition={{
                  duration: 0.62,
                  ease: [0.16, 1, 0.3, 1], // Apple/Linear fluid glide
                }}
                drag={isVisible ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                onDragEnd={(_, info) => {
                  const swipeThreshold = 35
                  const velocityThreshold = 250
                  if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
                    handleNext()
                  } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
                    handlePrev()
                  }
                }}
                onClick={() => {
                  if (isLeft) {
                    handlePrev()
                  } else if (isRight) {
                    handleNext()
                  }
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                  pointerEvents,
                }}
                className={`absolute w-[295px] xs:w-[330px] sm:w-[380px] h-[430px] sm:h-[480px] rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden border border-[#FFEB97]/25 shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,235,151,0.25)] select-none touch-pan-y ${
                  isActive
                    ? 'cursor-grab active:cursor-grabbing bg-gradient-to-b from-[#1c1108]/95 via-[#2c1608]/95 to-[#5a2a0c] shadow-[0_30px_70px_rgba(180,80,20,0.38),inset_0_1px_1px_rgba(255,235,151,0.35)]'
                    : 'cursor-pointer active:cursor-grabbing bg-gradient-to-b from-[#140b06]/95 via-[#1c0f07]/90 to-[#2c1407]/90 hover:border-[#FFEB97]/40'
                }`}
              >
                {/* Specular top rim light reflection */}
                <div className="pointer-events-none absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFEB97]/60 to-transparent" />

                {/* Ambient warm sunset lamp at the bottom (Exact replica of reference video) */}
                <div
                  className={`pointer-events-none absolute -bottom-10 inset-x-0 h-52 bg-gradient-to-t ${service.ambientGlow} blur-2xl opacity-90`}
                />

                {/* Top Row: '+' Crosshair Marker & Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono text-sm text-[#FFEB97]/70 select-none">
                    +
                  </span>
                  <span className="rounded-full border border-[#FFEB97]/20 bg-black/40 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-[#FFEB97] backdrop-blur-sm">
                    {service.badge}
                  </span>
                </div>

                {/* Center Content: Icon + Big Headline + Tagline */}
                <div className="relative z-10 my-auto text-center px-2">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#FFEB97]/30 bg-gradient-to-br from-[#583714]/70 via-[#2a1a0b]/80 to-[#120a05] text-[#FFEB97] shadow-[0_0_25px_rgba(255,235,151,0.3),inset_0_1px_1px_rgba(255,235,151,0.4)]">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF6EE] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm font-medium text-[#FFEB97]/85 tracking-wide">
                    {service.tagline}
                  </p>
                </div>

                {/* Bottom Content: Clean Description + Action CTA */}
                <div className="relative z-10 text-center">
                  <p className="text-xs sm:text-sm leading-relaxed text-[#FAF6EE]/75 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Interactive Button on Active Card */}
                  {isActive && (
                    <motion.a
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      href={`mailto:${EMAIL}?subject=Inquiry: ${encodeURIComponent(service.name)}`}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-4 inline-flex h-9 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#FFEB97] via-[#f7d984] to-[#d4973b] px-5 text-xs font-bold text-[#180e04] shadow-[0_4px_16px_rgba(255,235,151,0.35),inset_0_1px_1px_rgba(255,255,255,0.8)] transition-all hover:scale-105 active:scale-95"
                    >
                      <CalendarCheck className="h-3.5 w-3.5" />
                      <span>Book Strategy Call</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* 3. Floating Pagination Pill Dock (As shown in reference video) */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous service"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFEB97]/25 bg-[#120a05]/80 text-[#FAF6EE] backdrop-blur-md transition hover:border-[#FFEB97]/60 hover:bg-[#201208] hover:text-[#FFEB97] active:scale-95 shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Dots Capsule Dock */}
        <div className="flex items-center gap-2 rounded-full border border-[#FFEB97]/20 bg-[#120a05]/85 px-4 py-2 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,235,151,0.2)]">
          {services.map((s, idx) => {
            const isCurrent = idx === activeIndex
            return (
              <button
                key={s.name}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Jump to ${s.name}`}
                className={`transition-all duration-300 rounded-full ${
                  isCurrent
                    ? 'h-2.5 w-8 bg-gradient-to-r from-[#FFEB97] to-[#d4973b] shadow-[0_0_12px_rgba(255,235,151,0.6)]'
                    : 'h-2 w-2 bg-white/25 hover:bg-white/50'
                }`}
              />
            )
          })}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next service"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFEB97]/25 bg-[#120a05]/80 text-[#FAF6EE] backdrop-blur-md transition hover:border-[#FFEB97]/60 hover:bg-[#201208] hover:text-[#FFEB97] active:scale-95 shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative scroll-mt-20 py-20 sm:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="services-title"
          eyebrow="01 / What we do"
          title="Build your brand. Fill your pipeline."
          subtitle="Explore our core growth systems. Click or swipe through the interactive 3D deck to see how each system scales your authority and revenue."
          center
        />

        {/* 3D Card Stack Carousel (Matching Pinterest / Reference Video) */}
        <ServicesCarousel />
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
          eyebrow="02 / Who we are"
          title="Two engines. One route."
          subtitle="A branding and lead-generation house backed by serious engineering — one side builds your reputation and pipeline, the other builds the platforms they run on."
        />

        {/* Dual Luxury Companion Slabs: Media & Growth (Gold) vs Engineering (Bronze) */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {engines.map((engine, i) => {
            const Icon = engine.icon
            const isGold = engine.theme === 'gold'
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
                  className={`group relative h-full overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:shadow-[0_20px_55px_rgba(180,80,20,0.32)] ${
                    isGold
                      ? 'border-[#FFEB97]/30 bg-gradient-to-b from-[#241509]/95 via-[#180d05]/95 to-[#2c1305]/85 hover:border-[#FFEB97]/60 shadow-[0_16px_50px_rgba(180,80,20,0.22)]'
                      : 'border-[#d4973b]/25 bg-gradient-to-b from-[#1e1007]/95 via-[#140a04]/95 to-[#240e04]/85 hover:border-[#d4973b]/50 shadow-[0_16px_50px_rgba(140,60,15,0.18)]'
                  }`}
                >
                  {/* Subtle top rim specular light */}
                  <div className="pointer-events-none absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFEB97]/40 to-transparent" />
                  {/* Ambient warm glow at the bottom */}
                  <div className="pointer-events-none absolute -bottom-10 inset-x-0 h-32 bg-gradient-to-t from-[#e67e22]/18 to-transparent blur-xl" />
                  <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-[#FFEB97]/0 blur-3xl transition-colors duration-500 group-hover:bg-[#FFEB97]/15" />
                  
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border shadow-[0_0_24px_rgba(88,55,20,0.4),inset_0_1px_1px_rgba(255,235,151,0.3)] ${
                        isGold
                          ? 'border-[#FFEB97]/30 bg-gradient-to-br from-[#583714]/60 to-[#2a1a0b]/80 text-[#FFEB97]'
                          : 'border-[#d4973b]/25 bg-gradient-to-br from-[#40260c]/60 to-[#1a1005]/80 text-[#d4973b]'
                      }`}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-[#FAF6EE]">
                        {engine.name}
                      </h3>
                      <p className="mt-0.5 font-mono text-xs uppercase tracking-[0.16em] text-[#FFEB97]/80">
                        {engine.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-[#FAF6EE]/60">
                    {engine.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {engine.chips.map((chip) => (
                      <li
                        key={chip}
                        className="rounded-full border border-[#FFEB97]/15 bg-[#140c06]/80 px-3 py-1 text-xs text-[#FAF6EE]/75"
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

function ProcessCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const isMobile = useIsMobile()
  const total = processSteps.length
  const lastActionTime = useRef(0)

  const handlePrev = useCallback(() => {
    const now = performance.now()
    if (now - lastActionTime.current < 280) return
    lastActionTime.current = now
    setActiveIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  const handleNext = useCallback(() => {
    const now = performance.now()
    if (now - lastActionTime.current < 280) return
    lastActionTime.current = now
    setActiveIndex((prev) => (prev + 1) % total)
  }, [total])

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext])

  return (
    <div className="relative mx-auto mt-10 sm:mt-14 w-full max-w-5xl select-none">
      {/* 1. Architectural Crosshair Grid Background (from reference video) */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        {/* Dual-layer ambient warm sunset lamp centered behind cards */}
        <div className="absolute h-[520px] w-[580px] rounded-full bg-[#e67e22]/32 blur-[130px]" />
        <div className="absolute h-[340px] w-[400px] rounded-full bg-[#f7d984]/22 blur-[90px]" />

        {/* Minimalist grid lines */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 235, 151, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 235, 151, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: isMobile ? '80px 80px' : '120px 120px',
            backgroundPosition: 'center center',
          }}
        />

        {/* Crosshair (+) markers at grid corners */}
        <div className="absolute inset-x-6 inset-y-6 sm:inset-x-12 sm:inset-y-10 flex flex-col justify-between font-mono text-xs text-[#FFEB97]/40">
          <div className="flex justify-between">
            <span>+</span><span>+</span><span>+</span>
          </div>
          <div className="flex justify-between">
            <span>+</span><span>+</span><span>+</span>
          </div>
          <div className="flex justify-between">
            <span>+</span><span>+</span><span>+</span>
          </div>
        </div>
      </div>

      {/* 2. 3D Card Stack Stage - Supports pan gesture across entire stage */}
      <motion.div
        className="relative mx-auto flex h-[490px] sm:h-[540px] items-center justify-center overflow-hidden touch-pan-y"
        style={{ perspective: 1200 }}
        onPanEnd={(_, info) => {
          const swipeThreshold = 35
          const velocityThreshold = 250
          if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
            handleNext()
          } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
            handlePrev()
          }
        }}
      >
        <div className="relative flex h-full w-full items-center justify-center">
          {processSteps.map((step, index) => {
            // Forward circular slot index for 4 items: 0 = center, 1 = right, 2 = parked, 3 = left
            const dForward = (index - activeIndex + total) % total

            const isActive = dForward === 0
            const isRight = dForward === 1
            const isLeft = dForward === 3
            const isVisible = isActive || isRight || isLeft

            let x = 0
            let scale = 1
            let rotateY = 0
            let opacity = 1
            let zIndex = 30
            let pointerEvents: 'auto' | 'none' = 'auto'

            if (isActive) {
              x = 0
              scale = 1
              rotateY = 0
              opacity = 1
              zIndex = 30
              pointerEvents = 'auto'
            } else if (isRight) {
              x = isMobile ? 140 : 275
              scale = isMobile ? 0.83 : 0.86
              rotateY = isMobile ? -14 : -19
              opacity = isMobile ? 0.45 : 0.65
              zIndex = 20
              pointerEvents = 'auto'
            } else if (isLeft) {
              x = isMobile ? -140 : -275
              scale = isMobile ? 0.83 : 0.86
              rotateY = isMobile ? 14 : 19
              opacity = isMobile ? 0.45 : 0.65
              zIndex = 20
              pointerEvents = 'auto'
            } else {
              // dForward === 2: Parked behind
              x = 0
              scale = 0.72
              rotateY = 0
              opacity = 0
              zIndex = 10
              pointerEvents = 'none'
            }

            const Icon = step.icon

            return (
              <motion.div
                key={step.title}
                initial={false}
                animate={{
                  x,
                  scale,
                  rotateY,
                  opacity,
                  zIndex,
                }}
                transition={{
                  duration: 0.62,
                  ease: [0.16, 1, 0.3, 1], // Apple/Linear fluid glide
                }}
                drag={isVisible ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                onDragEnd={(_, info) => {
                  const swipeThreshold = 35
                  const velocityThreshold = 250
                  if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
                    handleNext()
                  } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
                    handlePrev()
                  }
                }}
                onClick={() => {
                  if (isLeft) {
                    handlePrev()
                  } else if (isRight) {
                    handleNext()
                  }
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                  pointerEvents,
                }}
                className={`absolute w-[295px] xs:w-[330px] sm:w-[380px] h-[430px] sm:h-[480px] rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden border border-[#FFEB97]/25 shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,235,151,0.25)] select-none touch-pan-y ${
                  isActive
                    ? 'cursor-grab active:cursor-grabbing bg-gradient-to-b from-[#1c1108]/95 via-[#2c1608]/95 to-[#5a2a0c] shadow-[0_30px_70px_rgba(180,80,20,0.38),inset_0_1px_1px_rgba(255,235,151,0.35)]'
                    : 'cursor-pointer active:cursor-grabbing bg-gradient-to-b from-[#140b06]/95 via-[#1c0f07]/90 to-[#2c1407]/90 hover:border-[#FFEB97]/40'
                }`}
              >
                {/* Specular top rim light reflection */}
                <div className="pointer-events-none absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFEB97]/60 to-transparent" />

                {/* Ambient warm sunset lamp at the bottom */}
                <div
                  className={`pointer-events-none absolute -bottom-10 inset-x-0 h-52 bg-gradient-to-t ${step.ambientGlow} blur-2xl opacity-90`}
                />

                {/* Top Row: '+' Crosshair Marker & Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono text-sm text-[#FFEB97]/70 select-none">
                    +
                  </span>
                  <span className="rounded-full border border-[#FFEB97]/20 bg-black/40 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-[#FFEB97] backdrop-blur-sm">
                    STAGE {step.step} / {step.stage}
                  </span>
                </div>

                {/* Center Content: Icon + Big Headline + Tagline */}
                <div className="relative z-10 my-auto text-center px-2">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#FFEB97]/30 bg-gradient-to-br from-[#583714]/70 via-[#2a1a0b]/80 to-[#120a05] text-[#FFEB97] shadow-[0_0_25px_rgba(255,235,151,0.3),inset_0_1px_1px_rgba(255,235,151,0.4)]">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF6EE] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                    {step.title}
                  </h3>
                  <div className="mt-2 inline-flex items-center gap-1.5 flex-wrap justify-center">
                    <span className="font-mono text-xs font-semibold text-[#FFEB97] tracking-wider uppercase">
                      {step.timeline}
                    </span>
                    <span className="text-xs text-[#FAF6EE]/40">•</span>
                    <span className="text-xs text-[#FFEB97]/85 font-medium">
                      {step.highlight}
                    </span>
                  </div>
                </div>

                {/* Bottom Content: Clean Description + Action CTA */}
                <div className="relative z-10 text-center">
                  <p className="text-xs sm:text-sm leading-relaxed text-[#FAF6EE]/75 line-clamp-3">
                    {step.description}
                  </p>

                  {/* Interactive Button on Active Card */}
                  {isActive && (
                    <motion.a
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      href={`mailto:${EMAIL}?subject=Process Inquiry: Stage ${step.step} (${encodeURIComponent(step.title)})`}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-4 inline-flex h-9 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#FFEB97] via-[#f7d984] to-[#d4973b] px-5 text-xs font-bold text-[#180e04] shadow-[0_4px_16px_rgba(255,235,151,0.35),inset_0_1px_1px_rgba(255,255,255,0.8)] transition-all hover:scale-105 active:scale-95"
                    >
                      <CalendarCheck className="h-3.5 w-3.5" />
                      <span>Book Strategy Call</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* 3. Floating Pagination Pill Dock (4 dots for 4 steps) */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous step"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFEB97]/25 bg-[#120a05]/80 text-[#FAF6EE] backdrop-blur-md transition hover:border-[#FFEB97]/60 hover:bg-[#201208] hover:text-[#FFEB97] active:scale-95 shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Dots Capsule Dock */}
        <div className="flex items-center gap-2 rounded-full border border-[#FFEB97]/20 bg-[#120a05]/85 px-4 py-2 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,235,151,0.2)]">
          {processSteps.map((s, idx) => {
            const isCurrent = idx === activeIndex
            return (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Jump to Stage ${s.step}`}
                className={`transition-all duration-300 rounded-full ${
                  isCurrent
                    ? 'h-2.5 w-8 bg-gradient-to-r from-[#FFEB97] to-[#d4973b] shadow-[0_0_12px_rgba(255,235,151,0.6)]'
                    : 'h-2 w-2 bg-white/25 hover:bg-white/50'
                }`}
              />
            )
          })}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next step"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFEB97]/25 bg-[#120a05]/80 text-[#FAF6EE] backdrop-blur-md transition hover:border-[#FFEB97]/60 hover:bg-[#201208] hover:text-[#FFEB97] active:scale-95 shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="relative scroll-mt-20 py-20 sm:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="process-title"
          eyebrow="03 / How it works"
          title="From first call to full calendar."
          subtitle="A clear, transparent 4-stage pipeline. Click or swipe through the interactive 3D deck to explore each phase."
          center
        />

        {/* 3D Process Card Stack Carousel (Matching Pinterest / Reference Video) */}
        <ProcessCarousel />
      </div>
    </section>
  )
}

function ContactSection() {
  const { copied, copy } = useCopyEmail()

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative scroll-mt-20 py-20 sm:py-28 overflow-hidden"
    >
      {/* Ambient warm atmospheric glow behind Contact Section */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[850px] rounded-full bg-[#e67e22]/20 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          custom={0}
          className="relative overflow-hidden rounded-3xl border border-[#FFEB97]/30 bg-gradient-to-b from-[#221308]/95 via-[#160c04]/95 to-[#381606]/90 px-6 py-16 text-center sm:px-12 sm:py-20 shadow-[0_30px_90px_rgba(180,80,20,0.32),inset_0_1px_1px_rgba(255,235,151,0.3)]"
        >
          {/* Specular top rim light reflection */}
          <div className="pointer-events-none absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFEB97]/50 to-transparent" />

          {/* Spotlight glow from top */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFEB97]/25 blur-[120px]"
          />

          {/* Warm sunset lamp glow from bottom */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-14 inset-x-0 h-52 bg-gradient-to-t from-[#e67e22]/32 via-[#d35400]/20 to-transparent blur-2xl"
          />

          <p className="relative font-mono text-xs uppercase tracking-[0.25em] text-[#FFEB97]">
            04 / Get in touch
          </p>
          <h2
            id="contact-title"
            className="relative mt-4 text-balance text-3xl font-semibold tracking-tight text-[#FAF6EE] sm:text-5xl"
          >
            Book your strategy call.
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#FAF6EE]/60">
            Thirty minutes. Your brand, your goals, your market — and a clear
            route to more leads. No obligation, no black box.
          </p>

          <div className="relative mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#FFEB97] via-[#f7d984] to-[#d4973b] px-8 text-sm font-semibold text-[#180e04] shadow-[0_10px_35px_-8px_rgba(255,235,151,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.7)] transition-all hover:opacity-95 hover:scale-[1.02] sm:w-auto"
            >
              <CalendarCheck className="h-4 w-4 shrink-0" />
              Book a Strategy Call
            </a>
            <button
              type="button"
              onClick={copy}
              aria-label={
                copied ? 'Email address copied' : 'Copy email address to clipboard'
              }
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[#FFEB97]/25 bg-[#140c06]/60 backdrop-blur-md px-7 text-sm font-medium text-[#FAF6EE]/80 shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition hover:border-[#FFEB97]/60 hover:bg-[#1f130a]/80 hover:text-white sm:w-auto"
            >
              {copied ? (
                <Check className="h-4 w-4 text-[#FFEB97]" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? 'Copied!' : 'Copy email'}
            </button>
          </div>

          <p className="relative mt-8 inline-flex items-center gap-1.5 text-sm text-[#FAF6EE]/40">
            <MapPin className="h-3.5 w-3.5 text-[#FFEB97]/70" />
            Indore, India — working worldwide
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative z-10 mt-auto overflow-hidden border-t border-[#FFEB97]/20 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-16">
      {/* Top light reflection border edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFEB97]/40 to-transparent" />

      {/* Warm sunset horizon atmosphere across the footer */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#5a2505]/40 via-[#220d02]/25 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 h-64 w-[800px] rounded-full bg-[#e67e22]/22 blur-[130px]" />
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-36 w-[600px] rounded-full bg-[#f7d984]/12 blur-[100px]" />

      {/* Giant background wordmark in subtle champagne gold */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-3 select-none overflow-hidden text-center sm:top-6"
      >
        <span className="whitespace-nowrap bg-gradient-to-b from-[#FFEB97]/[0.12] via-[#e67e22]/[0.06] to-transparent bg-clip-text text-[13vw] font-bold leading-none tracking-tighter text-transparent">
          BRANDROUTE
        </span>
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div>
            <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
              <BrandLogo className="h-9 w-9" />
              <span className="text-[15px] font-semibold tracking-tight text-[#FAF6EE]">
                BrandRoute <span className="font-normal text-[#FAF6EE]/50">Partners</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#FAF6EE]/50">
              Personal branding, lead generation, and marketing automation —
              backed by high-performance engineering.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#FFEB97] transition hover:opacity-80"
            >
              <Mail className="h-3.5 w-3.5" />
              {EMAIL}
            </a>
          </div>

          {/* Company */}
          <nav aria-label="Company">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#FAF6EE]/40">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#about" className="text-[#FAF6EE]/60 transition hover:text-[#FFEB97]">
                  About Us
                </a>
              </li>
              <li>
                <a href="#process" className="text-[#FAF6EE]/60 transition hover:text-[#FFEB97]">
                  Our Process
                </a>
              </li>
              <li>
                <a href="#contact" className="text-[#FAF6EE]/60 transition hover:text-[#FFEB97]">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#FAF6EE]/40">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href="#services"
                    className="text-[#FAF6EE]/60 transition hover:text-[#FFEB97]"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#FAF6EE]/40">
              Ready to grow?
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[#FAF6EE]/50">
              See exactly how your brand and pipeline would grow — on a free
              strategy call.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-4 inline-flex h-10 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#FFEB97] via-[#f7d984] to-[#d4973b] px-5 text-[13px] font-semibold text-[#180e04] shadow-[0_4px_20px_rgba(255,235,151,0.25),inset_0_1px_1px_rgba(255,255,255,0.7)] transition hover:opacity-95 hover:scale-[1.02]"
            >
              Book a Strategy Call
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#FFEB97]/10 pt-6 text-xs text-[#FAF6EE]/40 sm:flex-row">
          <p>© 2026 BrandRoute Partners. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.22em] text-[#FAF6EE]/30">
            Technology × Media
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative isolate flex min-h-screen flex-col bg-[#070504] font-sans text-[#FAF6EE] antialiased">
        <Background />
        <Header />
        <main className="relative z-10 flex-1">
          <Hero />
          <SectionDivider />
          <ServicesSection />
          <SectionDivider />
          <AboutSection />
          <SectionDivider />
          <ProcessSection />
          <SectionDivider />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
