"use client"

import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  Code2,
  Github,
  MessageCircle,
  Network,
  Search,
  Sparkles,
  Users,
  Zap,
} from "lucide-react"
import { useEffect, useState } from "react"

const rotatingWords = ["opportunity", "collaboration", "momentum", "community"]

const features = [
  {
    icon: Code2,
    eyebrow: "Show your work",
    title: "Turn your profile into a developer story.",
    description: "Bring your skills, projects, experience, and ambitions together in one profile that is easy to discover.",
    tone: "cyan",
  },
  {
    icon: Network,
    eyebrow: "Build your network",
    title: "Meet people who are building too.",
    description: "Connect with developers, collaborators, mentors, and professionals who can help move your next idea forward.",
    tone: "violet",
  },
  {
    icon: BriefcaseBusiness,
    eyebrow: "Find what is next",
    title: "Put better opportunities within reach.",
    description: "Discover jobs, connect with recruiters, and keep your career search in the same place as your developer network.",
    tone: "amber",
  },
]

const productAreas = [
  { icon: Users, label: "Developer profiles", detail: "Skills, experience & projects" },
  { icon: MessageCircle, label: "Direct conversations", detail: "Talk to people, not inboxes" },
  { icon: BriefcaseBusiness, label: "Jobs & recruitment", detail: "Candidates and opportunities" },
  { icon: BookOpen, label: "Resources", detail: "Learn, save & share" },
]

