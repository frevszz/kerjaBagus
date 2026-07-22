"use client";

import React from "react";

type ApplicationStatus = "pending" | "interview" | "accepted" | "rejected";

type Application = {
  id: string;
  jobTitle: string;
  companyName: string;
  appliedAt: string;
  status: ApplicationStatus;
};

const STATUS_CONFIG: Record<
  ApplicationStatus,
  { label: string; bg: string; text: string; avatarBg: string; avatarText: string }
> = {
  pending: {
    label: "Menunggu review",
    bg: "bg-[#FAEEDA]",
    text: "text-[#854F0B]",
    avatarBg: "bg-[#EFEAF9]",
    avatarText: "text-[#5f4bb0]",
  },
  interview: {
    label: "Wawancara",
    bg: "bg-[#E6F1FB]",
    text: "text-[#0C447C]",
    avatarBg: "bg-[#E6F1FB]",
    avatarText: "text-[#185FA5]",
  },
  accepted: {
    label: "Diterima",
    bg: "bg-[#EAF3DE]",
    text: "text-[#27500A]",
    avatarBg: "bg-[#D8E6D3]",
    avatarText: "text-[#386641]",
  },
  rejected: {
    label: "Ditolak",
    bg: "bg-[#FCEBEB]",
    text: "text-[#791F1F]",
    avatarBg: "bg-[#FCEBEB]",
    avatarText: "text-[#A32D2D]",
  },
};

function getInitials(name: string) {
  if (!name) return "??";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0].substring(0, 2).toUpperCase();
}

// Data dummy, ganti/hapus kalau udah nyambung ke API
const DUMMY_APPLICATIONS: Application[] = [
  {
    id: "1",
    jobTitle: "UI/UX Designer",
    companyName: "Gojek Teknologi",
    appliedAt: "2026-07-12",
    status: "pending",
  },
  {
    id: "2",
    jobTitle: "Frontend Developer",
    companyName: "Tokopedia",
    appliedAt: "2026-07-05",
    status: "interview",
  },
  {
    id: "3",
    jobTitle: "Backend Engineer",
    companyName: "Bank Sinar",
    appliedAt: "2026-06-28",
    status: "accepted",
  },
  {
    id: "4",
    jobTitle: "Data Analyst",
    companyName: "Ruangguru",
    appliedAt: "2026-06-15",
    status: "rejected",
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ApplicationHistoryCard({
  applications = DUMMY_APPLICATIONS,
}: {
  applications?: Application[];
}) {
  return (
    <div className="md:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          Riwayat Lamaran Saya
        </h3>
        <span className="text-xs text-gray-400">
          {applications.length} lamaran
        </span>
      </div>

      {applications.length === 0 ? (
        <p className="text-md text-gray-400 italic">
          Belum ada lamaran kerja.
        </p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {applications.map((app) => {
            const status = STATUS_CONFIG[app.status];

            return (
              <div
                key={app.id}
                className="flex items-center gap-3 border border-gray-100 rounded-xl px-3.5 py-3"
              >
                <div
                  className={`w-10 h-10 rounded-lg ${status.avatarBg} ${status.avatarText} flex items-center justify-center font-semibold text-xs shrink-0`}
                >
                  {getInitials(app.companyName)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {app.jobTitle}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {app.companyName} &middot; Dilamar {formatDate(app.appliedAt)}
                  </p>
                </div>

                <span
                  className={`text-xs font-medium px-2.5 py-1.5 rounded-full whitespace-nowrap ${status.bg} ${status.text}`}
                >
                  {status.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}