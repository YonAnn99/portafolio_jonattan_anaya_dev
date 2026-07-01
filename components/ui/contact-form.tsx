"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { sendContactMessage } from "@/app/actions/contact";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      subject: string;
      message: string;
    };

    const result = await sendContactMessage(null, data);

    if (result.success) {
      setStatus("success");
      e.currentTarget.reset();
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block font-mono text-xs text-text-faint">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            minLength={2}
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-faint focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal/30"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block font-mono text-xs text-text-faint">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-faint focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal/30"
            placeholder="correo@ejemplo.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block font-mono text-xs text-text-faint">
          Asunto
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          minLength={3}
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-faint focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal/30"
          placeholder="¿En qué puedo ayudarte?"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block font-mono text-xs text-text-faint">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          className="w-full resize-none rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-faint focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal/30"
          placeholder="Cuéntame sobre tu proyecto o idea..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-signal px-5 py-3 font-mono text-xs font-medium text-bg transition-all hover:-translate-y-0.5 hover:bg-signal-soft disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={14} className="animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send size={14} />
            Enviar mensaje
          </>
        )}
      </button>

      {status === "success" && (
        <div className="flex items-center gap-2 rounded-lg border border-signal-dim bg-signal/10 px-4 py-3 text-sm text-signal-soft">
          <CheckCircle size={16} />
          Mensaje enviado correctamente. Te responderé pronto.
        </div>
      )}

      {status === "error" && errorMessage && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <AlertCircle size={16} />
          {errorMessage}
        </div>
      )}
    </form>
  );
}
