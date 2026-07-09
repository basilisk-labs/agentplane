import { mkdir, mkdtemp, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { fileExists, toPosix } from "./context-utils.js";

export type ExtractionArtifact = {
  path: string;
  content: string;
  format: "json" | "jsonl";
};

type StagedArtifact = ExtractionArtifact & {
  relativePath: string;
  stagedPath: string;
  backupPath: string;
  hadOriginal: boolean;
};

/** Internal fault-injection seam used by transaction tests. */
export type ExtractionTransactionHooks = {
  afterStageValidation?: (artifacts: readonly StagedArtifact[]) => void | Promise<void>;
  beforePromote?: (artifact: StagedArtifact, index: number) => void | Promise<void>;
  afterPromote?: (artifact: StagedArtifact, index: number) => void | Promise<void>;
};

function assertDerivedArtifactPath(root: string, filePath: string): string {
  const relativePath = toPosix(path.relative(root, filePath));
  if (
    relativePath.startsWith("../") ||
    relativePath === ".." ||
    !relativePath.startsWith(".agentplane/context/derived/")
  ) {
    throw new Error(`Context extraction transaction path is outside derived context: ${filePath}`);
  }
  return relativePath;
}

function validateArtifactContent(artifact: ExtractionArtifact, content: string): void {
  if (artifact.format === "json") {
    const parsed = JSON.parse(content) as unknown;
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error(`Staged context JSON must contain an object: ${artifact.path}`);
    }
    return;
  }

  const ids = new Set<string>();
  for (const [index, line] of content.split("\n").entries()) {
    if (!line.trim()) continue;
    const parsed = JSON.parse(line) as unknown;
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error(
        `Staged context JSONL row must contain an object: ${artifact.path}:${index + 1}`,
      );
    }
    const id = (parsed as { id?: unknown }).id;
    if (typeof id !== "string" || !id.trim()) {
      throw new Error(`Staged context JSONL row must contain an id: ${artifact.path}:${index + 1}`);
    }
    if (ids.has(id)) {
      throw new Error(`Staged context JSONL contains duplicate id ${id}: ${artifact.path}`);
    }
    ids.add(id);
  }
}

async function currentText(filePath: string): Promise<string | null> {
  return (await fileExists(filePath)) ? await readFile(filePath, "utf8") : null;
}

export async function commitExtractionArtifacts(opts: {
  root: string;
  artifacts: ExtractionArtifact[];
  dryRun?: boolean;
  hooks?: ExtractionTransactionHooks;
}): Promise<string[]> {
  const seenPaths = new Set<string>();
  const changed: (ExtractionArtifact & { relativePath: string; hadOriginal: boolean })[] = [];

  for (const artifact of opts.artifacts) {
    const relativePath = assertDerivedArtifactPath(opts.root, artifact.path);
    if (seenPaths.has(relativePath)) {
      throw new Error(`Duplicate context extraction transaction path: ${relativePath}`);
    }
    seenPaths.add(relativePath);
    const current = await currentText(artifact.path);
    if (current === artifact.content || (current === null && artifact.content === "")) continue;
    changed.push({ ...artifact, relativePath, hadOriginal: current !== null });
  }

  const changedPaths = changed.map((artifact) => artifact.relativePath).toSorted();
  if (opts.dryRun === true || changed.length === 0) return changedPaths;

  const transactionParent = path.join(opts.root, ".agentplane/context");
  await mkdir(transactionParent, { recursive: true });
  const transactionRoot = await mkdtemp(path.join(transactionParent, ".extraction-transaction-"));
  const stagedArtifacts: StagedArtifact[] = changed.map((artifact) => ({
    ...artifact,
    stagedPath: path.join(transactionRoot, "stage", artifact.relativePath),
    backupPath: path.join(transactionRoot, "backup", artifact.relativePath),
  }));
  const backups: StagedArtifact[] = [];
  const promoted: StagedArtifact[] = [];
  let preserveTransaction = false;

  try {
    for (const artifact of stagedArtifacts) {
      await mkdir(path.dirname(artifact.stagedPath), { recursive: true });
      await writeFile(artifact.stagedPath, artifact.content, "utf8");
    }
    for (const artifact of stagedArtifacts) {
      validateArtifactContent(artifact, await readFile(artifact.stagedPath, "utf8"));
    }
    await opts.hooks?.afterStageValidation?.(stagedArtifacts);

    for (const artifact of stagedArtifacts) {
      await mkdir(path.dirname(artifact.path), { recursive: true });
      if (!artifact.hadOriginal) continue;
      await mkdir(path.dirname(artifact.backupPath), { recursive: true });
      await rename(artifact.path, artifact.backupPath);
      backups.push(artifact);
    }

    for (const [index, artifact] of stagedArtifacts.entries()) {
      await opts.hooks?.beforePromote?.(artifact, index);
      await rename(artifact.stagedPath, artifact.path);
      promoted.push(artifact);
      await opts.hooks?.afterPromote?.(artifact, index);
    }

    for (const artifact of stagedArtifacts) {
      validateArtifactContent(artifact, await readFile(artifact.path, "utf8"));
    }
    return changedPaths;
  } catch (error) {
    const rollbackErrors: unknown[] = [];
    for (const artifact of promoted.toReversed()) {
      await rm(artifact.path, { force: true }).catch((rollbackError: unknown) => {
        rollbackErrors.push(rollbackError);
      });
    }
    for (const artifact of backups.toReversed()) {
      await mkdir(path.dirname(artifact.path), { recursive: true });
      await rename(artifact.backupPath, artifact.path).catch((rollbackError: unknown) => {
        rollbackErrors.push(rollbackError);
      });
    }
    if (rollbackErrors.length > 0) {
      preserveTransaction = true;
      throw new AggregateError(
        [error, ...rollbackErrors],
        `Context extraction transaction failed and rollback is incomplete; recovery data remains at ${transactionRoot}`,
      );
    }
    throw error;
  } finally {
    if (!preserveTransaction) await rm(transactionRoot, { recursive: true, force: true });
  }
}
