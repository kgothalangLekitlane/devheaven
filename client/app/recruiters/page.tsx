import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code2, MapPin, DollarSign, Clock, Building, Users, Search, Filter, Briefcase, Star } from "lucide-react"
import Link from "next/link"

export default function RecruitersPage() {
  const jobs = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "TechCorp",
      logo: "/placeholder.svg?height=40&width=40",
      location: "San Francisco, CA",
      type: "Full-time",
      remote: true,
      salary: "$120k - $180k",
      posted: "2 days ago",
      description:
        "We're looking for a senior full stack developer to join our growing team. You'll work on cutting-edge projects using React, Node.js, and AWS.",
      requirements: ["5+ years experience", "React", "Node.js", "AWS", "TypeScript"],
      applicants: 45,
      featured: true,
    },
    {
      id: 2,
      title: "Frontend React Developer",
      company: "StartupXYZ",
      logo: "/placeholder.svg?height=40&width=40",
      location: "New York, NY",
      type: "Full-time",
      remote: false,
      salary: "$90k - $130k",
      posted: "1 day ago",
      description:
        "Join our fast-growing startup as a Frontend React Developer. You'll be responsible for building user-facing features and improving our web application.",
      requirements: ["3+ years React", "JavaScript", "CSS", "Git"],
      applicants: 23,
      featured: false,
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      logo: "/placeholder.svg?height=40&width=40",
      location: "Austin, TX",
      type: "Full-time",
      remote: true,
      salary: "$110k - $160k",
      posted: "3 days ago",
      description:
        "We're seeking a DevOps Engineer to help us scale our infrastructure. Experience with Kubernetes, Docker, and CI/CD pipelines required.",
      requirements: ["Docker", "Kubernetes", "AWS/GCP", "CI/CD", "Python"],
      applicants: 67,
      featured: true,
    },
    {
      id: 4,
      title: "Mobile App Developer (React Native)",
      company: "MobileFirst Inc",
      logo: "/placeholder.svg?height=40&width=40",
      location: "Remote",
      type: "Contract",
      remote: true,
      salary: "$80 - $120/hour",
      posted: "5 days ago",
      description:
        "Looking for an experienced React Native developer to build cross-platform mobile applications for our clients.",
      requirements: ["React Native", "iOS/Android", "JavaScript", "Redux"],
      applicants: 31,
      featured: false,
    },
    {
      id: 5,
      title: "Backend Python Developer",
      company: "DataDriven Corp",
      logo: "/placeholder.svg?height=40&width=40",
      location: "Seattle, WA",
      type: "Full-time",
      remote: true,
      salary: "$100k - $150k",
      posted: "1 week ago",
      description:
        "Join our data engineering team to build scalable backend systems. Experience with Python, Django, and PostgreSQL required.",
      requirements: ["Python", "Django", "PostgreSQL", "REST APIs", "Docker"],
      applicants: 52,
      featured: false,
    },
  ]

  const companies = [
    {
      id: 1,
      name: "TechCorp",
      logo: "/placeholder.svg?height=60&width=60",
      description: "Leading technology company building the future of software development tools.",
      employees: "1000-5000",
      openJobs: 12,
      rating: 4.8,
      location: "San Francisco, CA",
    },
    {
      id: 2,
      name: "StartupXYZ",
      logo: "/placeholder.svg?height=60&width=60",
      description: "Fast-growing startup revolutionizing the e-commerce industry with AI-powered solutions.",
      employees: "50-200",
      openJobs: 8,
      rating: 4.6,
      location: "New York, NY",
    },
    {
      id: 3,
      name: "CloudTech Solutions",
      logo: "/placeholder.svg?height=60&width=60",
      description: "Cloud infrastructure company helping businesses scale their operations globally.",
      employees: "500-1000",
      openJobs: 15,
      rating: 4.7,
      location: "Austin, TX",
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
                <Link href="/recruiters" className="text-purple-600 font-medium">
                  Jobs
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Post a Job</Button>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Dream Job</h1>
          <p className="text-gray-600 mb-6">
            Discover opportunities from top companies looking for talented developers
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search jobs, companies, or skills..." className="pl-10" />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Location" className="pl-10 w-full lg:w-48" />
            </div>
            <Button variant="outline" className="flex items-center bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">Search Jobs</Button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">
              Remote
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">
              Full-time
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">
              Frontend
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">
              Backend
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">
              Full Stack
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">
              Senior Level
            </Badge>
          </div>
        </div>

        {/* Job Tabs */}
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList>
            <TabsTrigger value="jobs">Job Listings</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
          </TabsList>

          {/* Job Listings */}
          <TabsContent value="jobs" className="space-y-4">
            {jobs.map((job) => (
              <Card
                key={job.id}
                className={`hover:shadow-lg transition-shadow ${job.featured ? "border-purple-200 bg-purple-50/30" : ""}`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={job.logo || "/placeholder.svg"} />
                        <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-semibold">{job.title}</h3>
                          {job.featured && <Badge className="bg-purple-600">Featured</Badge>}
                        </div>
                        <p className="text-gray-600 font-medium mb-2">{job.company}</p>

                        {/* Job Details */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                            {job.remote && (
                              <Badge variant="secondary" className="ml-1">
                                Remote
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{job.posted}</span>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4">{job.description}</p>

                        {/* Requirements */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {job.requirements.map((req) => (
                            <Badge key={req} variant="secondary" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Users className="h-4 w-4" />
                            <span>{job.applicants} applicants</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Save
                            </Button>
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Companies */}
          <TabsContent value="companies" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <Card key={company.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-4">
                      <AvatarImage src={company.logo || "/placeholder.svg"} />
                      <AvatarFallback>{company.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{company.name}</CardTitle>
                    <CardDescription className="text-center">{company.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Company Size</span>
                        <span className="font-medium">{company.employees}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Open Jobs</span>
                        <span className="font-medium">{company.openJobs}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">{company.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Location</span>
                        <span className="font-medium">{company.location}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <Building className="h-4 w-4 mr-2" />
                      View Company
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Saved Jobs */}
          <TabsContent value="saved" className="space-y-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Saved Jobs Yet</h3>
                <p className="text-gray-600 mb-4">Start saving jobs you're interested in to keep track of them here.</p>
                <Button className="bg-purple-600 hover:bg-purple-700">Browse Jobs</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications */}
          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Applications Yet</h3>
                <p className="text-gray-600 mb-4">Your job applications will appear here once you start applying.</p>
                <Button className="bg-purple-600 hover:bg-purple-700">Find Jobs</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
