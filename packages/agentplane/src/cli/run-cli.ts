import {
  loadConfig,
  resolveProject,
  type LoadedConfig,
  type ResolvedProject,
} from "@agentplaneorg/core";
import { mapCoreError } from "./error-map.js";
import { exitCodeForError } from "./exit-codes.js";
import { loadDotEnv } from "../shared/env.js";
import { CliError } from "../shared/errors.js";
import type { CommandContext } from "../commands/shared/task-backend.js";
import { resolveContext } from "../usecases/context/resolve-context.js";
import { getVersion } from "../meta/version.js";
import { getApprovalRequirements } from "../commands/shared/approval-requirements.js";
import { parseCommandArgv } from "./spec/parse.js";
import { helpSpec } from "./spec/help.js";
import { usageError } from "./spec/errors.js";
import { suggestOne } from "./spec/suggest.js";
import { matchCommandCatalog } from "./run-cli/catalog.js";
import {
  prescanJsonErrors,
  parseGlobalArgs,
  resolveOutputMode,
  runWithOutputMode,
} from "./run-cli/globals.js";
import { writeError } from "./run-cli/error-guidance.js";
import { maybeWarnOnUpdate } from "./run-cli/update-warning.js";
const HELP_TAIL_OPTIONS = new Set(["--compact", "--json"]);

type CliResolvedProject = Awaited<ReturnType<typeof resolveProject>>;

async function maybeResolveProject(opts: {
  cwd: string;
  rootOverride?: string;
}): Promise<CliResolvedProject | null> {
  try {
    return await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
  } catch (err) {
    if (
      err instanceof Error &&
      (err.message.startsWith("Not an agentplane project") ||
        err.message.startsWith("Not a git repository") ||
        err.message.startsWith("Agentplane project root is not a git repository"))
    ) {
      return null;
    }
    throw err;
  }
}

