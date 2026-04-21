import { execFileAsync } from "@agentplaneorg/core/process";

import { shouldAutoBootstrapAfterIntegrate } from "./bootstrap-guidance.js";

export type PostIntegrateBootstrapResult =
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

export async function maybeRunPostIntegrateBootstrap(opts: {
  gitRoot: string;
  changedPaths: string[];
}): Promise<PostIntegrateBootstrapResult> {
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
