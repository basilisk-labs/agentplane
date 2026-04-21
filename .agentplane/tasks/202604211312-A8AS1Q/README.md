---
id: "202604211312-A8AS1Q"
title: "Repoint agentplane testing shim to testkit package alias"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604211312-4PXEBW"
tags:
  - "code"
  - "testing"
  - "testkit"
verify:
  - "bun run test:project -- cli-core"
  - "bun run test:project -- cli-unit"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:12:29.271Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-21T13:12:27.670Z"
doc_updated_by: "PLANNER"
description: "Replace packages/agentplane/src/testing direct ../../../testkit/dist imports with @agentplane/testkit package alias imports so dev tests do not depend on prebuilt dist."
sections:
  Summary: |-
    Repoint agentplane testing shim to testkit package alias
    
    Replace packages/agentplane/src/testing direct ../../../testkit/dist imports with @agentplane/testkit package alias imports so dev tests do not depend on prebuilt dist.
  Scope: |-
    - In scope: Replace packages/agentplane/src/testing direct ../../../testkit/dist imports with @agentplane/testkit package alias imports so dev tests do not depend on prebuilt dist.
    - Out of scope: unrelated refactors not required for "Repoint agentplane testing shim to testkit package alias".
  Plan: "Scope: close the dev-loop mismatch in the transitional testing facade. Steps: 1. Update testing/index.ts to import from @agentplane/testkit and its supported subpaths instead of ../../../testkit/dist. 2. Ensure vitest/tsconfig resolution works before a package build. 3. Keep existing consumers stable. Acceptance: tests pass from source without requiring testkit dist freshness; no direct testkit/dist import remains in packages/agentplane/src/testing."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run test:project -- cli-core`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Repoint agentplane testing shim to testkit package alias

Replace packages/agentplane/src/testing direct ../../../testkit/dist imports with @agentplane/testkit package alias imports so dev tests do not depend on prebuilt dist.

## Scope

- In scope: Replace packages/agentplane/src/testing direct ../../../testkit/dist imports with @agentplane/testkit package alias imports so dev tests do not depend on prebuilt dist.
- Out of scope: unrelated refactors not required for "Repoint agentplane testing shim to testkit package alias".

## Plan

Scope: close the dev-loop mismatch in the transitional testing facade. Steps: 1. Update testing/index.ts to import from @agentplane/testkit and its supported subpaths instead of ../../../testkit/dist. 2. Ensure vitest/tsconfig resolution works before a package build. 3. Keep existing consumers stable. Acceptance: tests pass from source without requiring testkit dist freshness; no direct testkit/dist import remains in packages/agentplane/src/testing.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run test:project -- cli-core`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
