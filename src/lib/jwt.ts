import { SignJWT } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SUPER_SECRET_KEY!
);

export async function generateAccessToken(id: string) {
  return await new SignJWT({
    sub: id,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}