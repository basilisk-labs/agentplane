import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import {
  assertStateFingerprintPrecondition,
  StateFingerprintPreconditionError,
} from "@agentplaneorg/core/schemas";
import { installRunCliIntegrationHarness, writeConfig } from "@agentplane/testkit";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CloudBackend, LocalBackend, type TaskData } from "../backends/task-backend.js";
import { cloudProjectionIdentitySha256 } from "../backends/task-backend/cloud-projection-identity.js";
import {
  projectBlueprintsConfigPath,
  scaffoldProjectBlueprint,
  type Blueprint,
  type BlueprintId,
} from "../blueprints/index.js";
import { loadCommandContext, type CommandContext } from "../commands/shared/task-backend.js";
import {
  capturePreparedRunnerStateFingerprint,
  captureRunnerPreparationGitSnapshot,
  captureRunnerStateFingerprint,
} from "./state-fingerprint.js";
import {
  configureCustomRunner,
  createDoingTask,
  mkGitRepoRoot,
} from "./usecases/task-run-active-claim.testkit.js";
import {
  executeStateBoundRunnerInvocation,
  RunnerStateFingerprintCliError,
} from "./usecases/task-run-state-fingerprint.js";
import {
  prepareTaskRunnerExecution,
  type PreparedTaskRunnerExecution,
} from "./usecases/task-run.js";
import type { RunnerRecipeContext } from "./types.js";

installRunCliIntegrationHarness();

afterEach(() => {
  vi.restoreAllMocks();
});

async function prepareLocalCase(
  title: string,
  beforeContext?: (opts: { root: string; taskId: string }) => Promise<void>,
  recipe?: RunnerRecipeContext,
): Promise<{
  root: string;
  taskId: string;
  ctx: CommandContext;
  prepared: PreparedTaskRunnerExecution;
}> {
  const root = await mkGitRepoRoot();
  await configureCustomRunner({
    root,
    script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
  });
  await writeFile(
    path.join(root, "AGENTS.md"),
    "# Test Policy\n\nKeep runner effects state-bound.\n",
    "utf8",
  );
  const taskId = await createDoingTask(root, title);
  await beforeContext?.({ root, taskId });
  const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
  const prepared = await prepareTaskRunnerExecution({
    ctx,
    cwd: root,
    rootOverride: root,
    task_id: taskId,
    mode: "execute",
    run_id: `run-${title.toLowerCase().replaceAll(/[^a-z0-9]+/gu, "-")}`,
    recipe,
  });
  return { root, taskId, ctx, prepared };
}

function preferredBlueprintRecipe(blueprintId: string): RunnerRecipeContext {
  return {
    recipe_id: `fingerprint-${blueprintId}`,
    scenario_id: "STATE_FINGERPRINT",
    manifest: {
      id: `fingerprint-${blueprintId}`,
      version: "1.0.0",
      name: "State fingerprint fixture",
      blueprint_extensions: [
        {
          id: "preferred-blueprint",
          kind: "preferred_blueprint",
          summary: "Select the trusted project-local blueprint.",
          blueprint_id: blueprintId,
        },
      ],
    },
  };
}

async function writeTrustedProjectBlueprint(opts: {
  root: string;
  id: string;
  from?: BlueprintId;
  mutate?: (blueprint: Blueprint) => void;
}): Promise<string> {
  const scaffold = await scaffoldProjectBlueprint({
    projectRoot: opts.root,
    id: opts.id,
    from: opts.from,
  });
  const blueprint = structuredClone(scaffold.blueprint);
  opts.mutate?.(blueprint);
  await writeFile(scaffold.path, `${JSON.stringify(blueprint, null, 2)}\n`, "utf8");
  await writeFile(
    projectBlueprintsConfigPath(opts.root),
    `${JSON.stringify({
      schema_version: 1,
      trust_model: "explicit_allowlist",
      enabled: true,
      allowed_ids: [opts.id],
      selection: "explicit_only",
    })}\n`,
    "utf8",
  );
  return scaffold.path;
}

