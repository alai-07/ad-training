"use client";

import { motion } from "framer-motion";

const beliefs = [
  "Creemos en el método.",
  "Creemos en la constancia.",
  "Creemos en el progreso.",
  "Creemos en resultados que perduran.",
];

export default function Manifesto() {
  return (
    <section className="bg-white px-6 py-40 text-black">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-black/40">
            Nuestra filosofía
          </p>

          <h2 className="text-5xl font-semibold leading-[0.9] tracking-tight md:text-8xl">
            NO PROMETEMOS
            <br />
            MILAGROS.
          </h2>
        </motion.div>

        <div className="mt-24 flex justify-end">
          <div className="max-w-2xl space-y-10">
            {beliefs.map((belief, index) => (
              <motion.p
                key={belief}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                className="text-3xl font-light leading-relaxed text-black/75 md:text-5xl"
              >
                {belief}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}