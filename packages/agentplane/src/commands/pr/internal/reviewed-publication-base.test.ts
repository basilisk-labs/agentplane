import { execFile } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, expect, it, vi } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  aggregate,
  authority,
  plan,
} from "../../../../../core/src/tasks/task-kernel/kernel.test-fixtures.js";
import {
  makeKernelRecord,
  readKernelRecord,
} from "../../../adapters/task-backend/kernel-record.js";
import type { TaskData } from "../../../backends/task-backend.js";
import type * as TaskBackend from "../../shared/task-backend.js";
import type * as ChangeRequestProvider from "./change-request-provider.js";
import { resolveLogicalRepositoryIdentity } from "../../task/execution-authority-context.js";
import { observeKernelRepository } from "../../../runner/observation/kernel-repository.js";

const port = vi.hoisted(() => ({ remote: "", task: null as unknown }));
vi.mock("../../shared/task-backend.js", async (original) => ({
  ...(await original<typeof TaskBackend>()),
  loadBackendTask: () => Promise.resolve({ task: port.task }),
}));
vi.mock("./change-request-provider.js", async (original) => ({
  ...(await original<typeof ChangeRequestProvider>()),
  resolveChangeRequestIdentity: () =>
    Promise.reject(new Error("no provider needed for local projection")),
  tryLookupExistingChangeRequestByBranch: () => Promise.resolve(null),
}));
vi.mock("./git-host-identity.js", () => ({
  resolveGitHostIdentity: () => Promise.resolve({ targetUrl: port.remote }),
}));
import { ensurePrArtifactsSynced, syncPrArtifacts } from "./sync.js";
import { resolveReviewedPublicationBase } from "./reviewed-publication-base.js";

