---
id: "202604231718-6W4SX2"
title: "Harden local-ci cold-start step ordering"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T17:18:42.694Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: land the local-ci cold-start ordering fix and matching regression updates, then re-run the full fast route and critical CLI E2E under the pre-push toolchain."
events:
  -
    type: "status"
    at: "2026-04-23T17:18:43.891Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: land the local-ci cold-start ordering fix and matching regression updates, then re-run the full fast route and critical CLI E2E under the pre-push toolchain."
doc_version: 3
doc_updated_at: "2026-04-23T17:18:43.914Z"
doc_updated_by: "CODER"
description: "Move the CLI cold-start baseline check ahead of the heavy build step in local fast CI, align the cold-baseline script summaries with the new wording, and relax the retry regression fixture so the full fast suite stays deterministic under load."
sections:
  Summary: |-
    Harden local-ci cold-start step ordering
    
    Move the CLI cold-start baseline check ahead of the heavy build step in local fast CI, align the cold-baseline script summaries with the new wording, and relax the retry regression fixture so the full fast suite stays deterministic under load.
  Scope: |-
    - In scope: Move the CLI cold-start baseline check ahead of the heavy build step in local fast CI, align the cold-baseline script summaries with the new wording, and relax the retry regression fixture so the full fast suite stays deterministic under load.
    - Out of scope: unrelated refactors not required for "Harden local-ci cold-start step ordering".
  Plan: "Reorder local fast CI so bench:cli:cold:check runs before the build-heavy steps, keep the warmed retry-capable baseline script, update the script test expectations to the new summary wording, and re-verify the full fast CI route plus critical CLI E2E under the same NVM+Bun toolchain used by pre-push."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Harden local-ci cold-start step ordering

Move the CLI cold-start baseline check ahead of the heavy build step in local fast CI, align the cold-baseline script summaries with the new wording, and relax the retry regression fixture so the full fast suite stays deterministic under load.

## Scope

- In scope: Move the CLI cold-start baseline check ahead of the heavy build step in local fast CI, align the cold-baseline script summaries with the new wording, and relax the retry regression fixture so the full fast suite stays deterministic under load.
- Out of scope: unrelated refactors not required for "Harden local-ci cold-start step ordering".

## Plan

Reorder local fast CI so bench:cli:cold:check runs before the build-heavy steps, keep the warmed retry-capable baseline script, update the script test expectations to the new summary wording, and re-verify the full fast CI route plus critical CLI E2E under the same NVM+Bun toolchain used by pre-push.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
