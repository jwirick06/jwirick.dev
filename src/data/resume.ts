// Single source of truth for resume content.
//
// Imported by src/pages/resume.astro (the HTML page), src/pages/resume.txt.ts
// (plain text) and src/pages/resume.ans.ts (ANSI). /cv re-exports resume.ans.
//
// This content is accuracy-constrained. Read the "Resume accuracy" section of
// CLAUDE.md before changing any wording here: several phrasings are load
// bearing and must not be upgraded.

export const summary = "Computer Information Systems student at Okanagan College, credential conferral pending, continuing to a Bachelor of Computer Information Systems with a Cybersecurity option in Fall 2026. Supported front-line service desk operations for the City of West Kelowna across 15 facilities, working in Ivanti for both ticketing and asset inventory, imaging and deploying end-user hardware, and replacing network equipment. Three years of self-directed server and network administration in a permanent home lab.";

export const skillGroups = [
  {
    label: "Service Desk & Support",
    items: ["Ivanti (ticketing, asset inventory, back end)", "Incident intake and prioritization", "ITIL-aligned queue practice", "Hardware imaging and deployment", "End-user support", "Point-of-sale systems", "Technical documentation"]
  },
  {
    label: "Infrastructure & Networking",
    items: ["Cisco/Meraki switches and access points", "Proxmox VE", "Docker Compose", "Hyper-V", "Windows Server 2025 (home lab)", "Linux (Ubuntu/Debian)", "Tailscale", "DNS and static IP addressing"]
  },
  {
    label: "Cloud & Version Control",
    items: ["Azure Repos", "Azure Key Vault", "Git", "Microsoft 365", "Intune reporting"]
  },
  {
    label: "Languages & Data",
    items: ["Java", "JavaScript", "C#", "PHP", "Dart/Flutter", "Oracle SQL", "PostgreSQL", "Excel and Power Query (M)"]
  }
];

export const problemSolving = "Problem Solving: Enjoy working with people to solve problems using technology.";

// `printBullets` is how many bullets the one-page print/PDF resume keeps for
// each role. The web page always shows every bullet. Bullets are ordered
// strongest first, so this number is the single knob for what gets printed:
// raise it if the PDF has room, lower it if it spills onto a second page.
export const experiences = [
  {
    role: "Information Systems Student",
    company: "City of West Kelowna",
    period: "June 2026 - August 2026",
    printBullets: 5,
    bullets: [
      "Provided front-line support across all 15 city-managed facilities, receiving, documenting, and prioritizing incidents and service requests in Ivanti.",
      "Covered the majority of the service desk queue alone for a week while the team was away, resolving every request within scope and escalating the rest.",
      "Traced and corrected a fault in the Ivanti back end that prevented a field value from saving, restoring accurate records.",
      "Imaged 65+ desktops and laptops, and deployed 10+ workstations and 120+ monitors including mounting, peripherals, and cable management.",
      "Replaced and configured 10+ Cisco and Meraki switches and access points.",
      "Completed a full technology asset audit across all 15 locations and built a dashboard for lifecycle and replacement planning.",
      "Authored the city's cybersecurity incident response plan and its accompanying task matrix.",
      "Facilitated a runbook initiative across the four-person infrastructure team, developing the template, running the sessions, and guiding senior staff through documenting their procedures.",
      "Conducted an Adobe licensing survey leading to an estimated 20% reduction in annual Adobe spend, roughly $10,000 or more per year.",
      "Configured Azure Repos and Key Vault for departmental adoption after presenting the proposal to management, and authored the Git workflow and onboarding documentation.",
      "Relocated a department's technology during an office move, and supported Emergency Support Services setup during wildfire response."
    ]
  },
  {
    role: "Parts Driver & Warehouse Support",
    company: "Lordco Auto Parts",
    period: "June 2024 - Present",
    printBullets: 2,
    bullets: [
      "Handle inbound calls from customers and branches, recording order details and updating records in internal systems.",
      "Operate point-of-sale and inventory systems for counter sales, returns, and parts lookups.",
      "Run multi-stop delivery routes on schedule, coordinating with branches on changes and priority orders."
    ]
  },
  {
    role: "Cashier/Cook",
    company: "Chopped Leaf",
    period: "April 2022 - September 2024",
    printBullets: 1,
    bullets: [
      "Served customers and prepared menu items through high-volume lunch and dinner periods.",
      "Operated the point-of-sale system for counter orders, processing cash and card transactions.",
      "Maintained food safety and cleanliness standards."
    ]
  }
];

