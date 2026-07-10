---
id: "202607100106-YP0PYE"
title: "Bound context extraction batches by source bytes and prevent duplicate ingestion"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 16
origin:
  system: "manual"
depends_on:
  - "202607100021-S11TCN"
tags:
  - "assimilation"
  - "context"
  - "extraction"
  - "performance"
  - "release-0.6.22"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun test packages/agentplane/src/commands/context/harvest-tasks.test.ts"
  - "bun run --filter=agentplane typecheck"
  - "bun run lint:core"
  - "bun run ci:contract"
  - "bun run test:fast"
plan_approval:
  state: "approved"
  updated_at: "2026-07-10T01:49:17.177Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-10T01:21:52.745Z"
  updated_by: "CODER"
  note: "Pass: focused context harvest tests 14/14; AgentPlane typecheck; lint:core; ci:contract; full fast suite 361 files and 2,139 tests; live CLI help and dry-run confirmed batch-bytes, source byte totals, oversized ids, and batch fingerprints."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-10T01:51:59.221Z"
  updated_by: "EVALUATOR"
  note: "Byte-bounded extraction batching, duplicate suppression, and the included pre-merge lifecycle fix are verified on the current PR head."
  evaluated_sha: "89e0032d8a00fd5ac41968fef93e9d64ff525cd6"
  blueprint_digest: "2a7a503eb9503139894d593dd213142afbf4363b66d63dfc62ebe0a05130d6ac"
  evidence_refs:
    - ".agentplane/tasks/202607100106-YP0PYE/README.md"
    - ".agentplane/tasks/202607100106-YP0PYE/quality/20260710-015159221-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607100106-YP0PYE/quality/20260710-015159221-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607100106-YP0PYE/quality/20260710-015159221-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607100106-YP0PYE/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/context/harvest-tasks.test.ts"
    - "packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts"
    - "docs/user/cli-reference.generated.mdx"
  findings:
    - "Focused context tests 14/14 and lifecycle tests 3/3 pass; typecheck, lint:core, ci:contract, and the 2,141-test fast suite are green."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement count-plus-byte bounded context extraction batches, deterministic source sizing, and cross-marker duplicate suppression for v0.6.22."
events:
  -
    type: "status"
    at: "2026-07-10T01:07:58.163Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement count-plus-byte bounded context extraction batches, deterministic source sizing, and cross-marker duplicate suppression for v0.6.22."
  -
    type: "verify"
    at: "2026-07-10T01:21:52.745Z"
    author: "CODER"
    state: "ok"
    note: "Pass: focused context harvest tests 14/14; AgentPlane typecheck; lint:core; ci:contract; full fast suite 361 files and 2,139 tests; live CLI help and dry-run confirmed batch-bytes, source byte totals, oversized ids, and batch fingerprints."
doc_version: 3
doc_updated_at: "2026-07-10T01:41:56.117Z"
doc_updated_by: "CODER"
description: "For v0.6.22, make task-history context extraction batching respect a deterministic serialized-source byte budget in addition to task count, isolate oversized single sources, surface batch byte metadata, and converge queued/ingested duplicate detection on the same versioned source fingerprint without breaking existing CLI defaults."
sections:
  Summary: |-
    Bound context extraction batches by source bytes and prevent duplicate ingestion

    For v0.6.22, make task-history context extraction batching respect a deterministic serialized-source byte budget in addition to task count, isolate oversized single sources, surface batch byte metadata, and converge queued/ingested duplicate detection on the same versioned source fingerprint without breaking existing CLI defaults.
  Scope: |-
    - In scope: packages/agentplane context harvest CLI parsing, task-source fingerprint helpers, extraction batch planning, batch metadata, duplicate-selection logic, and focused tests (target: at most 8 implementation/test files).
    - Acceptance: batches obey both --batch-size and --batch-bytes; a single oversized source is isolated without being dropped; output reports deterministic byte totals and oversized state; unchanged tasks already queued or ingested are not queued again unless explicitly selected with --task.
    - Compatibility: preserve the existing --batch-size default and accept legacy source_digest markers.
    - Out of scope: source document chunking inside a single task, wiki topology/schema changes already delivered by 202607100021-S11TCN, and unrelated release refactors.
  Plan: |-
    1. Define one backward-compatible task-source fingerprint/byte-size helper and use it for queued and ingested markers.
    2. Add a validated --batch-bytes option while preserving --batch-size behavior and default.
    3. Replace fixed-count slicing with stable oldest-first packing constrained by both count and bytes; isolate oversized sources and report exact batch metadata.
    4. Suppress unchanged extraction work when a queued marker already covers the source, while explicit --task remains a force path.
    5. Add focused boundary/compatibility tests, generated CLI reference, and run package, contract, lint, and full-fast checks.
    6. Include related lifecycle task 202607100140-WGV79Y in this primary PR to allow deterministic pre-merge closure to stage the active task artifacts it owns.
    7. Publish both task records through PR #4563 and include them as v0.6.22 release dependencies.
  Verify Steps: |-
    1. Run bun test packages/agentplane/src/commands/context/harvest-tasks.test.ts. Expected: count and byte boundaries, oversized isolation, metadata, legacy marker compatibility, and duplicate suppression pass.
    2. Run bun run --filter=agentplane typecheck. Expected: the AgentPlane package typechecks.
    3. Run bun run lint:core. Expected: core lint passes for implementation paths.
    4. Run bun run ci:contract. Expected: generated contracts, formatting, architecture, and release parity checks pass.
    5. Run bun run test:fast. Expected: the full fast suite passes with no regressions.
    6. Inspect context harvest tasks --help and JSON dry-run output. Expected: --batch-bytes is documented, defaults deterministically, and each planned batch exposes source_bytes/budget/oversized metadata.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-10T01:21:52.745Z — VERIFY — ok

    By: CODER

    Note: Pass: focused context harvest tests 14/14; AgentPlane typecheck; lint:core; ci:contract; full fast suite 361 files and 2,139 tests; live CLI help and dry-run confirmed batch-bytes, source byte totals, oversized ids, and batch fingerprints.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T01:18:24.244Z, excerpt_hash=sha256:83bed1d8d40cd7f1f2a9136e12e13f6166e9a7dc5cdf4f57bcdc6f7da58606e1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100106-YP0PYE-bound-context-extraction-batches-by-source-bytes/.agentplane/tasks/202607100106-YP0PYE/blueprint/resolved-snapshot.json
    - old_digest: 2a7a503eb9503139894d593dd213142afbf4363b66d63dfc62ebe0a05130d6ac
    - current_digest: 2a7a503eb9503139894d593dd213142afbf4363b66d63dfc62ebe0a05130d6ac
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607100106-YP0PYE

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607100106-YP0PYE
    - diagnostic_command: agentplane pr check 202607100106-YP0PYE
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  branch_pr_batch:
    base: "main"
    branch: "task/202607100106-YP0PYE/bound-context-extraction-batches-by-source-bytes"
    included_task_ids:
      - "202607100140-WGV79Y"
    primary_task_id: "202607100106-YP0PYE"
    role: "primary"
    updated_at: "2026-07-10T02:00:29.269Z"
