"use client";

import {
  FormEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

type FormData = {
  name: string;
  age: string;
  city: string;
  objective: string;
  objectiveDetails: string;
  trainingStatus: string;
  experience: string;
  trainingDays: string;
  trainingPlace: string;
  hasInjuries: string;
  injuryDetails: string;
  medicalConditions: string;
  medicalApproval: string;
  mainObstacle: string;
  commitment: string;
  selectedPlan: string;
  phone: string;
  email: string;
  contactPreference: string;
  privacyAccepted: boolean;
};

const initialFormData: FormData = {
  name: "",
  age: "",
  city: "",
  objective: "",
  objectiveDetails: "",
  trainingStatus: "",
  experience: "",
  trainingDays: "",
  trainingPlace: "",
  hasInjuries: "",
  injuryDetails: "",
  medicalConditions: "",
  medicalApproval: "",
  mainObstacle: "",
  commitment: "",
  selectedPlan: "",
  phone: "",
  email: "",
  contactPreference: "",
  privacyAccepted: false,
};

const stepLabels = [
  "Datos personales",
  "Objetivo",
  "Experiencia",
  "Disponibilidad",
  "Lesiones y salud",
  "Situación actual",
  "Contacto",
];

const totalSteps = stepLabels.length;

const objectives = [
  "Perder grasa",
  "Ganar masa muscular",
  "Recomposición corporal",
  "Mejorar el rendimiento",
  "Mejorar hábitos y salud",
  "Volver a entrenar",
  "Recuperarme de una lesión",
];

const experienceOptions = [
  "Nunca he entrenado",
  "Menos de 1 año",
  "Entre 1 y 3 años",
  "Más de 3 años",
];

const trainingDayOptions = [
  "2 días",
  "3 días",
  "4 días",
  "5 o más días",
];

const trainingPlaces = ["Gimnasio", "Casa", "Ambos"];

const plans = [
  "No estoy seguro",
  "AD Essential",
  "AD Performance",
  "AD Elite",
];

const contactOptions = [
  "WhatsApp",
  "Llamada telefónica",
  "Correo electrónico",
];

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] =
    useState<FormData>(initialFormData);
  const [error, setError] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formTopRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    function handlePlanSelected(event: Event) {
      const customEvent = event as CustomEvent<string>;

      setFormData((current) => ({
        ...current,
        selectedPlan: customEvent.detail,
      }));

      setError("");
    }

    window.addEventListener("planSelected", handlePlanSelected);

    return () => {
      window.removeEventListener(
        "planSelected",
        handlePlanSelected
      );
    };
  }, []);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const scrollTimeout = window.setTimeout(() => {
      formTopRef.current?.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }, 120);

    return () => {
      window.clearTimeout(scrollTimeout);
    };
  }, [currentStep, isCompleted, shouldReduceMotion]);

  const progress = isCompleted
    ? 100
    : (currentStep / totalSteps) * 100;

  function updateField<K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
  }

  function validateCurrentStep() {
    if (currentStep === 1) {
      if (!formData.name.trim()) {
        return "Escribe tu nombre y apellidos.";
      }

      if (!formData.age.trim()) {
        return "Indica tu edad.";
      }
    }

    if (currentStep === 2) {
      if (!formData.objective) {
        return "Selecciona tu objetivo principal.";
      }

      if (!formData.objectiveDetails.trim()) {
        return "Cuéntanos brevemente qué te gustaría conseguir.";
      }
    }

    if (currentStep === 3) {
      if (!formData.trainingStatus) {
        return "Indica si entrenas actualmente.";
      }

      if (!formData.experience) {
        return "Selecciona tu nivel de experiencia.";
      }
    }

    if (currentStep === 4) {
      if (!formData.trainingDays) {
        return "Selecciona cuántos días puedes entrenar.";
      }

      if (!formData.trainingPlace) {
        return "Indica dónde entrenarías normalmente.";
      }
    }

    if (currentStep === 5) {
      if (!formData.hasInjuries) {
        return "Indica si tienes alguna lesión o molestia.";
      }

      if (
        formData.hasInjuries === "Sí" &&
        !formData.injuryDetails.trim()
      ) {
        return "Describe brevemente la lesión o molestia.";
      }

      if (!formData.medicalApproval) {
        return "Selecciona una respuesta sobre la recomendación médica.";
      }
    }

    if (currentStep === 6) {
      if (!formData.mainObstacle.trim()) {
        return "Cuéntanos qué te ha impedido progresar hasta ahora.";
      }

      if (!formData.commitment) {
        return "Selecciona tu nivel de compromiso.";
      }
    }

    if (currentStep === 7) {
      if (!formData.phone.trim()) {
        return "Escribe un número de teléfono.";
      }

      if (!formData.email.trim()) {
        return "Escribe un correo electrónico.";
      }

      if (!formData.contactPreference) {
        return "Selecciona cómo prefieres que contactemos contigo.";
      }

      if (!formData.privacyAccepted) {
        return "Debes aceptar la política de privacidad.";
      }
    }

    return "";
  }

  function nextStep() {
    const validationError = validateCurrentStep();

    if (validationError) {
      setError(validationError);
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep((current) => current + 1);
      setError("");
    }
  }

  function previousStep() {
    if (currentStep > 1) {
      setCurrentStep((current) => current - 1);
      setError("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const validationError = validateCurrentStep();

    if (validationError) {
      setIsSubmitting(false);
      setError(validationError);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.name,
          email: formData.email,
          telefono: formData.phone,
          objetivo: formData.objective,
          mensaje: `
Ciudad: ${formData.city}

Objetivo:
${formData.objectiveDetails}

Entrena actualmente:
${formData.trainingStatus}

Experiencia:
${formData.experience}

Días disponibles:
${formData.trainingDays}

Lugar:
${formData.trainingPlace}

Lesiones:
${formData.hasInjuries}

Detalle lesión:
${formData.injuryDetails}

Patologías:
${formData.medicalConditions}

Aprobación médica:
${formData.medicalApproval}

Principal obstáculo:
${formData.mainObstacle}

Compromiso:
${formData.commitment}/10

Plan:
${formData.selectedPlan}

Preferencia de contacto:
${formData.contactPreference}
          `,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar");
      }

      setIsCompleted(true);
    } catch (error) {
      setError(
        "Ha ocurrido un error al enviar el formulario. Inténtalo de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function restartForm() {
    setFormData(initialFormData);
    setCurrentStep(1);
    setError("");
    setIsCompleted(false);
    setIsSubmitting(false);
  }

  return (
    <section
      id="valoracion"
      className="relative overflow-hidden bg-[#0a0a0a] text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.055),transparent_31%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.018] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:76px_76px]" />

      <div className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:py-32">
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
          className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end lg:pb-14"
        >
          <div>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.3em] text-white/35">
              Valoración inicial
            </p>

            <h2 className="max-w-4xl text-[clamp(2.7rem,5vw,5.5rem)] font-semibold uppercase leading-[0.91] tracking-[-0.055em]">
              Cuéntanos
              <br />
              tu situación.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-white/45 sm:text-base sm:leading-8 lg:justify-self-end">
            Completa este breve formulario. Revisaremos personalmente
            tus respuestas antes de contactar contigo para organizar
            una videollamada.
          </p>
        </motion.div>

        <div className="grid border-b border-white/10 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="border-white/10 py-8 lg:border-r lg:py-10 lg:pr-10">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center justify-between lg:block">
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/25">
                  Proceso
                </p>

                <span className="text-[10px] uppercase tracking-[0.2em] text-white/25 lg:hidden">
                  {isCompleted
                    ? "Completado"
                    : `${String(currentStep).padStart(2, "0")} / 0${totalSteps}`}
                </span>
              </div>

              <div className="mt-6 hidden lg:block">
                {stepLabels.map((label, index) => {
                  const stepNumber = index + 1;
                  const isActive =
                    !isCompleted && currentStep === stepNumber;
                  const isFinished =
                    currentStep > stepNumber || isCompleted;

                  return (
                    <div
                      key={label}
                      className={`group flex items-center gap-4 border-b border-white/10 py-4 transition-colors duration-300 ${
                        isActive
                          ? "text-white"
                          : isFinished
                            ? "text-white/55"
                            : "text-white/20"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center border text-[10px] transition-colors duration-300 ${
                          isActive
                            ? "border-white bg-white text-black"
                            : "border-white/15"
                        }`}
                      >
                        {isFinished ? (
                          <Check size={13} />
                        ) : (
                          `0${stepNumber}`
                        )}
                      </span>

                      <span className="text-xs font-medium uppercase tracking-[0.12em]">
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 lg:mt-8">
                <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/25">
                  <span>Progreso</span>
                  <span>{Math.round(progress)}%</span>
                </div>

                <div className="h-px overflow-hidden bg-white/10">
                  <motion.div
                    className="h-full bg-white"
                    animate={{ width: `${progress}%` }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              </div>
            </div>
          </aside>

          <div
            ref={formTopRef}
            className="min-w-0 scroll-mt-28 py-10 lg:min-h-[680px] lg:pl-12 xl:pl-16"
          >
            <AnimatePresence mode="wait">
              {!isCompleted ? (
                <motion.form
                  key={currentStep}
                  onSubmit={handleSubmit}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 20 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: -14 }
                  }
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex min-h-[590px] flex-col justify-between"
                >
                  <div>
                    <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-5">
                      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/25">
                        Paso {String(currentStep).padStart(2, "0")}
                      </span>

                      <span className="text-[10px] uppercase tracking-[0.2em] text-white/20">
                        {String(currentStep).padStart(2, "0")} / 0
                        {totalSteps}
                      </span>
                    </div>

                    {currentStep === 1 && (
                      <div>
                        <StepHeading
                          eyebrow="Empecemos por lo básico"
                          title="¿Quién eres?"
                          description="Necesitamos algunos datos básicos para poder dirigirnos a ti y comprender mejor tu situación."
                        />

                        <div className="mt-12 grid gap-7 sm:grid-cols-2">
                          <TextField
                            label="Nombre y apellidos"
                            value={formData.name}
                            placeholder="Escribe tu nombre"
                            autoComplete="name"
                            onChange={(value) =>
                              updateField("name", value)
                            }
                          />

                          <TextField
                            label="Edad"
                            value={formData.age}
                            placeholder="Ejemplo: 32"
                            type="number"
                            inputMode="numeric"
                            onChange={(value) =>
                              updateField("age", value)
                            }
                          />

                          <div className="sm:col-span-2">
                            <TextField
                              label="Ciudad"
                              value={formData.city}
                              placeholder="¿Dónde vives?"
                              autoComplete="address-level2"
                              onChange={(value) =>
                                updateField("city", value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div>
                        <StepHeading
                          eyebrow="Tu punto de partida"
                          title="¿Qué quieres conseguir?"
                          description="Selecciona el objetivo que mejor representa lo que buscas en este momento."
                        />

                        <div className="mt-12 grid gap-3 sm:grid-cols-2">
                          {objectives.map((objective) => (
                            <OptionButton
                              key={objective}
                              label={objective}
                              selected={
                                formData.objective === objective
                              }
                              onClick={() =>
                                updateField("objective", objective)
                              }
                            />
                          ))}
                        </div>

                        <div className="mt-8">
                          <TextAreaField
                            label="¿Qué te gustaría conseguir exactamente?"
                            value={formData.objectiveDetails}
                            placeholder="Cuéntanos brevemente cuál sería un buen resultado para ti..."
                            onChange={(value) =>
                              updateField(
                                "objectiveDetails",
                                value
                              )
                            }
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div>
                        <StepHeading
                          eyebrow="Experiencia"
                          title="¿Cuál es tu nivel actual?"
                          description="No importa desde dónde empieces. Esta información nos ayuda a valorar el tipo de acompañamiento que necesitas."
                        />

                        <QuestionBlock label="¿Entrenas actualmente?">
                          <div className="grid gap-3 sm:grid-cols-2">
                            {["Sí", "No"].map((option) => (
                              <OptionButton
                                key={option}
                                label={option}
                                selected={
                                  formData.trainingStatus === option
                                }
                                onClick={() =>
                                  updateField(
                                    "trainingStatus",
                                    option
                                  )
                                }
                              />
                            ))}
                          </div>
                        </QuestionBlock>

                        <QuestionBlock label="¿Cuánta experiencia tienes entrenando?">
                          <div className="grid gap-3 sm:grid-cols-2">
                            {experienceOptions.map((option) => (
                              <OptionButton
                                key={option}
                                label={option}
                                selected={
                                  formData.experience === option
                                }
                                onClick={() =>
                                  updateField("experience", option)
                                }
                              />
                            ))}
                          </div>
                        </QuestionBlock>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div>
                        <StepHeading
                          eyebrow="Disponibilidad"
                          title="Hagámoslo realista."
                          description="El mejor programa es el que puede encajar de forma sostenible en tu vida."
                        />

                        <QuestionBlock label="¿Cuántos días puedes entrenar cada semana?">
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {trainingDayOptions.map((option) => (
                              <OptionButton
                                key={option}
                                label={option}
                                selected={
                                  formData.trainingDays === option
                                }
                                onClick={() =>
                                  updateField(
                                    "trainingDays",
                                    option
                                  )
                                }
                              />
                            ))}
                          </div>
                        </QuestionBlock>

                        <QuestionBlock label="¿Dónde entrenarías normalmente?">
                          <div className="grid gap-3 sm:grid-cols-3">
                            {trainingPlaces.map((place) => (
                              <OptionButton
                                key={place}
                                label={place}
                                selected={
                                  formData.trainingPlace === place
                                }
                                onClick={() =>
                                  updateField(
                                    "trainingPlace",
                                    place
                                  )
                                }
                              />
                            ))}
                          </div>
                        </QuestionBlock>
                      </div>
                    )}

                    {currentStep === 5 && (
                      <div>
                        <StepHeading
                          eyebrow="Lesiones y salud"
                          title="Entrenar también es cuidar."
                          description="Esta información es importante para valorar si el entrenamiento debe adaptarse o si necesitas consultar previamente con un profesional sanitario."
                        />

                        <QuestionBlock label="¿Tienes actualmente alguna lesión, dolor o molestia recurrente?">
                          <div className="grid gap-3 sm:grid-cols-2">
                            {["Sí", "No"].map((option) => (
                              <OptionButton
                                key={option}
                                label={option}
                                selected={
                                  formData.hasInjuries === option
                                }
                                onClick={() =>
                                  updateField(
                                    "hasInjuries",
                                    option
                                  )
                                }
                              />
                            ))}
                          </div>
                        </QuestionBlock>

                        <AnimatePresence initial={false}>
                          {formData.hasInjuries === "Sí" && (
                            <motion.div
                              initial={
                                shouldReduceMotion
                                  ? false
                                  : {
                                      opacity: 0,
                                      height: 0,
                                    }
                              }
                              animate={{
                                opacity: 1,
                                height: "auto",
                              }}
                              exit={{
                                opacity: 0,
                                height: 0,
                              }}
                              transition={{
                                duration: shouldReduceMotion
                                  ? 0
                                  : 0.35,
                              }}
                              className="overflow-hidden"
                            >
                              <div className="pt-8">
                                <TextAreaField
                                  label="Describe la lesión o molestia"
                                  value={formData.injuryDetails}
                                  placeholder="Indica dónde está, desde cuándo la tienes y qué movimientos te molestan..."
                                  onChange={(value) =>
                                    updateField(
                                      "injuryDetails",
                                      value
                                    )
                                  }
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="mt-8">
                          <TextAreaField
                            label="¿Tienes alguna patología, medicación o recomendación médica relevante?"
                            value={formData.medicalConditions}
                            placeholder="Puedes escribir “No” si no existe ninguna..."
                            onChange={(value) =>
                              updateField(
                                "medicalConditions",
                                value
                              )
                            }
                          />
                        </div>

                        <QuestionBlock label="¿Un profesional sanitario te ha indicado que puedes realizar ejercicio?">
                          <div className="grid gap-3 sm:grid-cols-3">
                            {[
                              "Sí",
                              "No lo he consultado",
                              "No es necesario",
                            ].map((option) => (
                              <OptionButton
                                key={option}
                                label={option}
                                selected={
                                  formData.medicalApproval ===
                                  option
                                }
                                onClick={() =>
                                  updateField(
                                    "medicalApproval",
                                    option
                                  )
                                }
                              />
                            ))}
                          </div>
                        </QuestionBlock>

                        <p className="mt-6 max-w-3xl border-l border-white/15 pl-4 text-xs leading-6 text-white/30">
                          Este formulario no sustituye una valoración
                          médica. Ante una lesión, patología o dolor
                          importante, podremos solicitar autorización
                          de un profesional sanitario antes de
                          comenzar.
                        </p>
                      </div>
                    )}

                    {currentStep === 6 && (
                      <div>
                        <StepHeading
                          eyebrow="Conocerte mejor"
                          title="¿Qué te ha frenado hasta ahora?"
                          description="Queremos comprender qué ha ocurrido anteriormente para no repetir el mismo enfoque."
                        />

                        <div className="mt-12">
                          <TextAreaField
                            label="¿Cuál ha sido tu principal obstáculo?"
                            value={formData.mainObstacle}
                            placeholder="Falta de tiempo, constancia, planificación, motivación, molestias..."
                            onChange={(value) =>
                              updateField(
                                "mainObstacle",
                                value
                              )
                            }
                          />
                        </div>

                        <QuestionBlock label="¿Cómo valorarías tu compromiso actual?">
                          <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
                            {Array.from(
                              { length: 10 },
                              (_, index) => {
                                const value = String(index + 1);

                                return (
                                  <OptionButton
                                    key={value}
                                    label={value}
                                    selected={
                                      formData.commitment === value
                                    }
                                    onClick={() =>
                                      updateField(
                                        "commitment",
                                        value
                                      )
                                    }
                                    compact
                                  />
                                );
                              }
                            )}
                          </div>

                          <div className="mt-3 flex justify-between gap-4 text-[9px] uppercase tracking-[0.14em] text-white/25 sm:text-[10px] sm:tracking-[0.16em]">
                            <span>Poco preparado</span>
                            <span className="text-right">
                              Totalmente comprometido
                            </span>
                          </div>
                        </QuestionBlock>

                        <QuestionBlock label="¿Qué plan te interesa inicialmente?">
                          <div className="relative">
                            <select
                              value={formData.selectedPlan}
                              onChange={(event) =>
                                updateField(
                                  "selectedPlan",
                                  event.target.value
                                )
                              }
                              className="min-h-14 w-full appearance-none border border-white/15 bg-transparent px-5 pr-12 text-sm text-white outline-none transition-colors duration-300 focus:border-white/55"
                            >
                              <option
                                value=""
                                className="bg-[#111111]"
                              >
                                Selecciona una opción
                              </option>

                              {plans.map((plan) => (
                                <option
                                  key={plan}
                                  value={plan}
                                  className="bg-[#111111]"
                                >
                                  {plan}
                                </option>
                              ))}
                            </select>

                            <ChevronDown
                              size={17}
                              className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white/35"
                            />
                          </div>
                        </QuestionBlock>
                      </div>
                    )}

                    {currentStep === 7 && (
                      <div>
                        <StepHeading
                          eyebrow="Último paso"
                          title="¿Cómo contactamos contigo?"
                          description="Revisaremos tus respuestas y contactaremos contigo para organizar una videollamada de valoración."
                        />

                        <div className="mt-12 grid gap-7 sm:grid-cols-2">
                          <TextField
                            label="Teléfono"
                            value={formData.phone}
                            placeholder="Tu número de teléfono"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            onChange={(value) =>
                              updateField("phone", value)
                            }
                          />

                          <TextField
                            label="Correo electrónico"
                            value={formData.email}
                            placeholder="nombre@correo.com"
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            onChange={(value) =>
                              updateField("email", value)
                            }
                          />
                        </div>

                        <QuestionBlock label="¿Cómo prefieres que contactemos contigo?">
                          <div className="grid gap-3 sm:grid-cols-3">
                            {contactOptions.map((option) => (
                              <OptionButton
                                key={option}
                                label={option}
                                selected={
                                  formData.contactPreference ===
                                  option
                                }
                                onClick={() =>
                                  updateField(
                                    "contactPreference",
                                    option
                                  )
                                }
                              />
                            ))}
                          </div>
                        </QuestionBlock>

                        <label className="mt-9 flex cursor-pointer items-start gap-4 border-t border-white/10 pt-6">
                          <input
                            type="checkbox"
                            checked={formData.privacyAccepted}
                            onChange={(event) =>
                              updateField(
                                "privacyAccepted",
                                event.target.checked
                              )
                            }
                            className="peer sr-only"
                          />

                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors duration-300 ${
                              formData.privacyAccepted
                                ? "border-white bg-white text-black"
                                : "border-white/25 peer-focus-visible:ring-2 peer-focus-visible:ring-white peer-focus-visible:ring-offset-4 peer-focus-visible:ring-offset-black"
                            }`}
                          >
                            {formData.privacyAccepted && (
                              <Check
                                size={13}
                                strokeWidth={2.5}
                              />
                            )}
                          </span>

                          <span className="text-xs leading-6 text-white/40">
                            Acepto que AD TRAINING utilice estos
                            datos para valorar mi solicitud y ponerse
                            en contacto conmigo. Los datos de salud
                            se utilizarán únicamente para valorar la
                            adaptación y seguridad del servicio.
                          </span>
                        </label>
                      </div>
                    )}

                    <AnimatePresence>
                      {error && (
                        <motion.p
                          role="alert"
                          initial={
                            shouldReduceMotion
                              ? false
                              : { opacity: 0, y: 6 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="mt-8 border-l-2 border-white bg-white/[0.035] px-4 py-3 text-sm text-white/75"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-12 flex items-center justify-between gap-4 border-t border-white/10 pt-7">
                    <button
                      type="button"
                      onClick={previousStep}
                      disabled={currentStep === 1}
                      className="group flex min-h-12 items-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white/35 transition-colors duration-300 hover:text-white disabled:pointer-events-none disabled:opacity-0 sm:text-xs"
                    >
                      <ArrowLeft
                        size={16}
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                      />
                      Anterior
                    </button>

                    {currentStep < totalSteps ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="group inline-flex min-h-14 items-center justify-center gap-3 bg-white px-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition-all duration-500 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-[0_14px_35px_rgba(255,255,255,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black sm:px-7 sm:text-xs"
                      >
                        Continuar

                        <ArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                        className="group inline-flex min-h-14 items-center justify-center gap-3 bg-white px-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition-all duration-500 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-[0_14px_35px_rgba(255,255,255,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none sm:px-7 sm:text-xs"
                      >
                        {isSubmitting
                          ? "Enviando solicitud..."
                          : "Solicitar valoración"}

                        <ArrowRight
                          size={16}
                          className={`transition-transform duration-300 ${
                            isSubmitting
                              ? ""
                              : "group-hover:translate-x-1"
                          }`}
                        />
                      </button>
                    )}
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="completed"
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 24 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex min-h-[590px] flex-col justify-center overflow-hidden border border-white/10 bg-white/[0.015] px-6 py-12 sm:px-10 lg:px-14 lg:py-16"
                >
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, scale: 0.75, rotate: -8 }
                    }
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                    }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.1,
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex h-16 w-16 items-center justify-center border border-white/25 bg-white text-black sm:h-[72px] sm:w-[72px]"
                  >
                    <CheckCircle2
                      size={30}
                      strokeWidth={1.7}
                    />
                  </motion.div>

                  <motion.p
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, y: 10 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.18,
                      duration: 0.5,
                    }}
                    className="mt-10 text-[10px] font-medium uppercase tracking-[0.32em] text-white/35 sm:text-[11px]"
                  >
                    Solicitud recibida
                  </motion.p>

                  <motion.h3
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, y: 14 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.25,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mt-5 max-w-4xl text-[clamp(2.8rem,5.6vw,6.2rem)] font-semibold uppercase leading-[0.88] tracking-[-0.06em]"
                  >
                    Gracias,
                    <br />
                    {formData.name.trim().split(/\s+/)[0] || "por confiar"}.
                  </motion.h3>

                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, y: 12 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.34,
                      duration: 0.55,
                    }}
                    className="mt-9 max-w-2xl"
                  >
                    <p className="text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
                      Hemos recibido correctamente tu solicitud de
                      valoración.
                    </p>

                    <p className="mt-5 text-sm leading-7 text-white/45 sm:text-base sm:leading-8">
                      Durante las próximas{" "}
                      <span className="font-medium text-white/80">
                        24–48 horas
                      </span>{" "}
                      revisaremos toda la información que nos has
                      facilitado. Si el programa encaja con tu
                      situación, nos pondremos en contacto contigo
                      para organizar una videollamada inicial.
                    </p>

                    <p className="mt-5 text-sm leading-7 text-white/45 sm:text-base sm:leading-8">
                      Nuestro objetivo es ofrecerte un acompañamiento
                      realmente personalizado desde el primer día.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0 }
                    }
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.45,
                      duration: 0.5,
                    }}
                    className="mt-10 border-t border-white/10 pt-7"
                  >
                    <button
                      type="button"
                      onClick={restartForm}
                      className="group inline-flex min-h-12 items-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white/55 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black sm:text-xs"
                    >
                      <ArrowLeft
                        size={16}
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                      />
                      Enviar otra solicitud
                    </button>
                  </motion.div>

                  <div className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full border border-white/[0.04]" />
                  <div className="pointer-events-none absolute -bottom-16 -right-12 h-48 w-48 rounded-full border border-white/[0.05]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

type StepHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

function StepHeading({
  eyebrow,
  title,
  description,
}: StepHeadingProps) {
  return (
    <div>
      <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.25em] text-white/30">
        {eyebrow}
      </p>

      <h3 className="max-w-3xl text-[clamp(2.5rem,4.5vw,5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.055em]">
        {title}
      </h3>

      <p className="mt-6 max-w-2xl text-sm leading-7 text-white/45 sm:text-base sm:leading-8">
        {description}
      </p>
    </div>
  );
}

type TextFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  type?: "text" | "email" | "tel" | "number";
  inputMode?:
    | "text"
    | "email"
    | "tel"
    | "numeric"
    | "decimal";
  autoComplete?: string;
  onChange: (value: string) => void;
};

function TextField({
  label,
  value,
  placeholder,
  type = "text",
  inputMode,
  autoComplete,
  onChange,
}: TextFieldProps) {
  return (
    <label className="group block">
      <span className="mb-3 block text-[10px] font-medium uppercase tracking-[0.22em] text-white/35 transition-colors duration-300 group-focus-within:text-white/65">
        {label}
      </span>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-14 w-full border-b border-white/15 bg-transparent px-0 text-base text-white outline-none transition-colors duration-300 placeholder:text-white/20 focus:border-white"
      />
    </label>
  );
}

type TextAreaFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

function TextAreaField({
  label,
  value,
  placeholder,
  onChange,
}: TextAreaFieldProps) {
  return (
    <label className="group block">
      <span className="mb-3 block text-[10px] font-medium uppercase tracking-[0.22em] text-white/35 transition-colors duration-300 group-focus-within:text-white/65">
        {label}
      </span>

      <textarea
        value={value}
        placeholder={placeholder}
        rows={4}
        onChange={(event) => onChange(event.target.value)}
        className="w-full resize-none border border-white/15 bg-white/[0.015] p-5 text-sm leading-7 text-white outline-none transition-colors duration-300 placeholder:text-white/20 focus:border-white/55"
      />
    </label>
  );
}

type QuestionBlockProps = {
  label: string;
  children: ReactNode;
};

function QuestionBlock({
  label,
  children,
}: QuestionBlockProps) {
  return (
    <div className="mt-9">
      <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-white/35">
        {label}
      </p>

      {children}
    </div>
  );
}

type OptionButtonProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
};

function OptionButton({
  label,
  selected,
  onClick,
  compact = false,
}: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`relative flex items-center border text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
        compact
          ? "min-h-12 justify-center px-3 text-sm"
          : "min-h-14 justify-between px-5 text-sm"
      } ${
        selected
          ? "border-white bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.07)]"
          : "border-white/15 bg-white/[0.01] text-white/55 hover:border-white/40 hover:bg-white/[0.035] hover:text-white"
      }`}
    >
      <span>{label}</span>

      {!compact && (
        <span
          className={`ml-4 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
            selected ? "border-black" : "border-white/25"
          }`}
        >
          {selected && (
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
          )}
        </span>
      )}
    </button>
  );
}
