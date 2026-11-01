import { execFileSync } from "node:child_process";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, expect, it } from "vitest";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  writeConfig,
} from "@agentplane/testkit";
import {
  createLegacyTaskAggregate,
  renderTaskReadme,
  taskKernel as k,
  withTaskCentricAggregate,
} from "@agentplaneorg/core/tasks";
import {
  buildAgentWorkOrderV2ValidFixture,
  buildStateFingerprint,
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  stopSupervisorExecutionEpisode,
  validateAgentWorkOrderV2,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";
import { loadCommandContext } from "../commands/shared/task-backend.js";
import {
  createSupervisorEpisodeStore,
  tryAcquireSupervisorExecutionLease,
} from "../commands/shared/supervisor-execution-episode.js";
import { resolveLogicalRepositoryIdentity } from "../commands/task/execution-authority-context.js";
import {
  externalAgentIssueDigest,
  externalAgentExchangeDigest,
  externalAgentResultDigest,
  resolveExternalAgentExchangePaths,
  validateExternalAgentResultEnvelope,
  type ExternalAgentExchange,
} from "../commands/task/external-agent-exchange.js";
import { acceptExternalAgentResult } from "../commands/task/external-agent-supervisor.js";
import {
  previewStaleAdmissionRetirement,
  retireStaleAdmission,
} from "../commands/task/stale-admission-retirement.js";
import { retirementJournalPath } from "../commands/task/stale-admission-retirement-validation.js";

installRunCliIntegrationHarness();
const roots: string[] = [];
afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});
async function cli(root: string, args: string[]) {
  const io = captureStdIO();
  try {
    const code = await runCli([...args, "--root", root]);
    return { code, stdout: io.stdout, stderr: io.stderr };
  } finally {
    io.restore();
  }
}
async function fixture(received = false, custom = false, legacy = false) {
  const root = await mkGitRepoRootWithBranch("main");
  roots.push(root);
  execFileSync("git", ["commit", "--allow-empty", "-m", "fixture baseline"], { cwd: root });
  const config = defaultConfig();
  config.paths.workflow_dir = custom ? "archive/tasks" : ".agentplane/tasks";
  config.paths.worktrees_dir = custom ? "isolated/worktrees" : ".agentplane/worktrees";
  await writeConfig(root, config);
  const id = "202611010000-RET001";
  const owner = path.join(root, config.paths.worktrees_dir, id + "-historical");
  await mkdir(path.dirname(owner), { recursive: true });
  const source = renderTaskReadme(
    {
      schema_version: 1,
      doc_version: 3,
      doc_updated_at: "2026-09-01T00:00:00Z",
      doc_updated_by: "TEST",
      id,
      title: "Retained historical intent",
      description: "Preserve every byte and pending WorkItem.",
      status: "DOING",
      priority: "med",
      owner: "CODER",
      tags: ["meta"],
      depends_on: [],
      revision: 3,
      extensions: withTaskCentricAggregate(
        {},
        {
          ...createLegacyTaskAggregate({
            id,
            revision: 2,
            title: "Retained historical intent",
            description: "Preserve every byte and pending WorkItem.",
            status: "DOING",
            acceptance_criteria: ["Preserve history"],
            captured_at: "2026-09-01T00:00:00Z",
            updated_at: "2026-09-01T00:00:00Z",
          }),
          work_items: {
            "old-pending": {
              id: "old-pending",
              state: "READY",
              revision: 1,
              attempt: 0,
              claim_id: null,
              output_manifests: [],
              validation_result: null,
              last_failure: null,
            },
          },
        },
      ),
    },
    "# Exact historical body\r\n\r\nRetain this evidence.\n",
  );
  const sourcePath = path.join(root, config.paths.workflow_dir, id, "README.md");
  await mkdir(path.dirname(sourcePath), { recursive: true });
  await writeFile(sourcePath, source);
  const wo = buildAgentWorkOrderV2ValidFixture();
  wo.work_order_id = "work-order-retirement-fixture";
  wo.task.id = id;
  wo.task.revision = 2;
  wo.authority.mutation_scope = "code";
  wo.authority.writable_roots = [path.join(owner, "source.ts")];
  wo.state_fingerprint = buildStateFingerprint({
    task_id: id,
    task_revision: 2,
    git_head: execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim(),
    worktree: owner,
    components: Object.fromEntries(
      Object.keys(wo.state_fingerprint.components).map((key) => [
        key,
        { state: "present", source: "fixture", value: { task: id, component: key } },
      ]),
    ) as Parameters<typeof buildStateFingerprint>[0]["components"],
  });
  validateAgentWorkOrderV2(wo);
  const retainedWO = legacy
    ? {
        ...wo,
        state_fingerprint: buildStateFingerprint({
          task_id: id,
          task_revision: 2,
          git_head: wo.state_fingerprint.git_head,
          worktree: owner,
          components: Object.fromEntries(
            [
              "task",
              "git",
              "backend_projection",
              "policy",
              "blueprint",
              "knowledge",
              "provider",
              "authority",
            ].map((key) => [
              key,
              { state: "present", source: "fixture", value: { task: id, component: key } },
            ]),
          ) as Parameters<typeof buildStateFingerprint>[0]["components"],
        }),
        state_fingerprint_policy: {
          required_components: ["task", "git", "backend_projection", "authority"] as const,
          provider: { required: false, unavailable: "allow_if_unchanged" as const },
        },
      }
    : wo;
  const paths = await resolveExternalAgentExchangePaths({
    git_root: root,
    common_git_dir: path.join(root, ".git"),
    task_id: id,
    transition_id: "tr_" + "1".repeat(32),
    state_fingerprint: retainedWO.state_fingerprint.digest,
  });
  const exchange: ExternalAgentExchange = {
    schema_version: 1,
    kind: "external_agent_exchange",
    status: "issued",
    issue_digest_version: 2,
    result_format: legacy ? undefined : "semantic_payload_v1",
    task_id: id,
    transition_id: "tr_" + "1".repeat(32),
    state_fingerprint: retainedWO.state_fingerprint.digest,
    role: "EXECUTOR",
    purpose: "implementation",
    checkout: owner,
    work_order_id: wo.work_order_id,
    work_order_ref: paths.work_order,
    result_schema_ref: paths.result_schema,
    result_ref: paths.result,
    evaluator_work_order_ref: null,
    baseline: { head: wo.state_fingerprint.git_head, changed_paths: [] },
    result_digest: null,
    result: null,
    postcondition_fingerprint: null,
    created_at: "2026-09-01T00:00:00Z",
    updated_at: "2026-09-01T00:00:00Z",
  };
  const compact = {
    work_order_id: wo.work_order_id,
    status: "blocked",
    summary: "Historical report retained without application.",
    findings: [],
    uncertainty: [],
    blocker: { summary: "Historical observation only." },
  };
  const report = validateExternalAgentResultEnvelope({
    raw: compact,
    exchange: { ...exchange, result_format: "semantic_payload_v1" },
    work_order: wo,
  });
  const resultText = JSON.stringify(legacy ? report : compact);
  if (received) {
    exchange.result = report;
    exchange.result_digest = externalAgentResultDigest(exchange.result);
    exchange.status = "result_received";
  }
  await mkdir(paths.directory, { recursive: true });
  await writeFile(paths.work_order, JSON.stringify(retainedWO, null, 2) + "\n");
  await writeFile(paths.exchange, JSON.stringify(exchange, null, 2) + "\n");
  if (received) await writeFile(paths.result, resultText);
  const command = await loadCommandContext({ cwd: root, rootOverride: null });
  const binding = {
    repository_identity: (await resolveLogicalRepositoryIdentity({
      git_root: root,
      task: {},
    })) as k.Sha256Digest,
    policy_digest: k.kernelDigest(command.config),
  };
  const context = {
    checkout: root,
    common_git_dir: path.join(root, ".git"),
    task_id: id,
    workflow_dir: config.paths.workflow_dir,
    worktrees_dir: config.paths.worktrees_dir,
    observe_binding: async () => binding,
  };
  const journalPath = retirementJournalPath(context);
  const journal = createSupervisorExecutionEpisodeJournal({
    task_id: id,
    task_revision: 2,
    state_fingerprint_digest: retainedWO.state_fingerprint.digest,
    budget: {
      max_episodes: 100,
      max_agent_runs: null,
      max_input_tokens: null,
      max_output_tokens: null,
      max_total_tokens: null,
      max_wall_time_ms: null,
      max_changed_files: null,
      max_diff_lines: null,
      max_no_progress_episodes: null,
    },
  });
  // Frozen version-2 transport identity, cross-checked against the current issuer
  // for modern fixtures. Legacy fixtures retain their original fingerprint domain.
  const issuedDigest = externalAgentExchangeDigest(
    JSON.stringify({
      schema_version: exchange.schema_version,
      kind: exchange.kind,
      task_id: id,
      transition_id: exchange.transition_id,
      state_fingerprint: exchange.state_fingerprint,
      role: exchange.role,
      purpose: exchange.purpose,
      checkout: owner,
      work_order_id: exchange.work_order_id,
      work_order_ref: paths.work_order,
      result_schema_ref: paths.result_schema,
      result_ref: paths.result,
      evaluator_work_order_ref: null,
      baseline: exchange.baseline,
      work_order: retainedWO,
      ...(exchange.result_format ? { result_format: exchange.result_format } : {}),
      issue_digest_version: 2,
    }),
  );
  if (!legacy) expect(issuedDigest).toBe(externalAgentIssueDigest({ exchange, work_order: wo }));
  const started = startSupervisorExecutionEpisode({
    journal,
    role: "EXECUTOR",
    kind: "agent_episode",
    operation_identity: {
      workflow_step_id: "agent.branch_implementation",
      purpose: "implementation",
      task_id: id,
    },
    precondition_fingerprint_digest: retainedWO.state_fingerprint.digest,
    authority_ref: "external-agent:" + id + ":agent.branch_implementation",
    authority_digest: retainedWO.state_fingerprint.digest,
    work_order_ref: paths.work_order,
    effect_ref: "external-agent-issue:" + issuedDigest,
  });
  if (started.status !== "started") throw new Error("Fixture intent was not admitted.");
  await createSupervisorEpisodeStore(journalPath).write(started.journal);
  const snapshot = async () => ({
    source: await readFile(sourcePath, "utf8"),
    work_order: await readFile(paths.work_order, "utf8"),
    exchange: await readFile(paths.exchange, "utf8"),
    journal: await readFile(journalPath, "utf8"),
    result: await readFile(paths.result, "utf8").catch((error: NodeJS.ErrnoException) => {
      if (error.code !== "ENOENT") throw error;
      return null;
    }),
  });
  const late = async () => {
    await writeFile(paths.result, resultText);
    return acceptExternalAgentResult({
      ctx: { cwd: root },
      command,
      task_id: id,
      result_path: paths.result,
      include_remote: false,
    });
  };
  return {
    root,
    id,
    owner,
    sourcePath,
    paths,
    wo: retainedWO,
    exchange,
    command,
    binding,
    context,
    journalPath,
    snapshot,
    late,
  };
}

