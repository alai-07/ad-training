import Link from "next/link";

function ADLogo() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className="h-10 w-10 shrink-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="48" fill="#050505" />

      <g fill="#FFFFFF">
        <path d="M50 14L72 52H61L50 33L39 52H28L50 14Z" />

        <path
          d="M50 14L72 52H61L50 33L39 52H28L50 14Z"
          transform="rotate(120 50 50)"
        />

        <path
          d="M50 14L72 52H61L50 33L39 52H28L50 14Z"
          transform="rotate(240 50 50)"
        />
      </g>

      <path d="M50 39L59.5 55.5H40.5L50 39Z" fill="#050505" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link
          href="/#inicio"
          aria-label="Ir al inicio de AD Training"
          className="flex items-center gap-3 text-xl font-bold tracking-[0.25em] text-white"
        >
          <ADLogo />
          <span>AD TRAINING</span>
        </Link>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-10 md:flex"
        >
          <a
            href="#experiencia"
            className="text-slate-300 transition hover:text-white"
          >
            Experiencia
          </a>

          <a
            href="#planes"
            className="text-slate-300 transition hover:text-white"
          >
            Planes
          </a>

          <a
            href="#valoracion"
            className="text-slate-300 transition hover:text-white"
          >
            Valoración
          </a>
        </nav>

        <a
          href="#valoracion"
          className="rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition hover:scale-105"
        >
          Empezar
        </a>
      </div>
    </header>
  );
}