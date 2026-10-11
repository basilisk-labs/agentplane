import { execFile } from "node:child_process";
import { chmod, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { captureStdIO } from "@agentplane/testkit";
import { expect } from "vitest";

import { runCli } from "../../cli/run-cli.js";
import { materializeLegacyDrainIdentityFixture } from "../shared/native-task-identity-fixture.js";
import { cmdTaskAdd } from "../workflow.js";

const execFileAsync = promisify(execFile);

export async function addTask(root: string, taskId: string): Promise<void> {
  await cmdTaskAdd({
    cwd: root,
    taskIds: [taskId],
    title: "Evaluator supervisor integration",
    description: "Exercise one persisted EVALUATOR episode.",
    status: "TODO",
    priority: "med",
    owner: "CODER",
    tags: ["nodejs"],
    dependsOn: [],
    verify: [],
    commentAuthor: null,
    commentBody: null,
  });
  await materializeLegacyDrainIdentityFixture({ root, task_id: taskId });
}

export async function commitTarget(root: string): Promise<void> {
  await mkdir(path.join(root, "src"), { recursive: true });
  await writeFile(
    path.join(root, "src", "evaluated.ts"),
    "export const reviewed = true;\n",
    "utf8",
  );
  await execFileAsync("git", ["add", "--", "."], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "feat: evaluator execute fixture"], { cwd: root });
}

export async function writeVerificationRecord(root: string, taskId: string): Promise<string> {
  const io = captureStdIO();
  let code: number;
  try {
    code = await runCli([
      "task",
      "doc",
      "set",
      taskId,
      "--section",
      "Verify Steps",
      "--text",
      "Run evaluator execute verification. Expected: the fixture record is durable.",
      "--root",
      root,
    ]);
    if (code === 0) {
      await materializeLegacyDrainIdentityFixture({ root, task_id: taskId });
      code = await runCli([
        "verify",
        taskId,
        "--ok",
        "--by",
        "QA",
        "--note",
        "Evaluator execute fixture verified.",
        "--details",
        [
          "Command: bunx vitest run evaluator-execute.command.test.ts",
          "Result: pass",
          "Evidence: fixture test run",
          "Scope: evaluator execute fixture",
        ].join("\n"),
        "--quiet",
        "--root",
        root,
      ]);
    }
  } finally {
    io.restore();
  }
  if (code !== 0) throw new Error(`failed to create verification record: ${io.stderr}`);

  await execFileAsync("git", ["add", "--", ".agentplane"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "test: record evaluator verification fixture"], {
    cwd: root,
  });

  const verificationDir = path.join(root, ".agentplane", "tasks", taskId, "verification");
  const entries = await readdir(verificationDir);
  const files = entries.filter((file) => file.endsWith(".json"));
  expect(files).toHaveLength(1);
  return path.join(verificationDir, files[0]!);
}

export async function installFakeCodex(root: string): Promise<string> {
  const bin = path.join(root, ".agentplane", "cache", "fake-bin");
  await mkdir(bin, { recursive: true });
  const source = [
    "#!/usr/bin/env node",
    "const fs = require('node:fs');",
    "let prompt = '';",
    "process.stdin.setEncoding('utf8');",
    "process.stdin.on('data', (chunk) => { prompt += chunk; });",
    "process.stdin.on('end', () => {",
    "  const workOrderMatch = prompt.match(/^- work_order: (.+)$/m);",
    "  if (!workOrderMatch) process.exit(1);",
    "  const workOrder = JSON.parse(fs.readFileSync(workOrderMatch[1], 'utf8'));",
    "  const evidence = workOrder.evidence.find((entry) => entry.kind === 'actual_diff');",
    "  if (!evidence) process.exit(1);",
    "  const invocationLog = process.env.AGENTPLANE_FAKE_CODEX_INVOCATIONS;",
    "  if (invocationLog) fs.appendFileSync(invocationLog, 'provider-started\\n');",
    "  const verdict = process.env.AGENTPLANE_FAKE_CODEX_VERDICT ?? 'pass';",
    "  const result = { schema_version: 1, kind: 'evaluator_result', evaluator_id: 'recovery-context', verdict, findings: [{ id: 'fixture-pass', severity: 'low', summary: 'Fixture verifies the persisted EVALUATOR result path.', broken_invariant: 'Pass reviews require one evidence-backed finding.', evidence_refs: [{ path: evidence.path }] }], missing_tests: [], hidden_assumptions: [], ...(verdict === 'pass' ? {} : { recovery_context: 'Should the owner accept this explicit decision boundary?' }) };",
    "  const complete = () => {",
    "    process.stdout.write(JSON.stringify({ type: 'session.started' }) + '\\n');",
    "    process.stdout.write(JSON.stringify({ type: 'item.completed', item: { type: 'agent_message', text: JSON.stringify(result) } }) + '\\n');",
    "    process.stdout.write(JSON.stringify({ type: 'turn.completed', usage: { input_tokens: 100, output_tokens: 50, reasoning_output_tokens: 20 } }) + '\\n');",
    "  };",
    "  const releaseFile = process.env.AGENTPLANE_FAKE_CODEX_RELEASE_FILE;",
    "  if (releaseFile) {",
    "    const deadline = Date.now() + 30000;",
    "    const waitForRelease = () => {",
    "      if (fs.existsSync(releaseFile)) { complete(); return; }",
    "      if (Date.now() >= deadline) { process.stderr.write('fake provider release timed out\\n'); process.exit(99); }",
    "      setTimeout(waitForRelease, 20);",
    "    };",
    "    waitForRelease();",
    "    return;",
    "  }",
    "  const delayMs = Number(process.env.AGENTPLANE_FAKE_CODEX_DELAY_MS ?? '0');",
    "  if (Number.isFinite(delayMs) && delayMs > 0) setTimeout(complete, delayMs);",
    "  else complete();",
    "});",
    "",
  ].join("\n");
  const command = path.join(bin, "codex");
  await writeFile(command, source, "utf8");
  await chmod(command, 0o755);
  return bin;
}

