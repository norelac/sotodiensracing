# 🏛️ DEWI JATENG

> **Platform transparansi finansial kas desa wisata dan pelaporan layanan publik berbasis bukti fisik (*Proof-of-Fix*) di Jawa Tengah. Menjamin akuntabilitas dana desa secara terbuka serta menyediakan kanal pengaduan warga dan wisatawan dengan pelacakan berbatas waktu (*Closed-Loop SLA Tracking*).**

Dikembangkan oleh Tim **sotodiensracing** (Universitas Dian Nuswantoro) untuk kompetisi nasional **Web In Action (WIA) 2026 / Multimedia In Action (MIA) 2026**.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14/15 (React, TypeScript)
- **Styling:** Tailwind CSS, Shadcn UI / Lucide React
- **Peta & Geolokasi:** Leaflet.js (GIS Interaktif & Pinpoint Koordinat Aduan)

### Backend
- **Framework:** Laravel 11.x (PHP 8.2+) RESTful API Architecture
- **Database:** PostgreSQL / MySQL (Relasional Multi-Entitas)
- **Storage:** S3 / Local Storage (Arsip Bukti Kuitansi & Foto Fisik Lapangan)
- **API Standard:** JSON:API / RESTful Endpoints

---

## 🚀 Cara Menjalankan Project (Clone => Install => Run)

### 1. Clone Repository
```bash
git clone https://github.com/norelac/sotodiensracing.git
cd sotodiensracing
```

### 2. Setup Backend (Laravel API)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve
```
> Backend berjalan di: `http://localhost:8000`

### 3. Setup Frontend (Next.js)
```bash
cd ../frontend
npm install
cp .env.example .env.local
npm run dev
```
> Frontend berjalan di: `http://localhost:3000`

---

## 📊 Progress Saat Ini (Berdasarkan Sitemap Sistem)

- [x] **1.0 Beranda (100%):**
  - [x] 1.1 Ringkasan Finansial dan Status PADes/APBDes
  - [x] 1.2 Form Cepat Aduan Publik
  - [x] 1.3 Feed Pembuktian Proof-of-Fix (Sebelum vs Sesudah)
- [x] **2.0 Transparansi Dana (90%):**
  - [x] 2.1 Filter Wilayah Multi-Level (Kabupaten & Desa)
  - [x] 2.2 Visualisasi Alokasi Sumber Dana (Grafik APBDes & PADes)
  - [x] 2.3 Bar Serapan dan Saldo Belanja Kas Desa
  - [x] 2.4 Laporan Terbuka dengan Bukti Nota & Kuitansi Riil
- [x] **3.0 Lapor Aduan (85%):**
  - [x] 3.1 Form Detail Pengaduan (Fasilitas Rusak & Pungli)
  - [x] 3.2 Pinpoint Peta Geolokasi Interaktif (Leaflet.js)
  - [x] 3.3 Unggah Bukti Foto dan Video Kondisi Nyata
  - [x] 3.4 Pelacakan Status SLA Countdown (24 Jam Pungli / 7 Hari Fisik)
- [x] **4.0 Edukasi dan Panduan (80%):**
  - [x] 4.1 Panduan Hak Keterbukaan Informasi Publik
  - [x] 4.2 Alur Standar Operasional Penanganan Aduan (SOP)
- [x] **5.0 Portal Pengelola (75%):**
  - [x] 5.1 Verifikasi Nota dan Kuitansi Pengeluaran Kas
  - [x] 5.2 Disposisi Tiket Aduan dan Unggah Foto Bukti Fisik Perbaikan

---

## 👥 Tim Pengembang (sotodiensracing - Universitas Dian Nuswantoro)
1. **Muhammad Ilham Maulana** — Backend Developer
2. **Muhammad Iqbal Junialdi** — Frontend Developer
3. **Delvia Mareta Dealova** — UI/UX Designer
