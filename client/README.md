# Auth-JWT Frontend (React + Vite)

A minimalist frontend for user registration, authentication (JWT), and viewing users. Built with React, TypeScript, and Vite.

## Quick Start

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the dev server:
   ```sh
   npm run dev
   ```
   By default, it opens [http://localhost:5173](http://localhost:5173)

## Backend Interaction
- All API requests are sent to `/api` (e.g., `/api/register`, `/api/login`, `/api/users`).
- The `vite.config.ts` sets up a proxy: all `/api` requests are forwarded to the backend (`http://localhost:5000`).
- The backend must be running (see root README for instructions).

## Authentication
- After successful login, the JWT token is stored in `localStorage`.
- Viewing the user list requires authentication (i.e., a valid token).
- If there is no token, the users page is inaccessible (redirects to login).

## Project Structure
- `src/App.tsx` — routing and navigation
- `src/Register.tsx` — registration
- `src/Login.tsx` — login
- `src/Users.tsx` — user list (protected)

## Scripts
- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — lint the code

## Notes
- For production, use `npm run build` and serve the `dist` folder with any static server.
- For development, backend and frontend can run independently.