export async function runWithFakeCodex(
  root: string,
  taskId: string,
  fakeBin: string,
  executeArgs: string[] = [],
) {
  const previous = process.env.PATH;
  process.env.PATH = `${fakeBin}${path.delimiter}${previous ?? ""}`;
  try {
    const io = captureStdIO();
    try {
      const code = await runCli([
        "evaluator",
        "execute",
        taskId,
        ...executeArgs,
        "--json",
        "--root",
        root,
      ]);
      return { code, stdout: io.stdout, stderr: io.stderr };
    } finally {
      io.restore();
    }
  } finally {
    if (previous === undefined) delete process.env.PATH;
    else process.env.PATH = previous;
  }
}

export async function replaceCodexWithFailure(fakeBin: string, delayMs = 0): Promise<void> {
  const source = [
    "#!/usr/bin/env node",
    "const fs = require('node:fs');",
    "const invocationLog = process.env.AGENTPLANE_FAKE_CODEX_INVOCATIONS;",
    "if (invocationLog) fs.appendFileSync(invocationLog, 'provider-started\\n');",
    "process.stdout.write(JSON.stringify({ type: 'thread.started', thread_id: 'failed-thread' }) + '\\n');",
    "process.stdout.write(JSON.stringify({ type: 'turn.started', turn_id: 'failed-turn' }) + '\\n');",
    "process.stdout.write(JSON.stringify({ type: 'turn.completed', turn_id: 'failed-turn', usage: { input_tokens: 0, output_tokens: 0, reasoning_output_tokens: 0 } }) + '\\n');",
    `setTimeout(() => process.exit(99), ${delayMs});`,
    "",
  ].join("\n");
  await writeFile(path.join(fakeBin, "codex"), source, "utf8");
  await chmod(path.join(fakeBin, "codex"), 0o755);
}

export async function runEvaluatorCliInSeparateProcess(opts: {
  root: string;
  taskId: string;
  fakeBin: string;
  executeArgs?: string[];
  env?: Record<string, string>;
}): Promise<{ code: number; stdout: string; stderr: string }> {
  const cli = path.resolve(process.cwd(), "packages/agentplane/src/cli.ts");
  const args = [
    "--bun",
    cli,
    "evaluator",
    "execute",
    opts.taskId,
    ...(opts.executeArgs ?? []),
    "--json",
    "--root",
    opts.root,
  ];
  return await new Promise((resolve, reject) => {
    execFile(
      "bun",
      args,
      {
        cwd: process.cwd(),
        env: {
          ...process.env,
          PATH: `${opts.fakeBin}${path.delimiter}${process.env.PATH ?? ""}`,
          ...opts.env,
        },
        maxBuffer: 1024 * 1024,
      },
      (error, stdout, stderr) => {
        if (error && typeof error.code !== "number") {
          reject(error instanceof Error ? error : new Error("subprocess execution failed"));
          return;
        }
        resolve({ code: typeof error?.code === "number" ? error.code : 0, stdout, stderr });
      },
    );
  });
}

export async function waitForFileText(filePath: string, expected: string): Promise<void> {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    const text = await readFile(filePath, "utf8").catch(() => "");
    if (text.includes(expected)) return;
    await new Promise<void>((resolve) => setTimeout(resolve, 20));
  }
  throw new Error(`Timed out waiting for ${JSON.stringify(expected)} in ${filePath}`);
}
