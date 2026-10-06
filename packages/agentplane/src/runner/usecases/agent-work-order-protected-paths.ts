import path from "node:path";

import type { ReadOnlyExecutionContext } from "../../runtime/execution-context.js";
import type { RunnerTaskContextEnvelope } from "../context/task-context.js";
import { gitPathIsUnderPrefix } from "../../shared/git-path.js";
import { CI_PATH_PREFIXES } from "../../shared/protected-paths.js";

export function workOrderProtectedPaths(opts: {
  context: ReadOnlyExecutionContext;
  contract: RunnerTaskContextEnvelope["task"]["metadata"]["execution_contract"];
  repositoryRoot: string | null;
  writableRoots: readonly string[];
}): string[] {
  const groups = opts.context.harness.policy.protected_paths;
  const contract = opts.contract;
  const root = opts.repositoryRoot;
  const relativeRoots = root
    ? opts.writableRoots.map((entry) => path.relative(root, entry).replaceAll("\\", "/") || ".")
    : [];
  const validScope =
    Array.isArray(contract?.authority.writable_roots) &&
    Array.isArray(contract.declaration.scope_roots) &&
    relativeRoots.length > 0 &&
    relativeRoots.every(
      (entry) =>
        entry !== ".." &&
        !entry.startsWith("../") &&
        !path.isAbsolute(entry) &&
        contract?.authority.writable_roots.some((allowed) =>
          gitPathIsUnderPrefix(entry, allowed),
        ) &&
        contract.declaration.scope_roots.some((declared) => gitPathIsUnderPrefix(entry, declared)),
    );
  const canProjectCi =
    validScope &&
    Array.isArray(contract?.declaration.repository_effects) &&
    Array.isArray(contract.authority.allowed_repository_effects) &&
    Array.isArray(contract.authority.forbidden_repository_effects) &&
    contract.declaration.repository_effects.includes("ci") &&
    contract.authority.allowed_repository_effects.includes("ci") &&
    !contract.authority.forbidden_repository_effects.includes("ci");
  return [
    ...new Set(
      Object.entries(groups).flatMap(([group, prefixes]) =>
        prefixes.filter((prefix) => {
          if (
            !canProjectCi ||
            group !== "ci" ||
            !(CI_PATH_PREFIXES as readonly string[]).includes(prefix)
          )
            return true;
          const overlapping = relativeRoots.filter(
            (entry) => gitPathIsUnderPrefix(entry, prefix) || gitPathIsUnderPrefix(prefix, entry),
          );
          // Writable scope still bounds CI. Explicit .github grants include its native CI subtrees.
          return overlapping.length === 0 || overlapping.includes(".");
        }),
      ),
    ),
  ].toSorted();
}
