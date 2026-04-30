import type { PromptModuleMutability, PromptModuleSlot } from "../prompt-modules/model.js";

export type PromptFragmentId = string;

export type PromptFragmentIdSource = "declared" | "generated";

export type PromptFragmentSourceKind =
  | "markdown_marker"
  | "markdown_whole_file"
  | "json_object"
  | "json_keyed_object"
  | "json_string_compat";

export type PromptFragmentSource = {
  kind: PromptFragmentSourceKind;
  source_ref?: string;
  index?: number;
  key?: string;
};

export type PromptFragment = {
  id: PromptFragmentId;
  id_source: PromptFragmentIdSource;
  slot: PromptModuleSlot;
  text: string;
  mutability: PromptModuleMutability;
  source: PromptFragmentSource;
};

export type PromptMarkdownFragment = PromptFragment & {
  source: PromptFragmentSource & { kind: "markdown_marker" | "markdown_whole_file" };
};

export type PromptJsonTextFragment = PromptFragment & {
  source: PromptFragmentSource & {
    kind: "json_object" | "json_keyed_object" | "json_string_compat";
  };
};

export type PromptMarkdownTextSegment = {
  kind: "text";
  text: string;
};

export type PromptMarkdownFragmentSegment = {
  kind: "fragment";
  fragment: PromptMarkdownFragment;
};

export type PromptMarkdownSegment = PromptMarkdownTextSegment | PromptMarkdownFragmentSegment;

export type ParsedPromptMarkdownFragments = {
  source: string;
  source_ref?: string;
  fragments: PromptMarkdownFragment[];
  segments: PromptMarkdownSegment[];
  has_markers: boolean;
};

export type PromptFragmentListItem =
  | string
  | {
      id: PromptFragmentId;
      text: string;
      mutability?: PromptModuleMutability;
      slot?: PromptModuleSlot;
    };
