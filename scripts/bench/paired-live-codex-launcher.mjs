import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  cpSync,
  lstatSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { performance } from "node:perf_hooks";

import { stableJson } from "../lib/agent-efficiency-baseline.mjs";
import { isDirectRun, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";
import {
  runPairedProductionCampaign,
  validatePairedCampaignManifest,
} from "./paired-production-driver.mjs";
import { buildPairedResultReport } from "./paired-result-report.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const TOKEN_FIELDS = [
  "input_tokens",
  "cached_input_tokens",
  "output_tokens",
  "reasoning_tokens",
  "total_tokens",
];
const RESULT_SCHEMA = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: { status: { type: "string", const: "done" } },
  required: ["status"],
  additionalProperties: false,
};
const CODEX_OUTPUT_LIMIT = 16 * 1024 * 1024;
const CODEX_TIMEOUT_MS = 4 * 60 * 1000;

function sha256(value) {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function canonicalBytes(value) {
  return `${stableJson(value, 2)}\n`;
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function safeInteger(value) {
  return Number.isSafeInteger(value) && value >= 0 ? value : null;
}

function assertRegularArtifact(filePath, expectedDigest, label) {
  const resolved = path.resolve(filePath);
  const stats = lstatSync(resolved, { throwIfNoEntry: false });
  if (!stats?.isFile() || stats.isSymbolicLink()) {
    throw new Error(`${label} must be a regular non-symlink file.`);
  }
  const canonical = realpathSync(resolved);
  if (sha256(readFileSync(canonical)) !== expectedDigest) {
    throw new Error(`${label} does not match its pinned digest.`);
  }
  return canonical;
}

function parseArgs(argv) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: ["authority", "concurrency", "manifest", "output", "report", "temporary-root"],
    booleanFlags: ["help"],
  });
  if (flags.help === true) return { help: true };
  if (positionals.length > 0) throw new Error("M01 launcher does not accept positional arguments.");
  const required = (name) => {
    const value = flags[name];
    if (typeof value !== "string" || value.length === 0) throw new Error(`--${name} is required.`);
    return path.resolve(value);
  };
  const concurrency = Number.parseInt(flags.concurrency ?? "1", 10);
  if (!Number.isSafeInteger(concurrency) || concurrency !== 1) {
    throw new Error("M01 live execution requires --concurrency 1 to preserve assigned order.");
  }
  return {
    authorityPath: required("authority"),
    concurrency,
    help: false,
    manifestPath: required("manifest"),
    outputPath: required("output"),
    reportPath: required("report"),
    temporaryRoot: required("temporary-root"),
  };
}

function observedIdentity(run) {
  return {
    adapter: run.adapter,
    model: run.model,
    reasoning_effort: run.reasoning_effort,
    authority_digest: run.authority_digest,
    check_ids: run.check_ids,
    retry_limit: run.retry_limit,
    runtime_profile: run.runtime_profile,
  };
}

export function validateM01Authority(manifest, authorityPath) {
  const canonical = assertRegularArtifact(
    authorityPath,
    manifest.constants.authority_digest,
    "M01 authority receipt",
  );
  const receipt = JSON.parse(readFileSync(canonical, "utf8"));
  if (
    !isRecord(receipt) ||
    receipt.schema_version !== 1 ||
    receipt.kind !== "agentplane.m01_live_authority" ||
    receipt.status !== "approved" ||
    receipt.authentication !== "chatgpt_subscription" ||
    (receipt.campaign_id !== undefined && receipt.campaign_id !== manifest.campaign_id) ||
    receipt.provider_attempts !== manifest.runs.length ||
    receipt.retry_limit !== manifest.constants.retry_limit ||
    receipt.sandbox !== manifest.constants.sandbox ||
    receipt.network !== manifest.constants.network ||
    !isRecord(receipt.token_caps) ||
    !["max_input_tokens", "max_output_tokens", "max_total_tokens"].every(
      (field) => receipt.token_caps[field] === null,
    )
  ) {
    throw new Error(
      "M01 authority receipt does not authorize this exact token-unlimited campaign.",
    );
  }
  return receipt;
}

