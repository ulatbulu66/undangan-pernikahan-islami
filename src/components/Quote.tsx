import { useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { quranPlaylist } from '../data/playlist';
import { Pause, Play } from 'lucide-react';

interface QuoteProps {
  trackIndex: number;
  setTrackIndex: (index: number) => void;
  isPlaying: boolean;
  togglePlay: () => void;
}

export default function Quote({ trackIndex, setTrackIndex, isPlaying, togglePlay }: QuoteProps) {
  const currentAyah = quranPlaylist[trackIndex];
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });

  return (
    <section ref={sectionRef} className="bg-emerald-50 px-6 py-24 text-center overflow-hidden">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex justify-center"
        >
          <div className="h-px w-16 bg-emerald-300" />
          <div className="mx-4 h-2 w-2 rotate-45 bg-emerald-400" />
          <div className="h-px w-16 bg-emerald-300" />
        </motion.div>

        <div className="relative min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={trackIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <p className="font-serif text-3xl md:text-5xl leading-[2.5] md:leading-[2.5] text-emerald-900 mb-8" dir="rtl">
                {currentAyah.arabic}
              </p>
              
              <div className="mb-8 text-lg leading-relaxed text-emerald-800 md:text-xl md:leading-loose font-serif italic max-w-3xl flex flex-wrap justify-center gap-x-1.5">
                <span className="mr-1">"</span>
                {currentAyah.translation.split(" ").map((word, idx) => (
                  <motion.span
                    key={`${trackIndex}-${idx}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: isInView ? 0.3 + idx * 0.08 : 0, duration: 0.4 }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
                <span>"</span>
              </div>
              
              <div className="flex items-center gap-3 bg-emerald-100/50 px-6 py-2 rounded-full border border-emerald-200">
                <p className="text-sm font-semibold tracking-widest text-emerald-700">
                  {currentAyah.surah}
                </p>
                <button onClick={togglePlay} className="text-emerald-700 hover:text-emerald-900 transition-colors">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Interactive Controls */}
        <div className="mt-16 flex justify-center gap-3 flex-wrap">
          {quranPlaylist.map((_, i) => (
            <button
              key={i}
              onClick={() => setTrackIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === trackIndex ? 'w-8 bg-emerald-600' : 'w-2.5 bg-emerald-200 hover:bg-emerald-400'
              }`}
              aria-label={`Go to verse ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
