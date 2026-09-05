import path from "node:path";

import { resolveAgentplaneBinPath } from "../../shared/package-paths.js";
import { CliError } from "../../shared/errors.js";

const SAFE_EXECUTABLE_NAME = /^[A-Za-z0-9][A-Za-z0-9._+-]*$/u;
const BLOCKED_EXECUTABLES = new Set([
  "chown",
  "copy",
  "cp",
  "dd",
  "del",
  "doas",
  "erase",
  "kill",
  "mkfs",
  "move",
  "mv",
  "pkill",
  "reboot",
  "rm",
  "rmdir",
  "shutdown",
  "sudo",
]);
const SHELL_EXECUTABLES = new Set(["bash", "dash", "fish", "ksh", "sh", "zsh"]);
const COMMAND_WRAPPER_EXECUTABLES = new Set([
  "chroot",
  "env",
  "find",
  "nice",
  "nohup",
  "parallel",
  "runuser",
  "setsid",
  "stdbuf",
  "su",
  "timeout",
  "watch",
  "xargs",
]);
const GIT_READ_ONLY_SUBCOMMANDS = new Set([
  "annotate",
  "blame",
  "cat-file",
  "check-attr",
  "check-ignore",
  "check-mailmap",
  "check-ref-format",
  "count-objects",
  "describe",
  "diff",
  "diff-files",
  "diff-index",
  "diff-tree",
  "for-each-ref",
  "grep",
  "help",
  "log",
  "ls-files",
  "ls-remote",
  "ls-tree",
  "merge-base",
  "merge-tree",
  "name-rev",
  "range-diff",
  "rev-list",
  "rev-parse",
  "show",
  "show-branch",
  "status",
  "verify-commit",
  "verify-pack",
  "verify-tag",
  "version",
  "whatchanged",
]);
const INLINE_CODE_FLAGS = new Map<string, ReadonlySet<string>>([
  ["bun", new Set(["-e", "--eval", "-p", "--print"])],
  ["deno", new Set(["eval"])],
  ["node", new Set(["-e", "--eval", "-p", "--print"])],
  ["perl", new Set(["-e"])],
  ["python", new Set(["-c"])],
  ["python3", new Set(["-c"])],
  ["ruby", new Set(["-e"])],
]);
const PACKAGE_MUTATING_SUBCOMMANDS = new Set([
  "add",
  "i",
  "install",
  "link",
  "publish",
  "remove",
  "rm",
  "uninstall",
  "unlink",
  "update",
  "upgrade",
]);
const AGENTPLANE_BIN = resolveAgentplaneBinPath();

export type CommandInvocation = {
  command: string;
  args: string[];
};

export type ParsedDeclaredTaskCheck = {
  executable: string;
  args: string[];
  script: string | null;
};

export type DeclaredTaskCheckResolution =
  | { ok: true; check: ParsedDeclaredTaskCheck }
  | { ok: false; reason: string };

export function resolveCommandInvocation(command: string): CommandInvocation {
  const tokens = parseCommandLine(command);
  const executable = tokens[0];
  if (!executable) throw new Error("verify command must be non-empty");
  return { command: executable, args: tokens.slice(1) };
}

function parseCommandLine(command: string): string[] {
  const tokens: string[] = [];
  let current = "";
  let quote: "'" | '"' | null = null;

  for (let index = 0; index < command.length; index += 1) {
    const char = command[index] ?? "";
    if (char === "\0" || char === "\r" || char === "\n") {
      throw new Error("verify command contains invalid characters");
    }
    if (quote) {
      if (char === quote) quote = null;
      else if (char === "\\" && quote === '"' && index + 1 < command.length) {
        index += 1;
        current += command[index] ?? "";
      } else current += char;
      continue;
    }
    if (char === "'" || char === '"') {
      quote = char;
      continue;
    }
    if (char === "\\" && index + 1 < command.length) {
      index += 1;
      current += command[index] ?? "";
      continue;
    }
    if (/\s/u.test(char)) {
      if (current) {
        tokens.push(current);
        current = "";
      }
      continue;
    }
    if ("|&;<>()`$".includes(char)) {
      throw new Error("verify command must use argv syntax without shell metacharacters");
    }
    current += char;
  }
  if (quote) throw new Error("verify command contains an unterminated quote");
  if (current) tokens.push(current);
  return tokens;
}

function repositoryBoundArg(value: string): boolean {
  const candidates = [value];
  const separator = value.indexOf("=");
  if (separator !== -1) candidates.push(value.slice(separator + 1));
  return candidates.every((candidate) => {
    if (!candidate || candidate.startsWith("-")) return true;
    const normalized = candidate.replaceAll("\\", "/");
    return (
      !path.isAbsolute(candidate) &&
      !path.win32.isAbsolute(candidate) &&
      !normalized.split("/").includes("..")
    );
  });
}

function executableBase(executable: string): string {
  const base = executable.replaceAll("\\", "/").split("/").at(-1)?.toLowerCase() ?? "";
  return base.replace(/\.(?:bat|cmd|exe)$/u, "");
}

function validExecutable(executable: string): boolean {
  if (executable.startsWith("-")) return false;
  if (executable.includes("/") || executable.includes("\\")) return repositoryBoundArg(executable);
  return SAFE_EXECUTABLE_NAME.test(executable);
}

function firstShellScriptArg(args: string[]): string | null {
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index] ?? "";
    if (argument === "--") return args[index + 1] ?? null;
    if (!argument.startsWith("-")) return argument;
  }
  return null;
}

function gitSubcommand(args: string[]): string | null {
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index] ?? "";
    if (["-C", "--git-dir", "--work-tree", "--namespace"].includes(argument)) {
      index += 1;
      continue;
    }
    if (argument.startsWith("-")) continue;
    return argument.toLowerCase();
  }
  return null;
}

