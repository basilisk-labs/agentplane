import { mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const CLI_DIST_DIR = path.join(ROOT, "packages", "agentplane", "dist", "cli");
const BOOTSTRAP_DIST = path.join(CLI_DIST_DIR, "bootstrap-guide.js");
const COMMAND_GUIDE_DIST = path.join(CLI_DIST_DIR, "command-guide.js");
const RUNTIME_COMMAND_DIST = path.join(
  ROOT,
  "packages",
  "agentplane",
  "dist",
  "commands",
  "runtime.command.js",
);
const RUNTIME_SOURCE_DIST = path.join(
  ROOT,
  "packages",
  "agentplane",
  "dist",
  "shared",
  "runtime-source.js",
);
const DOC_PATH = path.join(ROOT, "docs", "user", "agent-bootstrap.generated.mdx");
const AGENTS_PATH = path.join(ROOT, "AGENTS.md");
const COMMANDS_DOC_PATH = path.join(ROOT, "docs", "user", "commands.mdx");
const TROUBLESHOOTING_DOC_PATH = path.join(ROOT, "docs", "help", "troubleshooting.mdx");
const TESTING_DOC_PATH = path.join(ROOT, "docs", "developer", "testing-and-quality.mdx");
const RELEASE_DOC_PATH = path.join(ROOT, "docs", "developer", "release-and-publishing.mdx");

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

function assertIncludesAll(source, expected, label) {
  const missing = expected.filter((fragment) => !source.includes(fragment));
  if (missing.length > 0) {
    throw new Error(`${label} drifted. Missing fragments:\n- ${missing.join("\n- ")}`);
  }
}

async function main() {
  if (
    !(await fileExists(BOOTSTRAP_DIST)) ||
    !(await fileExists(COMMAND_GUIDE_DIST)) ||
    !(await fileExists(RUNTIME_COMMAND_DIST)) ||
    !(await fileExists(RUNTIME_SOURCE_DIST))
  ) {
    throw new Error(
      "CLI dist is missing. Build first:\n" +
        "  bun run --filter=@agentplaneorg/core build\n" +
        "  bun run --filter=agentplane build",
    );
  }

  const bootstrapModule = await import(pathToFileURL(BOOTSTRAP_DIST).href);
  const commandGuideModule = await import(pathToFileURL(COMMAND_GUIDE_DIST).href);
  const runtimeModule = await import(pathToFileURL(RUNTIME_COMMAND_DIST).href);
  const runtimeSourceModule = await import(pathToFileURL(RUNTIME_SOURCE_DIST).href);
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-bootstrap-doc-"));
  const generatedPath = path.join(tempDir, "agent-bootstrap.generated.mdx");

  try {
    await writeFile(generatedPath, bootstrapModule.renderBootstrapDoc(), "utf8");
    await runBunx(["prettier", "--write", generatedPath]);

    const runtimeReport = runtimeSourceModule.resolveRuntimeSourceInfo({
      cwd: ROOT,
      activeBinaryPath: path.join(ROOT, "packages", "agentplane", "bin", "agentplane.js"),
      agentplanePackageRoot: path.join(ROOT, "packages", "agentplane"),
      corePackageJsonPath: path.join(ROOT, "packages", "core", "package.json"),
      entryModuleUrl: pathToFileURL(RUNTIME_COMMAND_DIST).href,
    });
    const frameworkDev = runtimeModule.buildFrameworkDevWorkflow(runtimeReport);

    const [
      expectedDoc,
      actualDoc,
      agentsRaw,
      commandsDoc,
      troubleshootingDoc,
      testingDoc,
      releaseDoc,
    ] = await Promise.all([
      readFile(DOC_PATH, "utf8"),
      readFile(generatedPath, "utf8"),
      readFile(AGENTS_PATH, "utf8"),
      readFile(COMMANDS_DOC_PATH, "utf8"),
      readFile(TROUBLESHOOTING_DOC_PATH, "utf8"),
      readFile(TESTING_DOC_PATH, "utf8"),
      readFile(RELEASE_DOC_PATH, "utf8"),
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
      bootstrapModule.BOOTSTRAP_DIRECT_HAPPY_PATH_COMMANDS.filter(
        (command) => command !== "agentplane task verify-show <task-id>",
      ),
      "AGENTS task lifecycle block",
    );
    assertEqualBlock(
      extractCodeBlock(agentsRaw, "### Verification"),
      [
        bootstrapModule.BOOTSTRAP_DIRECT_HAPPY_PATH_COMMANDS.find((command) =>
          command.startsWith("agentplane task verify-show "),
        ),
        bootstrapModule.BOOTSTRAP_DIRECT_HAPPY_PATH_COMMANDS.find((command) =>
          command.startsWith("agentplane verify "),
        ),
        bootstrapModule.BOOTSTRAP_RECOVERY_COMMANDS.find(
          (command) => command === "agentplane doctor",
        ),
        "node .agentplane/policy/check-routing.mjs",
      ].filter(Boolean),
      "AGENTS verification block",
    );

    const quickstartText = commandGuideModule.renderQuickstart();
    assertIncludesAll(
      quickstartText,
      [
        bootstrapModule.AGENT_BOOTSTRAP_DOC_PATH,
        "agentplane role <ROLE>",
        "agentplane help <command>",
        "docs/user/cli-reference.generated.mdx",
        "agentplane doctor",
        "agentplane upgrade",
        "agentplane runtime explain",
        "agentplane help work start",
        "agentplane help pr",
        "agentplane help integrate",
      ],
      "quickstart surface",
    );

    for (const role of commandGuideModule.listRoles()) {
      const roleText = commandGuideModule.renderRole(role);
      if (!roleText) {
        throw new Error(`role ${role} is missing from the command guide`);
      }
      assertIncludesAll(
        roleText,
        [bootstrapModule.AGENT_BOOTSTRAP_DOC_PATH],
        `role ${role} bootstrap reference`,
      );
    }

    assertIncludesAll(
      commandGuideModule.renderRole("TESTER") ?? "",
      ["agentplane doctor", "agentplane runtime explain"],
      "role TESTER recovery guidance",
    );
    assertIncludesAll(
      commandGuideModule.renderRole("DOCS") ?? "",
      ["docs/user/cli-reference.generated.mdx"],
      "role DOCS deep reference guidance",
    );
    assertIncludesAll(
      commandGuideModule.renderRole("INTEGRATOR") ?? "",
      ["agentplane help work start", "agentplane help integrate", "agentplane help branch base"],
      "role INTEGRATOR branch guidance",
    );

    assertIncludesAll(
      commandsDoc,
      [
        "[Agent bootstrap](agent-bootstrap.generated)",
        "agentplane runtime explain",
        "agentplane runtime explain --json",
        "repo-local",
        "repo-local-handoff",
        "reinstall helper",
        "force-global override",
      ],
      "docs/user/commands.mdx runtime parity",
    );

    assertIncludesAll(
      testingDoc,
      [
        "agentplane runtime explain",
        frameworkDev.reinstallScript,
        ...frameworkDev.rebuildCommands,
        "AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1",
      ],
      "docs/developer/testing-and-quality.mdx framework-dev parity",
    );

    assertIncludesAll(
      troubleshootingDoc,
      [
        ...frameworkDev.rebuildCommands,
        frameworkDev.verifyCommand,
        "AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1",
        "Mode",
        "Active binary",
        "Resolved agentplane",
        "Resolved @agentplaneorg/core",
        "bun run release:recover",
        "bun run release:recover -- --check-registry",
      ],
      "docs/help/troubleshooting.mdx recovery parity",
    );

    assertIncludesAll(
      releaseDoc,
      ["bun run release:recover", "bun run release:recover -- --check-registry"],
      "docs/developer/release-and-publishing.mdx recovery parity",
    );

    process.stdout.write(
      "ok: bootstrap doc, startup command blocks, quickstart/roles, runtime docs, troubleshooting, and release recovery docs are aligned\n",
    );
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