export function readM01ProductArtifact(product) {
  const artifactPath = assertRegularArtifact(
    product.artifact_path,
    product.artifact_sha256,
    `${product.arm} product artifact`,
  );
  const artifact = JSON.parse(readFileSync(artifactPath, "utf8"));
  if (
    !isRecord(artifact) ||
    artifact.schema_version !== 1 ||
    artifact.kind !== "agentplane.m01_product_artifact" ||
    artifact.arm !== product.arm ||
    artifact.source_sha !== product.source_sha ||
    !isRecord(artifact.runtime)
  ) {
    throw new Error(`${product.arm} product artifact is invalid.`);
  }
  return { artifact, artifactPath };
}

function verifiedRuntimeFile(value, label) {
  if (!isRecord(value) || typeof value.path !== "string" || typeof value.sha256 !== "string") {
    throw new Error(`${label} is invalid.`);
  }
  return assertRegularArtifact(value.path, value.sha256, label);
}

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: options.cwd,
    encoding: "utf8",
    env: options.env ?? process.env,
    maxBuffer: options.maxBuffer ?? 16 * 1024 * 1024,
    timeout: options.timeout ?? 120_000,
  }).trim();
}

function git(cwd, args) {
  return run("git", args, { cwd });
}

function commitFixtureSetup(fixtureRoot, message) {
  git(fixtureRoot, ["add", "-A"]);
  if (git(fixtureRoot, ["status", "--porcelain=v1", "--untracked-files=all"]) === "") return;
  git(fixtureRoot, ["commit", "--quiet", "--no-verify", "-m", message]);
}

