// lib/auth.js
// JWT token utilities for admin authentication

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";
const JWT_EXPIRES = "24h";

export function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

export function getTokenFromRequest(request) {
  // Try cookie first
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [key, ...val] = c.trim().split("=");
      return [key, val.join("=")];
    })
  );
  
  if (cookies["admin_token"]) {
    return cookies["admin_token"];
  }

  // Fallback to Authorization header
  const authHeader = request.headers.get("authorization") || "";
  if (authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  return null;
}

export function isAuthenticated(request) {
  const token = getTokenFromRequest(request);
  if (!token) return false;
  const decoded = verifyToken(token);
  return decoded !== null && decoded.role === "admin";
}
