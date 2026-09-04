import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash, generateKeyPairSync, sign } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  createQualificationCommandRunner,
  installPackedWorkspace,
} from "../lib/qualification-packed-runtime.mjs";
import { isDirectRun } from "../lib/script-runtime.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const PACKAGES = ["core", "recipes", "agentplane"];

export const PACKAGED_MIXED_SCOPE_FULL_REGRESSION_COMMAND = "node --test test/greeting.test.mjs";

export const PACKAGED_MIXED_SCOPE_REQUIRED_PATHS = [
  ".gitignore",
  "docs/guide.md",
  "src/greeting.mjs",
  "test/greeting.test.mjs",
];
const PACKAGED_MIXED_SCOPE_REQUIRED_EFFECTS = ["documentation", "source_code", "tests"];

export class PackagedMixedScopeContractError extends Error {
  constructor(code, message) {
    super(`${code}: ${message}`);
    this.name = "PackagedMixedScopeContractError";
    this.code = code;
  }
}

function fail(code, message) {
  throw new PackagedMixedScopeContractError(code, message);
}

function normalizedPath(filePath) {
  return path.resolve(filePath);
}

function isInside(parent, child) {
  const relative = path.relative(normalizedPath(parent), normalizedPath(child));
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function trackAccess(accessLog, operation, filePath, purpose) {
  accessLog.push({ operation, path: normalizedPath(filePath), purpose });
}

function readTracked(accessLog, filePath, purpose) {
  trackAccess(accessLog, "read", filePath, purpose);
  return readFileSync(filePath, "utf8");
}

function writeTracked(accessLog, filePath, contents, purpose) {
  trackAccess(accessLog, "write", filePath, purpose);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, contents, "utf8");
}

function parseJson(text, label) {
  try {
    return JSON.parse(text);
  } catch (error) {
    fail("invalid_public_json", `${label} did not emit JSON: ${error.message}`);
  }
}

function canonicalizeJson(value) {
  if (Array.isArray(value)) return value.map((item) => canonicalizeJson(item));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .toSorted(([left], [right]) => left.localeCompare(right))
        .map(([key, item]) => [key, canonicalizeJson(item)]),
    );
  }
  return value;
}

function taskCentricDigest(value) {
  return `sha256:${createHash("sha256")
    .update(JSON.stringify(canonicalizeJson(value)))
    .digest("hex")}`;
}

function createApprovalSigner() {
  const { publicKey, privateKey } = generateKeyPairSync("ed25519");
  return {
    issuer: "qualification-bridge",
    privateKey,
    publicKeySpki: publicKey.export({ format: "der", type: "spki" }).toString("base64"),
  };
}

function configureApprovalSigner(repo, signer) {
  const workflowPath = path.join(repo, ".agentplane", "WORKFLOW.md");
  const workflow = readFileSync(workflowPath, "utf8");
  const emptyIssuers = "    trusted_issuers: []";
  if (workflow.split(emptyIssuers).length !== 2) {
    fail(
      "approval_trust_config_failed",
      "fixture WORKFLOW.md did not contain exactly one empty trusted-issuers mapping",
    );
  }
  const trustedIssuers = [
    "    trusted_issuers:",
    `      - id: ${signer.issuer}`,
    `        public_key_spki: ${signer.publicKeySpki}`,
  ].join("\n");
  writeFileSync(workflowPath, workflow.replace(emptyIssuers, trustedIssuers), "utf8");
}

function signedApprovalArgv(operatorAction, signer) {
  const request = operatorAction?.approval_receipt?.request;
  if (!request || !Array.isArray(operatorAction.argv)) {
    fail("missing_approval_request", "approval packet omitted its receipt request or exact argv");
  }
  const issuedAt = new Date();
  const unsigned = {
    schema_version: 1,
    kind: "agentplane.user_approval_receipt",
    receipt_id: `qualification-${issuedAt.getTime()}`,
    issuer: signer.issuer,
    subject: "qualification-user",
    decision: "approved",
    approval_type: request.approval_type,
    task_id: request.task_id,
    authority_reference: request.authority_reference,
    state_fingerprint: request.state_fingerprint,
    operation_id: request.operation_id ?? null,
    operation_digest: request.operation_digest ?? null,
    state_scope_digest: request.state_scope_digest ?? null,
    issued_at: issuedAt.toISOString(),
    expires_at: new Date(issuedAt.getTime() + 5 * 60_000).toISOString(),
  };
  const receipt = {
    ...unsigned,
    signature: sign(
      null,
      Buffer.from(JSON.stringify(canonicalizeJson(unsigned)), "utf8"),
      signer.privateKey,
    ).toString("base64url"),
  };
  const encoded = Buffer.from(JSON.stringify(receipt), "utf8").toString("base64url");
  return operatorAction.argv.map((arg) => (arg === "<base64url-receipt>" ? encoded : arg));
}

function runInstalledJson(run, cli, cwd, argv, label) {
  return parseJson(run(process.execPath, [cli, ...argv], { cwd }), label);
}

function assertPublicArgv(argv, label) {
  if (!Array.isArray(argv) || argv[0] !== "agentplane") {
    fail("invalid_public_argv", `${label} did not provide an installed agentplane command`);
  }
}

