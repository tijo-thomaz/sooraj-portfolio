import { useConfigStore } from "@shared/config/store";
import { Card } from "@ui/card";

export const ExperienceSection = () => {
  const { config } = useConfigStore();
  const { experience } = config;

  return (
    <section id="experience" className="space-y-8 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-backwards">
        Professional Journey
      </h2>
      <div className="relative border-l-2 border-slate-800 ml-3 sm:ml-4 space-y-8 sm:space-y-12">
        {experience.map((job, index) => (
          <div 
            key={`${job.company}-${job.from}`} 
            className="relative pl-6 sm:pl-8 animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards"
            style={{ animationDelay: `${(index + 2) * 150}ms`, animationDuration: '700ms' }}
          >
            {/* Timeline dot */}
            <div className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-primary ring-4 ring-slate-950" />
            
            <Card className="bg-slate-900/40 border-slate-800 p-6 sm:p-8 hover:border-slate-700 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-100">{job.title}</h3>
                  <p className="text-primary font-medium">{job.company}</p>
                </div>
                <div className="text-sm text-slate-400 font-mono shrink-0">
                  {job.from} — {job.to}
                </div>
              </div>
              
              <div className="text-sm text-slate-500 mb-4 flex items-center gap-2">
                <span className="inline-block size-1 rounded-full bg-slate-600"></span>
                {job.location}
              </div>

              <ul className="space-y-2 text-slate-300 text-sm leading-relaxed">
                {job.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 rounded-full bg-primary/50 shrink-0" />
                    <span className="flex-1">{bullet}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