const exec = promisify(execFile);
const roots: string[] = [];
const git = async (root: string, ...args: string[]) => {
  const result = await exec("git", args, { cwd: root });
  return result.stdout.trim();
};
afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "reviewed-publication-"));
  roots.push(root);
  await git(root, "init", "-b", "main");
  await git(root, "config", "user.name", "Fixture");
  await git(root, "config", "user.email", "fixture@example.com");
  await git(root, "config", "agentplane.baseBranch", "main");
  await writeFile(path.join(root, "source.ts"), "old\n");
  await git(root, "add", ".");
  await git(root, "commit", "-m", "old base");
  const old = await git(root, "rev-parse", "HEAD");
  await git(root, "checkout", "-b", "task/202610101212-RDPWEM/repair");
  await writeFile(path.join(root, "source.ts"), "reviewed\n");
  await git(root, "add", ".");
  await git(root, "commit", "-m", "reviewed import");
  const head = await git(root, "rev-parse", "HEAD");
  port.remote = path.join(root, "remote.git");
  // The mock isolates only provider URL discovery. The live ref query uses real Git.
  await git(root, "init", "--bare", port.remote);
  await git(root, "push", port.remote, `${head}:refs/heads/main`);
  await writeFile(path.join(root, ".git", "info", "exclude"), "remote.git/\n");
  const identity = (await resolveLogicalRepositoryIdentity({
    git_root: root,
    task: {},
    create_if_missing: true,
  })) as k.Sha256Digest;
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  const command = {
    resolvedProject: { gitRoot: root, agentplaneDir: path.join(root, ".agentplane") },
    config,
    memo: {},
    taskBackend: { getTask: () => Promise.resolve(port.task), writeTask: vi.fn() },
  } as unknown as TaskBackend.CommandContext;
  const observation = await observeKernelRepository({
    repository_root: root,
    repository_identity: identity,
    operational_paths: [
      config.paths.workflow_dir,
      config.paths.tasks_path,
      config.paths.worktrees_dir,
    ],
  });
  const approved = { ...plan, approval_actor_id: "USER" };
  const parentContents = {
    ...authority,
    task_id: "202610101212-RDPWEM",
    repository_identity: identity,
    provenance: { ...authority.provenance, actor_id: "USER" },
  };
  const parent = { ...parentContents, digest: k.authorityDigest(parentContents) };
  const state = aggregate({
    id: "202610101212-RDPWEM",
    current_plan: approved,
    authority_lineage: [{ authority: parent, approval_mode: "manual_operator", observation: null }],
  });
  const contents = {
    ...parent,
    repository_fingerprint: observation.fingerprint,
    policy_digests: [k.kernelDigest("new policy")],
    provenance: { ...parent.provenance, actor_id: "USER", parent_authority_digest: parent.digest },
  };
  const renewed = { ...contents, digest: k.authorityDigest(contents) };
  const reviewed = {
    old_commit: old,
    new_commit: head,
    checkpoint_digest: parent.repository_fingerprint,
    work_order_digest: k.kernelDigest("retained work order"),
    canonical_record_digest: k.kernelDigest("retained record"),
    mutation_receipt_digest: k.kernelDigest("begin receipt"),
    overlay_digest: k.kernelDigest([]),
    imported_paths: ["source.ts"],
  };
  const request = k.policyRenewalRequestDigest({
    task_revision: state.revision,
    parent,
    repository_fingerprint: observation.fingerprint,
    policy_digests: renewed.policy_digests,
    changed_paths: ["source.ts"],
    repository_evidence_digest: k.kernelDigest("repository evidence"),
    reviewed_base_import: reviewed,
  });
  const record: k.CanonicalAuthorityRecord = {
    authority: renewed,
    approval_mode: "manual_operator",
    observation: {
      kind: "policy_renewal",
      previous_fingerprint: parent.repository_fingerprint,
      changed_paths: ["source.ts"],
      request_task_revision: state.revision,
      request_digest: request,
      evidence_digest: k.policyRenewalApprovalEvidence({
        request_digest: request,
        actor_id: "USER",
      }),
      repository_evidence_digest: k.kernelDigest("repository evidence"),
      reviewed_base_import: reviewed,
    },
  };
  const reduction = k.reduceTaskCommand({
    aggregate: state,
    command: {
      kind: "renew_policy_authority",
      task_id: state.id,
      expected_task_revision: state.revision,
      expected_state_fingerprint: observation.fingerprint,
      record,
    },
    actor: { id: "USER", kind: "USER", transport: "manual", capabilities: [] },
    authority: null,
    repository_fingerprint: observation.fingerprint,
    occurred_at: "2026-10-10T10:00:00.000Z",
    mutation_id: "renew",
  });
  expect(reduction.kind).toBe("accepted");
  if (reduction.kind !== "accepted") throw new Error(JSON.stringify(reduction));
  const current = reduction.aggregate;
  const evidence = {
    binding: {
      task_id: state.id,
      plan_digest: approved.digest,
      repository_fingerprint: observation.fingerprint,
      evaluator_target: head,
      commands: ["test"],
    },
    checks: { status: "passed", checks: [{ exit_code: 0 }] },
  };
  current.final_validation = {
    status: "PASSED",
    identity: {
      implementation_identity: observation.fingerprint,
      command_digest: k.kernelDigest(evidence.binding.commands),
      check_id: "final",
      toolchain_digest: k.kernelDigest("tools"),
      environment_digest: k.kernelDigest("env"),
    },
    evidence_digests: [k.kernelDigest(evidence)],
    observed_at: "2026-10-10T10:01:00.000Z",
  };
  const task: TaskData = {
    id: state.id,
    title: "Fixture",
    description: "Native routing",
    status: "DOING",
    owner: "CODER",
    priority: "high",
    tags: [],
    depends_on: [],
    extensions: {
      task_kernel: makeKernelRecord(identity, current, reduction.events),
      task_execution_context: { base_ref: old, base_sha: old },
    },
  };
  port.task = task;
  expect(readKernelRecord(task, identity).kind).toBe("canonical");
  const directory = path.join(root, ".git/agentplane/kernel/exchanges", state.id, "a".repeat(64));
  await mkdir(directory, { recursive: true });
  const evidencePath = path.join(directory, "final-validation.json");
  await writeFile(evidencePath, JSON.stringify(evidence));
  const options = { command, task, branch: "task/202610101212-RDPWEM/repair", fallback: old };
  return {
    root,
    old,
    head,
    identity,
    current,
    task,
    evidencePath,
    options,
    persist: () => {
      const { digest: _digest, ...stored } = task.extensions!.task_kernel as ReturnType<
        typeof makeKernelRecord
      >;
      const modified = { ...stored, aggregate: current };
      task.extensions!.task_kernel = { ...modified, digest: k.kernelDigest(modified) };
    },
  };
}

