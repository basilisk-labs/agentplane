---
id: "202606032101-EDHW07"
title: "Fix upstream issue #4412: AgentPlane internal error report (E_INTERNAL)"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "github-issue"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-03T21:02:03.849Z"
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
    body: "Start: investigating the runner result-manifest status gate behind upstream issue #4412 and keeping the work scoped to truthful blocked publication outcomes."
events:
  -
    type: "status"
    at: "2026-06-03T21:04:14.525Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: investigating the runner result-manifest status gate behind upstream issue #4412 and keeping the work scoped to truthful blocked publication outcomes."
doc_version: 3
doc_updated_at: "2026-06-03T21:04:14.525Z"
doc_updated_by: "CODER"
description: "Resolve https://github.com/basilisk-labs/agentplane/issues/4412"
sections:
  Summary: |-
    Fix upstream issue #4412: AgentPlane internal error report (E_INTERNAL)

    Resolve https://github.com/basilisk-labs/agentplane/issues/4412
  Scope: |-
    - In scope: Resolve https://github.com/basilisk-labs/agentplane/issues/4412.
    - Out of scope: unrelated refactors not required for "Fix upstream issue #4412: AgentPlane internal error report (E_INTERNAL)".
  Plan: "1. Inspect the runner result-manifest status schema and the closeout path that consumes Codex result manifests for blocked runs. 2. Update AgentPlane so externally blocked publication steps can be represented without being reclassified as a failed runner outcome, keeping existing success and failure semantics intact. 3. Add or update focused tests for the accepted terminal statuses and run the smallest relevant verification set before recording task evidence."
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix upstream issue #4412: AgentPlane internal error report (E_INTERNAL)". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix upstream issue #4412: AgentPlane internal error report (E_INTERNAL)". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Fix upstream issue #4412: AgentPlane internal error report (E_INTERNAL)

Resolve https://github.com/basilisk-labs/agentplane/issues/4412

## Scope

- In scope: Resolve https://github.com/basilisk-labs/agentplane/issues/4412.
- Out of scope: unrelated refactors not required for "Fix upstream issue #4412: AgentPlane internal error report (E_INTERNAL)".

## Plan

1. Inspect the runner result-manifest status schema and the closeout path that consumes Codex result manifests for blocked runs. 2. Update AgentPlane so externally blocked publication steps can be represented without being reclassified as a failed runner outcome, keeping existing success and failure semantics intact. 3. Add or update focused tests for the accepted terminal statuses and run the smallest relevant verification set before recording task evidence.

## Verify Steps

PLANNER fallback scaffold for "Fix upstream issue #4412: AgentPlane internal error report (E_INTERNAL)". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix upstream issue #4412: AgentPlane internal error report (E_INTERNAL)". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
