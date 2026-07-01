import { motion } from "motion/react";

interface SectionHeaderProps {
  table: string;
  title: string;
  description?: string;
}

export default function SectionHeader({ table, title, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="gpu-accelerated mb-10 max-w-2xl sm:mb-14"
    >
      <p className="eyebrow mb-3">
        <span className="text-text-faint">SELECT * FROM</span>{" "}
        <span className="text-insight">{table}</span>
        <span className="text-text-faint">;</span>
      </p>
      <h2 className="font-display text-2xl font-semibold text-text sm:text-3xl">{title}</h2>
      {description && <p className="mt-3 text-sm text-text-muted sm:text-base">{description}</p>}
    </motion.div>
  );
}