function successfulResult() {
  return Promise.resolve({
    status: "success" as const,
    exit_code: 0,
    started_at: "2026-07-24T00:00:00.000Z",
    ended_at: "2026-07-24T00:00:01.000Z",
  });
}

async function expectExactlyChanged(opts: {
  ctx: CommandContext;
  prepared: PreparedTaskRunnerExecution;
  component:
    | "task"
    | "git"
    | "backend_projection"
    | "policy"
    | "blueprint"
    | "knowledge"
    | "provider"
    | "authority";
  probes?: {
    load_context?: () => Promise<CommandContext>;
  };
}): Promise<void> {
  const apply = vi.fn(successfulResult);
  let observed: unknown;
  try {
    await executeStateBoundRunnerInvocation({
      ctx: opts.ctx,
      task_id: opts.prepared.bundle.task?.task_id ?? "",
      bundle: opts.prepared.bundle,
      invocation: opts.prepared.invocation,
      precondition_fingerprint: opts.prepared.precondition_fingerprint,
      precondition_policy: opts.prepared.precondition_policy,
      probes: opts.probes,
      apply,
    });
  } catch (error) {
    observed = error;
  }
  expect(observed).toBeInstanceOf(RunnerStateFingerprintCliError);
  if (!(observed instanceof RunnerStateFingerprintCliError)) {
    throw new Error("Expected stale runner state to be rejected.");
  }
  expect(
    observed.state_fingerprint.precondition.changed_components.map((entry) => entry.component),
  ).toEqual([opts.component]);
  expect(observed.state_fingerprint.effect_applied).toBe(false);
  expect(apply).not.toHaveBeenCalled();
}

