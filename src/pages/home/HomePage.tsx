import { HeroSection } from "@widgets/hero/HeroSection";
import { SkillsSection } from "@widgets/skills/SkillsSection";
import { ProjectsSection } from "@widgets/projects/ProjectsSection";
import { ExperienceSection } from "@widgets/experience/ExperienceSection";
import { ConfigEditorSection } from "@widgets/config-editor/ConfigEditorSection";
import { Footer } from "@widgets/footer/Footer";
import { Toaster } from "sonner";

export const HomePage = () => {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <HeroSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ConfigEditorSection />
      <Footer />
      <Toaster />
    </main>
  );
};
