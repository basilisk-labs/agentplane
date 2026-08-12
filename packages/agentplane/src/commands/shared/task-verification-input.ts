import { createHash } from "node:crypto";
import { lstat, readFile, readdir, readlink, realpath } from "node:fs/promises";
import path from "node:path";

import { gitEnv, gitRevParse, gitShowFile, resolveBaseBranch } from "@agentplaneorg/core/git";
import { execFileAsync, runProcess } from "@agentplaneorg/core/process";
import { canonicalizeJson } from "@agentplaneorg/core/tasks";

import { parseVerificationCheckDetails } from "./verification-details.js";

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

const VERIFICATION_TOOL_CONTEXT_BASENAMES = new Set([
  ".eslintrc",
  ".prettierrc",
  "biome.json",
  "biome.jsonc",
  "eslint.config.cjs",
  "eslint.config.js",
  "eslint.config.mjs",
  "eslint.config.ts",
  "jest.config.cjs",
  "jest.config.js",
  "jest.config.mjs",
  "jest.config.ts",
  "knip.json",
  "Makefile",
  "nx.json",
  "playwright.config.ts",
  "ruff.toml",
  "Taskfile.yml",
  "turbo.json",
  "vitest.config.ts",
  "vitest.workspace.ts",
]);

const CONFIG_FILE_PATTERN = /(?:^|\.)(?:config|rc)(?:\.|$)/u;
const EVIDENCE_PATH_PATTERN =
  /(?:^|[\s("'`])((?:\.{1,2}\/|\.?[A-Za-z0-9_@+-]+\/)[^\s|,;)\]}'"`]+)/gu;

export type VerificationEnvironment = {
  platform: string;
  architecture: string;
  node_major: string;
  bun_major: string | null;
};

export type VerificationInputIdentity = {
  schema_version: 2 | 3;
  kind: "task_verification_input";
  implementation: {
    strategy: "branch_diff" | "tree";
    digest: `sha256:${string}`;
    target_sha: string;
    base_sha: string | null;
  };
  verify_steps_digest: `sha256:${string}`;
  verification_contract_digest?: `sha256:${string}`;
  context: {
    digest: `sha256:${string}`;
    paths: string[];
  };
  environment: {
    digest: `sha256:${string}`;
    runtime: VerificationEnvironment;
  };
  evidence: {
    digest: `sha256:${string}`;
    details_digest: `sha256:${string}`;
    references: VerificationEvidenceReference[];
  };
  digest: `sha256:${string}`;
};

export type VerificationEvidenceReference = {
  reference: string;
  path: string;
  fragment: string | null;
  source: "filesystem" | "git" | "missing" | "unsafe";
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
  return (
    VERIFICATION_CONTEXT_BASENAMES.has(basename) ||
    VERIFICATION_TOOL_CONTEXT_BASENAMES.has(basename) ||
    CONFIG_FILE_PATTERN.test(basename)
  );
}

function normalizeEvidencePath(value: string): { path: string; fragment: string | null } | null {
  if (value.includes("://")) return null;
  const [rawPath, ...fragmentParts] = value.replaceAll("\\", "/").split("#");
  const normalized = rawPath?.replace(/^\.\//u, "").replaceAll(/\/+$/gu, "") ?? "";
  if (
    !normalized ||
    normalized.startsWith("/") ||
    /^[A-Za-z]:/u.test(normalized) ||
    normalized.split("/").includes("..")
  ) {
    return null;
  }
  return {
    path: normalized,
    fragment: fragmentParts.length > 0 ? fragmentParts.join("#") : null,
  };
}

function verificationEvidencePaths(details: string): {
  reference: string;
  path: string;
  fragment: string | null;
}[] {
  const parsed = parseVerificationCheckDetails(details);
  const evidenceValues = parsed
    ? parsed.map((check) => check.evidence)
    : [...details.matchAll(/^Evidence:\s*(.+)$/gimu)].map((match) => match[1]?.trim() ?? "");
  const seen = new Set<string>();
  const references: { reference: string; path: string; fragment: string | null }[] = [];
  for (const evidence of evidenceValues) {
    EVIDENCE_PATH_PATTERN.lastIndex = 0;
    for (const match of evidence.matchAll(EVIDENCE_PATH_PATTERN)) {
      const reference = match[1]?.trim() ?? "";
      const normalized = normalizeEvidencePath(reference);
      if (!normalized) continue;
      const key = `${normalized.path}#${normalized.fragment ?? ""}`;
      if (seen.has(key)) continue;
      seen.add(key);
      references.push({ reference, ...normalized });
    }
  }
  return references.toSorted((left, right) =>
    `${left.path}#${left.fragment ?? ""}`.localeCompare(`${right.path}#${right.fragment ?? ""}`),
  );
}

