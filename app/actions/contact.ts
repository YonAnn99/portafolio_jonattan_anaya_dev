"use server";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormState {
  success: boolean;
  error: string | null;
}

export async function sendContactMessage(
  _prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const name = formData.name?.toString().trim();
  const email = formData.email?.toString().trim();
  const subject = formData.subject?.toString().trim();
  const message = formData.message?.toString().trim();

  if (!name || !email || !subject || !message) {
    return { success: false, error: "Todos los campos son obligatorios." };
  }

  if (name.length < 2) {
    return { success: false, error: "El nombre debe tener al menos 2 caracteres." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "El correo electrónico no es válido." };
  }

  if (subject.length < 3) {
    return { success: false, error: "El asunto debe tener al menos 3 caracteres." };
  }

  if (message.length < 10) {
    return { success: false, error: "El mensaje debe tener al menos 10 caracteres." };
  }

  // TODO: Integrar con servicio de email (Resend, Formspree, etc.)
  // Ejemplo con Resend:
  // import { Resend } from "resend";
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "Portfolio <noreply@tu-dominio.com>",
  //   to: process.env.NEXT_PUBLIC_EMAIL,
  //   subject: `[Portfolio] ${subject}`,
  //   html: `<p><strong>De:</strong> ${name} (${email})</p><p>${message}</p>`,
  // });

  console.log("Contact form submission:", { name, email, subject, message });

  return { success: true, error: null };
}
