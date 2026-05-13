---
id: "202605131725-VPZZ5B"
title: "Remove telemetry hosted runtime copy"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T17:26:23.169Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T17:34:38.559Z"
  updated_by: "DOCS"
  note: "Removed public no hosted runtime/no telemetry/hosted dashboard copy from README, package README, docs, website content, static LLM text, and header SVG. Verified phrase search has no matches across README/package README/docs/website; format check, routing check, and doctor passed."
  attempts: 0
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: remove public no hosted runtime/no telemetry copy phrases from README, package README, docs, and website content. Verification will include phrase search, format check, routing check, and doctor."
events:
  -
    type: "status"
    at: "2026-05-13T17:28:04.250Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: remove public no hosted runtime/no telemetry copy phrases from README, package README, docs, and website content. Verification will include phrase search, format check, routing check, and doctor."
  -
    type: "verify"
    at: "2026-05-13T17:34:38.559Z"
    author: "DOCS"
    state: "ok"
    note: "Removed public no hosted runtime/no telemetry/hosted dashboard copy from README, package README, docs, website content, static LLM text, and header SVG. Verified phrase search has no matches across README/package README/docs/website; format check, routing check, and doctor passed."
doc_version: 3
doc_updated_at: "2026-05-13T17:34:38.581Z"
doc_updated_by: "DOCS"
description: "Remove public copy claims about no hosted runtime and no telemetry from README, package README, docs, and website content so messaging no longer depends on those trust slogans."
sections:
  Summary: |-
    Remove telemetry hosted runtime copy
    
    Remove public copy claims about no hosted runtime and no telemetry from README, package README, docs, and website content so messaging no longer depends on those trust slogans.
  Scope: |-
    - In scope: Remove public copy claims about no hosted runtime and no telemetry from README, package README, docs, and website content so messaging no longer depends on those trust slogans.
    - Out of scope: unrelated refactors not required for "Remove telemetry hosted runtime copy".
  Plan: "Scope: remove public-facing copy phrases that assert no hosted runtime, no telemetry, or hidden telemetry contrast from README, package README, docs, website content, and static LLM text. Keep behavior unchanged and do not edit task registry files manually. Verification: rg for removed phrases across README/docs/website/package README, format check, routing check, and agentplane doctor."
  Verify Steps: |-
    1. Review the requested outcome for "Remove telemetry hosted runtime copy". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T17:34:38.559Z — VERIFY — ok
    
    By: DOCS
    
    Note: Removed public no hosted runtime/no telemetry/hosted dashboard copy from README, package README, docs, website content, static LLM text, and header SVG. Verified phrase search has no matches across README/package README/docs/website; format check, routing check, and doctor passed.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T17:28:04.250Z, excerpt_hash=sha256:a15005b879dc51bd96b751e805e597bc53c238ee1e5694d81db052c2fa7583ab
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131725-VPZZ5B-remove-telemetry-runtime-copy/.agentplane/tasks/202605131725-VPZZ5B/blueprint/resolved-snapshot.json
    - old_digest: 7d6dbf9d1b883c5815396c3bd5e35d3e57ed7c02148dcfa69efb257365fe8867
    - current_digest: 7d6dbf9d1b883c5815396c3bd5e35d3e57ed7c02148dcfa69efb257365fe8867
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131725-VPZZ5B
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove telemetry hosted runtime copy

Remove public copy claims about no hosted runtime and no telemetry from README, package README, docs, and website content so messaging no longer depends on those trust slogans.

## Scope

- In scope: Remove public copy claims about no hosted runtime and no telemetry from README, package README, docs, and website content so messaging no longer depends on those trust slogans.
- Out of scope: unrelated refactors not required for "Remove telemetry hosted runtime copy".

## Plan

Scope: remove public-facing copy phrases that assert no hosted runtime, no telemetry, or hidden telemetry contrast from README, package README, docs, website content, and static LLM text. Keep behavior unchanged and do not edit task registry files manually. Verification: rg for removed phrases across README/docs/website/package README, format check, routing check, and agentplane doctor.

## Verify Steps

1. Review the requested outcome for "Remove telemetry hosted runtime copy". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T17:34:38.559Z — VERIFY — ok

By: DOCS

Note: Removed public no hosted runtime/no telemetry/hosted dashboard copy from README, package README, docs, website content, static LLM text, and header SVG. Verified phrase search has no matches across README/package README/docs/website; format check, routing check, and doctor passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T17:28:04.250Z, excerpt_hash=sha256:a15005b879dc51bd96b751e805e597bc53c238ee1e5694d81db052c2fa7583ab

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131725-VPZZ5B-remove-telemetry-runtime-copy/.agentplane/tasks/202605131725-VPZZ5B/blueprint/resolved-snapshot.json
- old_digest: 7d6dbf9d1b883c5815396c3bd5e35d3e57ed7c02148dcfa69efb257365fe8867
- current_digest: 7d6dbf9d1b883c5815396c3bd5e35d3e57ed7c02148dcfa69efb257365fe8867
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131725-VPZZ5B

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
