import type { PromptModuleDiagnostic } from "./compiler.js";
import {
  cloneNode,
  moduleAddress,
  precedenceOf,
  sortedByPrecedence,
  uniqueStrings,
  type WorkingPromptModuleNode,
} from "./compiler.shared.js";

function chooseHighestPrecedence(
  nodes: readonly WorkingPromptModuleNode[],
): WorkingPromptModuleNode {
  return sortedByPrecedence(nodes).at(-1)!;
}

function chooseLastWriter(nodes: readonly WorkingPromptModuleNode[]): WorkingPromptModuleNode {
  return nodes.toSorted((left, right) => left.sequence - right.sequence).at(-1)!;
}

function reportImplicitDuplicateSelection(
  diagnostics: PromptModuleDiagnostic[],
  address: string,
  group: readonly WorkingPromptModuleNode[],
  selected: WorkingPromptModuleNode,
  reason: string,
): void {
  diagnostics.push({
    severity: "warning",
    code: "implicit_duplicate_selection",
    module_address: address,
    message: `Multiple active prompt modules target ${address}; selected "${selected.module.title}" by ${reason} from ${group.length} candidates.`,
  });
}

function mergeStringContent(
  nodes: readonly WorkingPromptModuleNode[],
  direction: "append" | "prepend",
): string | null {
  if (nodes.some((node) => typeof node.module.content !== "string")) return null;
  const sorted = sortedByPrecedence(nodes);
  const ordered = direction === "append" ? sorted : sorted.toReversed();
  return ordered
    .map((node) => (typeof node.module.content === "string" ? node.module.content : ""))
    .join("");
}

function mergeObjectContent(
  nodes: readonly WorkingPromptModuleNode[],
): Record<string, unknown> | null {
  const merged: Record<string, unknown> = {};
  for (const node of sortedByPrecedence(nodes)) {
    if (!node.module.content || typeof node.module.content !== "object") return null;
    if (Array.isArray(node.module.content)) return null;
    Object.assign(merged, node.module.content);
  }
  return merged;
}

function unionByIdContent(
  nodes: readonly WorkingPromptModuleNode[],
): Record<string, unknown> | null {
  const merged: Record<string, unknown> = {};
  for (const node of sortedByPrecedence(nodes)) {
    if (!node.module.content || typeof node.module.content !== "object") return null;
    if (Array.isArray(node.module.content)) return null;
    for (const [key, value] of Object.entries(node.module.content)) {
      if (!Array.isArray(value)) {
        merged[key] = value;
        continue;
      }
      const byId = new Map<string, unknown>();
      const previous = merged[key];
      if (Array.isArray(previous)) {
        for (const item of previous) {
          const id = item && typeof item === "object" ? (item as { id?: unknown }).id : null;
          if (typeof id === "string") byId.set(id, item);
        }
      }
      for (const item of value) {
        const id = item && typeof item === "object" ? (item as { id?: unknown }).id : null;
        if (typeof id === "string") byId.set(id, item);
      }
      merged[key] = [...byId.values()];
    }
  }
  return merged;
}

export function mergeDuplicateNodes(
  nodes: readonly WorkingPromptModuleNode[],
  diagnostics: PromptModuleDiagnostic[],
): WorkingPromptModuleNode[] {
  const byAddress = new Map<string, WorkingPromptModuleNode[]>();
  for (const node of nodes) {
    const address = moduleAddress(node.module);
    byAddress.set(address, [...(byAddress.get(address) ?? []), node]);
  }

  const merged: WorkingPromptModuleNode[] = [];
  for (const [address, group] of byAddress.entries()) {
    if (group.length === 1) {
      const only = group[0];
      if (only) merged.push(cloneNode(only));
      continue;
    }

    const latest = group.at(-1);
    const first = group[0];
    if (!latest || !first) continue;
    const conflictPolicy = latest.module.merge.conflict;
    const mergeMode = latest.module.merge.mode;
    switch (conflictPolicy) {
      case "error": {
        diagnostics.push({
          severity: "error",
          code: "duplicate_module",
          module_address: address,
          message: `Multiple active prompt modules target ${address}.`,
        });
        merged.push(cloneNode(first));
        continue;
      }
      case "highest_precedence": {
        const selected = chooseHighestPrecedence(group);
        reportImplicitDuplicateSelection(
          diagnostics,
          address,
          group,
          selected,
          "highest_precedence conflict policy",
        );
        merged.push(cloneNode(selected));
        continue;
      }
      case "last_writer_wins": {
        const selected = chooseLastWriter(group);
        reportImplicitDuplicateSelection(
          diagnostics,
          address,
          group,
          selected,
          "last_writer_wins conflict policy",
        );
        merged.push(cloneNode(selected));
        continue;
      }
      case "keep_all": {
        if (mergeMode !== "replace") break;
        const selected = chooseLastWriter(group);
        reportImplicitDuplicateSelection(
          diagnostics,
          address,
          group,
          selected,
          "replace merge mode",
        );
        merged.push(cloneNode(selected));
        continue;
      }
    }

    const selected = chooseHighestPrecedence(group);
    const base = cloneNode(selected);
    switch (mergeMode) {
      case "append":
      case "prepend": {
        const content = mergeStringContent(group, mergeMode);
        if (content === null) {
          diagnostics.push({
            severity: "error",
            code: "duplicate_module",
            module_address: address,
            message: `Cannot ${mergeMode} non-string prompt module content for ${address}.`,
          });
        } else {
          base.module.content = content;
        }
        break;
      }
      case "merge_object": {
        const content = mergeObjectContent(group);
        if (content === null) {
          diagnostics.push({
            severity: "error",
            code: "duplicate_module",
            module_address: address,
            message: `Cannot merge non-object prompt module content for ${address}.`,
          });
        } else {
          base.module.content = content;
        }
        break;
      }
      case "union_by_id": {
        const content = unionByIdContent(group);
        if (content === null) {
          diagnostics.push({
            severity: "error",
            code: "duplicate_module",
            module_address: address,
            message: `Cannot union non-object prompt module content for ${address}.`,
          });
        } else {
          base.module.content = content;
        }
        break;
      }
      case "pick_one": {
        reportImplicitDuplicateSelection(
          diagnostics,
          address,
          group,
          selected,
          "pick_one merge mode",
        );
        break;
      }
    }
    base.extends = uniqueStrings(group.flatMap((node) => node.extends ?? []));
    base.replaces = uniqueStrings(group.flatMap((node) => node.replaces ?? []));
    merged.push(base);
  }

  return merged.toSorted((left, right) => {
    const precedenceDiff = precedenceOf(left.module) - precedenceOf(right.module);
    if (precedenceDiff !== 0) return precedenceDiff;
    return left.sequence - right.sequence;
  });
}
