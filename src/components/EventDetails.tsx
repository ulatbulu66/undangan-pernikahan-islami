import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Clock, Bell, BellRing, X, Sparkles } from 'lucide-react';

export default function EventDetails() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const notifiedRef = useRef(false);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "granted") {
      setNotificationEnabled(true);
    }
  }, []);

  const handleIngatkanSayaClick = () => {
    setShowPopup(true);
  };

  const requestNotification = () => {
    setShowPopup(false);
    if (!("Notification" in window)) {
      alert("Browser Anda tidak mendukung notifikasi web.");
      return;
    }
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        setNotificationEnabled(true);
        new Notification("Notifikasi Aktif!", {
          body: "Kami akan mengingatkan Anda saat akad nikah dimulai.",
        });
      }
    });
  };

  // Target date: 1 minute from load to test the countdown pushing notification
  const targetDateRef = useRef(new Date().getTime() + 60000);

  useEffect(() => {
    const targetDate = targetDateRef.current;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        
        if (!notifiedRef.current && "Notification" in window && Notification.permission === "granted") {
          new Notification("Akad Nikah Dimulai!", {
            body: "Acara akad nikah Aisyah & Rahman sedang berlangsung sekarang.",
          });
          notifiedRef.current = true;
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-emerald-950 px-6 py-24 text-emerald-50 relative overflow-hidden">
      {/* Subtle Ambient Light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-amber-400/5 blur-3xl pointer-events-none" />

      {/* Notification Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/70 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-sm rounded-3xl bg-white p-7 text-center shadow-2xl relative border border-amber-200/50"
            >
              <button 
                onClick={() => setShowPopup(false)}
                className="absolute right-4 top-4 rounded-full p-1 text-emerald-400 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-100 to-amber-100 text-emerald-800 shadow-inner">
                <BellRing className="h-8 w-8 animate-bounce text-emerald-800" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
                </span>
              </div>
              
              <h4 className="mb-2 font-serif text-2xl text-emerald-950 font-medium">Ingatkan Saya</h4>
              <p className="mb-6 text-sm leading-relaxed text-emerald-800/80">
                Aktifkan notifikasi pengingat otomatis saat prosesi akad nikah dimulai agar Anda tidak terlewatkan momen bahagia ini.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPopup(false)}
                  className="flex-1 rounded-xl border border-emerald-200 py-2.5 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-50"
                >
                  Nanti Saja
                </button>
                <button
                  onClick={requestNotification}
                  className="flex-1 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:from-emerald-700 hover:to-emerald-600 hover:shadow-lg"
                >
                  Ya, Ingatkan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h3 className="mb-4 font-serif text-3xl text-amber-100 md:text-4xl">Rangkaian Acara</h3>
          <p className="text-emerald-200/80 mb-8 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
            Dengan memohon rahmat dan ridha Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada acara pernikahan kami.
          </p>
          
          {/* Eye-catching Animated Push Notification Button */}
          <div className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="relative inline-block"
            >
              {/* Radiating Pulse Aura Rings when notification is not yet enabled */}
              {!notificationEnabled && (
                <>
                  <motion.span
                    animate={{
                      scale: [1, 1.25, 1.4],
                      opacity: [0.6, 0.3, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="absolute inset-0 -m-1.5 rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 blur-sm pointer-events-none"
                  />
                  <motion.span
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -inset-0.5 rounded-full bg-amber-400/40 blur-xs pointer-events-none"
                  />
                </>
              )}

              {/* Main Interactive Button with Gentle Hover & Shimmer Effect */}
              <motion.button
                onClick={handleIngatkanSayaClick}
                disabled={notificationEnabled}
                whileHover={!notificationEnabled ? { scale: 1.06, y: -2 } : {}}
                whileTap={!notificationEnabled ? { scale: 0.96 } : {}}
                animate={
                  !notificationEnabled
                    ? {
                        y: [0, -3, 0],
                      }
                    : {}
                }
                transition={{
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className={`relative z-10 inline-flex items-center gap-2.5 rounded-full px-7 py-3 text-sm font-semibold tracking-wide shadow-xl transition-all duration-300 overflow-hidden ${
                  notificationEnabled 
                    ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 cursor-default' 
                    : 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-emerald-950 ring-4 ring-amber-400/30 hover:shadow-amber-400/25 hover:ring-amber-300/50'
                }`}
              >
                {/* Shimmer Light Reflection Sweep */}
                {!notificationEnabled && (
                  <motion.span
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 1.5,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
                  />
                )}

                {/* Animated Bell Icon */}
                {notificationEnabled ? (
                  <BellRing className="h-4 w-4 text-emerald-400 shrink-0" />
                ) : (
                  <motion.span
                    animate={{
                      rotate: [0, -18, 18, -14, 14, -6, 6, 0],
                    }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut",
                    }}
                    className="inline-flex"
                  >
                    <Bell className="h-4 w-4 text-emerald-950 fill-emerald-950/20 shrink-0" />
                  </motion.span>
                )}

                <span className="font-sans font-bold">
                  {notificationEnabled ? 'Pengingat Aktif' : 'Ingatkan Waktu Akad'}
                </span>

                {!notificationEnabled && (
                  <Sparkles className="h-3.5 w-3.5 text-emerald-900 animate-pulse" />
                )}
              </motion.button>
            </motion.div>

            {/* Helper Hint Label */}
            {!notificationEnabled && (
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-2.5 text-[11px] font-medium tracking-wide text-amber-200/80 flex items-center gap-1"
              >
                🔔 Tekan tombol untuk mendapat pengingat langsung saat acara dimulai
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-20 grid grid-cols-4 gap-4 rounded-2xl bg-emerald-900/50 p-6 backdrop-blur-sm md:gap-8 md:p-10 border border-emerald-800"
        >
          {[
            { label: 'Hari', value: timeLeft.days },
            { label: 'Jam', value: timeLeft.hours },
            { label: 'Menit', value: timeLeft.minutes },
            { label: 'Detik', value: timeLeft.seconds },
          ].map((item, i) => (
            <div key={item.label} className="flex flex-col items-center text-center">
              <span className="font-serif text-3xl font-light text-amber-200 md:text-5xl">{item.value}</span>
              <span className="mt-2 text-xs uppercase tracking-widest text-emerald-300 md:text-sm">{item.label}</span>
            </div>
          ))}
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Akad Nikah */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center rounded-2xl bg-emerald-900/30 p-8 text-center border border-emerald-800/50"
          >
            <h4 className="mb-6 font-serif text-2xl text-amber-100">Akad Nikah</h4>
            <div className="mb-6 space-y-4 text-emerald-200/90">
              <div className="flex items-center justify-center gap-3">
                <Calendar className="h-5 w-5 text-amber-200/70" />
                <span>Sabtu, 24 Oktober 2026</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Clock className="h-5 w-5 text-amber-200/70" />
                <span>09.00 WIB - Selesai</span>
              </div>
            </div>
            <p className="text-sm text-emerald-300">Masjid Agung Al-Akbar<br/>Jl. Masjid Agung Timur No.1, Surabaya</p>
          </motion.div>

          {/* Resepsi */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center rounded-2xl bg-emerald-900/30 p-8 text-center border border-emerald-800/50"
          >
            <h4 className="mb-6 font-serif text-2xl text-amber-100">Resepsi</h4>
            <div className="mb-6 space-y-4 text-emerald-200/90">
              <div className="flex items-center justify-center gap-3">
                <Calendar className="h-5 w-5 text-amber-200/70" />
                <span>Sabtu, 24 Oktober 2026</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Clock className="h-5 w-5 text-amber-200/70" />
                <span>11.00 WIB - 14.00 WIB</span>
              </div>
            </div>
            <p className="text-sm text-emerald-300">Grand City Ballroom<br/>Jl. Walikota Mustajab No.1, Surabaya</p>
          </motion.div>
        </div>

        {/* Map iframe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 overflow-hidden rounded-2xl border border-emerald-800/50 bg-emerald-900/30"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.3868202513476!2d112.71261301477524!3d-7.337582594697334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb4938a1bf11%3A0x6739bc99c35d9472!2sMasjid%20Nasional%20Al-Akbar%20Surabaya!5e0!3m2!1sen!2sid!4v1689255621815!5m2!1sen!2sid"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
        
        {/* Map Button Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <a
            href="https://goo.gl/maps/bKj3xTzB8HnFTjC7A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-8 py-3 text-sm font-medium text-emerald-950 transition-colors hover:bg-amber-200"
          >
            <MapPin className="h-4 w-4" />
            Buka di Aplikasi Google Maps
          </a>
        </motion.div>
      </div>
    </section>
  );
}
