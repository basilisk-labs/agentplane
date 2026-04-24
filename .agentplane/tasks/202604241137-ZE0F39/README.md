---
id: "202604241137-ZE0F39"
title: "v0.3 freeze E2: move CLI ansi helper into shared layer"
result_summary: "E2 complete: the ansi helper and test now live in src/shared, cli/shared is removed from the checkout, and local CI routing references the new shared test path."
status: "DONE"
priority: "normal"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604241137-6FJ1M8"
tags:
  - "architecture"
  - "code"
  - "v0.3"
verify:
  - "bun run test -- packages/agentplane/src"
  - "bun run typecheck"
  - "find packages/agentplane/src -type d -name shared | wc -l"
plan_approval:
  state: "approved"
  updated_at: "2026-04-24T13:35:12.087Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-24T13:48:02.976Z"
  updated_by: "CODER"
  note: "Verified E2: shared directory count is 5; typecheck passed; bun run test -- packages/agentplane/src passed with 219 files and 1240 tests passed, 2 skipped after routing metadata update; focused routing/local-ci/ansi tests passed; format:check, git diff --check, knip:check, arch:deps, framework bootstrap, and doctor all pass."
commit:
  hash: "dab231c5c7682b4712d919afe265caea62d95fcc"
  message: "♻️ ZE0F39 task: move ansi helper to shared"
comments:
  -
    author: "CODER"
    body: "Start: Moving the CLI ansi helper into the documented shared layer, updating imports and tests, then verifying directory count, tests, typecheck, formatting, dependency checks, bootstrap, and doctor."
  -
    author: "CODER"
    body: "Verified: shared directory count is 5; typecheck passed; bun run test -- packages/agentplane/src passed with 219 files and 1240 tests passed, 2 skipped; focused routing/local-ci/ansi tests passed; format:check, git diff --check, knip:check, arch:deps, framework bootstrap, and doctor all pass."
events:
  -
    type: "status"
    at: "2026-04-24T13:35:19.032Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Moving the CLI ansi helper into the documented shared layer, updating imports and tests, then verifying directory count, tests, typecheck, formatting, dependency checks, bootstrap, and doctor."
  -
    type: "verify"
    at: "2026-04-24T13:48:02.976Z"
    author: "CODER"
    state: "ok"
    note: "Verified E2: shared directory count is 5; typecheck passed; bun run test -- packages/agentplane/src passed with 219 files and 1240 tests passed, 2 skipped after routing metadata update; focused routing/local-ci/ansi tests passed; format:check, git diff --check, knip:check, arch:deps, framework bootstrap, and doctor all pass."
  -
    type: "status"
    at: "2026-04-24T13:48:33.610Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: shared directory count is 5; typecheck passed; bun run test -- packages/agentplane/src passed with 219 files and 1240 tests passed, 2 skipped; focused routing/local-ci/ansi tests passed; format:check, git diff --check, knip:check, arch:deps, framework bootstrap, and doctor all pass."
doc_version: 3
doc_updated_at: "2026-04-24T13:48:33.612Z"
doc_updated_by: "CODER"
description: "Move the lone cli/shared ansi helper into the documented shared layer and update imports/tests so shared directory count drops."
sections:
  Summary: |-
    v0.3 freeze E2: move CLI ansi helper into shared layer
    
    Move the lone cli/shared ansi helper into the documented shared layer and update imports/tests so shared directory count drops.
  Scope: |-
    - In scope: Move the lone cli/shared ansi helper into the documented shared layer and update imports/tests so shared directory count drops.
    - Out of scope: unrelated refactors not required for "v0.3 freeze E2: move CLI ansi helper into shared layer".
  Plan: |-
    1. Move packages/agentplane/src/cli/shared/ansi.ts into packages/agentplane/src/shared/ansi.ts and remove the now-empty cli/shared layer.
    2. Update all imports and any tests to use the shared helper location without changing runtime formatting behavior.
    3. Verify the shared-directory count, focused/full relevant tests, typecheck, formatting, dependency checks, bootstrap, and doctor before committing.
  Verify Steps: |-
    1. Run `find packages/agentplane/src -type d -name shared | wc -l`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run test -- packages/agentplane/src`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-24T13:48:02.976Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified E2: shared directory count is 5; typecheck passed; bun run test -- packages/agentplane/src passed with 219 files and 1240 tests passed, 2 skipped after routing metadata update; focused routing/local-ci/ansi tests passed; format:check, git diff --check, knip:check, arch:deps, framework bootstrap, and doctor all pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T13:35:19.070Z, excerpt_hash=sha256:dfebebd016d4b0e270d899b87f65f9cc1668dda7343183d687fb7429443f4e54
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

v0.3 freeze E2: move CLI ansi helper into shared layer

Move the lone cli/shared ansi helper into the documented shared layer and update imports/tests so shared directory count drops.

## Scope

- In scope: Move the lone cli/shared ansi helper into the documented shared layer and update imports/tests so shared directory count drops.
- Out of scope: unrelated refactors not required for "v0.3 freeze E2: move CLI ansi helper into shared layer".

## Plan

1. Move packages/agentplane/src/cli/shared/ansi.ts into packages/agentplane/src/shared/ansi.ts and remove the now-empty cli/shared layer.
2. Update all imports and any tests to use the shared helper location without changing runtime formatting behavior.
3. Verify the shared-directory count, focused/full relevant tests, typecheck, formatting, dependency checks, bootstrap, and doctor before committing.

## Verify Steps

1. Run `find packages/agentplane/src -type d -name shared | wc -l`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run test -- packages/agentplane/src`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-24T13:48:02.976Z — VERIFY — ok

By: CODER

Note: Verified E2: shared directory count is 5; typecheck passed; bun run test -- packages/agentplane/src passed with 219 files and 1240 tests passed, 2 skipped after routing metadata update; focused routing/local-ci/ansi tests passed; format:check, git diff --check, knip:check, arch:deps, framework bootstrap, and doctor all pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T13:35:19.070Z, excerpt_hash=sha256:dfebebd016d4b0e270d899b87f65f9cc1668dda7343183d687fb7429443f4e54

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
