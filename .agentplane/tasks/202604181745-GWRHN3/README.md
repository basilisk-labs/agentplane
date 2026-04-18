---
id: "202604181745-GWRHN3"
title: "Fix lint blocker in release apply mutation regex"
result_summary: "Merged via PR #470."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-18T17:45:17.625Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "c13d3643dde0748a11915104b2f726e616afa245"
  message: "ci: unblock release apply lint regex (GWRHN3) (#470)"
comments:
  -
    author: "CODER"
    body: "Start: replace the escaped regex string in apply.mutation.ts with a String.raw-safe construction and rerun the targeted lint check."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #470 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-18T17:45:19.235Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace the escaped regex string in apply.mutation.ts with a String.raw-safe construction and rerun the targeted lint check."
  -
    type: "status"
    at: "2026-04-18T18:02:07.827Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #470 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-18T18:02:07.832Z"
doc_updated_by: "INTEGRATOR"
description: "Replace escaped regex string usage in packages/agentplane/src/commands/release/apply.mutation.ts with a String.raw-safe pattern so lint:core and pre-push pass again without changing behavior."
sections:
  Summary: |-
    Fix lint blocker in release apply mutation regex
    
    Replace escaped regex string usage in packages/agentplane/src/commands/release/apply.mutation.ts with a String.raw-safe pattern so lint:core and pre-push pass again without changing behavior.
  Scope: |-
    - In scope: Replace escaped regex string usage in packages/agentplane/src/commands/release/apply.mutation.ts with a String.raw-safe pattern so lint:core and pre-push pass again without changing behavior.
    - Out of scope: unrelated refactors not required for "Fix lint blocker in release apply mutation regex".
  Plan: "Plan: create a minimal one-line regex construction fix in apply.mutation.ts, verify lint on the touched file, then report the exact pre-push unblock status."
  Verify Steps: |-
    1. Review the requested outcome for "Fix lint blocker in release apply mutation regex". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Fix lint blocker in release apply mutation regex

Replace escaped regex string usage in packages/agentplane/src/commands/release/apply.mutation.ts with a String.raw-safe pattern so lint:core and pre-push pass again without changing behavior.

## Scope

- In scope: Replace escaped regex string usage in packages/agentplane/src/commands/release/apply.mutation.ts with a String.raw-safe pattern so lint:core and pre-push pass again without changing behavior.
- Out of scope: unrelated refactors not required for "Fix lint blocker in release apply mutation regex".

## Plan

Plan: create a minimal one-line regex construction fix in apply.mutation.ts, verify lint on the touched file, then report the exact pre-push unblock status.

## Verify Steps

1. Review the requested outcome for "Fix lint blocker in release apply mutation regex". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
