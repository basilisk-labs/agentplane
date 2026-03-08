---
id: "202603081315-NV76YZ"
title: "Fix finish close-commit hang after DONE transition"
result_summary: "Finish close-path observability now emits an explicit progress marker before the deterministic close commit, reducing false hang diagnoses without changing the close-commit contract."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T13:20:57.982Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: improve finish close-path observability without changing the underlying DONE and close-commit semantics."
verification:
  state: "ok"
  updated_at: "2026-03-08T13:24:18.866Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --pool=threads --testTimeout 60000 --hookTimeout 60000; bun run lint:core -- packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts. Result: pass. Evidence: finish unit and lifecycle coverage now assert a close-commit progress marker before the deterministic close commit, and lint passes on the touched files. Scope: finish close-path observability only."
commit:
  hash: "8912be62a0cdc14525215f530b6ddc650d53a193"
  message: "🔧 NV76YZ task: make finish close-path observable"
comments:
  -
    author: "CODER"
    body: "Start: tracing finish through the deterministic close-commit path and adding explicit progress output plus regression coverage for the observed apparent hang."
  -
    author: "CODER"
    body: "Verified: finish now announces the deterministic close-commit phase after the task transitions to DONE, so long hook-heavy close commits are observable instead of looking hung."
events:
  -
    type: "status"
    at: "2026-03-08T13:20:58.521Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: tracing finish through the deterministic close-commit path and adding explicit progress output plus regression coverage for the observed apparent hang."
  -
    type: "verify"
    at: "2026-03-08T13:24:18.866Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --pool=threads --testTimeout 60000 --hookTimeout 60000; bun run lint:core -- packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts. Result: pass. Evidence: finish unit and lifecycle coverage now assert a close-commit progress marker before the deterministic close commit, and lint passes on the touched files. Scope: finish close-path observability only."
  -
    type: "status"
    at: "2026-03-08T13:24:19.069Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: finish now announces the deterministic close-commit phase after the task transitions to DONE, so long hook-heavy close commits are observable instead of looking hung."
doc_version: 3
doc_updated_at: "2026-03-08T13:24:19.069Z"
doc_updated_by: "CODER"
description: "Investigate why finish sometimes marks a task DONE and stages the README but appears to hang before or after the deterministic close commit, then make the close path reliable and observable."
id_source: "generated"
---
## Summary

- Problem: `finish` can look hung after the task is already marked `DONE` because the close-commit phase runs without explicit progress output.
- Target outcome: make the deterministic close-commit path observable and easier to diagnose without weakening the existing close-commit safety checks.
- Constraint: preserve the current direct-workflow contract and deterministic close-commit behavior.

## Scope

### In scope
- Trace the `finish -> close commit` execution path.
- Add explicit progress reporting around deterministic close commits.
- Add regression coverage for the new observability contract.

### Out of scope
- Redesign the overall task lifecycle.
- Broaden the change into unrelated commit-hook or release-flow behavior.

## Plan

1. Inspect the `finish` command path and confirm where state is written before the deterministic close commit runs.
2. Add explicit progress output before the close-commit phase and cover it with unit and lifecycle tests.
3. Run targeted finish/lifecycle checks, record the remaining close-path limitations in `Findings`, and close the task.

## Verify Steps

1. Run targeted finish unit tests. Expected: the close-commit path reports progress before invoking the deterministic close commit and still reports `finished` on success.
2. Run the focused lifecycle finish tests. Expected: CLI output includes the new close-commit progress marker and the command still completes successfully.
3. Review the final `finish` behavior against the original symptom. Expected: a long close-commit phase is observable as in-progress work rather than an apparent hang.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T13:24:18.866Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --pool=threads --testTimeout 60000 --hookTimeout 60000; bun run lint:core -- packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts. Result: pass. Evidence: finish unit and lifecycle coverage now assert a close-commit progress marker before the deterministic close commit, and lint passes on the touched files. Scope: finish close-path observability only.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T13:24:18.702Z, excerpt_hash=sha256:69cc3dabe516c441b4adbddca90180381d10758c9db32f3d7c0dd243d281898b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the `finish` observability commit(s).
2. Re-run the finish/lifecycle tests to confirm the previous output contract is restored.

## Findings

- Observation: the apparent hang happens after finish has already written DONE metadata and before the deterministic close commit returns, because that close path previously had no explicit progress output.
  Impact: long hook-heavy close commits look indistinguishable from a stuck process, and the already-updated README makes the symptom look like a partial failure.
  Resolution: added an explicit progress marker before the deterministic close commit and covered it with unit plus lifecycle regressions.
  Promotion: incident-candidate
