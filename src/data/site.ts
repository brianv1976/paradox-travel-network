export interface NavLink {
  label: string;
  to: string;
  cta?: boolean;
}

// Primary navigation. "Explore Travel" points at the homepage #explore anchor.
export const navLinks: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Book It Yourself", to: "/book-it-yourself" },
  { label: "Plan With Brian", to: "/plan-my-trip", cta: true },
  { label: "Postcards from Paradox", to: "/travel-tips" },
  { label: "Explore Travel", to: "/#explore" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const footerLinks: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Book It Yourself", to: "/book-it-yourself" },
  { label: "Plan With Brian", to: "/plan-my-trip" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Postcards from Paradox", to: "/travel-tips" },
  { label: "Accessibility", to: "/accessibility" },
];

export const footerBlurb =
  "Thoughtful travel planning and practical resources for trips that fit real goals, budgets, and people.";

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "Can I book on my own?",
    a: "Yes. The self-booking path is for travelers who want direct control and trusted resources without full planning support.",
  },
  {
    q: "What kinds of trips can Brian help plan?",
    a: "Cruises, all-inclusive resorts, honeymoons and romantic escapes, family vacations, guided adventures, and other personalized trips.",
  },
  {
    q: "Does submitting the form create a booking?",
    a: "No. It starts an inquiry. Nothing is booked or charged simply because a form was submitted.",
  },
  {
    q: "What should I avoid sending through the form?",
    a: "Do not send passport numbers, payment-card details, medical records, or confidential identity documents.",
  },
];
