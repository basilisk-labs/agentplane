---
id: "202604241136-NWWGZV"
title: "v0.3 freeze C1: move run-cli test helpers into testkit"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "testing"
  - "testkit"
  - "v0.3"
verify:
  - "bun run test -- packages/agentplane/src/cli/run-cli"
  - "bun run typecheck"
  - "rg -n 'run-cli\\.core\\.' packages/agentplane/src packages/testkit/src"
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
doc_updated_at: "2026-04-24T11:36:41.942Z"
doc_updated_by: "CODER"
description: "Move run-cli.core helper modules out of agentplane src into @agentplane/testkit/cli and remove custom tsconfig exclusions."
sections:
  Summary: |-
    v0.3 freeze C1: move run-cli test helpers into testkit
    
    Move run-cli.core helper modules out of agentplane src into @agentplane/testkit/cli and remove custom tsconfig exclusions.
  Scope: |-
    - In scope: Move run-cli.core helper modules out of agentplane src into @agentplane/testkit/cli and remove custom tsconfig exclusions.
    - Out of scope: unrelated refactors not required for "v0.3 freeze C1: move run-cli test helpers into testkit".
  Plan: |-
    1. Implement the change for "v0.3 freeze C1: move run-cli test helpers into testkit".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the requested outcome for "v0.3 freeze C1: move run-cli test helpers into testkit". Expected: the visible result matches ## Summary and stays inside approved scope.
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

v0.3 freeze C1: move run-cli test helpers into testkit

Move run-cli.core helper modules out of agentplane src into @agentplane/testkit/cli and remove custom tsconfig exclusions.

## Scope

- In scope: Move run-cli.core helper modules out of agentplane src into @agentplane/testkit/cli and remove custom tsconfig exclusions.
- Out of scope: unrelated refactors not required for "v0.3 freeze C1: move run-cli test helpers into testkit".

## Plan

1. Implement the change for "v0.3 freeze C1: move run-cli test helpers into testkit".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the requested outcome for "v0.3 freeze C1: move run-cli test helpers into testkit". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
