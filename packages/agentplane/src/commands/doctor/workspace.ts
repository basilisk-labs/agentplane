import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { renderDiagnosticFinding } from "../../shared/diagnostics.js";
import { resolvePolicyGatewayForRepo } from "../../shared/policy-gateway.js";

async function pathExists(absPath: string): Promise<boolean> {
  try {
    await fs.access(absPath);
    return true;
  } catch {
    return false;
  }
}

async function isDirectory(absPath: string): Promise<boolean> {
  try {
    const st = await fs.stat(absPath);
    return st.isDirectory();
  } catch {
    return false;
  }
}

async function listMissingManagedPolicyFiles(repoRoot: string): Promise<string[]> {
  const manifestPath = fileURLToPath(
    new URL("../../../assets/framework.manifest.json", import.meta.url),
  );
  let parsed: { files?: { path?: unknown; required?: unknown }[] } = {};
  try {
    parsed = JSON.parse(await fs.readFile(manifestPath, "utf8")) as {
      files?: { path?: unknown; required?: unknown }[];
    };
  } catch {
    return [];
  }
  const relPaths = Array.isArray(parsed.files)
    ? parsed.files
        .filter((entry) => entry?.required === true && typeof entry.path === "string")
        .map((entry) => String(entry.path).replaceAll("\\", "/").trim())
        .filter((relPath) => relPath.startsWith(".agentplane/policy/"))
    : [];
  const missing: string[] = [];
  for (const relPath of relPaths) {
    if (!(await pathExists(path.join(repoRoot, relPath)))) {
      missing.push(relPath);
    }
  }
  return missing.toSorted();
}

export async function checkWorkspace(repoRoot: string): Promise<string[]> {
  const problems: string[] = [];
  const requiredFiles = [path.join(repoRoot, ".agentplane", "config.json")];
  for (const filePath of requiredFiles) {
    if (!(await pathExists(filePath))) {
      problems.push(`Missing required file: ${path.relative(repoRoot, filePath)}`);
    }
  }
  const gateway = await resolvePolicyGatewayForRepo({
    gitRoot: repoRoot,
    fallbackFlavor: "codex",
  });
  if (!(await pathExists(gateway.absPath))) {
    problems.push("Missing required policy gateway file: AGENTS.md or CLAUDE.md");
  }
  if (await pathExists(gateway.absPath)) {
    const missingManagedPolicy = await listMissingManagedPolicyFiles(repoRoot);
    if (missingManagedPolicy.length > 0) {
      const listed = missingManagedPolicy.slice(0, 8).join(", ");
      const more =
        missingManagedPolicy.length > 8 ? ` (+${missingManagedPolicy.length - 8} more)` : "";
      problems.push(
        renderDiagnosticFinding({
          severity: "ERROR",
          state: "framework-managed policy tree is incomplete",
          likelyCause:
            "the active AGENTS.md/CLAUDE.md gateway expects required policy files that are not installed in this workspace",
          nextAction: {
            command: "agentplane upgrade --yes",
            reason: "reinstall the managed policy tree from the currently active framework bundle",
          },
          details: [
            `Missing required files: ${listed}${more}`,
            "If the installed CLI is older than the gateway, update or reinstall agentplane first and then rerun `agentplane upgrade --yes` (or `agentplane upgrade --remote --yes`).",
            "Recovery guide: docs/help/legacy-upgrade-recovery.mdx",
          ],
        }),
      );
    }
  }

  const agentsDir = path.join(repoRoot, ".agentplane", "agents");
  if (!(await isDirectory(agentsDir))) {
    problems.push("Missing required directory: .agentplane/agents");
    return problems;
  }

  const entries = await fs.readdir(agentsDir);
  const hasJson = entries.some((name) => name.endsWith(".json"));
  if (!hasJson) {
    problems.push("No agent profiles found in .agentplane/agents (*.json expected).");
  }
  return problems;
}
