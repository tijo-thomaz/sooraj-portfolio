import { create } from "zustand";
import { persist } from "zustand/middleware";
import { portfolioConfigSchema, type PortfolioConfig } from "./schema";
import rawConfig from "./portfolio.config.json";

type ConfigState = {
    config: PortfolioConfig;
    rawJson: string;
    error: string | null;
    updateFromJson: (json: string) => void;
    resetConfig: () => void;
    isAuthenticated: boolean;
    githubCreds: {
        token: string;
        owner: string;
        repo: string;
        branch: string;
    } | null;
    login: (token: string, owner: string, repo: string, branch?: string) => void;
    logout: () => void;
};

export const useConfigStore = create<ConfigState>()(
    persist(
        (set) => {
            const parsed = portfolioConfigSchema.parse(rawConfig);
            const initialJson = JSON.stringify(parsed, null, 2);
            
            return {
                config: parsed,
                rawJson: initialJson,
                error: null,
                isAuthenticated: false,
                githubCreds: null,
                updateFromJson: (json: string) => {
                    try {
                        const parsedObj = JSON.parse(json);
                        const validated = portfolioConfigSchema.parse(parsedObj);
                        set({ config: validated, rawJson: json, error: null });
                    } catch (err: unknown) {
                        if (err instanceof Error) {
                            set({ error: err.message, rawJson: json });
                        } else {
                            set({ error: String(err), rawJson: json });
                        }
                    }
                },
                resetConfig: () => {
                    set({ 
                        config: parsed, 
                        rawJson: initialJson, 
                        error: null 
                    });
                },
                login: (token: string, owner: string, repo: string, branch: string = "main") => {
                    set({ 
                        isAuthenticated: true,
                        githubCreds: { token, owner, repo, branch }
                    });
                },
                logout: () => {
                    set({ 
                        isAuthenticated: false,
                        githubCreds: null
                    });
                }
            };
        },
        {
            name: "portfolio-config-storage",
            partialize: (state) => ({ 
                config: state.config, 
                rawJson: state.rawJson,
                // We generally don't persist auth state, but user can opt-in via browser autofill.
                // We explicitly exclude credentials from localStorage persistence for security.
            }), 
        }
    )
);
