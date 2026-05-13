---
id: "202602070956-RYPQJ5"
title: "Direct mode: legalize task branches"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
revision: 1
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T09:58:10.894Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved by USER in chat (2026-02-07)."
verification:
  state: "ok"
  updated_at: "2026-02-07T10:23:56.047Z"
  updated_by: "ORCHESTRATOR"
  note: "Tests: bun run test:cli:core"
  attempts: 0
commit:
  hash: "5c5fa722b95901e1c3f797e173cf65d666960465"
  message: "✅ RYPQJ5 workflow: allow task branches in direct mode"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Align direct-mode branch policy and CLI guidance with work start behavior; remove contradictions."
  -
    author: "ORCHESTRATOR"
    body: "Verified: bun run test:cli:core passed; direct mode policy/docs aligned with work start branch checkout; direct now rejects --worktree."
events:
  -
    type: "status"
    at: "2026-02-07T09:58:51.252Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Align direct-mode branch policy and CLI guidance with work start behavior; remove contradictions."
  -
    type: "verify"
    at: "2026-02-07T10:23:56.047Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Tests: bun run test:cli:core"
  -
    type: "status"
    at: "2026-02-07T10:25:10.635Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run test:cli:core passed; direct mode policy/docs aligned with work start branch checkout; direct now rejects --worktree."
doc_version: 3
doc_updated_at: "2026-02-07T10:25:10.635Z"
doc_updated_by: "ORCHESTRATOR"
description: "Align AGENTS.md and CLI guidance with actual direct-mode work start behavior (branch checkout without worktree). Remove policy/code contradiction; keep semantics explicit to reduce accidental branch switching."
sections:
  Summary: "Resolve the contradiction between AGENTS.md direct-mode policy and the actual agentplane work start behavior: legalize task branches in direct mode and align policy/CLI guidance with the code."
  Scope: |-
    - In scope: AGENTS.md direct mode rules; quickstart/role text that describes direct-mode work start; work start behavior in direct mode (docs/branch checkout); tests.
    - Out of scope: branch_pr workflow semantics; Redmine sync; release/publish.
  Plan: |-
    1) Check the actual agentplane work start behavior in direct mode (branch creation/checkout without a worktree) and the places where it is documented (AGENTS.md, quickstart, role output).
    2) Update policy (AGENTS.md) and CLI guidance (quickstart/role) so direct mode explicitly allows task branches without worktrees and describes constraints/expected behavior.
    3) If needed, make direct-mode work start semantics more explicit (no implicit checkout without an explicit flag) or at least align textual guidance with current behavior.
    4) Add/update tests for direct-mode behavior (work start + docs).
    5) Run local verification (unit tests) and record results in Verification.
  Verify Steps: |-
    1) Run pnpm test (or npm test if pnpm is not used).
    2) Additionally: node packages/agentplane/bin/agentplane.js --no-update-check task plan approve <id> should pass; direct-mode work start should match AGENTS.md/quickstart guidance.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-02-07T10:23:56.047Z — VERIFY — ok

    By: ORCHESTRATOR

    Note: Tests: bun run test:cli:core

    Details:

    - bun run test:cli:core (vitest): PASS\n- Checked policy/code alignment: direct mode allows task branches; --worktree is branch_pr-only.

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the commit created for this task through a normal git revert (or undo locally before committing).
    - Confirm that AGENTS.md/quickstart returned to the previous version and that work start behavior/tests match.
  Findings: ""
id_source: "generated"
---
## Summary

Resolve the contradiction between AGENTS.md direct-mode policy and the actual agentplane work start behavior: legalize task branches in direct mode and align policy/CLI guidance with the code.

## Scope

- In scope: AGENTS.md direct mode rules; quickstart/role text that describes direct-mode work start; work start behavior in direct mode (docs/branch checkout); tests.
- Out of scope: branch_pr workflow semantics; Redmine sync; release/publish.

## Plan

1) Check the actual agentplane work start behavior in direct mode (branch creation/checkout without a worktree) and the places where it is documented (AGENTS.md, quickstart, role output).
2) Update policy (AGENTS.md) and CLI guidance (quickstart/role) so direct mode explicitly allows task branches without worktrees and describes constraints/expected behavior.
3) If needed, make direct-mode work start semantics more explicit (no implicit checkout without an explicit flag) or at least align textual guidance with current behavior.
4) Add/update tests for direct-mode behavior (work start + docs).
5) Run local verification (unit tests) and record results in Verification.

## Verify Steps

1) Run pnpm test (or npm test if pnpm is not used).
2) Additionally: node packages/agentplane/bin/agentplane.js --no-update-check task plan approve <id> should pass; direct-mode work start should match AGENTS.md/quickstart guidance.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T10:23:56.047Z — VERIFY — ok

By: ORCHESTRATOR

Note: Tests: bun run test:cli:core

Details:

- bun run test:cli:core (vitest): PASS\n- Checked policy/code alignment: direct mode allows task branches; --worktree is branch_pr-only.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the commit created for this task through a normal git revert (or undo locally before committing).
- Confirm that AGENTS.md/quickstart returned to the previous version and that work start behavior/tests match.

## Findings

## Risks

- Risk 1: breaking change for users who expect implicit branch checkout in direct mode.
- Risk 2: a third source of truth may appear (help/quickstart/AGENTS.md) if not all places are updated.
- Risk 3: hidden network requests (update-check) during agentplane commands; reduce this with --no-update-check in verification/commands.
