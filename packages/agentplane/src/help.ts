export function renderHelp(): string {
  return [
    "agentplane (v1 prototype)",
    "",
    "Usage:",
    "  agentplane [--root <path>] [--json] <namespace> <command> [options]",
    "  agentplane [--root <path>] [--json] <command> [options]",
    "",
    "Core namespaces (implemented in this prototype): config",
    "Core namespaces (planned): task, mode, ide, backend, recipe",
    "",
    "Flags:",
    "  --help, -h     Show help",
    "  --version      Show version",
    "  --root <path>  Treat <path> as project root",
    "",
    "Config commands:",
    "  agentplane config show",
    "  agentplane config set <key> <value>",
    "",
  ].join("\n");
}
