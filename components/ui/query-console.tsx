"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const QUERY =
  "SELECT nombre, rol, impacto\nFROM ingenieros\nWHERE stack ILIKE '%python%sql%'\nORDER BY impacto DESC\nLIMIT 1;";

const RESULT_ROWS = [
  { nombre: "Pablo Jonattan Alonso Anaya", rol: "Data Developer / Software Engineer", impacto: "alto" },
];

export default function QueryConsole() {
  const [typed, setTyped] = useState("");
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    let i = 0;
    let cancelled = false;

    function tick() {
      if (cancelled) return;
      if (i <= QUERY.length) {
        setTyped(QUERY.slice(0, i));
        i += 1;
        setTimeout(tick, 18 + Math.random() * 22);
      } else {
        setTimeout(() => !cancelled && setShowResult(true), 450);
      }
    }
    const start = setTimeout(tick, 500);

    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, []);

  return (
    <div className="w-full rounded-xl border border-border bg-surface/80 backdrop-blur-sm shadow-[0_0_0_1px_rgba(76,141,255,0.06),0_20px_60px_-20px_rgba(76,141,255,0.25)]">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#4a5364]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#4a5364]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#4a5364]" />
        <span className="ml-2 font-mono text-xs text-text-muted">consola — perfil.sql</span>
      </div>
      <div className="p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
        <pre className="whitespace-pre-wrap text-text-muted">
          <span className="text-signal-soft">{"> "}</span>
          {typed.split("\n").map((line, idx) => (
            <span key={idx} className="text-text">
              {line}
              {"\n"}
            </span>
          ))}
          {typed.length < QUERY.length && (
            <span className="inline-block h-4 w-2 -mb-0.5 bg-signal animate-blink" />
          )}
        </pre>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 overflow-hidden rounded-lg border border-border"
            >
              <table className="w-full text-left text-xs sm:text-[13px]">
                <thead>
                  <tr className="bg-surface2 text-text-muted">
                    <th className="px-3 py-2 font-medium">nombre</th>
                    <th className="px-3 py-2 font-medium">rol</th>
                    <th className="px-3 py-2 font-medium">impacto</th>
                  </tr>
                </thead>
                <tbody>
                  {RESULT_ROWS.map((row) => (
                    <tr key={row.nombre} className="border-t border-border">
                      <td className="px-3 py-2 text-text">{row.nombre}</td>
                      <td className="px-3 py-2 text-text-muted">{row.rol}</td>
                      <td className="px-3 py-2 text-insight">{row.impacto}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="border-t border-border bg-surface2 px-3 py-1.5 font-mono text-[11px] text-text-muted">
                1 fila · 12 ms
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
