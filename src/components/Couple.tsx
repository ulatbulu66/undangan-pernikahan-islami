import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';

export default function Couple() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-xs font-semibold tracking-widest text-emerald-700 uppercase">
            Maha Suci Allah yang telah menciptakan pasangan-pasangan
          </span>
          <h3 className="mt-2 font-serif text-3xl text-emerald-950 md:text-4xl">
            Kedua Mempelai
          </h3>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-amber-400/70" />
        </motion.div>

        <div className="grid gap-16 md:grid-cols-2 md:gap-12">
          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Elegant Arched Oval Frame */}
            <div className="group relative mb-6 h-72 w-56 overflow-hidden rounded-[2.5rem] border-4 border-amber-200/80 bg-emerald-50 p-1.5 shadow-lg ring-4 ring-emerald-100/60 transition-all duration-500 hover:border-emerald-600 hover:shadow-xl">
              <div className="h-full w-full overflow-hidden rounded-[2rem] bg-emerald-900/10">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800"
                  alt="Aisyah Zahra - Mempelai Wanita"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            
            <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-emerald-700/80">
              Mempelai Wanita
            </span>
            <h4 className="mb-2 font-serif text-2xl font-medium text-emerald-950">
              Fulana
            </h4>
            <p className="mb-4 text-sm leading-relaxed text-emerald-800/80 font-sans">
              Putri pertama dari<br />
              <strong className="text-emerald-950">Bapak Ahmad</strong> & <strong className="text-emerald-950">Ibu Fatimah</strong>
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/50 px-3.5 py-1 text-xs font-medium text-emerald-800 transition-colors hover:bg-emerald-100 hover:text-emerald-950"
            >
              <Instagram className="h-3.5 w-3.5 text-emerald-700" /> @aisyahzahra
            </a>
          </motion.div>

          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            {/* Elegant Arched Oval Frame */}
            <div className="group relative mb-6 h-72 w-56 overflow-hidden rounded-[2.5rem] border-4 border-amber-200/80 bg-emerald-50 p-1.5 shadow-lg ring-4 ring-emerald-100/60 transition-all duration-500 hover:border-emerald-600 hover:shadow-xl">
              <div className="h-full w-full overflow-hidden rounded-[2rem] bg-emerald-900/10">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
                  alt="Rahman Hakim - Mempelai Pria"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-emerald-700/80">
              Mempelai Pria
            </span>
            <h4 className="mb-2 font-serif text-2xl font-medium text-emerald-950">
              Fulan
            </h4>
            <p className="mb-4 text-sm leading-relaxed text-emerald-800/80 font-sans">
              Putra bungsu dari<br />
              <strong className="text-emerald-950">Bapak Hasan</strong> & <strong className="text-emerald-950">Ibu Siti</strong>
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/50 px-3.5 py-1 text-xs font-medium text-emerald-800 transition-colors hover:bg-emerald-100 hover:text-emerald-950"
            >
              <Instagram className="h-3.5 w-3.5 text-emerald-700" /> @rahmanhakim
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
