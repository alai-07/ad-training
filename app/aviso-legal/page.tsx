export default function AvisoLegal() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <h1 className="mb-12 text-4xl font-bold">
          Aviso Legal
        </h1>

        <div className="space-y-8 text-white/70 leading-8">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              Información general
            </h2>

            <p>
              El presente sitio web tiene como finalidad ofrecer información
              sobre los servicios de entrenamiento y asesoramiento deportivo
              prestados por AD Training.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              Propiedad intelectual
            </h2>

            <p>
              Todos los contenidos publicados en este sitio web, incluyendo
              textos, imágenes, logotipos y diseño, están protegidos por la
              legislación vigente sobre propiedad intelectual.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              Responsabilidad
            </h2>

            <p>
              AD Training no será responsable de los daños derivados del uso
              indebido del contenido publicado en esta página web.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              Legislación aplicable
            </h2>

            <p>
              Este sitio web se rige por la legislación española vigente.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}