"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { Bell, Code2, Compass, Eye, FolderKanban, Heart, LogOut, MessageCircle, Plus, RefreshCw, Search, Sparkles, Users, BriefcaseBusiness, ArrowUpRight } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { assetUrl, createPost, fetchConnections, fetchMe, fetchNotifications, fetchPosts, fetchProjects, getUnreadCount, likePost } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

type Post = { _id: string; title?: string; content?: string; body?: string; author?: any; user?: any; likes?: any[]; comments?: any[]; createdAt?: string }

export default function DashboardPage() {
  const { user, token, logout, isLoading: authLoading } = useAuth()
  const { toast } = useToast()
  const [posts, setPosts] = useState<Post[]>([])
  const [query, setQuery] = useState("")
  const [showComposer, setShowComposer] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", content: "" })
  const [connections, setConnections] = useState(0)
  const [projects, setProjects] = useState(0)
  const [views, setViews] = useState(0)
  const [unread, setUnread] = useState(0)
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const load = useCallback(async () => {
    if (!token) return
    setLoading(true); setError("")
    const [postResult, connectionResult, projectResult, meResult, notificationResult] = await Promise.allSettled([
      fetchPosts(), fetchConnections(token), fetchProjects(), fetchMe(token), fetchNotifications(token)
    ])
    if (postResult.status === "fulfilled") setPosts(Array.isArray(postResult.value) ? postResult.value : [])
    else setError(postResult.reason instanceof Error ? postResult.reason.message : "Unable to load your feed.")
    if (connectionResult.status === "fulfilled") { const v: any = connectionResult.value; setConnections((v?.connections || v || []).length) }
    if (projectResult.status === "fulfilled") { const v: any = projectResult.value; setProjects((v?.projects || v || []).length) }
    if (meResult.status === "fulfilled") { const v: any = meResult.value; setViews(Number(v?.user?.profileViews || v?.profileViews || 0)) }
    if (notificationResult.status === "fulfilled") { const v: any = notificationResult.value; setNotifications(Array.isArray(v) ? v : v?.notifications || []) }
    try { setUnread(await getUnreadCount(token)) } catch { setUnread(0) }
    setLoading(false)
  }, [token])

  useEffect(() => { if (!authLoading && token) void load(); else if (!authLoading) setLoading(false) }, [authLoading, token, load])

  const publish = async () => {
    if (!token || !newPost.title.trim() || !newPost.content.trim()) return
    try {
      await createPost({ title: newPost.title.trim(), content: newPost.content.trim() }, token)
      setNewPost({ title: "", content: "" }); setShowComposer(false); await load(); toast({ title: "Post published" })
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to publish post.") }
  }

  const like = async (id: string) => {
    if (!token) return
    try {
      const result: any = await likePost(id, token)
      setPosts(current => current.map(p => String(p._id) === String(id) ? { ...p, ...result, likes: result?.likes ?? p.likes } : p))
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to like post.") }
  }

  const filtered = posts.filter(post => `${post.title || ""} ${post.content || post.body || ""} ${post.author?.username || post.user?.username || ""}`.toLowerCase().includes(query.toLowerCase()))
  const initials = `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase() || "D"

  if (authLoading || loading) return <div className="min-h-screen bg-slate-950 grid place-items-center text-slate-300"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-600 shadow-lg shadow-cyan-500/20"><Code2 className="h-5 w-5 text-white" /></span><RefreshCw className="h-4 w-4 animate-spin" />Loading DevHeaven...</div></div>
  if (!token) return <div className="min-h-screen bg-slate-950 grid place-items-center p-6"><div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-white shadow-2xl backdrop-blur"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-600"><Code2 /></div><h1 className="mt-5 text-2xl font-bold">Welcome to DevHeaven</h1><p className="mt-2 text-slate-400">Sign in to access your developer workspace.</p><Link href="/login"><Button className="mt-6 w-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:opacity-90">Sign in</Button></Link></div></div>

  return <div className="min-h-screen bg-slate-950 text-slate-100">
    <div className="pointer-events-none fixed inset-0 overflow-hidden"><div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" /><div className="absolute right-0 top-0 h-[32rem] w-[32rem] rounded-full bg-violet-600/10 blur-3xl" /></div>
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-4 py-3">
        <Link href="/dashboard" className="flex shrink-0 items-center gap-2.5 text-xl font-extrabold tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 shadow-lg shadow-violet-600/20"><Code2 className="h-5 w-5 text-white" /></span><span>Dev<span className="text-cyan-400">Heaven</span></span></Link>
        <div className="hidden flex-1 items-center gap-1 md:flex"><Link href="/dashboard" className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white">Home</Link><Link href="/network" className="rounded-xl px-4 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white">Network</Link><Link href="/projects" className="rounded-xl px-4 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white">Projects</Link><Link href="/jobs" className="rounded-xl px-4 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white">Jobs</Link></div>
        <div className="ml-auto flex items-center gap-2"><Link href="/messages"><Button variant="ghost" size="icon" className="relative text-slate-300 hover:bg-white/10 hover:text-white"><MessageCircle className="h-5 w-5" />{unread > 0 && <Badge className="absolute -right-1 -top-1 h-5 min-w-5 border-2 border-slate-950 bg-cyan-500 px-1 text-[10px] text-slate-950">{unread}</Badge>}</Button></Link><Button variant="ghost" size="icon" className="text-slate-300 hover:bg-white/10 hover:text-white"><Bell className="h-5 w-5" /></Button><Link href={`/profile/${user?.id}`}><Avatar className="h-9 w-9 border border-cyan-400/50"><AvatarImage src={assetUrl(user?.profileImage)} /><AvatarFallback className="bg-gradient-to-br from-cyan-500 to-violet-600 text-white">{initials}</AvatarFallback></Avatar></Link><Button variant="ghost" size="icon" onClick={logout} className="text-slate-400 hover:bg-white/10 hover:text-white"><LogOut className="h-4 w-4" /></Button></div>
      </div>
    </nav>

    <main className="relative mx-auto max-w-7xl px-4 py-7">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/15 via-slate-900 to-violet-600/15 p-6 shadow-2xl shadow-black/20 md:p-8">
        <div className="absolute right-[-5rem] top-[-7rem] h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300"><Sparkles className="h-3.5 w-3.5" /> Developer workspace</div><h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Good to see you, {user?.firstName || "Developer"}.</h1><p className="mt-2 max-w-2xl text-slate-400">Build your reputation, discover opportunities and connect with people who are building the future.</p></div><Button onClick={() => setShowComposer(true)} className="shrink-0 bg-gradient-to-r from-cyan-500 to-violet-600 font-semibold text-white shadow-lg shadow-violet-600/20 hover:opacity-90"><Plus className="mr-2 h-4 w-4" />Create a post</Button></div>
      </section>

      <section className="mt-5 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/5 p-5"><div className="flex items-center justify-between"><span className="text-sm text-slate-400">Connections</span><span className="rounded-xl bg-cyan-400/10 p-2 text-cyan-300"><Users className="h-4 w-4" /></span></div><p className="mt-3 text-3xl font-bold">{connections}</p><p className="mt-1 text-xs text-cyan-300">Your professional network</p></div><div className="rounded-2xl border border-violet-400/15 bg-violet-400/5 p-5"><div className="flex items-center justify-between"><span className="text-sm text-slate-400">Projects</span><span className="rounded-xl bg-violet-400/10 p-2 text-violet-300"><FolderKanban className="h-4 w-4" /></span></div><p className="mt-3 text-3xl font-bold">{projects}</p><p className="mt-1 text-xs text-violet-300">Things you're building</p></div><div className="rounded-2xl border border-amber-400/15 bg-amber-400/5 p-5"><div className="flex items-center justify-between"><span className="text-sm text-slate-400">Profile views</span><span className="rounded-xl bg-amber-400/10 p-2 text-amber-300"><Eye className="h-4 w-4" /></span></div><p className="mt-3 text-3xl font-bold">{views}</p><p className="mt-1 text-xs text-amber-300">People discovering you</p></div></section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)_270px]">
        <aside className="hidden lg:block"><div className="sticky top-24 space-y-4"><div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><Link href={`/profile/${user?.id}`} className="flex items-center gap-3 rounded-xl p-2 hover:bg-white/5"><Avatar className="h-11 w-11 border border-white/10"><AvatarImage src={assetUrl(user?.profileImage)} /><AvatarFallback className="bg-gradient-to-br from-cyan-500 to-violet-600 text-white">{initials}</AvatarFallback></Avatar><div className="min-w-0"><p className="truncate font-semibold">{user?.firstName} {user?.lastName}</p><p className="truncate text-xs text-slate-500">@{user?.username}</p></div></Link><div className="mt-4 grid gap-1"><Link href="/network" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white"><Compass className="h-4 w-4 text-cyan-400" />Explore network</Link><Link href="/projects" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white"><FolderKanban className="h-4 w-4 text-violet-400" />My projects</Link><Link href="/jobs" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white"><BriefcaseBusiness className="h-4 w-4 text-amber-400" />Find opportunities</Link></div></div><div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-4"><Sparkles className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-sm font-semibold">Make your profile stand out</p><p className="mt-1 text-xs leading-5 text-slate-500">Add projects, skills and a strong introduction to help the right people find you.</p><Link href={`/profile/${user?.id}`} className="mt-3 inline-flex items-center text-xs font-semibold text-cyan-300">Edit profile <ArrowUpRight className="ml-1 h-3 w-3" /></Link></div></div></aside>

        <section className="min-w-0 space-y-5">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3"><Search className="ml-2 h-4 w-4 text-slate-500" /><Input className="border-0 bg-transparent text-white placeholder:text-slate-500 focus-visible:ring-0" placeholder="Search posts, developers or ideas..." value={query} onChange={e => setQuery(e.target.value)} /></div>
          {showComposer && <div className="rounded-2xl border border-cyan-400/20 bg-white/[0.05] p-5 shadow-xl"><div className="mb-4 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600"><Sparkles className="h-5 w-5" /></span><div><h2 className="font-semibold">Share with DevHeaven</h2><p className="text-xs text-slate-500">What are you building, learning or looking for?</p></div></div><Input className="border-white/10 bg-slate-950/60 text-white placeholder:text-slate-600" placeholder="Post title" value={newPost.title} onChange={e => setNewPost(v => ({ ...v, title: e.target.value }))} /><Textarea className="mt-3 min-h-28 border-white/10 bg-slate-950/60 text-white placeholder:text-slate-600" placeholder="Tell the community about it..." value={newPost.content} onChange={e => setNewPost(v => ({ ...v, content: e.target.value }))} /><div className="mt-3 flex justify-end gap-2"><Button variant="ghost" className="text-slate-400 hover:bg-white/10 hover:text-white" onClick={() => setShowComposer(false)}>Cancel</Button><Button onClick={() => void publish()} disabled={!newPost.title.trim() || !newPost.content.trim()} className="bg-gradient-to-r from-cyan-500 to-violet-600 text-white">Publish</Button></div></div>}
          {error && <div className="rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-300">{error}</div>}
          {filtered.length ? filtered.map(post => <article key={post._id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition hover:border-cyan-400/20 hover:bg-white/[0.055]"><div className="p-5"><div className="flex items-center gap-3"><Avatar className="h-10 w-10 border border-white/10"><AvatarImage src={assetUrl(post.author?.profileImage || post.user?.profileImage)} /><AvatarFallback className="bg-slate-800 text-cyan-300">D</AvatarFallback></Avatar><div><p className="font-semibold">{post.author?.firstName || post.user?.firstName || post.author?.username || post.user?.username || "Developer"} {post.author?.lastName || post.user?.lastName || ""}</p><p className="text-xs text-slate-500">{post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}</p></div></div><h2 className="mt-4 text-lg font-bold text-white">{post.title}</h2><p className="mt-2 whitespace-pre-wrap leading-7 text-slate-300">{post.content || post.body}</p><div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-3"><Button variant="ghost" size="sm" onClick={() => void like(post._id)} className="text-slate-400 hover:bg-pink-500/10 hover:text-pink-300"><Heart className="mr-1.5 h-4 w-4" />{post.likes?.length || 0}</Button><span className="inline-flex items-center px-3 text-sm text-slate-500"><MessageCircle className="mr-1.5 h-4 w-4" />{post.comments?.length || 0}</span></div></div></article>) : <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] py-16 text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500/15 to-violet-500/15"><Code2 className="h-6 w-6 text-cyan-300" /></span><h3 className="mt-4 text-lg font-semibold">Your developer feed is ready</h3><p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">Share your first project, idea or opportunity and start building your presence.</p><Button onClick={() => setShowComposer(true)} className="mt-5 bg-gradient-to-r from-cyan-500 to-violet-600 text-white"><Plus className="mr-2 h-4 w-4" />Create your first post</Button></div>}
        </section>

        <aside className="hidden lg:block"><div className="sticky top-24 space-y-4"><div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><div className="flex items-center justify-between"><h2 className="font-semibold">Notifications</h2><Bell className="h-4 w-4 text-cyan-300" /></div><div className="mt-4 space-y-3">{notifications.slice(0, 5).map(n => <div key={n._id || n.id} className="rounded-xl bg-white/[0.04] p-3 text-xs leading-5 text-slate-400">{n.message || n.text || "New activity on your account"}</div>)}{!notifications.length && <p className="text-sm text-slate-500">You're all caught up.</p>}</div></div><div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><div className="flex items-center gap-2"><BriefcaseBusiness className="h-4 w-4 text-amber-300" /><h2 className="font-semibold">Next move</h2></div><p className="mt-3 text-sm leading-6 text-slate-400">Explore jobs and opportunities that match your skills.</p><Link href="/jobs" className="mt-4 flex items-center justify-between rounded-xl bg-gradient-to-r from-amber-400/10 to-orange-500/10 px-3 py-2.5 text-sm font-medium text-amber-200 hover:from-amber-400/15">Explore jobs <ArrowUpRight className="h-4 w-4" /></Link></div></div></aside>
      </div>
    </main>
  </div>
}
