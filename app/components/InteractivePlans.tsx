"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";

const plans = [
  {
    id: "essential",
    number: "01",
    name: "AD Essential",
    subtitle: "Tu punto de partida",
    price: "80€",
    period: "/ mes",
    quarterlyPrice: "225€",
    quarterlyPeriod: "/ trimestre",
    description:
      "Una planificación personalizada para empezar o seguir avanzando con una estructura adaptada a ti.",
    idealFor:
      "Ideal si buscas mejorar tu composición corporal, ganar fuerza, crear constancia y llevar una planificación adaptada a tu día a día.",
    features: [
      "Planificación semanal de entrenamiento",
      "Planificación de nutrición",
      "Seguimiento mediante Harbiz",
      "Feedback y soporte vía WhatsApp / Chat Harbiz",
      "Revisión cada 15 días",
    ],
    cta: "Elegir Essential",
  },
  {
    id: "elite",
    number: "02",
    name: "AD Elite",
    subtitle: "Un seguimiento más cercano",
    price: "120€",
    period: "/ mes",
    quarterlyPrice: "300€",
    quarterlyPeriod: "/ trimestre",
    description:
      "Un acompañamiento más completo para quienes buscan un seguimiento más frecuente durante todo el proceso.",
    idealFor:
      "Ideal si quieres un mayor control de tu evolución, revisiones frecuentes y feedback técnico durante tus entrenamientos.",
    features: [
      "Planificación semanal de entrenamiento",
      "Planificación de nutrición",
      "Seguimiento mediante Harbiz",
      "Feedback y soporte vía WhatsApp / Chat Harbiz",
      "Revisión semanal",
      "Corrección de patrones básicos mediante vídeo",
    ],
    cta: "Elegir Elite",
  },
];

