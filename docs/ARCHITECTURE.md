# 🏗️ ARCHITECTURE.md — Arsitektur Sistem Terpadu: DEWI JATENG

> **Platform Terpadu Transparansi Anggaran Kas Desa Wisata, Pengawasan Fasilitas Publik, dan Mitigasi Risiko Kepatuhan di Jawa Tengah**  
> **Kompetisi:** Web In Action (WIA) 2026 / Multimedia In Action (MIA) 2026, UPN "Veteran" Jakarta  
> **Tim Pengembang:** Tim sotodiensracing — Universitas Dian Nuswantoro (UDINUS), Semarang  
> - **Lead Backend & System Architecture:** Muhammad Ilham Maulana (*Hacker*)  
> - **Lead Frontend & System Analyst:** Muhammad Iqbal Junialdi (*Hustler*)  
> - **Lead UI/UX & Product Designer:** Delvia Mareta Dealova (*Hipster*)

---

## 🏛️ 1. Ikhtisar Arsitektur & Prinsip Desain

Arsitektur DEWI JATENG dirancang untuk memecahkan dilema mendasar sistem tata kelola desa:
1. **Performa Ekstrem di Jaringan Pedesaan (Astro Islands):** Menggunakan *Astro 4+ Islands Architecture* dengan 0 KB initial JavaScript. Komponen HTML dikirim murni secara statis, dan hidrasi React (`client:visible`, `client:load`) hanya terjadi pada elemen interaktif. Skor Google Lighthouse ditargetkan 95–100 pada jaringan seluler pedesaan Jawa Tengah.
2. **Akuntabilitas Fiskal Real-Time (PostgreSQL + PostGIS):** Setiap rupiah anggaran Bantuan Keuangan (Bankeu) Provinsi, APBDes, dan PADes dicatat dalam buku kas terbuka (*Cashbook*) dengan bukti kuitansi fisik dan validasi geolokasi.
3. **Mekanisme Closed-Loop Civic Reporting:** Setiap aduan warga/wisatawan terikat dengan koordinat GPS presisi radius <500 meter, countdown timer SLA otomatis (24 Jam Pungli / 7 Hari Fasilitas), dan tidak dapat ditutup (*Resolved*) tanpa bukti foto perbaikan (*Proof-of-Fix*).

---

## 🧩 2. C4 Architecture Model

### Level 1: System Context Diagram

```text
┌────────────────────────────────────────────────────────────────────────┐
│                          Aktor Pengguna                                │
│  ┌─────────────────────────┐              ┌─────────────────────────┐  │
│  │   Wisatawan & Warga     │              │    Pengelola Pokdarwis  │  │
│  │   (Tanpa Login/Publik)  │              │    & Pemerintah Desa    │  │
│  └────────────┬────────────┘              └────────────┬────────────┘  │
└───────────────┼────────────────────────────────────────┼───────────────┘
                │ Akses Transparansi,                    │ Input Nota Kasir,
                │ Submit Laporan GPS                     │ Eksekusi Tiket Proof-of-Fix
                ▼                                        ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        DEWI JATENG PLATFORM                            │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  Astro 4+ Hybrid Engine (Static HTML + React Dynamic Islands)    │  │
│  │  - Halaman Beranda (KPI Counters, Pin Map GPS, Before-After)     │  │
│  │  - Halaman Transparansi (Donut Chart, Serapan 70%, Nota Kuitansi)│  │
│  │  - Halaman Lapor (Geolokasi, Dropzone Bukti, Tiket Otomatis)     │  │
│  │  - Halaman Edukasi (Regulasi KIP, Klasifikasi Desa Wisata)       │  │
│  │  - Halaman Pengelola (Papan Tiket SLA, Input Belanja)            │  │
│  └──────────────────────────────────┬───────────────────────────────┘  │
└─────────────────────────────────────┼──────────────────────────────────┘
                                      │
       ┌──────────────────────────────┼──────────────────────────────┐
       ▼                              ▼                              ▼
┌───────────────┐              ┌───────────────┐              ┌───────────────┐
│ PostgreSQL 16 │              │  PostGIS 3.4  │              │   AI Engine   │
│ & Supabase RLS│              │  Geofencing   │              │ OCR & EXIF    │
│ (Buku Kas &   │              │  (Radius <500m│              │ (Audit Nota & │
│ Tiket Aduan)  │              │   Validasi)   │              │ Foto Perbaikan│
└───────────────┘              └───────────────┘              └───────────────┘
```

---

## ⚡ 3. Astro 4+ Islands & Hydration Strategy

