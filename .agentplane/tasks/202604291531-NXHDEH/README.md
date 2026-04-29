---
id: "202604291531-NXHDEH"
title: "Adopt runner prompt module bridge"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "prompt-assembly"
  - "recipes"
  - "runner"
verify:
  - "agentplane doctor"
  - "bun run framework:dev:bootstrap"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-29T15:31:25.650Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-29T17:29:36.357Z"
  updated_by: "CODER"
  note: "Rebased task branch onto origin/main and reran verification successfully."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Land the compatible runner prompt module bridge as the first migration atom, preserving existing runner prompt bundle behavior while making module graph provenance testable."
events:
  -
    type: "status"
    at: "2026-04-29T15:34:26.930Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Land the compatible runner prompt module bridge as the first migration atom, preserving existing runner prompt bundle behavior while making module graph provenance testable."
  -
    type: "verify"
    at: "2026-04-29T15:36:54.042Z"
    author: "CODER"
    state: "ok"
    note: "Runner prompt module bridge adopted and verification passed on task branch."
  -
    type: "verify"
    at: "2026-04-29T15:38:46.223Z"
    author: "CODER"
    state: "ok"
    note: "Post-commit verification reconciled for current HEAD after adding migration task graph docs."
  -
    type: "verify"
    at: "2026-04-29T17:29:36.357Z"
    author: "CODER"
    state: "ok"
    note: "Rebased task branch onto origin/main and reran verification successfully."
