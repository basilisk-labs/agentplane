import { readFile } from "node:fs/promises";

import { renderMarkdownPromptTemplate } from "../../agents/agents-template.js";
import { resolveAgentplaneAssetPath } from "../../shared/package-paths.js";
import {
  resolvePolicyGatewayForRepo,
  withContextPolicyGatewayText,
} from "../../shared/policy-gateway.js";
import { writeTextIfChanged } from "../../shared/write-if-changed.js";

export async function renderContextPolicyMarkdown(): Promise<string> {
  const source = await readFile(resolveAgentplaneAssetPath("policy/context.must.md"), "utf8");
  return renderMarkdownPromptTemplate(source, {
    source_ref: "packages/agentplane/assets/policy/context.must.md",
  }).contents;
}

export async function ensureRootGatewayReferencesContextPolicy(
  root: string,
  report: { rewritten: string[] },
): Promise<void> {
  const gateway = await resolvePolicyGatewayForRepo({ gitRoot: root, fallbackFlavor: "codex" });
  const current = await readOptionalText(gateway.absPath);
  if (current === null) return;
  const next = withContextPolicyGatewayText(current);
  if (next === current) return;
  await writeTextIfChanged(gateway.absPath, next);
  report.rewritten.push(gateway.fileName);
}

async function readOptionalText(absPath: string): Promise<string | null> {
  try {
    return await readFile(absPath, "utf8");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
}
