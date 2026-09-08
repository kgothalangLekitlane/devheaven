"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { Code2, Heart, MessageCircle, Plus, RefreshCw, Search, Users, FolderKanban, Eye, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { assetUrl, createPost, fetchConnections, fetchMe, fetchNotifications, fetchPosts, fetchProjects, getUnreadCount, likePost } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    try { await createPost({ title: newPost.title.trim(), content: newPost.content.trim() }, token); setNewPost({ title: "", content: "" }); setShowComposer(false); await load(); toast({ title: "Post published" }) }
    catch (e) { setError(e instanceof Error ? e.message : "Unable to publish post.") }
  }

  const like = async (id: string) => {
    if (!token) return
    try { const result: any = await likePost(id, token); setPosts(current => current.map(p => String(p._id) === String(id) ? { ...p, ...result, likes: result?.likes ?? p.likes } : p)) }
    catch (e) { setError(e instanceof Error ? e.message : "Unable to like post.") }
  }

  const filtered = posts.filter(post => `${post.title || ""} ${post.content || post.body || ""} ${post.author?.username || post.user?.username || ""}`.toLowerCase().includes(query.toLowerCase()))
  const initials = `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase() || "D"

  if (authLoading || loading) return <div className="min-h-screen grid place-items-center text-gray-500"><RefreshCw className="mr-2 h-4 w-4 animate-spin" />Loading DevHeaven...</div>
  if (!token) return <div className="min-h-screen grid place-items-center"><Card><CardContent className="p-8 text-center"><h1 className="text-xl font-semibold">Please sign in</h1><Link href="/login"><Button className="mt-4">Sign in</Button></Link></CardContent></Card></div>

  return <div className="min-h-screen bg-gray-50 pb-10">
    <nav className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
      <Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold"><Code2 className="text-purple-600" />DevHeaven</Link>
      <div className="flex items-center gap-2"><Link href="/network"><Button variant="ghost"><Users className="mr-2 h-4 w-4" />Network</Button></Link><Link href="/messages"><Button variant="ghost"><MessageCircle className="mr-2 h-4 w-4" />Messages{unread > 0 && <Badge className="ml-2">{unread}</Badge>}</Button></Link><Link href={`/profile/${user?.id}`}><Avatar className="h-9 w-9"><AvatarImage src={assetUrl(user?.profileImage)} /><AvatarFallback>{initials}</AvatarFallback></Avatar></Link><Button variant="ghost" size="icon" onClick={logout}><LogOut className="h-4 w-4" /></Button></div>
    </div></nav>
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[220px_minmax(0,1fr)_260px]">
      <aside className="hidden lg:block"><Card><CardContent className="p-4"><Link href={`/profile/${user?.id}`} className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50"><Avatar><AvatarImage src={assetUrl(user?.profileImage)} /><AvatarFallback>{initials}</AvatarFallback></Avatar><div className="min-w-0"><p className="truncate font-medium">{user?.firstName} {user?.lastName}</p><p className="truncate text-xs text-gray-500">@{user?.username}</p></div></Link><div className="mt-3 grid gap-1"><Link href="/projects"><Button variant="ghost" className="w-full justify-start"><FolderKanban className="mr-2 h-4 w-4" />Projects</Button></Link><Link href="/network"><Button variant="ghost" className="w-full justify-start"><Users className="mr-2 h-4 w-4" />My network</Button></Link></div></CardContent></Card></aside>
      <section className="space-y-5">
        <Card><CardContent className="p-4"><div className="flex items-center gap-3"><Avatar><AvatarImage src={assetUrl(user?.profileImage)} /><AvatarFallback>{initials}</AvatarFallback></Avatar><Button variant="outline" className="flex-1 justify-start text-gray-500" onClick={() => setShowComposer(true)}>Share something with the community...</Button><Button onClick={() => setShowComposer(true)}><Plus className="mr-2 h-4 w-4" />Post</Button></div></CardContent></Card>
        {showComposer && <Card><CardHeader><CardTitle>Create a post</CardTitle></CardHeader><CardContent className="space-y-3"><Input placeholder="Title" value={newPost.title} onChange={e => setNewPost(v => ({ ...v, title: e.target.value }))} /><Textarea placeholder="What are you building, learning or looking for?" value={newPost.content} onChange={e => setNewPost(v => ({ ...v, content: e.target.value }))} /><div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setShowComposer(false)}>Cancel</Button><Button onClick={() => void publish()} disabled={!newPost.title.trim() || !newPost.content.trim()}>Publish</Button></div></CardContent></Card>}
        <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><Input className="pl-9" placeholder="Search your feed" value={query} onChange={e => setQuery(e.target.value)} /></div>
        {error && <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        {filtered.length ? filtered.map(post => <Card key={post._id}><CardHeader><div className="flex items-center gap-3"><Avatar><AvatarImage src={assetUrl(post.author?.profileImage || post.user?.profileImage)} /><AvatarFallback>D</AvatarFallback></Avatar><div><p className="font-medium">{post.author?.firstName || post.user?.firstName || post.author?.username || post.user?.username || "Developer"} {post.author?.lastName || post.user?.lastName || ""}</p><p className="text-xs text-gray-500">{post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}</p></div></div><CardTitle className="pt-2">{post.title}</CardTitle></CardHeader><CardContent><p className="whitespace-pre-wrap text-gray-700">{post.content || post.body}</p><div className="mt-4 flex gap-2 border-t pt-3"><Button variant="ghost" size="sm" onClick={() => void like(post._id)}><Heart className="mr-1 h-4 w-4" />{post.likes?.length || 0}</Button><span className="inline-flex items-center px-3 text-sm text-gray-500"><MessageCircle className="mr-1 h-4 w-4" />{post.comments?.length || 0}</span></div></CardContent></Card>) : <Card><CardContent className="py-14 text-center"><Code2 className="mx-auto h-10 w-10 text-gray-300" /><h3 className="mt-4 font-semibold">Your feed is ready</h3><p className="mt-1 text-sm text-gray-500">Share your first project, idea or opportunity.</p><Button className="mt-4" onClick={() => setShowComposer(true)}>Create a post</Button></CardContent></Card>}
      </section>
      <aside className="hidden space-y-4 lg:block"><Card><CardHeader><CardTitle className="text-base">Your activity</CardTitle></CardHeader><CardContent className="space-y-4 text-sm"><div className="flex justify-between"><span className="flex gap-2"><Users className="h-4 w-4" />Connections</span><strong>{connections}</strong></div><div className="flex justify-between"><span className="flex gap-2"><FolderKanban className="h-4 w-4" />Projects</span><strong>{projects}</strong></div><div className="flex justify-between"><span className="flex gap-2"><Eye className="h-4 w-4" />Profile views</span><strong>{views}</strong></div></CardContent></Card><Card><CardHeader><CardTitle className="text-base">Notifications</CardTitle></CardHeader><CardContent className="space-y-2">{notifications.slice(0, 5).map(n => <p key={n._id || n.id} className="text-sm text-gray-600">{n.message || n.text || "New activity on your account"}</p>)}{!notifications.length && <p className="text-sm text-gray-500">You're all caught up.</p>}</CardContent></Card></aside>
    </main>
  </div>
}
