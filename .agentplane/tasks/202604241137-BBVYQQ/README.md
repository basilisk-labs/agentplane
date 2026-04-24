---
id: "202604241137-BBVYQQ"
title: "v0.3 hygiene H4: ban test-helper suffix regression"
result_summary: "Added a hard ESLint guard for **/*.test-helpers.ts and removed stale suffix allowances from hotspot and local CI selection."
status: "DONE"
priority: "low"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604241136-NWWGZV"
tags:
  - "ci"
  - "testing"
  - "v0.3"
verify:
  - "bun run lint"
  - "rg -n '\\.test-helpers\\.ts' ."
plan_approval:
  state: "approved"
  updated_at: "2026-04-24T14:46:18.919Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-24T14:49:11.017Z"
  updated_by: "CODER"
  note: "Command: bun run lint. Result: pass. Evidence: lint:core and lint:website completed successfully. Scope: ESLint enforcement including the new **/*.test-helpers.ts guard. Command: bunx vitest run packages/agentplane/src/cli/hotspot-report-script.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000. Result: pass. Evidence: 2 files, 45 tests passed. Scope: removed stale suffix allowances. Command: git ls-files -- '*.test-helpers.ts'. Result: pass. Evidence: no tracked files matched. Negative check: temporary packages/agentplane/src/tmp.test-helpers.ts failed ESLint with the new no-restricted-syntax message, then was removed. Additional checks: Prettier check for changed files and git diff --check passed."
commit:
  hash: "756059b4446978de4cfd27b60c8d9ee6780f6afc"
  message: "🧹 BBVYQQ task: ban test helper suffix"
comments:
  -
    author: "CODER"
    body: "Start: Add enforcement against the obsolete .test-helpers.ts suffix and remove stale allowances that would let the suffix re-enter after the baseline reached zero."
  -
    author: "CODER"
    body: "Verified: full lint passes, focused hotspot/local-ci tests pass, tracked .test-helpers.ts inventory is empty, and a temporary suffix file fails ESLint on the new guard."
events:
  -
    type: "status"
    at: "2026-04-24T14:46:28.080Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add enforcement against the obsolete .test-helpers.ts suffix and remove stale allowances that would let the suffix re-enter after the baseline reached zero."
  -
    type: "verify"
    at: "2026-04-24T14:49:11.017Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run lint. Result: pass. Evidence: lint:core and lint:website completed successfully. Scope: ESLint enforcement including the new **/*.test-helpers.ts guard. Command: bunx vitest run packages/agentplane/src/cli/hotspot-report-script.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000. Result: pass. Evidence: 2 files, 45 tests passed. Scope: removed stale suffix allowances. Command: git ls-files -- '*.test-helpers.ts'. Result: pass. Evidence: no tracked files matched. Negative check: temporary packages/agentplane/src/tmp.test-helpers.ts failed ESLint with the new no-restricted-syntax message, then was removed. Additional checks: Prettier check for changed files and git diff --check passed."
  -
    type: "status"
    at: "2026-04-24T14:49:43.509Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: full lint passes, focused hotspot/local-ci tests pass, tracked .test-helpers.ts inventory is empty, and a temporary suffix file fails ESLint on the new guard."
doc_version: 3
doc_updated_at: "2026-04-24T14:49:43.510Z"
doc_updated_by: "CODER"
description: "Add or tighten enforcement so .test-helpers.ts files cannot re-enter after the baseline reaches zero."
sections:
  Summary: |-
    v0.3 hygiene H4: ban test-helper suffix regression
    
    Add or tighten enforcement so .test-helpers.ts files cannot re-enter after the baseline reaches zero.
  Scope: |-
    - In scope: Add or tighten enforcement so .test-helpers.ts files cannot re-enter after the baseline reaches zero.
    - Out of scope: unrelated refactors not required for "v0.3 hygiene H4: ban test-helper suffix regression".
  Plan: |-
    1. Confirm there are currently no tracked files ending in .test-helpers.ts.
    2. Add an ESLint filename guard that fails any future **/*.test-helpers.ts file with an explicit migration message.
    3. Remove stale .test-helpers.ts allowlist/exclusion patterns from hotspot and local CI selection so the old suffix is no longer treated as a supported shape.
    4. Update focused tests affected by the removed hotspot exclusion, run lint and suffix inventory checks, then finish with traceable evidence.
  Verify Steps: |-
    1. Review the requested outcome for "v0.3 hygiene H4: ban test-helper suffix regression". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-24T14:49:11.017Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run lint. Result: pass. Evidence: lint:core and lint:website completed successfully. Scope: ESLint enforcement including the new **/*.test-helpers.ts guard. Command: bunx vitest run packages/agentplane/src/cli/hotspot-report-script.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000. Result: pass. Evidence: 2 files, 45 tests passed. Scope: removed stale suffix allowances. Command: git ls-files -- '*.test-helpers.ts'. Result: pass. Evidence: no tracked files matched. Negative check: temporary packages/agentplane/src/tmp.test-helpers.ts failed ESLint with the new no-restricted-syntax message, then was removed. Additional checks: Prettier check for changed files and git diff --check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T14:46:28.095Z, excerpt_hash=sha256:96e2d6ac7200476a5fce9b929fca636511c73352d0c769e751cec425ada34abe
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

v0.3 hygiene H4: ban test-helper suffix regression

Add or tighten enforcement so .test-helpers.ts files cannot re-enter after the baseline reaches zero.

## Scope

- In scope: Add or tighten enforcement so .test-helpers.ts files cannot re-enter after the baseline reaches zero.
- Out of scope: unrelated refactors not required for "v0.3 hygiene H4: ban test-helper suffix regression".

## Plan

1. Confirm there are currently no tracked files ending in .test-helpers.ts.
2. Add an ESLint filename guard that fails any future **/*.test-helpers.ts file with an explicit migration message.
3. Remove stale .test-helpers.ts allowlist/exclusion patterns from hotspot and local CI selection so the old suffix is no longer treated as a supported shape.
4. Update focused tests affected by the removed hotspot exclusion, run lint and suffix inventory checks, then finish with traceable evidence.

## Verify Steps

1. Review the requested outcome for "v0.3 hygiene H4: ban test-helper suffix regression". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-24T14:49:11.017Z — VERIFY — ok

By: CODER

Note: Command: bun run lint. Result: pass. Evidence: lint:core and lint:website completed successfully. Scope: ESLint enforcement including the new **/*.test-helpers.ts guard. Command: bunx vitest run packages/agentplane/src/cli/hotspot-report-script.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000. Result: pass. Evidence: 2 files, 45 tests passed. Scope: removed stale suffix allowances. Command: git ls-files -- '*.test-helpers.ts'. Result: pass. Evidence: no tracked files matched. Negative check: temporary packages/agentplane/src/tmp.test-helpers.ts failed ESLint with the new no-restricted-syntax message, then was removed. Additional checks: Prettier check for changed files and git diff --check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T14:46:28.095Z, excerpt_hash=sha256:96e2d6ac7200476a5fce9b929fca636511c73352d0c769e751cec425ada34abe

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
