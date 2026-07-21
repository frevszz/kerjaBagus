"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RiArrowLeftLine, RiEyeLine, RiEyeOffLine } from "@remixicon/react";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.password.length >= 8 &&
    formData.password === formData.confirmPassword;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // Simpan data user ke LocalStorage
      const userData = {
        name: formData.name,
        email: formData.email,
        role: "Freelancer", // default role kosongan
        bio: "-",
        location: "-",
        skills: [],
      };
      localStorage.setItem("user_kerjabagus", JSON.stringify(userData));
      
      // Trigger event agar Navbar langsung ter-update
      window.dispatchEvent(new Event("userUpdated"));

      // Pindah ke halaman profile
      router.push("/profile");
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

      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg border border-gray-100">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 hover:underline text-xs text-[#386641] mb-4 cursor-pointer"
        >
          <RiArrowLeftLine size={15} />
          Kembali
        </button>

        <h2 className="text-center text-xl font-bold text-gray-800">
          Buat Akun
        </h2>
        <p className="text-center text-sm text-gray-500 mb-5">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-[#386641] font-semibold hover:underline">
            Sign in
          </Link>
        </p>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama Lengkap*"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#386641] focus:outline-none transition"
              required
            />
          </div>

          <div className="flex gap-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email*"
              className="w-1/2 rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#386641] focus:outline-none transition"
              required
            />
            <div className="w-1/2">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nomor Ponsel*"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#386641] focus:outline-none transition"
                required
              />
              <span className="text-[10px] text-gray-400 mt-1 block px-1">
                Nomor terhubung dengan WhatsApp.
              </span>
            </div>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#386641] focus:outline-none transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              {showPassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Konfirmasi Password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#386641] focus:outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full rounded-lg py-3 text-sm font-semibold transition mt-4 ${
              isFormValid
                ? "bg-[#386641] text-white cursor-pointer hover:bg-[#2d5234]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Lanjutkan
          </button>
        </form>
      </div>
    </div>
  );
}