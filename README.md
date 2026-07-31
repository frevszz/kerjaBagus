# KerjaBagus

**KerjaBagus** adalah platform freelance job marketplace yang menghubungkan **client** dengan **freelancer**. Dibangun dengan Next.js App Router, TypeScript, dan PostgreSQL, aplikasi ini memungkinkan pengguna mencari pekerjaan lepas, menyimpan lowongan favorit, dan menghubungi pemberi kerja langsung lewat WhatsApp.

🔗 Live demo: [kerja-bagus.vercel.app](https://kerja-bagus.vercel.app)

> 🏆 Proyek ini dibangun dalam rangka mengikuti kompetisi **Veternity Beraksi 2026**.

## Fitur

- 🔐 **Autentikasi custom** dengan sistem role berbasis boolean (`isClient`, `isFreelancer`, `isAdmin`)
- 💼 **Listing & detail pekerjaan** dengan dynamic routing
- 🔎 **Pencarian & filter job** berdasarkan kategori dan provinsi (34 provinsi Indonesia)
- 💾 **Simpan lowongan** (bookmarks) dengan optimistic UI update
- 📱 **WhatsApp contact integration** dengan normalisasi nomor telepon
- 📂 **Kategori pekerjaan** dalam bentuk grid
- ❓ **FAQ accordion**
- 📱 **Fully responsive**, termasuk sliding mobile navbar drawer
- 🎨 UI dengan brand color hijau (`#344F1F`) dan oranye (`#F4991A`)

## Tech Stack

| Kategori  | Teknologi                                                           |
| --------- | ------------------------------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router)                      |
| Bahasa    | TypeScript                                                          |
| Styling   | Tailwind CSS v4                                                     |
| Database  | PostgreSQL                                                          |
| ORM       | Prisma 7 (`@prisma/client`, `@prisma/adapter-pg`)                   |
| Auth      | Custom (JWT via `jose`, hashing via `bcrypt`)                       |
| Icon      | `@remixicon/react`                                                  |
| Lainnya   | `react-select`, `@faker-js/faker` (seeding), `prisma-erd-generator` |

## Struktur Proyek

```
kerjaBagus/
├── prisma/           # Schema & migrasi database
├── public/           # Aset statis
├── src/
│   ├── app/          # Routes (App Router)
│   ├── components/   # Komponen UI (Navbar, JobCard, FaqItem, dll)
│   ├── contexts/      # AuthContext.tsx (hook useAuth())
│   ├── models/        # Definisi tipe/model data
│   ├── services/       # Layer pemanggilan API (helper api())
│   └── lib/            # Konstanta & utilitas (mis. daftar provinsi)
└── package.json
```

## Getting Started

### 1. Clone repository

```bash
git clone https://github.com/frevszz/kerjaBagus.git
cd kerjaBagus
```

### 2. Install dependencies

```bash
npm i
```

### 3. Setup environment & database

Copy `.example.env` menjadi `.env`, lalu isi variabel `DATABASE_URL` dengan URL PostgreSQL kamu (lokal atau cloud, mis. Prisma Accelerate).

```bash
cp .example.env .env
```

Generate Prisma client:

```bash
npx prisma generate
```

Jika perlu menerapkan schema ke database:

```bash
npx prisma migrate dev
```

### 4. Jalankan development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Scripts

| Command         | Deskripsi                                 |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Menjalankan development server            |
| `npm run build` | Generate Prisma client + build production |
| `npm run start` | Menjalankan production server             |
| `npm run lint`  | Menjalankan ESLint                        |
