---
id: "202605031626-RX30C6"
title: "ACR validation engine"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605031626-M8GRHS"
tags:
  - "cli"
  - "code"
verify:
  - "agentplane acr validate --help"
  - "bun test packages/agentplane/src/commands/acr packages/core/src/tasks"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T16:28:15.164Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T17:21:15.151Z"
  updated_by: "CODER"
  note: "Command: agentplane acr validate --help. Result: pass. Evidence: help lists schema/local/ci modes, strict, and json output. Scope: validation command surface. Command: node packages/agentplane/dist/cli.js acr validate 202605031625-886KZ6 --mode local --json. Result: pass. Evidence: ok=true, record_id=acr_202605031625-886KZ6, warnings=[]. Scope: local ACR validation engine. Command: node packages/agentplane/dist/cli.js acr check 202605031625-886KZ6 --json. Result: pass. Evidence: ok=true with no warnings. Scope: CI-strength invariants reused by validation."
commit:
  hash: "cbdff74c58993d0f586646fe698e742e4255c7dc"
  message: "Merge pull request #843 from basilisk-labs/task/202605031625-886KZ6/acr-core-schema"
comments:
  -
    author: "CODER"
    body: "Start: implement this ACR v0.1 scope inside the approved batch worktree and verify it with the shared ACR CLI, schema, docs, and lifecycle checks."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #843 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-03T17:12:00.173Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement this ACR v0.1 scope inside the approved batch worktree and verify it with the shared ACR CLI, schema, docs, and lifecycle checks."
  -
    type: "verify"
    at: "2026-05-03T17:21:15.151Z"
    author: "CODER"
    state: "ok"
    note: "Command: agentplane acr validate --help. Result: pass. Evidence: help lists schema/local/ci modes, strict, and json output. Scope: validation command surface. Command: node packages/agentplane/dist/cli.js acr validate 202605031625-886KZ6 --mode local --json. Result: pass. Evidence: ok=true, record_id=acr_202605031625-886KZ6, warnings=[]. Scope: local ACR validation engine. Command: node packages/agentplane/dist/cli.js acr check 202605031625-886KZ6 --json. Result: pass. Evidence: ok=true with no warnings. Scope: CI-strength invariants reused by validation."
  -
    type: "status"
    at: "2026-05-03T18:07:57.004Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #843 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-03T18:07:57.005Z"
doc_updated_by: "INTEGRATOR"
description: "Implement agentplane acr validate <task-id-or-path> --mode schema|local|ci with centralized ACR validation, stable ACR error codes, Git ancestry checks, evidence hash checks, record digest checks, and privacy-safe failure output."
sections:
  Summary: |-
    ACR validation engine
    
    Implement agentplane acr validate <task-id-or-path> --mode schema|local|ci with centralized ACR validation, stable ACR error codes, Git ancestry checks, evidence hash checks, record digest checks, and privacy-safe failure output.
  Scope: |-
    - In scope: Implement agentplane acr validate <task-id-or-path> --mode schema|local|ci with centralized ACR validation, stable ACR error codes, Git ancestry checks, evidence hash checks, record digest checks, and privacy-safe failure output.
    - Out of scope: unrelated refactors not required for "ACR validation engine".
  Plan: "Plan: (1) Implement centralized ACR validation modes: schema, local, ci. (2) Validate task existence, plan/approval consistency, verification consistency, Git commit resolution, work_commit ancestry, evidence paths/hashes, record digest, and privacy constraints. (3) Use stable ACR-specific error codes mapped onto existing AgentPlane exit codes. Verify with valid/invalid fixtures and targeted command tests."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/acr packages/core/src/tasks`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `agentplane acr validate --help`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T17:21:15.151Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: agentplane acr validate --help. Result: pass. Evidence: help lists schema/local/ci modes, strict, and json output. Scope: validation command surface. Command: node packages/agentplane/dist/cli.js acr validate 202605031625-886KZ6 --mode local --json. Result: pass. Evidence: ok=true, record_id=acr_202605031625-886KZ6, warnings=[]. Scope: local ACR validation engine. Command: node packages/agentplane/dist/cli.js acr check 202605031625-886KZ6 --json. Result: pass. Evidence: ok=true with no warnings. Scope: CI-strength invariants reused by validation.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:12:00.173Z, excerpt_hash=sha256:f261535af5fb5c3de9903a3519534938d3266c7f8969379e88d343c0e8be2f07
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

ACR validation engine

Implement agentplane acr validate <task-id-or-path> --mode schema|local|ci with centralized ACR validation, stable ACR error codes, Git ancestry checks, evidence hash checks, record digest checks, and privacy-safe failure output.

## Scope

- In scope: Implement agentplane acr validate <task-id-or-path> --mode schema|local|ci with centralized ACR validation, stable ACR error codes, Git ancestry checks, evidence hash checks, record digest checks, and privacy-safe failure output.
- Out of scope: unrelated refactors not required for "ACR validation engine".

## Plan

Plan: (1) Implement centralized ACR validation modes: schema, local, ci. (2) Validate task existence, plan/approval consistency, verification consistency, Git commit resolution, work_commit ancestry, evidence paths/hashes, record digest, and privacy constraints. (3) Use stable ACR-specific error codes mapped onto existing AgentPlane exit codes. Verify with valid/invalid fixtures and targeted command tests.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/acr packages/core/src/tasks`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `agentplane acr validate --help`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T17:21:15.151Z — VERIFY — ok

By: CODER

Note: Command: agentplane acr validate --help. Result: pass. Evidence: help lists schema/local/ci modes, strict, and json output. Scope: validation command surface. Command: node packages/agentplane/dist/cli.js acr validate 202605031625-886KZ6 --mode local --json. Result: pass. Evidence: ok=true, record_id=acr_202605031625-886KZ6, warnings=[]. Scope: local ACR validation engine. Command: node packages/agentplane/dist/cli.js acr check 202605031625-886KZ6 --json. Result: pass. Evidence: ok=true with no warnings. Scope: CI-strength invariants reused by validation.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:12:00.173Z, excerpt_hash=sha256:f261535af5fb5c3de9903a3519534938d3266c7f8969379e88d343c0e8be2f07

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
