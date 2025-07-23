import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code2, Star, GitFork, Eye, ExternalLink, Github, Search, Filter, Plus } from "lucide-react"
import Link from "next/link"

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "DevChat - Real-time Developer Chat",
      description:
        "A real-time chat application built specifically for developers with code syntax highlighting, file sharing, and integration with popular dev tools.",
      author: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      stars: 234,
      forks: 45,
      views: 1200,
      liveDemo: "https://devchat-demo.com",
      github: "https://github.com/sarahchen/devchat",
    },
    {
      id: 2,
      title: "CodeSnippet Manager",
      description:
        "A powerful code snippet manager with tagging, search, and sharing capabilities. Perfect for developers who want to organize their reusable code.",
      author: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Vue.js", "Express", "PostgreSQL", "Elasticsearch"],
      stars: 189,
      forks: 32,
      views: 890,
      liveDemo: "https://codesnippet-manager.com",
      github: "https://github.com/alexcodes/snippet-manager",
    },
    {
      id: 3,
      title: "API Documentation Generator",
      description:
        "Automatically generate beautiful, interactive API documentation from your OpenAPI specifications with customizable themes and examples.",
      author: "Maya Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["TypeScript", "Next.js", "Tailwind", "OpenAPI"],
      stars: 456,
      forks: 78,
      views: 2100,
      liveDemo: "https://api-docs-gen.com",
      github: "https://github.com/mayacodes/api-docs-generator",
    },
    {
      id: 4,
      title: "DevMetrics Dashboard",
      description:
        "Track your development productivity with this comprehensive dashboard that integrates with GitHub, Jira, and other dev tools.",
      author: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Python", "Django", "React", "D3.js"],
      stars: 312,
      forks: 56,
      views: 1450,
      liveDemo: "https://devmetrics-dashboard.com",
      github: "https://github.com/davidkim/devmetrics",
    },
    {
      id: 5,
      title: "Microservice Template Generator",
      description:
        "Generate production-ready microservice templates with Docker, Kubernetes configs, CI/CD pipelines, and monitoring setup.",
      author: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Go", "Docker", "Kubernetes", "Terraform"],
      stars: 567,
      forks: 89,
      views: 2800,
      liveDemo: "https://microservice-gen.com",
      github: "https://github.com/emmawilson/microservice-template",
    },
    {
      id: 6,
      title: "Code Review Assistant",
      description:
        "AI-powered code review assistant that provides intelligent suggestions, detects potential bugs, and ensures code quality standards.",
      author: "James Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Python", "Machine Learning", "FastAPI", "Redis"],
      stars: 423,
      forks: 67,
      views: 1890,
      liveDemo: "https://code-review-ai.com",
      github: "https://github.com/jamesthompson/code-review-ai",
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
                <Link href="/dashboard" className="text-gray-600 hover:text-purple-600">
                  Feed
                </Link>
                <Link href="/projects" className="text-purple-600 font-medium">
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
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Submit Project
              </Button>
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Showcase</h1>
          <p className="text-gray-600 mb-6">Discover amazing projects built by the DevHeaven community</p>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search projects..." className="pl-10" />
            </div>
            <Button variant="outline" className="flex items-center bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Category Tabs */}
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="web">Web Apps</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
              <TabsTrigger value="tools">Dev Tools</TabsTrigger>
              <TabsTrigger value="ai">AI/ML</TabsTrigger>
              <TabsTrigger value="opensource">Open Source</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title || "Project image"}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 line-clamp-1">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2 mb-3">{project.description}</CardDescription>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center space-x-2 mb-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={project.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {project.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">{project.author}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>{project.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GitFork className="h-4 w-4" />
                    <span>{project.forks}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{project.views}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button size="sm" variant="outline">
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Projects
          </Button>
        </div>
      </div>
    </div>
  )
}
