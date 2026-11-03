import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanGitEnv, tempRepo } from "@agentplane/testkit";
import { defaultConfig } from "@agentplaneorg/core/config";
import {
  createLegacyTaskAggregate,
  parseTaskReadme,
  renderTaskReadme,
  taskKernel as k,
  withTaskCentricAggregate,
} from "@agentplaneorg/core/tasks";
import {
  createLifecycleOwnerMigrationQuarantineMarker,
  type LifecycleOwnerMigrationQuarantine,
} from "../task/migration-apply-conversion.js";
import { previewLifecycleOwnerMigration } from "../task/migration-preview.js";
import { quarantineAfterimage } from "../task/migration-quarantine.js";
import { LocalBackend, type TaskData } from "../../backends/task-backend.js";
import { KernelBackendAdapter } from "../../adapters/task-backend/kernel-backend-adapter.js";
import { makeKernelRecord, readKernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { KernelTaskLifecycle } from "../../runner/usecases/kernel-task-lifecycle.js";
import { resolveTaskExecutionContract } from "../../runtime/task-routing/resolve.js";
import { buildKernelAgentWorkOrder } from "../task/kernel-work-order.js";
import { resolveLogicalRepositoryIdentity } from "../task/execution-authority-context.js";
import type { CommandContext } from "./task-backend.js";
import {
  nativeQuarantineArtifactPair,
  nativeQuarantineArtifactPaths,
} from "./native-quarantine-artifact-proof.js";

const mocks = vi.hoisted(() => ({ commit: vi.fn(), hook: vi.fn(), prepare: vi.fn() }));
vi.mock("../guard/impl/commit.js", () => ({ cmdCommit: mocks.commit }));
vi.mock("./hook-shim-template.js", () => ({ assertHookRunnerReady: mocks.hook }));
vi.mock("../task/direct-task-supervisor-implementation.js", () => ({
  prepareDirectImplementationEvidence: mocks.prepare,
}));
import { commitCanonicalImplementation } from "../task/kernel-repository-coordinator.js";

const taskId = "202611010001-QSRCE1";
const repositoryIdentity = k.kernelDigest("repository");
function fixture(identity = repositoryIdentity) {
  const aggregate = createLegacyTaskAggregate({
    id: taskId,
    revision: 2,
    title: "Retain historical work",
    description: "Preserve exact bytes",
    status: "DOING",
    acceptance_criteria: ["Retained"],
    captured_at: "2026-09-01T00:00:00Z",
    updated_at: "2026-09-01T00:00:00Z",
  });
  const source = renderTaskReadme(
    {
      id: taskId,
      revision: 3,
      status: "DOING",
      title: "Historical task",
      owner: "CODER",
      extensions: withTaskCentricAggregate({ retained: { result: "unknown" } }, aggregate),
    },
    "# Historical evidence\n\nСохранить точные байты.\n",
  )
    .replace("---\n", "---\n# Original source comment\n")
    .replaceAll("\n", "\r\n");
  const preview = previewLifecycleOwnerMigration(Buffer.from(source, "utf8"));
  const contents = {
    schema_version: 1 as const,
    kind: "lifecycle_owner_migration_quarantine" as const,
    task_id: taskId,
    repository_identity: identity,
    backend_identity: "local-task-readme-v1",
    source_digest: preview.source_digest,
    source_revision: preview.source_revision,
    mapping_version: preview.mapping_version,
    mapping_digest: k.kernelDigest(preview.mapping),
    mapping_receipt: preview.mapping,
    semantic_assessment_request: preview.semantic_assessment,
    reason: "source_revision_mismatch",
    backup_digest: preview.source_digest,
    backup_location: `${taskId}/migration-${preview.source_digest.slice(7)}.source`,
    output_revision: preview.source_revision + 1,
  };
  const marker = createLifecycleOwnerMigrationQuarantineMarker(contents);
  return {
    source,
    contents,
    marker,
    input: {
      taskId,
      repositoryIdentity: identity,
      workflowDir: ".agentplane/tasks",
      source,
      afterimage: quarantineAfterimage(source, marker),
      backup: source,
    },
  };
}

describe("native quarantine byte projection", () => {
  it("admits only the exact BLOCKED projection and content-addressed raw backup", () => {
    const f = fixture();
    const before = JSON.stringify(f);
    expect(nativeQuarantineArtifactPair(f.input)).toEqual([
      `.agentplane/tasks/${taskId}/README.md`,
      `.agentplane/tasks/${f.marker.backup_location}`,
    ]);
    const after = parseTaskReadme(f.input.afterimage);
    expect(after.frontmatter.status).toBe("BLOCKED");
    expect(after.frontmatter.extensions?.retained).toEqual({ result: "unknown" });
    expect(f.input.backup).toContain("\r\n# Original source comment\r\n");
    expect(JSON.stringify(f)).toBe(before);
  });

  it.each([
    ["repository_identity", k.kernelDigest("other repository")],
    ["backend_identity", "other-backend"],
    ["task_id", "202611010002-QTHER2"],
    ["source_revision", 4],
    ["mapping_version", "unreviewed-version"],
    ["reason", "different-quarantine"],
    ["backup_location", "../outside.source"],
    ["output_revision", 5],
    ["semantic_assessment_request", { unreviewed: true }],
  ])("rejects a rehashed marker with changed %s", (key, value) => {
    const f = fixture();
    const marker = createLifecycleOwnerMigrationQuarantineMarker({ ...f.contents, [key]: value });
    expect(
      nativeQuarantineArtifactPair({
        ...f.input,
        afterimage: quarantineAfterimage(f.source, marker),
      }),
    ).toBeNull();
  });

  it("recomputes the source digest and mapping rather than trusting rehashed marker claims", () => {
    const f = fixture();
    for (const changes of [
      {
        source_digest: k.kernelDigest("other source"),
        backup_digest: k.kernelDigest("other source"),
      },
      { mapping_receipt: { other: true }, mapping_digest: k.kernelDigest({ other: true }) },
    ]) {
      const marker = createLifecycleOwnerMigrationQuarantineMarker({ ...f.contents, ...changes });
      expect(
        nativeQuarantineArtifactPair({
          ...f.input,
          afterimage: quarantineAfterimage(f.source, marker),
        }),
      ).toBeNull();
    }
  });

  it("refuses byte-normalized backups, altered bodies, promotion and new outer fields", () => {
    const f = fixture();
    const parsed = parseTaskReadme(f.input.afterimage);
    const altered = [
      { ...f.input, backup: f.source.replaceAll("\r\n", "\n") },
      { ...f.input, afterimage: `${f.input.afterimage}\nextra history\n` },
      ...["DONE", "CANCELLED"].map((status) => ({
        ...f.input,
        afterimage: renderTaskReadme({ ...parsed.frontmatter, status }, parsed.body),
      })),
      {
        ...f.input,
        afterimage: renderTaskReadme(
          { ...parsed.frontmatter, verification: { state: "ok", note: "unreviewed promotion" } },
          parsed.body,
        ),
      },
    ];
    for (const input of altered) expect(nativeQuarantineArtifactPair(input)).toBeNull();
    expect(f.input.afterimage).toBe(quarantineAfterimage(f.source, f.marker));
  });

  it("requires a genuine revision split and a valid native marker digest", () => {
    const f = fixture();
    const matchingRevision = f.source.replace("revision: 3", "revision: 2");
    expect(
      nativeQuarantineArtifactPair({
        ...f.input,
        source: matchingRevision,
        backup: matchingRevision,
      }),
    ).toBeNull();
    const marker: LifecycleOwnerMigrationQuarantine = {
      ...f.marker,
      quarantine_digest: k.kernelDigest("forged"),
    };
    expect(
      nativeQuarantineArtifactPair({
        ...f.input,
        afterimage: quarantineAfterimage(f.source, marker),
      }),
    ).toBeNull();
  });

  it("supports a configured Task directory and refuses traversal or invalid Task IDs", () => {
    const f = fixture();
    expect(nativeQuarantineArtifactPair({ ...f.input, workflowDir: "state/task-records" })).toEqual(
      [`state/task-records/${taskId}/README.md`, `state/task-records/${f.marker.backup_location}`],
    );
    for (const workflowDir of [
      "../tasks",
      "/tmp/tasks",
      "tasks/../outside",
      "tasks//records",
      "tasks\\records",
    ]) {
      expect(nativeQuarantineArtifactPair({ ...f.input, workflowDir })).toBeNull();
    }
    expect(nativeQuarantineArtifactPair({ ...f.input, taskId: "../foreign" })).toBeNull();
  });
});

const repositories: Awaited<ReturnType<typeof tempRepo>>[] = [];
afterEach(async () => {
  await Promise.all(repositories.splice(0).map((repo) => repo.cleanup()));
});
beforeEach(() => vi.resetAllMocks());

function git(root: string, ...args: string[]): string {
  const result = spawnSync("git", ["-c", "core.hooksPath=/dev/null", ...args], {
    cwd: root,
    env: cleanGitEnv(),
    encoding: "utf8",
  });
  expect(result.status, result.stdout + result.stderr).toBe(0);
  return result.stdout.trimEnd();
}

async function startedFixture(workflowDir = ".agentplane/tasks") {
  const repo = await tempRepo({ branch: "main" });
  repositories.push(repo);
  git(repo.root, "commit", "--allow-empty", "-m", "fixture repository");
  const identity = (await resolveLogicalRepositoryIdentity({
    git_root: repo.root,
    task: { extensions: {} },
    create_if_missing: false,
  })) as k.Sha256Digest;
  const f = fixture(identity);
  const primaryId = "202611030001-QBEG12";
  const foreignRoot = `${workflowDir}/${taskId}`;
  const readme = `${foreignRoot}/README.md`;
  const backup = `${workflowDir}/${f.marker.backup_location}`;
  const primaryPath = `${workflowDir}/${primaryId}/README.md`;
  const requirements = {
    scope_roots: [foreignRoot],
    repository_effects: ["repository_write", "security_boundary"],
    external_effects: [],
    capabilities: ["repository_write"],
    resources: [],
  };
  const contract = {
    objective: "Publish the exact native quarantine after execution starts",
    acceptance_criteria: ["Retain the BLOCKED source and its exact raw backup"],
    verification_commands: ["focused"],
    role: "EXECUTOR" as const,
  };
  const definition = {
    id: "quarantine",
    depends_on: [],
    required_inputs: [],
    expected_outputs: ["proof"],
    optional: false,
    execution_requirements: requirements,
    contract_digest: k.kernelDigest(contract),
  };
  const plan: k.PlanRecord = {
    revision: 1,
    digest: k.kernelDigest({ revision: 1, work_items: [definition] }),
    state: "APPROVED",
    approval_actor_id: "USER",
    approval_evidence_digest: k.kernelDigest("fixture explicit scope approval"),
    work_items: [definition],
  };
  const fingerprint = k.kernelDigest("fixture repository observation");
  const parentContents = {
    ...requirements,
    task_id: primaryId,
    plan_revision: 1,
    plan_digest: plan.digest,
    work_item_id: null,
    repository_identity: identity,
    repository_fingerprint: fingerprint,
    validation_requirements: [],
    policy_digests: [],
    completion_requirements: [],
    risk: {
      requirements: "bounded",
      implementation: "bounded",
      reversibility: "reversible",
    } as const,
    provenance: {
      kind: "USER" as const,
      actor_id: "USER",
      evidence_digest: plan.approval_evidence_digest!,
      parent_authority_digest: null,
    },
    expires_at: null,
  };
  const parent = { ...parentContents, digest: k.authorityDigest(parentContents) };
  const authorityContents = {
    ...parent,
    work_item_id: definition.id,
    provenance: {
      ...parent.provenance,
      kind: "DELEGATED" as const,
      actor_id: "fixture-executor",
      parent_authority_digest: parent.digest,
    },
  };
  const authority = { ...authorityContents, digest: k.authorityDigest(authorityContents) };
  const claim = k.kernelDigest("fixture current claim");
  const intent = { objective: contract.objective, context: "Isolated native begin regression" };
  const aggregate: k.TaskAggregate = {
    schema_version: 1,
    id: primaryId,
    revision: 7,
    state: "ACTIVE",
    intent_digest: k.kernelDigest(intent),
    current_plan: plan,
    plan_history: [],
    authority_lineage: [{ authority: parent, approval_mode: "manual_operator", observation: null }],
    work_items: {
      quarantine: {
        definition,
        state: "CLAIMED",
        revision: 2,
        attempt: 1,
        claim_id: claim,
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
  const record = makeKernelRecord(identity, aggregate, [], {
    intent,
    contracts: { [definition.contract_digest]: contract },
  });
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  const primary = {
    id: primaryId,
    title: "Native start quarantine fixture",
    description: intent.context,
    owner: "CODER",
    priority: "high",
    tags: ["ops"],
    depends_on: [],
    verify: [],
    revision: 7,
    status: "DOING",
    task_kind: "ops",
    mutation_scope: "ops",
    execution_contract: resolveTaskExecutionContract({
      config,
      task: {},
      declaration: {
        schema_version: 2,
        preferred_mode: "branch_pr",
        scope_roots: requirements.scope_roots,
        repository_effects: requirements.repository_effects,
        external_effects: requirements.external_effects,
        requirements_uncertainty: "bounded",
        implementation_uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["Isolated native start regression"],
      },
    }),
    extensions: { task_kernel: record },
  } as unknown as TaskData;
  primary.execution_contract!.authority.allowed_capabilities = requirements.capabilities;
  const backend = new LocalBackend({ dir: path.join(repo.root, workflowDir) });
  await backend.writeTask(primary);
  await mkdir(path.dirname(path.join(repo.root, readme)), { recursive: true });
  await writeFile(path.join(repo.root, readme), f.source);
  await writeFile(path.join(repo.root, "user.txt"), "original user data\n");
  git(repo.root, "add", "--all");
  git(repo.root, "commit", "-m", "fixture claimed task and historical source");
  const base = git(repo.root, "rev-parse", "HEAD");
  const branch = `task/${primaryId}/native-start`;
  git(repo.root, "switch", "-c", branch);
  await writeFile(path.join(repo.root, readme), f.input.afterimage);
  await writeFile(path.join(repo.root, backup), f.source);
  await writeFile(path.join(repo.root, "user.txt"), "unrelated dirty user data\n");
  const adapter = new KernelBackendAdapter(backend, identity);
  const lifecycle = new KernelTaskLifecycle(adapter);
  const actor = {
    id: "fixture-executor",
    kind: "AGENT",
    transport: "manual",
    capabilities: ["repository_write"],
  } as const;
  const input = {
    mutation_id: "fixture-native-begin",
    actor,
    authority,
    repository_fingerprint: fingerprint,
    occurred_at: "2026-11-03T00:00:00.000Z",
    command: {
      kind: "transition_work_item" as const,
      task_id: primaryId,
      expected_task_revision: 7,
      expected_state_fingerprint: fingerprint,
      work_item_id: definition.id,
      claim_id: claim,
      action: "begin" as const,
    },
  };
  const before = await adapter.read(primaryId);
  if (before.kind !== "canonical") throw new Error("Claimed fixture is not canonical");
  const started = await lifecycle.begin(input);
  expect(started.result.kind, JSON.stringify(started.result)).toBe("committed");
  if (started.result.kind !== "committed" || !started.work_order)
    throw new Error("Native begin failed");
  const command = {
    resolvedProject: { gitRoot: repo.root },
    backendId: "local",
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
  const order = await buildKernelAgentWorkOrder({
    command,
    record: before.record,
    implementation: started.work_order,
    context: {
      task_id: primaryId,
      task_revision: 7,
      mutation_id: "fixture-issuance",
      repository_identity: identity,
      repository_fingerprint: fingerprint,
      actor,
      occurred_at: input.occurred_at,
      approval_receipts: { trusted_issuers: [], max_ttl_minutes: 15, clock_skew_seconds: 0 },
      ceiling: parent,
    },
  });
  expect(order.task.revision).toBe(7);
  expect(started.result.record.aggregate.revision).toBe(8);
  const directory = await mkdtemp(path.join(repo.root, ".git/native-start-"));
  await writeFile(
    path.join(directory, "repository-baseline.json"),
    JSON.stringify({
      schema_version: 1,
      kind: "canonical_repository_baseline",
      task_id: primaryId,
      work_item_id: definition.id,
      task_revision: 7,
      work_order_id: order.work_order_id,
      checkout: repo.root,
      branch,
      head: base,
      tree: git(repo.root, "rev-parse", "HEAD^{tree}"),
      status: {
        command: "git status --short --untracked-files=all",
        lines: git(repo.root, "status", "--short", "--untracked-files=all").split("\n"),
      },
    }),
  );
  mocks.commit.mockImplementation(() => {
    git(repo.root, "commit", "-m", "fixture quarantine after native start");
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
  const proof = {
    gitRoot: repo.root,
    baseCommit: base,
    primaryTaskId: primaryId,
    workflowDir,
    changedPaths: [readme, backup],
    workOrder: order,
  };
  return {
    ...repo,
    proof,
    order,
    input,
    primary,
    primaryPath,
    record: started.result.record,
    backend,
    adapter,
    commit: () =>
      commitCanonicalImplementation({ command, directory, work_order: order, changed_paths: [] }),
    rewrite: async (next: typeof record) => {
      const current = (await backend.getTask(primaryId))!;
      const body = parseTaskReadme(await readFile(path.join(repo.root, primaryPath), "utf8")).body;
      await writeFile(
        path.join(repo.root, primaryPath),
        renderTaskReadme(
          {
            ...current,
            revision: next.aggregate.revision,
            extensions: { ...current.extensions, task_kernel: next },
          },
          body,
        ),
      );
      expect(readKernelRecord((await backend.getTask(primaryId))!, identity).kind).toBe(
        "canonical",
      );
    },
  };
}

describe("native quarantine after real issuance and execution start", () => {
  it.each([".agentplane/tasks", "state/task-records"])(
    "admits the exact native start under %s",
    async (workflowDir) => {
      const f = await startedFixture(workflowDir);
      const immutable = JSON.stringify(f.order);
      expect([...(await nativeQuarantineArtifactPaths(f.proof))].toSorted()).toEqual(
        f.proof.changedPaths.toSorted(),
      );
      expect(JSON.stringify(f.order)).toBe(immutable);
    },
  );

  it.each([".agentplane/tasks", "state/task-records"])(
    "commits the retained native pair after begin under %s",
    async (workflowDir) => {
      const f = await startedFixture(workflowDir);
      expect(await f.commit()).toMatchObject({
        base_commit: f.proof.baseCommit,
        changed_paths: f.proof.changedPaths.toSorted(),
      });
      expect(await readFile(path.join(f.root, "user.txt"), "utf8")).toBe(
        "unrelated dirty user data\n",
      );
    },
  );

  it.each([
    ["claim_id", k.kernelDigest("stale claim")],
    ["attempt", 2],
    ["contract_digest", k.kernelDigest("changed contract")],
    ["plan_digest", k.kernelDigest("changed plan")],
    ["repository_identity", k.kernelDigest("other repository")],
    ["repository_fingerprint", k.kernelDigest("other observation")],
    ["authority_digest", k.kernelDigest("other issued authority")],
  ])("refuses an altered issued %s after native begin", async (key, value) => {
    const f = await startedFixture();
    const changed = structuredClone(f.order);
    (changed.canonical_binding as Record<string, unknown>)[key] = value;
    expect([...(await nativeQuarantineArtifactPaths({ ...f.proof, workOrder: changed }))]).toEqual(
      [],
    );
  });

  it("requires retained native begin evidence rather than a revision increment alone", async () => {
    const f = await startedFixture();
    await f.rewrite(
      makeKernelRecord(
        f.record.repository_identity,
        { ...f.record.aggregate, mutation_receipts: {} },
        [],
        f.record.documents,
      ),
    );
    expect([...(await nativeQuarantineArtifactPaths(f.proof))]).toEqual([]);
  });

  it("refuses a rehashed receipt for a different transition", async () => {
    const f = await startedFixture();
    const command = { ...f.input.command, action: "claim" };
    const event = { ...f.record.events[0]!, command_digest: k.kernelDigest(command) };
    const receipt = {
      ...f.record.aggregate.mutation_receipts[f.input.mutation_id]!,
      command_digest: event.command_digest,
      event_digests: [k.kernelDigest(event)],
    };
    await f.rewrite(
      makeKernelRecord(
        f.record.repository_identity,
        { ...f.record.aggregate, mutation_receipts: { [f.input.mutation_id]: receipt } },
        [event],
        f.record.documents,
      ),
    );
    expect([...(await nativeQuarantineArtifactPaths(f.proof))]).toEqual([]);
  });

  it("authenticates the exact issued beforeimage even when start and aggregate digests are rehashed", async () => {
    const f = await startedFixture();
    const aggregate = {
      ...f.record.aggregate,
      audit_comments: [
        {
          author: "USER",
          actor_id: "USER",
          body: "unrecorded change",
          occurred_at: f.input.occurred_at,
          mutation_id: "forged-history",
        },
      ],
      mutation_receipts: {},
    };
    const receipt = {
      ...f.record.aggregate.mutation_receipts[f.input.mutation_id]!,
      aggregate_digest: k.kernelDigest(aggregate),
    };
    await f.rewrite(
      makeKernelRecord(
        f.record.repository_identity,
        { ...aggregate, mutation_receipts: { [f.input.mutation_id]: receipt } },
        f.record.events,
        f.record.documents,
      ),
    );
    expect([...(await nativeQuarantineArtifactPaths(f.proof))]).toEqual([]);
  });

  it("refuses an unrelated native Task write after execution starts", async () => {
    const f = await startedFixture();
    const result = await f.adapter.execute({
      ...f.input,
      actor: { ...f.input.actor, kind: "SYSTEM", capabilities: ["task.audit"] },
      mutation_id: "fixture-intervening-audit",
      command: {
        kind: "append_audit_comment",
        task_id: f.primary.id,
        expected_task_revision: 8,
        expected_state_fingerprint: f.input.repository_fingerprint,
        author: "TESTER",
        body: "A later native Task write changes the issued boundary.",
      },
    });
    expect(result.kind, JSON.stringify(result)).toBe("committed");
    expect([...(await nativeQuarantineArtifactPaths(f.proof))]).toEqual([]);
  });

  it.each([
    [".agentplane/tasks", "rejected"],
    ["state/task-records", "rejected"],
    [".agentplane/tasks", "committed"],
    ["state/task-records", "committed"],
  ])(
    "retains the issued-start proof under %s after a %s hook outcome",
    async (workflowDir, interruption) => {
      const f = await startedFixture(workflowDir);
      if (interruption === "rejected") mocks.commit.mockResolvedValueOnce(1);
      else
        mocks.commit.mockImplementationOnce(() => {
          git(f.root, "commit", "-m", "fixture native commit before interruption");
          throw new Error("fixture interrupted after native commit");
        });
      await expect(f.commit()).rejects.toThrow(
        interruption === "rejected"
          ? "Canonical implementation commit exited 1"
          : "fixture interrupted after native commit",
      );
      const head = git(f.root, "rev-parse", "HEAD");
      expect(await f.commit()).toMatchObject({ changed_paths: f.proof.changedPaths.toSorted() });
      expect(mocks.commit).toHaveBeenCalledTimes(interruption === "rejected" ? 2 : 1);
      if (interruption === "committed") expect(git(f.root, "rev-parse", "HEAD")).toBe(head);
      expect(await readFile(path.join(f.root, "user.txt"), "utf8")).toBe(
        "unrelated dirty user data\n",
      );
    },
  );
});
