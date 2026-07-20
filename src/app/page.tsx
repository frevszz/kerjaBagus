"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import "./page.css";
import JobCard from "@/app/components/jobCard";
import { jobs } from "@/app/jobs/data";

const WILAYAH_OPTIONS = [
  "Aceh",
  "Sumatera Utara",
  "Sumatera Barat",
  "Riau",
  "Kepulauan Riau",
  "Jambi",
  "Sumatera Selatan",
  "Bangka Belitung",
  "Bengkulu",
  "Lampung",
  "DKI Jakarta",
  "Jawa Barat",
  "Jawa Tengah",
  "DI Yogyakarta",
  "Jawa Timur",
  "Banten",
  "Bali",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Kalimantan Barat",
  "Kalimantan Tengah",
  "Kalimantan Selatan",
  "Kalimantan Timur",
  "Kalimantan Utara",
  "Sulawesi Utara",
  "Sulawesi Tengah",
  "Sulawesi Selatan",
  "Sulawesi Tenggara",
  "Gorontalo",
  "Sulawesi Barat",
  "Maluku",
  "Maluku Utara",
  "Papua",
  "Papua Barat",
  "Papua Barat Daya",
  "Papua Tengah",
  "Papua Pegunungan",
  "Papua Selatan",
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [wilayah, setWilayah] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  // handle click diluar search bar
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const featuredJobs = jobs.slice(0, 4);

  return (
    <main className="flex flex-col font-sans">
      {/* HERO SECTION */}
      <section className="hero-section-container">
        <div className="hero-section-content">
          <h2 className="text-6xl font-bold">Temukan proyek dan lowongan</h2>
          <h2 className="text-6xl font-bold text-[#344F1F]">
            yang cocok untuk keahlianmu!
          </h2>

          <p className="mt-5 text-xl text-gray-600">
            Ribuan lowongan kerja harian dan bulanan terpercaya siap buat kamu
            lamar sekarang.
          </p>

          {/* SEARCH BAR */}
          <div className="flex justify-center mt-5">
            <div className="relative w-full max-w-3xl" ref={wrapperRef}>
              <form className="flex items-center rounded-md bg-white/90 shadow-lg pl-6 pr-1.5 py-4 w-full">
                {/* KATA KUNCI */}
                <div className="flex flex-col flex-1 min-w-0">
                  <input
                    type="search"
                    placeholder="UI/UX Designer, Content Writer..."
                    className="bg-transparent text-sm font-medium outline-none w-full placeholder:text-gray-500"
                  />
                </div>

                <div className="h-8 w-px bg-gray-200 mx-4 shrink-0" />
                {/* FILTER WILAYAH */}
                <div className="flex flex-col flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                    className="bg-transparent text-sm font-medium outline-none w-full text-left text-gray-500"
                  >
                    {wilayah || "Lokasi"}
                  </button>
                </div>
              </form>

              {/*  LIST */}
              {open && (
                <div className="absolute left-0 right-0 mt-2 bg-white rounded-md shadow-lg border border-gray-100 max-h-72 overflow-y-auto z-50">
                  {WILAYAH_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setWilayah(option);
                        setOpen(false);
                      }}
                      className="block w-full text-left px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* JOB SECTION */}
      <section className="cta-container flex flex-col">
        <div className="cta-content mt-20">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Lowongan Terbaru
          </h2>

          {/* JOB CARD */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredJobs.map((job) => (
              
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
