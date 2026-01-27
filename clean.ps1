Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# Interactive workflow mode selection (direct vs branch_pr).
# - If CODEXSWARM_MODE is set, it wins.
# - If stdin is a TTY, we prompt.
# - Otherwise default to direct.
$MODE = $env:CODEXSWARM_MODE
if ([string]::IsNullOrWhiteSpace($MODE) -and -not [Console]::IsInputRedirected) {
  $inputMode = Read-Host "Select workflow_mode (direct/branch_pr) [direct]"
  if (-not [string]::IsNullOrWhiteSpace($inputMode)) {
    $MODE = $inputMode
  }
}
if ([string]::IsNullOrWhiteSpace($MODE)) {
  $MODE = "direct"
}
switch ($MODE) {
  "direct" { }
  "branch_pr" { }
  default {
    Write-Error "Invalid workflow_mode: $MODE (expected: direct or branch_pr)"
    exit 2
  }
}
$env:MODE = $MODE

# This script cleans the project folder by removing the root repository links so agents can be used for anything.
# It removes leftover assets, metadata, and git state that would tie the copy to the original repo.
# It also removes framework-development artifacts (including docs/) that aren't needed for a reusable export.
#
# Note: .agent-plane/agentctl.md and .agent-plane/tasks stay as part of the framework export.

Get-ChildItem -Force -Path . -Filter ".env*" -ErrorAction SilentlyContinue |
  Remove-Item -Force -Recurse -ErrorAction SilentlyContinue

$pathsToRemove = @(
  ".DS_Store",
  ".github",
  ".gitattributes",
  ".git",
  "__pycache__",
  ".pytest_cache",
  ".ruff_cache",
  ".mypy_cache",
  ".pyright",
  "dmypy.json",
  ".venv",
  "assets",
  "docs",
  "scripts",
  "README.md",
  ".agent-plane/worktrees",
  "Makefile",
  "pyproject.toml",
  "requirements-dev.txt",
  "LICENSE",
  ".agent-plane/tasks.json",
  "CONTRIBUTING.md",
  "CODE_OF_CONDUCT.md",
  "GUIDELINE.md",
)

foreach ($path in $pathsToRemove) {
  Remove-Item -Force -Recurse -ErrorAction SilentlyContinue $path
}

# Reset local task storage while keeping the framework task directory.
$tasksDir = Join-Path ".agent-plane" "tasks"
if (Test-Path $tasksDir) {
  Get-ChildItem -Force -Path $tasksDir -ErrorAction SilentlyContinue |
    Remove-Item -Force -Recurse -ErrorAction SilentlyContinue
} else {
  New-Item -ItemType Directory -Force -Path $tasksDir | Out-Null
}

# Recreate an empty tasks export so the framework is usable after cleanup.
$payload = '{"tasks":[]}'
$sha256 = [System.Security.Cryptography.SHA256]::Create()
$bytes = [System.Text.Encoding]::UTF8.GetBytes($payload)
$hashBytes = $sha256.ComputeHash($bytes)
$checksum = -join ($hashBytes | ForEach-Object { $_.ToString("x2") })
$sha256.Dispose()

$data = [ordered]@{
  tasks = @()
  meta = [ordered]@{
    schema_version = 1
    managed_by = "agentctl"
    checksum_algo = "sha256"
    checksum = $checksum
  }
}
$data | ConvertTo-Json -Depth 5 | Out-File -FilePath ".agent-plane/tasks.json" -Encoding utf8

# Apply the selected workflow_mode and scrub agent prompts for the unused mode.
$python = Get-Command python,python3 -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $python) {
  throw "Python not found in PATH."
}

$script = @'
import json
import os
import re
from pathlib import Path
from typing import Optional

ROOT = Path.cwd().resolve()
mode = os.environ.get("MODE", "").strip() or os.environ.get("CODEXSWARM_MODE", "").strip() or "direct"
if mode not in {"direct", "branch_pr"}:
    raise SystemExit(f"Invalid MODE: {mode!r}")

def write_json(path: Path, data: dict) -> None:
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

def simplify_mode_clause(text: str, keep: str) -> str:
    s = text
    if keep == "direct":
        if "in `branch_pr`" in s and "; in `direct`" in s:
            prefix, rest = s.split(": ", 1) if ": " in s else ("", s)
            direct_part = rest.split("; in `direct`", 1)[1]
            direct_part = direct_part.lstrip(" ,")
            return (prefix + ": " if prefix else "") + "in `direct`, " + direct_part
        if "In `direct`" in s and "branch_pr" in s:
            direct_sentence = s[s.index("In `direct`") :].strip()
            if s.startswith("Check ") and ":" in s:
                prefix = s.split(":", 1)[0] + ":"
                return prefix + " " + direct_sentence
            return direct_sentence
        return s

    if keep == "branch_pr":
        if "in `branch_pr`" in s and "; in `direct`" in s:
            prefix, rest = s.split(": ", 1) if ": " in s else ("", s)
            branch_part = rest.split("; in `direct`", 1)[0].strip()
            return (prefix + ": " if prefix else "") + branch_part
        if " In `direct`" in s and "branch_pr" in s:
            # Drop the direct sentence.
            return s.split(" In `direct`", 1)[0].rstrip(". ") + "."
        return s

    return s

