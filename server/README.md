
# MERN E-Commerce Server

Express + TypeScript REST API for the MERN e-commerce app. Uses MongoDB (Mongoose), Redis caching (ioredis), Cloudinary image uploads, and Stripe payments.

## Prerequisites

- Node >= 18
- MongoDB (local or Atlas)
- Redis (local or cloud)
- Cloudinary account, Stripe account

## Install & Run

```bash
npm i
npm run build   # compile TypeScript to dist/
npm start       # node dist/app.js
```

Dev mode (watch):

```bash
npm run dev
```

## Env Variables

Create a `.env` file in this directory:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/ecommerce-2024
REDIS_URI=redis://localhost:6379
REDIS_TTL=
STRIPE_KEY=stripe_secret_key
PRODUCT_PER_PAGE=8
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
CLIENT_URL=http://localhost:5173
```

## API Routes

Base: `/api/v1`

| Route         | Description              |
| ------------- | ------------------------ |
| `/user`       | Auth, profiles, admin    |
| `/product`    | Products, reviews, stock |
| `/order`      | Orders, coupons          |
| `/payment`    | Stripe + discounts       |
| `/dashboard`  | Admin stats & charts     |

Health check: `GET /` → `API Working with /api/v1`
