import { mkdtemp, writeFile, readFile, chmod, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { GitHostIdentity } from "./internal/git-host-identity.js";
import type { ProviderUpdateBranchRequest } from "./provider-update-branch.js";

const mocks = vi.hoisted(() => ({ api: vi.fn<(call: Call) => unknown>() }));
vi.mock("./internal/glab-api.js", async (original) => ({
  ...(await original<Record<string, unknown>>()),
  runGlabApiJson: mocks.api,
}));
import { updateProviderBranch } from "./provider-update-branch.js";

const roots: string[] = [];
const branch = "task/202611031819-QKNKFW/gitlab-update-fixture";
const project = "group/sub/project";
const endpoint = `projects/${encodeURIComponent(project)}`;
type Call = { endpoint: string; method?: string; hostname: string };

function git(cwd: string, ...args: string[]): string {
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: os.devNull },
  }).trim();
}

async function fixture(conflict = false) {
  const root = await mkdtemp(path.join(os.tmpdir(), "gitlab-update-"));
  roots.push(root);
  const bare = path.join(root, "host.git");
  const work = path.join(root, "work");
  git(root, "init", "--bare", "--initial-branch=main", bare);
  git(root, "clone", bare, work);
  git(work, "config", "user.name", "Fixture");
  git(work, "config", "user.email", "fixture@example.test");
  await writeFile(path.join(work, ".gitignore"), ".agentplane/\n");
  await writeFile(path.join(work, "shared.txt"), "base\n");
  git(work, "add", ".");
  git(work, "commit", "-m", "base");
  git(work, "push", "origin", "main");
  git(work, "checkout", "-b", branch);
  await writeFile(path.join(work, "own.txt"), "task\n");
  if (conflict) await writeFile(path.join(work, "shared.txt"), "task\n");
  git(work, "add", ".");
  git(work, "commit", "-m", "task");
  const H = git(work, "rev-parse", "HEAD");
  git(work, "push", "-u", "origin", branch);
  git(work, "checkout", "main");
  await writeFile(path.join(work, "foreign.txt"), "canonical\n");
  if (conflict) await writeFile(path.join(work, "shared.txt"), "canonical\n");
  git(work, "add", ".");
  git(work, "commit", "-m", "canonical");
  const R = git(work, "rev-parse", "HEAD");
  git(work, "push", "origin", "main");
  git(work, "checkout", branch);
  const identity: GitHostIdentity = {
    provider: "gitlab",
    hostname: "gitlab.example.test",
    remote: "origin",
    sourceProject: project,
    targetProject: project,
    sourceUrl: bare,
    targetUrl: bare,
  };
  const request: ProviderUpdateBranchRequest = {
    gitRoot: work,
    worktreePath: work,
    identity,
    prNumber: 42,
    branch,
    baseBranch: "main",
    expectedHeadSha: H,
    expectedBaseSha: R,
  };
  const behavior: {
    unavailableAfterPush?: boolean;
    mrUrl?: string;
    projectPath?: string;
    onMr?: (count: number) => void;
  } = {};
  let mrCount = 0;
  const source = () => git(bare, "rev-parse", `refs/heads/${branch}`);
  const base = () => git(bare, "rev-parse", "refs/heads/main");
  mocks.api.mockImplementation((call: Call) => {
    if (call.hostname !== identity.hostname || (call.method && call.method !== "GET"))
      throw new Error("Unexpected provider write or host");
    if (call.endpoint === endpoint)
      return { id: 7, path_with_namespace: behavior.projectPath ?? project };
    if (call.endpoint === `${endpoint}/merge_requests/42`) {
      behavior.onMr?.(++mrCount);
      const head = source();
      const target = base();
      if (behavior.unavailableAfterPush && head !== H) throw new Error("readback unavailable");
      let current = false;
      try {
        git(bare, "merge-base", "--is-ancestor", target, head);
        current = true;
      } catch {
        /* behind */
      }
      return {
        iid: 42,
        state: "opened",
        source_project_id: 7,
        target_project_id: 7,
        source_branch: branch,
        target_branch: "main",
        sha: head,
        has_conflicts: false,
        detailed_merge_status: current ? "mergeable" : "need_rebase",
        web_url: behavior.mrUrl ?? `https://${identity.hostname}/${project}/-/merge_requests/42`,
        diff_refs: {
          head_sha: head,
          base_sha: git(bare, "merge-base", head, target),
          start_sha: target,
        },
      };
    }
    if (call.endpoint === `${endpoint}/repository/branches/main`)
      return { name: "main", commit: { id: base() } };
    if (call.endpoint.startsWith(`${endpoint}/repository/commits/`)) {
      const sha = call.endpoint.slice(`${endpoint}/repository/commits/`.length);
      return { id: sha, parent_ids: git(bare, "show", "-s", "--format=%P", sha).split(" ") };
    }
    if (call.endpoint.startsWith(`${endpoint}/repository/merge_base?`)) {
      const refs = new URLSearchParams(call.endpoint.split("?")[1]).getAll("refs[]");
      return { id: git(bare, "merge-base", ...refs) };
    }
    throw new Error(`Unexpected endpoint ${call.endpoint}`);
  });
  const hook = path.join(work, ".git/hooks/pre-push");
  await writeFile(hook, '#!/bin/sh\nprintf x >> "$0.marker"\n');
  await chmod(hook, 0o700);
  function advance(ref: string, from: string): string {
    const tree = git(bare, "rev-parse", `${from}^{tree}`);
    const next = git(
      bare,
      "-c",
      "user.name=Concurrent",
      "-c",
      "user.email=concurrent@example.test",
      "commit-tree",
      tree,
      "-p",
      from,
      "-m",
      "concurrent advance",
    );
    git(bare, "update-ref", `refs/heads/${ref}`, next, from);
    return next;
  }
  return { root, bare, work, H, R, request, behavior, source, base, hook, advance };
}

