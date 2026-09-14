import { execFile } from "node:child_process";
import { chmod, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

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
