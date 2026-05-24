import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SCRIPT_NAME = "hotspot-report.mjs";
const DEFAULT_WARNING_LINES = 400;
const DEFAULT_OVERSIZED_LINES = 500;
const DEFAULT_CHECK_OVERSIZED_LINES = 600;
const DEFAULT_TEST_WARNING_LINES = 1000;
const DEFAULT_CHECK_TEST_OVERSIZED_LINES = 1300;
const DEFAULT_ALLOWED_OVERSIZED_TESTS = [
  "packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts",
  "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts",
];
const INCLUDED_EXTENSIONS = new Set([".ts", ".tsx"]);
const EXCLUDED_SUFFIXES = [".d.ts", ".test.ts", ".test.tsx", ".spec.ts", ".spec.tsx"];
const EXCLUDED_DIR_NAMES = new Set(["__fixtures__", "__snapshots__", "fixtures"]);
const TEST_FILE_RE = /\.(?:test|spec)\.(?:ts|tsx)$/;

const scriptPath = fileURLToPath(import.meta.url);
const scriptsDir = path.dirname(scriptPath);
const repoRoot = path.resolve(scriptsDir, "../..");
const defaultRuntimeDir = path.join(repoRoot, "packages", "agentplane", "src");
const defaultTestDir = path.join(repoRoot, "packages");

