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
  Sparkles,
  Users,
  Zap,
} from "lucide-react"
import { useEffect, useState } from "react"

const highlights = [
  { icon: Network, title: "Meaningful connections", description: "Find people building in your space and turn introductions into opportunities.", tone: "cyan" },
  { icon: Code2, title: "Work that speaks", description: "Give your projects a home where collaborators and hiring teams can discover them.", tone: "violet" },
  { icon: BriefcaseBusiness, title: "Career momentum", description: "Explore roles, meet recruiters, and keep the next step in your career moving.", tone: "amber" },
]

const steps = [
  "Build a profile around the work you are proud of.",
  "Share ideas, projects, and useful resources with the community.",
  "Meet collaborators and teams that are a great fit.",
]

const rotatingWords = ["connection", "collaboration", "opportunity", "momentum"]

export default function LandingPage() {
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setWordIndex((index) => (index + 1) % rotatingWords.length), 2600)
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

      <div className="relative z-20 border-b border-cyan-300/20 bg-cyan-300 px-5 py-2.5 text-center text-xs font-black uppercase tracking-[0.25em] text-[#04101c] sm:text-sm">
        Deployment test • Homepage update • 08 Sep 2026
      </div>

      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="DevHeaven home">
          <span className="logo-pulse grid h-10 w-10 place-items-center rounded-xl bg-cyan-300 text-[#07111f] shadow-lg shadow-cyan-400/20 transition-transform group-hover:-rotate-6">
            <Code2 className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">DevHeaven</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/login" className="hidden text-sm font-medium text-slate-300 transition-colors hover:text-white sm:block">Sign in</Link>
          <Link href="/signup" className="rounded-full bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-[#07111f] shadow-lg shadow-cyan-500/15 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-cyan-400/30 sm:px-5">Join the community</Link>
        </div>
      </nav>

      <section className="relative z-10 mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[1.04fr_.96fr] lg:items-center lg:pb-28 lg:pt-20">
        <div className="hero-copy">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1.5 text-sm text-cyan-100 shadow-lg shadow-cyan-500/5 backdrop-blur">
            <Sparkles className="h-4 w-4 animate-pulse text-cyan-300" />
            A better place to build your developer network
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
            Your next great
            <span className="relative mt-1 block min-h-[1.05em] overflow-hidden text-cyan-300">
              <span key={rotatingWords[wordIndex]} className="word-enter block bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">{rotatingWords[wordIndex]}.</span>
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
            DevHeaven brings developers, collaborators, and opportunities into one focused community—so the work you share can take you further.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/signup" className="group inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3.5 font-semibold text-[#07111f] shadow-xl shadow-cyan-500/20 transition duration-300 hover:-translate-y-1 hover:bg-cyan-200 hover:shadow-cyan-400/30">
              Create your profile <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 font-semibold text-white backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-violet-300/50 hover:bg-violet-300/10">
              Explore DevHeaven
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-3 text-sm text-slate-400">
            <div className="flex -space-x-2" aria-hidden="true">
              <span className="avatar-float h-7 w-7 rounded-full border-2 border-[#050b18] bg-rose-300" />
              <span className="avatar-float avatar-delay-1 h-7 w-7 rounded-full border-2 border-[#050b18] bg-violet-300" />
              <span className="avatar-float avatar-delay-2 h-7 w-7 rounded-full border-2 border-[#050b18] bg-amber-200" />
            </div>
            Built for developers who want to grow together.
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="hero-card-glow absolute -inset-6 rounded-[2.5rem] bg-gradient-to-r from-cyan-400/20 via-violet-500/20 to-fuchsia-500/15 blur-3xl" aria-hidden="true" />
          <div className="floating-card relative rounded-[1.75rem] border border-white/10 bg-slate-950/65 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-6">
            <div className="absolute -right-4 -top-4 hidden rounded-2xl border border-violet-300/20 bg-violet-400/10 p-3 text-violet-200 shadow-xl backdrop-blur sm:block animate-float-slow">
              <Zap className="h-5 w-5" />
            </div>
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-400/30 to-cyan-300/20 text-violet-200"><Users className="h-5 w-5" /></span><div><p className="font-semibold text-white">Your developer space</p><p className="text-sm text-slate-400">Everything in one place</p></div></div>
              <span className="online-dot h-2.5 w-2.5 rounded-full bg-emerald-400" aria-label="Online" />
            </div>
            <div className="space-y-3 py-5">
              <div className="project-card rounded-2xl border border-cyan-300/15 bg-gradient-to-br from-cyan-300/[0.08] to-violet-400/[0.06] p-4 transition duration-300 hover:border-cyan-200/35">
                <div className="mb-3 flex items-center justify-between"><span className="text-sm font-medium text-cyan-200">Project spotlight</span><span className="text-xs text-slate-500">Just shared</span></div>
                <p className="font-medium text-white">A portfolio people can actually explore</p>
                <div className="mt-4 flex gap-2"><span className="rounded-full bg-cyan-300/15 px-2.5 py-1 text-xs text-cyan-100">React</span><span className="rounded-full bg-violet-300/15 px-2.5 py-1 text-xs text-violet-100">Design</span><span className="rounded-full bg-amber-200/10 px-2.5 py-1 text-xs text-amber-100">Open source</span></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="mini-card rounded-2xl border border-white/10 bg-white/[0.04] p-4"><MessageCircle className="mb-4 h-5 w-5 text-amber-200" /><p className="text-2xl font-semibold text-white">Connect</p><p className="mt-1 text-xs leading-5 text-slate-400">Start a conversation with your next collaborator.</p></div>
                <div className="mini-card rounded-2xl border border-white/10 bg-white/[0.04] p-4"><BookOpen className="mb-4 h-5 w-5 text-cyan-200" /><p className="text-2xl font-semibold text-white">Learn</p><p className="mt-1 text-xs leading-5 text-slate-400">Save resources worth coming back to.</p></div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl bg-cyan-300 px-4 py-3 text-center text-sm font-semibold text-[#07111f]">
              <span className="relative z-10">Share what you are building</span><span className="button-shine absolute inset-y-0 -left-1/3 w-1/3 bg-white/40 blur-md" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/10 bg-white/[0.025] backdrop-blur">
        <div className="mx-auto grid max-w-6xl divide-y divide-white/10 px-5 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0">
          {["Projects with a point", "Conversations that count", "Opportunities within reach"].map((item, index) => <p key={item} className="feature-strip py-5 text-center text-sm font-medium text-slate-300"><span className="mr-2 text-cyan-300">0{index + 1}</span>{item}</p>)}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Why DevHeaven</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">A community designed around <span className="text-gradient">momentum.</span></h2></div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {highlights.map(({ icon: Icon, title, description, tone }, index) => <article key={title} className={`feature-card feature-${tone} group rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition duration-500 hover:-translate-y-2 hover:bg-white/[0.06]`}><span className="feature-icon mb-10 grid h-11 w-11 place-items-center rounded-2xl"><Icon className="h-5 w-5" /></span><p className="text-sm text-slate-500">0{index + 1}</p><h3 className="mt-2 text-xl font-semibold text-white">{title}</h3><p className="mt-3 leading-7 text-slate-400">{description}</p><div className="mt-6 h-1 w-0 rounded-full bg-current transition-all duration-500 group-hover:w-12" /></article>)}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-5 pb-24 sm:px-8"><div className="cta-panel grid gap-10 rounded-[2rem] border border-cyan-200/15 bg-gradient-to-br from-cyan-300/15 via-violet-400/10 to-fuchsia-400/10 p-8 md:grid-cols-[.9fr_1.1fr] md:p-12"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Make your move</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white">Bring more of your work into the room.</h2></div><div><ul className="space-y-4">{steps.map((step) => <li key={step} className="flex gap-3 text-slate-200"><Check className="mt-1 h-5 w-5 shrink-0 text-cyan-300" />{step}</li>)}</ul><Link href="/signup" className="mt-8 inline-flex items-center gap-2 font-semibold text-cyan-200 transition hover:text-white">Get started today <ArrowRight className="h-4 w-4" /></Link></div></div></section>

      <footer className="relative z-10 border-t border-white/10"><div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-8"><p>© {new Date().getFullYear()} DevHeaven. Built for people who build.</p><a href="https://github.com/kgothalangLekitlane/portfolio" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-cyan-200"><Github className="h-4 w-4" /> View the portfolio</a></div></footer>
    </main>
  )
}
