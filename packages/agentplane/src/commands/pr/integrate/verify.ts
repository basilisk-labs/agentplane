import { extractLastVerifiedSha, runShellCommand } from "../../shared/pr-meta.js";
import { successMessage } from "../../../cli/output.js";
import { exitCodeForError } from "../../../cli/exit-codes.js";
import { CliError } from "../../../shared/errors.js";

function normalizeVerifyCommands(rawVerify: unknown): string[] {
  return Array.isArray(rawVerify)
    ? rawVerify
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];
}

export function computeVerifyState(opts: {
  rawVerify: unknown;
  metaLastVerifiedSha: unknown;
  verifyLogText: string | null;
  branchHeadSha: string;
  runVerify: boolean;
}): {
  verifyCommands: string[];
  alreadyVerifiedSha: string | null;
  shouldRunVerify: boolean;
} {
  const verifyCommands = normalizeVerifyCommands(opts.rawVerify);
  let alreadyVerifiedSha: string | null = null;
  if (verifyCommands.length > 0) {
    const metaVerified =
      typeof opts.metaLastVerifiedSha === "string" ? opts.metaLastVerifiedSha : null;
    if (metaVerified && metaVerified === opts.branchHeadSha) {
      alreadyVerifiedSha = opts.branchHeadSha;
    } else if (opts.verifyLogText) {
      const logSha = extractLastVerifiedSha(opts.verifyLogText);
      if (logSha && logSha === opts.branchHeadSha) alreadyVerifiedSha = logSha;
    }
  }
  const shouldRunVerify =
    opts.runVerify || (verifyCommands.length > 0 && alreadyVerifiedSha === null);
  return { verifyCommands, alreadyVerifiedSha, shouldRunVerify };
}

export async function runVerifyCommands(opts: {
  commands: string[];
  worktreePath: string;
  branchHeadSha: string;
  quiet: boolean;
  taskId: string;
}): Promise<{ header: string; content: string }[]> {
  const verifyEntries: { header: string; content: string }[] = [];
  for (const command of opts.commands) {
    if (!opts.quiet) {
      process.stdout.write(`$ ${command}\n`);
    }
    const timestamp = new Date().toISOString();
    const result = await runShellCommand(command, opts.worktreePath);
    const shaPrefix = opts.branchHeadSha ? `sha=${opts.branchHeadSha} ` : "";
    verifyEntries.push({
      header: `[${timestamp}] ${shaPrefix}$ ${command}`.trimEnd(),
      content: result.output,
    });
    if (result.code !== 0) {
      throw new CliError({
        exitCode: exitCodeForError("E_IO"),
        code: "E_IO",
        message: `Verify command failed: ${command}`,
        context: { commandExitCode: result.code || 1 },
      });
    }
  }
  if (opts.branchHeadSha) {
    verifyEntries.push({
      header: `[${new Date().toISOString()}] ✅ verified_sha=${opts.branchHeadSha}`,
      content: "",
    });
  }
  if (!opts.quiet) {
    process.stdout.write(`${successMessage("verify passed", opts.taskId)}\n`);
  }
  return verifyEntries;
}
