import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { atomicWriteFile } from "@agentplaneorg/core/fs";

import type { WorkflowMode } from "../../../../agents/agents-template.js";
import { filterAgentsByWorkflow } from "../../../../agents/agents-template.js";
import {
  compilePromptModuleGraph,
  loadFrameworkPromptModuleRegistry,
} from "../../../../runtime/prompt-modules/index.js";
import type {
  PromptModule,
  PromptModuleCompiledGraph,
} from "../../../../runtime/prompt-modules/index.js";
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

type InitCompiledPolicyTemplate = {
  relativePath: string;
  contents: string;
};

type InitCompiledAgentTemplate = {
  fileName: string;
  contents: string;
};

type InitCompiledPromptAssets = {
  gateway: string;
  agentTemplates: InitCompiledAgentTemplate[];
  policyTemplates: InitCompiledPolicyTemplate[];
};

const INIT_POLICY_WORKFLOW_CONTEXTS: WorkflowMode[] = ["direct", "branch_pr"];
const AGENT_ASSET_SOURCE_REF_PREFIX = "packages/agentplane/assets/agents/";
const POLICY_ASSET_SOURCE_REF_PREFIX = "packages/agentplane/assets/policy/";

function assertPromptCompileOk(compiled: PromptModuleCompiledGraph, label: string): void {
  if (compiled.ok) return;
  const errors = compiled.diagnostics
    .filter((diagnostic) => diagnostic.severity === "error")
    .map((diagnostic) => `${diagnostic.code}: ${diagnostic.message}`);
  throw new Error(`Failed to compile ${label} prompt modules: ${errors.join("; ")}`);
}

function stringPromptModuleContent(module: PromptModule): string {
  if (typeof module.content === "string") return module.content;
  return `${JSON.stringify(module.content, null, 2)}\n`;
}

function sourceRefPath(module: PromptModule): string {
  return module.provenance.source_ref.replaceAll("\\", "/").split("#")[0] ?? "";
}

function moduleFragmentOrder(module: PromptModule): number {
  return module.provenance.fragment_index ?? 0;
}

function sortPromptModulesBySourceOrder(modules: PromptModule[]): PromptModule[] {
  return modules.toSorted((left, right) => {
    const orderDiff = moduleFragmentOrder(left) - moduleFragmentOrder(right);
    if (orderDiff !== 0) return orderDiff;
    return left.address.value.localeCompare(right.address.value);
  });
}

function assembleStringPromptModules(modules: PromptModule[]): string {
  return sortPromptModulesBySourceOrder(modules).map(stringPromptModuleContent).join("");
}

function agentFileNameFromModule(module: PromptModule): string {
  const sourceRef = sourceRefPath(module);
  if (!sourceRef.startsWith(AGENT_ASSET_SOURCE_REF_PREFIX)) {
    throw new Error(
      `Cannot derive init agent profile path from prompt module ${module.address.value}: ${module.provenance.source_ref}`,
    );
  }
  return sourceRef.slice(AGENT_ASSET_SOURCE_REF_PREFIX.length);
}

function policyRelativePathFromModule(module: PromptModule): string {
  const sourceRef = sourceRefPath(module);
  if (!sourceRef.startsWith(POLICY_ASSET_SOURCE_REF_PREFIX)) {
    throw new Error(
      `Cannot derive init policy path from prompt module ${module.address.value}: ${module.provenance.source_ref}`,
    );
  }
  return sourceRef.slice(POLICY_ASSET_SOURCE_REF_PREFIX.length);
}

