import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  realpathSync,
  symlinkSync,
} from "node:fs";
import path from "node:path";
import { resolveExistingSeedRealPath } from "./agent-efficiency-dependency-manifest.mjs";

function inside(root, candidate) {
  const relative = path.relative(root, candidate);
  return (
    relative === "" ||
    (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative))
  );
}

/** Link external dependencies only. Workspace links always point into the anchored checkout. */
export function linkReplayDependencies(sourceRoot, checkout) {
  const modules = realpathSync(path.join(sourceRoot, "node_modules"));
  const workspaces = new Map();
  const packages = path.join(sourceRoot, "packages");
  for (const entry of readdirSync(packages, { withFileTypes: true })) {
    const relative = path.join("packages", entry.name);
    const manifest = path.join(sourceRoot, relative, "package.json");
    if (!entry.isDirectory() || !existsSync(manifest)) continue;
    const anchoredManifest = path.join(checkout, relative, "package.json");
    if (!readFileSync(manifest).equals(readFileSync(anchoredManifest)))
      throw new Error(`Workspace manifest differs from the anchor: ${relative}`);
    workspaces.set(realpathSync(path.join(sourceRoot, relative)), { relative });
  }
  const mappings = [];
  for (const relative of ["", ...[...workspaces.values()].map((workspace) => workspace.relative)]) {
    const sourceModules = path.join(sourceRoot, relative, "node_modules");
    if (!existsSync(sourceModules)) continue;
    const targetModules = path.join(checkout, relative, "node_modules");
    mkdirSync(targetModules, { recursive: true });
    const names = readdirSync(sourceModules)
      .filter((name) => !name.startsWith("."))
      .flatMap((name) =>
        name.startsWith("@")
          ? readdirSync(path.join(sourceModules, name)).map((child) => `${name}/${child}`)
          : [name],
      );
    for (const name of names.toSorted()) {
      const link = path.join(targetModules, name);
      const resolved = resolveExistingSeedRealPath({ path: path.join(sourceModules, name) });
      if (resolved === null) {
        mappings.push({ path: path.relative(checkout, link), workspace: null, unavailable: true });
        continue;
      }
      const workspace = workspaces.get(resolved);
      if (!workspace && !inside(modules, resolved))
        throw new Error(`Replay dependency escapes node_modules: ${name}`);
      const target = workspace ? path.join(checkout, workspace.relative) : resolved;
      mkdirSync(path.dirname(link), { recursive: true });
      symlinkSync(target, link, "junction");
      mappings.push({
        path: path.relative(checkout, link),
        workspace: workspace?.relative ?? null,
      });
    }
  }
  return { modules, mappings };
}

/** A runner or suite failure must remain visible even when no assertions ran. */
export function summarizeReplayReport(report, runnerFailure = null) {
  const suites = report?.testResults ?? [];
  const assertions = suites.flatMap((suite) => suite.assertionResults ?? []);
  const failedAssertion = assertions.find((assertion) => assertion.status === "failed");
  const failedSuite = suites.find((suite) => suite.status === "failed");
  const total = report?.numTotalTests ?? 0;
  const consistentCounts =
    assertions.length === total &&
    assertions.filter((assertion) => assertion.status === "passed").length ===
      (report?.numPassedTests ?? 0) &&
    assertions.filter((assertion) => assertion.status === "failed").length ===
      (report?.numFailedTests ?? 0);
  const success =
    !runnerFailure &&
    report?.success === true &&
    total > 0 &&
    consistentCounts &&
    report.numPassedTests === total &&
    !failedSuite &&
    (report.numFailedTests ?? 0) === 0 &&
    (report.numFailedTestSuites ?? 0) === 0;
  let firstFailure = failedAssertion?.fullName ?? failedSuite?.name ?? null;
  if (!success && firstFailure === null) {
    if (runnerFailure) firstFailure = "runner_failure";
    else if (report === null) firstFailure = "missing_report";
    else if (total === 0) firstFailure = "no_tests";
    else if (consistentCounts && report.numPassedTests < total)
      firstFailure = "incomplete_execution";
    else firstFailure = "inconsistent_report";
  }
  return {
    success,
    tests: { passed: report?.numPassedTests ?? 0, failed: report?.numFailedTests ?? 0, total },
    first_failure: firstFailure,
    failure_details:
      failedAssertion?.failureMessages ??
      (failedSuite?.message ? [failedSuite.message] : runnerFailure ? [runnerFailure] : []),
  };
}
