---
id: "202605081639-QC8PWY"
title: "Add specialized built-in blueprint definitions"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "code"
  - "performance"
  - "runner"
  - "testing"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun test packages/agentplane/src/blueprints"
  - "node .agentplane/policy/check-routing.mjs"
  - "node packages/agentplane/bin/agentplane.js doctor"
plan_approval:
  state: "approved"
  updated_at: "2026-05-08T16:41:01.435Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing the batch in one primary branch_pr worktree because built-in definitions, resolver selection, CLI intake, tests, and docs share the same blueprint contract surface."
events:
  -
    type: "status"
    at: "2026-05-08T16:41:50.050Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing the batch in one primary branch_pr worktree because built-in definitions, resolver selection, CLI intake, tests, and docs share the same blueprint contract surface."
doc_version: 3
doc_updated_at: "2026-05-08T16:41:50.055Z"
doc_updated_by: "CODER"
description: "Add built-in blueprint definitions for performance.benchmark, quality.regression, and runner.execution with required evidence and stop rules."
sections:
  Summary: |-
    Add specialized built-in blueprint definitions
    
    Add built-in blueprint definitions for performance.benchmark, quality.regression, and runner.execution with required evidence and stop rules.
  Scope: |-
    - In scope: Add built-in blueprint definitions for performance.benchmark, quality.regression, and runner.execution with required evidence and stop rules.
    - Out of scope: unrelated refactors not required for "Add specialized built-in blueprint definitions".
  Plan: "Add the three specialized built-in blueprint definitions to the core registry model and builtins catalog. Acceptance: ids are first-class built-in ids, definitions validate, required evidence captures benchmark/regression/runner-specific proof, and existing generic routes remain unchanged."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/blueprints`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `node packages/agentplane/bin/agentplane.js doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
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
