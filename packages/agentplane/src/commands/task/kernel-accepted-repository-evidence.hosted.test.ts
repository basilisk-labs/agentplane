import { afterEach, describe, expect, it } from "vitest";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { readKernelRepositoryEvidence } from "./kernel-accepted-repository-evidence.js";
import { runKernelNativeValidation } from "./kernel-inspection-validation.js";

const roots: string[] = [];
const sha = (character: string) => character.repeat(40);
const digest = (character: string) => `sha256:${character.repeat(64)}` as k.Sha256Digest;

afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

async function fixture() {
  const root = await mkdtemp(path.join(process.cwd(), ".agentplane/tmp/accepted-hosted-"));
  roots.push(root);
  const head = k.bindHostedPrHeadEvidence({
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
    head_tree: sha("5"),
    checkout_head: sha("3"),
    checkout_tree: sha("5"),
    head_descends_from_adoption: true,
    base_descends_from_adoption: true,
  });
  const contents = {
    schema_version: 1 as const,
    kind: "canonical_repository_evidence" as const,
    task_id: "task-1",
    work_item_id: "item-1",
    task_revision: 4,
    work_order_id: digest("a"),
    checkout: path.join(root, "detached"),
    control_checkout: path.join(root, "task"),
    branch: "change",
    base_commit: sha("4"),
    implementation_commit: sha("3"),
    implementation_tree: sha("5"),
    changed_paths: ["src/index.ts"],
    evaluator_target: sha("3"),
    origin: "adopted_hosted_pr" as const,
    hosted_head: head,
  };
  const write = async (value: unknown) => {
    await writeFile(path.join(root, "repository-evidence.json"), JSON.stringify(value));
    return readKernelRepositoryEvidence(root);
  };
  return { contents, write };
}

describe("accepted adopted hosted PR evidence", () => {
  it("retains the distinct control and implementation checkouts", async () => {
    const { contents, write } = await fixture();
    const evidence = { ...contents, digest: k.kernelDigest(contents) };
    await expect(write(evidence)).resolves.toEqual(evidence);
  });

  it("refuses to run native checks in the task checkout without a fresh provider route", async () => {
    const { contents } = await fixture();
    const evidence = { ...contents, digest: k.kernelDigest(contents) };
    await expect(
      runKernelNativeValidation({
        command: { resolvedProject: { gitRoot: evidence.control_checkout } } as never,
        runtime: {} as never,
        binding: {} as never,
        commands: ["bun test"],
        directory: "/unused",
        repositoryEvidence: evidence,
      }),
    ).rejects.toThrow("exact-head checkout");
  });

  it.each([
    ["wrong task", { task_id: "task-2" }],
    ["wrong head", { implementation_commit: sha("6") }],
    ["wrong base", { base_commit: sha("6") }],
    ["wrong tree", { implementation_tree: sha("6") }],
    ["wrong evaluator", { evaluator_target: sha("6") }],
  ])("rejects a self-consistent receipt with %s", async (_label, change) => {
    const { contents, write } = await fixture();
    const changed = { ...contents, ...change };
    await expect(write({ ...changed, digest: k.kernelDigest(changed) })).rejects.toThrow();
  });
});
