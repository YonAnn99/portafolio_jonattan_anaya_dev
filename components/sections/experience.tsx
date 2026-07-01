"use client";

import { motion } from "motion/react";
import SectionHeader from "@/components/ui/section-header";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experiencia" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader table="experience" title="Experiencia laboral" />

        <div className="relative space-y-10 border-l border-border pl-8 sm:pl-10">
          {experience.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="gpu-accelerated relative"
            >
              <span className="absolute -left-[41px] top-1.5 h-3 w-3 rounded-full border-2 border-bg bg-signal sm:-left-[49px]" />

              <p className="font-mono text-xs text-text-faint">{job.period}</p>
              <h3 className="mt-1 font-display text-lg font-semibold text-text sm:text-xl">{job.role}</h3>
              <p className="mb-4 text-sm text-signal-soft">{job.org}</p>

              <ul className="space-y-2.5">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-faint" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                {job.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
