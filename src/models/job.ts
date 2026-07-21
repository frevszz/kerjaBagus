import { Job } from "@/generated/prisma/client";

export type JobListItem = Job & {
  address?: {
    city: string | null;
    province: string | null;
  } | null;
};

export interface GetJobsParams {
  /** Page number for pagination (starts from 1). */
  page?: number;

  /** Number of jobs returned per page. */
  limit?: number;

  /** Search keyword for job title, description, or related fields. */
  search?: string;

  /** Filter jobs by city. */
  city?: string;

  /** Filter jobs by province. */
  province?: string;

  /** Filter jobs by work location type. */
  location?: "ONSITE" | "REMOTE" | "HYBRID";

  /** Minimum job budget. */
  minBudget?: number;

  /** Maximum job budget. */
  maxBudget?: number;

  /** Filter only open or closed job listings. */
  isOpen?: boolean;

  /** Sort order for the returned jobs. */
  sort?: "newest" | "oldest" | "budget";
}

export interface GetJobsResponse {
  data: JobListItem[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
