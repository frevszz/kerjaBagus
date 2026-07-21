"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RiArrowLeftLine } from "@remixicon/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // 1. Ambil data user yang pernah register dari localStorage
    const savedUser = localStorage.getItem("user_kerjabagus");

    if (!savedUser) {
      setErrorMsg("Belum ada akun terdaftar. Silakan buat akun dulu!");
      return;
    }

    const userData = JSON.parse(savedUser);

    // 2. Cek apakah email yang diketik sama dengan email terdaftar
    if (userData.email === email) {
      // Trigger event agar Navbar otomatis berubah jadi avatar profil
      window.dispatchEvent(new Event("userUpdated"));
      
      // Berhasil login -> Masuk ke Profile
      router.push("/profile");
    } else {
      // Email beda / tidak ditemukan
      setErrorMsg("Email tidak terdaftar! Gunakan email saat Register.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#FAF8F0] via-[#FAF8F0] to-[#E2E8DD] px-4 pt-30 pb-16">
      <div className="mb-6 text-center flex flex-col items-center justify-center">
        <Link href="/" className="flex flex-col items-center gap-2">
          <Image
            src="/logo/kerjabagus_icon.svg"
            alt="KerjaBagus Logo"
            width={140}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
      </div>

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-6 text-xs text-[#386641] font-medium">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <RiArrowLeftLine size={15} />
            Kembali
          </button>
          <a href="#" className="flex items-center gap-1 hover:underline">
            Bantuan
          </a>
        </div>

        <h2 className="text-xl font-bold text-gray-800">Login</h2>
        <p className="text-xs text-gray-400 mb-6">
          Temukan karir impianmu disini.
        </p>

        {/* Pesan Error Jika Email Salah */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
            {errorMsg}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan alamat Email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#386641] focus:outline-none transition"
              required
            />
            <span className="text-[10px] text-gray-400 mt-1 block px-1">
              Contoh: email@karir.com
            </span>
          </div>

          <button
            type="submit"
            disabled={!email}
            className={`w-full rounded-lg py-3 text-sm font-semibold transition ${
              email
                ? "bg-[#386641] text-white cursor-pointer hover:bg-[#2d5234]"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Lanjutkan
          </button>

          <div className="text-center pt-2">
            <Link
              href="/register"
              className="text-xs font-semibold text-[#386641] hover:underline"
            >
              Buat Akun
            </Link>
          </div>
        </form>

        <div className="relative my-6 text-center">
          <hr className="border-gray-200" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-gray-400">
            atau masuk dengan
          </span>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => router.push("/profile")}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#386641] px-4 py-2.5 text-sm font-semibold text-[#386641] bg-white hover:bg-gray-50 transition cursor-pointer"
          >
            <span className="font-bold text-red-500">G</span> Masuk dengan Google
          </button>
          <button
            type="button"
            onClick={() => router.push("/profile")}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#386641] px-4 py-2.5 text-sm font-semibold text-[#386641] bg-white hover:bg-gray-50 transition cursor-pointer"
          >
            <span className="font-bold text-blue-700">f</span> Masuk dengan Facebook
          </button>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
          Apakah Anda HR?{" "}
          <Link href="/jobs/create" className="text-[#386641] font-semibold hover:underline">
            Buka Lowongan di KerjaBagus.com
          </Link>
        </div>
      </div>
    </div>
  );
}