---
id: "202605031909-Y2C3XK"
title: "T39: Regenerate CLI reference with acr commands"
status: "TODO"
priority: "med"
owner: "DOCS"
revision: 3
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
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-03T19:09:59.818Z"
doc_updated_by: "PLANNER"
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
