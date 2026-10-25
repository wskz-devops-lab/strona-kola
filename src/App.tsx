import Navbar from './components/Navbar';
import TerminalHero from './components/TerminalHero';
import StatsSection from './components/StatsSection';
import OnboardingSection from './components/OnboardingSection';
import ProjectsGrid from './components/ProjectsGrid';
import VdiShowcase from './components/VdiShowcase';
import LabGallerySection from './components/LabGallerySection';
import RedTeamShowcase from './components/RedTeamShowcase';
import RecruitmentAndFaq from './components/RecruitmentAndFaq';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-void text-ink">
      <Navbar />
      <main>
        <TerminalHero />
        <StatsSection />
        <OnboardingSection />
        <ProjectsGrid />
        <VdiShowcase />
        <LabGallerySection />
        <RedTeamShowcase />
        <RecruitmentAndFaq />
      </main>
      <Footer />
    </div>
  );
}
