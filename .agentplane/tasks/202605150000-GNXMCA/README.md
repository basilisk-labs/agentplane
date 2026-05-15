---
id: "202605150000-GNXMCA"
title: "Fix v0.6.1 publish payload drift"
result_summary: "Merged via PR #3778."
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
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-15T00:00:23.444Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-15T00:17:30.434Z"
  updated_by: "DEUS"
  note: "Hosted publish confirmed for v0.6.1."
commit:
  hash: "03acb7398ddfef745f284a32090ede8e45df99be"
  message: "Merge pull request #3778 from basilisk-labs/task/202605150000-GNXMCA/fix-v061-publish-payload"
comments:
  -
    author: "CODER"
    body: "Start: Fixing the v0.6.1 publish validation drift in the release payload fixture, then rerunning exact release checks before opening the branch PR."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3778 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-15T00:00:33.722Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fixing the v0.6.1 publish validation drift in the release payload fixture, then rerunning exact release checks before opening the branch PR."
  -
    type: "verify"
    at: "2026-05-15T00:02:00.386Z"
    author: "CODER"
    state: "ok"
    note: "Release checks passed after updating ACR example payload to 0.6.1."
  -
    type: "status"
    at: "2026-05-15T00:08:31.422Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3778 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-15T00:17:30.434Z"
doc_updated_by: "DEUS"
description: "Update the release payload fixtures so the v0.6.1 publish workflow passes exact-ref validation, then resume publication verification."
sections:
  Summary: |-
    Fix v0.6.1 publish payload drift
    
    Update the release payload fixtures so the v0.6.1 publish workflow passes exact-ref validation, then resume publication verification.
  Scope: |-
    - In scope: Update the release payload fixtures so the v0.6.1 publish workflow passes exact-ref validation, then resume publication verification.
    - Out of scope: unrelated refactors not required for "Fix v0.6.1 publish payload drift".
  Plan: "Plan: fix v0.6.1 exact-ref publish validation by updating only stale release payload fixture versions first; run node scripts/checks/check-acr-example-version.mjs, bun run release:check, and targeted release metadata checks; open a small branch_pr PR; after merge, dispatch Publish release with the canonical release SHA and verify external distribution surfaces."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    - State: ok
    - Note: Hosted publish confirmed for v0.6.1.
    - Details:
      - release_sha: 03acb7398ddfef745f284a32090ede8e45df99be
      - version: 0.6.1
      - tag: v0.6.1
      - @agentplaneorg/core: published_in_run
      - @agentplaneorg/recipes: published_in_run
      - agentplane: published_in_run
      - npm_smoke: pass
      - github_release: created
      - release_url: https://github.com/basilisk-labs/agentplane/releases/tag/v0.6.1
      - publish_run: https://github.com/basilisk-labs/agentplane/actions/runs/25893033118
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix v0.6.1 publish payload drift

Update the release payload fixtures so the v0.6.1 publish workflow passes exact-ref validation, then resume publication verification.

## Scope

- In scope: Update the release payload fixtures so the v0.6.1 publish workflow passes exact-ref validation, then resume publication verification.
- Out of scope: unrelated refactors not required for "Fix v0.6.1 publish payload drift".

## Plan

Plan: fix v0.6.1 exact-ref publish validation by updating only stale release payload fixture versions first; run node scripts/checks/check-acr-example-version.mjs, bun run release:check, and targeted release metadata checks; open a small branch_pr PR; after merge, dispatch Publish release with the canonical release SHA and verify external distribution surfaces.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
- State: ok
- Note: Hosted publish confirmed for v0.6.1.
- Details:
  - release_sha: 03acb7398ddfef745f284a32090ede8e45df99be
  - version: 0.6.1
  - tag: v0.6.1
  - @agentplaneorg/core: published_in_run
  - @agentplaneorg/recipes: published_in_run
  - agentplane: published_in_run
  - npm_smoke: pass
  - github_release: created
  - release_url: https://github.com/basilisk-labs/agentplane/releases/tag/v0.6.1
  - publish_run: https://github.com/basilisk-labs/agentplane/actions/runs/25893033118
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings