import { createHash } from "node:crypto";

import type {
  PromptFragment,
  PromptJsonTextFragment,
  PromptMarkdownFragment,
  PromptMarkdownSegment,
} from "../prompt-fragments/index.js";
import { getVersion } from "../../meta/version.js";
import type {
  PromptModule,
  PromptModuleAddress,
  PromptModuleContentKind,
  PromptModuleLoadCondition,
  PromptModuleMergePolicy,
  PromptModuleOwner,
  PromptModuleProvenance,
  PromptModuleSlot,
  PromptModuleSurface,
  PromptModuleTarget,
} from "./model.js";
import { PROMPT_MODULE_CONTRACT_SCHEMA_VERSION } from "./schema.js";

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

export function addressName(value: string): string {
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

export function frameworkPromptModule(opts: {
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

export function fragmentPromptModule(opts: {
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

export function markdownSegmentPromptModules(opts: {
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