doc_version: 3
doc_updated_at: "2026-04-29T17:29:36.372Z"
doc_updated_by: "CODER"
description: "Land the current runner prompt module bridge as the first migration step, preserving RunnerPromptBlock output while introducing stable PromptModule addresses and provenance for runner, gateway, project skill, overlay, and recipe prompt blocks."
sections:
  Summary: |-
    Adopt runner prompt module bridge
    
    Land the current runner prompt module bridge as the first migration step, preserving RunnerPromptBlock output while introducing stable PromptModule addresses and provenance for runner, gateway, project skill, overlay, and recipe prompt blocks.
  Scope: |-
    - In scope: land the compatible runner prompt module bridge from the existing `task/202604291511-R17PSN/modular-runner-prompts` branch or equivalent implementation.
    - In scope: preserve current `RunnerPromptBlock[]` bundle shape, ordering, sources, resolution traces, overlay metadata, and cached framework prompt identity.
    - In scope: expose bridge helpers for graph roundtrip tests.
    - Out of scope: init-time `AGENTS.md`/policy emission, recipe mutation application, public CLI diagnostics.
  Plan: |-
    1. Reuse or reapply the already verified runner prompt bridge implementation from `task/202604291511-R17PSN/modular-runner-prompts`.
    2. Keep `collectRunnerBasePrompts` output backward-compatible by compiling blocks through a PromptModule graph and back.
    3. Add/keep focused tests for graph roundtrip, gateway/recipe provenance, overlay command filtering, and existing prompt-module contracts.
    4. Run focused tests, typecheck, diff whitespace check, framework bootstrap, and doctor.
    5. Record verification evidence and sync local PR artifacts.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-29T15:36:54.042Z — VERIFY — ok
    
    By: CODER
    
    Note: Runner prompt module bridge adopted and verification passed on task branch.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T15:34:26.930Z, excerpt_hash=sha256:eb1baf64db02a6af56559a033b2ba75db5dba953acad99f9a13d4022bc835a7d
    
    Details:
    
    Commands passed: focused runner/prompt-module tests (13 pass, 0 fail), bun run typecheck, git diff --check plus cached diff check, touched-file Prettier, touched-file eslint, bun run framework:dev:bootstrap, and agentplane doctor. Doctor returned OK with info-only historical archive notes.
    
    ### 2026-04-29T15:38:46.223Z — VERIFY — ok
    
    By: CODER
    
    Note: Post-commit verification reconciled for current HEAD after adding migration task graph docs.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T15:37:12.921Z, excerpt_hash=sha256:eb1baf64db02a6af56559a033b2ba75db5dba953acad99f9a13d4022bc835a7d
    
    Details:
    
    Current task branch contains the runner prompt module bridge plus the documented downstream migration task graph. Previously executed checks passed in this worktree; this verification updates branch_pr metadata after the graph-docs commit.
    
    ### 2026-04-29T17:29:36.357Z — VERIFY — ok
    
    By: CODER
    
    Note: Rebased task branch onto origin/main and reran verification successfully.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T15:38:46.288Z, excerpt_hash=sha256:eb1baf64db02a6af56559a033b2ba75db5dba953acad99f9a13d4022bc835a7d
    
    Details:
    
    Commands: bun test packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts; bun run typecheck; git diff --check; bun run framework:dev:bootstrap; agentplane doctor. Results: 13 tests pass; typecheck pass; diff check pass; bootstrap pass; doctor OK with info-only historical archive notes. The initial doctor attempt was invalid because it ran while bootstrap was rebuilding dist and was rerun after bootstrap completed.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the bridge implementation commit(s) and task artifact commit(s).
    - Re-run focused prompt tests and `agentplane doctor` to confirm runner prompt assembly returned to the previous direct-block path.
  Findings: |-
    - Verification evidence:
      - Command: `bun test packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts`
        Result: pass
        Evidence: 13 pass, 0 fail.
        Scope: runner prompt assembly bridge and existing prompt module contracts.
      - Command: `bun run typecheck`
        Result: pass
        Evidence: `tsc -b` exited 0.
        Scope: TypeScript project references.
      - Command: `git diff --check && git diff --cached --check`
        Result: pass
        Evidence: no whitespace errors.
        Scope: unstaged and staged task diff.
      - Command: `bun prettier --check ...` and `bun eslint ...` on touched runner context files
        Result: pass
        Evidence: formatting and lint checks exited 0.
        Scope: changed runner context files.
      - Command: `bun run framework:dev:bootstrap`
        Result: pass
        Evidence: built core, agentplane, and testkit; repo-local runtime 0.3.29 matches expected 0.3.29.
        Scope: framework dev runtime.
      - Command: `agentplane doctor`
        Result: pass
        Evidence: errors=0 warnings=0; OK with info-only historical archive notes.
        Scope: repo-local runtime and workflow diagnostics.
    - Outcome: `collectRunnerBasePrompts` now passes through PromptModule graph conversion while preserving `RunnerPromptBlock[]` shape, ordering, source metadata, resolution traces, overlay metadata, and cached framework prompt identity.
    - Task graph note: this commit also carries the newly documented downstream migration task READMEs so the sequential graph is available after this first task lands.
    - External noise: `agentplane task lint` over the full historical archive still reports legacy `doc_updated_at` issues in old tasks; this predates the migration graph and is not caused by the new task READMEs.
id_source: "generated"
---
## Summary

Adopt runner prompt module bridge

Land the current runner prompt module bridge as the first migration step, preserving RunnerPromptBlock output while introducing stable PromptModule addresses and provenance for runner, gateway, project skill, overlay, and recipe prompt blocks.

## Scope

- In scope: land the compatible runner prompt module bridge from the existing `task/202604291511-R17PSN/modular-runner-prompts` branch or equivalent implementation.
- In scope: preserve current `RunnerPromptBlock[]` bundle shape, ordering, sources, resolution traces, overlay metadata, and cached framework prompt identity.
- In scope: expose bridge helpers for graph roundtrip tests.
- Out of scope: init-time `AGENTS.md`/policy emission, recipe mutation application, public CLI diagnostics.

## Plan

