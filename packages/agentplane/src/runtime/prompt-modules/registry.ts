import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

import {
  loadAgentTemplates,
  loadPolicyGatewayTemplate,
  loadPolicyTemplates,
} from "../../agents/agents-template.js";
import { getVersion } from "../../meta/version.js";
import type { ResolvedExecutionProfileRuntime } from "../execution-profile/index.js";
import { resolveAgentplaneAssetPath } from "../../shared/package-paths.js";
import type {
  PromptModule,
  PromptModuleAddress,
  PromptModuleContentKind,
  PromptModuleGraph,
  PromptModuleLoadCondition,
  PromptModuleMergePolicy,
  PromptModuleOwner,
  PromptModuleProvenance,
  PromptModuleSlot,
  PromptModuleSurface,
  PromptModuleTarget,
} from "./model.js";
import { PROMPT_MODULE_CONTRACT_SCHEMA_VERSION } from "./model.js";

const FRAMEWORK_OWNER: PromptModuleOwner = {
  kind: "framework",
  package_name: "agentplane",
  version: getVersion(),
};

const DEFAULT_MERGE_POLICY: PromptModuleMergePolicy = {
  mode: "pick_one",
  conflict: "error",
  precedence: 100,
};

function normalizeText(text: string): string {
  const normalized = text.trimEnd();
  return normalized.endsWith("\n") ? normalized : `${normalized}\n`;
}

function contentHash(content: string | Record<string, unknown>): string {
  return createHash("sha256")
    .update(typeof content === "string" ? content : JSON.stringify(content))
    .digest("hex");
}

function addressName(value: string): string {
  return value.replaceAll(/[^A-Za-z0-9_.-]/g, "_");
}

function addressValue(opts: {
  namespace: PromptModuleAddress["namespace"];
  surface: PromptModuleSurface;
  target: PromptModuleTarget;
  slot: PromptModuleSlot;
  name: string;
}): string {
  return [
    opts.namespace,
    opts.surface,
    opts.target.replaceAll("/", "~"),
    opts.slot,
    opts.name,
  ].join("/");
}

function frameworkPromptModule(opts: {
  surface: PromptModuleSurface;
  target: PromptModuleTarget;
  slot: PromptModuleSlot;
  name: string;
  title: string;
  content_kind: PromptModuleContentKind;
  content: string | Record<string, unknown>;
  provenance: Omit<PromptModuleProvenance, "content_hash">;
  load?: PromptModuleLoadCondition;
  merge?: PromptModuleMergePolicy;
}): PromptModule {
  const content = typeof opts.content === "string" ? normalizeText(opts.content) : opts.content;
  const address = {
    value: addressValue({
      namespace: "framework",
      surface: opts.surface,
      target: opts.target,
      slot: opts.slot,
      name: opts.name,
    }),
    namespace: "framework",
    surface: opts.surface,
    target: opts.target,
    slot: opts.slot,
    name: opts.name,
  } satisfies PromptModuleAddress;

  return {
    schema_version: PROMPT_MODULE_CONTRACT_SCHEMA_VERSION,
    address,
    owner: FRAMEWORK_OWNER,
    title: opts.title,
    content_kind: opts.content_kind,
    content,
    mutability: "replaceable",
    merge: opts.merge ?? DEFAULT_MERGE_POLICY,
    load: opts.load,
    provenance: {
      ...opts.provenance,
      content_hash: contentHash(content),
    },
  };
}

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

  return await Promise.all(
    flavors.map(async (entry) =>
      frameworkPromptModule({
        surface: "gateway",
        target: entry.target,
        slot: "body",
        name: "template",
        title: entry.title,
        content_kind: "markdown",
        content: await loadPolicyGatewayTemplate(entry.flavor),
        load: { policy_gateways: [entry.flavor] },
        provenance: {
          source_kind: "framework_builtin",
          source_ref: "packages/agentplane/assets/AGENTS.md",
          generated_by: `policy-gateway:${entry.flavor}`,
        },
      }),
    ),
  );
}

function policyLoadCondition(relativePath: string): PromptModuleLoadCondition | undefined {
  if (relativePath === "workflow.direct.md") return { workflow_modes: ["direct"] };
  if (relativePath === "workflow.branch_pr.md") return { workflow_modes: ["branch_pr"] };
  return undefined;
}

async function loadFrameworkPolicyModules(): Promise<PromptModule[]> {
  const templates = await loadPolicyTemplates();
  return templates.map((template) =>
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
  );
}

async function loadFrameworkAgentProfileModules(): Promise<PromptModule[]> {
  const templates = await loadAgentTemplates();
  return templates.map((template) => {
    const profileId = template.fileName.replace(/\.json$/i, "");
    return frameworkPromptModule({
      surface: "agent_profile",
      target: ".agentplane/agents",
      slot: "identity",
      name: addressName(profileId),
      title: `Bundled agent profile ${profileId}`,
      content_kind: "json",
      content: template.contents,
      provenance: {
        source_kind: "framework_builtin",
        source_ref: `packages/agentplane/assets/agents/${template.fileName}`,
      },
    });
  });
}

async function loadFrameworkRunnerModule(): Promise<PromptModule> {
  return frameworkPromptModule({
    surface: "runner",
    target: "runner.bundle",
    slot: "body",
    name: "framework_runner",
    title: "Bundled framework runner prompt",
    content_kind: "markdown",
    content: await readFile(resolveAgentplaneAssetPath("RUNNER.md"), "utf8"),
    provenance: {
      source_kind: "framework_builtin",
      source_ref: "packages/agentplane/assets/RUNNER.md",
    },
  });
}

function renderExecutionProfilePromptContent(runtime: ResolvedExecutionProfileRuntime): string {
  return JSON.stringify(
    {
      profile: runtime.profile,
      reasoning_effort: runtime.reasoning_effort,
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
    await loadFrameworkRunnerModule(),
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
