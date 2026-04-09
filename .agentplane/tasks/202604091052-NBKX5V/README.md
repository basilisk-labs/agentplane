---
id: "202604091052-NBKX5V"
title: "Explain branch_pr incident collection locality and promotion requirements"
result_summary: "Merged via PR #171."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "incidents"
  - "ux"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T10:53:44.571Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T11:08:29.547Z"
  updated_by: "REVIEWER"
  note: "Command: bun test packages/agentplane/src/cli/run-cli.core.tasks.findings.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts; bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/commands/task/findings.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/cli/run-cli.core.tasks.findings.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts. Result: pass. Evidence: focused findings/incidents/branch_pr verify tests passed, including the new branch_pr locality case, and eslint exited 0 after narrowing generic messages to current checkout while keeping branch_pr-specific guidance in verify. Scope: incident promotion UX, findings add messaging, branch_pr verify locality explanation."
commit:
  hash: "a4ee212282a6c2b30b8039b230cc92a2403cbf11"
  message: "workflow/incidents: Explain branch_pr incident collection locality and promotion requirem... (NBKX5V) (#171)"
comments:
  -
    author: "CODER"
    body: "Start: clarify branch_pr incident locality and promotion semantics so operators know when incidents.md changes stay local and when promotion happens on base."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #171 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-09T11:00:58.744Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: clarify branch_pr incident locality and promotion semantics so operators know when incidents.md changes stay local and when promotion happens on base."
  -
    type: "verify"
    at: "2026-04-09T11:04:18.179Z"
    author: "CODER"
    state: "ok"
    note: "Incident messaging now distinguishes task-local findings from shared incidents.md promotion."
  -
    type: "verify"
    at: "2026-04-09T11:08:29.547Z"
    author: "REVIEWER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/cli/run-cli.core.tasks.findings.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts; bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/commands/task/findings.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/cli/run-cli.core.tasks.findings.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts. Result: pass. Evidence: focused findings/incidents/branch_pr verify tests passed, including the new branch_pr locality case, and eslint exited 0 after narrowing generic messages to current checkout while keeping branch_pr-specific guidance in verify. Scope: incident promotion UX, findings add messaging, branch_pr verify locality explanation."
  -
    type: "status"
    at: "2026-04-09T11:21:40.051Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #171 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-09T11:21:40.058Z"
doc_updated_by: "INTEGRATOR"
description: "Clarify branch_pr incident collection locality, promotion timing, and why plain findings or verify notes do not update .agentplane/policy/incidents.md."
sections:
  Summary: |-
    Explain branch_pr incident collection locality and promotion requirements
    
    Clarify branch_pr incident collection locality, promotion timing, and why plain findings or verify notes do not update `.agentplane/policy/incidents.md`.
  Scope: |-
    - In scope: improve CLI/operator guidance for `branch_pr` incident collection locality and promotion semantics.
    - Out of scope: unrelated workflow refactors or changes to the incident registry data model.
  Plan: "1. Reproduce the branch_pr incident collection and verify flows that currently imply incidents.md should update immediately on the task branch. 2. Update incident/verify messaging so branch-local effects and promotion requirements are explicit. 3. Lock the guidance with focused CLI regression tests."
  Verify Steps: |-
    1. Reproduce `branch_pr` incident collection from a task branch. Expected: output explicitly states when incident effects are local to the current worktree and when base `main` changes only after integrate or hosted-close.
    2. Reproduce the non-promotable findings path. Expected: output explicitly says that plain findings or verify notes do not update `incidents.md` and points at the structured Findings path.
    3. Run the focused incidents/CLI test slice plus lint on touched files. Expected: updated messaging is covered and no regressions appear in the touched UX path.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T11:04:18.179Z — VERIFY — ok
    
    By: CODER
    
    Note: Incident messaging now distinguishes task-local findings from shared incidents.md promotion.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T11:00:58.761Z, excerpt_hash=sha256:67d69cd475543b518e8ea2a6708a3181cfcc8ff52a0fab38122ce0024945f49c
    
    ### 2026-04-09T11:08:29.547Z — VERIFY — ok
    
    By: REVIEWER
    
    Note: Command: bun test packages/agentplane/src/cli/run-cli.core.tasks.findings.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts; bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/commands/task/findings.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/cli/run-cli.core.tasks.findings.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts. Result: pass. Evidence: focused findings/incidents/branch_pr verify tests passed, including the new branch_pr locality case, and eslint exited 0 after narrowing generic messages to current checkout while keeping branch_pr-specific guidance in verify. Scope: incident promotion UX, findings add messaging, branch_pr verify locality explanation.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T11:04:18.185Z, excerpt_hash=sha256:67d69cd475543b518e8ea2a6708a3181cfcc8ff52a0fab38122ce0024945f49c
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Explain branch_pr incident collection locality and promotion requirements

Clarify branch_pr incident collection locality, promotion timing, and why plain findings or verify notes do not update `.agentplane/policy/incidents.md`.

## Scope

- In scope: improve CLI/operator guidance for `branch_pr` incident collection locality and promotion semantics.
- Out of scope: unrelated workflow refactors or changes to the incident registry data model.

## Plan

1. Reproduce the branch_pr incident collection and verify flows that currently imply incidents.md should update immediately on the task branch. 2. Update incident/verify messaging so branch-local effects and promotion requirements are explicit. 3. Lock the guidance with focused CLI regression tests.

## Verify Steps

1. Reproduce `branch_pr` incident collection from a task branch. Expected: output explicitly states when incident effects are local to the current worktree and when base `main` changes only after integrate or hosted-close.
2. Reproduce the non-promotable findings path. Expected: output explicitly says that plain findings or verify notes do not update `incidents.md` and points at the structured Findings path.
3. Run the focused incidents/CLI test slice plus lint on touched files. Expected: updated messaging is covered and no regressions appear in the touched UX path.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T11:04:18.179Z — VERIFY — ok

By: CODER

Note: Incident messaging now distinguishes task-local findings from shared incidents.md promotion.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T11:00:58.761Z, excerpt_hash=sha256:67d69cd475543b518e8ea2a6708a3181cfcc8ff52a0fab38122ce0024945f49c

### 2026-04-09T11:08:29.547Z — VERIFY — ok

By: REVIEWER

Note: Command: bun test packages/agentplane/src/cli/run-cli.core.tasks.findings.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts; bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/commands/task/findings.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/cli/run-cli.core.tasks.findings.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts. Result: pass. Evidence: focused findings/incidents/branch_pr verify tests passed, including the new branch_pr locality case, and eslint exited 0 after narrowing generic messages to current checkout while keeping branch_pr-specific guidance in verify. Scope: incident promotion UX, findings add messaging, branch_pr verify locality explanation.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T11:04:18.185Z, excerpt_hash=sha256:67d69cd475543b518e8ea2a6708a3181cfcc8ff52a0fab38122ce0024945f49c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
