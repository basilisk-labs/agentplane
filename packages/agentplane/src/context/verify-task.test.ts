import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { validateContextArtifacts } from "./verify-task-artifacts.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-verify-task-artifacts-"));
  tempRoots.push(root);
  return root;
}

afterEach(async () => {
  for (const root of tempRoots) await rm(root, { recursive: true, force: true });
  tempRoots = [];
});

async function write(root: string, rel: string, text: string): Promise<void> {
  const target = path.join(root, rel);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, text, "utf8");
}

describe("context verify-task artifact gates", () => {
  it("requires graph refs or an explicit no-graph reason on maximum-assimilation wiki pages", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/wiki/entities/payment-api.md",
      [
        "---",
        "agentplane_context:",
        "  source_refs:",
        "    - context/raw/specs/payment-api.md#lines=1-3",
        "---",
        "# Payment API",
        "",
        "The [[Payment API]] is documented.",
      ].join("\n"),
    );

    const errors = await validateContextArtifacts({
      root,
      task: {
        id: "202605191451-CTXMAX",
        status: "DOING",
        task_kind: "context",
        blueprint_request: "context.maximum_assimilation",
      },
      context: {
        task_type: "context_assimilation",
        mode: "maximum_assimilation",
        source_set: {
          files: [
            {
              path: "context/raw/specs/payment-api.md",
              sha256: "sha256:1111111111111111111111111111111111111111111111111111111111111111",
            },
          ],
        },
      },
      changedPaths: ["context/wiki/entities/payment-api.md"],
    });

    expect(errors).toContain(
      "context/wiki/entities/payment-api.md: maximum-assimilation wiki pages require graph_refs or no_graph_ref_reason",
    );
  });
});
