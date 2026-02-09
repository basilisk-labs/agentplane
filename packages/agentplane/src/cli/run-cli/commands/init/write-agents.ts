import { lstat, symlink } from "node:fs/promises";
import path from "node:path";

import { atomicWriteFile } from "@agentplaneorg/core";

import type { WorkflowMode } from "../../../../agents/agents-template.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../../../../agents/agents-template.js";
import { fileExists } from "../../../fs-utils.js";

export async function ensureAgentsFiles(opts: {
  gitRoot: string;
  agentplaneDir: string;
  workflow: WorkflowMode;
  configPathAbs: string;
  backendPathAbs: string;
}): Promise<{ installPaths: string[] }> {
  const agentsLinkPath = path.join(opts.gitRoot, "AGENTS.md");
  const agentsManagedPath = path.join(opts.agentplaneDir, "AGENTS.md");
  const installPaths: string[] = [
    path.relative(opts.gitRoot, opts.configPathAbs),
    path.relative(opts.gitRoot, opts.backendPathAbs),
  ];

  let wroteAgents = false;
  if (await fileExists(agentsManagedPath)) {
    // nothing
  } else {
    const template = await loadAgentsTemplate();
    const filtered = filterAgentsByWorkflow(template, opts.workflow);
    await atomicWriteFile(agentsManagedPath, filtered, "utf8");
    wroteAgents = true;
  }
  if (wroteAgents) {
    installPaths.push(path.relative(opts.gitRoot, agentsManagedPath));
  }

  // The workspace-root AGENTS.md is a symlink to the managed copy under .agentplane/.
  // This keeps the root policy path stable while making upgrades deterministic.
  if (await fileExists(agentsLinkPath)) {
    try {
      const st = await lstat(agentsLinkPath);
      if (!st.isSymbolicLink()) {
        // Do not overwrite user-owned AGENTS.md in init; upgrade handles migration.
      }
    } catch {
      // ignore
    }
  } else {
    const relTarget = path.relative(opts.gitRoot, agentsManagedPath);
    await symlink(relTarget, agentsLinkPath);
    installPaths.push(path.relative(opts.gitRoot, agentsLinkPath));
  }

  const agentTemplates = await loadAgentTemplates();
  for (const agent of agentTemplates) {
    const targetPath = path.join(opts.agentplaneDir, "agents", agent.fileName);
    if (await fileExists(targetPath)) continue;
    await atomicWriteFile(targetPath, agent.contents, "utf8");
    installPaths.push(path.relative(opts.gitRoot, targetPath));
  }

  return { installPaths };
}
