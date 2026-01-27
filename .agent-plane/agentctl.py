#!/usr/bin/env python3
"""Agent Plane Agent Helper.

This script automates repetitive, error-prone steps that show up across agent
workflows (readiness checks, safe tasks.json updates, and git hygiene).
"""

from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
import os
import re
import subprocess
import sys
from collections.abc import Callable
from datetime import UTC, datetime, timedelta
from pathlib import Path
from typing import TYPE_CHECKING, NoReturn, Protocol, TypedDict, TypeGuard, cast

if TYPE_CHECKING:
    from collections.abc import Iterable

JsonDict = dict[str, object]
TaskRecord = dict[str, object]
TaskList = list[TaskRecord]
TaskIndex = dict[str, TaskRecord]
DependencyState = dict[str, dict[str, list[str]]]


class PrContext(TypedDict):
    pr_path: Path
    pr_meta: JsonDict


# Backend capability interfaces for optional features (checked via supports_* helpers).
class BackendTaskListWrite(Protocol):
    def list_tasks(self) -> TaskList: ...

    def write_task(self, task: TaskRecord) -> None: ...


class BackendWriteTasks(Protocol):
    def write_tasks(self, tasks: TaskList) -> None: ...


class BackendWriteTask(Protocol):
    def write_task(self, task: TaskRecord) -> None: ...


class BackendExportTasks(Protocol):
    def export_tasks_json(self, path: Path) -> None: ...


class BackendTaskDocs(Protocol):
    def get_task_doc(self, task_id: str) -> str: ...

    def set_task_doc(self, task_id: str, doc: str) -> None: ...

    def touch_task_doc_metadata(self, task_id: str, *, updated_by: str | None = None) -> None: ...


class BackendGetTaskDoc(Protocol):
    def get_task_doc(self, task_id: str) -> str: ...


class BackendSetTaskDoc(Protocol):
    def set_task_doc(self, task_id: str, doc: str) -> None: ...


class BackendTouchTaskDocMetadata(Protocol):
    def touch_task_doc_metadata(self, task_id: str, *, updated_by: str | None = None) -> None: ...


class BackendNormalizeTasks(Protocol):
    def normalize_tasks(self) -> int: ...


class BackendSyncTasks(Protocol):
    def sync(
        self,
        direction: str = "push",
        conflict: str = "diff",
        *,
        quiet: bool = False,
        confirm: bool = False,
    ) -> None: ...


# Duck-typing helpers to gate backend features without hard dependencies.
def supports_task_list_write(backend: object) -> TypeGuard[BackendTaskListWrite]:
    return callable(getattr(backend, "list_tasks", None)) and callable(getattr(backend, "write_task", None))


def supports_write_tasks(backend: object) -> TypeGuard[BackendWriteTasks]:
    return callable(getattr(backend, "write_tasks", None))


def supports_write_task(backend: object) -> TypeGuard[BackendWriteTask]:
    return callable(getattr(backend, "write_task", None))


def supports_export_tasks(backend: object) -> TypeGuard[BackendExportTasks]:
    return callable(getattr(backend, "export_tasks_json", None))


def supports_task_docs(backend: object) -> TypeGuard[BackendTaskDocs]:
    return (
        callable(getattr(backend, "get_task_doc", None))
        and callable(getattr(backend, "set_task_doc", None))
        and callable(getattr(backend, "touch_task_doc_metadata", None))
    )


def supports_get_task_doc(backend: object) -> TypeGuard[BackendGetTaskDoc]:
    return callable(getattr(backend, "get_task_doc", None))


def supports_set_task_doc(backend: object) -> TypeGuard[BackendSetTaskDoc]:
    return callable(getattr(backend, "set_task_doc", None))


def supports_touch_task_doc_metadata(backend: object) -> TypeGuard[BackendTouchTaskDocMetadata]:
    return callable(getattr(backend, "touch_task_doc_metadata", None))


def supports_normalize_tasks(backend: object) -> TypeGuard[BackendNormalizeTasks]:
    return callable(getattr(backend, "normalize_tasks", None))


def supports_sync_tasks(backend: object) -> TypeGuard[BackendSyncTasks]:
    return callable(getattr(backend, "sync", None))


SCRIPT_DIR = Path(__file__).resolve().parent
ROOT = SCRIPT_DIR.parent
SWARM_DIR = ROOT / ".agent-plane"
SWARM_CONFIG_PATH = SWARM_DIR / "config.json"

ALLOWED_WORKFLOW_MODES: set[str] = {"direct", "branch_pr"}
DEFAULT_WORKFLOW_MODE = "direct"
DEFAULT_TASK_ID_SUFFIX_LENGTH = 6
DEFAULT_TASK_BRANCH_PREFIX = "task"
DEFAULT_WORKTREES_DIRNAME = str(Path(".agent-plane") / "worktrees")

ALLOWED_STATUSES: set[str] = {"TODO", "DOING", "BLOCKED", "DONE"}
TASKS_SCHEMA_VERSION = 1
TASKS_META_KEY = "meta"
TASKS_META_MANAGED_BY = "agentctl"
DEFAULT_VERIFY_REQUIRED_TAGS: set[str] = {"code", "backend", "frontend"}
DEFAULT_TASK_DOC_SECTIONS: tuple[str, ...] = (
    "Summary",
    "Context",
    "Scope",
    "Risks",
    "Verify Steps",
    "Rollback Plan",
    "Notes",
)
DEFAULT_TASK_DOC_REQUIRED_SECTIONS: tuple[str, ...] = (
    "Summary",
    "Scope",
    "Risks",
    "Verify Steps",
    "Rollback Plan",
)
DEFAULT_COMMENT_RULES: dict[str, dict[str, object]] = {
    "start": {"prefix": "Start:", "min_chars": 40},
    "blocked": {"prefix": "Blocked:", "min_chars": 40},
    "verified": {"prefix": "Verified:", "min_chars": 60},
}
DEFAULT_GENERIC_COMMIT_TOKENS: set[str] = {
    "start",
    "status",
    "mark",
    "done",
    "wip",
    "update",
    "tasks",
    "task",
}
START_COMMIT_EMOJI = "🚧"
FINISH_COMMIT_EMOJI = "✅"
INTERMEDIATE_COMMIT_EMOJI_FALLBACK = "🛠️"
COMMIT_EMOJI_KEYWORDS: tuple[tuple[str, tuple[str, ...]], ...] = (
    ("⛔", ("blocked", "blocker", "blocking", "stuck", "waiting", "hold")),
    ("🚑", ("hotfix", "urgent", "emergency")),
    ("🐛", ("fix", "bug", "bugs", "defect", "defects", "error", "errors", "crash", "regression", "issue")),
    ("🔒", ("security", "vuln", "vulnerability", "auth", "encrypt", "encryption")),
    ("⚡", ("perf", "performance", "optimize", "optimization", "speed", "latency")),
    ("🧪", ("test", "tests", "testing", "spec", "specs", "coverage", "verify", "verified", "validation")),
    ("📝", ("doc", "docs", "docstring", "readme", "documentation", "guide", "changelog")),
    ("♻️", ("refactor", "refactoring", "cleanup", "simplify", "restructure", "rename")),
    ("🏗️", ("build", "ci", "pipeline", "release", "packaging")),
    ("🔧", ("config", "configuration", "settings", "flag", "env", "toggle")),
    ("📦", ("deps", "dependency", "dependencies", "upgrade", "bump", "vendor")),
    ("🎨", ("ui", "ux", "style", "css", "theme", "layout")),
    ("🧹", ("lint", "format", "formatting", "typo", "spelling")),
)
# Git hook environment keys and markers used by agentctl-managed hooks.
HOOK_ENV_TASK_ID = "AGENT_PLANE_TASK_ID"
HOOK_ENV_ALLOW_TASKS = "AGENT_PLANE_ALLOW_TASKS"
HOOK_ENV_ALLOW_BASE = "AGENT_PLANE_ALLOW_BASE"
HOOK_MARKER = "agent-plane: managed by agentctl"
HOOK_NAMES = ("commit-msg", "pre-commit")

FRAMEWORK_CONFIG_LABEL = "framework"
FRAMEWORK_SOURCE_DEFAULT = "https://github.com/basilisk-labs/agent-plane"
FRAMEWORK_LAST_UPDATE_KEY = "last_update"
FRAMEWORK_STALE_DAYS = 10


def load_env_file(path: Path) -> None:
    if not path.exists():
        return
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("export "):
            line = line[len("export ") :].lstrip()
        if "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        # Do not override already-set env vars in the current process.
        if not key or key in os.environ:
            continue
        value = value.strip()
        if value and value[0] == value[-1] and value[0] in ('"', "'"):
            value = value[1:-1]
        os.environ[key] = value


# Wrapper to standardize subprocess calls (text mode + captured output).
def run(
    cmd: list[str],
    *,
    cwd: Path = ROOT,
    check: bool = True,
    env: dict[str, str] | None = None,
) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        cmd,
        cwd=str(cwd),
        text=True,
        capture_output=True,
        check=check,
        env=env,
    )


def merge_env(overrides: dict[str, str] | None) -> dict[str, str] | None:
    if not overrides:
        return None
    merged = dict(os.environ)
    merged.update(overrides)
    return merged


def build_hook_env(*, task_id: str | None, allow_tasks: bool, allow_base: bool) -> dict[str, str] | None:
    overrides: dict[str, str] = {
        HOOK_ENV_ALLOW_TASKS: "1" if allow_tasks else "0",
        HOOK_ENV_ALLOW_BASE: "1" if allow_base else "0",
    }
    if task_id:
        overrides[HOOK_ENV_TASK_ID] = task_id
    return merge_env(overrides)


def error_context() -> JsonDict:
    return {"cwd": str(Path.cwd().resolve()), "argv": sys.argv[1:]}


def die(message: str, code: int = 1) -> NoReturn:
    if GLOBAL_JSON:
        payload = {"error": {"code": code, "message": message, "context": error_context()}}
        print(json.dumps(payload, ensure_ascii=False), file=sys.stdout)
    else:
        print(message, file=sys.stderr)
    raise SystemExit(code)


def git_toplevel(*, cwd: Path = ROOT) -> Path:
    try:
        result = run(["git", "rev-parse", "--show-toplevel"], cwd=cwd, check=True)
    except subprocess.CalledProcessError as exc:
        die(exc.stderr.strip() or "Failed to resolve git toplevel")
    raw = (result.stdout or "").strip()
    if not raw:
        die("Failed to resolve git toplevel")
    return Path(raw).resolve()


def git_current_branch(*, cwd: Path = ROOT) -> str:
    try:
        result = run(["git", "rev-parse", "--abbrev-ref", "HEAD"], cwd=cwd, check=True)
    except subprocess.CalledProcessError as exc:
        die(exc.stderr.strip() or "Failed to resolve git branch")
    return (result.stdout or "").strip()


def git_config_get(key: str, *, cwd: Path = ROOT) -> str:
    raw = str(key or "").strip()
    if not raw:
        return ""
    try:
        proc = run(["git", "config", "--get", raw], cwd=cwd, check=False)
    except subprocess.CalledProcessError:
        return ""
    if proc.returncode != 0:
        return ""
    return (proc.stdout or "").strip()


def git_config_set(key: str, value: str, *, cwd: Path = ROOT) -> None:
    raw_key = str(key or "").strip()
    raw_value = str(value or "").strip()
    if not raw_key:
        die("Missing git config key", code=2)
    if not raw_value:
        die(f"Missing git config value for {raw_key!r}", code=2)
    try:
        run(["git", "config", "--local", raw_key, raw_value], cwd=cwd, check=True)
    except subprocess.CalledProcessError as exc:
        die(exc.stderr.strip() or f"Failed to set git config: {raw_key}")


def git_common_dir(*, cwd: Path = ROOT) -> Path:
    try:
        result = run(["git", "rev-parse", "--git-common-dir"], cwd=cwd, check=True)
    except subprocess.CalledProcessError as exc:
        die(exc.stderr.strip() or "Failed to resolve git common dir")
    raw = (result.stdout or "").strip()
    if not raw:
        die("Failed to resolve git common dir")
    path = Path(raw)
    if not path.is_absolute():
        path = (git_toplevel(cwd=cwd) / path).resolve()
    return path


def git_hooks_dir(*, cwd: Path = ROOT) -> Path:
    repo_root = git_toplevel(cwd=cwd).resolve()
    common_dir = git_common_dir(cwd=cwd).resolve()
    try:
        result = run(["git", "rev-parse", "--git-path", "hooks"], cwd=cwd, check=True)
    except subprocess.CalledProcessError as exc:
        die(exc.stderr.strip() or "Failed to resolve git hooks path")
    raw = (result.stdout or "").strip()
    if not raw:
        die("Failed to resolve git hooks path")
    path = Path(raw)
    if not path.is_absolute():
        path = (repo_root / path).resolve()
    else:
        path = path.resolve()
    # Ensure hooks live inside the repo/common dir to avoid writing outside.
    allowed_roots = (repo_root, common_dir)
    if not any(root == path or root in path.parents for root in allowed_roots):
        die(
            "\n".join(
                [
                    "Refusing to manage git hooks outside the repository.",
                    f"hooks_path={path}",
                    f"repo_root={repo_root}",
                    f"common_dir={common_dir}",
                    "Fix:",
                    "  1) Use a repo-relative core.hooksPath (e.g., .git/hooks)",
                    "  2) Re-run `python .agent-plane/agentctl.py hooks install`",
                ]
            ),
            code=2,
        )
    return path


def is_task_worktree_checkout(*, cwd: Path = ROOT) -> bool:
    top = git_toplevel(cwd=cwd)
    try:
        top.resolve().relative_to(WORKTREES_DIR.resolve())
    except ValueError:
        return False
    return True


def ensure_git_clean(*, cwd: Path = ROOT, action: str) -> None:
    try:
        result = run(["git", "status", "--porcelain"], cwd=cwd, check=True)
    except subprocess.CalledProcessError as exc:
        die(exc.stderr.strip() or "Failed to read git status")
    if (result.stdout or "").strip():
        dirty = (result.stdout or "").strip()
        die(
            "\n".join(
                [
                    f"Refusing {action}: working tree is dirty (commit/stash changes first)",
                    "Fix:",
                    "  1) `git status --porcelain` (review changes)",
                    "  2) Commit/stash/reset until clean",
                    "  3) Re-run the command",
                    "Dirty paths:",
                    *[f"  {line}" for line in dirty.splitlines()],
                    f"Context: {format_command_context(cwd=Path.cwd().resolve())}",
                ]
            ),
            code=2,
        )


def git_status_porcelain(*, cwd: Path) -> str:
    try:
        result = run(["git", "status", "--porcelain"], cwd=cwd, check=True)
    except subprocess.CalledProcessError as exc:
        die(exc.stderr.strip() or "Failed to read git status")
    return (result.stdout or "").strip()


def ensure_path_ignored(path: str, *, cwd: Path = ROOT) -> None:
    target = str(path).strip()
    if not target:
        die("Missing ignore target", code=2)
    try:
        proc = run(["git", "check-ignore", "-q", target], cwd=cwd, check=False)
    except subprocess.CalledProcessError:
        proc = subprocess.CompletedProcess(args=[], returncode=1, stdout="", stderr="")
    if proc.returncode != 0:
        die(
            "\n".join(
                [
                    f"Refusing operation: {target!r} is not ignored by git",
                    "Fix:",
                    f"  1) Add `{target}` to `.gitignore`",
                    "  2) Re-run the command",
                    f"Context: branch={git_current_branch(cwd=cwd)!r} cwd={Path.cwd().resolve()}",
                ]
            ),
            code=2,
        )


def format_command_context(*, cwd: Path) -> str:
    repo_root = git_toplevel(cwd=cwd)
    cwd_resolved = cwd.resolve()
    rel = str(cwd_resolved.relative_to(repo_root)) if cwd_resolved != repo_root else "."
    return f"repo_root={repo_root} cwd={rel} branch={git_current_branch(cwd=cwd)!r} workflow_mode={workflow_mode()!r}"


def print_block(label: str, text: str) -> None:
    print(f"{label}: {text}".rstrip())


def ensure_invoked_from_repo_root(*, action: str) -> None:
    cwd = Path.cwd().resolve()
    if cwd != ROOT.resolve():
        die(
            "\n".join(
                [
                    f"Refusing {action}: command must be run from the repo root directory",
                    "Fix:",
                    f"  1) `cd {ROOT}`",
                    "  2) Re-run the command",
                    f"Context: {format_command_context(cwd=cwd)}",
                ]
            ),
            code=2,
        )


def require_not_task_worktree(*, cwd: Path = ROOT, action: str) -> None:
    if is_task_worktree_checkout(cwd=cwd):
        die(
            "\n".join(
                [
                    f"Refusing {action}: run from the repo root checkout (not from {WORKTREES_DIRNAME}/*)",
                    "Fix:",
                    f"  1) `cd {ROOT}`",
                    "  2) Ensure you're on `main` (if required)",
                    "  3) Re-run the command",
                    f"Context: {format_command_context(cwd=Path.cwd().resolve())}",
                ]
            ),
            code=2,
        )


def require_branch(name: str, *, cwd: Path = ROOT, action: str) -> None:
    current = git_current_branch(cwd=cwd)
    if current != name:
        die(
            "\n".join(
                [
                    f"Refusing {action}: must be on {name!r} (current: {current!r})",
                    "Fix:",
                    f"  1) `git checkout {name}`",
                    "  2) Ensure working tree is clean",
                    "  3) Re-run the command",
                    f"Context: {format_command_context(cwd=Path.cwd().resolve())}",
                ]
            ),
            code=2,
        )


def require_tasks_json_write_context(*, cwd: Path = ROOT, force: bool = False) -> None:
    # Protect tasks.json writes from worktrees or non-base branches in branch_pr mode.
    if force:
        return
    if is_task_worktree_checkout(cwd=cwd):
        require_not_task_worktree(cwd=cwd, action="tasks.json write")
    if is_branch_pr_mode():
        require_branch(base_branch(cwd=cwd), cwd=cwd, action="tasks.json write")


_SLUG_RE = re.compile(r"[^a-z0-9]+")
# In-memory caches avoid repeated backend reads and dependency recomputation.
_TASK_CACHE: TaskList | None = None
_TASK_INDEX_CACHE: tuple[str, TaskIndex, list[str]] | None = None
_TASK_DEP_CACHE: tuple[str, DependencyState, list[str]] | None = None
GLOBAL_QUIET = False
GLOBAL_VERBOSE = False
GLOBAL_JSON = False
GLOBAL_LINT = False
AUTO_LINT_ON_WRITE = True


def normalize_slug(value: str) -> str:
    raw = (value or "").strip().lower()
    raw = raw.replace("_", "-").replace(" ", "-")
    raw = _SLUG_RE.sub("-", raw).strip("-")
    return raw or "work"


def normalize_task_ids(values: Iterable[str]) -> list[str]:
    task_ids: list[str] = []
    seen: set[str] = set()
    for value in values:
        task_id = str(value or "").strip()
        if not task_id:
            die("task_id must be non-empty", code=2)
        if task_id in seen:
            die(f"Duplicate task id: {task_id}", code=2)
        seen.add(task_id)
        task_ids.append(task_id)
    return task_ids


# Ensure the commit message contains meaningful content beyond the task id/suffix.
def commit_message_has_meaningful_summary(task_id: str, message: str) -> bool:
    task_token = task_id.strip().lower()
    if not task_token:
        return True
    task_suffix = task_token.split("-")[-1] if "-" in task_token else task_token
    tokens = re.findall(r"[0-9A-Za-z]+(?:-[0-9A-Za-z]+)*", message.lower())
    generic_tokens = commit_generic_tokens()
    meaningful = [t for t in tokens if t not in {task_token, task_suffix} and t not in generic_tokens]
    return bool(meaningful)


def task_id_variants(task_id: str) -> set[str]:
    raw = task_id.strip()
    if not raw:
        return set()
    if "-" in raw:
        return {raw.split("-")[-1]}
    return {raw}


def task_suffix(task_id: str) -> str:
    raw = task_id.strip()
    if not raw:
        return ""
    if "-" in raw:
        return raw.split("-")[-1]
    return raw


def task_digest(task: TaskRecord) -> str:
    return json.dumps(task, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def commit_subject_mentions_task(task_id: str, subject: str) -> bool:
    return any(token in subject for token in task_id_variants(task_id))


def commit_subject_missing_error(task_ids: list[str], subject: str, *, context: str | None = None) -> str:
    prefix = f"{context}: " if context else ""
    return f"{prefix}Commit subject does not mention task suffix(es) for {', '.join(task_ids)}: {subject!r}"


def commit_subject_tokens(subject: str) -> set[str]:
    tokens = re.findall(r"[0-9A-Za-z]+(?:-[0-9A-Za-z]+)*", subject or "")
    normalized = {token.lower() for token in tokens if token}
    normalized.update(token.split("-")[-1].lower() for token in tokens if token)
    return normalized


def collect_task_suffixes(tasks: TaskList) -> list[str]:
    suffixes: set[str] = set()
    for task in tasks:
        task_id = str(task.get("id") or "").strip()
        suffix = task_suffix(task_id)
        if suffix:
            suffixes.add(suffix)
    return sorted(suffixes)


def read_commit_subject(path: Path) -> str:
    try:
        content = path.read_text(encoding="utf-8", errors="replace")
    except FileNotFoundError:
        die(f"Missing commit message file: {path}")
    for line in content.splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        return stripped
    return ""


def hook_commit_msg_check(message_path: Path) -> None:
    subject = read_commit_subject(message_path)
    if not subject:
        die("Commit message subject is empty", code=2)
    task_id = str(os.environ.get(HOOK_ENV_TASK_ID) or "").strip()
    if task_id:
        if not commit_subject_mentions_task(task_id, subject):
            die(commit_subject_missing_error([task_id], subject), code=2)
        return
    tasks, _ = load_task_store()
    suffixes = collect_task_suffixes(tasks)
    if not suffixes:
        die("No task IDs available to validate commit subject; run agentctl or uninstall hooks.", code=2)
    tokens = commit_subject_tokens(subject)
    if not any(suffix.lower() in tokens for suffix in suffixes):
        sample = _format_list_short(suffixes)
        die(
            "\n".join(
                [
                    "Commit subject must mention at least one task ID suffix (segment after the last dash).",
                    f"Subject: {subject!r}",
                    f"Known suffixes (sample): {sample}",
                    "Fix:",
                    "  1) Update the subject to include the task suffix",
                    "  2) Re-run `git commit`",
                ]
            ),
            code=2,
        )


def hook_pre_commit_check(*, cwd: Path) -> None:
    # Enforce workflow guardrails for staged files before git commit runs.
    staged = git_staged_files(cwd=cwd)
    if not staged:
        return
    allow_tasks = str(os.environ.get(HOOK_ENV_ALLOW_TASKS) or "").strip() == "1"
    allow_base = str(os.environ.get(HOOK_ENV_ALLOW_BASE) or "").strip() == "1"
    tasks_path = TASKS_PATH_REL
    tasks_staged = tasks_path in staged

    if tasks_staged and not allow_tasks:
        die(
            "\n".join(
                [
                    f"Refusing commit: {TASKS_PATH_REL} is protected by agent-plane hooks.",
                    "Fix:",
                    "  1) Use `python .agent-plane/agentctl.py commit <task-id> ... --allow-tasks`",
                    "  2) Or uninstall hooks: `python .agent-plane/agentctl.py hooks uninstall`",
                ]
            ),
            code=2,
        )

    if tasks_staged:
        if is_task_worktree_checkout(cwd=cwd):
            die(
                f"Refusing commit: {TASKS_PATH_REL} from a worktree checkout ({WORKTREES_DIRNAME}/*)\n"
                f"Context: {format_command_context(cwd=cwd)}",
                code=2,
            )
        if is_branch_pr_mode() and git_current_branch(cwd=cwd) != base_branch(cwd=cwd):
            die(
                f"Refusing commit: {TASKS_PATH_REL} allowed only on {base_branch(cwd=cwd)!r} "
                "in workflow_mode='branch_pr'\n"
                f"Context: {format_command_context(cwd=cwd)}",
                code=2,
            )

    if is_branch_pr_mode():
        current_branch = git_current_branch(cwd=cwd)
        integration_branch = base_branch(cwd=cwd)
        non_tasks = [path for path in staged if path != tasks_path]
        if non_tasks:
            if current_branch == integration_branch and not allow_base:
                die(
                    "\n".join(
                        [
                            "Refusing commit: code/docs commits are forbidden on the base branch "
                            f"{integration_branch!r} in workflow_mode='branch_pr'",
                            "Fix:",
                            "  1) Create a task branch + worktree: "
                            "`python .agent-plane/agentctl.py work start <task-id> --agent <AGENT> --slug <slug> --worktree`",
                            f"  2) Commit from `{task_branch_example()}`",
                            f"Context: {format_command_context(cwd=cwd)}",
                        ]
                    ),
                    code=2,
                )
            if current_branch != integration_branch and parse_task_id_from_task_branch(current_branch) is None:
                die(
                    "\n".join(
                        [
                            f"Refusing commit: branch {current_branch!r} is not a task branch in branch_pr mode",
                            "Fix:",
                            f"  1) Switch to `{task_branch_example()}`",
                            "  2) Commit from the task branch",
                            f"Context: {format_command_context(cwd=cwd)}",
                        ]
                    ),
                    code=2,
                )


def hook_script_text(hook: str) -> str:
    if hook not in HOOK_NAMES:
        die(f"Unknown hook: {hook}", code=2)
    lines = [
        "#!/bin/sh",
        f"# {HOOK_MARKER} (do not edit)",
        "set -e",
        'ROOT="$(git rev-parse --show-toplevel 2>/dev/null)"',
        'if [ -z "$ROOT" ]; then',
        '  echo "agent-plane hooks: unable to resolve repo root" >&2',
        "  exit 1",
        "fi",
        "if command -v python >/dev/null 2>&1; then",
        "  PYTHON_BIN=python",
        "elif command -v python3 >/dev/null 2>&1; then",
        "  PYTHON_BIN=python3",
        "else",
        '  echo "agent-plane hooks: python not found" >&2',
        "  exit 1",
        "fi",
        f'exec "$PYTHON_BIN" "$ROOT/.agent-plane/agentctl.py" hooks run {hook} "$@"',
        "",
    ]
    return "\n".join(lines)


def hook_is_managed(path: Path) -> bool:
    try:
        content = path.read_text(encoding="utf-8", errors="replace")
    except FileNotFoundError:
        return False
    return HOOK_MARKER in content


def load_task_index() -> tuple[TaskList, TaskIndex, list[str], str]:
    tasks, _ = load_task_store()
    key = tasks_cache_key(tasks)
    global _TASK_INDEX_CACHE
    if _TASK_INDEX_CACHE and _TASK_INDEX_CACHE[0] == key:
        tasks_by_id, warnings = _TASK_INDEX_CACHE[1], _TASK_INDEX_CACHE[2]
        return tasks, tasks_by_id, warnings, key
    tasks_by_id, warnings = index_tasks_by_id(tasks)
    _TASK_INDEX_CACHE = (key, tasks_by_id, warnings)
    return tasks, tasks_by_id, warnings, key


def load_dependency_state_for(tasks_by_id: TaskIndex, *, key: str) -> tuple[DependencyState, list[str]]:
    global _TASK_DEP_CACHE
    if _TASK_DEP_CACHE and _TASK_DEP_CACHE[0] == key:
        return _TASK_DEP_CACHE[1], _TASK_DEP_CACHE[2]
    dep_state, dep_warnings = compute_dependency_state(tasks_by_id)
    _TASK_DEP_CACHE = (key, dep_state, dep_warnings)
    return dep_state, dep_warnings


def require_structured_comment(body: str, *, prefix: str, min_chars: int) -> None:
    normalized = (body or "").strip()
    if not normalized.lower().startswith(prefix.lower()):
        die(f"Comment body must start with {prefix!r}", code=2)
    if len(normalized) < min_chars:
        die(f"Comment body must be at least {min_chars} characters", code=2)


def load_json(path: Path) -> JsonDict:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        die(f"Missing file: {path}")
    except json.JSONDecodeError as exc:
        die(f"Invalid JSON in {path}: {exc}")
    if not isinstance(data, dict):
        die(f"Invalid JSON in {path}: expected object")
    return cast(JsonDict, data)


def _resolve_optional_repo_relative_path(value: object, *, label: str) -> Path | None:
    raw = str(value or "").strip()
    if not raw:
        return None
    path = Path(raw)
    if path.is_absolute():
        die(f"Config path for {label!r} must be repo-relative (got absolute path: {raw})")
    resolved = (ROOT / path).resolve()
    root_resolved = ROOT.resolve()
    if root_resolved not in resolved.parents and resolved != root_resolved:
        die(f"Config path for {label!r} must stay under repo root (got: {raw})")
    return resolved


# Load optional backend config and keep module paths constrained to the repo.
def load_backend_config() -> JsonDict:
    backend = _SWARM_CONFIG.get("tasks_backend") or {}
    if not isinstance(backend, dict):
        die(f"{SWARM_CONFIG_PATH} tasks_backend must be a JSON object", code=2)
    config_path = _resolve_optional_repo_relative_path(backend.get("config_path"), label="tasks_backend.config_path")
    if not config_path:
        return {}
    data = load_json(config_path)
    for key in ("id", "module", "class"):
        value = data.get(key)
        if not isinstance(value, str) or not value.strip():
            die(f"{config_path} is missing required field {key!r}", code=2)
    version = data.get("version")
    if not isinstance(version, int | str):
        die(f"{config_path} is missing required field 'version'", code=2)
    settings = data.get("settings")
    if settings is None:
        data["settings"] = {}
    elif not isinstance(settings, dict):
        die(f"{config_path} settings must be a JSON object", code=2)
    module_path = (config_path.parent / str(data["module"])).resolve()
    root_resolved = ROOT.resolve()
    if root_resolved not in module_path.parents and module_path != root_resolved:
        die(f"Backend module must stay under repo root (got: {module_path})", code=2)
    data["_config_path"] = str(config_path)
    data["_module_path"] = str(module_path)
    return data


# Dynamically import the backend class declared by config.
def load_backend_class(backend_config: JsonDict) -> type[object] | None:
    if not backend_config:
        return None
    module_path = Path(str(backend_config.get("_module_path") or "")).resolve()
    if not module_path.exists():
        die(f"Missing backend module: {module_path}", code=2)
    backend_id = str(backend_config.get("id") or "backend").strip()
    spec = importlib.util.spec_from_file_location(f"agentplane_backend_{backend_id}", module_path)
    if not spec or not spec.loader:
        die(f"Failed to load backend module: {module_path}", code=2)
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    class_name = str(backend_config.get("class") or "").strip()
    if not class_name:
        die(f"Backend class name missing in {backend_config.get('_config_path')}", code=2)
    backend_cls = cast(type[object] | None, getattr(module, class_name, None))
    if backend_cls is None:
        die(f"Backend class {class_name!r} not found in {module_path}", code=2)
    return backend_cls


def _resolve_repo_relative_path(value: str, *, label: str) -> Path:
    raw = str(value or "").strip()
    if not raw:
        die(f"Missing config path for {label!r} in {SWARM_CONFIG_PATH}")
    path = Path(raw)
    if path.is_absolute():
        die(f"Config path for {label!r} must be repo-relative (got absolute path: {raw})")
    resolved = (ROOT / path).resolve()
    root_resolved = ROOT.resolve()
    if root_resolved not in resolved.parents and resolved != root_resolved:
        die(f"Config path for {label!r} must stay under repo root (got: {raw})")
    return resolved


def load_swarm_config() -> JsonDict:
    if not SWARM_CONFIG_PATH.exists():
        die(f"Missing swarm config: {SWARM_CONFIG_PATH}", code=2)
    data = load_json(SWARM_CONFIG_PATH)
    schema_version = data.get("schema_version")
    if schema_version != 1:
        die(f"Unsupported swarm config schema_version: {schema_version!r} (expected 1)", code=2)
    paths = data.get("paths")
    if not isinstance(paths, dict):
        die(f"{SWARM_CONFIG_PATH} must contain a top-level 'paths' object", code=2)
    return data


_SWARM_CONFIG = load_swarm_config()
_PATHS = cast(JsonDict, _SWARM_CONFIG.get("paths") or {})


def _path_setting(key: str) -> str:
    value = _PATHS.get(key)
    if not isinstance(value, str) or not value.strip():
        die(f"{SWARM_CONFIG_PATH} missing required paths.{key}", code=2)
    return value


def _optional_path_setting(key: str, *, default: str) -> str:
    value = _PATHS.get(key)
    if value is None:
        return default
    if not isinstance(value, str) or not value.strip():
        die(f"{SWARM_CONFIG_PATH} paths.{key} must be a non-empty string", code=2)
    return value


def _config_dict(value: object, *, label: str) -> JsonDict:
    if value is None:
        return {}
    if not isinstance(value, dict):
        die(f"{SWARM_CONFIG_PATH} {label} must be a JSON object", code=2)
    return cast(JsonDict, value)


def tasks_config() -> JsonDict:
    return _config_dict(_SWARM_CONFIG.get("tasks"), label="tasks")


def branch_config() -> JsonDict:
    return _config_dict(_SWARM_CONFIG.get("branch"), label="branch")


def commit_config() -> JsonDict:
    return _config_dict(_SWARM_CONFIG.get("commit"), label="commit")


def framework_config() -> JsonDict:
    return _config_dict(_SWARM_CONFIG.get(FRAMEWORK_CONFIG_LABEL), label=FRAMEWORK_CONFIG_LABEL)


def framework_source() -> str:
    source = str(framework_config().get("source") or FRAMEWORK_SOURCE_DEFAULT).strip()
    if not source:
        die(
            f"{SWARM_CONFIG_PATH} {FRAMEWORK_CONFIG_LABEL}.source must be a non-empty string",
            code=2,
        )
    return source


def parse_iso_datetime(value: object | None) -> datetime | None:
    if not value:
        return None
    if isinstance(value, datetime):
        parsed = value
    elif isinstance(value, str):
        raw = value.strip()
        if not raw:
            return None
        try:
            parsed = datetime.fromisoformat(raw)
        except ValueError:
            return None
    else:
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=UTC)
    else:
        parsed = parsed.astimezone(UTC)
    return parsed


