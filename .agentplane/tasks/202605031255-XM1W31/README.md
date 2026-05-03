---
id: "202605031255-XM1W31"
title: "Resolve project config from WORKFLOW.md v2"
result_summary: "Project config now resolves from WORKFLOW.md v2 with legacy config.json fallback only."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605031255-H9WWA0"
tags:
  - "code"
  - "config"
  - "workflow"
verify:
  - "agentplane config show"
  - "agentplane doctor"
  - "bun test packages/core/src/config packages/agentplane/src/workflow-runtime"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T12:57:48.861Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T13:28:29.910Z"
  updated_by: "CODER"
  note: "loadConfig now prefers WORKFLOW.md, maps v2 front matter to validated config shape, and falls back to legacy config.json only when WORKFLOW.md is absent."
commit:
  hash: "c02111e054b00ac06e7277733a65e88cbb557391"
  message: "✅ GV0N4K close: Merged via PR #814. (202605031255-GV0N4K) [config,docs,workflow] (#817)"
comments:
  -
    author: "CODER"
    body: "Start: Resolved project config from WORKFLOW.md v2 first, while preserving legacy config.json as import fallback only."
  -
    author: "CODER"
    body: "Verified: WORKFLOW-backed config resolution is merged through PR #814 and config show resolves from WORKFLOW.md."
events:
  -
    type: "status"
    at: "2026-05-03T13:28:29.513Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Resolved project config from WORKFLOW.md v2 first, while preserving legacy config.json as import fallback only."
  -
    type: "verify"
    at: "2026-05-03T13:28:29.910Z"
    author: "CODER"
    state: "ok"
    note: "loadConfig now prefers WORKFLOW.md, maps v2 front matter to validated config shape, and falls back to legacy config.json only when WORKFLOW.md is absent."
  -
    type: "status"
    at: "2026-05-03T13:40:40.411Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: WORKFLOW-backed config resolution is merged through PR #814 and config show resolves from WORKFLOW.md."
doc_version: 3
doc_updated_at: "2026-05-03T13:40:40.412Z"
doc_updated_by: "CODER"
description: "Replace config.json as the canonical config source by building internal ResolvedConfig from WORKFLOW.md v2. Keep only temporary compatibility reads for legacy repositories during migration, and fail on conflicting generated or legacy config state."
sections:
  Summary: |-
    Resolve project config from WORKFLOW.md v2

    Replace config.json as the canonical config source by building internal ResolvedConfig from WORKFLOW.md v2. Keep only temporary compatibility reads for legacy repositories during migration, and fail on conflicting generated or legacy config state.
  Scope: |-
    - In scope: Replace config.json as the canonical config source by building internal ResolvedConfig from WORKFLOW.md v2. Keep only temporary compatibility reads for legacy repositories during migration, and fail on conflicting generated or legacy config state.
    - Out of scope: unrelated refactors not required for "Resolve project config from WORKFLOW.md v2".
  Plan: "Build internal ResolvedConfig from WORKFLOW.md v2 and make config.json non-canonical. Keep a legacy import path only for old repositories. Acceptance: runtime commands consume resolved workflow-backed config, conflicts fail loudly, and tests cover missing/legacy/config-conflict cases."
  Verify Steps: |-
    1. Run `bun test packages/core/src/config packages/agentplane/src/workflow-runtime`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `agentplane config show`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T13:28:29.910Z — VERIFY — ok

    By: CODER

    Note: loadConfig now prefers WORKFLOW.md, maps v2 front matter to validated config shape, and falls back to legacy config.json only when WORKFLOW.md is absent.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:28:29.513Z, excerpt_hash=sha256:ebfb8ebafdd8667d3d958fd22811cde7efda6350316a9f2b10669ae64a760bc3

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Resolve project config from WORKFLOW.md v2

Replace config.json as the canonical config source by building internal ResolvedConfig from WORKFLOW.md v2. Keep only temporary compatibility reads for legacy repositories during migration, and fail on conflicting generated or legacy config state.

## Scope

- In scope: Replace config.json as the canonical config source by building internal ResolvedConfig from WORKFLOW.md v2. Keep only temporary compatibility reads for legacy repositories during migration, and fail on conflicting generated or legacy config state.
- Out of scope: unrelated refactors not required for "Resolve project config from WORKFLOW.md v2".

## Plan

Build internal ResolvedConfig from WORKFLOW.md v2 and make config.json non-canonical. Keep a legacy import path only for old repositories. Acceptance: runtime commands consume resolved workflow-backed config, conflicts fail loudly, and tests cover missing/legacy/config-conflict cases.

## Verify Steps

1. Run `bun test packages/core/src/config packages/agentplane/src/workflow-runtime`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `agentplane config show`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T13:28:29.910Z — VERIFY — ok

By: CODER

Note: loadConfig now prefers WORKFLOW.md, maps v2 front matter to validated config shape, and falls back to legacy config.json only when WORKFLOW.md is absent.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:28:29.513Z, excerpt_hash=sha256:ebfb8ebafdd8667d3d958fd22811cde7efda6350316a9f2b10669ae64a760bc3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
