// Single source of truth for the profile sections on the homepage.
// Entries with `todo: true` are hidden. Fill in the fields and delete the flag to publish.
// A section disappears automatically when it has no published entries.

export const introVideo = {
  // Paste a YouTube (watch / youtu.be / shorts) or Loom (share) URL. Empty string hides the section.
  url: 'https://www.loom.com/share/c7ea6da1f6fe495ba83d1feac63042d1',
  title: 'Meet Saad: who I am and what I build',
  duration: '3:43',
  // Optional preview image. YouTube thumbnails are derived automatically; Loom needs this.
  thumbnail: 'https://cdn.loom.com/sessions/thumbnails/c7ea6da1f6fe495ba83d1feac63042d1-65b6d295b4ffde8b.jpg',
};

export const aiProjects = [
  {
    title: 'ZizkaDB',
    status: 'Building',
    description: 'Open-source audit trail database for AI agents: tamper-evident decision logs, session replay, time-travel debugging and drift detection. I am the top contributor, working on the core API and the web dashboard.',
    techStack: ['Python', 'TypeScript', 'MCP'],
    repo: 'https://github.com/ZIZKA-AI-SL/ZizkaDB',
    demo: 'https://db.zizka.ai',
  },
  {
    title: 'LiveKit Voice Agent',
    status: 'Open source',
    description: 'Voice AI agent with a full speech-to-text, LLM and text-to-speech pipeline, turn detection and noise cancellation. Calls are tracked in ZizkaDB.',
    techStack: ['Python', 'LiveKit Agents', 'LLM'],
    repo: 'https://github.com/saadamjad/livekit-voice-agent',
    demo: '',
  },
  {
    title: 'AI Customer Support Agent',
    status: 'Open source',
    description: 'Customer-support chat agent instrumented end to end with ZizkaDB, with an inspector panel to search, replay and drift-check its decisions.',
    techStack: ['TypeScript', 'FastAPI', 'ZizkaDB'],
    repo: 'https://github.com/saadamjad/typescript-AI-agent',
    demo: '',
  },
  {
    title: "Saad's AI Assistant",
    status: 'Live',
    description: 'The agent behind the chat widget on this site. It answers questions about my experience, projects and availability from a markdown knowledge base.',
    techStack: ['Python', 'FastAPI', 'LangChain', 'LangGraph'],
    repo: 'https://github.com/saadamjad/Langchain-AI-Agent',
    demo: '',
  },
];

export const openSource = [
  {
    project: 'ZIZKA-AI-SL/ZizkaDB',
    role: 'Top contributor',
    description: 'Lead contributor (200+ commits) to an open-source audit trail database for AI agents with 120+ stars. Core API, services, database layer, tests and the web dashboard.',
    url: 'https://github.com/ZIZKA-AI-SL/ZizkaDB',
  },
  {
    todo: true,
    project: 'org/repo',
    role: 'Contributor', // Maintainer | Contributor | Author
    description: 'What you contributed (feature, fix, docs).',
    url: 'https://github.com/org/repo/pull/123',
  },
];

export const blog = {
  // Link to your profile page on Medium, Dev.to, Hashnode, etc. Powers the "View all posts" button.
  profileUrl: '',
  platform: '', // e.g. 'Medium'
  // Shown as chips in the "coming soon" panel until the first post is published.
  topics: ['AI agents', 'Agent observability', 'LLM engineering', 'Full-stack architecture', 'React Native performance'],
};

// Add new posts anywhere in this list; the site sorts them newest first and shows the latest 8.
export const blogPosts = [
  {
    todo: true,
    title: 'Post title',
    platform: 'Medium',
    date: '2026-01-01', // YYYY-MM-DD
    readTime: '6 min read',
    excerpt: 'One or two sentences about the post.',
    tags: ['AI agents'], // optional, first 3 are shown
    cover: '', // optional image URL; its host must be allowed in public/.htaccess (img-src)
    url: 'https://medium.com/@you/post',
  },
];

export const certifications = [
  {
    todo: true,
    name: 'AWS Certified Developer – Associate',
    issuer: 'Amazon Web Services',
    date: '2025',
    url: '', // credential verification link
  },
];

export const achievements = [
  {
    title: '1M+ users served',
    description: 'Shipped customer app features used by more than a million people through Careem and InstaShop integrations.',
  },
  {
    title: '99.2% crash-free sessions',
    description: 'Kept that rate for over two years on the Hao app, from MVP through App Store and Google Play release.',
  },
  {
    todo: true,
    title: 'Award / talk / hackathon',
    description: 'Short description.',
  },
];

export const published = (items) => items.filter((item) => !item.todo);

export const latestPosts = (limit) =>
  published(blogPosts)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
