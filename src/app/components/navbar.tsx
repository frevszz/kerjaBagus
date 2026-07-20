"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 flex items-center bg-white justify-between px-15 py-4 shadow-md">
      <div id="logo">
        <Image
          src="/logo/kerjabagus_icon.svg"
          alt="Kerjabagus logo"
          width={32}
          height={32}
          className="h-8 w-auto"
        />
      </div>
      <ul id="nav-links" className="flex gap-7">
        <li className="py-4 md:py-0">
          <a href="" className="hover:font-semibold text-xl">
            Beranda
          </a>
        </li>
        <li className="py-4 md:py-0">
          <a href="" className="hover:font-semibold text-xl">
            Profil
          </a>
        </li>
        <li className="py-4 md:py-0">
          <a href="" className="hover:font-semibold text-xl">
            Lowongan
          </a>
        </li>
        <li className="py-4 md:py-0">
          <a href="" className="hover:font-semibold text-xl">
            CV Generator
          </a>
        </li>
        <li className="py-4 md:py-0">
          <a href="" className="hover:font-semibold text-xl">
            Panduan
          </a>
        </li>
      </ul>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="text-[#F4991A] border border-[#F4991A] py-2 px-9 rounded-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-103 cursor-pointer"
        >
          Masuk
        </Link>

        <Link
          href="/register"
          className="bg-[#F4991A] text-white py-2 px-9 rounded-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-103 cursor-pointer"
        >
          Daftar
        </Link>
      </div>
    </nav>
  );
}
