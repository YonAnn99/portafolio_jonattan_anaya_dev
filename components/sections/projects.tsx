"use client";

import { motion } from "motion/react";
import { Database, ExternalLink, Github } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import { projects } from "@/lib/data";

const PREVIEW_IMAGES: Record<string, string> = {
  "black-ghosts-garage": "/black-ghosts-garage-preview.png",
};

export default function Projects() {
  return (
    <section id="proyectos" className="border-t border-border bg-surface/40 py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          table="projects"
          title="Proyectos"
          description="Sistemas construidos en contexto real de negocio, no ejercicios de práctica."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, idx) => {
            const previewImage = PREVIEW_IMAGES[project.id];

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:border-signal-dim sm:p-8"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-signal-dim bg-signal/10 text-signal-soft">
                    <Database size={18} />
                  </div>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-md border border-border bg-surface2 px-3 py-1.5 font-mono text-[11px] text-text-muted transition-colors hover:border-signal-dim hover:text-signal-soft"
                    aria-label={`Abrir ${project.title}`}
                  >
                    {project.url?.includes("github") ? (
                      <Github size={12} />
                    ) : (
                      <ExternalLink size={12} />
                    )}
                    {project.url?.includes("github") ? "Código" : "Visitar"}
                  </a>
                </div>

                {previewImage && (
                  <div className="mb-5 overflow-hidden rounded-lg border border-border">
                    <a href={project.url} target="_blank" rel="noreferrer">
                      <img
                        src={previewImage}
                        alt={`Preview de ${project.title}`}
                        className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </a>
                  </div>
                )}

                <p className="font-mono text-xs text-text-faint">{project.org}</p>
                <h3 className="mt-1 font-display text-lg font-semibold text-text sm:text-xl">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-surface2 px-2.5 py-1 font-mono text-[11px] text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
