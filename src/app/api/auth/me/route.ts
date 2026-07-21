import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  return Response.json({ user });
}

// export async function GET() {
//   try {
//     const cookieStore = await cookies();

//     const token = cookieStore.get("access_token")?.value;

//     if (!token) {
//       return Response.json(
//         {
//           message: "Unauthorized",
//         },
//         {
//           status: 401,
//         }
//       );
//     }

//     const payload = await verifyAccessToken(token);

//     const userId = payload.payload.sub;

//     if (!userId) {
//       return Response.json(
//         {
//           message: "Unauthorized",
//         },
//         {
//           status: 401,
//         }
//       );
//     }

//     const user = await prisma.user.findUnique({
//       where: {
//         id: userId,
//       },
//       include: {
//         profile: true,
//       },
//     });

//     if (!user) {
//       return Response.json(
//         {
//           message: "User tidak ditemukan",
//         },
//         {
//           status: 404,
//         }
//       );
//     }

//     return Response.json({
//       user: {
//         id: user.id,
//         email: user.email,
//         isAdmin: user.isAdmin,
//         isClient: user.isClient,
//         isFreelancer: user.isFreelancer,
//         profile: user.profile,
//       },
//     });
//   } catch {
//     return Response.json(
//       {
//         message: "Unauthorized",
//       },
//       {
//         status: 401,
//       }
//     );
//   }
// }