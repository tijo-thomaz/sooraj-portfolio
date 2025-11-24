import { useConfigStore } from "@shared/config/store";
import { Card } from "@ui/card";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animations";

export const SkillsSection = () => {
  const { config } = useConfigStore();
  const { skills } = config;

  return (
    <motion.section 
      id="skills" 
      className="space-y-6 py-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.h2 
        variants={itemVariants}
        className="text-2xl sm:text-3xl font-bold tracking-tight"
      >
        Technical Arsenal
      </motion.h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.categories.map((cat) => (
          <motion.div key={cat.label} variants={itemVariants}>
            <Card 
              className="group relative h-full overflow-hidden border-primary/10 bg-slate-900/40 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300"
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
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
