---
id: "202606020927-HN8GTQ"
title: "Split oversized branch_pr lifecycle test files"
status: "DOING"
priority: "normal"
owner: "TESTER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "testing"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run hotspots:check"
  - "bun run vitest:projects:check"
  - "bun test packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-06-02T09:28:42.335Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-02T10:12:34.882Z"
  updated_by: "TESTER"
  note: "Split branch_pr worktree runtime coverage into a focused test file; target tests, hotspot baseline, vitest project routing, and policy routing passed."
  attempts: 0
commit: null
comments:
  -
    author: "TESTER"
    body: "Start: Split oversized finish and branch_pr lifecycle test structure by extracting shared finish validation harness while preserving scenario coverage."
events:
  -
    type: "status"
    at: "2026-06-02T09:56:20.732Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: Split oversized finish and branch_pr lifecycle test structure by extracting shared finish validation harness while preserving scenario coverage."
  -
    type: "verify"
    at: "2026-06-02T10:12:34.882Z"
    author: "TESTER"
    state: "ok"
    note: "Split branch_pr worktree runtime coverage into a focused test file; target tests, hotspot baseline, vitest project routing, and policy routing passed."
doc_version: 3
doc_updated_at: "2026-06-02T10:12:34.911Z"
doc_updated_by: "TESTER"
description: "Refactor the largest branch_pr and finish lifecycle test files into smaller scenario-focused suites without changing production behavior. This lowers review and CI diagnosis cost before the patch release while avoiding feature-surface changes."
sections:
  Summary: |-
    Split oversized branch_pr lifecycle test files

    Refactor the largest branch_pr and finish lifecycle test files into smaller scenario-focused suites without changing production behavior. This lowers review and CI diagnosis cost before the patch release while avoiding feature-surface changes.
  Scope: |-
    - In scope: Refactor the largest branch_pr and finish lifecycle test files into smaller scenario-focused suites without changing production behavior. This lowers review and CI diagnosis cost before the patch release while avoiding feature-surface changes.
    - Out of scope: unrelated refactors not required for "Split oversized branch_pr lifecycle test files".
  Plan: |-
    1. Split the largest branch_pr / finish lifecycle test files into scenario-focused files without changing production code.
    2. Preserve fixture setup and assertions while extracting shared test helpers only where duplication is already material.
    3. Keep the oversized-test baseline honest: either reduce entries below the current threshold or update only when the split exposes a justified remaining large suite.
    4. Run focused lifecycle suites plus hotspot and vitest project checks.
    Acceptance: behavior coverage is unchanged, oversized lifecycle test files are smaller and easier to diagnose, and hotspot/test routing checks remain green.
  Verify Steps: |-
    1. Run bun test packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts; expected: branch_pr and finish lifecycle coverage remains green.
    2. Run bun run hotspots:check; expected: hotspot thresholds and oversized test baseline remain valid, preferably with fewer oversized lifecycle entries.
    3. Run bun run vitest:projects:check; expected: split test files remain correctly routed in Vitest project config.
    4. Run node .agentplane/policy/check-routing.mjs; expected: routing policy remains valid.
    5. Review moved test scenarios; expected: production behavior is unchanged and scenario names still explain failures clearly.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-02T10:12:34.882Z — VERIFY — ok

    By: TESTER

    Note: Split branch_pr worktree runtime coverage into a focused test file; target tests, hotspot baseline, vitest project routing, and policy routing passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-02T09:56:20.732Z, excerpt_hash=sha256:261a5ec9133db9351cbc563ff8c75acc9bb54b40612482650da19cb56a7bbd8b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606020927-HN8GTQ-split-oversized-branch-pr-lifecycle-test-files/.agentplane/tasks/202606020927-HN8GTQ/blueprint/resolved-snapshot.json
    - old_digest: 55799c5c4399c5e1e27782c8b047b86a0e686e3ce3913a40f56a26bfac2890ca
    - current_digest: 55799c5c4399c5e1e27782c8b047b86a0e686e3ce3913a40f56a26bfac2890ca
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606020927-HN8GTQ

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: run-cli.core.pr-flow.test.ts reduced to 592 lines; new run-cli.core.pr-flow.worktree-runtime.test.ts is 790 lines; oversized test baseline dropped from 11 to 10 entries.
      Impact: Branch_pr work start runtime and README scenarios are easier to maintain without changing production behavior.
      Resolution: Verified with bun test targeted pr-flow files, bun run hotspots:check, bun run vitest:projects:check, and node .agentplane/policy/check-routing.mjs.
id_source: "generated"
---
## Summary

Split oversized branch_pr lifecycle test files

Refactor the largest branch_pr and finish lifecycle test files into smaller scenario-focused suites without changing production behavior. This lowers review and CI diagnosis cost before the patch release while avoiding feature-surface changes.

## Scope

- In scope: Refactor the largest branch_pr and finish lifecycle test files into smaller scenario-focused suites without changing production behavior. This lowers review and CI diagnosis cost before the patch release while avoiding feature-surface changes.
- Out of scope: unrelated refactors not required for "Split oversized branch_pr lifecycle test files".

## Plan

1. Split the largest branch_pr / finish lifecycle test files into scenario-focused files without changing production code.
2. Preserve fixture setup and assertions while extracting shared test helpers only where duplication is already material.
3. Keep the oversized-test baseline honest: either reduce entries below the current threshold or update only when the split exposes a justified remaining large suite.
4. Run focused lifecycle suites plus hotspot and vitest project checks.
Acceptance: behavior coverage is unchanged, oversized lifecycle test files are smaller and easier to diagnose, and hotspot/test routing checks remain green.

## Verify Steps

1. Run bun test packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts; expected: branch_pr and finish lifecycle coverage remains green.
2. Run bun run hotspots:check; expected: hotspot thresholds and oversized test baseline remain valid, preferably with fewer oversized lifecycle entries.
3. Run bun run vitest:projects:check; expected: split test files remain correctly routed in Vitest project config.
4. Run node .agentplane/policy/check-routing.mjs; expected: routing policy remains valid.
5. Review moved test scenarios; expected: production behavior is unchanged and scenario names still explain failures clearly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-02T10:12:34.882Z — VERIFY — ok

By: TESTER

Note: Split branch_pr worktree runtime coverage into a focused test file; target tests, hotspot baseline, vitest project routing, and policy routing passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-02T09:56:20.732Z, excerpt_hash=sha256:261a5ec9133db9351cbc563ff8c75acc9bb54b40612482650da19cb56a7bbd8b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606020927-HN8GTQ-split-oversized-branch-pr-lifecycle-test-files/.agentplane/tasks/202606020927-HN8GTQ/blueprint/resolved-snapshot.json
- old_digest: 55799c5c4399c5e1e27782c8b047b86a0e686e3ce3913a40f56a26bfac2890ca
- current_digest: 55799c5c4399c5e1e27782c8b047b86a0e686e3ce3913a40f56a26bfac2890ca
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606020927-HN8GTQ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: run-cli.core.pr-flow.test.ts reduced to 592 lines; new run-cli.core.pr-flow.worktree-runtime.test.ts is 790 lines; oversized test baseline dropped from 11 to 10 entries.
  Impact: Branch_pr work start runtime and README scenarios are easier to maintain without changing production behavior.
  Resolution: Verified with bun test targeted pr-flow files, bun run hotspots:check, bun run vitest:projects:check, and node .agentplane/policy/check-routing.mjs.
