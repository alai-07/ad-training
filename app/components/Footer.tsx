"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="text-sm tracking-wide text-white/50">
            © {new Date().getFullYear()} AD Training
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/politica-privacidad"
              className="text-sm text-white/50 transition-colors duration-300 hover:text-white"
            >
              Política de privacidad
            </Link>

            <Link
              href="/aviso-legal"
              className="text-sm text-white/50 transition-colors duration-300 hover:text-white"
            >
              Aviso legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}