import { useConfigStore } from "@shared/config/store";
import { Card } from "@ui/card";
import { Github, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animations";

export const ProjectsSection = () => {
  const { config } = useConfigStore();
  const { projects } = config;

  return (
    <motion.section 
      id="projects" 
      className="space-y-8 py-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.h2 
        variants={itemVariants}
        className="text-2xl sm:text-3xl font-bold tracking-tight"
      >
        Featured Systems
      </motion.h2>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((prj) => (
          <motion.div key={prj.name} variants={itemVariants}>
            <Card 
              className="flex flex-col h-full bg-slate-900/40 border-slate-800 hover:border-slate-700 transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6 flex flex-col flex-grow space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-primary transition-colors">
                      {prj.name}
                    </h3>
                    <div className="flex gap-2 shrink-0">
                      {prj.github && (
                        <a 
                          href={prj.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white transition-colors"
                        >
                          <Github className="size-5" />
                        </a>
                      )}
                      {prj.demo && (
                        <a 
                          href={prj.demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white transition-colors"
                        >
                          <Globe className="size-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-primary/80">{prj.role}</p>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {prj.summary}
                </p>

                {prj.highlights.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-400 marker:text-slate-600">
                    {prj.highlights.map((highlight, i) => (
                      <li key={i} className="pl-1">{highlight}</li>
                    ))}
                  </ul>
                )}
                
                <div className="pt-2 mt-auto">
                   <div className="flex flex-wrap gap-2">
                    {prj.stack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
