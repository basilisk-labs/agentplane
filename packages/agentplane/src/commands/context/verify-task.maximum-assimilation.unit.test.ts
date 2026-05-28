import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { CommandContext } from "../shared/task-backend.js";
import { cmdContextVerifyTask } from "./verify-task.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-context-verify-"));
  tempRoots.push(root);
  return root;
}

afterEach(async () => {
  vi.restoreAllMocks();
  for (const root of tempRoots) {
    await rm(root, { recursive: true, force: true });
  }
  tempRoots = [];
});

async function write(root: string, rel: string, text: string): Promise<void> {
  const target = path.join(root, rel);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, text, "utf8");
}

describe("maximum-assimilation task verification", () => {
  it("reports ordinary task-new tasks as an explicit non-applicable skip", async () => {
    const root = await tempRoot();
    const task = {
      id: "202605281326-CODE01",
      status: "DOING",
      owner: "CODER",
      mutation_scope: "code",
      blueprint_request: "code.branch_pr",
      runner: { evidence: { changed_paths: ["packages/agentplane/src/context/verify-task.ts"] } },
    };
    const ctx = {
      resolvedProject: { gitRoot: root },
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
      taskBackend: { getTask: () => Promise.resolve(task) },
      backendId: "local",
      backendConfigPath: path.join(root, ".agentplane/backends/local/backend.json"),
      memo: {},
    } as unknown as CommandContext;
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await expect(
      cmdContextVerifyTask({
        ctx,
        cwd: root,
        parsed: { taskId: task.id },
      }),
    ).resolves.toBe(0);

    expect(out.mock.calls.map((call) => String(call[0])).join("")).toContain(
      "context verify-task 202605281326-CODE01: skipped_not_applicable (task_kind=unknown; expected context)",
    );
  });

  it("still rejects context tasks with invalid mutation scope", async () => {
    const root = await tempRoot();
    const task = {
      id: "202605281326-CTXBAD",
      status: "DOING",
      owner: "CURATOR",
      task_kind: "context",
      mutation_scope: "code",
      blueprint_request: "context.assimilation",
      extensions: { "agentplane.context": {} },
    };
    const ctx = {
      resolvedProject: { gitRoot: root },
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
      taskBackend: { getTask: () => Promise.resolve(task) },
      backendId: "local",
      backendConfigPath: path.join(root, ".agentplane/backends/local/backend.json"),
      memo: {},
    } as unknown as CommandContext;

    await expect(
      cmdContextVerifyTask({
        ctx,
        cwd: root,
        parsed: { taskId: task.id },
      }),
    ).rejects.toThrow(/invalid mutation scope/u);
  });

  it("rejects glossary files without navigable canonical entries", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/wiki/glossary.md",
      `---
agentplane_context:
  source_refs:
    - context/raw/specs/payment-api.md#L1-L10
---

# Glossary

Canonical terms will be added later.
`,
    );
    const task = {
      id: "202605191451-CTXGLO",
      status: "DOING",
      owner: "CURATOR",
      task_kind: "context",
      mutation_scope: "context",
      blueprint_request: "context.maximum_assimilation",
      extensions: {
        "agentplane.context": {
          task_type: "context_assimilation",
          mode: "maximum_assimilation",
          allowed_outputs: ["context/wiki/glossary.md"],
          source_set: {
            files: [
              {
                path: "context/raw/specs/payment-api.md",
                sha256: "sha256:1111111111111111111111111111111111111111111111111111111111111111",
              },
            ],
          },
        },
      },
      runner: {
        evidence: {
          changed_paths: ["context/wiki/glossary.md"],
        },
      },
    };
    const ctx = {
      resolvedProject: { gitRoot: root },
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
      taskBackend: { getTask: () => Promise.resolve(task) },
      backendId: "local",
      backendConfigPath: path.join(root, ".agentplane/backends/local/backend.json"),
      memo: {},
    } as unknown as CommandContext;

    await expect(
      cmdContextVerifyTask({
        ctx,
        cwd: root,
        parsed: { taskId: task.id },
      }),
    ).rejects.toThrow(/glossary must include at least one navigable canonical wiki entry/u);

    await write(
      root,
      "context/wiki/glossary.md",
      `---
agentplane_context:
  source_refs:
    - context/raw/specs/payment-api.md#L1-L10
---

# Glossary

- Payment API -> [[payments/api]]
`,
    );

    await expect(
      cmdContextVerifyTask({
        ctx,
        cwd: root,
        parsed: { taskId: task.id },
      }),
    ).rejects.toThrow(/requires non-empty derived facts/u);

    await write(
      root,
      ".agentplane/context/derived/facts/facts.jsonl",
      `${JSON.stringify({
        id: "fact.payment-api",
        summary: "Payment API is a sourced concept.",
        source_refs: ["context/raw/specs/payment-api.md#L1-L10"],
        confidence: 0.9,
        status: "accepted",
      })}\n`,
    );
    await write(
      root,
      ".agentplane/context/derived/graph/entities.jsonl",
      `${JSON.stringify({
        id: "entity.payment-api",
        kind: "concept",
        label: "Payment API",
        source_refs: ["context/raw/specs/payment-api.md#L1-L10"],
        confidence: 0.9,
        status: "accepted",
      })}\n${JSON.stringify({
        id: "entity.payment-api-doc",
        kind: "source",
        label: "Payment API source",
        source_refs: ["context/raw/specs/payment-api.md#L1-L10"],
        confidence: 0.9,
        status: "accepted",
      })}\n`,
    );
    await write(
      root,
      ".agentplane/context/derived/graph/edges.jsonl",
      `${JSON.stringify({
        id: "edge.payment-api.mentions.source",
        from: "entity.payment-api-doc",
        to: "entity.payment-api",
        relation: "mentions",
        source_refs: ["context/raw/specs/payment-api.md#L1-L10"],
        confidence: 0.9,
        status: "accepted",
      })}\n`,
    );
    await write(
      root,
      ".agentplane/context/derived/graph/provenance_edges.jsonl",
      `${JSON.stringify({
        id: "prov.fact.payment-api.1",
        source: "context/raw/specs/payment-api.md#L1-L10",
        target: "fact.payment-api",
        artifact: ".agentplane/context/derived/facts/facts.jsonl",
      })}\n`,
    );
    await write(
      root,
      "context/wiki/reports/topology.md",
      [
        "# Topology",
        "",
        "- source_shape: context/raw/specs/payment-api.md",
        "- canonical_families: Payment API",
        "- page_vs_heading granularity: concept page with glossary heading",
        "- source_refs: context/raw/specs/payment-api.md#L1-L10",
        "",
      ].join("\n"),
    );
    await write(
      root,
      "context/wiki/reports/coverage.md",
      [
        "# Coverage",
        "",
        "- covered: Payment API source was assimilated into graph rows.",
        "- omitted: none; redacted: none; duplicate: none; unresolved: none.",
        "- source_refs: context/raw/specs/payment-api.md#L1-L10",
        "",
      ].join("\n"),
    );

    await expect(
      cmdContextVerifyTask({
        ctx,
        cwd: root,
        parsed: { taskId: task.id },
      }),
    ).rejects.toThrow(/requires non-empty source coverage rows/u);

    await write(
      root,
      ".agentplane/context/derived/reports/coverage.jsonl",
      `${JSON.stringify({
        id: "coverage.payment-api",
        summary: "Payment API source was structurally extracted.",
        source_path: "context/raw/specs/payment-api.md",
        coverage_status: "covered",
        reason: "Reusable fact, entity, edge, and provenance rows were extracted.",
        covered_item_ids: [
          "fact.payment-api",
          "entity.payment-api",
          "edge.payment-api.mentions.source",
        ],
        source_refs: ["context/raw/specs/payment-api.md#L1-L10"],
        confidence: 0.9,
        status: "accepted",
      })}\n`,
    );

    await expect(
      cmdContextVerifyTask({
        ctx,
        cwd: root,
        parsed: { taskId: task.id },
      }),
    ).resolves.toBe(0);
  });
});
