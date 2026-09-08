"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Code2, MessageCircle, Heart, MessageSquare, Share2, Trash2, Plus, Search, RefreshCw, Users, FolderKanban, Eye, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { assetUrl, createPost, deletePost, fetchConnections, fetchMe, fetchNotifications, fetchPosts, fetchProjects, getUnreadCount, likePost, markNotificationRead, fetchComments, addComment } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

type DashboardPost = { _id: string; title?: string; content?: string; body?: string; author?: any; user?: any; likes?: any[]; comments?: any[]; createdAt?: string; updatedAt?: string; [key: string]: any };
type DashboardComment = { _id: string; content?: string; text?: string; author?: any; user?: any; createdAt?: string; [key: string]: any };

export default function DashboardPage() {
  const { user, token, logout, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<DashboardPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<DashboardPost | null>(null);
  const [comments, setComments] = useState<DashboardComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [showComposer, setShowComposer] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [connectionCount, setConnectionCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [profileViews, setProfileViews] = useState(0);
  const [query, setQuery] = useState("");
  const [feedMode, setFeedMode] = useState<"latest" | "popular">("latest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const loadPosts = useCallback(async () => {
    if (!token) return;
    try { const data = await fetchPosts(); const nextPosts = Array.isArray(data) ? data : data?.posts || []; setPosts(nextPosts); }
    catch (e) { setError(e instanceof Error ? e.message : "Unable to load posts."); }
  }, [token]);

  useEffect(() => {
    if (authLoading) return;
    if (!token) { setLoading(false); return; }
    let active = true;
    (async () => {
      setLoading(true);
      try {
        const [postResult, notificationResult, connectionResult, projectResult, meResult] = await Promise.allSettled([fetchPosts(), fetchNotifications(token), fetchConnections(token), fetchProjects(), fetchMe(token)]);
        if (!active) return;
        if (postResult.status === "fulfilled") { const value: any = postResult.value; setPosts(Array.isArray(value) ? value : value?.posts || []); }
        if (notificationResult.status === "fulfilled") { const value: any = notificationResult.value; setNotifications(Array.isArray(value) ? value : value?.notifications || []); }
        if (connectionResult.status === "fulfilled") { const value: any = connectionResult.value; setConnectionCount((value?.connections || value || []).length); }
        if (projectResult.status === "fulfilled") { const value: any = projectResult.value; setProjectCount((value?.projects || value || []).length); }
        if (meResult.status === "fulfilled") { const value: any = meResult.value; setProfileViews(Number(value?.user?.profileViews || value?.profileViews || 0)); }
        try { setUnreadMessages(await getUnreadCount(token)); } catch { /* optional */ }
      } catch (e) { if (active) setError(e instanceof Error ? e.message : "Unable to load dashboard."); }
      finally { if (active) setLoading(false); }
    })();
    return () => { active = false; };
  }, [token, authLoading]);

  const createNewPost = async () => {
    if (!token || !newPost.title.trim() || !newPost.content.trim()) return;
    setLoading(true);
    try { await createPost(newPost, token); setNewPost({ title: "", content: "" }); setShowComposer(false); await loadPosts(); toast({ title: "Post published" }); }
    catch (e) { setError(e instanceof Error ? e.message : "Unable to create post."); }
    finally { setLoading(false); }
  };

  const updateSelectedPost = (id: string, updater: (post: DashboardPost) => DashboardPost) => {
    setPosts(current => current.map(post => String(post._id) === String(id) ? updater(post) : post));
    setSelectedPost((current: DashboardPost | null) => current && String(current._id) === String(id) ? updater(current) : current);
  };

  const handleLike = async (id: string) => {