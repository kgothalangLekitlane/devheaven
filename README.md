# DevHeaven

DevHeaven is a full-stack platform for recruiters, resources, users, and messaging. This project includes a Node.js/Express backend and a Next.js/Tailwind client.

## Features
- JWT-based authentication
- RESTful API for users, messages, recruiters, and resources
- Protected routes for sensitive data
- CI/CD with GitHub Actions
- Hosted on Render

## Backend
- **Location:** `backend/`
- **Main file:** `server.js`
- **API routes:**
  - `POST /api/auth/register` — Register a new user
  - `POST /api/auth/login` — Login and receive JWT
  - `GET /api/users` — Get all users (protected)
  - `GET /api/messages` — Get all messages
  - `POST /api/messages` — Create a message
  - `GET /api/recruiters` — Get all recruiters
  - `GET /api/resources` — Get all resources

## Client
- **Location:** `client/`
- **Tech:** Next.js, Tailwind CSS
- **Pages:** Auth, Dashboard, Messages, Profile, Projects, Recruiters, Resources

## Environment Variables
Set these in Render or in a local `.env` file:
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## CI/CD
- GitHub Actions workflow in `.github/workflows/nodejs.yml`
- Auto deploy enabled on Render

## Getting Started
1. Clone the repo
2. Install dependencies:
   - `cd backend && npm install`
   - `cd ../client && npm install`
3. Set environment variables
4. Start backend: `npm start` (in `backend/`)
5. Start client: `npm run dev` (in `client/`)

## Contributing
Pull requests are welcome. For major changes, open an issue first.

## License
MIT
=======
# devheaven
This app is a software dev communication app that aims to build community and allow developers to share ,connect &amp; overall be techy about stuff freely

# DevHeaven
Live url = https://devheaven1-dhxe-fptcrtuie-kgothalang-lekitlanes-projects.vercel.app/

DevHeaven is a community communication platform for developers — a place to connect, share knowledge, collaborate, and grow in the tech space.

## 🌟 Features

- Post discussions and updates
- Real-time feed display
- Developer profiles
- MongoDB-powered backend
- Clean, responsive UI built with React

## ⚙️ Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB Atlas
- Deployment: Vercel (Frontend), Render (Backend)
- CI/CD: GitHub Actions

---

## 🚀 Local Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB Atlas account (or local MongoDB)
- Vercel & Render accounts (for hosting)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/kgothalangLekitlane/devheaven.git
cd devheaven
>>>>>>> 1132eb3c34008176d34387fef8645c8fde195c55
