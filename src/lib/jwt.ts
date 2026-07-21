import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SUPER_SECRET_KEY!
);

export async function signAccessToken(userId: string) {
  return await new SignJWT({})
    .setSubject(userId)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyAccessToken(token: string) {
  return jwtVerify(token, secret);
}