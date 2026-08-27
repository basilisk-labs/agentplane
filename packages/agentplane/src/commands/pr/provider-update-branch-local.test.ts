import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mkdtemp, readFile, rename, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";
import { updateProviderBranch } from "./provider-update-branch.js";
import { resolvePrHeadPublicationStatus } from "./head-publication.js";
import { reconcileProviderUpdateLocalHead } from "./provider-update-branch-local.js";
import type { ObservedChangeRequest } from "./internal/change-request-model.js";
import { providerUpdateBranchParams } from "../shared/provider-update-branch-route.js";

const mocks = vi.hoisted(() => ({
  observe: vi.fn(),
  api: vi.fn<(cwd: string, args: string[]) => Promise<unknown>>(),
}));
vi.mock("./internal/change-request-provider.js", () => ({
  observeExistingChangeRequestByNumber: mocks.observe,
}));
vi.mock("./internal/gh-api.js", () => ({ runGhApiJson: mocks.api }));

const directories: string[] = [];
async function git(cwd: string, ...args: string[]) {
  const result = await execFileAsync("git", args, { cwd, env: gitEnv() });
  return result.stdout.trim();
}

async function fixture() {
  const directory = await mkdtemp(path.join(os.tmpdir(), "agentplane-provider-local-"));
  directories.push(directory);
  const root = path.join(directory, "task");
  const remote = path.join(directory, "remote.git");
  const provider = path.join(directory, "provider");
  await git(directory, "init", "-b", "main", root);
  await git(root, "config", "user.name", "Fixture");
  await git(root, "config", "user.email", "fixture@example.invalid");
  await writeFile(path.join(root, "base.txt"), "base\n");
  await git(root, "add", ".");
  await git(root, "commit", "-m", "seed base");
  const branch = "task/T-1/update";
  await git(root, "checkout", "-b", branch);
  await writeFile(path.join(root, "task.txt"), "task\n");
  await git(root, "add", ".");
  await git(root, "commit", "-m", "task implementation");
  const oldHead = await git(root, "rev-parse", "HEAD");
  await git(directory, "clone", "--bare", root, remote);
  await git(root, "remote", "add", "origin", remote);
  await git(root, "push", "-u", "origin", branch);
  await git(directory, "clone", remote, provider);
  await git(provider, "config", "user.name", "Fixture");
  await git(provider, "config", "user.email", "fixture@example.invalid");
  await git(provider, "checkout", "main");
  await writeFile(path.join(provider, "base.txt"), "advanced base\n");
  await git(provider, "commit", "-am", "advance base");
  const baseHead = await git(provider, "rev-parse", "HEAD");
  await git(provider, "push", "origin", "main");
  await git(provider, "checkout", branch);
  await git(provider, "merge", "--no-ff", "main", "-m", "provider update");
  const newHead = await git(provider, "rev-parse", "HEAD");
  await git(provider, "push", "origin", branch);
  const identity = {
    provider: "github" as const,
    hostname: "github.com",
    remote: "origin",
    sourceProject: "owner/repo",
    targetProject: "owner/repo",
    sourceUrl: remote,
    targetUrl: remote,
  };
  const request = {
    gitRoot: root,
    identity,
    prNumber: 42,
    branch,
    baseBranch: "main",
    expectedHeadSha: oldHead,
    expectedBaseSha: baseHead,
  };
  const observed = (headSha: string): ObservedChangeRequest => ({
    provider: "github",
    identity,
    prNumber: 42,
    prUrl: "https://github.com/owner/repo/pull/42",
    status: "OPEN",
    mergedAt: null,
    mergeCommit: null,
    base: "main",
    baseSha: baseHead,
    headSha,
    headRef: branch,
    mergeability: { state: "not_conflicting", mergeable: true, providerState: "behind" },
  });
  mocks.api.mockImplementation(async (cwd: string, args: string[]) => {
    if (args.includes("PUT")) return {};
    const ancestor = args[0]!.split("/compare/")[1]!.split("...")[0]!;
    expect(await git(cwd === root ? provider : cwd, "merge-base", ancestor, newHead)).toBe(
      ancestor,
    );
    return {
      status: "ahead",
      base_commit: { sha: ancestor },
      merge_base_commit: { sha: ancestor },
    };
  });
  return { root, remote, provider, branch, oldHead, baseHead, newHead, request, observed };
}

