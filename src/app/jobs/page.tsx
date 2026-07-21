"use client";

import JobCard from "@/app/components/jobCard";
import { getJobs } from "@/services/jobs.service";
import { useEffect, useState } from "react";
import { Job } from "@/generated/prisma/client";
import { faker } from "@faker-js/faker";
import { getCompanyInitials } from "../utils/company";
import { formatSalaryRange } from "../utils/salary";
import { Loading } from "../components/loading";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function load() {
  //     // ini ku limit biar ga lag
  //     // mungkin nanti bisa ditambahin page
  //     const { data } = await getJobs({
  //       limit: 12,
  //     });

  //     setJobs(data);
  //   }

  //   load();
  // }, []);

  useEffect(() => {
    async function loadJobs() {
      try {
        const { data } = await getJobs({
          limit: 12,
        });
        setJobs(data);
      } finally {
        setLoading(false);
      }
    }

    if (loading) loadJobs();
  })

  if (loading) {
    return (<Loading />);
  }

  return (
    <div className="mx-auto py-10 flex-row w-max">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {jobs.length} Lowongan Tersedia
        </h1>
        <p className="mt-2 text-gray-500">
          Temukan pekerjaan yang sesuai dengan keahlianmu.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 flex-wrap">
        {jobs.map((job) => (
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
  );
}
