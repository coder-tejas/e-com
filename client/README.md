
# MERN E-Commerce Client

React + Vite + Redux Toolkit storefront and admin dashboard for the MERN e-commerce app. Charts, cart, Stripe checkout, Firebase auth, admin product/order/coupon management.

## Prerequisites

- Node >= 18
- The backend API running (see `../server`)

## Install & Run

```bash
npm i
npm run dev       # vite dev server → http://localhost:5173
npm run build     # type-check + production build
npm run preview   # preview production build
```

## Env Variables

Create a `.env` file in this directory:

```env
VITE_FIREBASE_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
VITE_SERVER=http://localhost:4000
VITE_STRIPE_KEY=stripe_publishable_key
```

`VITE_SERVER` is the bare backend host — the app appends `/api/v1/...` paths itself.
