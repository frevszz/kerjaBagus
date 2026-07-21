"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiAddLine, RiMenuLine, RiCloseLine } from "@remixicon/react";
import { getUsernameInitials } from "../utils/user";
import { me } from "@/services/auth.service";
import { User } from "@/generated/prisma/client";
import { getUser } from "@/services/user.service";
import { GetUserResponse } from "@/models/user";

export default function Navbar() {
  const [user, setUser] = useState<GetUserResponse | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const loadUser = () => {
    const savedUser = localStorage.getItem("user_kerjabagus");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await me();
        const userData = await getUser(data.user.id);
        setUser(userData);
      } catch {
        setUser(null);
      }
    }

    loadUser();
  }, []);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/jobs", label: "Lowongan" },
    { href: "/", label: "Tersimpan" },
    { href: "/cv-generator", label: "CV Generator" },
    { href: "#", label: "Panduan" },
  ];

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between h-20 px-4 md:px-15 backdrop-blur-lg bg-white/20">
      <div className="relative h-30 w-30 md:h-32 md:w-32 shrink-0">
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

      {/* MENU DESKTOP */}
      <ul id="nav-links" className="hidden lg:flex gap-7">
        {navLinks.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="hover:font-semibold text-xl">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* ACTIONS DESKTOP */}
      <div className="hidden lg:flex items-center gap-4">
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

      {/* HAMBURGER MOBILE */}
      <button
        type="button"
        onClick={() => setMobileOpen((prev) => !prev)}
        className="lg:hidden p-2"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <RiCloseLine size={28} /> : <RiMenuLine size={28} />}
      </button>

      {/* DROPDOWN MOBILE */}
      {mobileOpen && (
        <div className="absolute top-20 left-0 right-0 lg:hidden bg-white shadow-lg border-t border-gray-100 flex flex-col p-4 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-2 px-2 text-base hover:bg-gray-50 rounded"
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t border-gray-100 mt-2 pt-3 flex flex-col gap-2">
            {user ? (
              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-2 rounded-full border border-[#F6D39E] bg-[#FBF6F0]/80"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E2D2B4] text-xs font-bold text-[#386641]">
                  {getUsernameInitials(user.profile?.displayName ?? "")}
                </div>
                <span className="text-sm font-semibold text-[#386641] truncate">
                  {user.profile?.displayName ?? ""}
                </span>
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-center text-[#77746E] border border-[#F6D39E] bg-[#FBF6F0] py-2 px-9 rounded-lg"
              >
                Masuk
              </Link>
            )}

            <Link
              href="/jobs/create"
              onClick={() => setMobileOpen(false)}
              className="bg-[#F4991A] text-white py-2 px-4 rounded-md text-center"
            >
              <RiAddLine size={20} className="inline mr-2" />
              Post Pekerjaan
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