const STDOUT_WRITE_RE = /process\.stdout\.write\s*\(/g;
const STDERR_WRITE_RE = /process\.stderr\.write\s*\(/g;
const BACKEND_IS_LOCAL_HELPER_RE = /backendIsLocalFileBackend\s*\(/g;
const BACKEND_ID_LOCAL_COMPARE_RE = /\b(?:opts\.ctx\.|ctx\.)?backendId\b\s*(?:===|!==)\s*"local"/g;
const BACKEND_ID_REDMINE_COMPARE_RE =
  /\b(?:opts\.ctx\.|ctx\.)?backendId\b\s*(?:===|!==)\s*"redmine"/g;

function printHelp() {
  process.stdout.write(
    [
      `Usage: node scripts/${SCRIPT_NAME} [options]`,
      "",
      "Report current hotspot counts for:",
      "  - direct stdio writes in runtime code",
      "  - backend-type branches in runtime code",
      "  - oversized runtime modules by line count",
      "",
      "Options:",
      "  --root <path>             Repository root to scan. Defaults to this checkout.",
      "  --runtime-dir <path>      Runtime directory to scan. Defaults to packages/agentplane/src.",
      "  --test-dir <path>         Test directory to scan. Defaults to packages.",
      `  --warning-lines <n>       Runtime warning threshold. Default: ${DEFAULT_WARNING_LINES}.`,
      `  --oversized-lines <n>     Line threshold for oversized modules. Default: ${DEFAULT_OVERSIZED_LINES}.`,
      `  --test-warning-lines <n>  Test-file warning threshold. Default: ${DEFAULT_TEST_WARNING_LINES}.`,
      `  --oversized-test-lines <n> Line threshold for oversized test files. Default: ${DEFAULT_TEST_WARNING_LINES}.`,
      `  --check                   Fail when non-allowlisted modules exceed the line threshold. Uses ${DEFAULT_CHECK_OVERSIZED_LINES} lines when --oversized-lines is omitted.`,
      "  --allow-oversized <path>  Repeatable git-path allowlist entry for --check.",
      "  --allow-oversized-test <path> Repeatable git-path allowlist entry for oversized tests.",
      "  --help                    Show this help text.",
      "",
      "Output:",
      "  Pretty JSON payload with filters, totals, and per-file breakdowns.",
      "",
    ].join("\n"),
  );
}

function parsePositiveInt(flag, raw, min = 1) {
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isInteger(parsed) || parsed < min) {
    throw new Error(`Invalid value for ${flag}: ${raw} (expected integer >= ${min})`);
  }
  return parsed;
}

export function parseArgs(argv) {
  let root = repoRoot;
  let runtimeDir = defaultRuntimeDir;
  let testDir = defaultTestDir;
  let warningLines = DEFAULT_WARNING_LINES;
  let oversizedLines = DEFAULT_OVERSIZED_LINES;
  let testWarningLines = DEFAULT_TEST_WARNING_LINES;
  let oversizedTestLines = DEFAULT_TEST_WARNING_LINES;
  let warningLinesProvided = false;
  let testWarningLinesProvided = false;
  let oversizedLinesProvided = false;
  let oversizedTestLinesProvided = false;
  let check = false;
  const allowedOversized = [];
  const allowedOversizedTests = [...DEFAULT_ALLOWED_OVERSIZED_TESTS];

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    switch (arg) {
      case "--help":
      case "-h": {
        return { help: true };
      }
      case "--root": {
        const next = argv[i + 1];
        if (!next) throw new Error("Missing value after --root");
        root = path.resolve(next);
        runtimeDir = path.join(root, "packages", "agentplane", "src");
        testDir = path.join(root, "packages");
        i++;
        break;
      }
      case "--runtime-dir": {
        const next = argv[i + 1];
        if (!next) throw new Error("Missing value after --runtime-dir");
        runtimeDir = path.isAbsolute(next) ? path.resolve(next) : path.resolve(root, next);
        i++;
        break;
      }
      case "--test-dir": {
        const next = argv[i + 1];
        if (!next) throw new Error("Missing value after --test-dir");
        testDir = path.isAbsolute(next) ? path.resolve(next) : path.resolve(root, next);
        i++;
        break;
      }
      case "--warning-lines": {
        const next = argv[i + 1];
        if (!next) throw new Error("Missing value after --warning-lines");
        warningLines = parsePositiveInt("--warning-lines", next);
        warningLinesProvided = true;
        i++;
        break;
      }
      case "--oversized-lines": {
        const next = argv[i + 1];
        if (!next) throw new Error("Missing value after --oversized-lines");
        oversizedLines = parsePositiveInt("--oversized-lines", next);
        oversizedLinesProvided = true;
        i++;
        break;
      }
      case "--test-warning-lines": {
        const next = argv[i + 1];
        if (!next) throw new Error("Missing value after --test-warning-lines");
        testWarningLines = parsePositiveInt("--test-warning-lines", next);
        testWarningLinesProvided = true;
        i++;
        break;
      }
      case "--oversized-test-lines": {
        const next = argv[i + 1];
        if (!next) throw new Error("Missing value after --oversized-test-lines");
        oversizedTestLines = parsePositiveInt("--oversized-test-lines", next);
        oversizedTestLinesProvided = true;
        i++;
        break;
      }
      case "--check": {
        check = true;
        break;
      }
      case "--allow-oversized": {
        const next = argv[i + 1];
        if (!next) throw new Error("Missing value after --allow-oversized");
        allowedOversized.push(next.split(path.sep).join("/"));
        i++;
        break;
      }
      case "--allow-oversized-test": {
        const next = argv[i + 1];
        if (!next) throw new Error("Missing value after --allow-oversized-test");
        allowedOversizedTests.push(next.split(path.sep).join("/"));
        i++;
        break;
      }
      default: {
        throw new Error(`Unknown argument: ${arg}`);
      }
    }
  }

  const effectiveOversizedLines =
    check && !oversizedLinesProvided ? DEFAULT_CHECK_OVERSIZED_LINES : oversizedLines;
  const effectiveOversizedTestLines =
    check && !oversizedTestLinesProvided ? DEFAULT_CHECK_TEST_OVERSIZED_LINES : oversizedTestLines;

  if (!warningLinesProvided && warningLines >= effectiveOversizedLines) {
    warningLines = Math.max(1, effectiveOversizedLines - 1);
  } else if (warningLines >= effectiveOversizedLines) {
    throw new Error(
      `--warning-lines (${warningLines}) must be lower than --oversized-lines (${effectiveOversizedLines})`,
    );
  }
  if (!testWarningLinesProvided && testWarningLines >= effectiveOversizedTestLines) {
    testWarningLines = Math.max(1, effectiveOversizedTestLines - 1);
  } else if (testWarningLines >= effectiveOversizedTestLines) {
    throw new Error(
      `--test-warning-lines (${testWarningLines}) must be lower than --oversized-test-lines (${effectiveOversizedTestLines})`,
    );
  }

  return {
    help: false,
    root,
    runtimeDir,
    testDir,
    warningLines,
    oversizedLines: effectiveOversizedLines,
    testWarningLines,
    oversizedTestLines: effectiveOversizedTestLines,
    check,
    allowedOversized,
    allowedOversizedTests: [...new Set(allowedOversizedTests)],
  };
}

function normalizeRelative(root, target) {
  return path.relative(root, target).split(path.sep).join("/");
}

function isRuntimeSourceFile(fileName) {
  if (!INCLUDED_EXTENSIONS.has(path.extname(fileName))) return false;
  return !EXCLUDED_SUFFIXES.some((suffix) => fileName.endsWith(suffix));
}

function isTestSourceFile(fileName) {
  if (!INCLUDED_EXTENSIONS.has(path.extname(fileName))) return false;
  return TEST_FILE_RE.test(fileName);
}

function listFiles(rootDir, shouldIncludeFile) {
  const files = [];

  function walk(dir) {
    const entries = readdirSync(dir, { withFileTypes: true }).toSorted((left, right) =>
      left.name.localeCompare(right.name),
    );
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!EXCLUDED_DIR_NAMES.has(entry.name)) {
          walk(path.join(dir, entry.name));
        }
        continue;
      }
      if (!entry.isFile()) continue;
      if (!shouldIncludeFile(entry.name)) continue;
      files.push(path.join(dir, entry.name));
    }
  }

  walk(rootDir);
  return files;
}

