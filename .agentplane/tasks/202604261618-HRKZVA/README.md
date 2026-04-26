---
id: "202604261618-HRKZVA"
title: "Prune bootstrap guide exports"
result_summary: "Pruned bootstrap guide export surface and reduced Knip baseline total to 434."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "knip"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-26T16:19:02.979Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-26T16:22:19.380Z"
  updated_by: "CODER"
  note: "Command: bun run typecheck; Result: pass after bootstrap rerun; Evidence: tsc -b exited 0. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: node scripts/check-knip-baseline.mjs; Result: pass; Evidence: baseline OK total=434. Command: node scripts/check-agent-bootstrap-fresh.mjs; Result: pass after framework bootstrap; Evidence: bootstrap docs and startup command blocks aligned. Command: focused command-guide vitest; Result: pass; Evidence: 2 files, 13 tests passed. Command: bun run format:check and git diff --check; Result: pass. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime ready."
commit:
  hash: "ed51097d538f6bc9777a21c17ac5b260e09515b2"
  message: "🚧 HRKZVA task: prune bootstrap guide exports"
comments:
  -
    author: "CODER"
    body: "Start: Pruning unused bootstrap-guide exports while preserving generated bootstrap docs and command-guide runtime output, then refreshing Knip and validating docs freshness."
  -
    author: "CODER"
    body: "Verified: Unused bootstrap-guide exports were made module-local while dynamic docs freshness exports stayed public, Knip baseline total reduced from 440 to 434, and local docs/code checks passed."
events:
  -
    type: "status"
    at: "2026-04-26T16:19:10.952Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Pruning unused bootstrap-guide exports while preserving generated bootstrap docs and command-guide runtime output, then refreshing Knip and validating docs freshness."
  -
    type: "verify"
    at: "2026-04-26T16:22:19.380Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run typecheck; Result: pass after bootstrap rerun; Evidence: tsc -b exited 0. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: node scripts/check-knip-baseline.mjs; Result: pass; Evidence: baseline OK total=434. Command: node scripts/check-agent-bootstrap-fresh.mjs; Result: pass after framework bootstrap; Evidence: bootstrap docs and startup command blocks aligned. Command: focused command-guide vitest; Result: pass; Evidence: 2 files, 13 tests passed. Command: bun run format:check and git diff --check; Result: pass. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime ready."
  -
    type: "status"
    at: "2026-04-26T16:22:30.933Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Unused bootstrap-guide exports were made module-local while dynamic docs freshness exports stayed public, Knip baseline total reduced from 440 to 434, and local docs/code checks passed."
doc_version: 3
doc_updated_at: "2026-04-26T16:22:30.933Z"
doc_updated_by: "CODER"
description: "Make unused bootstrap-guide constants, helper functions, and types module-local while preserving the generated docs renderer and quickstart imports, then refresh the Knip baseline."
sections:
  Summary: |-
    Prune bootstrap guide exports
    
    Make unused bootstrap-guide constants, helper functions, and types module-local while preserving the generated docs renderer and quickstart imports, then refresh the Knip baseline.
  Scope: |-
    - In scope: Make unused bootstrap-guide constants, helper functions, and types module-local while preserving the generated docs renderer and quickstart imports, then refresh the Knip baseline.
    - Out of scope: unrelated refactors not required for "Prune bootstrap guide exports".
  Plan: |-
    Plan:
    1. Confirm bootstrap-guide.ts exports used by command-guide/scripts and identify unused export-only symbols.
    2. Convert unused constants/helpers/types to module-local declarations without changing rendered quickstart/bootstrap output.
    3. Refresh scripts/baselines/knip-baseline.json.
    4. Verify with typecheck, lint:core, knip baseline check, command-guide/bootstrap docs tests, docs freshness check, format:check, git diff --check, and framework bootstrap if needed.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-26T16:22:19.380Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run typecheck; Result: pass after bootstrap rerun; Evidence: tsc -b exited 0. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: node scripts/check-knip-baseline.mjs; Result: pass; Evidence: baseline OK total=434. Command: node scripts/check-agent-bootstrap-fresh.mjs; Result: pass after framework bootstrap; Evidence: bootstrap docs and startup command blocks aligned. Command: focused command-guide vitest; Result: pass; Evidence: 2 files, 13 tests passed. Command: bun run format:check and git diff --check; Result: pass. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime ready.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T16:19:10.957Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Prune bootstrap guide exports

Make unused bootstrap-guide constants, helper functions, and types module-local while preserving the generated docs renderer and quickstart imports, then refresh the Knip baseline.

## Scope

- In scope: Make unused bootstrap-guide constants, helper functions, and types module-local while preserving the generated docs renderer and quickstart imports, then refresh the Knip baseline.
- Out of scope: unrelated refactors not required for "Prune bootstrap guide exports".

## Plan

Plan:
1. Confirm bootstrap-guide.ts exports used by command-guide/scripts and identify unused export-only symbols.
2. Convert unused constants/helpers/types to module-local declarations without changing rendered quickstart/bootstrap output.
3. Refresh scripts/baselines/knip-baseline.json.
4. Verify with typecheck, lint:core, knip baseline check, command-guide/bootstrap docs tests, docs freshness check, format:check, git diff --check, and framework bootstrap if needed.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-26T16:22:19.380Z — VERIFY — ok

By: CODER

Note: Command: bun run typecheck; Result: pass after bootstrap rerun; Evidence: tsc -b exited 0. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: node scripts/check-knip-baseline.mjs; Result: pass; Evidence: baseline OK total=434. Command: node scripts/check-agent-bootstrap-fresh.mjs; Result: pass after framework bootstrap; Evidence: bootstrap docs and startup command blocks aligned. Command: focused command-guide vitest; Result: pass; Evidence: 2 files, 13 tests passed. Command: bun run format:check and git diff --check; Result: pass. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime ready.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T16:19:10.957Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
