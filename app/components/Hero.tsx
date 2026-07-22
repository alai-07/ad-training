"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black px-6 pb-16 pt-32 text-white lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12),transparent_32%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="max-w-5xl">
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-xs font-semibold uppercase tracking-[0.4em] text-zinc-400 sm:text-sm"
          >
            Entrenamiento online personalizado
          </motion.p>

          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-5xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-7xl lg:text-8xl xl:text-9xl"
          >
            El cambio
            <span className="block text-zinc-400">no es casualidad.</span>
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-10 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl"
          >
            Diseñamos procesos de entrenamiento personalizados para ayudarte a
            progresar con criterio y construir resultados que perduren.
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#valoracion"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            >
              <span className="relative z-10">Empezar mi proceso</span>

              <ArrowRight
                size={18}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
              />

              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>

            <a
              href="#experiencia"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition duration-300 hover:border-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            >
              Explorar experiencia
            </a>
          </motion.div>
        </div>

        <motion.a
          href="#experiencia"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="group mt-20 inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-zinc-500 transition duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black"
        >
          <motion.span
            animate={shouldReduceMotion ? undefined : { y: [0, 5, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowDown size={17} />
          </motion.span>

          Descubre el método
        </motion.a>
      </div>
    </section>
  );
}