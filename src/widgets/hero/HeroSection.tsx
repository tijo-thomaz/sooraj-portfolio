import { useConfigStore } from "@shared/config/store";
import { Button } from "@ui/button";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animations";

export const HeroSection = () => {
  const { config } = useConfigStore();
  const { meta, hero } = config;

  return (
    <motion.section 
      className="flex flex-col gap-6 pt-12 pb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-2">
        <motion.p 
          variants={itemVariants}
          className="text-xs uppercase tracking-[0.25em] text-primary/80 font-medium"
        >
          {meta.location} • {meta.role}
        </motion.p>

        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
        >
          {meta.name}
        </motion.h1>
      </div>

      <div className="space-y-6 max-w-3xl">
        <motion.p 
          variants={itemVariants}
          className="text-xl sm:text-2xl text-muted-foreground font-light leading-relaxed"
        >
          {meta.headline}
        </motion.p>

        <motion.p 
          variants={itemVariants}
          className="text-base sm:text-lg text-muted-foreground/80 leading-relaxed border-l-2 border-primary/20 pl-4"
        >
          {meta.shortIntro}
        </motion.p>
        
        <motion.p 
          variants={itemVariants}
          className="text-sm sm:text-base text-muted-foreground/60"
        >
           {hero.primaryMessage}
        </motion.p>
      </div>

      <motion.div 
        variants={itemVariants}
        className="flex flex-wrap gap-4 pt-4"
      >
        <Button asChild size="lg" className="h-12 px-8 text-base">
          <a href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</a>
        </Button>

        <Button variant="outline" asChild size="lg" className="h-12 px-8 text-base">
          <a href={hero.ctaSecondary.href}>{hero.ctaSecondary.label}</a>
        </Button>
      </motion.div>
    </motion.section>
  );
};
