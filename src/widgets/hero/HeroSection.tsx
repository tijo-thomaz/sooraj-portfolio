import { useConfigStore } from "@shared/config/store";
import { Button } from "@ui/button";

export const HeroSection = () => {
  const { config } = useConfigStore();
  const { meta, hero } = config;

  return (
    <section className="flex flex-col gap-6 pt-12 pb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.25em] text-primary/80 font-medium animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-backwards">
          {meta.location} • {meta.role}
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-backwards">
          {meta.name}
        </h1>
      </div>

      <div className="space-y-6 max-w-3xl">
        <p className="text-xl sm:text-2xl text-muted-foreground font-light leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-backwards">
          {meta.headline}
        </p>

        <p className="text-base sm:text-lg text-muted-foreground/80 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400 fill-mode-backwards border-l-2 border-primary/20 pl-4">
          {meta.shortIntro}
        </p>
        
        <p className="text-sm sm:text-base text-muted-foreground/60 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-backwards">
           {hero.primaryMessage}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-backwards">
        <Button asChild size="lg" className="h-12 px-8 text-base">
          <a href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</a>
        </Button>

        <Button variant="outline" asChild size="lg" className="h-12 px-8 text-base">
          <a href={hero.ctaSecondary.href}>{hero.ctaSecondary.label}</a>
        </Button>
      </div>
    </section>
  );
};