function runPacketArgv(run, cli, cwd, argv, label) {
  assertPublicArgv(argv, label);
  try {
    return runInstalledJson(run, cli, cwd, argv.slice(1), label);
  } catch (error) {
    const stderr = error?.stderr?.toString?.().trim() ?? "";
    fail("public_command_failed", `${label}: ${stderr || error.message}`);
  }
}

function runPacketCommand(run, cli, cwd, argv, label) {
  assertPublicArgv(argv, label);
  return run(process.execPath, [cli, ...argv.slice(1)], { cwd });
}

function runNodeCliResult(cli, cwd, argv) {
  const result = spawnSync(process.execPath, [cli, ...argv], {
    cwd,
    encoding: "utf8",
    env: { ...process.env, AGENTPLANE_NO_UPDATE_CHECK: "1" },
    maxBuffer: 128 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (result.error) throw result.error;
  return {
    status: result.status,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
  };
}

function git(run, repo, argv) {
  return run("git", argv, { cwd: repo }).trim();
}

function commitAllIfDirty(run, repo, subject) {
  if (!git(run, repo, ["status", "--short", "--untracked-files=all"])) return null;
  git(run, repo, ["add", "-A"]);
  git(run, repo, ["commit", "-m", subject]);
  return git(run, repo, ["rev-parse", "HEAD"]);
}

function longMixedScopePlan() {
  const steps = [
    [
      "Inspect the clean fixture baseline and preserve the public package boundary.",
      "Confirm that the implementation is limited to the greeting source, its automated tests, the user guide, and repository ignore metadata. The work must remain reversible, local to the repository, and free of provider or network effects after installation.",
    ],
    [
      "Define the observable greeting behavior before changing implementation details.",
      "The module must expose a named function, preserve a useful default for callers that omit a name, and return a personalized value when a name is provided. Treat these outputs as the product contract rather than relying on source-text matching alone.",
    ],
    [
      "Update the source module without widening the public surface.",
      "Use a small deterministic implementation that can be imported by the built-in Node test runner. Avoid dependencies, generated code, environment variables, clocks, random values, and filesystem access so the behavior remains portable and cheap to verify.",
    ],
    [
      "Expand automated coverage for both the default and personalized paths.",
      "The test must import the installed fixture source through a normal relative module boundary, assert exact user-visible strings, fail on a regression, and execute through the verification command declared during public task creation.",
    ],
    [
      "Revise the user guide to describe the completed behavior.",
      "Document the default invocation, the personalized invocation, and the exact expected outputs. Keep the guide aligned with the executable tests so a release cannot pass with source code but missing or contradictory user documentation.",
    ],
    [
      "Update repository metadata as part of the same coherent product change.",
      "Add the fixture build-output directory to .gitignore while preserving all existing ignore entries. This metadata edit is required evidence that mixed-scope authority is carried through planning, implementation, verification, and finish rather than silently dropped.",
    ],
    [
      "Return implementation control to the AgentPlane supervisor through the issued exchange only.",
      "Write one schema-valid semantic result to the exact result path in the public packet. Do not edit the task README, verification records, evaluator artifacts, recovery journals, fingerprints, quality reports, or any other lifecycle state directly.",
    ],
    [
      "Let AgentPlane execute deterministic verification from the declared command.",
      "The supervisor must run node --test test/greeting.test.mjs, record the command outcome, bind it to current task state, and expose the result through public task readback. A claimed agent check alone is not sufficient evidence.",
    ],
    [
      "Review the resulting diff and verification evidence before accepting quality.",
      "The evaluator decision must be derived from the actual changed-path set, the public verification state, and the resulting product content. It must reject missing source, test, documentation, metadata, or verification evidence instead of returning a pre-baked pass.",
    ],
    [
      "Complete the direct lifecycle with AgentPlane-owned Git effects.",
      "Require a real implementation commit, a completed task state, a passing quality review, and a clean tracked worktree. Validate that the recorded task commit resolves to an actual Git commit and that the final repository contains every intended product path.",
    ],
    [
      "Exercise exact replay and stale-envelope recovery explicitly.",
      "After a valid planning envelope is accepted, replay the exact public resume command and require the same current approval boundary as an idempotent no-op. Then alter the envelope fingerprint and require a non-zero stale diagnostic before continuing from a fresh supervisor packet.",
    ],
    [
      "Prove cleanup and release-gate behavior.",
      "Remove the isolated prefix, packed tarballs, npm cache, exchange files, fixture repository, and all temporary state even on failure. Report a stable phase-specific diagnostic for any missing evidence and block qualification instead of downgrading the scenario to an informational warning.",
    ],
    [
      "Keep public readback as the only lifecycle truth used by the harness.",
      "Use task show and task advance output for the final status, verification state, quality state, task commit, terminal action, and recovery decision. The harness may inspect ordinary product files and Git history, but it must never derive success by opening AgentPlane task documents or runtime-owned evidence files.",
    ],
    [
      "Bind the release assertion to observable product behavior.",
      "After finish, execute the same Node test command again as an independent consumer check and inspect the committed guide, source, test, and ignore metadata. This final readback protects against a process that records green lifecycle evidence while losing the user-visible product change.",
    ],
    [
      "Preserve every pre-existing release qualification scenario.",
      "Register this scenario as an additional full-tier blocking gate with a bounded timeout and no hidden dependency on another explicit selection. Keep the older packaged-candidate and hosted-boundary flows intact because they validate different install, migration, and provider boundaries.",
    ],
  ];
  const text = steps
    .map(([title, detail], index) => `${index + 1}. ${title}\n   ${detail}`)
    .join("\n\n");
  assert.ok(
    Buffer.byteLength(text, "utf8") > 4218,
    "fixture plan must exceed the 0.7.5 failure size",
  );
  assert.ok(Buffer.byteLength(text, "utf8") < 64 * 1024, "fixture plan must remain bounded");
  return text;
}

function mixedScopeTaskPlanProposal(taskId, planningBaseline) {
  const criterion = {
    id: "criterion-mixed-scope",
    description:
      "The greeting source, automated tests, user documentation, and repository metadata satisfy the task.",
    required: true,
    check_ids: ["check-mixed-scope"],
  };
  const command = "node --test test/greeting.test.mjs";
  const validation = {
    schema_version: 1,
    criteria: [criterion],
    checks: [
      {
        id: "check-mixed-scope",
        kind: "deterministic",
        required: true,
        capability: "task.verify",
        command,
      },
    ],
    evidence_fingerprint: taskCentricDigest({
      task_id: taskId,
      criterion,
      command,
    }),
  };
  return {
    schema_version: 1,
    task_id: taskId,
    planning_baseline: planningBaseline,
    work_items: {
      schema_version: 1,
      work_items: [
        {
          id: "mixed-scope-implementation",
          objective:
            "Implement the bounded greeting source, test, documentation, and metadata change.",
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["mixed-scope-product-change"],
          scope_roots: [...PACKAGED_MIXED_SCOPE_REQUIRED_PATHS],
          acceptance_criteria: [criterion],
          validation,
          context: {
            required_sources: ["repository"],
            optional_sources: [],
            symbol_hints: ["greeting"],
            max_bytes: 16_384,
          },
          risk: "low",
          capabilities: ["task.verify"],
          resource_claims: PACKAGED_MIXED_SCOPE_REQUIRED_PATHS.map((resource) => ({
            kind: "path",
            resource,
            mode: "write",
          })),
          optional: false,
          priority: 1,
        },
      ],
    },
    assumptions: [],
    unresolved_questions: [],
    top_level_validation: validation,
  };
}

export function packetExchange(packet, expectedRole, observedTask = null) {
  if (packet.action?.kind !== "agent_episode" || packet.authority?.role !== expectedRole) {
    if (
      expectedRole === "EVALUATOR" &&
      packet.action?.kind === "agent_episode" &&
      packet.authority?.role === "EXECUTOR" &&
      observedTask?.verification?.state === "needs_rework"
    ) {
      fail(
        "verification_rework",
        "deterministic verification returned needs_rework before the evaluator episode",
      );
    }
    fail(
      `missing_${expectedRole.toLowerCase()}_episode`,
      `expected ${expectedRole} agent episode, received ${packet.action?.kind ?? "unknown"}/${packet.authority?.role ?? "unknown"}`,
    );
  }
  if (!packet.exchange?.result_path || !packet.exchange?.work_order_ref) {
    fail("missing_exchange", `${expectedRole} packet omitted its public exchange`);
  }
  return packet.exchange;
}

function semanticResultFor({
  packet,
  workOrder,
  summary,
  taskIntent,
  taskPlanProposal,
  claimedChecks,
  review,
}) {
  return {
    schema_version: 1,
    kind: "agent_action_result",
    task_id: packet.task_id,
    transition_id: packet.transition_id,
    state_fingerprint: packet.state_fingerprint,
    role: workOrder.role,
    result: {
      schema_version: 2,
      kind: "agent_semantic_result",
      work_order_id: workOrder.work_order_id,
      status: "completed",
      summary,
      findings: review ? ["The public diff and recorded verification satisfy the task."] : [],
      uncertainty: [],
      ...(taskIntent ? { task_intent: taskIntent } : {}),
      ...(taskPlanProposal ? { task_plan_proposal: taskPlanProposal } : {}),
      ...(claimedChecks ? { claimed_checks: claimedChecks } : {}),
      ...(review ? { review } : {}),
    },
  };
}

function writePacketResult(accessLog, packet, role, resultOptions) {
  const exchange = packetExchange(packet, role);
  const workOrderPath = path.join(exchange.directory, exchange.work_order_ref);
  const workOrder = parseJson(
    readTracked(accessLog, workOrderPath, `${role.toLowerCase()}_work_order`),
    `${role} work order`,
  );
  const expectedResultPath = path.join(exchange.directory, exchange.result_ref);
  if (normalizedPath(exchange.result_path) !== normalizedPath(expectedResultPath)) {
    fail("invalid_exchange_path", `${role} result path is not bound to its public exchange`);
  }
  writeTracked(
    accessLog,
    exchange.result_path,
    `${JSON.stringify(
      semanticResultFor({
        packet,
        workOrder,
        ...resultOptions,
        ...(resultOptions.taskPlanProposal
          ? { taskPlanProposal: resultOptions.taskPlanProposal(workOrder) }
          : {}),
      }),
      null,
      2,
    )}\n`,
    `${role.toLowerCase()}_result`,
  );
  return exchange;
}

function advanceToEpisode(run, cli, repo, taskId, expectedRole) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const packet = runInstalledJson(
      run,
      cli,
      repo,
      ["task", "advance", taskId, "--agent-json"],
      `task advance ${expectedRole}`,
    );
    if (packet.action?.kind === "agent_episode") {
      packetExchange(packet, expectedRole);
      return packet;
    }
    if (packet.action?.kind === "terminal") {
      fail(
        `missing_${expectedRole.toLowerCase()}_episode`,
        `task became terminal before ${expectedRole}`,
      );
    }
    if (packet.action?.kind === "approval_required") {
      fail("unexpected_approval", `task requested an unhandled approval before ${expectedRole}`);
    }
  }
  fail(`missing_${expectedRole.toLowerCase()}_episode`, `task did not issue ${expectedRole}`);
}

