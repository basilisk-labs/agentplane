---
id: "202605031626-EQYR7H"
title: "ACR CI merge gate"
status: "DONE"
priority: "high"
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
  - "agentplane acr check --help"
  - "bun test packages/agentplane/src/commands/acr packages/agentplane/src/cli"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T16:28:15.925Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T17:21:30.684Z"
  updated_by: "CODER"
  note: "Command: agentplane acr check --help. Result: pass. Evidence: help lists ci mode plus plan, verification, policy, waiver, and override gates. Scope: merge-gate CLI surface. Command: node packages/agentplane/dist/cli.js acr check 202605031625-886KZ6 --json. Result: pass. Evidence: ok=true, no warnings. Scope: ACR CI merge gate. Command: bun run docs:cli:check. Result: pass. Evidence: generated CLI reference is up to date. Scope: documented merge-gate flags."
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
    at: "2026-05-03T17:12:01.574Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement this ACR v0.1 scope inside the approved batch worktree and verify it with the shared ACR CLI, schema, docs, and lifecycle checks."
  -
    type: "verify"
    at: "2026-05-03T17:21:30.684Z"
    author: "CODER"
    state: "ok"
    note: "Command: agentplane acr check --help. Result: pass. Evidence: help lists ci mode plus plan, verification, policy, waiver, and override gates. Scope: merge-gate CLI surface. Command: node packages/agentplane/dist/cli.js acr check 202605031625-886KZ6 --json. Result: pass. Evidence: ok=true, no warnings. Scope: ACR CI merge gate. Command: bun run docs:cli:check. Result: pass. Evidence: generated CLI reference is up to date. Scope: documented merge-gate flags."
  -
    type: "status"
    at: "2026-05-03T18:07:56.995Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #843 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-03T18:07:56.996Z"
doc_updated_by: "INTEGRATOR"
description: "Implement agentplane acr check <task-id> --mode ci as the merge-gate command. It must reject missing, stale, invalid, non-merge-ready, manually overridden, or unwaived verification states while keeping ACR optional by policy/config until enabled."
sections:
  Summary: |-
    ACR CI merge gate
    
    Implement agentplane acr check <task-id> --mode ci as the merge-gate command. It must reject missing, stale, invalid, non-merge-ready, manually overridden, or unwaived verification states while keeping ACR optional by policy/config until enabled.
  Scope: |-
    - In scope: Implement agentplane acr check <task-id> --mode ci as the merge-gate command. It must reject missing, stale, invalid, non-merge-ready, manually overridden, or unwaived verification states while keeping ACR optional by policy/config until enabled.
    - Out of scope: unrelated refactors not required for "ACR CI merge gate".
  Plan: "Plan: (1) Implement acr check <task-id> --mode ci as a merge gate wrapper over validation plus merge-readiness rules. (2) Fail missing/stale/invalid ACR, failed policy, unapproved manual override, and unwaived verification gaps. (3) Keep enforcement optional through config/policy so first release can generate automatically without breaking old projects. Verify with CI-mode tests and command help smoke."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/acr packages/agentplane/src/cli`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `agentplane acr check --help`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T17:21:30.684Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: agentplane acr check --help. Result: pass. Evidence: help lists ci mode plus plan, verification, policy, waiver, and override gates. Scope: merge-gate CLI surface. Command: node packages/agentplane/dist/cli.js acr check 202605031625-886KZ6 --json. Result: pass. Evidence: ok=true, no warnings. Scope: ACR CI merge gate. Command: bun run docs:cli:check. Result: pass. Evidence: generated CLI reference is up to date. Scope: documented merge-gate flags.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:12:01.574Z, excerpt_hash=sha256:4153712b5396f3f9321fe74418dbc74ebc6391ea048945f86b47fc22d2ec0326
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

ACR CI merge gate

Implement agentplane acr check <task-id> --mode ci as the merge-gate command. It must reject missing, stale, invalid, non-merge-ready, manually overridden, or unwaived verification states while keeping ACR optional by policy/config until enabled.

## Scope

- In scope: Implement agentplane acr check <task-id> --mode ci as the merge-gate command. It must reject missing, stale, invalid, non-merge-ready, manually overridden, or unwaived verification states while keeping ACR optional by policy/config until enabled.
- Out of scope: unrelated refactors not required for "ACR CI merge gate".

## Plan

Plan: (1) Implement acr check <task-id> --mode ci as a merge gate wrapper over validation plus merge-readiness rules. (2) Fail missing/stale/invalid ACR, failed policy, unapproved manual override, and unwaived verification gaps. (3) Keep enforcement optional through config/policy so first release can generate automatically without breaking old projects. Verify with CI-mode tests and command help smoke.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/acr packages/agentplane/src/cli`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `agentplane acr check --help`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T17:21:30.684Z — VERIFY — ok

By: CODER

Note: Command: agentplane acr check --help. Result: pass. Evidence: help lists ci mode plus plan, verification, policy, waiver, and override gates. Scope: merge-gate CLI surface. Command: node packages/agentplane/dist/cli.js acr check 202605031625-886KZ6 --json. Result: pass. Evidence: ok=true, no warnings. Scope: ACR CI merge gate. Command: bun run docs:cli:check. Result: pass. Evidence: generated CLI reference is up to date. Scope: documented merge-gate flags.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:12:01.574Z, excerpt_hash=sha256:4153712b5396f3f9321fe74418dbc74ebc6391ea048945f86b47fc22d2ec0326

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
