import { execFile as execFileCb } from "node:child_process";
import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFile = promisify(execFileCb);

type IntakeFileRef = {
  path: string;
  source: "explicit" | "git_changed" | "search_candidate";
  confidence: "high" | "medium" | "low";
  reason: string;
};

type IntakeWarning = {
  code:
    | "missing_file_context"
    | "missing_acceptance_criteria"
    | "missing_constraints"
    | "broad_scope"
    | "long_request"
    | "candidate_context_only";
  severity: "info" | "warn" | "blocker";
  message: string;
};

export type IntakeReport = {
  schema: "agentplane.intake.report.v1";
  generated_at: string;
  request: {
    chars: number;
    words: number;
    raw: string;
  };
  quality: {
    has_explicit_files: boolean;
    has_acceptance_criteria: boolean;
    has_constraints: boolean;
    likely_broad_scope: boolean;
  };
  files: IntakeFileRef[];
  constraints: string[];
  warnings: IntakeWarning[];
  manifest_path?: string;
};

const PATH_TOKEN_RE =
  /(?:^|[\s"'`([{])((?:\.{1,2}\/|[A-Za-z0-9_.-]+\/)[A-Za-z0-9_./@+=:-]*[A-Za-z0-9_@+=:-]|[A-Za-z0-9_.-]+\.(?:ts|tsx|js|jsx|mjs|cjs|json|md|mdx|yml|yaml|toml|css|scss|html|py|rs|go|java|kt|sh|sql))/g;

const HASH_FILE_REF_RE =
  /#(?:file|path)[:=]?\s*((?:\.{1,2}\/|[A-Za-z0-9_.-]+\/)[A-Za-z0-9_./@+=:-]*[A-Za-z0-9_@+=:-]|[A-Za-z0-9_.-]+\.(?:ts|tsx|js|jsx|mjs|cjs|json|md|mdx|yml|yaml|toml|css|scss|html|py|rs|go|java|kt|sh|sql))/gi;

const HASH_PATH_TOKEN_RE =
  /#((?:\.{1,2}\/|[A-Za-z0-9_.-]+\/)[A-Za-z0-9_./@+=:-]*[A-Za-z0-9_@+=:-]|[A-Za-z0-9_.-]+\.(?:ts|tsx|js|jsx|mjs|cjs|json|md|mdx|yml|yaml|toml|css|scss|html|py|rs|go|java|kt|sh|sql))/g;

const ACCEPTANCE_RE =
  /\b(acceptance|criteria|verify|verification|must|ensure|prove|pass|expected|success|done when)\b|критери[ийя]|при[её]мк|провер|должн|ожидаем|успешн|готово когда|считается готов/im;

const CONSTRAINT_RE =
  /\b(do not|don't|must not|only|avoid|without|limit|keep|preserve|no external|no new|constraint)\b|не использовать|нельзя|без\b|только|сохран|огранич|не менять|не добавлять|избегать/im;

const TASK_ID_RE = /^\d{12}-[A-Z0-9]{6}$/;

const BROAD_SCOPE_RE =
  /\b(everything|all|entire|whole|полностью|всё|все|везде|переделай|rewrite|refactor all)\b/i;

const DEFAULT_CONSTRAINTS = [
  "Do not mutate repository state from intake dry-run output alone.",
  "Keep changes inside the task-approved scope.",
  "Do not edit generated/vendor files unless explicitly approved.",
  "Recompute `agentplane task next-action <task-id> --explain` before owner-scoped mutation.",
];

function countWords(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function normalizeCandidatePath(raw: string): string | null {
  const value = raw.trim().replaceAll(/^[([{'"`]+|[\])}'"`.,:;!?]+$/g, "");
  if (!value || value.includes("://")) return null;
  if (value.startsWith("/")) return null;
  if (value.includes("..")) return null;
  return value.replaceAll("\\", "/");
}

function addFileRef(map: Map<string, IntakeFileRef>, ref: IntakeFileRef): void {
  const existing = map.get(ref.path);
  if (!existing) {
    map.set(ref.path, ref);
    return;
  }
  const rank = { high: 3, medium: 2, low: 1 } as const;
  if (rank[ref.confidence] > rank[existing.confidence]) map.set(ref.path, ref);
}

function extractExplicitPaths(text: string): IntakeFileRef[] {
  const refs: IntakeFileRef[] = [];
  for (const match of text.matchAll(HASH_FILE_REF_RE)) {
    const value = normalizeCandidatePath(match[1] ?? "");
    if (!value) continue;
    refs.push({
      path: value,
      source: "explicit",
      confidence: "high",
      reason: "hash file reference in request",
    });
  }
  for (const match of text.matchAll(HASH_PATH_TOKEN_RE)) {
    const value = normalizeCandidatePath(match[1] ?? "");
    if (!value) continue;
    refs.push({
      path: value,
      source: "explicit",
      confidence: "high",
      reason: "hash path reference in request",
    });
  }
  for (const match of text.matchAll(PATH_TOKEN_RE)) {
    const value = normalizeCandidatePath(match[1] ?? "");
    if (!value) continue;
    refs.push({
      path: value,
      source: "explicit",
      confidence: "high",
      reason: "path-like token in request",
    });
  }
  return refs;
}

async function listGitChangedFiles(root: string): Promise<IntakeFileRef[]> {
  try {
    const { stdout } = await execFile("git", ["status", "--short", "--untracked-files=all"], {
      cwd: root,
    });
    return stdout
      .split("\n")
      .map((line) => line.trimEnd())
      .filter(Boolean)
      .map((line) => {
        const rawPath = line.slice(3).trim();
        const rel = rawPath.includes(" -> ") ? (rawPath.split(" -> ").at(-1) ?? rawPath) : rawPath;
        return normalizeCandidatePath(rel);
      })
      .filter((rel): rel is string => rel !== null)
      .map((rel) => ({
        path: rel,
        source: "git_changed" as const,
        confidence: "medium" as const,
        reason: "current git status",
      }));
  } catch {
    return [];
  }
}

function keywordTerms(text: string): string[] {
  return [
    ...new Set(
      text
        .toLowerCase()
        .replaceAll(/[^a-z0-9а-яё_-]+/gi, " ")
        .split(/\s+/)
        .filter((term) => term.length >= 5)
        .filter(
          (term) =>
            !["agentplane", "please", "реализуй", "сделай", "добавить", "нужно", "задача"].includes(
              term,
            ),
        ),
    ),
  ].slice(0, 5);
}

async function searchCandidateFiles(root: string, text: string): Promise<IntakeFileRef[]> {
  const terms = keywordTerms(text);
  if (terms.length === 0) return [];
  const refs = new Map<string, IntakeFileRef>();
  for (const term of terms) {
    try {
      const { stdout } = await execFile(
        "rg",
        [
          "--files-with-matches",
          "--glob",
          "!node_modules",
          "--glob",
          "!.agentplane/worktrees/**",
          term,
        ],
        { cwd: root, maxBuffer: 128 * 1024 },
      );
      for (const rel of stdout.split("\n").filter(Boolean).slice(0, 8)) {
        const normalized = normalizeCandidatePath(rel);
        if (!normalized) continue;
        addFileRef(refs, {
          path: normalized,
          source: "search_candidate",
          confidence: "low",
          reason: `matched term: ${term}`,
        });
      }
    } catch {
      // No matches or rg unavailable. Intake remains useful without candidates.
    }
  }
  return [...refs.values()].slice(0, 20);
}

function buildWarnings(opts: {
  hasExplicitFiles: boolean;
  hasAcceptanceCriteria: boolean;
  hasConstraints: boolean;
  likelyBroadScope: boolean;
  chars: number;
  files: IntakeFileRef[];
}): IntakeWarning[] {
  const warnings: IntakeWarning[] = [];
  if (!opts.hasExplicitFiles) {
    warnings.push({
      code: "missing_file_context",
      severity: "warn",
      message: "No explicit file/path context was detected in the request.",
    });
  }
  if (!opts.hasAcceptanceCriteria) {
    warnings.push({
      code: "missing_acceptance_criteria",
      severity: "warn",
      message: "No explicit acceptance or verification criteria were detected.",
    });
  }
  if (!opts.hasConstraints) {
    warnings.push({
      code: "missing_constraints",
      severity: "info",
      message: "No user-supplied constraints were detected; default AgentPlane constraints apply.",
    });
  }
  if (opts.likelyBroadScope) {
    warnings.push({
      code: "broad_scope",
      severity: "warn",
      message: "The request appears broad; split into a smaller task or add constraints.",
    });
  }
  if (opts.chars > 5000) {
    warnings.push({
      code: "long_request",
      severity: "info",
      message: "The request is long; prefer file/context references over pasted context.",
    });
  }
  if (!opts.hasExplicitFiles && opts.files.some((file) => file.source === "search_candidate")) {
    warnings.push({
      code: "candidate_context_only",
      severity: "info",
      message: "Search-based files are candidates only; confirm them before mutation.",
    });
  }
  return warnings;
}

export async function buildIntakeReport(opts: {
  root: string;
  request: string;
  includeGit?: boolean;
  includeSearch?: boolean;
}): Promise<IntakeReport> {
  const request = opts.request.trim();
  const files = new Map<string, IntakeFileRef>();
  for (const ref of extractExplicitPaths(request)) addFileRef(files, ref);
  if (opts.includeGit !== false) {
    for (const ref of await listGitChangedFiles(opts.root)) addFileRef(files, ref);
  }
  if (opts.includeSearch === true) {
    for (const ref of await searchCandidateFiles(opts.root, request)) addFileRef(files, ref);
  }

  const fileRefs = [...files.values()].toSorted(
    (left, right) => left.path.localeCompare(right.path) || left.source.localeCompare(right.source),
  );
  const hasExplicitFiles = fileRefs.some((file) => file.source === "explicit");
  const hasAcceptanceCriteria = ACCEPTANCE_RE.test(request);
  const hasConstraints = CONSTRAINT_RE.test(request);
  const likelyBroadScope = BROAD_SCOPE_RE.test(request);
  return {
    schema: "agentplane.intake.report.v1",
    generated_at: new Date().toISOString(),
    request: {
      chars: request.length,
      words: countWords(request),
      raw: request,
    },
    quality: {
      has_explicit_files: hasExplicitFiles,
      has_acceptance_criteria: hasAcceptanceCriteria,
      has_constraints: hasConstraints,
      likely_broad_scope: likelyBroadScope,
    },
    files: fileRefs,
    constraints: DEFAULT_CONSTRAINTS,
    warnings: buildWarnings({
      hasExplicitFiles,
      hasAcceptanceCriteria,
      hasConstraints,
      likelyBroadScope,
      chars: request.length,
      files: fileRefs,
    }),
  };
}

export async function writeTaskIntakeManifest(opts: {
  root: string;
  workflowDir: string;
  taskId: string;
  report: IntakeReport;
  includeRawRequest?: boolean;
}): Promise<string> {
  if (!TASK_ID_RE.test(opts.taskId)) {
    throw new Error("Invalid task id for intake manifest.");
  }
  const tasksRoot = path.resolve(opts.root, opts.workflowDir);
  const taskDir = path.resolve(tasksRoot, opts.taskId);
  const rootWithSep = tasksRoot.endsWith(path.sep) ? tasksRoot : `${tasksRoot}${path.sep}`;
  if (!taskDir.startsWith(rootWithSep)) {
    throw new Error("Task manifest path escaped the configured workflow directory.");
  }
  await access(path.join(taskDir, "README.md"));
  const abs = path.resolve(taskDir, "context", "file-manifest.json");
  const taskDirWithSep = taskDir.endsWith(path.sep) ? taskDir : `${taskDir}${path.sep}`;
  if (!abs.startsWith(taskDirWithSep)) {
    throw new Error("Task manifest path escaped the selected task directory.");
  }
  const rel = path.relative(opts.root, abs).replaceAll("\\", "/");
  await mkdir(path.dirname(abs), { recursive: true });
  const report = {
    ...opts.report,
    request: {
      ...opts.report.request,
      raw: opts.includeRawRequest === true ? opts.report.request.raw : "[redacted]",
    },
    manifest_path: rel,
  };
  await writeFile(abs, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  return rel;
}
