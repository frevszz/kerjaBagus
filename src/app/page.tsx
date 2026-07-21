"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./page.css";
import JobCard from "@/app/components/jobCard";
import { Job } from "@/generated/prisma/client";
import { getJobs } from "@/services/jobs.service";
import { getCompanyInitials } from "./utils/company";
import { formatSalaryRange } from "./utils/salary";
import { faker } from "@faker-js/faker";
import { RiSearchLine, RiArrowDropDownFill } from "@remixicon/react";
import { PROVINCES } from "@/lib/constant";

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

  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);

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
          <h2 className="text-5xl md:text-6xl font-bold">
            Temukan proyek dan lowongan
          </h2>
          <h2 className="text-5xl md:text-6xl font-bold text-[#344F1F]">
            yang cocok untuk keahlianmu!
          </h2>

          <p className="mt-5 text-lg md:text-xl text-gray-600">
            Ribuan lowongan kerja harian dan bulanan terpercaya siap buat kamu
            lamar sekarang.
          </p>

          {/* SEARCH BAR */}
          <div className="flex justify-center mt-5">
            <div className="relative w-full max-w-3xl" ref={wrapperRef}>
              <form
                onSubmit={handleSearch}
                className="flex items-center rounded-md bg-white/90 shadow-lg pl-6 pr-1.5 py-2 md:py-4 w-full"
              >
                {/* KATA KUNCI */}
                <div className="flex flex-1 min-w-0">
                  <RiSearchLine className="text-gray-400 w-5 h-5 md:w-7 md:h-7 shrink-0" />
                  <input
                    type="search"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="UI/UX Designer, Content Writer..."
                    className="bg-transparent ml-4 text-sm font-medium outline-none w-full placeholder:text-gray-500"
                  />
                </div>

                <div className="h-8 w-px bg-gray-200 mx-4 shrink-0" />
                {/* FILTER WILAYAH */}
                <div className="flex flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                    className="bg-transparent flex items-center text-sm ml-3 font-medium outline-none cursor-pointer w-full text-left text-gray-500"
                  >
                    <RiArrowDropDownFill className="mr-3 shrink-0" />
                    <span className="truncate">{wilayah || "Lokasi"}</span>
                  </button>
                </div>

                <button
                  type="submit"
                  className="mr-3 shrink-0 rounded-md bg-[#F4991A] px-6 py-2 text-sm font-medium text-white hover:bg-[#F4991A]/80"
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

      {/* JOB SECTION */}
      <section className="cta-container flex flex-col">
        <div className="cta-content mt-20">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Lowongan Terbaru
          </h2>

          {/* JOB CARD */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 flex-wrap">
            {featuredJobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                logoText={getCompanyInitials(job.company)}
                logoColor={faker.color.rgb()}
                title={job.title}
                company={job.company}
                tags={job.tags}
                salaryRange={formatSalaryRange(job.budgetMin, job.budgetMax)}
                verified={job.isVerified}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
