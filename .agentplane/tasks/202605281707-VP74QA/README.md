---
id: "202605281707-VP74QA"
title: "Provider lane hardening for PR and release tails"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T17:08:58.481Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T17:22:28.097Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts --config vitest.workspace.ts; Result: pass as part of focused suite. Evidence: execution_packet distinguishes local_command/provider_action/wait/stop and exposes provider-action flags. Scope: PR/close-tail provider lane hardening."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing provider-lane next-action hardening as an included task in the approved v0.6.12 agent-efficiency batch worktree."
events:
  -
    type: "status"
    at: "2026-05-28T17:09:46.814Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing provider-lane next-action hardening as an included task in the approved v0.6.12 agent-efficiency batch worktree."
  -
    type: "verify"
    at: "2026-05-28T17:22:28.097Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts --config vitest.workspace.ts; Result: pass as part of focused suite. Evidence: execution_packet distinguishes local_command/provider_action/wait/stop and exposes provider-action flags. Scope: PR/close-tail provider lane hardening."
doc_version: 3
doc_updated_at: "2026-05-28T17:22:28.141Z"
doc_updated_by: "CODER"
description: "Make PR, close-tail, and release next-action surfaces distinguish local commands, provider actions, wait states, and stop conditions explicitly."
sections:
  Summary: |-
    Provider lane hardening for PR and release tails

    Make PR, close-tail, and release next-action surfaces distinguish local commands, provider actions, wait states, and stop conditions explicitly.
  Scope: |-
    - In scope: Make PR, close-tail, and release next-action surfaces distinguish local commands, provider actions, wait states, and stop conditions explicitly.
    - Out of scope: unrelated refactors not required for "Provider lane hardening for PR and release tails".
  Plan: "Harden provider-lane next-action output for PR, close-tail, and release flows by separating local commands, provider actions, wait states, and stop conditions. Preserve existing human-readable summaries while adding structured action kind."
  Verify Steps: "1. Run PR flow status/route-decision tests for provider action and wait states. 2. Run release next-action tests for local/current, GitHub, registry, and evidence-tail states. 3. Run command output tests proving legacy text remains readable."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T17:22:28.097Z — VERIFY — ok

    By: CODER

    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts --config vitest.workspace.ts; Result: pass as part of focused suite. Evidence: execution_packet distinguishes local_command/provider_action/wait/stop and exposes provider-action flags. Scope: PR/close-tail provider lane hardening.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:09:46.814Z, excerpt_hash=sha256:2b3995878ffe192466e9b3eaab7fa26fe291da56856de57c3098382586a827c9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281707-51DD0G-route-packet-v2/.agentplane/tasks/202605281707-VP74QA/blueprint/resolved-snapshot.json
    - old_digest: a65708690dc6a515db2625cd6f6b8b464eceadfff105744ede545916abef0e6f
    - current_digest: a65708690dc6a515db2625cd6f6b8b464eceadfff105744ede545916abef0e6f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605281707-VP74QA

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions: {}
id_source: "generated"
---
## Summary

Provider lane hardening for PR and release tails

Make PR, close-tail, and release next-action surfaces distinguish local commands, provider actions, wait states, and stop conditions explicitly.

## Scope

- In scope: Make PR, close-tail, and release next-action surfaces distinguish local commands, provider actions, wait states, and stop conditions explicitly.
- Out of scope: unrelated refactors not required for "Provider lane hardening for PR and release tails".

## Plan

Harden provider-lane next-action output for PR, close-tail, and release flows by separating local commands, provider actions, wait states, and stop conditions. Preserve existing human-readable summaries while adding structured action kind.

## Verify Steps

1. Run PR flow status/route-decision tests for provider action and wait states. 2. Run release next-action tests for local/current, GitHub, registry, and evidence-tail states. 3. Run command output tests proving legacy text remains readable.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T17:22:28.097Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts --config vitest.workspace.ts; Result: pass as part of focused suite. Evidence: execution_packet distinguishes local_command/provider_action/wait/stop and exposes provider-action flags. Scope: PR/close-tail provider lane hardening.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:09:46.814Z, excerpt_hash=sha256:2b3995878ffe192466e9b3eaab7fa26fe291da56856de57c3098382586a827c9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281707-51DD0G-route-packet-v2/.agentplane/tasks/202605281707-VP74QA/blueprint/resolved-snapshot.json
- old_digest: a65708690dc6a515db2625cd6f6b8b464eceadfff105744ede545916abef0e6f
- current_digest: a65708690dc6a515db2625cd6f6b8b464eceadfff105744ede545916abef0e6f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605281707-VP74QA

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