it.each([
  [false, false],
  [true, false],
  [false, true],
  [true, true],
])(
  "public preview/apply preserves history and blocks late results (received=%s, legacy=%s)",
  async (received, legacy) => {
    const f = await fixture(received, false, legacy);
    const before = await f.snapshot();
    const preview = await cli(f.root, ["task", "retire-admission", f.id]);
    expect(preview.code, preview.stderr).toBe(0);
    expect(await f.snapshot()).toEqual(before);
    const request = JSON.parse(preview.stdout).request;
    const requestPath = path.join(f.root, ".agentplane/tmp/request.json");
    await mkdir(path.dirname(requestPath), { recursive: true });
    await writeFile(requestPath, JSON.stringify(request));
    const args = ["task", "retire-admission", f.id, "--apply", "--request", requestPath, "--yes"];
    const applied = await cli(f.root, args);
    expect(applied.code, applied.stderr).toBe(0);
    expect(JSON.parse(applied.stdout)).toMatchObject({
      kind: "retired",
      receipt: { disposition: "admission_retired", prior_effect_outcome: "unassessed" },
    });
    const after = await f.snapshot();
    expect(after.source).toBe(before.source);
    expect(after.work_order).toBe(before.work_order);
    expect(after.result).toBe(before.result);
    expect(JSON.parse(after.exchange)).toMatchObject({
      status: "retired",
      result: f.exchange.result,
    });
    expect(validateSupervisorExecutionEpisodeJournal(JSON.parse(after.journal))).toMatchObject({
      status: "stopped",
      stop: { reason: "operation_failed" },
      operations: [expect.objectContaining({ status: "failed" })],
    });
    const repeated = await cli(f.root, args);
    expect(repeated.code, repeated.stderr).toBe(0);
    expect(JSON.parse(repeated.stdout).kind).toBe("already_retired");
    expect(await f.snapshot()).toEqual(after);
    await expect(f.late()).rejects.toThrow(/retired/u);
    expect((await f.snapshot()).journal).toBe(after.journal);
  },
);

