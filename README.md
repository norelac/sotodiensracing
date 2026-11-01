# DEWI JATENG

Platform terpadu transparansi anggaran kas desa wisata, pengawasan fasilitas publik, dan mitigasi risiko kepatuhan bagi desa wisata di Jawa Tengah. Sistem ini menghubungkan pencatatan anggaran APBDes dan bagi hasil kas desa dengan penanganan pengaduan serta audit fisik partisipatif oleh warga berbasis geolokasi.

Repository ini dikembangkan oleh Tim sotodiensracing (Universitas Dian Nuswantoro) dalam rangka kompetisi Web In Action (WIA) 2026 / Multimedia In Action (MIA) 2026, Universitas Pembangunan Nasional "Veteran" Jakarta.

---

## Tech Stack

- **Frontend & Island Architecture:** [Astro 4.x](https://astro.build/) & [React 18](https://react.dev/)
- **Bahasa Pemrograman:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Animasi & Interaktivitas:** [Framer Motion](https://www.framer.com/motion/) & [Lucide React](https://lucide.dev/)
- **Peta & Geospasial:** [Leaflet.js](https://leafletjs.com/) & [OpenStreetMap](https://www.openstreetmap.org/) (Interactive pin marker & dynamic geocoding)
- **Basis Data & Layanan Backend:** [Supabase](https://supabase.com/) (PostgreSQL & Storage)

---

## Cara Menjalankan Project

### Prasyarat Sistem
- Node.js versi 18.18.0 atau versi 20 LTS ke atas
- Package manager: `npm`

### Langkah Instalasi

1. **Clone repository:**
   ```bash
   git clone https://github.com/norelac/dewijateng.git
   cd dewijateng
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```

Aplikasi dapat langsung diakses melalui peramban di `http://localhost:4321`.

---

## Progress Saat Ini (First Draft Submission)

Proyek telah menyelesaikan tahap perancangan dokumen, implementasi antarmuka utama (landing page, transparansi kas, dan dashboard pengelola desa), serta interaktivitas peta dan form aduan:

### 1. Desain & Arsitektur Sistem
- [x] Dokumen spesifikasi kebutuhan produk & bisnis ([PRD](docs/PRD.md) & [BRD](docs/BRD.md)).
- [x] Dokumen arsitektur sistem dan skema data ([ARCHITECTURE.md](docs/ARCHITECTURE.md)).
- [x] Perancangan visual UI/UX interaktif berbasis Design System di Figma.

### 2. Beranda & Landing Page (`/`)
- [x] **Hero Section**: Navigasi responsif, logo Pemprov Jateng, tagline, dan call-to-action terpadu.
- [x] **Statistik KPI**: Counter interaktif mencakup desa wisata aktif, serapan anggaran, aduan selesai SLA, dan indeks kepatuhan.
- [x] **Formulir Pelaporan Warga (`HomeReportForm`)**:
  - Peta interaktif Leaflet dengan pin GPS draggable dan klik lokasi.
  - Geocoding alamat pencarian lokasi otomatis.
  - Input judul, deskripsi, dropzone unggah bukti media (foto/video).
  - Opsi pelaporan anonim/privat.
  - Generator modal tiket aduan publik (`DS-JTG-XXXX`).
- [x] **Umpan Tindak Lanjut Aduan (`HomeReportFeed`)**:
  - Filter kategori (*Semua*, *Akses & Jalan*, *Fasilitas & Sanitasi*).
  - Slider interaktif perbandingan visual sebelum vs. sesudah perbaikan (*Proof of Fix*).
  - Catatan desa dan transparansi biaya perbaikan.

### 3. Transparansi Dana Desa (`/transparansi`)
- [x] Ringkasan metrik anggaran (PADes, Dana Desa, CSR, Total Realisasi).
- [x] Visualisasi grafik alokasi anggaran (pembangunan fisik, pemeliharaan, SDM, operasional).
- [x] **Tabel Buku Kas Umum Digital (`CashbookTable`)**: Pencarian transaksi, filter jenis penerimaan/pengeluaran, dan verifikasi status nota/invoice.

### 4. Dashboard Pengelola Desa (`/pengelola`)
- [x] **Papan Pengelolaan Tiket (`PengelolaTicketBoard`)**: Pelacakan tiket aduan dengan tab alur kerja (*Masuk*, *Ditinjau*, *Dikerjakan*, *Selesai*).
- [x] Pemantauan batas waktu SLA penanganan aduan (24–72 jam) dan tindakan eskalasi.

### 5. Rute Navigasi Sementara (`/lapor` & `/edukasi`)
- [x] Navigasi dinonaktifkan sementara di Navbar dengan status terarah ke formulir Beranda (`/#buat-laporan`).

---

## Roadmap Pengembangan Berikutnya
- [ ] Integrasi penuh authentication dan row-level security (RLS) akun pengelola desa BUMDes di Supabase.
- [ ] Otomasi audit nota kuitansi material dengan OCR Standar Satuan Harga (SSH) Pemprov Jateng.
- [ ] Validasi koordinat EXIF gambar perbaikan otomatis oleh sistem.
- [ ] Pengisian modul materi edukasi & pedoman teknis regulasi K3 pariwisata.

---

## Tim Pengembang

**Tim sotodiensracing** - Universitas Dian Nuswantoro, Semarang:
1. **Muhammad Ilham Maulana** - Hacker (Lead Fullstack Developer)
2. **Delvia Mareta Dealova** - Hipster (UI/UX & Product Designer)
3. **Muhammad Iqbal Junialdi** - Hustler (System Analyst & Project Strategist)
