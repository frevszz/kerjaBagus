import { prisma } from "@/lib/prisma";

export async function GET() {
  const jobs = await prisma.job.findMany();
  

  if (!jobs) {
    return Response.json({ message: "Not Found", status: 404 });
  }

  return Response.json(jobs);
}