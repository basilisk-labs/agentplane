import { afterEach, describe, expect, it } from "vitest";
import { mkdtemp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import {
  assertCurrentHostedHead,
  captureHostedPrHeadEvidence,
} from "./kernel-hosted-head-evidence.js";

const roots: string[] = [];
const sha = (character: string) => character.repeat(40);
const digest = (character: string) => `sha256:${character.repeat(64)}` as const;

afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

async function fixture(overrides: Record<string, { exitCode: number; stdout: string }> = {}) {
  const root = await mkdtemp(path.join(process.cwd(), ".agentplane/tmp/hosted-head-test-"));
  roots.push(root);
  const checkout = path.join(root, "detached");
  await mkdir(checkout);
  const replies: Record<string, { exitCode: number; stdout: string }> = {
    "rev-parse HEAD^{commit}": { exitCode: 0, stdout: sha("3") },
    "rev-parse HEAD^{tree}": { exitCode: 0, stdout: sha("5") },
    "rev-parse --path-format=absolute --git-common-dir": { exitCode: 0, stdout: root },
    "status --porcelain=v1 --untracked-files=all": { exitCode: 0, stdout: "" },
    "symbolic-ref --quiet HEAD": { exitCode: 1, stdout: "" },
    "config --bool core.sparseCheckout": { exitCode: 1, stdout: "" },
    [`merge-base --is-ancestor ${sha("1")} ${sha("3")}`]: { exitCode: 0, stdout: "" },
    [`merge-base --is-ancestor ${sha("2")} ${sha("4")}`]: { exitCode: 0, stdout: "" },
    ...overrides,
  };
  const git = (_cwd: string, args: readonly string[]) => {
    const result = replies[args.join(" ")];
    if (!result) throw new Error(`Unexpected Git call: ${args.join(" ")}`);
    return Promise.resolve(result);
  };
  const input = {
    repository_root: root,
    checkout,
    task_id: "task-1",
    work_order_id: digest("a"),
    adoption_digest: digest("b"),
    identity: {
      provider: "github",
      hostname: "github.com",
      remote: "origin",
      source_project: "org/repo",
      target_project: "org/repo",
      pr_number: 42,
      head_ref: "change",
      base_ref: "main",
    },
    adopted_head: sha("1"),
    adopted_base: sha("2"),
    current_head: sha("3"),
    current_base: sha("4"),
    current_readback_digest: digest("c"),
    git,
  };
  return input;
}

describe("supervisor-owned adopted head observation", () => {
  it("records the exact clean detached checkout and its tree", async () => {
    const evidence = await captureHostedPrHeadEvidence(await fixture());
    expect(evidence).toMatchObject({
      task_id: "task-1",
      current_head: sha("3"),
      head_tree: sha("5"),
      checkout_head: sha("3"),
      checkout_tree: sha("5"),
      head_descends_from_adoption: true,
      base_descends_from_adoption: true,
    });
  });

  it("requires a fresh matching provider readback before reusing the checkout", async () => {
    const options = await fixture();
    const evidence = await captureHostedPrHeadEvidence(options);
    const current = () =>
      Promise.resolve({
        identity: evidence.identity,
        current_head: evidence.current_head,
        current_base: evidence.current_base,
        current_readback_digest: evidence.current_readback_digest,
      });
    await expect(
      assertCurrentHostedHead({
        repository_root: options.repository_root,
        checkout: options.checkout,
        evidence,
        fresh_readback: current,
        git: options.git,
      }),
    ).resolves.toBeUndefined();
    await expect(
      assertCurrentHostedHead({
        repository_root: options.repository_root,
        checkout: options.checkout,
        evidence,
        fresh_readback: async () => ({ ...(await current()), current_head: sha("6") }),
        git: options.git,
      }),
    ).rejects.toThrow("provider identity or exact head changed");
  });

  it.each([
    ["wrong head", { "rev-parse HEAD^{commit}": { exitCode: 0, stdout: sha("6") } }],
    [
      "dirty checkout",
      { "status --porcelain=v1 --untracked-files=all": { exitCode: 0, stdout: "?? stray" } },
    ],
    [
      "attached branch",
      { "symbolic-ref --quiet HEAD": { exitCode: 0, stdout: "refs/heads/change" } },
    ],
    ["sparse checkout", { "config --bool core.sparseCheckout": { exitCode: 0, stdout: "true" } }],
    [
      "unreadable checkout configuration",
      { "config --bool core.sparseCheckout": { exitCode: 128, stdout: "" } },
    ],
    [
      "rewritten head",
      { [`merge-base --is-ancestor ${sha("1")} ${sha("3")}`]: { exitCode: 1, stdout: "" } },
    ],
    [
      "rewritten base",
      { [`merge-base --is-ancestor ${sha("2")} ${sha("4")}`]: { exitCode: 1, stdout: "" } },
    ],
  ])("rejects %s", async (_label, overrides) => {
    await expect(captureHostedPrHeadEvidence(await fixture(overrides))).rejects.toThrow();
  });
});
