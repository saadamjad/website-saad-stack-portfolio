/**
 * Saad's complete public knowledge base — edit this file to update the agent.
 * After changes: restart PocketBase + run `bash scripts/seed-zizkadb.sh`
 */
var builder = require(__hooks + "/chat/knowledge_builder.js");

var DATA = {
  profile: {
    name: "Saad",
    fullName: "M. Saad Amjad",
    title: "Senior Full-Stack Engineer",
    specialty: "React Native specialist",
    experience: "7 years building high-performance mobile and web applications",
    location: "Pakistan (works remotely with international clients; currently with Washmen in Dubai, UAE)",
    nationality: "Pakistani",
    languages: ["English", "Urdu"],
    availability:
      "Open to full-time, contract, and consulting roles — typically 1-2 major projects at a time for quality",
    summary:
      "Saad is a React Native and full-stack engineer who builds production mobile and web systems for millions of users — from freelance apps to enterprise integrations at Washmen, Careem, and InstaShop.",
    contact: {
      phone: "+92 336 2065663",
      whatsapp: "+92 336 2065663",
      emailPrimary: "saad.amjad434@gmail.com",
      emailSecondary: "contact@saadstack.com",
    },
    values: [
      "Clean, maintainable code that stands the test of time",
      "Building systems that scale to millions of users",
      "Transparent communication and agile delivery",
      "Professionalism and kindness in every interaction",
    ],
    personal: {
      birthDate: "",
      birthPlace: "",
      age: "",
    },
  },

  education: {
    degree: "Bachelor of Science (BS)",
    field: "Software Engineering",
    university: "",
    graduationYear: "2020",
    notes:
      "Software Engineering graduate (2020). Foundation in computer science, software design, and engineering principles applied daily in mobile and full-stack development.",
    highlights: [
      "Studied Software Engineering with focus on building real-world applications and scalable systems.",
      "Graduated in 2020 and transitioned professional freelance mobile development into a full-time engineering career.",
    ],
  },

  careerTimeline: [
    {
      period: "2023 – Present",
      role: "Senior React Native & Full-Stack Engineer",
      company: "Washmen, Dubai, UAE",
      description:
        "Leads development for apps serving 1M+ users. Builds React/React Native mobile and web apps. Architects PWAs for Careem, InstaShop, and RIZEK. Designs Node.js/Sails.js microservices and AWS Lambda backends.",
    },
    {
      period: "2018 – 2022",
      role: "Freelance React Native Developer",
      company: "Fiverr / Upwork (international clients)",
      description:
        "Built 10+ cross-platform mobile apps for global clients. Specialized in React Native, API integrations, payments, and polished UI/UX. Delivered projects for startups in Pakistan, UAE, and Saudi Arabia.",
    },
    {
      period: "Career start (2018)",
      role: "First professional software role",
      company: "Freelance platforms",
      description:
        "Saad started his professional software career in 2018 as a freelance React Native developer while completing his Software Engineering degree (graduated 2020).",
    },
  ],

  projects: [
    {
      title: "Washmen Dubai",
      description: "UAE's leading app-based laundry, dry cleaning, ShoeCare, and Bag Care service.",
      stack: "React Native, Sails.js, AWS Lambda, SQS, SNS",
    },
    {
      title: "PWA Careem",
      description: "PWA integration for order placement and payments inside Careem super-app.",
      stack: "React Native, Sails.js, AWS, Redis",
    },
    {
      title: "Retailo B2B Marketplace",
      description: "B2B marketplace and digital distribution across MENAP (KSA & UAE).",
      stack: "React Native, Express, MongoDB, Redis, Docker",
    },
    {
      title: "Hao Saudi",
      description: "B2C experiences marketplace in Riyadh — local activities and experiences.",
      stack: "React Native, Node.js, AWS",
    },
    {
      title: "Sitgo",
      description: "Intercity ride-booking app in Pakistan.",
      stack: "React Native, Node.js, AWS Lambda, SQS",
    },
    {
      title: "TheGestor",
      description: "Fintech billing, accounting, and taxation for freelancers and SMEs.",
      stack: "React Native, Node.js, AWS Lambda, SQS",
    },
  ],

  hobbies: [
    "Technology and exploring new frameworks",
    "Travel and experiencing different cultures",
    "Learning new development tools and mobile architectures",
    "Building side projects and staying current with React Native ecosystem",
  ],

  countriesVisited: [
    { name: "Pakistan", context: "home country; based here, built Sitgo and multiple local products" },
    { name: "United Arab Emirates", context: "works with Washmen in Dubai; Careem PWA and UAE client projects" },
    { name: "Saudi Arabia", context: "Hao marketplace project in Riyadh; Retailo KSA work" },
    { name: "Azerbaijan", context: "visited" },
    { name: "Thailand", context: "visited" },
    { name: "Bahrain", context: "visited" },
    { name: "India", context: "visited" },
    { name: "Oman", context: "visited" },
  ],

  hrProfile: {
    strengths: [
      "7 years hands-on experience shipping React Native apps to production at scale",
      "Full-stack capability: mobile, web, APIs, AWS serverless, and databases",
      "Proven track record with 1M+ user platforms (Washmen, Careem integrations)",
      "Strong freelance background — 10+ delivered apps for international clients",
      "Agile delivery, clear communication, and ownership from architecture to release",
      "Experience with both startups (MVPs) and enterprise-scale integrations",
    ],
    whyHire: [
      "Saad combines deep React Native expertise with full-stack backend skills — one engineer who can own mobile + API + cloud.",
      "He has already solved hard problems at scale: real-time orders, payments, PWAs inside super-apps, and microservices on AWS.",
      "Reliable communicator who has worked remotely with UAE, KSA, and global clients for years.",
      "Delivers maintainable code and supports products post-launch with retainer-based maintenance.",
    ],
    interviewTips: [
      "Ask Saad about Washmen Careem PWA integration — demonstrates cross-platform and partner integration skills.",
      "Ask about scaling React Native performance for 1M+ users.",
      "Ask about freelance-to-enterprise career path starting 2018, graduation 2020.",
      "Strong fit for: Senior React Native, Full-Stack Mobile, or Node.js/AWS backend roles.",
      "Open to remote, hybrid, or relocation discussions for the right opportunity.",
    ],
  },

  extraFacts: [
    { topic: "skills", text: "Mobile: React Native, Expo, iOS, Android. Web: React, Next.js, TypeScript, Tailwind CSS." },
    { topic: "skills", text: "Backend: Node.js, Express, NestJS, Sails.js. Cloud: AWS Lambda, SQS, SNS, CI/CD, GitHub Actions." },
    { topic: "skills", text: "Databases: MongoDB, Redis, DynamoDB, Firebase. Testing: Jest, Cypress, Detox. Analytics: Mixpanel, CleverTap, Sentry." },
    { topic: "services", text: "Services: mobile apps, full-stack web, backend architecture, performance optimization, cloud infrastructure, technical leadership." },
    { topic: "process", text: "Agile methodology: architecture planning, two-week sprints, staging builds, transparent updates. MVPs: 8-12 weeks. Enterprise: 3-6 months." },
    { topic: "process", text: "Offers post-launch retainer support: monitoring, security updates, bug fixes, and feature growth." },
    { topic: "clients", text: "Clients and platforms: Washmen, Careem, InstaShop, RIZEK, Retailo, Hao Saudi, Sitgo, TheGestor." },
    { topic: "boundaries", text: "Does not share private family details, exact home address, salary expectations, or sensitive financial data via this public assistant." },
    { topic: "learned", text: "Q: Would Saad fit a fintech startup? A: Yes — he built TheGestor fintech and multiple payment integrations (Careem PWA). Strong React Native + Node/AWS full-stack skills." },
    { topic: "learned", text: "Q: Can Saad work remotely? A: Yes — based in Pakistan with years of remote collaboration with UAE, KSA, and international clients. Currently works with Washmen Dubai." },
    { topic: "learned", text: "Q: Is Saad senior enough for a lead role? A: 7 years experience, leads development at Washmen for 1M+ users, architects microservices and PWAs — suitable for senior/lead mobile or full-stack roles." },
    { topic: "learned", text: "Q: What's his education background? A: BS Software Engineering, graduated 2020. Started freelancing in 2018 while completing his degree." },
    { topic: "learned", text: "Q: Has he worked in the Gulf? A: Yes — professional work in UAE (Washmen Dubai, Careem) and Saudi Arabia (Hao Riyadh, Retailo KSA)." },
  ],

  cannedResponses: {
    abuse:
      "I appreciate you reaching out. I'm here to share Saad's background in a respectful way. Ask me about his experience, education, projects, or how to work with him.",
    jailbreak:
      "I'm Saad's personal representative — I help with questions about his career, education, skills, projects, and contact info. What would you like to know?",
    offTopic:
      "I'm here to represent Saad — his experience, education, skills, travel, hobbies, and how to connect. Ask me anything about those topics!",
    unknownPersonal:
      "That's a personal detail Saad hasn't shared publicly here. I can tell you about his education, career, projects, hobbies, countries visited, or how to contact him.",
    unknownBirth:
      "Saad hasn't shared his birth date publicly. His timeline: started his software career in 2018, graduated Software Engineering in 2020, and has been at Washmen Dubai since 2023.",
    greeting:
      "Hello! I'm Saad's personal representative. Ask me about his education, career, projects, tech stack, hobbies, countries he's visited, or how to hire him — happy to help HR and interviewers too.",
    thanks:
      "You're welcome! Feel free to ask more about Saad's background or reach out via the contact section to discuss opportunities.",
    hrSummary:
      "Saad Amjad is a Senior Full-Stack Engineer and React Native specialist with 7 years of experience. BS Software Engineering (2020). Career started 2018 (freelance). Currently at Washmen Dubai (2023–present) building apps for 1M+ users including Careem and InstaShop integrations. Strong full-stack skills: React Native, Node.js, Sails.js, AWS. Based in Pakistan, experienced working with UAE and KSA clients. Open to discussing roles — contact via WhatsApp +92 336 2065663 or saad.amjad434@gmail.com.",
  },
};

module.exports = {
  profile: DATA.profile,
  education: DATA.education,
  careerTimeline: DATA.careerTimeline,
  projects: DATA.projects,
  hobbies: DATA.hobbies,
  countriesVisited: DATA.countriesVisited,
  hrProfile: DATA.hrProfile,
  cannedResponses: DATA.cannedResponses,
  facts: builder.buildFacts(DATA),
  buildPromptSections: function () {
    return builder.buildPromptSections(DATA);
  },
};
