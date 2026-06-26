export type EventItem = {
  sortDate: string;
  date: string;
  title: string;
  location: string;
  role?: string;
  links?: { label: string; href: string }[];
  flyer?: string;
  flyerAlt?: string;
};

const allEvents: EventItem[] = [
  {
    sortDate: "2026-07-22",
    date: "7/22/26, 6–10 PM",
    title: "RIVET: Collars + Mosh Party",
    location: "Devil Mask Studio",
    role: "Co-host with Shayn (International Trainer 2026) — make a collar, supplies and snacks provided, mosh starts at 8 PM",
    links: [
      {
        label: "Craft + Mosh RSVP",
        href: "https://momence.com/Devil-Mask-Studio/RIVET-Collars-%2B-Mosh-Party/138905931",
      },
      {
        label: "Mosh only RSVP",
        href: "https://momence.com/l/9khKa2Ql",
      },
    ],
    flyer: "/images/events/rivet-collars-mosh-july-2026.png",
    flyerAlt: "RIVET Collars and Mosh Party flyer, July 22, 2026",
  },
  {
    sortDate: "2026-06-24",
    date: "6/24/26, 7 PM",
    title: "Strap Social",
    location: "Eagle LA, 4219 Santa Monica Blvd",
    role: "Host with Patricia Nyx (Chains of Love) — for leather queers, freaks, pups & pets",
    flyer: "/images/events/strap-social-june-2026.png",
    flyerAlt: "Strap Social at the Eagle flyer, June 24, 2026",
  },
  {
    sortDate: "2026-06-20",
    date: "6/20/26",
    title: "Cruise LA at the Eagle",
    location: "Eagle LA",
  },
  {
    sortDate: "2026-06-18",
    date: "6/18/26",
    title: "Leathear Beast",
    location: "Bullet Bar",
    role: "Vending",
  },
  {
    sortDate: "2026-06-17",
    date: "6/17/26, 6–9 PM",
    title: "RIVET: Leather Care + Bootblacking 101",
    location: "Commonground Studio, Los Angeles",
    role: "Co-Host",
    flyer: "/images/events/rivet-bootblacking-june-2026.png",
    flyerAlt: "RIVET Leather Care and Bootblacking 101 flyer, June 17, 2026",
  },
  {
    sortDate: "2026-05-16",
    date: "5/16/26",
    title: "Cruise LA at the Eagle",
    location: "Eagle LA",
  },
  {
    sortDate: "2026-05-09",
    date: "5/9/26, 11 AM",
    title: "Stockroom Kinky Flea Market",
    location: "The Stockroom, Los Angeles",
    role: "Vending",
  },
  {
    sortDate: "2026-05-07",
    date: "5/7/26, 7 PM",
    title: "RIVET: Cuffs and Collars Project Party",
    location: "Commonground Studio, 1202 1/2 Cypress Ave, Los Angeles",
    role: "Host with KD — learn leather gear basics, supplies and snacks included — RSVP on Partiful",
    flyer: "/images/events/rivet-cuffs-collars-may-2026.png",
    flyerAlt: "RIVET Cuffs and Collars Project Party flyer, May 7, 2026",
  },
  {
    sortDate: "2026-04-29",
    date: "4/29/26, 7 PM",
    title: "Leather is Drag",
    location: "Precinct",
    role: "Performance",
  },
  {
    sortDate: "2026-04-19",
    date: "4/19/26",
    title: "Pink Pony Club",
    location: "Los Angeles",
    role: "Performance",
  },
  {
    sortDate: "2026-04-18",
    date: "4/18/26, 10:30 AM–12 PM",
    title: "RIVET: Field Trip to Sav-Mor Leather",
    location: "Sav-Mor Leather, 1626 Wall St, Los Angeles",
    role: "Host — talk projects and get supplies, all skill levels welcome — meet after at Cruise LA, 3–9 PM",
    flyer: "/images/events/rivet-sav-mor-april-2026.png",
    flyerAlt: "RIVET field trip to Sav-Mor Leather flyer, April 18, 2026",
  },
  {
    sortDate: "2026-04-02",
    date: "4/2/26 – 4/5/26",
    title: "International Puppy and Trainer Contest (IPTC)",
    location: "Center on Halsted, Chicago, IL",
    role: "Vending",
  },
  {
    sortDate: "2026-03-31",
    date: "3/31/26, 7 PM",
    title: "Trans Day of Visibility Takeover",
    location: "Eagle LA, 4219 Santa Monica Blvd",
    role: "Hosting",
    flyer: "/images/events/tdov-takeover-eagle.png",
    flyerAlt: "Trans Day of Visibility Takeover at the Eagle flyer, March 31, 2026",
  },
  {
    sortDate: "2026-03-25",
    date: "3/25/26, 7–10 PM",
    title: "RIVET: Queer/Trans-Led Leather Social + Skill Night",
    location: "Commonground Studio, 1202 1/2 Cypress Ave, Los Angeles",
    role: "Leather 101 with Kyle — meet and mingle",
    flyer: "/images/events/rivet-kickoff-march-2026.png",
    flyerAlt: "RIVET queer trans-led leather social and skill night flyer, March 25, 2026",
  },
  {
    sortDate: "2026-03-21",
    date: "3/21/26",
    title: "Cruise LA at the Eagle",
    location: "Eagle LA",
  },
  {
    sortDate: "2026-02-21",
    date: "2/21/26",
    title: "Cruise LA at the Eagle — Gear Swap, Leather Clinic, Cruise Cupid",
    location: "Eagle LA",
    role: "Running the Leather Clinic",
  },
  {
    sortDate: "2026-02-13",
    date: "2/13/26",
    title: "De La Noche Goth and Punk Dance Party",
    location: "Los Angeles",
    role: "Vending",
  },
  {
    sortDate: "2026-02-08",
    date: "2/8/26",
    title: "Leather and Lovers Picnic (Leather Queers in the Park)",
    location: "Sycamore Grove Park",
    role: "Co-host — Kinky Loteria",
  },
  {
    sortDate: "2026-02-05",
    date: "2/5/26",
    title: 'm black "Single Stall Sex" Opening Exhibition',
    location: "TOM House",
    role: "Performer",
  },
  {
    sortDate: "2026-01-24",
    date: "1/24/26",
    title: "Power Play Party",
    location: "Falcon North",
    role: "Vending",
  },
  {
    sortDate: "2026-01-17",
    date: "1/17/26",
    title: "Cruise Unofficial Takeover at the Eagle",
    location: "Eagle LA",
    role: "Flirt Bingo",
  },
  {
    sortDate: "2025-12-28",
    date: "12/28/25",
    title: "Leather Queers in the Park",
    location: "Bixby Park",
  },
  {
    sortDate: "2025-12-20",
    date: "12/20/25",
    title: "Cruise LA at the Eagle — Dirty Santaland",
    location: "Eagle LA",
    role: "Photos, Spanking booth, and more",
  },
  {
    sortDate: "2025-12-07",
    date: "12/7/25",
    title: "Pink Pony Club",
    location: "Akbar, Silver Lake",
    role: "Santa spanking booth",
  },
  {
    sortDate: "2025-11-27",
    date: "11/27/25",
    title: "Leather Queer Picnic",
    location: "Plummer Park",
    role: "Co-host with Vega",
  },
  {
    sortDate: "2025-11-15",
    date: "11/15/25",
    title: "Cruise LA at the Eagle",
    location: "Eagle LA",
  },
  {
    sortDate: "2025-11-08",
    date: "11/8/25",
    title: "Paws & Claws Pet Show (SoCal Creatures)",
    location: "Los Angeles",
    role: "Judge",
  },
];

export const events = [...allEvents].sort((a, b) =>
  b.sortDate.localeCompare(a.sortDate),
);

const today = new Date().toISOString().slice(0, 10);

export const upcomingEvents = [...allEvents]
  .filter((event) => event.sortDate >= today)
  .sort((a, b) => a.sortDate.localeCompare(b.sortDate));
