import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
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
          messageIncludes: "behind its upstream origin/main",
          fields: ["code", "message", "hint", "next_action", "reason_decode"],
          nestedFields: {
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

      process.stdout.write(`local tarball install smoke OK (${taskId})\n`);
    } finally {
      rmSync(tempRoot, { recursive: true, force: true });
    }
  },
});

runScriptMain(main);
