import type { PromptModuleMutability, PromptModuleSlot } from "../prompt-modules/model.js";
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

const LOCAL_PROMPT_FRAGMENT_KEY_RE = /^[a-z][a-z0-9_-]*(?:\.[a-z0-9][a-z0-9_-]*)*$/;

function validatePromptFragmentKey(key: string, opts: NormalizePromptFragmentListOptions): string {
  const trimmed = key.trim();
  if (!LOCAL_PROMPT_FRAGMENT_KEY_RE.test(trimmed)) {
    throw new Error(
      `Invalid prompt fragment map key "${key}": expected lowercase local dot-case key`,
    );
  }
  if (trimmed.startsWith(`${opts.id_prefix}.`)) {
    throw new Error(
      `Invalid prompt fragment map key "${key}": expected local key, not full fragment id`,
    );
  }
  return trimmed;
}

function normalizeKeyedPromptFragment(
  key: string,
  value: unknown,
  index: number,
  opts: NormalizePromptFragmentListOptions,
): PromptJsonTextFragment {
  const localKey = validatePromptFragmentKey(key, opts);
  const id = validatePromptFragmentId(`${opts.id_prefix}.${localKey}`, `fragment map key ${key}`);
  if (typeof value === "string") {
    if (!value.trim()) {
      throw new Error(`Invalid prompt fragment map item ${key}: expected non-empty string`);
    }
    return {
      id,
      id_source: "declared",
      slot: opts.slot,
      text: value,
      mutability: opts.default_mutability ?? "replaceable",
      source: {
        kind: "json_keyed_object",
        source_ref: opts.source_ref,
        index,
        key: localKey,
      },
    };
  }
  if (!isRecord(value)) {
    throw new Error(`Invalid prompt fragment map item ${key}: expected string | object`);
  }
  if (typeof value.text !== "string" || !value.text.trim()) {
    throw new Error(`Invalid prompt fragment map item ${key}.text: expected non-empty string`);
  }
  return {
    id,
    id_source: "declared",
    slot: validatePromptFragmentSlot(value.slot ?? opts.slot, `fragment map item ${key}.slot`),
    text: value.text,
    mutability: validatePromptFragmentMutability(
      value.mutability ?? opts.default_mutability ?? "replaceable",
      `fragment map item ${key}.mutability`,
    ),
    source: {
      kind: "json_keyed_object",
      source_ref: opts.source_ref,
      index,
      key: localKey,
    },
  };
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
  const fragments = Array.isArray(items)
    ? items.map((item, index) => {
        if (typeof item === "string") {
          return normalizePromptFragmentListItem(item, index, opts);
        }
        if (!isRecord(item)) {
          throw new Error(`Invalid prompt fragment list item ${index}: expected string | object`);
        }
        if (typeof item.text !== "string" || !item.text.trim()) {
          throw new Error(
            `Invalid prompt fragment list item ${index}.text: expected non-empty string`,
          );
        }
        return normalizePromptFragmentListItem(item as PromptFragmentListItem, index, opts);
      })
    : isRecord(items)
      ? Object.entries(items).map(([key, value], index) =>
          normalizeKeyedPromptFragment(key, value, index, opts),
        )
      : null;

  if (!fragments) {
    throw new Error("Invalid prompt fragment list: expected array | object map");
  }

  const ids = new Set<string>();
  for (const fragment of fragments) {
    if (ids.has(fragment.id)) {
      throw new Error(`Duplicate prompt fragment id "${fragment.id}"`);
    }
    ids.add(fragment.id);
  }
  return fragments;
}
