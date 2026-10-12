import Navbar from './components/Navbar';
import TerminalHero from './components/TerminalHero';
import StatsSection from './components/StatsSection';
import ProjectsGrid from './components/ProjectsGrid';
import VdiShowcase from './components/VdiShowcase';
import RedTeamShowcase from './components/RedTeamShowcase';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-void text-slate-200">
      <Navbar />
      <main>
        <TerminalHero />
        <StatsSection />
        <ProjectsGrid />
        <VdiShowcase />
        <RedTeamShowcase />
      </main>
      <Footer />
    </div>
  );
}
