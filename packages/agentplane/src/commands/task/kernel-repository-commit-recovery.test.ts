import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { cleanGitEnv, configureGitUser, tempRepo } from "@agentplane/testkit";
import { makeTaskFixture } from "@agentplane/testkit/task";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import type * as Preparation from "./direct-task-supervisor-implementation.js";
import { loadCommandContext } from "../shared/task-backend.js";

const mocks = vi.hoisted(() => ({ commit: vi.fn(), prepare: vi.fn() }));
vi.mock("../guard/impl/commit.js", () => ({ cmdCommit: mocks.commit }));
vi.mock("../shared/hook-shim-template.js", () => ({ assertHookRunnerReady: vi.fn() }));
vi.mock("./direct-task-supervisor-implementation.js", async (original) => ({
  ...(await original<typeof Preparation>()),
  prepareDirectImplementationEvidence: mocks.prepare,
}));
import {
  captureKernelRepositoryBaseline,
  commitCanonicalImplementation,
} from "./kernel-repository-coordinator.js";

const repositories: Awaited<ReturnType<typeof tempRepo>>[] = [];
beforeEach(() => vi.resetAllMocks());
afterEach(async () => {
  await Promise.all(repositories.splice(0).map((repo) => repo.cleanup()));
});

function git(root: string, ...args: string[]) {
  return execFileSync("git", ["-c", "core.hooksPath=/dev/null", ...args], {
    cwd: root,
    env: cleanGitEnv(),
    encoding: "utf8",
  }).trim();
}

it.each(["retry", "missing-intent", "changed-commit"])(
  "reconciles a real direct documentation commit after evidence freeze fails (%s)",
  async (scenario) => {
    const repo = await tempRepo({ withDefaultConfig: true, branch: "main" });
    repositories.push(repo);
    await configureGitUser(repo.root);
    const command = await loadCommandContext({ cwd: repo.root });
    const id = "202611030000-RCV001";
    await command.taskBackend.writeTask(
      makeTaskFixture({
        id,
        task_kind: "docs",
        mutation_scope: "docs",
        execution_route: {
          schema_version: 1,
          requested_mode: "direct",
          selected_mode: "direct",
          repository_mode: "direct",
          reason_codes: ["fixture_direct"],
          frozen: true,
        },
      }),
    );
    await mkdir(path.join(repo.root, "docs"));
    await writeFile(path.join(repo.root, "docs/spec.md"), "Original specification\n");
    git(repo.root, "add", "--all");
    git(repo.root, "commit", "-m", "fixture original direct repository");
    const order = {
      task: { id, work_item_id: "documentation", revision: 1 },
      work_order_id: k.kernelDigest("documentation work order"),
      authority: { writable_roots: [path.join(repo.root, "docs/spec.md")] },
    } as AgentWorkOrderV2;
    const baseline = await captureKernelRepositoryBaseline(command, order);
    const directory = path.join(repo.root, ".git/recovery-exchange");
    await mkdir(directory);
    await writeFile(path.join(directory, "repository-baseline.json"), JSON.stringify(baseline));
    await writeFile(path.join(repo.root, "docs/spec.md"), "Completed specification\n");
    mocks.commit.mockImplementation(() => {
      git(repo.root, "commit", "-m", "🚧 RCV001 task: apply canonical agent result");
      return Promise.resolve(0);
    });
    const actual = await vi.importActual<typeof Preparation>(
      "./direct-task-supervisor-implementation.js",
    );
    mocks.prepare.mockImplementation(actual.prepareDirectImplementationEvidence);
    mocks.prepare.mockResolvedValueOnce({
      status: "missing",
      reason: "Injected independent evidence freeze failure",
    });
    const options = { command, directory, work_order: order, changed_paths: ["docs/spec.md"] };
    await expect(commitCanonicalImplementation(options)).rejects.toThrow(
      "Injected independent evidence freeze failure",
    );
    const implementation = git(repo.root, "rev-parse", "HEAD");
    expect(implementation).not.toBe(baseline.head);
    expect(mocks.commit).toHaveBeenCalledTimes(1);
    const intentFile = path.join(directory, "repository-commit-intent.json");
    const intent = await readFile(intentFile, "utf8");
    if (scenario === "missing-intent") {
      const { rename } = await import("node:fs/promises");
      await rename(intentFile, `${intentFile}.retained`);
    }
    if (scenario === "changed-commit") {
      await writeFile(path.join(repo.root, "foreign.txt"), "Unrelated implementation\n");
      git(repo.root, "add", "foreign.txt");
      git(repo.root, "commit", "-m", "unrelated commit after the interrupted effect");
    }
    if (scenario !== "retry") {
      await expect(commitCanonicalImplementation(options)).rejects.toThrow(
        scenario === "missing-intent"
          ? "changed Git history before commit dispatch"
          : "in doubt and cannot be reconciled",
      );
    } else {
      await expect(commitCanonicalImplementation(options)).resolves.toMatchObject({
        implementation_commit: implementation,
        evaluator_target: implementation,
        base_commit: baseline.head,
        changed_paths: ["docs/spec.md"],
      });
      expect(git(repo.root, "rev-parse", "HEAD")).toBe(implementation);
      expect(await readFile(intentFile, "utf8")).toBe(intent);
    }
    expect(mocks.commit).toHaveBeenCalledTimes(1);
    expect(git(repo.root, "rev-list", "--count", `${baseline.head}..${implementation}`)).toBe("1");
    expect(await readFile(path.join(repo.root, "docs/spec.md"), "utf8")).toBe(
      "Completed specification\n",
    );
  },
);
