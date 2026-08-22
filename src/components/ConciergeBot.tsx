import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Compass } from "lucide-react";
import { links } from "../lib/assets";

/**
 * Paradox Concierge — AI travel chat widget.
 *
 * Works today with a built-in knowledge responder (no key required).
 * To power it with a real LLM in Bolt, set VITE_CONCIERGE_ENDPOINT to a
 * serverless / Supabase Edge Function that accepts { messages } and returns
 * { reply }. When that variable is present, the widget calls it instead of the
 * local responder. See PTN-MASTER-SPEC.md → "AI Concierge" for a sample function.
 */

interface Msg {
  role: "user" | "assistant";
  text: string;
}

const SUGGESTIONS = [
  "Can I just book it myself?",
  "How does planning work?",
  "What trips can Brian help with?",
  "Is there a fee?",
];

const INTRO: Msg = {
  role: "assistant",
  text: "Hi — I'm the Paradox Concierge. Ask me about planning a trip, booking it yourself, cruises, resorts, or how Brian works. If it gets specific, I'll point you to the right next step.",
};

function localResponder(input: string): string {
  const q = input.toLowerCase();
  const plan = "You can start a trip inquiry any time on the Plan My Trip page — it begins a conversation, not a booking or a charge.";

  if (/(fee|cost|price|charge|how much|pay)/.test(q))
    return `Most planning is free. If a trip is complex enough to carry a planning fee, you'll know the number upfront, before any work starts. ${plan}`;
  if (/(book|myself|self|diy|own)/.test(q))
    return `Absolutely. The Book It Yourself page gathers the booking sites Brian actually trusts — Viator, Shore Excursions Group, Exoticca, and more — in one place. Want Brian's take before you book? He's happy to weigh in — just ask first.`;
  if (/(cruise|ship|cabin|sail)/.test(q))
    return `Cruises are a specialty — line, ship style, itinerary, and cabin location all change the trip. See the Cruises page, or share the details on Plan My Trip and Brian will narrow it down.`;
  if (/(resort|all.?inclusive|beach)/.test(q))
    return `“All-inclusive” is a category, not a personality — the right resort matches your atmosphere, dining, and beach priorities. The All-Inclusive page breaks it down.`;
  if (/(honeymoon|romantic|romance|anniversary|proposal)/.test(q))
    return `Romantic should feel like the two people taking the trip. The Romance page covers honeymoons, anniversaries, and just-because escapes.`;
  if (/(family|kids|children|multi.?gen)/.test(q))
    return `Family trips work best when room setup, flight timing, and pace fit the actual family. The Family Travel page has the details.`;
  if (/(adventure|hike|guided|tour|wildlife)/.test(q))
    return `Adventure isn't one difficulty setting — guided or independent, active or immersive. The Adventure page helps you calibrate.`;
  if (/(how|work|process|start|step)/.test(q))
    return `Three steps: tell Brian what matters (dates, budget, travelers, ideas), review practical options, then refine and move forward. ${plan}`;
  if (/(what|help|plan|kind|type)/.test(q))
    return `Brian plans cruises, all-inclusive resorts, honeymoons, family vacations, guided adventures, and other personalized trips. ${plan}`;
  if (/(call|talk|schedule|phone|appointment|meet)/.test(q))
    return `Happy to talk it through — you can grab a 30-minute trip planning call using the scheduling link on the Contact or Plan My Trip page.`;
  if (/(safe|passport|payment|secure|private|data)/.test(q))
    return `Good instinct: never send passport numbers, payment-card details, or confidential documents through a web form or email. Share those only through a secure method once you're working together.`;
  if (/(hello|hi|hey|thanks|thank)/.test(q))
    return `Happy to help. Ask me anything about trips, booking, or how Brian works — or head to Plan My Trip when you're ready.`;

  return `Great question. For anything specific, the fastest path is the Plan My Trip page — share your dates, travelers, budget, and ideas, and Brian will follow up personally. Prefer to talk first? There's a scheduling link on the Contact page.`;
}

