import { createHash } from "node:crypto";

import { gitEnv, gitRevParse, resolveBaseBranch } from "@agentplaneorg/core/git";
import { execFileAsync, runProcess } from "@agentplaneorg/core/process";
import { canonicalizeJson } from "@agentplaneorg/core/tasks";

const VERIFICATION_CONTEXT_BASENAMES = new Set([
  ".node-version",
  ".nvmrc",
  ".tool-versions",
  "bun.lock",
  "bun.lockb",
  "bunfig.toml",
  "Cargo.lock",
  "Cargo.toml",
  "deno.json",
  "deno.jsonc",
  "go.mod",
  "go.sum",
  "mise.toml",
  "package-lock.json",
  "package.json",
  "pnpm-lock.yaml",
  "poetry.lock",
  "pyproject.toml",
  "requirements.txt",
  "tsconfig.json",
  "uv.lock",
  "yarn.lock",
]);

export type VerificationEnvironment = {
  platform: string;
  architecture: string;
  node_major: string;
  bun_major: string | null;
};

export type VerificationInputIdentity = {
  schema_version: 1;
  kind: "task_verification_input";
  implementation: {
    strategy: "branch_diff" | "tree";
    digest: `sha256:${string}`;
    target_sha: string;
    base_sha: string | null;
  };
  verify_steps_digest: `sha256:${string}`;
  context: {
    digest: `sha256:${string}`;
    paths: string[];
  };
  environment: {
    digest: `sha256:${string}`;
    runtime: VerificationEnvironment;
  };
  digest: `sha256:${string}`;
};

