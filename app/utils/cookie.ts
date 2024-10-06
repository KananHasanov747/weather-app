import { createCookie } from "@remix-run/node";

// Creates a cookie for storing JWT tokens
export const authCookie = createCookie("auth-token", {
  maxAge: Number(process.env.REFRESH_TOKEN_LIFETIME), // Token expires in 1 day
  httpOnly: true, // Secures cookie, not accessible via JavaScript
  secure: process.env.NODE_ENV === "production", // Only secure in production
  sameSite: "lax", // Prevents CSRF
});
