# DEWI JATENG

Platform terpadu transparansi anggaran kas desa wisata, pengawasan fasilitas publik, dan mitigasi risiko kepatuhan bagi desa wisata di Jawa Tengah. Sistem ini menghubungkan pencatatan anggaran APBDes dan bagi hasil kas desa dengan penanganan pengaduan serta audit fisik partisipatif oleh warga berbasis geolokasi.

Repository ini dikembangkan oleh Tim sotodiensracing (Universitas Dian Nuswantoro) dalam rangka kompetisi Web In Action (WIA) 2026 / Multimedia In Action (MIA) 2026, Universitas Pembangunan Nasional "Veteran" Jakarta.

---

## Tech Stack

### Frontend & Backend (Fullstack)
- Framework: Next.js 14 (App Router, React Server Components, Server Actions, Route Handlers)
- Bahasa: TypeScript / JavaScript
- Styling: Tailwind CSS 3.4
- Komponen & Ikon: Lucide React
- Peta & Geospasial: Leaflet.js & OpenStreetMap

### Basis Data & Penyimpanan
- Database: PostgreSQL (Relational Database Management System)
- Ekstensi Spasial: PostGIS (Kueri Geofencing `ST_DWithin` radius <500 meter)
- Layanan BaaS & Auth: Supabase (PostgreSQL, Row-Level Security, Database Webhooks)
- Penyimpanan Berkas: Supabase Storage (Dokumen APBDes, foto perbaikan, dan kuitansi nota)

### Layanan Kecerdasan Buatan (AI Engine)
- OCR & Receipt Auditor: Vision API untuk ekstraksi data kuitansi toko material dan deteksi markup harga terhadap Standar Satuan Harga (SSH) Pemprov Jateng
- Image Verification: Computer Vision & validasi metadata EXIF (tanggal dan koordinat GPS) untuk verifikasi foto hasil perbaikan
- Voice Transcription: Whisper API untuk konversi rekaman suara aduan darurat menjadi teks
- Decision Support: Dynamic Trust Score Engine (algoritma kepatuhan 0–100 pada Command Center)

---

## Cara Menjalankan Project

### Prasyarat Sistem
- Node.js versi 18.18.0 atau versi 20 LTS ke atas
- Package manager: npm, pnpm, atau yarn
- Akun atau instansi lokal PostgreSQL / Supabase

### Langkah Instalasi

1. Klon repositori ke komputer lokal:
```bash
git clone https://github.com/norelac/dewijateng.git
cd dewijateng
```

2. Pasang dependensi proyek:
```bash
npm install
```

3. Konfigurasi berkas environment:
Salin berkas template lingkungan dan sesuaikan variabel koneksi database serta kunci API:
```bash
cp .env.example .env.local
```

Isi variabel konfigurasi di dalam `.env.local`:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Konfigurasi Supabase / PostgreSQL
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Konfigurasi Basis Data Langsung (Opsional / Migrasi)
DATABASE_URL=postgresql://postgres:password@localhost:5432/dewijateng

# Konfigurasi AI & Vision Service
AI_VISION_API_KEY=your-api-key
```

4. Jalankan migrasi dan seeder basis data:
```bash
npm run db:push
npm run db:seed
```

5. Jalankan server pengembangan lokal:
```bash
npm run dev
```

Aplikasi dapat diakses melalui peramban di `http://localhost:3000`.

---

## Progress Saat Ini

Proyek saat ini berada pada tahap **First Draft Submission (Perancangan Sistem & Setup Awal)**:

- [x] Perancangan arsitektur sistem, skema basis data PostgreSQL, dan spesifikasi fungsional (PRD/BRD)
- [x] Perancangan antarmuka pengguna (UI/UX) dan alur interaksi multi-peran di Figma
- [x] Inisialisasi repositori Git dan penyusunan struktur arsitektur proyek
- [ ] Setup lingkungan kerja Next.js 14 App Router dan konfigurasi Tailwind CSS
- [ ] Implementasi antarmuka publik (katalog desa wisata dan form aduan)
- [ ] Integrasi basis data PostgreSQL & PostGIS serta layanan penyimpanan berkas
- [ ] Implementasi logika bisnis aliran kas desa (PADes) dan pelacakan SLA aduan
- [ ] Pengujian sistem dan integrasi modul verifikasi berbasis AI

---

## Tim Pengembang

Tim sotodiensracing - Universitas Dian Nuswantoro, Semarang:
1. Muhammad Ilham Maulana - Hacker (Lead Fullstack Developer)
2. Delvia Mareta Dealova - Hipster (UI/UX & Product Designer)
3. Muhammad Iqbal Junialdi - Hustler (System Analyst & Project Strategist)
