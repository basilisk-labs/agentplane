import { ensureRuntimeGitignore } from "../../../../runtime/shared/runtime-gitignore.js";

export async function ensureInitGitignore(opts: {
  gitRoot: string;
  includeAgentPromptFiles: boolean;
}): Promise<void> {
  await ensureRuntimeGitignore({
    gitRoot: opts.gitRoot,
    includeAgentPromptFiles: opts.includeAgentPromptFiles,
  });
}
