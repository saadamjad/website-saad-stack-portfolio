/**
 * Saad's complete public knowledge base — edit this file to update the agent.
 * After changes: restart PocketBase for the new system prompt to take effect.
 */
var builder = require(__hooks + "/chat/knowledge_builder.js");

var DATA = {
  profile: {
    name: "Saad",
    fullName: "M. Saad Amjad",
    title: "Senior Full-Stack React Native Engineer",
    specialty: "React Native specialist and full-stack engineer",
    experience: "7+ years building high-performance mobile and web applications",
    location: "Pakistan (works remotely with international clients; previously with Washmen in Dubai, UAE)",
    nationality: "Pakistani",
    languages: ["English (strong written and verbal communication)", "Urdu"],
    availability:
      "Currently Founding Engineer at ZIZKA AI S.L (full-time). Actively open to Senior React Native Engineer roles — full-time only — where he can drive architecture decisions, improve application performance, maintain release quality, and collaborate closely with product and engineering teams. Based in Pakistan working remotely, and willing to relocate if needed.",
    workAuthorization:
      "Currently living in Pakistan and working remotely for international companies. Open to relocation for the right role.",
    employmentTypePreference: "Full-time only (not seeking contract roles)",
    references:
      "References available on request — happy to be contacted directly, or you're welcome to reach out to HR or former colleagues at any of his previous companies (Washmen, Retailo, TekRevol, Hao Saudi) to verify his work.",
    summary:
      "Saad is a Senior React Native Engineer with 7+ years of experience building and scaling high-performance mobile applications across B2C and B2B platforms. He's delivered React Native apps and PWAs used by Careem, InstaShop, and RIZEK, supporting 1M+ active users, with strong full-stack range across Node.js/Sails.js microservices and AWS. He's currently Founding Engineer at Zizka AI, helping build ZizkaDB, an open-source operational database for AI agents, architecting both frontend and backend systems.",
    contact: {
      phone: "+92 336 2065663",
      whatsapp: "+92 336 2065663",
      emailPrimary: "saad.amjad434@gmail.com",
      emailSecondary: "contact@saadstack.com",
      website: "https://saadstack.com",
      github: "https://github.com/saadamjad",
      linkedin: "https://www.linkedin.com/in/saad-amjad-0b398116b/",
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
      maritalStatus: "Married",
    },
  },

  education: {
    degree: "Bachelor of Science (BS)",
    field: "Computer Science",
    university: "PAF – Karachi Institute of Economics & Technology (PAF-KIET), Karachi, Pakistan",
    graduationYear: "2020",
    grade: "B",
    notes:
      "BS Computer Science from PAF-KIET, Karachi (Jan 2016 – Aug 2020, Grade: B). Foundation in computer science, software design, and engineering principles applied daily in mobile and full-stack development.",
    highlights: [
      "Studied Computer Science at PAF-KIET, Karachi with a focus on building real-world applications and scalable systems.",
      "Graduated in August 2020 and transitioned freelance mobile development into a full-time engineering career.",
    ],
  },

  careerTimeline: [
    {
      period: "Jun 2026 – Present",
      role: "Founding Engineer",
      company: "ZIZKA AI S.L (Full-time, Remote)",
      description:
        "Founding engineer helping build ZizkaDB, an open-source operational database designed for AI agents. Architecting and building both frontend and backend systems.",
    },
    {
      period: "Sep 2023 – Present",
      role: "Software Engineer, Full Stack (React Native) – Customer Domain",
      company: "Washmen, Dubai, UAE (Remote)",
      description:
        "Acts as de facto technical lead for the React Native workstream — driving architecture decisions adopted across 3 product teams and owning end-to-end delivery of key initiatives from planning through production. Scaled React Native mobile apps and PWAs used by Careem, InstaShop, and RIZEK to over 1M+ active users. Delivers 3+ end-to-end features per quarter, translating Figma designs into React Native and Sails.js backend code. Built and continues to lead a shared Atomic Design component library (design system) used across 3 product teams, cutting UI development time by ~40% and improving consistency. Implemented event tracking (Avo, Mixpanel, Adjust), increasing analytics coverage by ~40%. Owns Sentry monitoring and release quality, maintaining a 99.9% crash-free rate across App Store and Google Play releases. Owns the full feature lifecycle across frontend, backend, and AWS deployments. Integrated LLM-powered features (OpenAI, Claude, Gemini APIs, MCP) into the mobile app for in-app assistance and smarter user flows.",
      techStack: "React Native, React.js, TypeScript, Sails.js, DynamoDB, AWS Lambda/SQS/SNS, Redux, Zustand, TanStack Query, OpenAI/Claude/Gemini APIs, MCP",
    },
    {
      period: "Mar 2023 – Aug 2023",
      role: "Software Engineer – Senior React Native & React.js Developer (Onsite Contract)",
      company: "TekRevol",
      description:
        "Drove performance optimization efforts, reducing app re-render overhead by ~50% through state management improvements, memoization, and component refactors with React Hooks and Redux Toolkit. Introduced React Native Clean Architecture with shared component modules, improving codebase scalability and maintainability by ~40%. Led end-to-end frontend development of the client-side mobile application.",
      techStack: "React Native, React.js, TypeScript, Redux Toolkit, React Hooks",
    },
    {
      period: "Feb 2021 – Apr 2023",
      role: "Software Engineer – React Native Engineer",
      company: "Retailo Technologies, UAE & Saudi Arabia (Remote)",
      description:
        "Owned and launched the Retailo B2B marketplace on the App Store, leading frontend architecture, feature development, and store submission. Increased user engagement by ~25% by implementing push notifications and deep linking (FCM + React Navigation) and Intercom in-app messaging. Automated deployment with Bitrise + GitHub Actions CI/CD, cutting manual release effort from 2 days to under 2 hours per cycle.",
    },
    {
      period: "Jan 2019 – Jan 2021",
      role: "Software Engineer – React Native Developer",
      company: "Hao Saudi, Riyadh, KSA (Remote)",
      description:
        "Owned the full product lifecycle from MVP to App Store and Google Play release with a small frontend team. Maintained a 99.2% crash-free session rate over 2+ years through proactive monitoring, debugging, and bug triage.",
    },
    {
      period: "2019 – 2021",
      role: "JavaScript / React Native Developer",
      company: "Fiverr & Upwork (Freelance, Remote)",
      description:
        "Delivered React Native apps across B2B, ride-hailing, and fintech domains, including TheGestor (fintech billing/accounting app). Managed full project lifecycle autonomously — requirements, architecture, development, testing, and App Store/Google Play delivery — across diverse domains and stacks.",
    },
  ],

  // "Live" = currently published/reachable products Saad built or shipped, not internal-only tools.
  liveAppsCount: 7,
  projects: [
    {
      title: "ZizkaDB (Zizka AI)",
      description: "Open-source operational database designed for AI agents. Founding engineer architecting and building both frontend and backend systems.",
      stack: "Full-stack (frontend + backend architecture)",
      link: "https://saadstack.com",
      live: true,
    },
    {
      title: "Washmen App (iOS)",
      description: "UAE's leading on-demand laundry, dry cleaning, ShoeCare, and Bag Care service. Developed and maintained the React Native customer app, serving 1M+ active users.",
      stack: "React Native, TypeScript, Sails.js, AWS Lambda/SQS/SNS, DynamoDB",
      link: "https://apps.apple.com/pk/app/washmen-the-finery/id1037965236",
      live: true,
    },
    {
      title: "Washmen PWA",
      description: "Washmen's customer-facing Progressive Web App.",
      stack: "React, PWA",
      link: "https://app.washmen.com/home",
      live: true,
    },
    {
      title: "Washmen Partner PWAs (Careem, InstaShop, RIZEK)",
      description: "Partner-facing PWAs embedding Washmen's laundry service inside Careem, InstaShop, and RIZEK super-apps.",
      stack: "React, React Native, AWS microservices, event-driven architecture",
      links: {
        careem: "https://careem.washmen.com",
        instashop: "https://instashop.washmen.com",
        rizek: "https://rizek.washmen.com",
      },
      live: true,
    },
    {
      title: "Retailo B2B Marketplace (Android)",
      description: "B2B e-commerce marketplace serving small and medium retail businesses across the MENAP region. Owned and launched on the App Store, leading frontend architecture, feature development, and store submission.",
      stack: "React.js, React Native, Redux, Redux-Thunk, Redux-Saga",
      link: "https://play.google.com/store/apps/details?id=com.app.retailerapp&hl=en",
      live: true,
    },
    {
      title: "Retailo Go & Retailo Go Lite",
      description: "Internal application for Retailo delivery riders — order booking, cash collection, and delivery.",
      stack: "React Native",
      live: true,
    },
    {
      title: "Hao App (iOS & Android)",
      description: "Riyadh-based platform for creative and adventure experiences. Owned full product lifecycle from MVP to App Store and Google Play release.",
      stack: "React Native, Firebase",
      link: "https://www.haosaudi.com",
      live: true,
    },
    {
      title: "TheGestor",
      description: "Fintech billing, accounting, and taxation app for freelancers and SMEs, built as a freelance project.",
      stack: "React Native, E-commerce integrations",
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
    { name: "India", context: "visited 2015" },
    { name: "Thailand", context: "visited 2019" },
    { name: "Oman", context: "visited 2019" },
    { name: "Saudi Arabia", context: "visited 2022; Hao marketplace project in Riyadh, Retailo KSA work" },
    { name: "United Arab Emirates", context: "visited 2023; works with Washmen in Dubai, Careem/InstaShop/RIZEK integrations" },
    { name: "Bahrain", context: "visited 2023" },
    { name: "Azerbaijan", context: "visited 2025" },
  ],

  hrProfile: {
    strengths: [
      "7+ years hands-on experience shipping React Native and full-stack apps to production at scale",
      "De facto technical lead for the React Native workstream at Washmen — architecture decisions adopted across 3 product teams",
      "Currently Founding Engineer at Zizka AI — proven ability to build core product from the ground up",
      "Full-stack capability: mobile, web, APIs, AWS serverless, and databases",
      "Proven track record with large-scale platforms — Washmen apps and PWAs scaled to 1M+ active users across Careem, InstaShop, and RIZEK",
      "Recent hands-on experience integrating LLM-powered features (OpenAI, Claude, Gemini APIs, MCP) into production mobile apps",
      "Strong freelance and contract background delivering apps for international clients across B2B, ride-hailing, and fintech",
      "Agile/Scrum delivery, TDD, clear communication, and ownership from architecture to release",
      "Experience with both startups (MVPs, founding-stage builds) and enterprise-scale integrations",
    ],
    whyHire: [
      "Saad combines deep React Native expertise with full-stack backend skills — one engineer who can own mobile + API + cloud.",
      "He has already solved hard problems at scale: real-time orders, payments, PWAs inside super-apps, event-driven architecture, and microservices on AWS.",
      "He's built and led a shared design system (Atomic Design component library) across 3 product teams, cutting UI dev time ~40%.",
      "As a founding engineer at Zizka AI, he has direct experience building products from zero to production, including AI/LLM integration work.",
      "Reliable communicator who has worked remotely with UAE, KSA, and global clients for years.",
      "Delivers maintainable code and owns release quality — 99.9% crash-free rate at Washmen, 99.2% at Hao Saudi.",
    ],
    interviewTips: [
      "Ask Saad about his work as Founding Engineer at Zizka AI building ZizkaDB — demonstrates 0-to-1 product, open-source, and full-stack architecture skills.",
      "Ask about being de facto tech lead for React Native at Washmen — architecture decisions across 3 product teams, the shared Atomic Design component library, and 99.9% crash-free release ownership.",
      "Ask about the LLM integration work at Washmen (OpenAI, Claude, Gemini APIs, MCP) — demonstrates current AI-in-production experience.",
      "Ask about the ~50% re-render overhead reduction and Clean Architecture rollout at TekRevol — demonstrates performance and architecture skills.",
      "Ask about launching Retailo B2B Marketplace end-to-end and the CI/CD automation that cut release time from 2 days to under 2 hours.",
      "He is specifically targeting full-time Senior React Native Engineer roles with scope beyond feature work — architecture, performance, release quality.",
      "Currently based in Pakistan, working remotely — open to relocation for the right opportunity.",
      "Strong fit for: Senior React Native Engineer, Full-Stack Mobile, Founding/Staff Engineer, or Node.js/AWS backend roles.",
    ],
  },

  extraFacts: [
    { topic: "skills", text: "Mobile: JavaScript (ES6+), TypeScript, React Native (CLI & Expo), iOS (Xcode), Android (Android Studio), Native Modules, New Architecture, Clean Architecture, App Store & Google Play deployment." },
    { topic: "skills", text: "Frontend: React.js, Next.js, HTML5, CSS3, Responsive Design, PWAs, Styled-Components." },
    { topic: "skills", text: "State management: Redux, Redux-Saga, Redux Toolkit, Zustand, TanStack Query, Context API, React Hooks." },
    { topic: "skills", text: "Backend & Cloud: Node.js, Sails.js, REST/RESTful APIs, Microservices Architecture, AWS (Lambda, SQS, SNS, DynamoDB, Redshift), Redis." },
    { topic: "skills", text: "Testing & CI/CD: Jest, Detox, TDD, Git, GitHub Actions, GitLab, Bitrise, Fastlane, App Center, release management." },
    { topic: "skills", text: "Analytics & Monitoring: Sentry, Mixpanel, Avo, Adjust, Firebase Analytics, CloudWatch, Google Analytics, Hotjar." },
    { topic: "skills", text: "AI Integration: OpenAI, Claude, and Gemini APIs, prompt engineering, RAG, MCP, Vercel AI SDK — recently integrated LLM-powered features into production mobile apps at Washmen." },
    { topic: "skills", text: "Dev practices: Agile/Scrum, Feature-Driven Development, cross-team collaboration, code reviews, feature flags (GrowthBook), i18n (i18next, Locize)." },
    { topic: "services", text: "Services: mobile apps, full-stack web, backend architecture, performance optimization, cloud infrastructure, technical/founding leadership, LLM feature integration." },
    { topic: "process", text: "Agile/Scrum methodology, TDD, event-driven architecture, architecture planning, two-week sprints, staging builds, transparent updates." },
    { topic: "clients", text: "Clients and platforms: Zizka AI (ZizkaDB), Washmen, Careem, InstaShop, RIZEK, TekRevol, Retailo, Hao Saudi, TheGestor." },
    { topic: "boundaries", text: "Does not share exact home address, salary expectations, or sensitive financial data via this public assistant. Is happily married; does not go into further personal/family detail beyond that." },
    { topic: "goals", text: "Actively looking for a full-time Senior React Native Engineer role where he can contribute beyond feature development — driving architecture decisions, improving application performance, maintaining release quality, and collaborating closely with product and engineering teams." },
    { topic: "logistics", text: "Work authorization: currently based in Pakistan, working remotely for international companies; open to relocation if needed." },
    { topic: "logistics", text: "Employment type preference: full-time only, not seeking contract work." },
    { topic: "logistics", text: "References: available on request — happy to be contacted directly, or reach out to HR/former colleagues at Washmen, Retailo, TekRevol, or Hao Saudi to verify his work." },
    { topic: "links", text: "GitHub: https://github.com/saadamjad. LinkedIn: https://www.linkedin.com/in/saad-amjad-0b398116b/. Portfolio: https://saadstack.com." },
    { topic: "learned", text: "Q: How many live apps has Saad worked on? A: 7 live/published products, including the Washmen App (iOS) and PWA, Washmen partner PWAs for Careem/InstaShop/RIZEK, the Retailo B2B Marketplace (Android) and Retailo Go apps, and the Hao App (iOS & Android) — plus ZizkaDB, his current open-source project at Zizka AI." },
    { topic: "learned", text: "Q: What are Saad's biggest contributions? A: At Washmen: de facto React Native tech lead across 3 product teams, built the shared Atomic Design component library (~40% faster UI dev), owns 99.9% crash-free release quality, and integrated OpenAI/Claude/Gemini LLM features into the app. At TekRevol: cut app re-render overhead ~50% and introduced Clean Architecture (~40% more maintainable). At Retailo: launched the B2B marketplace end-to-end and cut CI/CD release time from 2 days to under 2 hours." },
    { topic: "learned", text: "Q: What's Saad's GitHub? A: https://github.com/saadamjad" },
    { topic: "learned", text: "Q: What's Saad's LinkedIn? A: https://www.linkedin.com/in/saad-amjad-0b398116b/" },
    { topic: "learned", text: "Q: Does Saad need visa sponsorship / is he open to relocation? A: He's currently based in Pakistan working remotely, and is open to relocating for the right role." },
    { topic: "learned", text: "Q: Is Saad open to contract work? A: No — he's specifically looking for full-time roles." },
    { topic: "learned", text: "Q: Can you provide references for Saad? A: Yes — reach out directly to Saad, or contact HR/former colleagues at Washmen, Retailo, TekRevol, or Hao Saudi to verify his work." },
    { topic: "learned", text: "Q: What is Saad doing now? A: Founding Engineer at Zizka AI (remote) since June 2026, helping build ZizkaDB — an open-source operational database designed for AI agents — architecting both frontend and backend systems." },
    { topic: "learned", text: "Q: What is ZizkaDB? A: An open-source operational database designed for AI agents, built by Zizka AI. Saad is a founding engineer working on both its frontend and backend." },
    { topic: "learned", text: "Q: What kind of role is Saad looking for? A: A full-time Senior React Native Engineer role with scope beyond feature work — architecture decisions, performance improvements, release quality, and close collaboration with product/engineering teams." },
    { topic: "learned", text: "Q: Where can I see Saad's work? A: Portfolio at https://saadstack.com, GitHub at https://github.com/saadamjad. Washmen app on the App Store, Retailo B2B Marketplace on Google Play, plus app.washmen.com, careem.washmen.com, instashop.washmen.com, rizek.washmen.com, and haosaudi.com." },
    { topic: "learned", text: "Q: Would Saad fit a fintech startup? A: Yes — he built TheGestor fintech app and multiple payment integrations, and is currently a founding engineer at an AI startup. Strong React Native + Node/AWS full-stack skills." },
    { topic: "learned", text: "Q: Can Saad work remotely? A: Yes — based in Pakistan with years of remote collaboration with UAE, KSA, and international clients. Currently Founding Engineer at Zizka AI (remote), previously Washmen Dubai (remote)." },
    { topic: "learned", text: "Q: Is Saad senior enough for a lead role? A: 7+ years experience, de facto React Native tech lead at Washmen across 3 product teams, founding engineer at Zizka AI, and led frontend architecture at TekRevol — suitable for senior/lead mobile or full-stack roles." },
    { topic: "learned", text: "Q: What's his education background? A: BS Computer Science from PAF-KIET, Karachi (Jan 2016 – Aug 2020, Grade B). Started freelancing in 2019 while completing his degree." },
    { topic: "learned", text: "Q: Has he worked in the Gulf? A: Yes — professional work in UAE (Washmen Dubai, Careem/InstaShop/RIZEK) and Saudi Arabia (Hao Riyadh, Retailo KSA)." },
  ],

  cannedResponses: {
    abuse:
      "Hey, no worries — I'm just here to talk about Saad in a helpful way. Ask me about his experience, projects, education, or how to work with him any time.",
    jailbreak:
      "Nice try! I'm just Saad's assistant, here to answer honest questions about his career, skills, and projects. What would you like to know?",
    offTopic:
      "That's a bit outside what I can help with — I'm here specifically for questions about Saad: his experience, skills, projects, travels, and how to reach him. Ask me anything along those lines!",
    unclear:
      "Sorry, I didn't quite catch that — could you rephrase? Happy to answer anything about Saad's experience, projects, skills, or how to get in touch with him.",
    unknownPersonal:
      "That's a personal detail Saad hasn't shared publicly here. I'm happy to tell you about his education, career, projects, hobbies, travels, or how to reach him though!",
    unknownBirth:
      "Saad hasn't shared his exact birth date publicly. Here's his timeline instead: started his software career in 2019, graduated in Computer Science from KIET in Aug 2020, and is now Founding Engineer at Zizka AI (since June 2026), after 2 years 11 months at Washmen Dubai.",
    greeting:
      "Hey there! I'm Saad's assistant — ask me anything about his experience, education, projects, tech stack, travels, or how to get in touch. Happy to help HR folks and interviewers too.",
    thanks:
      "Anytime! Let me know if there's anything else you'd like to know about Saad, or reach out directly if you want to chat about opportunities.",
    hrSummary:
      "Saad Amjad is a Senior React Native Engineer with 7+ years of experience building and scaling high-performance mobile applications across B2C and B2B platforms, with React Native, React, Next.js, Node.js/Sails.js, DynamoDB, and AWS. BS Computer Science, PAF-KIET, Karachi (2016–2020). Career started 2019 (freelance). Currently Founding Engineer at Zizka AI, helping build ZizkaDB, an open-source operational database for AI agents. Previously de facto React Native tech lead at Washmen Dubai (Sep 2023–Present, remote), scaling apps and PWAs used by Careem, InstaShop, and RIZEK to 1M+ active users, and before that at TekRevol, Retailo Technologies, and Hao Saudi. 7 live/published products shipped in total. Looking for a full-time Senior React Native Engineer role with scope in architecture, performance, and release quality. Based in Pakistan, open to relocation. GitHub: https://github.com/saadamjad. LinkedIn: https://www.linkedin.com/in/saad-amjad-0b398116b/. Portfolio: https://saadstack.com. Contact via WhatsApp +92 336 2065663 or saad.amjad434@gmail.com. References available on request.",
  },
};

module.exports = {
  profile: DATA.profile,
  education: DATA.education,
  careerTimeline: DATA.careerTimeline,
  projects: DATA.projects,
  liveAppsCount: DATA.liveAppsCount,
  hobbies: DATA.hobbies,
  countriesVisited: DATA.countriesVisited,
  hrProfile: DATA.hrProfile,
  extraFacts: DATA.extraFacts,
  cannedResponses: DATA.cannedResponses,
  buildPromptSections: function () {
    return builder.buildPromptSections(DATA);
  },
};