function continueToTerminal(run, cli, repo, taskId, initialPacket) {
  let packet = initialPacket;
  for (let attempt = 0; attempt < 6; attempt += 1) {
    if (packet.action?.kind === "terminal") return packet;
    packet = runInstalledJson(
      run,
      cli,
      repo,
      ["task", "advance", taskId, "--agent-json"],
      "task advance terminal",
    );
  }
  fail("missing_finish", "task did not reach a terminal public supervisor state");
}

function invalidInternalAccesses(evidence) {
  const internalRoot = path.join(evidence.fixture_repo, ".agentplane");
  return evidence.access_log.filter((entry) => isInside(internalRoot, entry.path));
}

function productSnapshot(accessLog, repo, purpose) {
  return {
    source: readTracked(accessLog, path.join(repo, "src", "greeting.mjs"), purpose),
    test: readTracked(accessLog, path.join(repo, "test", "greeting.test.mjs"), purpose),
    docs: readTracked(accessLog, path.join(repo, "docs", "guide.md"), purpose),
    metadata: readTracked(accessLog, path.join(repo, ".gitignore"), purpose),
  };
}

function productSnapshotMatches(snapshot) {
  return (
    snapshot.source.includes("Hello, ${name}!") &&
    snapshot.test.includes("personalized greeting") &&
    snapshot.docs.includes("Hello, Ada!") &&
    snapshot.metadata.includes("fixture-dist/")
  );
}