id_source: "generated"
---
## Summary

Bound context extraction batches by source bytes and prevent duplicate ingestion

For v0.6.22, make task-history context extraction batching respect a deterministic serialized-source byte budget in addition to task count, isolate oversized single sources, surface batch byte metadata, and converge queued/ingested duplicate detection on the same versioned source fingerprint without breaking existing CLI defaults.

## Scope

- In scope: packages/agentplane context harvest CLI parsing, task-source fingerprint helpers, extraction batch planning, batch metadata, duplicate-selection logic, and focused tests (target: at most 8 implementation/test files).
- Acceptance: batches obey both --batch-size and --batch-bytes; a single oversized source is isolated without being dropped; output reports deterministic byte totals and oversized state; unchanged tasks already queued or ingested are not queued again unless explicitly selected with --task.
- Compatibility: preserve the existing --batch-size default and accept legacy source_digest markers.
- Out of scope: source document chunking inside a single task, wiki topology/schema changes already delivered by 202607100021-S11TCN, and unrelated release refactors.

## Plan

1. Define one backward-compatible task-source fingerprint/byte-size helper and use it for queued and ingested markers.
2. Add a validated --batch-bytes option while preserving --batch-size behavior and default.
3. Replace fixed-count slicing with stable oldest-first packing constrained by both count and bytes; isolate oversized sources and report exact batch metadata.
4. Suppress unchanged extraction work when a queued marker already covers the source, while explicit --task remains a force path.
5. Add focused boundary/compatibility tests, generated CLI reference, and run package, contract, lint, and full-fast checks.
6. Include related lifecycle task 202607100140-WGV79Y in this primary PR to allow deterministic pre-merge closure to stage the active task artifacts it owns.
7. Publish both task records through PR #4563 and include them as v0.6.22 release dependencies.

## Verify Steps

1. Run bun test packages/agentplane/src/commands/context/harvest-tasks.test.ts. Expected: count and byte boundaries, oversized isolation, metadata, legacy marker compatibility, and duplicate suppression pass.
2. Run bun run --filter=agentplane typecheck. Expected: the AgentPlane package typechecks.
3. Run bun run lint:core. Expected: core lint passes for implementation paths.
4. Run bun run ci:contract. Expected: generated contracts, formatting, architecture, and release parity checks pass.
5. Run bun run test:fast. Expected: the full fast suite passes with no regressions.
6. Inspect context harvest tasks --help and JSON dry-run output. Expected: --batch-bytes is documented, defaults deterministically, and each planned batch exposes source_bytes/budget/oversized metadata.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-10T01:21:52.745Z — VERIFY — ok

By: CODER

Note: Pass: focused context harvest tests 14/14; AgentPlane typecheck; lint:core; ci:contract; full fast suite 361 files and 2,139 tests; live CLI help and dry-run confirmed batch-bytes, source byte totals, oversized ids, and batch fingerprints.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T01:18:24.244Z, excerpt_hash=sha256:83bed1d8d40cd7f1f2a9136e12e13f6166e9a7dc5cdf4f57bcdc6f7da58606e1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100106-YP0PYE-bound-context-extraction-batches-by-source-bytes/.agentplane/tasks/202607100106-YP0PYE/blueprint/resolved-snapshot.json
- old_digest: 2a7a503eb9503139894d593dd213142afbf4363b66d63dfc62ebe0a05130d6ac
- current_digest: 2a7a503eb9503139894d593dd213142afbf4363b66d63dfc62ebe0a05130d6ac
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607100106-YP0PYE

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607100106-YP0PYE
- diagnostic_command: agentplane pr check 202607100106-YP0PYE
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
