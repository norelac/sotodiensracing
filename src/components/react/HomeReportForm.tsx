import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  UploadCloud,
  ChevronDown,
  MapPin,
  CheckCircle2,
  X,
  FileCheck2,
  Loader2
} from 'lucide-react';

interface VillageLocation {
  name: string;
  regency: string;
  district: string;
  xPercent: number; // For interactive SVG pin placement on Central Java map
  yPercent: number;
}

const VILLAGE_PINS: VillageLocation[] = [
  { name: 'Desa Candirejo', district: 'Borobudur', regency: 'Kabupaten Magelang', xPercent: 55, yPercent: 68 },
  { name: 'Desa Limpakuwus', district: 'Sumbang', regency: 'Kabupaten Banyumas', xPercent: 28, yPercent: 60 },
  { name: 'Desa Getas', district: 'Singorojo', regency: 'Kabupaten Kendal', xPercent: 53, yPercent: 36 },
  { name: 'Desa Berjo', district: 'Ngargoyoso', regency: 'Kabupaten Karanganyar', xPercent: 78, yPercent: 65 },
  { name: 'Desa Dieng Kulon', district: 'Batur', regency: 'Kabupaten Banjarnegara', xPercent: 42, yPercent: 45 },
];

export default function HomeReportForm() {
  const [selectedTitle, setSelectedTitle] = useState('');
  const [address, setAddress] = useState('Desa Candirejo, Borobudur, Kabupaten Magelang');
  const [activePin, setActivePin] = useState<string>('Desa Candirejo');
  const [description, setDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successTicket, setSuccessTicket] = useState<string | null>(null);

  const handleSelectPin = (village: VillageLocation) => {
    setActivePin(village.name);
    setAddress(`${village.name}, Kec. ${village.district}, ${village.regency}`);
  };

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFiles((prev) => [...prev, file.name]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessTicket(`DS-JTG-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    }, 800);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Judul Laporan */}
          <div>
            <label className="block text-xs font-bold text-[#0D2453] mb-1.5">
              Judul Laporan
            </label>
            <div className="relative">
              <select
                value={selectedTitle}
                onChange={(e) => setSelectedTitle(e.target.value)}
                required
                className="w-full bg-[#F5F5F5] border-0 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#0D2453] focus:ring-2 focus:ring-[#0D2453]/20 focus:outline-none appearance-none cursor-pointer font-medium"
              >
                <option value="" disabled>Contoh: Pohon tumbang</option>
                <option value="Akses ke curug buruk">Akses ke curug buruk & pagar pengaman lapuk</option>
                <option value="Wastafel dan toilet kotor">Wastafel dan toilet kotor sekali / kran mati</option>
                <option value="Pungli parkir liar">Pungutan liar parkir tanpa karcis resmi BUMDes</option>
                <option value="Jembatan goyang">Jembatan titian kayu goyang dan berbahaya</option>
                <option value="Tumpukan sampah">Tumpukan sampah plastik di area gardu pandang</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Alamat Lokasi */}
          <div>
            <label className="block text-xs font-bold text-[#0D2453] mb-1.5">
              Alamat Lokasi
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Nama Desa, Kecamatan, Kabupaten"
                className="w-full bg-[#F5F5F5] border-0 rounded-xl px-4 py-3 pr-10 text-xs sm:text-sm text-[#0D2453] font-medium placeholder:text-[#767676] focus:ring-2 focus:ring-[#0D2453]/20 focus:outline-none"
              />
              <MapPin className="w-4 h-4 text-blue-900 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Tandai di Peta: Interactive Leaflet/SVG Pin Map */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-[#0D2453]">
                Tandai di Peta (Klik pin lokasi)
              </label>
              <span className="text-[11px] text-[#767676]">
                Terpilih: <strong className="text-[#0D2453]">{activePin}</strong>
              </span>
            </div>

            {/* Stylized Interactive Central Java Map Container */}
            <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-[#EBEBEB] bg-[#E8ECEF] select-none group">
              {/* Google Map / Terrain styled background with grid lines */}
              <div
                className="absolute inset-0 bg-[#E5ECF4] opacity-90"
                style={{
                  backgroundImage:
                    'radial-gradient(#CBD5E1 1px, transparent 1px), linear-gradient(to right, #F1F5F9 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Central Java Terrain Visual Silhouettes */}
              <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 400 200">
                <path
                  d="M20,120 Q80,90 140,110 T260,80 T380,100 L390,190 L10,190 Z"
                  fill="#0D2453"
                />
              </svg>

              {/* Map Controls pill in top left matching Figma */}
              <div className="absolute top-2.5 left-2.5 flex gap-1 z-10 bg-white/95 backdrop-blur-xs rounded-lg p-1 shadow-xs border border-slate-200 text-[10px] font-semibold text-slate-700">
                <span className="px-2 py-0.5 bg-slate-100 text-[#0D2453] rounded font-bold">Map</span>
                <span className="px-2 py-0.5 text-slate-500">Satellite</span>
              </div>

              {/* Clickable Pins across Central Java Villages */}
              {VILLAGE_PINS.map((pin) => {
                const isActive = activePin === pin.name;
                return (
                  <button
                    key={pin.name}
                    type="button"
                    onClick={() => handleSelectPin(pin)}
                    style={{ left: `${pin.xPercent}%`, top: `${pin.yPercent}%` }}
                    className="absolute -translate-x-1/2 -translate-y-full z-20 transition-transform hover:scale-110 focus:outline-none"
                    title={`${pin.name} (${pin.regency})`}
                  >
                    <div className="flex flex-col items-center">
                      {isActive && (
                        <span className="px-2 py-0.5 rounded-md bg-[#0D2453] text-white text-[9px] font-bold shadow-md whitespace-nowrap mb-0.5 animate-bounce">
                          {pin.name}
                        </span>
                      )}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                          isActive
                            ? 'bg-[#EA4335] text-white ring-4 ring-red-200'
                            : 'bg-white text-[#0D2453] border border-slate-300 hover:bg-blue-50'
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                    </div>
                  </button>
                );
              })}

              <div className="absolute bottom-2 right-2 text-[10px] text-slate-500 bg-white/80 px-2 py-0.5 rounded font-mono">
                Jateng GPS Active
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 flex flex-col justify-between h-full">
          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-bold text-[#0D2453] mb-1.5">
              Deskripsi
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tuliskan deskripsi aduan"
              className="w-full bg-[#F5F5F5] border-0 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#0D2453] placeholder:text-[#767676] focus:ring-2 focus:ring-[#0D2453]/20 focus:outline-none resize-none font-medium"
            />
          </div>

          {/* Foto / Video Bukti Dropzone */}
          <div>
            <label className="block text-xs font-bold text-[#0D2453] mb-1.5">
              Foto / Video Bukti
            </label>
            <label className="border-2 border-dashed border-[#C1C1C1] hover:border-[#0D2453] rounded-2xl p-6 text-center bg-white cursor-pointer transition-colors flex flex-col items-center justify-center block">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileDrop}
                className="hidden"
              />
              <UploadCloud className="w-8 h-8 text-[#0D2453]" />
              <span className="text-xs font-bold text-[#0D2453] mt-2 block">
                Unggah Foto / Video
              </span>
              <span className="text-[11px] text-[#767676] mt-0.5 block">
                JPG, PNG, WEBP, MP4, MOV (maks 5 MB per file, maksimal 3 file)
              </span>
            </label>

            {/* Uploaded File Previews */}
            {uploadedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {uploadedFiles.map((name, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-blue-900 text-xs font-semibold border border-blue-200"
                  >
                    <FileCheck2 className="w-3.5 h-3.5" />
                    <span>{name}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Checkbox Laporan Anonim / Privat */}
          <div className="flex items-center gap-2 pt-1">
            <input
              id="anon-check"
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 rounded text-[#0D2453] accent-[#0D2453] focus:ring-0 cursor-pointer"
            />
            <label htmlFor="anon-check" className="text-xs font-bold text-[#0D2453] cursor-pointer">
              Laporan Anonim / Privat
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-[#0D2453] hover:bg-[#132d66] text-white font-bold text-xs sm:text-sm transition-all shadow-xs active:scale-[0.99] flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memproses Laporan...</span>
              </>
            ) : (
              <span>Laporkan</span>
            )}
          </button>
        </div>
      </form>

      {/* Submission Success Dialog */}
      <AnimatePresence>
        {successTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-center space-y-4"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#0D2453]">Laporan Berhasil Diterbitkan!</h3>
                <p className="text-xs text-[#767676] mt-1">
                  Aduan Anda telah tercatat pada sistem monitoring Pemprov Jateng dan diteruskan ke pengelola desa terkait.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F9FC] border border-[#EBEBEB]">
                <span className="text-[11px] font-bold text-[#767676] uppercase tracking-wider block">
                  Nomor Tiket Aduan Publik
                </span>
                <span className="font-mono text-xl font-extrabold text-[#0D2453] block mt-1">
                  {successTicket}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSuccessTicket(null);
                  setSelectedTitle('');
                  setDescription('');
                  setUploadedFiles([]);
                }}
                className="w-full py-3 rounded-xl bg-[#0D2453] hover:bg-[#132d66] text-white font-bold text-xs transition-colors"
              >
                Selesai & Tutup
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
