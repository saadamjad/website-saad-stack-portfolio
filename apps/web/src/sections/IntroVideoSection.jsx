import React, { useState } from 'react';
import { Play } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading.jsx';
import { introVideo } from '@/data/profile';
import { trackEvent } from '@/lib/analytics';

export const getEmbed = (url) => {
  if (!url) return null;
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) {
    return {
      src: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0`,
      thumbnail: `https://i.ytimg.com/vi/${yt[1]}/hqdefault.jpg`,
    };
  }
  const loom = url.match(/loom\.com\/(?:share|embed)\/([\w-]+)/);
  if (loom) {
    return { src: `https://www.loom.com/embed/${loom[1]}?autoplay=1`, thumbnail: null };
  }
  return null;
};

const IntroVideoSection = () => {
  const [playing, setPlaying] = useState(false);
  const embed = getEmbed(introVideo.url);
  if (!embed) return null;

  const play = () => {
    setPlaying(true);
    trackEvent('intro_video_play');
  };

  return (
    <section id="intro" className="py-24 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Say" accent="hello" subtitle={introVideo.title} />
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/50 shadow-premium-lg bg-card">
          {playing ? (
            <iframe
              src={embed.src}
              title={introVideo.title}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={play}
              aria-label={`Play video: ${introVideo.title}`}
              className="group absolute inset-0 w-full h-full flex items-center justify-center"
            >
              {embed.thumbnail ? (
                <img src={embed.thumbnail} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-smooth" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background" />
              )}
              <span className="relative flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/30 group-hover:scale-105 transition-smooth">
                <Play className="w-5 h-5 fill-current" />
                Watch intro{introVideo.duration && ` · ${introVideo.duration}`}
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default IntroVideoSection;
