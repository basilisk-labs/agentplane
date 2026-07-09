---
id: "202607092208-NGVXDD"
title: "Reduce the Knip baseline for v0.6.22"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
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
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-07-09T22:09:47.057Z"
doc_updated_by: "PLANNER"
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
  Findings: ""
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
