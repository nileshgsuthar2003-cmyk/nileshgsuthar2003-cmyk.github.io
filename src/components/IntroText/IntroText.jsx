import { useRef, useEffect } from 'react';

const originalText = "Results-driven Data Analyst with a strong foundation in transforming complex datasets into actionable business insights. Proficient in robust data manipulation, visualization, and reporting using SQL and Python (Pandas). Experienced in automating data extraction pipelines to enhance analytical capabilities and support strategic decision-making.";
const words = originalText.split(' ');

function IntroText() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    let containerTop = 0;
    let containerHeight = 0;
    let windowHeight = window.innerHeight;

    function cacheDimensions() {
      windowHeight = window.innerHeight;
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        containerTop = rect.top + window.scrollY;
        containerHeight = rect.height;
      }
    }

    cacheDimensions();
    window.addEventListener('resize', cacheDimensions, { passive: true });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const stickyDistance = containerHeight - windowHeight;
      const scrolledInside = scrollY - containerTop;
      
      // Calculate smooth reveal progress as the user scrolls through the sticky section
      let progress = stickyDistance > 0 ? scrolledInside / stickyDistance : 0;
      progress = Math.max(0, Math.min(1, progress));

      const charElements = textRef.current?.querySelectorAll('.intro-char');
      if (charElements) {
        const totalChars = charElements.length;
        // Characters illuminate steadily from start to finish of sticky scroll
        const activeLimit = Math.floor(progress * totalChars);

        charElements.forEach((char, idx) => {
          if (idx < activeLimit) {
            char.classList.add('active');
          } else {
            char.classList.remove('active');
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', cacheDimensions);
    };
  }, []);

  return (
    <div className="sticky-intro-container" ref={containerRef} id="introContainer">
      <section className="sticky-intro-section">
        <p className="intro-text-paragraph" ref={textRef} id="introText">
          {words.map((word, wordIdx) => (
            <span key={wordIdx} className="intro-word">
              {word.split('').map((char, charIdx) => (
                <span key={charIdx} className="intro-char">
                  {char}
                </span>
              ))}
              {wordIdx < words.length - 1 && <span className="intro-space">&nbsp;</span>}
            </span>
          ))}
        </p>
      </section>
    </div>
  );
}

export default IntroText;