def scrub_line(line: str) -> Optional[str]:
    s = (line or "").strip()
    if not s:
        return None

    if mode == "direct":
        s = simplify_mode_clause(s, keep="direct")
        if "`workflow_mode=branch_pr`" in s:
            return None
        if "`branch_pr`" in s and "`direct`" not in s:
            return None
        if "task branch" in s.lower() and "`direct`" not in s:
            return None
        if ".agent-plane/worktrees" in s:
            return None
        if "integrate" in s and "In `direct`" not in s and "`direct`" not in s and "direct" not in s.lower():
            # Integrate is a branch_pr artifact flow; keep only if explicitly direct-scoped.
            return None
        if "--worktree" in s:
            s = s.replace("--worktree", "").replace("  ", " ").replace("  ", " ").strip()
            s = s.replace("  ", " ")
            s = s.replace("`python .agent-plane/agentctl.py work start T-123 --agent <ROLE> --slug <slug>`", "`python .agent-plane/agentctl.py work start T-123`")
            s = s.replace("`python .agent-plane/agentctl.py work start T-123 --agent CODER --slug <slug>`", "`python .agent-plane/agentctl.py work start T-123`")
        return s or None

    # branch_pr
    s = simplify_mode_clause(s, keep="branch_pr")
    if "`workflow_mode=direct`" in s:
        return None
    if "`direct`" in s and "`branch_pr`" not in s and "workflow_mode" not in s:
        return None
    if "no task branches/worktrees" in s.lower():
        return None
    return s or None

def scrub_json_file(path: Path) -> None:
    data = json.loads(path.read_text(encoding="utf-8"))
    changed = False

    for key in ["role", "description"]:
        if isinstance(data.get(key), str):
            new = scrub_line(data[key])
            if new is None:
                new = ""
            if new != data[key]:
                data[key] = new
                changed = True

    for key in ["inputs", "outputs", "permissions", "workflow"]:
        arr = data.get(key)
        if not isinstance(arr, list):
            continue
        new_arr = []
        for item in arr:
            if not isinstance(item, str):
                continue
            new = scrub_line(item)
            if new:
                new_arr.append(new)
        if new_arr != arr:
            data[key] = new_arr
            changed = True

    if changed:
        write_json(path, data)

def scrub_workflow_mode_docs(path: Path) -> None:
    if not path.exists():
        return
    text = path.read_text(encoding="utf-8", errors="replace").splitlines(True)
    out: list[str] = []
    skip = False
    remove_direct = (mode == "branch_pr")
    remove_branch_pr = (mode == "direct")

    def is_mode_header(line: str) -> Optional[str]:
        if line.startswith("- `direct`"):
            return "direct"
        if line.startswith("- `branch_pr`"):
            return "branch_pr"
        if re.match(r"^- `workflow_mode: \"?direct\"?`", line):
            return "direct"
        if re.match(r"^- `workflow_mode: \"?branch_pr\"?`", line):
            return "branch_pr"
        return None

    for line in text:
        header = is_mode_header(line.strip())
        if header == "direct":
            skip = remove_direct
        elif header == "branch_pr":
            skip = remove_branch_pr
        elif header is not None:
            skip = False
        if skip:
            continue
        out.append(line)
    Path(path).write_text("".join(out), encoding="utf-8")

# 1) Set the workflow mode in config.json
config_path = ROOT / ".agent-plane" / "config.json"
config = json.loads(config_path.read_text(encoding="utf-8"))
config["workflow_mode"] = mode
write_json(config_path, config)

# 2) Scrub agent prompts
agents_dir = ROOT / ".agent-plane" / "agents"
for agent_path in sorted(agents_dir.glob("*.json")):
    scrub_json_file(agent_path)

# 3) Scrub the two human-facing prompt docs
scrub_workflow_mode_docs(ROOT / "AGENTS.md")
scrub_workflow_mode_docs(ROOT / ".agent-plane" / "agentctl.md")
'@

$script | & $python.Source -

# Initialize a fresh repository after the cleanup so the folder can be reused independently.
& git rev-parse --is-inside-work-tree >$null 2>&1
if ($LASTEXITCODE -eq 0) {
  $currentBranch = (& git symbolic-ref --short -q HEAD 2>$null)
  if ($currentBranch -and $currentBranch -ne "HEAD") {
    & git config --local agentplane.baseBranch $currentBranch
  }
} else {
  & git init -b main >$null 2>&1
  if ($LASTEXITCODE -ne 0) {
    & git init >$null 2>&1
    & git switch -c main >$null 2>&1
  }

  $currentBranch = (& git symbolic-ref --short -q HEAD 2>$null)
  if ($currentBranch -and $currentBranch -ne "HEAD") {
    & git config --local agentplane.baseBranch $currentBranch
  }
}

$agentsSpecLine = (Select-String -Path AGENTS.md -Pattern '^AGENTS_SPEC:' -ErrorAction SilentlyContinue | Select-Object -First 1).Line
$agentsSpecVersion = ""
if ($agentsSpecLine) {
  $agentsSpecVersion = ($agentsSpecLine -split ":", 2)[1].Trim()
}
$commitMessage = "Agent Plane Initialized"
if ($agentsSpecVersion) {
  $commitMessage = "Agent Plane Initialized (AGENTS_SPEC $agentsSpecVersion)"
}

& git add .agent-plane .gitignore AGENTS.md viewer.sh
& git commit -m $commitMessage

if (-not [Console]::IsInputRedirected) {
  $installHooks = Read-Host "Install agent-plane git hooks? [y/N]"
  if ($installHooks -match "^(y|yes)$") {
    & $python.Source .agent-plane/agentctl.py hooks install
  }
}

Remove-Item -Force -ErrorAction SilentlyContinue clean.sh
Remove-Item -Force -ErrorAction SilentlyContinue clean.ps1
