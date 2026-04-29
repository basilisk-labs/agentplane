import type { PromptModuleMutability, PromptModuleSlot } from "../prompt-modules/index.js";
import type { PromptFragmentListItem, PromptJsonTextFragment } from "./model.js";
import {
  generatedPromptFragmentId,
  validatePromptFragmentId,
  validatePromptFragmentMutability,
  validatePromptFragmentSlot,
} from "./validation.js";

export type NormalizePromptFragmentListOptions = {
  id_prefix: string;
  slot: PromptModuleSlot;
  source_ref?: string;
  default_mutability?: PromptModuleMutability;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizePromptFragmentListItem(
  item: PromptFragmentListItem,
  index: number,
  opts: NormalizePromptFragmentListOptions,
): PromptJsonTextFragment {
  if (typeof item === "string") {
    return {
      id: generatedPromptFragmentId(opts.id_prefix, index),
      id_source: "generated",
      slot: opts.slot,
      text: item,
      mutability: opts.default_mutability ?? "replaceable",
      source: {
        kind: "json_string_compat",
        source_ref: opts.source_ref,
        index,
      },
    };
  }

  return {
    id: validatePromptFragmentId(item.id, `fragment list item ${index}.id`),
    id_source: "declared",
    slot: validatePromptFragmentSlot(item.slot ?? opts.slot, `fragment list item ${index}.slot`),
    text: item.text,
    mutability: validatePromptFragmentMutability(
      item.mutability ?? opts.default_mutability ?? "replaceable",
      `fragment list item ${index}.mutability`,
    ),
    source: {
      kind: "json_object",
      source_ref: opts.source_ref,
      index,
    },
  };
}

export function normalizePromptFragmentList(
  items: unknown,
  opts: NormalizePromptFragmentListOptions,
): PromptJsonTextFragment[] {
  if (!Array.isArray(items)) {
    throw new Error("Invalid prompt fragment list: expected array");
  }

  const fragments = items.map((item, index) => {
    if (typeof item === "string") {
      return normalizePromptFragmentListItem(item, index, opts);
    }
    if (!isRecord(item)) {
      throw new Error(`Invalid prompt fragment list item ${index}: expected string | object`);
    }
    if (typeof item.text !== "string" || !item.text.trim()) {
      throw new Error(`Invalid prompt fragment list item ${index}.text: expected non-empty string`);
    }
    return normalizePromptFragmentListItem(item as PromptFragmentListItem, index, opts);
  });

  const ids = new Set<string>();
  for (const fragment of fragments) {
    if (ids.has(fragment.id)) {
      throw new Error(`Duplicate prompt fragment id "${fragment.id}"`);
    }
    ids.add(fragment.id);
  }
  return fragments;
}
