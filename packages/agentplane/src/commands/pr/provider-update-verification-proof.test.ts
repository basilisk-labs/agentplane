import { assertBranchTaskArtifactOwnership } from "./internal/branch-task-artifact-ownership.js";
import { mkdtemp, writeFile, readFile, readdir, unlink, rename, mkdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  completeSupervisorExecutionEpisode,
  digestSupervisorEpisodeValue,
} from "@agentplaneorg/core/schemas";
import type { CommandContext } from "../shared/task-backend.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../shared/supervisor-execution-episode.js";
import { operationPayloadDigest } from "../shared/workflow-step-authority.js";
import {
  retainProviderUpdateVerificationProof,
  inheritedProviderUpdatePaths,
} from "./provider-update-verification-proof.js";

const fp = `sha256:${"a".repeat(64)}`;
const taskId = "202610290115-PROOFT";
async function fixture(foreignPath = "foreign.txt", overlap = false, transient = false) {
  const root = await mkdtemp(path.join(os.tmpdir(), "provider-update-proof-"));
  const git = (...args: string[]) =>
    execFileSync("git", args, {
      cwd: root,
      encoding: "utf8",
      env: { ...process.env, GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: os.devNull },
    }).trim();
  git("init", "-b", "main");
  git("config", "user.name", "Fixture");
  git("config", "user.email", "fixture@example.test");
  git("remote", "add", "origin", "https://github.com/example/proof.git");
  await writeFile(path.join(root, "base.txt"), "base");
  git("add", ".");
  git("commit", "-m", "base");
  const B = git("rev-parse", "HEAD");
  git("checkout", "-b", "task/proof");
  await writeFile(path.join(root, "own.txt"), "task");
  if (overlap) {
    await mkdir(path.dirname(path.join(root, foreignPath)), { recursive: true });
    await writeFile(path.join(root, foreignPath), "canonical");
  }
  git("add", ".");
  git("commit", "-m", "task");
  const H = git("rev-parse", "HEAD");
  git("checkout", "main");
  await mkdir(path.dirname(path.join(root, foreignPath)), { recursive: true });
  await writeFile(path.join(root, foreignPath), "canonical");
  git("add", ".");
  git("commit", "-m", "canonical");
  if (transient) {
    await unlink(path.join(root, foreignPath));
    git("add", "-A");
    git("commit", "-m", "canonical artifact retirement");
  }
  const R = git("rev-parse", "HEAD");
  git("checkout", "task/proof");
  git("merge", "--no-ff", "main", "-m", "provider update");
  const merged = git("rev-parse", "HEAD");
  const command = { resolvedProject: { gitRoot: root }, memo: {} } as CommandContext;
  const params = {
    taskId,
    identity: {
      provider: "github" as const,
      hostname: "github.com",
      remote: "origin",
      sourceProject: "example/proof",
      targetProject: "example/proof",
      sourceUrl: "https://github.com/example/proof.git",
      targetUrl: "https://github.com/example/proof.git",
    },
    prNumber: 1,
    branch: "task/proof",
    baseBranch: "main",
    expectedHeadSha: H,
    expectedBaseSha: R,
  };
  const journal = createSupervisorExecutionEpisodeJournal({
    task_id: taskId,
    task_revision: 1,
    state_fingerprint_digest: fp,
    budget: {
      max_episodes: 20,
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
  const started = startSupervisorExecutionEpisode({
    journal,
    role: "EXECUTOR",
    kind: "cli_operation",
    operation_identity: { id: "provider.pr.update_branch", params },
    precondition_fingerprint_digest: fp,
    authority_ref: "workflow-operation:provider.pr.update_branch",
    authority_digest: fp,
    effect_ref: `provider.pr.update_branch:${taskId}:${fp}:${operationPayloadDigest({ id: "provider.pr.update_branch", type: "provider_update_branch", params })}`,
  });
  if (started.status !== "started") throw new Error("Fixture intent did not start");
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: root,
    task_id: taskId,
  });
  const store = createSupervisorEpisodeStore(journalPath);
  await store.write(started.journal);
  const completion = {
    status: "succeeded",
    observed_postconditions: [`provider_update_head:${merged}`],
    exit_code: 0,
  };
  const retain = () =>
    retainProviderUpdateVerificationProof({
      command,
      params,
      authority_digest: fp,
      observed_head_sha: merged,
      completion,
    });
  const complete = async (failed = false) =>
    store.write(
      completeSupervisorExecutionEpisode({
        journal: started.journal,
        operation_key: started.operation_key,
        result: failed ? { status: "failed" } : completion,
        failed,
      }),
    );
  const inherited = (evaluated = git("rev-parse", "HEAD")) =>
    inheritedProviderUpdatePaths({
      command,
      task_id: taskId,
      frozen_base: B,
      evaluated_sha: evaluated,
      changed_paths: ["own.txt", foreignPath],
      workflow_dir: ".agentplane/tasks",
      tasks_path: ".agentplane/tasks.json",
    });
  return {
    root,
    git,
    command,
    params,
    B,
    H,
    R,
    merged,
    journalPath,
    store,
    started,
    completion,
    retain,
    complete,
    inherited,
  };
}

describe("native provider update verification proof", () => {
  it("does not trust provisional proof until the exact native operation completes", async () => {
    const f = await fixture();
    await f.retain();
    expect(await f.inherited()).toEqual([]);
    await f.complete();
    expect(await f.inherited()).toEqual(["foreign.txt"]);
    await f.retain();
    expect(await f.inherited()).toEqual(["foreign.txt"]);
  });
  it("retains no inherited authority for a failed native outcome", async () => {
    const f = await fixture();
    await f.retain();
    await f.complete(true);
    expect(await f.inherited()).toEqual([]);
    await expect(f.retain()).rejects.toThrow(/failed|completion/);
  });
  it("recovers an applied merge after completion without repeating any provider request", async () => {
    const f = await fixture();
    await f.complete();
    await f.retain();
    expect(await f.inherited()).toEqual(["foreign.txt"]);
  });
  it("refuses an occupied proof slot with different contents", async () => {
    const f = await fixture();
    await f.retain();
    const dir = path.dirname(f.journalPath);
    const names = await readdir(dir);
    const name = names.find((value) => value.startsWith("provider-update-"))!;
    await writeFile(path.join(dir, name), "{}\n");
    await expect(f.retain()).rejects.toThrow(/slot changed/);
  });
  it("does not mask subsequent foreign source edits", async () => {
    const f = await fixture();
    await f.retain();
    await f.complete();
    await writeFile(path.join(f.root, "foreign.txt"), "later task edit");
    f.git("add", ".");
    f.git("commit", "-m", "task edit");
    expect(await f.inherited()).toEqual([]);
  });
  it("retains exact canonical imports after owned semantic rework", async () => {
    const f = await fixture();
    await f.retain();
    await f.complete();
    await writeFile(path.join(f.root, "own.txt"), "approved semantic rework");
    f.git("add", "own.txt");
    f.git("commit", "-m", "owned semantic rework");
    expect(await f.inherited()).toEqual(["foreign.txt"]);
  });

  it("rejects altered identity even when a proof digest is recomputed", async () => {
    const f = await fixture();
    await f.retain();
    await f.complete();
    const dir = path.dirname(f.journalPath);
    const names = await readdir(dir);
    const name = names.find((value) => value.startsWith("provider-update-"))!;
    const value = JSON.parse(await readFile(path.join(dir, name), "utf8")) as {
      params: typeof f.params;
      digest: string;
      observed_head_sha: string;
      completion: typeof f.completion;
    };
    value.params.identity.targetProject = "other/repo";
    const { digest: _old, ...payload } = value;
    value.digest = digestSupervisorEpisodeValue(payload);
    await writeFile(path.join(dir, name), JSON.stringify(value));
    await expect(f.inherited()).rejects.toThrow(/authority/);
  });
  it("binds the observed merge to the exact completed result, not just completed status", async () => {
    const f = await fixture();
    await f.retain();
    await f.complete();
    const dir = path.dirname(f.journalPath);
    const names = await readdir(dir);
    const name = names.find((value) => value.startsWith("provider-update-"))!;
    // A different merge commit with the same parents is insufficient provider evidence.
    const tree = f.git("rev-parse", `${f.merged}^{tree}`);
    const other = f.git("commit-tree", tree, "-p", f.H, "-p", f.R, "-m", "unobserved merge");
    const value = JSON.parse(await readFile(path.join(dir, name), "utf8")) as {
      params: typeof f.params;
      digest: string;
      observed_head_sha: string;
      completion: typeof f.completion;
    };
    value.observed_head_sha = other;
    value.completion.observed_postconditions = [`provider_update_head:${other}`];
    const { digest: _old, ...payload } = value;
    value.digest = digestSupervisorEpisodeValue(payload);
    await writeFile(path.join(dir, name), JSON.stringify(value));
    await expect(f.inherited()).rejects.toThrow(/completion/);
  });
  it("reuses a provisional commitment during authenticated recovery without overwriting it", async () => {
    const f = await fixture();
    await f.retain();
    const dir = path.dirname(f.journalPath);
    const names = await readdir(dir);
    const name = names.find((value) => value.startsWith("provider-update-"))!;
    const before = await readFile(path.join(dir, name), "utf8");
    const recovered = await retainProviderUpdateVerificationProof({
      command: f.command,
      params: f.params,
      authority_digest: fp,
      observed_head_sha: f.merged,
      completion: {
        kind: "provider_update_branch_effect_resolution",
        verdict: "applied",
        observed_head_sha: f.merged,
        original_base_sha: f.R,
        observed_base_sha: f.R,
      },
    });
    expect(recovered).toEqual(f.completion);
    expect(await f.inherited()).toEqual([]);
    await f.store.write(
      completeSupervisorExecutionEpisode({
        journal: f.started.journal,
        operation_key: f.started.operation_key,
        result: recovered,
      }),
    );
    expect(await f.inherited()).toEqual(["foreign.txt"]);
    expect(await readFile(path.join(dir, name), "utf8")).toBe(before);
  });
  it.each(["original", "observed"])(
    "rejects changed %s recovery base evidence",
    async (changed) => {
      const f = await fixture();
      await expect(
        retainProviderUpdateVerificationProof({
          command: f.command,
          params: f.params,
          authority_digest: fp,
          observed_head_sha: f.merged,
          completion: {
            kind: "provider_update_branch_effect_resolution",
            verdict: "applied",
            observed_head_sha: f.merged,
            original_base_sha: changed === "original" ? f.H : f.R,
            observed_base_sha: changed === "observed" ? f.H : f.R,
          },
        }),
      ).rejects.toThrow(/completion changed|outside the original update ancestry/u);
      expect(await f.inherited()).toEqual([]);
    },
  );
  it("supports another canonical advance in the same Task after metadata-only descendants", async () => {
    const f = await fixture();
    await f.retain();
    await f.complete();
    const { mkdir } = await import("node:fs/promises");
    const metadata = `.agentplane/tasks/${taskId}`;
    await mkdir(path.join(f.root, metadata), { recursive: true });
    await writeFile(path.join(f.root, metadata, "README.md"), "native metadata");
    f.git("add", metadata);
    f.git("commit", "-m", "native artifacts");
    const H2 = f.git("rev-parse", "HEAD");
    f.git("checkout", "main");
    await writeFile(path.join(f.root, "foreign.txt"), "canonical second revision");
    f.git("add", "foreign.txt");
    f.git("commit", "-m", "second canonical advance");
    const R2 = f.git("rev-parse", "HEAD");
    f.git("checkout", "task/proof");
    f.git("merge", "--no-ff", "main", "-m", "second provider update");
    const merged2 = f.git("rev-parse", "HEAD");
    const params = { ...f.params, expectedHeadSha: H2, expectedBaseSha: R2 };
    const journal = (await f.store.read())!;
    const started = startSupervisorExecutionEpisode({
      journal,
      role: "EXECUTOR",
      kind: "cli_operation",
      operation_identity: { id: "provider.pr.update_branch", params },
      precondition_fingerprint_digest: fp,
      authority_ref: "workflow-operation:provider.pr.update_branch",
      authority_digest: fp,
      effect_ref: `provider.pr.update_branch:${taskId}:${fp}:${operationPayloadDigest({ id: "provider.pr.update_branch", type: "provider_update_branch", params })}`,
    });
    if (started.status !== "started") throw new Error("second intent did not start");
    await f.store.write(started.journal);
    const completion = {
      status: "succeeded",
      observed_postconditions: [`provider_update_head:${merged2}`],
      exit_code: 0,
    };
    await retainProviderUpdateVerificationProof({
      command: f.command,
      params,
      authority_digest: fp,
      observed_head_sha: merged2,
      completion,
    });
    await f.store.write(
      completeSupervisorExecutionEpisode({
        journal: started.journal,
        operation_key: started.operation_key,
        result: completion,
      }),
    );
    expect(await f.inherited()).toEqual(["foreign.txt"]);
    expect(f.B).toBe(f.git("merge-base", f.H, f.R));
  });
});

describe("canonical import path lineage", () => {
  it.each(["edit-revert", "delete-recreate", "rename-revert"])(
    "does not inherit foreign bytes after %s even if current tree matches R",
    async (mutation) => {
      const f = await fixture();
      await f.retain();
      await f.complete();
      const file = path.join(f.root, "foreign.txt");
      if (mutation === "edit-revert") await writeFile(file, "unapproved");
      else if (mutation === "delete-recreate") await unlink(file);
      else await rename(file, path.join(f.root, "renamed.txt"));
      f.git("add", "-A");
      f.git("commit", "-m", "foreign change");
      if (mutation === "rename-revert") await rename(path.join(f.root, "renamed.txt"), file);
      else await writeFile(file, "canonical");
      f.git("add", "-A");
      f.git("commit", "-m", "restore canonical bytes");
      expect(await f.inherited()).toEqual([]);
    },
  );
});

describe("native import proof in foreign Task ownership", () => {
  it("uses completed proof through the production ownership guard after semantic rework", async () => {
    const foreign = ".agentplane/tasks/FOREIGN/README.md";
    const f = await fixture(foreign);
    const options = {
      gitRoot: f.root,
      baseBranch: f.B,
      branch: "task/proof",
      workflowDir: ".agentplane/tasks",
      tasksPath: ".agentplane/tasks.json",
      primaryTaskId: taskId,
      providerUpdate: { command: f.command, frozenBase: f.B },
    };
    await expect(assertBranchTaskArtifactOwnership(options)).rejects.toThrow(/other tasks/);
    await f.retain();
    await expect(assertBranchTaskArtifactOwnership(options)).rejects.toThrow(/other tasks/);
    await f.complete();
    await writeFile(path.join(f.root, "own.txt"), "approved source repair");
    f.git("add", "own.txt");
    f.git("commit", "-m", "semantic repair");
    await expect(assertBranchTaskArtifactOwnership(options)).resolves.toBeUndefined();
    await writeFile(path.join(f.root, foreign), "foreign tamper");
    f.git("add", foreign);
    f.git("commit", "-m", "foreign tamper");
    await expect(assertBranchTaskArtifactOwnership(options)).rejects.toThrow(/other tasks/);
    expect(f.git("merge-base", f.B, "HEAD")).toBe(f.B);
  });

  it("preserves pre-update ownership even when the imported tree matches canonical bytes", async () => {
    const foreign = ".agentplane/tasks/FOREIGN/README.md";
    const f = await fixture(foreign, true);
    await f.retain();
    await f.complete();
    expect(await f.inherited()).toEqual([]);
    await expect(
      assertBranchTaskArtifactOwnership({
        gitRoot: f.root,
        baseBranch: f.B,
        branch: "task/proof",
        workflowDir: ".agentplane/tasks",
        tasksPath: ".agentplane/tasks.json",
        primaryTaskId: taskId,
        providerUpdate: { command: f.command, frozenBase: f.B },
      }),
    ).rejects.toThrow(/other tasks/);
  });
});

describe("ownership of imports absent from the final frozen-base diff", () => {
  it.each(["delete", "rename-to-own"])(
    "rejects committed %s of a canonical foreign artifact",
    async (mutation) => {
      const foreign = ".agentplane/tasks/FOREIGN/README.md";
      const f = await fixture(foreign);
      await f.retain();
      await f.complete();
      if (mutation === "delete") await unlink(path.join(f.root, foreign));
      else {
        await mkdir(path.join(f.root, `.agentplane/tasks/${taskId}`), { recursive: true });
        await rename(
          path.join(f.root, foreign),
          path.join(f.root, `.agentplane/tasks/${taskId}/stolen.md`),
        );
      }
      f.git("add", "-A");
      f.git("commit", "-m", "foreign import removal");
      expect(f.git("diff", "--name-only", f.B, "HEAD")).not.toContain(foreign);
      await expect(
        assertBranchTaskArtifactOwnership({
          gitRoot: f.root,
          baseBranch: f.B,
          branch: "task/proof",
          workflowDir: ".agentplane/tasks",
          tasksPath: ".agentplane/tasks.json",
          primaryTaskId: taskId,
          providerUpdate: { command: f.command, frozenBase: f.B },
        }),
      ).rejects.toThrow(/other tasks/);
    },
  );
});

it("attributes canonical-only transient artifact history without charging it to the Task", async () => {
  const f = await fixture(".agentplane/tasks/FOREIGN/README.md", false, true);
  await f.retain();
  await f.complete();
  await writeFile(path.join(f.root, "own.txt"), "own semantic rework");
  f.git("add", "own.txt");
  f.git("commit", "-m", "own semantic rework");
  await expect(
    assertBranchTaskArtifactOwnership({
      gitRoot: f.root,
      baseBranch: f.B,
      branch: "task/proof",
      workflowDir: ".agentplane/tasks",
      tasksPath: ".agentplane/tasks.json",
      primaryTaskId: taskId,
      providerUpdate: { command: f.command, frozenBase: f.B },
    }),
  ).resolves.toBeUndefined();
});

it("refuses actual foreign ownership when the native update failed", async () => {
  const f = await fixture(".agentplane/tasks/FOREIGN/README.md");
  await f.retain();
  await f.complete(true);
  await expect(
    assertBranchTaskArtifactOwnership({
      gitRoot: f.root,
      baseBranch: f.B,
      branch: "task/proof",
      workflowDir: ".agentplane/tasks",
      tasksPath: ".agentplane/tasks.json",
      primaryTaskId: taskId,
      providerUpdate: { command: f.command, frozenBase: f.B },
    }),
  ).rejects.toThrow(/other tasks/);
});

it("does not inherit a foreign mode change reverted to the exact canonical tree", async () => {
  const f = await fixture();
  await f.retain();
  await f.complete();
  f.git("update-index", "--chmod=+x", "foreign.txt");
  f.git("commit", "-m", "foreign mode change");
  f.git("update-index", "--chmod=-x", "foreign.txt");
  f.git("commit", "-m", "restore canonical mode");
  expect(await f.inherited()).toEqual([]);
});
