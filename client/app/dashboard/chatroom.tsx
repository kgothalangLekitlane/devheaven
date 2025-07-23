import * as React from "react"
import { io, Socket } from "socket.io-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"


const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, "") || "http://localhost:5000"


export default function ChatRoom() {
  const [room, setRoom] = React.useState<string>("global")
  const [joined, setJoined] = React.useState<boolean>(false)
  const [messages, setMessages] = React.useState<{ message: string; user: string; time?: string | Date }[]>([])
  const [input, setInput] = React.useState<string>("")
  const [user, setUser] = React.useState<string>("")
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null)
  const socketRef = React.useRef<Socket | null>(null)

  React.useEffect(() => {
    // Only connect on client
    if (typeof window !== "undefined") {
      socketRef.current = io(SOCKET_URL)
      socketRef.current.on("receiveMessage", (msg: { message: string; user: string; time?: string | Date }) => {
        setMessages(prev => [...prev, msg])
      })
      return () => {
        socketRef.current && socketRef.current.disconnect()
      }
    }
  }, [])

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const joinRoom = () => {
    if (!user.trim() || !socketRef.current) return
    socketRef.current.emit("joinRoom", room)
    setJoined(true)
  }

  const sendMessage = () => {
    if (input.trim() && socketRef.current) {
      socketRef.current.emit("sendMessage", { room, message: input, user })
      setMessages(prev => [...prev, { message: input, user, time: new Date() }])
      setInput("")
    }
  }

  return (
    <Card className="max-w-lg mx-auto mt-10">
      <CardHeader>Chatroom: {room}</CardHeader>
      <CardContent>
        {!joined ? (
          <div className="flex flex-col gap-2 mb-4">
            <Input value={user} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value)} placeholder="Your name" />
            <div className="flex gap-2">
              <Input value={room} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoom(e.target.value)} placeholder="Room name" />
              <Button onClick={joinRoom}>Join</Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="h-64 overflow-y-auto border p-2 mb-2 bg-white rounded">
              {messages.map((msg, i) => (
                <div key={i} className="mb-1">
                  <span className="font-bold text-purple-600">{msg.user}:</span> {msg.message}
                  <span className="text-xs text-gray-400 ml-2">{msg.time ? new Date(msg.time).toLocaleTimeString() : ""}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex gap-2">
              <Input value={input} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} placeholder="Type a message..." onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && sendMessage()} />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
