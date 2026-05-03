---
id: "202605031626-ZN55PB"
title: "ACR reviewer explain surface"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605031626-RX30C6"
tags:
  - "cli"
  - "code"
verify:
  - "agentplane acr explain --help"
  - "bun test packages/agentplane/src/commands/acr packages/agentplane/src/cli"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T16:28:22.339Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T17:21:59.127Z"
  updated_by: "CODER"
  note: "Command: agentplane acr explain --help. Result: pass. Evidence: help exposes task-id-or-path and json output. Scope: reviewer explain surface. Command: node packages/agentplane/dist/cli.js acr explain 202605031625-886KZ6. Result: pass. Evidence: printed task id/title, policy pass counts, verification passed, merge ready yes, and digest. Scope: human reviewer summary. Command: node packages/agentplane/dist/cli.js acr validate 202605031625-886KZ6 --mode local --json. Result: pass. Evidence: ok=true. Scope: explain uses valid ACR input."
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
    at: "2026-05-03T17:12:04.367Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement this ACR v0.1 scope inside the approved batch worktree and verify it with the shared ACR CLI, schema, docs, and lifecycle checks."
  -
    type: "verify"
    at: "2026-05-03T17:21:59.127Z"
    author: "CODER"
    state: "ok"
    note: "Command: agentplane acr explain --help. Result: pass. Evidence: help exposes task-id-or-path and json output. Scope: reviewer explain surface. Command: node packages/agentplane/dist/cli.js acr explain 202605031625-886KZ6. Result: pass. Evidence: printed task id/title, policy pass counts, verification passed, merge ready yes, and digest. Scope: human reviewer summary. Command: node packages/agentplane/dist/cli.js acr validate 202605031625-886KZ6 --mode local --json. Result: pass. Evidence: ok=true. Scope: explain uses valid ACR input."
  -
    type: "status"
    at: "2026-05-03T18:07:57.008Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #843 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-03T18:07:57.009Z"
doc_updated_by: "INTEGRATOR"
description: "Implement agentplane acr explain <task-id-or-path> with reviewer-oriented output summarizing task identity, agent/toolchain, plan status, work range, policy decisions, verification, residual risks, and merge readiness."
sections:
  Summary: |-
    ACR reviewer explain surface
    
    Implement agentplane acr explain <task-id-or-path> with reviewer-oriented output summarizing task identity, agent/toolchain, plan status, work range, policy decisions, verification, residual risks, and merge readiness.
  Scope: |-
    - In scope: Implement agentplane acr explain <task-id-or-path> with reviewer-oriented output summarizing task identity, agent/toolchain, plan status, work range, policy decisions, verification, residual risks, and merge readiness.
    - Out of scope: unrelated refactors not required for "ACR reviewer explain surface".
  Plan: "Plan: (1) Implement acr explain <task-id-or-path>. (2) Render reviewer-oriented summary for task, agent/toolchain, plan status, work range, policy decisions, verification, residual risks, and merge readiness. (3) Keep output concise and privacy-safe. Verify with command output tests and help smoke."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/acr packages/agentplane/src/cli`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `agentplane acr explain --help`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T17:21:59.127Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: agentplane acr explain --help. Result: pass. Evidence: help exposes task-id-or-path and json output. Scope: reviewer explain surface. Command: node packages/agentplane/dist/cli.js acr explain 202605031625-886KZ6. Result: pass. Evidence: printed task id/title, policy pass counts, verification passed, merge ready yes, and digest. Scope: human reviewer summary. Command: node packages/agentplane/dist/cli.js acr validate 202605031625-886KZ6 --mode local --json. Result: pass. Evidence: ok=true. Scope: explain uses valid ACR input.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:12:04.367Z, excerpt_hash=sha256:6b205832caba88cc5ca5776970b9fe730ffa85654e8bf44114ba81d5c953172c
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

ACR reviewer explain surface

Implement agentplane acr explain <task-id-or-path> with reviewer-oriented output summarizing task identity, agent/toolchain, plan status, work range, policy decisions, verification, residual risks, and merge readiness.

## Scope

- In scope: Implement agentplane acr explain <task-id-or-path> with reviewer-oriented output summarizing task identity, agent/toolchain, plan status, work range, policy decisions, verification, residual risks, and merge readiness.
- Out of scope: unrelated refactors not required for "ACR reviewer explain surface".

## Plan

Plan: (1) Implement acr explain <task-id-or-path>. (2) Render reviewer-oriented summary for task, agent/toolchain, plan status, work range, policy decisions, verification, residual risks, and merge readiness. (3) Keep output concise and privacy-safe. Verify with command output tests and help smoke.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/acr packages/agentplane/src/cli`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `agentplane acr explain --help`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T17:21:59.127Z — VERIFY — ok

By: CODER

Note: Command: agentplane acr explain --help. Result: pass. Evidence: help exposes task-id-or-path and json output. Scope: reviewer explain surface. Command: node packages/agentplane/dist/cli.js acr explain 202605031625-886KZ6. Result: pass. Evidence: printed task id/title, policy pass counts, verification passed, merge ready yes, and digest. Scope: human reviewer summary. Command: node packages/agentplane/dist/cli.js acr validate 202605031625-886KZ6 --mode local --json. Result: pass. Evidence: ok=true. Scope: explain uses valid ACR input.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:12:04.367Z, excerpt_hash=sha256:6b205832caba88cc5ca5776970b9fe730ffa85654e8bf44114ba81d5c953172c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