function packageScript(invocation: CommandInvocation): string | null {
  const base = executableBase(invocation.command);
  const [subcommand, target] = invocation.args;
  if (["bun", "npm", "pnpm", "yarn"].includes(base) && subcommand === "run") {
    return target ?? null;
  }
  if (["npm", "pnpm", "yarn"].includes(base) && subcommand === "test") return "test";
  return null;
}

function hasInlineCodeFlag(args: string[], flags: ReadonlySet<string>): boolean {
  return args.some((argument) =>
    [...flags].some(
      (flag) =>
        argument === flag ||
        argument.startsWith(`${flag}=`) ||
        (flag.length === 2 && argument.startsWith(flag) && argument.length > flag.length),
    ),
  );
}

function hasShellCommandFlag(args: string[]): boolean {
  return args.some(
    (argument) =>
      /^--command(?:=|$)/u.test(argument) ||
      (/^-[^-]+/u.test(argument) && argument.slice(1).includes("c")),
  );
}

export function resolveDeclaredTaskCheck(command: string): DeclaredTaskCheckResolution {
  let invocation: CommandInvocation;
  try {
    invocation = resolveCommandInvocation(command);
  } catch (error) {
    return { ok: false, reason: error instanceof Error ? error.message : "invalid argv syntax" };
  }
  if (!validExecutable(invocation.command)) {
    return { ok: false, reason: "executable must be a command name or repository-bound path" };
  }
  if (!invocation.args.every((argument) => repositoryBoundArg(argument))) {
    return { ok: false, reason: "arguments must not use absolute paths or parent traversal" };
  }

  const base = executableBase(invocation.command);
  if (BLOCKED_EXECUTABLES.has(base)) {
    return { ok: false, reason: `destructive executable is not allowed: ${base}` };
  }
  if (COMMAND_WRAPPER_EXECUTABLES.has(base)) {
    return { ok: false, reason: `command wrapper or multiplexer is not allowed: ${base}` };
  }
  if (base === "cmd") {
    return { ok: false, reason: "command-shell evaluation is not allowed" };
  }
  if (SHELL_EXECUTABLES.has(base)) {
    if (hasShellCommandFlag(invocation.args)) {
      return { ok: false, reason: "inline shell evaluation is not allowed" };
    }
    const script = firstShellScriptArg(invocation.args);
    if (!script || !repositoryBoundArg(script)) {
      return { ok: false, reason: "a shell check must name a repository-bound script file" };
    }
  }
  if (["powershell", "pwsh"].includes(base)) {
    if (invocation.args.some((argument) => /^-(?:c|command)(?::|=|$)/iu.test(argument))) {
      return { ok: false, reason: "inline PowerShell evaluation is not allowed" };
    }
    const fileFlag = invocation.args.findIndex((argument) => /^-(?:f|file)$/iu.test(argument));
    const script = fileFlag === -1 ? null : (invocation.args[fileFlag + 1] ?? null);
    if (!script || !repositoryBoundArg(script)) {
      return {
        ok: false,
        reason: "a PowerShell check must use -File with a repository-bound script",
      };
    }
  }
  const inlineFlags = INLINE_CODE_FLAGS.get(base);
  if (inlineFlags && hasInlineCodeFlag(invocation.args, inlineFlags)) {
    return { ok: false, reason: `inline code evaluation is not allowed for ${base}` };
  }
  if (base === "git") {
    if (
      invocation.args.some(
        (argument) =>
          argument === "-c" || argument.startsWith("-c=") || argument.startsWith("--config-env"),
      )
    ) {
      return { ok: false, reason: "git configuration overrides are not allowed" };
    }
    const subcommand = gitSubcommand(invocation.args);
    if (!subcommand) return { ok: false, reason: "git check must name a read-only subcommand" };
    if (!GIT_READ_ONLY_SUBCOMMANDS.has(subcommand)) {
      return { ok: false, reason: `git subcommand is not allowlisted as read-only: ${subcommand}` };
    }
  }
  if (
    ["bun", "npm", "pnpm", "yarn"].includes(base) &&
    PACKAGE_MUTATING_SUBCOMMANDS.has((invocation.args[0] ?? "").toLowerCase())
  ) {
    return {
      ok: false,
      reason: `package mutation is not a verification check: ${invocation.args[0]}`,
    };
  }

  if (
    ["agentplane", "ap"].includes(base) &&
    ((invocation.args.length === 1 && invocation.args[0] === "doctor") ||
      (invocation.args.length === 2 &&
        invocation.args[0] === "task" &&
        invocation.args[1] === "lint"))
  ) {
    return {
      ok: true,
      check: {
        executable: process.execPath,
        args: [AGENTPLANE_BIN, ...invocation.args],
        script: null,
      },
    };
  }
  if (base === "bunx") {
    return {
      ok: true,
      check: { executable: "bun", args: ["x", ...invocation.args], script: null },
    };
  }
  return {
    ok: true,
    check: {
      executable: invocation.command,
      args: invocation.args,
      script: packageScript(invocation),
    },
  };
}

export function parseDeclaredTaskCheck(command: string): ParsedDeclaredTaskCheck | null {
  const resolved = resolveDeclaredTaskCheck(command);
  return resolved.ok ? resolved.check : null;
}

export function assertSupportedDeclaredTaskChecks(commands: readonly string[]): void {
  for (const [index, command] of commands.entries()) {
    const resolved = resolveDeclaredTaskCheck(command);
    if (resolved.ok) continue;
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        `Unsupported --verify command ${index + 1}: ${JSON.stringify(command)} (${resolved.reason}). ` +
        "Use one repository-bound argv command without shell operators; invoke the project's test or build tool directly.",
    });
  }
}