describe("provider update local continuity", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  afterEach(async () => {
    await Promise.all(
      directories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })),
    );
  });

  it.each(["applied", "reconciled"] as const)(
    "leaves the next publication route aligned after an %s update",
    async (effect) => {
      const f = await fixture();
      if (effect === "applied")
        mocks.observe.mockResolvedValueOnce({ state: "found", pr: f.observed(f.oldHead) });
      mocks.observe.mockResolvedValue({ state: "found", pr: f.observed(f.newHead) });
      expect(await git(f.root, "rev-parse", "HEAD")).toBe(f.oldHead);
      expect(await updateProviderBranch(f.request)).toMatchObject({ state: "updated", effect });
      const head = await git(f.root, "rev-parse", "HEAD");
      expect(head).toBe(f.newHead);
      expect(await git(f.root, "rev-parse", "@{upstream}")).toBe(f.newHead);
      expect(await readFile(path.join(f.root, "base.txt"), "utf8")).toBe("advanced base\n");
      expect(
        await resolvePrHeadPublicationStatus({
          gitRoot: f.root,
          branch: f.branch,
          localHeadSha: head,
          providerObservation: { state: "found", headSha: f.newHead },
        }),
      ).toMatchObject({ state: "aligned" });
      expect(mocks.api.mock.calls.filter(([, args]) => args.includes("PUT"))).toHaveLength(
        effect === "applied" ? 1 : 0,
      );
    },
  );

  it("preserves dirty work and performs no provider mutation", async () => {
    const f = await fixture();
    await writeFile(path.join(f.root, "task.txt"), "uncommitted user work\n");
    mocks.observe.mockResolvedValue({ state: "found", pr: f.observed(f.oldHead) });
    expect(await updateProviderBranch(f.request)).toMatchObject({ state: "not_applied" });
    expect(mocks.api).not.toHaveBeenCalled();
    expect(await git(f.root, "rev-parse", "HEAD")).toBe(f.oldHead);
    expect(await readFile(path.join(f.root, "task.txt"), "utf8")).toBe("uncommitted user work\n");
  });

  it.each([false, true])(
    "recovers after exhausted readback with tracking already fetched: %s",
    async (fetched) => {
      const f = await fixture();
      mocks.observe.mockResolvedValue({ state: "found", pr: f.observed(f.oldHead) });
      expect(await updateProviderBranch(f.request)).toMatchObject({ state: "effect_in_doubt" });
      expect(await git(f.root, "rev-parse", "HEAD")).toBe(f.oldHead);
      expect(mocks.observe).toHaveBeenCalledTimes(5);
      if (fetched) await git(f.root, "fetch", "origin");
      const publication = await resolvePrHeadPublicationStatus({
        gitRoot: f.root,
        branch: f.branch,
        localHeadSha: f.oldHead,
        providerObservation: { state: "found", headSha: f.newHead },
      });
      const providerPr = { ...f.observed(f.newHead), mergeability: null };
      const flow = {
        task: { id: "T-1", status: "DONE", verification: "ok" },
        branch: { name: f.branch, headSha: f.oldHead, metaHeadSha: f.oldHead },
        pr: {
          provider: "github" as const,
          state: "OPEN" as const,
          source: "lookup" as const,
          prNumber: 42,
          prUrl: providerPr.prUrl,
          base: "main",
          headSha: f.newHead,
          mergeCommit: null,
        },
        providerObservation: { state: "found" as const, pr: providerPr },
        publication,
        hostedChecks: { checked: false as const, reason: "new head pending" },
        reviewThreads: { checked: false as const, reason: "not needed for reconciliation" },
        closeTail: { state: "not_applicable" as const, reason: "open" },
        queue: { present: false as const },
        handoff: { present: false as const },
        nextAction: "",
      };
      const params = providerUpdateBranchParams(flow);
      expect(params).toMatchObject({ expectedHeadSha: f.oldHead, reconcileHeadSha: f.newHead });
      if (!params) throw new Error("Missing reconciliation route");
      mocks.observe.mockResolvedValue({ state: "found", pr: providerPr });
      expect(await updateProviderBranch({ gitRoot: f.root, ...params })).toMatchObject({
        state: "updated",
        effect: "reconciled",
      });
      const head = await git(f.root, "rev-parse", "HEAD");
      expect(head).toBe(f.newHead);
      expect(await git(f.root, "rev-parse", "@{upstream}")).toBe(head);
      const aligned = await resolvePrHeadPublicationStatus({
        gitRoot: f.root,
        branch: f.branch,
        localHeadSha: head,
        providerObservation: { state: "found", headSha: head },
      });
      expect(aligned.state).toBe("aligned");
      expect(
        providerUpdateBranchParams({
          ...flow,
          branch: { ...flow.branch, headSha: head },
          publication: aligned,
        }),
      ).toBeNull();
      expect(mocks.api.mock.calls.filter(([, args]) => args.includes("PUT"))).toHaveLength(1);
      await git(f.root, "commit", "--allow-empty", "-m", "next local implementation");
      const nextHead = await git(f.root, "rev-parse", "HEAD");
      const unpublished = await resolvePrHeadPublicationStatus({
        gitRoot: f.root,
        branch: f.branch,
        localHeadSha: nextHead,
        providerObservation: { state: "found", headSha: f.newHead },
      });
      expect(unpublished.state).toBe("unpublished");
      expect(
        providerUpdateBranchParams({
          ...flow,
          branch: { ...flow.branch, headSha: nextHead },
          publication: unpublished,
        }),
      ).toBeNull();
    },
  );

  it.each(["untracked", "staged", "branch", "head", "remote", "upstream"])(
    "rejects local %s drift before the provider mutation",
    async (drift) => {
      const f = await fixture();
      if (drift === "untracked" || drift === "staged") {
        await writeFile(path.join(f.root, "user.txt"), "preserve\n");
        if (drift === "staged") await git(f.root, "add", "user.txt");
      }
      if (drift === "branch") await git(f.root, "checkout", "-b", "other-work");
      if (drift === "head") await git(f.root, "commit", "--allow-empty", "-m", "concurrent work");
      if (drift === "remote")
        await git(f.root, "remote", "set-url", "--push", "origin", f.provider);
      if (drift === "upstream")
        await git(f.root, "config", `branch.${f.branch}.merge`, "refs/heads/main");
      const beforeHead = await git(f.root, "rev-parse", "HEAD");
      const beforeStatus = await git(f.root, "status", "--porcelain", "--untracked-files=all");
      mocks.observe.mockResolvedValue({ state: "found", pr: f.observed(f.oldHead) });
      expect(await updateProviderBranch(f.request)).toMatchObject({
        state: "not_applied",
        reason: "local_state_unavailable",
      });
      expect(mocks.api).not.toHaveBeenCalled();
      expect(await git(f.root, "rev-parse", "HEAD")).toBe(beforeHead);
      expect(await git(f.root, "status", "--porcelain", "--untracked-files=all")).toBe(
        beforeStatus,
      );
    },
  );

  it("can repeat local reconciliation after an interrupted successful fast-forward", async () => {
    const f = await fixture();
    expect(await reconcileProviderUpdateLocalHead(f.request, f.newHead)).toBeNull();
    mocks.observe.mockResolvedValue({ state: "found", pr: f.observed(f.newHead) });
    expect(await updateProviderBranch(f.request)).toMatchObject({
      state: "updated",
      effect: "reconciled",
    });
    expect(mocks.api.mock.calls.filter(([, args]) => args.includes("PUT"))).toHaveLength(0);
    expect(await git(f.root, "rev-parse", "HEAD")).toBe(f.newHead);
  });

  it("preserves local changes introduced while the provider operation runs", async () => {
    const f = await fixture();
    mocks.observe
      .mockResolvedValueOnce({ state: "found", pr: f.observed(f.oldHead) })
      .mockResolvedValue({ state: "found", pr: f.observed(f.newHead) });
    const api = mocks.api.getMockImplementation()!;
    mocks.api.mockImplementation(async (cwd, args) => {
      if (args.includes("PUT")) await writeFile(path.join(f.root, "task.txt"), "concurrent edit\n");
      return api(cwd, args);
    });
    expect(await updateProviderBranch(f.request)).toMatchObject({ state: "effect_in_doubt" });
    expect(await git(f.root, "rev-parse", "HEAD")).toBe(f.oldHead);
    expect(await readFile(path.join(f.root, "task.txt"), "utf8")).toBe("concurrent edit\n");
  });

  it("does not adopt a remote head that moved after provider proof", async () => {
    const f = await fixture();
    await git(f.provider, "commit", "--allow-empty", "-m", "remote race");
    await git(f.provider, "push", "origin", f.branch);
    expect(await reconcileProviderUpdateLocalHead(f.request, f.newHead)).toContain(
      "does not match",
    );
    expect(await git(f.root, "rev-parse", "HEAD")).toBe(f.oldHead);
  });

  it("stops on fetch failure without advancing local history", async () => {
    const f = await fixture();
    await rename(f.remote, `${f.remote}.unavailable`);
    expect(await reconcileProviderUpdateLocalHead(f.request, f.newHead)).toContain("failed");
    expect(await git(f.root, "rev-parse", "HEAD")).toBe(f.oldHead);
  });

  it("does not overwrite ignored local files during fast-forward", async () => {
    const f = await fixture();
    await writeFile(path.join(f.provider, "generated.txt"), "incoming tracked data\n");
    await git(f.provider, "add", "generated.txt");
    await git(f.provider, "commit", "-m", "track generated data");
    await git(f.provider, "push", "origin", f.branch);
    const head = await git(f.provider, "rev-parse", "HEAD");
    await writeFile(path.join(f.root, ".git", "info", "exclude"), "generated.txt\n");
    await writeFile(path.join(f.root, "generated.txt"), "ignored user data\n");
    expect(await git(f.root, "status", "--porcelain")).toBe("");
    expect(await reconcileProviderUpdateLocalHead(f.request, head)).toContain("failed");
    expect(await git(f.root, "rev-parse", "HEAD")).toBe(f.oldHead);
    expect(await readFile(path.join(f.root, "generated.txt"), "utf8")).toBe("ignored user data\n");
  });
});
