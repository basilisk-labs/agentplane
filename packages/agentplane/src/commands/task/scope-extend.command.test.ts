import type * as Testkit from "@agentplane/testkit";
import type { AgentActionPacket } from "./agent-action-packet.js";
import {
  readExternalAgentWorkOrder,
  type ExternalAgentExchange,
} from "./external-agent-exchange.js";
type Packet = { action: { kind: string }; exchange: NonNullable<AgentActionPacket["exchange"]> };
import * as commitOwner from "../guard/impl/commit.js";
import { CliError } from "../../shared/errors.js";
import { readFile, writeFile, mkdir, symlink } from "node:fs/promises";
import path from "node:path";
import { captureStdIO, installRunCliIntegrationHarness } from "@agentplane/testkit";
import { runCli } from "../../cli/run-cli.js";
import { fixture, git } from "./kernel-completed-external-rework.testkit.js";
import { parseTaskScopeExtensionRequestState } from "../shared/task-scope-extension-request.js";
import type * as PrFlowModule from "../pr/flow-status.js";

vi.mock("@agentplane/testkit", async (original) => {
  const actual = await original<typeof Testkit>();
  return {
    ...actual,
    mkGitRepoRootWithBranch: async (...args: Parameters<typeof actual.mkGitRepoRootWithBranch>) => {
      const root = await actual.mkGitRepoRootWithBranch(...args);
      // Seed the same tracked gateway projection before the fixture's frozen base.
      // Missing gateway policy must not be hidden by weakening the successor check.
      await mkdir(path.join(root, "packages/agentplane/assets"), { recursive: true });
      await writeFile(
        path.join(root, "packages/agentplane/assets/AGENTS.md"),
        "# Fixture policy\nPreserve native authority and independent review.\n",
      );
      await symlink("packages/agentplane/assets/AGENTS.md", path.join(root, "AGENTS.md"));
      return root;
    },
  };
});

vi.mock("../pr/flow-status.js", async (original) => ({
  ...(await original<typeof PrFlowModule>()),
  resolvePrFlowStatus: async (opts: { ctx: taskBackend.CommandContext; taskId: string }) => {
    const task = (await opts.ctx.taskBackend.getTask(opts.taskId))!;
    const head = git(opts.ctx.resolvedProject.gitRoot, "rev-parse", "HEAD");
    return {
      task: { id: task.id, status: task.status, verification: task.verification?.state ?? null },
      branch: {
        name: git(opts.ctx.resolvedProject.gitRoot, "branch", "--show-current"),
        headSha: head,
        metaHeadSha: null,
      },
      pr: {
        provider: "github",
        state: "OPEN",
        source: "lookup",
        prNumber: 12,
        prUrl: "https://github.com/owner/project/pull/12",
        base: "main",
        headSha: head,
        mergeCommit: null,
      },
      closeTail: { state: "not_applicable", reason: "Fixture PR" },
      hostedChecks: { checked: false, reason: "No provider effects in fixture" },
      reviewThreads: { checked: false, reason: "No provider effects in fixture" },
      queue: { present: false },
      handoff: { present: false },
      nextAction: "Review source",
    } satisfies PrFlowModule.PrFlowStatusReport;
  },
}));
installRunCliIntegrationHarness();
async function invoke(root: string, args: string[]) {
  const io = captureStdIO();
  try {
    const code = await runCli([...args, "--root", root]);
    return { code, stdout: io.stdout, stderr: io.stderr };
  } finally {
    io.restore();
  }
}

import { afterEach, describe, expect, it, vi } from "vitest";
import * as taskBackend from "../shared/task-backend.js";
import * as kernelRuntime from "./kernel-runtime-context.js";
import { TASK_KERNEL_EXTENSION } from "../../adapters/task-backend/kernel-record.js";
import { cmdTaskScopeExtend } from "./scope-extend.js";
import { parseCommandArgv } from "../../cli/spec/parse.js";
import { taskScopeExtendSpec } from "./scope-extend.command.js";

const REQUEST_DIGEST = `sha256:${"1".repeat(64)}`;
const STATE_SCOPE_DIGEST = `sha256:${"2".repeat(64)}`;
const STATE_FINGERPRINT = `sha256:${"3".repeat(64)}`;

afterEach(() => vi.restoreAllMocks());

