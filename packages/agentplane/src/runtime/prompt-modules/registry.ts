import { readFile } from "node:fs/promises";

import {
  loadAgentTemplates,
  loadPolicyGatewayMarkdownTemplate,
  loadPolicyTemplates,
  renderMarkdownPromptTemplate,
} from "../../agents/agents-template.js";
import type { ResolvedExecutionProfileRuntime } from "../execution-profile/index.js";
import { resolveAgentplaneAssetPath } from "../../shared/package-paths.js";
import type { PromptModule, PromptModuleGraph, PromptModuleLoadCondition } from "./model.js";
import {
  addressName,
  fragmentPromptModule,
  frameworkPromptModule,
  markdownSegmentPromptModules,
} from "./registry.factory.js";
import { PROMPT_MODULE_CONTRACT_SCHEMA_VERSION } from "./schema.js";

async function loadFrameworkGatewayModules(): Promise<PromptModule[]> {
  const flavors = [
    {
      flavor: "codex" as const,
      target: "AGENTS.md" as const,
      title: "Bundled Codex policy gateway template",
    },
    {
      flavor: "claude" as const,
      target: "CLAUDE.md" as const,
      title: "Bundled Claude policy gateway template",
    },
  ];

  const modules = await Promise.all(
    flavors.map(async (entry) => {
      const template = await loadPolicyGatewayMarkdownTemplate(entry.flavor);
      return markdownSegmentPromptModules({
        surface: "gateway",
        target: entry.target,
        segments: template.segments,
        title_prefix: entry.title,
        name_prefix: "gateway.agents",
        load: { policy_gateways: [entry.flavor] },
        generated_by: `policy-gateway:${entry.flavor}`,
        fallback_source_ref: "packages/agentplane/assets/AGENTS.md",
      });
    }),
  );
  return modules.flat();
}

function policyLoadCondition(relativePath: string): PromptModuleLoadCondition | undefined {
  if (relativePath === "workflow.direct.md") return { workflow_modes: ["direct"] };
  if (relativePath === "workflow.branch_pr.md") return { workflow_modes: ["branch_pr"] };
  if (relativePath === "framework.dev.md") return { repo_types: ["framework"] };
  if (relativePath === "context.must.md") return { commands: ["context"] };
  return undefined;
}

async function loadFrameworkPolicyModules(): Promise<PromptModule[]> {
  const templates = await loadPolicyTemplates();
  return templates.flatMap((template) => {
    if (template.relativePath.endsWith(".md")) {
      const namePrefix = `policy.${template.relativePath
        .replace(/\.md$/i, "")
        .replaceAll("/", ".")
        .toLowerCase()}`;
      return markdownSegmentPromptModules({
        surface: "policy",
        target: ".agentplane/policy",
        segments: template.segments,
        title_prefix: `Bundled policy module ${template.relativePath}`,
        name_prefix: namePrefix,
        load: policyLoadCondition(template.relativePath),
        fallback_source_ref: `packages/agentplane/assets/policy/${template.relativePath}`,
      });
    }

    return [
      frameworkPromptModule({
        surface: "policy",
        target: ".agentplane/policy",
        slot: "body",
        name: addressName(template.relativePath),
        title: `Bundled policy module ${template.relativePath}`,
        content_kind: template.relativePath.endsWith(".mjs") ? "command" : "markdown",
        content: template.contents,
        load: policyLoadCondition(template.relativePath),
        provenance: {
          source_kind: "framework_builtin",
          source_ref: `packages/agentplane/assets/policy/${template.relativePath}`,
        },
      }),
    ];
  });
}

async function loadFrameworkAgentProfileModules(): Promise<PromptModule[]> {
  const templates = await loadAgentTemplates();
  return templates.flatMap((template) => {
    const profileId = template.fileName.replace(/\.json$/i, "");
    const sourceRef = `packages/agentplane/assets/agents/${template.fileName}`;
    return [
      frameworkPromptModule({
        surface: "agent_profile",
        target: ".agentplane/agents",
        slot: "identity",
        name: addressName(profileId),
        title: `Bundled agent profile ${profileId}`,
        content_kind: "json",
        content: template.contents,
        provenance: {
          source_kind: "framework_builtin",
          source_ref: sourceRef,
        },
      }),
      ...template.fragments.map((fragment) =>
        fragmentPromptModule({
          surface: "agent_profile",
          target: ".agentplane/agents",
          fragment,
          title: `Bundled agent profile ${profileId}: ${fragment.id}`,
          content_kind: "text",
          fallback_source_ref: sourceRef,
        }),
      ),
    ];
  });
}

async function loadFrameworkRunnerModules(): Promise<PromptModule[]> {
  const sourceRef = "packages/agentplane/assets/RUNNER.md";
  const source = await readFile(resolveAgentplaneAssetPath("RUNNER.md"), "utf8");
  const template = renderMarkdownPromptTemplate(source, {
    source_ref: sourceRef,
    fallback_id: "runner.bundle.file.framework_runner",
  });
  return markdownSegmentPromptModules({
    surface: "runner",
    target: "runner.bundle",
    segments: template.segments,
    title_prefix: "Bundled framework runner prompt",
    name_prefix: "runner.bundle",
    fallback_source_ref: sourceRef,
  });
}

function renderExecutionProfilePromptContent(runtime: ResolvedExecutionProfileRuntime): string {
  return JSON.stringify(
    {
      profile: runtime.profile,
      reasoning_effort: runtime.reasoning_effort,
      text_verbosity: runtime.text_verbosity,
      budget: runtime.budget,
      approvals: runtime.approvals,
      stop_conditions: runtime.stop_conditions,
      handoff_conditions: runtime.handoff_conditions,
      unsafe_actions_requiring_explicit_user_ok: runtime.unsafe_actions_requiring_explicit_user_ok,
      runner: runtime.runner,
    },
    null,
    2,
  );
}

export function buildFrameworkExecutionProfilePromptModule(
  runtime: ResolvedExecutionProfileRuntime,
): PromptModule {
  return frameworkPromptModule({
    surface: "runner",
    target: "runner.bundle",
    slot: "context",
    name: "execution_profile",
    title: `Execution profile runtime (${runtime.profile})`,
    content_kind: "json",
    content: renderExecutionProfilePromptContent(runtime),
    provenance: {
      source_kind: "runtime",
      source_ref: `runtime:execution-profile:${runtime.profile}`,
      generated_by: "runner.execution_profile",
    },
  });
}

export async function loadFrameworkPromptModules(
  opts: {
    execution_profile?: ResolvedExecutionProfileRuntime;
  } = {},
): Promise<PromptModule[]> {
  const modules = [
    ...(await loadFrameworkGatewayModules()),
    ...(await loadFrameworkPolicyModules()),
    ...(await loadFrameworkAgentProfileModules()),
    ...(await loadFrameworkRunnerModules()),
  ];
  if (opts.execution_profile) {
    modules.push(buildFrameworkExecutionProfilePromptModule(opts.execution_profile));
  }
  return modules.toSorted((left, right) => left.address.value.localeCompare(right.address.value));
}

export async function loadFrameworkPromptModuleRegistry(
  opts: {
    execution_profile?: ResolvedExecutionProfileRuntime;
  } = {},
): Promise<PromptModuleGraph> {
  const modules = await loadFrameworkPromptModules(opts);
  return {
    schema_version: PROMPT_MODULE_CONTRACT_SCHEMA_VERSION,
    nodes: modules.map((module) => ({ module })),
  };
}