function isWithinRoot(root: string, candidate: string): boolean {
  const relative = path.relative(path.resolve(root), path.resolve(candidate));
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

async function hashFilesystemEntry(opts: {
  gitRoot: string;
  absolutePath: string;
  ancestors?: ReadonlySet<string>;
}): Promise<`sha256:${string}` | null> {
  const entryKey = path.resolve(opts.absolutePath);
  if (opts.ancestors?.has(entryKey)) return sha256(`cycle\0${entryKey}`);
  const ancestors = new Set(opts.ancestors);
  ancestors.add(entryKey);
  const stat = await lstat(opts.absolutePath).catch(() => null);
  if (!stat) return null;
  if (stat.isSymbolicLink()) {
    const [link, resolved] = await Promise.all([
      readlink(opts.absolutePath),
      realpath(opts.absolutePath).catch(() => null),
    ]);
    if (!resolved || !isWithinRoot(opts.gitRoot, resolved)) return null;
    const targetDigest = await hashFilesystemEntry({
      gitRoot: opts.gitRoot,
      absolutePath: resolved,
      ancestors,
    });
    return targetDigest ? sha256(`symlink\0${link}\0${targetDigest}`) : null;
  }
  if (stat.isFile()) return sha256(await readFile(opts.absolutePath));
  if (!stat.isDirectory()) return sha256(`unsupported\0${String(stat.mode)}`);
  const entries = await readdir(opts.absolutePath, { withFileTypes: true });
  const identities = await Promise.all(
    entries
      .toSorted((left, right) => left.name.localeCompare(right.name))
      .map(async (entry) => ({
        name: entry.name,
        digest: await hashFilesystemEntry({
          gitRoot: opts.gitRoot,
          absolutePath: path.join(opts.absolutePath, entry.name),
          ancestors,
        }),
      })),
  );
  return sha256(JSON.stringify(canonicalizeJson(identities)));
}

async function verificationEvidence(opts: {
  gitRoot: string;
  targetSha: string;
  evidenceRef?: string | null;
  details?: string | null;
}): Promise<VerificationInputIdentity["evidence"]> {
  const details = opts.details?.trim() ?? "";
  const references = await Promise.all(
    verificationEvidencePaths(details).map(
      async (reference): Promise<VerificationEvidenceReference> => {
        const absolutePath = path.resolve(opts.gitRoot, reference.path);
        if (!isWithinRoot(opts.gitRoot, absolutePath)) {
          return { ...reference, source: "unsafe", digest: sha256("unsafe") };
        }
        const filesystemDigest = await hashFilesystemEntry({
          gitRoot: opts.gitRoot,
          absolutePath,
        });
        if (filesystemDigest) {
          return { ...reference, source: "filesystem", digest: filesystemDigest };
        }
        const requestedEvidenceRef = opts.evidenceRef?.trim();
        const snapshotRef = requestedEvidenceRef?.length ? requestedEvidenceRef : opts.targetSha;
        const snapshot = await gitShowFile(opts.gitRoot, snapshotRef, reference.path).catch(
          () => null,
        );
        if (snapshot !== null) {
          return { ...reference, source: "git", digest: sha256(snapshot) };
        }
        return { ...reference, source: "missing", digest: sha256("missing") };
      },
    ),
  );
  const detailsDigest = sha256(details);
  const referenceIdentities = references.map(
    ({ reference, path: evidencePath, fragment, digest }) => ({
      reference,
      path: evidencePath,
      fragment,
      digest,
    }),
  );
  return {
    digest: sha256(
      JSON.stringify(
        canonicalizeJson({ details_digest: detailsDigest, references: referenceIdentities }),
      ),
    ),
    details_digest: detailsDigest,
    references,
  };
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
      return object ? [{ path: filePath, object }] : [];
    })
    .toSorted((left, right) => left.path.localeCompare(right.path));
}

async function trackedTreeEntries(opts: {
  gitRoot: string;
  targetSha: string;
}): Promise<{ path: string; object: string }[]> {
  const { stdout } = await execFileAsync("git", ["ls-tree", "-r", "-z", opts.targetSha], {
    cwd: opts.gitRoot,
    env: gitEnv(),
    encoding: "buffer",
    maxBuffer: 64 * 1024 * 1024,
  });
  return parseTreeEntries(stdout);
}

