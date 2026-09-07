"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, BriefcaseBusiness, MapPin, Wifi, Loader2 } from "lucide-react"
import { applyToJob, fetchJob } from "@/lib/api"
import { useAuth } from "@/contexts/AuthContext"

export default function JobDetailPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { token } = useAuth()
  const [job, setJob] = useState<any>(null)
  const [jobId, setJobId] = useState("")
  const [coverLetter, setCoverLetter] = useState("")
  const [resumeUrl, setResumeUrl] = useState("")
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    params.then(({ jobId: id }) => {
      setJobId(id)
      fetchJob(id).then((data) => setJob(data.job)).catch((e) => setMessage(e.message)).finally(() => setLoading(false))
    })
  }, [params])

  async function apply() {
    if (!token) { setMessage("Please sign in to apply for this job."); return }
    setApplying(true); setMessage("")
    try {
      await applyToJob(jobId, { coverLetter, resumeUrl }, token)
      setMessage("Application submitted successfully. You can track it from My applications.")
    } catch (e: any) { setMessage(e.message) } finally { setApplying(false) }
  }

  if (loading) return <main className="min-h-screen flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin" /></main>
  if (!job) return <main className="min-h-screen px-4 py-10"><div className="mx-auto max-w-3xl"><p className="text-sm text-red-600">{message || "Job not found."}</p><Link href="/jobs" className="mt-4 inline-flex items-center gap-2 text-sm text-primary"><ArrowLeft className="h-4 w-4" /> Back to jobs</Link></div></main>

  const recruiter = job.recruiter || {}
  const salary = job.salaryMin || job.salaryMax ? `R${Number(job.salaryMin || 0).toLocaleString()} – R${Number(job.salaryMax || 0).toLocaleString()}` : "Salary not listed"

  return <main className="min-h-screen bg-muted/30 px-4 py-8 md:px-8"><div className="mx-auto max-w-5xl space-y-6">
    <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back to jobs</Link>
    <section className="rounded-2xl border bg-background p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between"><div><p className="text-sm font-medium text-primary">{recruiter.company || recruiter.name || "DevHeaven opportunity"}</p><h1 className="mt-1 text-3xl font-bold tracking-tight">{job.title}</h1><div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground"><span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location || "Location flexible"}</span><span className="inline-flex items-center gap-1"><BriefcaseBusiness className="h-4 w-4" />{job.type || "Full-time"}</span>{job.remote && <span className="inline-flex items-center gap-1"><Wifi className="h-4 w-4" />Remote</span>}</div></div><span className="rounded-full bg-muted px-3 py-1 text-sm font-medium">{job.status || "open"}</span></div>
      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_320px]"><div><h2 className="text-lg font-semibold">About the role</h2><p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{job.description}</p>{job.skills?.length > 0 && <><h2 className="mt-7 text-lg font-semibold">Skills</h2><div className="mt-3 flex flex-wrap gap-2">{job.skills.map((skill: string) => <span key={skill} className="rounded-full bg-muted px-3 py-1 text-xs">{skill}</span>)}</div></>}</div>
        <aside className="rounded-xl border bg-muted/30 p-5"><p className="text-sm text-muted-foreground">Compensation</p><p className="mt-1 font-semibold">{salary}</p><h3 className="mt-6 font-semibold">Apply</h3><textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} maxLength={10000} rows={7} placeholder="Optional cover letter" className="mt-3 w-full rounded-lg border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" /><input value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} maxLength={1000} placeholder="Resume URL (optional)" className="mt-3 w-full rounded-lg border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />{message && <p className="mt-3 text-sm text-muted-foreground">{message}</p>}<button disabled={applying || job.status !== "open"} onClick={apply} className="mt-4 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50">{applying ? "Submitting…" : job.status === "open" ? "Apply now" : "Applications closed"}</button><Link href="/applications" className="mt-3 block text-center text-xs text-muted-foreground hover:text-foreground">View my applications</Link></aside>
      </div>
    </section>
  </div></main>
}
