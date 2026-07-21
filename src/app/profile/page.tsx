"use client";

import React, { useEffect, useState } from "react";
import { RiEditLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { logout, me } from "@/services/auth.service";
import { RiArrowLeftLine } from "@remixicon/react";

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    title: "Belum diatur",
    location: "Belum diatur",
    skills: [] as string[],
  });

  useEffect(() => {
    async function loadUser() {
      try {
        const { user } = await me();

        setUserData((prev) => ({
          ...prev,
          name: user.email,
          email: user.email,
        }));
      } catch (error) {
        console.error(error);

        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [router]);

  const handleLogoutButton = async () => {
    await logout();
    router.push("/login");
    router.refresh();
  };

  const getInitials = (name: string) => {
    if (!name) return "UB";

    const parts = name.trim().split(" ");

    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }

    return parts[0].substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Memuat profil...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F0] px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* BUTTON BACK */}
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center font-semibold text-lg gap-1 hover:underline cursor-pointer"
        >
          <RiArrowLeftLine size={20} />
          Kembali
        </button>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-[#D8E6D3] text-[#386641] flex items-center justify-center font-bold text-2xl border border-[#386641]/20">
              {getInitials(userData.name)}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {userData.name || "Nama Pengguna"}
              </h1>

              <p className="text-md text-gray-500">{userData.title}</p>

              <p className="text-sm text-gray-400 mt-1">
                📍 {userData.location} • ✉️ {userData.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => alert("Fitur Edit Profil bisa kamu buka di sini!")}
            className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
          >
            <RiEditLine size={16} />
            Edit Profil
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              Keahlian (Skills)
            </h3>

            {userData.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {userData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-xs px-3 py-1 rounded-full text-gray-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-md text-gray-400 italic">
                Belum ada keahlian ditambahkan.
              </p>
            )}
          </div>

          <div className="md:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              Riwayat Lamaran Saya
            </h3>

            <p className="text-md text-gray-400 italic">
              Belum ada lamaran kerja.
            </p>
          </div>
        </div>
        <button
          className="cursor-pointer bg-red-500 w-30 h-10 rounded-xl text-white text-xl font-bold shadow-sm hover:scale-101 transition-all"
          onClick={handleLogoutButton}
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
}
