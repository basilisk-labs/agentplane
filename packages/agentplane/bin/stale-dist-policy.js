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

function isPreflightCommand(args) {
  return args[0] === "preflight";
}

function isTaskArtifactMutationCommand(args) {
  if (args[0] === "verify") return true;
  if (args[0] === "finish") return true;
  if (args[0] !== "task") return false;
  if (args[1] === "doc" && args[2] === "set") return true;
  if (args[1] === "plan" && ["set", "approve", "reject"].includes(args[2] ?? "")) return true;
  if (args[1] === "start-ready") return true;
  return args[1] === "verify" && ["ok", "rework"].includes(args[2] ?? "");
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
    isReadyInspectionCommand(args) ||
    isPreflightCommand(args)
  ) {
    return { mode: "warn_and_run", reason: "read_only_diagnostic" };
  }
  if (isTaskArtifactMutationCommand(args)) {
    return { mode: "warn_and_run", reason: "task_artifact_mutation" };
  }
  return { mode: "strict", reason: "default" };
}
