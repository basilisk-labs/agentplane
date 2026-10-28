import { afterEach, describe, expect, it } from "vitest";
import { mkdir, mkdtemp, rm } from "node:fs/promises";
import path from "node:path";
import { prepareKernelHostedCheckout } from "./kernel-hosted-checkout.js";

const roots: string[] = [];
const sha = (character: string) => character.repeat(40);
const digest = (character: string) => `sha256:${character.repeat(64)}` as const;

afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

async function fixture(changedHead = sha("3")) {
  const root = await mkdtemp(path.join(process.cwd(), ".agentplane/tmp/hosted-checkout-"));
  roots.push(root);
  const identity = {
    provider: "github",
    hostname: "github.com",
    remote: "origin",
    source_project: "org/repo",
    target_project: "org/repo",
    pr_number: 42,
    head_ref: "change",
    base_ref: "main",
  };
  let fetched: "head" | "base" = "head";
  let added = 0;
  const git = async (cwd: string, args: readonly string[]) => {
    const command = args.join(" ");
    if (command === "fetch --no-tags origin refs/heads/change") {
      fetched = "head";
      return { exitCode: 0, stdout: "" };
    }
    if (command === "fetch --no-tags origin refs/heads/main") {
      fetched = "base";
      return { exitCode: 0, stdout: "" };
    }
    if (command === "rev-parse FETCH_HEAD^{commit}") {
      return { exitCode: 0, stdout: fetched === "head" ? changedHead : sha("4") };
    }
    if (args[0] === "worktree" && args[1] === "add") {
      added += 1;
      await mkdir(args[3]!);
      return { exitCode: 0, stdout: "" };
    }
    if (command === "rev-parse HEAD^{commit}") return { exitCode: 0, stdout: sha("3") };
    if (command === "rev-parse HEAD^{tree}") return { exitCode: 0, stdout: sha("5") };
    if (command === "rev-parse --path-format=absolute --git-common-dir") {
      return { exitCode: 0, stdout: root };
    }
    if (command === "status --porcelain=v1 --untracked-files=all") {
      return { exitCode: 0, stdout: "" };
    }
    if (command === "symbolic-ref --quiet HEAD") return { exitCode: 1, stdout: "" };
    if (command === "config --bool core.sparseCheckout") return { exitCode: 1, stdout: "" };
    if (command.startsWith("merge-base --is-ancestor ")) {
      return { exitCode: 0, stdout: "" };
    }
    if (command.startsWith("diff --no-renames --name-only ")) {
      return { exitCode: 0, stdout: "src/index.ts\n" };
    }
    throw new Error(`Unexpected Git call from ${cwd}: ${command}`);
  };
  const fresh_readback = () =>
    Promise.resolve({
      identity,
      current_head: sha("3"),
      current_base: sha("4"),
      current_readback_digest: digest("c"),
    });
  return {
    opts: {
      repository_root: root,
      worktrees_dir_rel: ".agentplane/worktrees",
      task_id: "task-1",
      work_order_id: digest("a"),
      adoption_digest: digest("b"),
      identity,
      adopted_head: sha("1"),
      adopted_base: sha("2"),
      fresh_readback,
      git,
    },
    added: () => added,
  };
}

describe("durable supervisor-owned hosted checkout", () => {
  it("retains and reuses only a clean detached exact-head worktree", async () => {
    const f = await fixture();
    const first = await prepareKernelHostedCheckout(f.opts);
    expect(first.changed_paths).toEqual(["src/index.ts"]);
    expect(first.evidence.checkout_head).toBe(sha("3"));
    expect(f.added()).toBe(1);
    const second = await prepareKernelHostedCheckout(f.opts);
    expect(second.evidence.digest).toBe(first.evidence.digest);
    expect(f.added()).toBe(1);
  });

  it("rejects fetched head drift before recording an exact checkout", async () => {
    const f = await fixture(sha("6"));
    await expect(prepareKernelHostedCheckout(f.opts)).rejects.toThrow("head differs");
    expect(f.added()).toBe(0);
  });

  it("rejects a worktree path outside the repository", async () => {
    const f = await fixture();
    await expect(
      prepareKernelHostedCheckout({
        ...f.opts,
        worktrees_dir_rel: "../../outside",
      }),
    ).rejects.toThrow("escapes");
  });
});
