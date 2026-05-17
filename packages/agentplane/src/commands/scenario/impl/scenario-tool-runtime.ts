import { runProcess } from "@agentplaneorg/core/process";

type RecipeToolRuntime = "node" | "bash";

type RecipeToolInvocation = {
  command: string;
  args: string[];
};

const RECIPE_TOOL_INVOCATIONS: Record<
  RecipeToolRuntime,
  (entrypoint: string) => RecipeToolInvocation
> = {
  node: (entrypoint) => ({ command: "node", args: [entrypoint] }),
  bash: (entrypoint) => ({ command: "bash", args: [entrypoint] }),
};

export function resolveRecipeToolInvocation(
  runtime: RecipeToolRuntime,
  entrypoint: string,
  args: string[],
): RecipeToolInvocation {
  const invocation = RECIPE_TOOL_INVOCATIONS[runtime](entrypoint);
  return { command: invocation.command, args: [...invocation.args, ...args] };
}

export async function executeRecipeTool(opts: {
  runtime: RecipeToolRuntime;
  entrypoint: string;
  args: string[];
  cwd: string;
  env: Record<string, string>;
}): Promise<{ exitCode: number; stdout: string; stderr: string }> {
  const { command, args } = resolveRecipeToolInvocation(opts.runtime, opts.entrypoint, opts.args);
  try {
    const { stdout, stderr } = await runProcess({
      command,
      args,
      cwd: opts.cwd,
      env: opts.env,
    });
    return { exitCode: 0, stdout: String(stdout), stderr: String(stderr) };
  } catch (err) {
    const rawCode =
      err && typeof err === "object" && "code" in err
        ? (err as { code?: number | string }).code
        : undefined;
    const code = typeof rawCode === "number" ? rawCode : undefined;
    const isCommandNotFound =
      rawCode === "ENOENT" ||
      code === 127 ||
      (err instanceof Error && err.message.includes("allowed executable set"));
    let execErr: { code?: number; stdout?: string; stderr?: string } | null = null;
    if (err && typeof err === "object") {
      execErr = err as { code?: number; stdout?: string; stderr?: string };
    }
    const exitCode = typeof execErr?.code === "number" ? execErr.code : 1;
    let stderrText = String(execErr?.stderr ?? "");
    const isMissingNodeEntrypoint =
      command === "node" &&
      /Cannot find module/i.test(stderrText) &&
      (stderrText.includes(opts.entrypoint) || stderrText.includes(`${opts.entrypoint}.js`));
    if (isMissingNodeEntrypoint && !isCommandNotFound) {
      const runtimeLabel = opts.entrypoint.replace(/\.(js|mjs|cjs)$/, "");
      stderrText = `Runtime command not found: ${runtimeLabel}`;
      return {
        exitCode: 1,
        stdout: "",
        stderr: stderrText,
      };
    }
    if (isCommandNotFound && !stderrText) {
      stderrText = `Runtime command not found: ${command}`;
    }
    return {
      exitCode,
      stdout: String(execErr?.stdout ?? ""),
      stderr: stderrText,
    };
  }
}
