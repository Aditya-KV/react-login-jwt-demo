// Simulated JWT utilities.
//
// A real JWT is three base64url-encoded parts — header.payload.signature —
// where the signature is produced by an HMAC/RSA algorithm on a server.
// This is a client-only teaching demo, so we mimic the *shape* of a JWT
// (three dot-separated base64 segments) without real cryptographic signing.
// Never use this in production; issue and verify real JWTs on a server.

const STORAGE_KEY = "auth_token";

function base64UrlEncode(obj) {
  const json = JSON.stringify(obj);
  // btoa works on binary strings, so escape/encodeURIComponent handles UTF-8 safely.
  const base64 = btoa(unescape(encodeURIComponent(json)));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(str) {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  const json = decodeURIComponent(escape(atob(padded)));
  return JSON.parse(json);
}

/**
 * Builds a simulated JWT containing userId and role in the payload.
 * Structure: header.payload.signature (signature is a fake placeholder).
 */
export function generateToken({ userId, role, username }) {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    userId,
    role,
    username,
    iat: Date.now(),
    exp: Date.now() + 1000 * 60 * 60, // simulated 1 hour expiry
  };

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(payload);
  // A real signature is cryptographic; here it's just a random-looking placeholder
  // so the token visually resembles header.payload.signature.
  const fakeSignature = base64UrlEncode({ sig: Math.random().toString(36).slice(2) });

  return `${encodedHeader}.${encodedPayload}.${fakeSignature}`;
}

/** Decodes the payload section of a simulated token without verifying it. */
export function decodeToken(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    return base64UrlDecode(parts[1]);
  } catch {
    return null;
  }
}

export function isTokenExpired(payload) {
  if (!payload?.exp) return true;
  return Date.now() > payload.exp;
}

export function storeToken(token) {
  localStorage.setItem(STORAGE_KEY, token);
}

export function getToken() {
  return localStorage.getItem(STORAGE_KEY);
}

export function clearToken() {
  localStorage.removeItem(STORAGE_KEY);
}
