"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RiArrowLeftLine } from "@remixicon/react";
import { login } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await login({
        email,
        password,
      });

      localStorage.setItem(
        "kerjabagus_access_token",
        res.accessToken
      );

      router.push("/profile");
    } catch (err) {
      setError("Email atau password salah.");
      console.error(err)
    } finally {
      setLoading(false);
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
            {/* {" "} */}
            Bantuan
          </a>
        </div>

        <h2 className="text-xl font-bold text-gray-800">Login</h2>
        <p className="text-xs text-gray-400 mb-6">
          Temukan karir impianmu disini.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {
            error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
                {error}
              </div>
            )
          }
          <div>
            <input
              type="email"
              value={email}
              placeholder="Masukkan alamat Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#386641] focus:outline-none transition"
              required
            />
            {/* <input
              type="email"
              placeholder="Masukkan alamat Email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#386641] focus:outline-none transition"
            /> */}
            <span className="text-[10px] text-gray-400 mt-1 block px-1">
              Contoh: email@karir.com
            </span>
            <input
              type="password"
              value={password}
              placeholder="Masukkan Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#386641] focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#F4991A] py-3 text-sm font-semibold text-white transition cursor-pointer"
          >
            {loading ? "Masuk..." : "Masuk"}
          </button>

          {/* <button
            type="button"
            className="w-full rounded-lg bg-gray-100 py-3 text-sm font-semibold text-gray-400 cursor-not-allowed transition"
          >
            Lanjutkan
          </button> */}

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