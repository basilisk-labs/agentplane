import { loadConfig, type LoadedConfig } from "@agentplaneorg/core/config";
import { resolveProject, type ResolvedProject } from "@agentplaneorg/core/project";
import { mapCoreError, writeError } from "./error-map.js";
import { exitCodeForError } from "./exit-codes.js";
import { loadDotEnv } from "../shared/env.js";
import { CliError } from "../shared/errors.js";
import type { CommandContext } from "../commands/shared/task-backend.js";
import { resolveCommandContext } from "../runtime/execution-context.js";
import { getVersion } from "../meta/version.js";
import { getApprovalRequirements } from "../commands/shared/approval-requirements.js";
import { parseCommandArgv } from "./spec/parse.js";
import { helpSpec, makeHelpHandler } from "./spec/help.js";
import { usageError } from "./spec/errors.js";
import { suggestOne } from "./spec/suggest.js";
import { findFrameworkCheckout } from "../../bin/runtime-context.js";
import {
  COMMANDS,
  getHelpCommandEntries,
  makeHelpSpecForEntry,
  matchCommandCatalog,
  type HelpSurfaceMode,
} from "./run-cli/command-catalog.js";
import { parseGlobalArgs, resolveOutputMode, runWithOutputMode } from "./run-cli/globals.js";
import { maybeWarnOnUpdate } from "./run-cli/update-warning.js";
import { resolveAgentModeArgv } from "./run-cli/agent-mode.js";
const HELP_TAIL_OPTIONS = new Set(["--compact", "--json", "--all"]);

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
  let jsonErrors = false;
  try {
    const agentMode = resolveAgentModeArgv(argv);
    const parsedGlobals = parseGlobalArgs(agentMode.argv);
    jsonErrors = agentMode.enabled || parsedGlobals.jsonErrorMode;
    if (parsedGlobals.error) {
      throw parsedGlobals.error;
    }

    const { globals, rest } = parsedGlobals;
    if (agentMode.enabled) {
      globals.noUpdateCheck = true;
      globals.jsonErrors = true;
    }
    const outputMode = resolveOutputMode(globals.outputMode);
    jsonErrors = globals.jsonErrors || outputMode === "json";
    const cwd = process.cwd();
    const helpCwd = globals.root ?? cwd;
    const defaultHelpSurface: HelpSurfaceMode = findFrameworkCheckout(helpCwd)
      ? "framework"
      : "user";
    let matched: ReturnType<typeof matchCommandCatalog> | null = null;
    let maybeResolvedProjectPromise: Promise<CliResolvedProject | null> | null = null;
    const getMaybeResolvedProject = async (): Promise<CliResolvedProject | null> => {
      maybeResolvedProjectPromise ??=
        matched?.entry.dispatch.project === false
          ? Promise.resolve(null)
          : maybeResolveProject({ cwd, rootOverride: globals.root });
      return await maybeResolvedProjectPromise;
    };

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

    const makeHelpRegistryEntries = (mode: HelpSurfaceMode) => [
      { spec: helpSpec },
      ...getHelpCommandEntries(mode).map((entry) => ({ spec: makeHelpSpecForEntry(entry) })),
    ];
    const allHelpRegistryEntries = [
      { spec: helpSpec },
      ...COMMANDS.map((entry) => ({ spec: makeHelpSpecForEntry(entry) })),
    ];
    const helpRegistry = {
      list: (opts?: { all?: boolean }) =>
        opts?.all ? allHelpRegistryEntries : makeHelpRegistryEntries(defaultHelpSurface),
      match: (tokens: readonly string[]) => {
        if (tokens[0] === "help") {
          return { spec: helpSpec, consumed: 1 };
        }
        const match = matchCommandCatalog(tokens);
        return match ? { spec: makeHelpSpecForEntry(match.entry), consumed: match.consumed } : null;
      },
    };
    const runHelp = makeHelpHandler(helpRegistry);

    let projectPromise: Promise<ResolvedProject> | null = null;
    const getResolvedProject = async (commandForErrorContext: string): Promise<ResolvedProject> => {
      projectPromise ??= (async () => {
        const resolved = await getMaybeResolvedProject();
        return resolved ?? (await resolveProject({ cwd, rootOverride: globals.root ?? null }));
      })();
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

    let ctxPromise: Promise<CommandContext> | null = null;
    const getCtx = async (commandForErrorContext: string): Promise<CommandContext> => {
      ctxPromise ??= (async () => {
        const resolvedProject = await getResolvedProject(commandForErrorContext);
        const loadedConfig = await getLoadedConfig(commandForErrorContext);
        return await resolveCommandContext({
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
      if (matched?.entry.dispatch.taskContext === false) {
        throw new CliError({
          exitCode: exitCodeForError("E_INTERNAL"),
          code: "E_INTERNAL",
          message: `Internal error: command does not require task context but attempted to load it: ${commandForErrorContext}`,
        });
      }
      return await getCtx(commandForErrorContext);
    };

    const buildRuntimeRegistry = async () => {
      const { buildRegistry } = await import("./run-cli/registry.run.js");
      return buildRegistry({
        getCtx: getCtxOrThrow,
        getResolvedProject,
        getLoadedConfig,
      });
    };
    let runtimeRegistryPromise: ReturnType<typeof buildRuntimeRegistry> | null = null;
    const getRuntimeRegistry = async () => {
      runtimeRegistryPromise ??= buildRuntimeRegistry();
      return await runtimeRegistryPromise;
    };

    const runFastHelp = async (helpArgv: string[]): Promise<number> => {
      if (helpArgv[0] !== "help") {
        throw new CliError({
          exitCode: exitCodeForError("E_INTERNAL"),
          code: "E_INTERNAL",
          message: "Internal error: fast help must be invoked through helpSpec",
        });
      }
      const parsed = parseCommandArgv(helpSpec, helpArgv.slice(1)).parsed;
      return await runWithOutputMode({
        mode: outputMode,
        command: helpSpec.id.join(" "),
        run: async () => await runHelp({ cwd, rootOverride: globals.root }, parsed),
      });
    };

    // `--help` is treated as an alias for `help` and supports per-command help:
    // - agentplane --help
    // - agentplane <cmd...> --help [--compact|--json]
    if (globals.help) {
      if (rest[0] === "help") {
        return await runFastHelp(rest);
      }

      const matchedHelp = helpRegistry.match(rest);
      if (matchedHelp) {
        const rawHelpTail = rest.slice(matchedHelp.consumed);
        const commandFlags = new Set<string>();
        for (const opt of matchedHelp.spec.options ?? []) {
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
        return await runFastHelp(["help", ...matchedHelp.spec.id, ...helpTail]);
      }
      return await runFastHelp(["help", ...rest]);
    }
    if (rest.length === 0) {
      return await runFastHelp(["help"]);
    }

    // `agentplane help ...` stays on the fast path and does not require project resolution.
    if (rest[0] === "help") {
      return await runFastHelp(rest);
    }

    matched = matchCommandCatalog(rest);
    const resolved = await getMaybeResolvedProject();
    const matchedDispatch = matched?.entry.dispatch ?? null;
    const commandNeedsLoadedConfig = matchedDispatch?.loadedConfig === true;

    // `require_network=true` means "no network without explicit approval".
    // Update-check is optional and should only cross the loaded-config boundary
    // when the matched command will cross it anyway.
    let skipUpdateCheckForPolicy = true;
    if (resolved && commandNeedsLoadedConfig && !globals.noUpdateCheck) {
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
      skip: globals.noUpdateCheck || skipUpdateCheckForPolicy || !commandNeedsLoadedConfig,
      jsonErrors,
    });

    const registry = await getRuntimeRegistry();

    if (matched) {
      const runtimeEntry = registry.lookup(matched.entry.spec.id);
      if (!runtimeEntry) {
        throw new CliError({
          exitCode: exitCodeForError("E_INTERNAL"),
          code: "E_INTERNAL",
          message: `Internal error: runtime registry missing command: ${matched.entry.spec.id.join(" ")}`,
        });
      }
      const tail = rest.slice(matched.consumed);
      const parsed = parseCommandArgv(runtimeEntry.spec, tail).parsed;
      return await runWithOutputMode({
        mode: outputMode,
        command: runtimeEntry.spec.id.join(" "),
        run: async () => await runtimeEntry.handler({ cwd, rootOverride: globals.root }, parsed),
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
