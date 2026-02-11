---
id: "202602101258-PND66F"
title: "T6: Align command-guide with AGENTS"
result_summary: "Quickstart/role guidance aligned with AGENTS"
risk_level: "low"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202602101258-0FC323"
tags:
  - "code"
  - "cli"
  - "docs"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-10T13:47:38.738Z"
  updated_by: "TESTER"
  note: "Verified: quickstart and role guide wording now defers workflow policy to AGENTS.md and clarifies ORCHESTRATOR tracking-task semantics; lint and tests passed."
commit:
  hash: "a9b682f73ada5f9dd0af6848579a746c1f4454fe"
  message: "🚧 PND66F cli: align quickstart with AGENTS"
comments:
  -
    author: "CODER"
    body: "Start: Adjust quickstart/role guide wording so command-guide output aligns with AGENTS.md policy and authority boundaries."
  -
    author: "CODER"
    body: "Verified: command-guide quickstart/role messaging matches AGENTS.md sources-of-truth ordering; tests passed (lint + command-guide test suite)."
events:
  -
    type: "status"
    at: "2026-02-10T13:45:30.452Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Adjust quickstart/role guide wording so command-guide output aligns with AGENTS.md policy and authority boundaries."
  -
    type: "verify"
    at: "2026-02-10T13:47:38.738Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: quickstart and role guide wording now defers workflow policy to AGENTS.md and clarifies ORCHESTRATOR tracking-task semantics; lint and tests passed."
  -
    type: "status"
    at: "2026-02-10T13:50:42.121Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: command-guide quickstart/role messaging matches AGENTS.md sources-of-truth ordering; tests passed (lint + command-guide test suite)."
doc_version: 2
doc_updated_at: "2026-02-10T13:50:42.121Z"
doc_updated_by: "CODER"
description: "Minimal updates to command-guide quickstart/ROLE_GUIDES so it does not conflict with AGENTS authority boundaries; add pointer to AGENTS.md."
id_source: "generated"
---
## Summary

Align command-guide quickstart and role guides with AGENTS.md policy (authority boundaries and source-of-truth semantics) with minimal edits.

## Scope

In scope: packages/agentplane/src/cli/command-guide.ts (renderQuickstart and ROLE_GUIDES for ORCHESTRATOR/PLANNER). Out of scope: agent JSON profiles (handled in earlier tasks) and role command behavior (handled in T5).

## Plan

1. Update renderQuickstart header language to state AGENTS.md is canonical for process and quickstart/role output is canonical for CLI syntax and artifacts. 2. Add an explicit pointer to AGENTS.md. 3. Review ORCHESTRATOR and PLANNER guide lines for any hints of incorrect task-creation authority; adjust wording minimally. 4. Run command-guide tests and help contract tests if needed.

## Risks

Risk: changing quickstart output requires updating tests/snapshots. Mitigation: keep changes minimal and update tests deterministically.

## Verify Steps

Commands:
- bun run test:agentplane packages/agentplane/src/cli/command-guide.test.ts
- bun run test:agentplane packages/agentplane/src/cli/help.all-commands.contract.test.ts
- bun run lint
Pass criteria:
- quickstart and role guides do not contradict AGENTS.md authority boundaries.
- tests and lint pass.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-10T13:47:38.738Z — VERIFY — ok

By: TESTER

Note: Verified: quickstart and role guide wording now defers workflow policy to AGENTS.md and clarifies ORCHESTRATOR tracking-task semantics; lint and tests passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-10T13:45:30.452Z, excerpt_hash=sha256:9f03fd882dafe06bd6bc69a61a11aeedaf98b40b395bac65f3fd10da8c0d04f7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert command-guide.ts changes and updated tests; re-run the same test commands.

## Context

AGENTS.md is the canonical process policy. command-guide.ts output is the second source of truth for users; it must not introduce conflicting rules about authority boundaries or policy ownership.
