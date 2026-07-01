"use client";

import { motion } from "motion/react";

const STAGES = [
  { key: "extract", label: "Extract", detail: "Fuentes crudas y registros dispersos" },
  { key: "transform", label: "Transform", detail: "Validación, limpieza y lógica de negocio" },
  { key: "load", label: "Load", detail: "SQL Server: vistas, UDF y stored procedures" },
  { key: "insight", label: "Insight", detail: "Dashboards y decisiones operativas" },
];

export default function PipelineDiagram() {
  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-0">
        {STAGES.map((stage, idx) => (
          <div key={stage.key} className="relative flex sm:flex-col sm:items-center">
            <div className="hidden sm:block sm:absolute sm:left-1/2 sm:top-6 sm:h-px sm:w-full sm:-translate-y-1/2 sm:overflow-visible">
              {idx < STAGES.length - 1 && (
                <svg className="absolute left-6 top-0 h-px w-[calc(100%-24px)]" preserveAspectRatio="none">
                  <line
                    x1="0"
                    y1="0"
                    x2="100%"
                    y2="0"
                    stroke="#232A36"
                    strokeWidth="2"
                  />
                  <line
                    x1="0"
                    y1="0"
                    x2="100%"
                    y2="0"
                    stroke="#4C8DFF"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    className="animate-flow"
                  />
                </svg>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: idx * 0.12 }}
              className="gpu-accelerated z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-signal-dim bg-surface font-mono text-xs text-signal-soft sm:h-14 sm:w-14"
            >
              0{idx + 1}
            </motion.div>

            <div className="ml-3 sm:ml-0 sm:mt-4 sm:text-center">
              <p className="font-display text-sm font-semibold text-text sm:text-base">{stage.label}</p>
              <p className="mt-1 max-w-[10rem] text-xs text-text-muted sm:mx-auto">{stage.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