def framework_last_update() -> datetime | None:
    return parse_iso_datetime(framework_config().get(FRAMEWORK_LAST_UPDATE_KEY))


def framework_upgrade_due(
    last_update: datetime | None,
    *,
    now: datetime | None = None,
    stale_days: int = FRAMEWORK_STALE_DAYS,
) -> tuple[bool, str | None]:
    now = now or datetime.now(UTC)
    if last_update is None:
        return True, "never"
    delta = now - last_update
    if delta.total_seconds() < 0:
        return False, None
    threshold = timedelta(days=stale_days)
    if delta >= threshold:
        return True, f"stale ({delta.days}d)"
    return False, None


def persist_framework_update(timestamp: str) -> None:
    data = load_json(SWARM_CONFIG_PATH)
    framework = data.get(FRAMEWORK_CONFIG_LABEL)
    if not isinstance(framework, dict):
        framework = {}
        data[FRAMEWORK_CONFIG_LABEL] = framework
    framework[FRAMEWORK_LAST_UPDATE_KEY] = timestamp
    write_json(SWARM_CONFIG_PATH, data)
    global _SWARM_CONFIG
    _SWARM_CONFIG = data


TASKS_PATH = _resolve_repo_relative_path(_path_setting("tasks_path"), label="tasks_path")
AGENTS_DIR = _resolve_repo_relative_path(_path_setting("agents_dir"), label="agents_dir")
AGENTCTL_DOCS_PATH = _resolve_repo_relative_path(_path_setting("agentctl_docs_path"), label="agentctl_docs_path")
WORKFLOW_DIR = _resolve_repo_relative_path(_path_setting("workflow_dir"), label="workflow_dir")
WORKTREES_DIRNAME = _optional_path_setting("worktrees_dir", default=DEFAULT_WORKTREES_DIRNAME)
WORKTREES_DIR = _resolve_repo_relative_path(WORKTREES_DIRNAME, label="paths.worktrees_dir")
TASKS_PATH_REL = str(TASKS_PATH.relative_to(ROOT))
load_env_file(ROOT / ".env")
BACKEND_CONFIG = load_backend_config()
BACKEND_CLASS = load_backend_class(BACKEND_CONFIG) if BACKEND_CONFIG else None
_BACKEND_INSTANCE: object | None = None


def backend_enabled() -> bool:
    return BACKEND_CLASS is not None


def backend_settings() -> JsonDict:
    settings = BACKEND_CONFIG.get("settings") if isinstance(BACKEND_CONFIG, dict) else None
    return settings if isinstance(settings, dict) else {}


def backend_instance() -> object | None:
    global _BACKEND_INSTANCE
    if not backend_enabled():
        return None
    if _BACKEND_INSTANCE is not None:
        return _BACKEND_INSTANCE
    backend_cls = cast(Callable[..., object] | None, BACKEND_CLASS)
    if backend_cls is None:
        return None
    try:
        _BACKEND_INSTANCE = backend_cls(backend_settings())
    except TypeError:
        _BACKEND_INSTANCE = backend_cls()
    return _BACKEND_INSTANCE


def workflow_mode() -> str:
    raw = str(_SWARM_CONFIG.get("workflow_mode") or "").strip() or DEFAULT_WORKFLOW_MODE
    if raw not in ALLOWED_WORKFLOW_MODES:
        die(
            f"Invalid workflow_mode in {SWARM_CONFIG_PATH}: {raw!r} "
            f"(allowed: {', '.join(sorted(ALLOWED_WORKFLOW_MODES))})",
            code=2,
        )
    return raw


def is_branch_pr_mode() -> bool:
    return workflow_mode() == "branch_pr"


def is_direct_mode() -> bool:
    return workflow_mode() == "direct"


def task_id_suffix_length_default() -> int:
    raw = tasks_config().get("id_suffix_length_default")
    if raw is None:
        return DEFAULT_TASK_ID_SUFFIX_LENGTH
    if isinstance(raw, bool) or not isinstance(raw, int):
        die(
            f"{SWARM_CONFIG_PATH} tasks.id_suffix_length_default must be an integer "
            f"(got: {raw!r})",
            code=2,
        )
    if raw < 4 or raw > 12:
        die(
            f"{SWARM_CONFIG_PATH} tasks.id_suffix_length_default must be between 4 and 12 "
            f"(got: {raw})",
            code=2,
        )
    return raw


def verify_required_tags() -> set[str]:
    verify_cfg = _config_dict(tasks_config().get("verify"), label="tasks.verify")
    raw = verify_cfg.get("required_tags")
    if raw is None:
        return set(DEFAULT_VERIFY_REQUIRED_TAGS)
    if not isinstance(raw, list):
        die(f"{SWARM_CONFIG_PATH} tasks.verify.required_tags must be a list", code=2)
    tags = [str(tag).strip().lower() for tag in raw if str(tag).strip()]
    return set(tags)


def task_doc_sections() -> tuple[str, ...]:
    doc_cfg = _config_dict(tasks_config().get("doc"), label="tasks.doc")
    raw = doc_cfg.get("sections")
    if raw is None:
        return DEFAULT_TASK_DOC_SECTIONS
    if not isinstance(raw, list):
        die(f"{SWARM_CONFIG_PATH} tasks.doc.sections must be a list", code=2)
    sections = [str(section).strip() for section in raw if str(section).strip()]
    if not sections:
        die(f"{SWARM_CONFIG_PATH} tasks.doc.sections must include at least one entry", code=2)
    return tuple(dict.fromkeys(sections))


def task_doc_required_sections() -> tuple[str, ...]:
    # Validate required sections against the configured section list.
    doc_cfg = _config_dict(tasks_config().get("doc"), label="tasks.doc")
    raw = doc_cfg.get("required_sections")
    if raw is None:
        return DEFAULT_TASK_DOC_REQUIRED_SECTIONS
    if not isinstance(raw, list):
        die(f"{SWARM_CONFIG_PATH} tasks.doc.required_sections must be a list", code=2)
    required = [str(section).strip() for section in raw if str(section).strip()]
    if not required:
        return tuple()
    sections = task_doc_sections()
    missing = [section for section in required if section not in sections]
    if missing:
        die(
            f"{SWARM_CONFIG_PATH} tasks.doc.required_sections contains unknown section(s): "
            f"{', '.join(missing)}",
            code=2,
        )
    return tuple(dict.fromkeys(required))


def comment_rule(kind: str) -> tuple[str, int]:
    defaults = DEFAULT_COMMENT_RULES.get(kind) or {}
    default_prefix = str(defaults.get("prefix") or "").strip()
    default_min_chars = int(defaults.get("min_chars") or 0)
    if not default_prefix or default_min_chars < 1:
        die(f"Invalid default comment rule for {kind!r}", code=2)
    comments_cfg = _config_dict(tasks_config().get("comments"), label="tasks.comments")
    raw = comments_cfg.get(kind)
    if raw is None:
        return default_prefix, default_min_chars
    if not isinstance(raw, dict):
        die(f"{SWARM_CONFIG_PATH} tasks.comments.{kind} must be a JSON object", code=2)
    prefix = str(raw.get("prefix") or default_prefix).strip()
    if not prefix:
        die(f"{SWARM_CONFIG_PATH} tasks.comments.{kind}.prefix must be a non-empty string", code=2)
    min_chars = raw.get("min_chars", default_min_chars)
    if isinstance(min_chars, bool) or not isinstance(min_chars, int) or min_chars < 1:
        die(
            f"{SWARM_CONFIG_PATH} tasks.comments.{kind}.min_chars must be an integer >= 1",
            code=2,
        )
    return prefix, min_chars


def task_branch_prefix() -> str:
    raw = branch_config().get("task_prefix")
    if raw is None:
        return DEFAULT_TASK_BRANCH_PREFIX
    if not isinstance(raw, str) or not raw.strip():
        die(f"{SWARM_CONFIG_PATH} branch.task_prefix must be a non-empty string", code=2)
    prefix = raw.strip()
    if "/" in prefix:
        die(f"{SWARM_CONFIG_PATH} branch.task_prefix must not contain '/'", code=2)
    return prefix


def commit_generic_tokens() -> set[str]:
    raw = commit_config().get("generic_tokens")
    if raw is None:
        return set(DEFAULT_GENERIC_COMMIT_TOKENS)
    if not isinstance(raw, list):
        die(f"{SWARM_CONFIG_PATH} commit.generic_tokens must be a list", code=2)
    tokens = [str(token).strip().lower() for token in raw if str(token).strip()]
    return set(tokens)


STATUS_COMMIT_POLICIES = {"allow", "warn", "confirm"}
DEFAULT_STATUS_COMMIT_POLICY = "allow"


def status_commit_policy() -> str:
    raw = str(_SWARM_CONFIG.get("status_commit_policy") or "").strip().lower()
    if not raw:
        return DEFAULT_STATUS_COMMIT_POLICY
    if raw not in STATUS_COMMIT_POLICIES:
        die(
            f"Invalid status_commit_policy in {SWARM_CONFIG_PATH}: {raw!r} "
            f"(expected one of {', '.join(sorted(STATUS_COMMIT_POLICIES))})",
            code=2,
        )
    return raw


def finish_auto_status_commit() -> bool:
    raw = _SWARM_CONFIG.get("finish_auto_status_commit")
    if raw is None:
        return False
    if isinstance(raw, bool):
        return raw
    die(
        f"Invalid finish_auto_status_commit in {SWARM_CONFIG_PATH}: {raw!r} "
        "(expected true/false)",
        code=2,
    )


def enforce_status_commit_policy(*, action: str, confirmed: bool, quiet: bool) -> None:
    policy = status_commit_policy()
    if policy == "allow":
        return
    if policy == "warn":
        if not quiet and not confirmed:
            print(
                f"⚠️ {action}: status/comment-driven commit requested; "
                "policy=warn (pass --confirm-status-commit to acknowledge)",
                file=sys.stderr,
            )
        return
    if policy == "confirm" and not confirmed:
        die(
            f"{action}: status/comment-driven commit blocked by status_commit_policy='confirm' "
            "(pass --confirm-status-commit to proceed)",
            code=2,
        )


DEFAULT_BASE_BRANCH = "main"
GIT_CONFIG_BASE_BRANCH_KEY = "agentplane.baseBranch"


def config_base_branch() -> str:
    return str(_SWARM_CONFIG.get("base_branch") or "").strip()


def pinned_base_branch(*, cwd: Path = ROOT) -> str:
    return git_config_get(GIT_CONFIG_BASE_BRANCH_KEY, cwd=cwd)


def maybe_pin_base_branch(*, cwd: Path = ROOT) -> str | None:
    configured = config_base_branch()
    if configured:
        return configured
    existing = pinned_base_branch(cwd=cwd)
    if existing:
        return existing
    branch = git_current_branch(cwd=cwd)
    if not branch or branch == "HEAD":
        return None
    if branch.startswith(f"{TASK_BRANCH_PREFIX}/"):
        return None
    git_config_set(GIT_CONFIG_BASE_BRANCH_KEY, branch, cwd=cwd)
    return branch


def base_branch(*, cwd: Path = ROOT) -> str:
    return config_base_branch() or pinned_base_branch(cwd=cwd) or DEFAULT_BASE_BRANCH


def now_iso_utc() -> str:
    return datetime.now(UTC).replace(microsecond=0).isoformat()


def write_json(path: Path, data: JsonDict) -> None:
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def canonical_tasks_payload(tasks: TaskList) -> str:
    return json.dumps({"tasks": tasks}, sort_keys=True, ensure_ascii=False, separators=(",", ":"))


def tasks_cache_key(tasks: TaskList) -> str:
    return hashlib.sha256(canonical_tasks_payload(tasks).encode("utf-8")).hexdigest()


def compute_tasks_checksum(tasks: TaskList) -> str:
    payload = canonical_tasks_payload(tasks).encode("utf-8")
    return hashlib.sha256(payload).hexdigest()


def update_tasks_meta(data: JsonDict) -> None:
    tasks = data.get("tasks")
    if not isinstance(tasks, list):
        return
    meta_value = data.get(TASKS_META_KEY)
    meta: JsonDict = cast(JsonDict, meta_value) if isinstance(meta_value, dict) else {}
    meta["schema_version"] = TASKS_SCHEMA_VERSION
    meta["managed_by"] = TASKS_META_MANAGED_BY
    meta["checksum_algo"] = "sha256"
    meta["checksum"] = compute_tasks_checksum(ensure_task_list(tasks, label="tasks.json tasks"))
    data[TASKS_META_KEY] = meta


def write_tasks_json(data: JsonDict) -> None:
    update_tasks_meta(data)
    write_json(TASKS_PATH, data)
    if GLOBAL_LINT or AUTO_LINT_ON_WRITE:
        result = lint_tasks_json()
        if result["errors"]:
            for message in result["errors"]:
                print(f"❌ {message}", file=sys.stderr)
            raise SystemExit(2)


def write_tasks_json_to_path(path: Path, data: JsonDict) -> None:
    update_tasks_meta(data)
    write_json(path, data)
    if (GLOBAL_LINT or AUTO_LINT_ON_WRITE) and path.resolve() == TASKS_PATH.resolve():
        result = lint_tasks_json()
        if result["errors"]:
            for message in result["errors"]:
                print(f"❌ {message}", file=sys.stderr)
            raise SystemExit(2)


def ensure_task_list(value: object, *, label: str) -> TaskList:
    if not isinstance(value, list):
        die(f"{label} must be a list", code=2)
    tasks: TaskList = []
    for index, task in enumerate(value):
        if not isinstance(task, dict):
            die(f"{label}[{index}] must be an object", code=2)
        tasks.append(cast(TaskRecord, task))
    return tasks


def coerce_str_list(value: object) -> list[str]:
    if not isinstance(value, list):
        return []
    return [item.strip() for item in value if isinstance(item, str) and item.strip()]


def load_tasks() -> TaskList:
    data = load_json(TASKS_PATH)
    tasks = data.get("tasks", [])
    return ensure_task_list(tasks, label="tasks.json tasks")


def load_task_store() -> tuple[TaskList, Callable[[TaskList], None]]:
    # Backends are optional; fall back to local tasks.json when absent.
    backend = backend_instance()
    if backend is None:
        data = load_json(TASKS_PATH)
        tasks = ensure_task_list(data.get("tasks", []), label="tasks.json tasks")

        def save_local(updated_tasks: TaskList) -> None:
            data["tasks"] = updated_tasks
            write_tasks_json(data)

        return tasks, save_local

    if not supports_task_list_write(backend):
        die("Configured backend must implement list_tasks() and write_task()", code=2)
    global _TASK_CACHE
    tasks = _TASK_CACHE if _TASK_CACHE is not None else backend.list_tasks()
    if not isinstance(tasks, list):
        die("Backend list_tasks() must return a list of tasks", code=2)
    tasks = ensure_task_list(tasks, label="backend tasks")
    tasks_by_id = {str(task.get("id") or ""): task for task in tasks}
    tasks_digest_by_id = {task_id: task_digest(task) for task_id, task in tasks_by_id.items() if task_id}

    def save_backend(updated_tasks: TaskList) -> None:
        global _TASK_CACHE
        changed: TaskList = []
        for task in updated_tasks:
            task_id = str(task.get("id") or "").strip()
            if not task_id:
                continue
            existing_digest = tasks_digest_by_id.get(task_id)
            new_digest = task_digest(task)
            if existing_digest is not None and existing_digest == new_digest:
                continue
            tasks_by_id[task_id] = task
            tasks_digest_by_id[task_id] = new_digest
            changed.append(task)
        if changed:
            if supports_write_tasks(backend):
                backend.write_tasks(changed)
            else:
                for task in changed:
                    backend.write_task(task)
        _TASK_CACHE = updated_tasks
        _TASK_INDEX_CACHE = None
        _TASK_DEP_CACHE = None

    return tasks, save_backend


def _format_list_short(items: list[str], *, max_items: int = 3) -> str:
    if len(items) <= max_items:
        return ", ".join(items)
    shown = ", ".join(items[:max_items])
    return f"{shown}, +{len(items) - max_items}"


def _format_deps_summary(task_id: str, dep_state: DependencyState | None) -> str | None:
    if not dep_state:
        return None
    info = dep_state.get(task_id) or {}
    depends_on = info.get("depends_on") or []
    missing = info.get("missing") or []
    incomplete = info.get("incomplete") or []
    if not depends_on:
        return "deps=none"
    if missing or incomplete:
        parts: list[str] = []
        if missing:
            parts.append(f"missing:{_format_list_short(missing)}")
        if incomplete:
            parts.append(f"wait:{_format_list_short(incomplete)}")
        return "deps=" + ",".join(parts)
    return "deps=ready"


def _format_task_extras(task: TaskRecord, dep_state: DependencyState | None) -> str:
    extras: list[str] = []
    owner = str(task.get("owner") or "").strip()
    if owner:
        extras.append(f"owner={owner}")
    priority = str(task.get("priority") or "").strip()
    if priority:
        extras.append(f"prio={priority}")
    deps_summary = _format_deps_summary(str(task.get("id") or "").strip(), dep_state)
    if deps_summary:
        extras.append(deps_summary)
    tags = coerce_str_list(task.get("tags"))
    if tags:
        extras.append(f"tags={','.join(tags)}")
    commands = coerce_str_list(task.get("verify"))
    if commands:
        extras.append(f"verify={len(commands)}")
    return ", ".join(extras)


def format_task_line(task: TaskRecord, dep_state: DependencyState | None = None) -> str:
    task_id = str(task.get("id") or "").strip()
    title = str(task.get("title") or "").strip() or "(untitled task)"
    status = str(task.get("status") or "TODO").strip().upper()
    line = f"{task_id} [{status}] {title}"
    extras = _format_task_extras(task, dep_state)
    if extras:
        line += f" ({extras})"
    return line


def cmd_task_list(args: argparse.Namespace) -> None:
    tasks, tasks_by_id, warnings, key = load_task_index()
    dep_state, dep_warnings = load_dependency_state_for(tasks_by_id, key=key)
    warnings = warnings + dep_warnings
    if warnings and not args.quiet:
        for warning in warnings:
            print(f"⚠️ {warning}")
    tasks_sorted = sorted(tasks_by_id.values(), key=lambda t: str(t.get("id") or ""))
    if args.status:
        want = {s.strip().upper() for s in args.status}
        tasks_sorted = [t for t in tasks_sorted if str(t.get("status") or "TODO").strip().upper() in want]
    if args.owner:
        want_owner = {o.strip().upper() for o in args.owner}
        tasks_sorted = [t for t in tasks_sorted if str(t.get("owner") or "").strip().upper() in want_owner]
    if args.tag:
        want_tag = {t.strip() for t in args.tag}
        filtered: TaskList = []
        for task in tasks_sorted:
            tags = coerce_str_list(task.get("tags"))
            if any(tag in want_tag for tag in tags):
                filtered.append(task)
        tasks_sorted = filtered
    for task in tasks_sorted:
        print(format_task_line(task, dep_state=dep_state))
    if not args.quiet:
        counts: dict[str, int] = {}
        for task in tasks_sorted:
            status = str(task.get("status") or "TODO").strip().upper()
            counts[status] = counts.get(status, 0) + 1
        total = len(tasks_sorted)
        summary = ", ".join(f"{k}={counts[k]}" for k in sorted(counts))
        print(f"Total: {total} ({summary})")


def cmd_task_next(args: argparse.Namespace) -> None:
    tasks, tasks_by_id, warnings, key = load_task_index()
    dep_state, dep_warnings = load_dependency_state_for(tasks_by_id, key=key)
    warnings = warnings + dep_warnings
    if warnings and not args.quiet:
        for warning in warnings:
            print(f"⚠️ {warning}")

    tasks_sorted = sorted(tasks_by_id.values(), key=lambda t: str(t.get("id") or ""))
    statuses = {s.strip().upper() for s in (args.status or ["TODO"])}
    tasks_sorted = [t for t in tasks_sorted if str(t.get("status") or "TODO").strip().upper() in statuses]

    if args.owner:
        want_owner = {o.strip().upper() for o in args.owner}
        tasks_sorted = [t for t in tasks_sorted if str(t.get("owner") or "").strip().upper() in want_owner]
    if args.tag:
        want_tag = {t.strip() for t in args.tag}
        filtered: TaskList = []
        for task in tasks_sorted:
            tags = coerce_str_list(task.get("tags"))
            if any(tag in want_tag for tag in tags):
                filtered.append(task)
        tasks_sorted = filtered

    ready_tasks: TaskList = []
    for task in tasks_sorted:
        task_id = str(task.get("id") or "").strip()
        info = dep_state.get(task_id) or {}
        missing = info.get("missing") or []
        incomplete = info.get("incomplete") or []
        if missing or incomplete:
            continue
        ready_tasks.append(task)

    if args.limit is not None and args.limit >= 0:
        ready_tasks = ready_tasks[: args.limit]
    for task in ready_tasks:
        print(format_task_line(task, dep_state=dep_state))
    if not args.quiet:
        print(f"Ready: {len(ready_tasks)} / {len(tasks_sorted)}")


def _task_text_blob(task: TaskRecord) -> str:
    parts: list[str] = []
    for key in ("id", "title", "description", "status", "priority", "owner"):
        value = task.get(key)
        if isinstance(value, str) and value.strip():
            parts.append(value.strip())
    tags = task.get("tags")
    if isinstance(tags, list):
        parts.extend(t for t in tags if isinstance(t, str) and t.strip())
    comments = task.get("comments")
    if isinstance(comments, list):
        for comment in comments:
            if not isinstance(comment, dict):
                continue
            author = comment.get("author")
            body = comment.get("body")
            if isinstance(author, str) and author.strip():
                parts.append(author.strip())
            if isinstance(body, str) and body.strip():
                parts.append(body.strip())
    commit = task.get("commit")
    if isinstance(commit, dict):
        for key in ("hash", "message"):
            value = commit.get(key)
            if isinstance(value, str) and value.strip():
                parts.append(value.strip())
    return "\n".join(parts)


