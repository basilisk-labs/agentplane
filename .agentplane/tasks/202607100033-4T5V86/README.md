---
id: "202607100033-4T5V86"
title: "Synchronize pre-existing schema copies for loop CI"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "loops"
  - "schemas"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-10T00:33:34.431Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-10T00:33:47.607Z"
  updated_by: "REVIEWER"
  note: "Canonical schemas:sync changed only the six declared task-readme/tasks-export schema copies; schemas:check and git diff --check pass."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-10T00:33:59.624Z"
  updated_by: "EVALUATOR"
  note: "Canonical schema synchronization changed only the six declared generated copies and restores schemas:check."
  evaluated_sha: "b402a33be27e231c619143269a9df30b5fffa15b"
  blueprint_digest: "31fa5b6ffe5fba8038151ceca80bb7e17056f2a8e14961b2d9d5e9afe7005072"
  evidence_refs:
    - ".agentplane/tasks/202607100033-4T5V86/README.md"
    - ".agentplane/tasks/202607100033-4T5V86/quality/20260710-003359624-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607100033-4T5V86/quality/20260710-003359624-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607100033-4T5V86/quality/20260710-003359624-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607100033-4T5V86/blueprint/resolved-snapshot.json"
    - "schemas/task-readme-frontmatter.schema.json"
    - "schemas/tasks-export.schema.json"
  findings:
    - "The generator, not hand editing, produced all schema changes; source families are synchronized."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: synchronize only the known schema-copy drift blocking verify-contract on the loop branch."
events:
  -
    type: "status"
    at: "2026-07-10T00:33:35.057Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: synchronize only the known schema-copy drift blocking verify-contract on the loop branch."
  -
    type: "verify"
    at: "2026-07-10T00:33:47.607Z"
    author: "REVIEWER"
    state: "ok"
    note: "Canonical schemas:sync changed only the six declared task-readme/tasks-export schema copies; schemas:check and git diff --check pass."
doc_version: 3
doc_updated_at: "2026-07-10T00:33:47.791Z"
doc_updated_by: "CODER"
description: "Run the canonical schema sync only for the already-drifted task README frontmatter and tasks export schema copies so the agentplane-loops PR can pass verify-contract; no semantic loop or main-branch changes."
sections:
  Summary: |-
    Synchronize pre-existing schema copies for loop CI

    Run the canonical schema sync only for the already-drifted task README frontmatter and tasks export schema copies so the agentplane-loops PR can pass verify-contract; no semantic loop or main-branch changes.
  Scope: "Only the task-readme-frontmatter.schema.json and tasks-export.schema.json copies under schemas/, packages/spec/schemas/, and packages/core/schemas/, plus task-local artifacts. Use bun run schemas:sync; no hand edits, loop behavior changes, or main mutation."
  Plan: |-
    1. Run the canonical schema sync generator.
    2. Confirm only the six known schema copies change.
    3. Run schema and whitespace checks, then batch the task into PR #4558.
  Verify Steps: |-
    1. bun run schemas:sync
    Expected: canonical generator updates only the six drifted schema copies.
    2. bun run schemas:check
    Expected: passes.
    3. git diff --check
    Expected: passes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-10T00:33:47.607Z — VERIFY — ok

    By: REVIEWER

    Note: Canonical schemas:sync changed only the six declared task-readme/tasks-export schema copies; schemas:check and git diff --check pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T00:33:35.057Z, excerpt_hash=sha256:34c05794997b5b71a01ec7e663123e50b2c0e39db28d70e19a787066a1cedc6a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202607092346-4Z7EZP-make-agentplane-loops-executable-resumable-and-t/.agentplane/tasks/202607100033-4T5V86/blueprint/resolved-snapshot.json
    - old_digest: 31fa5b6ffe5fba8038151ceca80bb7e17056f2a8e14961b2d9d5e9afe7005072
    - current_digest: 31fa5b6ffe5fba8038151ceca80bb7e17056f2a8e14961b2d9d5e9afe7005072
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607100033-4T5V86

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202607100033-4T5V86 --agent CODER --slug synchronize-pre-existing-schema-copies-for-loop --worktree
    - diagnostic_command: agentplane work resume 202607100033-4T5V86
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: worktree_projection_drift

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  branch_pr_batch:
    base: "agentplane-loops"
    branch: "task/202607092346-4Z7EZP/make-agentplane-loops-executable-resumable-and-t"
    included_task_ids:
      - "202607100026-EBQXPZ"
      - "202607100033-4T5V86"
    primary_task_id: "202607092346-4Z7EZP"
    role: "included"
    updated_at: "2026-07-10T00:34:11.055Z"
id_source: "generated"
---
## Summary

Synchronize pre-existing schema copies for loop CI

Run the canonical schema sync only for the already-drifted task README frontmatter and tasks export schema copies so the agentplane-loops PR can pass verify-contract; no semantic loop or main-branch changes.

## Scope

Only the task-readme-frontmatter.schema.json and tasks-export.schema.json copies under schemas/, packages/spec/schemas/, and packages/core/schemas/, plus task-local artifacts. Use bun run schemas:sync; no hand edits, loop behavior changes, or main mutation.

## Plan

1. Run the canonical schema sync generator.
2. Confirm only the six known schema copies change.
3. Run schema and whitespace checks, then batch the task into PR #4558.

## Verify Steps

1. bun run schemas:sync
Expected: canonical generator updates only the six drifted schema copies.
2. bun run schemas:check
Expected: passes.
3. git diff --check
Expected: passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-10T00:33:47.607Z — VERIFY — ok

By: REVIEWER

Note: Canonical schemas:sync changed only the six declared task-readme/tasks-export schema copies; schemas:check and git diff --check pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T00:33:35.057Z, excerpt_hash=sha256:34c05794997b5b71a01ec7e663123e50b2c0e39db28d70e19a787066a1cedc6a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202607092346-4Z7EZP-make-agentplane-loops-executable-resumable-and-t/.agentplane/tasks/202607100033-4T5V86/blueprint/resolved-snapshot.json
- old_digest: 31fa5b6ffe5fba8038151ceca80bb7e17056f2a8e14961b2d9d5e9afe7005072
- current_digest: 31fa5b6ffe5fba8038151ceca80bb7e17056f2a8e14961b2d9d5e9afe7005072
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607100033-4T5V86

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202607100033-4T5V86 --agent CODER --slug synchronize-pre-existing-schema-copies-for-loop --worktree
- diagnostic_command: agentplane work resume 202607100033-4T5V86
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: worktree_projection_drift

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
