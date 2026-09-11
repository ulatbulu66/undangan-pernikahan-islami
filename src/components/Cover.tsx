import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MailOpen } from 'lucide-react';

interface CoverProps {
  isOpen: boolean;
  onOpen: () => void;
}

export default function Cover({ isOpen, onOpen }: CoverProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    setIsOpening(true);
    // Tunda penutupan cover selama 7 detik untuk menampilkan doa
    setTimeout(() => {
      onOpen();
    }, 7000);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-emerald-950 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80')] bg-cover bg-center before:absolute before:inset-0 before:bg-emerald-950/80"
        >
          <div className="relative z-10 flex flex-col items-center px-6 text-center text-emerald-50">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 text-sm font-medium tracking-widest uppercase text-emerald-300"
            >
              Undangan Pernikahan
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-serif text-5xl md:text-7xl font-light text-amber-100"
            >
              Fulana & Fulan
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 mb-12 space-y-2"
            >
              <p className="text-emerald-200/80">Kepada Yth. Bapak/Ibu/Saudara/i</p>
              <p className="text-xl font-medium text-amber-50">Tamu Undangan</p>
            </motion.div>

            <AnimatePresence mode="wait">
              {!isOpening ? (
                <motion.button
                  key="open-btn"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: 1, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenClick}
                  className="flex items-center gap-2 rounded-full bg-emerald-800 px-8 py-3 text-sm font-medium tracking-wide text-emerald-50 shadow-lg ring-1 ring-emerald-700 hover:bg-emerald-700 transition-colors"
                >
                  <MailOpen className="h-4 w-4" />
                  Buka Undangan
                </motion.button>
              ) : (
                <motion.div
                  key="dua-text"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col items-center space-y-4 max-w-lg"
                >
                  <p className="font-serif text-2xl md:text-3xl text-amber-200 leading-relaxed font-medium">
                    بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
                  </p>
                  <p className="font-serif text-xl md:text-2xl text-amber-100/90 leading-loose">
                    بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
                  </p>
                  <p className="text-sm text-emerald-200/80 italic">
                    "Semoga Allah memberkahimu dan memberkahi pernikahanmu, serta mengumpulkan kalian berdua dalam kebaikan."
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
