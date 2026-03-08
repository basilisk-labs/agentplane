---
id: "202603081315-Y4D6AE"
title: "Add repository-expected CLI version diagnostics"
status: "TODO"
priority: "med"
owner: "CODER"
depends_on:
  - "202603081315-H2E5Q5"
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
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
doc_updated_at: "2026-03-08T13:15:49.101Z"
doc_updated_by: "CODER"
description: "Store the expected agentplane CLI version in repo configuration and detect when the active global CLI is older, with a safe recovery path that does not silently mutate global installs."
id_source: "generated"
---
## Summary

Add repository-expected CLI version diagnostics

Store the expected agentplane CLI version in repo configuration and detect when the active global CLI is older, with a safe recovery path that does not silently mutate global installs.

## Scope

- In scope: Store the expected agentplane CLI version in repo configuration and detect when the active global CLI is older, with a safe recovery path that does not silently mutate global installs..
- Out of scope: unrelated refactors not required for "Add repository-expected CLI version diagnostics".

## Plan

1. Implement the change for "Add repository-expected CLI version diagnostics".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. Review the changed artifact or behavior. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
