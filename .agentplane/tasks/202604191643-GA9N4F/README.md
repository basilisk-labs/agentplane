---
id: "202604191643-GA9N4F"
title: "Measure CLI cold path and store baseline"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "bench"
  - "code"
  - "tooling"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T16:03:28.092Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T16:09:55.023Z"
  updated_by: "CODER"
  note: "Recorded CLI cold-path baseline from bun run bench:cli:cold --runs 5 --warmups 1. Verification passed: benchmark command completed; bunx vitest run packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts --reporter dot; bun run format:check; bun run lint:core; bun run build."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Measuring and documenting the current CLI cold-path baseline."
events:
  -
    type: "status"
    at: "2026-04-20T16:03:29.832Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Measuring and documenting the current CLI cold-path baseline."
  -
    type: "verify"
    at: "2026-04-20T16:09:55.023Z"
    author: "CODER"
    state: "ok"
    note: "Recorded CLI cold-path baseline from bun run bench:cli:cold --runs 5 --warmups 1. Verification passed: benchmark command completed; bunx vitest run packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts --reporter dot; bun run format:check; bun run lint:core; bun run build."
doc_version: 3
doc_updated_at: "2026-04-20T16:09:55.061Z"
doc_updated_by: "CODER"
description: "Epic I′. Refresh the CLI cold-path baseline and record the current performance contract."
sections:
  Summary: |-
    Measure CLI cold path and store baseline
    
    Epic I′. Refresh the CLI cold-path baseline and record the current performance contract.
  Scope: |-
    - In scope: Epic I′. Refresh the CLI cold-path baseline and record the current performance contract.
    - Out of scope: unrelated refactors not required for "Measure CLI cold path and store baseline".
  Plan: "Record the current CLI cold-path baseline using the existing measure-cli-cold-path script. Run the benchmark against the repo-local built CLI, store the resulting numbers in a small documented baseline artifact under docs/developer or docs/performance, and add guidance for rerunning the measurement after bundle/subpath changes. Do not optimize in this atom unless the measurement script itself is broken. Verification: benchmark command completes, documented baseline matches captured output, format/lint/build stay green."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T16:09:55.023Z — VERIFY — ok
    
    By: CODER
    
    Note: Recorded CLI cold-path baseline from bun run bench:cli:cold --runs 5 --warmups 1. Verification passed: benchmark command completed; bunx vitest run packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts --reporter dot; bun run format:check; bun run lint:core; bun run build.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T16:03:29.861Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Measure CLI cold path and store baseline

Epic I′. Refresh the CLI cold-path baseline and record the current performance contract.

## Scope

- In scope: Epic I′. Refresh the CLI cold-path baseline and record the current performance contract.
- Out of scope: unrelated refactors not required for "Measure CLI cold path and store baseline".

## Plan

Record the current CLI cold-path baseline using the existing measure-cli-cold-path script. Run the benchmark against the repo-local built CLI, store the resulting numbers in a small documented baseline artifact under docs/developer or docs/performance, and add guidance for rerunning the measurement after bundle/subpath changes. Do not optimize in this atom unless the measurement script itself is broken. Verification: benchmark command completes, documented baseline matches captured output, format/lint/build stay green.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T16:09:55.023Z — VERIFY — ok

By: CODER

Note: Recorded CLI cold-path baseline from bun run bench:cli:cold --runs 5 --warmups 1. Verification passed: benchmark command completed; bunx vitest run packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts --reporter dot; bun run format:check; bun run lint:core; bun run build.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T16:03:29.861Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
