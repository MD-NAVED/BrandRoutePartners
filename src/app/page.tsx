'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, MotionConfig, useInView, type Variants } from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
  BadgeCheck,
  Brain,
  CalendarCheck,
  Check,
  Copy,
  Cpu,
  Eye,
  Fingerprint,
  Headset,
  Layers,
  Lightbulb,
  Mail,
  MapPin,
  Megaphone,
  PenTool,
  PhoneCall,
  Radio,
  Rocket,
  Route,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react'

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

type Service = { name: string; description: string; icon: LucideIcon }

const services: Service[] = [
  {
    name: 'Personal Branding',
    description:
      'Your profile becomes a page that sells you while you sleep — positioning, content, and presence built around your authority.',
    icon: Fingerprint,
  },
  {
    name: 'Lead Generation',
    description:
      'Qualified leads, not random contacts. Every lead is checked and warmed up before it ever reaches your calendar.',
    icon: Target,
  },
  {
    name: 'Cold Email Marketing',
    description:
      'Personalized outreach written and sent manually — messages that read like a human wrote them, because one did.',
    icon: Send,
  },
  {
    name: 'Sales Support',
    description:
      'From first reply to booked call, we keep every conversation moving so deals never go cold and nothing slips through.',
    icon: Headset,
  },
  {
    name: 'Marketing Automation',
    description:
      'Funnels, follow-ups, and weekly reporting on autopilot. The system keeps running while you run the business.',
    icon: Workflow,
  },
]

type Studio = { name: string; tag: string; icon: LucideIcon }

const studios: Studio[] = [
  { name: 'Brainwave Media', tag: 'Content & Production', icon: Brain },
  { name: 'Brainstorm Labs', tag: 'Brand Strategy', icon: Lightbulb },
  { name: 'The Attention Dept', tag: 'Social Media', icon: Eye },
  { name: 'Makewaves Media', tag: 'PR & Campaigns', icon: Radio },
  { name: 'Marketwise Growth', tag: 'Performance & SEO', icon: TrendingUp },
  { name: 'ScaleTheory Agency', tag: 'Growth Systems', icon: Rocket },
  { name: 'Crowdora Labs', tag: 'Community & Buzz', icon: Megaphone },
]

const processSteps = [
  {
    icon: PhoneCall,
    title: 'Strategy Call',
    description:
      'A free 30-minute call to understand your brand, your goals, and your market. No obligation, no pressure.',
  },
  {
    icon: PenTool,
    title: 'Build the System',
    description:
      'Profile, content engine, and outreach systems — designed, written, and connected around your voice.',
  },
  {
    icon: Rocket,
    title: 'Launch & Reach',
    description:
      'Your brand goes live — content published, outreach started, campaigns running. You do nothing.',
  },
  {
    icon: TrendingUp,
    title: 'Scale & Report',
    description:
      'Weekly reports — no hiding, no black box. We double down on what works and cut what does not.',
  },
]

const engines = [
  {
    icon: Sparkles,
    name: 'Media & Growth',
    role: 'The Attention Engine',
    description:
      'Personal branding, content, outreach, and automation — the system that turns founders into recognized voices while their calendars fill with qualified calls.',
    chips: ['Personal Branding', 'Content & Outreach', 'Lead Generation'],
  },
  {
    icon: Cpu,
    name: 'Engineering',
    role: 'The Build Engine',
    description:
      'AI-assisted product engineering that designs, ships, and tests Google-certified IoT ecosystems, multi-tenant SaaS platforms, and LLM-powered applications — end to end.',
    chips: ['Google-Certified IoT', 'AI & LLM Engineering', 'Full-Stack Platforms'],
  },
]

const stats = [
  { value: '71/75', label: 'Google Home Tests Passed' },
  { value: '5', label: 'Core Growth Services' },
  { value: '7', label: 'Specialist Studios' },
  { value: '14–20', label: 'Day Build Turnaround' },
]

