 📘 DevHeaven API Documentation

Welcome to the DevHeaven API! This backend supports authentication, posts, messaging, developer resources, and recruiter listings.

---

## 🌍 Base URL

https://devheaven-2.onrender.com



---

## 🛡️ Authentication

### ✅ Register

**POST** `/auth/register`

Registers a new user.

#### Request Body:
```json
{
  "username": "devuser",
  "email": "dev@example.com",
  "password": "securepassword"
}
Success Response:
json
Copy
Edit
{
  "message": "User registered successfully",
  "user": {
    "id": "abc123",
    "username": "devuser",
    "email": "dev@example.com"
  }
}
🔐 Login
POST /auth/login

Authenticates an existing user.

Request Body:
json
Copy
Edit
{
  "email": "dev@example.com",
  "password": "securepassword"
}
Success Response:
json
Copy
Edit
{
  "token": "JWT_TOKEN_HERE",
  "user": {
    "id": "abc123",
    "username": "devuser",
    "email": "dev@example.com"
  }
}
Error Response:
json
Copy
Edit
{
  "error": "Invalid email or password"
}
👤 Users
📄 Get User Profile
GET /users/:id

Fetch a user's public profile.

Response:
json
Copy
Edit
{
  "id": "abc123",
  "username": "devuser",
  "email": "dev@example.com",
  "bio": "Full-stack dev"
}
📝 Posts
📤 Create Post
POST /posts

Authorization: Bearer token required

Request Body:
json
Copy
Edit
{
  "title": "How to learn React",
  "content": "Start with the docs, build a to-do app..."
}
Success Response:
json
Copy
Edit
{
  "message": "Post created",
  "post": {
    "id": "post123",
    "title": "How to learn React",
    "content": "Start with the docs...",
    "author": "abc123"
  }
}
📚 Get All Posts
GET /posts

Returns a list of all posts.

Response:
json
Copy
Edit
[
  {
    "id": "post123",
    "title": "How to learn React",
    "content": "Start with the docs...",
    "author": {
      "id": "abc123",
      "username": "devuser"
    }
  }
]
💬 Messaging
📩 Send Message
POST /messages

Authorization: Bearer token required

Request Body:
json
Copy
Edit
{
  "receiverId": "user456",
  "text": "Hey! Are you available for collab?"
}
Response:
json
Copy
Edit
{
  "message": "Message sent",
  "chat": {
    "id": "msg789",
    "senderId": "abc123",
    "receiverId": "user456",
    "text": "Hey! Are you available for collab?"
  }
}
📥 Get Messages with User
GET /messages/:userId

Returns conversation between the logged-in user and another user.

Response:
json
Copy
Edit
[
  {
    "senderId": "abc123",
    "receiverId": "user456",
    "text": "Hey! Are you available for collab?",
    "timestamp": "2025-07-22T12:00:00Z"
  },
  {
    "senderId": "user456",
    "receiverId": "abc123",
    "text": "Sure! Let’s connect.",
    "timestamp": "2025-07-22T12:05:00Z"
  }
]
📚 Resources
➕ Add Resource
POST /resources

Authorization: Bearer token required

Request Body:
json
Copy
Edit
{
  "title": "FreeCodeCamp",
  "description": "Free full-stack coding curriculum",
  "link": "https://freecodecamp.org"
}
Response:
json
Copy
Edit
{
  "message": "Resource added",
  "resource": {
    "id": "res001",
    "title": "FreeCodeCamp",
    "description": "Free full-stack coding curriculum",
    "link": "https://freecodecamp.org"
  }
}
📖 Get All Resources
GET /resources

Response:
json
Copy
Edit
[
  {
    "id": "res001",
    "title": "FreeCodeCamp",
    "description": "Free full-stack coding curriculum",
    "link": "https://freecodecamp.org"
  }
]
🧑‍💼 Recruiters
➕ Add Recruiter
POST /recruiters

Authorization: Bearer token required

Request Body:
json
Copy
Edit
{
  "name": "Jane Doe",
  "company": "TechHire Inc.",
  "email": "jane@techhire.com"
}
Response:
json
Copy
Edit
{
  "message": "Recruiter added",
  "recruiter": {
    "id": "rec001",
    "name": "Jane Doe",
    "company": "TechHire Inc.",
    "email": "jane@techhire.com"
  }
}
👥 Get All Recruiters
GET /recruiters

Response:
json
Copy
Edit
[
  {
    "id": "rec001",
    "name": "Jane Doe",
    "company": "TechHire Inc.",
    "email": "jane@techhire.com"
  }
]
❌ Error Handling
All errors return with this format:

json
Copy
Edit
{
  "error": "Description of what went wrong"
}
Common errors:

401 Unauthorized

404 Not Found

500 Internal Server Error

✅ Authorization
Some endpoints require an Authorization header:


Authorization: Bearer YOUR_JWT_TOKEN
