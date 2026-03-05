import { spawn } from "node:child_process";

export type HookName = "after_create" | "before_run" | "after_run" | "before_remove";

export type HookPolicy = {
  command?: string;
  timeoutMs: number;
  blocking: boolean;
};

export type HookResult = {
  ok: boolean;
  hook: HookName;
  exitCode: number | null;
  timedOut: boolean;
  output: string;
};

export async function runLifecycleHook(opts: {
  hook: HookName;
  policy: HookPolicy;
  cwd: string;
}): Promise<HookResult> {
  if (!opts.policy.command || opts.policy.command.trim().length === 0) {
    return {
      ok: true,
      hook: opts.hook,
      exitCode: 0,
      timedOut: false,
      output: "",
    };
  }

  return await new Promise<HookResult>((resolve) => {
    const child = spawn("sh", ["-lc", opts.policy.command!], {
      cwd: opts.cwd,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let output = "";
    let finished = false;

    const timer = setTimeout(
      () => {
        if (finished) return;
        finished = true;
        child.kill("SIGKILL");
        resolve({
          ok: !opts.policy.blocking,
          hook: opts.hook,
          exitCode: null,
          timedOut: true,
          output,
        });
      },
      Math.max(1, opts.policy.timeoutMs),
    );

    child.stdout.on("data", (chunk: Buffer | string) => {
      output += String(chunk);
    });
    child.stderr.on("data", (chunk: Buffer | string) => {
      output += String(chunk);
    });

    child.on("close", (code) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      const success = code === 0;
      resolve({
        ok: success || !opts.policy.blocking,
        hook: opts.hook,
        exitCode: code,
        timedOut: false,
        output,
      });
    });
  });
}

export async function runLifecycleHooks(opts: {
  cwd: string;
  hooks: Partial<Record<HookName, HookPolicy>>;
  order: HookName[];
}): Promise<{ ok: boolean; results: HookResult[] }> {
  const results: HookResult[] = [];

  for (const hook of opts.order) {
    const policy = opts.hooks[hook];
    if (!policy) continue;
    const result = await runLifecycleHook({ hook, policy, cwd: opts.cwd });
    results.push(result);
    if (!result.ok && policy.blocking) {
      return { ok: false, results };
    }
  }

  return { ok: true, results };
}
