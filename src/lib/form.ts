/**
 * Form submission helper.
 *
 * Set VITE_FORM_ENDPOINT to a form backend (Formspree, Web3Forms, a Supabase
 * Edge Function, etc.) and every form on the site posts there as JSON.
 * Until then, submissions resolve as "sent" so the UX is complete in preview
 * and the payload is logged to the console.
 *
 * Recommended (free) options:
 *  - Web3Forms:  https://web3forms.com  → set endpoint to https://api.web3forms.com/submit
 *    and include your access_key in the payload (add it here or per form).
 *  - Formspree:  https://formspree.io   → endpoint is https://formspree.io/f/XXXX
 *
 * Route trip-planning submissions to trips@paradoxtravelnetwork.com and general
 * contact submissions to hello@paradoxtravelnetwork.com in your backend config.
 */
export async function submitForm(
  formName: string,
  data: Record<string, unknown>
): Promise<boolean> {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ form: formName, ...data }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  // No endpoint configured yet.
  await new Promise((r) => setTimeout(r, 700));
  // eslint-disable-next-line no-console
  console.info(`[PTN] ${formName} submitted (no endpoint configured):`, data);
  return true;
}