export function assertPackagedMixedScopeEvidence(evidence) {
  if (!Number.isSafeInteger(evidence.plan_bytes) || evidence.plan_bytes <= 4218) {
    fail("missing_planner", "accepted semantic plan did not cross the 0.7.5 failure boundary");
  }
  if (!evidence.phase_roles?.includes("EXECUTOR")) {
    fail("missing_executor", "public supervisor did not issue the implementation episode");
  }
  const changed = new Set(evidence.changed_paths);
  for (const requiredPath of PACKAGED_MIXED_SCOPE_REQUIRED_PATHS) {
    if (changed.has(requiredPath)) continue;
    if (requiredPath === "src/greeting.mjs") fail("missing_code", "source change was omitted");
    if (requiredPath === "test/greeting.test.mjs") fail("missing_tests", "test change was omitted");
    if (requiredPath === "docs/guide.md") fail("missing_docs", "documentation change was omitted");
    fail("missing_metadata", "repository metadata change was omitted");
  }
  if (evidence.verification?.state !== "ok" || evidence.verification?.phase !== "TESTER") {
    fail("missing_verification", "supervisor-owned deterministic verification was not observed");
  }
  if (evidence.evaluator?.state !== "pass" || evidence.evaluator?.phase !== "EVALUATOR") {
    fail("missing_evaluator", "evidence-backed evaluator acceptance was not observed");
  }
  if (
    evidence.task_class?.selected_mode !== "direct" ||
    evidence.task_class?.external_effects?.length !== 0 ||
    PACKAGED_MIXED_SCOPE_REQUIRED_EFFECTS.some(
      (effect) => !evidence.task_class?.repository_effects?.includes(effect),
    )
  ) {
    fail(
      "task_class_firewall_missing",
      "canonical direct routing did not preserve mixed repository effects and the empty external-effect firewall",
    );
  }
  if (!/^[0-9a-f]{40}$/u.test(evidence.commit?.task_commit ?? "")) {
    fail("missing_commit", "task finish did not record a real Git commit");
  }
  if (evidence.finish?.status !== "DONE" || evidence.finish?.terminal !== true) {
    fail("missing_finish", "public supervisor did not complete the lifecycle");
  }
  if (
    evidence.final_consumer?.test_status !== 0 ||
    evidence.final_consumer?.product_matches !== true
  ) {
    fail("missing_final_readback", "completed lifecycle did not preserve the product behavior");
  }
  if (
    evidence.commit?.after_execution_base !== true ||
    evidence.commit?.final_head_contains_task_commit !== true ||
    evidence.commit?.product_tree_preserved_after_task_commit !== true ||
    evidence.commit?.count_after <= evidence.commit?.count_before
  ) {
    fail("wrong_lifecycle_commit", "recorded task commit is not the completed product commit");
  }
  if (evidence.stale_exchange?.rejected !== true) {
    fail("stale_exchange_accepted", "an accepted envelope was replayed without a stable rejection");
  }
  if (
    evidence.exact_replay?.idempotent !== true ||
    evidence.exact_replay?.action !== "approval_required"
  ) {
    fail(
      "accepted_exchange_not_idempotent",
      "exact accepted-envelope replay did not preserve the current lifecycle boundary",
    );
  }
  const internal = invalidInternalAccesses(evidence);
  if (internal.length > 0) {
    fail("internal_artifact_access", `harness accessed ${internal[0].path}`);
  }
  if (evidence.temp_cleanup !== true) {
    fail("temporary_state_leaked", "temporary package or fixture state remained after execution");
  }
  if (evidence.final_git_status !== "") {
    fail(
      "dirty_fixture",
      `fixture ended with tracked or untracked changes: ${evidence.final_git_status}`,
    );
  }
  return evidence;
}

