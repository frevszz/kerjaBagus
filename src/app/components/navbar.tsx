"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiAddLine } from "@remixicon/react";
import { getUsernameInitials } from "../utils/user";
import { me } from "@/services/auth.service";
import { User } from "@/generated/prisma/client";
import { getUser } from "@/services/user.service";
import { GetUserResponse } from "@/models/user";

export default function Navbar() {
  const [user, setUser] = useState<GetUserResponse | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await me();
        const userData = await getUser(data.user.id)
        setUser(userData);
      } catch {
        setUser(null);
      }
    }

    loadUser();
  }, []);

  return (
    <nav className="sticky top-0 z-50 h-20 flex items-center justify-between px-15 backdrop-blur-lg bg-white/20">
      <div className="relative h-32 w-32">
        <Link href="/">
          <Image
            src="/logo/kerjabagus_icon.svg"
            alt="Kerjabagus logo"
            fill
            priority
            className="object-contain"
          />
        </Link>
      </div>

      <ul id="nav-links" className="flex gap-7">
        <li className="py-4 md:py-0">
          <Link href="/" className="hover:font-semibold text-xl">Beranda</Link>
        </li>
        <li className="py-4 md:py-0">
          <Link href="/profile" className="hover:font-semibold text-xl">Profil</Link>
        </li>
        <li className="py-4 md:py-0">
          <Link href="/jobs" className="hover:font-semibold text-xl">Lowongan</Link>
        </li>
        <li className="py-4 md:py-0">
          <Link href="/cv-generator" className="hover:font-semibold text-xl">CV Generator</Link>
        </li>
        <li className="py-4 md:py-0">
          <Link href="#" className="hover:font-semibold text-xl">Panduan</Link>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        {/* KONDISI NAVBAR: BILA SUDAH LOGIN VS BELUM LOGIN */}
        {user ? (
          <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#F6D39E] bg-[#FBF6F0]/80 hover:bg-[#FBF6F0] transition"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E2D2B4] text-xs font-bold text-[#386641]">
              {getUsernameInitials(user.profile?.displayName ?? "")}
            </div>
            <span className="text-sm font-semibold text-[#386641] max-w-[120px] truncate">
              {user.profile?.displayName ?? ""}
            </span>
          </Link>
        ) : (
          <Link
            href="/login"
            className="text-[#77746E] border border-[#F6D39E] bg-[#FBF6F0] py-2 px-9 rounded-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-103 cursor-pointer"
          >
            Masuk
          </Link>
        )}

        <Link
          href="/jobs/create"
          className="bg-[#F4991A] text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-103 cursor-pointer"
        >
          <RiAddLine size={20} className="inline mr-2" />
          Post Pekerjaan
        </Link>
      </div>
    </nav>
  );
}