it("public native quarantine and exact rollback do not reactivate retired admission", async () => {
  const f = await fixture(true, false, true);
  const before = await f.snapshot();
  const request = (await previewStaleAdmissionRetirement(f.context)).request;
  await retireStaleAdmission({ context: f.context, request });
  const quarantine = await cli(f.root, [
    "task",
    "kernel-migrate",
    f.id,
    "--apply",
    "--source-digest",
    request.source_digest,
    "--yes",
  ]);
  expect(quarantine.code, quarantine.stderr).toBe(1);
  const result = JSON.parse(quarantine.stdout);
  expect(result).toMatchObject({ kind: "quarantined", persisted: true });
  const proof = path.join(f.root, "quarantine-rollback.json");
  await writeFile(proof, quarantine.stdout);
  const rollback = await cli(f.root, [
    "task",
    "kernel-migrate",
    f.id,
    "--rollback",
    proof,
    "--yes",
  ]);
  expect(rollback.code, rollback.stderr).toBe(0);
  expect(await readFile(f.sourcePath, "utf8")).toBe(before.source);
  expect(JSON.parse(await readFile(f.paths.exchange, "utf8")).status).toBe("retired");
  await expect(f.late()).rejects.toThrow(/retired/u);
});

it("does not apply a retained completed historical report or promote its WorkItems", async () => {
  const f = await fixture(true, false, true);
  const envelope = JSON.parse(await readFile(f.paths.result, "utf8"));
  envelope.result.status = "completed";
  delete envelope.result.blocker;
  const exchange = JSON.parse(await readFile(f.paths.exchange, "utf8"));
  exchange.result = envelope;
  exchange.result_digest = externalAgentResultDigest(envelope);
  await writeFile(f.paths.result, JSON.stringify(envelope));
  await writeFile(f.paths.exchange, JSON.stringify(exchange));
  const before = await f.snapshot();
  const request = (await previewStaleAdmissionRetirement(f.context)).request;
  const result = await retireStaleAdmission({ context: f.context, request });
  expect(result.receipt.prior_effect_outcome).toBe("unassessed");
  const after = await f.snapshot();
  expect(after.source).toBe(before.source);
  expect(after.result).toBe(before.result);
  expect(JSON.parse(after.exchange).result.result.status).toBe("completed");
});

