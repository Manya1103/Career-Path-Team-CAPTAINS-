import { useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import StreamCards from "@/components/StreamCards";
import PopularRoadmaps from "@/components/PopularRoadmaps";
import FeaturedRoadmap from "@/components/FeaturedRoadmap";
import ExamSection from "@/components/ExamSection";
import Newsletter from "@/components/Newsletter";

const Home = () => {
  // Scroll to section when URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          // Add a small delay to ensure the page has fully loaded
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Initial check for hash in URL
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <StreamCards />
        <PopularRoadmaps />
        <FeaturedRoadmap />
        <ExamSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
