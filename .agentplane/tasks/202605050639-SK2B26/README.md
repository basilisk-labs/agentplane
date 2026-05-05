---
id: "202605050639-SK2B26"
title: "Separate task README canonical state from contextual prose"
result_summary: "Made frontmatter sections the canonical task state while keeping Markdown body as non-duplicating contextual prose and preserving API render-projection compatibility."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T06:46:44.819Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T07:33:38.363Z"
  updated_by: "CODER"
  note: "Focused task README, task store, local backend, doc command, migrate-doc, mutation parity, ESLint, Prettier, and routing checks passed."
commit:
  hash: "8e4cb5236ca4b0da14397d019c8401498c554514"
  message: "🔀 SK2B26 integrate: Separate README state from context"
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved task README context-layer contract in its dedicated branch_pr worktree, with canonical workflow fields separated from non-duplicating contextual prose."
  -
    author: "INTEGRATOR"
    body: "Verified: merged task README state/context separation into main after focused README, store, local backend, doc command, migrate-doc, mutation parity, lint, format, routing, PR artifact, and bootstrap checks."
events:
  -
    type: "status"
    at: "2026-05-05T06:47:03.201Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved task README context-layer contract in its dedicated branch_pr worktree, with canonical workflow fields separated from non-duplicating contextual prose."
  -
    type: "verify"
    at: "2026-05-05T07:33:38.363Z"
    author: "CODER"
    state: "ok"
    note: "Focused task README, task store, local backend, doc command, migrate-doc, mutation parity, ESLint, Prettier, and routing checks passed."
  -
    type: "status"
    at: "2026-05-05T07:36:33.527Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: merged task README state/context separation into main after focused README, store, local backend, doc command, migrate-doc, mutation parity, lint, format, routing, PR artifact, and bootstrap checks."
doc_version: 3
doc_updated_at: "2026-05-05T07:36:33.528Z"
doc_updated_by: "INTEGRATOR"
description: "Optimize task README storage by separating canonical lifecycle/task state from contextual prose. Keep frontmatter and structured sections as the machine-readable source of truth for workflow gates, and make the Markdown body a non-duplicating contextual layer for rationale, tradeoffs, references, examples, and migration notes."
sections:
  Summary: |-
    Make task README sections the canonical doc store
    
    Optimize task README storage by making frontmatter sections the single canonical task document store and treating the markdown body as a rendered compatibility projection. Keep a migration path for existing README files and preserve readable Git diffs.
  Scope: |-
    - In scope: Define a two-layer README contract for task artifacts: frontmatter/structured sections remain canonical for workflow gates, while Markdown body becomes a non-duplicating contextual layer for rationale, tradeoffs, references, examples, and migration notes.
    - In scope: Define compatibility and drift behavior for existing README files that currently duplicate sections in both YAML and Markdown body.
    - Out of scope: Bulk-rewriting the historical task archive unless a separate migration task explicitly approves it.
    - Out of scope: Removing human-readable task context from GitHub entirely.
  Plan: |-
    1. Define the task README v3+ layering contract: canonical machine-readable lifecycle/task fields in frontmatter, canonical workflow-gated task sections in structured data, and Markdown body as non-duplicating contextual prose.
    2. Replace generated body duplication with contextual-body semantics: rationale, tradeoffs, references, examples, migration notes, and reviewer guidance.
    3. Preserve backward-compatible reads for legacy README files that have body-only content or duplicated section/body content.
    4. Add drift detection that distinguishes stale generated duplicates from intentional contextual body content.
    5. Update normalize/migration behavior so historical task archives are not mass-rewritten unless explicitly requested.
    6. Add round-trip, legacy-read, contextual-body preservation, and drift-detection tests.
    7. Verify focused task README tests, task lifecycle tests, typecheck, agentplane doctor, and policy routing.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T07:33:38.363Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused task README, task store, local backend, doc command, migrate-doc, mutation parity, ESLint, Prettier, and routing checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T06:47:03.201Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make task README sections the canonical doc store

Optimize task README storage by making frontmatter sections the single canonical task document store and treating the markdown body as a rendered compatibility projection. Keep a migration path for existing README files and preserve readable Git diffs.

## Scope

- In scope: Define a two-layer README contract for task artifacts: frontmatter/structured sections remain canonical for workflow gates, while Markdown body becomes a non-duplicating contextual layer for rationale, tradeoffs, references, examples, and migration notes.
- In scope: Define compatibility and drift behavior for existing README files that currently duplicate sections in both YAML and Markdown body.
- Out of scope: Bulk-rewriting the historical task archive unless a separate migration task explicitly approves it.
- Out of scope: Removing human-readable task context from GitHub entirely.

## Plan

1. Define the task README v3+ layering contract: canonical machine-readable lifecycle/task fields in frontmatter, canonical workflow-gated task sections in structured data, and Markdown body as non-duplicating contextual prose.
2. Replace generated body duplication with contextual-body semantics: rationale, tradeoffs, references, examples, migration notes, and reviewer guidance.
3. Preserve backward-compatible reads for legacy README files that have body-only content or duplicated section/body content.
4. Add drift detection that distinguishes stale generated duplicates from intentional contextual body content.
5. Update normalize/migration behavior so historical task archives are not mass-rewritten unless explicitly requested.
6. Add round-trip, legacy-read, contextual-body preservation, and drift-detection tests.
7. Verify focused task README tests, task lifecycle tests, typecheck, agentplane doctor, and policy routing.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T07:33:38.363Z — VERIFY — ok

By: CODER

Note: Focused task README, task store, local backend, doc command, migrate-doc, mutation parity, ESLint, Prettier, and routing checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T06:47:03.201Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
