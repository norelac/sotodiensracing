import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  MapPin,
  ChevronRight,
  SlidersHorizontal,
  Maximize2,
  X,
  Columns
} from 'lucide-react';

interface ReportItem {
  id: string;
  ticketCode: string;
  category: string;
  title: string;
  location: string;
  resolvedTime: string;
  before: {
    photo: string;
    label: string;
    caption: string;
  };
  after: {
    photo: string;
    label: string;
    caption: string;
  };
  timeline: Array<{
    date: string;
    title: string;
    desc: string;
    villageLink: string;
  }>;
}

const REPORT_DATA: ReportItem[] = [
  {
    id: 'rep-1',
    ticketCode: 'DS-JTG-2026-0891',
    category: 'Akses & Jalan',
    title: 'Akses ke curug buruk',
    location: 'Desa Candirejo, Magelang - 12 Okt 2026 - 11.30 WIB',
    resolvedTime: 'Selesai',
    before: {
      photo: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=1000&auto=format&fit=crop&q=80',
      label: 'Sebelum • 1 Ags 2026',
      caption: 'Akses jalan setapak curug berlumpur dan pagar pengaman lapuk',
    },
    after: {
      photo: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?w=1000&auto=format&fit=crop&q=80',
      label: 'Sesudah • 12 Okt 2026',
      caption: 'Jalan setapak telah dirabat beton dan dipasang pagar pengaman besi',
    },
    timeline: [
      {
        date: '20 OKT 2026 • 09.15 WIB',
        title: 'Dukungan pembangunan dipublikasikan',
        desc: 'Bantuan Provinsi Rp 300.000.000 masuk dalam sumber dana tahun 2026.',
        villageLink: 'Desa Wisata Candirejo - Magelang',
      },
      {
        date: '16 OKT 2026 • 16.00 WIB',
        title: 'Pemeliharaan ruas jalan tercatat',
        desc: 'Realisasi Rp 100.000.000 dilengkapi contoh nota dan dokumentasi fisik.',
        villageLink: 'Desa Wisata Candirejo - Magelang',
      },
    ],
  },
  {
    id: 'rep-2',
    ticketCode: 'DS-JTG-2026-0744',
    category: 'Fasilitas & Sanitasi',
    title: 'Wastafel dan toilet kotor sekali',
    location: 'Desa Candirejo, Magelang - 9 Okt 2026 - 11.30 WIB',
    resolvedTime: 'Selesai',
    before: {
      photo: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1000&auto=format&fit=crop&q=80',
      label: 'Sebelum • 6 Okt 2026',
      caption: 'Wastafel mampet berlumut dan kran air toilet tidak mengalir',
    },
    after: {
      photo: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=1000&auto=format&fit=crop&q=80',
      label: 'Sesudah • 9 Okt 2026',
      caption: 'Sanitasi dan kran air diganti baru, higienis dan wangi',
    },
    timeline: [
      {
        date: '20 OKT 2026 • 09.15 WIB',
        title: 'Dukungan pembangunan dipublikasikan',
        desc: 'Bantuan Provinsi Rp 300.000.000 masuk dalam sumber dana tahun 2026.',
        villageLink: 'Desa Wisata Candirejo - Magelang',
      },
      {
        date: '16 OKT 2026 • 16.00 WIB',
        title: 'Pemeliharaan ruas jalan tercatat',
        desc: 'Realisasi Rp 100.000.000 dilengkapi contoh nota dan dokumentasi fisik.',
        villageLink: 'Desa Wisata Candirejo - Magelang',
      },
    ],
  },
];

const CATEGORIES = ['Semua', 'Akses & Jalan', 'Fasilitas & Sanitasi'];

