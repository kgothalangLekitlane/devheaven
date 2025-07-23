
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
