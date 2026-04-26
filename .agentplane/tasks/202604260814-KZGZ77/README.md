---
id: "202604260814-KZGZ77"
title: "Split runner type contracts"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-26T08:14:46.737Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-26T08:17:57.782Z"
  updated_by: "CODER"
  note: "Split runner type contracts into focused modules while preserving runner/types.js facade."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Split runner type contracts into focused modules while preserving the runner/types.js import surface for existing call sites."
events:
  -
    type: "status"
    at: "2026-04-26T08:14:53.763Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Split runner type contracts into focused modules while preserving the runner/types.js import surface for existing call sites."
  -
    type: "verify"
    at: "2026-04-26T08:17:57.782Z"
    author: "CODER"
    state: "ok"
    note: "Split runner type contracts into focused modules while preserving runner/types.js facade."
doc_version: 3
doc_updated_at: "2026-04-26T08:17:57.789Z"
doc_updated_by: "CODER"
description: "Split the large runner/types.ts contract barrel into focused runner type modules while preserving the existing runner/types.js import surface."
sections:
  Summary: |-
    Split runner type contracts
    
    Split the large runner/types.ts contract barrel into focused runner type modules while preserving the existing runner/types.js import surface.
  Scope: |-
    - In scope: Split the large runner/types.ts contract barrel into focused runner type modules while preserving the existing runner/types.js import surface.
    - Out of scope: unrelated refactors not required for "Split runner type contracts".
  Plan: |-
    1. Keep packages/agentplane/src/runner/types.ts as compatibility re-export surface.
    2. Move runner target/context/bundle contracts into focused modules under packages/agentplane/src/runner/types/.
    3. Move capability/policy contracts, invocation/result contracts, trace/supervision/state contracts into focused modules.
    4. Avoid changing downstream imports in this atom unless required for type correctness.
    5. Verify with typecheck, focused runner tests, knip:check, format:check, git diff --check, framework bootstrap, and doctor.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-26T08:17:57.782Z — VERIFY — ok
    
    By: CODER
    
    Note: Split runner type contracts into focused modules while preserving runner/types.js facade.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T08:14:53.770Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Scope: runner type contract split.
    Command: bun run test:project -- agentplane packages/agentplane/src/runner/trace.test.ts packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/runner/codex-smoke.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts; Result: pass; Evidence: 5 files, 31 tests passed. Scope: runner artifacts, trace, adapters, smoke state.
    Command: bun run knip:check; Result: pass; Evidence: Knip unused-code baseline OK files=5/5 exports=231/231 types=291/291 total=527/527. Scope: unused exports/types after facade split.
    Command: bun run format:check; Result: pass; Evidence: All matched files use Prettier code style. Scope: repository formatting.
    Command: git diff --check; Result: pass; Evidence: no whitespace errors. Scope: changed diff.
    Command: bun run framework:dev:bootstrap; Result: pass; Evidence: Framework dev runtime is ready. Scope: repo-local runtime after source edits.
    Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors and 0 warnings. Scope: workflow/runtime health.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Split runner type contracts

Split the large runner/types.ts contract barrel into focused runner type modules while preserving the existing runner/types.js import surface.

## Scope

- In scope: Split the large runner/types.ts contract barrel into focused runner type modules while preserving the existing runner/types.js import surface.
- Out of scope: unrelated refactors not required for "Split runner type contracts".

## Plan

1. Keep packages/agentplane/src/runner/types.ts as compatibility re-export surface.
2. Move runner target/context/bundle contracts into focused modules under packages/agentplane/src/runner/types/.
3. Move capability/policy contracts, invocation/result contracts, trace/supervision/state contracts into focused modules.
4. Avoid changing downstream imports in this atom unless required for type correctness.
5. Verify with typecheck, focused runner tests, knip:check, format:check, git diff --check, framework bootstrap, and doctor.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-26T08:17:57.782Z — VERIFY — ok

By: CODER

Note: Split runner type contracts into focused modules while preserving runner/types.js facade.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T08:14:53.770Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Scope: runner type contract split.
Command: bun run test:project -- agentplane packages/agentplane/src/runner/trace.test.ts packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/runner/codex-smoke.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts; Result: pass; Evidence: 5 files, 31 tests passed. Scope: runner artifacts, trace, adapters, smoke state.
Command: bun run knip:check; Result: pass; Evidence: Knip unused-code baseline OK files=5/5 exports=231/231 types=291/291 total=527/527. Scope: unused exports/types after facade split.
Command: bun run format:check; Result: pass; Evidence: All matched files use Prettier code style. Scope: repository formatting.
Command: git diff --check; Result: pass; Evidence: no whitespace errors. Scope: changed diff.
Command: bun run framework:dev:bootstrap; Result: pass; Evidence: Framework dev runtime is ready. Scope: repo-local runtime after source edits.
Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors and 0 warnings. Scope: workflow/runtime health.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
