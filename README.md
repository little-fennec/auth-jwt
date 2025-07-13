# Auth-JWT Backend (Node.js, TypeScript, Express, MongoDB)

Backend for user registration, authentication (JWT), and user listing. Built with TypeScript, Express, MongoDB, and Docker.

---

## Features
- User registration
- User login (JWT)
- Get user list (protected, JWT required)
- Swagger UI for API testing

---

## Quick Start

### 1. Docker Compose (Recommended)

1. Copy and edit `.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://mongo:27017/authdb
   JWT_SECRET=your_jwt_secret
   ```
2. Build and run backend + MongoDB:
   ```sh
   docker-compose up --build
   ```
   Backend: http://localhost:5000
   Swagger: http://localhost:5000/api-docs

### 2. Manual (Local)

1. Start MongoDB locally (port 27017)
2. Create `.env` in the project root:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/authdb
   JWT_SECRET=your_jwt_secret
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Run in dev mode:
   ```sh
   npm run dev
   ```

---

## API Endpoints

- `POST /api/register` — Register a new user
  - Body: `{ "email": string, "password": string }`
  - Response: `{ id, email }`
- `POST /api/login` — Login, get JWT
  - Body: `{ "email": string, "password": string }`
  - Response: `{ token }`
- `GET /api/users` — Get user list (protected)
  - Header: `Authorization: Bearer <token>`
  - Response: `[ { id, email }, ... ]`
- Swagger UI: `/api-docs`

---

## Authentication
- JWT is required for `/api/users` (send as `Authorization: Bearer <token>`)
- Tokens are valid for 7 days

---

## Project Structure
- `src/config/` — config and env
- `src/entities/` — domain models
- `src/repositories/` — data access (MongoDB)
- `src/services/` — business logic
- `src/controllers/` — request handlers
- `src/middlewares/` — auth, error handling
- `src/routes/` — API routes
- `src/index.ts` — app entry point

---

## Notes
- See `client/README.md` for frontend setup

## Author
- Anna Bystrova