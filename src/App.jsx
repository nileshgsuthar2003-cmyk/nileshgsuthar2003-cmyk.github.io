import useLenis from './hooks/useLenis';
import GridLines from './components/layout/GridLines';
import ScrollProgress from './components/layout/ScrollProgress';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import IntroText from './components/IntroText/IntroText';
import Experience from './components/Experience/Experience';
import Works from './components/Works/Works';
import Skills from './components/Skills/Skills';
import Education from './components/Education/Education';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/BackToTop';
import './styles/index.css';

function App() {
  useLenis();

  return (
    <>
      {/* Scroll Progress Indicator at top of viewport */}
      <ScrollProgress />

      {/* Fixed Vertical Grid Lines */}
      <GridLines />

      {/* Top Navigation Bar */}
      <Navigation />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Sticky Reveal Text Section */}
        <IntroText />

        {/* 1. Professional Experience Section */}
        <Experience />

        {/* 2. Works / Curated Projects Section */}
        <Works />

        {/* 3. Core Technical Skills Section */}
        <Skills />

        {/* 4. Education & Certifications Section */}
        <Education />
      </main>

      {/* 5. Footer / Contact Section */}
      <Footer />

      {/* Floating Back to Top Button */}
      <BackToTop />
    </>
  );
}

export default App;
