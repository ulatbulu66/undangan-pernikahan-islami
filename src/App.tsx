/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Cover from './components/Cover';
import Hero from './components/Hero';
import Quote from './components/Quote';
import Couple from './components/Couple';
import EventDetails from './components/EventDetails';
import Gallery from './components/Gallery';
import Guestbook from './components/Guestbook';
import AudioPlayer from './components/AudioPlayer';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);

  const handleOpen = () => {
    setIsOpened(true);
    setIsPlaying(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-emerald-50 selection:bg-emerald-200 selection:text-emerald-950">
      <Cover isOpen={isOpened} onOpen={handleOpen} />
      
      {isOpened && (
        <main>
          <Hero />
          <Quote trackIndex={trackIndex} setTrackIndex={setTrackIndex} isPlaying={isPlaying} togglePlay={() => setIsPlaying(!isPlaying)} />
          <Couple />
          <EventDetails />
          <Gallery />
          <Guestbook />
          
          <footer className="bg-emerald-950 py-8 text-center text-emerald-300 text-sm">
            <p>Made by DIKI RAMDANi untuk fulan & fulana</p>
          </footer>
        </main>
      )}

      {isOpened && (
        <AudioPlayer 
          isPlaying={isPlaying} 
          togglePlay={() => setIsPlaying(!isPlaying)} 
          trackIndex={trackIndex}
          setTrackIndex={setTrackIndex}
        />
      )}
      
      <Analytics />
    </div>
  );
}
