import jwt from "jsonwebtoken";

export const generateTokenAndSetCookies = (res, userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};