function buildFixture(run, repo, accessLog) {
  mkdirSync(repo, { recursive: true });
  git(run, repo, ["init", "-q", "-b", "main"]);
  git(run, repo, ["config", "user.name", "AgentPlane Qualification"]);
  git(run, repo, ["config", "user.email", "qualification@example.invalid"]);
  writeTracked(
    accessLog,
    path.join(repo, "package.json"),
    `${JSON.stringify(
      {
        name: "agentplane-mixed-scope-fixture",
        private: true,
        type: "module",
        scripts: { "ci:local:full": PACKAGED_MIXED_SCOPE_FULL_REGRESSION_COMMAND },
      },
      null,
      2,
    )}\n`,
    "fixture_seed",
  );
  writeTracked(
    accessLog,
    path.join(repo, "src", "greeting.mjs"),
    'export function greeting() {\n  return "Hello, world!";\n}\n',
    "fixture_seed",
  );
  writeTracked(
    accessLog,
    path.join(repo, "test", "greeting.test.mjs"),
    [
      'import assert from "node:assert/strict";',
      'import { test } from "node:test";',
      'import { greeting } from "../src/greeting.mjs";',
      "",
      'test("returns the default greeting", () => {',
      '  assert.equal(greeting(), "Hello, world!");',
      "});",
      "",
    ].join("\n"),
    "fixture_seed",
  );
  writeTracked(
    accessLog,
    path.join(repo, "docs", "guide.md"),
    "# Greeting guide\n\nCall `greeting()` to receive `Hello, world!`.\n",
    "fixture_seed",
  );
  writeTracked(accessLog, path.join(repo, ".gitignore"), "node_modules/\n", "fixture_seed");
  writeTracked(
    accessLog,
    path.join(repo, "README.md"),
    "# Mixed-scope qualification fixture\n",
    "fixture_seed",
  );
  commitAllIfDirty(run, repo, "chore: seed mixed-scope fixture");
}

function applyProductChange(accessLog, repo) {
  writeTracked(
    accessLog,
    path.join(repo, "src", "greeting.mjs"),
    ['export function greeting(name = "world") {', "  return `Hello, ${name}!`;", "}", ""].join(
      "\n",
    ),
    "executor_product_change",
  );
  writeTracked(
    accessLog,
    path.join(repo, "test", "greeting.test.mjs"),
    [
      'import assert from "node:assert/strict";',
      'import { test } from "node:test";',
      'import { greeting } from "../src/greeting.mjs";',
      "",
      'test("returns the default greeting", () => {',
      '  assert.equal(greeting(), "Hello, world!");',
      "});",
      "",
      'test("returns a personalized greeting", () => {',
      '  assert.equal(greeting("Ada"), "Hello, Ada!");',
      "});",
      "",
    ].join("\n"),
    "executor_product_change",
  );
  writeTracked(
    accessLog,
    path.join(repo, "docs", "guide.md"),
    [
      "# Greeting guide",
      "",
      "Call `greeting()` to receive `Hello, world!`.",
      'Call `greeting("Ada")` to receive `Hello, Ada!`.',
      "",
    ].join("\n"),
    "executor_product_change",
  );
  const gitignorePath = path.join(repo, ".gitignore");
  const currentGitignore = readTracked(accessLog, gitignorePath, "executor_metadata_read");
  writeTracked(
    accessLog,
    gitignorePath,
    `${currentGitignore.replace(/\n*$/u, "\n")}fixture-dist/\n`,
    "executor_product_change",
  );
}