def cmd_task_search(args: argparse.Namespace) -> None:
    query = args.query.strip()
    if not query:
        die("Query must be non-empty", code=2)

    _, tasks_by_id, warnings, key = load_task_index()
    dep_state, dep_warnings = load_dependency_state_for(tasks_by_id, key=key)
    warnings = warnings + dep_warnings
    if warnings and not args.quiet:
        for warning in warnings:
            print(f"⚠️ {warning}")

    tasks_sorted = sorted(tasks_by_id.values(), key=lambda t: str(t.get("id") or ""))
    if args.status:
        want = {s.strip().upper() for s in args.status}
        tasks_sorted = [t for t in tasks_sorted if str(t.get("status") or "TODO").strip().upper() in want]
    if args.owner:
        want_owner = {o.strip().upper() for o in args.owner}
        tasks_sorted = [t for t in tasks_sorted if str(t.get("owner") or "").strip().upper() in want_owner]
    if args.tag:
        want_tag = {t.strip() for t in args.tag}
        filtered: TaskList = []
        for task in tasks_sorted:
            tags = coerce_str_list(task.get("tags"))
            if any(tag in want_tag for tag in tags):
                filtered.append(task)
        tasks_sorted = filtered

    if args.regex:
        try:
            pattern = re.compile(query, flags=re.IGNORECASE)
        except re.error as exc:
            die(f"Invalid regex: {exc}", code=2)
        matches = [t for t in tasks_sorted if pattern.search(_task_text_blob(t) or "")]
    else:
        q = query.lower()
        matches = [t for t in tasks_sorted if q in (_task_text_blob(t) or "").lower()]

    if args.limit is not None and args.limit >= 0:
        matches = matches[: args.limit]
    for task in matches:
        print(format_task_line(task, dep_state=dep_state))


def cmd_task_scaffold(args: argparse.Namespace) -> None:
    task_id = args.task_id.strip()
    if not task_id:
        die("task_id must be non-empty", code=2)

    title = args.title
    task: TaskRecord | None = None
    if not title and not args.force:
        tasks, _ = load_task_store()
        task = _ensure_task_object(tasks, task_id)
        title = str(task.get("title") or "").strip()

    target = workflow_task_readme_path(task_id)
    if target.exists() and not args.overwrite:
        die(f"File already exists: {target}", code=2)

    target.parent.mkdir(parents=True, exist_ok=True)
    frontmatter = ""
    if target.exists():
        frontmatter, _ = split_frontmatter_block(target.read_text(encoding="utf-8", errors="replace"))
    backend = backend_instance()
    if backend is not None and task is not None and supports_task_list_write(backend):
        backend.write_task(task)
        frontmatter, _ = split_frontmatter_block(target.read_text(encoding="utf-8", errors="replace"))
    template = task_readme_template(task_id)
    if frontmatter:
        frontmatter = apply_doc_metadata_to_frontmatter_text(frontmatter)
        content = frontmatter.rstrip() + "\n\n" + template + "\n"
    else:
        content = template + "\n"
    target.write_text(content, encoding="utf-8")
    if not args.quiet:
        print(f"✅ wrote {target.relative_to(ROOT)}")


def cmd_task_show(args: argparse.Namespace) -> None:
    _, tasks_by_id, warnings, key = load_task_index()
    dep_state, dep_warnings = load_dependency_state_for(tasks_by_id, key=key)
    warnings = warnings + dep_warnings
    if warnings and not args.quiet:
        for warning in warnings:
            print(f"⚠️ {warning}")
    task = tasks_by_id.get(args.task_id)
    if not task:
        die(f"Unknown task id: {args.task_id}")

    task_id = str(task.get("id") or "").strip()
    print(f"ID: {task_id}")
    print(f"Title: {str(task.get('title') or '').strip()}")
    status = str(task.get("status") or "TODO").strip().upper()
    print(f"Status: {status}")
    print(f"Priority: {str(task.get('priority') or '-').strip()}")
    owner = str(task.get("owner") or "-").strip()
    print(f"Owner: {owner if owner else '-'}")
    redmine_id = task.get("redmine_id")
    if redmine_id is not None:
        print(f"Redmine ID: {redmine_id}")
    depends_on, _ = normalize_depends_on(task.get("depends_on"))
    print(f"Depends on: {', '.join(depends_on) if depends_on else '-'}")
    info = dep_state.get(task_id) or {}
    missing = info.get("missing") or []
    incomplete = info.get("incomplete") or []
    ready = not missing and not incomplete
    print(f"Ready: {'yes' if ready else 'no'}")
    if missing:
        print(f"Missing deps: {', '.join(missing)}")
    if incomplete:
        print(f"Incomplete deps: {', '.join(incomplete)}")
    tags = coerce_str_list(task.get("tags"))
    tags_str = ", ".join(tags)
    print(f"Tags: {tags_str if tags_str else '-'}")
    doc_version = task.get("doc_version")
    doc_updated_at = task.get("doc_updated_at")
    doc_updated_by = task.get("doc_updated_by")
    if doc_version or doc_updated_at or doc_updated_by:
        doc_parts: list[str] = []
        if doc_version:
            doc_parts.append(f"v{doc_version}")
        if doc_updated_at:
            doc_parts.append(f"updated_at={doc_updated_at}")
        if doc_updated_by:
            doc_parts.append(f"updated_by={doc_updated_by}")
        print(f"Doc: {', '.join(doc_parts)}")
    readme_path = workflow_task_readme_path(task_id)
    if readme_path.exists():
        print(f"Doc file: {readme_path.relative_to(ROOT)}")
    description = str(task.get("description") or "").strip()
    if description:
        print()
        print("Description:")
        print(description)
    verify = task.get("verify")
    if isinstance(verify, list):
        commands = [cmd.strip() for cmd in verify if isinstance(cmd, str) and cmd.strip()]
        print()
        print(f"Verify ({len(commands)}):")
        if commands:
            for cmd in commands:
                print(f"- {cmd}")
        else:
            print("- (none)")
    commit = task.get("commit") or {}
    if isinstance(commit, dict) and commit.get("hash"):
        print()
        print("Commit:")
        print(f"{commit.get('hash')} {commit.get('message') or ''}".rstrip())
    comments = task.get("comments") or []
    if isinstance(comments, list) and comments:
        print()
        print(f"Comments (total {len(comments)}, showing last {args.last_comments}):")
        for comment in comments[-args.last_comments :]:
            if not isinstance(comment, dict):
                continue
            author = str(comment.get("author") or "unknown")
            body = str(comment.get("body") or "").strip()
            print(f"- {author}: {body}")


def cmd_task_doc_show(args: argparse.Namespace) -> None:
    backend = backend_instance()
    if backend is None:
        die(
            "No backend configured (set tasks_backend.config_path in .agent-plane/config.json)",
            code=2,
        )
    if not supports_get_task_doc(backend):
        die("Configured backend does not support task docs", code=2)
    doc = str(backend.get_task_doc(args.task_id) or "")
    if args.section:
        section_name = normalize_doc_section_name(args.section)
        sections, _ = parse_doc_sections(doc)
        content = sections.get(section_name, [])
        if content:
            print("\n".join(content).rstrip())
            return
        if not args.quiet:
            print(f"ℹ️ no content for section: {section_name}")
        return
    if doc:
        print(doc.rstrip())
        return
    if not args.quiet:
        print("ℹ️ no task doc metadata")


def cmd_task_doc_set(args: argparse.Namespace) -> None:
    backend = backend_instance()
    if backend is None:
        die(
            "No backend configured (set tasks_backend.config_path in .agent-plane/config.json)",
            code=2,
        )
    if not supports_set_task_doc(backend):
        die("Configured backend does not support task docs", code=2)
    backend_set_doc: BackendSetTaskDoc = backend
    if args.text and args.file:
        die("Use only one of --text or --file", code=2)
    if args.text:
        doc = args.text
    elif args.file:
        source = args.file
        if source == "-":
            doc = sys.stdin.read()
        else:
            path = _resolve_repo_relative_path(source, label="task doc source")
            doc = path.read_text(encoding="utf-8")
    else:
        die("Provide --text or --file to set task docs", code=2)
    if args.section:
        if not supports_get_task_doc(backend):
            die("Configured backend does not support task doc reads", code=2)
        backend_get_doc: BackendGetTaskDoc = backend
        existing = str(backend_get_doc.get_task_doc(args.task_id) or "")
        sections, order = parse_doc_sections(existing)
        order = ensure_required_doc_sections(sections, order)
        section_name = normalize_doc_section_name(args.section)
        if not section_name:
            die("--section must be non-empty", code=2)
        sections[section_name] = [line.rstrip() for line in doc.splitlines()]
        order = _insert_section_order(order, section_name)
        doc = render_doc_sections(sections, order)
    backend_set_doc.set_task_doc(args.task_id, doc)
    if not args.quiet:
        print(f"✅ updated task doc for {args.task_id}")


def export_tasks_snapshot(out_path: Path | None = None, *, quiet: bool = False) -> None:
    target_path = out_path or _resolve_repo_relative_path(TASKS_PATH_REL, label="task export output")
    backend = backend_instance()
    if backend is not None and supports_export_tasks(backend):
        backend.export_tasks_json(target_path)
    else:
        tasks, _ = load_task_store()
        write_tasks_json_to_path(target_path, {"tasks": tasks})
    if not quiet:
        print(f"✅ exported tasks to {target_path.relative_to(ROOT)}")


def cmd_task_export(args: argparse.Namespace) -> None:
    fmt = str(args.format or "json").strip().lower()
    if fmt != "json":
        die(f"Unsupported export format: {fmt}", code=2)
    out_raw = str(args.out or TASKS_PATH_REL).strip()
    out_path = _resolve_repo_relative_path(out_raw, label="task export output")
    export_tasks_snapshot(out_path, quiet=bool(args.quiet))


def cmd_task_normalize(args: argparse.Namespace) -> None:
    require_tasks_json_write_context(force=bool(args.force))
    backend = backend_instance()
    if backend is None:
        die(
            "No backend configured (set tasks_backend.config_path in .agent-plane/config.json)",
            code=2,
        )
    if supports_normalize_tasks(backend):
        count = backend.normalize_tasks()
    else:
        if not supports_task_list_write(backend):
            die("Configured backend does not support normalize_tasks()", code=2)
        tasks = backend.list_tasks()
        normalized = ensure_task_list(tasks, label="backend tasks")
        if supports_write_tasks(backend):
            backend.write_tasks(normalized)
        else:
            for task in normalized:
                backend.write_task(task)
        count = len(normalized)
    global _TASK_CACHE
    _TASK_CACHE = None
    if not args.quiet:
        print(f"✅ normalized {count} task(s)")


def cmd_task_migrate(args: argparse.Namespace) -> None:
    require_tasks_json_write_context(force=bool(args.force))
    backend = backend_instance()
    if backend is None:
        die(
            "No backend configured (set tasks_backend.config_path in .agent-plane/config.json)",
            code=2,
        )
    if not supports_write_task(backend) and not supports_write_tasks(backend):
        die("Configured backend does not support write_task()", code=2)
    source_raw = str(args.source or TASKS_PATH_REL).strip()
    source_path = _resolve_repo_relative_path(source_raw, label="task migrate source")
    data = load_json(source_path)
    tasks = ensure_task_list(data.get("tasks"), label="tasks.json tasks")
    if supports_write_tasks(backend):
        backend.write_tasks(tasks)
    else:
        backend_write_task = cast(BackendWriteTask, backend)
        for task in tasks:
            backend_write_task.write_task(task)
    if not args.quiet:
        print(f"✅ migrated {len(tasks)} task(s) into backend")


def load_backend_module(backend_id: str, module_path: Path) -> object:
    module_name = f"agentplane_backend_{backend_id}"
    module = sys.modules.get(module_name)
    if module is not None:
        return module
    spec = importlib.util.spec_from_file_location(module_name, module_path)
    if not spec or not spec.loader:
        die(f"Failed to load backend module: {module_path}", code=2)
    module = importlib.util.module_from_spec(spec)
    sys.modules[module_name] = module
    spec.loader.exec_module(module)
    return module


def cmd_sync(args: argparse.Namespace) -> None:
    backend = backend_instance()
    if backend is None:
        die(
            "No backend configured (set tasks_backend.config_path in .agent-plane/config.json)",
            code=2,
        )
    backend_id = str(BACKEND_CONFIG.get("id") or "").strip()
    if args.backend and backend_id and args.backend != backend_id:
        die(f"Configured backend is {backend_id!r}, not {args.backend!r}", code=2)
    if not supports_sync_tasks(backend):
        die("Configured backend does not support sync()", code=2)
    backend.sync(
        direction=args.direction,
        conflict=args.conflict,
        quiet=args.quiet,
        confirm=bool(getattr(args, "yes", False)),
    )


def index_tasks_by_id(tasks: TaskList) -> tuple[TaskIndex, list[str]]:
    warnings: list[str] = []
    tasks_by_id: TaskIndex = {}
    for index, task in enumerate(tasks):
        task_id = str(task.get("id") or "").strip()
        if not task_id:
            warnings.append(f"tasks[{index}] is missing a non-empty id")
            continue
        if task_id in tasks_by_id:
            warnings.append(f"Duplicate task id found: {task_id} (keeping first, ignoring later entries)")
            continue
        tasks_by_id[task_id] = task
    return tasks_by_id, warnings


def normalize_depends_on(value: object) -> tuple[list[str], list[str]]:
    if value is None:
        return [], []
    if not isinstance(value, list):
        return [], ["depends_on must be a list of task IDs"]
    errors: list[str] = []
    normalized: list[str] = []
    seen: set[str] = set()
    for raw in value:
        if not isinstance(raw, str):
            errors.append("depends_on entries must be strings")
            continue
        task_id = raw.strip()
        if not task_id or task_id in seen:
            continue
        seen.add(task_id)
        normalized.append(task_id)
    return normalized, errors


def detect_cycles(edges: dict[str, list[str]]) -> list[list[str]]:
    cycles: list[list[str]] = []
    visiting: set[str] = set()
    visited: set[str] = set()
    stack: list[str] = []

    def visit(node: str) -> None:
        if node in visited:
            return
        if node in visiting:
            if node in stack:
                start = stack.index(node)
                cycles.append(stack[start:] + [node])
            return
        visiting.add(node)
        stack.append(node)
        for dep in edges.get(node, []):
            if dep in edges:
                visit(dep)
        stack.pop()
        visiting.remove(node)
        visited.add(node)

    for node in edges:
        visit(node)
    return cycles


def compute_dependency_state(tasks_by_id: TaskIndex) -> tuple[DependencyState, list[str]]:
    warnings: list[str] = []
    state: DependencyState = {}
    edges: dict[str, list[str]] = {}

    for task_id, task in tasks_by_id.items():
        depends_on, dep_errors = normalize_depends_on(task.get("depends_on"))
        if dep_errors:
            warnings.append(f"{task_id}: " + "; ".join(sorted(set(dep_errors))))
        if task_id in depends_on:
            warnings.append(f"{task_id}: depends_on contains itself")
        missing: list[str] = []
        incomplete: list[str] = []
        for dep_id in depends_on:
            dep_task = tasks_by_id.get(dep_id)
            if not dep_task:
                missing.append(dep_id)
                continue
            if dep_task.get("status") != "DONE":
                incomplete.append(dep_id)
                continue
            commit = dep_task.get("commit") or {}
            if (
                not isinstance(commit, dict)
                or not str(commit.get("hash") or "").strip()
                or not str(commit.get("message") or "").strip()
            ):
                incomplete.append(dep_id)
        state[task_id] = {
            "depends_on": depends_on,
            "missing": sorted(set(missing)),
            "incomplete": sorted(set(incomplete)),
        }
        edges[task_id] = depends_on

    cycles = detect_cycles(edges)
    if cycles:
        warnings.extend("Dependency cycle detected: " + " -> ".join(cycle) for cycle in cycles)

    return state, warnings


def readiness(task_id: str) -> tuple[bool, list[str]]:
    _, tasks_by_id, index_warnings, key = load_task_index()
    dep_state, dep_warnings = load_dependency_state_for(tasks_by_id, key=key)
    warnings = index_warnings + dep_warnings

    task = tasks_by_id.get(task_id)
    if not task:
        return False, [*warnings, f"Unknown task id: {task_id}"]

    info = dep_state.get(task_id) or {}
    missing = info.get("missing") or []
    incomplete = info.get("incomplete") or []

    if missing:
        warnings.append(f"{task_id}: missing deps: {', '.join(missing)}")
    if incomplete:
        warnings.append(f"{task_id}: incomplete deps: {', '.join(incomplete)}")

    return (not missing and not incomplete), warnings


def get_commit_info(rev: str, *, cwd: Path = ROOT) -> dict[str, str]:
    try:
        result = run(["git", "show", "-s", "--pretty=format:%H\x1f%s", rev], cwd=cwd, check=True)
    except subprocess.CalledProcessError as exc:
        die(exc.stderr.strip() or f"Failed to resolve git revision: {rev}")
    raw = (result.stdout or "").strip()
    if "\x1f" not in raw:
        die(f"Unexpected git output for rev {rev}")
    commit_hash, subject = raw.split("\x1f", 1)
    return {"hash": commit_hash.strip(), "message": subject.strip()}


def git_staged_files(*, cwd: Path) -> list[str]:
    try:
        result = run(["git", "diff", "--name-only", "--cached"], cwd=cwd, check=True)
    except subprocess.CalledProcessError as exc:
        die(exc.stderr.strip() or "Failed to read staged files")
    return [line.strip() for line in (result.stdout or "").splitlines() if line.strip()]


def git_unstaged_files(*, cwd: Path) -> list[str]:
    try:
        result = run(["git", "diff", "--name-only"], cwd=cwd, check=True)
    except subprocess.CalledProcessError as exc:
        die(exc.stderr.strip() or "Failed to read unstaged files")
    return [line.strip() for line in (result.stdout or "").splitlines() if line.strip()]


def git_status_changed_paths(*, cwd: Path) -> list[str]:
    try:
        result = run(["git", "status", "--porcelain"], cwd=cwd, check=True)
    except subprocess.CalledProcessError as exc:
        die(exc.stderr.strip() or "Failed to read git status")
    paths: list[str] = []
    for raw in (result.stdout or "").splitlines():
        line = raw.rstrip()
        if len(line) < 3:
            continue
        entry = line[3:]
        if " -> " in entry:
            entry = entry.split(" -> ", 1)[1]
        entry = entry.strip()
        if entry:
            paths.append(entry)
    return paths


def suggest_allow_prefixes(paths: Iterable[str]) -> list[str]:
    prefixes: list[str] = []
    for raw in paths:
        path = raw.strip().lstrip("./")
        if not path:
            continue
        if "/" not in path:
            prefixes.append(path)
            continue
        prefixes.append(path.rsplit("/", 1)[0])
    return sorted(set(prefixes))


def path_is_under(path: str, prefix: str) -> bool:
    p = path.strip().lstrip("./")
    root = prefix.strip().lstrip("./").rstrip("/")
    if not root:
        return False
    return p == root or p.startswith(root + "/")


TASK_BRANCH_PREFIX = task_branch_prefix()
_TASK_BRANCH_RE = re.compile(
    rf"^{re.escape(TASK_BRANCH_PREFIX)}/(\d{{12}}-[0-9A-Z]{{4,}})/[^/]+$"
)
_VERIFIED_SHA_RE = re.compile(r"verified_sha=([0-9a-f]{7,40})", re.IGNORECASE)


def parse_task_id_from_task_branch(branch: str) -> str | None:
    raw = (branch or "").strip()
    match = _TASK_BRANCH_RE.match(raw)
    if not match:
        return None
    return match.group(1)


def task_branch_example(task_id: str = "<task-id>", slug: str = "<slug>") -> str:
    return f"{TASK_BRANCH_PREFIX}/{task_id}/{slug}"


def load_local_frontmatter_helpers() -> (
    tuple[Callable[[str], object], Callable[[dict[str, object]], str], int, str] | None
):
    helpers: list[tuple[Callable[[str], object], Callable[[dict[str, object]], str], int, str]] = []
    candidates: list[tuple[str, Path]] = []

    module_path = Path(str(BACKEND_CONFIG.get("_module_path") or "")).resolve()
    if module_path.exists():
        candidates.append((str(BACKEND_CONFIG.get("id") or "backend"), module_path))

    local_module = (ROOT / ".agent-plane/backends/local/backend.py").resolve()
    if local_module.exists():
        candidates.insert(0, ("local", local_module))

    seen: set[Path] = set()
    for backend_id, path in candidates:
        resolved = path.resolve()
        if resolved in seen:
            continue
        seen.add(resolved)
        module = load_backend_module(backend_id, resolved)
        parse_frontmatter = getattr(module, "parse_frontmatter", None)
        format_frontmatter = getattr(module, "format_frontmatter", None)
        if not callable(parse_frontmatter) or not callable(format_frontmatter):
            continue
        expected_version = int(getattr(module, "DOC_VERSION", 2))
        expected_by = str(getattr(module, "DOC_UPDATED_BY", "agentctl"))
        helpers.append((parse_frontmatter, format_frontmatter, expected_version, expected_by))
        break

    return helpers[0] if helpers else None


def validate_task_readme_metadata(paths: list[str], *, cwd: Path) -> None:
    readmes = [path for path in paths if path.startswith(".agent-plane/tasks/") and path.endswith("/README.md")]
    if not readmes:
        return
    helpers = load_local_frontmatter_helpers()
    if not helpers:
        return
    parse_frontmatter, _, expected_version, expected_by = helpers
    for path in readmes:
        target = cwd / path
        if not target.exists():
            continue
        content = target.read_text(encoding="utf-8", errors="replace")
        doc = parse_frontmatter(content)
        frontmatter = getattr(doc, "frontmatter", {}) or {}
        updated_by = str(frontmatter.get("doc_updated_by") or "").strip()
        updated_at = str(frontmatter.get("doc_updated_at") or "").strip()
        doc_version = frontmatter.get("doc_version")
        if updated_by != expected_by or not updated_at or str(doc_version) != str(expected_version):
            die(
                "\n".join(
                    [
                        f"Task README {path} is missing agentctl doc metadata.",
                        "Fix:",
                        "  1) Use `python .agent-plane/agentctl.py task doc set ...` to update task docs",
                        "  2) Re-stage the README after agentctl updates it",
                    ]
                ),
                code=2,
            )


def apply_doc_metadata_to_frontmatter_text(frontmatter_text: str) -> str:
    helpers = load_local_frontmatter_helpers()
    if not helpers:
        return frontmatter_text
    parse_frontmatter, format_frontmatter, expected_version, expected_by = helpers
    parsed = parse_frontmatter(frontmatter_text)
    frontmatter = dict(getattr(parsed, "frontmatter", {}) or {})
    frontmatter["doc_version"] = expected_version
    frontmatter["doc_updated_at"] = now_iso_utc()
    frontmatter["doc_updated_by"] = expected_by
    return format_frontmatter(frontmatter)


def extract_last_verified_sha_from_log(text: str) -> str | None:
    for raw_line in reversed((text or "").splitlines()):
        match = _VERIFIED_SHA_RE.search(raw_line)
        if match:
            return match.group(1)
    return None


def guard_commit_check(
    *,
    task_id: str,
    message: str,
    allow: list[str],
    allow_tasks: bool,
    require_clean: bool,
    quiet: bool,
    cwd: Path,
) -> None:
    # Enforce commit subject rules, allowlists, and branch/worktree constraints.
    if not commit_subject_mentions_task(task_id, message):
        die(commit_subject_missing_error([task_id], message), code=2)
    if not commit_message_has_meaningful_summary(task_id, message):
        die(
            "Commit message is too generic; include a short summary (and constraints when relevant), "
            'e.g. "✨ <task-id> Add X (no network)"',
            code=2,
        )

    staged = git_staged_files(cwd=cwd)
    if not staged:
        die("No staged files", code=2)

    current_branch = git_current_branch(cwd=cwd)
    integration_branch = base_branch(cwd=cwd)
    if is_branch_pr_mode():
        if not allow_tasks and current_branch == integration_branch:
            base_msg = (
                "Refusing commit: code/docs commits are forbidden on base branch "
                f"{integration_branch!r} in workflow_mode='branch_pr'"
            )
            branch_hint = (
                "  1) Create a task branch + worktree: `python .agent-plane/agentctl.py work start "
                f"{task_id} --agent <AGENT> --slug <slug> --worktree`"
            )
            die(
                "\n".join(
                    [
                        base_msg,
                        "Fix:",
                        branch_hint,
                        f"  2) Commit from `{task_branch_example(task_id, '<slug>')}`",
                        f"Context: {format_command_context(cwd=cwd)}",
                    ]
                ),
                code=2,
            )
        if TASKS_PATH_REL in staged and not allow_tasks:
            tasks_forbidden = f"Refusing commit: {TASKS_PATH_REL} is forbidden in workflow_mode='branch_pr'"
            remove_hint = f"  1) Remove {TASKS_PATH_REL} from the index (`git restore --staged {TASKS_PATH_REL}`)"
            close_hint = (
                f"  3) Close the task on {integration_branch} via INTEGRATOR " "(tasks file only in closure commit)"
            )
            die(
                "\n".join(
                    [
                        tasks_forbidden,
                        "Fix:",
                        remove_hint,
                        "  2) Commit code/docs/PR artifacts on the task branch",
                        close_hint,
                        f"Context: {format_command_context(cwd=cwd)}",
                    ]
                ),
                code=2,
            )
        if TASKS_PATH_REL in staged and allow_tasks:
            if is_task_worktree_checkout(cwd=cwd):
                msg = (
                    f"Refusing commit: {TASKS_PATH_REL} from a worktree checkout "
                    f"({WORKTREES_DIRNAME}/*)\n"
                    f"Context: {format_command_context(cwd=cwd)}"
                )
                die(
                    msg,
                    code=2,
                )
            if current_branch != integration_branch:
                die(
                    f"Refusing commit: {TASKS_PATH_REL} allowed only on {integration_branch!r} in branch_pr mode\n"
                    f"Context: {format_command_context(cwd=cwd)}",
                    code=2,
                )
        if not allow_tasks:
            parsed = parse_task_id_from_task_branch(current_branch)
            if parsed != task_id:
                die(
                    "\n".join(
                        [
                            f"Refusing commit: branch {current_branch!r} does not match task {task_id}",
                            "Fix:",
                            f"  1) Switch to `{task_branch_example(task_id, '<slug>')}`",
                            f"  2) Re-run `python .agent-plane/agentctl.py guard commit {task_id} ...`",
                            f"Context: {format_command_context(cwd=cwd)}",
                        ]
                    ),
                    code=2,
                )

    if not allow:
        die("Provide at least one --allow <path> prefix", code=2)

    unstaged = git_unstaged_files(cwd=cwd)
    if require_clean and unstaged:
        for path in unstaged:
            print(f"❌ unstaged: {path}", file=sys.stderr)
        die("Working tree is dirty", code=2)
    if unstaged and not quiet and not require_clean:
        print(f"⚠️ working tree has {len(unstaged)} unstaged file(s); ignoring (multi-agent workspace)")

    denied = set()
    if not allow_tasks:
        denied.update({TASKS_PATH_REL})

    for path in staged:
        if path in denied:
            die(
                f"Staged file is forbidden by default: {path} (use --allow-tasks to override)",
                code=2,
            )
        if not any(path_is_under(path, allowed) for allowed in allow):
            die(f"Staged file is outside allowlist: {path}", code=2)

    validate_task_readme_metadata(staged, cwd=cwd)

    if not quiet:
        print("✅ guard passed")


def derive_commit_message_from_comment(
    task_id: str,
    body: str,
    emoji: str,
    *,
    formatted_comment: str | None = None,
) -> str:
    summary = formatted_comment if formatted_comment is not None else format_comment_body_for_commit(body)
    summary = " ".join((summary or "").split())
    if not summary:
        die("Comment body is required to build a commit message from the task comment", code=2)
    prefix = (emoji or "").strip()
    if not prefix:
        die("Emoji prefix is required when deriving commit messages from task comments", code=2)
    suffix = task_suffix(task_id)
    if not suffix:
        die(f"Invalid task id: {task_id!r}", code=2)
    return f"{prefix} {suffix} {summary}"


def normalize_comment_body_for_commit(body: str) -> str:
    raw = str(body or "")
    raw = raw.replace("\r\n", "\n").replace("\r", "\n")
    raw = re.sub(r"\n+", " | ", raw)
    raw = re.sub(r"\s+", " ", raw)
    return raw.strip()


