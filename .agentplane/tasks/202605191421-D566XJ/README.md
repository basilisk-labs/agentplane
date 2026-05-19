---
id: "202605191421-D566XJ"
title: "Add deterministic evidence bundle commands"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "acr"
  - "code"
  - "trust"
verify:
  - "bun test packages/agentplane/src/commands/evidence/evidence.command.test.ts packages/agentplane/src/commands/acr/acr.command.test.ts"
  - "bun run --filter=agentplane typecheck"
  - "bun run docs:cli:check"
  - "bun run docs:ia:check"
  - "agentplane evidence bundle 202605191421-D566XJ"
  - "agentplane evidence verify 202605191421-D566XJ"
plan_approval:
  state: "approved"
  updated_at: "2026-05-19T14:22:15.293Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement deterministic evidence bundle and verification commands inside the task worktree, preserving the approved scope and excluding signing or preservation integrations."
events:
  -
    type: "status"
    at: "2026-05-19T14:23:12.271Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement deterministic evidence bundle and verification commands inside the task worktree, preserving the approved scope and excluding signing or preservation integrations."
doc_version: 3
doc_updated_at: "2026-05-19T14:23:12.271Z"
doc_updated_by: "CODER"
description: "Implement a deterministic evidence bundle and verification CLI surface, with ACR trust extension metadata for generated bundles. Scope excludes Sigstore signing, S3 Object Lock preservation, and capability proposal flows."
sections:
  Summary: |-
    Add deterministic evidence bundle commands

    Implement a deterministic evidence bundle and verification CLI surface, with ACR trust extension metadata for generated bundles. Scope excludes Sigstore signing, S3 Object Lock preservation, and capability proposal flows.
  Scope: |-
    - In scope: Implement a deterministic evidence bundle and verification CLI surface, with ACR trust extension metadata for generated bundles. Scope excludes Sigstore signing, S3 Object Lock preservation, and capability proposal flows.
    - Out of scope: unrelated refactors not required for "Add deterministic evidence bundle commands".
  Plan: "Implement the deterministic evidence bundle MVP in the AgentPlane framework repo. Scope: add an evidence CLI group with bundle and verify subcommands; create stable manifest/digest generation for task README, task ACR, blueprint snapshot when present, and selected task-local evidence; add ACR trust extension metadata when a task-local bundle manifest exists; add focused unit tests and command specs; update user/reference docs for the new commands. Non-goals: Sigstore signing, S3 Object Lock preservation, OpenSSF workflow changes, capability proposal flow."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Add deterministic evidence bundle commands

Implement a deterministic evidence bundle and verification CLI surface, with ACR trust extension metadata for generated bundles. Scope excludes Sigstore signing, S3 Object Lock preservation, and capability proposal flows.

## Scope

- In scope: Implement a deterministic evidence bundle and verification CLI surface, with ACR trust extension metadata for generated bundles. Scope excludes Sigstore signing, S3 Object Lock preservation, and capability proposal flows.
- Out of scope: unrelated refactors not required for "Add deterministic evidence bundle commands".

## Plan

Implement the deterministic evidence bundle MVP in the AgentPlane framework repo. Scope: add an evidence CLI group with bundle and verify subcommands; create stable manifest/digest generation for task README, task ACR, blueprint snapshot when present, and selected task-local evidence; add ACR trust extension metadata when a task-local bundle manifest exists; add focused unit tests and command specs; update user/reference docs for the new commands. Non-goals: Sigstore signing, S3 Object Lock preservation, OpenSSF workflow changes, capability proposal flow.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
