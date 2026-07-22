import { RemixiconComponentType } from "@remixicon/react";
import {
  RiMenuSearchLine,
  RiPaletteLine,
  RiRestaurantLine,
  RiTruckLine,
  RiCustomerServiceLine,
  RiSettings2Line,
} from "@remixicon/react";

interface Category {
  title: string;
  icon: RemixiconComponentType;
  description?: string;
}

const categories: Category[] = [
  {
    title: "Desain & Konten Sosial Media",
    icon: RiPaletteLine,
    description:
      "Bantu toko atau UMKM bikin logo, foto produk, spanduk, hingga video reels/TikTok menarik.",
  },
  {
    title: "Admin & Customer Service",
    icon: RiCustomerServiceLine,
    description:
      "Kelola rekap penjualan, balasan chat WhatsApp toko, hingga input stok barang online.",
  },
  {
    title: "Teknis & Jasa Perbaikan",
    icon: RiSettings2Line,
    description:
      "Jasa servis AC, kelistrikan, cat rumah/toko, las, hingga perbaikan perabotan.",
  },
  {
    title: "Kuliner & Staf Resto/Kafe",
    icon: RiRestaurantLine,
    description:
      "Barista, asisten dapur, waiters harian, hingga tenaga pembantu untuk event & catering",
  },
  {
    title: "Logistik & Tenaga Lepas",
    icon: RiTruckLine,
    description:
      "Kurir antar barang toko lokal, driver harian, hingga tenaga bantuan bongkar muat stok.",
  },
  {
    title: "Project & Jasa Lainnya",
    icon: RiMenuSearchLine,
    description:
      "Bantu toko atau UMKM dengan project khusus, seperti jasa foto produk, desain kemasan, hingga jasa penulisan artikel.",
  },
];

function CategoryCard({ title, icon: Icon, description }: Category) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 h-70 gap-2 shadow-sm border border-gray-100 transition-transform transform hover:-translate-y-1 cursor-pointer flex flex-col items-center justify-center text-center">
      <div className="w-17 h-17 flex border border-[#F6D39E] items-center justify-center rounded-lg bg-white">
        <Icon size={22} className="text-[#344F1F]" />
      </div>

      <h3 className="text-black font-semibold text-2xl">{title}</h3>

      <p className="text-lg text-gray-500">{description}</p>
    </div>
  );
}

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {categories.map((cat) => (
        <CategoryCard key={cat.title} {...cat} />
      ))}
    </div>
  );
}
