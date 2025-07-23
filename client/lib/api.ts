// client/lib/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Auth
export async function registerUser(data: any) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

export async function loginUser(data: any) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json(); // Should contain JWT token
}

// Users (protected)
export async function fetchUsers(token: string) {
  const res = await fetch(`${API_URL}/api/users`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

// Messages
export async function fetchMessages() {
  const res = await fetch(`${API_URL}/api/messages`);
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}

export async function postMessage(data: any) {
  const res = await fetch(`${API_URL}/api/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to post message");
  return res.json();
}

// Recruiters
export async function fetchRecruiters() {
  const res = await fetch(`${API_URL}/api/recruiters`);
  if (!res.ok) throw new Error("Failed to fetch recruiters");
  return res.json();
}

// Resources
export async function fetchResources() {
  const res = await fetch(`${API_URL}/api/resources`);
  if (!res.ok) throw new Error("Failed to fetch resources");
  return res.json();
}
