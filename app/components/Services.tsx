"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Entrenamiento personal online",
    shortTitle: "Entrenamiento online",
    description:
      "Un servicio completo para entrenar con una estrategia diseñada específicamente para ti.",
    details:
      "Analizamos tu situación, definimos tus objetivos y construimos una planificación adaptada a tu experiencia, disponibilidad y material. El seguimiento permite ajustar el proceso según tu evolución.",
    features: [
      "Evaluación inicial",
      "Plan de entrenamiento personalizado",
      "Seguimiento continuo",
      "Revisiones y ajustes",
    ],
  },
  {
    number: "02",
    title: "Programación personalizada",
    shortTitle: "Programación",
    description:
      "Una planificación clara para entrenar de forma autónoma sin depender de rutinas genéricas.",
    details:
      "Recibes una estructura de entrenamiento creada para tus objetivos y circunstancias. Cada ejercicio, volumen y progresión responde a una finalidad concreta.",
    features: [
      "Planificación individual",
      "Selección de ejercicios",
      "Progresión estructurada",
      "Indicaciones técnicas",
    ],
  },
  {
    number: "03",
    title: "Seguimiento y ajustes",
    shortTitle: "Seguimiento",
    description:
      "Tu entrenamiento evoluciona contigo para que sigas avanzando sin improvisaciones.",
    details:
      "Revisamos tu progreso, resolvemos dudas y modificamos el plan cuando cambian tu rendimiento, disponibilidad o necesidades.",
    features: [
      "Revisión del progreso",
      "Resolución de dudas",
      "Adaptación del entrenamiento",
      "Control de la evolución",
    ],
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState(0);

  const selectedService = services[activeService];

  return (
    <section
      id="servicios"
      className="relative overflow-hidden bg-[#0B0B0D] px-6 py-28 text-white md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 max-w-4xl"
        >
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-white/40">
            Servicios
          </p>

          <h2 className="text-5xl font-semibold leading-[0.92] tracking-tight md:text-7xl">
            ENTRENA
            <br />
            CON DIRECCIÓN.
          </h2>
        </motion.div>

        <div className="grid border-y border-white/15 lg:min-h-[620px] lg:grid-cols-[0.75fr_1.25fr]">
          {/* Selector de servicios */}
          <div className="border-white/15 lg:border-r">
            {services.map((service, index) => {
              const isActive = activeService === index;

              return (
                <button
                  key={service.number}
                  type="button"
                  onClick={() => setActiveService(index)}
                  className={`group flex w-full items-center gap-6 border-b border-white/15 px-2 py-7 text-left transition-colors duration-300 last:border-b-0 md:px-6 md:py-9 ${
                    isActive
                      ? "bg-white text-black"
                      : "bg-transparent text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <span
                    className={`text-sm tracking-[0.2em] ${
                      isActive ? "text-black/40" : "text-white/30"
                    }`}
                  >
                    {service.number}
                  </span>

                  <span className="flex-1 text-xl font-medium tracking-tight md:text-2xl">
                    {service.shortTitle}
                  </span>

                  <ArrowUpRight
                    size={24}
                    strokeWidth={1.5}
                    className={`transition-transform duration-300 ${
                      isActive
                        ? "translate-x-1 -translate-y-1 text-black"
                        : "text-white/25 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Contenido que cambia */}
          <div className="flex min-h-[550px] items-center px-2 py-16 md:px-12 lg:px-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedService.number}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <span className="text-7xl font-semibold leading-none text-white/[0.08] md:text-9xl">
                  {selectedService.number}
                </span>

                <h3 className="mt-10 max-w-2xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">
                  {selectedService.title}
                </h3>

                <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/70">
                  {selectedService.description}
                </p>

                <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/45 md:text-lg">
                  {selectedService.details}
                </p>

                <div className="mt-12 grid gap-x-8 gap-y-5 border-t border-white/15 pt-8 sm:grid-cols-2">
                  {selectedService.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-4 text-sm uppercase tracking-[0.12em] text-white/60"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}