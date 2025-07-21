import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code2, MapPin, Calendar, Github, Linkedin, Twitter, Mail, Edit, Star, Eye, GitFork } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const userProjects = [
    {
      id: 1,
      title: "E-commerce Dashboard",
      description: "A comprehensive admin dashboard for e-commerce platforms built with React and Node.js",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["React", "Node.js", "MongoDB"],
      stars: 45,
      forks: 12,
      views: 890,
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Vue.js", "Express", "Socket.io"],
      stars: 32,
      forks: 8,
      views: 654,
    },
    {
      id: 3,
      title: "Weather Forecast Widget",
      description: "A beautiful weather widget with location-based forecasts",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["JavaScript", "CSS", "API"],
      stars: 28,
      forks: 15,
      views: 432,
    },
  ]

  const skills = [
    { name: "JavaScript", level: 95 },
    { name: "React", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Python", level: 75 },
    { name: "AWS", level: 70 },
    { name: "Docker", level: 65 },
    { name: "GraphQL", level: 60 },
  ]

  const experience = [
    {
      title: "Senior Full Stack Developer",
      company: "TechCorp",
      period: "2022 - Present",
      description:
        "Leading development of scalable web applications using React, Node.js, and AWS. Mentoring junior developers and architecting system solutions.",
    },
    {
      title: "Full Stack Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      description:
        "Built and maintained multiple web applications. Implemented CI/CD pipelines and improved application performance by 40%.",
    },
    {
      title: "Frontend Developer",
      company: "WebSolutions Inc",
      period: "2018 - 2020",
      description:
        "Developed responsive web interfaces and collaborated with design teams to create user-friendly applications.",
    },
  ]

  const achievements = [
    {
      title: "Top Contributor",
      description: "Ranked in top 5% of contributors this year",
      icon: "🏆",
      date: "2024",
    },
    {
      title: "Open Source Hero",
      description: "Contributed to 15+ open source projects",
      icon: "🌟",
      date: "2023",
    },
    {
      title: "Community Leader",
      description: "Helped 500+ developers in the community",
      icon: "👥",
      date: "2023",
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
                <Link href="/resources" className="text-gray-600 hover:text-purple-600">
                  Resources
                </Link>
                <Link href="/recruiters" className="text-gray-600 hover:text-purple-600">
                  Jobs
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardContent className="pt-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mb-2">John Doe</h2>
                <p className="text-gray-600 mb-4">Senior Full Stack Developer</p>

                <div className="flex items-center justify-center space-x-1 text-gray-500 mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>San Francisco, CA</span>
                </div>

                <div className="flex items-center justify-center space-x-1 text-gray-500 mb-6">
                  <Calendar className="h-4 w-4" />
                  <span>Joined March 2020</span>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-3 mb-6">
                  <Button size="sm" variant="outline">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700">Connect</Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Profile Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Connections</span>
                    <span className="font-semibold">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Projects</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Profile Views</span>
                    <span className="font-semibold">2,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posts</span>
                    <span className="font-semibold">89</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{achievement.title}</p>
                        <p className="text-xs text-gray-500">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="about" className="space-y-6">
              <TabsList>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>

              {/* About */}
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      I'm a passionate full stack developer with over 6 years of experience building scalable web
                      applications. I love working with modern technologies like React, Node.js, and cloud platforms to
                      create solutions that make a real impact.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      When I'm not coding, you can find me contributing to open source projects, mentoring junior
                      developers, or exploring the latest trends in web development. I believe in continuous learning
                      and sharing knowledge with the developer community.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      I'm always open to interesting opportunities and collaborations. Feel free to reach out if you'd
                      like to connect or discuss potential projects!
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Current Focus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold mb-2">🚀 Learning</h4>
                        <p className="text-sm text-gray-600">
                          Exploring serverless architectures and microservices patterns
                        </p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold mb-2">💼 Working On</h4>
                        <p className="text-sm text-gray-600">Building a developer productivity platform at TechCorp</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold mb-2">🌟 Contributing</h4>
                        <p className="text-sm text-gray-600">
                          Active contributor to React and Node.js open source projects
                        </p>
                      </div>
                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <h4 className="font-semibold mb-2">📚 Teaching</h4>
                        <p className="text-sm text-gray-600">
                          Mentoring junior developers and creating educational content
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Projects */}
              <TabsContent value="projects" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userProjects.map((project) => (
                    <Card key={project.id} className="hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-gray-100 overflow-hidden rounded-t-lg">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
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
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Experience */}
              <TabsContent value="experience" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Work Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {experience.map((exp, index) => (
                        <div key={index} className="border-l-4 border-purple-200 pl-6 pb-6 last:pb-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{exp.title}</h3>
                              <p className="text-purple-600 font-medium">{exp.company}</p>
                            </div>
                            <Badge variant="outline">{exp.period}</Badge>
                          </div>
                          <p className="text-gray-600">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Skills */}
              <TabsContent value="skills" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {skills.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-sm text-gray-500">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