function countMatches(source, regex) {
  return [...source.matchAll(regex)].length;
}

function compareByCountThenPath(left, right) {
  if (right.total !== left.total) return right.total - left.total;
  return left.file.localeCompare(right.file);
}

export function collectHotspotReport(opts) {
  if (!existsSync(opts.root)) {
    throw new Error(`Repository root is missing: ${opts.root}`);
  }
  if (!existsSync(opts.runtimeDir)) {
    throw new Error(`Runtime directory is missing: ${opts.runtimeDir}`);
  }
  const runtimeFiles = listFiles(opts.runtimeDir, isRuntimeSourceFile);
  const testFiles = existsSync(opts.testDir) ? listFiles(opts.testDir, isTestSourceFile) : [];
  let stdoutWrites = 0;
  let stderrWrites = 0;
  let backendHelperBranches = 0;
  let backendLocalBranches = 0;
  let backendRedmineBranches = 0;
  const directStdioFiles = [];
  const backendBranchFiles = [];
  const runtimeWarningModules = [];
  const oversizedRuntimeModules = [];
  const testWarningModules = [];
  const oversizedTestModules = [];

  for (const filePath of runtimeFiles) {
    const source = readFileSync(filePath, "utf8");
    const file = normalizeRelative(opts.root, filePath);

    const fileStdoutWrites = countMatches(source, STDOUT_WRITE_RE);
    const fileStderrWrites = countMatches(source, STDERR_WRITE_RE);
    const fileDirectWrites = fileStdoutWrites + fileStderrWrites;
    if (fileDirectWrites > 0) {
      directStdioFiles.push({
        file,
        stdout_writes: fileStdoutWrites,
        stderr_writes: fileStderrWrites,
        total: fileDirectWrites,
      });
    }
    stdoutWrites += fileStdoutWrites;
    stderrWrites += fileStderrWrites;

    const fileBackendHelperBranches = countMatches(source, BACKEND_IS_LOCAL_HELPER_RE);
    const fileBackendLocalBranches = countMatches(source, BACKEND_ID_LOCAL_COMPARE_RE);
    const fileBackendRedmineBranches = countMatches(source, BACKEND_ID_REDMINE_COMPARE_RE);
    const fileBackendBranches =
      fileBackendHelperBranches + fileBackendLocalBranches + fileBackendRedmineBranches;
    if (fileBackendBranches > 0) {
      backendBranchFiles.push({
        file,
        backend_is_local_helper: fileBackendHelperBranches,
        backend_id_local_compares: fileBackendLocalBranches,
        backend_id_redmine_compares: fileBackendRedmineBranches,
        total: fileBackendBranches,
      });
    }
    backendHelperBranches += fileBackendHelperBranches;
    backendLocalBranches += fileBackendLocalBranches;
    backendRedmineBranches += fileBackendRedmineBranches;

    const lines = source.split(/\r?\n/).length;
    if (lines > opts.warningLines && lines <= opts.oversizedLines) {
      runtimeWarningModules.push({ file, lines });
    }
    if (lines > opts.oversizedLines) {
      oversizedRuntimeModules.push({
        file,
        lines,
        allowed: opts.allowedOversized?.includes(file) === true,
      });
    }
  }

  for (const filePath of testFiles) {
    const source = readFileSync(filePath, "utf8");
    const file = normalizeRelative(opts.root, filePath);
    const lines = source.split(/\r?\n/).length;

    if (lines > opts.testWarningLines && lines <= opts.oversizedTestLines) {
      testWarningModules.push({ file, lines });
    }
    if (lines > opts.oversizedTestLines) {
      oversizedTestModules.push({
        file,
        lines,
        allowed: opts.allowedOversizedTests?.includes(file) === true,
      });
    }
  }

  directStdioFiles.sort(compareByCountThenPath);
  backendBranchFiles.sort(compareByCountThenPath);
  runtimeWarningModules.sort((left, right) => {
    if (right.lines !== left.lines) return right.lines - left.lines;
    return left.file.localeCompare(right.file);
  });
  oversizedRuntimeModules.sort((left, right) => {
    if (right.lines !== left.lines) return right.lines - left.lines;
    return left.file.localeCompare(right.file);
  });
  testWarningModules.sort((left, right) => {
    if (right.lines !== left.lines) return right.lines - left.lines;
    return left.file.localeCompare(right.file);
  });
  oversizedTestModules.sort((left, right) => {
    if (right.lines !== left.lines) return right.lines - left.lines;
    return left.file.localeCompare(right.file);
  });

  return {
    schema_version: 1,
    mode: "hotspot_report_v1",
    generated_at: new Date().toISOString(),
    root: opts.root,
    runtime_dir: normalizeRelative(opts.root, opts.runtimeDir),
    test_dir: normalizeRelative(opts.root, opts.testDir),
    runtime_file_count: runtimeFiles.length,
    test_file_count: testFiles.length,
    filters: {
      included_extensions: [...INCLUDED_EXTENSIONS],
      excluded_suffixes: EXCLUDED_SUFFIXES,
      excluded_dir_names: [...EXCLUDED_DIR_NAMES].toSorted(),
      warning_lines: opts.warningLines,
      oversized_lines: opts.oversizedLines,
      test_warning_lines: opts.testWarningLines,
      oversized_test_lines: opts.oversizedTestLines,
    },
    metrics: {
      direct_stdio_writes: {
        total: stdoutWrites + stderrWrites,
        stdout: stdoutWrites,
        stderr: stderrWrites,
        impacted_file_count: directStdioFiles.length,
        files: directStdioFiles,
      },
      backend_type_branches: {
        total: backendHelperBranches + backendLocalBranches + backendRedmineBranches,
        backend_is_local_helper: backendHelperBranches,
        backend_id_local_compares: backendLocalBranches,
        backend_id_redmine_compares: backendRedmineBranches,
        impacted_file_count: backendBranchFiles.length,
        files: backendBranchFiles,
      },
      oversized_runtime_warnings: {
        total: runtimeWarningModules.length,
        threshold_lines: opts.warningLines,
        modules: runtimeWarningModules,
      },
      oversized_runtime_modules: {
        total: oversizedRuntimeModules.length,
        threshold_lines: opts.oversizedLines,
        modules: oversizedRuntimeModules,
      },
      oversized_test_warnings: {
        total: testWarningModules.length,
        threshold_lines: opts.testWarningLines,
        modules: testWarningModules,
      },
      oversized_test_modules: {
        total: oversizedTestModules.length,
        threshold_lines: opts.oversizedTestLines,
        modules: oversizedTestModules,
      },
    },
  };
}

