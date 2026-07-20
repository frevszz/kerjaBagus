import { RiBookmarkLine, RiVerifiedBadgeFill } from "@remixicon/react";

type JobCardProps = {
  id: string;
  logoText: string;
  logoColor: string;
  title: string;
  company: string;
  tags: string[];
  salaryRange: string;
  verified?: boolean;
};

export default function JobCard({
  logoText,
  logoColor,
  title,
  company,
  tags,
  salaryRange,
  verified = true,
}: JobCardProps) {
  return (
    <div
      className="bg-white rounded-xl p-5 w-auto md:w-90 shadow-sm border border-gray-100 flex flex-col gap-3 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-103 cursor-pointer"
    >
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div
          className="h-10 w-10 rounded-lg flex items-center justify-center text-white text-sm font-semibold"
          style={{ backgroundColor: logoColor }}
        >
          {logoText}
        </div>

        {verified && (
          <span className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">
            <RiVerifiedBadgeFill size={14} />
            Terverifikasi Aman
          </span>
        )}
      </div>

      {/* TITLE + COMPANY */}
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{company}</p>
      </div>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* GAJI + SIMPAN */}
      <div className="flex items-center justify-between mt-1">
        <div>
          <p className="text-[10px] text-gray-400 tracking-wide">GAJI/BULAN</p>
          <p className="font-semibold text-gray-900 tracking-wider">
            {salaryRange}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="h-9 w-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            <RiBookmarkLine size={16} className="text-gray-500" />
          </button>
          <button
            type="button"
            className="rounded-lg bg-primary text-white text-sm font-semibold px-5 py-2 hover:brightness-110 transition"
          >
            Lamar
          </button>
        </div>
      </div>
    </div>
  );
}
