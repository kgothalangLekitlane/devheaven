import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code2, BookOpen, FileText, ExternalLink, Search, Filter, Star, Clock, Users } from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  const tutorials = [
    {
      id: 1,
      title: "Complete Guide to React Hooks",
      description:
        "Master React Hooks with practical examples and best practices. Learn useState, useEffect, useContext, and custom hooks.",
      author: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "Tutorial",
      duration: "45 min read",
      difficulty: "Intermediate",
      tags: ["React", "JavaScript", "Hooks"],
      rating: 4.8,
      views: 12500,
      bookmarks: 890,
    },
    {
      id: 2,
      title: "Building Scalable APIs with Node.js",
      description:
        "Learn how to build production-ready APIs with Node.js, Express, and MongoDB. Includes authentication, validation, and testing.",
      author: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "Course",
      duration: "3.5 hours",
      difficulty: "Advanced",
      tags: ["Node.js", "Express", "MongoDB", "API"],
      rating: 4.9,
      views: 8900,
      bookmarks: 654,
    },
    {
      id: 3,
      title: "CSS Grid Layout Masterclass",
      description:
        "Everything you need to know about CSS Grid. From basics to advanced techniques with real-world examples.",
      author: "Maya Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "Video",
      duration: "2 hours",
      difficulty: "Beginner",
      tags: ["CSS", "Grid", "Layout", "Frontend"],
      rating: 4.7,
      views: 15600,
      bookmarks: 1200,
    },
  ]

  const tools = [
    {
      id: 1,
      name: "VS Code Extensions Pack",
      description:
        "Essential VS Code extensions for web developers. Includes linting, formatting, and productivity tools.",
      category: "Editor",
      tags: ["VS Code", "Extensions", "Productivity"],
      rating: 4.9,
      downloads: "50K+",
      free: true,
    },
    {
      id: 2,
      name: "API Testing Toolkit",
      description:
        "Comprehensive toolkit for API testing with Postman collections, automated tests, and documentation templates.",
      category: "Testing",
      tags: ["API", "Testing", "Postman"],
      rating: 4.6,
      downloads: "25K+",
      free: true,
    },
    {
      id: 3,
      name: "React Component Library",
      description:
        "Production-ready React components with TypeScript support, Storybook documentation, and theme customization.",
      category: "UI Library",
      tags: ["React", "TypeScript", "Components"],
      rating: 4.8,
      downloads: "100K+",
      free: false,
    },
  ]

  const articles = [
    {
      id: 1,
      title: "The Future of Web Development in 2024",
      author: "David Kim",
      readTime: "8 min read",
      tags: ["Web Development", "Trends", "2024"],
      excerpt: "Exploring the latest trends and technologies shaping the future of web development...",
      publishedAt: "2 days ago",
    },
    {
      id: 2,
      title: "Microservices vs Monoliths: Making the Right Choice",
      author: "Emma Wilson",
      readTime: "12 min read",
      tags: ["Architecture", "Microservices", "Backend"],
      excerpt: "A comprehensive comparison of microservices and monolithic architectures...",
      publishedAt: "1 week ago",
    },
    {
      id: 3,
      title: "Optimizing React Performance: Advanced Techniques",
      author: "James Thompson",
      readTime: "15 min read",
      tags: ["React", "Performance", "Optimization"],
      excerpt: "Deep dive into advanced React performance optimization techniques...",
      publishedAt: "3 days ago",
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
                <Link href="/projects" className="text-gray-600 hover:text-purple-600">
                  Projects
                </Link>
                <Link href="/resources" className="text-purple-600 font-medium">
                  Resources
                </Link>
                <Link href="/recruiters" className="text-gray-600 hover:text-purple-600">
                  Jobs
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Developer Resources</h1>
          <p className="text-gray-600 mb-6">Curated tutorials, tools, and articles to help you grow as a developer</p>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search resources..." className="pl-10" />
            </div>
            <Button variant="outline" className="flex items-center bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Resource Tabs */}
        <Tabs defaultValue="tutorials" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tutorials">Tutorials & Courses</TabsTrigger>
            <TabsTrigger value="tools">Tools & Libraries</TabsTrigger>
            <TabsTrigger value="articles">Articles & Blogs</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          {/* Tutorials & Courses */}
          <TabsContent value="tutorials" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {tutorials.map((tutorial) => (
                <Card key={tutorial.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge
                        variant={
                          tutorial.type === "Course" ? "default" : tutorial.type === "Video" ? "secondary" : "outline"
                        }
                      >
                        {tutorial.type}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          tutorial.difficulty === "Beginner"
                            ? "text-green-600 border-green-200"
                            : tutorial.difficulty === "Intermediate"
                              ? "text-yellow-600 border-yellow-200"
                              : "text-red-600 border-red-200"
                        }
                      >
                        {tutorial.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{tutorial.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{tutorial.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Author */}
                    <div className="flex items-center space-x-2 mb-4">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={tutorial.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {tutorial.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">{tutorial.author}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {tutorial.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{tutorial.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{tutorial.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{tutorial.views.toLocaleString()}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Start Learning
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tools & Libraries */}
          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline">{tool.category}</Badge>
                      {tool.free ? (
                        <Badge variant="secondary" className="text-green-600 bg-green-50">
                          Free
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-blue-600 bg-blue-50">
                          Premium
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {tool.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{tool.rating}</span>
                      </div>
                      <span>{tool.downloads} downloads</span>
                    </div>

                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Tool
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Articles & Blogs */}
          <TabsContent value="articles" className="space-y-6">
            <div className="space-y-4">
              {articles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                        <p className="text-gray-600 mb-4">{article.excerpt}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {article.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Meta */}
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>By {article.author}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                          <span>•</span>
                          <span>{article.publishedAt}</span>
                        </div>
                      </div>
                      <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Read
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Community */}
          <TabsContent value="community" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-purple-600" />
                    Study Groups
                  </CardTitle>
                  <CardDescription>Join study groups and learn together with other developers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">React Advanced Patterns</h4>
                        <p className="text-sm text-gray-600">42 members • Next session: Tomorrow 7PM</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Join
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">System Design Study Group</h4>
                        <p className="text-sm text-gray-600">28 members • Next session: Friday 6PM</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Join
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code2 className="h-5 w-5 mr-2 text-purple-600" />
                    Code Challenges
                  </CardTitle>
                  <CardDescription>Participate in weekly coding challenges and improve your skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">Weekly Algorithm Challenge</h4>
                      <p className="text-sm text-gray-600 mb-2">Solve dynamic programming problems</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">156 participants</Badge>
                        <Button size="sm">Participate</Button>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">Frontend Component Challenge</h4>
                      <p className="text-sm text-gray-600 mb-2">Build a responsive dashboard</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">89 participants</Badge>
                        <Button size="sm">Participate</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