def normalize_comment_prefix(prefix: str) -> str:
    label = prefix.strip()
    if label.endswith(":"):
        label = label[:-1]
    return label.strip().lower()


def comment_prefixes_for_commit() -> list[tuple[str, str]]:
    prefixes = []
    for kind in ("start", "blocked", "verified"):
        prefix, _ = comment_rule(kind)
        label = normalize_comment_prefix(prefix)
        if prefix and label:
            prefixes.append((prefix, label))
    return prefixes


def split_comment_prefix(text: str, prefixes: list[tuple[str, str]]) -> tuple[str | None, str]:
    lowered = text.lower()
    for raw_prefix, label in prefixes:
        prefix = raw_prefix.strip()
        if not prefix:
            continue
        if lowered.startswith(prefix.lower()):
            remainder = text[len(prefix) :].strip()
            return label, remainder
    return None, text


def split_summary_and_details(text: str) -> tuple[str, list[str]]:
    cleaned = text.strip()
    if not cleaned:
        return "", []
    for pattern in (r"\s*\|\s*", r"\s*;\s*", r"\s+--\s+", r"\s+-\s+"):
        if re.search(pattern, cleaned):
            parts = [part.strip() for part in re.split(pattern, cleaned) if part.strip()]
            if parts:
                return parts[0], parts[1:]
    sentences = [part.strip() for part in re.split(r"(?<=[.!?])\s+", cleaned) if part.strip()]
    if len(sentences) > 1:
        return sentences[0], sentences[1:]
    return cleaned, []


def format_comment_body_for_commit(body: str) -> str:
    # Normalize structured comments into "summary | details: ..." commit text.
    compact = normalize_comment_body_for_commit(body)
    if not compact:
        return ""
    prefix_label, remainder = split_comment_prefix(compact, comment_prefixes_for_commit())
    summary, details = split_summary_and_details(remainder)
    if not summary:
        summary = remainder or compact
        if summary == compact and prefix_label:
            prefix_label = None
    if prefix_label:
        summary = f"{prefix_label}: {summary}" if summary else prefix_label
    if details:
        details_text = "; ".join(details)
        if details_text:
            return f"{summary} | details: {details_text}"
    return summary


def infer_commit_emoji(text: str) -> str:
    normalized = " ".join(str(text or "").lower().split())
    if not normalized:
        return INTERMEDIATE_COMMIT_EMOJI_FALLBACK
    for emoji, keywords in COMMIT_EMOJI_KEYWORDS:
        for keyword in keywords:
            if not keyword:
                continue
            if re.search(rf"\b{re.escape(keyword)}\b", normalized):
                return emoji
    return INTERMEDIATE_COMMIT_EMOJI_FALLBACK


def default_commit_emoji_for_status(status: str, *, comment_body: str | None = None) -> str:
    normalized = status.strip().upper()
    if normalized == "DOING":
        return START_COMMIT_EMOJI
    if normalized == "DONE":
        return FINISH_COMMIT_EMOJI
    return infer_commit_emoji(comment_body or "")


def stage_allowlist(allow: list[str], *, allow_tasks: bool, cwd: Path) -> list[str]:
    # Stage only changed paths that match the allowlist (optionally excluding tasks.json).
    changed = git_status_changed_paths(cwd=cwd)
    if not changed:
        die("No changes to stage", code=2)
    allowed = [a.strip().lstrip("./") for a in allow if str(a or "").strip()]
    deny: set[str] = set()
    if not allow_tasks:
        deny.add(TASKS_PATH_REL)
    staged: list[str] = []
    for path in changed:
        if path in deny:
            continue
        if any(path_is_under(path, prefix) for prefix in allowed):
            staged.append(path)
    unique = sorted(set(staged))
    if not unique:
        die(
            "No changes matched the allowed prefixes (use --commit-auto-allow or broaden --commit-allow)",
            code=2,
        )
    try:
        run(["git", "add", "--", *unique], cwd=cwd, check=True)
    except subprocess.CalledProcessError as exc:
        die(exc.stderr.strip() or "Failed to stage files")
    return unique


def commit_from_comment(
    *,
    task_id: str,
    comment_body: str,
    formatted_comment: str | None,
    emoji: str,
    allow: list[str],
    auto_allow: bool,
    allow_tasks: bool,
    require_clean: bool,
    quiet: bool,
    cwd: Path,
) -> dict[str, str]:
    allow_prefixes = [a for a in (allow or []) if str(a or "").strip()]
    if auto_allow and not allow_prefixes:
        allow_prefixes = suggest_allow_prefixes(git_status_changed_paths(cwd=cwd))
    allow_prefixes = [a.strip() for a in allow_prefixes if str(a or "").strip()]
    if not allow_prefixes:
        die("Provide at least one --allow prefix or enable --commit-auto-allow", code=2)

    staged = stage_allowlist(allow_prefixes, allow_tasks=allow_tasks, cwd=cwd)
    message = derive_commit_message_from_comment(
        task_id,
        comment_body,
        emoji,
        formatted_comment=formatted_comment,
    )

    guard_commit_check(
        task_id=task_id,
        message=message,
        allow=allow_prefixes,
        allow_tasks=allow_tasks,
        require_clean=require_clean,
        quiet=quiet,
        cwd=cwd,
    )

    try:
        subprocess.run(
            ["git", "commit", "-m", message],
            cwd=str(cwd),
            text=True,
            check=True,
            env=build_hook_env(task_id=task_id, allow_tasks=allow_tasks, allow_base=allow_tasks),
        )
    except subprocess.CalledProcessError as exc:
        die(exc.stderr.strip() or "git commit failed")

    commit_info = get_commit_info("HEAD", cwd=cwd)
    if not quiet:
        staged_display = ", ".join(staged)
        print(f"✅ committed {commit_info['hash'][:12]} {commit_info['message']} (staged: {staged_display})")
    return commit_info


def cmd_agents(_: argparse.Namespace) -> None:
    if not AGENTS_DIR.exists():
        die(f"Missing directory: {AGENTS_DIR}")
    paths = sorted(AGENTS_DIR.glob("*.json"))
    if not paths:
        die(f"No agents found under {AGENTS_DIR}")

    rows: list[tuple[str, str, str]] = []
    seen: dict[str, str] = {}
    duplicates: list[str] = []
    for path in paths:
        data = load_json(path)
        agent_id = str(data.get("id") or "").strip()
        role = str(data.get("role") or "").strip()
        if not agent_id:
            agent_id = "<missing-id>"
        if agent_id in seen:
            duplicates.append(agent_id)
        else:
            seen[agent_id] = path.name
        rows.append((agent_id, role or "-", path.name))

    width_id = max(len(r[0]) for r in [*rows, ("ID", "", "")])
    width_file = max(len(r[2]) for r in [*rows, ("", "", "FILE")])
    print(f"{'ID'.ljust(width_id)}  {'FILE'.ljust(width_file)}  ROLE")
    print(f"{'-'*width_id}  {'-'*width_file}  {'-'*4}")
    for agent_id, role, filename in rows:
        print(f"{agent_id.ljust(width_id)}  {filename.ljust(width_file)}  {role}")

    if duplicates:
        die(f"Duplicate agent ids: {', '.join(sorted(set(duplicates)))}", code=2)


def parse_config_key_path(raw: str) -> list[str]:
    parts = [part.strip() for part in (raw or "").split(".") if part.strip()]
    if not parts:
        die("Config key path must be non-empty (example: tasks.verify.required_tags)", code=2)
    return parts


def set_config_value(data: JsonDict, path: list[str], value: object) -> None:
    target = data
    for key in path[:-1]:
        existing = target.get(key)
        if existing is None:
            target[key] = {}
            existing = target[key]
        if not isinstance(existing, dict):
            die(f"Config path conflict: {'.'.join(path)} (segment {key!r} is not an object)", code=2)
        target = cast(JsonDict, existing)
    target[path[-1]] = value


def cmd_config_show(args: argparse.Namespace) -> None:
    data = load_json(SWARM_CONFIG_PATH)
    output = json.dumps(data, indent=2, ensure_ascii=False)
    print(output)


def cmd_config_set(args: argparse.Namespace) -> None:
    data = load_json(SWARM_CONFIG_PATH)
    path = parse_config_key_path(args.key)
    if getattr(args, "json", False):
        try:
            value = json.loads(args.value)
        except json.JSONDecodeError as exc:
            die(f"Invalid JSON for --json value: {exc}", code=2)
    else:
        value = args.value
    set_config_value(data, path, value)
    write_json(SWARM_CONFIG_PATH, data)
    print(f"✅ updated {SWARM_CONFIG_PATH} ({'.'.join(path)})")


def cmd_quickstart(_: argparse.Namespace) -> None:
    if AGENTCTL_DOCS_PATH.exists():
        print(AGENTCTL_DOCS_PATH.read_text(encoding="utf-8").rstrip())
        return
    print(
        "\n".join(
            [
                "agentctl quickstart",
                "",
                "This repo uses python .agent-plane/agentctl.py to manage tasks.json safely (no manual edits).",
                "",
                "Common commands:",
                "  python .agent-plane/agentctl.py task list",
                "  python .agent-plane/agentctl.py task show <task-id>",
                "  python .agent-plane/agentctl.py task lint",
                "  python .agent-plane/agentctl.py ready <task-id>",
                '  python .agent-plane/agentctl.py start <task-id> --author CODER --body "Start: ..."',
                "  python .agent-plane/agentctl.py verify <task-id>",
                '  python .agent-plane/agentctl.py guard commit <task-id> -m "✨ <task-id> ..." --allow <path-prefix>',
                (
                    "  python .agent-plane/agentctl.py finish <task-id> --commit <git-rev> --author REVIEWER "
                    '--body "Verified: ..."'
                ),
                "",
                f"Tip: create {AGENTCTL_DOCS_PATH.as_posix()} to override this output.",
            ]
        )
    )


def _load_role_blocks(doc_text: str) -> tuple[dict[str, list[str]], list[str]]:
    section_header = "## Role/phase command guide (when to use what)"
    role_prefix = "### "
    blocks: dict[str, list[str]] = {}
    roles: list[str] = []
    in_section = False
    current_role = ""
    current_lines: list[str] = []
    for line in doc_text.splitlines():
        stripped = line.strip()
        if stripped == section_header:
            in_section = True
            continue
        if in_section and stripped.startswith("## "):
            break
        if not in_section:
            continue
        if stripped.startswith(role_prefix):
            if current_role:
                blocks[current_role] = current_lines
                current_lines = []
            current_role = stripped[len(role_prefix) :].strip()
            if current_role:
                roles.append(current_role)
                current_lines.append(line)
            continue
        if current_role:
            current_lines.append(line)
    if current_role:
        blocks[current_role] = current_lines
    return blocks, roles


def cmd_role(args: argparse.Namespace) -> None:
    if not AGENTCTL_DOCS_PATH.exists():
        die(f"Missing {AGENTCTL_DOCS_PATH} (run agentctl quickstart to see default output)")
    role_raw = str(args.role or "").strip()
    if not role_raw:
        die("ROLE is required", code=2)
    role = role_raw.upper()
    doc_text = AGENTCTL_DOCS_PATH.read_text(encoding="utf-8")
    blocks, roles = _load_role_blocks(doc_text)
    normalized = {key.upper(): key for key in blocks}
    role_key = normalized.get(role)
    if not role_key:
        available = ", ".join(sorted(roles)) if roles else "none"
        die(f"Unknown role: {role_raw}. Available roles: {available}", code=2)
    output = "\n".join(blocks[role_key]).rstrip()
    if output:
        print(output)
        return
    die(f"No content found for role: {role_raw}", code=2)


def load_agents_index() -> set[str]:
    if not AGENTS_DIR.exists():
        return set()
    ids: set[str] = set()
    for path in sorted(AGENTS_DIR.glob("*.json")):
        data = load_json(path)
        agent_id = str(data.get("id") or "").strip().upper()
        if agent_id:
            ids.add(agent_id)
    return ids


def validate_owner(owner: str, *, allow_missing_agents: bool = False) -> None:
    owner_upper = str(owner or "").strip().upper()
    if not owner_upper:
        die("owner must be non-empty", code=2)
    extras = {"HUMAN", "ORCHESTRATOR"}
    known = load_agents_index()
    if owner_upper in extras or allow_missing_agents:
        return
    if known and owner_upper not in known:
        die(
            "Owner must be an existing agent id. " "If a new agent is required, create it via CREATOR first.",
            code=2,
        )


def requires_verify(tags: list[str]) -> bool:
    tag_set = {t.strip().lower() for t in tags if isinstance(t, str)}
    return bool(verify_required_tags() & tag_set)


def command_path(args: argparse.Namespace) -> str:
    parts: list[str] = []
    if hasattr(args, "cmd"):
        parts.append(str(args.cmd or "").strip())
    for name in (
        "task_cmd",
        "doc_cmd",
        "guard_cmd",
        "hooks_cmd",
        "pr_cmd",
        "branch_cmd",
        "work_cmd",
        "cleanup_cmd",
        "sync_cmd",
        "config_cmd",
    ):
        val = getattr(args, name, None)
        if val:
            parts.append(str(val).strip())
    return " ".join(p for p in parts if p) or "<unknown>"


def lint_tasks_json() -> dict[str, list[str]]:
    errors: list[str] = []
    warnings: list[str] = []

    data = load_json(TASKS_PATH)
    tasks = data.get("tasks")
    if not isinstance(tasks, list):
        return {"errors": ["tasks.json must contain a top-level 'tasks' list"], "warnings": []}

    meta = data.get(TASKS_META_KEY)
    if not isinstance(meta, dict):
        errors.append("tasks.json is missing a top-level 'meta' object (manual edits are not allowed)")
    else:
        expected = compute_tasks_checksum(tasks)
        checksum = str(meta.get("checksum") or "")
        algo = str(meta.get("checksum_algo") or "")
        managed_by = str(meta.get("managed_by") or "")
        if algo != "sha256":
            errors.append("tasks.json meta.checksum_algo must be 'sha256'")
        if managed_by != TASKS_META_MANAGED_BY:
            errors.append("tasks.json meta.managed_by must be 'agentctl'")
        if not checksum:
            errors.append("tasks.json meta.checksum is missing/empty")
        elif checksum != expected:
            errors.append("tasks.json meta.checksum does not match tasks payload (manual edit?)")

    tasks_by_id, index_warnings = index_tasks_by_id(tasks)
    errors.extend(index_warnings)

    dep_state, dep_warnings = compute_dependency_state(tasks_by_id)
    errors.extend(dep_warnings)

    known_agents = load_agents_index()
    for task_id, task in tasks_by_id.items():
        status = str(task.get("status") or "TODO").strip().upper()
        if status not in ALLOWED_STATUSES:
            errors.append(f"{task_id}: invalid status {status!r}")

        title = task.get("title")
        if not isinstance(title, str) or not title.strip():
            errors.append(f"{task_id}: title must be a non-empty string")

        description = task.get("description")
        if description is not None and (not isinstance(description, str) or not description.strip()):
            errors.append(f"{task_id}: description must be a non-empty string when present")

        owner = task.get("owner")
        if owner is not None and (not isinstance(owner, str) or not owner.strip()):
            errors.append(f"{task_id}: owner must be a non-empty string when present")
        owner_upper = str(owner or "").strip().upper()
        if (
            owner_upper
            and known_agents
            and owner_upper not in known_agents
            and owner_upper not in {"HUMAN", "ORCHESTRATOR"}
        ):
            errors.append(f"{task_id}: owner {owner_upper!r} is not a known agent id")

        tags = coerce_str_list(task.get("tags"))
        verify = coerce_str_list(task.get("verify"))
        if requires_verify(tags) and not verify:
            errors.append(f"{task_id}: verify commands are required for tasks with code/backend/frontend tags")

        tags_value = task.get("tags")
        if tags_value is not None and (
            not isinstance(tags_value, list) or any(not isinstance(tag, str) or not tag.strip() for tag in tags_value)
        ):
            errors.append(f"{task_id}: tags must be a list of non-empty strings")

        comments = task.get("comments")
        if comments is not None:
            if not isinstance(comments, list):
                errors.append(f"{task_id}: comments must be a list")
            else:
                for idx, comment in enumerate(comments):
                    if not isinstance(comment, dict):
                        errors.append(f"{task_id}: comments[{idx}] must be an object")
                        continue
                    author = comment.get("author")
                    body = comment.get("body")
                    if not isinstance(author, str) or not author.strip():
                        errors.append(f"{task_id}: comments[{idx}].author must be a non-empty string")
                    if not isinstance(body, str) or not body.strip():
                        errors.append(f"{task_id}: comments[{idx}].body must be a non-empty string")

        verify_value = task.get("verify")
        if verify_value is not None and (
            not isinstance(verify_value, list)
            or any(not isinstance(cmd, str) or not cmd.strip() for cmd in verify_value)
        ):
            errors.append(f"{task_id}: verify must be a list of non-empty strings")

        dep_info = dep_state.get(task_id) or {}
        missing = dep_info.get("missing") or []
        incomplete = dep_info.get("incomplete") or []
        if status in {"DOING", "DONE"} and (missing or incomplete):
            errors.append(f"{task_id}: status {status} but dependencies are not satisfied")

        if status == "DONE":
            commit = task.get("commit")
            if not isinstance(commit, dict):
                errors.append(f"{task_id}: DONE tasks must include commit metadata")
            else:
                chash = str(commit.get("hash") or "").strip()
                msg = str(commit.get("message") or "").strip()
                if len(chash) < 7:
                    errors.append(f"{task_id}: commit.hash must be a git hash")
                if not msg:
                    errors.append(f"{task_id}: commit.message must be non-empty")

    return {"errors": sorted(set(errors)), "warnings": sorted(set(warnings))}


def cmd_task_lint(args: argparse.Namespace) -> None:
    result = lint_tasks_json()
    if not args.quiet:
        for message in result["warnings"]:
            print(f"⚠️ {message}")
    if result["errors"]:
        for message in result["errors"]:
            print(f"❌ {message}", file=sys.stderr)
        raise SystemExit(2)
    print(f"✅ {TASKS_PATH_REL} OK")


def cmd_ready(args: argparse.Namespace) -> None:
    ok, warnings = readiness(args.task_id)
    for warning in warnings:
        print(f"⚠️ {warning}")
    _, tasks_by_id, _, key = load_task_index()
    dep_state, _ = load_dependency_state_for(tasks_by_id, key=key)
    task = tasks_by_id.get(args.task_id)
    if task:
        task_id = str(task.get("id") or "").strip()
        title = str(task.get("title") or "").strip()
        status = str(task.get("status") or "TODO").strip().upper()
        owner = str(task.get("owner") or "-").strip()
        info = dep_state.get(task_id) or {}
        missing = info.get("missing") or []
        incomplete = info.get("incomplete") or []
        print(f"Task: {task_id} [{status}] {title}")
        print(f"Owner: {owner if owner else '-'}")
        depends_on = info.get("depends_on") or []
        print(f"Depends on: {', '.join(depends_on) if depends_on else '-'}")
        if missing:
            print(f"Missing deps: {', '.join(missing)}")
        if incomplete:
            print(f"Incomplete deps: {', '.join(incomplete)}")
    print("✅ ready" if ok else "⛔ not ready")
    raise SystemExit(0 if ok else 2)


def cmd_hooks_install(args: argparse.Namespace) -> None:
    cwd = Path.cwd().resolve()
    hooks_dir = git_hooks_dir(cwd=cwd)
    hooks_dir.mkdir(parents=True, exist_ok=True)
    installed: list[Path] = []
    for hook in HOOK_NAMES:
        path = hooks_dir / hook
        if path.exists() and not hook_is_managed(path):
            die(
                "\n".join(
                    [
                        f"Refusing to overwrite existing hook: {path}",
                        "Fix:",
                        "  1) Move the existing hook aside",
                        "  2) Re-run `python .agent-plane/agentctl.py hooks install`",
                    ]
                ),
                code=2,
            )
        path.write_text(hook_script_text(hook), encoding="utf-8")
        path.chmod(0o755)
        installed.append(path)
    if not args.quiet:
        for path in installed:
            print(f"✅ installed hook: {path}")


def cmd_hooks_uninstall(args: argparse.Namespace) -> None:
    cwd = Path.cwd().resolve()
    hooks_dir = git_hooks_dir(cwd=cwd)
    removed: list[Path] = []
    skipped: list[Path] = []
    if hooks_dir.exists():
        for hook in HOOK_NAMES:
            path = hooks_dir / hook
            if not path.exists():
                continue
            if not hook_is_managed(path):
                skipped.append(path)
                continue
            path.unlink()
            removed.append(path)
    if not args.quiet:
        if removed:
            for path in removed:
                print(f"✅ removed hook: {path}")
        if skipped:
            for path in skipped:
                print(f"⚠️ skipped non-agentctl hook: {path}")
        if not removed and not skipped:
            print("✅ no agentctl hooks to remove")


def cmd_hooks_run(args: argparse.Namespace) -> None:
    cwd = Path.cwd().resolve()
    if args.hook == "commit-msg":
        if not args.hook_args:
            die("commit-msg hook requires a commit message path", code=2)
        hook_commit_msg_check(Path(args.hook_args[0]))
        return
    if args.hook == "pre-commit":
        hook_pre_commit_check(cwd=cwd)
        return
    die(f"Unknown hook: {args.hook}", code=2)


def cmd_guard_clean(args: argparse.Namespace) -> None:
    staged = git_staged_files(cwd=Path.cwd().resolve())
    if staged:
        for path in staged:
            print(f"❌ staged: {path}", file=sys.stderr)
        raise SystemExit(2)
    if not args.quiet:
        print("✅ index clean (no staged files)")


def cmd_guard_suggest_allow(args: argparse.Namespace) -> None:
    staged = git_staged_files(cwd=Path.cwd().resolve())
    if not staged:
        die("No staged files", code=2)
    prefixes = suggest_allow_prefixes(staged)
    if args.format == "args":
        print(" ".join(f"--allow {p}" for p in prefixes))
        return
    for prefix in prefixes:
        print(prefix)


def cmd_guard_commit(args: argparse.Namespace) -> None:
    cwd = Path.cwd().resolve()
    allow = list(args.allow or [])
    if args.auto_allow and not allow:
        allow = suggest_allow_prefixes(git_staged_files(cwd=cwd))
        if not allow:
            die("No staged files", code=2)
    guard_commit_check(
        task_id=args.task_id.strip(),
        message=args.message,
        allow=allow,
        allow_tasks=bool(args.allow_tasks),
        require_clean=bool(args.require_clean),
        quiet=bool(args.quiet),
        cwd=cwd,
    )


def cmd_commit(args: argparse.Namespace) -> None:
    task_id = args.task_id.strip()
    message = args.message
    allow = list(args.allow or [])
    cwd = Path.cwd().resolve()
    if args.auto_allow:
        allow = suggest_allow_prefixes(git_staged_files(cwd=cwd))
        if not allow:
            die("No staged files", code=2)

    guard_commit_check(
        task_id=task_id,
        message=message,
        allow=allow,
        allow_tasks=bool(args.allow_tasks),
        require_clean=bool(args.require_clean),
        quiet=bool(args.quiet),
        cwd=cwd,
    )

    try:
        subprocess.run(
            ["git", "commit", "-m", message],
            cwd=str(cwd),
            text=True,
            check=True,
            env=build_hook_env(
                task_id=task_id,
                allow_tasks=bool(args.allow_tasks),
                allow_base=bool(args.allow_tasks),
            ),
        )
    except subprocess.CalledProcessError as exc:
        die(exc.stderr.strip() or "git commit failed")
    commit_info = get_commit_info("HEAD", cwd=cwd)
    if not args.quiet:
        print(f"✅ committed {commit_info['hash'][:12]} {commit_info['message']}")


def cmd_start(args: argparse.Namespace) -> None:
    if not args.author or not args.body:
        die("--author and --body are required", code=2)
    if getattr(args, "commit_from_comment", False):
        enforce_status_commit_policy(
            action="start",
            confirmed=bool(getattr(args, "confirm_status_commit", False)),
            quiet=bool(args.quiet),
        )
    require_tasks_json_write_context(force=bool(args.force))
    if not args.force:
        prefix, min_chars = comment_rule("start")
        require_structured_comment(args.body, prefix=prefix, min_chars=min_chars)
    if not args.force:
        ok, warnings = readiness(args.task_id)
        if not ok:
            for warning in warnings:
                print(f"⚠️ {warning}")
            die(f"Task is not ready: {args.task_id} (use --force to override)", code=2)

    tasks, save = load_task_store()
    target = _ensure_task_object(tasks, args.task_id)
    current = str(target.get("status") or "").strip().upper() or "TODO"
    if not is_transition_allowed(current, "DOING") and not args.force:
        die(f"Refusing status transition {current} -> DOING (use --force to override)", code=2)

    target["status"] = "DOING"
    formatted_comment = None
    comment_body = args.body
    if getattr(args, "commit_from_comment", False):
        formatted_comment = format_comment_body_for_commit(args.body)
        comment_body = formatted_comment
    comments_value = target.get("comments")
    comments: list[JsonDict] = (
        [cast(JsonDict, item) for item in comments_value if isinstance(item, dict)]
        if isinstance(comments_value, list)
        else []
    )
    comments.append({"author": args.author, "body": comment_body})
    target["comments"] = comments
    save(tasks)
    export_tasks_snapshot(quiet=bool(args.quiet))
    commit_info = None
    if getattr(args, "commit_from_comment", False):
        commit_info = commit_from_comment(
            task_id=args.task_id,
            comment_body=args.body,
            formatted_comment=formatted_comment,
            emoji=args.commit_emoji or default_commit_emoji_for_status("DOING", comment_body=args.body),
            allow=list(args.commit_allow or []),
            auto_allow=bool(args.commit_auto_allow or not args.commit_allow),
            allow_tasks=bool(args.commit_allow_tasks),
            require_clean=bool(args.commit_require_clean),
            quiet=bool(args.quiet),
            cwd=Path.cwd().resolve(),
        )
    if not args.quiet:
        _, tasks_by_id, _, key = load_task_index()
        dep_state, _ = load_dependency_state_for(tasks_by_id, key=key)
        task = tasks_by_id.get(args.task_id) or target
        suffix = ""
        if commit_info:
            suffix = f" (commit={commit_info.get('hash', '')[:12]})"
        print(f"✅ started: {format_task_line(task, dep_state=dep_state)}{suffix}")


def cmd_block(args: argparse.Namespace) -> None:
    if not args.author or not args.body:
        die("--author and --body are required", code=2)
    if getattr(args, "commit_from_comment", False):
        enforce_status_commit_policy(
            action="block",
            confirmed=bool(getattr(args, "confirm_status_commit", False)),
            quiet=bool(args.quiet),
        )
    require_tasks_json_write_context(force=bool(args.force))
    if not args.force:
        prefix, min_chars = comment_rule("blocked")
        require_structured_comment(args.body, prefix=prefix, min_chars=min_chars)
    tasks, save = load_task_store()
    target = _ensure_task_object(tasks, args.task_id)
    current = str(target.get("status") or "").strip().upper() or "TODO"
    if not is_transition_allowed(current, "BLOCKED") and not args.force:
        die(f"Refusing status transition {current} -> BLOCKED (use --force to override)", code=2)
    target["status"] = "BLOCKED"
    formatted_comment = None
    comment_body = args.body
    if getattr(args, "commit_from_comment", False):
        formatted_comment = format_comment_body_for_commit(args.body)
        comment_body = formatted_comment
    comments = target.get("comments")
    if not isinstance(comments, list):
        comments = []
    comments.append({"author": args.author, "body": comment_body})
    target["comments"] = comments
    save(tasks)
    export_tasks_snapshot(quiet=bool(args.quiet))
    commit_info = None
    if getattr(args, "commit_from_comment", False):
        commit_info = commit_from_comment(
            task_id=args.task_id,
            comment_body=args.body,
            formatted_comment=formatted_comment,
            emoji=args.commit_emoji or default_commit_emoji_for_status("BLOCKED", comment_body=args.body),
            allow=list(args.commit_allow or []),
            auto_allow=bool(args.commit_auto_allow or not args.commit_allow),
            allow_tasks=bool(args.commit_allow_tasks),
            require_clean=bool(args.commit_require_clean),
            quiet=bool(args.quiet),
            cwd=Path.cwd().resolve(),
        )
    if not args.quiet:
        _, tasks_by_id, _, key = load_task_index()
        dep_state, _ = load_dependency_state_for(tasks_by_id, key=key)
        task = tasks_by_id.get(args.task_id) or target
        suffix = ""
        if commit_info:
            suffix = f" (commit={commit_info.get('hash', '')[:12]})"
        print(f"✅ blocked: {format_task_line(task, dep_state=dep_state)}{suffix}")


