---
id: "202604241136-RTDFZS"
title: "v0.3 freeze B2: remove init v1 orchestrator and make one init path"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202604241136-ESEK2A"
tags:
  - "cli"
  - "init"
  - "v0.3"
verify:
  - "bun run test -- packages/agentplane/src/cli/run-cli/commands/init"
  - "rg -n 'V2|v2|-v2|orchestrate-v2' packages/agentplane/src/cli/run-cli/commands/init"
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
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-24T11:36:33.516Z"
doc_updated_by: "CODER"
description: "Collapse init v1/v2 into a single orchestrator, preserve non-TTY preset behavior, and remove obsolete interactive-ui and experimental-ui flags."
sections:
  Summary: |-
    v0.3 freeze B2: remove init v1 orchestrator and make one init path
    
    Collapse init v1/v2 into a single orchestrator, preserve non-TTY preset behavior, and remove obsolete interactive-ui and experimental-ui flags.
  Scope: |-
    - In scope: Collapse init v1/v2 into a single orchestrator, preserve non-TTY preset behavior, and remove obsolete interactive-ui and experimental-ui flags.
    - Out of scope: unrelated refactors not required for "v0.3 freeze B2: remove init v1 orchestrator and make one init path".
  Plan: |-
    1. Implement the change for "v0.3 freeze B2: remove init v1 orchestrator and make one init path".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the requested outcome for "v0.3 freeze B2: remove init v1 orchestrator and make one init path". Expected: the visible result matches ## Summary and stays inside approved scope.
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

v0.3 freeze B2: remove init v1 orchestrator and make one init path

Collapse init v1/v2 into a single orchestrator, preserve non-TTY preset behavior, and remove obsolete interactive-ui and experimental-ui flags.

## Scope

- In scope: Collapse init v1/v2 into a single orchestrator, preserve non-TTY preset behavior, and remove obsolete interactive-ui and experimental-ui flags.
- Out of scope: unrelated refactors not required for "v0.3 freeze B2: remove init v1 orchestrator and make one init path".

## Plan

1. Implement the change for "v0.3 freeze B2: remove init v1 orchestrator and make one init path".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the requested outcome for "v0.3 freeze B2: remove init v1 orchestrator and make one init path". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
