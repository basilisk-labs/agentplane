---
id: "202605031908-N5J7HT"
title: "T12: Add ACR schema to llms surfaces"
status: "TODO"
priority: "med"
owner: "DOCS"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202605031908-6V1G82"
tags:
  - "discovery"
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T19:08:50.072Z"
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
doc_updated_at: "2026-05-03T19:08:49.589Z"
doc_updated_by: "PLANNER"
description: "Update llms.txt and llms-full.txt with Agent Change Record and schema URL."
sections:
  Summary: |-
    T12: Add ACR schema to llms surfaces

    Update llms.txt and llms-full.txt with Agent Change Record and schema URL.
  Scope: |-
    - In scope: Update llms.txt and llms-full.txt with Agent Change Record and schema URL.
    - Out of scope: unrelated refactors not required for "T12: Add ACR schema to llms surfaces".
  Plan: "Patch both static LLM discovery files using the canonical schema URL from T01, then verify grep evidence."
  Verify Steps: |-
    1. Review the requested outcome for "T12: Add ACR schema to llms surfaces". Expected: the visible result matches ## Summary and stays inside approved scope.
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

T12: Add ACR schema to llms surfaces

Update llms.txt and llms-full.txt with Agent Change Record and schema URL.

## Scope

- In scope: Update llms.txt and llms-full.txt with Agent Change Record and schema URL.
- Out of scope: unrelated refactors not required for "T12: Add ACR schema to llms surfaces".

## Plan

Patch both static LLM discovery files using the canonical schema URL from T01, then verify grep evidence.

## Verify Steps

1. Review the requested outcome for "T12: Add ACR schema to llms surfaces". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
