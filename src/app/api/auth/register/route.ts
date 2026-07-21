import { signAccessToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      email,
      phone,
      password,
      displayName,
      username,
    } = body;

    // Input validation
    if (!email || !phone || !password || !displayName || !username) {
      return Response.json(
        {
          message: "Semua field wajib diisi.",
        },
        {
          status: 400,
        }
      );
    }

    if (password.length < 8) {
      return Response.json(
        {
          message: "Password minimal 8 karakter.",
        },
        {
          status: 400,
        }
      );
    }

    // Email already registered? 
    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingEmail) {
      return Response.json(
        {
          message: "Email sudah digunakan.",
        },
        {
          status: 409,
        }
      );
    }

    // Phone validation
    const phoneRegex = /^08\d{8,11}$/;

    if (!phoneRegex.test(phone)) {
      return Response.json(
        {
          message:
            "Nomor telepon harus diawali dengan 08 dan terdiri dari 10-13 digit.",
        },
        {
          status: 400,
        }
      );
    }

    // Phone already registered?
    const existingPhone = await prisma.user.findUnique({
      where: {
        phone,
      },
    });

    if (existingPhone) {
      return Response.json(
        {
          message: "Nomor telepon sudah digunakan.",
        },
        {
          status: 409,
        }
      );
    }

    // Username validation
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

    if (!usernameRegex.test(username)) {
      return Response.json(
        {
          message:
            "Username hanya boleh berisi huruf, angka, atau underscore (_) dengan panjang 3-20 karakter.",
        },
        {
          status: 400,
        }
      );
    }

    // Username already taken?
    const existingUsername = await prisma.profile.findUnique({
      where: {
        username,
      },
    });

    if (existingUsername) {
      return Response.json(
        {
          message: "Username sudah digunakan.",
        },
        {
          status: 409,
        }
      );
    }

    // Password Hashing
    const passwordHash = await bcrypt.hash(password, 12);

    // Transaction
    const user = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          phone,
          passwordHash,
        },
      });

      await tx.profile.create({
        data: {
          userId: user.id,

          displayName,
          username,

          headline: "",
        },
      });

      return user;
    });

    const token = await signAccessToken(user.id);
    
      const response = NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin,
          isClient: user.isClient,
          isFreelancer: user.isFreelancer,
        },
      });
    
      response.cookies.set({
        name: "access_token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    
      return response;  
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Terjadi kesalahan pada server.",
      },
      {
        status: 500,
      }
    );
  }
}