export async function runCli(argv: string[]): Promise<number> {
  let jsonErrors = prescanJsonErrors(argv);
  try {
    const { globals, rest } = parseGlobalArgs(argv);
    const outputMode = resolveOutputMode(globals.outputMode);
    jsonErrors = globals.jsonErrors || outputMode === "json";

    if (globals.version) {
      return await runWithOutputMode({
        mode: outputMode,
        command: "version",
        run: () => {
          process.stdout.write(`${getVersion()}\n`);
          return Promise.resolve(0);
        },
      });
    }

    const runCli2HelpFast = async (helpArgv: string[]): Promise<number> => {
      const { buildRegistry } = await import("./run-cli/registry.run.js");
      const reject =
        (name: string) =>
        (_cmd: string): Promise<never> =>
          Promise.reject(new Error(`${name} should not be called for help`));
      const registry = buildRegistry({
        getCtx: reject("getCtx"),
        getResolvedProject: reject("getResolvedProject"),
        getLoadedConfig: reject("getLoadedConfig"),
      });

      const match = registry.match(helpArgv);
      if (!match) {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message: "Unknown command: help",
        });
      }
      const tail = helpArgv.slice(match.consumed);
      const parsed = parseCommandArgv(match.spec, tail).parsed;
      return await runWithOutputMode({
        mode: outputMode,
        command: match.spec.id.join(" "),
        run: async () => {
          return await match.handler({ cwd: process.cwd(), rootOverride: globals.root }, parsed);
        },
      });
    };

    // `--help` is treated as an alias for `help` and supports per-command help:
    // - agentplane --help
    // - agentplane <cmd...> --help [--compact|--json]
    if (globals.help) {
      const matchedHelp = matchCommandCatalog(rest);
      if (matchedHelp) {
        const rawHelpTail = rest.slice(matchedHelp.consumed);
        const commandFlags = new Set<string>();
        for (const opt of matchedHelp.entry.spec.options ?? []) {
          const optRecord = opt as Record<string, unknown>;
          const long = typeof optRecord.name === "string" ? optRecord.name.trim() : "";
          if (long) commandFlags.add(`--${long}`);
          const short = typeof optRecord.alias === "string" ? optRecord.alias.trim() : "";
          if (short) commandFlags.add(`-${short}`);
        }
        const invalidHelpTail = rawHelpTail.filter(
          (token) =>
            token.startsWith("-") && !HELP_TAIL_OPTIONS.has(token) && !commandFlags.has(token),
        );
        if (invalidHelpTail.length > 0) {
          throw usageError({
            spec: helpSpec,
            command: "help",
            message: `Unsupported flag(s) after --help: ${invalidHelpTail.join(", ")}.`,
          });
        }
        const helpTail = rawHelpTail.filter(
          (token) => token.startsWith("-") && HELP_TAIL_OPTIONS.has(token),
        );
        return await runCli2HelpFast(["help", ...matchedHelp.entry.spec.id, ...helpTail]);
      }
      return await runCli2HelpFast(["help", ...rest]);
    }
    if (rest.length === 0) {
      return await runCli2HelpFast(["help"]);
    }

    // cli2: `agentplane help ...` should be fast and not require project resolution.
    if (rest[0] === "help") {
      return await runCli2HelpFast(rest);
    }

    const matched = matchCommandCatalog(rest);

    const cwd = process.cwd();
    const resolved =
      matched?.entry.needsProject === false
        ? null
        : await maybeResolveProject({ cwd, rootOverride: globals.root });

    let projectPromise: Promise<ResolvedProject> | null = resolved
      ? Promise.resolve(resolved)
      : null;
    const getResolvedProject = async (commandForErrorContext: string): Promise<ResolvedProject> => {
      projectPromise ??= resolveProject({ cwd, rootOverride: globals.root ?? null });
      try {
        return await projectPromise;
      } catch (err) {
        throw mapCoreError(err, { command: commandForErrorContext, root: globals.root ?? null });
      }
    };

    let configPromise: Promise<LoadedConfig> | null = null;
    const getLoadedConfig = async (commandForErrorContext: string): Promise<LoadedConfig> => {
      configPromise ??= (async () => {
        const project = await getResolvedProject(commandForErrorContext);
        await loadDotEnv(project.gitRoot);
        return await loadConfig(project.agentplaneDir);
      })();
      try {
        return await configPromise;
      } catch (err) {
        throw mapCoreError(err, { command: commandForErrorContext, root: globals.root ?? null });
      }
    };

    // `require_network=true` means "no network without explicit approval".
    // Update-check is an optional network call, so it must be gated after config load.
    let skipUpdateCheckForPolicy = true;
    if (resolved && matched?.entry.needsConfig !== false) {
      try {
        const loaded = await getLoadedConfig("update-check");
        const requireNetwork = getApprovalRequirements({
          config: loaded.config,
          action: "network_access",
        }).required;
        const explicitlyApproved = globals.allowNetwork;
        skipUpdateCheckForPolicy = requireNetwork && !explicitlyApproved;
      } catch {
        // Conservative: if we can't load config, we can't prove network is allowed.
        skipUpdateCheckForPolicy = true;
      }
    }
    await maybeWarnOnUpdate({
      currentVersion: getVersion(),
      skip:
        globals.noUpdateCheck || skipUpdateCheckForPolicy || matched?.entry.needsConfig === false,
      jsonErrors,
    });

    let ctxPromise: Promise<CommandContext> | null = null;
    const getCtx = async (commandForErrorContext: string): Promise<CommandContext> => {
      ctxPromise ??= (async () => {
        const resolvedProject = await getResolvedProject(commandForErrorContext);
        const loadedConfig = await getLoadedConfig(commandForErrorContext);
        return await resolveContext({
          cwd,
          rootOverride: globals.root ?? null,
          resolvedProject,
          config: loadedConfig.config,
        });
      })();
      try {
        return await ctxPromise;
      } catch (err) {
        throw mapCoreError(err, { command: commandForErrorContext, root: globals.root ?? null });
      }
    };
    const getCtxOrThrow = async (commandForErrorContext: string): Promise<CommandContext> => {
      if (matched?.entry.needsTaskContext === false) {
        throw new CliError({
          exitCode: exitCodeForError("E_INTERNAL"),
          code: "E_INTERNAL",
          message: `Internal error: command does not require task context but attempted to load it: ${commandForErrorContext}`,
        });
      }
      return await getCtx(commandForErrorContext);
    };

    // cli2 command routing (single router).
    const { buildRegistry } = await import("./run-cli/registry.run.js");
    const registry = buildRegistry({
      getCtx: getCtxOrThrow,
      getResolvedProject,
      getLoadedConfig,
    });

    const match = registry.match(rest);
    if (match) {
      const tail = rest.slice(match.consumed);
      const parsed = parseCommandArgv(match.spec, tail).parsed;
      return await runWithOutputMode({
        mode: outputMode,
        command: match.spec.id.join(" "),
        run: async () => await match.handler({ cwd, rootOverride: globals.root }, parsed),
      });
    }

    const input = rest.join(" ");
    const fullCandidates = registry.list().map((e) => e.spec.id.join(" "));
    const suggestion = suggestOne(input, fullCandidates);
    const suffix = suggestion ? ` Did you mean: ${suggestion}?` : "";
    throw usageError({
      spec: helpSpec,
      command: "help",
      message: `Unknown command: ${input}.${suffix}`,
    });
  } catch (err) {
    if (err instanceof CliError) {
      writeError(err, jsonErrors);
      return err.exitCode;
    }

    const message = err instanceof Error ? err.message : String(err);
    const wrapped = new CliError({
      exitCode: exitCodeForError("E_INTERNAL"),
      code: "E_INTERNAL",
      message,
    });
    writeError(wrapped, jsonErrors);
    return wrapped.exitCode;
  }
}
