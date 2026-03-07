function normalizeArgs(argv) {
  return argv
    .slice(2)
    .map((value) => String(value ?? "").trim())
    .filter(Boolean);
}

export function classifyStaleDistPolicy(argv = process.argv) {
  const args = normalizeArgs(argv);
  if (args[0] === "doctor") {
    return { mode: "warn_and_run", reason: "read_only_diagnostic" };
  }
  if (args[0] === "runtime" && args[1] === "explain") {
    return { mode: "warn_and_run", reason: "read_only_diagnostic" };
  }
  return { mode: "strict", reason: "default" };
}
