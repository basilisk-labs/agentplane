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
  const agentsPath = path.join(opts.gitRoot, "AGENTS.md");
  const installPaths: string[] = [
    path.relative(opts.gitRoot, opts.configPathAbs),
    path.relative(opts.gitRoot, opts.backendPathAbs),
  ];

  let wroteAgents = false;
  if (await fileExists(agentsPath)) {
    // nothing
  } else {
    const template = await loadAgentsTemplate();
    const filtered = filterAgentsByWorkflow(template, opts.workflow);
    await atomicWriteFile(agentsPath, filtered, "utf8");
    wroteAgents = true;
  }
  if (wroteAgents) {
    installPaths.push(path.relative(opts.gitRoot, agentsPath));
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
