import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SCRIPT_NAME = "hotspot-report.mjs";
const DEFAULT_OVERSIZED_LINES = 500;
const INCLUDED_EXTENSIONS = new Set([".ts", ".tsx"]);
const EXCLUDED_SUFFIXES = [".d.ts", ".test.ts", ".test.tsx", ".test-helpers.ts"];
const EXCLUDED_DIR_NAMES = new Set(["__fixtures__", "__snapshots__", "fixtures"]);

const scriptPath = fileURLToPath(import.meta.url);
const scriptsDir = path.dirname(scriptPath);
const repoRoot = path.resolve(scriptsDir, "..");
const defaultRuntimeDir = path.join(repoRoot, "packages", "agentplane", "src");

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
      `  --oversized-lines <n>     Line threshold for oversized modules. Default: ${DEFAULT_OVERSIZED_LINES}.`,
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
  let oversizedLines = DEFAULT_OVERSIZED_LINES;

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
      case "--oversized-lines": {
        const next = argv[i + 1];
        if (!next) throw new Error("Missing value after --oversized-lines");
        oversizedLines = parsePositiveInt("--oversized-lines", next);
        i++;
        break;
      }
      default: {
        throw new Error(`Unknown argument: ${arg}`);
      }
    }
  }

  return {
    help: false,
    root,
    runtimeDir,
    oversizedLines,
  };
}

function normalizeRelative(root, target) {
  return path.relative(root, target).split(path.sep).join("/");
}

function isRuntimeSourceFile(fileName) {
  if (!INCLUDED_EXTENSIONS.has(path.extname(fileName))) return false;
  return !EXCLUDED_SUFFIXES.some((suffix) => fileName.endsWith(suffix));
}

function listRuntimeFiles(rootDir) {
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
      if (!isRuntimeSourceFile(entry.name)) continue;
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

  const runtimeFiles = listRuntimeFiles(opts.runtimeDir);
  let stdoutWrites = 0;
  let stderrWrites = 0;
  let backendHelperBranches = 0;
  let backendLocalBranches = 0;
  let backendRedmineBranches = 0;
  const directStdioFiles = [];
  const backendBranchFiles = [];
  const oversizedRuntimeModules = [];

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
    if (lines >= opts.oversizedLines) {
      oversizedRuntimeModules.push({ file, lines });
    }
  }

  directStdioFiles.sort(compareByCountThenPath);
  backendBranchFiles.sort(compareByCountThenPath);
  oversizedRuntimeModules.sort((left, right) => {
    if (right.lines !== left.lines) return right.lines - left.lines;
    return left.file.localeCompare(right.file);
  });

  return {
    schema_version: 1,
    mode: "hotspot_report_v1",
    generated_at: new Date().toISOString(),
    root: opts.root,
    runtime_dir: normalizeRelative(opts.root, opts.runtimeDir),
    runtime_file_count: runtimeFiles.length,
    filters: {
      included_extensions: [...INCLUDED_EXTENSIONS],
      excluded_suffixes: EXCLUDED_SUFFIXES,
      excluded_dir_names: [...EXCLUDED_DIR_NAMES].toSorted(),
      oversized_lines: opts.oversizedLines,
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
      oversized_runtime_modules: {
        total: oversizedRuntimeModules.length,
        threshold_lines: opts.oversizedLines,
        modules: oversizedRuntimeModules,
      },
    },
  };
}

export async function main(argv = process.argv.slice(2)) {
  const parsed = parseArgs(argv);
  if (parsed.help) {
    printHelp();
    return 0;
  }

  const payload = collectHotspotReport(parsed);
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
