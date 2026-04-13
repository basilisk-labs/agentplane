---
id: "202604131752-6S8T1C"
title: "Delete hosted-close branch on auto-merge and tighten agent prompts"
status: "DOING"
priority: "high"
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
  updated_at: "2026-04-13T17:52:54.773Z"
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
    body: "Start: update Task Hosted Close so follow-up closure PR auto-merge deletes the task-close branch, then tighten agent JSON prompts around explicit assumptions, simplicity, surgical edits, and verification-first execution without widening repository policy."
events:
  -
    type: "status"
    at: "2026-04-13T17:53:25.878Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: update Task Hosted Close so follow-up closure PR auto-merge deletes the task-close branch, then tighten agent JSON prompts around explicit assumptions, simplicity, surgical edits, and verification-first execution without widening repository policy."
doc_version: 3
doc_updated_at: "2026-04-13T17:53:25.893Z"
doc_updated_by: "CODER"
description: "Make Task Hosted Close delete merged task-close branches automatically after follow-up closure PR auto-merge, then update agent prompt JSON profiles to encode the Karpathy-style constraints on assumptions, simplicity, surgical edits, and verification-first execution without weakening existing repository policy."
sections:
  Summary: |-
    Delete hosted-close branch on auto-merge and tighten agent prompts
    
    Make Task Hosted Close delete merged task-close branches automatically after follow-up closure PR auto-merge, then update agent prompt JSON profiles to encode the Karpathy-style constraints on assumptions, simplicity, surgical edits, and verification-first execution without weakening existing repository policy.
  Scope: |-
    - In scope: Make Task Hosted Close delete merged task-close branches automatically after follow-up closure PR auto-merge, then update agent prompt JSON profiles to encode the Karpathy-style constraints on assumptions, simplicity, surgical edits, and verification-first execution without weakening existing repository policy.
    - Out of scope: unrelated refactors not required for "Delete hosted-close branch on auto-merge and tighten agent prompts".
  Plan: |-
    1. Update Task Hosted Close so the auto-merged closure PR also deletes its task-close branch automatically.
    2. Update the relevant agent JSON prompts to encode explicit assumptions, simplicity-first implementation, surgical changes, and verification-driven execution while preserving current workflow constraints.
    3. Add or update tests to cover both the hosted-close branch deletion behavior and the prompt contract changes, then verify the branch_pr flow remains clean.
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

Delete hosted-close branch on auto-merge and tighten agent prompts

Make Task Hosted Close delete merged task-close branches automatically after follow-up closure PR auto-merge, then update agent prompt JSON profiles to encode the Karpathy-style constraints on assumptions, simplicity, surgical edits, and verification-first execution without weakening existing repository policy.

## Scope

- In scope: Make Task Hosted Close delete merged task-close branches automatically after follow-up closure PR auto-merge, then update agent prompt JSON profiles to encode the Karpathy-style constraints on assumptions, simplicity, surgical edits, and verification-first execution without weakening existing repository policy.
- Out of scope: unrelated refactors not required for "Delete hosted-close branch on auto-merge and tighten agent prompts".

## Plan

1. Update Task Hosted Close so the auto-merged closure PR also deletes its task-close branch automatically.
2. Update the relevant agent JSON prompts to encode explicit assumptions, simplicity-first implementation, surgical changes, and verification-driven execution while preserving current workflow constraints.
3. Add or update tests to cover both the hosted-close branch deletion behavior and the prompt contract changes, then verify the branch_pr flow remains clean.

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