describe("runner residual Git fingerprint", () => {
  it("assigns an active task README mutation exactly to task", async () => {
    const fixture = await prepareLocalCase("Residual task");
    const current = await fixture.ctx.taskBackend.getTask(fixture.taskId);
    if (!current) throw new Error(`Task not found: ${fixture.taskId}`);
    await fixture.ctx.taskBackend.writeTask({
      ...current,
      description: `${current.description}\nChanged after preparation.`,
      revision: (current.revision ?? 0) + 1,
    });

    await expectExactlyChanged({
      ctx: fixture.ctx,
      prepared: fixture.prepared,
      component: "task",
    });
  });

  it("assigns an AGENTS.md mutation exactly to policy", async () => {
    const fixture = await prepareLocalCase("Residual policy");
    const policyPath = path.join(fixture.root, "AGENTS.md");
    await writeFile(
      policyPath,
      `${await readFile(policyPath, "utf8")}\nResidual policy mutation.\n`,
      "utf8",
    );

    await expectExactlyChanged({
      ctx: fixture.ctx,
      prepared: fixture.prepared,
      component: "policy",
    });
  });

  it("assigns a provider freshness advance exactly to provider", async () => {
    const fixture = await prepareLocalCase("Residual provider", async ({ root, taskId }) => {
      const backend = new LocalBackend({
        dir: path.join(root, ".agentplane", "tasks"),
      });
      const task = await backend.getTask(taskId);
      if (!task) throw new Error(`Task not found: ${taskId}`);
      await backend.writeTask({
        ...task,
        sync: {
          version: 1,
          external_refs: [{ provider: "github", remote_id: taskId }],
          field_policies: {},
          freshness: {
            provider_revision: "provider-revision-1",
            projected_at: "2026-07-24T00:00:00.000Z",
          },
          conflicts: [],
        },
      });
    });
    const current = await fixture.ctx.taskBackend.getTask(fixture.taskId);
    if (!current?.sync) throw new Error(`Task sync not found: ${fixture.taskId}`);
    await fixture.ctx.taskBackend.writeTask({
      ...current,
      sync: {
        ...current.sync,
        freshness: {
          ...current.sync.freshness,
          provider_revision: "provider-revision-2",
          projected_at: "2026-07-24T00:01:00.000Z",
        },
      },
    });

    await expectExactlyChanged({
      ctx: fixture.ctx,
      prepared: fixture.prepared,
      component: "provider",
    });
  });

  it("assigns a resolved project blueprint mutation exactly to blueprint", async () => {
    const blueprintId = "docs.residual-blueprint";
    let blueprintPath = "";
    const fixture = await prepareLocalCase(
      "Residual blueprint",
      async ({ root }) => {
        blueprintPath = await writeTrustedProjectBlueprint({
          root,
          id: blueprintId,
          from: "docs.change",
        });
      },
      preferredBlueprintRecipe(blueprintId),
    );
    expect(fixture.prepared.bundle.blueprint?.blueprintId).toBe(blueprintId);
    const blueprint = JSON.parse(await readFile(blueprintPath, "utf8")) as Blueprint;
    blueprint.allowedCommands = ["residual blueprint command"];
    await writeFile(blueprintPath, `${JSON.stringify(blueprint, null, 2)}\n`, "utf8");

    await expectExactlyChanged({
      ctx: fixture.ctx,
      prepared: fixture.prepared,
      component: "blueprint",
    });
  });

  it("assigns an approval configuration mutation exactly to authority", async () => {
    const fixture = await prepareLocalCase("Residual authority");
    const config = structuredClone(fixture.ctx.config);
    config.agents.approvals.require_network = !config.agents.approvals.require_network;
    await writeConfig(fixture.root, config);

    await expectExactlyChanged({
      ctx: fixture.ctx,
      prepared: fixture.prepared,
      component: "authority",
    });
  });

  it("assigns a switch to an existing policy module exactly to policy", async () => {
    const blueprintId = "docs.residual-policy";
    const policyA = ".agentplane/policy/residual-a.md";
    const policyB = ".agentplane/policy/residual-b.md";
    let blueprintPath = "";
    const fixture = await prepareLocalCase(
      "Residual policy selection",
      async ({ root }) => {
        await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
        await Promise.all([
          writeFile(path.join(root, policyA), "# Residual policy A\n", "utf8"),
          writeFile(path.join(root, policyB), "# Residual policy B\n", "utf8"),
        ]);
        blueprintPath = await writeTrustedProjectBlueprint({
          root,
          id: blueprintId,
          from: "docs.change",
          mutate: (blueprint) => {
            blueprint.policyModules = [policyA];
            blueprint.contextBudget.maxPolicyModules = 4;
          },
        });
      },
      preferredBlueprintRecipe(blueprintId),
    );
    expect(fixture.prepared.bundle.blueprint?.policyModules).toContain(policyA);
    expect(fixture.prepared.bundle.blueprint?.policyModules).not.toContain(policyB);
    const blueprint = JSON.parse(await readFile(blueprintPath, "utf8")) as Blueprint;
    blueprint.policyModules = [policyB];
    await writeFile(blueprintPath, `${JSON.stringify(blueprint, null, 2)}\n`, "utf8");

    await expectExactlyChanged({
      ctx: fixture.ctx,
      prepared: fixture.prepared,
      component: "policy",
    });
  });

  it("assigns a manifest lock mutation exactly to knowledge", async () => {
    const fixture = await prepareLocalCase("Residual knowledge");
    const manifestPath = path.join(fixture.root, ".agentplane", "context", "manifest.lock.json");
    await mkdir(path.dirname(manifestPath), { recursive: true });
    await writeFile(
      manifestPath,
      `${JSON.stringify({ schema_version: 1, test_revision: "after-prepare" })}\n`,
      "utf8",
    );

    await expectExactlyChanged({
      ctx: fixture.ctx,
      prepared: fixture.prepared,
      component: "knowledge",
    });
  });

  it("assigns a backend config mutation exactly to backend projection", async () => {
    const fixture = await prepareLocalCase("Residual backend config");
    await mkdir(path.dirname(fixture.ctx.backendConfigPath), { recursive: true });
    const existing = await readFile(fixture.ctx.backendConfigPath, "utf8").catch(() => null);
    const config = existing ? (JSON.parse(existing) as Record<string, unknown>) : { id: "local" };
    config.test_revision = "after-prepare";
    await writeFile(fixture.ctx.backendConfigPath, `${JSON.stringify(config)}\n`, "utf8");

    await expectExactlyChanged({
      ctx: fixture.ctx,
      prepared: fixture.prepared,
      component: "backend_projection",
    });
  });

  it("assigns backend config deletion exactly to backend projection", async () => {
    const fixture = await prepareLocalCase("Residual backend config deletion", async ({ root }) => {
      const configPath = path.join(root, ".agentplane", "backends", "local", "backend.json");
      await mkdir(path.dirname(configPath), { recursive: true });
      await writeFile(configPath, '{"id":"local","test_revision":"before"}\n', "utf8");
    });
    await rm(fixture.ctx.backendConfigPath);

    await expectExactlyChanged({
      ctx: fixture.ctx,
      prepared: fixture.prepared,
      component: "backend_projection",
    });
  });

  it("assigns a cloud backend state mutation exactly to backend projection", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Residual backend state");
    const localCtx = await loadCommandContext({ cwd: root, rootOverride: root });
    const task = await localCtx.taskBackend.getTask(taskId);
    if (!task) throw new Error(`Task not found: ${taskId}`);
    const projectedTask: TaskData = {
      ...task,
      revision: (task.revision ?? 0) + 1,
      sync: {
        version: 1,
        external_refs: [{ provider: "github", remote_id: taskId }],
        field_policies: {},
        freshness: {
          provider_revision: "provider-revision-1",
          projected_at: new Date().toISOString(),
        },
        conflicts: [],
      },
    };
    await localCtx.taskBackend.writeTask(projectedTask);

    const identity = {
      endpoint: "https://cloud.example",
      projectId: "project-residual",
      provider: "github",
    };
    const statePath = path.join(root, ".agentplane", "backends", "cloud", "state.json");
    await mkdir(path.dirname(statePath), { recursive: true });
    const state = {
      last_checked_at: new Date().toISOString(),
      last_start_ready_pull_at: null,
      pending_projection_apply: null,
      pending_push: null,
      projection_identity_sha256: cloudProjectionIdentitySha256(identity),
    };
    await writeFile(statePath, `${JSON.stringify(state)}\n`, "utf8");
    const cloud = new CloudBackend(
      {
        endpoint: identity.endpoint,
        token: "token",
        project_id: identity.projectId,
        provider: identity.provider,
        stale_after_seconds: 300,
      },
      {
        root,
        cache: new LocalBackend({ dir: path.join(root, ".agentplane", "tasks") }),
        fetchImpl: vi.fn<typeof fetch>(() =>
          Promise.reject(new Error("Residual fingerprint test must not access the network.")),
        ),
        autoSyncNetworkAllowed: false,
      },
    );
    const ctx: CommandContext = {
      ...localCtx,
      backendId: "cloud",
      taskBackend: cloud,
      memo: {},
    };
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-residual-backend-state",
    });

    await writeFile(
      statePath,
      `${JSON.stringify({
        ...state,
        last_start_ready_pull_at: "2026-07-24T00:00:00.000Z",
      })}\n`,
      "utf8",
    );

    await expectExactlyChanged({
      ctx,
      prepared,
      component: "backend_projection",
      probes: { load_context: () => Promise.resolve(ctx) },
    });

    await rm(statePath);
    await expectExactlyChanged({
      ctx,
      prepared,
      component: "backend_projection",
      probes: { load_context: () => Promise.resolve(ctx) },
    });
  });

  it("assigns an arbitrary source mutation exactly to Git", async () => {
    const fixture = await prepareLocalCase("Residual source");
    const sourcePath = path.join(fixture.root, "src", "residual-source.ts");
    await mkdir(path.dirname(sourcePath), { recursive: true });
    await writeFile(sourcePath, "export const residualSource = true;\n", "utf8");

    await expectExactlyChanged({
      ctx: fixture.ctx,
      prepared: fixture.prepared,
      component: "git",
    });
  });

  it.each(["missing", "invalid"] as const)(
    "assigns a knowledge lock transition to %s exactly to knowledge",
    async (transition) => {
      const fixture = await prepareLocalCase(
        `Residual knowledge ${transition}`,
        async ({ root }) => {
          const lockPath = path.join(root, ".agentplane", "context", "manifest.lock.json");
          await mkdir(path.dirname(lockPath), { recursive: true });
          await writeFile(lockPath, '{"schema_version":1,"revision":"before"}\n', "utf8");
        },
      );
      const lockPath = path.join(fixture.root, ".agentplane", "context", "manifest.lock.json");
      if (transition === "missing") {
        await rm(lockPath);
      } else {
        await writeFile(lockPath, "{", "utf8");
      }

      await expectExactlyChanged({
        ctx: fixture.ctx,
        prepared: fixture.prepared,
        component: "knowledge",
      });
    },
  );

  it("assigns selected policy module deletion exactly to policy", async () => {
    const fixture = await prepareLocalCase("Residual policy module");
    const modulePath = path.join(fixture.root, ".agentplane", "policy", "residual-policy.md");
    await mkdir(path.dirname(modulePath), { recursive: true });
    await writeFile(modulePath, "# Residual policy module\n", "utf8");
    const blueprint = fixture.prepared.bundle.blueprint;
    if (!blueprint) throw new Error("Prepared blueprint is missing.");
    blueprint.policyModules = [...blueprint.policyModules, ".agentplane/policy/residual-policy.md"];
    const preparationGit = await captureRunnerPreparationGitSnapshot({ ctx: fixture.ctx });
    const preparedFingerprint = await capturePreparedRunnerStateFingerprint({
      ctx: fixture.ctx,
      bundle: fixture.prepared.bundle,
      git: preparationGit,
    });
    fixture.prepared.precondition_fingerprint = preparedFingerprint;
    fixture.prepared.bundle.state_fingerprint = preparedFingerprint;
    await rm(modulePath);

    await expectExactlyChanged({
      ctx: fixture.ctx,
      prepared: fixture.prepared,
      component: "policy",
    });
  });

  it("rejects an empty HEAD advance while keeping the residual Git component stable", async () => {
    const fixture = await prepareLocalCase("Residual empty commit");
    await execFileAsync("git", ["commit", "--allow-empty", "-m", "advance head only"], {
      cwd: fixture.root,
      env: gitEnv(),
    });

    const current = await captureRunnerStateFingerprint({
      ctx: fixture.ctx,
      bundle: fixture.prepared.bundle,
    });

    expect(current.components.git).toEqual(
      fixture.prepared.precondition_fingerprint.components.git,
    );
    let rejection: unknown;
    try {
      assertStateFingerprintPrecondition({
        expected: fixture.prepared.precondition_fingerprint,
        current,
        policy: fixture.prepared.precondition_policy,
      });
    } catch (error) {
      rejection = error;
    }
    expect(rejection).toBeInstanceOf(StateFingerprintPreconditionError);
    if (!(rejection instanceof StateFingerprintPreconditionError)) {
      throw new Error("Expected a state fingerprint precondition error.");
    }
    expect(rejection.reason_code).toBe("state_fingerprint_stale");
    expect(rejection.diagnostic.changed_components).toContainEqual(
      expect.objectContaining({ component: "git" }),
    );
  });
});