export function initializeAgentPlane(cliPath, fixtureRoot, forceGlobal) {
  const env = forceGlobal
    ? { ...process.env, AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK: "1" }
    : process.env;
  const invoke = (args) => run(process.execPath, [cliPath, ...args], { cwd: fixtureRoot, env });
  try {
    git(fixtureRoot, ["symbolic-ref", "--quiet", "--short", "HEAD"]);
  } catch {
    git(fixtureRoot, ["switch", "--quiet", "-c", "m01-evaluation"]);
  }
  invoke([
    "init",
    "--setup-profile",
    "light",
    "--tool",
    "codex",
    "--workflow",
    "direct",
    "--hooks",
    "false",
    "--require-plan-approval",
    "false",
    "--require-network-approval",
    "true",
    "--recipes",
    "none",
    "--blueprints",
    "none",
    "--yes",
  ]);
  commitFixtureSetup(fixtureRoot, "M01 AgentPlane initialization");
  const taskId = invoke([
    "task",
    "new",
    "--title",
    "M01 fixed direct task",
    "--description",
    "Set work/result.txt to exactly VERIFIED followed by one newline.",
    "--owner",
    "CODER",
    "--priority",
    "med",
    "--tag",
    "code",
    "--tag",
    "m01",
    "--task-kind",
    "code",
    "--mutation-scope",
    "code",
    "--verify",
    "The independent oracle checks the exact file content and changed path.",
  ]);
  if (!/^\d{12}-[A-Z0-9]{6}$/u.test(taskId)) throw new Error("Product returned invalid task ID.");
  invoke([
    "task",
    "plan",
    "set",
    taskId,
    "--text",
    "1. Set work/result.txt to exactly VERIFIED followed by one newline.\n2. Leave verification to the independent oracle.",
    "--updated-by",
    "CODER",
  ]);
  invoke([
    "task",
    "doc",
    "set",
    taskId,
    "--section",
    "Verify Steps",
    "--text",
    "1. Confirm work/result.txt contains exactly VERIFIED followed by one newline.\n2. Confirm no other tracked or untracked path changed.",
    "--updated-by",
    "CODER",
  ]);
  invoke(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR"]);
  invoke([
    "task",
    "start-ready",
    taskId,
    "--author",
    "CODER",
    "--body",
    "Start: execute the fixed M01 task under measured conditions.",
  ]);
  commitFixtureSetup(fixtureRoot, "M01 task start");
  const prepared = JSON.parse(invoke(["task", "run", taskId, "--dry-run", "--json"]));
  const bootstrapPath = realpathSync(
    path.resolve(fixtureRoot, prepared.bootstrap_path ?? prepared.bootstrapPath),
  );
  const canonicalFixtureRoot = realpathSync(fixtureRoot);
  if (!bootstrapPath.startsWith(`${canonicalFixtureRoot}${path.sep}`)) {
    throw new Error("Product bootstrap escaped the fixture.");
  }
  return readFileSync(bootstrapPath, "utf8");
}

function preparePreviousRuntime(runtime, cacheRoot) {
  const packageJson = verifiedRuntimeFile(runtime.package_json, "previous package.json");
  const packageLock = verifiedRuntimeFile(runtime.package_lock, "previous package-lock.json");
  const packageArchive = verifiedRuntimeFile(runtime.package_archive, "previous package archive");
  const installRoot = mkdtempSync(path.join(cacheRoot, "previous-"));
  cpSync(packageJson, path.join(installRoot, "package.json"));
  cpSync(packageLock, path.join(installRoot, "package-lock.json"));
  cpSync(packageArchive, path.join(installRoot, "agentplane.tgz"));
  run("npm", ["ci", "--ignore-scripts", "--no-audit", "--no-fund"], {
    cwd: installRoot,
    timeout: 180_000,
  });
  const cliPath = path.join(installRoot, "node_modules", "agentplane", "bin", "agentplane.js");
  const version = run(process.execPath, [cliPath, "--version"], {
    cwd: installRoot,
    env: { ...process.env, AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK: "1" },
  });
  if (![runtime.version, `agentplane ${runtime.version}`].includes(version)) {
    throw new Error(`Previous runtime version mismatch: ${version}`);
  }
  return { cliPath, installRoot };
}

export function resolveM01Products(manifest, cacheRoot) {
  const resolved = {};
  let previousInstallRoot = null;
  for (const [arm, product] of Object.entries(manifest.products)) {
    const { artifact } = readM01ProductArtifact(product);
    if (arm === "minimal_agent") {
      if (artifact.runtime.type !== "codex") throw new Error("Minimal arm must pin Codex.");
      resolved[arm] = { codexPath: verifiedRuntimeFile(artifact.runtime.binary, "Codex binary") };
      continue;
    }
    if (arm === "candidate") {
      if (artifact.runtime.type !== "agentplane_cli") {
        throw new Error("Candidate arm must pin an AgentPlane CLI.");
      }
      resolved[arm] = {
        cliPath: verifiedRuntimeFile(artifact.runtime.binary, "candidate AgentPlane CLI"),
      };
      if (!Array.isArray(artifact.runtime.closure) || artifact.runtime.closure.length === 0) {
        throw new Error("Candidate arm must pin its runtime closure.");
      }
      for (const [index, entry] of artifact.runtime.closure.entries()) {
        verifiedRuntimeFile(entry, `candidate runtime closure[${index}]`);
      }
      continue;
    }
    if (arm !== "previous_release" || artifact.runtime.type !== "npm_package") {
      throw new Error("Previous arm must pin an npm package closure.");
    }
    const installed = preparePreviousRuntime(artifact.runtime, cacheRoot);
    previousInstallRoot = installed.installRoot;
    resolved[arm] = { cliPath: installed.cliPath, forceGlobal: true };
  }
  return {
    cleanup: () => previousInstallRoot && rmSync(previousInstallRoot, { recursive: true }),
    resolved,
  };
}

export function summarizeCodexJsonl(stdout, processResult = {}) {
  const events = [];
  const violations = [];
  for (const line of String(stdout).split("\n")) {
    if (!line.trim()) continue;
    try {
      events.push(JSON.parse(line));
    } catch {
      violations.push("codex_jsonl_parse_error");
    }
  }
  const completed = events.filter((event) => event?.type === "turn.completed");
  if (completed.length !== 1) violations.push("codex_turn_completed_count");
  const usage = completed.length === 1 && isRecord(completed[0].usage) ? completed[0].usage : {};
  const inputTokens = safeInteger(usage.input_tokens);
  const outputTokens = safeInteger(usage.output_tokens);
  const providerTotalTokens = safeInteger(usage.total_tokens);
  const componentTotal =
    inputTokens !== null && outputTokens !== null ? inputTokens + outputTokens : null;
  const derivedTotalTokens =
    providerTotalTokens === null && Number.isSafeInteger(componentTotal) ? componentTotal : null;
  const tokenUsage = {
    input_tokens: inputTokens,
    cached_input_tokens: safeInteger(usage.cached_input_tokens),
    output_tokens: outputTokens,
    reasoning_tokens: safeInteger(usage.reasoning_output_tokens),
    total_tokens: providerTotalTokens ?? derivedTotalTokens,
  };
  if (tokenUsage.total_tokens !== null) {
    tokenUsage.total_tokens_source =
      providerTotalTokens === null ? "derived_input_plus_output" : "provider";
  }
  const observedCount = TOKEN_FIELDS.filter((field) => tokenUsage[field] !== null).length;
  if (observedCount === TOKEN_FIELDS.length) {
    tokenUsage.state = "observed";
  } else if (observedCount > 0) {
    tokenUsage.state = "partial";
    tokenUsage.reason = "provider token telemetry incomplete";
  } else {
    tokenUsage.state = "unavailable";
    tokenUsage.reason = "provider token telemetry unavailable";
  }
  const finalMessages = events.filter(
    (event) => event?.type === "item.completed" && event.item?.type === "agent_message",
  );
  let finalStatus = null;
  if (finalMessages.length > 0) {
    try {
      finalStatus = JSON.parse(finalMessages.at(-1).item.text)?.status ?? null;
    } catch {
      violations.push("codex_final_status_parse_error");
    }
  }
  if (finalStatus !== "done") violations.push("codex_final_status_not_done");
  if (processResult.error) violations.push("codex_process_start_error");
  if (processResult.signal) violations.push(`codex_process_signal_${processResult.signal}`);
  if (
    processResult.status !== undefined &&
    processResult.status !== null &&
    processResult.status !== 0
  ) {
    violations.push(`codex_process_exit_${processResult.status}`);
  }
  return { finalStatus, tokenUsage, violations: [...new Set(violations)] };
}

function runCodexEpisode({ codexPath, fixtureRoot, model, prompt, reasoningEffort, schemaPath }) {
  const startedAt = performance.now();
  const result = spawnSync(
    codexPath,
    [
      "-a",
      "never",
      "-s",
      "workspace-write",
      "-m",
      model,
      "-c",
      `model_reasoning_effort=${JSON.stringify(reasoningEffort)}`,
      "-c",
      "sandbox_workspace_write.network_access=false",
      "-c",
      'shell_environment_policy.inherit="none"',
      "exec",
      "--json",
      "--ephemeral",
      "--ignore-user-config",
      "--ignore-rules",
      "--strict-config",
      "-C",
      fixtureRoot,
      "--output-schema",
      schemaPath,
      "-",
    ],
    {
      cwd: fixtureRoot,
      encoding: "utf8",
      env: {
        LANG: "C.UTF-8",
        LC_ALL: "C.UTF-8",
        PATH: "/opt/homebrew/bin:/usr/bin:/bin",
        TZ: "UTC",
      },
      input: prompt,
      maxBuffer: CODEX_OUTPUT_LIMIT,
      timeout: CODEX_TIMEOUT_MS,
    },
  );
  return {
    ...summarizeCodexJsonl(result.stdout, result),
    durationMs: performance.now() - startedAt,
  };
}

function fixedInstruction(objective) {
  return [
    "M01 fixed semantic task:",
    `- ${objective}`,
    "- work only in this disposable repository;",
    "- do not run AgentPlane or change task lifecycle state;",
    "- do not modify any path except work/result.txt;",
    '- return exactly {"status":"done"}.',
    "",
  ].join("\n");
}

function resultDigest(fixtureRoot) {
  try {
    return sha256(readFileSync(path.join(fixtureRoot, "work", "result.txt")));
  } catch {
    return sha256("missing work/result.txt");
  }
}

function changedPaths(fixtureRoot) {
  const tracked = execFileSync("git", ["diff", "--name-only", "-z", "HEAD"], {
    cwd: fixtureRoot,
    encoding: "utf8",
  });
  const untracked = execFileSync("git", ["ls-files", "--others", "--exclude-standard", "-z"], {
    cwd: fixtureRoot,
    encoding: "utf8",
  });
  return [...new Set(`${tracked}${untracked}`.split("\0").filter(Boolean))].toSorted();
}

function executeAttemptFactory(products) {
  return ({ manifest, run: runIdentity, fixtureRoot }) => {
    const preparationStartedAt = performance.now();
    try {
      const schemaPath = path.join(fixtureRoot, ".m01-final.schema.json");
      writeFileSync(schemaPath, canonicalBytes(RESULT_SCHEMA));
      let bootstrap = "";
      if (runIdentity.arm !== "minimal_agent") {
        bootstrap = initializeAgentPlane(
          products[runIdentity.arm].cliPath,
          fixtureRoot,
          products[runIdentity.arm].forceGlobal === true,
        );
      }
      commitFixtureSetup(fixtureRoot, "M01 fixed pre-provider setup");
      const preparationDuration = performance.now() - preparationStartedAt;
      const episode = runCodexEpisode({
        codexPath: products.minimal_agent.codexPath,
        fixtureRoot,
        model: runIdentity.model,
        prompt: `${bootstrap}${bootstrap ? "\n" : ""}${fixedInstruction(manifest.task.objective)}`,
        reasoningEffort: runIdentity.reasoning_effort,
        schemaPath,
      });
      const unexpectedPaths = changedPaths(fixtureRoot).filter(
        (entry) => entry !== "work/result.txt",
      );
      const violations = [
        ...episode.violations,
        ...unexpectedPaths.map((entry) => `unexpected_changed_path:${entry}`),
      ];
      return {
        status: episode.finalStatus === "done" && violations.length === 0 ? "completed" : "failed",
        result_digest: resultDigest(fixtureRoot),
        violations,
        stages: [
          { id: "product_preparation", duration_ms: preparationDuration },
          { id: "provider", duration_ms: episode.durationMs },
        ],
        token_usage: episode.tokenUsage,
        observed_identity: observedIdentity(runIdentity),
      };
    } catch (error) {
      return {
        status: "failed",
        result_digest: resultDigest(fixtureRoot),
        violations: [
          `attempt_setup_failed:${error instanceof Error ? error.message : String(error)}`,
        ],
        stages: [
          { id: "product_preparation", duration_ms: performance.now() - preparationStartedAt },
        ],
        token_usage: Object.fromEntries([
          ["state", "unavailable"],
          ...TOKEN_FIELDS.map((field) => [field, null]),
          ["reason", "provider attempt did not start"],
        ]),
        observed_identity: observedIdentity(runIdentity),
      };
    }
  };
}

const noop = () => {};

export async function runM01LiveCampaign(manifestValue, options) {
  const manifest = validatePairedCampaignManifest(manifestValue);
  const runtimeRoot = mkdtempSync(path.join(path.dirname(options.outputPath), ".m01-runtime-"));
  let cleanup = noop;
  try {
    const products = resolveM01Products(manifest, runtimeRoot);
    cleanup = products.cleanup;
    const evidence = await runPairedProductionCampaign(
      manifest,
      {
        concurrency: 1,
        mode: "live",
        temporaryRoot: options.temporaryRoot,
      },
      {
        assertLiveAuthority: (selectedManifest) =>
          validateM01Authority(selectedManifest, options.authorityPath),
        executeAttempt: executeAttemptFactory(products.resolved),
      },
    );
    const report = buildPairedResultReport(evidence);
    writeFileSync(options.outputPath, canonicalBytes(evidence), { encoding: "utf8", mode: 0o600 });
    writeFileSync(options.reportPath, canonicalBytes(report), { encoding: "utf8", mode: 0o600 });
    return { evidence, report };
  } finally {
    cleanup();
    rmSync(runtimeRoot, { recursive: true, force: true });
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(
      "Usage: node scripts/bench/paired-live-codex-launcher.mjs --manifest <campaign.lock.json> --authority <authority.json> --output <evidence.json> --report <report.json> --temporary-root <directory> [--concurrency 1]\n",
    );
    return;
  }
  const manifest = JSON.parse(readFileSync(options.manifestPath, "utf8"));
  const { evidence, report } = await runM01LiveCampaign(manifest, options);
  process.stdout.write(
    `${evidence.digest}\n${report.digest}\n${report.gates.efficiency.verdict}\n`,
  );
}

if (isDirectRun(import.meta.url)) runScriptMain(main);

export const M01_LAUNCHER_PATH = scriptPath;
