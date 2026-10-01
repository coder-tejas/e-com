# MERN E-Commerce (Monorepo)

Full-stack e-commerce app — Express + MongoDB + Redis backend with a React + Vite + Redux Toolkit frontend.

## Features

- Product catalog with search, filters, pagination, and reviews
- Cart, Stripe checkout, discount coupons
- Order management and admin dashboard with sales charts
- Redis-cached product/order queries, Cloudinary image uploads
- Firebase authentication, role-based admin routes

## Structure

```text
.
├── client/           # React + Vite frontend (port 5173 dev, 4173 preview)
├── server/           # Express + TypeScript API (port 4000)
├── package.json      # Root orchestration scripts (concurrently)
├── docker-compose.yml# mongo + redis + server + client
└── .env.sample       # Template — copy values into server/.env and client/.env
```

## Prerequisites

- Node >= 18, npm
- MongoDB (local or Atlas), Redis (local or cloud)
- Firebase project, Stripe keys, Cloudinary account

## Setup

```bash
# 1. Install everything (root + server + client)
npm run install:all

# 2. Env files
cp .env.sample /tmp/env-reference
# then create:
#   server/.env  (see server/.env.sample)
#   client/.env  (see client/.env.sample)
```

Minimum `server/.env`:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/ecommerce-2024
REDIS_URI=redis://localhost:6379
STRIPE_KEY=sk_test_...
PRODUCT_PER_PAGE=8
CLOUD_NAME=...
CLOUD_API_KEY=...
CLOUD_API_SECRET=...
CLIENT_URL=http://localhost:5173
```

Minimum `client/.env`:

```env
VITE_SERVER=http://localhost:4000
VITE_STRIPE_KEY=pk_test_...
VITE_FIREBASE_KEY=...
VITE_AUTH_DOMAIN=...
VITE_PROJECT_ID=...
VITE_STORAGE_BUCKET=...
VITE_MESSAGING_SENDER_ID=...
VITE_APP_ID=...
```

## Run (dev)

```bash
npm run dev              # both server + client
npm run dev:server       # backend only → http://localhost:4000
npm run dev:client       # frontend only → http://localhost:5173
```

## Build / Start

```bash
npm run build            # builds server (tsc) + client (vite build)
npm start                # server (node dist) + client preview
```

## Docker

```bash
docker compose up --build
# server → http://localhost:4000, client → http://localhost:4173
```

## Deploy on Vercel (Services)

`vercel.json` at the repo root deploys both apps as one project on one domain:

- `client` (Vite) serves everything except `/api/*`
- `server` (Express) serves `/api/*` — the service receives the original path, so the existing `/api/v1/...` routes work unchanged

Steps:

1. In the Vercel project settings (**Build and Deployment**), set the framework to **Services**.
2. Deploy — `vercel.json` is picked up automatically.
3. Set shared environment variables in the Vercel dashboard: `MONGO_URI` (use Atlas, not localhost), `REDIS_URI`, `STRIPE_KEY`, `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET`, plus the client `VITE_FIREBASE_*`, `VITE_APP_ID`, `VITE_STRIPE_KEY`.
4. Do **not** set `VITE_SERVER` on Vercel — the client defaults to same-origin `/api/v1/...`, which the rewrite routes to the server service. (`VITE_SERVER` is only for local dev in `client/.env`.)

Notes:

- Uploads go to Cloudinary (multer memory storage), so the ephemeral serverless filesystem is not an issue.
- No service bindings are used: the only cross-service calls are browser → public `/api/*` route, and bindings only resolve in server-side functions, not in the static frontend.

## Notes

- Server loads `server/.env` (its `dotenv` path is `./.env`, so always run it with `server/` as cwd — the root scripts already do `cd server && ...`).
- Client appends `/api/v1/...` to `VITE_SERVER`, so set it to the bare host (`http://localhost:4000`, no trailing path).
- The root `.gitignore` covers `server/dist`, `server/uploads`, `client/dist`, and all `.env` files.
- API base: `http://localhost:4000/api/v1` (`/user`, `/product`, `/order`, `/payment`, `/dashboard`).