beforeEach(() => {
  vi.resetAllMocks();
  vi.stubEnv("GIT_CONFIG_NOSYSTEM", "1");
  vi.stubEnv("GIT_CONFIG_GLOBAL", os.devNull);
});
afterEach(async () => {
  vi.unstubAllEnvs();
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

describe("native GitLab current-base update with real Git", () => {
  it("publishes exactly H/R without force, runs normal hooks and fast-forwards the local task", async () => {
    const f = await fixture();
    const result = await updateProviderBranch(f.request);
    expect(result).toMatchObject({
      state: "updated",
      effect: "applied",
      evidence: { provider: "gitlab" },
    });
    const head = f.source();
    expect(git(f.bare, "show", "-s", "--format=%P", head)).toBe(`${f.H} ${f.R}`);
    expect(git(f.work, "rev-parse", "HEAD")).toBe(head);
    expect(git(f.work, "rev-parse", `origin/${branch}`)).toBe(head);
    expect(f.base()).toBe(f.R);
    expect(git(f.work, "status", "--porcelain", "--untracked-files=all")).toBe("");
    expect(await readFile(`${f.hook}.marker`, "utf8")).toBe("x");
    expect(await readFile(path.join(f.work, "own.txt"), "utf8")).toBe("task\n");
    expect(await readFile(path.join(f.work, "foreign.txt"), "utf8")).toBe("canonical\n");
    expect(mocks.api.mock.calls.every(([call]) => !call.method || call.method === "GET")).toBe(
      true,
    );
  });

  it("refuses a natural merge conflict without changing local or hosted branches", async () => {
    const f = await fixture(true);
    await expect(updateProviderBranch(f.request)).resolves.toMatchObject({
      state: "not_applied",
      reason: "conflict",
    });
    expect(f.source()).toBe(f.H);
    expect(git(f.work, "rev-parse", "HEAD")).toBe(f.H);
    expect(git(f.work, "status", "--porcelain")).toBe("");
    await expect(readFile(`${f.hook}.marker`)).rejects.toMatchObject({ code: "ENOENT" });
  });

  it.each(["source", "target"] as const)(
    "refuses a concurrent %s advance before push",
    async (kind) => {
      const f = await fixture();
      let advanced = "";
      f.behavior.onMr = (count) => {
        if (count === 2)
          advanced = f.advance(kind === "source" ? branch : "main", kind === "source" ? f.H : f.R);
      };
      await expect(updateProviderBranch(f.request)).resolves.toMatchObject({
        state: "not_applied",
        reason: kind === "source" ? "head_drift" : "base_drift",
      });
      expect(kind === "source" ? f.source() : f.base()).toBe(advanced);
      expect(git(f.work, "rev-parse", "HEAD")).toBe(f.H);
      await expect(readFile(`${f.hook}.marker`)).rejects.toMatchObject({ code: "ENOENT" });
    },
  );

  it.each(["host", "project"] as const)(
    "refuses wrong %s readback before publication",
    async (kind) => {
      const f = await fixture();
      if (kind === "host")
        f.behavior.mrUrl = "https://other.example.test/group/sub/project/-/merge_requests/42";
      else f.behavior.projectPath = "different/project";
      await expect(updateProviderBranch(f.request)).resolves.toMatchObject({
        state: "not_applied",
        reason: "observation_unavailable",
      });
      expect(f.source()).toBe(f.H);
      await expect(readFile(`${f.hook}.marker`)).rejects.toMatchObject({ code: "ENOENT" });
    },
  );

  it("keeps a hook rejection unknown and never repeats the push", async () => {
    const f = await fixture();
    await writeFile(f.hook, '#!/bin/sh\nprintf x >> "$0.marker"\nexit 1\n');
    await expect(updateProviderBranch(f.request)).rejects.toMatchObject({
      code: "E_RUNTIME",
      context: { reason_code: "provider_update_effect_in_doubt" },
    });
    expect(await readFile(`${f.hook}.marker`, "utf8")).toBe("x");
    expect(f.source()).toBe(f.H);
    expect(git(f.work, "rev-parse", "HEAD")).toBe(f.H);
  });

  it("reconciles an accepted publication after lost readback without another push", async () => {
    const f = await fixture();
    f.behavior.unavailableAfterPush = true;
    await expect(updateProviderBranch(f.request)).rejects.toMatchObject({
      context: { reason_code: "provider_update_effect_in_doubt" },
    });
    const published = f.source();
    expect(published).not.toBe(f.H);
    expect(git(f.work, "rev-parse", "HEAD")).toBe(f.H);
    f.behavior.unavailableAfterPush = false;
    await expect(
      updateProviderBranch({ ...f.request, reconcileHeadSha: published }),
    ).resolves.toMatchObject({
      state: "updated",
      effect: "reconciled",
      evidence: { observedHeadSha: published },
    });
    expect(git(f.work, "rev-parse", "HEAD")).toBe(published);
    expect(await readFile(`${f.hook}.marker`, "utf8")).toBe("x");
  });

  it("preserves the original H/R intent when main advances after the accepted push", async () => {
    const f = await fixture();
    let later = "";
    f.behavior.onMr = () => {
      if (!later && f.source() !== f.H) later = f.advance("main", f.R);
    };
    await expect(updateProviderBranch(f.request)).rejects.toMatchObject({
      context: { reason_code: "provider_update_effect_in_doubt", original_base_sha: f.R },
    });
    expect(git(f.bare, "show", "-s", "--format=%P", f.source())).toBe(`${f.H} ${f.R}`);
    expect(f.base()).toBe(later);
    expect(git(f.work, "rev-parse", "HEAD")).toBe(f.H);
    expect(await readFile(`${f.hook}.marker`, "utf8")).toBe("x");
  });

  it("rejects exact H/R parents carrying an altered merge tree without adopting them", async () => {
    const f = await fixture();
    const wrong = git(
      f.bare,
      "-c",
      "user.name=Other",
      "-c",
      "user.email=other@example.test",
      "commit-tree",
      git(f.bare, "rev-parse", `${f.H}^{tree}`),
      "-p",
      f.H,
      "-p",
      f.R,
      "-m",
      "altered tree",
    );
    git(f.bare, "update-ref", `refs/heads/${branch}`, wrong, f.H);
    await expect(
      updateProviderBranch({ ...f.request, reconcileHeadSha: wrong }),
    ).rejects.toMatchObject({
      context: { reason_code: "provider_update_effect_in_doubt" },
    });
    expect(git(f.work, "rev-parse", "HEAD")).toBe(f.H);
    expect(f.source()).toBe(wrong);
    await expect(readFile(`${f.hook}.marker`)).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("keeps dirty work and unsupported GitLab forks outside the update lane", async () => {
    const f = await fixture();
    await writeFile(path.join(f.work, "user.txt"), "preserve\n");
    await expect(updateProviderBranch(f.request)).resolves.toMatchObject({
      state: "not_applied",
      reason: "local_state_unavailable",
    });
    await expect(
      updateProviderBranch({
        ...f.request,
        identity: { ...f.request.identity, sourceProject: "fork/project" },
      }),
    ).resolves.toMatchObject({ state: "not_applied", reason: "unsupported_provider" });
    expect(await readFile(path.join(f.work, "user.txt"), "utf8")).toBe("preserve\n");
    expect(f.source()).toBe(f.H);
  });
});
