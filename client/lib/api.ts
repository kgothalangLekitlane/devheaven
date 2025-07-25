// client/lib/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Helper function to handle fetch errors
async function apiRequest(url: string, options: RequestInit = {}) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError || error.name === 'AbortError' || (error instanceof Error && error.message.includes('fetch'))) {
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    }
    throw error;
  }
}

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
  try {
    return await apiRequest(`${API_URL}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Login failed:', error);
    if (error.message.includes('Unable to connect')) {
      throw new Error('Unable to connect to server. Please try again later.');
    }
    throw new Error('Invalid email or password');
  }
}

// Users (protected)
export async function fetchUsers(token: string) {
  const res = await fetch(`${API_URL}/api/users`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

// Messages (deprecated - use the newer authenticated versions below)
export async function postMessage(data: any, token: string) {
  const res = await fetch(`${API_URL}/api/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
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
  try {
    return await apiRequest(`${API_URL}/api/posts`);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    // Return mock data as fallback
    return [
      {
        _id: "1",
        title: "Welcome to DevHeaven!",
        content: "This is a sample post. Connect to the backend to see real posts.",
        author: {
          _id: "1",
          firstName: "Demo",
          lastName: "User",
          username: "demouser"
        },
        tags: ["welcome", "demo"],
        likes: [],
        comments: [],
        createdAt: new Date().toISOString()
      }
    ];
  }
}

export async function createPost(data: any, token: string) {
  try {
    return await apiRequest(`${API_URL}/api/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Failed to create post:', error);
    throw new Error('Unable to create post. Please check your connection and try again.');
  }
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

// Get user profile by ID
export async function fetchUserById(id: string) {
  const res = await fetch(`${API_URL}/api/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

// Like/unlike post
export async function likePost(postId: string, token: string) {
  const res = await fetch(`${API_URL}/api/posts/${postId}/like`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to like post");
  return res.json();
}

// Add comment to post
export async function addComment(postId: string, text: string, token: string) {
  const res = await fetch(`${API_URL}/api/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ text })
  });
  if (!res.ok) throw new Error("Failed to add comment");
  return res.json();
}

// Update messages to require authentication
export async function fetchMessages(token: string) {
  const res = await fetch(`${API_URL}/api/messages`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}
