import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { blog, latestPosts } from '@/data/profile';
import { trackEvent } from '@/lib/analytics';

const MAX_POSTS = 8;
const LINKEDIN_URL = 'https://www.linkedin.com/in/saad-amjad-0b398116b/';
const CARD = 'snap-start shrink-0 w-[85vw] sm:w-[22rem] rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:-translate-y-1 hover:shadow-premium-lg transition-smooth';

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

const PostCard = ({ post }) => (
  <a
    href={post.url}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackEvent('blog_click', { title: post.title })}
    className={`group flex flex-col overflow-hidden ${CARD}`}
  >
    <div className="relative h-40 shrink-0 overflow-hidden bg-gradient-to-br from-primary/25 via-accent/10 to-background">
      {post.cover ? (
        <img src={post.cover} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      ) : (
        <PenLine className="absolute right-5 bottom-5 w-12 h-12 text-primary/30" aria-hidden="true" />
      )}
      <span className="absolute left-4 top-4 px-2.5 py-1 rounded-full text-xs font-semibold bg-background/80 backdrop-blur-sm border border-border/50">
        {post.platform}
      </span>
    </div>
    <div className="flex flex-col flex-1 p-6">
      <div className="text-xs text-foreground/60 mb-3">
        {formatDate(post.date)}{post.readTime && ` · ${post.readTime}`}
      </div>
      <h3 className="text-lg font-bold leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-secondary/50 text-secondary-foreground">{tag}</span>
          ))}
        </div>
      )}
      <span className="inline-flex items-center gap-1.5 mt-auto pt-5 text-sm font-semibold text-primary">
        Read post <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </span>
    </div>
  </a>
);

const ComingSoon = () => {
  const followUrl = blog.profileUrl || LINKEDIN_URL;
  const followLabel = blog.profileUrl ? `Follow on ${blog.platform || 'my blog'}` : 'Follow on LinkedIn';
  return (
    <div className="max-w-3xl mx-auto text-center rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 sm:p-12">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-6">
        <PenLine className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-2xl font-bold mb-3">First posts are on the way</h3>
      <p className="text-lg text-foreground/70 mb-8">
        I&apos;m writing about what I learn building AI agents and full-stack systems in production.
      </p>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {blog.topics.map((topic) => (
          <span key={topic} className="px-3 py-1.5 rounded-full text-sm font-medium border border-primary/30 bg-primary/10 text-primary">{topic}</span>
        ))}
      </div>
      <Button asChild size="lg" className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 font-semibold">
        <a href={followUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('blog_follow_click')}>
          {followLabel} <ArrowUpRight className="w-5 h-5 ml-2" />
        </a>
      </Button>
    </div>
  );
};

const WritingSection = () => {
  const posts = latestPosts(MAX_POSTS);
  const railRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setEdges({
      start: rail.scrollLeft <= 4,
      end: rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener('resize', updateEdges);
    return () => window.removeEventListener('resize', updateEdges);
  }, [updateEdges, posts.length]);

  const scrollByCard = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.firstElementChild;
    const step = card ? card.getBoundingClientRect().width + 24 : rail.clientWidth;
    rail.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const hasPosts = posts.length > 0;
  const canScroll = !(edges.start && edges.end);
  const arrow = 'hidden md:inline-flex items-center justify-center w-11 h-11 rounded-full border border-border/60 bg-card/50 text-foreground/80 hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-border/60 disabled:hover:text-foreground/80 transition-smooth';

  return (
    <section id="writing" className="py-24 scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col gap-6 mb-12 ${hasPosts ? 'md:flex-row md:items-end md:justify-between' : 'items-center text-center'}`}>
          <div className={hasPosts ? '' : 'max-w-2xl'}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Technical <span className="text-primary">writing</span>
            </h2>
            <p className="text-xl text-foreground/70">
              Notes on building AI agents, backends and the apps people use
            </p>
          </div>
          {hasPosts && (
            <div className="flex items-center gap-3">
              {canScroll && (
                <>
                  <button type="button" onClick={() => scrollByCard(-1)} disabled={edges.start} aria-label="Previous posts" className={arrow}>
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button type="button" onClick={() => scrollByCard(1)} disabled={edges.end} aria-label="Next posts" className={arrow}>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              {blog.profileUrl && (
                <Button asChild className="h-11 px-5 border-2 border-primary bg-primary/15 text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                  <a href={blog.profileUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('blog_view_all_click')}>
                    View all posts <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>

        {hasPosts ? (
          <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
            <div
              ref={railRef}
              onScroll={updateEdges}
              role="region"
              aria-label="Blog posts"
              tabIndex={0}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 sm:px-6 lg:px-8 scroll-px-4 sm:scroll-px-6 lg:scroll-px-8 pt-2 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-2xl"
            >
              {posts.map((post) => <PostCard key={post.url} post={post} />)}
              {blog.profileUrl && (
                <a
                  href={blog.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('blog_view_all_click')}
                  className={`group flex flex-col items-center justify-center gap-4 p-6 min-h-[20rem] text-center border-dashed ${CARD}`}
                >
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                    <ArrowRight className="w-6 h-6" />
                  </span>
                  <span className="text-lg font-bold">View all posts</span>
                  <span className="text-sm text-muted-foreground">Older posts live on {blog.platform || 'my blog'}</span>
                </a>
              )}
            </div>
            <div className={`pointer-events-none absolute inset-y-0 left-0 w-8 lg:w-16 bg-gradient-to-r from-background to-transparent transition-opacity ${edges.start ? 'opacity-0' : 'opacity-100'}`} />
            <div className={`pointer-events-none absolute inset-y-0 right-0 w-8 lg:w-16 bg-gradient-to-l from-background to-transparent transition-opacity ${edges.end ? 'opacity-0' : 'opacity-100'}`} />
          </div>
        ) : (
          <ComingSoon />
        )}
      </div>
    </section>
  );
};

export default WritingSection;
