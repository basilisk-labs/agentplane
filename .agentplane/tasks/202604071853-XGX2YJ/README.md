---
id: "202604071853-XGX2YJ"
title: "Scope task normalize reconcile to selected task ids"
result_summary: "Merged via PR #130."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "github"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-07T18:53:17.498Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-07T19:41:15.063Z"
  updated_by: "CODER"
  note: "Command: bun run workflow:wait-remote-checks -- 130 --repo basilisk-labs/agentplane; Result: pass; Evidence: PR #130 required checks all green on the published head."
commit:
  hash: "5fd312cceb200917bdf8aaba9a5a59532c158252"
  message: "github/workflow: Scope task normalize reconcile to selected task ids (XGX2YJ) (#130)"
comments:
  -
    author: "CODER"
    body: "Start: add targeted task-id filters to task normalize reconcile modes so known branch_pr drift can be fixed without scanning unrelated historical PR artifacts."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #130 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-07T18:53:53.783Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add targeted task-id filters to task normalize reconcile modes so known branch_pr drift can be fixed without scanning unrelated historical PR artifacts."
  -
    type: "verify"
    at: "2026-04-07T19:12:28.838Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts; bun x eslint packages/agentplane/src/commands/task/normalize.command.ts packages/agentplane/src/commands/task/normalize.ts packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts; agentplane incidents collect 202604071853-XGX2YJ --check --json. Result: pass. Evidence: selected-task normalize reconcile tests passed and incidents collect promoted one registry entry. Scope: task normalize task-id scoping, targeted branch_pr reconcile, and incident promotion path."
  -
    type: "verify"
    at: "2026-04-07T19:41:15.063Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run workflow:wait-remote-checks -- 130 --repo basilisk-labs/agentplane; Result: pass; Evidence: PR #130 required checks all green on the published head."
  -
    type: "status"
    at: "2026-04-07T19:46:10.370Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #130 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-07T19:46:10.376Z"
doc_updated_by: "INTEGRATOR"
description: "Allow task normalize reconcile modes to target explicit task ids so operators can close known branch_pr drift without scanning unrelated historical PR artifacts or rewriting the whole task set."
sections:
  Summary: |-
    Scope task normalize reconcile to selected task ids
    
    Allow task normalize reconcile modes to target explicit task ids so operators can close known branch_pr drift without scanning unrelated historical PR artifacts or rewriting the whole task set.
  Scope: |-
    - In scope: Allow task normalize reconcile modes to target explicit task ids so operators can close known branch_pr drift without scanning unrelated historical PR artifacts or rewriting the whole task set.
    - Out of scope: unrelated refactors not required for "Scope task normalize reconcile to selected task ids".
  Plan: "1. Add repeatable task-id filters to task normalize reconcile modes so operators can limit hosted/local branch_pr sync to known targets. 2. Keep non-selected tasks untouched and cover the new scope in normalize regression tests. 3. Record the GitHub EOF/transport incident from hosted reconcile as a promotable task finding and verify incident registry promotion on finish."
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->
    
    1. <Action>. Expected: <observable result>.
    2. <Action>. Expected: <observable result>.
    3. <Action>. Expected: <observable result>.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-07T19:12:28.838Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun test packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts; bun x eslint packages/agentplane/src/commands/task/normalize.command.ts packages/agentplane/src/commands/task/normalize.ts packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts; agentplane incidents collect 202604071853-XGX2YJ --check --json. Result: pass. Evidence: selected-task normalize reconcile tests passed and incidents collect promoted one registry entry. Scope: task normalize task-id scoping, targeted branch_pr reconcile, and incident promotion path.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T19:07:37.478Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100
    
    ### 2026-04-07T19:41:15.063Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run workflow:wait-remote-checks -- 130 --repo basilisk-labs/agentplane; Result: pass; Evidence: PR #130 required checks all green on the published head.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T19:12:28.843Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: GitHub EOF or TLS transport failures during hosted branch_pr reconcile could abort task normalize before it reached the known stale task because the command scanned every candidate task.
      Impact: Operators could not deterministically reconcile a single known branch_pr drift; unrelated historical PR lookups blocked the whole run and left reusable recovery guidance trapped in task-local notes.
      Resolution: Add repeatable --task-id scoping to task normalize reconcile modes so operators can target the known task set and avoid unrelated GitHub lookups when transport is flaky.
      Promotion: incident-candidate
      Fixability: external
      IncidentScope: task normalize hosted reconcile target selection
      IncidentTags: workflow, github, transport, normalize
      IncidentMatch: task normalize, sync-hosted-merges, gh api EOF, GraphQL EOF
      IncidentAdvice: When GitHub transport is flaky, reconcile only the known task ids instead of scanning the full branch_pr history.
      IncidentRule: Hosted reconcile commands MUST support explicit task-id scoping so known drift can be resolved without depending on unrelated GitHub lookups.
id_source: "generated"
---
## Summary

Scope task normalize reconcile to selected task ids

Allow task normalize reconcile modes to target explicit task ids so operators can close known branch_pr drift without scanning unrelated historical PR artifacts or rewriting the whole task set.

## Scope

- In scope: Allow task normalize reconcile modes to target explicit task ids so operators can close known branch_pr drift without scanning unrelated historical PR artifacts or rewriting the whole task set.
- Out of scope: unrelated refactors not required for "Scope task normalize reconcile to selected task ids".

## Plan

1. Add repeatable task-id filters to task normalize reconcile modes so operators can limit hosted/local branch_pr sync to known targets. 2. Keep non-selected tasks untouched and cover the new scope in normalize regression tests. 3. Record the GitHub EOF/transport incident from hosted reconcile as a promotable task finding and verify incident registry promotion on finish.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-07T19:12:28.838Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts; bun x eslint packages/agentplane/src/commands/task/normalize.command.ts packages/agentplane/src/commands/task/normalize.ts packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts; agentplane incidents collect 202604071853-XGX2YJ --check --json. Result: pass. Evidence: selected-task normalize reconcile tests passed and incidents collect promoted one registry entry. Scope: task normalize task-id scoping, targeted branch_pr reconcile, and incident promotion path.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T19:07:37.478Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

### 2026-04-07T19:41:15.063Z — VERIFY — ok

By: CODER

Note: Command: bun run workflow:wait-remote-checks -- 130 --repo basilisk-labs/agentplane; Result: pass; Evidence: PR #130 required checks all green on the published head.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T19:12:28.843Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: GitHub EOF or TLS transport failures during hosted branch_pr reconcile could abort task normalize before it reached the known stale task because the command scanned every candidate task.
  Impact: Operators could not deterministically reconcile a single known branch_pr drift; unrelated historical PR lookups blocked the whole run and left reusable recovery guidance trapped in task-local notes.
  Resolution: Add repeatable --task-id scoping to task normalize reconcile modes so operators can target the known task set and avoid unrelated GitHub lookups when transport is flaky.
  Promotion: incident-candidate
  Fixability: external
  IncidentScope: task normalize hosted reconcile target selection
  IncidentTags: workflow, github, transport, normalize
  IncidentMatch: task normalize, sync-hosted-merges, gh api EOF, GraphQL EOF
  IncidentAdvice: When GitHub transport is flaky, reconcile only the known task ids instead of scanning the full branch_pr history.
  IncidentRule: Hosted reconcile commands MUST support explicit task-id scoping so known drift can be resolved without depending on unrelated GitHub lookups.