export default function ConciergeBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INTRO]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const endpoint = import.meta.env.VITE_CONCIERGE_ENDPOINT as string | undefined;

  // Below md the floating launcher is gone (see the button below) -- the
  // mobile menu's "Ask Brian" entry opens the same panel by dispatching
  // this event instead of rendering a second trigger button.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-concierge", onOpen);
    return () => window.removeEventListener("open-concierge", onOpen);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading, open]);

  // Dialog focus management: move focus into the panel on open, trap Tab
  // inside it while open, close on Escape, and hand focus back to the
  // launcher button on close — a floating chat panel with no route of its
  // own needs to behave like a real dialog for keyboard/screen-reader users.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        launcherRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const send = async (text: string) => {
    const clean = text.trim();
    if (!clean || loading) return;
    const next = [...messages, { role: "user" as const, text: clean }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next }),
        });
        const data = await res.json();
        setMessages((m) => [
          ...m,
          { role: "assistant", text: data.reply ?? localResponder(clean) },
        ]);
      } else {
        await new Promise((r) => setTimeout(r, 550));
        setMessages((m) => [
          ...m,
          { role: "assistant", text: localResponder(clean) },
        ]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: localResponder(clean) },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Launcher -- hidden below md. On phones a floating button had
          nowhere good to sit (covered carousel dots, the mobile-nav panel,
          CTAs near the bottom) no matter how it was resized/repositioned;
          removing it there and adding "Ask Brian" to the mobile menu
          (Navbar.tsx, dispatches "open-concierge") is the structural fix
          instead of another patch. Kept on tablet/desktop, where there's
          real space and it stays out of the way. */}
      <motion.button
        ref={launcherRef}
        onClick={() => setOpen((v) => !v)}
        className="concierge-launcher fixed bottom-5 right-5 z-[60] hidden h-14 w-14 items-center justify-center rounded-full bg-ocean-dark text-cream shadow-lift transition-colors hover:bg-ocean md:inline-flex"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? "Close concierge" : "Open travel concierge"}
        aria-expanded={open}
        aria-controls="concierge-panel"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={open ? "x" : "chat"}
            initial={{ opacity: 0, rotate: -30 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 30 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X size={22} /> : <MessageCircle size={22} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="concierge-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Paradox Concierge chat"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="concierge-launcher fixed bottom-24 right-5 z-[60] flex h-[540px] max-h-[75vh] w-[92vw] max-w-[380px] flex-col overflow-hidden rounded-3xl bg-cream shadow-lift ring-1 ring-ink/10"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-ocean-dark px-5 py-4 text-cream">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream/15">
                <Compass size={18} />
              </span>
              <div>
                <div className="text-sm font-semibold">Paradox Concierge</div>
                <div className="text-xs text-cream/90">
                  Travel questions, answered
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-ocean-dark text-cream"
                        : "bg-sand text-ink"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl bg-sand px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-fog"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-ocean/25 px-3 py-1.5 text-xs font-medium text-ocean-dark transition-colors hover:bg-ocean-dark hover:text-cream"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-ink/10 bg-cream px-3 py-3"
            >
              <label htmlFor="concierge-input" className="sr-only">
                Ask the travel concierge a question
              </label>
              <input
                ref={inputRef}
                id="concierge-input"
                name="message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a trip…"
                className="flex-1 rounded-full bg-sand px-4 py-2.5 text-sm text-ink outline-none placeholder:text-fog/70 focus:ring-2 focus:ring-ocean/30"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ocean-dark text-cream transition-colors hover:bg-ocean disabled:opacity-40"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </form>
            <p className="bg-cream px-4 pb-3 text-center text-[10px] text-fog">
              Automated assistant · not a booking. Ask{" "}
              <a href={`mailto:${links.email}`} className="underline">
                Brian
              </a>{" "}
              for anything specific.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
