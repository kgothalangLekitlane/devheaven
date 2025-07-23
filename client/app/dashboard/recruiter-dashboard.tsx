import * as React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"
import CandidateSearch from "./candidate-search"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState<any[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [company, setCompany] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [recruiterId, setRecruiterId] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch(`${API_URL}/api/recruiters/jobs`)
      .then(res => res.json())
      .then(data => setJobs(data.jobs || []))
  }, [])

  const handleRegister = async () => {
    setMessage("")
    const res = await fetch(`${API_URL}/api/recruiters/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, company })
    })
    const data = await res.json()
    if (res.ok && data.recruiter) {
      setRecruiterId(data.recruiter._id)
      setMessage("Recruiter registered!")
    } else {
      setMessage(data.message || "Registration failed.")
    }
  }

  const handlePostJob = async () => {
    setMessage("")
    if (!recruiterId) return setMessage("Register as recruiter first.")
    const res = await fetch(`${API_URL}/api/recruiters/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, recruiterId })
    })
    const data = await res.json()
    if (res.ok && data.job) {
      setJobs(j => [...j, data.job])
      setTitle("")
      setDescription("")
      setMessage("Job posted!")
    } else {
      setMessage(data.message || "Job posting failed.")
    }
  }

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardHeader>Recruiter Dashboard</CardHeader>
      <CardContent>
        <div className="mb-6">
          <h2 className="font-bold mb-2">Register as Recruiter</h2>
          <div className="flex gap-2 mb-2">
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
            <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <Input value={company} onChange={e => setCompany(e.target.value)} placeholder="Company" />
            <Button onClick={handleRegister}>Register</Button>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="font-bold mb-2">Post a Job</h2>
          <div className="flex gap-2 mb-2">
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Job Title" />
            <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
            <Button onClick={handlePostJob}>Post Job</Button>
          </div>
        </div>
        {message && <div className="text-purple-600 mb-4">{message}</div>}
        <div>
          <h2 className="font-bold mb-2">All Jobs</h2>
          <div className="space-y-2">
            {jobs.map((job: any) => (
              <div key={job._id} className="border rounded p-2 bg-white">
                <div className="font-bold">{job.title}</div>
                <div>{job.description}</div>
                <div className="text-xs text-gray-500">Company: {job.recruiter?.company || "-"}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <CandidateSearch />
        </div>
      </CardContent>
    </Card>
  )
}
