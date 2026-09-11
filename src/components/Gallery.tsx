import { motion } from 'motion/react';

// Curated Islamic Wedding & Akad Nikah Photography
const photos = [
  {
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80",
    caption: "Momen Sakinah & Kehangatan"
  },
  {
    url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80",
    caption: "Anggun dalam Balutan Busana Muslimah"
  },
  {
    url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80",
    caption: "Cincin & Ikrar Suci Pernikahan"
  },
  {
    url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80",
    caption: "Dekorasi Akad Bernuansa Islami"
  },
  {
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80",
    caption: "Langkah Awal Menuju Ridha Ilahi"
  },
  {
    url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80",
    caption: "Doa & Restu Bersama Keluarga"
  }
];

export default function Gallery() {
  return (
    <section className="bg-emerald-50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="font-serif text-3xl text-emerald-950 md:text-4xl mb-3">
            Galeri Momen Bahagia
          </h3>
          <p className="text-emerald-800/80 text-sm md:text-base font-serif italic">
            "Menyatukan dua hati dalam ikatan suci yang diridhai Allah SWT"
          </p>
        </motion.div>

        <div className="columns-1 gap-4 sm:columns-2 md:columns-3">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative mb-4 overflow-hidden rounded-xl border border-emerald-100/50 bg-white shadow-sm break-inside-avoid"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-xs text-emerald-50 font-medium">
                  {photo.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
