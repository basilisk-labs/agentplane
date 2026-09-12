import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { defineScript, runScriptMain } from "../lib/script-runtime.mjs";
import { runInstalledMigrationMatrix } from "../lib/installed-migration-matrix.mjs";

const PACKAGES = ["core", "recipes", "agentplane"];

function run(command, args, opts = {}) {
  return execFileSync(command, args, {
    cwd: opts.cwd ?? process.cwd(),
    encoding: "utf8",
    env: {
      ...process.env,
      AGENTPLANE_NO_UPDATE_CHECK: "1",
      ...(opts.env ?? {}),
    },
    stdio: opts.stdio ?? ["ignore", "pipe", "pipe"],
  });
}

function runFailure(command, args, opts = {}) {
  const result = spawnSync(command, args, {
    cwd: opts.cwd ?? process.cwd(),
    encoding: "utf8",
    env: {
      ...process.env,
      AGENTPLANE_NO_UPDATE_CHECK: "1",
      ...(opts.env ?? {}),
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (result.error) throw result.error;
  assert.notEqual(result.status, 0, `${command} ${args.join(" ")} unexpectedly succeeded`);
  return {
    status: result.status,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
  };
}

function runJson(command, args, opts = {}) {
  return JSON.parse(run(command, args, opts));
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

function writeInstalledEpisodeResult(packet, result) {
  assert.ok(packet.exchange?.directory);
  assert.ok(packet.exchange?.work_order_ref);
  assert.ok(packet.exchange?.result_path);
  const workOrder = JSON.parse(
    readFileSync(path.join(packet.exchange.directory, packet.exchange.work_order_ref), "utf8"),
  );
  writeFileSync(
    packet.exchange.result_path,
    `${JSON.stringify(
      {
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
          summary: result.summary,
          findings: [],
          uncertainty: [],
          ...(result.task_plan_proposal
            ? { task_plan_proposal: result.task_plan_proposal(workOrder) }
            : {}),
        },
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  return packet.exchange.result_path;
}

function completeInstalledPlannerEpisode(agentplane, repo, taskId, actionReceipt) {
  const packet = runJson(agentplane, ["task", "advance", taskId, "--agent-json"], { cwd: repo });
  assert.equal(packet.action?.kind, "agent_episode");
  assert.equal(packet.authority?.role, "PLANNER");
  const resultPath = writeInstalledEpisodeResult(packet, {
    summary: "Plan the bounded local operation, its checks, evidence, and rollback path.",
    task_plan_proposal: (workOrder) => {
      const criterion = {
        id: "criterion-direct-ops-evidence",
        description: "The local operation has a receipt, passing checks, and a rollback path.",
        required: true,
        check_ids: ["check-direct-ops-evidence"],
      };
      const command = "git status --short --untracked-files=no";
      const validation = {
        schema_version: 1,
        criteria: [criterion],
        checks: [
          {
            id: "check-direct-ops-evidence",
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
          action_receipt: actionReceipt,
        }),
      };
      return {
        schema_version: 1,
        task_id: taskId,
        planning_baseline: workOrder.planning_context.repository_snapshot,
        work_items: {
          schema_version: 1,
          work_items: [
            {
              id: "installed-direct-ops-action",
              objective: "Execute the approved local operation and retain its evidence.",
              depends_on: [],
              required_inputs: [],
              expected_outputs: [actionReceipt],
              scope_roots: [actionReceipt],
              acceptance_criteria: [criterion],
              validation,
              context: {
                required_sources: [],
                optional_sources: [],
                symbol_hints: [],
                max_bytes: 16_384,
              },
              risk: "low",
              capabilities: ["task.verify"],
              resource_claims: [{ kind: "path", resource: actionReceipt, mode: "write" }],
              optional: false,
              priority: 1,
            },
          ],
        },
        assumptions: [],
        unresolved_questions: [],
        top_level_validation: validation,
      };
    },
  });
  runJson(agentplane, ["task", "advance", taskId, "--result", resultPath, "--agent-json"], {
    cwd: repo,
  });
}

function completeInstalledExecutorEpisode(agentplane, repo, taskId, actionReceipt) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const packet = runJson(agentplane, ["task", "advance", taskId, "--agent-json"], {
      cwd: repo,
    });
    if (packet.action?.kind !== "agent_episode") continue;
    assert.equal(packet.authority?.role, "EXECUTOR");
    const exchange = JSON.parse(
      readFileSync(path.join(packet.exchange.directory, "exchange.json"), "utf8"),
    );
    const checkout = exchange.checkout ?? repo;
    mkdirSync(path.dirname(path.join(checkout, actionReceipt)), { recursive: true });
    writeFileSync(path.join(checkout, actionReceipt), "operation=applied\ncheck=ready\n", "utf8");
    const resultPath = writeInstalledEpisodeResult(packet, {
      summary: "The approved local operation completed and produced a verifiable receipt.",
    });
    runJson(agentplane, ["task", "advance", taskId, "--result", resultPath, "--agent-json"], {
      cwd: repo,
    });
    return checkout;
  }
  assert.fail("installed direct ops lifecycle did not expose an EXECUTOR episode");
}

function assertOnlyContractFields(value, contract, label) {
  assert.ok(
    value && typeof value === "object" && !Array.isArray(value),
    `${label} must be an object`,
  );
  const required = new Set(contract.requiredFields);
  const allowed = new Set([...contract.requiredFields, ...contract.optionalFields]);
  for (const field of required) {
    assert.ok(Object.hasOwn(value, field), `${label}.${field} is required`);
  }
  for (const field of Object.keys(value)) {
    assert.ok(
      allowed.has(field),
      `${label}.${field} is not part of the installed runtime contract`,
    );
  }
}

function assertJsonFailure(result, expected, contract) {
  assert.equal(result.status, expected.exitCode, result.stderr || result.stdout);
  assert.equal(result.stderr.trim(), "", "JSON error mode must not emit human diagnostics");

  const envelope = JSON.parse(result.stdout);
  assert.deepEqual(Object.keys(envelope), [contract.rootField]);
  const error = envelope[contract.rootField];
  assertOnlyContractFields(error, contract.error, contract.rootField);
  assert.equal(error.code, expected.code);
  assert.equal(typeof error.message, "string");
  if (expected.messageIncludes) {
    assert.match(error.message, new RegExp(expected.messageIncludes, "u"));
  }
  if (expected.fields) {
    assert.deepEqual(
      Object.keys(error),
      expected.fields,
      `${expected.code} emitted an unexpected JSON field set`,
    );
  }
  for (const [field, nestedContract] of Object.entries(contract.nestedObjects)) {
    if (error[field] !== undefined) {
      assertOnlyContractFields(error[field], nestedContract, `${contract.rootField}.${field}`);
    }
  }
  for (const [field, expectedFields] of Object.entries(expected.nestedFields ?? {})) {
    assert.deepEqual(
      Object.keys(error[field] ?? {}),
      expectedFields,
      `${expected.code}.${field} emitted an unexpected field set`,
    );
  }
}

function parseCodeList(value) {
  return [...value.matchAll(/`([^`]+)`/gu)].map((match) => match[1]);
}

function parseInstalledJsonErrorContract(reference) {
  const root = /^- Root field: `([^`]+)`\.$/mu.exec(reference);
  const required = /^- Required error fields: (.+)\.$/mu.exec(reference);
  const optional = /^- Optional error fields: (.+)\.$/mu.exec(reference);
  assert.ok(root, "installed reference omits the JSON error root field");
  assert.ok(required, "installed reference omits required JSON error fields");
  assert.ok(optional, "installed reference omits optional JSON error fields");

  const nestedObjects = {};
  const nestedPattern = /^- `([^`]+)` required fields: (.+?)(?:; optional fields: (.+?))?\.$/gmu;
  for (const match of reference.matchAll(nestedPattern)) {
    nestedObjects[match[1]] = {
      requiredFields: parseCodeList(match[2]),
      optionalFields: match[3] ? parseCodeList(match[3]) : [],
    };
  }
  assert.ok(
    Object.keys(nestedObjects).length > 0,
    "installed reference omits nested error objects",
  );

  return {
    rootField: root[1],
    error: {
      requiredFields: parseCodeList(required[1]),
      optionalFields: parseCodeList(optional[1]),
    },
    nestedObjects,
  };
}

function npmPack(packageDir, outDir, cacheDir) {
  const stdout = run("npm", ["pack", "--json", "--pack-destination", outDir], {
    cwd: packageDir,
    env: { ...process.env, NPM_CONFIG_CACHE: cacheDir },
  });
  const jsonMatch = /(^|\n)(\[\s*\{[\s\S]*\]\s*)$/u.exec(stdout);
  if (!jsonMatch) {
    throw new Error(`npm pack did not emit JSON inventory for ${packageDir}`);
  }
  const parsed = JSON.parse(jsonMatch[2]);
  const first = Array.isArray(parsed) ? parsed[0] : parsed;
  return path.join(outDir, String(first.filename));
}

function binPath(prefix) {
  return process.platform === "win32"
    ? path.join(prefix, "agentplane.cmd")
    : path.join(prefix, "bin", "agentplane");
}

function apBinPath(prefix) {
  return process.platform === "win32"
    ? path.join(prefix, "ap.cmd")
    : path.join(prefix, "bin", "ap");
}

const main = defineScript({
  name: "check-local-tarball-install-smoke.mjs",
  async run() {
    const tempRoot = mkdtempSync(path.join(os.tmpdir(), "agentplane-local-install-smoke-"));
    const packDir = path.join(tempRoot, "packs");
    const prefix = path.join(tempRoot, "prefix");
    const repo = path.join(tempRoot, "repo");
    const opsRepo = path.join(tempRoot, "ops-repo");
    const cacheDir = path.resolve(process.cwd(), ".agentplane", ".npm-cache");

    try {
      mkdirSync(packDir, { recursive: true });
      mkdirSync(prefix, { recursive: true });
      const tarballs = PACKAGES.map((name) =>
        npmPack(path.resolve(process.cwd(), "packages", name), packDir, cacheDir),
      );
      run("npm", ["install", "--global", "--prefix", prefix, ...tarballs], {
        env: { ...process.env, NPM_CONFIG_CACHE: cacheDir },
        stdio: "pipe",
      });

      const agentplane = binPath(prefix);
      const ap = apBinPath(prefix);
      run(agentplane, ["--version"]);
      run(agentplane, ["--help"]);
      run(ap, ["--version"]);
      run(ap, ["help"]);
      const installedReference = path.join(tempRoot, "installed-cli-reference.mdx");
      run(agentplane, ["docs", "cli", "--out", installedReference]);
      const installedReferenceText = readFileSync(installedReference, "utf8");
      assert.match(installedReferenceText, /## Runtime error contract/u);
      assert.match(installedReferenceText, /`E_RUNTIME` → exit `8`/u);
      assert.match(installedReferenceText, /`E_HANDOFF` → exit `9`/u);
      assert.match(installedReferenceText, /Required error fields: `code`, `message`\./u);
      const installedJsonErrorContract = parseInstalledJsonErrorContract(installedReferenceText);

      run("git", ["init", "-q", "-b", "main", repo]);
      run("git", ["config", "user.name", "AgentPlane Smoke"], { cwd: repo });
      run("git", ["config", "user.email", "agentplane-smoke@example.com"], { cwd: repo });
      writeFileSync(path.join(repo, "README.md"), "# Smoke\n", "utf8");
      run("git", ["add", "README.md"], { cwd: repo });
      run("git", ["commit", "-m", "seed"], { cwd: repo });
      run(
        agentplane,
        [
          "init",
          "--yes",
          "--setup-profile",
          "light",
          "--workflow",
          "branch_pr",
          "--backend",
          "local",
          "--hooks",
          "false",
          "--require-plan-approval",
          "true",
        ],
        { cwd: repo },
      );
      run(agentplane, ["context", "init"], { cwd: repo });
      mkdirSync(path.join(repo, "context", "raw", "smoke"), { recursive: true });
      writeFileSync(
        path.join(repo, "context", "raw", "smoke", "source.md"),
        "# Smoke context\n\nPackaged install context smoke source.\n",
        "utf8",
      );
      run(agentplane, ["context", "ingest", "--dry-run", "context/raw/smoke/source.md"], {
        cwd: repo,
      });
      run(agentplane, ["context", "reindex", "--include-raw"], { cwd: repo });
      run(agentplane, ["context", "search", "Packaged", "--format", "json"], { cwd: repo });
      const legacyReport = JSON.parse(
        run(agentplane, ["doctor", "legacy", "--json"], { cwd: repo }),
      );
      assert.equal(legacyReport.kind, "agentplane.doctor.legacy");
      assert.equal(legacyReport.summary?.total, 12);
      assert.equal(legacyReport.adapters?.length, 12);
      assert.ok(
        legacyReport.adapters.every(
          (adapter) =>
            typeof adapter.id === "string" &&
            typeof adapter.introduced_in === "string" &&
            Object.prototype.hasOwnProperty.call(adapter, "remove_in") &&
            typeof adapter.usage_probe?.kind === "string" &&
            typeof adapter.status === "string",
        ),
      );

      assertJsonFailure(
        runFailure(agentplane, ["--json-errors", "task", "show"], { cwd: repo }),
        {
          exitCode: 2,
          code: "E_USAGE",
          messageIncludes: "Missing required argument",
          fields: ["code", "message", "context", "hint", "next_action", "reason_decode"],
          nestedFields: {
            next_action: ["command", "reason", "reasonCode"],
            reason_decode: ["code", "category", "summary", "action"],
          },
        },
        installedJsonErrorContract,
      );

      const taskId = run(
        agentplane,
        [
          "task",
          "new",
          "--title",
          "Tarball smoke",
          "--description",
          "Verify local tarball install",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "docs",
        ],
        { cwd: repo },
      ).trim();
      run(agentplane, ["task", "list"], { cwd: repo });
      run(agentplane, ["task", "show", taskId], { cwd: repo });

      assertJsonFailure(
        runFailure(
          agentplane,
          [
            "--json-errors",
            "task",
            "start-ready",
            taskId,
            "--author",
            "CODER",
            "--body",
            "Start: exercise installed tarball policy failure behavior.",
          ],
          { cwd: repo },
        ),
        {
          exitCode: 2,
          code: "E_PHASE_POLICY",
          messageIncludes: "cannot start implementation before plan approval",
          fields: ["code", "message"],
        },
        installedJsonErrorContract,
      );

      run(
        agentplane,
        [
          "task",
          "plan",
          "set",
          taskId,
          "--text",
          "1) Exercise installed contract failures\n2) Verify JSON envelopes and exit codes",
          "--updated-by",
          "ORCHESTRATOR",
        ],
        { cwd: repo },
      );
      run(
        agentplane,
        ["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--note", "Smoke plan"],
        { cwd: repo },
      );

      run("git", ["remote", "add", "origin", "."], { cwd: repo });
      run("git", ["config", "branch.main.remote", "origin"], { cwd: repo });
      run("git", ["config", "branch.main.merge", "refs/heads/main"], { cwd: repo });
      const baseTree = run("git", ["rev-parse", "HEAD^{tree}"], { cwd: repo }).trim();
      const baseCommit = run("git", ["rev-parse", "HEAD"], { cwd: repo }).trim();
      const upstreamCommit = run(
        "git",
        ["commit-tree", baseTree, "-p", baseCommit, "-m", "upstream smoke advance"],
        { cwd: repo },
      ).trim();
      run("git", ["update-ref", "refs/remotes/origin/main", upstreamCommit], { cwd: repo });

      assertJsonFailure(
        runFailure(
          agentplane,
          [
            "--json-errors",
            "work",
            "start",
            taskId,
            "--agent",
            "CODER",
            "--slug",
            "stale-base",
            "--worktree",
          ],
          { cwd: repo },
        ),
        {
          exitCode: 5,
          code: "E_GIT",
          messageIncludes: "does not exactly match its upstream origin/main",
          fields: ["code", "message", "context", "hint", "next_action", "reason_decode"],
          nestedFields: {
            context: ["reason_code", "base_branch", "upstream_branch", "ahead", "behind"],
            next_action: ["command", "reason", "reasonCode"],
            reason_decode: ["code", "category", "summary", "action"],
          },
        },
        installedJsonErrorContract,
      );

      assertJsonFailure(
        runFailure(
          agentplane,
          [
            "--json-errors",
            "workflow",
            "migrate",
            "--rollback",
            ".agentplane/workflows/migrations/missing-smoke-receipt.json",
          ],
          { cwd: repo },
        ),
        {
          exitCode: 1,
          code: "E_INTERNAL",
          messageIncludes: "ENOENT",
          fields: ["code", "message", "context"],
        },
        installedJsonErrorContract,
      );

      const migrationMatrix = runInstalledMigrationMatrix({
        agentplane,
        repoRoot: process.cwd(),
        tempRoot: path.join(tempRoot, "migration-matrix"),
      });
      process.stdout.write(
        `installed migration matrix OK (scenarios=${migrationMatrix.coverage.scenarioCount})\n`,
      );

      run("git", ["init", "-q", "-b", "main", opsRepo]);
      run("git", ["config", "user.name", "AgentPlane Ops Smoke"], { cwd: opsRepo });
      run("git", ["config", "user.email", "agentplane-ops-smoke@example.com"], {
        cwd: opsRepo,
      });
      run("git", ["commit", "--allow-empty", "-m", "seed ops lifecycle"], { cwd: opsRepo });
      run(
        agentplane,
        [
          "init",
          "--yes",
          "--setup-profile",
          "light",
          "--workflow",
          "direct",
          "--backend",
          "local",
          "--hooks",
          "false",
          "--require-plan-approval",
          "true",
        ],
        { cwd: opsRepo },
      );
      rmSync(path.join(opsRepo, ".agentplane", "bin"), { recursive: true, force: true });
      const opsGitignore = path.join(opsRepo, ".gitignore");
      const opsGitignoreText = readFileSync(opsGitignore, "utf8");
      if (!opsGitignoreText.split(/\r?\n/u).includes(".agentplane/bin/")) {
        writeFileSync(opsGitignore, `${opsGitignoreText.trimEnd()}\n.agentplane/bin/\n`, "utf8");
      }
      writeFileSync(
        path.join(opsRepo, "package.json"),
        `${JSON.stringify(
          {
            name: "agentplane-installed-direct-ops-smoke",
            private: true,
            scripts: { "ci:local:full": "git status --short --untracked-files=no" },
          },
          null,
          2,
        )}\n`,
        "utf8",
      );
      if (run("git", ["status", "--porcelain"], { cwd: opsRepo }).trim()) {
        run("git", ["add", "-A"], { cwd: opsRepo });
        run("git", ["commit", "--no-verify", "-m", "normalize direct ops smoke fixture"], {
          cwd: opsRepo,
        });
      }
      const opsTaskId = run(
        agentplane,
        [
          "task",
          "new",
          "--title",
          "Installed direct ops lifecycle",
          "--description",
          "Prove that packaged AgentPlane closes an evidence-bound operational task.",
          "--priority",
          "high",
          "--owner",
          "CODER",
          "--tag",
          "ops",
          "--verify",
          "git status --short --untracked-files=no",
          "--task-kind",
          "ops",
          "--mutation-scope",
          "ops",
          "--blueprint-request",
          "ops.approval",
          "--route",
          "direct",
          "--allow-duplicate",
        ],
        { cwd: opsRepo },
      ).trim();
      const actionReceipt = "ops-action-receipt.txt";
      const bundledActionReceipt = `.agentplane/tasks/${opsTaskId}/evidence/action-receipt.txt`;
      completeInstalledPlannerEpisode(agentplane, opsRepo, opsTaskId, actionReceipt);
      run(
        agentplane,
        [
          "task",
          "doc",
          "set",
          opsTaskId,
          "--section",
          "Verify Steps",
          "--text",
          "Run the packaged direct ops lifecycle. Expected: evidence-bound finish succeeds.",
          "--updated-by",
          "PLANNER",
        ],
        { cwd: opsRepo },
      );
      run(
        agentplane,
        [
          "task",
          "doc",
          "set",
          opsTaskId,
          "--section",
          "Rollback Plan",
          "--text",
          "Restore the previous local state and rerun every operational check.",
          "--updated-by",
          "CODER",
        ],
        { cwd: opsRepo },
      );
      run(
        agentplane,
        ["task", "plan", "approve", opsTaskId, "--by", "ORCHESTRATOR", "--note", "Ops smoke"],
        { cwd: opsRepo },
      );
      run(
        agentplane,
        [
          "task",
          "start-ready",
          opsTaskId,
          "--author",
          "CODER",
          "--body",
          "Start: execute the approved local operation and capture complete evidence.",
        ],
        { cwd: opsRepo },
      );
      run(agentplane, ["blueprint", "snapshot", opsTaskId], { cwd: opsRepo });
      const opsCheckout = completeInstalledExecutorEpisode(
        agentplane,
        opsRepo,
        opsTaskId,
        actionReceipt,
      );
      mkdirSync(path.dirname(path.join(opsCheckout, bundledActionReceipt)), { recursive: true });
      writeFileSync(
        path.join(opsCheckout, bundledActionReceipt),
        readFileSync(path.join(opsCheckout, actionReceipt), "utf8"),
        "utf8",
      );

      const verificationDetails = ["full_regression", "real_e2e", "task_outcome"]
        .map(
          (check) =>
            `Check: ${check}\nCommand: installed tarball ops lifecycle\nResult: pass\nEvidence: ${bundledActionReceipt}\nScope: isolated packaged CLI repository`,
        )
        .join("\n\n");
      run(
        agentplane,
        [
          "verify",
          opsTaskId,
          "--ok",
          "--by",
          "TESTER",
          "--note",
          "Verified: installed direct ops checks and rollback evidence are complete.",
          "--details",
          verificationDetails,
        ],
        { cwd: opsCheckout },
      );
      const evidenceCommit = run("git", ["rev-parse", "HEAD"], { cwd: opsCheckout }).trim();
      assert.match(evidenceCommit, /^[a-f0-9]{40}$/u);
      run(
        agentplane,
        [
          "evaluator",
          "run",
          opsTaskId,
          "--commit",
          evidenceCommit,
          "--provenance",
          "evaluator_supplied",
          "--verdict",
          "pass",
          "--summary",
          "The packaged CLI operational evidence satisfies the approved direct ops contract.",
          "--finding",
          "The action receipt, operational checks, and rollback evidence are complete.",
          "--evidence",
          bundledActionReceipt,
        ],
        { cwd: opsCheckout },
      );
      run("git", ["add", "."], { cwd: opsCheckout });
      run("git", ["commit", "--no-verify", "-m", "record ops evidence review"], {
        cwd: opsCheckout,
      });
      const reviewArtifactCommit = run("git", ["rev-parse", "HEAD"], {
        cwd: opsCheckout,
      }).trim();
      assert.notEqual(reviewArtifactCommit, evidenceCommit);
      run(
        agentplane,
        [
          "finish",
          opsTaskId,
          "--author",
          "CODER",
          "--body",
          "Verified: packaged direct ops evidence remains complete at lifecycle closeout.",
          "--result",
          "packaged direct ops lifecycle completed",
          "--commit",
          evidenceCommit,
          "--no-close-commit",
        ],
        { cwd: opsCheckout },
      );
      assert.equal(
        runJson(agentplane, ["task", "status", opsTaskId, "--json"], { cwd: opsCheckout }).status,
        "DONE",
      );
      process.stdout.write(`installed direct ops lifecycle OK (${opsTaskId})\n`);

      process.stdout.write(`local tarball install smoke OK (${taskId})\n`);
    } finally {
      rmSync(tempRoot, { recursive: true, force: true });
    }
  },
});

runScriptMain(main);
