import { useConfigStore } from "@shared/config/store";
import { Card } from "@ui/card";

export const SkillsSection = () => {
  const { config } = useConfigStore();
  const { skills } = config;

  return (
    <section id="skills" className="space-y-6 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-backwards">
        Technical Arsenal
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.categories.map((cat, index) => (
          <Card 
            key={cat.label} 
            className="group relative overflow-hidden border-primary/10 bg-slate-900/40 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300 animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards"
            style={{ animationDelay: `${(index + 2) * 100}ms`, animationDuration: '700ms' }}
          >
            <div className="p-5 space-y-4">
              <h3 className="text-base font-semibold text-slate-100 tracking-wide">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20 transition-colors group-hover:bg-primary/20"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
