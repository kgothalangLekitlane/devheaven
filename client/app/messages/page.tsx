import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Code2, Search, Send, Paperclip, Smile, MoreVertical, Phone, Video } from "lucide-react"
import Link from "next/link"

export default function MessagesPage() {
  const conversations = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thanks for the code review! I'll implement those changes.",
      time: "2m ago",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Are you available for a quick call about the project?",
      time: "1h ago",
      unread: 0,
      online: true,
    },
    {
      id: 3,
      name: "Maya Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Great work on the API documentation!",
      time: "3h ago",
      unread: 1,
      online: false,
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Let's schedule a pair programming session",
      time: "1d ago",
      unread: 0,
      online: false,
    },
    {
      id: 5,
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I found a bug in the authentication module",
      time: "2d ago",
      unread: 0,
      online: true,
    },
  ]

  const currentMessages = [
    {
      id: 1,
      sender: "Sarah Chen",
      content: "Hey! I saw your React component library post. It looks amazing!",
      time: "10:30 AM",
      isMe: false,
    },
    {
      id: 2,
      sender: "Me",
      content: "Thank you! I've been working on it for months. Would love to get your feedback.",
      time: "10:32 AM",
      isMe: true,
    },
    {
      id: 3,
      sender: "Sarah Chen",
      content: "I'd be happy to review it. Could you share the GitHub repo?",
      time: "10:33 AM",
      isMe: false,
    },
    {
      id: 4,
      sender: "Me",
      content: "Here's the link: https://github.com/johndoe/react-components",
      time: "10:34 AM",
      isMe: true,
    },
    {
      id: 5,
      sender: "Sarah Chen",
      content:
        "Perfect! I'll take a look this evening and provide detailed feedback. The TypeScript integration looks solid from what I can see.",
      time: "10:35 AM",
      isMe: false,
    },
    {
      id: 6,
      sender: "Me",
      content:
        "That would be fantastic! I'm particularly interested in your thoughts on the API design and documentation.",
      time: "10:37 AM",
      isMe: true,
    },
    {
      id: 7,
      sender: "Sarah Chen",
      content: "Thanks for the code review! I'll implement those changes.",
      time: "2:15 PM",
      isMe: false,
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Messages
                  <Badge variant="secondary">5</Badge>
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search conversations..." className="pl-10" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-350px)]">
                  <div className="space-y-1">
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-4 hover:bg-gray-50 cursor-pointer border-l-4 ${
                          conversation.id === 1 ? "border-purple-500 bg-purple-50" : "border-transparent"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {conversation.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {conversation.online && (
                              <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 truncate">{conversation.name}</p>
                              <div className="flex items-center space-x-2">
                                <p className="text-xs text-gray-500">{conversation.time}</p>
                                {conversation.unread > 0 && (
                                  <Badge
                                    variant="destructive"
                                    className="h-5 w-5 p-0 text-xs flex items-center justify-center"
                                  >
                                    {conversation.unread}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold">Sarah Chen</h3>
                      <p className="text-sm text-gray-500">Online • Frontend Developer at TechCorp</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[calc(100vh-400px)] p-4">
                  <div className="space-y-4">
                    {currentMessages.map((message) => (
                      <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${message.isMe ? "flex-row-reverse space-x-reverse" : ""}`}
                        >
                          {!message.isMe && (
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder.svg?height=24&width=24" />
                              <AvatarFallback>SC</AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`px-4 py-2 rounded-lg ${
                              message.isMe ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${message.isMe ? "text-purple-200" : "text-gray-500"}`}>
                              {message.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input placeholder="Type your message..." className="pr-10" />
                    <Button size="sm" variant="ghost" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