const heroChips: { label: string; icon: LucideIcon }[] = [
  { label: 'Personal Branding & Leads', icon: Target },
  { label: '7 Specialist Studios', icon: Layers },
  { label: 'Google-Certified Engineering', icon: BadgeCheck },
  { label: '14–20 Day Turnaround', icon: Zap },
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

function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black,transparent)]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(52, 211, 153, 0.06) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute -top-44 left-1/2 h-[460px] w-[720px] -translate-x-1/2 rounded-full bg-emerald-600/20 blur-[140px]" />
      <div className="absolute -right-44 top-[42%] h-[380px] w-[380px] rounded-full bg-teal-500/10 blur-[120px]" />
      <div className="absolute -bottom-24 -left-44 h-[360px] w-[360px] rounded-full bg-emerald-600/10 blur-[120px]" />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-400/[0.07] bg-[#050a08]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="flex items-center gap-2.5"
          aria-label="BrandRoute Partners — back to top"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_0_24px_-6px_rgba(16,185,129,0.7)]">
            <Route className="h-4 w-4 text-[#050a08]" strokeWidth={2.5} />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            BrandRoute <span className="font-normal text-white/50">Partners</span>
          </span>
        </a>

        <nav
          className="hidden items-center gap-7 text-sm text-white/55 lg:flex"
          aria-label="Primary"
        >
          <a href="#services" className="transition hover:text-white">
            Services
          </a>
          <a href="#studios" className="transition hover:text-white">
            Studios
          </a>
          <a href="#about" className="transition hover:text-white">
            About
          </a>
          <a href="#process" className="transition hover:text-white">
            Process
          </a>
        </nav>

        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-4 text-[13px] font-semibold text-[#050a08] transition hover:opacity-90"
        >
          <CalendarCheck className="h-3.5 w-3.5" />
          Book a Strategy Call
        </a>
      </div>
    </header>
  )
}

const heroStats = [
  { value: 128, suffix: '+', label: 'Qualified leads / month' },
  { value: 42, suffix: '%', label: 'Average reply rate' },
  { value: 36, suffix: '', label: 'Meetings booked / month' },
]

function CountUp({ to, duration = 1.6 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!inView || !ref.current) return
    const start = performance.now()
    let raf = 0
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - p, 3)
      if (ref.current) ref.current.textContent = String(Math.round(to * eased))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])

  return <span ref={ref}>0</span>
}

