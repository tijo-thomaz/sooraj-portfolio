import { useState } from "react";
import { useConfigStore } from "@shared/config/store";
import { Button } from "@ui/button";
import { Lock, Unlock, LogOut } from "lucide-react";
import { toast } from "sonner";

export const Footer = () => {
  const { config, isAuthenticated, login, logout } = useConfigStore();
  const { meta, footer } = config;
  const currentYear = new Date().getFullYear();
  
  const [showAuth, setShowAuth] = useState(false);
  const [token, setToken] = useState("");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [branch, setBranch] = useState("main");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !owner || !repo) {
      toast.error("All fields are required");
      return;
    }
    login(token, owner, repo, branch);
    toast.success("Admin credentials stored for session");
    setShowAuth(false);
    setToken("");
  };

  const handleLogout = () => {
      logout();
      toast.info("Admin session ended");
  }

  // Fallback if footer config is missing (backward compatibility)
  const footerData = footer || {
      copyright: meta.name,
      tagline: "Built with React, Tailwind, and .NET Zen.",
      links: [
          { label: "LinkedIn", href: meta.linkedin },
          { label: "Email", href: `mailto:${meta.email}` }
      ]
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-8 mt-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-slate-400 text-sm text-center md:text-left">
          <p>© {currentYear} {footerData.copyright}. All rights reserved.</p>
          <p className="text-slate-600 text-xs mt-1">{footerData.tagline}</p>
        </div>

        <div className="flex items-center gap-6">
           {footerData.links.map((link) => (
               <a 
                 key={link.label}
                 href={link.href} 
                 target={link.href.startsWith("mailto") ? undefined : "_blank"}
                 rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                 className="text-slate-400 hover:text-primary transition-colors text-sm"
               >
                 {link.label}
               </a>
           ))}

           {/* Admin Trigger */}
           <div className="relative">
              {!isAuthenticated ? (
                <button 
                  onClick={() => setShowAuth(!showAuth)}
                  className="text-slate-800 hover:text-slate-600 transition-colors p-1"
                  title="Admin Access"
                >
                  <Lock className="size-3" />
                </button>
              ) : (
                 <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 text-green-500/50 text-xs font-mono border border-green-900/30 bg-green-950/10 px-2 py-1 rounded select-none">
                        <Unlock className="size-3" />
                        <span>ROOT</span>
                    </div>
                    <button 
                        onClick={handleLogout} 
                        className="text-slate-700 hover:text-red-400 transition-colors"
                        title="Logout"
                    >
                        <LogOut className="size-3" />
                    </button>
                 </div>
              )}

              {/* Auth Popover */}
              {showAuth && !isAuthenticated && (
                <div className="absolute bottom-full right-0 mb-2 p-4 bg-slate-900 border border-slate-800 rounded-lg shadow-xl w-80 animate-in slide-in-from-bottom-2 fade-in z-50">
                  <form onSubmit={handleLogin} className="space-y-3">
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-400 font-mono font-semibold">GitHub Authentication</p>
                        <a href="https://github.com/settings/tokens" target="_blank" rel="noopener" className="text-[10px] text-primary hover:underline">Get Token</a>
                    </div>
                    
                    <input 
                      type="password" 
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-sm text-slate-200 focus:border-primary focus:outline-none font-mono placeholder:text-slate-700"
                      placeholder="Personal Access Token (PAT)"
                      autoFocus
                    />
                    
                    <div className="flex gap-2">
                        <input 
                        type="text" 
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                        className="w-1/2 bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-sm text-slate-200 focus:border-primary focus:outline-none font-mono placeholder:text-slate-700"
                        placeholder="Repo Owner"
                        />
                        <input 
                        type="text" 
                        value={repo}
                        onChange={(e) => setRepo(e.target.value)}
                        className="w-1/2 bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-sm text-slate-200 focus:border-primary focus:outline-none font-mono placeholder:text-slate-700"
                        placeholder="Repo Name"
                        />
                    </div>

                    <input 
                      type="text" 
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-sm text-slate-200 focus:border-primary focus:outline-none font-mono placeholder:text-slate-700"
                      placeholder="Branch (default: main)"
                    />

                    <div className="flex justify-end gap-2 pt-1">
                        <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 text-xs"
                            onClick={() => setShowAuth(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" size="sm" className="h-7 text-xs">
                            Connect
                        </Button>
                    </div>
                  </form>
                </div>
              )}
           </div>
        </div>
      </div>
    </footer>
  );
};
