import { createHash } from "node:crypto";
import { lstat, readFile, readdir, readlink, realpath } from "node:fs/promises";
import path from "node:path";

import { gitEnv, gitRevParse, gitShowFile, resolveBaseBranch } from "@agentplaneorg/core/git";
import { execFileAsync, runProcess } from "@agentplaneorg/core/process";
import { canonicalizeJson } from "@agentplaneorg/core/tasks";

import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import { parseVerificationCheckDetails } from "./verification-details.js";
import type {
  HistoricalVerificationInputIdentity,
  VerificationCommandIdentity,
  VerificationContextIdentity,
  VerificationEnvironmentIdentity,
  VerificationEnvironment,
  VerificationEvidenceIdentity,
  VerificationEvidenceReference,
  VerificationExecutionIdentity,
  VerificationImplementationIdentity,
  VerificationInputIdentity,
  VerificationInputIdentityV5,
} from "./task-verification-input-types.js";
import type { NativeTaskIdentity } from "./native-task-identity.js";
export type {
  VerificationEnvironment,
  VerificationEvidenceReference,
  VerificationExecutionIdentity,
  VerificationInputIdentity,
  VerificationInputIdentityV5,
} from "./task-verification-input-types.js";

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
}): Promise<VerificationEvidenceIdentity> {
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
}): Promise<VerificationContextIdentity> {
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
  baseSha?: string | null;
}): Promise<VerificationImplementationIdentity> {
  if (opts.workflowMode === "branch_pr") {
    const base =
      opts.baseRef ??
      (await resolveBaseBranch({
        cwd: opts.gitRoot,
        rootOverride: opts.gitRoot,
        cliBaseOpt: null,
        mode: "branch_pr",
      }).catch(() => null));
    const baseSha =
      opts.baseSha ??
      (base ? await gitRevParse(opts.gitRoot, [`${base}^{commit}`]).catch(() => null) : null);
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
  executionDigest?: string | null;
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
        ...(opts.executionDigest ? { execution_digest: opts.executionDigest } : {}),
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

export function verificationInputV5Digest(opts: {
  concurrencyDigest: string;
  checkedInputDigest: string;
  obligationsDigest: string;
}): `sha256:${string}` {
  return sha256(
    JSON.stringify(
      canonicalizeJson({
        concurrency_digest: opts.concurrencyDigest,
        checked_input_digest: opts.checkedInputDigest,
        obligations_digest: opts.obligationsDigest,
      }),
    ),
  );
}

function verificationCommandIdentity(details: string | null | undefined): {
  digest: `sha256:${string}`;
  entries: VerificationCommandIdentity[];
} {
  const entries = (parseVerificationCheckDetails(details) ?? [])
    .map((check) => ({ check_id: check.checkId, command: check.command }))
    .toSorted((left, right) =>
      `${left.check_id ?? ""}\0${left.command}`.localeCompare(
        `${right.check_id ?? ""}\0${right.command}`,
      ),
    );
  return { digest: sha256(JSON.stringify(canonicalizeJson(entries))), entries };
}

function verificationExecutionIdentity(
  execution: TaskExecutionContext,
): VerificationExecutionIdentity {
  const identityPayload = {
    primary_task_id: execution.primary_task_id,
    task_ids: [...execution.task_ids].toSorted(),
    repository_mode: execution.repository_mode,
    selected_mode: execution.selected_mode,
    requested_mode: execution.requested_mode,
    route_source: execution.route_source,
    reason_codes: [...execution.reason_codes].toSorted(),
    base_ref: execution.base_ref,
    base_sha: execution.base_sha,
  };
  const payload = {
    ...identityPayload,
    authoritative_task_source: execution.authoritative_task_source,
  };
  return {
    digest: sha256(JSON.stringify(canonicalizeJson(identityPayload))),
    ...payload,
  };
}

type VerificationInputIdentityBaseOptions = {
  gitRoot: string;
  workflowDir: string;
  taskIds: readonly string[];
  targetSha: string | null;
  verifySteps: string;
  verificationContractDigest?: string | null;
  environment?: VerificationEnvironment;
  verificationDetails?: string | null;
  evidenceRef?: string | null;
  nativeIdentity?: NativeTaskIdentity | null;
  requiredCheckIds?: readonly string[];
};

async function resolveVerificationInputIdentityInternal(
  opts: VerificationInputIdentityBaseOptions & {
    workflowMode: "direct" | "branch_pr";
    execution?: TaskExecutionContext;
    baseRef?: string | null;
  },
): Promise<VerificationInputIdentity | null> {
  if (!opts.targetSha || !/^[0-9a-f]{40,64}$/u.test(opts.targetSha)) return null;
  const execution = opts.execution ? verificationExecutionIdentity(opts.execution) : null;
  if (
    execution &&
    [...new Set(opts.taskIds)].toSorted().join("\0") !== execution.task_ids.join("\0")
  ) {
    throw new Error("Verification task ids must match TaskExecutionContext.task_ids.");
  }
  const [implementation, context, evidence] = await Promise.all([
    implementationIdentity({
      gitRoot: opts.gitRoot,
      workflowDir: opts.workflowDir,
      taskIds: opts.taskIds,
      targetSha: opts.targetSha,
      workflowMode: execution?.selected_mode ?? opts.workflowMode,
      baseRef: execution?.base_ref ?? opts.baseRef,
      baseSha: execution?.base_sha,
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
  const environment: VerificationEnvironmentIdentity = {
    digest: sha256(JSON.stringify(canonicalizeJson(runtime))),
    runtime,
  };
  const verifyStepsDigest = sha256(opts.verifySteps.trim());
  const verificationContractDigest = opts.verificationContractDigest?.trim() ?? null;
  if (
    execution &&
    opts.nativeIdentity &&
    verificationContractDigest &&
    /^sha256:[a-f0-9]{64}$/u.test(verificationContractDigest)
  ) {
    if (opts.nativeIdentity.task_id !== execution.primary_task_id) {
      throw new Error("Native verification identity task must match execution.primary_task_id.");
    }
    const commands = verificationCommandIdentity(opts.verificationDetails);
    const concurrencyIdentity = {
      execution,
      task: opts.nativeIdentity,
    };
    const concurrency = {
      digest: sha256(
        JSON.stringify(
          canonicalizeJson({
            execution_digest: execution.digest,
            task_digest: opts.nativeIdentity.digest,
          }),
        ),
      ),
      ...concurrencyIdentity,
    };
    const checkedInputIdentity = {
      implementation,
      commands,
      context,
      environment,
      evidence,
    };
    const checked_input = {
      digest: sha256(
        JSON.stringify(
          canonicalizeJson({
            implementation_digest: implementation.digest,
            commands_digest: commands.digest,
            context_digest: context.digest,
            environment_digest: environment.digest,
            evidence_digest: evidence.digest,
          }),
        ),
      ),
      ...checkedInputIdentity,
    };
    const requiredCheckIds = [
      ...new Set(opts.requiredCheckIds ?? opts.nativeIdentity.checks.required_check_ids),
    ].toSorted();
    const obligationIdentity = {
      verify_steps_digest: verifyStepsDigest,
      verification_contract_digest: verificationContractDigest as `sha256:${string}`,
      required_check_ids: requiredCheckIds,
    };
    const obligations = {
      digest: sha256(JSON.stringify(canonicalizeJson(obligationIdentity))),
      ...obligationIdentity,
    };
    const current: Omit<VerificationInputIdentityV5, "digest"> = {
      schema_version: 5,
      kind: "task_verification_input",
      concurrency,
      checked_input,
      obligations,
    };
    return {
      ...current,
      digest: verificationInputV5Digest({
        concurrencyDigest: concurrency.digest,
        checkedInputDigest: checked_input.digest,
        obligationsDigest: obligations.digest,
      }),
    };
  }
  const digest = verificationInputDigest({
    executionDigest: execution?.digest,
    implementationDigest: implementation.digest,
    verifyStepsDigest,
    verificationContractDigest,
    contextDigest: context.digest,
    environmentDigest: environment.digest,
    evidenceDigest: evidence.digest,
  });
  const historical: HistoricalVerificationInputIdentity = {
    schema_version: execution ? 4 : verificationContractDigest ? 3 : 2,
    kind: "task_verification_input",
    ...(execution ? { execution } : {}),
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
  return historical;
}

export function resolveVerificationInputIdentity(
  opts: VerificationInputIdentityBaseOptions & { execution: TaskExecutionContext },
): Promise<VerificationInputIdentity | null> {
  return resolveVerificationInputIdentityInternal({
    ...opts,
    workflowMode: opts.execution.selected_mode,
  });
}

/** Read-only compatibility for recomputing a historical v4 input under v4 semantics. */
export function resolveHistoricalVerificationInputV4Identity(
  opts: VerificationInputIdentityBaseOptions & { execution: TaskExecutionContext },
): Promise<HistoricalVerificationInputIdentity | null> {
  return resolveVerificationInputIdentityInternal({
    ...opts,
    nativeIdentity: null,
    workflowMode: opts.execution.selected_mode,
  }) as Promise<HistoricalVerificationInputIdentity | null>;
}

/** Read-only compatibility for auditing pre-v4 records. New lifecycle code must use execution. */
export function resolveLegacyVerificationInputIdentity(
  opts: VerificationInputIdentityBaseOptions & {
    workflowMode: "direct" | "branch_pr";
    baseRef?: string | null;
  },
): Promise<HistoricalVerificationInputIdentity | null> {
  return resolveVerificationInputIdentityInternal(
    opts,
  ) as Promise<HistoricalVerificationInputIdentity | null>;
}

export function verificationInputInvalidationReason(opts: {
  recorded: VerificationInputIdentity;
  current: VerificationInputIdentity;
}):
  | "verification_current"
  | "verification_route_context_changed"
  | "verification_plan_changed"
  | "verification_policy_changed"
  | "verification_capability_changed"
  | "verification_implementation_changed"
  | "verification_commands_changed"
  | "verification_steps_changed"
  | "verification_contract_changed"
  | "verification_obligation_coverage_changed"
  | "verification_context_changed"
  | "verification_environment_changed"
  | "verification_evidence_changed"
  | "verification_input_changed" {
  if (opts.recorded.digest === opts.current.digest) return "verification_current";
  if (opts.recorded.schema_version !== opts.current.schema_version) {
    return "verification_input_changed";
  }
  if (opts.recorded.schema_version === 5 && opts.current.schema_version === 5) {
    if (
      opts.recorded.concurrency.execution.digest !== opts.current.concurrency.execution.digest ||
      opts.recorded.concurrency.task.task_id !== opts.current.concurrency.task.task_id
    ) {
      return "verification_route_context_changed";
    }
    if (opts.recorded.concurrency.task.plan.digest !== opts.current.concurrency.task.plan.digest) {
      return "verification_plan_changed";
    }
    if (
      opts.recorded.concurrency.task.policy.digest !== opts.current.concurrency.task.policy.digest
    ) {
      return "verification_policy_changed";
    }
    if (
      opts.recorded.concurrency.task.capability.digest !==
      opts.current.concurrency.task.capability.digest
    ) {
      return "verification_capability_changed";
    }
    if (
      opts.recorded.checked_input.implementation.digest !==
      opts.current.checked_input.implementation.digest
    ) {
      return "verification_implementation_changed";
    }
    if (
      opts.recorded.checked_input.commands.digest !== opts.current.checked_input.commands.digest
    ) {
      return "verification_commands_changed";
    }
    if (
      opts.recorded.obligations.verify_steps_digest !== opts.current.obligations.verify_steps_digest
    ) {
      return "verification_steps_changed";
    }
    if (
      opts.recorded.obligations.verification_contract_digest !==
      opts.current.obligations.verification_contract_digest
    ) {
      return "verification_contract_changed";
    }
    if (opts.recorded.obligations.digest !== opts.current.obligations.digest) {
      return "verification_obligation_coverage_changed";
    }
    if (opts.recorded.checked_input.context.digest !== opts.current.checked_input.context.digest) {
      return "verification_context_changed";
    }
    if (
      opts.recorded.checked_input.environment.digest !==
      opts.current.checked_input.environment.digest
    ) {
      return "verification_environment_changed";
    }
    if (
      opts.recorded.checked_input.evidence.digest !== opts.current.checked_input.evidence.digest
    ) {
      return "verification_evidence_changed";
    }
    return "verification_input_changed";
  }
  if (opts.recorded.schema_version === 5 || opts.current.schema_version === 5) {
    return "verification_input_changed";
  }
  if (opts.recorded.execution?.digest !== opts.current.execution?.digest) {
    return "verification_route_context_changed";
  }
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
