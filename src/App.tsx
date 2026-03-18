import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AssessmentSection } from './components/AssessmentSection';
import { SimulatorSection } from './components/SimulatorSection';
import { UniversitySystem } from './components/UniversitySystem';
import { Majors } from './components/Majors';
import { Timeline } from './components/Timeline';
import { SuccessStories } from './components/SuccessStories';
import { Experts } from './components/Experts';
import { Contact } from './components/Contact';
import { FloatingConsultation } from './components/FloatingConsultation';

export default function App() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-jicai-black min-h-screen text-white font-sans selection:bg-jicai-blue selection:text-white">
      <Navbar scrollToSection={scrollToSection} />
      <Hero scrollToAssessment={() => scrollToSection('assessment')} />
      <AssessmentSection />
      <SimulatorSection />
      <UniversitySystem />
      <Majors />
      <Timeline />
      <SuccessStories />
      <Experts />
      <Contact />
      <FloatingConsultation />
    </div>
  );
}
