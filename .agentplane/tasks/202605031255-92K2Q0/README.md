---
id: "202605031255-92K2Q0"
title: "Migrate config CLI and init to WORKFLOW.md only"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605031255-XM1W31"
tags:
  - "cli"
  - "code"
  - "config"
verify:
  - "agentplane doctor"
  - "agentplane init --help"
  - "bun test packages/agentplane/src/cli packages/core/src/config"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T12:57:57.078Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T13:28:30.498Z"
  updated_by: "CODER"
  note: "config set/mode/profile now save WORKFLOW.md; init resolves WORKFLOW.md as the setup artifact; tests updated for WORKFLOW-only config writes."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Migrated config CLI and init paths so writes target WORKFLOW.md and init conflicts use WORKFLOW.md."
events:
  -
    type: "status"
    at: "2026-05-03T13:28:30.133Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Migrated config CLI and init paths so writes target WORKFLOW.md and init conflicts use WORKFLOW.md."
  -
    type: "verify"
    at: "2026-05-03T13:28:30.498Z"
    author: "CODER"
    state: "ok"
    note: "config set/mode/profile now save WORKFLOW.md; init resolves WORKFLOW.md as the setup artifact; tests updated for WORKFLOW-only config writes."
doc_version: 3
doc_updated_at: "2026-05-03T13:28:30.501Z"
doc_updated_by: "CODER"
description: "Update init, config show, config set, upgrade, doctor, and generated docs so migrated configuration keys are read and written through WORKFLOW.md v2. config set must patch managed YAML front matter, preserve Markdown body, and stop writing .agentplane/config.json for new repositories."
sections:
  Summary: |-
    Migrate config CLI and init to WORKFLOW.md only
    
    Update init, config show, config set, upgrade, doctor, and generated docs so migrated configuration keys are read and written through WORKFLOW.md v2. config set must patch managed YAML front matter, preserve Markdown body, and stop writing .agentplane/config.json for new repositories.
  Scope: |-
    - In scope: Update init, config show, config set, upgrade, doctor, and generated docs so migrated configuration keys are read and written through WORKFLOW.md v2. config set must patch managed YAML front matter, preserve Markdown body, and stop writing .agentplane/config.json for new repositories.
    - Out of scope: unrelated refactors not required for "Migrate config CLI and init to WORKFLOW.md only".
  Plan: "Migrate CLI write/read surfaces to WORKFLOW.md. config show must report resolved workflow-backed state; config set must patch managed YAML front matter; init and upgrade must stop creating config.json for migrated repositories. Acceptance: new repo init is WORKFLOW-only and legacy repositories receive deterministic migration guidance."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/cli packages/core/src/config`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `agentplane init --help`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T13:28:30.498Z — VERIFY — ok
    
    By: CODER
    
    Note: config set/mode/profile now save WORKFLOW.md; init resolves WORKFLOW.md as the setup artifact; tests updated for WORKFLOW-only config writes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:28:30.133Z, excerpt_hash=sha256:7c1b90ce8dd2f8b78e961ec22edfaff780a299d451196424a0bfc1e882f3aa92
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Migrate config CLI and init to WORKFLOW.md only

Update init, config show, config set, upgrade, doctor, and generated docs so migrated configuration keys are read and written through WORKFLOW.md v2. config set must patch managed YAML front matter, preserve Markdown body, and stop writing .agentplane/config.json for new repositories.

## Scope

- In scope: Update init, config show, config set, upgrade, doctor, and generated docs so migrated configuration keys are read and written through WORKFLOW.md v2. config set must patch managed YAML front matter, preserve Markdown body, and stop writing .agentplane/config.json for new repositories.
- Out of scope: unrelated refactors not required for "Migrate config CLI and init to WORKFLOW.md only".

## Plan

Migrate CLI write/read surfaces to WORKFLOW.md. config show must report resolved workflow-backed state; config set must patch managed YAML front matter; init and upgrade must stop creating config.json for migrated repositories. Acceptance: new repo init is WORKFLOW-only and legacy repositories receive deterministic migration guidance.

## Verify Steps

1. Run `bun test packages/agentplane/src/cli packages/core/src/config`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `agentplane init --help`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T13:28:30.498Z — VERIFY — ok

By: CODER

Note: config set/mode/profile now save WORKFLOW.md; init resolves WORKFLOW.md as the setup artifact; tests updated for WORKFLOW-only config writes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:28:30.133Z, excerpt_hash=sha256:7c1b90ce8dd2f8b78e961ec22edfaff780a299d451196424a0bfc1e882f3aa92

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
