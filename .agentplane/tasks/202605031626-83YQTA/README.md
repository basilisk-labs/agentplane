---
id: "202605031626-83YQTA"
title: "Automatic ACR export on finish"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605031626-EQYR7H"
tags:
  - "code"
  - "lifecycle"
verify:
  - "agentplane finish --help"
  - "bun test packages/agentplane/src/commands/task packages/agentplane/src/commands/acr packages/core/src/config"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T16:28:20.404Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T17:21:43.676Z"
  updated_by: "CODER"
  note: "Command: agentplane finish --help. Result: pass. Evidence: help exposes --no-write-acr and finish options. Scope: finish integration surface. Command: bun run --filter=agentplane typecheck. Result: pass. Evidence: typecheck exited 0. Scope: finish-execute imports and noWriteAcr plumbing. Command: node packages/agentplane/dist/cli.js acr generate 202605031625-886KZ6 --work-commit HEAD --write --refresh --json. Result: pass. Evidence: task-local acr.json refreshed successfully. Scope: shared writer used by automatic finish export."
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
    at: "2026-05-03T17:12:02.982Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement this ACR v0.1 scope inside the approved batch worktree and verify it with the shared ACR CLI, schema, docs, and lifecycle checks."
  -
    type: "verify"
    at: "2026-05-03T17:21:43.676Z"
    author: "CODER"
    state: "ok"
    note: "Command: agentplane finish --help. Result: pass. Evidence: help exposes --no-write-acr and finish options. Scope: finish integration surface. Command: bun run --filter=agentplane typecheck. Result: pass. Evidence: typecheck exited 0. Scope: finish-execute imports and noWriteAcr plumbing. Command: node packages/agentplane/dist/cli.js acr generate 202605031625-886KZ6 --work-commit HEAD --write --refresh --json. Result: pass. Evidence: task-local acr.json refreshed successfully. Scope: shared writer used by automatic finish export."
  -
    type: "status"
    at: "2026-05-03T18:07:56.992Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #843 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-03T18:07:56.993Z"
doc_updated_by: "INTEGRATOR"
description: "Integrate ACR generation into agentplane finish so successful finish automatically refreshes .agentplane/tasks/<task-id>/acr.json when acr.write_on_finish is enabled. Add config defaults, --no-write-acr escape hatch, and preserve work_commit semantics from --commit."
sections:
  Summary: |-
    Automatic ACR export on finish
    
    Integrate ACR generation into agentplane finish so successful finish automatically refreshes .agentplane/tasks/<task-id>/acr.json when acr.write_on_finish is enabled. Add config defaults, --no-write-acr escape hatch, and preserve work_commit semantics from --commit.
  Scope: |-
    - In scope: Integrate ACR generation into agentplane finish so successful finish automatically refreshes .agentplane/tasks/<task-id>/acr.json when acr.write_on_finish is enabled. Add config defaults, --no-write-acr escape hatch, and preserve work_commit semantics from --commit.
    - Out of scope: unrelated refactors not required for "Automatic ACR export on finish".
  Plan: "Plan: (1) Extend config schema with acr.enabled, acr.version, acr.write_on_finish, acr.require_for_pr_check, acr.default_validation_mode, acr.include_prompts=false, and acr.include_tool_outputs=false. (2) Integrate automatic ACR refresh into successful finish when enabled. (3) Add --no-write-acr as the escape hatch and preserve --commit as repository.work_commit. (4) Ensure automatic export does not make ACR mandatory unless require_for_pr_check is enabled. Verify with finish lifecycle tests and config schema checks."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/task packages/agentplane/src/commands/acr packages/core/src/config`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `agentplane finish --help`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T17:21:43.676Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: agentplane finish --help. Result: pass. Evidence: help exposes --no-write-acr and finish options. Scope: finish integration surface. Command: bun run --filter=agentplane typecheck. Result: pass. Evidence: typecheck exited 0. Scope: finish-execute imports and noWriteAcr plumbing. Command: node packages/agentplane/dist/cli.js acr generate 202605031625-886KZ6 --work-commit HEAD --write --refresh --json. Result: pass. Evidence: task-local acr.json refreshed successfully. Scope: shared writer used by automatic finish export.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:12:02.982Z, excerpt_hash=sha256:6052c207b7d3398893733ed409a959b6925d512370fb016a451c07e243919ac5
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Automatic ACR export on finish

Integrate ACR generation into agentplane finish so successful finish automatically refreshes .agentplane/tasks/<task-id>/acr.json when acr.write_on_finish is enabled. Add config defaults, --no-write-acr escape hatch, and preserve work_commit semantics from --commit.

## Scope

- In scope: Integrate ACR generation into agentplane finish so successful finish automatically refreshes .agentplane/tasks/<task-id>/acr.json when acr.write_on_finish is enabled. Add config defaults, --no-write-acr escape hatch, and preserve work_commit semantics from --commit.
- Out of scope: unrelated refactors not required for "Automatic ACR export on finish".

## Plan

Plan: (1) Extend config schema with acr.enabled, acr.version, acr.write_on_finish, acr.require_for_pr_check, acr.default_validation_mode, acr.include_prompts=false, and acr.include_tool_outputs=false. (2) Integrate automatic ACR refresh into successful finish when enabled. (3) Add --no-write-acr as the escape hatch and preserve --commit as repository.work_commit. (4) Ensure automatic export does not make ACR mandatory unless require_for_pr_check is enabled. Verify with finish lifecycle tests and config schema checks.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/task packages/agentplane/src/commands/acr packages/core/src/config`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `agentplane finish --help`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T17:21:43.676Z — VERIFY — ok

By: CODER

Note: Command: agentplane finish --help. Result: pass. Evidence: help exposes --no-write-acr and finish options. Scope: finish integration surface. Command: bun run --filter=agentplane typecheck. Result: pass. Evidence: typecheck exited 0. Scope: finish-execute imports and noWriteAcr plumbing. Command: node packages/agentplane/dist/cli.js acr generate 202605031625-886KZ6 --work-commit HEAD --write --refresh --json. Result: pass. Evidence: task-local acr.json refreshed successfully. Scope: shared writer used by automatic finish export.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:12:02.982Z, excerpt_hash=sha256:6052c207b7d3398893733ed409a959b6925d512370fb016a451c07e243919ac5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
