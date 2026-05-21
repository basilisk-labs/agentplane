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
    ).resolves.toBe(0);
  });
});
