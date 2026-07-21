"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiAddLine } from "@remixicon/react";

export default function Navbar() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const loadUser = () => {
    const savedUser = localStorage.getItem("user_kerjabagus");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
    window.addEventListener("userUpdated", loadUser);
    return () => window.removeEventListener("userUpdated", loadUser);
  }, []);

  // Fungsi membuat inisial nama (misal: "Rian Ardiansyah" -> "RA")
  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

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
              {getInitials(user.name)}
            </div>
            <span className="text-sm font-semibold text-[#386641] max-w-[120px] truncate">
              {user.name}
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