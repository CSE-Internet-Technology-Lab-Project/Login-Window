# Login Window UI

Simple React frontend for the Login Window lab project.

## Features

- Register / Login forms
- JWT saved in `localStorage`
- Protected dashboard (`GET /api/auth/me`)
- Vite proxy to backend on port `5000`

## Run

From repo root, start backend:

```bash
npm install
# create .env from .env.example if needed
npm run dev
```

In another terminal, start frontend:

```bash
cd web/login-window-UI
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Pages

- `/login` — sign in
- `/register` — create account
- `/dashboard` — profile after login
