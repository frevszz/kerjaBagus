export type Job = {
  id: string;
  logoText: string;
  logoColor: string;
  title: string;
  company: string;
  tags: string[];
  salaryRange: string;
};

export const jobs: Job[] = [
  {
    id: "1",
    logoText: "TN",
    logoColor: "#344F1F",
    title: "UI/UX Designer",
    company: "PT Teknologi Nusantara",
    tags: ["Remote", "Penuh Waktu", "1-3 Tahun"],
    salaryRange: "Rp8jt-Rp12jt",
  },
  {
    id: "2",
    logoText: "KS",
    logoColor: "#2563eb",
    title: "Content Writer",
    company: "Kreatif Studio Jogja",
    tags: ["Yogyakarta", "Penuh Waktu", "Fresh Graduate"],
    salaryRange: "Rp4jt-Rp6jt",
  },
  {
    id: "3",
    logoText: "FG",
    logoColor: "#2563eb",
    title: "Fotografer",
    company: "Foto Studio Jogja",
    tags: ["Ngawi", "Paruh Waktu", "Fotografi"],
    salaryRange: "Rp500K-Rp1jt",
  },
];
