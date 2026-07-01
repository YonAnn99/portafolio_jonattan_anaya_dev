import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-6xl font-bold text-signal">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-text">
        Página no encontrada
      </h1>
      <p className="mt-3 max-w-md text-sm text-text-muted">
        La ruta que intentas acceder no existe. Puede que haya sido movida o eliminada.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-signal px-5 py-3 font-mono text-xs font-medium text-bg transition-transform hover:-translate-y-0.5 hover:bg-signal-soft"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
