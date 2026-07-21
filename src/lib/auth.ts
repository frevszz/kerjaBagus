import { cookies } from "next/headers";
import { verifyAccessToken } from "./jwt";
import { prisma } from "./prisma";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = await verifyAccessToken(token);
    const userId = payload.payload.sub;

    if (!userId) {
      return null;
    }

    return prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    });
  } catch {
    return null;
  }
}