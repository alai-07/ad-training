"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Analizamos",
    description:
      "Estudiamos tu punto de partida, tus objetivos, tu experiencia y el tiempo real que puedes dedicar al entrenamiento.",
  },
  {
    number: "02",
    title: "Planificamos",
    description:
      "Diseñamos una estrategia adaptada a ti, con una estructura clara y objetivos concretos.",
  },
  {
    number: "03",
    title: "Acompañamos",
    description:
      "Tienes seguimiento para resolver dudas, mantener la dirección y avanzar con mayor seguridad.",
  },
  {
    number: "04",
    title: "Ajustamos",
    description:
      "Revisamos tu progreso y modificamos el plan cuando tu evolución o tus circunstancias cambian.",
  },
  {
    number: "05",
    title: "Consolidamos",
    description:
      "Construimos hábitos y una forma de entrenar que puedas mantener a largo plazo.",
  },
];

export default function Method() {
  return (
    <section
      id="metodo"
      className="relative overflow-hidden bg-[#0B0B0D] px-6 py-36 text-white"
    >
      {/* Número gigante de fondo */}
      <span className="pointer-events-none absolute right-4 top-0 text-[220px] font-bold leading-none text-white/[0.03] md:right-12 md:text-[420px]">
        02
      </span>

      <div className="relative mx-auto max-w-7xl">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.25 }}
          className="max-w-5xl"
        >
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-white/40">
            El método
          </p>

          <h2 className="text-5xl font-semibold leading-[0.9] tracking-tight md:text-8xl">
            UN SISTEMA
            <br />
            DISEÑADO
            <br />
            PARA TI.
          </h2>

          <p className="mt-10 max-w-2xl text-xl leading-relaxed text-white/60 md:text-2xl">
            Cada decisión responde a un objetivo. Cada ajuste tiene un motivo.
            Nada se deja al azar.
          </p>
        </motion.div>

        {/* Paneles */}
        <div className="mt-28 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              whileHover={{ y: -6 }}
              className={`group flex min-h-[340px] flex-col justify-between border border-white/10 bg-white/[0.02] p-8 transition-colors duration-300 hover:border-white/35 hover:bg-white/[0.04] md:p-10 ${
                index === 4 ? "lg:col-start-2" : ""
              }`}
            >
              <span className="text-5xl font-semibold leading-none text-white/15 transition-colors duration-300 group-hover:text-white/35">
                {step.number}
              </span>

              <div className="mt-20">
                <h3 className="text-3xl font-medium tracking-tight">
                  {step.title}
                </h3>

                <p className="mt-5 max-w-sm text-base leading-relaxed text-white/55 md:text-lg">
                  {step.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}