def cmd_task_comment(args: argparse.Namespace) -> None:
    require_tasks_json_write_context()
    tasks, save = load_task_store()
    target = _ensure_task_object(tasks, args.task_id)

    comments = target.get("comments")
    if not isinstance(comments, list):
        comments = []
    comments.append({"author": args.author, "body": args.body})
    target["comments"] = comments
    save(tasks)


def _ensure_task_object(container: object, task_id: str) -> TaskRecord:
    if isinstance(container, list):
        tasks = ensure_task_list(container, label="tasks list")
    elif isinstance(container, dict):
        tasks = ensure_task_list(container.get("tasks"), label="tasks list")
    else:
        tasks = []
    if not tasks:
        die("tasks list must be provided")
    for task in tasks:
        if task.get("id") == task_id:
            return task
    die(f"Unknown task id: {task_id}")


def _generate_task_id_via_local_backend(
    existing_ids: set[str],
    *,
    length: int = 6,
    attempts: int = 1000,
) -> str:
    local_path = SWARM_DIR / "backends" / "local" / "backend.py"
    if not local_path.exists():
        die(f"Local backend module not found: {local_path}", code=2)
    module = load_backend_module("local", local_path)
    backend_cls = cast(Callable[..., object] | None, getattr(module, "LocalBackend", None))
    if backend_cls is None:
        die("LocalBackend class not found", code=2)
    local_backend = backend_cls({"dir": str(SWARM_DIR / "tasks")})
    generator = getattr(local_backend, "generate_task_id", None)
    if not callable(generator):
        die("Local backend does not support generate_task_id()", code=2)
    for _ in range(attempts):
        candidate = str(generator(length=length, attempts=1))
        if candidate and candidate not in existing_ids:
            return candidate
    raise RuntimeError("Failed to generate a unique task id")


def generate_task_id_for(
    existing_ids: set[str],
    *,
    length: int = 6,
    attempts: int = 1000,
) -> str:
    backend = backend_instance()
    if backend is None:
        return _generate_task_id_via_local_backend(existing_ids, length=length, attempts=attempts)
    generator = getattr(backend, "generate_task_id", None)
    if not callable(generator):
        die("Configured backend does not support generate_task_id()", code=2)
    for _ in range(attempts):
        candidate = str(generator(length=length, attempts=1))
        if candidate and candidate not in existing_ids:
            return candidate
    raise RuntimeError("Failed to generate a unique task id")


def cmd_task_add(args: argparse.Namespace) -> None:
    require_tasks_json_write_context()
    tasks, save = load_task_store()
    raw_task_ids = args.task_id if isinstance(args.task_id, list) else [args.task_id]
    task_ids = normalize_task_ids(raw_task_ids)
    existing_ids = {str(task.get("id") or "").strip() for task in tasks if str(task.get("id") or "").strip()}
    for task_id in task_ids:
        if task_id in existing_ids:
            die(f"Task already exists: {task_id}")
    status = (args.status or "TODO").strip().upper()
    if status not in ALLOWED_STATUSES:
        die(f"Invalid status: {status}")
    raw_depends_on = [dep for dep in (args.depends_on or []) if isinstance(dep, str)]
    normalized_depends_on = list(
        dict.fromkeys(dep.strip() for dep in raw_depends_on if dep.strip() and dep.strip() != "[]")
    )
    tags = list(dict.fromkeys(coerce_str_list(args.tag)))
    if not tags:
        die("at least one --tag is required when creating tasks", code=2)
    for task_id in task_ids:
        task: TaskRecord = {
            "id": task_id,
            "title": args.title,
            "description": args.description,
            "status": status,
            "priority": args.priority,
            "owner": args.owner,
            "tags": tags,
            "depends_on": normalized_depends_on,
        }
        if args.verify:
            task["verify"] = list(dict.fromkeys(args.verify))
        if args.comment_author and args.comment_body:
            task["comments"] = [{"author": args.comment_author, "body": args.comment_body}]
        tasks.append(task)
    save(tasks)


def cmd_task_new(args: argparse.Namespace) -> None:
    require_tasks_json_write_context()
    tasks, save = load_task_store()
    existing_ids = {str(task.get("id") or "").strip() for task in tasks if str(task.get("id") or "").strip()}
    status = (args.status or "TODO").strip().upper()
    if status not in ALLOWED_STATUSES:
        die(f"Invalid status: {status}")
    raw_depends_on = [dep for dep in (args.depends_on or []) if isinstance(dep, str)]
    normalized_depends_on = list(
        dict.fromkeys(dep.strip() for dep in raw_depends_on if dep.strip() and dep.strip() != "[]")
    )
    validate_owner(args.owner)
    tags = list(dict.fromkeys(coerce_str_list(args.tag)))
    if not tags:
        die("at least one --tag is required when creating tasks", code=2)
    task_id = generate_task_id_for(existing_ids, length=args.id_length)
    task: TaskRecord = {
        "id": task_id,
        "title": args.title,
        "description": args.description,
        "status": status,
        "priority": args.priority,
        "owner": args.owner,
        "tags": tags,
        "depends_on": normalized_depends_on,
    }
    verify_list = list(dict.fromkeys(args.verify)) if args.verify else []
    if requires_verify(coerce_str_list(task.get("tags"))) and not verify_list:
        die("verify commands are required for tasks with code/backend/frontend tags", code=2)
    if verify_list:
        task["verify"] = verify_list
    if args.comment_author and args.comment_body:
        task["comments"] = [{"author": args.comment_author, "body": args.comment_body}]
    tasks.append(task)
    save(tasks)
    if args.quiet:
        print(task_id)
    else:
        print(f"✅ created {task_id}")


def cmd_task_update(args: argparse.Namespace) -> None:
    require_tasks_json_write_context()
    tasks, save = load_task_store()
    task = _ensure_task_object(tasks, args.task_id)

    if args.title is not None:
        task["title"] = args.title
    if args.description is not None:
        task["description"] = args.description
    if args.priority is not None:
        task["priority"] = args.priority
    if args.owner is not None:
        validate_owner(args.owner)
        task["owner"] = args.owner

    if args.replace_tags:
        task["tags"] = []
    if args.tag:
        existing = coerce_str_list(task.get("tags"))
        merged = existing + args.tag
        task["tags"] = list(dict.fromkeys(tag.strip() for tag in merged if tag.strip()))

    if args.replace_depends_on:
        task["depends_on"] = []
    if args.depends_on:
        existing = coerce_str_list(task.get("depends_on"))
        merged = existing + args.depends_on
        task["depends_on"] = list(dict.fromkeys(dep.strip() for dep in merged if dep.strip() and dep.strip() != "[]"))

    if args.replace_verify:
        task["verify"] = []
    if args.verify:
        existing = coerce_str_list(task.get("verify"))
        merged = existing + args.verify
        task["verify"] = list(dict.fromkeys(cmd.strip() for cmd in merged if cmd.strip()))
    tags_for_check = coerce_str_list(task.get("tags"))
    verify_for_check = coerce_str_list(task.get("verify"))
    if requires_verify(tags_for_check) and not verify_for_check:
        die("verify commands are required for tasks with code/backend/frontend tags", code=2)

    save(tasks)


def _scrub_value(value: object, find_text: str, replace_text: str) -> object:
    if isinstance(value, str):
        return value.replace(find_text, replace_text)
    if isinstance(value, list):
        return [_scrub_value(item, find_text, replace_text) for item in value]
    if isinstance(value, dict):
        return {key: _scrub_value(val, find_text, replace_text) for key, val in value.items()}
    return value


def cmd_task_scrub(args: argparse.Namespace) -> None:
    find_text = args.find
    replace_text = args.replace
    if not find_text:
        die("--find must be non-empty", code=2)

    require_tasks_json_write_context()
    tasks, save = load_task_store()

    updated_tasks: TaskList = []
    changed_task_ids: list[str] = []
    for task in tasks:
        before = json.dumps(task, ensure_ascii=False, sort_keys=True)
        after_obj = _scrub_value(task, find_text, replace_text)
        if not isinstance(after_obj, dict):
            updated_tasks.append(task)
            continue
        after = json.dumps(after_obj, ensure_ascii=False, sort_keys=True)
        updated_tasks.append(cast(TaskRecord, after_obj))
        if before != after:
            changed_task_ids.append(str(after_obj.get("id") or "<no-id>"))

    if args.dry_run:
        if not args.quiet:
            print(f"Would update {len(set(changed_task_ids))} task(s).")
        if changed_task_ids and not args.quiet:
            for task_id in sorted(set(changed_task_ids)):
                print(task_id)
        return

    save(updated_tasks)
    if not args.quiet:
        print(f"Updated {len(set(changed_task_ids))} task(s).")


def cmd_verify(args: argparse.Namespace) -> None:
    task_id = args.task_id.strip()
    commands = get_task_verify_commands_for(task_id)

    if not commands:
        if args.require:
            die(f"{task_id}: no verify commands configured", code=2)
        if not args.quiet:
            print(f"ℹ️ {task_id}: no verify commands configured")
        return

    cwd = Path(args.cwd).resolve() if args.cwd else ROOT
    if ROOT.resolve() not in cwd.parents and cwd.resolve() != ROOT.resolve():
        die(f"--cwd must stay under repo root: {cwd}", code=2)

    log_path: Path | None = None
    if getattr(args, "log", None):
        log_path = Path(str(args.log)).resolve()
    else:
        # Convenience default: if a tracked PR artifact exists, write into its verify.log.
        pr_root = pr_dir(task_id)
        if pr_root.exists():
            log_path = (pr_root / "verify.log").resolve()

    if log_path and ROOT.resolve() not in log_path.parents and log_path.resolve() != ROOT.resolve():
        die(f"--log must stay under repo root: {log_path}", code=2)

    pr_meta_path = pr_dir(task_id) / "meta.json"
    pr_meta: JsonDict | None = pr_load_meta(pr_meta_path) if pr_meta_path.exists() else None

    head_sha = git_rev_parse("HEAD", cwd=cwd)
    current_sha = head_sha
    if log_path and pr_meta:
        log_parent_chain = log_path.resolve().parents
        if pr_dir(task_id).resolve() in log_parent_chain:
            meta_head = str(pr_meta.get("head_sha") or "").strip()
            if meta_head:
                current_sha = meta_head
                if meta_head != head_sha and not args.quiet:
                    msg = (
                        f"⚠️ {task_id}: PR meta head_sha differs from HEAD; "
                        f"run `python .agent-plane/agentctl.py pr update {task_id}` if needed"
                    )
                    print(msg)

    if getattr(args, "skip_if_unchanged", False):
        if git_status_porcelain(cwd=cwd):
            if not args.quiet:
                print(f"⚠️ {task_id}: working tree is dirty; ignoring --skip-if-unchanged")
        else:
            last_verified_sha: str | None = None
            if pr_meta:
                last_verified_sha = str(pr_meta.get("last_verified_sha") or "").strip() or None
            if not last_verified_sha and log_path and log_path.exists():
                last_verified_sha = extract_last_verified_sha_from_log(
                    log_path.read_text(encoding="utf-8", errors="replace")
                )
            if last_verified_sha and last_verified_sha == current_sha:
                timestamp = now_iso_utc()
                header = f"[{timestamp}] ℹ️ skipped (unchanged verified_sha={current_sha})"
                if log_path:
                    append_verify_log(log_path, header=header, content="")
                if not args.quiet:
                    print(f"ℹ️ {task_id}: verify skipped (unchanged sha {current_sha[:12]})")
                return

    run_verify_with_capture(task_id, cwd=cwd, quiet=bool(args.quiet), log_path=log_path, current_sha=current_sha)

    if pr_meta_path.exists():
        pr_meta_write = pr_load_meta(pr_meta_path)
        pr_meta_write["last_verified_sha"] = current_sha
        pr_meta_write["last_verified_at"] = now_iso_utc()
        pr_write_meta(pr_meta_path, pr_meta_write)


def cmd_upgrade(args: argparse.Namespace) -> None:
    action = "framework upgrade"
    ensure_invoked_from_repo_root(action=action)
    require_not_task_worktree(action=action)
    ensure_git_clean(action=action)
    branch = base_branch()
    require_branch(branch, action=action)

    last_update = framework_last_update()
    should_upgrade, reason = framework_upgrade_due(last_update)
    if getattr(args, "force", False):
        should_upgrade = True
        reason = "forced"

    if not should_upgrade:
        if not GLOBAL_QUIET:
            note = reason or "recent update"
            print_block("SKIP", f"Framework upgrade skipped ({note}); use --force to override.")
        return

    source = framework_source()
    if not GLOBAL_QUIET:
        print_block("INFO", f"Upgrading framework from {source} -> {branch}")

    try:
        result = run(["git", "pull", "--ff-only", source, branch], cwd=ROOT)
    except subprocess.CalledProcessError as exc:
        message = (exc.stderr or exc.stdout or "").strip() or str(exc)
        die(
            "\n".join(
                [
                    f"Failed to upgrade framework: {message}",
                    "Fix:",
                    "  1) Ensure the base branch can fast-forward from upstream",
                    "  2) Re-run the command (use --force if needed)",
                    f"Context: {format_command_context(cwd=Path.cwd().resolve())}",
                ]
            ),
            code=exc.returncode or 1,
        )

    if not GLOBAL_QUIET:
        if result.stdout:
            print(result.stdout.strip())
        if result.stderr:
            print_block("WARNING", result.stderr.strip())

    timestamp = now_iso_utc()
    persist_framework_update(timestamp)
    if not GLOBAL_QUIET:
        print_block("FRAMEWORK", f"Synced {source} -> {branch}")
        print_block("UPDATED_AT", timestamp)


def is_transition_allowed(current: str, nxt: str) -> bool:
    if current == nxt:
        return True
    if current == "TODO":
        return nxt in {"DOING", "BLOCKED"}
    if current == "DOING":
        return nxt in {"DONE", "BLOCKED"}
    if current == "BLOCKED":
        return nxt in {"TODO", "DOING"}
    if current == "DONE":
        return False
    return False


def cmd_task_set_status(args: argparse.Namespace) -> None:
    nxt = args.status.strip().upper()
    if nxt not in ALLOWED_STATUSES:
        die(f"Invalid status: {args.status} (allowed: {', '.join(sorted(ALLOWED_STATUSES))})")
    if nxt == "DONE" and not args.force:
        die(
            "Use `python .agent-plane/agentctl.py finish <task-id>` to mark DONE (use --force to override)",
            code=2,
        )
    if (args.author and not args.body) or (args.body and not args.author):
        die("--author and --body must be provided together", code=2)
    if getattr(args, "commit_from_comment", False):
        enforce_status_commit_policy(
            action="task set-status",
            confirmed=bool(getattr(args, "confirm_status_commit", False)),
            quiet=bool(args.quiet),
        )

    require_tasks_json_write_context(force=bool(args.force))
    tasks, save = load_task_store()
    target = _ensure_task_object(tasks, args.task_id)

    current = str(target.get("status") or "").strip().upper() or "TODO"
    if not is_transition_allowed(current, nxt) and not args.force:
        die(f"Refusing status transition {current} -> {nxt} (use --force to override)")

    if nxt in {"DOING", "DONE"} and not args.force:
        ok, warnings = readiness(args.task_id)
        if not ok:
            for warning in warnings:
                print(f"⚠️ {warning}")
            die(f"Task is not ready: {args.task_id} (use --force to override)", code=2)

    target["status"] = nxt
    formatted_comment = None
    comment_body = args.body
    if getattr(args, "commit_from_comment", False) and args.body:
        formatted_comment = format_comment_body_for_commit(args.body)
        comment_body = formatted_comment

    if args.author and args.body:
        comments = target.get("comments")
        if not isinstance(comments, list):
            comments = []
        comments.append({"author": args.author, "body": comment_body})
        target["comments"] = comments

    if args.commit:
        commit_info = get_commit_info(args.commit)
        target["commit"] = commit_info
    save(tasks)
    export_tasks_snapshot(quiet=bool(args.quiet))
    if getattr(args, "commit_from_comment", False):
        if not args.body:
            die("--body is required when using --commit-from-comment", code=2)
        commit_from_comment(
            task_id=args.task_id,
            comment_body=args.body,
            formatted_comment=formatted_comment,
            emoji=args.commit_emoji or default_commit_emoji_for_status(nxt, comment_body=args.body),
            allow=list(args.commit_allow or []),
            auto_allow=bool(args.commit_auto_allow or not args.commit_allow),
            allow_tasks=bool(args.commit_allow_tasks),
            require_clean=bool(args.commit_require_clean),
            quiet=bool(args.quiet),
            cwd=Path.cwd().resolve(),
        )


def cmd_finish(args: argparse.Namespace) -> None:
    raw_task_ids = args.task_id if isinstance(args.task_id, list) else [args.task_id]
    task_ids = normalize_task_ids(raw_task_ids)
    primary_task_id = task_ids[0] if task_ids else ""
    commit_from_comment_flag = bool(getattr(args, "commit_from_comment", False))
    auto_status_commit = finish_auto_status_commit()
    status_commit_flag = bool(
        getattr(args, "status_commit", False)
        or commit_from_comment_flag
        or (auto_status_commit and bool(args.body))
    )

    if (args.author and not args.body) or (args.body and not args.author):
        die("--author and --body must be provided together", code=2)
    if commit_from_comment_flag and len(task_ids) != 1:
        die("--commit-from-comment supports exactly one task id", code=2)
    if status_commit_flag and len(task_ids) != 1:
        die("--status-commit/--commit-from-comment supports exactly one task id", code=2)
    if (commit_from_comment_flag or status_commit_flag) and not args.body:
        die("--body is required when building commit messages from comments", code=2)
    if commit_from_comment_flag or status_commit_flag:
        enforce_status_commit_policy(
            action="finish",
            confirmed=bool(getattr(args, "confirm_status_commit", False)),
            quiet=bool(args.quiet),
        )

    require_tasks_json_write_context(force=bool(args.force))
    pr_context: dict[str, PrContext] = {}
    if is_branch_pr_mode() and not args.force:
        ensure_git_clean(action="finish")
        if not args.author or not args.body:
            die("--author and --body are required in workflow_mode='branch_pr'", code=2)
        if str(args.author).strip().upper() != "INTEGRATOR":
            die("--author must be INTEGRATOR in workflow_mode='branch_pr'", code=2)
    if args.author and args.body and not args.force:
        prefix, min_chars = comment_rule("verified")
        require_structured_comment(args.body, prefix=prefix, min_chars=min_chars)
    formatted_comment: str | None = None
    if args.body and (commit_from_comment_flag or status_commit_flag):
        formatted_comment = format_comment_body_for_commit(args.body)

    if not backend_enabled():
        lint = lint_tasks_json()
        if lint["warnings"] and not args.quiet:
            for message in lint["warnings"]:
                print(f"⚠️ {message}")
        if lint["errors"] and not args.force:
            for message in lint["errors"]:
                print(f"❌ {message}", file=sys.stderr)
            die("tasks.json failed lint (use --force to override)", code=2)

    tasks, save = load_task_store()

    tasks_by_id, _ = index_tasks_by_id(tasks)
    assume_done = set(task_ids)
    tasks_override: TaskIndex = {}
    for task_key, task in tasks_by_id.items():
        if task_key in assume_done:
            override = dict(task)
            override["status"] = "DONE"
            tasks_override[task_key] = override
        else:
            tasks_override[task_key] = task

    dep_state, dep_warnings = compute_dependency_state(tasks_override)

    if not args.force:
        for task_id in task_ids:
            if task_id not in tasks_override:
                die(f"Unknown task id: {task_id}")
            info = dep_state.get(task_id) or {}
            missing = info.get("missing") or []
            incomplete = info.get("incomplete") or []
            if missing or incomplete:
                for warning in dep_warnings:
                    print(f"⚠️ {warning}")
                if missing:
                    print(f"⚠️ {task_id}: missing deps: {', '.join(missing)}")
                if incomplete:
                    print(f"⚠️ {task_id}: incomplete deps: {', '.join(incomplete)}")
                die(f"Task is not ready: {task_id} (use --force to override)", code=2)
            target_owner = str((tasks_by_id.get(task_id) or {}).get("owner") or "").strip().upper()
            author_upper = str(args.author or "").strip().upper()
            if author_upper and not is_branch_pr_mode() and author_upper not in {target_owner} and not args.force:
                owner_label = target_owner or "unknown"
                message = f"--author must match task owner ({owner_label}) in direct mode " "(use --force to override)"
                die(
                    message,
                    code=2,
                )
            validate_task_doc_complete(task_id)

    verify_commands: dict[str, list[str]] = {}
    for task_id in task_ids:
        target = tasks_by_id.get(task_id)
        if not target:
            die(f"Unknown task id: {task_id}")
        verify = target.get("verify")
        if verify is None:
            commands = []
        elif isinstance(verify, list):
            commands = [cmd.strip() for cmd in verify if isinstance(cmd, str) and cmd.strip()]
        else:
            if not args.force:
                die(f"{task_id}: verify must be a list of strings (use --force to override)", code=2)
            commands = []
        verify_commands[task_id] = commands

    code_commit_info: dict[str, str] | None = None
    if commit_from_comment_flag:
        code_commit_info = commit_from_comment(
            task_id=primary_task_id,
            comment_body=args.body,
            formatted_comment=formatted_comment,
            emoji=args.commit_emoji or infer_commit_emoji(args.body),
            allow=list(args.commit_allow or []),
            auto_allow=bool(args.commit_auto_allow or not args.commit_allow),
            allow_tasks=bool(args.commit_allow_tasks),
            require_clean=bool(args.commit_require_clean),
            quiet=bool(args.quiet),
            cwd=Path.cwd().resolve(),
        )
        args.commit = code_commit_info["hash"]

    commit_info = get_commit_info(args.commit)
    if args.require_task_id_in_commit and not args.force:
        message = commit_info.get("message", "")
        missing = [task_id for task_id in task_ids if not commit_subject_mentions_task(task_id, message)]
        if missing:
            die(commit_subject_missing_error(missing, message) + " (use --force or --no-require-task-id-in-commit)")

    if is_branch_pr_mode() and not args.force:
        for task_id in task_ids:
            pr_path = pr_dir(task_id)
            if not pr_path.exists():
                die(
                    f"Missing PR artifact dir: {pr_path} (required for finish in branch_pr mode)",
                    code=2,
                )
            pr_meta = pr_load_meta(pr_path / "meta.json")
            pr_branch = str(pr_meta.get("branch") or "").strip()
            pr_base = str(pr_meta.get("base_branch") or base_branch()).strip()
            pr_check(task_id, branch=pr_branch or None, base=pr_base or None, quiet=True)
            pr_context[task_id] = {
                "pr_path": pr_path,
                "pr_meta": pr_meta,
            }

    current_sha = git_rev_parse("HEAD", cwd=ROOT)
    for task_id in task_ids:
        commands = verify_commands.get(task_id) or []
        if commands and not args.skip_verify and not args.force:
            run_verify_with_capture(
                task_id,
                cwd=ROOT,
                quiet=bool(args.quiet),
                log_path=None,
                current_sha=current_sha,
            )

    for task_id in task_ids:
        target = _ensure_task_object(tasks, task_id)
        target["status"] = "DONE"
        target["commit"] = commit_info

        if is_branch_pr_mode() and not args.force:
            context = pr_context.get(task_id)
            if context:
                pr_path = context["pr_path"]
                pr_meta = context["pr_meta"]
                review_path = pr_path / "review.md"
                if review_path.exists():
                    notes = parse_handoff_notes(review_path.read_text(encoding="utf-8", errors="replace"))
                    if notes:
                        digest = hashlib.sha256(
                            ("\n".join(f"{n['author']}:{n['body']}" for n in notes)).encode("utf-8")
                        ).hexdigest()
                        applied = str(pr_meta.get("handoff_applied_digest") or "").strip()
                        if digest != applied:
                            comments = target.get("comments")
                            if not isinstance(comments, list):
                                comments = []
                            for note in notes:
                                comments.append({"author": note["author"], "body": note["body"]})
                            target["comments"] = comments
                            pr_meta["handoff_applied_digest"] = digest
                            pr_meta["handoff_applied_at"] = now_iso_utc()
                            pr_write_meta(pr_path / "meta.json", pr_meta)
                now = now_iso_utc()
                pr_meta.setdefault("merged_at", now)
                pr_meta.setdefault("merge_commit", commit_info.get("hash"))
                pr_meta.setdefault("closed_at", now)
                pr_meta["close_commit"] = commit_info.get("hash")
                pr_meta["status"] = pr_meta.get("status") or "CLOSED"
                if str(pr_meta.get("status")).strip().upper() != "CLOSED":
                    pr_meta["status"] = "CLOSED"
                pr_meta["updated_at"] = now
                pr_write_meta(pr_path / "meta.json", pr_meta)

        if args.author and args.body:
            comments = target.get("comments")
            if not isinstance(comments, list):
                comments = []
            comment_body = formatted_comment or args.body
            comments.append({"author": args.author, "body": comment_body})
            target["comments"] = comments

    save(tasks)
    export_tasks_snapshot(quiet=bool(args.quiet))

    if status_commit_flag:
        status_allow = list(args.status_commit_allow or [])
        commit_from_comment(
            task_id=primary_task_id,
            comment_body=args.body,
            formatted_comment=formatted_comment,
            emoji=args.status_commit_emoji or default_commit_emoji_for_status("DONE", comment_body=args.body),
            allow=status_allow,
            auto_allow=bool(args.status_commit_auto_allow or not status_allow),
            allow_tasks=True,
            require_clean=bool(args.status_commit_require_clean),
            quiet=bool(args.quiet),
            cwd=Path.cwd().resolve(),
        )


def git_rev_parse(rev: str, *, cwd: Path = ROOT) -> str:
    try:
        result = run(["git", "rev-parse", rev], cwd=cwd, check=True)
    except subprocess.CalledProcessError as exc:
        die(exc.stderr.strip() or f"Failed to resolve git rev: {rev}")
    return (result.stdout or "").strip()


def git_branch_exists(branch: str, *, cwd: Path = ROOT) -> bool:
    try:
        run(["git", "show-ref", "--verify", "--quiet", f"refs/heads/{branch}"], cwd=cwd, check=True)
        return True
    except subprocess.CalledProcessError:
        return False


def git_diff_names(base: str, head: str, *, cwd: Path = ROOT) -> list[str]:
    try:
        result = run(["git", "diff", "--name-only", f"{base}...{head}"], cwd=cwd, check=True)
    except subprocess.CalledProcessError as exc:
        die(exc.stderr.strip() or "Failed to compute git diff")
    return [line.strip() for line in (result.stdout or "").splitlines() if line.strip()]


def git_diff_stat(base: str, head: str, *, cwd: Path = ROOT) -> str:
    try:
        result = run(["git", "diff", "--stat", f"{base}...{head}"], cwd=cwd, check=True)
    except subprocess.CalledProcessError as exc:
        die(exc.stderr.strip() or "Failed to compute git diffstat")
    return (result.stdout or "").rstrip() + "\n"


def git_log_subjects(base: str, head: str, *, cwd: Path = ROOT, limit: int = 50) -> list[str]:
    try:
        result = run(
            ["git", "log", f"--max-count={limit}", "--pretty=format:%s", f"{base}..{head}"],
            cwd=cwd,
            check=True,
        )
    except subprocess.CalledProcessError as exc:
        die(exc.stderr.strip() or "Failed to read git log")
    return [line.strip() for line in (result.stdout or "").splitlines() if line.strip()]