export function runPackagedMixedScopeFixture({ run, cli, packages, tempRoot }) {
  const repo = path.join(tempRoot, "fixture");
  const accessLog = [];
  const approvalSigner = createApprovalSigner();
  buildFixture(run, repo, accessLog);

  run(process.execPath, [cli, "--version"], { cwd: repo });
  run(
    process.execPath,
    [
      cli,
      "init",
      "--yes",
      "--init-mode",
      "ci",
      "--tool",
      "manual",
      "--setup-profile",
      "standard",
      "--workflow",
      "direct",
      "--backend",
      "local",
      "--hooks",
      "false",
      "--require-plan-approval",
      "true",
      "--require-network-approval",
      "false",
      "--require-verify-approval",
      "false",
    ],
    { cwd: repo },
  );
  configureApprovalSigner(repo, approvalSigner);
  commitAllIfDirty(run, repo, "chore: initialize AgentPlane fixture");

  const created = runInstalledJson(
    run,
    cli,
    repo,
    [
      "task",
      "create",
      "Add a personalized greeting with tests and user documentation",
      "--description",
      "Change source behavior, automated tests, the user guide, and .gitignore without external effects.",
      "--route",
      "auto",
      "--verify",
      "node --test test/greeting.test.mjs",
      "--json",
    ],
    "task create",
  );
  const taskId = created.task_id;
  assert.equal(created.status, "semantic_input_required");

  run(
    process.execPath,
    [
      cli,
      "task",
      "doc",
      "set",
      taskId,
      "--section",
      "Verify Steps",
      "--text",
      `1. Run \`${PACKAGED_MIXED_SCOPE_FULL_REGRESSION_COMMAND}\`. Expected: personalized greeting behavior and its regression tests pass.`,
      "--updated-by",
      "ORCHESTRATOR",
    ],
    { cwd: repo },
  );
  const planner = advanceToEpisode(run, cli, repo, taskId, "PLANNER");
  const plan = longMixedScopePlan();
  const plannerExchange = writePacketResult(accessLog, planner, "PLANNER", {
    summary: plan,
    taskPlanProposal: (workOrder) =>
      mixedScopeTaskPlanProposal(taskId, workOrder.planning_context.repository_snapshot),
    taskIntent: {
      task_kind: "code",
      mutation_scope: "code",
      risk_flags: [],
      tags: ["qualification", "mixed-scope", "installed-package"],
      blueprint_request: "code.direct",
      execution: {
        schema_version: 2,
        preferred_mode: "direct",
        scope_roots: [...PACKAGED_MIXED_SCOPE_REQUIRED_PATHS],
        repository_effects: ["repository_write", "source_code", "tests", "documentation"],
        external_effects: [],
        requirements_uncertainty: "bounded",
        implementation_uncertainty: "bounded",
        reversibility: "reversible",
        rationale: [
          "The fixture change is local, bounded, reversible, and has no external effects.",
        ],
      },
    },
  });
  const approval = runPacketArgv(
    run,
    cli,
    repo,
    plannerExchange.resume_argv,
    "planner result acceptance",
  );
  if (approval.action?.kind !== "approval_required") {
    fail(
      "missing_plan_approval",
      `planner result advanced to ${approval.action?.kind ?? "unknown"}/${approval.authority?.role ?? "unknown"}`,
    );
  }
  assert.equal(approval.operator_action?.kind, "approve_plan");

  const exactReplay = runNodeCliResult(cli, repo, plannerExchange.resume_argv.slice(1));
  const exactReplayPacket = parseJson(exactReplay.stdout, "exact accepted-envelope replay");
  if (
    exactReplay.status !== 0 ||
    exactReplayPacket.action?.kind !== "approval_required" ||
    exactReplayPacket.state_fingerprint !== approval.state_fingerprint
  ) {
    fail(
      "accepted_exchange_not_idempotent",
      `exact accepted-envelope replay did not return the current approval boundary: status=${exactReplay.status}`,
    );
  }
  const acceptedEnvelopeText = readTracked(
    accessLog,
    plannerExchange.result_path,
    "stale_exchange_probe_read",
  );
  const staleEnvelope = parseJson(acceptedEnvelopeText, "accepted planning result");
  staleEnvelope.state_fingerprint = `sha256:${"0".repeat(64)}`;
  writeTracked(
    accessLog,
    plannerExchange.result_path,
    `${JSON.stringify(staleEnvelope, null, 2)}\n`,
    "stale_exchange_probe_write",
  );
  const stale = runNodeCliResult(cli, repo, plannerExchange.resume_argv.slice(1));
  const staleDiagnostic = `${stale.stderr}\n${stale.stdout}`.trim();
  if (
    stale.status === 0 ||
    !/fingerprint|stale|accepted result|no issued external-agent exchange/iu.test(staleDiagnostic)
  ) {
    fail(
      "stale_exchange_accepted",
      `modified planning envelope did not fail stably: status=${stale.status} ${staleDiagnostic}`,
    );
  }
  writeTracked(
    accessLog,
    plannerExchange.result_path,
    acceptedEnvelopeText,
    "stale_exchange_probe_restore",
  );

  runPacketCommand(
    run,
    cli,
    approval.operator_action.cwd ?? repo,
    signedApprovalArgv(approval.operator_action, approvalSigner),
    "plan approval",
  );
  commitAllIfDirty(run, repo, `chore: approve ${taskId} plan`);
  const executionBase = git(run, repo, ["rev-parse", "HEAD"]);
  const commitCountBefore = Number(git(run, repo, ["rev-list", "--count", "HEAD"]));

  const executor = advanceToEpisode(run, cli, repo, taskId, "EXECUTOR");
  applyProductChange(accessLog, repo);
  const executorExchange = writePacketResult(accessLog, executor, "EXECUTOR", {
    summary:
      "Implemented personalized greeting behavior, executable tests, aligned user documentation, and repository ignore metadata.",
    claimedChecks: [
      {
        check: "node --test test/greeting.test.mjs",
        claimed_status: "not_run",
        details: "The AgentPlane supervisor owns deterministic verification for this task.",
      },
    ],
  });
  const evaluator = runPacketArgv(
    run,
    cli,
    repo,
    executorExchange.resume_argv,
    "executor result acceptance",
  );
  const postVerificationTask =
    evaluator.action?.kind === "agent_episode" && evaluator.authority?.role === "EVALUATOR"
      ? null
      : runInstalledJson(run, cli, repo, ["task", "show", taskId], "post-verification task show");
  packetExchange(evaluator, "EVALUATOR", postVerificationTask);

  const changedPaths = git(run, repo, ["diff", "--name-only", executionBase, "HEAD", "--"])
    .split("\n")
    .filter(Boolean)
    .toSorted();
  const evaluatorProductSnapshot = productSnapshot(accessLog, repo, "evaluator_review");
  const evaluatorTestResult = spawnSync(process.execPath, ["--test", "test/greeting.test.mjs"], {
    cwd: repo,
    encoding: "utf8",
    env: { ...process.env, AGENTPLANE_NO_UPDATE_CHECK: "1" },
    maxBuffer: 128 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (evaluatorTestResult.error) throw evaluatorTestResult.error;
  const reviewReady =
    PACKAGED_MIXED_SCOPE_REQUIRED_PATHS.every((requiredPath) =>
      changedPaths.includes(requiredPath),
    ) &&
    evaluatorTestResult.status === 0 &&
    productSnapshotMatches(evaluatorProductSnapshot);
  if (!reviewReady) {
    fail(
      "missing_evaluator_evidence",
      `public diff or deterministic verification was incomplete: paths=${changedPaths.join(",")} ` +
        `test_status=${evaluatorTestResult.status} source=${evaluatorProductSnapshot.source.includes("Hello, ${name}!")} ` +
        `tests=${evaluatorProductSnapshot.test.includes("personalized greeting")} ` +
        `docs=${evaluatorProductSnapshot.docs.includes("Hello, Ada!")} ` +
        `metadata=${evaluatorProductSnapshot.metadata.includes("fixture-dist/")}`,
    );
  }

  const evaluatorExchange = writePacketResult(accessLog, evaluator, "EVALUATOR", {
    summary:
      "Reviewed the committed diff and public deterministic-verification state; every required product surface is present and consistent.",
    review: {
      verdict: "pass",
      missing_tests: [],
      hidden_assumptions: [],
      residual_risks: [],
    },
  });
  let terminalCandidate;
  try {
    terminalCandidate = runPacketArgv(
      run,
      cli,
      repo,
      evaluatorExchange.resume_argv,
      "evaluator result acceptance",
    );
  } catch (error) {
    const route = runNodeCliResult(cli, repo, [
      "task",
      "next-action",
      taskId,
      "--explain",
      "--json",
    ]);
    throw new Error(
      `${error.message}\nissued_fingerprint=${evaluator.state_fingerprint}\ncurrent_route=${route.stdout || route.stderr}`,
    );
  }
  const terminal = continueToTerminal(run, cli, repo, taskId, terminalCandidate);
  const finalTask = runInstalledJson(run, cli, repo, ["task", "show", taskId], "final task show");
  const finalHead = git(run, repo, ["rev-parse", "HEAD"]);
  const commitCountAfter = Number(git(run, repo, ["rev-list", "--count", "HEAD"]));
  const taskCommit =
    typeof finalTask.commit === "string"
      ? finalTask.commit
      : typeof finalTask.commit?.sha === "string"
        ? finalTask.commit.sha
        : typeof finalTask.commit?.hash === "string"
          ? finalTask.commit.hash
          : "";
  try {
    git(run, repo, ["cat-file", "-e", `${taskCommit}^{commit}`]);
  } catch (error) {
    fail(
      "missing_commit",
      `recorded task commit is absent from Git: value=${JSON.stringify(taskCommit)} ` +
        `status=${finalTask.status} head=${finalHead} error=${error.message}`,
    );
  }
  const afterExecutionBase =
    taskCommit !== executionBase &&
    git(run, repo, ["merge-base", "--is-ancestor", executionBase, taskCommit]) === "";
  const finalHeadContainsTaskCommit =
    git(run, repo, ["merge-base", "--is-ancestor", taskCommit, finalHead]) === "";
  const productTreePreservedAfterTaskCommit =
    git(run, repo, [
      "diff",
      "--quiet",
      taskCommit,
      finalHead,
      "--",
      ...PACKAGED_MIXED_SCOPE_REQUIRED_PATHS,
    ]) === "";
  if (
    !afterExecutionBase ||
    !finalHeadContainsTaskCommit ||
    !productTreePreservedAfterTaskCommit ||
    commitCountAfter <= commitCountBefore
  ) {
    fail(
      "wrong_lifecycle_commit",
      `recorded task commit is not the completed product commit: task=${taskCommit} ` +
        `head=${finalHead} base=${executionBase} after_base=${afterExecutionBase} ` +
        `head_contains_task=${finalHeadContainsTaskCommit} ` +
        `product_preserved=${productTreePreservedAfterTaskCommit} ` +
        `before=${commitCountBefore} after=${commitCountAfter}`,
    );
  }
  const finalProductSnapshot = productSnapshot(accessLog, repo, "final_consumer_readback");
  const finalConsumerTest = spawnSync(process.execPath, ["--test", "test/greeting.test.mjs"], {
    cwd: repo,
    encoding: "utf8",
    env: { ...process.env, AGENTPLANE_NO_UPDATE_CHECK: "1" },
    maxBuffer: 128 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (finalConsumerTest.error) throw finalConsumerTest.error;
  if (finalConsumerTest.status !== 0 || !productSnapshotMatches(finalProductSnapshot)) {
    fail(
      "missing_final_readback",
      `completed product readback failed: test_status=${finalConsumerTest.status} ` +
        `product_matches=${productSnapshotMatches(finalProductSnapshot)}`,
    );
  }

  return {
    schema_version: 1,
    kind: "agentplane.packaged_mixed_scope_lifecycle_evidence",
    task_id: taskId,
    fixture_repo: repo,
    packages,
    plan_bytes: Buffer.byteLength(plan, "utf8"),
    phase_roles: ["PLANNER", "EXECUTOR", "TESTER:supervisor_owned", "EVALUATOR"],
    changed_paths: changedPaths,
    verification: {
      phase: "TESTER",
      state: finalTask.verification?.state ?? null,
      command: "node --test test/greeting.test.mjs",
    },
    evaluator: {
      phase: "EVALUATOR",
      state: finalTask.quality_review?.state ?? null,
      reviewed_changed_paths: changedPaths,
    },
    task_class: {
      selected_mode: finalTask.execution_route?.selected_mode ?? null,
      repository_effects: finalTask.execution_contract?.declaration?.repository_effects ?? [],
      external_effects: finalTask.execution_contract?.declaration?.external_effects ?? [],
    },
    commit: {
      task_commit: taskCommit,
      final_head: finalHead,
      count_before: commitCountBefore,
      count_after: commitCountAfter,
      after_execution_base: afterExecutionBase,
      final_head_contains_task_commit: finalHeadContainsTaskCommit,
      product_tree_preserved_after_task_commit: productTreePreservedAfterTaskCommit,
    },
    final_consumer: {
      test_status: finalConsumerTest.status,
      product_matches: productSnapshotMatches(finalProductSnapshot),
    },
    finish: { status: finalTask.status, terminal: terminal.action?.kind === "terminal" },
    stale_exchange: {
      rejected: stale.status !== 0,
      status: stale.status,
      diagnostic: staleDiagnostic,
    },
    exact_replay: {
      idempotent: exactReplay.status === 0,
      action: exactReplayPacket.action?.kind ?? null,
      state_fingerprint: exactReplayPacket.state_fingerprint ?? null,
    },
    access_log: accessLog,
    final_git_status: git(run, repo, ["status", "--short", "--untracked-files=all"]),
    temp_cleanup: false,
  };
}

export function runPackagedMixedScopeLifecycle() {
  const run = createQualificationCommandRunner(repoRoot);
  const candidateStatus = git(run, repoRoot, [
    "status",
    "--short",
    "--untracked-files=all",
    "--",
    ".",
    ":(exclude).agentplane/tasks",
  ]);
  if (candidateStatus) {
    fail("candidate_not_clean", `packaged candidate worktree is not clean: ${candidateStatus}`);
  }
  const tempRoot = mkdtempSync(path.join(os.tmpdir(), "agentplane-packaged-mixed-scope-"));
  const prefix = path.join(tempRoot, "prefix");
  const packDirectory = path.join(tempRoot, "packs");
  const cacheDirectory = path.join(tempRoot, "npm-cache");
  mkdirSync(prefix, { recursive: true });
  mkdirSync(packDirectory, { recursive: true });
  mkdirSync(cacheDirectory, { recursive: true });
  let evidence;
  try {
    const installed = installPackedWorkspace({
      run,
      prefix,
      packDirectory,
      cacheDirectory,
      repoRoot,
      packageNames: PACKAGES,
    });
    evidence = runPackagedMixedScopeFixture({
      run,
      cli: installed.cli,
      packages: installed.packages,
      tempRoot,
    });
  } finally {
    rmSync(tempRoot, { recursive: true, force: true });
  }
  evidence.temp_cleanup = !existsSync(tempRoot);
  assertPackagedMixedScopeEvidence(evidence);
  return evidence;
}

if (isDirectRun(import.meta.url)) {
  try {
    const evidence = runPackagedMixedScopeLifecycle();
    process.stdout.write(
      `${JSON.stringify(
        {
          status: "passed",
          task_id: evidence.task_id,
          plan_bytes: evidence.plan_bytes,
          changed_paths: evidence.changed_paths,
          task_commit: evidence.commit.task_commit,
          stale_exchange_status: evidence.stale_exchange.status,
          temp_cleanup: evidence.temp_cleanup,
        },
        null,
        2,
      )}\n`,
    );
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}
