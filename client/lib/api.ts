// client/lib/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://devheaven-2.onrender.com";

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

export async function addResource(data: any, token: string) {
  const res = await fetch(`${API_URL}/api/resources`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to add resource");
  return res.json();
}

// Posts
export async function fetchPosts() {
  const res = await fetch(`${API_URL}/api/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function createPost(data: any, token: string) {
  const res = await fetch(`${API_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}

// Jobs
export async function fetchJobs() {
  const res = await fetch(`${API_URL}/api/recruiters/jobs`);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}

export async function createJob(data: any, token: string) {
  const res = await fetch(`${API_URL}/api/recruiters/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to create job");
  return res.json();
}

export async function addRecruiter(data: any, token: string) {
  const res = await fetch(`${API_URL}/api/recruiters/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to add recruiter");
  return res.json();
}

// User search
export async function searchCandidates(query: string, token: string) {
  const res = await fetch(`${API_URL}/api/users/search?q=${encodeURIComponent(query)}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to search candidates");
  return res.json();
}

// Messages with specific user
export async function fetchMessagesWithUser(userId: string, token: string) {
  const res = await fetch(`${API_URL}/api/messages/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}

export async function sendMessage(data: any, token: string) {
  const res = await fetch(`${API_URL}/api/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}
