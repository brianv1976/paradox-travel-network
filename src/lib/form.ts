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
  // Honeypot: forms include a hidden field real visitors never see or fill
  // in (see the `_hp` input in each form). A bot that fills every field it
  // finds trips this, and gets a fake "success" with nothing actually sent —
  // no backend or CAPTCHA required for basic spam filtering.
  if (typeof data._hp === "string" && data._hp.trim() !== "") {
    return true;
  }
  const { _hp: _discard, ...payload } = data;

  const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ form: formName, ...payload }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  // No endpoint configured yet. Never log the submitted payload — it's real
  // visitor contact/trip data (names, emails, phone numbers, budgets) and
  // has no reason to end up in a browser console.
  await new Promise((r) => setTimeout(r, 700));
  // eslint-disable-next-line no-console
  console.info(`[PTN] ${formName} submitted (no endpoint configured yet)`);
  return true;
}
