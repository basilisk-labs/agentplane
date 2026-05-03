---
id: "202605031909-Y2C3XK"
title: "T39: Regenerate CLI reference with acr commands"
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605031908-6V1G82"
  - "202605031908-TFYQJ0"
  - "202605031908-Z2FSSG"
tags:
  - "cli"
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T19:10:00.351Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "02579b80b963154c24d2a3fbd1e36b697bde978e"
  message: "🚧 E70TF7 task: Launch public-surface ACR task graph [202605031908-E70TF7]"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: implemented through merged PR #853; release finalization closes the leaf backlog against merge commit 02579b80 after hosted checks passed."
events:
  -
    type: "status"
    at: "2026-05-03T21:03:54.927Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: implemented through merged PR #853; release finalization closes the leaf backlog against merge commit 02579b80 after hosted checks passed."
doc_version: 3
doc_updated_at: "2026-05-03T21:03:54.927Z"
doc_updated_by: "INTEGRATOR"
description: "Ensure docs/user/cli-reference.generated.mdx includes acr generate, validate, check, explain, and schema."
sections:
  Summary: |-
    T39: Regenerate CLI reference with acr commands

    Ensure docs/user/cli-reference.generated.mdx includes acr generate, validate, check, explain, and schema.
  Scope: |-
    - In scope: Ensure docs/user/cli-reference.generated.mdx includes acr generate, validate, check, explain, and schema.
    - Out of scope: unrelated refactors not required for "T39: Regenerate CLI reference with acr commands".
  Plan: "Run or fix CLI reference generation so acr commands appear, then verify freshness check."
  Verify Steps: |-
    1. Review the requested outcome for "T39: Regenerate CLI reference with acr commands". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
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

T39: Regenerate CLI reference with acr commands

Ensure docs/user/cli-reference.generated.mdx includes acr generate, validate, check, explain, and schema.

## Scope

- In scope: Ensure docs/user/cli-reference.generated.mdx includes acr generate, validate, check, explain, and schema.
- Out of scope: unrelated refactors not required for "T39: Regenerate CLI reference with acr commands".

## Plan

Run or fix CLI reference generation so acr commands appear, then verify freshness check.

## Verify Steps

1. Review the requested outcome for "T39: Regenerate CLI reference with acr commands". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
