/**
 * ============================================================
 *  SITE CONFIG - the ONLY file a client needs to edit for content
 * ============================================================
 *  - Brand, navigation, copy, destinations, stays, FAQ, footer.
 *  - Every image field is optional. If `image` is empty, a generated
 *    SVG landscape (see components/ui/Art.tsx) is drawn from `scene` +
 *    `palette`, so the template looks finished with zero photos.
 *  - To use a real photo, drop it in /public/images and set
 *    image: "/images/your-file.jpg".
 */

export type Scene = "mountains" | "dunes" | "islands" | "city";

export interface Destination {
  id: string;
  name: string;
  country: string;
  tagline: string;
  lat: number; // used to place the pin on the 3D globe
  lon: number;
  scene: Scene;
  /** [skyTop, skyBottom, sun, far layer, mid layer, near layer] */
  palette: [string, string, string, string, string, string];
  seed: number;
  from: number; // "from $X" price shown on the card
  daily: number; // average daily cost per person (planner)
  flight: number; // average return flight per person (planner)
  image?: string;
}

export interface Stay {
  id: string;
  name: string;
  area: string;
  type: "Villa" | "Cabin" | "City" | "Beach";
  price: number;
  rating: number;
  reviews: number;
  scene: Scene;
  palette: Destination["palette"];
  seed: number;
  image?: string;
}

