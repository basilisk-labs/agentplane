import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { CommandContext } from "../commands/shared/task-backend.js";
import type { TaskNewParsed } from "../commands/task/new.js";
import { cmdContextIngest } from "./ingest.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-ingest-pack-"));
  tempRoots.push(root);
  return root;
}

afterEach(async () => {
  vi.restoreAllMocks();
  for (const root of tempRoots) await rm(root, { recursive: true, force: true });
  tempRoots = [];
});

async function write(root: string, rel: string, text: string): Promise<void> {
  const target = path.join(root, rel);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, text, "utf8");
}

async function readJson<T>(root: string, rel: string): Promise<T> {
  return JSON.parse(await readFile(path.join(root, rel), "utf8")) as T;
}

describe("context ingest task pack", () => {
  it("creates task-bound source lock, canonical snapshot, span skeleton, context pack, and expected artifacts", async () => {
    const root = await tempRoot();
    await write(root, "context/raw/specs/payment-api.md", "# Payment API\n\nStable contract.\n");
    vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    const tasks: { id: string; owner: string }[] = [];
    let parsedAllowedOutputs: string[] = [];
    const createTask = vi.fn(({ parsed }: { parsed: TaskNewParsed }) => {
      const contextExtension = parsed.extensions?.["agentplane.context"] as
        | { allowed_outputs?: string[] }
        | undefined;
      parsedAllowedOutputs = contextExtension?.allowed_outputs ?? [];
      tasks.push({ id: "202607021200-CTXPACK", owner: "CURATOR" });
    });
    const ctx = {
      resolvedProject: { gitRoot: root },
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
      taskBackend: { listTasks: () => Promise.resolve([...tasks]) },
      backendId: "local",
      backendConfigPath: path.join(root, ".agentplane/backends/local/backend.json"),
      memo: {},
    } as unknown as CommandContext;

    await cmdContextIngest({
      ctx,
      cwd: root,
      parsed: { sources: [], mode: "changed", dryRun: false, indexOnly: false },
      createTask,
    });

    const taskRoot = ".agentplane/tasks/202607021200-CTXPACK";
    const sourceLock = await readJson<{ files: { path: string }[] }>(
      root,
      `${taskRoot}/source-set.lock.json`,
    );
    const expectedArtifacts = await readJson<{ required: string[] }>(
      root,
      `${taskRoot}/expected-artifacts.json`,
    );
    const skeletonText = await readFile(
      path.join(root, taskRoot, "source-spans.skeleton.jsonl"),
      "utf8",
    );
    const spans = skeletonText
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line) as { span_id: string; source_path: string });
    const contextPack = await readFile(path.join(root, taskRoot, "context-pack.md"), "utf8");

    expect(sourceLock.files).toMatchObject([{ path: "context/raw/specs/payment-api.md" }]);
    expect(spans[0]).toMatchObject({ source_path: "context/raw/specs/payment-api.md" });
    expect(spans[0]?.span_id).toMatch(/^span\.[a-f0-9]{12}\.[a-f0-9]{12}\.1$/u);
    expect(contextPack).toContain("Generated spans: 1.");
    expect(expectedArtifacts.required).toContain(`${taskRoot}/source-spans.skeleton.jsonl`);
    expect(expectedArtifacts.required).toEqual(
      expect.arrayContaining([
        ".agentplane/context/derived/ontology/entity-resolution.jsonl",
        ".agentplane/context/derived/ontology/page-creation.jsonl",
        ".agentplane/context/derived/sources/source-spans.jsonl",
        ".agentplane/context/derived/wiki/topology.plan.json",
        ".agentplane/context/derived/wiki/link-index.jsonl",
        ".agentplane/context/derived/wiki/orphan-report.jsonl",
        ".agentplane/context/derived/reports/evaluator.jsonl",
        "context/wiki/reports/conflicts.md",
        "context/wiki/reports/open-questions.md",
        "context/wiki/reports/evaluator-review.md",
      ]),
    );
    expect(parsedAllowedOutputs).toEqual(
      expect.arrayContaining([
        ".agentplane/context/derived/claims/**",
        ".agentplane/context/derived/ontology/**",
        ".agentplane/context/derived/sources/**",
        ".agentplane/context/derived/wiki/**",
        ".agentplane/tasks/${taskId}/context-pack.md",
        ".agentplane/tasks/${taskId}/canonical-snapshot.json",
        ".agentplane/tasks/${taskId}/source-set.lock.json",
        ".agentplane/tasks/${taskId}/source-spans.skeleton.jsonl",
        ".agentplane/tasks/${taskId}/expected-artifacts.json",
      ]),
    );
  });
});
