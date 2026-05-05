---
id: "202605052122-1KTJP3"
title: "Add structured blueprint intent contract"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "code"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T21:22:51.938Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T21:33:05.785Z"
  updated_by: "CODER"
  note: "Verified: structured blueprint intent fields, resolver precedence, task creation flags, commit-scope synchronization, schema/docs generation, and focused regression tests passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement structured blueprint intent fields, resolver precedence, commit-scope synchronization checks, and documentation in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-05-05T21:23:02.379Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement structured blueprint intent fields, resolver precedence, commit-scope synchronization checks, and documentation in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-05-05T21:33:05.785Z"
    author: "CODER"
    state: "ok"
    note: "Verified: structured blueprint intent fields, resolver precedence, task creation flags, commit-scope synchronization, schema/docs generation, and focused regression tests passed."
doc_version: 3
doc_updated_at: "2026-05-05T21:33:05.789Z"
doc_updated_by: "CODER"
description: "Implement structured task intent fields for blueprint resolution, synchronize commit scope vocabulary with resolved blueprint semantics, and document the authoring path without adding Quint."
sections:
  Summary: |-
    Add structured blueprint intent contract
    
    Implement structured task intent fields for blueprint resolution, synchronize commit scope vocabulary with resolved blueprint semantics, and document the authoring path without adding Quint.
  Scope: |-
    - In scope: Implement structured task intent fields for blueprint resolution, synchronize commit scope vocabulary with resolved blueprint semantics, and document the authoring path without adding Quint.
    - Out of scope: unrelated refactors not required for "Add structured blueprint intent contract".
  Plan: "1. Add structured blueprint intent fields to the blueprint resolver model and normalize/validate them. 2. Make resolver prefer explicit task intent fields before tags/title/description while preserving keyword fallback. 3. Synchronize commit scope vocabulary with blueprint/task-kind semantics through reusable helpers and tests, without making commit subjects the initial selector. 4. Update blueprint/recipe documentation to describe task intent metadata, commit trailers, and the efficient blueprint authoring path. 5. Run targeted blueprint tests, lint/type checks available in the repo, policy routing, and doctor."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T21:33:05.785Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: structured blueprint intent fields, resolver precedence, task creation flags, commit-scope synchronization, schema/docs generation, and focused regression tests passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T21:23:02.379Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands passed: bun test packages/agentplane/src/blueprints/resolve.test.ts packages/core/src/commit/commit-policy.test.ts; bun test packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts -t 'stores structured blueprint intent'; bun test packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts -t 'structured task intent'; bun run typecheck; bun run schemas:check; bun run docs:cli:check; bun run spec:examples:check; git diff --check; node .agentplane/policy/check-routing.mjs; node packages/agentplane/bin/agentplane.js doctor.
      Impact: Structured task metadata now drives blueprint resolution before title/description fallback, and commit-message validation can reject task scopes that contradict recorded task intent.
      Resolution: Implemented typed task intent fields, CLI creation flags, resolver/task-input integration, commit policy helper/hook integration, schemas, generated CLI docs, and developer documentation.
id_source: "generated"
---
## Summary

Add structured blueprint intent contract

Implement structured task intent fields for blueprint resolution, synchronize commit scope vocabulary with resolved blueprint semantics, and document the authoring path without adding Quint.

## Scope

- In scope: Implement structured task intent fields for blueprint resolution, synchronize commit scope vocabulary with resolved blueprint semantics, and document the authoring path without adding Quint.
- Out of scope: unrelated refactors not required for "Add structured blueprint intent contract".

## Plan

1. Add structured blueprint intent fields to the blueprint resolver model and normalize/validate them. 2. Make resolver prefer explicit task intent fields before tags/title/description while preserving keyword fallback. 3. Synchronize commit scope vocabulary with blueprint/task-kind semantics through reusable helpers and tests, without making commit subjects the initial selector. 4. Update blueprint/recipe documentation to describe task intent metadata, commit trailers, and the efficient blueprint authoring path. 5. Run targeted blueprint tests, lint/type checks available in the repo, policy routing, and doctor.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T21:33:05.785Z — VERIFY — ok

By: CODER

Note: Verified: structured blueprint intent fields, resolver precedence, task creation flags, commit-scope synchronization, schema/docs generation, and focused regression tests passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T21:23:02.379Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands passed: bun test packages/agentplane/src/blueprints/resolve.test.ts packages/core/src/commit/commit-policy.test.ts; bun test packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts -t 'stores structured blueprint intent'; bun test packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts -t 'structured task intent'; bun run typecheck; bun run schemas:check; bun run docs:cli:check; bun run spec:examples:check; git diff --check; node .agentplane/policy/check-routing.mjs; node packages/agentplane/bin/agentplane.js doctor.
  Impact: Structured task metadata now drives blueprint resolution before title/description fallback, and commit-message validation can reject task scopes that contradict recorded task intent.
  Resolution: Implemented typed task intent fields, CLI creation flags, resolver/task-input integration, commit policy helper/hook integration, schemas, generated CLI docs, and developer documentation.
