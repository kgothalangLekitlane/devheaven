// client/lib/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Helper function to handle fetch errors
async function apiRequest(url: string, options: RequestInit = {}) {
  // For this environment, always throw connection error to trigger demo mode
  throw new Error('Unable to connect to server. Using demo mode.');
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
  // Always return demo data in this environment
  console.log('Using demo mode for posts');
  return [
    {
      _id: "demo1",
      title: "Welcome to DevHeaven!",
      content: "This is a demo post showcasing our platform's capabilities. In demo mode, you can explore all features without connecting to a backend server.",
      author: {
        _id: "demo-user-1",
        firstName: "Sarah",
        lastName: "Chen",
        username: "sarahdev"
      },
      tags: ["welcome", "demo", "platform"],
      likes: ["user1", "user2", "user3"],
      comments: [
        {
          user: { firstName: "John", lastName: "Doe", username: "johndoe" },
          text: "Great post! Looking forward to using this platform.",
          createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
        }
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
    },
    {
      _id: "demo2",
      title: "Building Amazing React Components",
      content: "Just finished creating a new component library with TypeScript support. It includes 50+ customizable components that are production-ready!",
      author: {
        _id: "demo-user-2",
        firstName: "Alex",
        lastName: "Rodriguez",
        username: "alexcodes"
      },
      tags: ["react", "typescript", "components", "opensource"],
      likes: ["user1", "user4", "user5", "user6"],
      comments: [
        {
          user: { firstName: "Emily", lastName: "Wong", username: "emilyw" },
          text: "This looks amazing! Can you share the GitHub repo?",
          createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString()
        },
        {
          user: { firstName: "Mike", lastName: "Taylor", username: "miket" },
          text: "Perfect timing! I was just looking for something like this.",
          createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString()
        }
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
    },
    {
      _id: "demo3",
      title: "30-Day Coding Challenge Complete!",
      content: "Just wrapped up an intensive 30-day coding challenge where I built a different project each day. Learned so much about consistency, problem-solving, and pushing through obstacles. The growth mindset is everything!",
      author: {
        _id: "demo-user-3",
        firstName: "Maya",
        lastName: "Patel",
        username: "mayacodes"
      },
      tags: ["challenge", "learning", "growth", "motivation"],
      likes: ["user1", "user2", "user3", "user4", "user5", "user6", "user7"],
      comments: [
        {
          user: { firstName: "David", lastName: "Kim", username: "davidk" },
          text: "Incredible dedication! What was your favorite project?",
          createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
        },
        {
          user: { firstName: "Lisa", lastName: "Zhang", username: "lisaz" },
          text: "You're an inspiration! Starting my own challenge tomorrow.",
          createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString()
        }
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString()
    }
  ];
}

export async function createPost(data: any, token: string) {
  // Demo mode - simulate successful post creation
  console.log('Demo mode: Creating post', data);

  return {
    message: "Post created",
    post: {
      _id: "demo-" + Date.now(),
      title: data.title,
      content: data.content,
      author: {
        _id: "demo-user",
        firstName: "Demo",
        lastName: "User",
        username: "demouser"
      },
      tags: data.tags || [],
      likes: [],
      comments: [],
      createdAt: new Date().toISOString()
    }
  };
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
  // Demo mode - simulate like action
  console.log('Demo mode: Liking post', postId);
  return {
    message: "Post liked",
    likes: Math.floor(Math.random() * 10) + 1 // Random like count for demo
  };
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
