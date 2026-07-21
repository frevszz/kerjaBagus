"use client";

import JobCard from "@/app/components/jobCard";
import { getJobs } from "@/services/jobs.service";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { getCompanyInitials } from "../utils/company";
import { formatSalaryRange } from "../utils/salary";
import { Loading } from "../components/loading";
import { JobListItem } from "@/models/job";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { RiArrowLeftLine } from "@remixicon/react";

export default function JobsPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const province = searchParams.get("province") || "";
  const city = searchParams.get("city") || "";
  const location = searchParams.get("location") || "";
  const router = useRouter();

  const [jobs, setJobs] = useState<JobListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function loadJobs() {
      setLoading(true);

      try {
        const { data } = await getJobs({
          search: search || undefined,
          province: province || undefined,
          city: city || undefined,
          location: (location as "ONSITE" | "REMOTE" | "HYBRID") || undefined,
          limit: 12,
        });

        if (isActive) {
          setJobs(data);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadJobs();

    return () => {
      isActive = false;
    };
  }, [search, province, city, location]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto py-10 flex-row w-max">
      {/* BUTTON BACK */}
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center font-semibold text-lg gap-1 hover:underline cursor-pointer"
      >
        <RiArrowLeftLine size={20} />
        Kembali
      </button>

      {/* CONTENT */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {jobs.length} Lowongan Tersedia
        </h1>
        <p className="mt-2 text-gray-500">
          Temukan pekerjaan yang sesuai dengan keahlianmu.
        </p>
      </div>

      {/* JOB CARD */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 flex-wrap">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            logoText={getCompanyInitials(job.company)}
            logoColor={faker.color.rgb()}
            title={job.title}
            company={job.company}
            province={
              job.address?.province
                ? `${job.address.city}, ${job.address.province}`
                : job.address?.city || "Lokasi tidak tersedia"
            }
            tags={job.tags}
            salaryRange={formatSalaryRange(job.budgetMin, job.budgetMax)}
            verified={job.isVerified}
          />
        ))}
      </div>
    </div>
  );
}
