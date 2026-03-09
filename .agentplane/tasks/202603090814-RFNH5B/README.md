---
id: "202603090814-RFNH5B"
title: "Guard task archive drift and projection close commits"
result_summary: "Added a doctor warning for untracked DONE task README archives and generalized deterministic finish close-commits to projection-backed backends that write local task README artifacts, so archive drift is now surfaced and Redmine-style backends no longer leave task docs outside git by default."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "backend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T08:14:44.884Z"
  updated_by: "ORCHESTRATOR"
  note: "Scope is limited to task archive drift detection and deterministic close-path coverage for projection-backed backends; no unrelated backend refactors."
verification:
  state: "ok"
  updated_at: "2026-03-09T08:25:10.879Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/shared/git-context.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000; Result: pass. Evidence: 48 tests passed across doctor, finish, and git-context paths, including the new archive-drift and projection-close cases. Scope: targeted regression coverage for doctor diagnostics, projection-backed finish auto-close behavior, and git untracked-path detection. Command: bun run lint:core -- packages/agentplane/src/backends/task-backend/local-backend.ts packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend/shared/types.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/doctor/workspace.ts packages/agentplane/src/commands/shared/git-context.test.ts packages/agentplane/src/commands/shared/git-context.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish.unit.test.ts; Result: pass. Evidence: no lint findings. Scope: all changed implementation and regression files. Command: bun run --filter=agentplane build && agentplane doctor; Result: pass. Evidence: build succeeded and doctor stayed OK in the live repo, with only informational runtime/archive messages and no new archive-drift finding. Scope: runtime validity and live workspace health after the patch."
commit:
  hash: "075a8cee4bd764a4b8defa58edec48b0693aaadb"
  message: "🐛 RFNH5B task: guard archive drift and projection close commits"
comments:
  -
    author: "CODER"
    body: "Start: tracing where DONE-task README artifacts can still drift outside git, then adding a doctor guard and tightening the deterministic close path for projection-backed backends if the current finish flow still leaves a gap."
  -
    author: "CODER"
    body: "Verified: the fix now detects DONE task README archives that exist on disk but are missing from the git index, and it extends deterministic close-commit behavior from LocalBackend identity to the backend capability that actually writes task READMEs. Targeted tests, lint, build, and a live doctor run all passed."
events:
  -
    type: "status"
    at: "2026-03-09T08:14:50.525Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: tracing where DONE-task README artifacts can still drift outside git, then adding a doctor guard and tightening the deterministic close path for projection-backed backends if the current finish flow still leaves a gap."
  -
    type: "verify"
    at: "2026-03-09T08:25:10.879Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/shared/git-context.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000; Result: pass. Evidence: 48 tests passed across doctor, finish, and git-context paths, including the new archive-drift and projection-close cases. Scope: targeted regression coverage for doctor diagnostics, projection-backed finish auto-close behavior, and git untracked-path detection. Command: bun run lint:core -- packages/agentplane/src/backends/task-backend/local-backend.ts packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend/shared/types.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/doctor/workspace.ts packages/agentplane/src/commands/shared/git-context.test.ts packages/agentplane/src/commands/shared/git-context.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish.unit.test.ts; Result: pass. Evidence: no lint findings. Scope: all changed implementation and regression files. Command: bun run --filter=agentplane build && agentplane doctor; Result: pass. Evidence: build succeeded and doctor stayed OK in the live repo, with only informational runtime/archive messages and no new archive-drift finding. Scope: runtime validity and live workspace health after the patch."
  -
    type: "status"
    at: "2026-03-09T08:25:23.211Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the fix now detects DONE task README archives that exist on disk but are missing from the git index, and it extends deterministic close-commit behavior from LocalBackend identity to the backend capability that actually writes task READMEs. Targeted tests, lint, build, and a live doctor run all passed."
doc_version: 3
doc_updated_at: "2026-03-09T08:25:23.211Z"
doc_updated_by: "CODER"
description: "Detect DONE task README artifacts that exist outside the git index, analyze whether task lifecycle can still leave task artifacts uncommitted on projection-backed backends, and harden the close path where the risk is real."
id_source: "generated"
---
## Summary

Guard task archive drift and projection close commits

Detect DONE task README artifacts that exist outside the git index, analyze whether task lifecycle can still leave task artifacts uncommitted on projection-backed backends, and harden the close path where the risk is real.

## Scope

- In scope: Detect DONE task README artifacts that exist outside the git index, analyze whether task lifecycle can still leave task artifacts uncommitted on projection-backed backends, and harden the close path where the risk is real.
- Out of scope: unrelated refactors not required for "Guard task archive drift and projection close commits".

## Plan

1. Inspect doctor, finish, and commit close paths to identify which task artifacts can still fall out of git and under which backend/workflow conditions that remains possible.
2. Add a diagnostic check that reports DONE task README artifacts present on disk but missing from the git index, with exact task IDs and a deterministic recovery path.
3. If projection-backed backends still skip the deterministic close-commit path, tighten finish/close behavior or its diagnostics so task README artifacts are not silently left outside git after task completion.

## Verify Steps

1. Run targeted tests around doctor, finish, and close-commit flows. Expected: new checks pass for local and projection-backed backend scenarios without regressing existing direct workflow behavior.
2. Run agentplane doctor in the repository after the change. Expected: doctor remains clean when no archive drift exists and emits a precise actionable finding when the new drift condition is simulated in tests.
3. Review the finish/commit code paths for projection-backed backends. Expected: the implementation either guarantees deterministic archival commits for tracked task README artifacts or emits an explicit recovery path instead of silently leaving them outside git.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T08:25:10.879Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/shared/git-context.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000; Result: pass. Evidence: 48 tests passed across doctor, finish, and git-context paths, including the new archive-drift and projection-close cases. Scope: targeted regression coverage for doctor diagnostics, projection-backed finish auto-close behavior, and git untracked-path detection. Command: bun run lint:core -- packages/agentplane/src/backends/task-backend/local-backend.ts packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend/shared/types.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/doctor/workspace.ts packages/agentplane/src/commands/shared/git-context.test.ts packages/agentplane/src/commands/shared/git-context.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish.unit.test.ts; Result: pass. Evidence: no lint findings. Scope: all changed implementation and regression files. Command: bun run --filter=agentplane build && agentplane doctor; Result: pass. Evidence: build succeeded and doctor stayed OK in the live repo, with only informational runtime/archive messages and no new archive-drift finding. Scope: runtime validity and live workspace health after the patch.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T08:24:11.336Z, excerpt_hash=sha256:e83c90c8e370cfdf0bc918a458c1f5800e687bea020ecafcf57d28f7bd7d7772

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: the narrow 0.3.3 prep miss was not random deletion; it came from a short window where DONE-state metadata landed in the task index without a tracked close/archive commit.
  Impact: a repository can look logically clean in tasks.json while the human-readable task archive is missing from git history.
  Resolution: doctor now warns on DONE task README files present on disk but missing from the git index and points to an exact git add recovery command.
  Promotion: none

- Observation: a broader silent-archive risk still existed on projection-backed backends because finish only auto-ran deterministic close commits for LocalBackend, even though Redmine now writes local task README projection files too.
  Impact: direct-mode task completion on a projection-backed backend could leave the local task README artifact outside git unless the user explicitly handled close commits.
  Resolution: finish now keys deterministic close/amend behavior off backend capability writes_task_readmes instead of LocalBackend identity, so tracked task README artifacts are archived consistently across local and projection-backed backends.
  Promotion: incident-candidate
