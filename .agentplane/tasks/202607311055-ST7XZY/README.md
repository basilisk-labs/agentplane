---
id: "202607311055-ST7XZY"
title: "Eliminate direct workflow state-neutral routing loops"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "regression"
  - "release"
  - "routing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-31T10:55:47.088Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: audit direct route transitions, eliminate state-neutral loops, and add deterministic task artifact persistence recovery for the v0.6.26 maintenance patch."
events:
  -
    type: "status"
    at: "2026-07-31T10:56:26.039Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: audit direct route transitions, eliminate state-neutral loops, and add deterministic task artifact persistence recovery for the v0.6.26 maintenance patch."
doc_version: 3
doc_updated_at: "2026-07-31T11:07:50.558Z"
doc_updated_by: "CODER"
description: "Audit v0.6.25 direct workflow route decisions for successful state-neutral command loops; fix DOING plus pending verification plus absent runner routing; add deterministic recovery for untracked canonical task artifacts; add exact and analogous regression coverage without touching main."
sections:
  Summary: |-
    Eliminate direct workflow state-neutral routing loops

    Audit v0.6.25 direct workflow route decisions for successful state-neutral command loops; fix DOING plus pending verification plus absent runner routing; add deterministic recovery for untracked canonical task artifacts; add exact and analogous regression coverage without touching main.
  Scope: |-
    - In scope: v0.6.25 direct route selection, execution-packet safety, runner guidance, exact-state and analogous route regressions, untracked canonical task-artifact detection/recovery, and v0.6.26 maintenance release evidence.
    - Out of scope: main, agentplane-loops, unrelated 0.7 work, provider redesign, and automatic commits that bypass configured approval policy.
  Plan: |-
    1. Reproduce the reported DOING + verification pending + absent runner loop on the v0.6.25 runtime and inventory all successful state-neutral next-action commands.
    2. Trace route selection through handoff, oracle, execution packet, guidance, and blocker derivation; classify analogous loops and persistence gaps.
    3. Route executable direct tasks to task run, use explicit blocked recovery where execution is unavailable, and surface deterministic persistence recovery for untracked canonical task artifacts.
    4. Add exact-state, recompute, adjacent-state, argv-safety, and untracked-artifact regressions.
    5. Run focused tests, routing checks, significant/release-critical suites, evaluator, integration verification, then publish v0.6.26 from the maintenance line with exact-SHA proof.
  Verify Steps: |-
    1. Run the direct-route regression suite covering DOING + verification=pending + no runner state. Expected: next-action emits argv-safe `agentplane task run <task-id>`, runner execution is allowed, and recompute does not repeat a successful state-neutral diagnostic.
    2. Run route-decision, execution-packet, route-guidance, task-handoff, and task-run focused tests. Expected: all direct runner terminal/absent states have a mutating transition or explicit blocked recovery; no unsafe placeholder command is emitted.
    3. Run the untracked task-artifact regression. Expected: canonical `.agentplane/tasks/<task-id>/` drift is detected and the route emits a deterministic task-scoped persistence command without auto-committing unrelated files.
    4. Run `node .agentplane/policy/check-routing.mjs`, `agentplane doctor`, the canonical significant suite, release-critical suite, and `agentplane release plan --patch`. Expected: all pass and target version is 0.6.26.
    5. Verify GitHub/npm/tag after publication. Expected: v0.6.26 tag, GitHub release, publish workflow, and npm `gitHead` resolve to the same maintenance SHA; that SHA is not an ancestor of main.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the routing/persistence implementation and regression commits on the maintenance branch.
    - Republish only through a later patch; never retag or overwrite v0.6.26 after publication.
    - Re-run the exact-state and release verification suites after rollback.
  Findings: |-
    - Observation: Direct route selection gated runner hints on run_id/status presence, so the handoff's valid absent-state run transition was discarded and replaced with verify-show.
      Impact: DOING tasks with pending verification and no runner state entered a successful state-neutral recompute loop.
      Resolution: Use runner next_action/next_command semantics directly; absent, retry, and resume states now route to task run.

    - Observation: Terminal successful runner handoff encoded verify-show as next_command even though verify-show only reads the acceptance contract.
      Impact: Completed runner work with pending verification could enter the same state-neutral loop through a second route surface.
      Resolution: Terminal success now emits no executable command and next-action exposes an explicit verification evidence gate.

    - Observation: Direct artifact blockers inspected staged and unstaged tracked paths only; active untracked canonical task artifacts were invisible to routing.
      Impact: Workspace recreation could discard the operational task source before runner execution, and untracked DONE archives could be declared terminal.
      Resolution: Detect task-scoped untracked artifacts, persist them with a guarded allow-tasks commit before runner work, and include untracked DONE artifacts in cleanup routing.

    - Observation: The guided task begin shortcut bypassed next-action and returned verify-show directly.
      Impact: The documented fast path reproduced the same diagnostic-as-transition category mismatch.
      Resolution: Direct task begin now hands control to task next-action --explain so persistence, runner, verification, and closeout gates stay centralized.
