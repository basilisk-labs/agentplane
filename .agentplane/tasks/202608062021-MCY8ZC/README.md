---
id: "202608062021-MCY8ZC"
title: "Polish the external supervisor protocol and canonical task help"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "supervisor"
  - "ux"
  - "v0.7.5"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts"
  - "bun run docs:cli:check"
  - "bun run typecheck"
  - "bun run test:critical"
plan_approval:
  state: "approved"
  updated_at: "2026-08-06T20:25:49.745Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "auto"
  schema_version: 1
  selected_mode: "branch_pr"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement protocol polish in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-06T21:35:28.888Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement protocol polish in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-06T21:35:28.888Z"
doc_updated_by: "CODER"
description: "Return an exact result_path and structured resume_argv from task advance, expose a typed operator action at approval boundaries, make quickstart and role command guides supervisor-first, show the canonical new/active/advance/run/brief subset in compact task help, attribute explicit begin plans to a human source, and add an end-to-end branch_pr test that advances once from the base checkout and receives a worktree-bound WorkOrder without caller cwd changes."
sections:
  Summary: |-
    Polish the external supervisor protocol and canonical task help

    Return an exact result_path and structured resume_argv from task advance, expose a typed operator action at approval boundaries, show the canonical new/active/advance/run/brief subset in compact task help, attribute explicit begin plans to a human source, and add an end-to-end branch_pr test that advances once from the base checkout and receives a worktree-bound WorkOrder without caller cwd changes.
  Scope: |-
    - In scope: Return an exact result_path and structured resume_argv from task advance, expose a typed operator action at approval boundaries, show the canonical new/active/advance/run/brief subset in compact task help, attribute explicit begin plans to a human source, and add an end-to-end branch_pr test that advances once from the base checkout and receives a worktree-bound WorkOrder without caller cwd changes.
    - Out of scope: unrelated refactors not required for "Polish the external supervisor protocol and canonical task help".
  Plan: "1. Extend the external-agent packet with an exact result_path and structured resume_argv while preserving compatibility fields. 2. Return a typed, actionable operator boundary for approvals instead of a prose-only placeholder. 3. Rewrite runtime quickstart, role guidance, mode notes, and compact task help so normal agents see only task active, advance, run, and brief, while manual lifecycle commands remain forensic/operator-only behind help --all. 4. Correct explicit plan provenance in task begin with a human attribution or explicit plan-author contract. 5. Add an end-to-end branch_pr integration test starting task advance from the base checkout and asserting that automatic deterministic transitions produce a WorkOrder whose checkout, branch/head, writable roots, source manifest, and exchange paths all point to the created worktree without caller cwd changes. 6. Run critical compatibility and CLI documentation checks."
  Verify Steps: |-
    - bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
    - bun run docs:cli:check
    - bun run typecheck
    - bun run test:critical
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: task next-action advertised start-ready as executable while task readiness still rejected it because a dependency was open.
      Impact: The route packet violated its executable-command contract and forced the caller into a failed lifecycle command.
      Resolution: Cover dependency readiness in route/action parity and preserve foundational merge ordering as an integration gate rather than an implementation blocker.
      Promotion: incident-candidate
      Fixability: repo-fixable
extensions:
  workflow_route_baseline:
    start_head_sha: "0e1d30346d74b782d736e480700919077e532c5f"
    version: 1
id_source: "generated"
---
## Summary

Polish the external supervisor protocol and canonical task help

Return an exact result_path and structured resume_argv from task advance, expose a typed operator action at approval boundaries, show the canonical new/active/advance/run/brief subset in compact task help, attribute explicit begin plans to a human source, and add an end-to-end branch_pr test that advances once from the base checkout and receives a worktree-bound WorkOrder without caller cwd changes.

## Scope

- In scope: Return an exact result_path and structured resume_argv from task advance, expose a typed operator action at approval boundaries, show the canonical new/active/advance/run/brief subset in compact task help, attribute explicit begin plans to a human source, and add an end-to-end branch_pr test that advances once from the base checkout and receives a worktree-bound WorkOrder without caller cwd changes.
- Out of scope: unrelated refactors not required for "Polish the external supervisor protocol and canonical task help".

## Plan

1. Extend the external-agent packet with an exact result_path and structured resume_argv while preserving compatibility fields. 2. Return a typed, actionable operator boundary for approvals instead of a prose-only placeholder. 3. Rewrite runtime quickstart, role guidance, mode notes, and compact task help so normal agents see only task active, advance, run, and brief, while manual lifecycle commands remain forensic/operator-only behind help --all. 4. Correct explicit plan provenance in task begin with a human attribution or explicit plan-author contract. 5. Add an end-to-end branch_pr integration test starting task advance from the base checkout and asserting that automatic deterministic transitions produce a WorkOrder whose checkout, branch/head, writable roots, source manifest, and exchange paths all point to the created worktree without caller cwd changes. 6. Run critical compatibility and CLI documentation checks.

## Verify Steps

- bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
- bun run docs:cli:check
- bun run typecheck
- bun run test:critical

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: task next-action advertised start-ready as executable while task readiness still rejected it because a dependency was open.
  Impact: The route packet violated its executable-command contract and forced the caller into a failed lifecycle command.
  Resolution: Cover dependency readiness in route/action parity and preserve foundational merge ordering as an integration gate rather than an implementation blocker.
  Promotion: incident-candidate
  Fixability: repo-fixable
