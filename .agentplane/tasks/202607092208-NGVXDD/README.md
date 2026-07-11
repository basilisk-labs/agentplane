---
id: "202607092208-NGVXDD"
title: "Reduce the Knip baseline for v0.6.22"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "patch-0.6.22"
  - "quality"
  - "refactor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run knip:check"
  - "bun run knip:report"
  - "bun run test:fast"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-09T22:09:57.378Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: classify and remove safe Knip findings, then lower the accepted baseline without broader ignores."
events:
  -
    type: "status"
    at: "2026-07-11T12:02:25.721Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: classify and remove safe Knip findings, then lower the accepted baseline without broader ignores."
doc_version: 3
doc_updated_at: "2026-07-11T12:09:53.872Z"
doc_updated_by: "CODER"
description: "Classify current Knip findings into public API, intentional framework entry points, and removable dead code; delete or export correctly so the accepted baseline shrinks materially without hiding new debt."
sections:
  Summary: |-
    Reduce the Knip baseline for v0.6.22

    Classify current Knip findings into public API, intentional framework entry points, and removable dead code; delete or export correctly so the accepted baseline shrinks materially without hiding new debt.
  Scope: |-
    - In scope: Classify current Knip findings into public API, intentional framework entry points, and removable dead code; delete or export correctly so the accepted baseline shrinks materially without hiding new debt.
    - Out of scope: unrelated refactors not required for "Reduce the Knip baseline for v0.6.22".
  Plan: |-
    1. Snapshot Knip findings and classify each as public API, intentional dynamic entry point, or dead code.
    2. Remove dead code, correct exports for true public APIs, and document only unavoidable dynamic exceptions.
    3. Regenerate the baseline with a strictly lower accepted count and no broad ignore expansion.
    4. Run Knip, typecheck, fast tests, and contract checks.
  Verify Steps: |-
    1. Run `bun run knip:report`; every remaining finding has an explicit classification.
    2. Run `bun run knip:check`; the accepted baseline is lower than 574 entries and 158 files, with no new blanket ignore.
    3. Run `bun run typecheck`; it passes.
    4. Run `bun run test:fast` and `bun run ci:contract`; both pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "Reduced the accepted Knip baseline from 574 to 554 findings without changing knip.json or adding ignores: unused files 1 to 0 and unused exports 204 to 185, with unused types unchanged at 369. Removed the unreferenced critical CLI runner, deleted three unreachable helpers, and made sixteen internal helpers file-local. Remaining findings are deterministically classified in knip-classification.md as public contracts (312), dynamic entry points (168), or visible accepted debt (74). Verification passed: Knip 554/554, typecheck, lint, focused 8 files / 36 tests, ci:contract, and full 364 files / 2157 tests. One initial full-test attempt exposed an unstaged-deletion/index mismatch in git-index-lock-guard; after staging the intentional deletion, the complete suite passed."
id_source: "generated"
---
## Summary

Reduce the Knip baseline for v0.6.22

Classify current Knip findings into public API, intentional framework entry points, and removable dead code; delete or export correctly so the accepted baseline shrinks materially without hiding new debt.

## Scope

- In scope: Classify current Knip findings into public API, intentional framework entry points, and removable dead code; delete or export correctly so the accepted baseline shrinks materially without hiding new debt.
- Out of scope: unrelated refactors not required for "Reduce the Knip baseline for v0.6.22".

## Plan

1. Snapshot Knip findings and classify each as public API, intentional dynamic entry point, or dead code.
2. Remove dead code, correct exports for true public APIs, and document only unavoidable dynamic exceptions.
3. Regenerate the baseline with a strictly lower accepted count and no broad ignore expansion.
4. Run Knip, typecheck, fast tests, and contract checks.

## Verify Steps

1. Run `bun run knip:report`; every remaining finding has an explicit classification.
2. Run `bun run knip:check`; the accepted baseline is lower than 574 entries and 158 files, with no new blanket ignore.
3. Run `bun run typecheck`; it passes.
4. Run `bun run test:fast` and `bun run ci:contract`; both pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Reduced the accepted Knip baseline from 574 to 554 findings without changing knip.json or adding ignores: unused files 1 to 0 and unused exports 204 to 185, with unused types unchanged at 369. Removed the unreferenced critical CLI runner, deleted three unreachable helpers, and made sixteen internal helpers file-local. Remaining findings are deterministically classified in knip-classification.md as public contracts (312), dynamic entry points (168), or visible accepted debt (74). Verification passed: Knip 554/554, typecheck, lint, focused 8 files / 36 tests, ci:contract, and full 364 files / 2157 tests. One initial full-test attempt exposed an unstaged-deletion/index mismatch in git-index-lock-guard; after staging the intentional deletion, the complete suite passed.
