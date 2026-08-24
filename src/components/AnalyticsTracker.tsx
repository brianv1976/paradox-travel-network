import { useEffect } from "react";
import { trackEvent } from "../lib/analytics";

function cleanText(value: string | null | undefined) {
  return value?.replace(/\s+/g, " ").trim().slice(0, 120) || undefined;
}

/**
 * Site-wide GA4 click tracking for the actions that matter to the business.
 * Uses one delegated listener so every current/future CTA is covered without
 * sprinkling analytics handlers through visual components.
 *
 * Important: never send email addresses, form values, or other user-entered
 * data to GA4. Event parameters below are deliberately limited to page paths,
 * CTA labels, partner names, and destination hosts.
 */
export default function AnalyticsTracker() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const rawHref = anchor.getAttribute("href")?.trim();
      if (!rawHref) return;

      const sourcePath = window.location.pathname;
      const ctaText = cleanText(anchor.getAttribute("aria-label") || anchor.textContent);

      // On-page CTA that moves a visitor directly to the trip intake section.
      if (rawHref === "#intake") {
        trackEvent("trip_inquiry_cta_click", {
          source_path: sourcePath,
          cta_text: ctaText,
        });
        return;
      }

      // Email clicks are useful lead signals, but the address itself is PII
      // and must not be sent to Google Analytics.
      if (rawHref.toLowerCase().startsWith("mailto:")) {
        trackEvent("email_click", {
          source_path: sourcePath,
          email_type: rawHref.toLowerCase().includes("support@") ? "support" : "general",
        });
        return;
      }

      if (rawHref.toLowerCase().startsWith("tel:")) {
        trackEvent("phone_click", { source_path: sourcePath });
        return;
      }

      let url: URL;
      try {
        url = new URL(rawHref, window.location.href);
      } catch {
        return;
      }

      const destinationHost = url.hostname.replace(/^www\./, "").toLowerCase();

      // Tern hosts the actual intake form, so this is the strongest trip-lead
      // event the website itself can observe without a Tern completion webhook
      // or a post-submit redirect back to this domain.
      if (destinationHost === "app.tern.travel") {
        trackEvent("trip_inquiry_start", {
          source_path: sourcePath,
          destination_host: destinationHost,
          cta_text: ctaText,
        });
        return;
      }

      if (destinationHost === "calendly.com" || destinationHost.endsWith(".calendly.com")) {
        trackEvent("schedule_call_click", {
          source_path: sourcePath,
          destination_host: destinationHost,
          cta_text: ctaText,
        });
        return;
      }

      // Booking-partner links already carry rel="sponsored" for disclosure.
      // Reuse that semantic marker so new suppliers are automatically tracked.
      if (anchor.relList.contains("sponsored")) {
        trackEvent("booking_partner_click", {
          source_path: sourcePath,
          destination_host: destinationHost,
          partner: cleanText(anchor.getAttribute("aria-label")) || ctaText || destinationHost,
        });
        return;
      }

      if (url.origin !== window.location.origin) return;

      // Track the two core site paths as micro-conversions. Ignore clicks to
      // the same path so in-page navigation does not inflate the count.
      if (url.pathname === "/plan-my-trip" && sourcePath !== "/plan-my-trip") {
        trackEvent("plan_with_brian_click", {
          source_path: sourcePath,
          cta_text: ctaText,
        });
        return;
      }

      if (url.pathname === "/book-it-yourself" && sourcePath !== "/book-it-yourself") {
        trackEvent("book_it_yourself_click", {
          source_path: sourcePath,
          cta_text: ctaText,
        });
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
