---
id: "202605030733-BHD4S4"
title: "Enforce English PR artifacts language"
result_summary: "Merged via PR #787."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T07:33:30.552Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T07:37:40.720Z"
  updated_by: "CODER"
  note: "Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/pr/internal/pr-artifact-snapshot.test.ts packages/core/src/config/config.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000; Result: pass; Evidence: 2 files, 22 tests passed. Command: node scripts/check-policy-routing.mjs && node scripts/check-recipes-inventory-fresh.mjs && git diff --check; Result: pass; Evidence: policy routing OK, recipes inventory up to date, no whitespace errors. Command: remote recipes raw fetch; Result: pass; Evidence: raw_recipes=1:code-map."
commit:
  hash: "c66cff3d6f160f310233b936ca3e16af44e71479"
  message: "Merge pull request #787 from basilisk-labs/task/202605030733-BHD4S4/artifacts-language-validation"
comments:
  -
    author: "CODER"
    body: "Start: porting the English PR artifact language validation from the stale cli-artifacts branch onto current main with current release state preserved."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #787 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-03T07:33:40.003Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: porting the English PR artifact language validation from the stale cli-artifacts branch onto current main with current release state preserved."
  -
    type: "verify"
    at: "2026-05-03T07:37:40.720Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/pr/internal/pr-artifact-snapshot.test.ts packages/core/src/config/config.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000; Result: pass; Evidence: 2 files, 22 tests passed. Command: node scripts/check-policy-routing.mjs && node scripts/check-recipes-inventory-fresh.mjs && git diff --check; Result: pass; Evidence: policy routing OK, recipes inventory up to date, no whitespace errors. Command: remote recipes raw fetch; Result: pass; Evidence: raw_recipes=1:code-map."
  -
    type: "status"
    at: "2026-05-03T07:54:55.575Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #787 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-03T07:54:55.580Z"
doc_updated_by: "INTEGRATOR"
description: "Port the artifacts_language configuration and PR artifact language validation from the stale cli-artifacts branch onto current main, preserving current v0.4.2 release state."
sections:
  Summary: |-
    Enforce English PR artifacts language
    
    Port the artifacts_language configuration and PR artifact language validation from the stale cli-artifacts branch onto current main, preserving current v0.4.2 release state.
  Scope: |-
    - In scope: Port the artifacts_language configuration and PR artifact language validation from the stale cli-artifacts branch onto current main, preserving current v0.4.2 release state.
    - Out of scope: unrelated refactors not required for "Enforce English PR artifacts language".
  Plan: "Plan: port only the useful artifacts_language=en configuration and PR artifact language validation from codex/cli-artifacts-language-validation onto current main; exclude stale release-format-only noise unless still required by conflicts; verify with targeted PR artifact tests, config schema checks, policy routing, recipes inventory, release candidate gate, hosted PR checks, and homepage/raw recipes spot check; merge via branch_pr; cleanup stale trust-recipes and cli-artifacts branches after merge."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T07:37:40.720Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/pr/internal/pr-artifact-snapshot.test.ts packages/core/src/config/config.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000; Result: pass; Evidence: 2 files, 22 tests passed. Command: node scripts/check-policy-routing.mjs && node scripts/check-recipes-inventory-fresh.mjs && git diff --check; Result: pass; Evidence: policy routing OK, recipes inventory up to date, no whitespace errors. Command: remote recipes raw fetch; Result: pass; Evidence: raw_recipes=1:code-map.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T07:33:40.003Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Ported artifacts_language=en and PR artifact language validation onto current main; stale trust branch was not merged because it would reintroduce old task states.
      Impact: PR artifacts for this repo now fail on Cyrillic text when artifacts_language is en; default schema remains any for other repos.
      Resolution: No rework required before PR.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Enforce English PR artifacts language

Port the artifacts_language configuration and PR artifact language validation from the stale cli-artifacts branch onto current main, preserving current v0.4.2 release state.

## Scope

- In scope: Port the artifacts_language configuration and PR artifact language validation from the stale cli-artifacts branch onto current main, preserving current v0.4.2 release state.
- Out of scope: unrelated refactors not required for "Enforce English PR artifacts language".

## Plan

Plan: port only the useful artifacts_language=en configuration and PR artifact language validation from codex/cli-artifacts-language-validation onto current main; exclude stale release-format-only noise unless still required by conflicts; verify with targeted PR artifact tests, config schema checks, policy routing, recipes inventory, release candidate gate, hosted PR checks, and homepage/raw recipes spot check; merge via branch_pr; cleanup stale trust-recipes and cli-artifacts branches after merge.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T07:37:40.720Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/pr/internal/pr-artifact-snapshot.test.ts packages/core/src/config/config.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000; Result: pass; Evidence: 2 files, 22 tests passed. Command: node scripts/check-policy-routing.mjs && node scripts/check-recipes-inventory-fresh.mjs && git diff --check; Result: pass; Evidence: policy routing OK, recipes inventory up to date, no whitespace errors. Command: remote recipes raw fetch; Result: pass; Evidence: raw_recipes=1:code-map.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T07:33:40.003Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Ported artifacts_language=en and PR artifact language validation onto current main; stale trust branch was not merged because it would reintroduce old task states.
  Impact: PR artifacts for this repo now fail on Cyrillic text when artifacts_language is en; default schema remains any for other repos.
  Resolution: No rework required before PR.
  Promotion: incident-candidate
  Fixability: external
