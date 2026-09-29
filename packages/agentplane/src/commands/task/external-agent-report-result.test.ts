import { mkdir, mkdtemp, readFile, rm, stat, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import { afterEach, describe, expect, it } from "vitest";

import {
  externalAgentResultDigest,
  type ExternalAgentExchange,
  type ExternalAgentResultEnvelope,
} from "./external-agent-exchange.js";
import {
  externalReportResultPath,
  materializeExternalReportResult,
} from "./external-agent-report-result.js";

const roots: string[] = [];
afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

function fixture(checkout = "/repo") {
  const taskId = "202609070000-REPORT";
  const result: ExternalAgentResultEnvelope = {
    schema_version: 1,
    kind: "agent_action_result",
    task_id: taskId,
    transition_id: `tr_${"a".repeat(32)}`,
    state_fingerprint: `sha256:${"b".repeat(64)}`,
    role: "EXECUTOR",
    result: {
      schema_version: 2,
      kind: "agent_semantic_result",
      work_order_id: "report-order",
      status: "completed",
      summary: "Investigated the findings.",
      findings: ["One finding remains unresolved."],
      uncertainty: ["No security-clean claim."],
    },
  };
  const exchange = {
    purpose: "implementation",
    task_id: taskId,
    work_order_id: "report-order",
    checkout,
    result,
    result_digest: externalAgentResultDigest(result),
  } as ExternalAgentExchange;
  const work_order = {
    work_order_id: "report-order",
    task: { id: taskId, work_item_id: "report" },
    authority: { writable_roots: [path.join(checkout, ".agentplane/tasks", taskId)] },
    required_outputs: [
      { id: "semantic-result", kind: "semantic_result", required: true },
      { id: "report", kind: "report", required: true },
    ],
  } as AgentWorkOrderV2;
  return { exchange, work_order, changed_paths: [] as string[] };
}

async function temporaryFixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-semantic-report-"));
  roots.push(root);
  const f = fixture(root);
  await mkdir(f.work_order.authority.writable_roots[0]!, { recursive: true });
  return f;
}

describe("report-only semantic results", () => {
  it("requires a current task-owned report scope and the accepted result digest", () => {
    const f = fixture();
    expect(externalReportResultPath(f)).toMatch(/semantic-report-[a-f0-9]{64}\.json$/u);
    for (const scopes of [
      [],
      ["."],
      ["src"],
      [".agentplane/tasks/another"],
      ["../outside"],
      [...f.work_order.authority.writable_roots, "src"],
    ]) {
      expect(
        externalReportResultPath({
          ...f,
          work_order: {
            ...f.work_order,
            authority: { ...f.work_order.authority, writable_roots: scopes },
          },
        }),
      ).toBeNull();
    }
    f.exchange.result!.result.summary = "Changed after acceptance.";
    expect(externalReportResultPath(f)).toBeNull();
  });

  it("rejects task-level, non-report, missing-output, and mismatched work-order results", () => {
    for (const change of ["task", "output", "missing", "order"] as const) {
      const f = fixture();
      if (change === "task") delete f.work_order.task.work_item_id;
      if (change === "output") f.work_order.required_outputs[1]!.kind = "artifact";
      if (change === "missing") f.work_order.required_outputs = [];
      if (change === "order") f.work_order.work_order_id = "other-order";
      expect(externalReportResultPath(f)).toBeNull();
    }
  });

  it("persists the exact envelope and preserves its file on identical replay", async () => {
    const f = await temporaryFixture();
    const [relative] = await materializeExternalReportResult(f);
    const target = path.join(f.exchange.checkout, relative!);
    expect(JSON.parse(await readFile(target, "utf8"))).toEqual(f.exchange.result);
    const before = await stat(target);
    expect(await materializeExternalReportResult({ ...f, changed_paths: [relative!] })).toEqual([
      relative,
    ]);
    const after = await stat(target);
    expect(after.mtimeMs).toBe(before.mtimeMs);
    await writeFile(target, "unrelated contents\n");
    await expect(materializeExternalReportResult(f)).rejects.toThrow(
      "differs from the accepted result",
    );
    expect(await readFile(target, "utf8")).toBe("unrelated contents\n");
  });

  it("preserves rejection of unrelated writes and ordinary no-diff implementations", async () => {
    const f = await temporaryFixture();
    await expect(
      materializeExternalReportResult({ ...f, changed_paths: ["src/other.ts"] }),
    ).rejects.toThrow("unrelated paths");
    f.work_order.authority.writable_roots = ["src"];
    expect(await materializeExternalReportResult(f)).toEqual([]);
  });

  it("refuses a symlinked report target", async () => {
    const f = await temporaryFixture();
    const target = path.join(f.exchange.checkout, externalReportResultPath(f)!);
    const victim = path.join(f.exchange.checkout, "victim.txt");
    await writeFile(victim, "preserve\n");
    await symlink(victim, target);
    await expect(materializeExternalReportResult(f)).rejects.toThrow("symlink");
    expect(await readFile(victim, "utf8")).toBe("preserve\n");
  });
});
