"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type SectionId = "situaciones" | "metodo" | "filosofia" | "servicios";

type Section = {
  id: SectionId;
  number: string;
  label: string;
};

const sections: Section[] = [
  {
    id: "situaciones",
    number: "01",
    label: "Situaciones",
  },
  {
    id: "metodo",
    number: "02",
    label: "Método",
  },
  {
    id: "filosofia",
    number: "03",
    label: "Filosofía",
  },
  {
    id: "servicios",
    number: "04",
    label: "Servicios",
  },
];

const situations = [
  {
    title: "Me cuesta ser constante.",
    text: "No necesitas depender de la motivación. Construimos una estructura que puedas mantener incluso durante las semanas más complicadas.",
    solution:
      "Rutinas realistas, objetivos claros y un seguimiento que te ayuda a mantener el proceso.",
  },
  {
    title: "He dejado de progresar.",
    text: "Cuando entrenas sin una estrategia clara es fácil estancarse. Analizamos qué está frenando tu evolución.",
    solution:
      "Programación progresiva y ajustes basados en tu rendimiento real.",
  },
  {
    title: "No sé cómo organizarme.",
    text: "El entrenamiento debe adaptarse a tu vida, no competir contra ella. Simplificamos el proceso para que siempre sepas qué hacer.",
    solution:
      "Planificación semanal adaptada a tu disponibilidad y circunstancias.",
  },
  {
    title: "Quiero volver a entrenar.",
    text: "Volver no significa empezar desde cero. Diseñamos una progresión segura para recuperar capacidad, confianza y constancia.",
    solution:
      "Una vuelta gradual, controlada y completamente personalizada.",
  },
  {
    title: "Quiero recuperarme de una lesión.",
    text: "Después de una lesión o enfermedad es importante recuperar el entrenamiento de manera progresiva, controlada y adaptada a cada situación.",
    solution:
      "Planificamos una reincorporación progresiva, respetando tus limitaciones y las indicaciones de los profesionales sanitarios.",
  },
];

const methodSteps = [
  {
    number: "01",
    title: "Analizamos",
    text: "Estudiamos tu punto de partida, experiencia, disponibilidad, necesidades y objetivos.",
  },
  {
    number: "02",
    title: "Planificamos",
    text: "Creamos una estrategia realista, estructurada y completamente adaptada a ti.",
  },
  {
    number: "03",
    title: "Entrenamiento",
    text: "Recibes sesiones claras y progresivas para que sepas exactamente qué hacer en cada entrenamiento.",
  },
  {
    number: "04",
    title: "Medimos",
    text: "Revisamos tu rendimiento, sensaciones y evolución para tomar decisiones con criterio.",
  },
  {
    number: "05",
    title: "Ajustamos",
    text: "Tu planificación evoluciona contigo para que el progreso no se detenga.",
  },
];

const beliefs = [
  {
    number: "01",
    text: "Creemos en el método.",
  },
  {
    number: "02",
    text: "Creemos en la constancia.",
  },
  {
    number: "03",
    text: "Creemos en el progreso.",
  },
  {
    number: "04",
    text: "Creemos en resultados que perduran.",
  },
];

const services = [
  {
    number: "01",
    title: "AD Essential",
    subtitle: "Tu punto de partida",
    text: "Un acompañamiento pensado para personas que quieren empezar poco a poco en el mundo del entrenamiento, construir una base sólida y avanzar con seguridad.",
    features: [
      "Entrenamiento personalizado",
      "Videollamada mensual",
      "Revisión mensual",
      "Contacto con el entrenador",
      "Plan de nutrición adaptado",
      "Reajuste cuando sea necesario",
    ],
  },
  {
    number: "02",
    title: "AD Performance",
    subtitle: "Progreso sin estancamientos",
    text: "Para personas que ya entrenan y quieren evolucionar con más precisión. También es adecuado para deportistas que desean mejorar su rendimiento dentro de su disciplina.",
    features: [
      "Entrenamiento avanzado",
      "Videollamadas quincenales",
      "Revisiones quincenales",
      "Ajustes más precisos",
      "Seguimiento de la evolución",
      "Contacto prioritario",
    ],
  },
  {
    number: "03",
    title: "AD Elite",
    subtitle: "La máxima atención",
    text: "El nivel de seguimiento más completo para quienes buscan máxima disponibilidad, control constante y ajustes semanales basados en cada dato del proceso.",
    features: [
      "Contacto durante las 24 horas",
      "Videollamada semanal",
      "Revisión semanal",
      "Ajuste semanal del entrenamiento",
      "Ajuste semanal de la nutrición",
      "Análisis completo de métricas",
    ],
  },
];

