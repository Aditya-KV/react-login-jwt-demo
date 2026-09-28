# React Login System (Simulated JWT)

A simple React app demonstrating a front-end authentication flow: a login
form, simulated JWT token generation, token storage, role display, and a
protected dashboard. Built as a practical exercise for the concepts
**Authentication, JWT, Token Generation, Token Storage, and Protected UI**.

> ⚠️ **This is a client-only teaching demo.** There is no backend, and the
> "JWT" is not cryptographically signed — see [How the token simulation
> works](#how-the-token-simulation-works) below. Do not use this auth
> approach in production.


Github live page link:https://aditya-kv.github.io/react-login-jwt-demo/
## Features

- Username/password login form with validation and error messages
- Mock user store with three demo accounts, each with a different role
- On successful login, generates a JWT-shaped token (`header.payload.signature`)
  containing `userId`, `role`, `username`, `iat`, and `exp`
- Token is persisted to `localStorage` and restores the session on page refresh
- Displays the logged-in user's role
- Protected `Dashboard` view that only renders when a valid, non-expired
  token is present
- Logout clears the stored token and returns to the login screen

## Demo credentials

| Username | Password  | Role  |
|----------|-----------|-------|
| admin    | admin123  | Admin |
| john     | john123   | User  |
| guest    | guest123  | Guest |

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

To build for production:

```bash
npm run build
```

## Project structure

```
src/
├── components/
│   ├── Login.jsx        # Login form; validates credentials, requests a token
│   └── Dashboard.jsx     # Protected view; shows user info and a logout button
├── data/
│   └── users.js          # Mock "backend" user list (stands in for a real auth API)
├── utils/
│   └── token.js          # Simulated JWT generation/decoding + localStorage helpers
└── App.jsx                # Auth state, session restore, Login/Dashboard switch
```

## How the token simulation works

In a real app, the server verifies credentials and returns a JWT signed
with a secret key; the client can decode it but cannot forge one without
that secret. Since this project has no server, [`src/utils/token.js`](src/utils/token.js)
mimics a JWT's *shape* instead:

1. `generateToken({ userId, role, username })` base64url-encodes a header
   and a payload (containing `userId`, `role`, `username`, `iat`, `exp`),
   joins them with a fake, non-cryptographic "signature" segment, and
   returns `header.payload.signature`.
2. `storeToken` / `getToken` / `clearToken` persist the token string in
   `localStorage`.
3. `decodeToken` reads back the payload (no signature verification happens,
   because there is nothing real to verify).
4. `isTokenExpired` checks the simulated `exp` claim (tokens expire 1 hour
   after login) so a stale session isn't silently restored.

For a production system, replace this module with real calls to a backend
that issues signed JWTs (e.g. HS256/RS256), and verify/refresh them
server-side.

## Tech stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
