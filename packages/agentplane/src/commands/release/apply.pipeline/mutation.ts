import path from "node:path";

import { extractTaskSuffix } from "@agentplaneorg/core/commit";
import { loadConfig } from "@agentplaneorg/core/config";

import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv, GitContext, parseTaskIdFromBranch } from "@agentplaneorg/core/git";
import { appendDcoSignoff } from "../../guard/impl/dco.js";
import {
  cleanHookEnv,
  maybePersistExpectedCliVersion,
  maybeRefreshGeneratedReference,
  maybeUpdateBunLockfile,
  packageDependencyExists,
  replaceAgentplanePackageMetadata,
  replacePackageDependencyVersion,
  replacePackageVersionInFile,
  replaceRecipesRuntimeVersionInFile,
} from "../apply.mutation.js";
import { fileExists } from "../apply.preflight.plan.js";
import type { ReleaseCommandMutation, ReleaseCommandState } from "../apply.types.js";
import { emitReleaseLine } from "./shared.js";

export async function applyReleaseMutation(opts: {
  agentplaneDir: string;
  gitRoot: string;
  git: GitContext;
  notesPath: string;
  corePkgPath: string;
  agentplanePkgPath: string;
  recipesPkgPath: string;
  testkitPkgPath: string;
  nextTag: string;
  nextVersion: string;
  route: ReleaseCommandState["route"];
  taskBranchPrefix: string;
}): Promise<ReleaseCommandMutation> {
  let releaseCommit: { hash: string; subject: string } | null = null;
  const recipesRuntimeVersionPath = path.join(path.dirname(opts.recipesPkgPath), "src", "index.ts");
  const shouldUpdateRecipesRuntimeVersion = await fileExists(recipesRuntimeVersionPath);
  await Promise.all([
    replacePackageVersionInFile(opts.corePkgPath, opts.nextVersion),
    replacePackageVersionInFile(opts.recipesPkgPath, opts.nextVersion),
    replaceAgentplanePackageMetadata(opts.agentplanePkgPath, opts.nextVersion),
    shouldUpdateRecipesRuntimeVersion
      ? replaceRecipesRuntimeVersionInFile(recipesRuntimeVersionPath, opts.nextVersion)
      : Promise.resolve(),
  ]);
  const shouldUpdateTestkitAgentplaneDependency =
    (await fileExists(opts.testkitPkgPath)) &&
    (await packageDependencyExists(opts.testkitPkgPath, "agentplane"));
  const shouldUpdateTestkitCoreDependency =
    (await fileExists(opts.testkitPkgPath)) &&
    (await packageDependencyExists(opts.testkitPkgPath, "@agentplaneorg/core"));
  if (shouldUpdateTestkitAgentplaneDependency) {
    await replacePackageDependencyVersion(opts.testkitPkgPath, "agentplane", opts.nextVersion);
  }
  if (shouldUpdateTestkitCoreDependency) {
    await replacePackageDependencyVersion(
      opts.testkitPkgPath,
      "@agentplaneorg/core",
      opts.nextVersion,
    );
  }

  const expectedCliVersionPersisted = await maybePersistExpectedCliVersion(
    opts.agentplaneDir,
    opts.nextVersion,
  );
  await maybeUpdateBunLockfile(opts.gitRoot, fileExists);
  const generatedReferenceExists = await maybeRefreshGeneratedReference(opts.gitRoot, fileExists);

  const stagePaths = [
    "packages/core/package.json",
    "packages/agentplane/package.json",
    "packages/recipes/package.json",
    path.relative(opts.gitRoot, opts.notesPath),
  ];
  if (shouldUpdateRecipesRuntimeVersion) {
    stagePaths.push("packages/recipes/src/index.ts");
  }
  if (shouldUpdateTestkitAgentplaneDependency || shouldUpdateTestkitCoreDependency) {
    stagePaths.push("packages/testkit/package.json");
  }
  if (expectedCliVersionPersisted) {
    stagePaths.push(".agentplane/WORKFLOW.md");
  }
  if (generatedReferenceExists) {
    stagePaths.push("docs/reference/generated-reference.mdx");
  }
  if (await fileExists(path.join(opts.gitRoot, "bun.lock"))) {
    stagePaths.push("bun.lock");
  }
  await opts.git.stage(stagePaths);

  const staged = await opts.git.statusStagedPaths();
  if (staged.length === 0) {
    emitReleaseLine("No changes to commit.");
    return { releaseCommit };
  }

  const taskId =
    opts.route.kind === "release_candidate"
      ? parseTaskIdFromBranch(opts.taskBranchPrefix, opts.route.current_branch)
      : null;
  const subject = taskId
    ? `✨ ${extractTaskSuffix(taskId)} release: publish ${opts.nextTag}`
    : `✨ release: publish ${opts.nextTag}`;
  const loaded = await loadConfig(opts.agentplaneDir);
  const body = appendDcoSignoff({ config: loaded.config, body: undefined });
  await opts.git.commit({ message: subject, body, env: cleanHookEnv() });
  const { stdout: headHash } = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: opts.gitRoot,
    env: gitEnv(),
  });
  releaseCommit = { hash: String(headHash ?? "").trim(), subject };
  return { releaseCommit };
}

export async function runReleaseCommandExecute(
  state: ReleaseCommandState,
): Promise<ReleaseCommandMutation> {
  const git = new GitContext({ gitRoot: state.gitRoot });
  return await applyReleaseMutation({
    agentplaneDir: state.resolved.agentplaneDir,
    gitRoot: state.gitRoot,
    git,
    notesPath: state.notesPath,
    corePkgPath: state.corePkgPath,
    agentplanePkgPath: state.agentplanePkgPath,
    recipesPkgPath: state.recipesPkgPath,
    testkitPkgPath: state.testkitPkgPath,
    nextTag: state.plan.nextTag,
    nextVersion: state.plan.nextVersion,
    route: state.route,
    taskBranchPrefix: state.taskBranchPrefix,
  });
}
