import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export default function CandidateSearch() {
  const [skill, setSkill] = useState("")
  const [location, setLocation] = useState("")
  const [experience, setExperience] = useState("")
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (skill) params.append("skill", skill)
    if (location) params.append("location", location)
    if (experience) params.append("experience", experience)
    const res = await fetch(`${API_URL}/api/users/search?${params.toString()}`)
    const data = await res.json()
    setCandidates(data.candidates || [])
    setLoading(false)
  }

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardHeader>Candidate Search</CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input value={skill} onChange={e => setSkill(e.target.value)} placeholder="Skill" />
          <Input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" />
          <Input value={experience} onChange={e => setExperience(e.target.value)} placeholder="Experience (years)" type="number" />
          <Button onClick={handleSearch} disabled={loading}>{loading ? "Searching..." : "Search"}</Button>
        </div>
        <div className="space-y-2">
          {candidates.map((c: any) => (
            <div key={c._id} className="border rounded p-2 bg-white">
              <div className="font-bold">{c.firstName} {c.lastName}</div>
              <div>Email: {c.email}</div>
              <div>Skills: {c.skills?.join(", ") || "-"}</div>
              <div>Location: {c.location || "-"}</div>
              <div>Experience: {c.experience || "-"} years</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