describe("canonical scope grant ownership", () => {
  it("uses the resolved owner context without changing the approval binding", async () => {
    const ctx = {
      taskBackend: {
        getTask: vi
          .fn()
          .mockResolvedValue({ id: "T-1", extensions: { [TASK_KERNEL_EXTENSION]: {} } }),
      },
    } as unknown as taskBackend.CommandContext;
    const owner = { ...ctx, backendId: "authoritative-test-backend" };
    const resolve = vi
      .spyOn(taskBackend, "resolveTaskOwnerCommandContext")
      .mockResolvedValue(owner);
    const approveDelta = vi.fn().mockResolvedValue({ kind: "committed" });
    const create = vi.spyOn(kernelRuntime, "createKernelRuntime").mockResolvedValue({
      authority: { approveDelta },
    } as never);
    await expect(
      cmdTaskScopeExtend({
        ctx,
        taskId: "T-1",
        scopeRoots: ["source.ts"],
        repositoryEffects: ["source_code"],
        requestDigest: REQUEST_DIGEST,
        stateScopeDigest: REQUEST_DIGEST,
        by: "USER",
        quiet: true,
      }),
    ).resolves.toBe(0);
    expect(resolve).toHaveBeenCalledWith({ ctx, taskId: "T-1" });
    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        command: owner,
        approval: { kind: "manual_operator", actor_id: "USER", invocation_id: REQUEST_DIGEST },
      }),
    );
    expect(approveDelta).toHaveBeenCalledWith(
      expect.objectContaining({
        task_id: "T-1",
        scope_roots: ["source.ts"],
        repository_effects: ["source_code"],
        request_digest: REQUEST_DIGEST,
      }),
    );
  });

  it.each([
    { by: "EXECUTOR", stateScopeDigest: REQUEST_DIGEST },
    { by: "USER", stateScopeDigest: STATE_SCOPE_DIGEST },
  ])(
    "rejects invalid authority before resolving writable storage: $by $stateScopeDigest",
    async (approval) => {
      const ctx = {
        taskBackend: {
          getTask: vi
            .fn()
            .mockResolvedValue({ id: "T-1", extensions: { [TASK_KERNEL_EXTENSION]: {} } }),
        },
      } as unknown as taskBackend.CommandContext;
      const resolve = vi.spyOn(taskBackend, "resolveTaskOwnerCommandContext");
      const create = vi.spyOn(kernelRuntime, "createKernelRuntime");
      await expect(
        cmdTaskScopeExtend({
          ctx,
          taskId: "T-1",
          scopeRoots: ["source.ts"],
          repositoryEffects: ["source_code"],
          requestDigest: REQUEST_DIGEST,
          ...approval,
          quiet: true,
        }),
      ).rejects.toThrow("Canonical authority delta");
      expect(resolve).not.toHaveBeenCalled();
      expect(create).not.toHaveBeenCalled();
    },
  );
});

describe("task scope extend command parsing", () => {
  it.each(
    [
      { option: "--state-scope-digest", value: STATE_SCOPE_DIGEST, key: "stateScopeDigest" },
      { option: "--state-fingerprint", value: STATE_FINGERPRINT, key: "stateFingerprint" },
    ].flatMap((binding) => [false, true].map((padded) => ({ ...binding, padded }))),
  )(
    "preserves scalar $option after normalization (padded=$padded)",
    ({ option, value, key, padded }) => {
      expect(
        parseCommandArgv(taskScopeExtendSpec, [
          "T-1",
          "--scope-root",
          "packages/agentplane",
          "--request-digest",
          REQUEST_DIGEST,
          option,
          padded ? `  ${value}  ` : value,
          "--by",
          "USER",
        ]),
      ).toMatchObject({
        parsed: {
          taskId: "T-1",
          scopeRoots: ["packages/agentplane"],
          requestDigest: REQUEST_DIGEST,
          by: "USER",
          [key]: value,
        },
      });
    },
  );

  it("continues to reject a missing state binding", () => {
    const base = [
      "T-1",
      "--scope-root",
      "packages/agentplane",
      "--request-digest",
      REQUEST_DIGEST,
      "--by",
      "USER",
    ];

    expect(() => parseCommandArgv(taskScopeExtendSpec, base)).toThrow(
      "One of --state-scope-digest or --state-fingerprint is required.",
    );
  });

  it.each(["--state-scope-digest", "--state-fingerprint"] as const)(
    "treats whitespace-only %s as missing",
    (option) => {
      expect(() =>
        parseCommandArgv(taskScopeExtendSpec, [
          "T-1",
          "--scope-root",
          "packages/agentplane",
          "--request-digest",
          REQUEST_DIGEST,
          option,
          "   ",
          "--by",
          "USER",
        ]),
      ).toThrow("One of --state-scope-digest or --state-fingerprint is required.");
    },
  );

  it.each(["--state-scope-digest", "--state-fingerprint"] as const)(
    "continues to reject malformed %s",
    (option) => {
      const base = [
        "T-1",
        "--scope-root",
        "packages/agentplane",
        "--request-digest",
        REQUEST_DIGEST,
        "--by",
        "USER",
      ];

      expect(() =>
        parseCommandArgv(taskScopeExtendSpec, [...base, option, "sha256:not-a-digest"]),
      ).toThrow(`${option} must be an exact sha256:<64 lowercase hex> digest.`);
    },
  );
});

