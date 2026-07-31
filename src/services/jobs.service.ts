import { GetJobsParams, GetJobsResponse } from "@/models/job";
import { api } from "./api";

export async function getJobs(params?: GetJobsParams) {
  const query = new URLSearchParams();

  if (params?.page) query.set("page", params.page.toString());
  if (params?.limit) query.set("limit", params.limit.toString());
  if (params?.search) query.set("search", params.search);
  if (params?.city) query.set("city", params.city);
  if (params?.province) query.set("province", params.province);
  if (params?.location) query.set("location", params.location);
  if (params?.minBudget) query.set("minBudget", params.minBudget.toString());
  if (params?.maxBudget) query.set("maxBudget", params.maxBudget.toString());

  if (params?.isOpen !== undefined) {
    query.set("isOpen", String(params.isOpen));
  }

  if (params?.sort) query.set("sort", params.sort);

  return api<GetJobsResponse>(`/api/jobs?${query.toString()}`);
}