| Halaman & Rute | Tipe Rendering | Komponen Island (React 18) | Direktif Hidrasi | Alasan Teknis |
| :--- | :--- | :--- | :--- | :--- |
| **Beranda (`/`)** | Static + Dynamic Islands | `HomeKpiCounters.tsx` | `client:visible` | Animasi counter angka dimulai saat digulir ke viewport pengunjung. |
| **Beranda (`/`)** | Static + Dynamic Islands | `HomeReportForm.tsx` | `client:load` | Interaksi form laporan aduan dan pin peta Jateng siap segera saat halaman selesai dimuat. |
| **Beranda (`/`)** | Static + Dynamic Islands | `HomeReportFeed.tsx` | `client:visible` | Drag slider komparasi Before/After dan modal foto dihidrasi saat terlihat. |
| **Transparansi (`/transparansi`)** | Static Layout + SSR Data | Native SVG Donut & Table | HTML Murni (0 KB JS) | Ringan, grafik SVG rendered server-side, modal foto murni CSS/JS minimal. |
| **Lapor (`/lapor`)** | Static Shell + Client Island| `ReportFormMotion.tsx` | `client:load` | Membutuhkan akses sensor geolokasi browser dan dropzone interaktif. |
| **Edukasi (`/edukasi`)** | 100% Static HTML | Tidak ada JS eksternal | Tanpa Hidrasi (0 KB JS) | Artikel edukasi regulasi UU KIP dan SOP K3 dapat dibaca instan. |
| **Pengelola (`/pengelola`)** | SSR / Protected Client | `PengelolaTicketBoard.tsx` | `client:load` | Papan kanban tiket aduan dan filter urgensi SLA dinamis. |

---

## 🗄️ 4. Skema Basis Data (PostgreSQL 16 & PostGIS)

### Diagram Relasi Entitas (ERD)

```text
┌──────────────────────┐         1:N         ┌──────────────────────┐
│       villages       ├────────────────────►│    village_budgets   │
│  id (UUID PK)        │                     │  id (UUID PK)        │
│  name (VARCHAR)      │                     │  village_id (FK)     │
│  regency (VARCHAR)   │                     │  fiscal_year (INT)   │
│  geom (GEOMETRY Point│                     │  bankeu_prov (BIGINT)│
│  trust_score (NUMERIC│                     │  apbdes (BIGINT)     │
└──────────┬───────────┘                     │  pades (BIGINT)      │
           │                                 └──────────────────────┘
           │ 1:N
           ├────────────────────────────────►┌──────────────────────┐
           │                                 │   cashbook_entries   │
           │                                 │  id (UUID PK)        │
           │                                 │  village_id (FK)     │
           │                                 │  amount (BIGINT)     │
           │                                 │  receipt_url (TEXT)  │
           │                                 │  ocr_status (VARCHAR)│
           │                                 └──────────────────────┘
           │
           │ 1:N
           └────────────────────────────────►┌──────────────────────┐
                                             │       reports        │
                                             │  id (UUID PK)        │
                                             │  ticket_code (UNIQUE)│
                                             │  category (VARCHAR)  │
                                             │  sla_deadline (TS)   │
                                             │  status (VARCHAR)    │
                                             └──────────┬───────────┘
                                                        │ 1:1
                                                        ▼
                                             ┌──────────────────────┐
                                             │    proof_of_fixes    │
                                             │  id (UUID PK)        │
                                             │  report_id (FK)      │
                                             │  after_photo_url     │
                                             │  verified_at (TS)    │
                                             └──────────────────────┘
```

### Kueri Spasial PostGIS Kunci:
```sql
-- Validasi aduan berada di dalam radius desa wisata (<500 meter)
SELECT v.name, v.regency
FROM villages v
WHERE ST_DWithin(
  v.geom::geography,
  ST_SetSRID(ST_MakePoint(:lng, :lat), 4321)::geography,
  500
);
```

---

## 🔌 5. Kontrak Data & Astro API Endpoints (`src/pages/api/...ts`)

1. **`GET /api/villages/stats`:** Mengembalikan metrik makro Jawa Tengah (776 desa wisata, realisasi Bankeu Rp83,1 M, tingkat SLA 94,2%).
2. **`GET /api/transparansi?villageId=...`:** Mengembalikan rincian anggaran, persentase serapan (70%), dan daftar buku kas belanja beserta tautan nota.
3. **`POST /api/reports`:** Endpoint submit aduan publik (menghasilkan kode tiket `DS-JTG-2026-XXXX` dan menentukan batas SLA otomatis: 24 Jam Pungli / 7 Hari Fasilitas).
4. **`POST /api/pengelola/resolve-report`:** Endpoint penutupan tiket aduan yang memvalidasi keberadaan foto *After* (*Proof-of-Fix*).

---

## 🛡️ 6. Keamanan, Tata Kelola & Whistleblower Privacy

1. **Whistleblower Anonymity:** Pelapor dapat mencentang opsi *"Lapor secara Anonim"*. Identitas, nama, dan kontak pelapor tidak disimpan dalam database publik; hanya data laporan, foto bukti, dan koordinat insiden yang dipublikasikan.
2. **Row-Level Security (Supabase RLS):**
   - Akses tabel `villages`, `reports`, dan `cashbook_entries` bersifat `SELECT` publik untuk menjamin transparansi 100%.
   - Mutasi data (`INSERT`, `UPDATE`) pada buku kas dan penutupan tiket dibatasi hanya untuk pengguna terautentikasi pengelola desa terkait.
3. **Integritas Bukti Foto:** Foto kuitansi dan foto fisik perbaikan disimpan di Supabase Storage dengan metadata hash anti-manipulasi.
