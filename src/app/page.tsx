'use client'

import { useCallback, useState } from 'react'
import { motion, MotionConfig, type Variants } from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
  BadgeCheck,
  Brain,
  Check,
  Copy,
  Cpu,
  Eye,
  Layers,
  Lightbulb,
  Mail,
  MapPin,
  Megaphone,
  Radio,
  Rocket,
  Route,
  Sparkles,
  TrendingUp,
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

type Service = {
  name: string
  tag: string
  description: string
  icon: LucideIcon
}

const services: Service[] = [
  {
    name: 'Brainwave Media',
    tag: 'Content & Production',
    description:
      'Scroll-stopping content, visuals, and video that make brands impossible to ignore.',
    icon: Brain,
  },
  {
    name: 'Brainstorm Labs',
    tag: 'Brand Strategy',
    description:
      'Positioning, naming, and identity born from structured creative sprints.',
    icon: Lightbulb,
  },
  {
    name: 'The Attention Dept',
    tag: 'Social Media',
    description:
      'Social-first storytelling engineered to earn, keep, and grow your audience.',
    icon: Eye,
  },
  {
    name: 'Makewaves Media',
    tag: 'PR & Campaigns',
    description:
      'Launches, PR, and campaigns built to create noise — the kind that converts.',
    icon: Radio,
  },
  {
    name: 'Marketwise Growth',
    tag: 'Performance & SEO',
    description:
      'Paid ads, SEO, and funnels tuned for measurable, compounding growth.',
    icon: TrendingUp,
  },
  {
    name: 'ScaleTheory Agency',
    tag: 'Growth Systems',
    description:
      'Playbooks, automation, and systems that take businesses to the next level.',
    icon: Rocket,
  },
  {
    name: 'Crowdora Labs',
    tag: 'Community & Buzz',
    description:
      'Community-led growth that turns audiences into loyal brand evangelists.',
    icon: Megaphone,
  },
]

type Partner = {
  icon: LucideIcon
  name: string
  role: string
  description: string
  chips: string[]
}

const partners: Partner[] = [
  {
    icon: Cpu,
    name: 'Mohammad Naved',
    role: 'Co-Founder · Technology Lead',
    description:
      'AI-assisted developer and prompt engineer. Designs and ships Google-certified IoT ecosystems, multi-tenant SaaS platforms, and LLM-powered applications — owned end to end, from architecture to deployment.',
    chips: ['Google-Certified IoT', 'AI & LLM Engineering', 'Full-Stack Platforms'],
  },
  {
    icon: Sparkles,
    name: 'Sahaj Ochani',
    role: 'Co-Founder · Media & Growth Lead',
    description:
      'Founder of The Brainy Branding — a LinkedIn authority and outreach system that has served 50+ founders, coaches, and businesses across the globe. Runs both engines at once: personal branding that builds reputation, and human-led outreach that brings qualified leads.',
    chips: ['The Brainy Branding', '50+ Global Clients', 'LinkedIn Authority & Lead Gen'],
  },
]

const mergedStats = [
  { value: '50+', label: 'Global Clients Served' },
  { value: '600+', label: 'Personalized Outreach / Month' },
  { value: '71/75', label: 'Google Home Tests Passed' },
  { value: '7', label: 'Specialist Studios' },
]

