import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Clock,
  MapPin,
  Upload,
  CheckCircle2,
  Lock,
  AlertTriangle,
  Send,
  EyeOff,
  Copy,
  Info
} from 'lucide-react';
import { SAMPLE_VILLAGES } from '../../lib/mockData';
import type { ReportCategory } from '../../types';

export default function ReportFormMotion() {
  const [category, setCategory] = useState<ReportCategory>('PUNGLI');
  const [villageId, setVillageId] = useState(SAMPLE_VILLAGES[0].id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  // Dynamic SLA according to category
  const getSLAInfo = (cat: ReportCategory) => {
    switch (cat) {
      case 'PUNGLI':
        return {
          hours: 24,
          label: '24 Jam Maksimal (Prioritas Penertiban Instan)',
          badgeColor: 'bg-red-950/80 border-red-700/60 text-red-400',
        };
      case 'BAHAYA_K3':
        return {
          hours: 168,
          label: '7 Hari (168 Jam) dengan Mandat Penutupan Sementara',
          badgeColor: 'bg-amber-950/80 border-amber-700/60 text-amber-400',
        };
      case 'FASILITAS_RUSAK':
        return {
          hours: 168,
          label: '7 Hari (168 Jam) Pembenahan Fisik & Uji Beban',
          badgeColor: 'bg-blue-950/80 border-blue-700/60 text-blue-400',
        };
      case 'KEBERSIHAN':
        return {
          hours: 48,
          label: '48 Jam Pembersihan Sanitasi',
          badgeColor: 'bg-emerald-950/80 border-emerald-700/60 text-emerald-400',
        };
      default:
        return {
          hours: 168,
          label: '7 Hari Garansi SLA',
          badgeColor: 'bg-slate-800 border-slate-700 text-slate-300',
        };
    }
  };

  const currentSLA = getSLAInfo(category);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    // Generate ticket code e.g. DWJ-JTG-202611-9821
    const randomCode = `DWJ-JTG-202611-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedTicket(randomCode);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Dynamic SLA Countdown Banner */}
      <motion.div
        layout
        className={`p-4 rounded-2xl border mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${currentSLA.badgeColor}`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-slate-900/60">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider">
              Garansi Waktu Penanganan (SLA)
            </div>
            <div className="text-sm font-semibold">{currentSLA.label}</div>
          </div>
        </div>
        <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 font-bold self-end sm:self-auto">
          SLA {currentSLA.hours} JAM
        </div>
      </motion.div>

      {/* Main Form Box */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Pilih Kategori Aduan
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { key: 'PUNGLI', label: 'Pungli & Parkir', icon: ShieldAlert },
                { key: 'BAHAYA_K3', label: 'Bahaya K3 Fisik', icon: AlertTriangle },
                { key: 'FASILITAS_RUSAK', label: 'Fasilitas Rusak', icon: MapPin },
                { key: 'KEBERSIHAN', label: 'Sanitasi Lingkungan', icon: CheckCircle2 },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = category === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setCategory(item.key as ReportCategory)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-2 ${
                      isSelected
                        ? 'border-blue-900 bg-blue-50/80 text-blue-950 ring-2 ring-blue-900/10 font-bold'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60 text-slate-600'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-900' : 'text-slate-400'}`} />
                    <span className="text-xs">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location Picker */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Lokasi Desa Wisata
            </label>
            <div className="relative">
              <select
                value={villageId}
                onChange={(e) => setVillageId(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
              >
                {SAMPLE_VILLAGES.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.regency} - Kec. {v.district})
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Koordinat GPS diverifikasi presisi via geofencing desa wisata</span>
            </div>
          </div>

          {/* Judul Aduan */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Judul Temuan Masalah
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Karcis parkir tidak bertanda cap BUMDes di area pintu 2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Deskripsi Kronologi & Lokasi Spesifik
            </label>
            <textarea
              required
              rows={3}
              placeholder="Jelaskan detail waktu kejadian, oknum/titik kerusakan spesifik, atau potensi dampak kecelakaan..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
            />
          </div>

          {/* Photo Before Upload Mock */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Unggah Foto Bukti Fisik Awal (Foto Before)
            </label>
            <div className="border-2 border-dashed border-slate-300 hover:border-blue-700 rounded-2xl p-6 text-center bg-slate-50/50 cursor-pointer transition-colors">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700">
                Klik untuk unggah foto kamera atau seret file ke sini
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Metadata EXIF koordinat GPS & timestamp otomatis diekstraksi
              </p>
            </div>
          </div>

          {/* Anonymous Whistleblower Switch */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-900">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Mode Anonim Whistleblower Terlindungi
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Identitas Anda dienkripsi dan dilindungi mandat UU KIP & LPSK
                </span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900" />
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-sm shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Kirimkan Aduan Publik Bergaransi SLA</span>
          </motion.button>
        </form>
      </div>

      {/* Submission Success Dialog */}
      <AnimatePresence>
        {submittedTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 text-center space-y-4"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900">Aduan Berhasil Didistribusikan!</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Tiket telah diteruskan ke Pengelola Desa Wisata dan Dinas Pariwisata Jateng dengan garansi SLA waktu.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">
                  Kode Tiket Pelacakan Anda
                </span>
                <span className="font-mono text-xl font-extrabold text-blue-950 block mt-1">
                  {submittedTicket}
                </span>
              </div>

              <div className="text-xs text-slate-500 bg-amber-50 p-3 rounded-xl border border-amber-200 text-left flex gap-2">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  Tiket tidak dapat ditutup secara sepihak tanpa unggahan <strong>Foto Bukti Perbaikan (Proof-of-Fix)</strong> oleh pengelola.
                </span>
              </div>

              <button
                onClick={() => {
                  setSubmittedTicket(null);
                  setTitle('');
                  setDescription('');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
              >
                Selesai & Salin Kode Tiket
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
