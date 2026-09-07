"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Clock3, Loader2, RefreshCw, Search, Users, XCircle } from "lucide-react"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { fetchJobApplicants, updateApplicationStatus } from "@/lib/api"

type Candidate = { _id?: string; firstName?: string; lastName?: string; username?: string; profileImage?: string; skills?: string[]; location?: string; experience?: string; bio?: string; socialLinks?: Record<string, string> }
type Application = { _id: string; status: "submitted" | "reviewing" | "shortlisted" | "rejected" | "accepted" | "withdrawn"; coverLetter?: string; resumeUrl?: string; createdAt?: string; updatedAt?: string; applicant?: Candidate }
type Job = { _id: string; title: string; company?: string; location?: string; type?: string; remote?: boolean; status?: string }

const stages = ["submitted", "reviewing", "shortlisted", "accepted", "rejected"] as const
const stageLabels: Record<(typeof stages)[number], string> = { submitted: "Submitted", reviewing: "Reviewing", shortlisted: "Shortlisted", accepted: "Accepted", rejected: "Rejected" }

export default function RecruiterApplicationsPage() {
  const params = useParams<{ jobId: string }>()
  const jobId = params.jobId
  const [token] = useState(() => typeof window !== "undefined" ? localStorage.getItem("token") || localStorage.getItem("authToken") || "" : "")
  const [job, setJob] = useState<Job | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState("")
  const [error, setError] = useState("")
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<Application | null>(null)
  const [note, setNote] = useState("")

  async function load() {
    if (!token || !jobId) { setError("Sign in to manage applicants."); setLoading(false); return }
    setLoading(true); setError("")
    try {
      const data = await fetchJobApplicants(jobId, token)
      setJob(data.job || null)
      setApplications(data.applications || [])
    } catch (e) { setError(e instanceof Error ? e.message : "Could not load applicants") }
    finally { setLoading(false) }
  }

  useEffect(() => { void load() }, [jobId, token])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return applications
    return applications.filter(app => {
      const candidate = app.applicant || {}
      return `${candidate.firstName || ""} ${candidate.lastName || ""} ${candidate.username || ""} ${candidate.location || ""} ${(candidate.skills || []).join(" ")}`.toLowerCase().includes(needle)
    })
  }, [applications, query])

  function openCandidate(application: Application) { setSelected(application); setNote("") }

  async function changeStatus(status: (typeof stages)[number]) {
    if (!selected || !token) return
    setBusy(status); setError("")
    try {
      await updateApplicationStatus(selected._id, status, note, token)
      const updated = { ...selected, status }
      setApplications(prev => prev.map(app => app._id === selected._id ? updated : app))
      setSelected(updated)
      setNote("")
    } catch (e) { setError(e instanceof Error ? e.message : "Could not update application") }
    finally { setBusy("") }
  }

  if (loading) return <main className="min-h-screen flex items-center justify-center"><Loader2 className="h-5 w-5 animate-spin" /></main>

  return <main className="min-h-screen bg-muted/30 px-4 py-8 md:px-8">
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Link href="/recruiter-dashboard/jobs" className="mb-3 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="mr-2 h-4 w-4" />Back to jobs</Link>
          <p className="text-sm font-medium text-primary">Applicant pipeline</p>
          <h1 className="text-3xl font-bold tracking-tight">{job?.title || "Job applicants"}</h1>
          <p className="mt-1 text-muted-foreground">{job?.location || "Remote"}{job?.type ? ` · ${job.type}` : ""}{job?.remote ? " · Remote" : ""}</p>
        </div>
        <Button variant="outline" onClick={() => void load()}><RefreshCw className="mr-2 h-4 w-4" />Refresh</Button>
      </div>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <Card><CardContent className="grid gap-3 p-4 md:grid-cols-[1fr_auto]">
        <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search candidates by name, username, location or skill" /></div>
        <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground"><Users className="h-4 w-4" />{applications.length} applicant(s)</div>
      </CardContent></Card>

      {applications.length === 0 ? <Card><CardContent className="py-16 text-center"><Users className="mx-auto mb-3 h-10 w-10 text-muted-foreground" /><h2 className="font-semibold">No applications yet</h2><p className="mt-1 text-sm text-muted-foreground">Applications for this opening will appear here.</p></CardContent></Card> :
        <div className="grid gap-4 xl:grid-cols-5">
          {stages.map(stage => {
            const items = filtered.filter(app => app.status === stage)
            return <Card key={stage} className="min-h-[240px]">
              <CardHeader className="pb-3"><CardTitle className="flex items-center justify-between text-sm"><span>{stageLabels[stage]}</span><Badge variant="secondary">{items.length}</Badge></CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {items.length === 0 && <p className="py-6 text-center text-xs text-muted-foreground">No candidates</p>}
                {items.map(app => { const c = app.applicant || {}; const name = `${c.firstName || ""} ${c.lastName || ""}`.trim() || c.username || "Candidate"; return <button key={app._id} onClick={() => openCandidate(app)} className="w-full rounded-lg border bg-background p-3 text-left transition hover:border-primary/50 hover:shadow-sm"><p className="font-medium">{name}</p><p className="mt-1 text-xs text-muted-foreground">{c.location || "Location not provided"}</p><div className="mt-2 flex flex-wrap gap-1">{(c.skills || []).slice(0, 3).map(skill => <Badge key={skill} variant="outline" className="text-[10px]">{skill}</Badge>)}</div></button> })}
              </CardContent>
            </Card>
          })}
        </div>}

      {selected && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4" onMouseDown={e => { if (e.target === e.currentTarget) setSelected(null) }}>
        <Card className="max-h-[92vh] w-full max-w-2xl overflow-auto">
          <CardHeader><div className="flex items-start justify-between gap-4"><div><CardTitle>{`${selected.applicant?.firstName || ""} ${selected.applicant?.lastName || ""}`.trim() || selected.applicant?.username || "Candidate"}</CardTitle><p className="mt-1 text-sm text-muted-foreground">{selected.applicant?.username ? `@${selected.applicant.username}` : ""}{selected.applicant?.location ? ` · ${selected.applicant.location}` : ""}</p></div><Badge>{stageLabels[selected.status as (typeof stages)[number]] || selected.status}</Badge></div></CardHeader>
          <CardContent className="space-y-5">
            {selected.applicant?.bio && <div><h3 className="mb-1 text-sm font-semibold">About</h3><p className="text-sm text-muted-foreground whitespace-pre-wrap">{selected.applicant.bio}</p></div>}
            <div><h3 className="mb-2 text-sm font-semibold">Skills</h3><div className="flex flex-wrap gap-1">{(selected.applicant?.skills || []).map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)}{!selected.applicant?.skills?.length && <p className="text-sm text-muted-foreground">No skills listed.</p>}</div></div>
            {selected.applicant?.experience && <div><h3 className="mb-1 text-sm font-semibold">Experience</h3><p className="text-sm text-muted-foreground whitespace-pre-wrap">{selected.applicant.experience}</p></div>}
            {selected.coverLetter && <div><h3 className="mb-1 text-sm font-semibold">Cover letter</h3><p className="rounded-lg bg-muted/50 p-3 text-sm whitespace-pre-wrap">{selected.coverLetter}</p></div>}
            {selected.resumeUrl && <a href={selected.resumeUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-primary hover:underline">Open resume</a>}
            <div><h3 className="mb-2 text-sm font-semibold">Recruiter note</h3><Textarea value={note} onChange={e => setNote(e.target.value)} maxLength={1000} placeholder="Add a private note for this status change (optional)" rows={3} /></div>
            <div><h3 className="mb-2 text-sm font-semibold">Move candidate</h3><div className="flex flex-wrap gap-2">{stages.map(stage => <Button key={stage} size="sm" variant={stage === selected.status ? "default" : stage === "rejected" ? "destructive" : "outline"} disabled={busy !== "" || selected.status === "withdrawn"} onClick={() => void changeStatus(stage)}>{stage === "accepted" ? <CheckCircle2 className="mr-1 h-4 w-4" /> : stage === "rejected" ? <XCircle className="mr-1 h-4 w-4" /> : stage === "reviewing" ? <Clock3 className="mr-1 h-4 w-4" /> : null}{busy === stage ? "Saving..." : stageLabels[stage]}</Button>)}</div></div>
            <div className="flex justify-end"><Button variant="ghost" onClick={() => setSelected(null)}>Close</Button></div>
          </CardContent>
        </Card>
      </div>}
    </div>
  </main>
}
