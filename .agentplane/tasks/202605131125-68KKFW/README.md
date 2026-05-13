---
id: "202605131125-68KKFW"
title: "Split human and agent CLI output"
result_summary: "Merged via PR #3629."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T11:26:31.531Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T12:16:56.874Z"
  updated_by: "CODER"
  note: "Implemented split CLI presentation: agentplane keeps human formatting with aligned report labels and optional ANSI color, while ap/agent mode removes emoji and alignment for raw agent-oriented output. Verified with targeted tests, typecheck, build, knip, pre-push, and hosted GitHub checks."
  attempts: 0
commit:
  hash: "9f028ded025488a7ddb82326c0946de22bcf66f3"
  message: "Merge pull request #3629 from basilisk-labs/task/202605131125-68KKFW/split-cli-output"
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved CLI presentation split in the task worktree. Scope is limited to output-mode detection, focused formatting helpers, and targeted verification for agentplane versus ap output."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3629 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-13T11:26:54.888Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved CLI presentation split in the task worktree. Scope is limited to output-mode detection, focused formatting helpers, and targeted verification for agentplane versus ap output."
  -
    type: "verify"
    at: "2026-05-13T12:16:56.874Z"
    author: "CODER"
    state: "ok"
    note: "Implemented split CLI presentation: agentplane keeps human formatting with aligned report labels and optional ANSI color, while ap/agent mode removes emoji and alignment for raw agent-oriented output. Verified with targeted tests, typecheck, build, knip, pre-push, and hosted GitHub checks."
  -
    type: "status"
    at: "2026-05-13T12:45:03.824Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3629 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-13T12:45:03.824Z"
doc_updated_by: "INTEGRATOR"
description: "Make the long-form agentplane command render a cleaner human-oriented output with spacing, alignment, and color while keeping the short ap command minimal and unstyled for agent consumption."
sections:
  Summary: |-
    Split human and agent CLI output
    
    Make the long-form agentplane command render a cleaner human-oriented output with spacing, alignment, and color while keeping the short ap command minimal and unstyled for agent consumption.
  Scope: |-
    - In scope: Make the long-form agentplane command render a cleaner human-oriented output with spacing, alignment, and color while keeping the short ap command minimal and unstyled for agent consumption.
    - Out of scope: unrelated refactors not required for "Split human and agent CLI output".
  Plan: |-
    1. Locate the CLI invocation/output formatting layer and identify how `agentplane` and `ap` entrypoints differ at runtime.
    2. Add a small output-mode decision so `agentplane` uses human-oriented spacing/alignment/color and `ap` stays plain/minimal for agents.
    3. Update focused tests or snapshots that assert the two output contracts.
    4. Run task Verify Steps plus targeted CLI checks; record evidence before integration.
  Verify Steps: |-
    1. Run `ap task verify-show 202605131125-68KKFW`. Expected: the task verification contract is readable and has no unresolved setup blockers.
    2. Run focused CLI output tests covering `agentplane` and `ap` entrypoints. Expected: `agentplane` output contains human formatting while `ap` output remains plain/minimal.
    3. Run the relevant package typecheck/lint or exact-file checks for touched CLI code. Expected: no regressions in touched scope.
    4. Manually compare sample `agentplane` and `ap` command output. Expected: same semantic information, different presentation layer only.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T12:16:56.874Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented split CLI presentation: agentplane keeps human formatting with aligned report labels and optional ANSI color, while ap/agent mode removes emoji and alignment for raw agent-oriented output. Verified with targeted tests, typecheck, build, knip, pre-push, and hosted GitHub checks.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T11:26:54.888Z, excerpt_hash=sha256:7c348c34ec56c71d67a681d706e9702feabe737f38b0983fd4122f053024654b
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131125-68KKFW-split-cli-output/.agentplane/tasks/202605131125-68KKFW/blueprint/resolved-snapshot.json
    - old_digest: 6f93c605c490d609a9c62f3d88d5e94ae82329ca7b56a7eb27f197229852c054
    - current_digest: 6f93c605c490d609a9c62f3d88d5e94ae82329ca7b56a7eb27f197229852c054
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131125-68KKFW
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Head 94094c769 passed local pre-push full-fast, output/agent-mode/manual CLI samples, and PR #3629 checks: docs, test, test-windows, release manifest, Socket, changes.
      Impact: agentplane output is more readable for humans; ap output remains minimal and machine-friendly.
      Resolution: No unresolved drift observed; recovery-validate is skipped by CI configuration.
id_source: "generated"
---
## Summary

Split human and agent CLI output

Make the long-form agentplane command render a cleaner human-oriented output with spacing, alignment, and color while keeping the short ap command minimal and unstyled for agent consumption.

## Scope

- In scope: Make the long-form agentplane command render a cleaner human-oriented output with spacing, alignment, and color while keeping the short ap command minimal and unstyled for agent consumption.
- Out of scope: unrelated refactors not required for "Split human and agent CLI output".

## Plan

1. Locate the CLI invocation/output formatting layer and identify how `agentplane` and `ap` entrypoints differ at runtime.
2. Add a small output-mode decision so `agentplane` uses human-oriented spacing/alignment/color and `ap` stays plain/minimal for agents.
3. Update focused tests or snapshots that assert the two output contracts.
4. Run task Verify Steps plus targeted CLI checks; record evidence before integration.

## Verify Steps

1. Run `ap task verify-show 202605131125-68KKFW`. Expected: the task verification contract is readable and has no unresolved setup blockers.
2. Run focused CLI output tests covering `agentplane` and `ap` entrypoints. Expected: `agentplane` output contains human formatting while `ap` output remains plain/minimal.
3. Run the relevant package typecheck/lint or exact-file checks for touched CLI code. Expected: no regressions in touched scope.
4. Manually compare sample `agentplane` and `ap` command output. Expected: same semantic information, different presentation layer only.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T12:16:56.874Z — VERIFY — ok

By: CODER

Note: Implemented split CLI presentation: agentplane keeps human formatting with aligned report labels and optional ANSI color, while ap/agent mode removes emoji and alignment for raw agent-oriented output. Verified with targeted tests, typecheck, build, knip, pre-push, and hosted GitHub checks.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T11:26:54.888Z, excerpt_hash=sha256:7c348c34ec56c71d67a681d706e9702feabe737f38b0983fd4122f053024654b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131125-68KKFW-split-cli-output/.agentplane/tasks/202605131125-68KKFW/blueprint/resolved-snapshot.json
- old_digest: 6f93c605c490d609a9c62f3d88d5e94ae82329ca7b56a7eb27f197229852c054
- current_digest: 6f93c605c490d609a9c62f3d88d5e94ae82329ca7b56a7eb27f197229852c054
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131125-68KKFW

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Head 94094c769 passed local pre-push full-fast, output/agent-mode/manual CLI samples, and PR #3629 checks: docs, test, test-windows, release manifest, Socket, changes.
  Impact: agentplane output is more readable for humans; ap output remains minimal and machine-friendly.
  Resolution: No unresolved drift observed; recovery-validate is skipped by CI configuration.
