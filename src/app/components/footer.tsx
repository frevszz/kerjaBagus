import Image from "next/image";
import Link from "next/link";
import {
  RiInstagramLine,
  RiLinkedinBoxLine,
  RiTiktokLine,
} from "@remixicon/react";

export default function Footer() {
  const freelancerLinks = [
    { href: "/jobs", label: "Cari Lowongan" },
    { href: "/saved", label: "Tersimpan" },
  ];

  const clientLinks = [{ href: "/jobs/create", label: "Post Pekerjaan" }];

  const companyLinks = [
    { href: "/", label: "Tentang Kami" },
    { href: "/help", label: "Bantuan" },
  ];

  const legalLinks = [
    { href: "/help", label: "Syarat & Ketentuan" },
    { href: "/help", label: "Kebijakan Privasi" },
  ];

  return (
    <footer className="bg-[#344F1F] text-white">
      <div className="mx-auto w-full px-4 md:px-15 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {/* LOGO */}
          <div className="col-span-2 flex flex-col gap-4">
            <div className="relative w-36 h-9">
              <Image
                src="/logo/kerjabagus_icon_white.svg"
                alt="Kerjabagus logo"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
            <p className="text-md md:text-lg text-white/70 leading-relaxed max-w-md">
              Menghubungkan Pekerja dan Client terpercaya, mulai kerja sama
              hanya dalam hitungan menit.
            </p>
            <div className="flex items-center gap-3 mt-1">
              <Link
                href="/"
                aria-label="Instagram"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-orange-500 transition-colors"
              >
                <RiInstagramLine size={20} />
              </Link>
              <Link
                href="/"
                aria-label="LinkedIn"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-orange-500 transition-colors"
              >
                <RiLinkedinBoxLine size={20} />
              </Link>
              <Link
                href="/"
                aria-label="TikTok"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-orange-500 transition-colors"
              >
                <RiTiktokLine size={20} />
              </Link>
            </div>
          </div>

          {/* FREELANCE */}
          <div>
            <h3 className="text-xl md:text-xl font-bold text-orange-400 mb-4 tracking-wide">
              Untuk Freelancer
            </h3>
            <ul className="flex flex-col gap-3">
              {freelancerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-md md:text-lg text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CLIENTS */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-orange-400 mb-4 tracking-wide">
              Untuk Client
            </h3>
            <ul className="flex flex-col gap-3">
              {clientLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-md md:text-lg text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* UMKM */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-orange-400 mb-4 tracking-wide">
              Perusahaan
            </h3>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-md md:text-lg text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-md text-white/60">
            &copy; 2026 KerjaBagus. All rights reserved.
          </p>
          <ul className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-md text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
