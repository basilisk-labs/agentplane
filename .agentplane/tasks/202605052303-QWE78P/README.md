---
id: "202605052303-QWE78P"
title: "Validate blueprint plan policy budgets"
result_summary: "Merged via PR #955."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprint"
  - "recipes"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T23:03:42.909Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T23:12:30.006Z"
  updated_by: "CODER"
  note: "Implemented and tested blueprint plan policy budget validation."
commit:
  hash: "87a7923dc678d8f1f37803cc1a5fdcd46bdbad94"
  message: "Merge pull request #955 from basilisk-labs/task/202605052303-QWE78P/blueprint-plan-validation"
comments:
  -
    author: "CODER"
    body: "Start: implement blueprint plan validation layer in task worktree."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #955 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-05T23:04:25.946Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement blueprint plan validation layer in task worktree."
  -
    type: "verify"
    at: "2026-05-05T23:12:30.006Z"
    author: "CODER"
    state: "ok"
    note: "Implemented and tested blueprint plan policy budget validation."
  -
    type: "status"
    at: "2026-05-05T23:17:05.843Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #955 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-05T23:17:05.848Z"
doc_updated_by: "INTEGRATOR"
description: "Add validation that materialized blueprint plans do not report policy modules outside the selected blueprint contract or exceed context budget, without executing blueprint states."
sections:
  Summary: |-
    Validate blueprint plan policy budgets
    
    Add validation that materialized blueprint plans do not report policy modules outside the selected blueprint contract or exceed context budget, without executing blueprint states.
  Scope: |-
    - In scope: Add validation that materialized blueprint plans do not report policy modules outside the selected blueprint contract or exceed context budget, without executing blueprint states.
    - Out of scope: unrelated refactors not required for "Validate blueprint plan policy budgets".
  Plan: "1. Inspect current blueprint model, plan materialization, resolver, runner bundle, and tests. 2. Add validate-only checks that a materialized blueprint plan does not exceed contextBudget.maxPolicyModules and does not report policy modules outside the selected blueprint node/definition contract. 3. Add focused tests for valid and invalid policy budget cases. 4. Run targeted tests and required checks."
  Verify Steps: |-
    1. Review the requested outcome for "Validate blueprint plan policy budgets". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T23:12:30.006Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented and tested blueprint plan policy budget validation.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T23:04:25.946Z, excerpt_hash=sha256:2dc28a325c50fcf7dd9a89a08c5fd710ef0df297e6c403f5c47a50ecb6aef0eb
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun test packages/agentplane/src/blueprints/validate.test.ts packages/agentplane/src/cli/run-cli.core.blueprint.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-prepare.test.ts; Result: pass; Evidence: 29 pass, 0 fail, 149 expect calls. Scope: blueprint plan policy module budgets and runner bundle regressions.
      Impact: Materialized BlueprintPlanArtifact now rejects policyModules outside the selected blueprint contract and maxPolicyModules overruns.
      Resolution: Validation runs inside buildBlueprintPlanArtifact before plans are returned.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
