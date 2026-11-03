import { link, mkdir, mkdtemp, readFile, rename, rm, symlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanGitEnv, tempRepo } from "@agentplane/testkit";
import {
  createLegacyTaskAggregate,
  renderTaskReadme,
  taskKernel as k,
  withTaskCentricAggregate,
} from "@agentplaneorg/core/tasks";
import { buildStateFingerprint, type AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import type { CommandContext } from "../shared/task-backend.js";
import { makeKernelRecord, readKernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { LocalTaskByteStore } from "../../backends/task-backend/local-task-byte-store.js";
import {
  nativeQuarantineArtifactPaths,
  nativeQuarantineCandidatePaths,
} from "../shared/native-quarantine-artifact-proof.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";
import { previewLifecycleOwnerMigration } from "./migration-preview.js";
import { persistQuarantine } from "./migration-quarantine.js";
import { assertBranchTaskArtifactOwnership } from "../pr/internal/branch-task-artifact-ownership.js";

const mocks = vi.hoisted(() => ({ commit: vi.fn(), hook: vi.fn(), prepare: vi.fn() }));
vi.mock("../guard/impl/commit.js", () => ({ cmdCommit: mocks.commit }));
vi.mock("../shared/hook-shim-template.js", () => ({ assertHookRunnerReady: mocks.hook }));
vi.mock("./direct-task-supervisor-implementation.js", () => ({
  prepareDirectImplementationEvidence: mocks.prepare,
}));
import { commitCanonicalImplementation } from "./kernel-repository-coordinator.js";

const primaryId = "202611010002-QPRM12";
const foreignId = "202611010001-QHST12";
const cleanupId = "202611010003-QCN312";
const roots: Awaited<ReturnType<typeof tempRepo>>[] = [];
const aliases: string[] = [];
afterEach(async () => {
  await Promise.all(aliases.splice(0).map((file) => rm(file, { force: true })));
  await Promise.all(roots.splice(0).map((repo) => repo.cleanup()));
});
beforeEach(() => vi.resetAllMocks());

function git(root: string, ...args: string[]): string {
  const result = spawnSync("git", ["-c", "core.hooksPath=/dev/null", ...args], {
    cwd: root,
    env: cleanGitEnv(),
    encoding: "utf8",
    maxBuffer: 8 * 1024 * 1024,
  });
  expect(result.status, result.stdout + result.stderr).toBe(0);
  return result.stdout.trimEnd();
}

async function fixture(
  options: {
    workflowDir?: string;
    broad?: boolean;
    noSecurity?: boolean;
    expired?: boolean;
    policyApproval?: boolean;
    quarantineAfterBaseline?: boolean;
    cleanup?: "only" | "mixed";
  } = {},
) {
  const repo = await tempRepo({ branch: "main" });
  roots.push(repo);
  git(repo.root, "commit", "--allow-empty", "-m", "fixture before historical Task source");
  const workflowDir = options.workflowDir ?? ".agentplane/tasks";
  const foreignRoot = `${workflowDir}/${foreignId}`;
  const readme = `${foreignRoot}/README.md`;
  const cleanupRoots = options.cleanup
    ? [`${workflowDir}/${cleanupId}/evidence`, `${workflowDir}/${cleanupId}/runs`]
    : [];
  const cleanupPaths = options.cleanup
    ? [
        `${cleanupRoots[0]}/sample.stdout.log`,
        `${cleanupRoots[0]}/sample.events.jsonl`,
        `${cleanupRoots[1]}/run-1/result.json`,
      ].toSorted()
    : [];
  const aggregate = createLegacyTaskAggregate({
    id: foreignId,
    revision: 2,
    title: "Retain exact historical task",
    description: "Do not run old work",
    status: "DOING",
    acceptance_criteria: ["Preserved"],
    captured_at: "2026-09-01T00:00:00Z",
    updated_at: "2026-09-01T00:00:00Z",
  });
  const source = renderTaskReadme(
    {
      id: foreignId,
      title: "Historical",
      revision: 3,
      status: "DOING",
      extensions: withTaskCentricAggregate({}, aggregate),
    },
    "# Exact history\n\nRetain the unknown result.\n",
  )
    .replace("---\n", "---\n# Retained comment\n")
    .replaceAll("\n", "\r\n");
  await mkdir(path.dirname(path.join(repo.root, readme)), { recursive: true });
  await writeFile(path.join(repo.root, readme), source);
  await writeFile(path.join(repo.root, "preserved-user.txt"), "original user data\n");
  for (const file of cleanupPaths) {
    await mkdir(path.dirname(path.join(repo.root, file)), { recursive: true });
    await writeFile(path.join(repo.root, file), "fixture volatile evidence\n");
  }
  git(repo.root, "add", "--all");
  git(repo.root, "commit", "-m", "fixture original source");
  const repositoryIdentity = (await resolveLogicalRepositoryIdentity({
    git_root: repo.root,
    task: { extensions: {} },
    create_if_missing: false,
  })) as k.Sha256Digest;
  const scopeRoots =
    options.cleanup === "only"
      ? cleanupRoots
      : [options.broad ? workflowDir : foreignRoot, ...cleanupRoots];
  const effects =
    options.noSecurity || options.cleanup === "only"
      ? ["repository_write"]
      : ["repository_write", "security_boundary"];
  const requirements = {
    scope_roots: scopeRoots,
    repository_effects: effects,
    external_effects: [],
    capabilities: ["repository_write"],
    resources: [],
  };
  const contract = {
    objective: "Publish exact native quarantine",
    acceptance_criteria: ["Only the exact blocked pair"],
    verification_commands: ["focused"],
    role: "EXECUTOR" as const,
  };
  const contractDigest = k.kernelDigest(contract);
  const definition = {
    id: "quarantine",
    depends_on: [],
    required_inputs: [],
    expected_outputs: ["quarantine-proof"],
    execution_requirements: requirements,
    optional: false,
    contract_digest: contractDigest,
  };
  const intent = { objective: "Quarantine historical work", context: "Synthetic test fixture" };
  const plan: k.PlanRecord = {
    revision: 1,
    digest: k.kernelDigest({ revision: 1, work_items: [definition] }),
    state: "APPROVED",
    approval_actor_id: options.policyApproval ? "agentplane:kernel-controller" : "USER",
    approval_evidence_digest: k.kernelDigest("fixture approval"),
    work_items: [definition],
  };
  const fingerprint = k.kernelDigest("fixture repository observation");
  const authorityContents = {
    ...requirements,
    task_id: primaryId,
    plan_revision: 1,
    plan_digest: plan.digest,
    work_item_id: null,
    repository_identity: repositoryIdentity,
    repository_fingerprint: fingerprint,
    validation_requirements: [],
    policy_digests: [],
    completion_requirements: [],
    risk: {
      requirements: "bounded" as const,
      implementation: "bounded" as const,
      reversibility: "reversible" as const,
    },
    provenance: {
      kind: options.policyApproval ? ("SYSTEM" as const) : ("USER" as const),
      actor_id: plan.approval_actor_id!,
      evidence_digest: plan.approval_evidence_digest!,
      parent_authority_digest: null,
    },
    expires_at: options.expired ? "2026-01-01T00:00:00Z" : null,
  };
  const authority = { ...authorityContents, digest: k.authorityDigest(authorityContents) };
  const claimId = k.kernelDigest("fixture claim");
  const canonical: k.TaskAggregate = {
    schema_version: 1,
    id: primaryId,
    revision: 7,
    state: "ACTIVE",
    intent_digest: k.kernelDigest(intent),
    current_plan: plan,
    plan_history: [],
    authority_lineage: [
      {
        authority,
        approval_mode: options.policyApproval ? "repository_policy" : "manual_operator",
        observation: null,
      },
    ],
    work_items: {
      quarantine: {
        definition,
        state: "EXECUTING",
        revision: 1,
        attempt: 1,
        claim_id: claimId,
        result_digest: null,
        output_manifests: [],
        validation: null,
      },
    },
    final_validation: null,
    effects: [],
    mutation_receipts: {},
    controller_transfer: null,
    migration_receipts: [],
  };
  const record = makeKernelRecord(repositoryIdentity, canonical, [], {
    intent,
    contracts: { [contractDigest]: contract },
  });
  const primary = {
    id: primaryId,
    title: "Quarantine operator",
    revision: 7,
    status: "DOING",
    task_kind: "ops",
    mutation_scope: "ops",
    execution_route: { repository_mode: "branch_pr", selected_mode: "branch_pr" },
    execution_contract: {
      declaration: { scope_roots: scopeRoots },
      authority: {
        allowed_repository_effects: effects,
        allowed_capabilities: ["repository_write"],
        writable_roots: scopeRoots,
      },
    },
    extensions: { task_kernel: record },
  };
  expect(readKernelRecord(primary as never, repositoryIdentity)).toMatchObject({
    kind: "canonical",
  });
  const primaryPath = `${workflowDir}/${primaryId}/README.md`;
  await mkdir(path.dirname(path.join(repo.root, primaryPath)), { recursive: true });
  await writeFile(
    path.join(repo.root, primaryPath),
    renderTaskReadme(primary, "# Operator fixture\n"),
  );
  git(repo.root, "add", "--all");
  git(repo.root, "commit", "-m", "fixture approved operator scope");
  const base = git(repo.root, "rev-parse", "HEAD");
  const branch = `task/${primaryId}/quarantine`;
  git(repo.root, "switch", "-c", branch);
  await writeFile(path.join(repo.root, "preserved-user.txt"), "unrelated dirty user data\n");
  const statusBeforeQuarantine =
    options.quarantineAfterBaseline || options.cleanup === "only"
      ? {
          command: "git status --short --untracked-files=all",
          lines: git(repo.root, "status", "--short", "--untracked-files=all").split("\n"),
        }
      : null;
  const store = new LocalTaskByteStore({ root: path.join(repo.root, workflowDir) });
  const snapshot = (await store.read(foreignId))!;
  const preview = previewLifecycleOwnerMigration(Buffer.from(source, "utf8"));
  const binding = {
    repository_identity: repositoryIdentity,
    state_fingerprint_digest: fingerprint,
    policy_digest: k.kernelDigest("fixture policy"),
    authority_digest: authority.digest,
  };
  if (options.cleanup !== "only") {
    const applied = await persistQuarantine({
      store,
      repository_identity: repositoryIdentity,
      resolved: { current: snapshot, source: snapshot, marker: null },
      preview,
      binding,
      observe_binding: () => Promise.resolve(binding),
      reason: "source_revision_mismatch",
    });
    expect(applied).toMatchObject({ kind: "quarantined", persisted: true });
  }
  for (const file of cleanupPaths) await rm(path.join(repo.root, file));
  const backup = `${workflowDir}/${store.backupLocation(snapshot)}`;
  const pair = [readme, backup].toSorted();
  const issuedAuthorityDigest = k.kernelDigest("fixture delegated authority");
  const present = (source: string, value: unknown) => ({
    state: "present" as const,
    source,
    value,
  });
  const absent = {
    state: "unavailable" as const,
    source: "canonical_episode",
    reason_code: "not_required_for_semantic_episode",
  };
  const order = {
    work_order_id: k.kernelDigest("fixture issued WorkOrder"),
    role: "EXECUTOR",
    task: { id: primaryId, revision: 7, work_item_id: "quarantine" },
    canonical_binding: {
      phase: "implementation",
      task_id: primaryId,
      repository_identity: repositoryIdentity,
      plan_revision: 1,
      plan_digest: plan.digest,
      repository_fingerprint: fingerprint,
      authority_digest: issuedAuthorityDigest,
      work_item_id: "quarantine",
      claim_id: claimId,
      attempt: 1,
      contract_digest: contractDigest,
    },
    authority: {
      sandbox: "workspace-write",
      allowed_tool_classes: ["workspace_write"],
      writable_roots: scopeRoots.map((root) => path.join(repo.root, root)),
    },
    state_fingerprint: buildStateFingerprint({
      task_id: primaryId,
      task_revision: canonical.revision,
      git_head: base,
      worktree: repo.root,
      components: {
        task: present("canonical_task", record.digest),
        git: present("native_repository_content", fingerprint),
        backend_projection: present("canonical_backend", "local"),
        plan: present("canonical_plan", {
          revision: plan.revision,
          digest: plan.digest,
          state: plan.state,
        }),
        policy: present("native_policy", []),
        capability: present("canonical_capability", {
          authority_digest: issuedAuthorityDigest,
          capabilities: requirements.capabilities,
          repository_effects: requirements.repository_effects,
          external_effects: requirements.external_effects,
        }),
        authority: present("canonical_authority", {
          issued: issuedAuthorityDigest,
          lineage: authority.digest,
        }),
        knowledge: absent,
        provider: absent,
      },
    }),
  } as unknown as AgentWorkOrderV2;
  const proof = {
    gitRoot: repo.root,
    baseCommit: base,
    primaryTaskId: primaryId,
    workflowDir,
    changedPaths: pair,
    workOrder: order,
  };
  const directory = await mkdtemp(path.join(repo.root, ".git/quarantine-exchange-"));
  const status = statusBeforeQuarantine ?? {
    command: "git status --short --untracked-files=all",
    lines: git(repo.root, "status", "--short", "--untracked-files=all").split("\n"),
  };
  // Retain the same native baseline shape. Git and byte proof are real; only formal commit transport is isolated below.
  await writeFile(
    path.join(directory, "repository-baseline.json"),
    JSON.stringify({
      schema_version: 1,
      kind: "canonical_repository_baseline",
      task_id: primaryId,
      work_item_id: "quarantine",
      task_revision: 7,
      work_order_id: order.work_order_id,
      checkout: repo.root,
      branch,
      head: base,
      tree: git(repo.root, "rev-parse", "HEAD^{tree}"),
      status,
    }),
  );
  const command = {
    resolvedProject: { gitRoot: repo.root },
    config: {
      branch: { task_prefix: "task" },
      paths: { workflow_dir: workflowDir, tasks_path: workflowDir },
    },
    git: {
      stage: (files: string[]) => {
        git(repo.root, "add", "-A", "--", ...files);
        return Promise.resolve();
      },
      statusStagedPaths: () =>
        Promise.resolve(
          git(repo.root, "diff", "--cached", "--name-only").split("\n").filter(Boolean),
        ),
      invalidateStatus: vi.fn(),
    },
  } as unknown as CommandContext;
  mocks.commit.mockImplementation(() => {
    git(repo.root, "commit", "-m", "fixture native quarantine publication");
    return Promise.resolve(0);
  });
  mocks.prepare.mockImplementation(
    ({ observed_changed_paths }: { observed_changed_paths: string[] }) =>
      Promise.resolve({
        status: "ready",
        evidence: {
          artifact_path: `${workflowDir}/${primaryId}/implementation.json`,
          implementation_commit: git(repo.root, "rev-parse", "HEAD"),
          changed_paths: observed_changed_paths,
        },
      }),
  );
  return {
    ...repo,
    source,
    base,
    branch,
    readme,
    backup,
    pair,
    cleanupPaths,
    cleanupRoots,
    primaryPath,
    proof,
    command,
    directory,
    order,
    commit: (changedPaths: readonly string[] = []) =>
      commitCanonicalImplementation({
        command,
        directory,
        work_order: order,
        changed_paths: changedPaths,
      }),
    publish: (cleanupAuthority = true) =>
      assertBranchTaskArtifactOwnership({
        gitRoot: repo.root,
        baseBranch: "main",
        branch,
        workflowDir,
        tasksPath: workflowDir,
        primaryTaskId: primaryId,
        ...(options.cleanup && cleanupAuthority
          ? { authorizedForeignArtifactCleanupRoots: cleanupRoots }
          : {}),
      }),
  };
}

describe("proof-bound native quarantine repository admission", () => {
  it.each([".agentplane/tasks", "state/task-records"])(
    "retains only frozen quarantine pair requirements when live bytes change under %s",
    async (workflowDir) => {
      const f = await fixture({ workflowDir, cleanup: "mixed" });
      const candidates = { ...f.proof, changedPaths: [...f.pair, ...f.cleanupPaths] };
      expect([...(await nativeQuarantineCandidatePaths(candidates))].toSorted()).toEqual(f.pair);
      await writeFile(path.join(f.root, f.backup), "changed current backup\n");
      expect([...(await nativeQuarantineArtifactPaths(candidates))]).toEqual([]);
      expect([...(await nativeQuarantineCandidatePaths(candidates))].toSorted()).toEqual(f.pair);
    },
  );

  it.each([".agentplane/tasks", "state/task-records"])(
    "keeps ordinary foreign Task README updates outside quarantine classification under %s",
    async (workflowDir) => {
      const f = await fixture({ workflowDir });
      const ordinary = f.source.replace("revision: 3", "revision: 2");
      expect(ordinary).not.toBe(f.source);
      const preview = previewLifecycleOwnerMigration(Buffer.from(ordinary, "utf8"));
      expect(preview.source_revision).toBe(2);
      expect(
        preview.mapping.blockers.some(
          (blocker) => blocker.reason_code === "source_revision_mismatch",
        ),
      ).toBe(false);
      await writeFile(path.join(f.root, f.readme), ordinary);
      git(f.root, "add", "--", f.readme);
      git(f.root, "commit", "-m", "fixture ordinary synchronized foreign Task");
      expect([
        ...(await nativeQuarantineCandidatePaths({
          ...f.proof,
          baseCommit: git(f.root, "rev-parse", "HEAD"),
        })),
      ]).toEqual([]);
      await expect(f.publish()).rejects.toMatchObject({ code: "E_VALIDATION" });
    },
  );

  it.each([".agentplane/tasks", "state/task-records"])(
    "retains the native pair requirement even for an invalid frozen backup under %s",
    async (workflowDir) => {
      const f = await fixture({ workflowDir });
      git(f.root, "add", "--", f.backup);
      git(f.root, "commit", "-m", "fixture exact historical backup already in base");
      const candidates = {
        ...f.proof,
        baseCommit: git(f.root, "rev-parse", "HEAD"),
        changedPaths: [f.readme],
      };
      expect([...(await nativeQuarantineCandidatePaths(candidates))].toSorted()).toEqual(f.pair);
      await writeFile(path.join(f.root, f.backup), "unrelated historical backup\n");
      git(f.root, "add", "--", f.backup);
      git(f.root, "commit", "-m", "fixture unrelated backup before the operation");
      expect(
        [
          ...(await nativeQuarantineCandidatePaths({
            ...candidates,
            baseCommit: git(f.root, "rev-parse", "HEAD"),
          })),
        ].toSorted(),
      ).toEqual(f.pair);
      expect([
        ...(await nativeQuarantineArtifactPaths({
          ...candidates,
          baseCommit: git(f.root, "rev-parse", "HEAD"),
        })),
      ]).toEqual([]);
    },
  );

  it("does not drop proof requirements when the immutable Git lookup fails", async () => {
    const f = await fixture();
    await expect(
      nativeQuarantineCandidatePaths({ ...f.proof, baseCommit: "f".repeat(40) }),
    ).rejects.toThrow();
    expect(mocks.commit).not.toHaveBeenCalled();
    expect(git(f.root, "rev-parse", "HEAD")).toBe(f.base);
  });

  it("does not classify task siblings, nested paths or escaping paths as native pairs", async () => {
    const f = await fixture();
    const workflowDir = f.proof.workflowDir;
    expect([
      ...(await nativeQuarantineCandidatePaths({
        ...f.proof,
        changedPaths: [
          f.primaryPath,
          f.readme.replace(`${workflowDir}/`, `${workflowDir}-other/`),
          f.readme.replace("/README.md", "/runs/README.md"),
          f.readme.replace("/README.md", "/../README.md"),
          f.readme.replace("/README.md", "/migration-not-a-digest.source"),
        ],
      })),
    ]).toEqual([]);
  });

  it.each([".agentplane/tasks", "state/task-records"])(
    "commits authorized deletion-only cleanup without quarantine proof under %s",
    async (workflowDir) => {
      const f = await fixture({ workflowDir, cleanup: "only" });
      const result = await f.commit(f.cleanupPaths);
      expect(result).toMatchObject({ base_commit: f.base, changed_paths: f.cleanupPaths });
      expect(mocks.commit).toHaveBeenCalledOnce();
      expect(git(f.root, "diff", "--name-only", f.base, "HEAD").split("\n").toSorted()).toEqual(
        f.cleanupPaths,
      );
      expect(await readFile(path.join(f.root, f.readme), "utf8")).toBe(f.source);
      expect(await readFile(path.join(f.root, "preserved-user.txt"), "utf8")).toBe(
        "unrelated dirty user data\n",
      );
      await expect(f.publish()).resolves.toBeUndefined();
      await expect(f.publish(false)).rejects.toMatchObject({ code: "E_VALIDATION" });
    },
  );

  it.each([
    [".agentplane/tasks", "rejected"],
    ["state/task-records", "rejected"],
    [".agentplane/tasks", "committed"],
    ["state/task-records", "committed"],
  ] as const)(
    "retains authorized deletion-only cleanup under %s after a %s hook outcome",
    async (workflowDir, interruption) => {
      const f = await fixture({ workflowDir, cleanup: "only" });
      if (interruption === "rejected") mocks.commit.mockResolvedValueOnce(1);
      else {
        mocks.commit.mockImplementationOnce(() => {
          git(f.root, "commit", "-m", "fixture cleanup committed before transport interruption");
          throw new Error("fixture interrupted cleanup after commit");
        });
      }
      await expect(f.commit(f.cleanupPaths)).rejects.toThrow(
        interruption === "rejected"
          ? "Canonical implementation commit exited 1"
          : "fixture interrupted cleanup after commit",
      );
      const head = git(f.root, "rev-parse", "HEAD");
      const intentPath = path.join(f.directory, "repository-commit-intent.json");
      const intent = await readFile(intentPath, "utf8");
      expect(await f.commit(f.cleanupPaths)).toMatchObject({ changed_paths: f.cleanupPaths });
      expect(mocks.commit).toHaveBeenCalledTimes(interruption === "rejected" ? 2 : 1);
      if (interruption === "committed") expect(git(f.root, "rev-parse", "HEAD")).toBe(head);
      expect(await readFile(intentPath, "utf8")).toBe(intent);
      expect(await readFile(path.join(f.root, f.readme), "utf8")).toBe(f.source);
      await expect(f.publish()).resolves.toBeUndefined();
    },
  );

  it.each([".agentplane/tasks", "state/task-records"])(
    "keeps exact quarantine and independently authorized cleanup together under %s",
    async (workflowDir) => {
      const f = await fixture({ workflowDir, cleanup: "mixed" });
      const expected = [...f.pair, ...f.cleanupPaths].toSorted();
      expect(await f.commit(f.cleanupPaths)).toMatchObject({ changed_paths: expected });
      expect(await readFile(path.join(f.root, f.backup), "utf8")).toBe(f.source);
      await expect(f.publish()).resolves.toBeUndefined();
      await expect(f.publish(false)).rejects.toMatchObject({ code: "E_VALIDATION" });
    },
  );

  it.each([".agentplane/tasks", "state/task-records"])(
    "restages a recreated cleanup path and refuses to publish the foreign edit under %s",
    async (workflowDir) => {
      const f = await fixture({ workflowDir, cleanup: "only" });
      mocks.commit.mockResolvedValueOnce(1);
      await expect(f.commit(f.cleanupPaths)).rejects.toThrow(
        "Canonical implementation commit exited 1",
      );
      const file = f.cleanupPaths[0]!;
      const replacement = "recreated volatile file must remain visible\n";
      await writeFile(path.join(f.root, file), replacement);
      expect(await f.commit(f.cleanupPaths)).toMatchObject({ changed_paths: f.cleanupPaths });
      expect(git(f.root, "show", `HEAD:${file}`)).toBe(replacement.trimEnd());
      expect(await readFile(path.join(f.root, file), "utf8")).toBe(replacement);
      expect(mocks.commit).toHaveBeenCalledTimes(2);
      await expect(f.publish()).rejects.toMatchObject({ code: "E_VALIDATION" });
    },
  );

  it.each([
    [".agentplane/tasks", "rejected"],
    ["state/task-records", "rejected"],
    [".agentplane/tasks", "committed"],
    ["state/task-records", "committed"],
  ] as const)(
    "retains mixed quarantine and cleanup under %s after a %s hook outcome",
    async (workflowDir, interruption) => {
      const f = await fixture({ workflowDir, cleanup: "mixed" });
      if (interruption === "rejected") mocks.commit.mockResolvedValueOnce(1);
      else {
        mocks.commit.mockImplementationOnce(() => {
          git(f.root, "commit", "-m", "fixture mixed commit before transport interruption");
          throw new Error("fixture interrupted mixed commit");
        });
      }
      await expect(f.commit(f.cleanupPaths)).rejects.toThrow(
        interruption === "rejected"
          ? "Canonical implementation commit exited 1"
          : "fixture interrupted mixed commit",
      );
      const head = git(f.root, "rev-parse", "HEAD");
      const intentPath = path.join(f.directory, "repository-commit-intent.json");
      const intent = await readFile(intentPath, "utf8");
      expect(await f.commit(f.cleanupPaths)).toMatchObject({
        changed_paths: [...f.pair, ...f.cleanupPaths].toSorted(),
      });
      expect(mocks.commit).toHaveBeenCalledTimes(interruption === "rejected" ? 2 : 1);
      if (interruption === "committed") expect(git(f.root, "rev-parse", "HEAD")).toBe(head);
      expect(await readFile(intentPath, "utf8")).toBe(intent);
      expect(await readFile(path.join(f.root, f.backup), "utf8")).toBe(f.source);
      expect(await readFile(path.join(f.root, "preserved-user.txt"), "utf8")).toBe(
        "unrelated dirty user data\n",
      );
      await expect(f.publish()).resolves.toBeUndefined();
    },
  );

  it("preserves the existing native repository-policy approval contract for exact operator scope", async () => {
    const f = await fixture({ policyApproval: true });
    expect([...(await nativeQuarantineArtifactPaths(f.proof))].toSorted()).toEqual(f.pair);
    expect(await f.commit()).toMatchObject({ changed_paths: f.pair });
    await expect(f.publish()).resolves.toBeUndefined();
  });
  it.each([".agentplane/tasks", "state/task-records"])(
    "adopts and publishes the native pair under %s",
    async (workflowDir) => {
      const f = await fixture({ workflowDir });
      expect([...(await nativeQuarantineArtifactPaths(f.proof))].toSorted()).toEqual(f.pair);
      const result = await f.commit();
      expect(result).toMatchObject({ base_commit: f.base, changed_paths: f.pair });
      expect(mocks.commit).toHaveBeenCalledOnce();
      expect(git(f.root, "diff", "--name-only", f.base, "HEAD").split("\n").toSorted()).toEqual(
        f.pair,
      );
      expect(await readFile(path.join(f.root, f.backup), "utf8")).toBe(f.source);
      expect(await readFile(path.join(f.root, "preserved-user.txt"), "utf8")).toBe(
        "unrelated dirty user data\n",
      );
      await expect(f.publish()).resolves.toBeUndefined();
      expect(
        [
          ...(await nativeQuarantineArtifactPaths({
            ...f.proof,
            workOrder: undefined,
            evaluatedCommit: f.branch,
          })),
        ].toSorted(),
      ).toEqual(f.pair);
    },
  );

  it.each([".agentplane/tasks", "state/task-records"])(
    "retries an automatically adopted pair after a rejected hook under %s",
    async (workflowDir) => {
      const f = await fixture({ workflowDir });
      mocks.commit.mockResolvedValueOnce(1);
      await expect(f.commit()).rejects.toThrow("Canonical implementation commit exited 1");
      expect(git(f.root, "rev-parse", "HEAD")).toBe(f.base);
      expect(git(f.root, "diff", "--cached", "--name-only").split("\n").toSorted()).toEqual(f.pair);
      const intentPath = path.join(f.directory, "repository-commit-intent.json");
      const intent = await readFile(intentPath, "utf8");
      expect(JSON.parse(intent)).toMatchObject({ changed_paths: f.pair });

      expect(await f.commit()).toMatchObject({ base_commit: f.base, changed_paths: f.pair });
      expect(mocks.commit).toHaveBeenCalledTimes(2);
      expect(await readFile(intentPath, "utf8")).toBe(intent);
      expect(await readFile(path.join(f.root, f.backup), "utf8")).toBe(f.source);
      expect(await readFile(path.join(f.root, "preserved-user.txt"), "utf8")).toBe(
        "unrelated dirty user data\n",
      );
      await expect(f.publish()).resolves.toBeUndefined();
    },
  );

  it.each(["backup", "afterimage", "unrelated-staged"])(
    "refuses changed %s on an automatically adopted hook retry",
    async (artifact) => {
      const f = await fixture();
      mocks.commit.mockResolvedValueOnce(1);
      await expect(f.commit()).rejects.toThrow("Canonical implementation commit exited 1");
      const intentPath = path.join(f.directory, "repository-commit-intent.json");
      const intent = await readFile(intentPath, "utf8");
      if (artifact === "unrelated-staged") {
        git(f.root, "add", "--", "preserved-user.txt");
      } else {
        const target = path.join(f.root, artifact === "backup" ? f.backup : f.readme);
        await writeFile(target, (await readFile(target, "utf8")) + "changed after hook refusal\n");
      }

      await expect(f.commit()).rejects.toThrow(
        "Canonical implementation changed its dirty baseline",
      );
      expect(mocks.commit).toHaveBeenCalledOnce();
      expect(git(f.root, "rev-parse", "HEAD")).toBe(f.base);
      expect(await readFile(intentPath, "utf8")).toBe(intent);
    },
  );

  it.each([
    ["backup", ".agentplane/tasks", false],
    ["afterimage", ".agentplane/tasks", false],
    ["backup", "state/task-records", false],
    ["afterimage", "state/task-records", false],
    ["backup", ".agentplane/tasks", true],
    ["afterimage", ".agentplane/tasks", true],
    ["backup", "state/task-records", true],
    ["afterimage", "state/task-records", true],
  ] as const)(
    "refuses hook-tampered committed %s under %s on recovery (restore live bytes: %s)",
    async (artifact, workflowDir, restoreLive) => {
      const f = await fixture({ workflowDir });
      const target = path.join(f.root, artifact === "backup" ? f.backup : f.readme);
      const original = await readFile(target);
      mocks.commit.mockImplementationOnce(async () => {
        await writeFile(target, Buffer.concat([original, Buffer.from("changed by commit hook\n")]));
        git(f.root, "add", "--", ...f.pair);
        git(f.root, "commit", "-m", "fixture hook committed altered quarantine bytes");
        return 0;
      });
      await expect(f.commit()).rejects.toThrow("Native quarantine artifacts changed");
      const committed = git(f.root, "rev-parse", "HEAD");
      expect(committed).not.toBe(f.base);
      const intentPath = path.join(f.directory, "repository-commit-intent.json");
      const intent = await readFile(intentPath, "utf8");
      if (restoreLive) await writeFile(target, original);

      await expect(f.commit()).rejects.toThrow("Native quarantine artifacts changed");
      expect(mocks.commit).toHaveBeenCalledOnce();
      expect(mocks.prepare).not.toHaveBeenCalled();
      expect(git(f.root, "rev-parse", "HEAD")).toBe(committed);
      expect(await readFile(intentPath, "utf8")).toBe(intent);
      await expect(
        readFile(path.join(f.directory, "repository-followup-commit-intent.json")),
      ).rejects.toMatchObject({ code: "ENOENT" });
      expect(await readFile(path.join(f.root, "preserved-user.txt"), "utf8")).toBe(
        "unrelated dirty user data\n",
      );
      await expect(f.publish()).rejects.toMatchObject({ code: "E_VALIDATION" });
    },
  );

  it.each([".agentplane/tasks", "state/task-records"])(
    "reconciles an interrupted valid commit without dispatching another commit under %s",
    async (workflowDir) => {
      const f = await fixture({ workflowDir });
      mocks.commit.mockImplementationOnce(() => {
        git(f.root, "commit", "-m", "fixture committed before transport interruption");
        throw new Error("fixture interrupted after successful commit");
      });
      await expect(f.commit()).rejects.toThrow("fixture interrupted after successful commit");
      const committed = git(f.root, "rev-parse", "HEAD");
      expect(committed).not.toBe(f.base);
      const intentPath = path.join(f.directory, "repository-commit-intent.json");
      const intent = await readFile(intentPath, "utf8");

      expect(await f.commit()).toMatchObject({
        base_commit: f.base,
        implementation_commit: committed,
        changed_paths: f.pair,
      });
      expect(mocks.commit).toHaveBeenCalledOnce();
      expect(git(f.root, "rev-parse", "HEAD")).toBe(committed);
      expect(await readFile(intentPath, "utf8")).toBe(intent);
      expect(await readFile(path.join(f.root, f.backup), "utf8")).toBe(f.source);
      await expect(f.publish()).resolves.toBeUndefined();
    },
  );

  it.each([".agentplane/tasks", "state/task-records"])(
    "proves an explicitly reported pair introduced after the baseline under %s",
    async (workflowDir) => {
      const f = await fixture({ workflowDir, quarantineAfterBaseline: true });
      expect(await f.commit(f.pair)).toMatchObject({ changed_paths: f.pair });
      expect(mocks.commit).toHaveBeenCalledOnce();
      await expect(f.publish()).resolves.toBeUndefined();
    },
  );

  it.each([
    ["backup", ".agentplane/tasks"],
    ["afterimage", ".agentplane/tasks"],
    ["backup", "state/task-records"],
    ["afterimage", "state/task-records"],
  ] as const)(
    "retains proof for an introduced %s after a successful hook changes it under %s",
    async (artifact, workflowDir) => {
      const f = await fixture({ workflowDir, quarantineAfterBaseline: true });
      const target = path.join(f.root, artifact === "backup" ? f.backup : f.readme);
      mocks.commit.mockImplementationOnce(async () => {
        await writeFile(target, (await readFile(target, "utf8")) + "changed by commit hook\n");
        git(f.root, "add", "--", ...f.pair);
        git(f.root, "commit", "-m", "fixture introduced pair altered by hook");
        return 0;
      });
      await expect(f.commit(f.pair)).rejects.toThrow("Native quarantine artifacts changed");
      const committed = git(f.root, "rev-parse", "HEAD");
      const intentPath = path.join(f.directory, "repository-commit-intent.json");
      const intent = await readFile(intentPath, "utf8");
      await expect(f.commit()).rejects.toThrow("Native quarantine artifacts changed");
      expect(mocks.commit).toHaveBeenCalledOnce();
      expect(mocks.prepare).not.toHaveBeenCalled();
      expect(git(f.root, "rev-parse", "HEAD")).toBe(committed);
      expect(await readFile(intentPath, "utf8")).toBe(intent);
    },
  );

  it.each([
    ["backup", ".agentplane/tasks"],
    ["afterimage", ".agentplane/tasks"],
    ["backup", "state/task-records"],
    ["afterimage", "state/task-records"],
  ] as const)(
    "refuses changed live %s after a valid commit without dispatching followup work under %s",
    async (artifact, workflowDir) => {
      const f = await fixture({ workflowDir });
      const target = path.join(f.root, artifact === "backup" ? f.backup : f.readme);
      const original = await readFile(target);
      mocks.commit.mockImplementationOnce(async () => {
        git(f.root, "commit", "-m", "fixture valid commit before live mutation");
        await writeFile(target, Buffer.concat([original, Buffer.from("changed after commit\n")]));
        return 0;
      });
      await expect(f.commit()).rejects.toThrow("Native quarantine artifacts changed");
      const committed = git(f.root, "rev-parse", "HEAD");
      const intentPath = path.join(f.directory, "repository-commit-intent.json");
      const intent = await readFile(intentPath, "utf8");
      await expect(f.commit()).rejects.toThrow(
        /Native quarantine artifacts changed|Canonical repository delta differs from its observation/u,
      );
      expect(mocks.prepare).not.toHaveBeenCalled();
      expect(await readFile(intentPath, "utf8")).toBe(intent);
      await expect(
        readFile(path.join(f.directory, "repository-followup-commit-intent.json")),
      ).rejects.toMatchObject({ code: "ENOENT" });
      await writeFile(target, original);
      expect(await f.commit()).toMatchObject({ implementation_commit: committed });
      expect(mocks.commit).toHaveBeenCalledOnce();
      expect(git(f.root, "rev-parse", "HEAD")).toBe(committed);
      await expect(f.publish()).resolves.toBeUndefined();
    },
  );

  it.each([{ broad: true }, { noSecurity: true }, { expired: true }])(
    "refuses explicitly reported quarantine paths without exact authority %j",
    async (options) => {
      const f = await fixture(options);
      await expect(f.commit(f.pair)).rejects.toThrow("Native quarantine artifacts changed");
      expect(mocks.commit).not.toHaveBeenCalled();
      expect(git(f.root, "rev-parse", "HEAD")).toBe(f.base);
      await expect(
        readFile(path.join(f.directory, "repository-commit-intent.json")),
      ).rejects.toMatchObject({ code: "ENOENT" });
    },
  );

  it.each([
    ["backup", "filesystem"],
    ["afterimage", "filesystem"],
    ["backup", "git"],
    ["afterimage", "git"],
  ] as const)("refuses BOM-prefixed %s bytes through the %s proof", async (artifact, surface) => {
    const f = await fixture();
    const target = path.join(f.root, artifact === "backup" ? f.backup : f.readme);
    const original = await readFile(target);
    await writeFile(target, Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), original]));
    if (surface === "git") {
      git(f.root, "add", "--", ...f.pair);
      git(f.root, "commit", "-m", "fixture altered raw quarantine bytes");
      expect([
        ...(await nativeQuarantineArtifactPaths({
          ...f.proof,
          workOrder: undefined,
          evaluatedCommit: "HEAD",
        })),
      ]).toEqual([]);
      await expect(f.publish()).rejects.toMatchObject({ code: "E_VALIDATION" });
    } else {
      expect([...(await nativeQuarantineArtifactPaths(f.proof))]).toEqual([]);
      expect(await f.commit()).toBeNull();
      expect(mocks.commit).not.toHaveBeenCalled();
    }
  });

  it.each([{ broad: true }, { noSecurity: true }, { expired: true }])(
    "refuses missing exact live operator authority %j",
    async (options) => {
      const f = await fixture(options);
      expect([...(await nativeQuarantineArtifactPaths(f.proof))]).toEqual([]);
      expect(await f.commit()).toBeNull();
      expect(mocks.commit).not.toHaveBeenCalled();
      git(f.root, "add", "--", ...f.pair);
      git(f.root, "commit", "-m", "fixture unapproved quarantine pair");
      await expect(f.publish()).rejects.toMatchObject({
        code: "E_VALIDATION",
        context: { reason_code: "foreign_committed_task_artifacts" },
      });
    },
  );

  it("refuses a stale claim, wrong base, undeclared foreign files and changed raw backup", async () => {
    const f = await fixture();
    const stale = structuredClone(f.order);
    stale.canonical_binding!.claim_id = k.kernelDigest("different claim");
    expect([...(await nativeQuarantineArtifactPaths({ ...f.proof, workOrder: stale }))]).toEqual(
      [],
    );
    expect([
      ...(await nativeQuarantineArtifactPaths({
        ...f.proof,
        baseCommit: git(f.root, "rev-parse", "HEAD~2"),
      })),
    ]).toEqual([]);
    expect([
      ...(await nativeQuarantineArtifactPaths({
        ...f.proof,
        changedPaths: [...f.pair, `${path.dirname(f.readme)}/extra.json`],
      })),
    ]).toEqual([]);
    await writeFile(path.join(f.root, f.backup), f.source.replaceAll("\r\n", "\n"));
    expect([...(await nativeQuarantineArtifactPaths(f.proof))]).toEqual([]);
    expect(git(f.root, "rev-parse", "HEAD")).toBe(f.base);
    expect(mocks.commit).not.toHaveBeenCalled();
  });

  it.each(["backup-symlink", "backup-hardlink", "ancestor-symlink", "root-symlink"])(
    "refuses %s without changing the retained source",
    async (kind) => {
      const f = await fixture();
      let gitRoot = f.root;
      const backup = path.join(f.root, f.backup);
      if (kind === "backup-symlink") {
        await rename(backup, `${backup}.retained`);
        await symlink(`${backup}.retained`, backup);
      }
      if (kind === "backup-hardlink") await link(backup, path.join(f.root, "owned-test-link"));
      if (kind === "ancestor-symlink") {
        const directory = path.dirname(backup);
        await rename(directory, `${directory}.retained`);
        await symlink(`${directory}.retained`, directory);
      }
      if (kind === "root-symlink") {
        gitRoot = `${f.root}-alias`;
        aliases.push(gitRoot);
        await symlink(f.root, gitRoot);
      }
      expect([...(await nativeQuarantineArtifactPaths({ ...f.proof, gitRoot }))]).toEqual([]);
      expect(git(f.root, "show", `${f.base}:${f.readme}`)).toBe(f.source.trimEnd());
      expect(mocks.commit).not.toHaveBeenCalled();
    },
  );

  it("rechecks the native proof after staging and retains the commit intent on refusal", async () => {
    const f = await fixture();
    f.command.git.stage = async (files) => {
      git(f.root, "add", "--", ...files);
      await writeFile(path.join(f.root, f.backup), "changed during stage\n");
    };
    await expect(f.commit()).rejects.toThrow("Native quarantine artifacts changed");
    expect(mocks.commit).not.toHaveBeenCalled();
    expect(git(f.root, "rev-parse", "HEAD")).toBe(f.base);
    expect(
      JSON.parse(await readFile(path.join(f.directory, "repository-commit-intent.json"), "utf8")),
    ).toMatchObject({ changed_paths: f.pair });
    expect(await readFile(path.join(f.root, f.readme), "utf8")).toContain('status: "BLOCKED"');
  });

  it("rejects linked Git blobs and additional foreign history even after a valid pair is committed", async () => {
    const f = await fixture();
    await f.commit();
    await expect(f.publish()).resolves.toBeUndefined();
    await writeFile(path.join(f.root, path.dirname(f.readme), "extra.json"), "{}\n");
    git(f.root, "add", "--", `${path.dirname(f.readme)}/extra.json`);
    git(f.root, "commit", "-m", "fixture unapproved foreign file");
    await expect(f.publish()).rejects.toMatchObject({ code: "E_VALIDATION" });
    await rename(path.join(f.root, f.backup), path.join(f.root, "retained-backup"));
    await symlink(path.join(f.root, "retained-backup"), path.join(f.root, f.backup));
    git(f.root, "add", "--", f.backup);
    git(f.root, "commit", "-m", "fixture linked backup blob");
    expect([
      ...(await nativeQuarantineArtifactPaths({
        ...f.proof,
        evaluatedCommit: f.branch,
        workOrder: undefined,
      })),
    ]).toEqual([]);
  });
});
