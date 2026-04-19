---
id: "202604191200-NT02DV"
title: "Isolate runtime-source tests from ambient AGENTPLANE env"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T12:33:53.067Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T12:36:01.834Z"
  updated_by: "CODER"
  note: "Isolated runtime-mode tests from inherited AGENTPLANE_* env by introducing a shared runtime test-env helper, wiring runtime-source/runtime.command/repo-local-handoff to it, and adding a regression that proves ambient handoff flags no longer change runtime-source outcomes."
commit: null
comments: []
events:
  -
    type: "verify"
    at: "2026-04-19T12:36:01.834Z"
    author: "CODER"
    state: "ok"
    note: "Isolated runtime-mode tests from inherited AGENTPLANE_* env by introducing a shared runtime test-env helper, wiring runtime-source/runtime.command/repo-local-handoff to it, and adding a regression that proves ambient handoff flags no longer change runtime-source outcomes."
doc_version: 3
doc_updated_at: "2026-04-19T12:36:01.839Z"
doc_updated_by: "CODER"
description: "Remove hidden dependencies on inherited AGENTPLANE_* environment variables in runtime-source and repo-local-handoff test paths so release verification cannot fail because the invoking shell is in a framework checkout."
sections:
  Summary: |-
    Isolate runtime-source tests from ambient AGENTPLANE env
    
    Remove hidden dependencies on inherited AGENTPLANE_* environment variables in runtime-source and repo-local-handoff test paths so release verification cannot fail because the invoking shell is in a framework checkout.
  Scope: |-
    - In scope: Remove hidden dependencies on inherited AGENTPLANE_* environment variables in runtime-source and repo-local-handoff test paths so release verification cannot fail because the invoking shell is in a framework checkout.
    - Out of scope: unrelated refactors not required for "Isolate runtime-source tests from ambient AGENTPLANE env".
  Plan: |-
    1. Implement the change for "Isolate runtime-source tests from ambient AGENTPLANE env".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the requested outcome for "Isolate runtime-source tests from ambient AGENTPLANE env". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T12:36:01.834Z — VERIFY — ok
    
    By: CODER
    
    Note: Isolated runtime-mode tests from inherited AGENTPLANE_* env by introducing a shared runtime test-env helper, wiring runtime-source/runtime.command/repo-local-handoff to it, and adding a regression that proves ambient handoff flags no longer change runtime-source outcomes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T12:00:28.586Z, excerpt_hash=sha256:3e6c891540b37352ebd311ee8b4c67b1dea66bf9dff320c473caa7a16d89c7d0
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Isolate runtime-source tests from ambient AGENTPLANE env

Remove hidden dependencies on inherited AGENTPLANE_* environment variables in runtime-source and repo-local-handoff test paths so release verification cannot fail because the invoking shell is in a framework checkout.

## Scope

- In scope: Remove hidden dependencies on inherited AGENTPLANE_* environment variables in runtime-source and repo-local-handoff test paths so release verification cannot fail because the invoking shell is in a framework checkout.
- Out of scope: unrelated refactors not required for "Isolate runtime-source tests from ambient AGENTPLANE env".

## Plan

1. Implement the change for "Isolate runtime-source tests from ambient AGENTPLANE env".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the requested outcome for "Isolate runtime-source tests from ambient AGENTPLANE env". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T12:36:01.834Z — VERIFY — ok

By: CODER

Note: Isolated runtime-mode tests from inherited AGENTPLANE_* env by introducing a shared runtime test-env helper, wiring runtime-source/runtime.command/repo-local-handoff to it, and adding a regression that proves ambient handoff flags no longer change runtime-source outcomes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T12:00:28.586Z, excerpt_hash=sha256:3e6c891540b37352ebd311ee8b4c67b1dea66bf9dff320c473caa7a16d89c7d0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
