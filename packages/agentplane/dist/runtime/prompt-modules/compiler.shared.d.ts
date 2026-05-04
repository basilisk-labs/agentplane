import type { PromptModule, PromptModuleGraphNode } from "./model.js";
export type WorkingPromptModuleNode = PromptModuleGraphNode & {
    sequence: number;
    disabled?: boolean;
};
export declare function uniqueStrings(values: Iterable<string>): string[];
export declare function moduleAddress(module: PromptModule): string;
export declare function copyModule(module: PromptModule): PromptModule;
export declare function precedenceOf(module: PromptModule): number;
export declare function sortedByPrecedence(nodes: readonly WorkingPromptModuleNode[]): WorkingPromptModuleNode[];
export declare function cloneNode(node: WorkingPromptModuleNode): WorkingPromptModuleNode;
//# sourceMappingURL=compiler.shared.d.ts.map