async function compileInitPromptAssets(opts: {
  workflow: WorkflowMode;
  policyGateway: PolicyGatewayFlavor;
}): Promise<InitCompiledPromptAssets> {
  const gatewayFileName = policyGatewayFileName(opts.policyGateway);
  const registry = await loadFrameworkPromptModuleRegistry();
  const gatewayCompiled = compilePromptModuleGraph({
    graph: registry,
    context: {
      command: "init",
      commands: ["init"],
      policy_gateway: opts.policyGateway,
      workflow_mode: opts.workflow,
    },
  });
  assertPromptCompileOk(gatewayCompiled, "init gateway");
  const gatewayModules = gatewayCompiled.nodes
    .map((node) => node.module)
    .filter(
      (module) => module.address.surface === "gateway" && module.address.target === gatewayFileName,
    );
  if (gatewayModules.length === 0) {
    throw new Error(
      `Expected at least one compiled init gateway module for ${gatewayFileName}; got ${gatewayModules.length}.`,
    );
  }
  const gateway = filterAgentsByWorkflow(
    assembleStringPromptModules(gatewayModules),
    opts.workflow,
  );
  const agentTemplates = gatewayCompiled.nodes
    .map((node) => node.module)
    .filter(
      (module) =>
        module.address.surface === "agent_profile" &&
        module.address.target === ".agentplane/agents" &&
        module.address.slot === "identity",
    )
    .map((module) => ({
      fileName: agentFileNameFromModule(module),
      contents: renderPolicyGatewayTemplateText(stringPromptModuleContent(module), gatewayFileName),
    }))
    .toSorted((left, right) => left.fileName.localeCompare(right.fileName));

  const policiesByPath = new Map<string, string>();
  for (const workflow of INIT_POLICY_WORKFLOW_CONTEXTS) {
    const policyCompiled = compilePromptModuleGraph({
      graph: registry,
      context: {
        command: "init",
        commands: ["init"],
        policy_gateway: opts.policyGateway,
        workflow_mode: workflow,
      },
    });
    assertPromptCompileOk(policyCompiled, `init policy (${workflow})`);

    const policyModulesByPath = new Map<string, PromptModule[]>();
    for (const module of policyCompiled.nodes.map((node) => node.module)) {
      if (module.address.surface !== "policy") continue;
      const relativePath = policyRelativePathFromModule(module);
      policyModulesByPath.set(relativePath, [
        ...(policyModulesByPath.get(relativePath) ?? []),
        module,
      ]);
    }

    for (const [relativePath, modules] of policyModulesByPath) {
      const rawContents = assembleStringPromptModules(modules);
      const contents = relativePath.endsWith(".md")
        ? renderPolicyGatewayTemplateText(rawContents, gatewayFileName)
        : rawContents;
      const previous = policiesByPath.get(relativePath);
      if (previous !== undefined && previous !== contents) {
        throw new Error(`Conflicting compiled init policy contents for ${relativePath}.`);
      }
      policiesByPath.set(relativePath, contents);
    }
  }

  return {
    gateway,
    agentTemplates,
    policyTemplates: [...policiesByPath.entries()]
      .map(([relativePath, contents]) => ({ relativePath, contents }))
      .toSorted((left, right) => left.relativePath.localeCompare(right.relativePath)),
  };
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
  const compiledPrompts = await compileInitPromptAssets({
    workflow: opts.workflow,
    policyGateway: opts.policyGateway,
  });
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
    await atomicWriteFile(agentsPath, compiledPrompts.gateway, "utf8");
    wroteAgents = true;
  }
  if (wroteAgents) {
    installPaths.push(path.relative(opts.gitRoot, agentsPath));
    installedManagedPaths.push(gatewayFileName);
  }

  for (const agent of compiledPrompts.agentTemplates) {
    const targetPath = path.join(opts.agentplaneDir, "agents", agent.fileName);
    if (await fileExists(targetPath)) continue;
    await atomicWriteFile(targetPath, agent.contents, "utf8");
    const relPath = path.relative(opts.gitRoot, targetPath);
    installPaths.push(relPath);
    installedManagedPaths.push(relPath);
  }

  for (const policy of compiledPrompts.policyTemplates) {
    const targetPath = path.join(opts.agentplaneDir, "policy", policy.relativePath);
    if (await fileExists(targetPath)) continue;
    await mkdir(path.dirname(targetPath), { recursive: true });
    await atomicWriteFile(targetPath, policy.contents, "utf8");
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