async function completedScopeFixture(authenticatedReview = false) {
  const f = await fixture("branch_pr", false, authenticatedReview);
  const issued = await invoke(f.root, ["task", "advance", f.id, "--agent-json"]);
  expect(issued.code, issued.stdout + issued.stderr).toBe(0);
  const packet = JSON.parse(issued.stdout) as Packet;
  const order = await readExternalAgentWorkOrder(
    path.join(packet.exchange.directory, "work-order.json"),
  );
  expect(order.role).toBe("EXECUTOR");
  const payload = {
    work_order_id: order.work_order_id,
    status: "blocked",
    summary: "Need helper",
    findings: [],
    uncertainty: [],
    blocker: {
      summary: "Helper absent",
      scope_extension_request: {
        schema_version: 1,
        rationale: "Fix helper behavior",
        scope_roots: ["helper.txt"],
        repository_effects: [],
      },
    },
  };
  await writeFile(packet.exchange.result_path, JSON.stringify(payload));
  const returned = await invoke(f.root, [
    "task",
    "advance",
    f.id,
    "--result",
    packet.exchange.result_path,
    "--agent-json",
  ]);
  expect(returned.code, returned.stdout + returned.stderr).toBe(0);
  expect((JSON.parse(returned.stdout) as Packet).action.kind).toBe("human_input_required");
  const command = await taskBackend.loadCommandContext({ cwd: f.root, rootOverride: null });
  const before = (await command.taskBackend.getTask(f.id))!;
  const pending = parseTaskScopeExtensionRequestState(before)!;
  expect(pending.status).toBe("pending");
  const head = git(f.root, "rev-parse", "HEAD");
  const args = [
    "task",
    "scope",
    "extend",
    f.id,
    "--scope-root",
    "helper.txt",
    "--request-digest",
    pending.request_digest,
    "--state-scope-digest",
    pending.request_digest,
    "--by",
    "USER",
  ];
  return { f, packet, payload, command, before, pending, head, args };
}

describe("completed native repair prospective scope admission", { timeout: 120_000 }, () => {
  it("authenticates the consumed blocker, admits exact scope, and preserves terminal history", async () => {
    const { f, packet, payload, command, before, args } = await completedScopeFixture(true);
    const admitted = await invoke(f.root, args);
    expect(admitted.code, admitted.stdout + admitted.stderr).toBe(0);
    const observation6 = await command.taskBackend.getTask(f.id);
    const after = observation6!;
    expect(after.status).toBe("DONE");
    expect(after.extensions?.task_kernel).toEqual(before.extensions?.task_kernel);
    expect(after.commit).toEqual(before.commit);
    expect(after.quality_review).toEqual(before.quality_review);
    expect(after.extensions?.task_execution_context).toEqual(
      before.extensions?.task_execution_context,
    );
    expect(after.execution_contract?.authority.writable_roots).toContain("helper.txt");
    expect(parseTaskScopeExtensionRequestState(after)).toMatchObject({
      status: "applied",
      applied_by: "USER",
    });
    const replayHead = git(f.root, "rev-parse", "HEAD");
    const replay = await invoke(f.root, args);
    expect(replay.code).not.toBe(0);
    expect(git(f.root, "rev-parse", "HEAD")).toBe(replayHead);
    expect(await readFile(packet.exchange.result_path, "utf8")).toBe(JSON.stringify(payload));
    expect(await readFile(path.join(f.root, "source.txt"), "utf8")).toBe("before\n");
    const next = await invoke(f.root, ["task", "advance", f.id, "--agent-json", "--remote"]);
    expect(next.code, next.stdout + next.stderr).toBe(0);
    let successor = JSON.parse(next.stdout) as Packet;
    expect(successor.action.kind, next.stdout).toBe("agent_episode");
    let fresh = await readExternalAgentWorkOrder(
      path.join(successor.exchange.directory, "work-order.json"),
    );
    if (fresh.role === "EVALUATOR") {
      // Scope admission changes review authority. Complete the required fresh
      // fixture assessment, rather than skipping independent evaluation.
      expect(await readFile(path.join(f.root, "source.txt"), "utf8")).toBe("before\n");
      await writeFile(
        successor.exchange.result_path,
        JSON.stringify({
          work_order_id: fresh.work_order_id,
          status: "completed",
          summary: "Fixture helper implementation is unavailable for behavior assessment.",
          findings: ["The fixture still contains before, so implementation rework is required."],
          uncertainty: [],
          review: {
            verdict: "blocked",
            missing_tests: [],
            hidden_assumptions: [],
            residual_risks: [],
            recovery_context: "Implement the admitted helper.",
          },
        }),
      );
      const reviewed = await invoke(f.root, successor.exchange.resume_argv.slice(1));
      expect(reviewed.code, reviewed.stdout + reviewed.stderr).toBe(0);
      successor = JSON.parse(reviewed.stdout) as Packet;
      expect(successor.action.kind, reviewed.stdout).toBe("agent_episode");
      fresh = await readExternalAgentWorkOrder(
        path.join(successor.exchange.directory, "work-order.json"),
      );
    }
    expect(fresh.role).toBe("EXECUTOR");
    expect(fresh.authority.writable_roots.some((root: string) => root.endsWith("helper.txt"))).toBe(
      true,
    );
    expect(fresh.state_fingerprint.components.policy.state).toBe("present");
    expect(fresh.stop_rules.join(" ")).not.toContain("task_kind_incompatible");
    expect(fresh.stop_rules.join(" ")).not.toContain("Execution profile release is incompatible");
    const observation7 = await command.taskBackend.getTask(f.id);
    expect(observation7?.extensions?.task_kernel).toEqual(before.extensions?.task_kernel);
  });
});

