---
id: "202604261411-44NSJW"
title: "Remove obvious unused public exports"
result_summary: "Knip baseline reduced from total 527 to 523."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cleanup"
  - "knip"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-26T14:11:35.757Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-26T14:14:30.956Z"
  updated_by: "CODER"
  note: "Removed four obvious internal-only exports from Knip baseline."
commit:
  hash: "5e3d48ff68d2b6c8331b215b64b0baec26b7d682"
  message: "✅ 44NSJW meta: done"
comments:
  -
    author: "CODER"
    body: "Start: remove obvious internal-only exports from the Knip baseline."
  -
    author: "CODER"
    body: "Verified: four internal-only exports removed and Knip baseline lowered."
events:
  -
    type: "status"
    at: "2026-04-26T14:11:36.538Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove obvious internal-only exports from the Knip baseline."
  -
    type: "verify"
    at: "2026-04-26T14:14:30.956Z"
    author: "CODER"
    state: "ok"
    note: "Removed four obvious internal-only exports from Knip baseline."
  -
    type: "status"
    at: "2026-04-26T14:15:19.123Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: four internal-only exports removed and Knip baseline lowered."
doc_version: 3
doc_updated_at: "2026-04-26T14:15:19.125Z"
doc_updated_by: "CODER"
description: "Reduce Knip baseline by unexporting internal-only types/functions that are currently listed as unused public surface."
sections:
  Summary: |-
    Remove obvious unused public exports
    
    Reduce Knip baseline by unexporting internal-only types/functions that are currently listed as unused public surface.
  Scope: |-
    - In scope: Reduce Knip baseline by unexporting internal-only types/functions that are currently listed as unused public surface.
    - Out of scope: unrelated refactors not required for "Remove obvious unused public exports".
  Plan: |-
    1. Unexport internal-only symbols currently listed in the Knip baseline: PolicyTemplate, toTaskDocMutationComments, RedmineCacheDocContext, RedmineReportContext.
    2. Refresh the Knip JSON baseline to remove the resolved entries.
    3. Verify typecheck, lint, knip baseline, and focused affected tests.
  Verify Steps: |-
    1. Review the requested outcome for "Remove obvious unused public exports". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-26T14:14:30.956Z — VERIFY — ok
    
    By: CODER
    
    Note: Removed four obvious internal-only exports from Knip baseline.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T14:11:36.558Z, excerpt_hash=sha256:676123a5964c64ad2ea46c03d122684d270e205cd4bed8b98476009d6f320c74
    
    Details:
    
    Checks passed: bun run typecheck; bun run lint:core; node scripts/check-knip-baseline.mjs; bun run format:check; git diff --check; focused vitest redmine/agents/task-backend batch passed 55/55.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove obvious unused public exports

Reduce Knip baseline by unexporting internal-only types/functions that are currently listed as unused public surface.

## Scope

- In scope: Reduce Knip baseline by unexporting internal-only types/functions that are currently listed as unused public surface.
- Out of scope: unrelated refactors not required for "Remove obvious unused public exports".

## Plan

1. Unexport internal-only symbols currently listed in the Knip baseline: PolicyTemplate, toTaskDocMutationComments, RedmineCacheDocContext, RedmineReportContext.
2. Refresh the Knip JSON baseline to remove the resolved entries.
3. Verify typecheck, lint, knip baseline, and focused affected tests.

## Verify Steps

1. Review the requested outcome for "Remove obvious unused public exports". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-26T14:14:30.956Z — VERIFY — ok

By: CODER

Note: Removed four obvious internal-only exports from Knip baseline.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T14:11:36.558Z, excerpt_hash=sha256:676123a5964c64ad2ea46c03d122684d270e205cd4bed8b98476009d6f320c74

Details:

Checks passed: bun run typecheck; bun run lint:core; node scripts/check-knip-baseline.mjs; bun run format:check; git diff --check; focused vitest redmine/agents/task-backend batch passed 55/55.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