export const siteConfig = {
  name: "Nomada",
  tagline: "Slow travel, planned sharply",
  description:
    "Nomada designs small-group journeys and hand-picked stays across 40 destinations, with a real person on call the whole way.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /** Turn template features on/off without touching components. */
  features: {
    preloader: true,
    smoothScroll: true,
    customCursor: true,
    globe: true,
    grain: true,
  },

  contact: {
    email: "yehiahossamdev@gmail.com",
    phone: "+201027068227",
    address: "14 Harbour Row, Lisbon, Portugal",
  },

  nav: [
    { label: "Destinations", href: "#destinations" },
    { label: "Stays", href: "#stays" },
    { label: "Why Nomada", href: "#why" },
    { label: "Trip planner", href: "#planner" },
    { label: "Stories", href: "#stories" },
    { label: "FAQ", href: "#faq" },
  ],

  hero: {
    // Each entry is one line. `serif: true` switches that whole line to the italic serif.
    lines: [
      { text: "Trips that", serif: false },
      { text: "feel like coming home", serif: true },
    ],
    sub: "Small groups, local hosts and stays we have slept in ourselves. Tell us where, we handle everything else.",
    cta: "Plan my trip",
    cta2: "See destinations",
    badge: "Rated 4.9 by 12,000 travellers • Rated 4.9 by 12,000 travellers • ",
  },

  intro:
    "We started Nomada after one too many holidays built from a stranger's top-ten list. Now every route is walked by our own team first, every host is met in person, and every traveller gets one human contact from booking to landing. Fewer crowds, better dinners, and a trip that actually feels like yours.",

  stats: [
    { value: 40, suffix: "", label: "destinations walked by our team" },
    { value: 12400, suffix: "", label: "travellers hosted since 2016" },
    { value: 4.9, suffix: "/5", label: "average trip rating" },
    { value: 98, suffix: "%", label: "would book with us again" },
  ],

  destinations: [
    { id: "lisbon", name: "Lisbon", country: "Portugal", tagline: "Tiled hills and river light", lat: 38.7, lon: -9.1, scene: "city", palette: ["#1d4e6b", "#f4a259", "#ffd98e", "#2f6d86", "#c8553d", "#7a2e2a"], seed: 11, from: 1190, daily: 150, flight: 620 },
    { id: "wadi-rum", name: "Wadi Rum", country: "Jordan", tagline: "Red dunes, silent camps", lat: 29.6, lon: 35.4, scene: "dunes", palette: ["#3b2a4a", "#ee8f5a", "#ffe3a3", "#b9533b", "#8e3b2b", "#4f1f1c"], seed: 23, from: 1390, daily: 130, flight: 540 },
    { id: "dolomites", name: "Dolomites", country: "Italy", tagline: "Pink peaks, slow trails", lat: 46.4, lon: 11.9, scene: "mountains", palette: ["#27475f", "#e8b4a0", "#fff1d6", "#6f8aa0", "#43647a", "#1f3a4a"], seed: 37, from: 1650, daily: 210, flight: 690 },
    { id: "raja-ampat", name: "Raja Ampat", country: "Indonesia", tagline: "Reefs and limestone islands", lat: -0.6, lon: 130.5, scene: "islands", palette: ["#0e5a63", "#8fd3c8", "#fff4c2", "#2c8c8c", "#1b6e72", "#0b4a52"], seed: 5, from: 2480, daily: 190, flight: 1250 },
    { id: "kyoto", name: "Kyoto", country: "Japan", tagline: "Temple mornings, lantern nights", lat: 35.0, lon: 135.7, scene: "mountains", palette: ["#4a2d4f", "#f2a7a0", "#ffe6c7", "#8c5a7a", "#5e3a5c", "#33203a"], seed: 41, from: 2150, daily: 230, flight: 1180 },
    { id: "cape-town", name: "Cape Town", country: "South Africa", tagline: "Where mountain meets ocean", lat: -33.9, lon: 18.4, scene: "mountains", palette: ["#1c3f5a", "#f0b27a", "#ffe9b0", "#3f7a8a", "#2b5a68", "#16384a"], seed: 53, from: 1980, daily: 160, flight: 980 },
  ] as Destination[],

  stays: [
    { id: "s1", name: "Casa do Rio", area: "Alfama, Lisbon", type: "Villa", price: 240, rating: 4.9, reviews: 212, scene: "city", palette: ["#1d4e6b", "#f4a259", "#ffd98e", "#2f6d86", "#c8553d", "#7a2e2a"], seed: 101 },
    { id: "s2", name: "Camp Sela", area: "Wadi Rum", type: "Cabin", price: 135, rating: 4.8, reviews: 164, scene: "dunes", palette: ["#3b2a4a", "#ee8f5a", "#ffe3a3", "#b9533b", "#8e3b2b", "#4f1f1c"], seed: 102 },
    { id: "s3", name: "Rifugio Alba", area: "Val Gardena", type: "Cabin", price: 185, rating: 4.9, reviews: 98, scene: "mountains", palette: ["#27475f", "#e8b4a0", "#fff1d6", "#6f8aa0", "#43647a", "#1f3a4a"], seed: 103 },
    { id: "s4", name: "Atoll House", area: "Raja Ampat", type: "Beach", price: 320, rating: 5.0, reviews: 61, scene: "islands", palette: ["#0e5a63", "#8fd3c8", "#fff4c2", "#2c8c8c", "#1b6e72", "#0b4a52"], seed: 104 },
    { id: "s5", name: "Machiya Hanare", area: "Higashiyama, Kyoto", type: "City", price: 275, rating: 4.9, reviews: 187, scene: "mountains", palette: ["#4a2d4f", "#f2a7a0", "#ffe6c7", "#8c5a7a", "#5e3a5c", "#33203a"], seed: 105 },
    { id: "s6", name: "Bairro Loft", area: "Chiado, Lisbon", type: "City", price: 155, rating: 4.7, reviews: 301, scene: "city", palette: ["#233a5e", "#e98f6f", "#ffd9a8", "#35527e", "#b8503f", "#6b2a2b"], seed: 106 },
    { id: "s7", name: "Tide Cottage", area: "Bantry Bay, Cape Town", type: "Beach", price: 210, rating: 4.8, reviews: 143, scene: "islands", palette: ["#1c3f5a", "#f0b27a", "#ffe9b0", "#3f7a8a", "#2b5a68", "#16384a"], seed: 107 },
    { id: "s8", name: "Villa Pinheiro", area: "Sintra", type: "Villa", price: 390, rating: 4.9, reviews: 77, scene: "mountains", palette: ["#2b4b45", "#d9b38c", "#fff0cf", "#5f8a7a", "#3f6a5c", "#274238"], seed: 108 },
  ] as Stay[],

  why: [
    { title: "One person, start to finish", text: "A named trip host answers your messages, day or night, until you are home.", span: "md:col-span-2 md:row-span-2", icon: "chat" },
    { title: "Flexible dates", text: "Change plans up to 21 days before departure, free.", span: "", icon: "calendar" },
    { title: "Walked first", text: "Our team tests every route and bed.", span: "", icon: "boot" },
    { title: "Small groups", text: "Never more than 10 people, so doors open.", span: "", icon: "users" },
    { title: "Local money stays local", text: "At least 70% of your spend goes to family-run businesses.", span: "md:col-span-2", icon: "leaf" },
  ],

  testimonials: [
    { quote: "Our host rebooked an entire day around a storm before we even woke up. That is the difference.", name: "Amira Haddad", trip: "Wadi Rum, 6 nights" },
    { quote: "Not one tourist-trap dinner in ten days. We still talk about the family kitchen in Alfama.", name: "Jonas Weber", trip: "Lisbon, 10 nights" },
    { quote: "I travel for work constantly. This was the first trip where I forgot to check my email.", name: "Mei Tanaka", trip: "Dolomites, 8 nights" },
  ],

  faqs: [
    { q: "How does booking work?", a: "Send us a request with your dates and group size. A trip host replies within one working day with a draft plan and a fixed price. You pay a 20% deposit only after you approve it." },
    { q: "Can I change or cancel my trip?", a: "Yes. Dates can be moved for free up to 21 days before departure. Cancellations are refunded in full up to 45 days before, and as credit after that." },
    { q: "Are flights included?", a: "Flights are optional. We can book them with the trip or work around the ones you already have." },
    { q: "Do you do private trips?", a: "Every itinerary can be run privately for your own group of 2 to 10 people at the same quality." },
    { q: "Is my payment secure?", a: "Payments go through a PCI-compliant processor. We never store your card details." },
  ],

  footer: {
    blurb: "Hand-built journeys and stays, with a real person on call.",
    columns: [
      { title: "Explore", links: [{ label: "Destinations", href: "#destinations" }, { label: "Stays", href: "#stays" }, { label: "Trip planner", href: "#planner" }] },
      { title: "Company", links: [{ label: "Why Nomada", href: "#why" }, { label: "Stories", href: "#stories" }, { label: "FAQ", href: "#faq" }] },
      { title: "Legal", links: [{ label: "Terms", href: "#" }, { label: "Privacy", href: "#" }, { label: "Cookies", href: "#" }] },
    ],
    socials: [
      { label: "Instagram", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "Pinterest", href: "#" },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
