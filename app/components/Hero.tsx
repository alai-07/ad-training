"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black pt-20 text-white">
      {/* Fondo luminoso */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(255,255,255,0.09),transparent_34%)]" />

      {/* Cuadrícula */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:72px_72px]" />

      {/* Imagen */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="pointer-events-none absolute bottom-0 right-0 top-20 hidden w-[68%] lg:block"
      >
        <Image
          src="/hero-ad-training.png"
          alt="Ordenador con la plataforma AD Training, shaker, cuaderno y bolígrafo"
          fill
          priority
          sizes="68vw"
          className="object-cover object-[58%_center]"
        />
      </motion.div>

      {/* Degradado izquierdo */}
      <div className="pointer-events-none absolute bottom-0 left-0 top-20 hidden w-[70%] bg-gradient-to-r from-black via-black/95 via-55% to-transparent lg:block" />

      {/* Degradado inferior */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

      {/* Mismo contenedor exacto que el Navbar */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-80px)] w-full max-w-7xl items-center px-6 lg:px-10">
        <div className="w-full py-16 lg:py-20">
          <div className="max-w-[660px]">
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 text-xs font-semibold uppercase tracking-[0.42em] text-zinc-400 sm:text-sm"
            >
              Entrenamiento online personalizado
            </motion.p>

            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="text-[clamp(4rem,7vw,7.75rem)] font-black uppercase leading-[0.84] tracking-[-0.065em]"
            >
              El cambio
              <span className="block text-zinc-400">
                no es casualidad.
              </span>
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-10 max-w-[520px] text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8"
            >
              Diseñamos procesos de entrenamiento personalizados para ayudarte
              a progresar con criterio y construir resultados que perduren.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="mt-12 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#valoracion"
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black"
              >
                <span className="relative z-10">
                  Empezar mi proceso
                </span>

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

            <motion.a
              href="#experiencia"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="group mt-14 inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-zinc-500 transition duration-300 hover:text-white"
            >
              <motion.span
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { y: [0, 5, 0] }
                }
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
        </div>
      </div>
    </section>
  );
}