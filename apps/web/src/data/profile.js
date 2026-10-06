// Single source of truth for the profile sections on the homepage.
// Entries with `todo: true` are hidden. Fill in the fields and delete the flag to publish.
// A section disappears automatically when it has no published entries.

export const introVideo = {
  // Paste a YouTube (watch / youtu.be / shorts) or Loom (share) URL. Empty string hides the section.
  url: 'https://www.loom.com/share/c7ea6da1f6fe495ba83d1feac63042d1',
  title: 'Meet Saad: who I am and what I build',
  duration: '', // e.g. '2 min'
};

export const aiProjects = [
  {
    title: 'ZizkaDB',
    status: 'Building',
    description: 'Open-source operational database designed for AI agents. I am the founding engineer, building the frontend and backend systems.',
    techStack: ['TypeScript', 'Node.js', 'AI Agents'],
    repo: '', // TODO: GitHub URL
    demo: '',
  },
  {
    title: "Saad's AI Assistant",
    status: 'Live',
    description: 'LangChain agent behind the chat widget on this site. It answers questions about my experience, projects and availability.',
    techStack: ['LangChain', 'LLM', 'React'],
    repo: '',
    demo: '',
  },
  {
    todo: true,
    title: 'Agent project name',
    status: 'Research',
    description: 'What the agent does and why it matters.',
    techStack: [],
    repo: '',
    demo: '',
  },
];

export const openSource = [
  {
    todo: true,
    project: 'org/repo',
    role: 'Contributor', // Maintainer | Contributor | Author
    description: 'What you contributed (feature, fix, docs).',
    url: 'https://github.com/org/repo/pull/123',
  },
];

export const blog = {
  // Link to your profile page on Medium, Dev.to, Hashnode, etc.
  profileUrl: '',
};

export const blogPosts = [
  {
    todo: true,
    title: 'Post title',
    platform: 'Medium',
    date: '2026-01-01',
    readTime: '6 min read',
    excerpt: 'One or two sentences about the post.',
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
