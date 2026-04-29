---
id: "202604292023-GHNS95"
title: "Add prompt fragment parser contracts"
result_summary: "Merged via PR #587."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202604292023-TV3J9J"
tags:
  - "code"
  - "prompt-assembly"
verify:
  - "agentplane doctor"
  - "bun run framework:dev:bootstrap"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/runtime/prompt-fragments/*.test.ts"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-29T20:24:50.990Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-29T20:43:07.497Z"
  updated_by: "CODER"
  note: "Prompt fragment parser/renderer contracts are implemented; final declared checks passed with one expected pre-closure doctor warning for the active branch_pr task."
commit:
  hash: "f5451fec77c0dde62c3a546ccec73e686778cf7e"
  message: "Merge pull request #587 from basilisk-labs/task/202604292023-GHNS95/prompt-fragment-parser"
comments:
  -
    author: "CODER"
    body: "Start: implement source-level prompt fragment parser and renderer contracts for markdown markers and structured agent profile list items."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #587 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-29T20:34:42.359Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement source-level prompt fragment parser and renderer contracts for markdown markers and structured agent profile list items."
  -
    type: "verify"
    at: "2026-04-29T20:39:41.993Z"
    author: "CODER"
    state: "ok"
    note: "Prompt fragment parser/renderer contracts are implemented and declared verification passed."
  -
    type: "verify"
    at: "2026-04-29T20:43:07.497Z"
    author: "CODER"
    state: "ok"
    note: "Prompt fragment parser/renderer contracts are implemented; final declared checks passed with one expected pre-closure doctor warning for the active branch_pr task."
  -
    type: "status"
    at: "2026-04-29T20:47:46.955Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #587 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-29T20:47:46.961Z"
doc_updated_by: "INTEGRATOR"
description: "Introduce source-level prompt fragment contracts and parser/renderer utilities for markdown markers and structured agent-profile list items without migrating bundled prompt assets yet."
sections:
  Summary: |-
    Add prompt fragment parser contracts
    
    Introduce source-level prompt fragment contracts and parser/renderer utilities for markdown markers and structured agent-profile list items without migrating bundled prompt assets yet.
  Scope: |-
    - In scope: Introduce source-level prompt fragment contracts and parser/renderer utilities for markdown markers and structured agent-profile list items without migrating bundled prompt assets yet.
    - Out of scope: unrelated refactors not required for "Add prompt fragment parser contracts".
  Plan: |-
    1. Add prompt-fragment domain types and parser/renderer utilities for markdown and structured agent profile list values.
    2. Support backward-compatible plain string list items while exposing stable fragment ids where present.
    3. Add focused unit tests for marker parsing, duplicate ids, rendering without markers, and JSON fragment normalization.
    4. Run focused tests, typecheck, bootstrap, doctor, and diff hygiene.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/runtime/prompt-fragments/*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-29T20:39:41.993Z — VERIFY — ok
    
    By: CODER
    
    Note: Prompt fragment parser/renderer contracts are implemented and declared verification passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T20:39:37.703Z, excerpt_hash=sha256:3e95a29c6515b5418f020d47aef708c880aee4797ca64d879ff7f09e86af5d68
    
    ### 2026-04-29T20:43:07.497Z — VERIFY — ok
    
    By: CODER
    
    Note: Prompt fragment parser/renderer contracts are implemented; final declared checks passed with one expected pre-closure doctor warning for the active branch_pr task.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T20:43:02.206Z, excerpt_hash=sha256:3e95a29c6515b5418f020d47aef708c880aee4797ca64d879ff7f09e86af5d68
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    No code residual findings.
    
    Workflow note:
    - `agentplane doctor` reports one warning while this branch_pr task is verified but not yet integrated/closed: `202604292023-GHNS95` appears shipped/open. This is expected between task verification and hosted closure and must clear after PR integration/finish.
    
    Verification evidence:
    - Command: bun test packages/agentplane/src/runtime/prompt-fragments/*.test.ts
      Result: pass
      Evidence: 6 tests passed across markdown and JSON fragment parser suites.
      Scope: markdown marker parsing/rendering, invalid marker rejection, fallback whole-file fragments, JSON list normalization, and duplicate id rejection.
    - Command: bun run typecheck
      Result: pass
      Evidence: tsc -b completed with exit 0.
      Scope: repository TypeScript project references including new prompt-fragments runtime files.
    - Command: git diff --check
      Result: pass
      Evidence: no whitespace errors after normalizing task README trailing spaces.
      Scope: final diff hygiene.
    - Command: bun run framework:dev:bootstrap
      Result: pass
      Evidence: core and agentplane builds completed, repo-local runtime verified.
      Scope: framework development runtime after adding prompt-fragments code.
    - Command: agentplane doctor
      Result: pass
      Evidence: doctor OK; errors=0, warnings=1 for the active verified branch_pr task pending integration/closure, plus info-only runtime/archive notes.
      Scope: repository workflow/runtime diagnostics.
    - Command: bun prettier --check packages/agentplane/src/runtime/prompt-fragments && bun eslint packages/agentplane/src/runtime/prompt-fragments --max-warnings=0
      Result: pass
      Evidence: Prettier reported all files formatted; ESLint exited 0.
      Scope: focused style/lint coverage for new prompt-fragments files.
id_source: "generated"
---
## Summary

Add prompt fragment parser contracts

Introduce source-level prompt fragment contracts and parser/renderer utilities for markdown markers and structured agent-profile list items without migrating bundled prompt assets yet.

## Scope

- In scope: Introduce source-level prompt fragment contracts and parser/renderer utilities for markdown markers and structured agent-profile list items without migrating bundled prompt assets yet.
- Out of scope: unrelated refactors not required for "Add prompt fragment parser contracts".

## Plan

1. Add prompt-fragment domain types and parser/renderer utilities for markdown and structured agent profile list values.
2. Support backward-compatible plain string list items while exposing stable fragment ids where present.
3. Add focused unit tests for marker parsing, duplicate ids, rendering without markers, and JSON fragment normalization.
4. Run focused tests, typecheck, bootstrap, doctor, and diff hygiene.

## Verify Steps

1. Run `bun test packages/agentplane/src/runtime/prompt-fragments/*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-29T20:39:41.993Z — VERIFY — ok

By: CODER

Note: Prompt fragment parser/renderer contracts are implemented and declared verification passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T20:39:37.703Z, excerpt_hash=sha256:3e95a29c6515b5418f020d47aef708c880aee4797ca64d879ff7f09e86af5d68

### 2026-04-29T20:43:07.497Z — VERIFY — ok

By: CODER

Note: Prompt fragment parser/renderer contracts are implemented; final declared checks passed with one expected pre-closure doctor warning for the active branch_pr task.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T20:43:02.206Z, excerpt_hash=sha256:3e95a29c6515b5418f020d47aef708c880aee4797ca64d879ff7f09e86af5d68

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

No code residual findings.

Workflow note:
- `agentplane doctor` reports one warning while this branch_pr task is verified but not yet integrated/closed: `202604292023-GHNS95` appears shipped/open. This is expected between task verification and hosted closure and must clear after PR integration/finish.

Verification evidence:
- Command: bun test packages/agentplane/src/runtime/prompt-fragments/*.test.ts
  Result: pass
  Evidence: 6 tests passed across markdown and JSON fragment parser suites.
  Scope: markdown marker parsing/rendering, invalid marker rejection, fallback whole-file fragments, JSON list normalization, and duplicate id rejection.
- Command: bun run typecheck
  Result: pass
  Evidence: tsc -b completed with exit 0.
  Scope: repository TypeScript project references including new prompt-fragments runtime files.
- Command: git diff --check
  Result: pass
  Evidence: no whitespace errors after normalizing task README trailing spaces.
  Scope: final diff hygiene.
- Command: bun run framework:dev:bootstrap
  Result: pass
  Evidence: core and agentplane builds completed, repo-local runtime verified.
  Scope: framework development runtime after adding prompt-fragments code.
- Command: agentplane doctor
  Result: pass
  Evidence: doctor OK; errors=0, warnings=1 for the active verified branch_pr task pending integration/closure, plus info-only runtime/archive notes.
  Scope: repository workflow/runtime diagnostics.
- Command: bun prettier --check packages/agentplane/src/runtime/prompt-fragments && bun eslint packages/agentplane/src/runtime/prompt-fragments --max-warnings=0
  Result: pass
  Evidence: Prettier reported all files formatted; ESLint exited 0.
  Scope: focused style/lint coverage for new prompt-fragments files.
