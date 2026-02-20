import { existsSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

function firstAvailable(candidates) {
  for (const candidate of candidates) {
    const result = spawnSync(candidate, ["-version"], { stdio: "ignore" });
    if (result.status === 0) return candidate;
  }
  return null;
}

const explicit = process.env.ACTIONLINT_BIN;
const fallback = path.join(homedir(), "go", "bin", "actionlint");
const candidates = explicit ? [explicit, "actionlint", fallback] : ["actionlint", fallback];
const binary = firstAvailable(
  candidates.filter(
    (candidate) => candidate && (candidate === "actionlint" || existsSync(candidate)),
  ),
);

if (!binary) {
  throw new Error(
    [
      "actionlint binary was not found.",
      "Install it in user space and rerun checks:",
      "  go install github.com/rhysd/actionlint/cmd/actionlint@latest",
      "Or set ACTIONLINT_BIN to the binary path.",
      "",
    ].join("\n"),
  );
}

const lint = spawnSync(binary, [], { stdio: "inherit" });
if (lint.status !== 0) {
  process.exitCode = lint.status ?? 1;
}
