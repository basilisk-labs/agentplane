# Workflow

## End-to-End Flow

1. You state a goal to the ORCHESTRATOR.
2. ORCHESTRATOR proposes a plan and asks for approval.
3. PLANNER creates or updates tasks via `agentplane` against the active backend.
4. Execution agents implement changes and update workflow artifacts.
5. REVIEWER assesses changes and leaves handoff notes.
6. INTEGRATOR verifies, merges, and closes tasks (when `workflow_mode=branch_pr`).

## Planning and Tasks

- Every task is atomic and tracked by ID (`YYYYMMDDHHMM-<RAND>`).
- The canonical task source depends on the backend:
  - `local`: `.agentplane/tasks/` is canonical.
  - `redmine`: Redmine is canonical; `.agentplane/tasks/` is a cache/offline layer.
- Task changes are done only via `agentplane` (no manual edits to exports).

## Implementation

- CODER implements changes with tight diffs and clear validation notes.
- TESTER adds or updates tests when behavior changes.
- DOCS updates user-facing docs and task artifacts.
- Before handoff, update the task doc metadata (Summary/Scope/Risks/Verify Steps/Rollback Plan).
- Each agent leaving a task must leave a handoff comment:
  - `workflow_mode=branch_pr`: add notes under `## Handoff Notes` in `.agentplane/tasks/<task-id>/pr/review.md`.
  - `workflow_mode=direct`: use `agentplane task comment <task-id> --author <ROLE> --body "..."`

## Verification and Closure

- Use `agentplane verify <task-id>` to run declared checks.
- Closure updates the canonical backend via `finish`, then refreshes the local cache/export (`tasks.json`).
- A clean git status is required before handoff.

## Commit Expectations

- One task maps to one implementation commit.
- Planning and closure commits are used when required by the workflow.
- Commit messages are short, emoji-prefixed, and include the task ID.

## Notes

- This document describes the v1 target workflow per `ROADMAP.md`; individual commands may land incrementally.
