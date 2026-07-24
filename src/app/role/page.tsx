"use client";

import { useState } from "react";
import { Briefcase, UserCheck, CheckCircle2, ArrowRight, Check } from "lucide-react";

export default function SelectRolePage() {
  const [selectedRole, setSelectedRole] = useState<"CLIENT" | "FREELANCER">("FREELANCER");

  const handleContinue = () => {
    console.log("Role terpilih:", selectedRole);
    
    if (selectedRole === "CLIENT") {
      alert("Role dipilih: Pemberi Kerja (Client). Menunggu Admin Dep Cuy");
    } else {
      alert("Role dipilih: Pencari Kerja (Pekerja Jasa). Menunggu Admin Dep Cuy");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center px-4 pt-8 pb-20">
      {/* Header */}
      <div className="text-center max-w-xl mb-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-900 mt-1">
          Pilih Peran Kamu
        </h1>

        <p className="text-base text-gray-600 mt-2">
          Pilih bagaimana kamu ingin menggunakan KerjaBagus. Kamu bisa menyesuaikannya kapan saja.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        
        {/* Card 1: Client / Employer */}
        <div
          onClick={() => setSelectedRole("CLIENT")}
          className={`relative cursor-pointer rounded-2xl p-8 border-2 transition-all duration-200 bg-white shadow-sm hover:shadow-md ${
            selectedRole === "CLIENT"
              ? "border-amber-500 ring-2 ring-amber-500/20"
              : "border-gray-200 hover:border-amber-300"
          }`}
        >
          {selectedRole === "CLIENT" && (
            <CheckCircle2 className="absolute top-5 right-5 w-7 h-7 text-amber-500" />
          )}
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-5">
            <Briefcase className="w-7 h-7" />
          </div>
          
          {/* Header Card */}
          <h3 className="text-xl font-bold text-gray-900">Pemberi Kerja (Client)</h3>
          
          {/* Deskripsi */}
          <p className="text-base text-gray-500 mt-2 mb-3 leading-relaxed">
            Saya ingin mencari pekerja dan pasang lowongan kerjaan.
          </p>
          
          <ul className="text-sm text-gray-600 space-y-2 border-t border-gray-100 pt-3">
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Pasang lowongan kerja harian / borongan</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Cari pekerja terdekat lokasi</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Kelola pelamar & hubungi langsung</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Hemat waktu merekrut pekerja harian secara instan</span>
            </li>
          </ul>
        </div>

        {/* Card 2: Freelancer / Worker (Pekerja) */}
        <div
          onClick={() => setSelectedRole("FREELANCER")}
          className={`relative cursor-pointer rounded-2xl p-8 border-2 transition-all duration-200 bg-white shadow-sm hover:shadow-md ${
            selectedRole === "FREELANCER"
              ? "border-amber-500 ring-2 ring-amber-500/20"
              : "border-gray-200 hover:border-amber-300"
          }`}
        >
          {selectedRole === "FREELANCER" && (
            <CheckCircle2 className="absolute top-5 right-5 w-7 h-7 text-amber-500" />
          )}
          <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-5">
            <UserCheck className="w-7 h-7" />
          </div>

          {/* Header Card */}
          <h3 className="text-xl font-bold text-gray-900">Pencari Kerja (Pekerja/Jasa)</h3>

          {/* Deskripsi */}
          <p className="text-base text-gray-500 mt-2 mb-3 leading-relaxed">
            Saya ingin mencari lowongan kerjaan dan terima panggilan jasa.
          </p>

          <ul className="text-sm text-gray-600 space-y-2 border-t border-gray-100 pt-3">
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Cari & lamar kerjaan terdekat</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Status "Siap Kerja Hari Ini"</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Tampilkan Lencana Keahlian & Rating</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Bekerja fleksibel sesuai jam & hari yang kamu mau</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Button Lanjutkan */}
      <button
        onClick={handleContinue}
        className="mt-8 max-w-4xl w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer text-base"
      >
        <span>Lanjutkan Sebagai {selectedRole === "CLIENT" ? "Pemberi Kerja" : "Pencari Kerja"}</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}