export default function InteractivePlans() {
  const [activePlan, setActivePlan] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const selectedPlan = plans[activePlan];

  function handleChoosePlan() {
    window.dispatchEvent(
      new CustomEvent("planSelected", {
        detail: selectedPlan.name,
      })
    );

    document
      .getElementById("valoracion")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="planes"
      className="relative overflow-hidden bg-[#f4f4f2] text-[#0a0a0a]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(0,0,0,0.035),transparent_32%)]" />

      <div className="relative mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:py-32">
        <motion.div
          initial={
            shouldReduceMotion ? false : { opacity: 0, y: 24 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid gap-10 border-b border-black/10 pb-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:pb-14"
        >
          <div>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.3em] text-black/40 sm:text-xs">
              Elige tu plan
            </p>

            <h2 className="max-w-4xl text-[clamp(2.8rem,5vw,5.4rem)] font-semibold uppercase leading-[0.91] tracking-[-0.055em]">
              Dos planes.
              <br />
              Un mismo compromiso.
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-black/50 sm:text-base sm:leading-8 lg:justify-self-end">
            Selecciona el nivel de acompañamiento que mejor se adapta a tu
            objetivo. El contenido cambia sin abandonar la misma sección.
          </p>
        </motion.div>

        <div className="grid gap-8 pt-10 lg:grid-cols-[330px_minmax(0,1fr)] lg:gap-10 lg:pt-12 xl:grid-cols-[390px_minmax(0,1fr)] xl:gap-14">
          <motion.div
            initial={
              shouldReduceMotion ? false : { opacity: 0, x: -24 }
            }
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="min-w-0"
          >
            <div className="overflow-hidden border border-black/10 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.04)]">
              {plans.map((plan, index) => {
                const isActive = activePlan === index;

                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setActivePlan(index)}
                    onMouseEnter={() => setActivePlan(index)}
                    aria-pressed={isActive}
                    className={`group relative flex w-full items-center justify-between border-b border-black/10 px-5 py-6 text-left transition-colors duration-500 last:border-b-0 sm:px-6 sm:py-7 ${
                      isActive
                        ? "bg-[#0a0a0a] text-white"
                        : "bg-white text-black hover:bg-black/[0.025]"
                    }`}
                  >
                    <div className="min-w-0 pr-5">
                      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                        <span
                          className={`text-[11px] tracking-[0.2em] transition-colors duration-500 ${
                            isActive
                              ? "text-white/35"
                              : "text-black/30"
                          }`}
                        >
                          {plan.number}
                        </span>
                      </div>

                      <h3 className="text-base font-semibold uppercase tracking-[-0.02em] sm:text-lg">
                        {plan.name}
                      </h3>

                      <p
                        className={`mt-1 text-sm transition-colors duration-500 ${
                          isActive
                            ? "text-white/45"
                            : "text-black/45"
                        }`}
                      >
                        {plan.subtitle}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.5}
                      className={`shrink-0 transition-all duration-500 ${
                        isActive
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                      }`}
                    />

                    {isActive && (
                      <motion.span
                        layoutId="active-plan-indicator"
                        className="absolute bottom-0 left-0 h-px w-full bg-white"
                        transition={{
                          type: "spring",
                          stiffness: 320,
                          damping: 32,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <p className="mt-6 max-w-sm text-xs leading-6 text-black/40">
              Todos los planes se adaptan al nivel, disponibilidad y objetivos
              de cada persona.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.article
              key={selectedPlan.id}
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 26 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: -18 }
              }
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative min-w-0 overflow-hidden border border-black/10 bg-white shadow-[0_28px_90px_rgba(0,0,0,0.055)]"
            >
              <span className="pointer-events-none absolute -right-3 -top-3 text-[125px] font-semibold leading-none tracking-[-0.08em] text-black/[0.025] sm:text-[180px] lg:text-[220px] xl:text-[250px]">
                {selectedPlan.number}
              </span>

              <div className="relative p-6 sm:p-9 lg:p-12 xl:p-16">
                <div className="grid gap-10 border-b border-black/10 pb-10 sm:pb-12 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-start xl:gap-14">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-black/35 sm:text-xs">
                        Plan {selectedPlan.number}
                      </span>
                    </div>

                    <h3 className="mt-7 max-w-3xl break-words text-[clamp(2.5rem,5vw,4.8rem)] font-semibold uppercase leading-[0.92] tracking-[-0.055em]">
                      {selectedPlan.name}
                    </h3>

                    <p className="mt-4 text-xs uppercase tracking-[0.14em] text-black/35 sm:text-sm">
                      {selectedPlan.subtitle}
                    </p>
                  </div>

                  <div className="border-t border-black/10 pt-8 xl:min-w-[280px] xl:border-l xl:border-t-0 xl:pl-10 xl:pt-0 xl:text-right">
                    <div className="flex items-end gap-2 xl:justify-end">
                      <span className="text-[clamp(4.3rem,8vw,7.5rem)] font-semibold leading-[0.78] tracking-[-0.075em]">
                        {selectedPlan.price}
                      </span>

                      <span className="pb-1 text-sm text-black/35 sm:pb-2">
                        {selectedPlan.period}
                      </span>
                    </div>

                    <div className="mt-6 border-t border-black/10 pt-5">
                      <span className="text-2xl font-semibold tracking-[-0.04em]">
                        {selectedPlan.quarterlyPrice}
                      </span>

                      <span className="ml-2 text-sm text-black/35">
                        {selectedPlan.quarterlyPeriod}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-12 pt-10 sm:pt-12 xl:grid-cols-[0.85fr_1.15fr] xl:gap-16">
                  <div className="min-w-0">
                    <p className="max-w-xl text-base leading-8 text-black/70 sm:text-lg">
                      {selectedPlan.description}
                    </p>

                    <div className="mt-9 border-l-2 border-black pl-5 sm:mt-10 sm:pl-6">
                      <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-black/35 sm:text-[11px]">
                        Recomendado para
                      </p>

                      <p className="max-w-lg text-sm leading-7 text-black/60">
                        {selectedPlan.idealFor}
                      </p>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.25em] text-black/35 sm:mb-6 sm:text-[11px]">
                      Qué incluye
                    </p>

                    <div className="grid gap-x-8 sm:grid-cols-2">
                      {selectedPlan.features.map(
                        (feature, featureIndex) => (
                          <motion.div
                            key={feature}
                            initial={
                              shouldReduceMotion
                                ? false
                                : { opacity: 0, y: 10 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.35,
                              delay: featureIndex * 0.045,
                            }}
                            className="flex min-w-0 items-start gap-3 border-t border-black/10 py-5"
                          >
                            <Check
                              size={16}
                              strokeWidth={1.5}
                              className="mt-0.5 shrink-0 text-black/50"
                            />

                            <span className="text-sm leading-6 text-black/65">
                              {feature}
                            </span>
                          </motion.div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-col gap-6 border-t border-black/10 pt-8 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-md text-xs leading-6 text-black/35">
                    Antes de comenzar realizamos una valoración para confirmar
                    cuál es el plan más adecuado para ti.
                  </p>

                  <button
                    type="button"
                    onClick={handleChoosePlan}
                    className="group inline-flex min-h-14 w-full items-center justify-center gap-3 bg-[#0a0a0a] px-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-black/85 hover:shadow-[0_14px_35px_rgba(0,0,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 focus-visible:ring-offset-white sm:w-auto sm:text-xs"
                  >
                    {selectedPlan.cta}

                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
