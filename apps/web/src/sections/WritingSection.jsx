import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading.jsx';
import { blog, blogPosts, published } from '@/data/profile';
import { trackEvent } from '@/lib/analytics';

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

const WritingSection = () => {
  const posts = published(blogPosts);
  if (!posts.length) return null;

  return (
    <section id="writing" className="py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Technical" accent="writing" subtitle="Notes on building mobile apps, distributed systems and AI agents" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('blog_click', { title: post.title })}
              className="group flex flex-col p-6 rounded-xl border border-border/50 bg-card/50 hover:border-primary/50 hover:-translate-y-1 transition-smooth"
            >
              <div className="text-xs text-foreground/60 mb-3">
                {post.platform} · {formatDate(post.date)}{post.readTime && ` · ${post.readTime}`}
              </div>
              <h3 className="text-lg font-bold leading-snug mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-muted-foreground leading-relaxed flex-1">{post.excerpt}</p>
              <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-primary">
                Read post <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>
          ))}
        </div>
        {blog.profileUrl && (
          <div className="text-center mt-10">
            <a href={blog.profileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
              All posts <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default WritingSection;
