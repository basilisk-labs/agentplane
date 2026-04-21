import { existsSync } from "node:fs";
import path from "node:path";

import { execFileAsync } from "@agentplaneorg/core/process";

import { shouldAutoBootstrapAfterIntegrate } from "./bootstrap-guidance.js";

export type PreIntegrateBootstrapResult =
  | { status: "not-needed" }
  | { status: "skipped" }
  | { status: "ran" }
  | { status: "failed"; error: string };

function compactError(err: unknown): string {
  if (err instanceof Error) {
    const text = err.message.trim();
    return text.length > 0 ? text : err.name;
  }
  return String(err);
}

function baseRuntimeReady(gitRoot: string): boolean {
  return (
    existsSync(path.join(gitRoot, "node_modules")) &&
    existsSync(path.join(gitRoot, "packages", "agentplane", "node_modules")) &&
    existsSync(path.join(gitRoot, "packages", "agentplane", "dist", "cli.js"))
  );
}

export async function maybeRunPreIntegrateBootstrap(opts: {
  gitRoot: string;
  changedPaths: string[];
}): Promise<PreIntegrateBootstrapResult> {
  if (baseRuntimeReady(opts.gitRoot)) {
    return { status: "not-needed" };
  }
  if (!shouldAutoBootstrapAfterIntegrate(opts)) {
    return { status: "skipped" };
  }
  try {
    await execFileAsync("bun", ["run", "framework:dev:bootstrap"], {
      cwd: opts.gitRoot,
      env: { ...process.env },
      maxBuffer: 50 * 1024 * 1024,
    });
    return { status: "ran" };
  } catch (err) {
    return { status: "failed", error: compactError(err) };
  }
}
