---
id: "202604062101-CQWJDM"
title: "Prevent verify from mutating incidents registry"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T21:02:48.023Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-06T21:06:39.084Z"
  updated_by: "CODER"
  note: "Verification locked the branch_pr boundary: verify now keeps incidents.md unchanged while refreshing existing PR artifacts, and PR sync no longer re-runs the open path when artifacts already exist. Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts -t verify; bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts. Result: pass. Evidence: new verify/incidents regression test passed and the narrowed sync path stayed lint-clean. Scope: verify-record branch_pr PR-sync behavior and incidents policy isolation."
commit: null
comments: []
events:
  -
    type: "verify"
    at: "2026-04-06T21:06:39.084Z"
    author: "CODER"
    state: "ok"
    note: "Verification locked the branch_pr boundary: verify now keeps incidents.md unchanged while refreshing existing PR artifacts, and PR sync no longer re-runs the open path when artifacts already exist. Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts -t verify; bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts. Result: pass. Evidence: new verify/incidents regression test passed and the narrowed sync path stayed lint-clean. Scope: verify-record branch_pr PR-sync behavior and incidents policy isolation."
doc_version: 3
doc_updated_at: "2026-04-06T21:06:39.088Z"
doc_updated_by: "CODER"
description: "Lock the workflow boundary so verification and PR artifact sync never mutate .agentplane/policy/incidents.md; add regression coverage for branch_pr verify paths."
sections:
  Summary: |-
    Prevent verify from mutating incidents registry
    
    Lock the workflow boundary so verification and PR artifact sync never mutate .agentplane/policy/incidents.md; add regression coverage for branch_pr verify paths.
  Scope: |-
    - In scope: Lock the workflow boundary so verification and PR artifact sync never mutate .agentplane/policy/incidents.md; add regression coverage for branch_pr verify paths.
    - Out of scope: unrelated refactors not required for "Prevent verify from mutating incidents registry".
  Plan: "1. Reproduce the branch_pr verify path in CLI tests with incidents.md present and assert the registry stays unchanged. 2. Fix the verification/PR-sync write path if policy files can still be mutated indirectly. 3. Verify with targeted vitest and eslint."
  Verify Steps: |-
    - Run focused vitest coverage for branch_pr verify behavior and assert incidents.md remains unchanged.
    - Run eslint on the touched verification and PR-sync source/tests.
    - Smoke-check the task branch workflow until verify updates task/PR artifacts without policy drift.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T21:06:39.084Z — VERIFY — ok
    
    By: CODER
    
    Note: Verification locked the branch_pr boundary: verify now keeps incidents.md unchanged while refreshing existing PR artifacts, and PR sync no longer re-runs the open path when artifacts already exist. Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts -t verify; bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts. Result: pass. Evidence: new verify/incidents regression test passed and the narrowed sync path stayed lint-clean. Scope: verify-record branch_pr PR-sync behavior and incidents policy isolation.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T21:02:32.492Z, excerpt_hash=sha256:452c45dacb0e8acbe28f7d3ccbd9bed04c4e400d73d6ed99994e4d393d199c24
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Prevent verify from mutating incidents registry

Lock the workflow boundary so verification and PR artifact sync never mutate .agentplane/policy/incidents.md; add regression coverage for branch_pr verify paths.

## Scope

- In scope: Lock the workflow boundary so verification and PR artifact sync never mutate .agentplane/policy/incidents.md; add regression coverage for branch_pr verify paths.
- Out of scope: unrelated refactors not required for "Prevent verify from mutating incidents registry".

## Plan

1. Reproduce the branch_pr verify path in CLI tests with incidents.md present and assert the registry stays unchanged. 2. Fix the verification/PR-sync write path if policy files can still be mutated indirectly. 3. Verify with targeted vitest and eslint.

## Verify Steps

- Run focused vitest coverage for branch_pr verify behavior and assert incidents.md remains unchanged.
- Run eslint on the touched verification and PR-sync source/tests.
- Smoke-check the task branch workflow until verify updates task/PR artifacts without policy drift.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T21:06:39.084Z — VERIFY — ok

By: CODER

Note: Verification locked the branch_pr boundary: verify now keeps incidents.md unchanged while refreshing existing PR artifacts, and PR sync no longer re-runs the open path when artifacts already exist. Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts -t verify; bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts. Result: pass. Evidence: new verify/incidents regression test passed and the narrowed sync path stayed lint-clean. Scope: verify-record branch_pr PR-sync behavior and incidents policy isolation.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T21:02:32.492Z, excerpt_hash=sha256:452c45dacb0e8acbe28f7d3ccbd9bed04c4e400d73d6ed99994e4d393d199c24

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