def git_show_text(rev: str, relpath: str, *, cwd: Path = ROOT) -> str | None:
    rel = str(relpath or "").strip().lstrip("/")
    if not rel:
        return None
    try:
        proc = run(["git", "show", f"{rev}:{rel}"], cwd=cwd, check=False)
    except subprocess.CalledProcessError:
        return None
    if proc.returncode != 0:
        return None
    return proc.stdout


def git_worktree_list_porcelain(*, cwd: Path = ROOT) -> str:
    try:
        result = run(["git", "worktree", "list", "--porcelain"], cwd=cwd, check=True)
    except subprocess.CalledProcessError as exc:
        die(exc.stderr.strip() or "Failed to list git worktrees")
    return result.stdout or ""


def parse_git_worktrees_porcelain(text: str) -> list[dict[str, str]]:
    entries: list[dict[str, str]] = []
    current: dict[str, str] = {}
    for raw_line in (text or "").splitlines():
        line = raw_line.rstrip()
        if not line.strip():
            if current:
                entries.append(current)
                current = {}
            continue
        if " " not in line:
            continue
        key, value = line.split(" ", 1)
        current[key.strip()] = value.strip()
    if current:
        entries.append(current)
    return entries


def detect_worktree_path_for_branch(branch: str, *, cwd: Path = ROOT) -> Path | None:
    want = (branch or "").strip()
    if not want:
        return None
    entries = parse_git_worktrees_porcelain(git_worktree_list_porcelain(cwd=cwd))
    for entry in entries:
        wt_path = entry.get("worktree")
        ref = entry.get("branch")  # refs/heads/<branch>
        if not wt_path or not ref:
            continue
        if ref == f"refs/heads/{want}":
            return Path(wt_path).resolve()
    return None


def detect_branch_for_worktree_path(path: Path, *, cwd: Path = ROOT) -> str | None:
    entries = parse_git_worktrees_porcelain(git_worktree_list_porcelain(cwd=cwd))
    want = path.resolve()
    for entry in entries:
        wt_path = entry.get("worktree")
        ref = entry.get("branch")
        if not wt_path or not ref:
            continue
        if Path(wt_path).resolve() == want and ref.startswith("refs/heads/"):
            return ref[len("refs/heads/") :]
    return None


def assert_no_diff_paths(*, base: str, branch: str, forbidden: list[str], cwd: Path = ROOT) -> None:
    changed = set(git_diff_names(base, branch, cwd=cwd))
    bad = [p for p in forbidden if p in changed]
    if bad:
        die(
            "\n".join(
                [
                    f"Refusing operation: branch {branch!r} modifies forbidden path(s): {', '.join(bad)}",
                    "Fix:",
                    "  1) Revert the forbidden change(s) in the task branch",
                    "  2) Re-run the command",
                    f"Context: branch={git_current_branch(cwd=cwd)!r} cwd={Path.cwd().resolve()}",
                ]
            ),
            code=2,
        )


def task_title(task_id: str) -> str:
    tasks, _ = load_task_store()
    tasks_by_id, _ = index_tasks_by_id(tasks)
    task = tasks_by_id.get(task_id)
    return str(task.get("title") or "").strip() if task else ""


def default_task_branch(task_id: str, slug: str) -> str:
    slug_norm = normalize_slug(slug)
    return f"{TASK_BRANCH_PREFIX}/{task_id}/{slug_norm}"


def cmd_branch_create(args: argparse.Namespace) -> None:
    require_not_task_worktree(action="branch create")
    ensure_git_clean(action="branch create")
    ensure_path_ignored(WORKTREES_DIRNAME, cwd=ROOT)

    if is_direct_mode():
        die(
            "\n".join(
                [
                    "Refusing branch/worktree creation in workflow_mode='direct'",
                    "Fix:",
                    "  - Work directly in the current checkout (no task branches/worktrees), or",
                    "  - Switch to workflow_mode='branch_pr' to use task branches/worktrees.",
                    f"Config: {SWARM_CONFIG_PATH}",
                ]
            ),
            code=2,
        )

    task_id = args.task_id.strip()
    if not task_id:
        die("task_id must be non-empty", code=2)

    if is_branch_pr_mode() and not args.agent:
        die("--agent is required in workflow_mode='branch_pr' (e.g., --agent CODER)", code=2)
    if is_branch_pr_mode() and not args.worktree:
        die("--worktree is required in workflow_mode='branch_pr' for `branch create`", code=2)

    slug = normalize_slug(args.slug or task_title(task_id) or "work")
    base = (args.base or base_branch()).strip()
    branch = default_task_branch(task_id, slug)

    if not git_branch_exists(base):
        die(f"Base branch does not exist: {base}", code=2)

    expected_worktree_path = WORKTREES_DIR / f"{task_id}-{slug}"

    attached = detect_worktree_path_for_branch(branch, cwd=ROOT)
    if attached and attached != expected_worktree_path.resolve():
        die(f"Branch is already checked out in another worktree: {attached}", code=2)
    if attached and not args.reuse:
        die(
            f"Branch is already checked out in an existing worktree: {attached} (use --reuse)",
            code=2,
        )

    if git_branch_exists(branch) and not args.reuse:
        die(f"Branch already exists: {branch} (use --reuse to reuse an existing worktree)", code=2)

    if args.worktree:
        WORKTREES_DIR.mkdir(parents=True, exist_ok=True)
        worktree_path = expected_worktree_path
        if worktree_path.exists():
            if not args.reuse:
                die(
                    f"Worktree path already exists: {worktree_path} (use --reuse if it's a registered worktree)",
                    code=2,
                )
            registered_branch = detect_branch_for_worktree_path(worktree_path, cwd=ROOT)
            if registered_branch != branch:
                die(
                    f"Worktree path exists but is not registered for {branch!r}: {worktree_path}\n"
                    f"Registered: {registered_branch!r}",
                    code=2,
                )
            print_block("CONTEXT", format_command_context(cwd=Path.cwd().resolve()))
            print_block("ACTION", f"Reuse existing worktree for {branch}")
            print_block("RESULT", f"branch={branch} worktree={worktree_path}")
            print_block("NEXT", "Open the worktree in your IDE and continue work there.")
            return
        try:
            if git_branch_exists(branch):
                run(["git", "worktree", "add", str(worktree_path), branch], check=True)
            else:
                run(["git", "worktree", "add", "-b", branch, str(worktree_path), base], check=True)
        except subprocess.CalledProcessError as exc:
            die(exc.stderr.strip() or exc.stdout.strip() or "git worktree add failed")
        if not args.quiet:
            print_block("CONTEXT", format_command_context(cwd=Path.cwd().resolve()))
            print_block("ACTION", f"Create task branch + worktree for {task_id} (agent={args.agent or '-'})")
            print_block("RESULT", f"branch={branch} worktree={worktree_path}")
            next_steps = (
                f"Open `{worktree_path}` in your IDE and run `python .agent-plane/agentctl.py pr open {task_id} "
                f"--branch {branch} --author {args.agent or 'CODER'}`."
            )
            print_block("NEXT", next_steps)
        return

    try:
        run(["git", "switch", "-c", branch, base], check=True)
    except subprocess.CalledProcessError as exc:
        die(exc.stderr.strip() or exc.stdout.strip() or "git switch failed")
    if not args.quiet:
        print_block("CONTEXT", format_command_context(cwd=Path.cwd().resolve()))
        print_block("ACTION", f"Create and switch to task branch for {task_id} (agent={args.agent or '-'})")
        print_block("RESULT", f"branch={branch}")
        next_steps = (
            f"Run `python .agent-plane/agentctl.py pr open {task_id} --branch {branch} "
            f"--author {args.agent or 'CODER'}`."
        )
        print_block("NEXT", next_steps)


def _git_ahead_behind(branch: str, base: str, *, cwd: Path) -> tuple[int, int]:
    try:
        result = run(
            ["git", "rev-list", "--left-right", "--count", f"{base}...{branch}"],
            cwd=cwd,
            check=True,
        )
    except subprocess.CalledProcessError as exc:
        die(exc.stderr.strip() or "Failed to compute ahead/behind")
    raw = (result.stdout or "").strip()
    if not raw:
        return 0, 0
    parts = raw.split()
    if len(parts) != 2:
        return 0, 0
    behind = int(parts[0])
    ahead = int(parts[1])
    return ahead, behind


def cmd_branch_status(args: argparse.Namespace) -> None:
    cwd = Path.cwd().resolve()
    branch = (args.branch or git_current_branch(cwd=cwd)).strip()
    base = (args.base or base_branch(cwd=cwd)).strip()
    if not git_branch_exists(branch, cwd=cwd):
        die(f"Unknown branch: {branch}", code=2)
    if not git_branch_exists(base, cwd=cwd):
        die(f"Unknown base branch: {base}", code=2)

    task_id = parse_task_id_from_task_branch(branch)
    worktree = detect_worktree_path_for_branch(branch, cwd=cwd)
    ahead, behind = _git_ahead_behind(branch, base, cwd=cwd)

    print_block("CONTEXT", format_command_context(cwd=cwd))
    print_block(
        "RESULT",
        f"branch={branch} base={base} ahead={ahead} behind={behind} task_id={task_id or '-'}",
    )
    if worktree:
        print_block("RESULT", f"worktree={worktree}")
    print_block(
        "NEXT",
        "If you are ready, update PR artifacts via `python .agent-plane/agentctl.py pr update <task-id>`.",
    )


def cmd_branch_remove(args: argparse.Namespace) -> None:
    require_not_task_worktree(action="branch remove")

    branch = (args.branch or "").strip()
    worktree = (args.worktree or "").strip()
    if not branch and not worktree:
        die("Provide --branch and/or --worktree", code=2)

    if worktree:
        path = (ROOT / worktree).resolve() if not Path(worktree).is_absolute() else Path(worktree).resolve()
        worktrees_root = WORKTREES_DIR.resolve()
        if worktrees_root not in path.parents and path != worktrees_root:
            die(f"Refusing to remove worktree outside {worktrees_root}: {path}", code=2)
        try:
            cmd = ["git", "worktree", "remove"]
            if args.force:
                cmd.append("--force")
            cmd.append(str(path))
            run(cmd, check=True)
        except subprocess.CalledProcessError as exc:
            die(exc.stderr.strip() or exc.stdout.strip() or "git worktree remove failed")
        if not args.quiet:
            print(f"✅ removed worktree {path}")

    if branch:
        if not git_branch_exists(branch):
            die(f"Unknown branch: {branch}", code=2)
        try:
            run(["git", "branch", "-D" if args.force else "-d", branch], check=True)
        except subprocess.CalledProcessError as exc:
            die(exc.stderr.strip() or exc.stdout.strip() or "git branch delete failed")
        if not args.quiet:
            print(f"✅ removed branch {branch}")


def _run_agentctl_in_checkout(args: list[str], *, cwd: Path, quiet: bool) -> None:
    proc = subprocess.run(
        [sys.executable, ".agent-plane/agentctl.py", *args],
        cwd=str(cwd),
        text=True,
        capture_output=True,
        check=False,
    )
    if proc.returncode != 0:
        out = (proc.stdout or "").strip()
        err = (proc.stderr or "").strip()
        die(err or out or f"agentctl failed: {' '.join(args)}", code=proc.returncode or 2)
    if not quiet:
        out = (proc.stdout or "").strip()
        if out:
            print(out)


def cmd_work_start(args: argparse.Namespace) -> None:
    require_not_task_worktree(action="work start")
    ensure_git_clean(action="work start")
    ensure_path_ignored(WORKTREES_DIRNAME, cwd=ROOT)

    task_id = args.task_id.strip()
    if not task_id:
        die("task_id must be non-empty", code=2)

    if is_direct_mode():
        readme_path = workflow_task_readme_path(task_id)
        if not readme_path.exists() or bool(getattr(args, "overwrite", False)):
            cmd_task_scaffold(
                argparse.Namespace(
                    task_id=task_id,
                    title=None,
                    force=True,
                    overwrite=bool(getattr(args, "overwrite", False)),
                    quiet=bool(getattr(args, "quiet", False)),
                )
            )
        if not args.quiet:
            readme_rel = readme_path.relative_to(ROOT)
            print_block("CONTEXT", format_command_context(cwd=Path.cwd().resolve()))
            print_block("ACTION", f"Initialize direct-mode task docs for {task_id} (no branch/worktree)")
            print_block("RESULT", f"readme={readme_rel}")
            print_block(
                "NEXT",
                "\n".join(
                    [
                        "Implement changes in this checkout (no task branches/worktrees).",
                        f"Edit `{readme_rel}` to capture scope/risks/verify steps.",
                        (
                            f'Commit via `python .agent-plane/agentctl.py commit {task_id} -m "…" --auto-allow` '
                            "when ready."
                        ),
                    ]
                ),
            )
        return

    agent = (args.agent or "").strip()
    if is_branch_pr_mode() and not agent:
        die("--agent is required in workflow_mode='branch_pr' (e.g., --agent CODER)", code=2)

    if is_branch_pr_mode() and not getattr(args, "worktree", False):
        die("--worktree is required in workflow_mode='branch_pr' for `work start`", code=2)

    slug = normalize_slug(args.slug or task_title(task_id) or "work")
    base = (args.base or base_branch()).strip()
    branch = default_task_branch(task_id, slug)
    worktree_path = WORKTREES_DIR / f"{task_id}-{slug}"

    print_block("CONTEXT", format_command_context(cwd=Path.cwd().resolve()))
    print_block("ACTION", f"Initialize task checkout for {task_id} (branch+PR+README)")

    cmd_branch_create(
        argparse.Namespace(
            task_id=task_id,
            agent=agent,
            slug=slug,
            base=base,
            worktree=bool(args.worktree),
            reuse=bool(args.reuse),
            quiet=True,
        )
    )

    if not worktree_path.exists():
        die(f"Expected worktree not found: {worktree_path}", code=2)

    readme_in_worktree = worktree_path / ".agent-plane" / "tasks" / task_id / "README.md"
    if readme_in_worktree.exists() and not getattr(args, "overwrite", False):
        pass
    else:
        scaffold_args = ["task", "scaffold", task_id, "--quiet"]
        if getattr(args, "overwrite", False):
            scaffold_args.insert(-1, "--overwrite")
        _run_agentctl_in_checkout(scaffold_args, cwd=worktree_path, quiet=True)

    pr_path = worktree_path / ".agent-plane" / "tasks" / task_id / "pr"
    if pr_path.exists():
        _run_agentctl_in_checkout(["pr", "update", task_id, "--quiet"], cwd=worktree_path, quiet=True)
        pr_action = "updated"
    else:
        _run_agentctl_in_checkout(
            [
                "pr",
                "open",
                task_id,
                "--branch",
                branch,
                "--base",
                base,
                "--author",
                agent,
                "--quiet",
            ],
            cwd=worktree_path,
            quiet=True,
        )
        pr_action = "opened"

    if not args.quiet:
        print_block("RESULT", f"branch={branch} worktree={worktree_path} pr={pr_action}")
        print_block(
            "NEXT",
            "\n".join(
                [
                    f"Open `{worktree_path}` in your IDE",
                    f"Edit `.agent-plane/tasks/{task_id}/README.md` and implement changes",
                    f"Update PR artifacts: `python .agent-plane/agentctl.py pr update {task_id}`",
                ]
            ),
        )


def git_list_task_branches(*, cwd: Path = ROOT) -> list[str]:
    try:
        result = run(
            ["git", "for-each-ref", "--format=%(refname:short)", f"refs/heads/{TASK_BRANCH_PREFIX}"],
            cwd=cwd,
            check=True,
        )
    except subprocess.CalledProcessError as exc:
        die(exc.stderr.strip() or "Failed to list task branches")
    return [line.strip() for line in (result.stdout or "").splitlines() if line.strip()]


def cmd_cleanup_merged(args: argparse.Namespace) -> None:
    require_not_task_worktree(action="cleanup merged")
    ensure_invoked_from_repo_root(action="cleanup merged")
    require_branch(base_branch(), action="cleanup merged")
    ensure_git_clean(action="cleanup merged")

    base = (args.base or base_branch()).strip()
    if not git_branch_exists(base):
        die(f"Unknown base branch: {base}", code=2)

    tasks, _ = load_task_store()
    tasks_by_id, _ = index_tasks_by_id(tasks)

    candidates: list[dict[str, str]] = []
    for branch in git_list_task_branches(cwd=ROOT):
        task_id = parse_task_id_from_task_branch(branch)
        if not task_id:
            continue
        task = tasks_by_id.get(task_id) or {}
        if str(task.get("status") or "").strip().upper() != "DONE":
            continue
        if git_diff_names(base, branch):
            continue
        worktree_path = detect_worktree_path_for_branch(branch, cwd=ROOT)
        worktree_value = str(worktree_path) if worktree_path else ""
        candidates.append({"task_id": task_id, "branch": branch, "worktree": worktree_value})

    print_block("CONTEXT", format_command_context(cwd=Path.cwd().resolve()))
    print_block("ACTION", f"Cleanup merged task branches/worktrees (base={base})")

    if not candidates:
        print_block("RESULT", "no candidates")
        return

    lines = []
    for item in candidates:
        wt = item["worktree"] or "-"
        lines.append(f"- {item['task_id']}: branch={item['branch']} worktree={wt}")
    print_block("RESULT", "\n".join(lines))

    if not getattr(args, "yes", False):
        print_block("NEXT", "Re-run with `--yes` to delete these branches/worktrees.")
        return

    for item in candidates:
        wt = item["worktree"]
        cmd_branch_remove(
            argparse.Namespace(
                branch=item["branch"],
                worktree=wt or None,
                force=True,
                quiet=bool(args.quiet),
            )
        )
    if not args.quiet:
        print_block("RESULT", f"deleted={len(candidates)}")


def workflow_task_dir(task_id: str) -> Path:
    return WORKFLOW_DIR / task_id


def workflow_task_readme_path(task_id: str) -> Path:
    # Canonical per-task documentation (now under .agent-plane/tasks/<task-id>/README.md).
    return workflow_task_dir(task_id) / "README.md"


def pr_dir(task_id: str) -> Path:
    # Layout: .agent-plane/tasks/<task-id>/pr/
    return workflow_task_dir(task_id) / "pr"


def task_readme_template(task_id: str) -> str:
    title = task_title(task_id)
    header = f"# {task_id}: {title}" if title else f"# {task_id}"
    lines = [header, ""]
    for section in task_doc_sections():
        lines.extend([f"## {section}", "", "- ...", ""])
    lines.extend(
        [
            "## Changes Summary (auto)",
            "",
            "<!-- BEGIN AUTO SUMMARY -->",
            "- (no file changes)",
            "<!-- END AUTO SUMMARY -->",
            "",
        ]
    )
    return "\n".join(lines)


def split_frontmatter_block(text: str) -> tuple[str, str]:
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return "", text
    end_idx = None
    for idx in range(1, len(lines)):
        if lines[idx].strip() == "---":
            end_idx = idx
            break
    if end_idx is None:
        return "", text
    front = "\n".join(lines[: end_idx + 1]).rstrip() + "\n"
    body = "\n".join(lines[end_idx + 1 :]).lstrip("\n")
    return front, body


def pr_review_template(task_id: str) -> str:
    return "\n".join(
        [
            f"# Review: {task_id}",
            "",
            "## Checklist",
            "",
            "- [ ] PR artifact complete (README/diffstat/verify.log)",
            "- [ ] No `tasks.json` changes in the task branch",
            "- [ ] Verify commands ran (or justified)",
            "- [ ] Scope matches task goal; risks understood",
            "",
            "## Handoff Notes",
            "",
            "Add short handoff notes here as list items so INTEGRATOR can append them to tasks.json on close.",
            "",
            "- CODER: ...",
            "- TESTER: ...",
            "- DOCS: ...",
            "- REVIEWER: ...",
            "",
            "## Notes",
            "",
            "- ...",
            "",
        ]
    )


def parse_handoff_notes(text: str) -> list[dict[str, str]]:
    sections = extract_markdown_sections(text)
    lines = sections.get("Handoff Notes") or []
    notes: list[dict[str, str]] = []
    for raw in lines:
        line = raw.strip()
        if not line.startswith("-"):
            continue
        payload = line.lstrip("-").strip()
        if not payload:
            continue
        if _is_placeholder_content(payload):
            continue
        if ":" not in payload:
            continue
        author, body = payload.split(":", 1)
        author = author.strip()
        body = body.strip()
        if not author or not body:
            continue
        if _is_placeholder_content(body):
            continue
        notes.append({"author": author, "body": body})
    return notes


def _is_placeholder_content(line: str) -> bool:
    stripped = (line or "").strip()
    if not stripped:
        return True
    lowered = stripped.lower()
    if lowered in {"...", "tbd", "todo", "- ...", "* ..."}:
        return True
    if re.fullmatch(r"[-*]\s*\.\.\.\s*", stripped):
        return True
    return bool(re.fullmatch(r"\.+", stripped))


def extract_markdown_sections(text: str) -> dict[str, list[str]]:
    sections: dict[str, list[str]] = {}
    current: str | None = None
    for raw in (text or "").splitlines():
        line = raw.rstrip()
        if line.startswith("## "):
            current = line[3:].strip()
            sections.setdefault(current, [])
            continue
        if current is not None:
            sections[current].append(line)
    return sections


def parse_doc_sections(text: str) -> tuple[dict[str, list[str]], list[str]]:
    sections: dict[str, list[str]] = {}
    order: list[str] = []
    current: str | None = None
    for raw in (text or "").splitlines():
        line = raw.rstrip()
        if line.startswith("## "):
            current = line[3:].strip()
            if current not in sections:
                sections[current] = []
                order.append(current)
            continue
        if current is not None:
            sections[current].append(line)
    return sections, order


def _trim_blank_lines(lines: list[str]) -> list[str]:
    start = 0
    end = len(lines)
    while start < end and not lines[start].strip():
        start += 1
    while end > start and not lines[end - 1].strip():
        end -= 1
    return lines[start:end]


def _insert_section_order(order: list[str], section: str) -> list[str]:
    if section in order:
        return order
    canonical = list(task_doc_sections())
    if section in canonical:
        idx = canonical.index(section)
        for next_name in canonical[idx + 1 :]:
            if next_name in order:
                insert_at = order.index(next_name)
                return order[:insert_at] + [section] + order[insert_at:]
    return [*order, section]


def ensure_required_doc_sections(sections: dict[str, list[str]], order: list[str]) -> list[str]:
    for name in task_doc_required_sections():
        if name not in sections:
            sections[name] = ["- ..."]
            order = _insert_section_order(order, name)
    return order


def render_doc_sections(sections: dict[str, list[str]], order: list[str]) -> str:
    lines: list[str] = []
    canonical = set(task_doc_sections())
    for name in order:
        content = _trim_blank_lines(sections.get(name, []))
        if not content and name in canonical:
            content = ["- ..."]
        lines.append(f"## {name}")
        lines.append("")
        lines.extend(content)
        lines.append("")
    return "\n".join(lines).rstrip() + "\n"


def normalize_doc_section_name(name: str) -> str:
    raw = (name or "").strip()
    if not raw:
        return raw
    lowered = raw.lower()
    for section in task_doc_sections():
        if section.lower() == lowered:
            return section
    return raw


def pr_validate_description(text: str) -> tuple[list[str], list[str]]:
    missing_sections: list[str] = []
    empty_sections: list[str] = []
    sections = extract_markdown_sections(text)
    for section in task_doc_required_sections():
        if section not in sections:
            missing_sections.append(section)
            continue
        lines = [ln for ln in sections.get(section, []) if ln.strip()]
        meaningful = [ln for ln in lines if not _is_placeholder_content(ln)]
        if not meaningful:
            empty_sections.append(section)
    return missing_sections, empty_sections


def validate_task_doc_complete(task_id: str, *, source_text: str | None = None) -> None:
    doc_text = source_text
    if doc_text is None:
        readme_path = workflow_task_readme_path(task_id)
        if not readme_path.exists():
            return
        doc_text = readme_path.read_text(encoding="utf-8", errors="replace")
    missing, empty = pr_validate_description(doc_text)
    if missing:
        die(f"{task_id}: task doc missing required section(s): {', '.join(missing)}", code=2)
    if empty:
        die(f"{task_id}: task doc has placeholder/empty section(s): {', '.join(empty)}", code=2)


def pr_load_meta(meta_path: Path) -> JsonDict:
    if not meta_path.exists():
        return {}
    return load_json(meta_path)


def pr_load_meta_text(text: str, *, source: str) -> JsonDict:
    try:
        data = json.loads(text)
    except json.JSONDecodeError as exc:
        die(f"Invalid JSON in {source}: {exc}", code=2)
    if not isinstance(data, dict):
        die(f"Invalid JSON in {source}: expected object", code=2)
    return cast(JsonDict, data)


def pr_try_read_file_text(task_id: str, filename: str, *, branch: str | None) -> str | None:
    candidates = [pr_dir(task_id) / filename]
    for path in candidates:
        if path.exists():
            return path.read_text(encoding="utf-8", errors="replace")
    if not branch:
        return None
    for path in candidates:
        rel = path.relative_to(ROOT).as_posix()
        text = git_show_text(branch, rel, cwd=ROOT)
        if text is not None:
            return text
    return None


def pr_try_read_doc_text(task_id: str, *, branch: str | None) -> str | None:
    """
    PR "description" doc:
      - .agent-plane/tasks/<task-id>/README.md
    """
    readme = workflow_task_readme_path(task_id)
    if branch:
        rel = readme.relative_to(ROOT).as_posix()
        text = git_show_text(branch, rel, cwd=ROOT)
        if text is not None:
            return text
    if readme.exists():
        return readme.read_text(encoding="utf-8", errors="replace")
    return None


def pr_read_file_text(task_id: str, filename: str, *, branch: str | None) -> str:
    text = pr_try_read_file_text(task_id, filename, branch=branch)
    if text is not None:
        return text
    target = pr_dir(task_id)
    if not branch:
        die(
            "\n".join(
                [
                    "Missing PR artifact dir in this checkout.",
                    "Fix:",
                    (
                        f"  1) Re-run with `--branch {task_branch_example(task_id, '<slug>')}` so agentctl can read PR "
                        "artifacts from that branch"
                    ),
                    "  2) Or check out the task branch that contains the PR artifact files",
                    f"Expected (new): {target.relative_to(ROOT)}",
                    f"Context: {format_command_context(cwd=Path.cwd().resolve())}",
                ]
            ),
            code=2,
        )

    rel = (target / filename).relative_to(ROOT).as_posix()
    die(
        "\n".join(
            [
                f"Missing PR artifact file in {branch!r}: {rel}",
                "Fix:",
                (
                    f"  1) Ensure the task branch contains `{rel}` (run `python .agent-plane/agentctl.py pr open "
                    f"{task_id}` in the branch)"
                ),
                "  2) Commit the PR artifact files to the task branch",
                "  3) Re-run the command",
                f"Context: {format_command_context(cwd=Path.cwd().resolve())}",
            ]
        ),
        code=2,
    )


def pr_write_meta(meta_path: Path, meta: JsonDict) -> None:
    write_json(meta_path, meta)


def pr_ensure_skeleton(*, task_id: str, branch: str, author: str, base_branch: str) -> Path:
    target = pr_dir(task_id)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.mkdir(parents=True, exist_ok=True)

    readme_path = workflow_task_readme_path(task_id)
    if not readme_path.exists():
        readme_path.write_text(task_readme_template(task_id), encoding="utf-8")

    meta_path = target / "meta.json"
    meta = pr_load_meta(meta_path)
    created_at = meta.get("created_at") if isinstance(meta.get("created_at"), str) else now_iso_utc()

    meta.update(
        {
            "task_id": task_id,
            "task_title": task_title(task_id),
            "branch": branch,
            "base_branch": base_branch,
            "author": author,
            "created_at": created_at,
            "updated_at": now_iso_utc(),
            "head_sha": git_rev_parse(branch),
            "merge_strategy": meta.get("merge_strategy") or "squash",
            "status": meta.get("status") or "OPEN",
        }
    )
    pr_write_meta(meta_path, meta)

    diffstat_path = target / "diffstat.txt"
    if not diffstat_path.exists():
        diffstat_path.write_text("", encoding="utf-8")

    verify_path = target / "verify.log"
    if not verify_path.exists():
        verify_path.write_text("# Verify log\n\n", encoding="utf-8")

    review_path = target / "review.md"
    if not review_path.exists():
        review_path.write_text(pr_review_template(task_id), encoding="utf-8")

    return target


