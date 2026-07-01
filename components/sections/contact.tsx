"use client";

import { motion } from "motion/react";
import { Mail, Phone, Github, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import ContactForm from "@/components/ui/contact-form";
import { profile } from "@/lib/data";

const CHANNELS = [
  { label: "Correo", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "Teléfono", value: profile.phone, href: `tel:${profile.phone.replace(/\D/g, "")}`, icon: Phone },
  { label: "GitHub", value: "github.com/YonAnn99", href: profile.github, icon: Github },
];

export default function Contact() {
  return (
    <section id="contacto" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          table="contact"
          title="Hablemos de tu próximo sistema de datos"
          description="Abierto a proyectos de desarrollo de software, automatización y análisis de datos."
        />

        <div className="grid gap-4 sm:grid-cols-3">
          {CHANNELS.map((channel, idx) => (
            <motion.a
              key={channel.label}
              href={channel.href}
              target={channel.label === "GitHub" ? "_blank" : undefined}
              rel={channel.label === "GitHub" ? "noreferrer" : undefined}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="gpu-accelerated group flex items-center justify-between rounded-xl border border-border bg-surface p-5 transition-colors hover:border-signal-dim"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-signal/10 text-signal-soft">
                  <channel.icon size={16} />
                </span>
                <span>
                  <span className="block font-mono text-[11px] text-text-faint">{channel.label}</span>
                  <span className="block text-sm text-text">{channel.value}</span>
                </span>
              </span>
              <ArrowUpRight
                size={16}
                className="text-text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal-soft"
              />
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="gpu-accelerated mt-10 rounded-xl border border-border bg-surface p-6 sm:p-8"
        >
          <p className="eyebrow mb-2">
            <span className="text-text-faint">INSERT INTO</span>{" "}
            <span className="text-insight">inbox</span>
            <span className="text-text-faint"> (nombre, email, asunto, mensaje) VALUES (</span>
            <span className="text-text-faint">...</span>
            <span className="text-text-faint">);</span>
          </p>
          <h3 className="mb-6 font-display text-lg font-semibold text-text sm:text-xl">
            Envíame un mensaje directo
          </h3>
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
