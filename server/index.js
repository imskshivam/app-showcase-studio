// Standalone Google OAuth verification server for Markva.
//
// Why a separate server?
//   - Verifies Google ID tokens server-side (signature + audience + expiry).
//   - Issues an HttpOnly session cookie so the client can't tamper with auth state.
//   - Keeps your frontend bundle free of any verification logic.
//
// How to run:
//   cd server
//   cp .env.example .env   # then fill in values
//   npm install
//   npm run dev
//
// Endpoints:
//   POST /auth/google     { credential }  -> sets `sf_session` cookie, returns user
//   GET  /auth/me                          -> returns current user or 401
//   POST /auth/logout                      -> clears cookie

import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const {
  GOOGLE_CLIENT_ID,
  SESSION_SECRET,
  CLIENT_ORIGIN = "http://localhost:5173",
  PORT = 8787,
  COOKIE_SECURE = "false",
  COOKIE_SAMESITE = "lax",
} = process.env;

if (!GOOGLE_CLIENT_ID || !SESSION_SECRET) {
  console.error(
    "[auth-server] Missing GOOGLE_CLIENT_ID or SESSION_SECRET. See server/.env.example.",
  );
  process.exit(1);
}

const COOKIE_NAME = "sf_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  }),
);

const cookieOpts = {
  httpOnly: true,
  secure: COOKIE_SECURE === "true",
  sameSite: COOKIE_SAMESITE, // "lax" | "strict" | "none"
  maxAge: SESSION_TTL_SECONDS * 1000,
  path: "/",
};

function signSession(user) {
  return jwt.sign(
    { sub: user.sub, name: user.name, email: user.email, picture: user.picture },
    SESSION_SECRET,
    { expiresIn: SESSION_TTL_SECONDS },
  );
}

function readSession(req) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return null;
  try {
    return jwt.verify(token, SESSION_SECRET);
  } catch {
    return null;
  }
}

// POST /auth/google  { credential: "<google-id-token>" }
app.post("/auth/google", async (req, res) => {
  const { credential } = req.body || {};
  if (!credential) return res.status(400).json({ error: "Missing credential" });

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload?.sub) return res.status(401).json({ error: "Invalid token" });

    const user = {
      sub: payload.sub,
      name: payload.name || payload.email,
      email: payload.email,
      picture: payload.picture,
    };

    const token = signSession(user);
    res.cookie(COOKIE_NAME, token, cookieOpts);
    res.json({ user });
  } catch (err) {
    console.error("[auth-server] verifyIdToken failed:", err?.message || err);
    res.status(401).json({ error: "Token verification failed" });
  }
});

// GET /auth/me
app.get("/auth/me", (req, res) => {
  const session = readSession(req);
  if (!session) return res.status(401).json({ user: null });
  res.json({
    user: {
      sub: session.sub,
      name: session.name,
      email: session.email,
      picture: session.picture,
    },
  });
});

// POST /auth/logout
app.post("/auth/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME, { ...cookieOpts, maxAge: undefined });
  res.json({ ok: true });
});

// Health check
app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(Number(PORT), () => {
  console.log(`[auth-server] listening on http://localhost:${PORT}`);
  console.log(`[auth-server] CORS allowed origin: ${CLIENT_ORIGIN}`);
});
