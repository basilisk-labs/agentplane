---
id: "202604211316-2FRTB3"
title: "Implement experimental init v2 orchestrator"
result_summary: "Added experimental Clack-powered init v2 orchestration behind --experimental-ui and AGENTPLANE_INIT_UI=v2 while keeping legacy init as the default route."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604211316-KAPJPA"
tags:
  - "cli"
  - "code"
  - "init"
verify:
  - "bun run test:project -- cli-core"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.init.v2.test.ts --pool=forks --maxWorkers 4 --testTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:16:27.289Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T16:53:31.163Z"
  updated_by: "CODER"
  note: "Verified experimental init v2 orchestrator. Checks: bunx vitest run packages/agentplane/src/cli/run-cli.core.init.v2.test.ts --pool=forks --maxWorkers 4 --testTimeout 60000 passed (1 file, 3 tests); bun run typecheck passed; bun run test:project -- cli-core passed (60 files, 596 tests); bun run lint:core passed; bun run format:check passed; git diff --check passed."
commit:
  hash: "77a86edbac6fdd357bbc1d728ba7c2fee598e8a4"
  message: "✨ 2FRTB3 init: add experimental v2 orchestrator"
comments:
  -
    author: "CODER"
    body: "Start: implement experimental init v2 orchestrator now that prompt, conflict, and apply helpers exist."
  -
    author: "CODER"
    body: "Verified: experimental init v2 orchestrator. Checks: v2 e2e test; bun run typecheck; bun run test:project -- cli-core; bun run lint:core; bun run format:check; git diff --check."
events:
  -
    type: "status"
    at: "2026-04-21T16:34:49.280Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement experimental init v2 orchestrator now that prompt, conflict, and apply helpers exist."
  -
    type: "verify"
    at: "2026-04-21T16:53:31.163Z"
    author: "CODER"
    state: "ok"
    note: "Verified experimental init v2 orchestrator. Checks: bunx vitest run packages/agentplane/src/cli/run-cli.core.init.v2.test.ts --pool=forks --maxWorkers 4 --testTimeout 60000 passed (1 file, 3 tests); bun run typecheck passed; bun run test:project -- cli-core passed (60 files, 596 tests); bun run lint:core passed; bun run format:check passed; git diff --check passed."
  -
    type: "status"
    at: "2026-04-21T16:54:12.825Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: experimental init v2 orchestrator. Checks: v2 e2e test; bun run typecheck; bun run test:project -- cli-core; bun run lint:core; bun run format:check; git diff --check."
doc_version: 3
doc_updated_at: "2026-04-21T16:54:12.826Z"
doc_updated_by: "CODER"
description: "Add orchestrate-v2 flow behind AGENTPLANE_INIT_UI=v2 or --experimental-ui while legacy init remains the default path."
sections:
  Summary: |-
    Implement experimental init v2 orchestrator
    
    Add orchestrate-v2 flow behind AGENTPLANE_INIT_UI=v2 or --experimental-ui while legacy init remains the default path.
  Scope: |-
    - In scope: Add orchestrate-v2 flow behind AGENTPLANE_INIT_UI=v2 or --experimental-ui while legacy init remains the default path.
    - Out of scope: unrelated refactors not required for "Implement experimental init v2 orchestrator".
  Plan: "Scope: implement atom #6. Steps: 1. Add orchestrate-v2.ts using prompts-v2, ui-v2, step modules, preview, conflict resolver, and apply spinners. 2. Gate entry by env AGENTPLANE_INIT_UI=v2 and/or --experimental-ui. 3. Reuse existing mutation functions and config writers. 4. Add e2e coverage for the experimental path. Acceptance: legacy init tests still pass; v2 e2e proves preview/confirm/apply path."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.init.v2.test.ts --pool=forks --maxWorkers 4 --testTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run test:project -- cli-core`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T16:53:31.163Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified experimental init v2 orchestrator. Checks: bunx vitest run packages/agentplane/src/cli/run-cli.core.init.v2.test.ts --pool=forks --maxWorkers 4 --testTimeout 60000 passed (1 file, 3 tests); bun run typecheck passed; bun run test:project -- cli-core passed (60 files, 596 tests); bun run lint:core passed; bun run format:check passed; git diff --check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:34:49.288Z, excerpt_hash=sha256:11fa93fe90bb07cabd42b1c1a9cc51f236cb8861c71cf666e707b75b26b382a6
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Implement experimental init v2 orchestrator

Add orchestrate-v2 flow behind AGENTPLANE_INIT_UI=v2 or --experimental-ui while legacy init remains the default path.

## Scope

- In scope: Add orchestrate-v2 flow behind AGENTPLANE_INIT_UI=v2 or --experimental-ui while legacy init remains the default path.
- Out of scope: unrelated refactors not required for "Implement experimental init v2 orchestrator".

## Plan

Scope: implement atom #6. Steps: 1. Add orchestrate-v2.ts using prompts-v2, ui-v2, step modules, preview, conflict resolver, and apply spinners. 2. Gate entry by env AGENTPLANE_INIT_UI=v2 and/or --experimental-ui. 3. Reuse existing mutation functions and config writers. 4. Add e2e coverage for the experimental path. Acceptance: legacy init tests still pass; v2 e2e proves preview/confirm/apply path.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.init.v2.test.ts --pool=forks --maxWorkers 4 --testTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run test:project -- cli-core`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T16:53:31.163Z — VERIFY — ok

By: CODER

Note: Verified experimental init v2 orchestrator. Checks: bunx vitest run packages/agentplane/src/cli/run-cli.core.init.v2.test.ts --pool=forks --maxWorkers 4 --testTimeout 60000 passed (1 file, 3 tests); bun run typecheck passed; bun run test:project -- cli-core passed (60 files, 596 tests); bun run lint:core passed; bun run format:check passed; git diff --check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:34:49.288Z, excerpt_hash=sha256:11fa93fe90bb07cabd42b1c1a9cc51f236cb8861c71cf666e707b75b26b382a6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
