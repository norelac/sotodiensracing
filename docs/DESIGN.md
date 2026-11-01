# 🎨 DESIGN.md — Design System & UI/UX Guidelines: DEWI JATENG

> **Platform Terpadu Transparansi Anggaran Kas Desa Wisata, Pengawasan Fasilitas Publik, dan Mitigasi Risiko Kepatuhan di Jawa Tengah**  
> **Kompetisi:** Web In Action (WIA) 2026 / Multimedia In Action (MIA) 2026, UPN "Veteran" Jakarta  
> **Figma Source:** [Figma Canvas MBG — Node 82:3](https://www.figma.com/design/D5iJU5yMqtgWZsni1KsVpc/MBG?node-id=82-3)  
> **Lead Frontend:** Muhammad Iqbal Junialdi (*Hustler & Frontend Developer, Tim sotodiensracing UDINUS*)  
> **Lead UI/UX:** Delvia Mareta Dealova (*Hipster & Product Designer*)

---

## 🏛️ 1. Filosofi Desain & Karakter Visual

1. **Government-Grade Clean & Transparent:** Tampilan kredibel, bersih, dan akuntabel sesuai standar keterbukaan informasi publik Pemerintah Provinsi Jawa Tengah, tanpa kesan kaku atau birokratis.
2. **0 KB Default JavaScript (Astro Islands):** Layout dasar dan konten teks dirender sebagai HTML murni. JavaScript hanya dimuat pada komponen interaktif yang membutuhkan hidrasi (`client:load`, `client:visible`).
3. **Smooth Micro-Interactions (Framer Motion):** Transisi viewport-triggered counter, slider geser Sebelum-Sesudah, interaksi pin peta GPS, serta modal inspeksi nota kuitansi dirancang halus dengan spring physics.
4. **Fidelity 1:1 terhadap Figma MBG:** Struktur layout, dimensi kartu, palet warna, tipografi, dan elemen visual mengikuti rancangan Figma yang telah disetujui.

---

## 🎨 2. Design Tokens (Figma MBG Exact Palette)

### A. Palet Warna (Color Palette)

| Token Name | Hex Code | Tailwind Equivalent / Usage | Keterangan & Penggunaan |
| :--- | :--- | :--- | :--- |
| **Primary Navy** | `#0D2453` | `text-[#0D2453]` / `bg-[#0D2453]` | Judul utama, teks bacaan primer, teks navbar, ring donat APBDes 60%, background footer |
| **Action Accent / Warning** | `#EA4335` | `bg-[#EA4335]` / `text-[#EA4335]` | Tombol aksi utama/urgent, pin aktif peta, alert bahaya fasilitas K3, indikator urgensi SLA |
| **Page Canvas** | `#F7F9FC` | `bg-[#F7F9FC]` | Latar belakang keseluruhan halaman web (soft blue-gray canvas) |
| **Card Surface** | `#FFFFFF` | `bg-white` | Kontainer kartu, form panel, baris tabel, dan modal |
| **Border Neutral** | `#EBEBEB` | `border-[#EBEBEB]` | Garis pembatas kartu, separator antar section, divider tabel |
| **Input Surface** | `#F5F5F5` | `bg-[#F5F5F5]` | Input field, dropdown select, dan background form control |
| **Muted Text** | `#767676` | `text-[#767676]` | Teks sekunder, label pembantu, timestamp, dan teks status netral |
| **Brand Accent Blue** | `#3B82F6` | `text-[#3B82F6]` / `bg-[#3B82F6]` | Donut segment Bantuan Provinsi (25%), link hover, indikator peta |
| **Light Blue Accent** | `#93C5FD` / `#DCE7F5` | `bg-[#93C5FD]` / `bg-[#DCE7F5]` | Donut segment PADes (15%), progress bar track, header tabel |
| **Status Selesai (Green)**| `#E6FFFA` (bg) / `#319795` (text) | `bg-[#E6FFFA] text-[#319795]` | Badge status laporan *"Selesai"* dengan border `#B2F5EA` |
| **Supporting Yellow** | `#FBBC05` | `bg-[#FBBC05]` / `text-[#FBBC05]` | Bintang/rating, penanda warning sedang diproses |

### B. Tipografi (Typography)

| Role | Font Family | Tailwind Classes | Contoh Penggunaan |
| :--- | :--- | :--- | :--- |
| **Primary Body & Headings** | `Plus Jakarta Sans`, `Inter`, sans-serif | `font-sans text-[#0D2453]` | Navbar, isi tabel, kartu KPI, form aduan |
| **Headline Display** | `Plus Jakarta Sans`, sans-serif | `text-4xl sm:text-5xl lg:text-6xl font-extrabold` | Judul hero *"Dari Laporan, Menjadi Perbaikan"* |
| **KPI Numbers** | `Plus Jakarta Sans`, sans-serif | `text-2xl sm:text-3xl font-extrabold text-[#0D2453]` | `Rp 185 Miliar`, `889`, `94,2%`, `< 24 Jam` |
| **Section Headings** | `Plus Jakarta Sans`, sans-serif | `text-xl sm:text-2xl font-bold text-[#0D2453]` | *"Transparansi Dana Desa"*, *"Buat Laporan"* |
| **Metadata & Labels** | `Inter`, sans-serif | `text-xs text-[#767676] font-medium` | Timestamp laporan, keterangan nota, pagination |

### C. Sistem Spasi 8px (8px Base Grid)

- **xs (4px):** Gap inline ketat, badge margin
- **sm (8px):** Spasi antar elemen kecil, gap icon dengan teks
- **md (16px):** Padding internal tombol, gap kolom kompak
- **lg (24px):** Padding kartu, gutter antar kolom section
- **xl (32px):** Jarak antar section besar dalam halaman

### D. Border Radius

- **sm (4px):** Tag kecil, chip ringkas
- **md (8px):** Tombol standar, input form, baris tabel
- **lg (16px):** Panel konten, kartu KPI, kontainer form
- **xl/3xl (24px):** Hero banner, kartu modul utama
- **full (9999px):** Tombol pill CTA, avatar, status badge

### E. Elevasi & Bayangan (Shadows)

- **sm:** Tombol, chips, subtle overlay
- **DEFAULT / md:** Kartu konten, dropdown menu, kartu melayang standar
- **lg / 2xl:** Modal dialog, lightbox pratinjau nota kuitansi, popup konfirmasi tiket

---

## 🔘 3. Spesifikasi Status Komponen Interaktif

### A. Buttons
* **Primary (Accent)**: `#EA4335` fill, `#FFFFFF` text, border none, radius `8px` / `rounded-full`.
  * *Hover*: `#D33C30` fill.
  * *Focus*: `#EA4335` fill, 3px ring `#EA43351F`.
  * *Disabled*: `#EA4335` fill, 40% opacity.
* **Primary Navy**: `#0D2453` fill, `#FFFFFF` text, radius `rounded-full`.
  * *Hover*: `#132D66` fill.
  * *Focus*: 3px ring `#0D245320`.
* **Secondary**: Transparent fill, `#0D2453` text, 1px `#EBEBEB` border, radius `8px`.
  * *Hover*: `#0D24530A` fill.
  * *Focus*: 1px `#EA4335` border, 3px ring `#EA43351F`.
  * *Disabled*: `#767676` text, 40% opacity.
* **Ghost**: Transparent fill, `#767676` text, no border.
  * *Hover*: `#0D245306` fill, `#0D2453` text.
  * *Focus*: 3px ring `#EA43351F`.

### B. Form Inputs
* **Default**: `#FFFFFF` fill, 1px `#EBEBEB` border, text `#0D2453`, radius `8px` - `12px`.
* **Hover**: 1px `#C1C1C1` border.
* **Focus**: 1px `#3B82F6` atau `#EA4335` border, 3px ring semi-transparan.
* **Error**: 1px `#EF4444` border, 3px ring `#EF44441F`.
* **Disabled**: `#F5F5F5` fill, text `#767676`, 40% opacity.

### C. Cards & Containers
* **Default Card**: `#FFFFFF` fill, 1px `#EBEBEB` border, radius `16px` (`rounded-2xl`).
* **Elevated Card**: `#FFFFFF` fill, soft elevation `shadow-xs`, radius `16px`.
* **Large Section**: `#FFFFFF` fill, border `#EBEBEB`, radius `24px` (`rounded-3xl`).

---

## 🧩 4. Inventaris Komponen (Component Inventory)

### A. Layout Global
1. **Floating Navbar (`Navbar.astro`):**
   - Kartu melayang putih (`bg-white rounded-2xl border border-[#EBEBEB] shadow-sm`).
   - Logo perisai emas-hijau + branding `DEWI JATENG`.
   - Menu: *Beranda*, *Transparansi Dana*, *Lapor*, *Edukasi & Panduan*.
   - Aksi: Tombol `+ Buat Laporan` (solid navy `#0D2453`) & tombol `Masuk` (pill border).
2. **Footer 4-Kolom (`Footer.astro`):**
   - Dark Navy background (`#0D2453`) dengan teks putih dan slate-300.
   - Kolom 1: Profil Pemprov Jateng & kontak resmi.
   - Kolom 2: Navigasi cepat.
   - Kolom 3: Layanan publik.
   - Kolom 4: Media sosial resmi.
   - Baris bawah: Hak cipta 2024–2026 Pemprov Jateng + link legalitas.

### B. Halaman Beranda (`src/pages/index.astro`)
1. **Hero Banner:** Lanskap sawah berundak pegunungan, vignette gelap, judul display *"Dari Laporan, Menjadi Perbaikan"*, dual CTA pill.
2. **Animated KPI Counters (`HomeKpiCounters.tsx`):**
   - `Rp 185 Miliar` — Total Dana Desa
   - `889` — Desa Wisata
   - `94,2%` — Tingkat Penyelesaian Laporan
   - `< 24 Jam` — Rata-rata Respon oleh Dinas
   - Didukung animasi counter `useInView` dari 0 ke target angka.
3. **Form Aduan Interaktif (`HomeReportForm.tsx`):**
   - Dropdown judul aduan umum.
   - Input alamat sinkron otomatis dengan klik pin pada peta visual Jawa Tengah.
   - Peta visual Jateng dengan pin interaktif (Desa Candirejo, Limpakuwus, Getas, Berjo, Dieng Kulon).
   - Dropzone unggah foto/video bukti dengan chips nama file.
   - Checkbox laporan anonim / privat.
   - Modal konfirmasi dengan nomor tiket unik otomatis (`DS-JTG-2026-XXXX`).
4. **Feed Laporan & Catatan Desa (`HomeReportFeed.tsx`):**
   - Filter pills kategori (Semua, Akses & Jalan, Fasilitas & Sanitasi).
   - Mode ganda: Tampilan berdampingan (*Side-by-side*) atau slider geser (*Before/After drag slider*).
   - Lightbox modal untuk perbesaran foto resolusi tinggi.
   - Kartu Catatan Dari Desa dengan linimasa pendanaan dan tautan transparansi terkait.

### C. Halaman Transparansi Dana (`src/pages/transparansi.astro`)
1. **Filter Bar Card:** Dropdown bertingkat (Kabupaten Magelang, Desa Candirejo, Tahun Anggaran 2026) + tombol Tampilkan navy.
2. **Banner Desa Candirejo:** Navy card dengan info lokasi dan **Total Pendanaan: Rp 1.200.000.000**.
3. **Donut Chart Sumber Pendanaan:**
   - SVG native ring tanpa pustaka eksternal (`stroke-dasharray` circumference 389.56).
   - Komposisi: APBDes 60% (Rp 720 jt), Bantuan Provinsi 25% (Rp 300 jt), PADes Wisata 15% (Rp 180 jt).
   - Teks tengah: `Rp 1,2 Miliar`.
4. **Card Dana Terpakai:** Indikator persentase besar **70%**, bar progres serapan, serta ringkasan dana terpakai (Rp 840 jt) vs sisa saldo kas (Rp 360 jt).
5. **Tabel Laporan Pengeluaran:**
   - Header tabel soft blue (`#DCE7F5`).
   - 4 baris data belanja riil (jalur pejalan kaki, area parkir, kebersihan, pemeliharaan toilet).
   - Thumbnail ganda pada tiap baris: box `NOTA KUITANSI` + foto fisik fasilitas dengan link perbesaran `↗`.
   - Footer tabel total pengeluaran `840.000.000 (70%)`.
   - Bar navigasi halaman dengan nomor aktif `12` bergaris bawah biru.

---

## ⚡ 5. Spesifikasi Animasi Framer Motion

```typescript
// Konfigurasi Spring Physics Standar
export const springSmooth = {
  type: "spring",
  stiffness: 260,
  damping: 24
};

// Modal Fade & Zoom
export const modalMotion = {
  initial: { opacity: 0, scale: 0.94 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.2 } }
};
```

---

## 📋 6. Prinsip Desain: Do's and Don'ts

1. **Do** gunakan `#EA4335` khusus penekanan interaktif darurat / alert / urgensi SLA.
2. **Do** pertahankan latar belakang halaman seragam dengan canvas `#F7F9FC`.
3. **Do** pertahankan keterbacaan tinggi dengan teks utama `#0D2453` dan label `#767676`.
4. **Do** jaga ritme spasi berbasis kelipatan 8px (`4px`, `8px`, `16px`, `24px`, `32px`).
5. **Don't** menambah warna aksen baru tanpa pemetaan token semantik.
6. **Don't** mencampur gaya bayangan (shadow) atau border acak di luar aturan tokens.
7. **Don't** menggunakan gradient dekoratif berlebih yang mengurangi kesan kredibel institusi pemerintah.