it(
  "refuses source edits reverted after the consumed scope blocker",
  { timeout: 120_000 },
  async () => {
    const { f, args, command, before } = await completedScopeFixture();
    await writeFile(path.join(f.root, "source.txt"), "changed");
    git(f.root, "add", "source.txt");
    git(f.root, "commit", "-m", "source drift");
    await writeFile(path.join(f.root, "source.txt"), "before\n");
    git(f.root, "add", "source.txt");
    git(f.root, "commit", "-m", "restore bytes");
    const head = git(f.root, "rev-parse", "HEAD");
    const observation3 = await invoke(f.root, args);
    expect(observation3.code).not.toBe(0);
    expect(git(f.root, "rev-parse", "HEAD")).toBe(head);
    const observation8 = await command.taskBackend.getTask(f.id);
    expect(observation8?.execution_contract).toEqual(before.execution_contract);
  },
);

it.each([
  { sourceDrift: true, reverted: false },
  { sourceDrift: true, reverted: true },
  { sourceDrift: false, reverted: false },
])(
  "checks merge history with log.diffMerges=off (sourceDrift=$sourceDrift, reverted=$reverted)",
  { timeout: 120_000 },
  async ({ sourceDrift, reverted }) => {
    const { f, args, command, before } = await completedScopeFixture();
    git(f.root, "config", "--local", "log.diffMerges", "off");
    const branch = git(f.root, "branch", "--show-current");
    const readme = `.agentplane/tasks/${f.id}/README.md`;
    const original = await readFile(path.join(f.root, readme), "utf8");
    git(f.root, "checkout", "-b", "readme-only-side");
    await writeFile(path.join(f.root, readme), `${original}\nSide metadata.\n`);
    git(f.root, "add", readme);
    git(f.root, "commit", "-m", "side metadata only");
    git(f.root, "checkout", branch);
    await writeFile(path.join(f.root, readme), `${original}\nMain metadata.\n`);
    git(f.root, "add", readme);
    git(f.root, "commit", "-m", "main metadata only");
    git(f.root, "merge", "readme-only-side", "--no-ff", "--no-commit", "-s", "ours");
    await writeFile(path.join(f.root, readme), original);
    if (sourceDrift)
      await writeFile(path.join(f.root, "source.txt"), "merge-resolution source drift\n");
    git(f.root, "add", readme, "source.txt");
    git(f.root, "commit", "-m", "merge with source resolution");
    if (reverted) {
      await writeFile(path.join(f.root, "source.txt"), "before\n");
      git(f.root, "add", "source.txt");
      git(f.root, "commit", "-m", "restore source bytes");
    }
    const head = git(f.root, "rev-parse", "HEAD");
    const result = await invoke(f.root, args);
    const after = (await command.taskBackend.getTask(f.id))!;
    expect(after.extensions?.task_kernel).toEqual(before.extensions?.task_kernel);
    if (sourceDrift) {
      expect(result.code).not.toBe(0);
      expect(result.stderr).toContain("Completed repair scope requires");
      expect(git(f.root, "rev-parse", "HEAD")).toBe(head);
      expect(after.execution_contract).toEqual(before.execution_contract);
      expect(parseTaskScopeExtensionRequestState(after)).toMatchObject({ status: "pending" });
    } else {
      expect(result.code, result.stdout + result.stderr).toBe(0);
      expect(after.execution_contract?.authority.writable_roots).toContain("helper.txt");
      expect(parseTaskScopeExtensionRequestState(after)).toMatchObject({ status: "applied" });
      expect(after.commit).toEqual(before.commit);
      expect(after.quality_review).toEqual(before.quality_review);
      expect(after.extensions?.task_execution_context).toEqual(
        before.extensions?.task_execution_context,
      );
      expect(await readFile(path.join(f.root, "source.txt"), "utf8")).toBe("before\n");
    }
  },
);

