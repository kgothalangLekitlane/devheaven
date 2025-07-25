"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Code2, Github, Mail } from "lucide-react"
import Link from "next/link"
import { loginUser } from "@/lib/api"
import { useAuth } from "@/contexts/AuthContext"

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setForm(f => ({ ...f, [id]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser({
        email: form.email,
        password: form.password
      });

      // Login successful
      login(response.token, response.user);
      router.push("/dashboard");
    } catch (err) {
      // Handle connection errors with demo mode
      if (err instanceof Error && err.message.includes('Unable to connect')) {
        // Demo mode - create a mock user session
        const demoUser = {
          id: "demo-user",
          firstName: "Demo",
          lastName: "User",
          email: form.email,
          username: "demouser"
        };
        const demoToken = "demo-token-12345";

        login(demoToken, demoUser);
        router.push("/dashboard");
        return;
      }

      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Code2 className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">DevHeaven</span>
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your account to continue your developer journey</CardDescription>
          <div className="mt-2 p-2 bg-blue-50 rounded-md">
            <p className="text-xs text-blue-700">
              Demo Mode: Use any email/password to explore the app
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={form.remember}
                  onCheckedChange={checked => setForm(f => ({ ...f, remember: !!checked }))}
                />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm text-purple-600 hover:underline" prefetch={false}>
              Forgot password?
            </Link>
            </div>

            {error && <div className="text-red-600 text-sm text-center" role="alert">{error}</div>}

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
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
            <Button variant="outline">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Google
            </Button>
          </div>

          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-purple-600 hover:underline" prefetch={false}>
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
