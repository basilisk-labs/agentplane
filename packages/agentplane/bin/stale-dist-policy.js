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
  if (args[0] !== "task") return false;
  if (["list", "show", "verify-show", "next", "search"].includes(args[1] ?? "")) return true;
  return args[1] === "doc" && args[2] === "show";
}

function isRoleOrQuickstartCommand(args) {
  return args[0] === "quickstart" || args[0] === "role";
}

function isReadyInspectionCommand(args) {
  return args[0] === "ready";
}

export function classifyStaleDistPolicy(argv = process.argv) {
  const args = normalizeArgs(argv);
  if (
    args[0] === "doctor" ||
    (args[0] === "runtime" && args[1] === "explain") ||
    isHelpOrVersionCommand(args) ||
    isRoleOrQuickstartCommand(args) ||
    isConfigInspectionCommand(args) ||
    isTaskInspectionCommand(args) ||
    isReadyInspectionCommand(args)
  ) {
    return { mode: "warn_and_run", reason: "read_only_diagnostic" };
  }
  return { mode: "strict", reason: "default" };
}