function HeroStats() {
  return (
    <div className="mx-auto max-w-xl">
      <div className="grid grid-cols-3 divide-x divide-emerald-400/10 rounded-2xl border border-emerald-400/15 bg-[#060f0b]/90 py-6 backdrop-blur sm:py-8">
        {heroStats.map((stat) => (
          <div key={stat.label} className="px-2 text-center sm:px-4">
            <div className="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              <CountUp to={stat.value} />
              {stat.suffix && (
                <span className="text-emerald-300">{stat.suffix}</span>
              )}
            </div>
            <div className="mt-1.5 text-[10px] leading-snug text-white/45 sm:text-xs">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-6xl px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-28 lg:pt-32"
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-3.5 py-1.5 text-xs text-emerald-100/70">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono tracking-[0.14em]">
              BRANDING × LEADS × TECHNOLOGY
            </span>
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-7 text-balance text-4xl font-semibold leading-[1.06] tracking-tighter sm:text-6xl lg:text-[4.4rem]"
        >
          Build Your Brand.
          <br />
          <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent">
            Generate More Leads.
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/55 sm:text-lg"
        >
          Strategy, lead gen, and marketing systems for ambitious
          businesses. One system builds your reputation while the other
          fills your calendar — backed by Google-certified engineering.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-7 text-sm font-semibold text-[#050a08] shadow-[0_10px_40px_-10px_rgba(16,185,129,0.7)] transition hover:opacity-90 sm:w-auto"
          >
            <CalendarCheck className="h-4 w-4" />
            Book a Strategy Call
          </a>
          <a
            href="#services"
            className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-emerald-400/15 bg-white/[0.04] px-7 text-sm font-medium text-white/75 transition hover:border-emerald-400/35 hover:text-white sm:w-auto"
          >
            Explore Services
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </motion.div>

        <motion.ul
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-10 flex flex-wrap items-center justify-center gap-2.5"
        >
          {heroChips.map((chip) => (
            <li
              key={chip.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/[0.1] bg-white/[0.03] px-3 py-1.5 text-xs text-white/55"
            >
              <chip.icon className="h-3.5 w-3.5 text-emerald-300/80" />
              {chip.label}
            </li>
          ))}
        </motion.ul>
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={5}
        className="mt-14 sm:mt-16"
      >
        <HeroStats />
      </motion.div>
    </section>
  )
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  id,
}: {
  eyebrow: string
  title: string
  subtitle: string
  id: string
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      custom={0}
      className="max-w-2xl"
    >
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-300/80">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
      >
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-pretty text-white/55">
        {subtitle}
      </p>
    </motion.div>
  )
}

function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative scroll-mt-20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="services-title"
          eyebrow="What we do"
          title="Build your brand. Fill your pipeline."
          subtitle="Five core services that grow your reputation and your revenue — with no black box. You see everything we do, every week."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.article
                key={service.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                custom={i % 3}
              >
                <div className="group relative h-full overflow-hidden rounded-2xl border border-emerald-400/[0.08] bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.05]">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-500/0 blur-3xl transition-colors duration-500 group-hover:bg-emerald-500/15" />
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/[0.12] bg-gradient-to-br from-emerald-500/15 to-teal-500/15 text-emerald-300 transition-colors group-hover:text-teal-200">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="font-mono text-xs text-white/20">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {service.description}
                  </p>
                </div>
              </motion.article>
            )
          })}

          {/* CTA card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            custom={2}
          >
            <div className="relative flex h-full flex-col items-center justify-center gap-5 overflow-hidden rounded-2xl border border-emerald-400/25 bg-gradient-to-br from-emerald-500/[0.12] via-teal-500/[0.06] to-transparent p-6 text-center">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300/70">
                  06 — Your brand
                </p>
                <h3 className="mt-1.5 text-lg font-semibold tracking-tight sm:text-xl">
                  Your brand could be next.
                </h3>
                <p className="mt-2 text-sm text-white/50">
                  Free 30-minute call. Clear route. Zero obligation.
                </p>
              </div>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-6 text-sm font-semibold text-[#050a08] shadow-[0_10px_36px_-12px_rgba(16,185,129,0.8)] transition hover:opacity-90"
              >
                Book a Strategy Call
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function StudiosSection() {
  return (
    <section
      id="studios"
      aria-labelledby="studios-title"
      className="relative scroll-mt-20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="studios-title"
          eyebrow="Our network"
          title="Seven specialist studios."
          subtitle="Beyond the core services, seven specialist studios cover everything a growing brand needs — from strategy and content to community."
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {studios.map((studio, i) => {
            const Icon = studio.icon
            return (
              <motion.div
                key={studio.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                custom={i % 4}
              >
                <div className="group flex h-full items-center gap-3.5 rounded-2xl border border-emerald-400/[0.08] bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/25 hover:bg-white/[0.05]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/[0.12] bg-gradient-to-br from-emerald-500/15 to-teal-500/15 text-emerald-300">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold leading-tight tracking-tight">
                      {studio.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-white/45">{studio.tag}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* filler card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            custom={3}
          >
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-emerald-400/20 bg-transparent p-4 text-center">
              <p className="text-xs leading-relaxed text-white/40">
                <span className="font-semibold text-emerald-300/80">+2</span>{' '}
                engines under one roof
              </p>
            </div>
          </motion.div>
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
          eyebrow="Who we are"
          title="Two engines. One route."
          subtitle="A branding and lead-generation house backed by serious engineering — one side builds your reputation and pipeline, the other builds the platforms they run on."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {engines.map((engine, i) => {
            const Icon = engine.icon
            return (
              <motion.article
                key={engine.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                custom={i}
              >
                <div className="group relative h-full overflow-hidden rounded-2xl border border-emerald-400/[0.08] bg-white/[0.03] p-7 transition-colors duration-300 hover:border-emerald-400/25 hover:bg-white/[0.045]">
                  <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-teal-500/0 blur-3xl transition-colors duration-500 group-hover:bg-teal-500/10" />
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/[0.12] bg-gradient-to-br from-emerald-500/15 to-teal-500/15">
                      <Icon className="h-6 w-6 text-emerald-300" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">
                        {engine.name}
                      </h3>
                      <p className="mt-0.5 font-mono text-xs uppercase tracking-[0.15em] text-teal-300/80">
                        {engine.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-white/55">
                    {engine.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {engine.chips.map((chip) => (
                      <li
                        key={chip}
                        className="rounded-full border border-emerald-400/[0.1] bg-white/[0.03] px-3 py-1 text-xs text-white/60"
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

        {/* stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          custom={2}
          className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-emerald-400/[0.08] bg-white/[0.03] p-5 text-center"
            >
              <p className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-3xl font-semibold tracking-tight text-transparent">
                {stat.value}
              </p>
              <p className="mt-1.5 text-xs leading-snug text-white/45">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="relative scroll-mt-20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="process-title"
          eyebrow="How it works"
          title="From first call to full calendar."
          subtitle="A simple, transparent process. You always know what is happening, what is next, and what came back."
        />

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.li
                key={step.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                custom={i}
              >
                <div className="relative h-full rounded-2xl border border-emerald-400/[0.08] bg-white/[0.03] p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/[0.12] bg-gradient-to-br from-emerald-500/15 to-teal-500/15 text-emerald-300">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="font-mono text-2xl font-semibold text-emerald-400/20">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            )
          })}
        </ol>
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
      className="relative scroll-mt-20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          custom={0}
          className="relative overflow-hidden rounded-3xl border border-emerald-400/[0.1] bg-white/[0.02] px-6 py-16 text-center sm:px-12 sm:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/15 blur-[100px]"
          />
          <p className="relative font-mono text-xs uppercase tracking-[0.25em] text-emerald-300/80">
            Get in touch
          </p>
          <h2
            id="contact-title"
            className="relative mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-5xl"
          >
            Book your strategy call.
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/55">
            Thirty minutes. Your brand, your goals, your market — and a clear
            route to more leads. No obligation, no black box.
          </p>

          <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-7 text-sm font-semibold text-[#050a08] shadow-[0_10px_40px_-10px_rgba(16,185,129,0.7)] transition hover:opacity-90 sm:w-auto"
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
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-emerald-400/15 bg-white/[0.04] px-6 text-sm font-medium text-white/75 transition hover:border-emerald-400/35 hover:text-white sm:w-auto"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? 'Copied!' : 'Copy email'}
            </button>
          </div>

          <p className="relative mt-8 inline-flex items-center gap-1.5 text-sm text-white/40">
            <MapPin className="h-3.5 w-3.5" />
            Indore, India — working worldwide
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative z-10 mt-auto overflow-hidden border-t border-emerald-400/[0.07] pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-16">
      {/* giant background wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-3 select-none overflow-hidden text-center sm:top-6"
      >
        <span className="whitespace-nowrap bg-gradient-to-b from-emerald-400/[0.14] to-transparent bg-clip-text text-[13vw] font-bold leading-none tracking-tighter text-transparent">
          BRANDROUTE
        </span>
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          {/* brand */}
          <div>
            <a href="#top" className="flex items-center gap-2.5" aria-label="Back to top">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500">
                <Route className="h-4 w-4 text-[#050a08]" strokeWidth={2.5} />
              </span>
              <span className="text-[15px] font-semibold tracking-tight">
                BrandRoute <span className="font-normal text-white/50">Partners</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
              Personal branding, lead generation, and marketing automation —
              backed by Google-certified engineering.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-emerald-300/80 transition hover:text-emerald-200"
            >
              <Mail className="h-3.5 w-3.5" />
              {EMAIL}
            </a>
          </div>

          {/* company */}
          <nav aria-label="Company">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#about" className="text-white/55 transition hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#process" className="text-white/55 transition hover:text-white">
                  Our Process
                </a>
              </li>
            </ul>
          </nav>

          {/* services */}
          <nav aria-label="Services">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href="#services"
                    className="text-white/55 transition hover:text-white"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* cta */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Ready to grow?
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/45">
              See exactly how your brand and pipeline would grow — on a free
              strategy call.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-4 inline-flex h-10 items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-5 text-[13px] font-semibold text-[#050a08] transition hover:opacity-90"
            >
              Book a Strategy Call
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-emerald-400/[0.07] pt-6 text-xs text-white/35 sm:flex-row">
          <p>© 2026 BrandRoute Partners. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.22em] text-white/25">
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
      <div className="relative isolate flex min-h-screen flex-col bg-[#050a08] font-sans text-white antialiased">
        <Background />
        <Header />
        <main className="relative z-10 flex-1">
          <Hero />
          <ServicesSection />
          <StudiosSection />
          <AboutSection />
          <ProcessSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
