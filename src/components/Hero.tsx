import { motion } from 'motion/react';
import { Sparkles, Calendar } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-emerald-950 px-6 py-24 text-center">
      {/* Background with robust overlay & reliable wedding photography */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920"
          alt="Latar Belakang Pernikahan"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center scale-105 filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/85 via-emerald-950/70 to-emerald-950/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
      </div>
      
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
        {/* Ornate Islamic Bismillah & Ornament */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex flex-col items-center"
        >
          {/* Top Decorative Line */}
          <div className="mb-4 flex items-center justify-center gap-3 text-amber-300/60">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber-300/50" />
            <Sparkles className="h-3.5 w-3.5 text-amber-300/80" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber-300/50" />
          </div>

          {/* Crisp, Native Islamic Bismillah Calligraphy */}
          <div className="rounded-2xl border border-amber-300/20 bg-emerald-900/40 px-8 py-3.5 backdrop-blur-sm shadow-inner ring-1 ring-amber-400/10">
            <p className="font-serif text-2xl md:text-4xl text-amber-200 tracking-wide select-none drop-shadow-md" dir="rtl" lang="ar">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
            </p>
          </div>
        </motion.div>

        {/* The Wedding Of Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 text-xs md:text-sm font-semibold tracking-[0.3em] text-emerald-300 uppercase drop-shadow"
        >
          The Wedding Of
        </motion.p>

        {/* Couple Names */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6 font-serif text-5xl md:text-7xl lg:text-8xl font-light text-amber-100 drop-shadow-lg"
        >
          Fulana <span className="font-serif italic text-3xl md:text-5xl text-amber-300/80">&</span> Fulan
        </motion.h2>

        {/* Wedding Date Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-emerald-900/60 px-6 py-2.5 text-sm md:text-base font-medium text-amber-100/95 backdrop-blur-sm shadow-md"
        >
          <Calendar className="h-4 w-4 text-amber-300" />
          <span>Sabtu, 24 Oktober 2026</span>
        </motion.div>
      </div>
    </section>
  );
}