export default function HomeReportFeed() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  // Mode per report: 'split' (side by side Figma default) or 'slider' (interactive draggable before/after)
  const [sliderModes, setSliderModes] = useState<Record<string, boolean>>({});
  const [sliderPos, setSliderPos] = useState<Record<string, number>>({
    'rep-1': 50,
    'rep-2': 50,
  });
  const [lightboxImg, setLightboxImg] = useState<{ url: string; title: string; subtitle: string } | null>(null);

  const filteredReports =
    activeCategory === 'Semua'
      ? REPORT_DATA
      : REPORT_DATA.filter((r) => r.category === activeCategory);

  const toggleSliderMode = (id: string) => {
    setSliderModes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSliderMove = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderPos((prev) => ({ ...prev, [id]: val }));
  };

  return (
    <div className="space-y-6">
      {/* Category Filter Pills & Mode Description */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#0D2453] text-white shadow-xs'
                    : 'bg-white border border-[#EBEBEB] text-[#767676] hover:text-[#0D2453] hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <span className="text-[11px] text-[#767676] font-medium hidden sm:inline">
          Menampilkan {filteredReports.length} laporan tindak lanjut
        </span>
      </div>

      {/* Report Items List */}
      <div className="space-y-6">
        {filteredReports.map((item) => {
          const isSlider = !!sliderModes[item.id];
          const pos = sliderPos[item.id] ?? 50;

          return (
            <div
              key={item.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
            >
              {/* Left Column: Incident Card */}
              <div className="lg:col-span-6 bg-white rounded-2xl border border-[#EBEBEB] p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-[#0D2453] leading-snug">
                        {item.title}
                      </h3>
                      <a
                        href="/lapor"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#0D2453] mt-1 hover:underline group"
                      >
                        <span>{item.ticketCode}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Mode Toggle Button */}
                      <button
                        type="button"
                        onClick={() => toggleSliderMode(item.id)}
                        title={isSlider ? 'Beralih ke tampilan berdampingan' : 'Beralih ke slider geser'}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0D2453] text-[10px] font-bold transition-colors flex items-center gap-1"
                      >
                        {isSlider ? <Columns className="w-3 h-3" /> : <SlidersHorizontal className="w-3 h-3" />}
                        <span className="hidden sm:inline">{isSlider ? 'Side-by-side' : 'Slider'}</span>
                      </button>

                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E6FFFA] text-[#319795] border border-[#B2F5EA] shrink-0">
                        {item.resolvedTime}
                      </span>
                    </div>
                  </div>

                  {/* Photo Display Mode: Split (Figma Default) OR Draggable Slider */}
                  {!isSlider ? (
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      {/* Before Photo */}
                      <div>
                        <div
                          onClick={() =>
                            setLightboxImg({
                              url: item.before.photo,
                              title: `${item.title} (Sebelum)`,
                              subtitle: item.before.label,
                            })
                          }
                          className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative group cursor-pointer"
                        >
                          <img
                            src={item.before.photo}
                            alt="Sebelum Perbaikan"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors flex items-center justify-center">
                            <Maximize2 className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                          </div>
                        </div>
                        <span className="text-[11px] text-[#767676] block mt-1.5 font-medium">
                          {item.before.label}
                        </span>
                      </div>

                      {/* After Photo */}
                      <div>
                        <div
                          onClick={() =>
                            setLightboxImg({
                              url: item.after.photo,
                              title: `${item.title} (Sesudah)`,
                              subtitle: item.after.label,
                            })
                          }
                          className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative group cursor-pointer"
                        >
                          <img
                            src={item.after.photo}
                            alt="Sesudah Perbaikan"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors flex items-center justify-center">
                            <Maximize2 className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                          </div>
                        </div>
                        <span className="text-[11px] text-[#767676] block mt-1.5 font-medium">
                          {item.after.label}
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Interactive Before/After Comparison Slider */
                    <div className="mt-4">
                      <div className="relative aspect-[16/9] rounded-xl overflow-hidden select-none border border-slate-200">
                        {/* After (Full background image) */}
                        <img
                          src={item.after.photo}
                          alt="Sesudah"
                          className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* Before (Clipped overlay) */}
                        <div
                          className="absolute inset-0 overflow-hidden"
                          style={{ width: `${pos}%` }}
                        >
                          <img
                            src={item.before.photo}
                            alt="Sebelum"
                            className="absolute inset-0 w-full h-full object-cover max-w-none"
                            style={{ width: '100%', height: '100%' }}
                          />
                        </div>

                        {/* Divider Line & Handle */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl pointer-events-none"
                          style={{ left: `${pos}%` }}
                        >
                          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center text-[#0D2453]">
                            <SlidersHorizontal className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        {/* Labels */}
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-bold">
                          Sebelum ({pos}%)
                        </span>
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-bold">
                          Sesudah
                        </span>

                        {/* Native slider input overlay */}
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={pos}
                          onChange={(e) => handleSliderMove(item.id, e)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                          aria-label="Geser untuk membandingkan foto sebelum dan sesudah"
                        />
                      </div>
                      <span className="text-[11px] text-[#767676] block mt-1.5 font-medium text-center">
                        Geser garis ke kiri/kanan untuk melihat perubahan fisik fasilitas
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Footer Location & Timestamp */}
                <div className="flex items-center gap-1.5 text-xs text-[#767676] mt-4 pt-3 border-t border-slate-100">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                  <span>{item.location}</span>
                </div>
              </div>

              {/* Right Column: Catatan Dari Desa Timeline Card */}
              <div className="lg:col-span-6 bg-white rounded-2xl border border-[#EBEBEB] p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
                <div>
                  <h4 className="text-[11px] font-bold text-[#767676] uppercase tracking-wider mb-4">
                    CATATAN DARI DESA
                  </h4>

                  {item.timeline.map((entry, idx) => (
                    <React.Fragment key={idx}>
                      <div className="space-y-1">
                        <span className="text-[11px] text-[#767676] block font-medium">
                          {entry.date}
                        </span>
                        <h5 className="text-sm font-bold text-[#0D2453]">
                          {entry.title}
                        </h5>
                        <p className="text-xs text-[#4A5568] leading-relaxed">
                          {entry.desc}
                        </p>
                        <a
                          href="/transparansi"
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#0D2453] mt-1 hover:underline"
                        >
                          <span>{entry.villageLink}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>

                      {idx < item.timeline.length - 1 && (
                        <div className="border-t border-slate-100 my-4"></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal for Photo Inspection */}
      <AnimatePresence>
        {lightboxImg && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setLightboxImg(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
            >
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-[#0D2453]">
                    {lightboxImg.title}
                  </h3>
                  <span className="text-xs text-[#767676]">
                    {lightboxImg.subtitle}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxImg(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0D2453] flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 bg-slate-900 max-h-[70vh] flex items-center justify-center overflow-hidden">
                <img
                  src={lightboxImg.url}
                  alt={lightboxImg.title}
                  className="max-h-[65vh] w-auto object-contain rounded-lg shadow-md"
                />
              </div>

              <div className="p-4 bg-[#F7F9FC] flex justify-between items-center text-xs text-[#767676]">
                <span>Dokumentasi bukti fisik perbaikan fasilitas desa wisata Jawa Tengah</span>
                <button
                  type="button"
                  onClick={() => setLightboxImg(null)}
                  className="px-4 py-1.5 rounded-lg bg-[#0D2453] text-white font-bold text-xs"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