function isWorkflowArtifact(opts: { path: string; workflowDir: string }): boolean {
  const workflowDir = normalizeWorkflowDir(opts.workflowDir);
  return opts.path === workflowDir || opts.path.startsWith(`${workflowDir}/`);
}

async function verificationContext(opts: {
  gitRoot: string;
  targetSha: string;
}): Promise<VerificationInputIdentity["context"]> {
  const treeEntries = await trackedTreeEntries(opts);
  const entries = treeEntries.filter((entry) => contextPath(entry.path));
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
        args: ["patch-id", "--verbatim"],
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

  const treeEntries = await trackedTreeEntries(opts);
  const entries = treeEntries.filter(
    (entry) => !isWorkflowArtifact({ path: entry.path, workflowDir: opts.workflowDir }),
  );
  return {
    strategy: "tree",
    digest: sha256(JSON.stringify(canonicalizeJson(entries))),
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
  verificationContractDigest?: string | null;
  contextDigest: string;
  environmentDigest: string;
  evidenceDigest: string;
}): `sha256:${string}` {
  return sha256(
    JSON.stringify(
      canonicalizeJson({
        implementation_digest: opts.implementationDigest,
        verify_steps_digest: opts.verifyStepsDigest,
        ...(opts.verificationContractDigest
          ? { verification_contract_digest: opts.verificationContractDigest }
          : {}),
        context_digest: opts.contextDigest,
        environment_digest: opts.environmentDigest,
        evidence_digest: opts.evidenceDigest,
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
  verificationContractDigest?: string | null;
  workflowMode: "direct" | "branch_pr";
  environment?: VerificationEnvironment;
  baseRef?: string | null;
  verificationDetails?: string | null;
  evidenceRef?: string | null;
}): Promise<VerificationInputIdentity | null> {
  if (!opts.targetSha || !/^[0-9a-f]{40,64}$/u.test(opts.targetSha)) return null;
  const [implementation, context, evidence] = await Promise.all([
    implementationIdentity({
      gitRoot: opts.gitRoot,
      workflowDir: opts.workflowDir,
      taskIds: opts.taskIds,
      targetSha: opts.targetSha,
      workflowMode: opts.workflowMode,
      baseRef: opts.baseRef,
    }),
    verificationContext({ gitRoot: opts.gitRoot, targetSha: opts.targetSha }),
    verificationEvidence({
      gitRoot: opts.gitRoot,
      targetSha: opts.targetSha,
      evidenceRef: opts.evidenceRef,
      details: opts.verificationDetails,
    }),
  ]);
  const runtime = opts.environment ?? currentVerificationEnvironment();
  const environment = {
    digest: sha256(JSON.stringify(canonicalizeJson(runtime))),
    runtime,
  };
  const verifyStepsDigest = sha256(opts.verifySteps.trim());
  const verificationContractDigest = opts.verificationContractDigest?.trim() ?? null;
  const digest = verificationInputDigest({
    implementationDigest: implementation.digest,
    verifyStepsDigest,
    verificationContractDigest,
    contextDigest: context.digest,
    environmentDigest: environment.digest,
    evidenceDigest: evidence.digest,
  });
  return {
    schema_version: verificationContractDigest ? 3 : 2,
    kind: "task_verification_input",
    implementation,
    verify_steps_digest: verifyStepsDigest,
    ...(verificationContractDigest
      ? { verification_contract_digest: verificationContractDigest as `sha256:${string}` }
      : {}),
    context,
    environment,
    evidence,
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
  | "verification_contract_changed"
  | "verification_context_changed"
  | "verification_environment_changed"
  | "verification_evidence_changed"
  | "verification_input_changed" {
  if (opts.recorded.digest === opts.current.digest) return "verification_current";
  if (opts.recorded.implementation.digest !== opts.current.implementation.digest) {
    return "verification_implementation_changed";
  }
  if (opts.recorded.verify_steps_digest !== opts.current.verify_steps_digest) {
    return "verification_steps_changed";
  }
  if (opts.recorded.verification_contract_digest !== opts.current.verification_contract_digest) {
    return "verification_contract_changed";
  }
  if (opts.recorded.context.digest !== opts.current.context.digest) {
    return "verification_context_changed";
  }
  if (opts.recorded.environment.digest !== opts.current.environment.digest) {
    return "verification_environment_changed";
  }
  if (opts.recorded.evidence.digest !== opts.current.evidence.digest) {
    return "verification_evidence_changed";
  }
  return "verification_input_changed";
}