export default function LandingPage() {
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setWordIndex((index) => (index + 1) % rotatingWords.length)
    }, 2600)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050b18] text-slate-100 selection:bg-cyan-300 selection:text-slate-950">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-orb hero-orb-three" />
        <div className="hero-grid absolute inset-0 opacity-50" />
        <div className="hero-noise absolute inset-0" />
      </div>

      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:py-6">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="DevHeaven home">
          <span className="logo-pulse grid h-10 w-10 place-items-center rounded-xl bg-cyan-300 text-[#07111f] shadow-lg shadow-cyan-400/20 transition-transform group-hover:-rotate-6">
            <Code2 className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">DevHeaven</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          <a href="#features" className="text-sm text-slate-400 transition hover:text-white">Features</a>
          <a href="#how-it-works" className="text-sm text-slate-400 transition hover:text-white">How it works</a>
          <a href="#community" className="text-sm text-slate-400 transition hover:text-white">Community</a>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/login" className="hidden text-sm font-medium text-slate-300 transition-colors hover:text-white sm:block">Sign in</Link>
          <Link href="/signup" className="rounded-full bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-[#07111f] shadow-lg shadow-cyan-500/15 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-cyan-400/30 sm:px-5">Join DevHeaven</Link>
        </div>
      </nav>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:pb-28 lg:pt-24">
        <div className="hero-copy">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3.5 py-2 text-sm text-cyan-100 shadow-lg shadow-cyan-500/5 backdrop-blur">
            <Sparkles className="h-4 w-4 animate-pulse text-cyan-300" />
            The developer community built around progress
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
            Build your future with your
            <span className="relative mt-2 block min-h-[1.05em] overflow-hidden text-cyan-300">
              <span key={rotatingWords[wordIndex]} className="word-enter block bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">{rotatingWords[wordIndex]}.</span>
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            DevHeaven connects developers with people, projects, knowledge, and career opportunities—so you can spend less time searching and more time building.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/signup" className="group inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3.5 font-semibold text-[#07111f] shadow-xl shadow-cyan-500/20 transition duration-300 hover:-translate-y-1 hover:bg-cyan-200 hover:shadow-cyan-400/30">
              Create your profile <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 font-semibold text-white backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-violet-300/50 hover:bg-violet-300/10">
              <Search className="h-4 w-4" /> Explore the community
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-cyan-300" />Developer profiles</span>
            <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-cyan-300" />Projects & posts</span>
            <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-cyan-300" />Jobs & recruiters</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="hero-card-glow absolute -inset-8 rounded-[3rem] bg-gradient-to-r from-cyan-400/20 via-violet-500/20 to-fuchsia-500/15 blur-3xl" aria-hidden="true" />
          <div className="floating-card relative rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-7">
            <div className="absolute -right-3 -top-4 hidden rounded-2xl border border-violet-300/20 bg-violet-400/10 p-3 text-violet-200 shadow-xl backdrop-blur sm:block animate-float-slow">
              <Zap className="h-5 w-5" />
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet-400/30 to-cyan-300/20 text-violet-200"><Users className="h-5 w-5" /></span>
                <div><p className="font-semibold text-white">Your developer space</p><p className="text-sm text-slate-400">Profile • Network • Opportunities</p></div>
              </div>
              <span className="online-dot h-2.5 w-2.5 rounded-full bg-emerald-400" aria-label="Online" />
            </div>

            <div className="space-y-3 py-5">
              <div className="project-card rounded-2xl border border-cyan-300/15 bg-gradient-to-br from-cyan-300/[0.08] to-violet-400/[0.06] p-4 transition duration-300 hover:border-cyan-200/35 sm:p-5">
                <div className="mb-4 flex items-center justify-between"><span className="text-sm font-medium text-cyan-200">Featured project</span><span className="text-xs text-slate-500">Open to collaborate</span></div>
                <div className="flex items-start justify-between gap-4"><div><p className="text-lg font-semibold text-white">Build. Share. Get discovered.</p><p className="mt-1 text-sm leading-6 text-slate-400">Put the work you are proud of where the right people can find it.</p></div><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200"><Code2 className="h-5 w-5" /></span></div>
                <div className="mt-4 flex flex-wrap gap-2"><span className="rounded-full bg-cyan-300/15 px-2.5 py-1 text-xs text-cyan-100">React</span><span className="rounded-full bg-violet-300/15 px-2.5 py-1 text-xs text-violet-100">Node.js</span><span className="rounded-full bg-amber-200/10 px-2.5 py-1 text-xs text-amber-100">Open source</span></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="mini-card rounded-2xl border border-white/10 bg-white/[0.04] p-4"><MessageCircle className="mb-4 h-5 w-5 text-amber-200" /><p className="text-lg font-semibold text-white">Connect</p><p className="mt-1 text-xs leading-5 text-slate-400">Meet developers and start real conversations.</p></div>
                <div className="mini-card rounded-2xl border border-white/10 bg-white/[0.04] p-4"><BriefcaseBusiness className="mb-4 h-5 w-5 text-cyan-200" /><p className="text-lg font-semibold text-white">Discover</p><p className="mt-1 text-xs leading-5 text-slate-400">Find roles, recruiters, and new possibilities.</p></div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl bg-cyan-300 px-4 py-3 text-center text-sm font-semibold text-[#07111f]">
              <span className="relative z-10">Your next chapter starts with one profile.</span><span className="button-shine absolute inset-y-0 -left-1/3 w-1/3 bg-white/40 blur-md" />
            </div>
          </div>
        </div>
      </section>

      <section id="community" className="relative z-10 border-y border-white/10 bg-white/[0.025] backdrop-blur">
        <div className="mx-auto grid max-w-7xl px-5 sm:px-8 md:grid-cols-4">
          {productAreas.map(({ icon: Icon, label, detail }, index) => (
            <div key={label} className="feature-strip border-b border-white/10 px-4 py-6 text-center md:border-b-0 md:border-r md:last:border-r-0">
              <Icon className="mx-auto mb-3 h-5 w-5 text-cyan-300" />
              <p className="text-sm font-semibold text-white">{label}</p>
              <p className="mt-1 text-xs text-slate-500">{detail}</p>
              <span className="mt-3 block text-[10px] font-bold tracking-[0.2em] text-slate-600">0{index + 1}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Everything connected</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">A home for the work, people, and opportunities that move you forward.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">Instead of scattering your professional life across different platforms, DevHeaven brings the important pieces into one focused developer ecosystem.</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map(({ icon: Icon, eyebrow, title, description, tone }, index) => (
            <article key={title} className={`feature-card feature-${tone} group rounded-3xl border border-white/10 bg-white/[0.035] p-7 transition duration-500 hover:-translate-y-2 hover:bg-white/[0.06]`}>
              <span className="feature-icon mb-12 grid h-12 w-12 place-items-center rounded-2xl"><Icon className="h-5 w-5" /></span>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">0{index + 1} • {eyebrow}</p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">{title}</h3>
              <p className="mt-4 leading-7 text-slate-400">{description}</p>
              <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-slate-300 transition group-hover:text-cyan-200">Explore the experience <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="relative z-10 border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">How it works</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">Start simple. Build from there.</h2>
            <p className="mt-5 leading-7 text-slate-400">Your DevHeaven journey starts with a profile and grows with every project, connection, conversation, and opportunity.</p>
            <Link href="/signup" className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-cyan-300/10">Create your profile <ArrowRight className="h-4 w-4" /></Link>
          </div>

          <div className="grid gap-3">
            {[
              ["01", "Create your profile", "Show people who you are, what you build, and where you want to go."],
              ["02", "Put your work out there", "Share projects, posts, ideas, and resources with the community."],
              ["03", "Build meaningful connections", "Find developers and professionals worth knowing and start conversations."],
              ["04", "Move toward opportunity", "Explore jobs and recruitment opportunities that match your direction."],
            ].map(([number, title, description]) => (
              <div key={number} className="group flex gap-5 rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/20 hover:bg-white/[0.055]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-300/10 text-xs font-bold text-cyan-200">{number}</span>
                <div><h3 className="font-semibold text-white">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-400">{description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="cta-panel relative grid gap-10 rounded-[2rem] border border-cyan-200/15 bg-gradient-to-br from-cyan-300/15 via-violet-400/10 to-fuchsia-400/10 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Your move</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">Stop building alone.</h2>
            <p className="mt-4 max-w-xl text-lg leading-7 text-slate-300">Create your DevHeaven profile and put your work in front of the people who can help take it further.</p>
          </div>
          <Link href="/signup" className="group inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-7 py-4 font-semibold text-[#07111f] shadow-xl shadow-cyan-500/20 transition hover:-translate-y-1 hover:bg-cyan-200">Join DevHeaven <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-slate-400 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div><p className="font-semibold text-white">DevHeaven</p><p className="mt-1">A focused community for people who build.</p></div>
          <div className="flex items-center gap-5"><Link href="/login" className="transition hover:text-white">Sign in</Link><Link href="/signup" className="transition hover:text-cyan-200">Join</Link><a href="https://github.com/kgothalangLekitlane/portfolio" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-cyan-200"><Github className="h-4 w-4" /> Portfolio</a></div>
          <p>© {new Date().getFullYear()} DevHeaven</p>
        </div>
      </footer>
    </main>
  )
}