export function collectHotspotThresholdViolations(report) {
  return report.metrics.oversized_runtime_modules.modules.filter((entry) => entry.allowed !== true);
}

export function collectOversizedTestThresholdViolations(report) {
  return report.metrics.oversized_test_modules.modules.filter((entry) => entry.allowed !== true);
}

export async function main(argv = process.argv.slice(2)) {
  const parsed = parseArgs(argv);
  if (parsed.help) {
    printHelp();
    return 0;
  }

  const payload = collectHotspotReport(parsed);
  if (parsed.check) {
    const runtimeWarnings = payload.metrics.oversized_runtime_warnings.modules;
    if (runtimeWarnings.length > 0) {
      process.stdout.write(
        [
          `Hotspot warning: ${runtimeWarnings.length} runtime module(s) exceed ${payload.metrics.oversized_runtime_warnings.threshold_lines} lines.`,
          ...runtimeWarnings.map((entry) => `- ${entry.file}: ${entry.lines} lines`),
          "",
        ].join("\n"),
      );
    }

    const testWarnings = payload.metrics.oversized_test_warnings.modules;
    if (testWarnings.length > 0) {
      process.stdout.write(
        [
          `Oversized test warning: ${testWarnings.length} test file(s) exceed ${payload.metrics.oversized_test_warnings.threshold_lines} lines.`,
          ...testWarnings.map((entry) => `- ${entry.file}: ${entry.lines} lines`),
          "",
        ].join("\n"),
      );
    }

    const runtimeViolations = collectHotspotThresholdViolations(payload);
    const testViolations = collectOversizedTestThresholdViolations(payload);
    if (runtimeViolations.length > 0 || testViolations.length > 0) {
      const failures = [];
      if (runtimeViolations.length > 0) {
        failures.push(
          [
            `Hotspot threshold failed: ${runtimeViolations.length} module(s) exceed ${payload.metrics.oversized_runtime_modules.threshold_lines} lines.`,
            ...runtimeViolations.map((entry) => `- ${entry.file}: ${entry.lines} lines`),
            "Use --allow-oversized <path> only for intentional temporary exceptions.",
            "",
          ].join("\n"),
        );
      }
      if (testViolations.length > 0) {
        failures.push(
          [
            `Oversized test threshold failed: ${testViolations.length} test file(s) exceed ${payload.metrics.oversized_test_modules.threshold_lines} lines.`,
            ...testViolations.map((entry) => `- ${entry.file}: ${entry.lines} lines`),
            "Use --allow-oversized-test <path> only for intentional temporary exceptions.",
            "",
          ].join("\n"),
        );
      }
      process.stderr.write(failures.join("\n"));
      return 1;
    }
    process.stdout.write(
      `Hotspot threshold check passed (runtime: warn>${payload.metrics.oversized_runtime_warnings.threshold_lines}, error>${payload.metrics.oversized_runtime_modules.threshold_lines}; tests: warn>${payload.metrics.oversized_test_warnings.threshold_lines}, error>${payload.metrics.oversized_test_modules.threshold_lines}).\n`,
    );
    return 0;
  }
  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
  return 0;
}

const invokedAsScript =
  typeof process.argv[1] === "string" &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (invokedAsScript) {
  void (async () => {
    try {
      process.exitCode = await main();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      process.stderr.write(`${message}\n`);
      process.exitCode = 1;
    }
  })();
}