it(
  "preserves one admitted scope after interrupted metadata commit without replaying approval",
  { timeout: 120_000 },
  async () => {
    const { f, args, command, before } = await completedScopeFixture();
    const stop = vi.spyOn(commitOwner, "cmdCommit").mockRejectedValueOnce(
      new CliError({
        code: "E_VALIDATION",
        message: "Injected commit interruption after scope persistence",
      }),
    );
    try {
      const observation4 = await invoke(f.root, args);
      expect(observation4.code).not.toBe(0);
    } finally {
      stop.mockRestore();
    }
    const observation9 = await command.taskBackend.getTask(f.id);
    const admitted = observation9!;
    expect(parseTaskScopeExtensionRequestState(admitted)).toMatchObject({
      status: "applied",
      applied_by: "USER",
    });
    expect(admitted.execution_contract?.authority.writable_roots).toContain("helper.txt");
    expect(admitted.extensions?.task_kernel).toEqual(before.extensions?.task_kernel);
    const comments = admitted.comments?.filter((comment) =>
      comment.body.startsWith("Approved state-bound execution scope extension:"),
    );
    expect(comments).toHaveLength(1);
    const observation5 = await invoke(f.root, args);
    expect(observation5.code).not.toBe(0);
    const observation10 = await command.taskBackend.getTask(f.id);
    const replayed = observation10!;
    expect(replayed.comments).toEqual(admitted.comments);
    expect(replayed.execution_contract).toEqual(admitted.execution_contract);
    expect(replayed.extensions?.task_kernel).toEqual(before.extensions?.task_kernel);
  },
);

it(
  "refuses invalid scope, altered exchange and dirty source before admission",
  { timeout: 120_000 },
  async () => {
    const { f, packet, command, before, head, args } = await completedScopeFixture();
    for (const [index, value] of [
      [5, "expanded.txt"],
      [7, REQUEST_DIGEST],
      [11, "EXECUTOR"],
    ] as const) {
      const wrong = [...args];
      wrong[index] = value;
      const refused = await invoke(f.root, wrong);
      expect(refused.code, refused.stdout + refused.stderr).not.toBe(0);
      expect(git(f.root, "rev-parse", "HEAD")).toBe(head);
    }
    const exchangeFile = path.join(packet.exchange.directory, "exchange.json");
    const retained = await readFile(exchangeFile, "utf8");
    for (const change of [
      { purpose: "implementation" },
      { status: "issued" },
      { transition_id: "tr_" + "0".repeat(32) },
    ]) {
      await writeFile(
        exchangeFile,
        JSON.stringify({ ...(JSON.parse(retained) as ExternalAgentExchange), ...change }),
      );
      const observation1 = await invoke(f.root, args);
      expect(observation1.code).not.toBe(0);
      expect(git(f.root, "rev-parse", "HEAD")).toBe(head);
      await writeFile(exchangeFile, retained);
    }
    await writeFile(path.join(f.root, "source.txt"), "dirty source");
    const observation2 = await invoke(f.root, args);
    expect(observation2.code).not.toBe(0);
    expect(git(f.root, "rev-parse", "HEAD")).toBe(head);
    await writeFile(path.join(f.root, "source.txt"), "before\n");

    const after = await command.taskBackend.getTask(f.id);
    expect(after?.execution_contract).toEqual(before.execution_contract);
    expect(after?.extensions?.task_kernel).toEqual(before.extensions?.task_kernel);
    expect(parseTaskScopeExtensionRequestState(after!)).toMatchObject({ status: "pending" });
  },
);
