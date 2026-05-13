import { mkdir, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { atomicWriteFile } from "@agentplaneorg/core/fs";

import { resolveAgentplaneAssetPath } from "../../../../shared/package-paths.js";
import { fileExists } from "../../../fs-utils.js";

async function listBuiltinEvaluatorFiles(): Promise<string[]> {
  const sourceDir = resolveAgentplaneAssetPath("evaluators");
  try {
    const entries = await readdir(sourceDir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map((entry) => entry.name)
      .toSorted();
  } catch (err) {
    if ((err as { code?: string } | null)?.code === "ENOENT") return [];
    throw err;
  }
}

export async function ensureEvaluatorFiles(opts: {
  gitRoot: string;
  agentplaneDir: string;
}): Promise<{ installPaths: string[] }> {
  const sourceDir = resolveAgentplaneAssetPath("evaluators");
  const targetDir = path.join(opts.agentplaneDir, "evaluators");
  const installPaths: string[] = [];
  for (const fileName of await listBuiltinEvaluatorFiles()) {
    const targetPath = path.join(targetDir, fileName);
    if (await fileExists(targetPath)) continue;
    await mkdir(path.dirname(targetPath), { recursive: true });
    await atomicWriteFile(
      targetPath,
      await readFile(path.join(sourceDir, fileName), "utf8"),
      "utf8",
    );
    installPaths.push(path.relative(opts.gitRoot, targetPath));
  }
  return { installPaths };
}
