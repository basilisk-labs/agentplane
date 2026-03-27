---
id: "202603251538-Y8DE9D"
title: "Introduce RunnerRunRepository and canonical invocation/result contracts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603251538-CZ19GT"
tags:
  - "code"
  - "architecture"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-27T09:39:18.716Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-27T10:05:00.200Z"
  updated_by: "CODER"
  note: "Verified RunnerRunRepository refactor: task-run, task-run-lifecycle, and task-run-inspect now load bundle/state/events through repository APIs; codex/custom adapters use the same repository seam for state/event persistence; targeted runner regressions and core/agentplane builds passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: introduce a runner repository boundary for invocation/state/result persistence before changing adapter and task-projection seams."
events:
  -
    type: "status"
    at: "2026-03-27T09:39:35.458Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: introduce a runner repository boundary for invocation/state/result persistence before changing adapter and task-projection seams."
  -
    type: "verify"
    at: "2026-03-27T10:05:00.200Z"
    author: "CODER"
    state: "ok"
    note: "Verified RunnerRunRepository refactor: task-run, task-run-lifecycle, and task-run-inspect now load bundle/state/events through repository APIs; codex/custom adapters use the same repository seam for state/event persistence; targeted runner regressions and core/agentplane builds passed."
doc_version: 3
doc_updated_at: "2026-03-27T10:05:00.257Z"
doc_updated_by: "CODER"
description: "Separate runner persistence from task projection by introducing a dedicated run repository, canonical invocation snapshot, and one normalized result contract that lifecycle operations and adapters reuse instead of rebuilding state from mutable config and per-adapter conventions."
sections:
  Summary: |-
    Introduce RunnerRunRepository and canonical invocation/result contracts
    
    Separate runner persistence from task projection by introducing a dedicated run repository, canonical invocation snapshot, and one normalized result contract that lifecycle operations and adapters reuse instead of rebuilding state from mutable config and per-adapter conventions.
  Scope: |-
    - In scope: Separate runner persistence from task projection by introducing a dedicated run repository, canonical invocation snapshot, and one normalized result contract that lifecycle operations and adapters reuse instead of rebuilding state from mutable config and per-adapter conventions.
    - Out of scope: unrelated refactors not required for "Introduce RunnerRunRepository and canonical invocation/result contracts".
  Plan: |-
    1. Introduce a dedicated RunnerRunRepository that owns runner artifact paths, prepared invocation snapshots, run-state persistence, event/trace access, and result-manifest loading instead of letting usecases and adapters read files ad hoc.
    2. Define one canonical runner invocation snapshot and one normalized runner result contract, then route codex/custom adapter execute paths through that normalization boundary before task projection consumes the outcome.
    3. Rewire task-run, task-run-lifecycle, task-run-inspect, and task-state to depend on the repository contract, then add focused lifecycle/adapter/inspection regressions plus the smallest relevant builds.
  Verify Steps: |-
    1. Inspect the runner repository/types/usecase seams after the refactor. Expected: prepared invocation snapshots, persisted run state, events, traces, and normalized results are loaded through explicit repository APIs instead of direct file reads in lifecycle and inspect code.
    2. Run targeted runner lifecycle, adapter, and inspect regressions. Expected: prepare/execute/cancel/retry/inspect behavior stays stable, and codex/custom result normalization still yields the same task-facing outcome semantics.
    3. Run the smallest relevant builds. Expected: core and agentplane compile cleanly with the new repository contract and no import/type drift across runner modules.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-27T10:05:00.200Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified RunnerRunRepository refactor: task-run, task-run-lifecycle, and task-run-inspect now load bundle/state/events through repository APIs; codex/custom adapters use the same repository seam for state/event persistence; targeted runner regressions and core/agentplane builds passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-27T09:39:35.460Z, excerpt_hash=sha256:f4dfe9d14b0117e99ba37c647c2e47554f575b8ffdd1d88fa645cc0191bf4916
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Introduce RunnerRunRepository and canonical invocation/result contracts

Separate runner persistence from task projection by introducing a dedicated run repository, canonical invocation snapshot, and one normalized result contract that lifecycle operations and adapters reuse instead of rebuilding state from mutable config and per-adapter conventions.

## Scope

- In scope: Separate runner persistence from task projection by introducing a dedicated run repository, canonical invocation snapshot, and one normalized result contract that lifecycle operations and adapters reuse instead of rebuilding state from mutable config and per-adapter conventions.
- Out of scope: unrelated refactors not required for "Introduce RunnerRunRepository and canonical invocation/result contracts".

## Plan

1. Introduce a dedicated RunnerRunRepository that owns runner artifact paths, prepared invocation snapshots, run-state persistence, event/trace access, and result-manifest loading instead of letting usecases and adapters read files ad hoc.
2. Define one canonical runner invocation snapshot and one normalized runner result contract, then route codex/custom adapter execute paths through that normalization boundary before task projection consumes the outcome.
3. Rewire task-run, task-run-lifecycle, task-run-inspect, and task-state to depend on the repository contract, then add focused lifecycle/adapter/inspection regressions plus the smallest relevant builds.

## Verify Steps

1. Inspect the runner repository/types/usecase seams after the refactor. Expected: prepared invocation snapshots, persisted run state, events, traces, and normalized results are loaded through explicit repository APIs instead of direct file reads in lifecycle and inspect code.
2. Run targeted runner lifecycle, adapter, and inspect regressions. Expected: prepare/execute/cancel/retry/inspect behavior stays stable, and codex/custom result normalization still yields the same task-facing outcome semantics.
3. Run the smallest relevant builds. Expected: core and agentplane compile cleanly with the new repository contract and no import/type drift across runner modules.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-27T10:05:00.200Z — VERIFY — ok

By: CODER

Note: Verified RunnerRunRepository refactor: task-run, task-run-lifecycle, and task-run-inspect now load bundle/state/events through repository APIs; codex/custom adapters use the same repository seam for state/event persistence; targeted runner regressions and core/agentplane builds passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-27T09:39:35.460Z, excerpt_hash=sha256:f4dfe9d14b0117e99ba37c647c2e47554f575b8ffdd1d88fa645cc0191bf4916

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
