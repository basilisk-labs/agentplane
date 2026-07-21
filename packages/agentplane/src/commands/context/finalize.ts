import { readdir } from "node:fs/promises";
import path from "node:path";

import { fileExists, readText, toPosix } from "./context-utils.js";
import { cmdContextDoctor } from "./doctor.js";
import { cmdContextGraphValidate } from "./graph.js";
import { cmdContextReindex } from "./reindex.js";
import { cmdContextVerifyTask } from "./verify-task.js";
import { cmdContextWikiIndex, cmdContextWikiLint } from "./wiki.js";
import { cmdContextWikiReport } from "./wiki-reports.js";

type FinalizeInput = {
  cwd: string;
  rootOverride?: string;
  parsed: { taskId: string };
};

type FinalizeDependencies = {
  wikiReport: (input: FinalizeInput) => Promise<void>;
  wikiIndex: (input: FinalizeInput) => Promise<void>;
  wikiLint: (input: FinalizeInput) => Promise<void>;
  reindex: (input: FinalizeInput) => Promise<void>;
  graphValidate: (input: FinalizeInput) => Promise<void>;
  verifyTask: (input: FinalizeInput) => Promise<void>;
  doctor: (input: FinalizeInput) => Promise<void>;
};

const DEFAULT_DEPENDENCIES: FinalizeDependencies = {
  wikiReport: async (input) => {
    await cmdContextWikiReport({
      cwd: input.cwd,
      rootOverride: input.rootOverride,
      parsed: { path: "context/wiki" },
    });
  },
  wikiIndex: async (input) => {
    await cmdContextWikiIndex({
      cwd: input.cwd,
      rootOverride: input.rootOverride,
      parsed: { path: "context/wiki" },
    });
  },
  wikiLint: async (input) => {
    await cmdContextWikiLint({
      cwd: input.cwd,
      rootOverride: input.rootOverride,
      parsed: { path: "context/wiki" },
    });
  },
  reindex: async (input) => {
    await cmdContextReindex({
      cwd: input.cwd,
      rootOverride: input.rootOverride,
      parsed: { includeTasks: false, includeRaw: false, reset: false },
    });
  },
  graphValidate: async (input) => {
    await cmdContextGraphValidate({
      cwd: input.cwd,
      rootOverride: input.rootOverride,
      parsed: {},
    });
  },
  verifyTask: async (input) => {
    await cmdContextVerifyTask({
      cwd: input.cwd,
      rootOverride: input.rootOverride,
      parsed: input.parsed,
    });
  },
  doctor: async (input) => {
    await cmdContextDoctor({
      cwd: input.cwd,
      rootOverride: input.rootOverride,
      parsed: { fix: false, label: "doctor" },
    });
  },
};

async function countJsonlRows(root: string, rel: string): Promise<number> {
  const abs = path.join(root, rel);
  if (!(await fileExists(abs))) return 0;
  const text = await readText(abs);
  return text.split("\n").filter((line) => line.trim() !== "").length;
}

async function countWikiPages(root: string, rel = "context/wiki"): Promise<number> {
  const abs = path.join(root, rel);
  if (!(await fileExists(abs))) return 0;
  let count = 0;
  for (const entry of await readdir(abs, { withFileTypes: true })) {
    const childRel = toPosix(path.join(rel, entry.name));
    if (entry.isDirectory()) count += await countWikiPages(root, childRel);
    else if (entry.isFile() && entry.name.endsWith(".md") && entry.name !== "AGENTS.md") count += 1;
  }
  return count;
}

async function finalizationSummary(root: string): Promise<Record<string, number>> {
  const entries = await Promise.all([
    countWikiPages(root),
    countJsonlRows(root, ".agentplane/context/derived/facts/facts.jsonl"),
    countJsonlRows(root, ".agentplane/context/derived/graph/entities.jsonl"),
    countJsonlRows(root, ".agentplane/context/derived/graph/edges.jsonl"),
    countJsonlRows(root, ".agentplane/context/derived/graph/provenance_edges.jsonl"),
    countJsonlRows(root, ".agentplane/context/derived/reports/coverage.jsonl"),
    countJsonlRows(root, ".agentplane/context/derived/reports/evaluator.jsonl"),
  ]);
  const [wikiPages, facts, entities, edges, provenance, coverage, evaluatorScenarios] = entries;
  return {
    wiki_pages: wikiPages,
    facts,
    entities,
    edges,
    provenance,
    coverage,
    evaluator_scenarios: evaluatorScenarios,
  };
}

export async function runContextFinalization(
  input: FinalizeInput,
  dependencies: FinalizeDependencies = DEFAULT_DEPENDENCIES,
): Promise<Record<string, number>> {
  await dependencies.wikiReport(input);
  await dependencies.wikiIndex(input);
  await dependencies.wikiReport(input);
  await dependencies.wikiLint(input);
  await dependencies.reindex(input);
  await dependencies.graphValidate(input);
  await dependencies.verifyTask(input);
  await dependencies.doctor(input);
  return await finalizationSummary(path.resolve(input.rootOverride ?? input.cwd));
}

export async function cmdContextFinalizeTask(input: FinalizeInput): Promise<number> {
  const summary = await runContextFinalization(input);
  process.stdout.write(`context finalize-task ${input.parsed.taskId}: ok\n`);
  process.stdout.write(`${JSON.stringify(summary)}\n`);
  return 0;
}
