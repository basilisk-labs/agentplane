import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import { atomicWriteFile } from "@agentplaneorg/core";

import type { WorkflowMode } from "../../../../agents/agents-template.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
  loadPolicyTemplates,
} from "../../../../agents/agents-template.js";
import { fileExists } from "../../../fs-utils.js";
import {
  policyGatewayFileName,
  renderPolicyGatewayTemplateText,
  type PolicyGatewayFlavor,
} from "../../../../shared/policy-gateway.js";

function toUpgradeBaselineKey(repoRelativePath: string): string | null {
  if (repoRelativePath === "AGENTS.md") return "AGENTS.md";
  if (repoRelativePath === "CLAUDE.md") return "CLAUDE.md";
  if (repoRelativePath.startsWith(".agentplane/")) {
    return repoRelativePath.slice(".agentplane/".length);
  }
  return null;
}

async function seedUpgradeBaselineForInstalledFiles(opts: {
  gitRoot: string;
  agentplaneDir: string;
  repoRelativePaths: string[];
}): Promise<void> {
  const baselineDir = path.join(opts.agentplaneDir, ".upgrade", "baseline");
  for (const relPath of opts.repoRelativePaths) {
    const normalizedRel = relPath.replaceAll("\\", "/");
    const baselineKey = toUpgradeBaselineKey(normalizedRel);
    if (!baselineKey) continue;
    const srcPath = path.join(opts.gitRoot, normalizedRel);
    const contents = await readFile(srcPath);
    const baselinePath = path.join(baselineDir, baselineKey);
    await mkdir(path.dirname(baselinePath), { recursive: true });
    await atomicWriteFile(baselinePath, contents);
  }
}

export async function ensureAgentsFiles(opts: {
  gitRoot: string;
  agentplaneDir: string;
  workflow: WorkflowMode;
  policyGateway: PolicyGatewayFlavor;
  configPathAbs: string;
  backendPathAbs: string;
}): Promise<{ installPaths: string[] }> {
  const gatewayFileName = policyGatewayFileName(opts.policyGateway);
  const renderGatewayText = (text: string): string =>
    renderPolicyGatewayTemplateText(text, gatewayFileName);
  const agentsPath = path.join(opts.gitRoot, gatewayFileName);
  const installPaths: string[] = [
    path.relative(opts.gitRoot, opts.configPathAbs),
    path.relative(opts.gitRoot, opts.backendPathAbs),
  ];
  const installedManagedPaths: string[] = [];

  let wroteAgents = false;
  if (await fileExists(agentsPath)) {
    // nothing
  } else {
    const template = await loadAgentsTemplate();
    const filtered = filterAgentsByWorkflow(renderGatewayText(template), opts.workflow);
    await atomicWriteFile(agentsPath, filtered, "utf8");
    wroteAgents = true;
  }
  if (wroteAgents) {
    installPaths.push(path.relative(opts.gitRoot, agentsPath));
    installedManagedPaths.push(gatewayFileName);
  }

  const agentTemplates = await loadAgentTemplates();
  for (const agent of agentTemplates) {
    const targetPath = path.join(opts.agentplaneDir, "agents", agent.fileName);
    if (await fileExists(targetPath)) continue;
    await atomicWriteFile(targetPath, renderGatewayText(agent.contents), "utf8");
    const relPath = path.relative(opts.gitRoot, targetPath);
    installPaths.push(relPath);
    installedManagedPaths.push(relPath);
  }

  const policyTemplates = await loadPolicyTemplates();
  for (const policy of policyTemplates) {
    const targetPath = path.join(opts.agentplaneDir, "policy", policy.relativePath);
    if (await fileExists(targetPath)) continue;
    const rendered = policy.relativePath.endsWith(".md")
      ? renderGatewayText(policy.contents)
      : policy.contents;
    await mkdir(path.dirname(targetPath), { recursive: true });
    await atomicWriteFile(targetPath, rendered, "utf8");
    const relPath = path.relative(opts.gitRoot, targetPath);
    installPaths.push(relPath);
    installedManagedPaths.push(relPath);
  }

  await seedUpgradeBaselineForInstalledFiles({
    gitRoot: opts.gitRoot,
    agentplaneDir: opts.agentplaneDir,
    repoRelativePaths: installedManagedPaths,
  });

  return { installPaths };
}
