---
id: "202604131752-6S8T1C"
title: "Delete hosted-close branch on auto-merge and tighten agent prompts"
result_summary: "Merged via PR #288."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
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
commit:
  hash: "f5f105e70623c173507150cead47e4e20d710898"
  message: "Delete hosted-close branch on auto-merge and tighten agent prompts (6S8T1C) (#288)"
comments:
  -
    author: "CODER"
    body: "Start: update Task Hosted Close so follow-up closure PR auto-merge deletes the task-close branch, then tighten agent JSON prompts around explicit assumptions, simplicity, surgical edits, and verification-first execution without widening repository policy."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #288 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-13T17:53:25.878Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: update Task Hosted Close so follow-up closure PR auto-merge deletes the task-close branch, then tighten agent JSON prompts around explicit assumptions, simplicity, surgical edits, and verification-first execution without widening repository policy."
  -
    type: "status"
    at: "2026-04-13T18:17:39.373Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #288 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-13T18:17:39.378Z"
doc_updated_by: "INTEGRATOR"
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
