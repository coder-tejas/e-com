// Base URL for the backend API.
//
// Empty string means "same origin": the browser calls /api/v1/... on the
// current domain, which Vercel rewrites to the server service. This is how
// production works — do NOT set VITE_SERVER in the Vercel dashboard.
//
// Local dev sets VITE_SERVER=http://localhost:4000 in client/.env instead.
export const server = import.meta.env.VITE_SERVER ?? "";