it("supports configured nested workflow and worktree directories", async () => {
  const f = await fixture(false, true, true);
  const request = (await previewStaleAdmissionRetirement(f.context)).request;
  const file = path.join(f.root, "request.json");
  await writeFile(file, JSON.stringify(request));
  const result = await cli(f.root, [
    "task",
    "retire-admission",
    f.id,
    "--apply",
    "--request",
    file,
    "--yes",
  ]);
  expect(result.code, result.stderr).toBe(0);
  expect(JSON.parse(result.stdout).kind).toBe("retired");
});

it.each(["prepared", "exchange", "journal", "receipt"] as const)(
  "recovers the exact prepared transaction after interruption at %s",
  async (boundary) => {
    const f = await fixture(true, false, true);
    const before = await f.snapshot();
    const request = (await previewStaleAdmissionRetirement(f.context)).request;
    await expect(
      retireStaleAdmission({
        context: f.context,
        request,
        boundary: async (phase) => {
          if (phase === boundary) throw new Error("Injected interruption");
        },
      }),
    ).rejects.toThrow("Injected interruption");
    const recovered = await retireStaleAdmission({ context: f.context, request });
    expect(recovered.kind).toBe(boundary === "receipt" ? "already_retired" : "retired");
    const after = await f.snapshot();
    expect(after.source).toBe(before.source);
    expect(after.work_order).toBe(before.work_order);
    expect(after.result).toBe(before.result);
    expect((await retireStaleAdmission({ context: f.context, request })).kind).toBe(
      "already_retired",
    );
    expect(await f.snapshot()).toEqual(after);
  },
);

