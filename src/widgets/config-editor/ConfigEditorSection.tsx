import { useState } from "react";
import { useConfigStore } from "@shared/config/store";
import { Button } from "@ui/button";
import { Card } from "@ui/card";
import { Terminal, Save, RotateCcw, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Octokit } from "@octokit/rest";

export const ConfigEditorSection = () => {
  const { rawJson, updateFromJson, error, resetConfig, isAuthenticated, githubCreds } = useConfigStore();
  const [isOpen, setIsOpen] = useState(false);
  const [localJson, setLocalJson] = useState(rawJson);
  const [isSaving, setIsSaving] = useState(false);

  if (!isAuthenticated) return null;

  const handleSave = async () => {
    if (!githubCreds) {
        toast.error("Missing GitHub credentials");
        return;
    }

    setIsSaving(true);
    
    try {
        // 1. Validate JSON first
        const parsed = JSON.parse(localJson);
        updateFromJson(localJson); // Update local view immediately

        // 2. Initialize Octokit
        const octokit = new Octokit({ auth: githubCreds.token });

        // 3. Get current SHA of the file
        const { data: fileData } = await octokit.repos.getContent({
            owner: githubCreds.owner,
            repo: githubCreds.repo,
            path: "src/shared/config/portfolio.config.json",
            ref: githubCreds.branch,
        });

        if (!Array.isArray(fileData) && fileData.type === "file") {
            // 4. Commit updates
            await octokit.repos.createOrUpdateFileContents({
                owner: githubCreds.owner,
                repo: githubCreds.repo,
                path: "src/shared/config/portfolio.config.json",
                message: "chore: update portfolio config via web editor",
                content: btoa(JSON.stringify(parsed, null, 4)), // Base64 encode
                sha: fileData.sha,
                branch: githubCreds.branch,
            });
            
            toast.success("Configuration committed to GitHub! Deployment should start shortly.");
        } else {
             toast.error("Could not locate config file in repository.");
        }

    } catch (err: any) {
        console.error(err);
        toast.error(`Failed to save to GitHub: ${err.message}`);
    } finally {
        setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset to the default configuration?")) {
        resetConfig();
        // We need to get the default from store again, but store update is async in react flow sometimes
        // simpler to just let the store update trigger a re-render if we were subscribing, 
        // but since we have local state, we should sync it. 
        // Ideally we just pull from store, but let's just reload page or use a useEffect.
        // For now, let's just let the user see the reset.
        setTimeout(() => window.location.reload(), 100); 
    }
  };

  // Sync local state when store changes (e.g. on mount)
  if (rawJson !== localJson && !isOpen) {
      setLocalJson(rawJson);
  }

  return (
    <section className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <div className="max-w-5xl mx-auto flex flex-col items-end pointer-events-auto">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-2 shadow-lg rounded-full size-12 p-0"
          title="Edit Portfolio Configuration"
        >
          {isOpen ? <EyeOff className="size-5" /> : <Terminal className="size-5" />}
        </Button>

        {isOpen && (
          <Card className="w-full h-[500px] md:w-[600px] bg-slate-950 border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300">
            <div className="flex items-center justify-between p-3 border-b border-slate-800 bg-slate-900/50">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-slate-400" />
                <span className="text-sm font-mono text-slate-200 hidden sm:inline">portfolio.config.json</span>
                <span className="text-sm font-mono text-slate-200 sm:hidden">config.json</span>
              </div>
              <div className="flex gap-2">
                <Button 
                    variant="ghost" 
                    size="icon-sm" 
                    onClick={handleReset}
                    title="Reset to Default"
                    disabled={isSaving}
                    className="hover:bg-red-950/30 hover:text-red-400"
                >
                    <RotateCcw className="size-4" />
                </Button>
                <Button 
                    size="sm" 
                    onClick={handleSave} 
                    disabled={!!error || isSaving}
                    className="gap-2 min-w-[100px]"
                >
                  {isSaving ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Save className="size-4" />
                  )}
                  {isSaving ? "Saving..." : "Apply"}
                </Button>
              </div>
            </div>

            <div className="relative flex-1 overflow-hidden">
              <textarea
                value={localJson}
                onChange={(e) => {
                    setLocalJson(e.target.value);
                    try {
                        JSON.parse(e.target.value);
                    } catch {
                        // invalid
                    }
                }}
                className="w-full h-full resize-none bg-slate-950 p-4 font-mono text-sm text-slate-300 focus:outline-none selection:bg-primary/20"
                spellCheck={false}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-950/30 border-t border-red-900/50 text-red-400 text-xs font-mono flex items-start gap-2">
                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                <pre className="whitespace-pre-wrap break-all">{error}</pre>
              </div>
            )}
            
            <div className="p-2 bg-slate-900/50 border-t border-slate-800 text-[10px] text-slate-500 text-center hidden sm:block">
                Changes will be pushed to {githubCreds?.owner}/{githubCreds?.repo} ({githubCreds?.branch}).
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};
