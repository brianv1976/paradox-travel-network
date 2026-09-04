import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, X, Send, Compass } from "lucide-react";
import { trackEvent } from "../lib/analytics";

interface Msg {
  role: "user" | "assistant";
  text: string;
}

const SUGGESTIONS = [
  "Is planning free?",
  "How does planning work?",
  "Where should we go?",
];

const INTRO: Msg = {
  role: "assistant",
  text: "Hi — I'm the Paradox Concierge. Tell me what kind of trip you're considering, or ask how planning works. I can help narrow the direction and bring Brian in when the details matter.",
};

const PROMPT_DELAY_MS = 60_000;
const PROMPT_SCROLL_Y = 160;
const PROMPT_VISIBLE_MS = 12_000;
const PROMPT_SESSION_KEY = "ptn-concierge-prompted";
const PROMPT_EXCLUDED_PATHS = new Set([
  "/privacy/",
  "/terms/",
  "/accessibility/",
  "/404/",
]);

function analyticsPath(pathname: string) {
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function localResponder(input: string): string {
  const q = input.toLowerCase();
  const plan = "You can start a trip inquiry any time on the Plan My Trip page. It starts a conversation — not a booking or a charge.";
  const diy = "If you already know what you want, use the matching partner on the Book It Yourself page so you stay inside the Paradox booking path.";

  if (/(fee|planning fee|cost to plan|charge|pay you|planning free)/.test(q))
    return `Most trip planning is complimentary. If a particular trip requires a planning fee, you'll know the amount before any planning work begins. ${plan}`;
  if (/(price|fare|rate|deal|discount|promotion|availability|available cabin|available room)/.test(q))
    return "I don't quote live travel prices, promotions, or availability here because those change constantly. Brian can verify current options when the trip gets into the planning or booking stage.";
  if (/(shore excursion|port excursion)/.test(q))
    return `If your cruise is already selected and you mainly need port excursions, Shore Excursions Group is one of Paradox's approved self-booking options. ${diy}`;
  if (/(viator|project expedition|things to do|activity|activities|attraction|day trip)/.test(q))
    return `If the destination is already decided and you mainly need tours or things to do, Paradox has self-booking options through Viator and Project Expedition. ${diy}`;
  if (/(exoticca|multi.?day|guided package|packaged tour)/.test(q))
    return `If you like a structured multi-day international itinerary and are comfortable choosing a published trip, Exoticca can be a good self-booking fit. ${diy}`;
  if (/(virgin voyages|virgin cruise|adults.?only cruise)/.test(q))
    return "Virgin Voyages can fit adults who want a modern, social, food-forward cruise. Exact sailings change, so use Paradox's Virgin link on the Book It Yourself page to browse, or let Brian compare cruise options if departure port or ship fit matters.";
  if (/(book|myself|self|diy|own)/.test(q))
    return `You can absolutely book a straightforward trip yourself. If the trip has meaningful resort, room, cruise, cabin, transfer, or itinerary choices, Paradox can compare the fit for you instead of making you sort through all of it alone. ${diy}`;
  if (/(cruise|ship|cabin|sail)/.test(q))
    return "Cruises are a strong fit for advisor help because the line, ship, itinerary, and cabin location can change the experience a lot. Tell me the kind of trip you want and I can help narrow the direction before Brian compares the details.";
  if (/(resort|all.?inclusive|beach)/.test(q))
    return "All-inclusive resorts can look similar on a booking page while feeling completely different in person. Atmosphere, beach, food, room category, and resort layout matter. Paradox can narrow those choices around what actually fits you.";
  if (/(honeymoon|romantic|romance|anniversary|proposal)/.test(q))
    return "For romance trips, the useful question isn't just where to go — it's what kind of atmosphere, privacy, beach, dining, and pace fit the two of you. That's the kind of comparison Paradox can handle.";
  if (/(family|kids|children|multi.?gen)/.test(q))
    return "Family trips usually come down to room setup, flight timing, resort or ship fit, and keeping the pace realistic. Paradox can help compare those pieces instead of treating every family the same.";
  if (/(adventure|hike|guided|tour|wildlife)/.test(q))
    return "Adventure travel can mean very different things — guided or independent, active or relaxed, remote or comfortable. Tell me the experience you're after and I can help narrow the direction.";
  if (/(worldvia|travel leaders|tln|affiliation|credential|industry connection)/.test(q))
    return "Paradox Travel Network is connected to broader travel-industry resources, supplier relationships, and support through WorldVia Travel Network and Travel Leaders Network. For travelers, the important part is access and support — not the backend plumbing.";
  if (/(hour|when.*call|call|talk|schedule|phone|appointment|meet|available to talk)/.test(q))
    return "New-client calls are generally scheduled in the evening so each inquiry can get focused attention. Additional daytime appointments are added when the schedule allows, and the scheduling page always shows the current openings. Existing clients can still reach out as needed.";
  if (/(how|work|process|start|step)/.test(q))
    return `Start with the basics — travelers, dates or flexibility, departure point, budget range, and what matters most. Paradox researches the fit, compares practical options, and helps refine the trip from there. ${plan}`;
  if (/(why|help|plan|kind|type|paradox)/.test(q))
    return `Paradox helps with cruises, all-inclusive resorts, honeymoons, family travel, guided adventures, customized trips, excursions, and other leisure travel where research and comparison can save you from a bad fit. ${plan}`;
  if (/(safe|passport|payment|secure|private|data)/.test(q))
    return "Never send passport numbers, payment-card details, passwords, or confidential documents through this chat. Those should only be shared through the secure method provided once you're working with Paradox.";
  if (/(hello|hi|hey|thanks|thank)/.test(q))
    return "Happy to help. Tell me what kind of trip you're considering, what matters most, or what you're unsure about.";

  return `I can help narrow the direction, but once the question turns into detailed comparisons or trip-specific research, that's where Paradox adds the most value. ${plan}`;
}

export default function ConciergeBot() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [promptVisible, setPromptVisible] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INTRO]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const promptHandledRef = useRef(false);
  const reduce = useReducedMotion();

  const endpoint =
    (import.meta.env.VITE_CONCIERGE_ENDPOINT as string | undefined) ||
    "/api/concierge";

  useEffect(() => {
    const onOpen = () =>
      setOpen((wasOpen) => {
        if (!wasOpen) {
          setPromptVisible(false);
          trackEvent("concierge_open", {
            source_path: analyticsPath(window.location.pathname),
            open_method: "manual",
            trigger: "external",
          });
        }
        return true;
      });
    const onClose = () => setOpen(false);
    window.addEventListener("open-concierge", onOpen);
    window.addEventListener("close-concierge", onClose);
    return () => {
      window.removeEventListener("open-concierge", onOpen);
      window.removeEventListener("close-concierge", onClose);
    };
  }, []);

  useEffect(() => {
    const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;
    setPromptVisible(false);
    if (PROMPT_EXCLUDED_PATHS.has(normalizedPath)) return;

    try {
      if (sessionStorage.getItem(PROMPT_SESSION_KEY)) {
        promptHandledRef.current = true;
        return;
      }
    } catch {
      // Keep the in-memory guard if session storage is unavailable.
    }

    let delayElapsed = false;
    let hasScrolled = window.scrollY >= PROMPT_SCROLL_Y;
    let dismissTimer: number | undefined;

    const markPrompted = () => {
      promptHandledRef.current = true;
      try {
        sessionStorage.setItem(PROMPT_SESSION_KEY, "1");
      } catch {
        // In-memory state remains enough for this page load.
      }
    };

    const maybePrompt = () => {
      if (!delayElapsed || !hasScrolled || promptHandledRef.current) return;
      markPrompted();
      trackEvent("concierge_prompt_show", {
        source_path: analyticsPath(pathname),
        trigger: "engaged_prompt",
      });
      setPromptVisible(true);
      dismissTimer = window.setTimeout(() => setPromptVisible(false), PROMPT_VISIBLE_MS);
    };

    const onScroll = () => {
      if (window.scrollY < PROMPT_SCROLL_Y) return;
      hasScrolled = true;
      window.removeEventListener("scroll", onScroll);
      maybePrompt();
    };

    const timer = window.setTimeout(() => {
      delayElapsed = true;
      maybePrompt();
    }, PROMPT_DELAY_MS);

    if (!hasScrolled) window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      if (dismissTimer) window.clearTimeout(dismissTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    setPromptVisible(false);
    if (promptHandledRef.current) return;
    promptHandledRef.current = true;
    try {
      sessionStorage.setItem(PROMPT_SESSION_KEY, "1");
    } catch {
      // In-memory state remains enough for this page load.
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [messages, loading, open, reduce]);

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
    const messageNumber = next.filter((message) => message.role === "user").length;
    trackEvent("concierge_message", {
      source_path: analyticsPath(window.location.pathname),
      message_number: messageNumber,
    });

    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, page: window.location.pathname }),
      });

      if (!res.ok) throw new Error(`Concierge request failed: ${res.status}`);
      const data = await res.json();
      if (!data?.reply || typeof data.reply !== "string") {
        throw new Error("Concierge returned no reply");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", text: data.reply },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", text: localResponder(clean) },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {promptVisible && !open && (
          <motion.button
            type="button"
            onClick={() => {
              setPromptVisible(false);
              trackEvent("concierge_open", {
                source_path: analyticsPath(window.location.pathname),
                open_method: "manual",
                trigger: "engaged_prompt_bubble",
              });
              setOpen(true);
            }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            className="concierge-launcher fixed bottom-20 right-4 z-[60] rounded-2xl bg-cream px-4 py-2.5 text-sm font-semibold text-ink shadow-lift ring-1 ring-ink/10 transition-colors hover:bg-sand md:bottom-24 md:right-5"
            aria-label="Need help? Open the Paradox Concierge"
          >
            Need help?
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        ref={launcherRef}
        onClick={() =>
          setOpen((wasOpen) => {
            const next = !wasOpen;
            if (next) {
              setPromptVisible(false);
              trackEvent("concierge_open", {
                source_path: analyticsPath(window.location.pathname),
                open_method: "manual",
                trigger: "launcher",
              });
            }
            return next;
          })
        }
        className={`concierge-launcher fixed bottom-4 right-4 z-[60] h-12 w-12 items-center justify-center rounded-full bg-ocean-dark text-cream shadow-lift transition-colors hover:bg-ocean md:bottom-5 md:right-5 md:h-14 md:w-14 ${
          open ? "hidden md:inline-flex" : "inline-flex"
        }`}
        whileHover={reduce ? undefined : { scale: 1.05 }}
        whileTap={reduce ? undefined : { scale: 0.95 }}
        aria-label={open ? "Close concierge" : "Open travel concierge"}
        aria-expanded={open}
        aria-controls="concierge-panel"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={open ? "x" : "chat"}
            initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: -30 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, rotate: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: 30 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
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
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="concierge-launcher fixed inset-x-2 bottom-2 top-20 z-[60] flex flex-col overflow-hidden rounded-3xl bg-cream shadow-lift ring-1 ring-ink/10 md:inset-x-auto md:bottom-24 md:right-5 md:top-auto md:h-[580px] md:max-h-[80vh] md:w-[92vw] md:max-w-[390px]"
          >
            <div className="flex shrink-0 items-center gap-3 bg-ocean-dark px-4 py-3 text-cream">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cream/15">
                <Compass size={17} />
              </span>
              <div className="text-sm font-semibold">Paradox Concierge</div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full text-cream transition-colors hover:bg-cream/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
                aria-label="Close concierge"
              >
                <X size={19} />
              </button>
            </div>

            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              aria-relevant="additions"
              aria-label="Concierge conversation"
              className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-ocean-dark text-cream"
                        : "bg-sand text-ink"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start" role="status">
                  <span className="sr-only">Concierge is responding</span>
                  <div aria-hidden="true" className="flex gap-1 rounded-2xl bg-sand px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-fog"
                        animate={reduce ? undefined : { opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => send(suggestion)}
                      className="rounded-full border border-ocean/25 px-3 py-1.5 text-xs font-medium text-ocean-dark transition-colors hover:bg-ocean-dark hover:text-cream"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex shrink-0 items-center gap-2 border-t border-ink/10 bg-cream px-3 py-3"
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
