"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Share2, Code2, Briefcase, BookOpen, Search, Plus, Bell } from "lucide-react"
import Link from "next/link"
import { fetchPosts, createPost, likePost } from "@/lib/api"
import { useAuth } from "@/contexts/AuthContext"

export default function Dashboard() {
  const { user, token, isLoading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
      return;
    }

    if (user) {
      loadPosts();
    }
  }, [user, isLoading, router]);

  const loadPosts = async () => {
    try {
      const data = await fetchPosts();
      setPosts(data);
      setError(""); // Clear any previous errors
    } catch (err) {
      setError("Backend connection issue. Showing demo data.");
      console.error(err);
      // Load demo data as fallback
      setPosts([
        {
          _id: "demo1",
          title: "Welcome to DevHeaven!",
          content: "This is a demo post. To see real posts, ensure the backend server is running on localhost:5000.",
          author: {
            _id: "demo",
            firstName: "Demo",
            lastName: "User",
            username: "demouser"
          },
          tags: ["welcome", "demo"],
          likes: [],
          comments: [],
          createdAt: new Date().toISOString()
        }
      ]);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newPost.title || !newPost.content) return;

    setLoading(true);
    try {
      await createPost(newPost, token);
      setNewPost({ title: "", content: "" });
      loadPosts(); // Reload posts
    } catch (err) {
      setError("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!token) return;
    try {
      await likePost(postId, token);
      loadPosts(); // Reload to update like counts
    } catch (err) {
      setError("Failed to like post");
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div>Loading...</div>
    </div>;
  }

  if (!user) {
    return null;
  }
  const posts = [
    {
      id: 1,
      author: "Sarah Chen",
      username: "@sarahdev",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "2h ago",
      content:
        "Just shipped a new React component library! 🚀 It includes 50+ customizable components with TypeScript support. Would love to get some feedback from the community!",
      tags: ["React", "TypeScript", "OpenSource"],
      likes: 42,
      comments: 8,
      shares: 12,
    },
    {
      id: 2,
      author: "Alex Rodriguez",
      username: "@alexcodes",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "4h ago",
      content:
        "Looking for a senior full-stack developer to join our startup! We're building the next generation of developer tools. Remote-friendly, competitive salary, and equity options available.",
      tags: ["Jobs", "FullStack", "Remote"],
      likes: 28,
      comments: 15,
      shares: 6,
    },
    {
      id: 3,
      author: "Maya Patel",
      username: "@mayacodes",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "6h ago",
      content:
        "Just finished a 30-day coding challenge! Built 30 different projects using various technologies. Here's what I learned about consistency and growth mindset...",
      tags: ["Learning", "Challenge", "Growth"],
      likes: 156,
      comments: 23,
      shares: 31,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <Code2 className="h-8 w-8 text-purple-600" />
                <span className="text-2xl font-bold text-gray-900">DevHeaven</span>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/dashboard" className="text-purple-600 font-medium">
                  Feed
                </Link>
                <Link href="/projects" className="text-gray-600 hover:text-purple-600">
                  Projects
                </Link>
                <Link href="/resources" className="text-gray-600 hover:text-purple-600">
                  Resources
                </Link>
                <Link href="/recruiters" className="text-gray-600 hover:text-purple-600">
                  Jobs
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search developers, projects..." className="pl-10 w-64" />
              </div>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Post
              </Button>
              <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-purple-600" />
              <Link href="/messages">
                <MessageCircle className="h-6 w-6 text-gray-600 cursor-pointer hover:text-purple-600" />
              </Link>
              <Link href="/profile">
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user?.profileImage || "/placeholder.svg?height=48&width=48"} />
                    <AvatarFallback>
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{user?.firstName} {user?.lastName}</h3>
                    <p className="text-sm text-gray-600">
                      {user?.location || "Developer"}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Connections</span>
                    <span className="font-medium">1,234</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Projects</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Profile Views</span>
                    <span className="font-medium">89</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trending Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">#React</span>
                    <Badge variant="secondary">2.1k posts</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">#TypeScript</span>
                    <Badge variant="secondary">1.8k posts</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">#NextJS</span>
                    <Badge variant="secondary">1.5k posts</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">#Python</span>
                    <Badge variant="secondary">1.2k posts</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Create Post */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <form onSubmit={handleCreatePost}>
                  <div className="flex space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.profileImage || "/placeholder.svg?height=40&width=40"} />
                      <AvatarFallback>
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Input
                        placeholder="Post title..."
                        value={newPost.title}
                        onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                        className="mb-3"
                        required
                      />
                      <Textarea
                        placeholder="Share your thoughts, projects, or ask questions..."
                        className="min-h-[100px] resize-none"
                        value={newPost.content}
                        onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                        required
                      />
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex space-x-2">
                          <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">
                            <Code2 className="h-3 w-3 mr-1" />
                            Code
                          </Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">
                            <Briefcase className="h-3 w-3 mr-1" />
                            Job
                          </Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">
                            <BookOpen className="h-3 w-3 mr-1" />
                            Resource
                          </Badge>
                        </div>
                        <Button
                          type="submit"
                          className="bg-purple-600 hover:bg-purple-700"
                          disabled={loading || !newPost.title || !newPost.content}
                        >
                          {loading ? "Posting..." : "Post"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
                {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center text-gray-500">
                    <p>No posts yet. Be the first to share something!</p>
                  </CardContent>
                </Card>
              ) : (
                posts.map((post: any) => (
                  <Card key={post._id}>
                    <CardContent className="pt-6">
                      <div className="flex space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={post.author?.profileImage || "/placeholder.svg"} />
                          <AvatarFallback>
                            {post.author?.firstName?.[0]}{post.author?.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold">
                              {post.author?.firstName} {post.author?.lastName}
                            </h4>
                            <span className="text-gray-500 text-sm">@{post.author?.username}</span>
                            <span className="text-gray-400 text-sm">•</span>
                            <span className="text-gray-500 text-sm">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="font-medium mb-2">{post.title}</h3>
                          <p className="text-gray-800 mb-3">{post.content}</p>
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.map((tag: string) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center space-x-6 text-gray-500">
                            <button
                              className="flex items-center space-x-2 hover:text-red-500 transition-colors"
                              onClick={() => handleLike(post._id)}
                            >
                              <Heart className="h-4 w-4" />
                              <span className="text-sm">{post.likes?.length || 0}</span>
                            </button>
                            <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                              <MessageCircle className="h-4 w-4" />
                              <span className="text-sm">{post.comments?.length || 0}</span>
                            </button>
                            <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
                              <Share2 className="h-4 w-4" />
                              <span className="text-sm">Share</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Suggested Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Emma Wilson", role: "Frontend Developer", mutual: 12 },
                    { name: "David Kim", role: "DevOps Engineer", mutual: 8 },
                    { name: "Lisa Zhang", role: "Product Manager", mutual: 15 },
                  ].map((person, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32&query=${person.name}`} />
                          <AvatarFallback>
                            {person.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{person.name}</p>
                          <p className="text-xs text-gray-500">{person.role}</p>
                          <p className="text-xs text-gray-400">{person.mutual} mutual connections</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Connect
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Job Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Senior React Developer", company: "TechCorp", location: "Remote" },
                    { title: "Full Stack Engineer", company: "StartupXYZ", location: "San Francisco" },
                    { title: "DevOps Specialist", company: "CloudTech", location: "New York" },
                  ].map((job, index) => (
                    <div key={index} className="border-l-4 border-purple-200 pl-4">
                      <h4 className="font-medium text-sm">{job.title}</h4>
                      <p className="text-sm text-gray-600">{job.company}</p>
                      <p className="text-xs text-gray-500">{job.location}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  View All Jobs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