it.each(["source", "policy", "owner", "result"] as const)(
  "refuses %s drift after preparation before native state writes",
  async (target) => {
    const f = await fixture(true, false, true);
    const request = (await previewStaleAdmissionRetirement(f.context)).request;
    const before = await f.snapshot();
    await expect(
      retireStaleAdmission({
        context: f.context,
        request,
        boundary: async (phase) => {
          if (phase !== "prepared") return;
          if (target === "source") await writeFile(f.sourcePath, before.source + "\nchanged");
          if (target === "policy") f.binding.policy_digest = k.kernelDigest({ changed: true });
          if (target === "owner") await mkdir(f.owner);
          if (target === "result") await writeFile(f.paths.result, '{"changed":true}');
        },
      }),
    ).rejects.toThrow();
    const after = await f.snapshot();
    expect(after.journal).toBe(before.journal);
    expect(after.exchange).toBe(before.exchange);
  },
);

it("refuses active leases and concurrent retirement rather than running duplicate operations", async () => {
  const f = await fixture(false, false, true);
  const request = (await previewStaleAdmissionRetirement(f.context)).request;
  const before = await f.snapshot();
  const lease = await tryAcquireSupervisorExecutionLease({ journal_path: f.journalPath });
  expect(lease).not.toBeNull();
  try {
    await expect(retireStaleAdmission({ context: f.context, request })).rejects.toThrow(
      /active supervisor/u,
    );
    expect(await f.snapshot()).toEqual(before);
  } finally {
    await lease?.release();
  }
  let release!: () => void;
  let entered!: () => void;
  const ready = new Promise<void>((resolve) => {
    entered = resolve;
  });
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const first = retireStaleAdmission({
    context: f.context,
    request,
    boundary: async (phase) => {
      if (phase === "prepared") {
        entered();
        await gate;
      }
    },
  });
  await ready;
  try {
    await expect(retireStaleAdmission({ context: f.context, request })).rejects.toThrow(
      /active supervisor/u,
    );
  } finally {
    release();
  }
  expect((await first).kind).toBe("retired");
});

it("refuses an impossible reverse partial publication without repairing foreign state", async () => {
  const f = await fixture(false, false, true);
  const request = (await previewStaleAdmissionRetirement(f.context)).request;
  const before = await f.snapshot();
  await expect(
    retireStaleAdmission({
      context: f.context,
      request,
      boundary: async (phase) => {
        if (phase === "journal") throw new Error("Injected interruption");
      },
    }),
  ).rejects.toThrow("Injected interruption");
  await writeFile(f.paths.exchange, before.exchange);
  const changed = await f.snapshot();
  await expect(retireStaleAdmission({ context: f.context, request })).rejects.toThrow(
    /unknown|partial/u,
  );
  expect(await f.snapshot()).toEqual(changed);
});

it.each(["external-authority", "effect-in-doubt", "accepted", "checkpoint", "operation"] as const)(
  "keeps admission fenced for %s",
  async (target) => {
    const f = await fixture(true);
    if (target === "external-authority") {
      f.wo.authority.external_side_effects = ["external_write"];
      await writeFile(f.paths.work_order, JSON.stringify(f.wo));
    }
    if (target === "effect-in-doubt") {
      const journal = validateSupervisorExecutionEpisodeJournal(
        JSON.parse(await readFile(f.journalPath, "utf8")),
      );
      await createSupervisorEpisodeStore(f.journalPath).write(
        stopSupervisorExecutionEpisode({
          journal,
          reason: "effect_in_doubt",
          operation_key: journal.operations.at(-1)!.operation_key,
        }),
      );
    }
    if (target === "accepted" || target === "checkpoint") {
      const exchange = JSON.parse(await readFile(f.paths.exchange, "utf8"));
      if (target === "accepted") exchange.status = "accepted";
      else exchange.verification_checkpoint = { unproven: true };
      await writeFile(f.paths.exchange, JSON.stringify(exchange));
    }
    if (target === "operation") {
      const exchange = JSON.parse(await readFile(f.paths.exchange, "utf8"));
      exchange.baseline.head = "f".repeat(40);
      await writeFile(f.paths.exchange, JSON.stringify(exchange));
    }
    const before = await f.snapshot();
    await expect(previewStaleAdmissionRetirement(f.context)).rejects.toThrow();
    expect(await f.snapshot()).toEqual(before);
  },
);