1. Reuse or reapply the already verified runner prompt bridge implementation from `task/202604291511-R17PSN/modular-runner-prompts`.
2. Keep `collectRunnerBasePrompts` output backward-compatible by compiling blocks through a PromptModule graph and back.
3. Add/keep focused tests for graph roundtrip, gateway/recipe provenance, overlay command filtering, and existing prompt-module contracts.
4. Run focused tests, typecheck, diff whitespace check, framework bootstrap, and doctor.
5. Record verification evidence and sync local PR artifacts.

## Verify Steps

1. Run `bun test packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-29T15:36:54.042Z — VERIFY — ok

By: CODER

Note: Runner prompt module bridge adopted and verification passed on task branch.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T15:34:26.930Z, excerpt_hash=sha256:eb1baf64db02a6af56559a033b2ba75db5dba953acad99f9a13d4022bc835a7d

Details:

Commands passed: focused runner/prompt-module tests (13 pass, 0 fail), bun run typecheck, git diff --check plus cached diff check, touched-file Prettier, touched-file eslint, bun run framework:dev:bootstrap, and agentplane doctor. Doctor returned OK with info-only historical archive notes.

### 2026-04-29T15:38:46.223Z — VERIFY — ok

By: CODER

Note: Post-commit verification reconciled for current HEAD after adding migration task graph docs.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T15:37:12.921Z, excerpt_hash=sha256:eb1baf64db02a6af56559a033b2ba75db5dba953acad99f9a13d4022bc835a7d

Details:

Current task branch contains the runner prompt module bridge plus the documented downstream migration task graph. Previously executed checks passed in this worktree; this verification updates branch_pr metadata after the graph-docs commit.

### 2026-04-29T17:29:36.357Z — VERIFY — ok

By: CODER

Note: Rebased task branch onto origin/main and reran verification successfully.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T15:38:46.288Z, excerpt_hash=sha256:eb1baf64db02a6af56559a033b2ba75db5dba953acad99f9a13d4022bc835a7d

Details:

Commands: bun test packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts; bun run typecheck; git diff --check; bun run framework:dev:bootstrap; agentplane doctor. Results: 13 tests pass; typecheck pass; diff check pass; bootstrap pass; doctor OK with info-only historical archive notes. The initial doctor attempt was invalid because it ran while bootstrap was rebuilding dist and was rerun after bootstrap completed.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the bridge implementation commit(s) and task artifact commit(s).
- Re-run focused prompt tests and `agentplane doctor` to confirm runner prompt assembly returned to the previous direct-block path.

## Findings

- Verification evidence:
  - Command: `bun test packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts`
    Result: pass
    Evidence: 13 pass, 0 fail.
    Scope: runner prompt assembly bridge and existing prompt module contracts.
  - Command: `bun run typecheck`
    Result: pass
    Evidence: `tsc -b` exited 0.
    Scope: TypeScript project references.
  - Command: `git diff --check && git diff --cached --check`
    Result: pass
    Evidence: no whitespace errors.
    Scope: unstaged and staged task diff.
  - Command: `bun prettier --check ...` and `bun eslint ...` on touched runner context files
    Result: pass
    Evidence: formatting and lint checks exited 0.
    Scope: changed runner context files.
  - Command: `bun run framework:dev:bootstrap`
    Result: pass
    Evidence: built core, agentplane, and testkit; repo-local runtime 0.3.29 matches expected 0.3.29.
    Scope: framework dev runtime.
  - Command: `agentplane doctor`
    Result: pass
    Evidence: errors=0 warnings=0; OK with info-only historical archive notes.
    Scope: repo-local runtime and workflow diagnostics.
- Outcome: `collectRunnerBasePrompts` now passes through PromptModule graph conversion while preserving `RunnerPromptBlock[]` shape, ordering, source metadata, resolution traces, overlay metadata, and cached framework prompt identity.
- Task graph note: this commit also carries the newly documented downstream migration task READMEs so the sequential graph is available after this first task lands.
- External noise: `agentplane task lint` over the full historical archive still reports legacy `doc_updated_at` issues in old tasks; this predates the migration graph and is not caused by the new task READMEs.
