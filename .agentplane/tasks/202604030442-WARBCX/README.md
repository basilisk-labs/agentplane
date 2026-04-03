---
id: "202604030442-WARBCX"
title: "Release framework patch 0.3.10"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604030442-T1WX56"
tags:
  - "release"
  - "code"
verify:
  - "bun run release:prepublish"
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T14:53:33.936Z"
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
    body: "Start: freeze patch release 0.3.10, prepare release notes, run release prepublish, and apply the release from the clean base checkout after the framework roadmap and incidents follow-up landed."
events:
  -
    type: "status"
    at: "2026-04-03T14:53:34.172Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: freeze patch release 0.3.10, prepare release notes, run release prepublish, and apply the release from the clean base checkout after the framework roadmap and incidents follow-up landed."
doc_version: 3
doc_updated_at: "2026-04-03T14:53:34.180Z"
doc_updated_by: "CODER"
description: "Prepare notes, run prepublish checks, bump versions, and publish the next patch release after the framework roadmap lands."
sections:
  Summary: |-
    Release framework patch 0.3.10
    
    Prepare notes, run prepublish checks, bump versions, and publish the next patch release after the framework roadmap lands.
  Scope: |-
    - In scope: Prepare notes, run prepublish checks, bump versions, and publish the next patch release after the framework roadmap lands.
    - Out of scope: unrelated refactors not required for "Release framework patch 0.3.10".
  Plan: "Release plan: version=0.3.10, tag=v0.3.10, scope=framework control-plane roadmap foundation, incidents registry automation, synced policy/templates, and release notes for the completed framework work."
  Verify Steps: |-
    1. Run `bun run release:prepublish`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Release framework patch 0.3.10

Prepare notes, run prepublish checks, bump versions, and publish the next patch release after the framework roadmap lands.

## Scope

- In scope: Prepare notes, run prepublish checks, bump versions, and publish the next patch release after the framework roadmap lands.
- Out of scope: unrelated refactors not required for "Release framework patch 0.3.10".

## Plan

Release plan: version=0.3.10, tag=v0.3.10, scope=framework control-plane roadmap foundation, incidents registry automation, synced policy/templates, and release notes for the completed framework work.

## Verify Steps

1. Run `bun run release:prepublish`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
