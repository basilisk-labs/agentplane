# Python agentctl + framework scripts inventory

Date: 2026-01-30

## Scope

Inventory of Python `agentctl` commands and other framework control scripts in this repository.
Sources: `.agent-plane/agentctl.py`, `.agent-plane/recipes.py`, `clean.sh`, `clean.ps1`, `viewer.sh`, `.github/scripts/sync_tasks.py`, `scripts/ci-scope.mjs`, `.agent-plane/backends/*.py`.

## agentctl (Python) top-level commands

Source: `.agent-plane/agentctl.py` help.

- quickstart: print quick reference from `.agent-plane/agentctl.md`.
- role: show role-specific guidance from `agentctl.md`.
- agents: list registered agents under `.agent-plane/agents/`.
- config: show/set `.agent-plane/config.json`.
- ready: check task readiness (deps DONE).
- verify: run task verify commands (with optional log + skip-if-unchanged).
- upgrade: refresh framework (python) from upstream.
- work: one-command helpers (branch + worktree + PR artifacts).
- cleanup: remove merged task branches/worktrees.
- branch: create/status/remove task branches/worktrees.
- pr: open/update/check/note PR artifacts under `.agent-plane/tasks/<id>/pr`.
- integrate: merge task branch into base with verify + PR gating.
- hooks: install/uninstall git hooks.
- guard: clean/suggest-allow/commit guardrails.
- commit: wrapper around `git commit` with guardrails.
- start: mark task DOING with structured comment (optional commit-from-comment).
- block: mark task BLOCKED with structured comment (optional commit-from-comment).
- task: task operations (see below).
- finish: mark task(s) DONE + attach commit metadata (optional commit-from-comment + status commit).
- sync: backend sync (push/pull) with conflict strategy.

## agentctl task subcommands

Source: `python .agent-plane/agentctl.py task -h`.

- lint: validate tasks.json (schema, deps, checksum).
- new: create task with auto ID.
- add: add tasks with explicit IDs.
- update: update task fields.
- scrub: replace text across tasks.json fields.
- list: list tasks from tasks.json.
- next: list tasks ready to start.
- show: show a single task.
- doc: read/update task doc metadata.
- search: search tasks by text.
- scaffold: create task README skeleton under `.agent-plane/tasks/<id>/README.md`.
- export: export tasks snapshot JSON.
- normalize: normalize task READMEs via backend rewrite.
- migrate: migrate tasks.json into configured backend.
- comment: append a task comment.
- set-status: update task status with readiness checks.

## Supporting scripts and utilities

- `.agent-plane/recipes.py`
  - scan/show/compile/explain/refresh/bundle for recipe manifests and bundles.
  - bundle build/show for global recipes bundle.

- `clean.sh` / `clean.ps1`
  - cleanup helper scripts (remove dev artifacts, reset example files).

- `viewer.sh`
  - launch tasks viewer locally.

- `.github/scripts/sync_tasks.py`
  - GitHub issues synchronization helper.

- `scripts/ci-scope.mjs`
  - compute scoped CI/test targets.

## Backends

- `.agent-plane/backends/local/backend.py`
  - local task backend (filesystem store, read/write/export/normalize).

- `.agent-plane/backends/redmine/backend.py`
  - Redmine backend (sync, caching, custom fields, batching).
