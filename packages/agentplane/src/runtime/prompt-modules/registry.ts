import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

import {
  loadAgentTemplates,
  loadPolicyGatewayMarkdownTemplate,
  loadPolicyTemplates,
  renderMarkdownPromptTemplate,
} from "../../agents/agents-template.js";
import type {
  PromptFragment,
  PromptJsonTextFragment,
  PromptMarkdownFragment,
  PromptMarkdownSegment,
} from "../prompt-fragments/index.js";
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
  mutability?: PromptModule["mutability"];
  preserve_content?: boolean;
}): PromptModule {
  const content =
    typeof opts.content === "string" && !opts.preserve_content
      ? normalizeText(opts.content)
      : opts.content;
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
    mutability: opts.mutability ?? "replaceable",
    merge: opts.merge ?? DEFAULT_MERGE_POLICY,
    load: opts.load,
    provenance: {
      ...opts.provenance,
      content_hash: contentHash(content),
    },
  };
}

function fragmentSourceRef(fragment: PromptFragment, fallbackSourceRef: string): string {
  const sourceRef = fragment.source.source_ref ?? fallbackSourceRef;
  return `${sourceRef}#${fragment.id}`;
}

function fragmentPromptModule(opts: {
  surface: PromptModuleSurface;
  target: PromptModuleTarget;
  fragment: PromptMarkdownFragment | PromptJsonTextFragment;
  title: string;
  content_kind?: PromptModuleContentKind;
  load?: PromptModuleLoadCondition;
  generated_by?: string;
  fallback_source_ref: string;
  fragment_index?: number;
}): PromptModule {
  return frameworkPromptModule({
    surface: opts.surface,
    target: opts.target,
    slot: opts.fragment.slot,
    name: addressName(opts.fragment.id),
    title: opts.title,
    content_kind: opts.content_kind ?? "text",
    content: opts.fragment.text,
    mutability: opts.fragment.mutability,
    load: opts.load,
    preserve_content: true,
    provenance: {
      source_kind: "framework_builtin",
      source_ref: fragmentSourceRef(opts.fragment, opts.fallback_source_ref),
      fragment_id: opts.fragment.id,
      fragment_index: opts.fragment_index ?? opts.fragment.source.index,
      generated_by: opts.generated_by,
    },
  });
}

function textSegmentPromptModule(opts: {
  surface: PromptModuleSurface;
  target: PromptModuleTarget;
  name_prefix: string;
  text: string;
  index: number;
  title: string;
  fallback_source_ref: string;
  load?: PromptModuleLoadCondition;
  generated_by?: string;
}): PromptModule {
  return frameworkPromptModule({
    surface: opts.surface,
    target: opts.target,
    slot: "partial",
    name: addressName(`${opts.name_prefix}.partial.${opts.index}`),
    title: opts.title,
    content_kind: "markdown",
    content: opts.text,
    mutability: "locked",
    load: opts.load,
    preserve_content: true,
    provenance: {
      source_kind: "framework_builtin",
      source_ref: `${opts.fallback_source_ref}#partial.${opts.index}`,
      fragment_index: opts.index,
      generated_by: opts.generated_by,
    },
  });
}

function markdownSegmentPromptModules(opts: {
  surface: PromptModuleSurface;
  target: PromptModuleTarget;
  segments: PromptMarkdownSegment[];
  title_prefix: string;
  name_prefix: string;
  fallback_source_ref: string;
  load?: PromptModuleLoadCondition;
  generated_by?: string;
}): PromptModule[] {
  return opts.segments.flatMap((segment, index) => {
    if (segment.kind === "text") {
      if (segment.text.length === 0) return [];
      return [
        textSegmentPromptModule({
          surface: opts.surface,
          target: opts.target,
          name_prefix: opts.name_prefix,
          text: segment.text,
          index,
          title: `${opts.title_prefix}: partial ${index}`,
          fallback_source_ref: opts.fallback_source_ref,
          load: opts.load,
          generated_by: opts.generated_by,
        }),
      ];
    }

    return [
      fragmentPromptModule({
        surface: opts.surface,
        target: opts.target,
        fragment: segment.fragment,
        title: `${opts.title_prefix}: ${segment.fragment.id}`,
        content_kind: "markdown",
        load: opts.load,
        generated_by: opts.generated_by,
        fallback_source_ref: opts.fallback_source_ref,
        fragment_index: index,
      }),
    ];
  });
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
