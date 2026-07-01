"use client";

import { motion } from "motion/react";
import SectionHeader from "@/components/ui/section-header";
import { profile, languages, education, certifications } from "@/lib/data";

export default function About() {
  return (
    <section id="sobre-mi" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader table="about" title="Sobre mí" />

        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-base leading-relaxed text-text-muted sm:text-lg"
          >
            {profile.summary}
          </motion.p>

          <div className="space-y-10">
            <div>
              <p className="eyebrow mb-4">Educación</p>
              <ul className="space-y-3">
                {education.map((e) => (
                  <li key={e.title} className="border-l-2 border-signal-dim pl-4">
                    <p className="font-display text-sm font-semibold text-text">{e.title}</p>
                    <p className="text-sm text-text-muted">{e.org}</p>
                    <p className="font-mono text-xs text-text-faint">{e.period}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-4">Certificaciones</p>
              <ul className="space-y-3">
                {certifications.map((c) => (
                  <li key={c.title} className="flex items-baseline justify-between gap-4 border-l-2 border-border pl-4">
                    <span>
                      <span className="block text-sm text-text">{c.title}</span>
                      <span className="block text-xs text-text-muted">{c.org}</span>
                    </span>
                    <span className="shrink-0 font-mono text-xs text-text-faint">{c.year}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-4">Idiomas</p>
              <ul className="flex flex-wrap gap-3">
                {languages.map((l) => (
                  <li
                    key={l.name}
                    className="rounded-lg border border-border bg-surface px-3 py-2 text-xs text-text-muted"
                  >
                    <span className="text-text">{l.name}</span> — {l.level}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
