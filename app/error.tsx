"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-6xl font-bold text-insight">Error</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-text">
        Algo salió mal
      </h1>
      <p className="mt-3 max-w-md text-sm text-text-muted">
        Ocurrió un error inesperado. Por favor intenta de nuevo.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-lg bg-signal px-5 py-3 font-mono text-xs font-medium text-bg transition-transform hover:-translate-y-0.5 hover:bg-signal-soft"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
