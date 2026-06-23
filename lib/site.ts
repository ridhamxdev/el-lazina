// Central content + image map. Swap any id/string here to restyle the whole site.

const px = (id: number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const brand = {
  name: "EL LAZINA",
  rawName: "EL_Lazina",
  tagline: "Where the night finds its rhythm.",
  intro:
    "A café built for culture — open mics that find new voices, jam sessions that run past midnight, a studio that captures it all, and machines that gather a crowd.",
  city: "Open daily · Downtown",
  email: "hello@ellazina.cafe",
  phone: "+91 98765 43210",
  address: "14 Marine Lane, Downtown",
};

export const marqueeWords = [
  "Open Mic",
  "Live Jamming",
  "Music Production",
  "Auto Shows",
  "Specialty Coffee",
  "Late Nights",
];

export type Experience = {
  index: string;
  title: string;
  blurb: string;
  image: string;
};

export const experiences: Experience[] = [
  {
    index: "01",
    title: "Open Mic Nights",
    blurb:
      "Every voice gets the floor. Poets, comics, singers and first-timers step up under a single warm light while the room goes quiet.",
    image: px(16458219),
  },
  {
    index: "02",
    title: "Live Jamming",
    blurb:
      "Plug in and play. Resident musicians and walk-in players trade riffs late into the night — no setlist, no rules, just the groove.",
    image: px(27817824),
  },
  {
    index: "03",
    title: "Music Production",
    blurb:
      "An in-house studio behind the bar. Track a single, mix a session, or record your set live the night it happens.",
    image: px(7901950),
  },
  {
    index: "04",
    title: "Auto Shows",
    blurb:
      "Weekends bring chrome and horsepower to the courtyard — classics, customs and the kind of engines you feel in your chest.",
    image: px(30287465),
  },
];

export const gallery = [
  { src: px(1613240), tall: true, label: "Live" },
  { src: px(1855214), tall: false, label: "Coffee" },
  { src: px(30163664), tall: false, label: "Auto" },
  { src: px(18368848), tall: true, label: "Jam" },
  { src: px(6152270), tall: false, label: "Room" },
  { src: px(26447525), tall: true, label: "Crowd" },
  { src: px(12313590), tall: false, label: "Chrome" },
  { src: px(7802300), tall: false, label: "Studio" },
];

export const aboutImages = {
  primary: px(4218027),
  secondary: px(30234396),
};

export type EventItem = {
  date: string;
  day: string;
  title: string;
  kind: string;
  image: string;
};

export const events: EventItem[] = [
  {
    date: "26 JUN",
    day: "Friday",
    title: "Acoustic Open Mic",
    kind: "Open Mic",
    image: px(5934959, 800),
  },
  {
    date: "04 JUL",
    day: "Saturday",
    title: "Midnight Jam Session",
    kind: "Live Jamming",
    image: px(196652, 800),
  },
  {
    date: "17 JUL",
    day: "Friday",
    title: "Studio Sessions — Live Recording",
    kind: "Production",
    image: px(7802300, 800),
  },
  {
    date: "26 JUL",
    day: "Sunday",
    title: "Classic & Custom Auto Show",
    kind: "Auto Show",
    image: px(15241077, 800),
  },
];

export const stats = [
  { value: "120+", label: "Nights a year" },
  { value: "40", label: "Coffee origins" },
  { value: "8k", label: "Cups poured weekly" },
  { value: "1", label: "Stage that never sleeps" },
];
