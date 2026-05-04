const AGENT_MODE_ENV = "AGENTPLANE_AGENT_MODE";
const CLI_ALIAS_ENV = "AGENTPLANE_CLI_ALIAS";

const HELP_FLAGS = new Set(["--help", "-h"]);
const HELP_MODE_FLAGS = new Set(["--compact", "--json"]);

export type AgentModeResolution = {
  argv: string[];
  enabled: boolean;
  alias: string | null;
};

function envFlagEnabled(name: string): boolean {
  const raw = process.env[name]?.trim().toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes";
}

function hasAny(tokens: readonly string[], flags: ReadonlySet<string>): boolean {
  return tokens.some((token) => flags.has(token));
}

function hasOption(tokens: readonly string[], option: string): boolean {
  const optionPrefix = `${option}=`;
  return tokens.some((token) => token === option || token.startsWith(optionPrefix));
}

function withDefaultOption(tokens: string[], option: string, value?: string): string[] {
  if (hasOption(tokens, option)) return tokens;
  return value === undefined ? [...tokens, option] : [...tokens, option, value];
}

function compactHelpByDefault(argv: string[]): string[] {
  if (hasAny(argv, HELP_MODE_FLAGS)) return argv;
  if (argv[0] === "help") return [...argv, "--compact"];
  if (hasAny(argv, HELP_FLAGS)) return [...argv, "--compact"];
  return argv;
}

function expandAgentShorthand(argv: string[]): string[] {
  const [command, ...tail] = argv;
  switch (command) {
    case undefined: {
      return ["help", "--compact"];
    }
    case "tasks": {
      return ["task", "next", "--quiet", ...tail];
    }
    case "next": {
      return [
        "task",
        "next",
        ...withDefaultOption(withDefaultOption(tail, "--limit", "1"), "--quiet"),
      ];
    }
    case "show": {
      return ["task", "show", ...tail];
    }
    case "vshow": {
      return ["task", "verify-show", ...withDefaultOption(tail, "--quiet")];
    }
    default: {
      return argv;
    }
  }
}

export function resolveAgentModeArgv(argv: readonly string[]): AgentModeResolution {
  const alias = process.env[CLI_ALIAS_ENV]?.trim() ?? null;
  const enabled = envFlagEnabled(AGENT_MODE_ENV) || alias === "ap";
  if (!enabled) return { argv: [...argv], enabled: false, alias };

  process.env.AGENTPLANE_PROMPTS ??= "plain";
  process.env.AGENTPLANE_NO_UPDATE_CHECK ??= "1";

  const expanded = expandAgentShorthand([...argv]);
  return { argv: compactHelpByDefault(expanded), enabled: true, alias };
}
