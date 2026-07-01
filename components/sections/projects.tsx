"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Database, ExternalLink, Github, Eye, EyeOff } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import { projects } from "@/lib/data";

const PREVIEW_URLS: Record<string, string> = {
  "black-ghosts-garage": "https://black-ghost-garage.vercel.app/",
};

export default function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
            const hasPreview = !!PREVIEW_URLS[project.id];
            const isExpanded = expandedId === project.id;

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

                  <div className="flex items-center gap-2">
                    {hasPreview && (
                      <button
                        onClick={() =>
                          setExpandedId(isExpanded ? null : project.id)
                        }
                        className="flex items-center gap-1.5 rounded-md border border-border bg-surface2 px-3 py-1.5 font-mono text-[11px] text-text-muted transition-colors hover:border-signal-dim hover:text-signal-soft"
                        aria-label={
                          isExpanded ? "Ocultar preview" : "Ver preview"
                        }
                      >
                        {isExpanded ? (
                          <EyeOff size={12} />
                        ) : (
                          <Eye size={12} />
                        )}
                        {isExpanded ? "Ocultar" : "Preview"}
                      </button>
                    )}
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
                </div>

                <p className="font-mono text-xs text-text-faint">{project.org}</p>
                <h3 className="mt-1 font-display text-lg font-semibold text-text sm:text-xl">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {project.description}
                </p>

                {hasPreview && isExpanded && (
                  <div className="mt-4 overflow-hidden rounded-lg border border-border">
                    <div className="flex items-center gap-2 border-b border-border bg-surface2 px-3 py-2">
                      <span className="h-2 w-2 rounded-full bg-[#4a5364]" />
                      <span className="h-2 w-2 rounded-full bg-[#4a5364]" />
                      <span className="h-2 w-2 rounded-full bg-[#4a5364]" />
                      <span className="ml-2 font-mono text-[10px] text-text-faint">
                        {PREVIEW_URLS[project.id]}
                      </span>
                    </div>
                    <iframe
                      src={PREVIEW_URLS[project.id]}
                      title={`Preview de ${project.title}`}
                      className="h-[300px] w-full bg-bg"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>
                )}

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
