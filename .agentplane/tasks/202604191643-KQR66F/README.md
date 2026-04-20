---
id: "202604191643-KQR66F"
title: "Fail CI on hotspot threshold regressions"
result_summary: "Added hotspot threshold check mode and wired it into CI gates."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "ops"
  - "tooling"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T12:15:30.624Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T12:19:45.736Z"
  updated_by: "CODER"
  note: "Command: bun run hotspots:check; Result: pass; Evidence: max=600, oversized=0. Command: bunx vitest run packages/agentplane/src/cli/hotspot-report-script.test.ts; Result: pass; Evidence: 4 tests passed including check failure and allowlist pass. Command: bun run format:check; Result: pass; Evidence: all matched files use Prettier. Command: bun run workflows:lint; Result: pass; Evidence: workflow command contract OK. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0."
commit:
  hash: "52b349ab61761a74f4f7ebb95b5bfa476617e9bd"
  message: "🚦 KQR66F ci: enforce hotspot threshold"
comments:
  -
    author: "CODER"
    body: "Start: Add a deterministic hotspot threshold guard to existing reporting/CI surfaces, with focused tests for allowed and rejected oversized files."
  -
    author: "CODER"
    body: "Verified: hotspot threshold guard is enforced by script, local CI, GitHub CI, and prepublish checks; focused tests cover fail and allowlist behavior, and format, lint, typecheck, workflow lint all pass."
events:
  -
    type: "status"
    at: "2026-04-20T12:15:39.996Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add a deterministic hotspot threshold guard to existing reporting/CI surfaces, with focused tests for allowed and rejected oversized files."
  -
    type: "verify"
    at: "2026-04-20T12:19:45.736Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run hotspots:check; Result: pass; Evidence: max=600, oversized=0. Command: bunx vitest run packages/agentplane/src/cli/hotspot-report-script.test.ts; Result: pass; Evidence: 4 tests passed including check failure and allowlist pass. Command: bun run format:check; Result: pass; Evidence: all matched files use Prettier. Command: bun run workflows:lint; Result: pass; Evidence: workflow command contract OK. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0."
  -
    type: "status"
    at: "2026-04-20T12:20:00.378Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: hotspot threshold guard is enforced by script, local CI, GitHub CI, and prepublish checks; focused tests cover fail and allowlist behavior, and format, lint, typecheck, workflow lint all pass."
doc_version: 3
doc_updated_at: "2026-04-20T12:20:00.379Z"
doc_updated_by: "CODER"
description: "Epic H′ and J′. Add hotspot-report based CI enforcement for oversized files beyond the agreed threshold."
sections:
  Summary: |-
    Fail CI on hotspot threshold regressions
    
    Epic H′ and J′. Add hotspot-report based CI enforcement for oversized files beyond the agreed threshold.
  Scope: |-
    - In scope: Epic H′ and J′. Add hotspot-report based CI enforcement for oversized files beyond the agreed threshold.
    - Out of scope: unrelated refactors not required for "Fail CI on hotspot threshold regressions".
  Plan: "Add an enforced hotspot threshold check around the existing hotspot-report tooling. Define a deterministic threshold/allowlist contract so files over the configured LoC limit fail unless explicitly allowed, wire the check into the repository quality gate/CI surface, and cover pass/fail behavior with focused tests."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `ops` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `ops` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T12:19:45.736Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run hotspots:check; Result: pass; Evidence: max=600, oversized=0. Command: bunx vitest run packages/agentplane/src/cli/hotspot-report-script.test.ts; Result: pass; Evidence: 4 tests passed including check failure and allowlist pass. Command: bun run format:check; Result: pass; Evidence: all matched files use Prettier. Command: bun run workflows:lint; Result: pass; Evidence: workflow command contract OK. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T12:15:40.007Z, excerpt_hash=sha256:20d5a9c29f35550b72f1ab0b217d612e9a91ae66e2427a19316e5fc5cd9943b0
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fail CI on hotspot threshold regressions

Epic H′ and J′. Add hotspot-report based CI enforcement for oversized files beyond the agreed threshold.

## Scope

- In scope: Epic H′ and J′. Add hotspot-report based CI enforcement for oversized files beyond the agreed threshold.
- Out of scope: unrelated refactors not required for "Fail CI on hotspot threshold regressions".

## Plan

Add an enforced hotspot threshold check around the existing hotspot-report tooling. Define a deterministic threshold/allowlist contract so files over the configured LoC limit fail unless explicitly allowed, wire the check into the repository quality gate/CI surface, and cover pass/fail behavior with focused tests.

## Verify Steps

1. Review the changed artifact or behavior for the `ops` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `ops` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T12:19:45.736Z — VERIFY — ok

By: CODER

Note: Command: bun run hotspots:check; Result: pass; Evidence: max=600, oversized=0. Command: bunx vitest run packages/agentplane/src/cli/hotspot-report-script.test.ts; Result: pass; Evidence: 4 tests passed including check failure and allowlist pass. Command: bun run format:check; Result: pass; Evidence: all matched files use Prettier. Command: bun run workflows:lint; Result: pass; Evidence: workflow command contract OK. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T12:15:40.007Z, excerpt_hash=sha256:20d5a9c29f35550b72f1ab0b217d612e9a91ae66e2427a19316e5fc5cd9943b0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
