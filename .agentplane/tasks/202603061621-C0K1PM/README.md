---
id: "202603061621-C0K1PM"
title: "Fix release apply test branch assumption in CI"
result_summary: "Repaired the release apply CI regression by removing the hardcoded refs/heads/main assumption from the new push regression test."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T16:22:09.894Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved targeted CI regression fix for the branch-name assumption in the release apply test."
verification:
  state: "ok"
  updated_at: "2026-03-06T16:26:05.481Z"
  updated_by: "CODER"
  note: |-
    Command: bunx vitest run packages/agentplane/src/commands/release/apply.test.ts
    Result: pass
    Evidence: 6/6 tests passed; the release push regression now resolves the remote branch ref from the temp repository’s actual current branch instead of assuming refs/heads/main.
    Scope: release apply regression coverage.
    
    Command: bun run test:fast
    Result: pass
    Evidence: 108/108 test files and 647/647 tests passed locally, matching the failing GitHub Core CI contour.
    Scope: Core CI fast unit-test job.
    
    Command: gh run view 22770723767 --log-failed
    Result: pass
    Evidence: the previous GitHub failure was isolated to packages/agentplane/src/commands/release/apply.test.ts with fatal: ambiguous argument refs/heads/main, confirming the branch-name assumption as the root cause.
    Scope: CI root-cause confirmation.
commit:
  hash: "2ebb5a7b2dfb3634b57661a2a1151b2909b0d08c"
  message: "🧪 release: make push regression test branch-agnostic"
comments:
  -
    author: "CODER"
    body: "Start: repair the release/apply regression test so it uses branch-agnostic remote-ref assertions in temp repos and no longer flakes or fails on GitHub Actions runners."
  -
    author: "CODER"
    body: "Verified: the release/apply regression test is now branch-agnostic, local test:fast is green, and the failing GitHub Core CI root cause was eliminated."
events:
  -
    type: "status"
    at: "2026-03-06T16:22:19.240Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repair the release/apply regression test so it uses branch-agnostic remote-ref assertions in temp repos and no longer flakes or fails on GitHub Actions runners."
  -
    type: "verify"
    at: "2026-03-06T16:26:05.481Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx vitest run packages/agentplane/src/commands/release/apply.test.ts
      Result: pass
      Evidence: 6/6 tests passed; the release push regression now resolves the remote branch ref from the temp repository’s actual current branch instead of assuming refs/heads/main.
      Scope: release apply regression coverage.
      
      Command: bun run test:fast
      Result: pass
      Evidence: 108/108 test files and 647/647 tests passed locally, matching the failing GitHub Core CI contour.
      Scope: Core CI fast unit-test job.
      
      Command: gh run view 22770723767 --log-failed
      Result: pass
      Evidence: the previous GitHub failure was isolated to packages/agentplane/src/commands/release/apply.test.ts with fatal: ambiguous argument refs/heads/main, confirming the branch-name assumption as the root cause.
      Scope: CI root-cause confirmation.
  -
    type: "status"
    at: "2026-03-06T16:26:16.878Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the release/apply regression test is now branch-agnostic, local test:fast is green, and the failing GitHub Core CI root cause was eliminated."
doc_version: 3
doc_updated_at: "2026-03-06T16:26:16.878Z"
doc_updated_by: "CODER"
description: "Repair the new release/apply regression test so it does not assume refs/heads/main exists in temporary repositories on GitHub Actions runners."
id_source: "generated"
---
## Summary

Fix release apply test branch assumption in CI

Repair the new release/apply regression test so it does not assume refs/heads/main exists in temporary repositories on GitHub Actions runners.

## Scope

- In scope: Repair the new release/apply regression test so it does not assume refs/heads/main exists in temporary repositories on GitHub Actions runners..
- Out of scope: unrelated refactors not required for "Fix release apply test branch assumption in CI".

## Plan

1. Inspect packages/agentplane/src/commands/release/apply.test.ts and identify the exact branch-name assumption that fails on GitHub Actions runners.
2. Replace refs/heads/main assertions with branch-agnostic checks derived from the current local HEAD/reference state of the temp repository.
3. Re-run targeted release/apply tests and release-adjacent fast checks locally.
4. Record verification evidence, close the task against the implementation commit, push main, and confirm Docs CI/Core CI are green for the new SHA.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- Add explicit checks/commands for this task before approval.

### Evidence / Commands
- Record executed commands and key outputs.

### Pass criteria
- Steps are reproducible and produce expected results.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T16:26:05.481Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/release/apply.test.ts
Result: pass
Evidence: 6/6 tests passed; the release push regression now resolves the remote branch ref from the temp repository’s actual current branch instead of assuming refs/heads/main.
Scope: release apply regression coverage.

Command: bun run test:fast
Result: pass
Evidence: 108/108 test files and 647/647 tests passed locally, matching the failing GitHub Core CI contour.
Scope: Core CI fast unit-test job.

Command: gh run view 22770723767 --log-failed
Result: pass
Evidence: the previous GitHub failure was isolated to packages/agentplane/src/commands/release/apply.test.ts with fatal: ambiguous argument refs/heads/main, confirming the branch-name assumption as the root cause.
Scope: CI root-cause confirmation.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T16:22:19.240Z, excerpt_hash=sha256:682d5674a3bb4d925efca0f9cabc057c814315f01dc448e2879b94eecb1a7911

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings


## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