function sha256(value: string | Buffer): `sha256:${string}` {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function normalizeWorkflowDir(value: string): string {
  return value.replaceAll("\\", "/").replaceAll(/\/+$/gu, "");
}

function contextPath(name: string): boolean {
  if (name === ".agentplane/WORKFLOW.md") return true;
  const basename = name.slice(name.lastIndexOf("/") + 1);
  return VERIFICATION_CONTEXT_BASENAMES.has(basename);
}

function parseTreeEntries(value: Buffer): { path: string; object: string }[] {
  return value
    .toString("utf8")
    .split("\0")
    .filter(Boolean)
    .flatMap((entry) => {
      const separator = entry.indexOf("\t");
      if (separator === -1) return [];
      const header = entry.slice(0, separator).split(" ");
      const object = header[2];
      const filePath = entry.slice(separator + 1);
      return object && contextPath(filePath) ? [{ path: filePath, object }] : [];
    })
    .toSorted((left, right) => left.path.localeCompare(right.path));
}

async function verificationContext(opts: {
  gitRoot: string;
  targetSha: string;
}): Promise<VerificationInputIdentity["context"]> {
  const { stdout } = await execFileAsync("git", ["ls-tree", "-r", "-z", opts.targetSha], {
    cwd: opts.gitRoot,
    env: gitEnv(),
    encoding: "buffer",
    maxBuffer: 64 * 1024 * 1024,
  });
  const entries = parseTreeEntries(stdout);
  return {
    digest: sha256(JSON.stringify(canonicalizeJson(entries))),
    paths: entries.map((entry) => entry.path),
  };
}

async function implementationIdentity(opts: {
  gitRoot: string;
  workflowDir: string;
  taskIds: readonly string[];
  targetSha: string;
  workflowMode: "direct" | "branch_pr";
  baseRef?: string | null;
}): Promise<VerificationInputIdentity["implementation"]> {
  if (opts.workflowMode === "branch_pr") {
    const base =
      opts.baseRef ??
      (await resolveBaseBranch({
        cwd: opts.gitRoot,
        rootOverride: opts.gitRoot,
        cliBaseOpt: null,
        mode: "branch_pr",
      }).catch(() => null));
    const baseSha = base
      ? await gitRevParse(opts.gitRoot, [`${base}^{commit}`]).catch(() => null)
      : null;
    if (baseSha) {
      const { stdout: mergeBase } = await execFileAsync(
        "git",
        ["merge-base", baseSha, opts.targetSha],
        { cwd: opts.gitRoot, env: gitEnv() },
      );
      const workflowDir = normalizeWorkflowDir(opts.workflowDir);
      const exclusions = [...new Set(opts.taskIds)].map(
        (taskId) => `:(exclude)${workflowDir}/${taskId}/**`,
      );
      const { stdout } = await execFileAsync(
        "git",
        [
          "diff",
          "--binary",
          "--full-index",
          "--no-ext-diff",
          mergeBase.trim(),
          opts.targetSha,
          "--",
          ".",
          ...exclusions,
        ],
        {
          cwd: opts.gitRoot,
          env: gitEnv(),
          encoding: "buffer",
          maxBuffer: 64 * 1024 * 1024,
        },
      );
      const patchIdentity = await runProcess({
        command: "git",
        args: ["patch-id", "--stable"],
        cwd: opts.gitRoot,
        env: gitEnv(),
        input: stdout,
        maxBuffer: 64 * 1024 * 1024,
      });
      if (patchIdentity.exitCode !== 0) {
        throw new Error(`git patch-id failed: ${String(patchIdentity.stderr).trim()}`);
      }
      return {
        strategy: "branch_diff",
        digest: sha256(String(patchIdentity.stdout).trim()),
        target_sha: opts.targetSha,
        base_sha: baseSha,
      };
    }
  }

  const tree = await gitRevParse(opts.gitRoot, [`${opts.targetSha}^{tree}`]);
  return {
    strategy: "tree",
    digest: sha256(tree.trim()),
    target_sha: opts.targetSha,
    base_sha: null,
  };
}

function currentVerificationEnvironment(): VerificationEnvironment {
  return {
    platform: process.platform,
    architecture: process.arch,
    node_major: process.versions.node.split(".")[0] ?? process.versions.node,
    bun_major: process.versions.bun?.split(".")[0] ?? null,
  };
}

export function verificationInputDigest(opts: {
  implementationDigest: string;
  verifyStepsDigest: string;
  contextDigest: string;
  environmentDigest: string;
}): `sha256:${string}` {
  return sha256(
    JSON.stringify(
      canonicalizeJson({
        implementation_digest: opts.implementationDigest,
        verify_steps_digest: opts.verifyStepsDigest,
        context_digest: opts.contextDigest,
        environment_digest: opts.environmentDigest,
      }),
    ),
  );
}

export async function resolveVerificationInputIdentity(opts: {
  gitRoot: string;
  workflowDir: string;
  taskIds: readonly string[];
  targetSha: string | null;
  verifySteps: string;
  workflowMode: "direct" | "branch_pr";
  environment?: VerificationEnvironment;
  baseRef?: string | null;
}): Promise<VerificationInputIdentity | null> {
  if (!opts.targetSha || !/^[0-9a-f]{40,64}$/u.test(opts.targetSha)) return null;
  const [implementation, context] = await Promise.all([
    implementationIdentity({
      gitRoot: opts.gitRoot,
      workflowDir: opts.workflowDir,
      taskIds: opts.taskIds,
      targetSha: opts.targetSha,
      workflowMode: opts.workflowMode,
      baseRef: opts.baseRef,
    }),
    verificationContext({ gitRoot: opts.gitRoot, targetSha: opts.targetSha }),
  ]);
  const runtime = opts.environment ?? currentVerificationEnvironment();
  const environment = {
    digest: sha256(JSON.stringify(canonicalizeJson(runtime))),
    runtime,
  };
  const verifyStepsDigest = sha256(opts.verifySteps.trim());
  const digest = verificationInputDigest({
    implementationDigest: implementation.digest,
    verifyStepsDigest,
    contextDigest: context.digest,
    environmentDigest: environment.digest,
  });
  return {
    schema_version: 1,
    kind: "task_verification_input",
    implementation,
    verify_steps_digest: verifyStepsDigest,
    context,
    environment,
    digest,
  };
}

export function verificationInputInvalidationReason(opts: {
  recorded: VerificationInputIdentity;
  current: VerificationInputIdentity;
}):
  | "verification_current"
  | "verification_implementation_changed"
  | "verification_steps_changed"
  | "verification_context_changed"
  | "verification_environment_changed"
  | "verification_input_changed" {
  if (opts.recorded.digest === opts.current.digest) return "verification_current";
  if (opts.recorded.implementation.digest !== opts.current.implementation.digest) {
    return "verification_implementation_changed";
  }
  if (opts.recorded.verify_steps_digest !== opts.current.verify_steps_digest) {
    return "verification_steps_changed";
  }
  if (opts.recorded.context.digest !== opts.current.context.digest) {
    return "verification_context_changed";
  }
  if (opts.recorded.environment.digest !== opts.current.environment.digest) {
    return "verification_environment_changed";
  }
  return "verification_input_changed";
}
