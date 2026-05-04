import type { TaskData, TaskDocMeta } from "./types.js";
type ExtractTaskDoc = (body: string) => string;
type MergeTaskDoc = (body: string, doc: string) => string;
declare const extractTaskDoc: ExtractTaskDoc;
declare const mergeTaskDoc: MergeTaskDoc;
export declare function nowIso(): string;
export declare function resolveDocUpdatedByFromFrontmatter(frontmatter: Record<string, unknown>, updatedBy: string | undefined, fallback: string): string;
export declare function resolveDocUpdatedByFromTask(task: TaskData, fallback: string): string;
export declare function normalizeDocVersion(value: unknown, fallback?: 2 | 3): 2 | 3;
export declare function ensureDocMetadata(task: TaskDocMeta & Partial<Pick<TaskData, "comments" | "owner">>, updatedBy?: string): void;
export { extractTaskDoc, mergeTaskDoc };
//# sourceMappingURL=doc.d.ts.map