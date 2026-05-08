---
id: "202605081639-QC8PWY"
title: "Add specialized built-in blueprint definitions"
result_summary: "Merged via PR #3480."
status: "DONE"
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
commit:
  hash: "e34e06fcde96ca3d57a80de0e9ba4b485a62ceb0"
  message: "Merge pull request #3480 from basilisk-labs/task/202605081639-QC8PWY/specialized-blueprints"
comments:
  -
    author: "CODER"
    body: "Start: Implementing the batch in one primary branch_pr worktree because built-in definitions, resolver selection, CLI intake, tests, and docs share the same blueprint contract surface."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3480 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-08T16:41:50.050Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing the batch in one primary branch_pr worktree because built-in definitions, resolver selection, CLI intake, tests, and docs share the same blueprint contract surface."
  -
    type: "status"
    at: "2026-05-08T18:18:41.599Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3480 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-08T18:18:41.606Z"
doc_updated_by: "INTEGRATOR"
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
