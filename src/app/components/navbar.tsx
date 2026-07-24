"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiAddLine, RiMenuLine, RiCloseLine } from "@remixicon/react";
import { getUsernameInitials } from "../utils/user";
import { me } from "@/services/auth.service";
import { User } from "@/generated/prisma/client";
import { getUser } from "@/services/users.service";
import { GetUserResponse } from "@/models/user";
import { GetProfileResponse } from "@/models/profile";
import { getProfile } from "@/services/profiles.service";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [userData, setUserData] = useState<GetUserResponse | null>(null);
  const [profileData, setProfileData] = useState<GetProfileResponse | null>(
    null,
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await me();
        const user = await getUser(data.user.id);
        const profile = await getProfile(user.profile.id);
        setUserData(user);
        setProfileData(profile);
      } catch {
        setUserData(null);
        setProfileData(null);
      }
    }

    loadUser();
  }, []);

  // SCROLL HANDLER
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/jobs", label: "Lowongan" },
    { href: "/saved", label: "Tersimpan" },
    { href: "/help", label: "Panduan" },
  ];

  return (
    <>
      <nav
        className={`sticky top-0 z-50 flex items-center justify-between backdrop-blur-lg h-20 px-4 md:px-15 transition-all duration-300 ease-out ${
          mobileOpen
            ? "bg-white shadow-md shadow-black/10"
            : isScrolled
              ? "bg-white/10 shadow-md shadow-black/10"
              : "shadow-none"
        }`}
      >
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
        <ul id="nav-links" className="hidden xl:flex gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`relative text-xl pb-1 transition-colors ${
                    isActive
                      ? "text-[#F4991A] after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-0.5 after:bg-[#F4991A]"
                      : "text-inherit"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ACTIONS DESKTOP */}
        <div className="hidden xl:flex items-center gap-4">
          {userData ? (
            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#F6D39E] bg-[#FBF6F0]/80 hover:bg-[#FBF6F0] transition"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E2D2B4] text-xs font-bold text-[#386641]">
                {getUsernameInitials(profileData?.displayName ?? "")}
              </div>
              <span className="text-sm font-semibold text-[#386641] max-w-30 truncate">
                {profileData?.displayName ?? ""}
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
          className="xl:hidden p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <RiCloseLine size={28} /> : <RiMenuLine size={28} />}
        </button>
      </nav>

      {/* OVERLAY GELAP (opsional, biar fokus ke menu) */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 xl:hidden"
        />
      )}

      {/* MENU MOBILE */}
      <div
        className={`fixed inset-y-20 right-0 z-50 w-[85vw] h-screen max-w-sm xl:hidden bg-white shadow-lg border-l border-gray-100 flex flex-col p-4 gap-4 transform transition-transform duration-300 ease-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-3">
          {userData ? (
            <Link
              href="/profile"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg border border-[#F6D39E] bg-[#FBF6F0]/80"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E2D2B4] text-xs font-bold text-[#386641]">
                {getUsernameInitials(profileData?.displayName ?? "")}
              </div>
              <span className="text-sm font-semibold text-[#386641] truncate">
                {profileData?.displayName ?? ""}
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
        </div>

        <div className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`py-2 px-2 text-base rounded ${
                  isActive
                    ? "bg-[#FBF6F0] text-[#F4991A] font-semibold border-[#F4991A]"
                    : "hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="border-t border-gray-100 pt-3">
          <Link
            href="/jobs/create"
            onClick={() => setMobileOpen(false)}
            className="bg-[#F4991A] text-white py-2 px-4 rounded-md text-center w-full block"
          >
            <RiAddLine size={20} className="inline mr-2" />
            Post Pekerjaan
          </Link>
        </div>
      </div>
    </>
  );
}