const heroChips: { label: string; icon: LucideIcon }[] = [
  { label: 'Google-Certified Engineering', icon: BadgeCheck },
  { label: '7 Specialist Studios', icon: Layers },
  { label: 'AI-Powered Products', icon: Cpu },
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
      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black,transparent)]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.055) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* gradient glows */}
      <div className="absolute -top-44 left-1/2 h-[460px] w-[720px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />
      <div className="absolute -right-44 top-[42%] h-[380px] w-[380px] rounded-full bg-fuchsia-600/10 blur-[120px]" />
      <div className="absolute -bottom-24 -left-44 h-[360px] w-[360px] rounded-full bg-violet-600/10 blur-[120px]" />
      {/* film grain */}
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
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#050508]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="flex items-center gap-2.5"
          aria-label="BrandRoute Partners — back to top"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-[0_0_24px_-6px_rgba(168,85,247,0.7)]">
            <Route className="h-4 w-4 text-white" strokeWidth={2.5} />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            BrandRoute <span className="font-normal text-white/50">Partners</span>
          </span>
        </a>

        <nav
          className="hidden items-center gap-7 text-sm text-white/55 md:flex"
          aria-label="Primary"
        >
          <a href="#services" className="transition hover:text-white">
            Studios
          </a>
          <a href="#partners" className="transition hover:text-white">
            Partners
          </a>
          <a href="#contact" className="transition hover:text-white">
            Contact
          </a>
        </nav>

        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-[13px] font-medium text-black transition hover:bg-white/85"
        >
          Start a Project
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
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
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-white/65">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
            </span>
            <span className="font-mono tracking-[0.14em]">
              TECHNOLOGY × MEDIA — UNDER ONE ROOF
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
          Build it. Launch it.
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
            Make it impossible to ignore.
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/55 sm:text-lg"
        >
          BrandRoute Partners is a boutique technology and media house. One
          partner engineers AI-powered products and platforms; the other runs
          seven specialist growth studios. From first commit to full-blown
          attention — one team, one route.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#services"
            className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 text-sm font-medium text-white shadow-[0_10px_40px_-10px_rgba(168,85,247,0.8)] transition hover:opacity-90 sm:w-auto"
          >
            Explore the Studios
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-7 text-sm font-medium text-white/75 transition hover:border-white/25 hover:text-white sm:w-auto"
          >
            <Mail className="h-4 w-4" />
            {EMAIL}
          </a>
        </motion.div>

        <motion.ul
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-12 flex flex-wrap items-center justify-center gap-2.5"
        >
          {heroChips.map((chip) => (
            <li
              key={chip.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-white/55"
            >
              <chip.icon className="h-3.5 w-3.5 text-violet-300/80" />
              {chip.label}
            </li>
          ))}
        </motion.ul>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          className="mt-8 text-xs tracking-wide text-white/35"
        >
          From the founders of{' '}
          <span className="font-medium text-white/60">Codtrex AI</span>
          <span className="mx-1.5 text-white/25">×</span>
          <span className="font-medium text-white/60">The Brainy Branding</span>
        </motion.p>
      </div>
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
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet-300/80">
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
          title="Seven studios. One route."
          subtitle="Every service a brand needs to get built, launched, and noticed — under one roof. Pick one studio, or take the whole journey with us."
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
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 transition-colors duration-300 hover:border-violet-400/30 hover:bg-white/[0.05]"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/0 blur-3xl transition-colors duration-500 group-hover:bg-violet-500/15" />
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-gradient-to-br from-violet-500/15 to-fuchsia-500/15 text-violet-300 transition-colors group-hover:text-fuchsia-300">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-xs text-white/20">
                    0{i + 1}
                  </span>
                </div>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-violet-300/70">
                  {service.tag}
                </p>
                <h3 className="mt-1.5 text-lg font-semibold tracking-tight">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {service.description}
                </p>
              </motion.article>
            )
          })}

          {/* CTA card — continues the 01–07 numbering */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            custom={1}
            className="relative flex flex-col items-center justify-center gap-5 overflow-hidden rounded-2xl border border-violet-400/25 bg-gradient-to-br from-violet-500/[0.12] via-fuchsia-500/[0.06] to-transparent p-6 text-center lg:col-span-2 lg:flex-row lg:justify-between lg:text-left"
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-violet-300/70">
                08 — Your studio
              </p>
              <h3 className="mt-1.5 text-lg font-semibold tracking-tight sm:text-xl">
                Your brand could be next.
              </h3>
            </div>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 text-sm font-medium text-white shadow-[0_10px_36px_-12px_rgba(168,85,247,0.9)] transition hover:opacity-90"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function PartnersSection() {
  return (
    <section
      id="partners"
      aria-labelledby="partners-title"
      className="relative scroll-mt-20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="partners-title"
          eyebrow="Who we are"
          title="Two partners. One route."
          subtitle="A technology and media partnership built to take brands from idea to attention — deep engineering on one side, relentless growth on the other."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {partners.map((partner, i) => {
            const Icon = partner.icon
            return (
              <motion.article
                key={partner.role}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                custom={i}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-7 transition-colors duration-300 hover:border-fuchsia-400/25 hover:bg-white/[0.045]"
              >
                <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-fuchsia-500/0 blur-3xl transition-colors duration-500 group-hover:bg-fuchsia-500/10" />
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-violet-500/15 to-fuchsia-500/15">
                    <Icon className="h-6 w-6 text-violet-300" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {partner.name}
                    </h3>
                    <p className="mt-0.5 font-mono text-xs uppercase tracking-[0.15em] text-fuchsia-300/80">
                      {partner.role}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-white/55">
                  {partner.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {partner.chips.map((chip) => (
                    <li
                      key={chip}
                      className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-white/60"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}
        </div>

        {/* Merged credibility stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          custom={2}
          className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {mergedStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 text-center"
            >
              <p className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-3xl font-semibold tracking-tight text-transparent">
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
          className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] px-6 py-16 text-center sm:px-12 sm:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/15 blur-[100px]"
          />
          <p className="relative font-mono text-xs uppercase tracking-[0.25em] text-violet-300/80">
            Get in touch
          </p>
          <h2
            id="contact-title"
            className="relative mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-5xl"
          >
            Let’s take your brand places.
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/55">
            A product to build, a story to tell, or a brand to grow — one email
            starts the route. We usually reply within a day.
          </p>

          <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 text-sm font-medium text-white shadow-[0_10px_40px_-10px_rgba(168,85,247,0.8)] transition hover:opacity-90 sm:w-auto"
            >
              <Mail className="h-4 w-4 shrink-0" />
              {EMAIL}
            </a>
            <button
              type="button"
              onClick={copy}
              aria-label={
                copied ? 'Email address copied' : 'Copy email address to clipboard'
              }
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 text-sm font-medium text-white/75 transition hover:border-white/25 hover:text-white sm:w-auto"
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
    <footer className="relative z-10 mt-auto border-t border-white/[0.06] py-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
        <div className="flex items-center gap-2 text-sm text-white/40">
          <Route className="h-4 w-4 text-violet-300/60" />
          © {new Date().getFullYear()} BrandRoute Partners
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/30">
          Technology × Media
        </p>
        <a
          href={`mailto:${EMAIL}`}
          className="text-sm text-white/40 transition hover:text-white/80"
        >
          {EMAIL}
        </a>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative isolate flex min-h-screen flex-col bg-[#050508] font-sans text-white antialiased">
        <Background />
        <Header />
        <main className="relative z-10 flex-1">
          <Hero />
          <ServicesSection />
          <PartnersSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