def cmd_pr_open(args: argparse.Namespace) -> None:
    task_id = args.task_id.strip()
    if not task_id:
        die("task_id must be non-empty", code=2)
    author = (args.author or "").strip()
    if is_branch_pr_mode() and not author:
        die("--author is required in workflow_mode='branch_pr' (e.g., --author CODER)", code=2)
    if not author:
        author = "unknown"

    branch = (args.branch or git_current_branch()).strip()
    base = (args.base or base_branch()).strip()
    if branch == base:
        die(f"Refusing to open PR on base branch {base!r}", code=2)
    if is_branch_pr_mode():
        parsed = parse_task_id_from_task_branch(branch)
        if parsed != task_id:
            die(
                f"Branch {branch!r} does not match task id {task_id} (expected {task_branch_example(task_id, '<slug>')})",
                code=2,
            )
    if not git_branch_exists(branch):
        die(f"Unknown branch: {branch}", code=2)

    target = pr_dir(task_id)
    if target.exists():
        die(f"PR artifact dir already exists: {target} (use `pr update`)", code=2)

    target = pr_ensure_skeleton(task_id=task_id, branch=branch, author=author, base_branch=base)
    cmd_pr_update(argparse.Namespace(task_id=task_id, branch=branch, base=base, quiet=True))
    if not args.quiet:
        print_block("CONTEXT", format_command_context(cwd=Path.cwd().resolve()))
        print_block("ACTION", f"Open PR artifact for {task_id}")
        print_block("RESULT", f"dir={target.relative_to(ROOT)} branch={branch} base={base} author={author}")
        readme_rel = workflow_task_readme_path(task_id).relative_to(ROOT)
        print_block(
            "NEXT",
            f"Fill out `{readme_rel}` then run `python .agent-plane/agentctl.py pr check {task_id}`.",
        )


def update_task_readme_auto_summary(task_id: str, *, changed: list[str]) -> None:
    readme_path = workflow_task_readme_path(task_id)
    if not readme_path.exists():
        readme_path.parent.mkdir(parents=True, exist_ok=True)
        readme_path.write_text(task_readme_template(task_id), encoding="utf-8")
    text = readme_path.read_text(encoding="utf-8", errors="replace")
    lines = text.splitlines()
    begin_marker = "<!-- BEGIN AUTO SUMMARY -->"
    end_marker = "<!-- END AUTO SUMMARY -->"
    begins = [i for i, line in enumerate(lines) if line.strip() == begin_marker]
    if not begins:
        return
    begin = max(begins)
    ends_after = [i for i, line in enumerate(lines) if i > begin and line.strip() == end_marker]
    if not ends_after:
        return
    end = min(ends_after)
    summary_lines = [f"- `{name}`" for name in (changed or [])[:20]]
    if not summary_lines:
        summary_lines = ["- (no file changes)"]
    new_lines = lines[: begin + 1] + summary_lines + lines[end:]
    new_text = "\n".join(new_lines) + ("\n" if text.endswith("\n") else "")
    if new_text != text:
        readme_path.write_text(new_text, encoding="utf-8")
        touch_task_doc_metadata(task_id)


def touch_task_doc_metadata(task_id: str, *, updated_by: str = "agentctl") -> None:
    backend = backend_instance()
    touch = getattr(backend, "touch_task_doc_metadata", None) if backend else None
    if callable(touch):
        touch(task_id, updated_by=updated_by)


def cmd_pr_update(args: argparse.Namespace) -> None:
    task_id = args.task_id.strip()
    if not task_id:
        die("task_id must be non-empty", code=2)

    target = pr_dir(task_id)
    if not target.exists():
        die(f"Missing PR artifact dir: {target}", code=2)

    meta_path = target / "meta.json"
    meta = pr_load_meta(meta_path)
    branch = (args.branch or str(meta.get("branch") or "")).strip() or git_current_branch()
    base = (args.base or str(meta.get("base_branch") or base_branch())).strip()
    if not git_branch_exists(branch):
        die(f"Unknown branch: {branch}", code=2)

    diffstat = git_diff_stat(base, branch)
    (target / "diffstat.txt").write_text(diffstat, encoding="utf-8")

    meta.update(
        {
            "updated_at": now_iso_utc(),
            "head_sha": git_rev_parse(branch),
            "branch": branch,
            "base_branch": base,
        }
    )
    pr_write_meta(meta_path, meta)

    update_task_readme_auto_summary(task_id, changed=git_diff_names(base, branch))

    if not args.quiet:
        print_block("CONTEXT", format_command_context(cwd=Path.cwd().resolve()))
        print_block("ACTION", f"Update PR artifact for {task_id}")
        print_block("RESULT", f"dir={target.relative_to(ROOT)} branch={branch} base={base}")
        print_block(
            "NEXT",
            f"Run `python .agent-plane/agentctl.py pr check {task_id} --branch {branch} --base {base}`.",
        )


def pr_check(
    task_id: str,
    *,
    branch: str | None = None,
    base: str | None = None,
    quiet: bool = False,
) -> None:
    target = pr_dir(task_id)
    meta_rel = (target / "meta.json").relative_to(ROOT).as_posix()
    meta_text = pr_read_file_text(task_id, "meta.json", branch=branch)
    meta_source = meta_rel if (target / "meta.json").exists() else f"{branch}:{meta_rel}"
    meta = pr_load_meta_text(meta_text, source=meta_source)
    meta_task_id = str(meta.get("task_id") or "").strip()
    if meta_task_id and meta_task_id != task_id:
        die(f"PR meta.json task_id mismatch: expected {task_id}, got {meta_task_id}", code=2)

    base_ref = (base or str(meta.get("base_branch") or base_branch())).strip()
    meta_branch = str(meta.get("branch") or "").strip()
    if branch and meta_branch and meta_branch != branch:
        die(f"PR meta.json branch mismatch: expected {branch}, got {meta_branch}", code=2)
    pr_branch = (branch or meta_branch) or git_current_branch()
    if git_status_porcelain(cwd=Path.cwd().resolve()):
        message = (
            "Working tree is dirty (pr check requires clean state)\n"
            f"Context: {format_command_context(cwd=Path.cwd().resolve())}"
        )
        die(
            message,
            code=2,
        )
    if not git_branch_exists(pr_branch):
        die(f"Unknown branch: {pr_branch}", code=2)
    if not git_branch_exists(base_ref):
        die(f"Unknown base branch: {base_ref}", code=2)
    parsed_task_id = parse_task_id_from_task_branch(pr_branch)
    if is_branch_pr_mode() and parsed_task_id != task_id:
        die(
            f"Branch {pr_branch!r} does not match task id {task_id} (expected {task_branch_example(task_id, '<slug>')})",
            code=2,
        )

    required_files = ["meta.json", "diffstat.txt", "verify.log"]
    artifact_branch = pr_branch if not target.exists() else None
    missing_files = [
        name for name in required_files if pr_try_read_file_text(task_id, name, branch=artifact_branch) is None
    ]
    if missing_files:
        die(f"Missing PR artifact file(s): {', '.join(missing_files)}", code=2)

    pr_doc = pr_try_read_doc_text(task_id, branch=artifact_branch)
    if pr_doc is None:
        readme_rel = workflow_task_readme_path(task_id).relative_to(ROOT).as_posix()
        die(f"Missing PR doc: {readme_rel}", code=2)
    missing_sections, empty_sections = pr_validate_description(pr_doc)
    doc_hint = workflow_task_readme_path(task_id).relative_to(ROOT).as_posix()
    if missing_sections:
        die(f"PR doc {doc_hint} missing required section(s): {', '.join(missing_sections)}", code=2)
    if empty_sections:
        die(f"PR doc {doc_hint} has empty section(s): {', '.join(empty_sections)}", code=2)
    validate_task_doc_complete(task_id, source_text=pr_doc)

    subjects = git_log_subjects(base_ref, pr_branch, limit=200)
    if not subjects:
        die(f"No commits found on {pr_branch!r} compared to {base_ref!r}", code=2)
    if not any(commit_subject_mentions_task(task_id, subject) for subject in subjects):
        sample = "; ".join(subjects[:3])
        die(commit_subject_missing_error([task_id], sample, context=f"Branch {pr_branch!r}"), code=2)

    changed = git_diff_names(base_ref, pr_branch)
    if TASKS_PATH_REL in changed:
        die(f"Branch {pr_branch!r} modifies {TASKS_PATH_REL} (single-writer violation)", code=2)

    if not quiet:
        print_block("CONTEXT", format_command_context(cwd=Path.cwd().resolve()))
        print_block("ACTION", f"Validate PR for {task_id}")
        print_block("RESULT", f"dir={target.relative_to(ROOT)} branch={pr_branch} base={base_ref}")
        print_block("NEXT", "If green, INTEGRATOR can run `python .agent-plane/agentctl.py integrate ...`.")


def cmd_pr_check(args: argparse.Namespace) -> None:
    task_id = args.task_id.strip()
    if not task_id:
        die("task_id must be non-empty", code=2)
    pr_check(task_id, branch=args.branch, base=args.base, quiet=bool(args.quiet))


def append_pr_handoff_note(review_path: Path, *, author: str, body: str) -> None:
    author_clean = (author or "").strip()
    body_clean = (body or "").strip()
    if not author_clean:
        die("--author must be non-empty", code=2)
    if not body_clean:
        die("--body must be non-empty", code=2)

    note_line = f"- {author_clean}: {body_clean}"
    text = review_path.read_text(encoding="utf-8", errors="replace")
    lines = text.splitlines()

    header = "## Handoff Notes"
    try:
        header_idx = next(i for i, line in enumerate(lines) if line.strip() == header)
    except StopIteration:
        die(f"Missing section {header!r} in {review_path.relative_to(ROOT)}", code=2)

    next_header_idx = None
    for idx in range(header_idx + 1, len(lines)):
        if lines[idx].strip().startswith("## "):
            next_header_idx = idx
            break
    section_end = next_header_idx if next_header_idx is not None else len(lines)

    if note_line in [ln.rstrip() for ln in lines[header_idx + 1 : section_end]]:
        return

    insert_at = section_end
    while insert_at > header_idx + 1 and not lines[insert_at - 1].strip():
        insert_at -= 1

    new_lines = list(lines)
    new_lines.insert(insert_at, note_line)
    review_path.write_text("\n".join(new_lines).rstrip() + "\n", encoding="utf-8")


def cmd_pr_note(args: argparse.Namespace) -> None:
    task_id = args.task_id.strip()
    if not task_id:
        die("task_id must be non-empty", code=2)
    author = (args.author or "").strip()
    body = (args.body or "").strip()
    if not author:
        die("--author is required (e.g., --author CODER)", code=2)
    if not body:
        die("--body is required", code=2)

    target = pr_dir(task_id)
    review_path = target / "review.md"
    if not review_path.exists():
        die(
            "\n".join(
                [
                    f"Missing PR artifact file: {review_path.relative_to(ROOT)}",
                    "Fix:",
                    (
                        f"  1) Run `python .agent-plane/agentctl.py pr open {task_id} --author {author} "
                        f"--branch {task_branch_example(task_id, '<slug>')}`"
                    ),
                    "  2) Commit the PR artifact files on the task branch",
                    f'  3) Re-run `python .agent-plane/agentctl.py pr note {task_id} --author {author} --body "..."`',
                    f"Context: {format_command_context(cwd=Path.cwd().resolve())}",
                ]
            ),
            code=2,
        )

    append_pr_handoff_note(review_path, author=author, body=body)
    if not args.quiet:
        print_block("CONTEXT", format_command_context(cwd=Path.cwd().resolve()))
        print_block("ACTION", f"Append handoff note for {task_id}")
        print_block("RESULT", f"path={review_path.relative_to(ROOT)} author={author}")


def get_task_verify_commands_for(task_id: str) -> list[str]:
    tasks, _ = load_task_store()
    task = _ensure_task_object(tasks, task_id)
    verify = task.get("verify")
    if verify is None:
        return []
    if isinstance(verify, list):
        return [cmd.strip() for cmd in verify if isinstance(cmd, str) and cmd.strip()]
    die(f"{task_id}: verify must be a list of strings", code=2)


