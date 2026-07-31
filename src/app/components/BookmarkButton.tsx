"use client";

import React, { useState, useEffect } from "react";
import { RiBookmarkLine, RiBookmarkFill } from "@remixicon/react";
import { isJobSaved, toggleSaveJob } from "@/app/utils/savedJobs";

type Props = {
  job: {
    id: string;
    title: string;
    company: string;
    province: string;
    tags: string[];
    salaryRange: string;
    whatsapp?: string | null;
    verified?: boolean;
    logoText?: string;
  };
};

export default function BookmarkButton({ job }: Props) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isJobSaved(job.id));
  }, [job.id]);

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();

    const isSavedNow = toggleSaveJob({
      id: job.id,
      logoText: job.logoText || job.company.charAt(0).toUpperCase(),
      title: job.title,
      company: job.company,
      province: job.province,
      tags: job.tags,
      salaryRange: job.salaryRange,
      whatsapp: job.whatsapp,
      verified: job.verified,
    });

    setSaved(isSavedNow);
  };

  return (
    <button
      type="button"
      onClick={handleBookmark}
      title={saved ? "Hapus dari tersimpan" : "Simpan pekerjaan"}
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.01] ${
        saved
          ? "border-[#386641]/30 bg-green-50 text-[#386641]"
          : "border-gray-200 text-gray-500 hover:bg-gray-50"
      }`}
    >
      {saved ? (
        <RiBookmarkFill size={20} className="text-[#386641]" />
      ) : (
        <RiBookmarkLine size={20} />
      )}
    </button>
  );
}