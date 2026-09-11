import { useEffect, useRef } from 'react';
import { Disc, Pause, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { quranPlaylist } from '../data/playlist';

interface AudioPlayerProps {
  isPlaying: boolean;
  togglePlay: () => void;
  trackIndex: number;
  setTrackIndex: (index: number) => void;
}

export default function AudioPlayer({ isPlaying, togglePlay, trackIndex, setTrackIndex }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, trackIndex]);

  const handleEnded = () => {
    setTrackIndex((trackIndex + 1) % quranPlaylist.length);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        src={quranPlaylist[trackIndex].audio}
        onEnded={handleEnded}
      />
      <motion.button
        onClick={togglePlay}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-800 text-amber-50 shadow-lg ring-4 ring-emerald-800/30"
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Disc className="h-full w-full p-2 opacity-50" />
        </motion.div>
        {isPlaying ? (
          <Pause className="z-10 h-5 w-5 fill-current" />
        ) : (
          <Play className="z-10 h-5 w-5 fill-current" />
        )}
      </motion.button>
    </div>
  );
}
