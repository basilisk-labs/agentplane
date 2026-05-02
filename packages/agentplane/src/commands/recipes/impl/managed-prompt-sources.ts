import { mkdir } from "node:fs/promises";
import path from "node:path";

import type { PromptModuleCompiledGraph } from "../../../runtime/prompt-modules/index.js";
import { writeTextIfChanged } from "../../../shared/write-if-changed.js";

type MarkdownOutput = {
  path: string;
  parts: { index: number; content: string }[];
};

function contentText(value: unknown): string | null {
  return typeof value === "string" ? value.trimEnd() : null;
}

function sourcePolicyPath(sourceRef: string): string | null {
  const marker = "packages/agentplane/assets/policy/";
  const index = sourceRef.indexOf(marker);
  if (index === -1) return null;
  const relative = sourceRef
    .slice(index + marker.length)
    .split("#", 1)[0]
    ?.trim();
  return relative?.endsWith(".md") ? relative : null;
}

function outputPathForModule(opts: {
  gitRoot: string;
  module: PromptModuleCompiledGraph["nodes"][number]["module"];
}): string | null {
  const { module } = opts;
  if (module.content_kind !== "markdown") return null;
  if (module.address.surface === "gateway") {
    if (module.address.target === "AGENTS.md" || module.address.target === "CLAUDE.md") {
      return path.join(opts.gitRoot, module.address.target);
    }
    return null;
  }
  if (module.address.surface !== "policy") return null;
  const policyPath = sourcePolicyPath(module.provenance.source_ref);
  if (policyPath) return path.join(opts.gitRoot, ".agentplane", "policy", policyPath);
  if (module.owner.kind === "recipe") {
    return path.join(
      opts.gitRoot,
      ".agentplane",
      "policy",
      "recipes",
      module.owner.recipe_id,
      `${module.address.name}.md`,
    );
  }
  return null;
}

function renderMarkdownOutput(output: MarkdownOutput): string {
  return `${output.parts
    .toSorted((left, right) => left.index - right.index)
    .map((part) => part.content)
    .filter(Boolean)
    .join("\n\n")}\n`;
}

export async function materializeManagedPromptSources(opts: {
  project: { agentplaneDir: string };
  promptGraph: PromptModuleCompiledGraph;
}): Promise<string[]> {
  const gitRoot = path.dirname(opts.project.agentplaneDir);
  const outputs = new Map<string, MarkdownOutput>();
  for (const node of opts.promptGraph.nodes) {
    const outputPath = outputPathForModule({ gitRoot, module: node.module });
    if (!outputPath) continue;
    const content = contentText(node.module.content);
    if (content === null) continue;
    const output = outputs.get(outputPath) ?? { path: outputPath, parts: [] };
    output.parts.push({
      index: node.module.provenance.fragment_index ?? output.parts.length,
      content,
    });
    outputs.set(outputPath, output);
  }

  const written: string[] = [];
  for (const output of [...outputs.values()].toSorted((left, right) =>
    left.path.localeCompare(right.path),
  )) {
    await mkdir(path.dirname(output.path), { recursive: true });
    await writeTextIfChanged(output.path, renderMarkdownOutput(output));
    written.push(path.relative(gitRoot, output.path).replaceAll("\\", "/"));
  }
  return written;
}
