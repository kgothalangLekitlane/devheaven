"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Code2, Github, Mail } from "lucide-react"
import Link from "next/link"
import { registerUser } from "@/lib/api"

export default function SignUpPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    terms: false
  })
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked, files } = e.target
    if (type === "file" && files && files[0]) {
      setFile(files[0])
    } else {
      setForm(f => ({ ...f, [id]: type === "checkbox" ? checked : value }))
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return // Prevent multiple submissions
    setError("")
    setSuccess("")
    // Basic validation
    if (!form.firstName || !form.lastName || !form.email || !form.username || !form.password || !form.confirmPassword) {
      setError("All fields are required.");
      return;
    }
    // Email format validation
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Invalid email format.");
      return;
    }
    // Password strength validation
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password) || !/[0-9]/.test(form.password)) {
      setError("Password must contain uppercase, lowercase, and a number.");
      return;
    }
    if (!form.terms) {
      setError("You must agree to the terms.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true)
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value as string)
      })
      if (file) formData.append("profile", file)

      // Use fetch directly for multipart upload
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/register`, {
        method: "POST",
        body: formData
      })

      if (!res.ok) {
        let data = null;
        try { data = await res.json(); } catch {}
        throw new Error(data?.message || `Registration failed. (${res.status})`)
      }

      setSuccess("Account created! Redirecting to login...")
      setTimeout(() => {
        setSuccess("");
        router.replace("/auth/login");
      }, 1200)
    } catch (err) {
      setLoading(false);

      // Handle specific network connection errors
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        // Provide demo mode when backend is unavailable
        setSuccess("Demo mode: Account would be created! Redirecting to login...")
        console.log("Demo registration:", {
          email: form.email,
          username: form.username,
          name: `${form.firstName} ${form.lastName}`
        })
        setTimeout(() => {
          setSuccess("");
          router.replace("/auth/login");
        }, 2000)
        return;
      } else if (err instanceof Error && err.message) {
        setError(err.message)
      } else {
        setError("Registration failed. Please try again.")
      }
    }
    setLoading(false)
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Code2 className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">DevHeaven</span>
          </div>
          <CardTitle className="text-2xl">Join DevHeaven</CardTitle>
          <CardDescription>Create your account and start connecting with developers worldwide</CardDescription>
          <div className="mt-2 p-2 bg-blue-50 rounded-md">
            <p className="text-xs text-blue-700">
              Demo Mode: Fill out the form to explore the app
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" value={form.firstName} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" value={form.lastName} onChange={handleChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile">Profile Image</Label>
              <Input id="profile" type="file" accept="image/*" onChange={handleChange} />
              {file && <span className="text-xs text-gray-500">Selected: {file.name}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="johndoe" value={form.username} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={form.password} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={form.terms} onCheckedChange={checked => setForm(f => ({ ...f, terms: !!checked }))} />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <Link href="/terms" className="text-purple-600 hover:underline" prefetch={false}>
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-purple-600 hover:underline" prefetch={false}>
                  Privacy Policy
                </Link>
              </Label>
            </div>
            {error && <div className="text-red-600 text-sm text-center" role="alert">{error}</div>}
            {success && <div className="text-green-600 text-sm text-center" role="status">{success}</div>}
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/github`}
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`}
            >
              <Mail className="h-4 w-4 mr-2" />
              Google
            </Button>
          </div>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-purple-600 hover:underline" prefetch={false}>
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