id_source: "generated"
---
## Summary

Eliminate direct workflow state-neutral routing loops

Audit v0.6.25 direct workflow route decisions for successful state-neutral command loops; fix DOING plus pending verification plus absent runner routing; add deterministic recovery for untracked canonical task artifacts; add exact and analogous regression coverage without touching main.

## Scope

- In scope: v0.6.25 direct route selection, execution-packet safety, runner guidance, exact-state and analogous route regressions, untracked canonical task-artifact detection/recovery, and v0.6.26 maintenance release evidence.
- Out of scope: main, agentplane-loops, unrelated 0.7 work, provider redesign, and automatic commits that bypass configured approval policy.

## Plan

1. Reproduce the reported DOING + verification pending + absent runner loop on the v0.6.25 runtime and inventory all successful state-neutral next-action commands.
2. Trace route selection through handoff, oracle, execution packet, guidance, and blocker derivation; classify analogous loops and persistence gaps.
3. Route executable direct tasks to task run, use explicit blocked recovery where execution is unavailable, and surface deterministic persistence recovery for untracked canonical task artifacts.
4. Add exact-state, recompute, adjacent-state, argv-safety, and untracked-artifact regressions.
5. Run focused tests, routing checks, significant/release-critical suites, evaluator, integration verification, then publish v0.6.26 from the maintenance line with exact-SHA proof.

## Verify Steps

1. Run the direct-route regression suite covering DOING + verification=pending + no runner state. Expected: next-action emits argv-safe `agentplane task run <task-id>`, runner execution is allowed, and recompute does not repeat a successful state-neutral diagnostic.
2. Run route-decision, execution-packet, route-guidance, task-handoff, and task-run focused tests. Expected: all direct runner terminal/absent states have a mutating transition or explicit blocked recovery; no unsafe placeholder command is emitted.
3. Run the untracked task-artifact regression. Expected: canonical `.agentplane/tasks/<task-id>/` drift is detected and the route emits a deterministic task-scoped persistence command without auto-committing unrelated files.
4. Run `node .agentplane/policy/check-routing.mjs`, `agentplane doctor`, the canonical significant suite, release-critical suite, and `agentplane release plan --patch`. Expected: all pass and target version is 0.6.26.
5. Verify GitHub/npm/tag after publication. Expected: v0.6.26 tag, GitHub release, publish workflow, and npm `gitHead` resolve to the same maintenance SHA; that SHA is not an ancestor of main.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the routing/persistence implementation and regression commits on the maintenance branch.
- Republish only through a later patch; never retag or overwrite v0.6.26 after publication.
- Re-run the exact-state and release verification suites after rollback.

## Findings

- Observation: Direct route selection gated runner hints on run_id/status presence, so the handoff's valid absent-state run transition was discarded and replaced with verify-show.
  Impact: DOING tasks with pending verification and no runner state entered a successful state-neutral recompute loop.
  Resolution: Use runner next_action/next_command semantics directly; absent, retry, and resume states now route to task run.

- Observation: Terminal successful runner handoff encoded verify-show as next_command even though verify-show only reads the acceptance contract.
  Impact: Completed runner work with pending verification could enter the same state-neutral loop through a second route surface.
  Resolution: Terminal success now emits no executable command and next-action exposes an explicit verification evidence gate.

- Observation: Direct artifact blockers inspected staged and unstaged tracked paths only; active untracked canonical task artifacts were invisible to routing.
  Impact: Workspace recreation could discard the operational task source before runner execution, and untracked DONE archives could be declared terminal.
  Resolution: Detect task-scoped untracked artifacts, persist them with a guarded allow-tasks commit before runner work, and include untracked DONE artifacts in cleanup routing.

- Observation: The guided task begin shortcut bypassed next-action and returned verify-show directly.
  Impact: The documented fast path reproduced the same diagnostic-as-transition category mismatch.
  Resolution: Direct task begin now hands control to task next-action --explain so persistence, runner, verification, and closeout gates stay centralized.