it("derives an immutable comparison from genuine renewal, retained validation and live remote while local main stays old", async () => {
  const f = await fixture();
  const before = structuredClone(f.task);
  expect(await git(f.root, "rev-parse", "main")).toBe(f.old);
  await expect(resolveReviewedPublicationBase(f.options)).resolves.toEqual({
    comparisonBase: f.head,
    providerBase: "main",
  });
  expect(f.task).toEqual(before);
});

it.each(["parent", "checkpoint", "head", "validation", "artifact", "remote", "source"] as const)(
  "rejects %s drift without changing task or evidence",
  async (kind) => {
    const f = await fixture();
    if (kind === "parent")
      f.current.authority_lineage!.at(-1)!.authority.provenance.parent_authority_digest =
        k.kernelDigest("foreign");
    if (kind === "checkpoint")
      f.current.authority_lineage!.at(-1)!.observation!.reviewed_base_import!.checkpoint_digest =
        k.kernelDigest("foreign");
    if (kind === "validation") f.current.final_validation!.status = "FAILED";
    if (["parent", "checkpoint", "validation"].includes(kind)) f.persist();
    if (kind === "head") await git(f.root, "commit", "--allow-empty", "-m", "unverified head");
    if (kind === "source") await writeFile(path.join(f.root, "source.ts"), "unverified edit\n");
    if (kind === "artifact") await writeFile(f.evidencePath, "{}");
    if (kind === "remote")
      await git(f.root, "push", "--force", port.remote, `${f.old}:refs/heads/main`);
    const before = JSON.stringify(f.task);
    const bytes = await readFile(f.evidencePath, "utf8");
    await expect(resolveReviewedPublicationBase(f.options)).rejects.toThrow();
    expect(JSON.stringify(f.task)).toBe(before);
    expect(await readFile(f.evidencePath, "utf8")).toBe(bytes);
  },
);

it("leaves ordinary frozen-base tasks unchanged", async () => {
  const f = await fixture();
  delete f.task.extensions!.task_kernel;
  await expect(resolveReviewedPublicationBase(f.options)).resolves.toBeNull();
});

it("uses the authenticated comparison in real open/update/ensure projection without rewriting frozen provenance", async () => {
  const f = await fixture();
  const frozen = structuredClone(f.task.extensions!.task_execution_context);
  const options = {
    ctx: f.options.command,
    cwd: f.root,
    taskId: f.task.id,
    branch: f.options.branch,
  };
  const opened = await syncPrArtifacts({ ...options, mode: "open", remoteMode: "sync-only" });
  expect(opened.meta.base).toBe("main");
  const updated = await ensurePrArtifactsSynced(options);
  expect(updated?.branch).toBe(options.branch);
  const pr = path.join(f.root, f.options.command.config.paths.workflow_dir, f.task.id, "pr");
  const diffstat = await readFile(path.join(pr, "diffstat.txt"), "utf8");
  expect(diffstat.trim()).toBe("");
  const metadata = JSON.parse(await readFile(path.join(pr, "meta.json"), "utf8")) as {
    base: string;
  };
  expect(metadata.base).toBe("main");
  expect(f.task.extensions!.task_execution_context).toEqual(frozen);
  // A later artifact commit is deliberately not authenticated by the import receipt.
  await git(f.root, "add", f.options.command.config.paths.workflow_dir);
  await git(f.root, "commit", "-m", "subsequent closure artifacts");
  await expect(ensurePrArtifactsSynced(options)).rejects.toThrow("does not reach current HEAD");
});
