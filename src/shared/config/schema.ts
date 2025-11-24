import { z } from "zod";

export const skillCategorySchema = z.object({
    label: z.string(),
    items: z.array(z.string()),
});

export const experienceItemSchema = z.object({
    company: z.string(),
    title: z.string(),
    location: z.string(),
    from: z.string(), // YYYY-MM
    to: z.string(),   // YYYY-MM or "Present"
    bullets: z.array(z.string()),
});

export const projectItemSchema = z.object({
    name: z.string(),
    role: z.string(),
    stack: z.array(z.string()),
    summary: z.string(),
    highlights: z.array(z.string()),
    github: z.string().url().nullable().optional(),
    demo: z.string().url().nullable().optional(),
});

export const portfolioConfigSchema = z.object({
    meta: z.object({
        name: z.string(),
        role: z.string(),
        headline: z.string(),
        location: z.string(),
        shortIntro: z.string(),
        profileImage: z.string().optional(),
        linkedin: z.string().url(),
        email: z.string().email(),
    }),
    hero: z.object({
        primaryMessage: z.string(),
        secondaryMessage: z.string(),
        ctaPrimary: z.object({ label: z.string(), href: z.string() }),
        ctaSecondary: z.object({ label: z.string(), href: z.string() }),
    }),
    skills: z.object({
        categories: z.array(skillCategorySchema),
    }),
    experience: z.array(experienceItemSchema),
    projects: z.array(projectItemSchema),
    education: z.array(
        z.object({
            degree: z.string(),
            institution: z.string(),
            from: z.string(),
            to: z.string(),
        })
    ),
    contact: z.object({
        showForm: z.boolean(),
        emailTo: z.string().email(),
    }),
});

export type PortfolioConfig = z.infer<typeof portfolioConfigSchema>;