export default function InteractiveExperience() {
  const [activeSection, setActiveSection] =
    useState<SectionId>("situaciones");

  const [activeSituation, setActiveSituation] = useState(0);
  const [activeMethod, setActiveMethod] = useState(0);
  const [activeService, setActiveService] = useState(0);

  const currentSectionIndex = sections.findIndex(
    (section) => section.id === activeSection
  );

  function goToPreviousSection() {
    const previousIndex =
      currentSectionIndex === 0
        ? sections.length - 1
        : currentSectionIndex - 1;

    setActiveSection(sections[previousIndex].id);
  }

  function goToNextSection() {
    const nextIndex =
      currentSectionIndex === sections.length - 1
        ? 0
        : currentSectionIndex + 1;

    setActiveSection(sections[nextIndex].id);
  }

  function goToPreviousMethod() {
    setActiveMethod((current) =>
      current === 0 ? methodSteps.length - 1 : current - 1
    );
  }

  function goToNextMethod() {
    setActiveMethod((current) =>
      current === methodSteps.length - 1 ? 0 : current + 1
    );
  }

  return (
    <section
      id="experiencia"
      className="relative overflow-hidden bg-[#090909] text-white"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-white/35">
              Explora AD Training
            </p>

            <h2 className="max-w-4xl text-[clamp(2.7rem,5vw,5.5rem)] font-semibold uppercase leading-[0.91] tracking-[-0.055em]">
              Un sistema.
              <br />
              Diferentes respuestas.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-white/45 sm:text-base">
            Selecciona una categoría y descubre cómo trabajamos sin abandonar
            la misma experiencia.
          </p>
        </div>

        <div className="grid lg:grid-cols-[300px_minmax(0,1fr)]">
          <nav className="min-w-0 border-white/10 lg:border-r">
            <div className="flex overflow-x-auto border-b border-white/10 lg:block lg:border-b-0 lg:pr-9 lg:pt-10">
              {sections.map((section) => {
                const isActive = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    onMouseEnter={() => setActiveSection(section.id)}
                    className={`group relative flex min-w-[175px] items-center justify-between border-r border-white/10 px-5 py-6 text-left transition-colors duration-300 last:border-r-0 lg:min-w-0 lg:w-full lg:border-b lg:border-r-0 lg:px-0 lg:py-7 ${
                      isActive
                        ? "text-white"
                        : "text-white/25 hover:text-white/65"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-[11px] tracking-[0.2em] text-white/25">
                        {section.number}
                      </span>

                      <span className="text-sm font-medium uppercase tracking-[0.14em]">
                        {section.label}
                      </span>
                    </div>

                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.5}
                      className={`hidden transition-all duration-300 lg:block ${
                        isActive
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-2 opacity-0"
                      }`}
                    />

                    {isActive && (
                      <motion.span
                        layoutId="active-navigation-line"
                        className="absolute bottom-0 left-0 h-px w-full bg-white"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 35,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="hidden pt-10 lg:block">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/20">
                {String(currentSectionIndex + 1).padStart(2, "0")} /{" "}
                {String(sections.length).padStart(2, "0")}
              </span>
            </div>
          </nav>

          <div className="min-w-0 lg:pl-12 lg:pt-10 xl:pl-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="min-h-[620px] min-w-0 py-10 lg:py-0"
              >
                {activeSection === "situaciones" && (
                  <div className="grid min-w-0 gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-center">
                    <div className="min-w-0">
                      <p className="mb-5 text-[11px] uppercase tracking-[0.25em] text-white/30">
                        El punto de partida
                      </p>

                      <h3 className="max-w-3xl text-[clamp(2.6rem,4.7vw,5.3rem)] font-semibold uppercase leading-[0.92] tracking-[-0.055em]">
                        No todos empiezan por el mismo motivo.
                      </h3>

                      <div className="mt-10">
                        {situations.map((situation, index) => (
                          <button
                            key={situation.title}
                            type="button"
                            onClick={() => setActiveSituation(index)}
                            onMouseEnter={() => setActiveSituation(index)}
                            className={`flex w-full items-center justify-between border-b border-white/10 py-5 text-left transition-colors ${
                              activeSituation === index
                                ? "text-white"
                                : "text-white/30 hover:text-white/65"
                            }`}
                          >
                            <span className="pr-5 text-sm font-medium uppercase tracking-[0.06em] sm:text-base">
                              {situation.title}
                            </span>

                            <span className="shrink-0 text-[11px] text-white/25">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSituation}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -14 }}
                        transition={{ duration: 0.35 }}
                        className="flex min-h-[400px] min-w-0 flex-col justify-between border border-white/10 bg-white/[0.025] p-7 sm:p-9 xl:p-11"
                      >
                        <span className="text-xs tracking-[0.2em] text-white/25">
                          {String(activeSituation + 1).padStart(2, "0")}
                        </span>

                        <div className="my-10">
                          <h4 className="max-w-xl text-[clamp(2rem,3.4vw,3.8rem)] font-semibold uppercase leading-[0.96] tracking-[-0.045em]">
                            {situations[activeSituation].title}
                          </h4>

                          <p className="mt-7 max-w-xl text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
                            {situations[activeSituation].text}
                          </p>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                          <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/25">
                            Cómo lo solucionamos
                          </p>

                          <p className="max-w-lg text-sm leading-7 text-white/75">
                            {situations[activeSituation].solution}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}

                {activeSection === "metodo" && (
                  <div className="flex min-h-[600px] min-w-0 flex-col justify-between">
                    <div className="grid min-w-0 gap-8 xl:grid-cols-[1fr_390px] xl:items-end">
                      <div className="min-w-0">
                        <p className="mb-5 text-[11px] uppercase tracking-[0.25em] text-white/30">
                          El sistema AD
                        </p>

                        <h3 className="max-w-3xl text-[clamp(2.6rem,4.7vw,5.3rem)] font-semibold uppercase leading-[0.92] tracking-[-0.055em]">
                          Progreso
                          <br />
                          con dirección.
                        </h3>
                      </div>

                      <p className="max-w-lg text-sm leading-7 text-white/45 sm:text-base sm:leading-8">
                        Cada decisión forma parte de un proceso. No improvisamos
                        entrenamientos: construimos una estrategia que puede
                        medirse, revisarse y evolucionar.
                      </p>
                    </div>

                    <div className="mt-14 grid grid-cols-5 gap-3">
                      {methodSteps.map((step, index) => {
                        const isActive = activeMethod === index;

                        return (
                          <button
                            key={step.number}
                            type="button"
                            onClick={() => setActiveMethod(index)}
                            className={`relative border-b py-4 text-left text-sm transition-colors ${
                              isActive
                                ? "border-white text-white"
                                : "border-white/10 text-white/25 hover:text-white/60"
                            }`}
                          >
                            {step.number}
                          </button>
                        );
                      })}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeMethod}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.35 }}
                        className="mt-12 grid min-w-0 items-center gap-8 md:grid-cols-[130px_minmax(0,1fr)_auto]"
                      >
                        <span className="text-[clamp(5rem,9vw,9rem)] font-semibold leading-none tracking-[-0.07em] text-white/[0.1]">
                          {methodSteps[activeMethod].number}
                        </span>

                        <div className="min-w-0">
                          <h4 className="text-2xl font-semibold uppercase tracking-[-0.03em] sm:text-3xl">
                            {methodSteps[activeMethod].title}
                          </h4>

                          <p className="mt-5 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
                            {methodSteps[activeMethod].text}
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={goToPreviousMethod}
                            className="flex h-12 w-12 items-center justify-center border border-white/20 transition-colors hover:bg-white hover:text-black"
                            aria-label="Paso anterior"
                          >
                            <ChevronLeft size={18} />
                          </button>

                          <button
                            type="button"
                            onClick={goToNextMethod}
                            className="flex h-12 w-12 items-center justify-center border border-white/20 transition-colors hover:bg-white hover:text-black"
                            aria-label="Paso siguiente"
                          >
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}

                {activeSection === "filosofia" && (
                  <div className="flex min-h-[600px] min-w-0 flex-col justify-center">
                    <p className="mb-5 text-[11px] uppercase tracking-[0.25em] text-white/30">
                      Nuestra filosofía
                    </p>

                    <h3 className="max-w-4xl text-[clamp(2.6rem,4.7vw,5.3rem)] font-semibold uppercase leading-[0.92] tracking-[-0.055em]">
                      No prometemos
                      <br />
                      milagros.
                    </h3>

                    <div className="mt-14 grid min-w-0 gap-x-8 border-t border-white/10 md:grid-cols-2">
                      {beliefs.map((belief, index) => (
                        <motion.div
                          key={belief.text}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.08 + index * 0.08,
                            duration: 0.4,
                          }}
                          className="flex min-w-0 items-start gap-5 border-b border-white/10 py-7"
                        >
                          <span className="mt-1 shrink-0 text-[10px] text-white/20">
                            {belief.number}
                          </span>

                          <p className="text-base font-medium uppercase leading-7 tracking-[-0.01em] text-white/70 sm:text-lg">
                            {belief.text}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === "servicios" && (
                  <div className="grid min-w-0 gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-center">
                    <div className="min-w-0">
                      <p className="mb-5 text-[11px] uppercase tracking-[0.25em] text-white/30">
                        Los planes AD
                      </p>

                      <h3 className="max-w-2xl break-words text-[clamp(2.3rem,3.8vw,4.6rem)] font-semibold uppercase leading-[0.94] tracking-[-0.05em]">
                        Elige tu nivel de acompañamiento.
                      </h3>

                      <p className="mt-6 max-w-xl text-sm leading-7 text-white/45 sm:text-base">
                        Pasa el ratón sobre cada plan para conocer el seguimiento
                        y la atención que incluye.
                      </p>

                      <div className="mt-9">
                        {services.map((service, index) => (
                          <button
                            key={service.title}
                            type="button"
                            onClick={() => setActiveService(index)}
                            onMouseEnter={() => setActiveService(index)}
                            className={`flex w-full items-center justify-between gap-5 border-b border-white/10 py-5 text-left transition-colors ${
                              activeService === index
                                ? "text-white"
                                : "text-white/30 hover:text-white/65"
                            }`}
                          >
                            <div className="flex items-center gap-5">
                              <span className="shrink-0 text-[11px] text-white/25">
                                {service.number}
                              </span>

                              <div>
                                <span className="block text-sm font-medium uppercase tracking-[0.09em] sm:text-base">
                                  {service.title}
                                </span>

                                <span className="mt-1 block text-xs text-white/30">
                                  {service.subtitle}
                                </span>
                              </div>
                            </div>

                            <ArrowUpRight
                              size={16}
                              className={`shrink-0 transition-all ${
                                activeService === index
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeService}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.35 }}
                        className="relative min-w-0 overflow-hidden border border-white/10 bg-white/[0.025] p-7 sm:p-9 xl:p-11"
                      >
                        <span className="pointer-events-none absolute right-4 top-2 text-[110px] font-semibold leading-none tracking-[-0.08em] text-white/[0.035] sm:text-[150px]">
                          {services[activeService].number}
                        </span>

                        <div className="relative min-w-0">
                          <span className="text-[10px] uppercase tracking-[0.25em] text-white/25">
                            Plan {services[activeService].number}
                          </span>

                          <h4 className="mt-12 max-w-2xl break-words text-[clamp(2rem,3.3vw,3.8rem)] font-semibold uppercase leading-[0.94] tracking-[-0.05em]">
                            {services[activeService].title}
                          </h4>

                          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-white/35">
                            {services[activeService].subtitle}
                          </p>

                          <p className="mt-7 max-w-2xl text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
                            {services[activeService].text}
                          </p>

                          <div className="mt-9 grid gap-x-7 sm:grid-cols-2">
                            {services[activeService].features.map((feature) => (
                              <div
                                key={feature}
                                className="flex min-w-0 items-start gap-3 border-t border-white/10 py-4"
                              >
                                <Check
                                  size={15}
                                  strokeWidth={1.5}
                                  className="mt-0.5 shrink-0 text-white/45"
                                />

                                <span className="text-sm leading-6 text-white/70">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>

                          <a
                            href="#planes"
                            className="mt-10 inline-flex items-center gap-3 border-b border-white pb-2 text-[11px] font-medium uppercase tracking-[0.2em] transition-opacity hover:opacity-50"
                          >
                            Ver todos los planes
                            <ArrowUpRight size={15} />
                          </a>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-6">
          <button
            type="button"
            onClick={goToPreviousSection}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/35 transition-colors hover:text-white sm:text-xs"
          >
            <ChevronLeft size={15} />
            Anterior
          </button>

          <span className="hidden text-[10px] uppercase tracking-[0.25em] text-white/20 sm:block">
            Explora cada sección
          </span>

          <button
            type="button"
            onClick={goToNextSection}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/35 transition-colors hover:text-white sm:text-xs"
          >
            Siguiente
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}