"use client";

import React, { useEffect, useState } from "react";
import { RiEditLine } from "@remixicon/react";

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    title: "Belum diatur",
    location: "Belum diatur",
    skills: [] as string[],
  });

  useEffect(() => {
    const saved = localStorage.getItem("user_kerjabagus");
    if (saved) {
      const parsed = JSON.parse(saved);
      setUserData((prev) => ({
        ...prev,
        name: parsed.name || "User Baru",
        email: parsed.email || "",
      }));
    }
  }, []);

  const getInitials = (name: string) => {
    if (!name) return "UB";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F0] px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Profil */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-[#D8E6D3] text-[#386641] flex items-center justify-center font-bold text-2xl border border-[#386641]/20">
              {getInitials(userData.name)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {userData.name || "Nama Pengguna"}
              </h1>
              <p className="text-sm text-gray-500">{userData.title}</p>
              <p className="text-xs text-gray-400 mt-1">
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

        {/* Section Keahlian & Riwayat (Kosongan) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Keahlian (Skills)</h3>
            {userData.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {userData.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-xs px-3 py-1 rounded-full text-gray-600">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">Belum ada keahlian ditambahkan.</p>
            )}
          </div>

          <div className="md:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Riwayat Lamaran Saya</h3>
            <p className="text-xs text-gray-400 italic">Belum ada lamaran kerja.</p>
          </div>
        </div>
      </div>
    </div>
  );
}