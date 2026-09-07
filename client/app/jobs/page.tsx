"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Bookmark, BriefcaseBusiness, MapPin, Search, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { applyToJob, fetchJobs, fetchRecommendedJobs, fetchSavedJobs, saveJob } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

type Job = { _id: string; title: string; description: string; company?: string; location?: string; type?: string; remote?: boolean; skills?: string[]; salaryMin?: number; salaryMax?: number; status?: string; recruiter?: { name?: string; company?: string } };

const money = (value?: number) => value == null ? "" : `R${value.toLocaleString()}`;

export default function JobsPage() {
  const { token, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [recommended, setRecommended] = useState<Job[]>([]);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [remote, setRemote] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Job | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [applying, setApplying] = useState(false);

  const load = async () => {
    setLoading(true); setError("");
    try {
      const [jobResult, savedResult] = await Promise.all([fetchJobs({ q: query, location, remote, limit: 30 }), token ? fetchSavedJobs(token) : Promise.resolve({ jobs: [] })]);
      setJobs(jobResult?.jobs || []);
      setSaved(new Set((savedResult?.jobs || []).map((j: Job) => String(j._id))));
      if (token) { try { const result = await fetchRecommendedJobs(token); setRecommended(result?.jobs || []); } catch {} }
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to load jobs."); }
    finally { setLoading(false); }
  };

  useEffect(() => { if (!authLoading) void load(); }, [authLoading, token]);

  const visibleRecommendations = useMemo(() => recommended.filter(j => !jobs.some(x => x._id === j._id)).slice(0, 6), [recommended, jobs]);

  const toggleSave = async (job: Job) => {
    if (!token) return toast({ title: "Sign in to save jobs" });
    try { const result = await saveJob(job._id, token); setSaved(current => { const next = new Set(current); result.saved ? next.add(job._id) : next.delete(job._id); return next; }); }
    catch (e) { toast({ title: e instanceof Error ? e.message : "Unable to save job" }); }
  };

  const submitApplication = async () => {
    if (!token || !selected) return;
    setApplying(true);
    try { await applyToJob(selected._id, { coverLetter }, token); toast({ title: "Application submitted" }); setSelected(null); setCoverLetter(""); }
    catch (e) { toast({ title: e instanceof Error ? e.message : "Unable to submit application" }); }
    finally { setApplying(false); }
  };

  const JobCard = ({ job }: { job: Job }) => <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-md"><CardHeader><div className="flex items-start justify-between gap-3"><div><CardTitle className="text-lg">{job.title}</CardTitle><p className="mt-1 text-sm text-gray-500">{job.company || job.recruiter?.company || job.recruiter?.name || "Company"}</p></div><Button variant="ghost" size="icon" onClick={() => void toggleSave(job)} aria-label={saved.has(job._id) ? "Unsave job" : "Save job"}><Bookmark className={saved.has(job._id) ? "fill-current" : ""} /></Button></div></CardHeader><CardContent><div className="flex flex-wrap gap-2 text-sm text-gray-600"><span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{job.remote ? "Remote" : job.location || "Location flexible"}</span><Badge variant="secondary">{job.type || "full-time"}</Badge>{job.salaryMin != null && <Badge variant="outline">{money(job.salaryMin)}{job.salaryMax != null ? ` – ${money(job.salaryMax)}` : "+"}</Badge>}</div><p className="mt-4 line-clamp-3 text-sm text-gray-600">{job.description}</p><div className="mt-4 flex flex-wrap gap-1.5">{(job.skills || []).slice(0, 5).map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)}</div><Button className="mt-5 w-full" onClick={() => setSelected(job)}>View & apply</Button></CardContent></Card>;

  if (authLoading) return <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">Loading jobs...</div>;

  return <main className="min-h-screen bg-gray-50"><nav className="border-b bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4"><Link href="/dashboard" className="flex items-center gap-2 font-bold"><BriefcaseBusiness className="h-5 w-5" />DevHeaven Jobs</Link><div className="flex gap-2"><Link href="/applications"><Button variant="outline">My applications</Button></Link>{token && <Link href="/recruiter-dashboard"><Button variant="outline">Recruiter</Button></Link>}</div></div></nav><div className="mx-auto max-w-7xl px-4 py-8"><div className="mb-8"><h1 className="text-3xl font-bold tracking-tight">Find your next opportunity</h1><p className="mt-2 text-gray-500">Discover developer roles, internships and freelance work.</p></div><Card className="mb-8"><CardContent className="grid gap-3 p-4 md:grid-cols-[1fr_1fr_auto_auto]"><div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><Input className="pl-9" placeholder="Role, skill or company" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && void load()} /></div><Input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} onKeyDown={e => e.key === "Enter" && void load()} /><Button variant={remote ? "default" : "outline"} onClick={() => setRemote(v => !v)}>Remote</Button><Button onClick={() => void load()}>Search</Button></Card><>{visibleRecommendations.length > 0 && <section className="mb-10"><div className="mb-4 flex items-center gap-2"><Sparkles className="h-5 w-5" /><h2 className="text-xl font-semibold">Recommended for you</h2></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{visibleRecommendations.map(job => <JobCard key={job._id} job={job} />)}</div></section>}<section><h2 className="mb-4 text-xl font-semibold">Open positions</h2>{error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}{loading ? <div className="py-16 text-center text-sm text-gray-500">Searching opportunities...</div> : jobs.length ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{jobs.map(job => <JobCard key={job._id} job={job} />)}</div> : <Card><CardContent className="py-16 text-center text-gray-500">No matching jobs yet. Try a broader search.</CardContent></Card>}</section></></div><Dialog open={!!selected} onOpenChange={open => !open && setSelected(null)}><DialogContent className="max-w-2xl"><DialogHeader><DialogTitle>{selected?.title}</DialogTitle></DialogHeader><div className="space-y-4"><div className="flex flex-wrap gap-2"><Badge>{selected?.company || selected?.recruiter?.company || "Company"}</Badge>{selected?.remote && <Badge variant="secondary">Remote</Badge>}{selected?.type && <Badge variant="outline">{selected.type}</Badge>}</div><p className="whitespace-pre-wrap text-sm text-gray-700">{selected?.description}</p><div className="rounded-lg border p-4"><p className="mb-2 text-sm font-medium">Cover letter <span className="font-normal text-gray-500">(optional)</span></p><Textarea rows={7} value={coverLetter} onChange={e => setCoverLetter(e.target.value)} placeholder="Tell the recruiter why you are a strong fit..." /><Button className="mt-3 w-full" onClick={() => void submitApplication()} disabled={applying || !token}>{applying ? "Submitting..." : token ? "Submit application" : "Sign in to apply"}</Button></div></div></DialogContent></Dialog></main>;
}
