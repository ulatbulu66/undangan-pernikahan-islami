import { useState, useEffect, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, ShieldAlert, Heart, Info, Trash2, X, AlertTriangle } from 'lucide-react';
import type { GuestMessage } from '../types';
import { validateGuestName, validateGuestMessage, isOffensive } from '../utils/profanityFilter';

const INITIAL_MESSAGES: GuestMessage[] = [
  {
    id: '1',
    name: 'Budi & Keluarga',
    message: 'Barakallahu laka wa baraka alaika wa jamaa bainakuma fii khair. Selamat menempuh hidup baru Aisyah & Rahman!',
    timestamp: Date.now() - 86400000,
  },
  {
    id: '2',
    name: 'Sarah Amalia',
    message: 'Selamat ya! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah serta senantiasa dalam lindungan Allah SWT.',
    timestamp: Date.now() - 3600000,
  }
];

export default function Guestbook() {
  const [messages, setMessages] = useState<GuestMessage[]>(() => {
    try {
      const saved = localStorage.getItem('wedding_guestbook_messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (m: GuestMessage) =>
              m &&
              typeof m.name === 'string' &&
              typeof m.message === 'string' &&
              !isOffensive(m.name) &&
              !isOffensive(m.message) &&
              !/\d/.test(m.name)
          );
        }
      }
    } catch {
      // Ignore fallback
    }
    return INITIAL_MESSAGES;
  });

  const [formData, setFormData] = useState({
    name: '',
    message: '',
  });

  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('wedding_guestbook_messages', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = formData.name.trim();
    const trimmedMessage = formData.message.trim();

    // 1. Strict Name Validation
    const nameValidation = validateGuestName(trimmedName);
    if (!nameValidation.isValid) {
      setNotification({
        type: 'error',
        message: nameValidation.errorMessage || 'Nama tidak valid. Mohon gunakan nama asli atau nama keluarga.',
      });
      return;
    }

    // 2. Strict Message Validation & Offensive Words Filtering (Outright Rejection)
    const messageValidation = validateGuestMessage(trimmedMessage);
    if (!messageValidation.isValid) {
      setNotification({
        type: 'error',
        message: messageValidation.errorMessage || 'Pesan ucapan tidak dapat dikirim karena tidak memenuhi kriteria kesantunan.',
      });
      return;
    }

    // 3. If Valid: Post to Real-time Feed
    const newMessage: GuestMessage = {
      id: Date.now().toString(),
      name: trimmedName,
      message: trimmedMessage,
      timestamp: Date.now(),
    };

    setMessages((prev) => [newMessage, ...prev]);
    setFormData({ name: '', message: '' });

    setNotification({
      type: 'success',
      message: 'Alhamdulillah! Doa dan ucapan Anda telah berhasil dikirim.',
    });

    setTimeout(() => {
      setNotification(null);
    }, 6000);

    // Smoothly scroll message container to top
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDeleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    setDeleteTargetId(null);
    setNotification({
      type: 'success',
      message: 'Ucapan telah berhasil dihapus dari feed.',
    });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    if (diff < 60000) return 'Baru saja';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} menit yang lalu`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} jam yang lalu`;
    return new Date(timestamp).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <section className="bg-white px-6 py-24 relative">
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTargetId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl border border-emerald-100"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h4 className="font-serif text-xl text-emerald-950 mb-2">Hapus Ucapan?</h4>
              <p className="text-sm text-emerald-700/80 mb-6">
                Apakah Anda yakin ingin menghapus ucapan ini dari feed buku tamu?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTargetId(null)}
                  className="flex-1 rounded-xl border border-emerald-200 py-2 text-sm font-medium text-emerald-800 transition-colors hover:bg-emerald-50"
                >
                  Batal
                </button>
                <button
                  onClick={() => handleDeleteMessage(deleteTargetId)}
                  className="flex-1 rounded-xl bg-rose-600 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-700"
                >
                  Ya, Hapus
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-3xl">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-center font-serif text-3xl text-emerald-950 md:text-4xl"
        >
          Buku Tamu & Ucapan
        </motion.h3>
        <p className="text-center text-emerald-700/80 mb-12 text-sm md:text-base">
          Tinggalkan pesan, doa, dan restu untuk kedua mempelai
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 rounded-2xl bg-emerald-50 p-6 md:p-8 border border-emerald-100 shadow-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="name" className="block text-sm font-medium text-emerald-900">
                  Nama Anda / Perwakilan
                </label>
                <span className="text-[11px] text-emerald-600/70">Tanpa angka / simbol asing</span>
              </div>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (notification?.type === 'error') setNotification(null);
                }}
                placeholder="Contoh: Ahmad Fauzi / Keluarga H. Ridwan"
                className="w-full rounded-lg border border-emerald-200 bg-white px-4 py-2.5 text-emerald-950 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 placeholder:text-emerald-950/30"
                required
                maxLength={50}
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-emerald-900">
                Ucapan & Doa
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (notification?.type === 'error') setNotification(null);
                }}
                placeholder="Tuliskan ucapan dan doa terbaik untuk kedua mempelai..."
                rows={4}
                className="w-full rounded-lg border border-emerald-200 bg-white px-4 py-2.5 text-emerald-950 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 placeholder:text-emerald-950/30"
                required
                maxLength={500}
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-emerald-700/70 flex items-center gap-1">
                <Info className="h-3.5 w-3.5" /> Filter kata santun aktif
              </span>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-lg bg-emerald-800 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 shadow-sm"
              >
                <Send className="h-4 w-4" />
                Kirim Ucapan
              </button>
            </div>
          </form>

          {/* Feedback notification banner */}
          <AnimatePresence>
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-4 flex items-start gap-2.5 rounded-xl p-3.5 text-xs md:text-sm ${
                  notification.type === 'error'
                    ? 'bg-rose-50 text-rose-900 border border-rose-200 shadow-sm'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                }`}
              >
                {notification.type === 'error' ? (
                  <ShieldAlert className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                )}
                <span className="leading-relaxed">{notification.message}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Real-time Messages Feed */}
        <div className="mb-4 flex items-center justify-between text-xs text-emerald-800/80 font-medium">
          <span>{messages.length} Ucapan & Doa Terkirim</span>
          <span className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> Terbaru di atas
          </span>
        </div>

        <div
          ref={listRef}
          className="space-y-3.5 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: -15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="group relative rounded-xl border border-emerald-100 bg-white p-4 md:p-5 shadow-sm hover:border-emerald-200 transition-all"
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <h5 className="font-semibold text-emerald-950 text-sm md:text-base">
                    {msg.name}
                  </h5>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-emerald-600/70 font-sans">
                      {formatTime(msg.timestamp)}
                    </span>
                    {/* Delete button option */}
                    <button
                      onClick={() => setDeleteTargetId(msg.id)}
                      title="Hapus ucapan ini"
                      className="opacity-60 hover:opacity-100 p-1 text-emerald-400 hover:text-rose-600 rounded-md transition-all hover:bg-rose-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-emerald-900/90 whitespace-pre-line font-serif">
                  {msg.message}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
