---
id: "202605031524-HNAHQK"
title: "Make branch_pr batch metadata first-class"
result_summary: "Merged via PR #826."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T15:24:46.938Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T15:31:22.293Z"
  updated_by: "CODER"
  note: "Structured branch_pr batch metadata implemented and focused checks passed."
commit:
  hash: "006e5d0794f5421d467f06ff37863395defb02f8"
  message: "Merge pull request #826 from basilisk-labs/task/202605031524-HNAHQK/batch-metadata-contract"
comments:
  -
    author: "CODER"
    body: "Start: implement first-class branch_pr batch metadata before closure behavior changes."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #826 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-03T15:25:05.130Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement first-class branch_pr batch metadata before closure behavior changes."
  -
    type: "verify"
    at: "2026-05-03T15:31:22.293Z"
    author: "CODER"
    state: "ok"
    note: "Structured branch_pr batch metadata implemented and focused checks passed."
  -
    type: "status"
    at: "2026-05-03T15:35:01.215Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #826 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-03T15:35:01.220Z"
doc_updated_by: "INTEGRATOR"
description: "Extend branch_pr PR metadata and artifact rendering so a primary PR records included task ids as a structured batch membership contract, with tests proving stable preservation across pr open/update."
sections:
  Summary: |-
    Make branch_pr batch metadata first-class
    
    Extend branch_pr PR metadata and artifact rendering so a primary PR records included task ids as a structured batch membership contract, with tests proving stable preservation across pr open/update.
  Scope: |-
    - In scope: Extend branch_pr PR metadata and artifact rendering so a primary PR records included task ids as a structured batch membership contract, with tests proving stable preservation across pr open/update.
    - Out of scope: unrelated refactors not required for "Make branch_pr batch metadata first-class".
  Plan: "Scope: introduce a first-class branch_pr batch metadata contract without changing closure behavior yet. Tasks: extend the PR metadata schema/model to preserve structured batch membership; keep backward compatibility with existing related_task_ids; render the batch clearly in review/GitHub artifacts; add focused tests for pr open/update preserving and sorting included task ids. Acceptance: existing PR artifact tests pass, new tests prove stable metadata, and no task lifecycle behavior changes in this atom."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T15:31:22.293Z — VERIFY — ok
    
    By: CODER
    
    Note: Structured branch_pr batch metadata implemented and focused checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T15:25:05.130Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Added typed pr/meta batch contract, backward-compatible related_task_ids hydration, explicit batch rendering, schema artifacts, and focused tests.
      Impact: Future branch_pr validation/closure atoms can resolve included task ids from first-class metadata instead of inferring from PR body or per-leaf PR meta.
      Resolution: Verification: bun test packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts packages/core/src/tasks/task-artifact-schema.test.ts; bun run typecheck; bun run schemas:check; bun run spec:examples:check; bun run format:check; bun run check:types-files; node .agentplane/policy/check-routing.mjs.
id_source: "generated"
---
## Summary

Make branch_pr batch metadata first-class

Extend branch_pr PR metadata and artifact rendering so a primary PR records included task ids as a structured batch membership contract, with tests proving stable preservation across pr open/update.

## Scope

- In scope: Extend branch_pr PR metadata and artifact rendering so a primary PR records included task ids as a structured batch membership contract, with tests proving stable preservation across pr open/update.
- Out of scope: unrelated refactors not required for "Make branch_pr batch metadata first-class".

## Plan

Scope: introduce a first-class branch_pr batch metadata contract without changing closure behavior yet. Tasks: extend the PR metadata schema/model to preserve structured batch membership; keep backward compatibility with existing related_task_ids; render the batch clearly in review/GitHub artifacts; add focused tests for pr open/update preserving and sorting included task ids. Acceptance: existing PR artifact tests pass, new tests prove stable metadata, and no task lifecycle behavior changes in this atom.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T15:31:22.293Z — VERIFY — ok

By: CODER

Note: Structured branch_pr batch metadata implemented and focused checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T15:25:05.130Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Added typed pr/meta batch contract, backward-compatible related_task_ids hydration, explicit batch rendering, schema artifacts, and focused tests.
  Impact: Future branch_pr validation/closure atoms can resolve included task ids from first-class metadata instead of inferring from PR body or per-leaf PR meta.
  Resolution: Verification: bun test packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts packages/core/src/tasks/task-artifact-schema.test.ts; bun run typecheck; bun run schemas:check; bun run spec:examples:check; bun run format:check; bun run check:types-files; node .agentplane/policy/check-routing.mjs.
