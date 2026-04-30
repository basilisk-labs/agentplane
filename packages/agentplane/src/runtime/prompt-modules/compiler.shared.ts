import type { PromptModule, PromptModuleGraphNode } from "./model.js";

export type WorkingPromptModuleNode = PromptModuleGraphNode & {
  sequence: number;
  disabled?: boolean;
};

export function uniqueStrings(values: Iterable<string>): string[] {
  return [...new Set([...values].filter((value) => value.trim().length > 0))];
}

export function moduleAddress(module: PromptModule): string {
  return module.address.value;
}

export function copyModule(module: PromptModule): PromptModule {
  return structuredClone(module);
}

export function precedenceOf(module: PromptModule): number {
  return module.merge.precedence ?? 0;
}

export function sortedByPrecedence(
  nodes: readonly WorkingPromptModuleNode[],
): WorkingPromptModuleNode[] {
  return nodes.toSorted((left, right) => {
    const precedenceDiff = precedenceOf(left.module) - precedenceOf(right.module);
    if (precedenceDiff !== 0) return precedenceDiff;
    return left.sequence - right.sequence;
  });
}

export function cloneNode(node: WorkingPromptModuleNode): WorkingPromptModuleNode {
  return {
    ...node,
    module: copyModule(node.module),
    replaces: node.replaces ? [...node.replaces] : undefined,
    extends: node.extends ? [...node.extends] : undefined,
  };
}
