---
id: "202605021412-Q2WGGA"
title: "Build bundled-runtime CLI artifact generator"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605021412-FDDWP8"
tags:
  - "code"
  - "distribution"
  - "release"
verify:
  - "bun test packages/agentplane/src/commands/release/*standalone* scripts/*standalone*"
  - "node scripts/<standalone-artifact-script>.mjs --check"
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
doc_updated_at: "2026-05-02T14:12:50.552Z"
doc_updated_by: "CODER"
description: "Implement a deterministic script that assembles AgentPlane CLI archives with an embedded Node runtime, installed production dependencies, package assets, wrapper entrypoints, version metadata, and sha256 outputs."
sections:
  Summary: |-
    Build bundled-runtime CLI artifact generator
    
    Implement a deterministic script that assembles AgentPlane CLI archives with an embedded Node runtime, installed production dependencies, package assets, wrapper entrypoints, version metadata, and sha256 outputs.
  Scope: |-
    - In scope: Implement a deterministic script that assembles AgentPlane CLI archives with an embedded Node runtime, installed production dependencies, package assets, wrapper entrypoints, version metadata, and sha256 outputs.
    - Out of scope: unrelated refactors not required for "Build bundled-runtime CLI artifact generator".
  Plan: |-
    1. Implement the change for "Build bundled-runtime CLI artifact generator".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/release/*standalone* scripts/*standalone*`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `node scripts/<standalone-artifact-script>.mjs --check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Build bundled-runtime CLI artifact generator

Implement a deterministic script that assembles AgentPlane CLI archives with an embedded Node runtime, installed production dependencies, package assets, wrapper entrypoints, version metadata, and sha256 outputs.

## Scope

- In scope: Implement a deterministic script that assembles AgentPlane CLI archives with an embedded Node runtime, installed production dependencies, package assets, wrapper entrypoints, version metadata, and sha256 outputs.
- Out of scope: unrelated refactors not required for "Build bundled-runtime CLI artifact generator".

## Plan

1. Implement the change for "Build bundled-runtime CLI artifact generator".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/release/*standalone* scripts/*standalone*`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `node scripts/<standalone-artifact-script>.mjs --check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
