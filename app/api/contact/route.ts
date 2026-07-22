import { Resend } from "resend";

export const runtime = "nodejs";

const MAX_BODY_SIZE = 20_000;

const LIMITS = {
  nombre: 80,
  email: 254,
  telefono: 30,
  objetivo: 200,
  mensaje: 6_000,
} as const;

function normalizeText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .replace(/\r\n/g, "\n")
    .slice(0, maxLength);
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character
  );
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return /^[+()\d\s.-]{7,30}$/.test(phone);
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !apiKey.startsWith("re_")) {
      console.error("RESEND_API_KEY no está configurada correctamente.");

      return Response.json(
        {
          error:
            "El servicio de contacto no está disponible temporalmente.",
        },
        { status: 500 }
      );
    }

    if (!fromEmail || !toEmail) {
      console.error(
        "Faltan RESEND_FROM_EMAIL o CONTACT_TO_EMAIL."
      );

      return Response.json(
        {
          error:
            "El servicio de contacto no está disponible temporalmente.",
        },
        { status: 500 }
      );
    }

    const contentType = request.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
      return Response.json(
        { error: "Formato de solicitud no válido." },
        { status: 415 }
      );
    }

    const contentLength = Number(
      request.headers.get("content-length") ?? 0
    );

    if (contentLength > MAX_BODY_SIZE) {
      return Response.json(
        { error: "La solicitud es demasiado grande." },
        { status: 413 }
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return Response.json(
        { error: "El contenido enviado no es válido." },
        { status: 400 }
      );
    }

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return Response.json(
        { error: "Los datos enviados no son válidos." },
        { status: 400 }
      );
    }

    const formData = body as Record<string, unknown>;

    /*
     * Campo trampa antispam.
     * Más adelante lo añadiremos oculto en ContactForm.tsx.
     * Si todavía no existe en el formulario, no afecta al envío.
     */
    const website = normalizeText(formData.website, 200);

    if (website) {
      return Response.json(
        { success: true },
        { status: 200 }
      );
    }

    const nombre = normalizeText(
      formData.nombre,
      LIMITS.nombre
    );
    const email = normalizeText(
      formData.email,
      LIMITS.email
    ).toLowerCase();
    const telefono = normalizeText(
      formData.telefono,
      LIMITS.telefono
    );
    const objetivo = normalizeText(
      formData.objetivo,
      LIMITS.objetivo
    );
    const mensaje = normalizeText(
      formData.mensaje,
      LIMITS.mensaje
    );

    if (!nombre || !email || !telefono) {
      return Response.json(
        {
          error:
            "Completa el nombre, el correo electrónico y el teléfono.",
        },
        { status: 400 }
      );
    }

    if (nombre.length < 2) {
      return Response.json(
        { error: "Introduce un nombre válido." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return Response.json(
        {
          error:
            "Introduce una dirección de correo electrónico válida.",
        },
        { status: 400 }
      );
    }

    if (!isValidPhone(telefono)) {
      return Response.json(
        { error: "Introduce un teléfono válido." },
        { status: 400 }
      );
    }

    const safeNombre = escapeHtml(nombre);
    const safeEmail = escapeHtml(email);
    const safeTelefono = escapeHtml(telefono);
    const safeObjetivo = escapeHtml(
      objetivo || "No indicado"
    );
    const safeMensaje = escapeHtml(
      mensaje || "Sin información adicional"
    );

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Nueva solicitud de valoración — ${nombre}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>Nueva solicitud de valoración</title>
          </head>

          <body
            style="
              margin: 0;
              padding: 32px 16px;
              background-color: #f4f4f4;
              font-family: Arial, Helvetica, sans-serif;
              color: #111111;
            "
          >
            <div
              style="
                max-width: 680px;
                margin: 0 auto;
                background-color: #ffffff;
                border: 1px solid #e5e5e5;
                padding: 32px;
              "
            >
              <p
                style="
                  margin: 0 0 12px;
                  font-size: 11px;
                  font-weight: 700;
                  letter-spacing: 0.18em;
                  text-transform: uppercase;
                  color: #777777;
                "
              >
                AD Training
              </p>

              <h1
                style="
                  margin: 0 0 32px;
                  font-size: 28px;
                  line-height: 1.15;
                "
              >
                Nueva solicitud de valoración
              </h1>

              <table
                role="presentation"
                style="
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 15px;
                  line-height: 1.6;
                "
              >
                <tr>
                  <td
                    style="
                      width: 130px;
                      padding: 10px 0;
                      border-bottom: 1px solid #eeeeee;
                      font-weight: 700;
                      vertical-align: top;
                    "
                  >
                    Nombre
                  </td>

                  <td
                    style="
                      padding: 10px 0;
                      border-bottom: 1px solid #eeeeee;
                      vertical-align: top;
                    "
                  >
                    ${safeNombre}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 10px 0;
                      border-bottom: 1px solid #eeeeee;
                      font-weight: 700;
                      vertical-align: top;
                    "
                  >
                    Correo
                  </td>

                  <td
                    style="
                      padding: 10px 0;
                      border-bottom: 1px solid #eeeeee;
                      vertical-align: top;
                    "
                  >
                    ${safeEmail}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 10px 0;
                      border-bottom: 1px solid #eeeeee;
                      font-weight: 700;
                      vertical-align: top;
                    "
                  >
                    Teléfono
                  </td>

                  <td
                    style="
                      padding: 10px 0;
                      border-bottom: 1px solid #eeeeee;
                      vertical-align: top;
                    "
                  >
                    ${safeTelefono}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 10px 0;
                      border-bottom: 1px solid #eeeeee;
                      font-weight: 700;
                      vertical-align: top;
                    "
                  >
                    Objetivo
                  </td>

                  <td
                    style="
                      padding: 10px 0;
                      border-bottom: 1px solid #eeeeee;
                      vertical-align: top;
                    "
                  >
                    ${safeObjetivo}
                  </td>
                </tr>
              </table>

              <div style="margin-top: 32px;">
                <h2
                  style="
                    margin: 0 0 14px;
                    font-size: 17px;
                  "
                >
                  Información completa
                </h2>

                <div
                  style="
                    padding: 20px;
                    background-color: #f7f7f7;
                    border-left: 3px solid #111111;
                    font-size: 14px;
                    line-height: 1.7;
                    white-space: pre-wrap;
                    overflow-wrap: anywhere;
                  "
                >${safeMensaje}</div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: [
        "Nueva solicitud de valoración",
        "",
        `Nombre: ${nombre}`,
        `Correo: ${email}`,
        `Teléfono: ${telefono}`,
        `Objetivo: ${objetivo || "No indicado"}`,
        "",
        "Información completa:",
        mensaje || "Sin información adicional",
      ].join("\n"),
    });

    if (error) {
      console.error(
        "Resend no pudo enviar el correo:",
        error
      );

      return Response.json(
        {
          error:
            "No hemos podido enviar tu solicitud. Inténtalo de nuevo dentro de unos minutos.",
        },
        { status: 502 }
      );
    }

    return Response.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error inesperado en /api/contact:",
      error
    );

    return Response.json(
      {
        error:
          "Se ha producido un error inesperado. Inténtalo de nuevo.",
      },
      { status: 500 }
    );
  }
}