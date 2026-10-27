import { describe, expect, it } from "vitest";
import type { TaskPrMeta } from "@agentplaneorg/core/schemas";
import { bindKernelAdoption } from "./kernel-adopted-pr-route.js";

const taskId = "202610271727-138DXY";
const at = "2026-10-27T17:27:00.000Z";
const receipt = {
  schema_version: 1 as const,
  task_id: taskId,
  provider: "github" as const,
  hostname: "github.com",
  remote: "origin",
  source_project: "org/repo",
  target_project: "org/repo",
  pr_number: 42,
  head_ref: "change",
  base_ref: "main",
  head_sha: "a".repeat(40),
  base_sha: "b".repeat(40),
  observed_at: at,
  readback_digest: `sha256:${"c".repeat(64)}`,
  authority_digest: `sha256:${"d".repeat(64)}`,
};
const meta: TaskPrMeta = {
  schema_version: 1,
  task_id: taskId,
  created_at: at,
  updated_at: at,
  pr_number: 42,
  provider: {
    schema_version: 1,
    kind: "github",
    hostname: "github.com",
    remote: "origin",
    source_project: "org/repo",
    target_project: "org/repo",
  },
  adoption: receipt,
};

describe("canonical adopted PR route binding", () => {
  it("binds the immutable receipt and stable provider identity", () => {
    const adopted = bindKernelAdoption(meta, taskId);
    expect(adopted?.digest).toMatch(/^sha256:[a-f0-9]{64}$/u);
    expect(adopted).toMatchObject({
      identity: {
        provider: "github",
        source_project: "org/repo",
        target_project: "org/repo",
        pr_number: 42,
      },
    });
  });

  it("treats missing adoption as the ordinary branch PR route", () => {
    expect(bindKernelAdoption({ ...meta, adoption: undefined }, taskId)).toBeNull();
  });

  it.each([
    ["task", { ...meta, task_id: "other" }],
    ["PR", { ...meta, pr_number: 43 }],
    ["provider", { ...meta, provider: { ...meta.provider!, remote: "other" } }],
    ["foreign repository", { ...meta, adoption: { ...receipt, source_project: "foreign/repo" } }],
  ])("rejects mismatched %s identity", (_label, changed) => {
    expect(() => bindKernelAdoption(changed, taskId)).toThrow("identity changed");
  });
});
