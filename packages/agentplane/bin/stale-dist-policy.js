function normalizeArgs(argv) {
  return argv
    .slice(2)
    .map((value) => String(value ?? "").trim())
    .filter(Boolean);
}

function isHelpOrVersionCommand(args) {
  return (
    args.length === 0 ||
    args[0] === "--help" ||
    args[0] === "-h" ||
    args[0] === "--version" ||
    args[0] === "-v" ||
    args[0] === "help"
  );
}

function isConfigInspectionCommand(args) {
  return args[0] === "config" && args[1] === "show";
}

function isTaskInspectionCommand(args) {
  return args[0] === "task" && ["list", "show", "verify-show"].includes(args[1] ?? "");
}

function isRoleOrQuickstartCommand(args) {
  return args[0] === "quickstart" || args[0] === "role";
}

export function classifyStaleDistPolicy(argv = process.argv) {
  const args = normalizeArgs(argv);
  if (
    args[0] === "doctor" ||
    (args[0] === "runtime" && args[1] === "explain") ||
    isHelpOrVersionCommand(args) ||
    isRoleOrQuickstartCommand(args) ||
    isConfigInspectionCommand(args) ||
    isTaskInspectionCommand(args)
  ) {
    return { mode: "warn_and_run", reason: "read_only_diagnostic" };
  }
  return { mode: "strict", reason: "default" };
}