def append_verify_log(path: Path, *, header: str, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as handle:
        handle.write(header.rstrip() + "\n")
        if content:
            handle.write(content.rstrip() + "\n")
        handle.write("\n")


def run_verify_with_capture(
    task_id: str,
    *,
    cwd: Path,
    quiet: bool,
    log_path: Path | None = None,
    current_sha: str | None = None,
) -> list[tuple[str, str]]:
    commands = get_task_verify_commands_for(task_id)
    entries: list[tuple[str, str]] = []
    if not commands:
        timestamp = now_iso_utc()
        header = f"[{timestamp}] ℹ️ no verify commands configured"
        entries.append((header, ""))
        if log_path:
            append_verify_log(log_path, header=header, content="")
        if not quiet:
            print(f"ℹ️ {task_id}: no verify commands configured")
        return entries

    for command in commands:
        if not quiet:
            print(f"$ {command}")
        timestamp = now_iso_utc()
        proc = subprocess.run(command, cwd=str(cwd), shell=True, text=True, capture_output=True, check=False)
        output = ""
        if proc.stdout:
            output += proc.stdout
        if proc.stderr:
            output += ("\n" if output and not output.endswith("\n") else "") + proc.stderr
        sha_prefix = f"sha={current_sha} " if current_sha else ""
        header = f"[{timestamp}] {sha_prefix}$ {command}".rstrip()
        entries.append((header, output))
        if log_path:
            append_verify_log(log_path, header=header, content=output)
        if proc.returncode != 0:
            raise SystemExit(proc.returncode)
    if current_sha:
        timestamp = now_iso_utc()
        header = f"[{timestamp}] ✅ verified_sha={current_sha}"
        entries.append((header, ""))
        if log_path:
            append_verify_log(log_path, header=header, content="")
    if not quiet:
        print(f"✅ verify passed for {task_id}")
    return entries


def cmd_integrate(args: argparse.Namespace) -> None:
    require_not_task_worktree(action="integrate")
    ensure_invoked_from_repo_root(action="integrate")
    require_branch(base_branch(), action="integrate")
    ensure_git_clean(action="integrate")
    ensure_path_ignored(WORKTREES_DIRNAME, cwd=ROOT)

    task_id = args.task_id.strip()
    if not task_id:
        die("task_id must be non-empty", code=2)

    ok, warnings = readiness(task_id)
    if not ok:
        for warning in warnings:
            print(f"⚠️ {warning}")
        die(f"Task is not ready: {task_id} (use --force to override)", code=2)

    pr_path = pr_dir(task_id)
    branch = (args.branch or "").strip()
    if not branch:
        existing_meta = pr_load_meta(pr_path / "meta.json")
        branch = str(existing_meta.get("branch") or "").strip()
    if not branch:
        die("Missing --branch (and PR meta.json is not available in this checkout)", code=2)

    meta_rel = (pr_path / "meta.json").relative_to(ROOT).as_posix()
    meta_text = pr_read_file_text(task_id, "meta.json", branch=branch)
    meta_source = meta_rel if (pr_path / "meta.json").exists() else f"{branch}:{meta_rel}"
    meta = pr_load_meta_text(meta_text, source=meta_source)

    base = (args.base or str(meta.get("base_branch") or base_branch())).strip()
    strategy = (args.merge_strategy or str(meta.get("merge_strategy") or "squash")).strip().lower()
    if strategy not in {"squash", "merge", "rebase"}:
        die("--merge-strategy must be squash|merge|rebase", code=2)

    print_block("CONTEXT", format_command_context(cwd=Path.cwd().resolve()))
    print_block("ACTION", f"Integrate {branch} into {base} for {task_id} (strategy={strategy})")

    pr_check(task_id, branch=branch, base=base, quiet=True)
    assert_no_diff_paths(base=base, branch=branch, forbidden=[TASKS_PATH_REL], cwd=ROOT)
    base_sha_before_merge = git_rev_parse(base)

    verify_commands = get_task_verify_commands_for(task_id)
    branch_head_sha = git_rev_parse(branch)
    already_verified_sha: str | None = None
    if verify_commands and not args.run_verify:
        meta_verified = str(meta.get("last_verified_sha") or "").strip()
        if meta_verified and meta_verified == branch_head_sha:
            already_verified_sha = branch_head_sha
        else:
            log_text = pr_try_read_file_text(task_id, "verify.log", branch=branch)
            if log_text:
                log_verified = extract_last_verified_sha_from_log(log_text)
                if log_verified and log_verified == branch_head_sha:
                    already_verified_sha = branch_head_sha
    should_run_verify = bool(args.run_verify) or (bool(verify_commands) and not already_verified_sha)

    worktree_path = detect_worktree_path_for_branch(branch, cwd=ROOT)
    created_temp = False
    temp_path = WORKTREES_DIR / f"_integrate_tmp_{task_id}"
    if strategy == "rebase" and not worktree_path:
        die("Rebase strategy requires an existing worktree for the task branch", code=2)
    if should_run_verify and not worktree_path:
        if args.dry_run:
            print_block("RESULT", f"verify_worktree=(would create {temp_path})")
        else:
            if temp_path.exists():
                registered = detect_branch_for_worktree_path(temp_path, cwd=ROOT)
                if not registered:
                    die(f"Temp worktree path exists but is not registered: {temp_path}", code=2)
            else:
                WORKTREES_DIR.mkdir(parents=True, exist_ok=True)
                try:
                    run(["git", "worktree", "add", str(temp_path), branch], check=True)
                except subprocess.CalledProcessError as exc:
                    die(exc.stderr.strip() or exc.stdout.strip() or "git worktree add failed")
                created_temp = True
            worktree_path = temp_path

    if args.dry_run:
        verify_label = "yes" if should_run_verify else "no"
        if verify_commands and not should_run_verify and already_verified_sha:
            verify_label = f"no (already verified_sha={already_verified_sha})"
        print_block("RESULT", f"pr_check=OK base={base} branch={branch} verify={verify_label}")
        print_block("NEXT", "Re-run without --dry-run to perform merge+finish.")
        return

    try:
        verify_entries: list[tuple[str, str]] = []

        head_before = git_rev_parse("HEAD")
        merge_hash = ""
        if strategy == "squash":
            if should_run_verify:
                if not worktree_path:
                    die("Unable to locate/create a worktree for verify execution", code=2)
                verify_entries = run_verify_with_capture(
                    task_id,
                    cwd=worktree_path,
                    quiet=bool(args.quiet),
                    log_path=None,
                    current_sha=branch_head_sha,
                )
            proc = run(["git", "merge", "--squash", branch], check=False)
            if proc.returncode != 0:
                run(["git", "reset", "--hard", head_before], check=False)
                die(
                    proc.stderr.strip() or proc.stdout.strip() or "git merge --squash failed",
                    code=2,
                )
            staged_after_squash = run(["git", "diff", "--cached", "--name-only"], check=True).stdout.strip()
            if not staged_after_squash:
                run(["git", "reset", "--hard", head_before], check=False)
                die(f"Nothing to integrate: {branch!r} is already merged into {base!r}", code=2)
            subject = run(["git", "log", "-1", "--pretty=format:%s", branch], cwd=ROOT, check=True).stdout.strip()
            if not subject or task_id not in subject:
                subject = f"🧩 {task_id} integrate {branch}"
            proc = run(
                ["git", "commit", "-m", subject],
                check=False,
                env=build_hook_env(task_id=task_id, allow_tasks=False, allow_base=True),
            )
            if proc.returncode != 0:
                run(["git", "reset", "--hard", head_before], check=False)
                die(proc.stderr.strip() or proc.stdout.strip() or "git commit failed", code=2)
            merge_hash = git_rev_parse("HEAD")
        elif strategy == "merge":
            if should_run_verify:
                if not worktree_path:
                    die("Unable to locate/create a worktree for verify execution", code=2)
                verify_entries = run_verify_with_capture(
                    task_id,
                    cwd=worktree_path,
                    quiet=bool(args.quiet),
                    log_path=None,
                    current_sha=branch_head_sha,
                )
            proc = run(
                ["git", "merge", "--no-ff", branch, "-m", f"🔀 {task_id} merge {branch}"],
                check=False,
                env=build_hook_env(task_id=task_id, allow_tasks=False, allow_base=True),
            )
            if proc.returncode != 0:
                run(["git", "reset", "--hard", head_before], check=False)
                die(proc.stderr.strip() or proc.stdout.strip() or "git merge failed", code=2)
            merge_hash = git_rev_parse("HEAD")
        else:
            if worktree_path is None:
                die("Rebase strategy requires an existing worktree for the task branch", code=2)
            proc = run(["git", "rebase", base], cwd=worktree_path, check=False)
            if proc.returncode != 0:
                run(["git", "rebase", "--abort"], cwd=worktree_path, check=False)
                die(proc.stderr.strip() or proc.stdout.strip() or "git rebase failed", code=2)
            branch_head_sha = git_rev_parse(branch)
            if verify_commands and not args.run_verify:
                already_verified_sha = None
                meta_verified = str(meta.get("last_verified_sha") or "").strip()
                if meta_verified and meta_verified == branch_head_sha:
                    already_verified_sha = branch_head_sha
                else:
                    log_text = pr_try_read_file_text(task_id, "verify.log", branch=branch)
                    if log_text:
                        log_verified = extract_last_verified_sha_from_log(log_text)
                        if log_verified and log_verified == branch_head_sha:
                            already_verified_sha = branch_head_sha
                should_run_verify = bool(verify_commands) and not already_verified_sha
            if should_run_verify:
                verify_entries = run_verify_with_capture(
                    task_id,
                    cwd=worktree_path,
                    quiet=bool(args.quiet),
                    log_path=None,
                    current_sha=branch_head_sha,
                )
            proc = run(["git", "merge", "--ff-only", branch], check=False)
            if proc.returncode != 0:
                run(["git", "reset", "--hard", head_before], check=False)
                die(
                    proc.stderr.strip() or proc.stdout.strip() or "git merge --ff-only failed",
                    code=2,
                )
            merge_hash = git_rev_parse("HEAD")

        if not verify_commands:
            verify_desc = "skipped(no commands)"
        elif should_run_verify:
            verify_desc = "ran"
        elif already_verified_sha:
            verify_desc = f"skipped(already verified_sha={already_verified_sha})"
        else:
            verify_desc = "skipped"
        finish_body = f"Verified: Integrated via {strategy}; verify={verify_desc}; pr={pr_path.relative_to(ROOT)}."
        cmd_finish(
            argparse.Namespace(
                task_id=task_id,
                commit=merge_hash,
                author="INTEGRATOR",
                body=finish_body,
                skip_verify=True,
                quiet=bool(args.quiet),
                force=False,
                require_task_id_in_commit=True,
            )
        )
        cmd_task_lint(argparse.Namespace(quiet=bool(args.quiet)))

        if not pr_path.exists():
            die(f"Missing PR artifact dir after merge: {pr_path}", code=2)
        if should_run_verify and verify_entries:
            verify_log = pr_path / "verify.log"
            for header, content in verify_entries:
                append_verify_log(verify_log, header=header, content=content)
        meta_path = pr_path / "meta.json"
        meta_main = pr_load_meta(meta_path)
        now = now_iso_utc()
        meta_main.update(
            {
                "merge_strategy": strategy,
                "status": "MERGED",
                "merged_at": meta_main.get("merged_at") or now,
                "merge_commit": merge_hash,
                "head_sha": branch_head_sha,
                "updated_at": now,
            }
        )
        if should_run_verify and verify_entries and branch_head_sha:
            meta_main["last_verified_sha"] = branch_head_sha
            meta_main["last_verified_at"] = now
        pr_write_meta(meta_path, meta_main)

        (pr_path / "diffstat.txt").write_text(git_diff_stat(base_sha_before_merge, branch), encoding="utf-8")
        update_task_readme_auto_summary(task_id, changed=git_diff_names(base_sha_before_merge, branch))

        print_block("RESULT", f"merge_commit={merge_hash} finish=OK")
        next_steps = (
            f"Commit closure on base branch: stage `{TASKS_PATH_REL}` + `{(pr_path / 'meta.json').relative_to(ROOT)}` "
            f"(and any docs), then commit `✅ {task_id} close ...`."
        )
        print_block(
            "NEXT",
            next_steps,
        )
    finally:
        if created_temp:
            run(["git", "worktree", "remove", "--force", str(temp_path)], check=False)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="agentctl", description="TokenSpot agent workflow helper")
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_quickstart = sub.add_parser("quickstart", help="Print agentctl usage quick reference (.agent-plane/agentctl.md)")
    p_quickstart.set_defaults(func=cmd_quickstart)

    p_role = sub.add_parser("role", help="Show role-specific command guidance from agentctl.md")
    p_role.add_argument("role", help="Agent role id (e.g., CODER)")
    p_role.set_defaults(func=cmd_role)

    p_agents = sub.add_parser("agents", help="List registered agents under .agent-plane/agents/")
    p_agents.set_defaults(func=cmd_agents)

    p_config = sub.add_parser("config", help="Inspect or update .agent-plane/config.json")
    config_sub = p_config.add_subparsers(dest="config_cmd", required=True)

    p_config_show = config_sub.add_parser("show", help="Print config.json")
    p_config_show.set_defaults(func=cmd_config_show)

    p_config_set = config_sub.add_parser("set", help="Set a config value by dotted path")
    p_config_set.add_argument("key", help="Dotted path (e.g., tasks.verify.required_tags)")
    p_config_set.add_argument("value", help="Value to set (string unless --json)")
    p_config_set.add_argument("--json", action="store_true", help="Parse value as JSON")
    p_config_set.set_defaults(func=cmd_config_set)

    p_ready = sub.add_parser("ready", help="Check if a task is ready to start (dependencies DONE)")
    p_ready.add_argument("task_id")
    p_ready.set_defaults(func=cmd_ready)

    p_verify = sub.add_parser("verify", help="Run verify commands declared on a task (tasks.json)")
    p_verify.add_argument("task_id")
    p_verify.add_argument(
        "--cwd",
        help="Run verify commands in this repo subdirectory/worktree (must be under repo root)",
    )
    p_verify.add_argument(
        "--log",
        help="Append output to a log file (e.g., .agent-plane/tasks/<task-id>/pr/verify.log)",
    )
    p_verify.add_argument(
        "--skip-if-unchanged",
        action="store_true",
        help="Skip verify when the current SHA matches the last verified SHA (when available via PR meta/log).",
    )
    p_verify.add_argument("--quiet", action="store_true", help="Minimal output")
    p_verify.add_argument("--require", action="store_true", help="Fail if no verify commands exist")
    p_verify.set_defaults(func=cmd_verify)

    p_upgrade = sub.add_parser(
        "upgrade", help="Refresh the Agent Plane framework from the upstream release"
    )
    p_upgrade.add_argument("--force", action="store_true", help="Force the upgrade regardless of the last date")
    p_upgrade.add_argument("--quiet", action="store_true", help="Minimal output")
    p_upgrade.set_defaults(func=cmd_upgrade)

    p_work = sub.add_parser("work", help="One-command helpers to start a task checkout")
    work_sub = p_work.add_subparsers(dest="work_cmd", required=True)

    p_work_start = work_sub.add_parser("start", help="Create branch+worktree and initialize per-task artifacts")
    p_work_start.add_argument("task_id")
    p_work_start.add_argument("--agent", help="Agent creating the checkout (e.g., CODER)")
    p_work_start.add_argument(
        "--slug", required=True, help="Short slug for the branch/worktree name (e.g., work-start)"
    )
    p_work_start.add_argument("--base", help="Base branch (default: pinned base branch or 'main').")
    p_work_start.add_argument("--worktree", action="store_true", help=f"Create a worktree under {WORKTREES_DIRNAME}/")
    p_work_start.add_argument("--reuse", action="store_true", help="Reuse an existing registered worktree if present")
    p_work_start.add_argument(
        "--overwrite",
        action="store_true",
        help="Overwrite .agent-plane/tasks/<task-id>/README.md when scaffolding",
    )
    p_work_start.add_argument("--quiet", action="store_true", help="Minimal output")
    p_work_start.set_defaults(func=cmd_work_start)

    p_cleanup = sub.add_parser("cleanup", help="Cleanup helpers (dry-run by default)")
    cleanup_sub = p_cleanup.add_subparsers(dest="cleanup_cmd", required=True)

    p_cleanup_merged = cleanup_sub.add_parser("merged", help="Remove merged task branches and their worktrees")
    p_cleanup_merged.add_argument("--base", help="Base branch (default: pinned base branch or 'main').")
    p_cleanup_merged.add_argument(
        "--yes",
        action="store_true",
        help="Actually delete; without this flag, prints a dry-run plan",
    )
    p_cleanup_merged.add_argument("--quiet", action="store_true", help="Minimal output")
    p_cleanup_merged.set_defaults(func=cmd_cleanup_merged)

    p_branch = sub.add_parser("branch", help="Task branch + worktree helpers (single task per branch)")
    branch_sub = p_branch.add_subparsers(dest="branch_cmd", required=True)

    p_branch_create = branch_sub.add_parser("create", help="Create task branch (optionally with a git worktree)")
    p_branch_create.add_argument("task_id")
    p_branch_create.add_argument("--agent", help="Agent creating the branch (e.g., CODER)")
    p_branch_create.add_argument(
        "--slug", required=True, help="Short slug for the branch/worktree name (e.g., auth-cache)"
    )
    p_branch_create.add_argument("--base", help="Base branch (default: pinned base branch or 'main').")
    p_branch_create.add_argument(
        "--worktree", action="store_true", help=f"Create a worktree under {WORKTREES_DIRNAME}/"
    )
    p_branch_create.add_argument(
        "--reuse", action="store_true", help="Reuse an existing registered worktree if present"
    )
    p_branch_create.add_argument("--quiet", action="store_true", help="Minimal output")
    p_branch_create.set_defaults(func=cmd_branch_create)

    p_branch_status = branch_sub.add_parser(
        "status", help="Show quick branch/task status (ahead/behind, worktree path)"
    )
    p_branch_status.add_argument("--branch", help="Branch name (default: current branch)")
    p_branch_status.add_argument("--base", help="Base branch (default: pinned base branch or 'main').")
    p_branch_status.set_defaults(func=cmd_branch_status)

    p_branch_remove = branch_sub.add_parser(
        "remove", help="Remove a task worktree and/or branch (manual confirmation recommended)"
    )
    p_branch_remove.add_argument("--branch", help="Branch name to delete")
    p_branch_remove.add_argument("--worktree", help="Worktree path to remove (relative or absolute)")
    p_branch_remove.add_argument("--force", action="store_true", help="Force deletion")
    p_branch_remove.add_argument("--quiet", action="store_true", help="Minimal output")
    p_branch_remove.set_defaults(func=cmd_branch_remove)

    p_pr = sub.add_parser("pr", help="Local PR artifact helpers (.agent-plane/tasks/<task-id>/pr)")
    pr_sub = p_pr.add_subparsers(dest="pr_cmd", required=True)

    p_pr_open = pr_sub.add_parser("open", help="Create PR artifact folder + templates")
    p_pr_open.add_argument("task_id")
    p_pr_open.add_argument("--branch", help="Task branch name (default: current branch)")
    p_pr_open.add_argument("--base", help="Base branch (default: pinned base branch or 'main').")
    p_pr_open.add_argument("--author", help="Agent/author creating the PR artifact (e.g., CODER)")
    p_pr_open.add_argument("--quiet", action="store_true", help="Minimal output")
    p_pr_open.set_defaults(func=cmd_pr_open)

    p_pr_update = pr_sub.add_parser("update", help="Refresh PR meta + diffstat from git")
    p_pr_update.add_argument("task_id")
    p_pr_update.add_argument("--branch", help="Override branch name (default: from meta.json)")
    p_pr_update.add_argument("--base", help="Override base branch (default: from meta.json)")
    p_pr_update.add_argument("--quiet", action="store_true", help="Minimal output")
    p_pr_update.set_defaults(func=cmd_pr_update)

    p_pr_check = pr_sub.add_parser("check", help="Validate PR artifact completeness + branch invariants")
    p_pr_check.add_argument("task_id")
    p_pr_check.add_argument("--branch", help="Override branch name (default: from meta.json)")
    p_pr_check.add_argument("--base", help="Override base branch (default: from meta.json)")
    p_pr_check.add_argument("--quiet", action="store_true", help="Minimal output")
    p_pr_check.set_defaults(func=cmd_pr_check)

    p_pr_note = pr_sub.add_parser(
        "note", help="Append a handoff note bullet to .agent-plane/tasks/<task-id>/pr/review.md"
    )
    p_pr_note.add_argument("task_id")
    p_pr_note.add_argument("--author", required=True, help="Note author/role (e.g., CODER)")
    p_pr_note.add_argument("--body", required=True, help="Note body text")
    p_pr_note.add_argument("--quiet", action="store_true", help="Minimal output")
    p_pr_note.set_defaults(func=cmd_pr_note)

    p_integrate = sub.add_parser("integrate", help="Merge a task branch into main (gated by PR artifact + verify)")
    p_integrate.add_argument("task_id")
    p_integrate.add_argument("--branch", help="Task branch to integrate (default: from PR meta.json)")
    p_integrate.add_argument("--base", help="Base branch (default: pinned base branch or 'main').")
    p_integrate.add_argument(
        "--merge-strategy",
        dest="merge_strategy",
        default="squash",
        help="squash|merge|rebase (default: squash)",
    )
    p_integrate.add_argument(
        "--run-verify",
        action="store_true",
        help="Run task verify commands (or always when configured) and append output to PR verify.log",
    )
    p_integrate.add_argument(
        "--dry-run",
        action="store_true",
        help="Print plan + preflight checks without making changes",
    )
    p_integrate.add_argument("--quiet", action="store_true", help="Minimal output")
    p_integrate.set_defaults(func=cmd_integrate)

    p_hooks = sub.add_parser("hooks", help="Install or remove optional git hooks")
    hooks_sub = p_hooks.add_subparsers(dest="hooks_cmd", required=True)

    p_hooks_install = hooks_sub.add_parser("install", help="Install optional git hooks (commit-msg, pre-commit)")
    p_hooks_install.add_argument("--quiet", action="store_true", help="Minimal output")
    p_hooks_install.set_defaults(func=cmd_hooks_install)

    p_hooks_uninstall = hooks_sub.add_parser("uninstall", help="Remove agentctl-managed git hooks")
    p_hooks_uninstall.add_argument("--quiet", action="store_true", help="Minimal output")
    p_hooks_uninstall.set_defaults(func=cmd_hooks_uninstall)

    p_hooks_run = hooks_sub.add_parser("run", help=argparse.SUPPRESS)
    p_hooks_run.add_argument("hook", choices=list(HOOK_NAMES))
    p_hooks_run.add_argument("hook_args", nargs="*")
    p_hooks_run.set_defaults(func=cmd_hooks_run)

    p_guard = sub.add_parser("guard", help="Guardrails for git staging/commit hygiene")
    guard_sub = p_guard.add_subparsers(dest="guard_cmd", required=True)

    p_guard_clean = guard_sub.add_parser("clean", help="Fail if there are staged files")
    p_guard_clean.add_argument("--quiet", action="store_true", help="Minimal output")
    p_guard_clean.set_defaults(func=cmd_guard_clean)

    p_guard_suggest = guard_sub.add_parser("suggest-allow", help="Suggest minimal --allow prefixes for staged files")
    p_guard_suggest.add_argument("--format", choices=["lines", "args"], default="lines", help="Output format")
    p_guard_suggest.set_defaults(func=cmd_guard_suggest_allow)

    p_guard_commit = guard_sub.add_parser("commit", help="Validate staged files and planned commit message")
    p_guard_commit.add_argument("task_id", help="Active task id (must appear in --message)")
    p_guard_commit.add_argument("--message", "-m", required=True, help="Planned commit message")
    p_guard_commit.add_argument("--allow", action="append", help="Allowed path prefix (repeatable)")
    p_guard_commit.add_argument(
        "--auto-allow",
        action="store_true",
        help="Derive --allow prefixes from staged files (useful when you don't know the minimal allowlist yet)",
    )
    p_guard_commit.add_argument("--allow-tasks", action="store_true", help="Allow staging tasks.json")
    p_guard_commit.add_argument(
        "--allow-dirty",
        action="store_true",
        help="Deprecated (unstaged changes are allowed by default)",
    )
    p_guard_commit.add_argument("--require-clean", action="store_true", help="Fail if there are unstaged changes")
    p_guard_commit.add_argument("--quiet", action="store_true", help="Minimal output")
    p_guard_commit.set_defaults(func=cmd_guard_commit)

    p_commit = sub.add_parser("commit", help="Run guard commit checks, then `git commit`")
    p_commit.add_argument("task_id", help="Active task id (must appear in --message)")
    p_commit.add_argument("--message", "-m", required=True, help="Commit message")
    p_commit.add_argument("--allow", action="append", help="Allowed path prefix (repeatable)")
    p_commit.add_argument("--auto-allow", action="store_true", help="Derive --allow prefixes from staged files")
    p_commit.add_argument("--allow-tasks", action="store_true", help="Allow staging tasks.json")
    p_commit.add_argument("--require-clean", action="store_true", help="Fail if there are unstaged changes")
    p_commit.add_argument("--quiet", action="store_true", help="Minimal output")
    p_commit.set_defaults(func=cmd_commit)

    p_start = sub.add_parser("start", help="Mark task DOING with a mandatory comment")
    p_start.add_argument("task_id")
    p_start.add_argument("--author", required=True)
    p_start.add_argument("--body", required=True)
    p_start.add_argument("--quiet", action="store_true", help="Minimal output")
    p_start.add_argument("--force", action="store_true", help="Bypass readiness/transition checks")
    p_start.add_argument(
        "--commit-from-comment",
        action="store_true",
        help="Stage + commit using the comment body as the message",
    )
    p_start.add_argument(
        "--commit-emoji",
        help="Emoji prefix when building a commit message from the comment (default: 🚧)",
    )
    p_start.add_argument(
        "--commit-allow",
        action="append",
        help="Allowed path prefix (repeatable) when committing from comment",
    )
    p_start.add_argument(
        "--commit-auto-allow",
        action="store_true",
        help="Auto-derive allowed prefixes from changed files",
    )
    p_start.add_argument(
        "--commit-allow-tasks",
        action="store_true",
        default=True,
        help=f"Allow staging {TASKS_PATH_REL} when committing from comment (default: enabled)",
    )
    p_start.add_argument(
        "--commit-require-clean",
        action="store_true",
        help="Require a clean working tree when committing",
    )
    p_start.add_argument(
        "--confirm-status-commit",
        action="store_true",
        help="Acknowledge status/comment-driven commit when policy=warn/confirm",
    )
    p_start.set_defaults(func=cmd_start)

    p_block = sub.add_parser("block", help="Mark task BLOCKED with a mandatory comment")
    p_block.add_argument("task_id")
    p_block.add_argument("--author", required=True)
    p_block.add_argument("--body", required=True)
    p_block.add_argument("--quiet", action="store_true", help="Minimal output")
    p_block.add_argument("--force", action="store_true", help="Bypass transition checks")
    p_block.add_argument(
        "--commit-from-comment",
        action="store_true",
        help="Stage + commit using the comment body as the message",
    )
    p_block.add_argument(
        "--commit-emoji",
        help="Emoji prefix when building a commit message from the comment (default: inferred from comment text)",
    )
    p_block.add_argument(
        "--commit-allow",
        action="append",
        help="Allowed path prefix (repeatable) when committing from comment",
    )
    p_block.add_argument(
        "--commit-auto-allow",
        action="store_true",
        help="Auto-derive allowed prefixes from changed files",
    )
    p_block.add_argument(
        "--commit-allow-tasks",
        action="store_true",
        default=True,
        help=f"Allow staging {TASKS_PATH_REL} when committing from comment (default: enabled)",
    )
    p_block.add_argument(
        "--commit-require-clean",
        action="store_true",
        help="Require a clean working tree when committing",
    )
    p_block.add_argument(
        "--confirm-status-commit",
        action="store_true",
        help="Acknowledge status/comment-driven commit when policy=warn/confirm",
    )
    p_block.set_defaults(func=cmd_block)

    p_task = sub.add_parser("task", help="Operate on tasks.json")
    task_sub = p_task.add_subparsers(dest="task_cmd", required=True)

    p_lint = task_sub.add_parser("lint", help="Validate tasks.json (schema, deps, checksum)")
    p_lint.add_argument("--quiet", action="store_true", help="Suppress warnings")
    p_lint.set_defaults(func=cmd_task_lint)

    p_new = task_sub.add_parser("new", help="Create a task with an auto-generated ID")
    p_new.add_argument("--title", required=True)
    p_new.add_argument("--description", required=True)
    p_new.add_argument("--status", default="TODO", help="Default: TODO")
    p_new.add_argument("--priority", required=True)
    p_new.add_argument("--owner", required=True)
    p_new.add_argument("--tag", action="append", help="Repeatable")
    p_new.add_argument("--depends-on", action="append", dest="depends_on", help="Repeatable")
    p_new.add_argument("--verify", action="append", help="Repeatable: shell command")
    p_new.add_argument("--comment-author", dest="comment_author")
    p_new.add_argument("--comment-body", dest="comment_body")
    default_id_len = task_id_suffix_length_default()
    p_new.add_argument(
        "--id-length",
        type=int,
        default=default_id_len,
        help=f"ID suffix length (default: {default_id_len})",
    )
    p_new.add_argument("--quiet", action="store_true", help="Print only the task id")
    p_new.set_defaults(func=cmd_task_new)

    p_add = task_sub.add_parser("add", help="Add new task(s) with explicit IDs (no manual edits)")
    p_add.add_argument("task_id", nargs="+", help="One or more task IDs")
    p_add.add_argument("--title", required=True)
    p_add.add_argument("--description", required=True)
    p_add.add_argument("--status", default="TODO", help="Default: TODO")
    p_add.add_argument("--priority", required=True)
    p_add.add_argument("--owner", required=True)
    p_add.add_argument("--tag", action="append", help="Repeatable")
    p_add.add_argument("--depends-on", action="append", dest="depends_on", help="Repeatable")
    p_add.add_argument("--verify", action="append", help="Repeatable: shell command")
    p_add.add_argument("--comment-author", dest="comment_author")
    p_add.add_argument("--comment-body", dest="comment_body")
    p_add.set_defaults(func=cmd_task_add)

    p_update = task_sub.add_parser("update", help="Update a task in tasks.json (no manual edits)")
    p_update.add_argument("task_id")
    p_update.add_argument("--title")
    p_update.add_argument("--description")
    p_update.add_argument("--priority")
    p_update.add_argument("--owner")
    p_update.add_argument("--tag", action="append", help="Repeatable (append)")
    p_update.add_argument("--replace-tags", action="store_true")
    p_update.add_argument("--depends-on", action="append", dest="depends_on", help="Repeatable (append)")
    p_update.add_argument("--replace-depends-on", action="store_true")
    p_update.add_argument("--verify", action="append", help="Repeatable (append)")
    p_update.add_argument("--replace-verify", action="store_true")
    p_update.set_defaults(func=cmd_task_update)

    p_scrub = task_sub.add_parser("scrub", help="Replace text across tasks.json task fields")
    p_scrub.add_argument("--find", required=True, help="Substring to replace (required)")
    p_scrub.add_argument("--replace", default="", help="Replacement (default: empty)")
    p_scrub.add_argument("--dry-run", action="store_true", help="Print affected task ids without writing")
    p_scrub.add_argument("--quiet", action="store_true", help="Minimal output")
    p_scrub.set_defaults(func=cmd_task_scrub)

    p_list = task_sub.add_parser("list", help="List tasks from tasks.json")
    p_list.add_argument("--status", action="append", help="Filter by status (repeatable)")
    p_list.add_argument("--owner", action="append", help="Filter by owner (repeatable)")
    p_list.add_argument("--tag", action="append", help="Filter by tag (repeatable)")
    p_list.add_argument("--quiet", action="store_true", help="Suppress warnings")
    p_list.set_defaults(func=cmd_task_list)

    p_next = task_sub.add_parser("next", help="List tasks ready to start (dependencies DONE)")
    p_next.add_argument("--status", action="append", help="Filter by status (repeatable, default: TODO)")
    p_next.add_argument("--owner", action="append", help="Filter by owner (repeatable)")
    p_next.add_argument("--tag", action="append", help="Filter by tag (repeatable)")
    p_next.add_argument("--limit", type=int, help="Limit number of results")
    p_next.add_argument("--quiet", action="store_true", help="Suppress warnings")
    p_next.set_defaults(func=cmd_task_next)

    p_show = task_sub.add_parser("show", help="Show a single task from tasks.json")
    p_show.add_argument("task_id")
    p_show.add_argument("--last-comments", type=int, default=5, help="How many latest comments to print")
    p_show.add_argument("--quiet", action="store_true", help="Suppress warnings")
    p_show.set_defaults(func=cmd_task_show)

    p_doc = task_sub.add_parser("doc", help="Read or update task doc metadata")
    doc_sub = p_doc.add_subparsers(dest="doc_cmd", required=True)

    p_doc_show = doc_sub.add_parser("show", help="Show task doc metadata")
    p_doc_show.add_argument("task_id")
    p_doc_show.add_argument("--section", help="Show a single section by name (e.g., 'Summary')")
    p_doc_show.add_argument("--quiet", action="store_true", help="Minimal output")
    p_doc_show.set_defaults(func=cmd_task_doc_show)

    p_doc_set = doc_sub.add_parser("set", help="Update task doc metadata")
    p_doc_set.add_argument("task_id")
    p_doc_set.add_argument("--section", help="Update a single section by name (e.g., 'Summary')")
    p_doc_set.add_argument("--text", help="Doc body text")
    p_doc_set.add_argument("--file", help="Read doc body from file (use '-' for stdin)")
    p_doc_set.add_argument("--quiet", action="store_true", help="Minimal output")
    p_doc_set.set_defaults(func=cmd_task_doc_set)

    p_search = task_sub.add_parser("search", help="Search tasks by text (title/description/tags/comments)")
    p_search.add_argument("query")
    p_search.add_argument("--regex", action="store_true", help="Treat query as a case-insensitive regex")
    p_search.add_argument("--status", action="append", help="Filter by status (repeatable)")
    p_search.add_argument("--owner", action="append", help="Filter by owner (repeatable)")
    p_search.add_argument("--tag", action="append", help="Filter by tag (repeatable)")
    p_search.add_argument("--limit", type=int, help="Limit number of results")
    p_search.add_argument("--quiet", action="store_true", help="Suppress warnings")
    p_search.set_defaults(func=cmd_task_search)

    p_scaffold = task_sub.add_parser(
        "scaffold", help="Create .agent-plane/tasks/<task-id>/README.md skeleton for a task"
    )
    p_scaffold.add_argument("task_id")
    p_scaffold.add_argument("--title", help="Optional title override")
    p_scaffold.add_argument("--overwrite", action="store_true", help="Overwrite if the file exists")
    p_scaffold.add_argument("--force", action="store_true", help="Allow scaffolding even if task id is unknown")
    p_scaffold.add_argument("--quiet", action="store_true", help="Minimal output")
    p_scaffold.set_defaults(func=cmd_task_scaffold)

    p_export = task_sub.add_parser("export", help="Export tasks to JSON snapshot")
    p_export.add_argument("--format", default="json", help="Export format (default: json)")
    p_export.add_argument("--out", default=TASKS_PATH_REL, help="Output path (repo-relative)")
    p_export.add_argument("--quiet", action="store_true", help="Minimal output")
    p_export.set_defaults(func=cmd_task_export)

    p_normalize = task_sub.add_parser("normalize", help="Normalize task READMEs via backend re-write")
    p_normalize.add_argument("--quiet", action="store_true", help="Minimal output")
    p_normalize.add_argument("--force", action="store_true", help="Bypass base-branch checks")
    p_normalize.set_defaults(func=cmd_task_normalize)

    p_migrate = task_sub.add_parser("migrate", help="Migrate tasks.json into the configured backend")
    p_migrate.add_argument("--source", default=TASKS_PATH_REL, help="Source tasks.json path (repo-relative)")
    p_migrate.add_argument("--quiet", action="store_true", help="Minimal output")
    p_migrate.add_argument("--force", action="store_true", help="Bypass base-branch checks")
    p_migrate.set_defaults(func=cmd_task_migrate)

    p_comment = task_sub.add_parser("comment", help="Append a comment to a task")
    p_comment.add_argument("task_id")
    p_comment.add_argument("--author", required=True)
    p_comment.add_argument("--body", required=True)
    p_comment.set_defaults(func=cmd_task_comment)

    p_status = task_sub.add_parser("set-status", help="Update task status with readiness checks")
    p_status.add_argument("task_id")
    p_status.add_argument("status", help="TODO|DOING|BLOCKED|DONE")
    p_status.add_argument("--author", help="Optional comment author (requires --body)")
    p_status.add_argument("--body", help="Optional comment body (requires --author)")
    p_status.add_argument("--commit", help="Attach commit metadata from a git rev (e.g., HEAD)")
    p_status.add_argument("--force", action="store_true", help="Bypass transition and readiness checks")
    p_status.add_argument(
        "--commit-from-comment",
        action="store_true",
        help="Stage + commit using the comment body as the message",
    )
    p_status.add_argument(
        "--commit-emoji",
        help=(
            "Emoji prefix when building a commit message from the comment "
            "(default: start/done fixed; otherwise inferred from comment text)"
        ),
    )
    p_status.add_argument(
        "--commit-allow",
        action="append",
        help="Allowed path prefix (repeatable) when committing from comment",
    )
    p_status.add_argument(
        "--commit-auto-allow",
        action="store_true",
        help="Auto-derive allowed prefixes from changed files",
    )
    p_status.add_argument(
        "--commit-allow-tasks",
        action="store_true",
        default=True,
        help=f"Allow staging {TASKS_PATH_REL} when committing from comment (default: enabled)",
    )
    p_status.add_argument(
        "--commit-require-clean",
        action="store_true",
        help="Require a clean working tree when committing",
    )
    p_status.add_argument(
        "--confirm-status-commit",
        action="store_true",
        help="Acknowledge status/comment-driven commit when policy=warn/confirm",
    )
    p_status.set_defaults(func=cmd_task_set_status)

    p_finish = sub.add_parser(
        "finish",
        help="Mark task(s) DONE + attach commit metadata (typically after a code commit)",
    )
    p_finish.add_argument("task_id", nargs="+", help="One or more task IDs")
    p_finish.add_argument("--commit", default="HEAD", help="Git rev to attach as task commit metadata (default: HEAD)")
    p_finish.add_argument("--author", help="Optional comment author (requires --body)")
    p_finish.add_argument("--body", help="Optional comment body (requires --author)")
    p_finish.add_argument("--skip-verify", action="store_true", help="Do not run verify even if configured")
    p_finish.add_argument("--quiet", action="store_true", help="Minimal output")
    p_finish.add_argument("--force", action="store_true", help="Bypass readiness and commit-subject checks")
    p_finish.add_argument(
        "--no-require-task-id-in-commit",
        dest="require_task_id_in_commit",
        action="store_false",
        help="Allow finishing even if commit subject does not mention the task id",
    )
    p_finish.add_argument(
        "--commit-from-comment",
        action="store_true",
        help="Create a code commit using the comment body before finishing",
    )
    p_finish.add_argument(
        "--commit-emoji",
        help="Emoji prefix when building a commit message from the comment (default: inferred from comment text)",
    )
    p_finish.add_argument(
        "--commit-allow",
        action="append",
        help="Allowed path prefix (repeatable) when committing from comment",
    )
    p_finish.add_argument(
        "--commit-auto-allow",
        action="store_true",
        help="Auto-derive allowed prefixes from changed files",
    )
    p_finish.add_argument(
        "--commit-allow-tasks",
        action="store_true",
        help=f"Allow staging {TASKS_PATH_REL} during the code commit (default: disabled)",
    )
    p_finish.add_argument(
        "--commit-require-clean",
        action="store_true",
        help="Require a clean working tree when committing",
    )
    p_finish.add_argument(
        "--status-commit",
        action="store_true",
        help="After finishing, commit task/doc changes using the comment body as the commit message",
    )
    p_finish.add_argument(
        "--status-commit-emoji",
        help="Emoji prefix for the status commit built from the comment (default: ✅)",
    )
    p_finish.add_argument(
        "--status-commit-allow",
        action="append",
        help="Allowed path prefix (repeatable) when committing status/doc changes",
    )
    p_finish.add_argument(
        "--status-commit-auto-allow",
        action="store_true",
        help="Auto-derive allowed prefixes from changed files for the status commit",
    )
    p_finish.add_argument(
        "--status-commit-require-clean",
        action="store_true",
        help="Require a clean working tree when committing status/doc changes",
    )
    p_finish.add_argument(
        "--confirm-status-commit",
        action="store_true",
        help="Acknowledge status/comment-driven commit when policy=warn/confirm",
    )
    p_finish.set_defaults(require_task_id_in_commit=True, func=cmd_finish)

    p_sync = sub.add_parser("sync", help="Sync tasks with a backend")
    p_sync.add_argument("backend", nargs="?", help="Backend id (e.g., redmine)")
    p_sync.add_argument("--direction", default="push", choices=["push", "pull"], help="Sync direction")
    p_sync.add_argument(
        "--conflict",
        default="diff",
        choices=["diff", "prefer-local", "prefer-remote", "fail"],
        help="Conflict strategy (default: diff)",
    )
    p_sync.add_argument("--yes", action="store_true", help="Confirm push writes (for backends that require it)")
    p_sync.add_argument("--quiet", action="store_true", help="Minimal output")
    p_sync.set_defaults(func=cmd_sync)

    return parser


def extract_global_flags(argv: list[str]) -> tuple[dict[str, bool], list[str]]:
    flags = {"quiet": False, "verbose": False, "json": False, "lint": False}
    remaining: list[str] = []
    for arg in argv:
        if arg == "--quiet":
            flags["quiet"] = True
            continue
        if arg == "--verbose":
            flags["verbose"] = True
            continue
        if arg == "--json":
            flags["json"] = True
            continue
        if arg == "--lint":
            flags["lint"] = True
            continue
        remaining.append(arg)
    if flags["verbose"]:
        flags["quiet"] = False
    return flags, remaining


def apply_global_flags(args: argparse.Namespace, flags: dict[str, bool]) -> None:
    global GLOBAL_QUIET, GLOBAL_VERBOSE, GLOBAL_JSON, GLOBAL_LINT
    GLOBAL_QUIET = bool(flags.get("quiet"))
    GLOBAL_VERBOSE = bool(flags.get("verbose"))
    GLOBAL_JSON = bool(flags.get("json"))
    GLOBAL_LINT = bool(flags.get("lint"))
    if hasattr(args, "quiet"):
        if GLOBAL_QUIET:
            args.quiet = True
    else:
        args.quiet = GLOBAL_QUIET
    if hasattr(args, "verbose"):
        if GLOBAL_VERBOSE:
            args.verbose = True
    else:
        args.verbose = GLOBAL_VERBOSE


def maybe_lint_tasks_json() -> None:
    if not GLOBAL_LINT:
        return
    result = lint_tasks_json()
    if result["errors"]:
        for message in result["errors"]:
            print(f"❌ {message}", file=sys.stderr)
        raise SystemExit(2)


def main(argv: list[str] | None = None) -> None:
    maybe_pin_base_branch(cwd=ROOT)
    raw_argv = list(argv) if argv is not None else sys.argv[1:]
    flags, filtered = extract_global_flags(raw_argv)
    parser = build_parser()
    args = parser.parse_args(filtered)
    apply_global_flags(args, flags)
    maybe_lint_tasks_json()
    func = getattr(args, "func", None)
    if not func:
        parser.print_help()
        raise SystemExit(2)
    suppressed = GLOBAL_JSON or GLOBAL_QUIET or bool(getattr(args, "quiet", False))
    try:
        func(args)
    except SystemExit as exc:
        code = 0 if exc.code is None else exc.code
        if code == 0 and not suppressed:
            print(f"✅ {command_path(args)} OK")
        raise
    if not suppressed:
        print(f"✅ {command_path(args)} OK")


if __name__ == "__main__":
    main()
