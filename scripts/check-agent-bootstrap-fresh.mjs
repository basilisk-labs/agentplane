import { mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const CLI_DIST_DIR = path.join(ROOT, "packages", "agentplane", "dist", "cli");
const BOOTSTRAP_DIST = path.join(CLI_DIST_DIR, "bootstrap-guide.js");
const COMMAND_GUIDE_DIST = path.join(CLI_DIST_DIR, "command-guide.js");
const DOC_PATH = path.join(ROOT, "docs", "user", "agent-bootstrap.generated.mdx");
const AGENTS_PATH = path.join(ROOT, "AGENTS.md");

async function fileExists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

function runBunx(args) {
  return new Promise((resolve, reject) => {
    const child = spawn("bunx", args, {
      cwd: ROOT,
      stdio: "inherit",
      env: process.env,
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) return resolve();
      reject(new Error(`bunx ${args.join(" ")} failed with exit code ${code ?? "unknown"}`));
    });
  });
}

function extractCodeBlock(source, heading) {
  const marker = `${heading}\n\n\`\`\`bash\n`;
  const start = source.indexOf(marker);
  if (start === -1) {
    throw new Error(`AGENTS.md is missing ${heading}`);
  }
  const blockStart = start + marker.length;
  const end = source.indexOf("\n```", blockStart);
  if (end === -1) {
    throw new Error(`AGENTS.md has an unterminated code block under ${heading}`);
  }
  return source
    .slice(blockStart, end)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function assertEqualBlock(actual, expected, label) {
  const actualText = actual.join("\n");
  const expectedText = expected.join("\n");
  if (actualText !== expectedText) {
    throw new Error(`${label} drifted.\nExpected:\n${expectedText}\n\nActual:\n${actualText}`);
  }
}

async function main() {
  if (!(await fileExists(BOOTSTRAP_DIST)) || !(await fileExists(COMMAND_GUIDE_DIST))) {
    throw new Error(
      "CLI dist is missing. Build first:\n" +
        "  bun run --filter=@agentplaneorg/core build\n" +
        "  bun run --filter=agentplane build",
    );
  }

  const bootstrapModule = await import(pathToFileURL(BOOTSTRAP_DIST).href);
  const commandGuideModule = await import(pathToFileURL(COMMAND_GUIDE_DIST).href);
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-bootstrap-doc-"));
  const generatedPath = path.join(tempDir, "agent-bootstrap.generated.mdx");

  try {
    await writeFile(generatedPath, bootstrapModule.renderBootstrapDoc(), "utf8");
    await runBunx(["prettier", "--write", generatedPath]);

    const [expectedDoc, actualDoc, agentsRaw] = await Promise.all([
      readFile(DOC_PATH, "utf8"),
      readFile(generatedPath, "utf8"),
      readFile(AGENTS_PATH, "utf8"),
    ]);

    if (expectedDoc !== actualDoc) {
      throw new Error(
        "Agent bootstrap doc is stale. Regenerate with: node scripts/generate-agent-bootstrap-doc.mjs",
      );
    }

    assertEqualBlock(
      extractCodeBlock(agentsRaw, "### Preflight"),
      [...bootstrapModule.BOOTSTRAP_PREFLIGHT_COMMANDS],
      "AGENTS preflight block",
    );
    assertEqualBlock(
      extractCodeBlock(agentsRaw, "### Task lifecycle"),
      [...bootstrapModule.BOOTSTRAP_TASK_LIFECYCLE_COMMANDS],
      "AGENTS task lifecycle block",
    );
    assertEqualBlock(
      extractCodeBlock(agentsRaw, "### Verification"),
      [...bootstrapModule.BOOTSTRAP_VERIFICATION_COMMANDS],
      "AGENTS verification block",
    );

    const quickstartText = commandGuideModule.renderQuickstart();
    if (!quickstartText.includes(bootstrapModule.AGENT_BOOTSTRAP_DOC_PATH)) {
      throw new Error("quickstart no longer references the canonical bootstrap doc");
    }
    const coderRole = commandGuideModule.renderRole("CODER");
    if (!coderRole || !coderRole.includes(bootstrapModule.AGENT_BOOTSTRAP_DOC_PATH)) {
      throw new Error("role CODER no longer references the canonical bootstrap doc");
    }

    process.stdout.write(
      "ok: bootstrap doc, AGENTS command blocks, quickstart, and role guidance are aligned\n",
    );
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
