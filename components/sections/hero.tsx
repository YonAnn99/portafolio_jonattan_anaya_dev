"use client";

import { motion } from "motion/react";
import { ArrowDown, Mail } from "lucide-react";
import QueryConsole from "@/components/ui/query-console";
import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-bg/90 pt-28 pb-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 z-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-signal/8 blur-[140px]"
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-16 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="gpu-accelerated eyebrow mb-5 flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-insight" />
            Disponible para nuevos proyectos
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="gpu-accelerated font-display text-4xl font-semibold leading-[1.08] text-text sm:text-5xl lg:text-[3.4rem]"
          >
            Convierto datos dispersos en{" "}
            <span className="text-signal">decisiones estructuradas</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="gpu-accelerated mt-6 max-w-lg text-base leading-relaxed text-text-muted"
          >
            Soy {profile.name}, {profile.role.toLowerCase()}. Diseño bases de datos, automatizo
            procesos ETL y construyo software que mantiene la información de una empresa
            confiable, ordenada y lista para tomar decisiones.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="gpu-accelerated mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#proyectos"
              className="rounded-lg bg-signal px-5 py-3 font-mono text-xs font-medium text-bg transition-transform hover:-translate-y-0.5 hover:bg-signal-soft"
            >
              Ver proyectos
            </a>
            <a
              href="#contacto"
              className="flex items-center gap-2 rounded-lg border border-border px-5 py-3 font-mono text-xs text-text transition-colors hover:border-signal-dim hover:text-signal-soft"
            >
              <Mail size={14} />
              Contactar
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="gpu-accelerated mt-14 hidden items-center gap-2 font-mono text-xs text-text-faint sm:flex"
          >
            <ArrowDown size={14} className="animate-bounce" />
            desplázate para ver el esquema completo
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="gpu-accelerated"
        >
          <QueryConsole />
        </motion.div>
      </div>
    </section>
  );
}