export const selfDirected = [
  {
    role: "Personal Lab",
    period: "2023 - Present",
    printBullets: 2,
    bullets: [
      "Run a permanent Proxmox VE environment with LXC containers, Docker Compose services, scheduled backups, and Tailscale remote access.",
      "Built a Windows Server 2025 Hyper-V lab covering AD DS, organizational units, Group Policy, static IP addressing, DNS, and domain joins.",
      "Provide ongoing informal first-line support for family and neighbours."
    ]
  }
];

// The four portfolio projects, in one place.
//
// Each entry carries the facts that must never diverge (name, link, stack)
// plus two registers of prose: the top-level `description`/`tags` are the
// terse form used by the resume page and the /resume.txt and /resume.ans
// endpoints, where space is tight and the reader is scanning. `detail` is the
// fuller form used by the projects page, which has room to explain.
export const projects = [
  {
    name: "Sendline",
    tags: ["Flutter", "Dart", "Supabase", "PostGIS"],
    description: "Ski and snowboard tracking app built in Flutter, backed by Supabase and PostGIS with row-level security enforcing per-user access to run data.",
    link: null,
    detail: {
      title: "Sendline",
      tags: ["Flutter", "Dart", "Supabase", "PostGIS", "Row-Level Security", "Mobile"],
      description: "Built a ski and snowboard tracking app in Flutter, backed by Supabase and PostGIS. Modelled runs as geospatial data and enforced per-user access to it with row-level security policies at the database layer."
    }
  },
  {
    name: "Taskd",
    tags: ["Java", "Maven", "JUnit", "Concurrency"],
    description: "Distributed task scheduler with priority queues, retry handling, and real-time metrics, built around enterprise design patterns with 90%+ test coverage.",
    link: "https://github.com/jwirick06/Taskd",
    detail: {
      title: "Taskd - Distributed Task Scheduler",
      tags: ["Java", "Maven", "JUnit", "Design Patterns", "Concurrency", "Thread-Safety"],
      description: "Task scheduler with priority queues, retry handling, and real-time metrics. Built around the Strategy, Decorator, Builder, Observer, and Factory patterns, with 90%+ test coverage and 1000+ tasks/second throughput."
    }
  },
  {
    name: "SteadyPlan",
    tags: ["PHP", "PostgreSQL", "REST API", "MVC"],
    description: "Kanban project management app. Served as project lead, leading a team of 4 of my peers, and designed the PostgreSQL schema and the PHP REST API behind task reordering and team collaboration.",
    link: "https://github.com/Rkovl/SteadyPlan",
    detail: {
      title: "SteadyPlan",
      tags: ["PHP", "PostgreSQL", "REST API", "Database Design", "MVC", "User Authentication (Session)"],
      description: "Built the backend for a Kanban-style project management app in PHP and PostgreSQL. Designed the database around task reordering and team collaboration, and wrote the API the frontend consumes."
    }
  },
  {
    name: "Bracket Bets",
    tags: ["JavaScript", "GraphQL", "Async"],
    description: "Client-side prediction game that consumes a third-party GraphQL API, parsing tournament brackets into a Top 8 guessing interface.",
    link: "https://github.com/Rkovl/BracketBets",
    detail: {
      title: "Bracket Bets",
      tags: ["Javascript", "JSON Data Parsing", "GraphQL", "Asynchronous Programming", "Frontend"],
      description: "Client-side prediction game that pulls historical tournament data from a third-party GraphQL API, parses the JSON brackets, and renders them as a Top 8 guessing interface."
    }
  }
];

export const education = [
  {
    credential: "Diploma of Computer Information Systems",
    school: "Okanagan College",
    period: "September 2024 - August 2026",
    badge: "Conferral pending",
    notes: [
      "Coursework complete and program requirements met. Conferral pending the graduation audit.",
      "Dean's List in both years of the program."
    ]
  },
  {
    credential: "Bachelor of Computer Information Systems, Cybersecurity option",
    school: "Okanagan College",
    period: "Starting Fall 2026",
    badge: "In progress",
    notes: []
  }
];

export const additional = "Valid Class 5 driver's licence. Able to obtain a Police Information Check.";
