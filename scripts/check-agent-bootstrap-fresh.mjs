import { readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  ROOT,
  assertAgentplaneCliDistFreshForDocs,
  defineGeneratedArtifactCheck,
  fileExists,
} from "./lib/generated-artifacts.mjs";
import { defineScript, runScriptMain } from "./lib/script-runtime.mjs";

const CLI_SOURCE_DIR = path.join(ROOT, "packages", "agentplane", "src", "cli");
const BOOTSTRAP_SOURCE = path.join(CLI_SOURCE_DIR, "bootstrap-guide.ts");
const COMMAND_GUIDE_SOURCE = path.join(CLI_SOURCE_DIR, "command-guide.ts");
const RUNTIME_COMMAND_SOURCE = path.join(
  ROOT,
  "packages",
  "agentplane",
  "src",
  "commands",
  "runtime.command.ts",
);
const RUNTIME_SOURCE = path.join(
  ROOT,
  "packages",
  "agentplane",
  "src",
  "runtime",
  "shared",
  "runtime-source.ts",
);
const DOC_PATH = path.join(ROOT, "docs", "user", "agent-bootstrap.generated.mdx");
const AGENTS_PATH = path.join(ROOT, "AGENTS.md");
const COMMANDS_DOC_PATH = path.join(ROOT, "docs", "user", "commands.mdx");
const TROUBLESHOOTING_DOC_PATH = path.join(ROOT, "docs", "help", "troubleshooting.mdx");
const TESTING_DOC_PATH = path.join(ROOT, "docs", "developer", "testing-and-quality.mdx");
const RELEASE_DOC_PATH = path.join(ROOT, "docs", "developer", "release-and-publishing.mdx");

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

function assertExcludesAll(source, unexpected, label) {
  const present = unexpected.filter((fragment) => source.includes(fragment));
  if (present.length > 0) {
    throw new Error(`${label} drifted. Unexpected fragments:\n- ${present.join("\n- ")}`);
  }
}

function reexecWithBunForSourceImports() {
  if (globalThis.Bun) return false;
  if (process.env.AGENTPLANE_BUN_REEXEC === "1") {
    throw new Error("Bun runtime is required to import TypeScript source modules for this check.");
  }
  const result = spawnSync("bun", [fileURLToPath(import.meta.url), ...process.argv.slice(2)], {
    cwd: ROOT,
    stdio: "inherit",
    env: { ...process.env, AGENTPLANE_BUN_REEXEC: "1" },
  });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
  return true;
}

const main = defineScript({
  name: "check-agent-bootstrap-fresh",
  async run() {
    if (reexecWithBunForSourceImports()) return;
    await assertAgentplaneCliDistFreshForDocs(ROOT);
    if (
      !(await fileExists(BOOTSTRAP_SOURCE)) ||
      !(await fileExists(COMMAND_GUIDE_SOURCE)) ||
      !(await fileExists(RUNTIME_COMMAND_SOURCE)) ||
      !(await fileExists(RUNTIME_SOURCE))
    ) {
      throw new Error(
        "CLI source artifacts required for bootstrap freshness checks are missing. Restore packages/agentplane/src before retrying.",
      );
    }

    const bootstrapModule = await import(pathToFileURL(BOOTSTRAP_SOURCE).href);
    const commandGuideModule = await import(pathToFileURL(COMMAND_GUIDE_SOURCE).href);
    const runtimeModule = await import(pathToFileURL(RUNTIME_COMMAND_SOURCE).href);
    const runtimeSourceModule = await import(pathToFileURL(RUNTIME_SOURCE).href);
    const checkBootstrapDocFresh = defineGeneratedArtifactCheck({
      outputPath: DOC_PATH,
      tempPrefix: "agentplane-bootstrap-doc-",
      fileName: "agent-bootstrap.generated.mdx",
      generate: (generatedPath) =>
        writeFile(generatedPath, bootstrapModule.renderBootstrapDoc(), "utf8"),
      formatWithPrettier: true,
      missingMessage:
        "docs/user/agent-bootstrap.generated.mdx is missing. Regenerate with: node scripts/generate-agent-bootstrap-doc.mjs",
      staleMessage:
        "Agent bootstrap doc is stale. Regenerate with: node scripts/generate-agent-bootstrap-doc.mjs",
    });
    await checkBootstrapDocFresh();

    const runtimeReport = runtimeSourceModule.resolveRuntimeSourceInfo({
      cwd: ROOT,
      activeBinaryPath: path.join(ROOT, "packages", "agentplane", "bin", "agentplane.js"),
      agentplanePackageRoot: path.join(ROOT, "packages", "agentplane"),
      corePackageJsonPath: path.join(ROOT, "packages", "core", "package.json"),
      entryModuleUrl: pathToFileURL(RUNTIME_COMMAND_SOURCE).href,
    });
    const frameworkDev = runtimeModule.buildFrameworkDevWorkflow(runtimeReport);

    const [agentsRaw, commandsDoc, troubleshootingDoc, testingDoc, releaseDoc] = await Promise.all([
      readFile(AGENTS_PATH, "utf8"),
      readFile(COMMANDS_DOC_PATH, "utf8"),
      readFile(TROUBLESHOOTING_DOC_PATH, "utf8"),
      readFile(TESTING_DOC_PATH, "utf8"),
      readFile(RELEASE_DOC_PATH, "utf8"),
    ]);

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
      [...bootstrapModule.BOOTSTRAP_VERIFICATION_COMMANDS],
      "AGENTS verification block",
    );

    const quickstartText = commandGuideModule.renderQuickstart();
    assertIncludesAll(
      quickstartText,
      [
        "Canonical installed startup surface",
        "agentplane quickstart",
        "agentplane role <ROLE>",
        "agentplane help <command>",
        "agentplane doctor",
        "agentplane upgrade",
        "agentplane runtime explain",
        "agentplane help work start",
        "agentplane help pr",
        "agentplane help integrate",
      ],
      "quickstart surface",
    );
    assertExcludesAll(
      quickstartText,
      [bootstrapModule.AGENT_BOOTSTRAP_DOC_PATH, "docs/user/cli-reference.generated.mdx"],
      "quickstart surface",
    );

    for (const role of commandGuideModule.listRoles()) {
      const roleText = commandGuideModule.renderRole(role);
      if (!roleText) {
        throw new Error(`role ${role} is missing from the command guide`);
      }
      assertIncludesAll(
        roleText,
        ["agentplane quickstart", "agentplane role <ROLE>"],
        `role ${role} startup reference`,
      );
      assertExcludesAll(
        roleText,
        [bootstrapModule.AGENT_BOOTSTRAP_DOC_PATH],
        `role ${role} startup reference`,
      );
    }

    assertIncludesAll(
      commandGuideModule.renderRole("TESTER") ?? "",
      ["agentplane doctor", "agentplane runtime explain"],
      "role TESTER recovery guidance",
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
        "public docs-page expansion of `agentplane quickstart`",
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
        frameworkDev.bootstrapCommand,
        "agentplane runtime explain",
        frameworkDev.reinstallScript,
        ...frameworkDev.manualRepairCommands,
        "AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1",
      ],
      "docs/developer/testing-and-quality.mdx framework-dev parity",
    );

    assertIncludesAll(
      troubleshootingDoc,
      [
        frameworkDev.bootstrapCommand,
        ...frameworkDev.manualRepairCommands,
        frameworkDev.repoLocalVerifyCommand,
        frameworkDev.globalVerifyCommand,
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
  },
});

runScriptMain(main);
