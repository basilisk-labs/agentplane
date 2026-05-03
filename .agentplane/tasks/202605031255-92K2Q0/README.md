---
id: "202605031255-92K2Q0"
title: "Migrate config CLI and init to WORKFLOW.md only"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-03T12:57:02.812Z"
doc_updated_by: "PLANNER"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
