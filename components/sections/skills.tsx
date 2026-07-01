"use client";

import { motion } from "motion/react";
import SectionHeader from "@/components/ui/section-header";
import PipelineDiagram from "@/components/ui/pipeline-diagram";
import { skillGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section id="habilidades" className="border-t border-border bg-surface/40 py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          table="skills"
          title="Habilidades técnicas"
          description="Un stack construido alrededor de un mismo principio: los datos solo generan valor cuando están limpios, validados y bien estructurados."
        />

        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, idx) => (
            <motion.div
              key={group.table}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <p className="mb-3 font-mono text-[11px] text-text-faint">
                <span className="text-insight">table</span> {group.table}
              </p>
              <h3 className="mb-3 font-display text-sm font-semibold text-text">{group.label}</h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-text-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal-soft" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-surface p-6 sm:p-10">
          <p className="eyebrow mb-2">Cómo trabajo un pipeline</p>
          <h3 className="mb-8 font-display text-lg font-semibold text-text sm:text-xl">
            De datos crudos a decisiones de negocio
          </h3>
          <PipelineDiagram />
        </div>
      </div>
    </section>
  );
}
