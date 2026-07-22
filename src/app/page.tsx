"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./page.css";
import JobCard from "@/app/components/jobCard";
import { getJobs } from "@/services/jobs.service";
import { getCompanyInitials } from "./utils/company";
import { formatSalaryRange } from "./utils/salary";
import { JobListItem } from "@/models/job";
import { faker } from "@faker-js/faker";
import { RiSearchLine, RiArrowDropDownFill } from "@remixicon/react";
import { PROVINCES } from "@/lib/constant";
import CategoryGrid from "@/app/components/CategoryGrid";

export default function Home() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [wilayah, setWilayah] = useState("");
  const [keyword, setKeyword] = useState("");
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("search", keyword.trim());
    if (wilayah) params.set("province", wilayah);
    router.push(`/jobs?${params.toString()}`);
  };

  const [featuredJobs, setFeaturedJobs] = useState<JobListItem[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await getJobs({
        limit: 9,
      });

      setFeaturedJobs(data);
    }

    load();
  }, []);

  return (
    <main className="flex flex-col font-sans">
      {/* HERO SECTION */}
      <section className="hero-section-container h-200 md:h-screen items-center justify-center">
        <div className="hero-section-content">
          <h1 className="text-5xl md:text-[75px] font-bold">
            Temukan proyek dan lowongan
          </h1>
          <h1 className="text-5xl md:text-[75px] font-bold text-[#344F1F]">
            yang cocok untuk keahlianmu!
          </h1>

          <p className="mt-5 text-lg md:text-2xl text-gray-600">
            Ribuan lowongan kerja harian dan bulanan terpercaya siap buat kamu
            lamar sekarang.
          </p>

          {/* SEARCH BAR */}
          <div className="flex justify-center mt-8 px-4">
            <div className="relative w-full max-w-3xl" ref={wrapperRef}>
              <form
                onSubmit={handleSearch}
                className="flex flex-col md:flex-row md:items-center gap-3 md:gap-0 rounded-md bg-white/90 shadow-lg p-3 md:pl-6 md:pr-1.5 md:py-4 w-full"
              >
                {/* KATA KUNCI */}
                <div className="flex items-center flex-1 min-w-0 px-2 md:px-0">
                  <RiSearchLine className="text-gray-400 w-5 h-5 md:w-7 md:h-7 shrink-0" />
                  <input
                    type="search"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="UI/UX Designer, Content Writer..."
                    className="bg-transparent ml-3 md:ml-4 text-sm font-medium outline-none w-full placeholder:text-gray-500"
                  />
                </div>

                <div className="hidden md:block h-8 w-px bg-gray-200 mx-4 shrink-0" />
                <div className="block md:hidden h-px w-full bg-gray-200" />

                {/* FILTER WILAYAH */}
                <div className="flex items-center flex-1 min-w-0 px-2 md:px-0">
                  <button
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                    className="bg-transparent flex items-center text-sm md:ml-3 font-medium outline-none cursor-pointer w-full text-left text-gray-500"
                  >
                    <RiArrowDropDownFill className="mr-3 shrink-0" />
                    <span className="truncate">{wilayah || "Lokasi"}</span>
                  </button>
                </div>

                <button
                  type="submit"
                  className="shrink-0 rounded-md bg-[#F4991A] px-6 py-2.5 md:py-2 mr-4 text-sm font-medium text-white hover:bg-[#F4991A]/80 w-full md:w-auto"
                >
                  Cari
                </button>
              </form>

              {/*  LIST */}
              {open && (
                <div className="absolute left-0 right-0 mt-2 bg-white rounded-md shadow-lg border border-gray-100 max-h-72 overflow-y-auto z-50">
                  <button
                    type="button"
                    onClick={() => {
                      setWilayah("");
                      setOpen(false);
                    }}
                    className="block w-full text-left px-5 py-2.5 text-sm text-gray-500 hover:bg-gray-50 border-b border-gray-100"
                  >
                    Semua Lokasi
                  </button>
                  {PROVINCES.map((option) => (
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

      {/* CATEGORY SECTION */}
      <section className="cta-container flex flex-col items-center">
        <div className="cta-content mb-10">
          <div className="flex w-fit mx-auto py-2 px-6 border border-[#F6D39E] bg-[#FBF6F0] text-black/80 items-center rounded-xl mb-3">
            <h1 className="font-normal text-sm tracking-wide">
              Kategori Pekerjaan
            </h1>
          </div>

          <h2 className="text-4xl max-w-4xl mx-auto font-bold text-[#344F1F] mb-8 text-center">
            Ada Banyak Pilihan Kerjaan yang Pas Buat Keahlianmu
          </h2>

          <CategoryGrid />
        </div>
      </section>

      {/* PANDUAN SECTION */}
      <section className="cta-container bg-[#F4991A] flex flex-col items-center">
        <div className="cta-content mb-10"></div>
      </section>
    </main>
  );
}
