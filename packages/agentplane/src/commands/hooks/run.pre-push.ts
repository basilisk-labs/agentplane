import { runProcessSync, resolveProject } from "@agentplaneorg/core";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { fileExists } from "../../cli/fs-utils.js";
import { CliError } from "../../shared/errors.js";
import type { HooksRunOptions } from "./run.js";

function resolveBundledPrePushHookScriptPath(): string {
  return fileURLToPath(new URL("../../../../../scripts/run-pre-push-hook.mjs", import.meta.url));
}

export async function resolvePrePushHookScriptPath(
  gitRoot: string,
  opts: { bundledScriptPath?: string } = {},
): Promise<string | null> {
  const repoScriptPath = path.join(gitRoot, "scripts", "run-pre-push-hook.mjs");
  if (await fileExists(repoScriptPath)) return repoScriptPath;
  const bundledScriptPath = opts.bundledScriptPath ?? resolveBundledPrePushHookScriptPath();
  if (await fileExists(bundledScriptPath)) return bundledScriptPath;
  return null;
}

async function readHookStdinUtf8(timeoutMs = 25): Promise<string> {
  if (process.stdin.isTTY) return "";

  const chunks: Buffer[] = [];
  const consume = (): void => {
    let chunk = process.stdin.read() as string | Buffer | null;
    while (chunk !== null) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
      chunk = process.stdin.read() as string | Buffer | null;
    }
  };

  consume();
  if (chunks.length > 0 || process.stdin.readableEnded) {
    return Buffer.concat(chunks).toString("utf8");
  }

  await new Promise<void>((resolve) => {
    const finish = (): void => {
      clearTimeout(timer);
      process.stdin.off("readable", onReadable);
      process.stdin.off("end", onEnd);
      resolve();
    };
    const onReadable = (): void => {
      consume();
      finish();
    };
    const onEnd = (): void => {
      consume();
      finish();
    };
    const timer = setTimeout(finish, timeoutMs);
    process.stdin.on("readable", onReadable);
    process.stdin.on("end", onEnd);
    process.stdin.resume();
  });

  consume();
  return Buffer.concat(chunks).toString("utf8");
}

export async function runPrePushHook(opts: HooksRunOptions): Promise<number> {
  const resolved = await resolveProject({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const scriptPath = await resolvePrePushHookScriptPath(resolved.gitRoot);
  if (!scriptPath) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: [
        "Missing pre-push hook script: scripts/run-pre-push-hook.mjs",
        "The pre-push hook needs a repository-local script or an installed CLI bundle that ships the fallback.",
        "Fix:",
        "  1) Restore scripts/run-pre-push-hook.mjs in this repository, or",
        "  2) Run `agentplane hooks uninstall` if this repository should not use the agentplane pre-push gate.",
      ].join("\n"),
    });
  }
  const result = runProcessSync({
    command: "node",
    args: [scriptPath],
    cwd: resolved.gitRoot,
    env: process.env,
    encoding: "utf8",
    input: await readHookStdinUtf8(),
    stdin: "pipe",
    stdout: "inherit",
    stderr: "inherit",
    reject: false,
  });
  return result.exitCode ?? (result.signal ? 1 : 0);
}
