import React from 'react';

/**
 * HeroVideo — a cinematic video panel with a poster-first upgrade path.
 *
 * The poster image renders immediately. The video file is requested only
 * after the panel scrolls near the viewport, on viewports 768px and wider,
 * and never under prefers-reduced-motion or data-saver mode. If the video
 * fails, the poster stays in place, so the hero never renders an empty box.
 */
export default function HeroVideo({
  src,
  poster,
  alt = '',
  caption = '',
  className = '',
  aspect = '16 / 10',
}) {
  const wrapRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const [live, setLive] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    const node = wrapRef.current;
    if (!node || live || failed || !src) return undefined;
    let observer;
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
      if (window.matchMedia('(max-width: 767px)').matches) return undefined;
      if (navigator.connection && navigator.connection.saveData) return undefined;
      if (!('IntersectionObserver' in window)) {
        setLive(true);
        return undefined;
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setLive(true);
              observer.disconnect();
            }
          });
        },
        { rootMargin: '400px 0px' }
      );
      observer.observe(node);
    } catch {
      return undefined;
    }
    return () => {
      if (observer) observer.disconnect();
    };
  }, [src, live, failed]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video || !live || failed) return undefined;
    let observer;
    try {
      if (!('IntersectionObserver' in window)) {
        video.play().catch(() => {});
        return undefined;
      }
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      });
      observer.observe(video);
    } catch {
      return undefined;
    }
    return () => {
      if (observer) observer.disconnect();
    };
  }, [live, failed]);

  return (
    <div
      ref={wrapRef}
      className={`hero-video${ready ? ' is-ready' : ''} ${className}`}
      style={{ aspectRatio: aspect }}
      data-reveal
    >
      <img
        src={poster}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="hero-video-poster"
      />
      {live && !failed && (
        <video
          ref={videoRef}
          className="hero-video-el"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
        />
      )}
      <div className="hero-video-shade" aria-hidden="true" />
      {caption && <p className="hero-video-caption">{caption}</p>}
    </div>
  );
}
