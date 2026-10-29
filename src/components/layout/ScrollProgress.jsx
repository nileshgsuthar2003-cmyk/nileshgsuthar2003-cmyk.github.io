import { useState, useEffect } from 'react';

/**
 * ScrollProgress
 * Renders a subtle, GPU-accelerated progress bar at the top of the viewport
 * to track reading progress across long-form portfolio sections.
 */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId = null;

    const updateProgress = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        const totalScrollable = scrollHeight - clientHeight;

        if (totalScrollable > 0) {
          const currentProgress = Math.min(Math.max(scrollTop / totalScrollable, 0), 1);
          setProgress(currentProgress);
          setIsVisible(scrollTop > 20);
        } else {
          setProgress(0);
          setIsVisible(false);
        }
      });
    };

    // Initial check
    updateProgress();

    // Listen to standard scroll and resize events
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });

    // Integrate with Lenis smooth scroll if initialized
    let lenisListener = null;
    if (window.__lenis__) {
      lenisListener = () => updateProgress();
      window.__lenis__.on('scroll', lenisListener);
    } else {
      // Check again shortly in case Lenis mounted slightly later
      const timer = setTimeout(() => {
        if (window.__lenis__ && !lenisListener) {
          lenisListener = () => updateProgress();
          window.__lenis__.on('scroll', lenisListener);
        }
      }, 100);
      return () => {
        clearTimeout(timer);
        if (rafId) cancelAnimationFrame(rafId);
        window.removeEventListener('scroll', updateProgress);
        window.removeEventListener('resize', updateProgress);
        if (window.__lenis__ && lenisListener) {
          window.__lenis__.off('scroll', lenisListener);
        }
      };
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      if (window.__lenis__ && lenisListener) {
        window.__lenis__.off('scroll', lenisListener);
      }
    };
  }, []);

  return (
    <div
      className={`scroll-progress-container ${isVisible ? 'is-active' : ''}`}
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        className="scroll-progress-bar"
        style={{
          transform: `scaleX(${progress})`,
        }}
      />
    </div>
  );
}

export default ScrollProgress;
