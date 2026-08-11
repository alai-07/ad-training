"use client";

import { motion } from "framer-motion";

const situations = [
  {
    number: "01",
    title: "Te cuesta ser constante",
    description:
      "Mantener una rutina de entrenamiento es más fácil cuando existe una planificación adaptada a tu ritmo de vida y a tus objetivos.",
  },
  {
    number: "02",
    title: "Has dejado de progresar",
    description:
      "Cuando los resultados se estancan, revisar la planificación y adaptar el entrenamiento suele ser la mejor forma de seguir avanzando.",
  },
  {
    number: "03",
    title: "No existe un método que funcione para todos",
    description:
      "Cada persona tiene un punto de partida, unos objetivos y unas circunstancias diferentes. Encontrar el entrenamiento adecuado marca la diferencia.",
  },
  {
    number: "04",
    title: "Quieres volver a entrenar tras una lesión",
    description:
      "Recuperar la confianza y volver a entrenar con seguridad requiere una progresión adaptada a tu situación.",
  },
  {
    number: "05",
    title: "Quieres mejorar tu rendimiento deportivo",
    description:
      "Cada deporte tiene unas exigencias diferentes. Un entrenamiento específico te ayuda a desarrollar las capacidades que realmente necesitas.",
  },
  {
    number: "06",
    title: "Buscas resultados que se mantengan",
    description:
      "El objetivo no es conseguir cambios rápidos, sino construir hábitos y una forma de entrenar que puedas mantener a largo plazo.",
  },
];

export default function Problem() {
  return (
<section className="relative overflow-hidden bg-[#F7F7F5] py-36 text-[#0B0B0D]">
      {/* Número de fondo */}
      <span className="pointer-events-none absolute left-8 top-0 text-[220px] font-bold leading-none text-black/[0.03] md:left-16 md:text-[420px]">
        01
      </span>

<div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl"
        >
          <h2 className="text-5xl font-semibold leading-[0.9] tracking-tight md:text-8xl">
            CADA PERSONA
            <br />
            EMPIEZA
            <br />
            DESDE UN
            <br />
            PUNTO DIFERENTE.
          </h2>

          <p className="mt-10 max-w-2xl text-xl leading-relaxed text-black/60 md:text-2xl">
            Por eso no creemos en entrenamientos genéricos.
            Diseñamos un método adaptado a tus objetivos,
            experiencia y estilo de vida.
          </p>
        </motion.div>

        {/* Lista */}
        <div className="mt-32 border-t border-black/10">

          {situations.map((item, index) => (

            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              whileHover={{
                x: 8,
              }}
              className="grid gap-8 border-b border-black/10 py-12 transition-all duration-300 md:grid-cols-[100px_1fr_1.4fr]"
            >

              <span className="text-3xl font-semibold text-black/20 transition-all duration-300 group-hover:text-black">
                {item.number}
              </span>

              <h3 className="text-3xl font-medium leading-tight">
                {item.title}
              </h3>

              <p className="max-w-xl text-lg leading-relaxed text-black/60">
                {item.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}