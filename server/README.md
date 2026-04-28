# ShotForge Auth Server

Tiny Express server that verifies Google ID tokens and issues an HttpOnly session cookie. Runs **separately** from the frontend.

## Setup

```bash
cd server
cp .env.example .env     # fill in GOOGLE_CLIENT_ID + SESSION_SECRET
npm install
npm run dev              # http://localhost:8787
```

Generate a session secret:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

## Endpoints

| Method | Path           | Body / Notes                        | Response                  |
| ------ | -------------- | ----------------------------------- | ------------------------- |
| POST   | `/auth/google` | `{ credential }` (Google ID token)  | Sets cookie, `{ user }`   |
| GET    | `/auth/me`     | Reads `sf_session` cookie           | `{ user }` or 401         |
| POST   | `/auth/logout` | —                                   | Clears cookie             |
| GET    | `/health`      | —                                   | `{ ok: true }`            |

## Wiring to the frontend

In `src/components/editor/auth.ts`, set:

```ts
export const AUTH_SERVER_URL = "http://localhost:8787";
```

The client will then POST the Google `credential` to `/auth/google` instead of decoding it locally. Make sure the frontend uses `credentials: "include"` on fetch (already done in `auth.ts`).

## Production notes

- Set `COOKIE_SECURE=true` and serve over HTTPS.
- If frontend and API are on different domains, set `COOKIE_SAMESITE=none` and `COOKIE_SECURE=true`.
- Set `CLIENT_ORIGIN` to your real frontend origin (no trailing slash).
