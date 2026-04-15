---
id: "202604150649-7N1Q4J"
title: "Enable exact-sha release recovery and block skipped patch planning"
result_summary: "Merged via PR #301."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-15T06:50:38.102Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-15T07:00:56.638Z"
  updated_by: "CODER"
  note: "Command: bun vitest run packages/agentplane/src/commands/release/ci-workflow-contract.test.ts packages/agentplane/src/commands/release/plan.test.ts; bun run framework:dev:bootstrap; agentplane doctor. Result: pass. Evidence: 5 targeted tests passed, framework bootstrap rebuilt repo-local runtime, doctor returned OK. Scope: .github/workflows/ci.yml, release planner guard, release workflow documentation."
commit:
  hash: "3f7791a57c59e49b2d46de5838c04001cb43d3e4"
  message: "release: Enable exact-sha release recovery and block skipped patch planning (7N1Q4J) (#301)"
comments:
  -
    author: "CODER"
    body: "Start: add exact-sha Core CI recovery support and stop release planning from skipping unpublished patch versions, then use the new path to restore v0.3.11."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #301 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-15T06:50:38.259Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add exact-sha Core CI recovery support and stop release planning from skipping unpublished patch versions, then use the new path to restore v0.3.11."
  -
    type: "verify"
    at: "2026-04-15T07:00:56.638Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun vitest run packages/agentplane/src/commands/release/ci-workflow-contract.test.ts packages/agentplane/src/commands/release/plan.test.ts; bun run framework:dev:bootstrap; agentplane doctor. Result: pass. Evidence: 5 targeted tests passed, framework bootstrap rebuilt repo-local runtime, doctor returned OK. Scope: .github/workflows/ci.yml, release planner guard, release workflow documentation."
  -
    type: "status"
    at: "2026-04-15T07:12:52.921Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #301 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-15T07:12:52.928Z"
doc_updated_by: "INTEGRATOR"
description: "Add Core CI workflow_dispatch support for exact release SHA recovery, make release-ready available for recovery runs, and make release planning stop when unpublished patch versions exist instead of skipping ahead."
sections:
  Summary: |-
    Enable exact-sha release recovery and block skipped patch planning
    
    Add Core CI workflow_dispatch support for exact release SHA recovery, make release-ready available for recovery runs, and make release planning stop when unpublished patch versions exist instead of skipping ahead.
  Scope: |-
    - In scope: Add Core CI workflow_dispatch support for exact release SHA recovery, make release-ready available for recovery runs, and make release planning stop when unpublished patch versions exist instead of skipping ahead.
    - Out of scope: unrelated refactors not required for "Enable exact-sha release recovery and block skipped patch planning".
  Plan: |-
    1. Add exact-sha workflow_dispatch support to Core CI and verify the release-ready artifact contract covers recovery runs without relaxing normal push and PR enforcement.
    2. Make release planning fail explicitly when the workspace version is ahead of the last published/tagged patch version, instead of proposing a skipped future patch.
    3. Validate the new recovery path and then use it to publish the missing v0.3.11 release from the correct historical SHA.
  Verify Steps: |-
    1. Review the requested outcome for "Enable exact-sha release recovery and block skipped patch planning". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-15T07:00:56.638Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun vitest run packages/agentplane/src/commands/release/ci-workflow-contract.test.ts packages/agentplane/src/commands/release/plan.test.ts; bun run framework:dev:bootstrap; agentplane doctor. Result: pass. Evidence: 5 targeted tests passed, framework bootstrap rebuilt repo-local runtime, doctor returned OK. Scope: .github/workflows/ci.yml, release planner guard, release workflow documentation.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T06:50:38.272Z, excerpt_hash=sha256:b294cbf98b2c9f281e35f0822810442d83da0eb755f5abb26bd48a6e6f6e6516
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Enable exact-sha release recovery and block skipped patch planning

Add Core CI workflow_dispatch support for exact release SHA recovery, make release-ready available for recovery runs, and make release planning stop when unpublished patch versions exist instead of skipping ahead.

## Scope

- In scope: Add Core CI workflow_dispatch support for exact release SHA recovery, make release-ready available for recovery runs, and make release planning stop when unpublished patch versions exist instead of skipping ahead.
- Out of scope: unrelated refactors not required for "Enable exact-sha release recovery and block skipped patch planning".

## Plan

1. Add exact-sha workflow_dispatch support to Core CI and verify the release-ready artifact contract covers recovery runs without relaxing normal push and PR enforcement.
2. Make release planning fail explicitly when the workspace version is ahead of the last published/tagged patch version, instead of proposing a skipped future patch.
3. Validate the new recovery path and then use it to publish the missing v0.3.11 release from the correct historical SHA.

## Verify Steps

1. Review the requested outcome for "Enable exact-sha release recovery and block skipped patch planning". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-15T07:00:56.638Z — VERIFY — ok

By: CODER

Note: Command: bun vitest run packages/agentplane/src/commands/release/ci-workflow-contract.test.ts packages/agentplane/src/commands/release/plan.test.ts; bun run framework:dev:bootstrap; agentplane doctor. Result: pass. Evidence: 5 targeted tests passed, framework bootstrap rebuilt repo-local runtime, doctor returned OK. Scope: .github/workflows/ci.yml, release planner guard, release workflow documentation.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T06:50:38.272Z, excerpt_hash=sha256:b294cbf98b2c9f281e35f0822810442d83da0eb755f5abb26bd48a6e6f6e6516

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
