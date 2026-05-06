// src/components/Footer.jsx
import React from "react";
import { useUser } from "../context/useUser";

const TwitterIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GitHubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const Footer = () => {
  const { theme } = useUser();
  const isLight = theme === "light";

  const linkClass = `flex items-center gap-3 font-mono font-black uppercase tracking-[0.2em] text-sm transition-colors
    ${isLight ? "text-stone-500 hover:text-amber-600" : "text-stone-500 hover:text-amber-500"}`;

  return (
    <footer className={`py-10 font-mono transition-colors duration-500
      ${isLight
        ? "bg-[#e5e2dd] border-t border-black/5"
        : "bg-[#0d0a09] border-t border-white/5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-start justify-between gap-8">

        {/* Izquierda — marca */}
        <div className="flex flex-col gap-1.5">
          <p className={`text-sm font-black uppercase tracking-[0.2em] ${isLight ? "text-stone-700" : "text-stone-400"}`}>
            PaleoArchivo
          </p>
          <p className={`text-[10px] uppercase tracking-[0.25em] ${isLight ? "text-stone-400" : "text-stone-600"}`}>
            &copy; 2026 — Registros Digitales de la Biosfera
          </p>
        </div>

        {/* Derecha — links en lista vertical */}
        <div className="flex flex-col gap-3">
          <a href="https://twitter.com/PaleoArchivo" target="_blank" rel="noopener noreferrer" className={linkClass}>
            <TwitterIcon size={16} />
            @PaleoArchivo
          </a>
          <a href="https://github.com/Pegasso-oss/PaleoArchivo" target="_blank" rel="noopener noreferrer" className={linkClass}>
            <GitHubIcon size={16} />
            GitHub — Pegasso-oss/PaleoArchivo
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;