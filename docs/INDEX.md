# 📚 Dokumentasi Resmi Arsitektur & Spesifikasi: DEWI JATENG

Repository ini menyimpan dokumen spesifikasi produk, kebutuhan bisnis, arsitektur sistem, dan sistem desain untuk platform **DEWI JATENG** (*Tim sotodiensracing UDINUS, Web In Action / MIA 2026*).

---

## 📑 Daftar Berkas Dokumentasi:

1. [**PRD.md**](PRD.md) — *Product Requirements Document v3.0*
   - Spesifikasi teknis produk, Astro 4+ Islands Architecture, React 18, Framer Motion.
   - Sitemap resmi 5 Halaman: Beranda (`/`), Transparansi (`/transparansi`), Lapor (`/lapor`), Edukasi (`/edukasi`), dan Pengelola (`/pengelola`).
   - Kebutuhan fungsional & skenario penerimaan Gherkin.

2. [**BRD.md**](BRD.md) — *Business Requirements Document v3.0*
   - Ringkasan eksekutif tata kelola dan mandat Perda Jateng No. 2/2019.
   - Data empiris Disporapar Jateng 2023: 776 Desa Wisata & Rp87,5 Miliar Bantuan Keuangan (Bankeu).
   - Studi kasus The Geong Limpakuwus & urgensi keselamatan wahana K3.
   - Matriks KPI dan aturan validasi Proof-of-Fix.

3. [**DESIGN.md**](DESIGN.md) — *Design System & UI/UX Guidelines*
   - Design tokens presisi Figma MBG (node `82:3`):
     * Primary Navy `#0D2453`
     * Canvas `#F7F9FC`
     * Surface `#FFFFFF`
     * Border `#EBEBEB`
     * Muted `#767676`
     * Accent Blue `#3B82F6`
     * Status Green `#E6FFFA` & `#319795`
     * Alert Red `#EA4335`
   - Tipografi: *Plus Jakarta Sans*, *Inter*, dan *Playfair Display* (italic serif hero).
   - Inventaris komponen dan spesifikasi animasi Framer Motion spring physics.

4. [**ARCHITECTURE.md**](ARCHITECTURE.md) — *System Architecture Blueprint*
   - Diagram konteks C4 dan arsitektur sistem menyeluruh.
   - Strategi hidrasi Astro Islands (`client:load`, `client:visible`, 0 KB default JS).
   - Skema basis data PostgreSQL 16 & PostGIS 3.4 (kueri geofencing <500 meter).
   - Kontrak REST API / Astro API Endpoints (`src/pages/api/...ts`).
   - Keamanan data, Row-Level Security (RLS), dan proteksi privasi whistleblower.
