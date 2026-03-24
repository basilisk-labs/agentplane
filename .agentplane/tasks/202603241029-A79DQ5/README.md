---
id: "202603241029-A79DQ5"
title: "Document runner inspection and debugging workflow"
result_summary: "Runner inspection and debugging docs now cover show/trace/tail usage, timeout and policy-refusal interpretation, and the live smoke harness."
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202603241029-A28MVW"
  - "202603241029-4RY25C"
  - "202603241029-FETWEZ"
tags:
  - "docs"
  - "runner"
  - "cli"
  - "traces"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T12:22:46.499Z"
  updated_by: "ORCHESTRATOR"
  note: "Runner inspection and debugging docs scope approved for user and developer surfaces."
verification:
  state: "ok"
  updated_at: "2026-03-24T12:25:47.551Z"
  updated_by: "DOCS"
  note: "Command: node .agentplane/policy/check-routing.mjs | AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor | bunx prettier --check docs/user/commands.mdx docs/developer/recipes-spec.mdx | rg -n 'task run show|task run trace|task run tail|runner:codex:smoke|timeout_reason|policy_refusal' docs/user/commands.mdx docs/developer/recipes-spec.mdx; Result: pass; Evidence: routing check returned OK, doctor returned OK with repo-local runtime info only, prettier reported both touched docs formatted, and grep confirmed the new inspection workflow covers show/trace/tail, timeout interpretation, policy refusal, and the live Codex smoke harness; Scope: docs/user/commands.mdx, docs/developer/recipes-spec.mdx, .agentplane/tasks/202603241029-A79DQ5; Links: docs/user/commands.mdx, docs/developer/recipes-spec.mdx."
commit:
  hash: "60e20a11b328e2e391e12baa46d7c8f84ca15c3d"
  message: "✅ A79DQ5 docs: done"
comments:
  -
    author: "DOCS"
    body: "Start: document the shipped runner inspection workflow for show, trace, and tail after confirming the current runtime behavior and keep the docs diff limited to the selected user and developer surfaces."
  -
    author: "DOCS"
    body: "Verified: documented the shipped runner inspection workflow for task run show, trace, and tail, including timeout interpretation, policy refusal debugging, and the live Codex smoke harness entrypoint."
events:
  -
    type: "verify"
    at: "2026-03-24T12:24:22.547Z"
    author: "DOCS"
    state: "ok"
    note: "Command: node .agentplane/policy/check-routing.mjs | AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor | bunx prettier --check docs/user/commands.mdx docs/developer/recipes-spec.mdx | rg -n 'task run show|task run trace|task run tail|runner:codex:smoke|timeout_reason|policy_refusal' docs/user/commands.mdx docs/developer/recipes-spec.mdx; Result: pass; Evidence: routing check returned OK, doctor returned OK with repo-local runtime info only, prettier reported both touched docs formatted, and grep confirmed the new inspection workflow covers show/trace/tail, timeout interpretation, policy refusal, and the live Codex smoke harness; Scope: docs/user/commands.mdx, docs/developer/recipes-spec.mdx, .agentplane/tasks/202603241029-A79DQ5; Links: docs/user/commands.mdx, docs/developer/recipes-spec.mdx."
  -
    type: "status"
    at: "2026-03-24T12:25:37.505Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: document the shipped runner inspection workflow for show, trace, and tail after confirming the current runtime behavior and keep the docs diff limited to the selected user and developer surfaces."
  -
    type: "verify"
    at: "2026-03-24T12:25:47.551Z"
    author: "DOCS"
    state: "ok"
    note: "Command: node .agentplane/policy/check-routing.mjs | AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor | bunx prettier --check docs/user/commands.mdx docs/developer/recipes-spec.mdx | rg -n 'task run show|task run trace|task run tail|runner:codex:smoke|timeout_reason|policy_refusal' docs/user/commands.mdx docs/developer/recipes-spec.mdx; Result: pass; Evidence: routing check returned OK, doctor returned OK with repo-local runtime info only, prettier reported both touched docs formatted, and grep confirmed the new inspection workflow covers show/trace/tail, timeout interpretation, policy refusal, and the live Codex smoke harness; Scope: docs/user/commands.mdx, docs/developer/recipes-spec.mdx, .agentplane/tasks/202603241029-A79DQ5; Links: docs/user/commands.mdx, docs/developer/recipes-spec.mdx."
  -
    type: "status"
    at: "2026-03-24T12:26:04.491Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: documented the shipped runner inspection workflow for task run show, trace, and tail, including timeout interpretation, policy refusal debugging, and the live Codex smoke harness entrypoint."
doc_version: 3
doc_updated_at: "2026-03-24T12:26:04.492Z"
doc_updated_by: "DOCS"
description: "Document how to inspect run state, read raw trace, understand timeout causes, and interpret enforcement metadata using the shipped runner CLI surfaces."
sections:
  Summary: |-
    Document runner inspection and debugging workflow
    
    Document how to inspect run state, read raw trace, understand timeout causes, and interpret enforcement metadata using the shipped runner CLI surfaces.
  Scope: |-
    - In scope: Document how to inspect run state, read raw trace, understand timeout causes, and interpret enforcement metadata using the shipped runner CLI surfaces.
    - Out of scope: unrelated refactors not required for "Document runner inspection and debugging workflow".
  Plan: "1. Inspect the shipped runner inspection surfaces and current docs coverage for show/trace/tail, timeout classification, and policy refusal metadata. 2. Update user-facing commands docs with a compact debugging workflow for task run show, task run trace, and task run tail. 3. Update developer runner/recipe docs with artifact layering, timeout/refusal interpretation, and the rule that task-facing summaries stay separate from raw trace. 4. Run docs verification commands, record evidence, and finish with a single docs-only commit."
  Verify Steps: |-
    1. Inspect docs/user/commands.mdx. Expected: it documents task run show/trace/tail and explains how to interpret timeout_reason and policy_refusal without reading source files.
    2. Inspect docs/developer/recipes-spec.mdx. Expected: it documents control artifacts vs raw trace, plus a step-by-step runner inspection workflow and the live Codex smoke harness entrypoint.
    3. Run node .agentplane/policy/check-routing.mjs, AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor, and bunx prettier --check docs/user/commands.mdx docs/developer/recipes-spec.mdx. Expected: all pass without routing drift or formatting regressions.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T12:24:22.547Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: node .agentplane/policy/check-routing.mjs | AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor | bunx prettier --check docs/user/commands.mdx docs/developer/recipes-spec.mdx | rg -n 'task run show|task run trace|task run tail|runner:codex:smoke|timeout_reason|policy_refusal' docs/user/commands.mdx docs/developer/recipes-spec.mdx; Result: pass; Evidence: routing check returned OK, doctor returned OK with repo-local runtime info only, prettier reported both touched docs formatted, and grep confirmed the new inspection workflow covers show/trace/tail, timeout interpretation, policy refusal, and the live Codex smoke harness; Scope: docs/user/commands.mdx, docs/developer/recipes-spec.mdx, .agentplane/tasks/202603241029-A79DQ5; Links: docs/user/commands.mdx, docs/developer/recipes-spec.mdx.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T12:22:46.490Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100
    
    #### 2026-03-24T12:25:47.551Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: node .agentplane/policy/check-routing.mjs | AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor | bunx prettier --check docs/user/commands.mdx docs/developer/recipes-spec.mdx | rg -n 'task run show|task run trace|task run tail|runner:codex:smoke|timeout_reason|policy_refusal' docs/user/commands.mdx docs/developer/recipes-spec.mdx; Result: pass; Evidence: routing check returned OK, doctor returned OK with repo-local runtime info only, prettier reported both touched docs formatted, and grep confirmed the new inspection workflow covers show/trace/tail, timeout interpretation, policy refusal, and the live Codex smoke harness; Scope: docs/user/commands.mdx, docs/developer/recipes-spec.mdx, .agentplane/tasks/202603241029-A79DQ5; Links: docs/user/commands.mdx, docs/developer/recipes-spec.mdx.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T12:25:37.506Z, excerpt_hash=sha256:7838377c7c532aadf8a59a2f7d85ba73787acfad7f2d4ea74c7dcbdcdac61a7c
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Document runner inspection and debugging workflow

Document how to inspect run state, read raw trace, understand timeout causes, and interpret enforcement metadata using the shipped runner CLI surfaces.

## Scope

- In scope: Document how to inspect run state, read raw trace, understand timeout causes, and interpret enforcement metadata using the shipped runner CLI surfaces.
- Out of scope: unrelated refactors not required for "Document runner inspection and debugging workflow".

## Plan

1. Inspect the shipped runner inspection surfaces and current docs coverage for show/trace/tail, timeout classification, and policy refusal metadata. 2. Update user-facing commands docs with a compact debugging workflow for task run show, task run trace, and task run tail. 3. Update developer runner/recipe docs with artifact layering, timeout/refusal interpretation, and the rule that task-facing summaries stay separate from raw trace. 4. Run docs verification commands, record evidence, and finish with a single docs-only commit.

## Verify Steps

1. Inspect docs/user/commands.mdx. Expected: it documents task run show/trace/tail and explains how to interpret timeout_reason and policy_refusal without reading source files.
2. Inspect docs/developer/recipes-spec.mdx. Expected: it documents control artifacts vs raw trace, plus a step-by-step runner inspection workflow and the live Codex smoke harness entrypoint.
3. Run node .agentplane/policy/check-routing.mjs, AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor, and bunx prettier --check docs/user/commands.mdx docs/developer/recipes-spec.mdx. Expected: all pass without routing drift or formatting regressions.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T12:24:22.547Z — VERIFY — ok

By: DOCS

Note: Command: node .agentplane/policy/check-routing.mjs | AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor | bunx prettier --check docs/user/commands.mdx docs/developer/recipes-spec.mdx | rg -n 'task run show|task run trace|task run tail|runner:codex:smoke|timeout_reason|policy_refusal' docs/user/commands.mdx docs/developer/recipes-spec.mdx; Result: pass; Evidence: routing check returned OK, doctor returned OK with repo-local runtime info only, prettier reported both touched docs formatted, and grep confirmed the new inspection workflow covers show/trace/tail, timeout interpretation, policy refusal, and the live Codex smoke harness; Scope: docs/user/commands.mdx, docs/developer/recipes-spec.mdx, .agentplane/tasks/202603241029-A79DQ5; Links: docs/user/commands.mdx, docs/developer/recipes-spec.mdx.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T12:22:46.490Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

#### 2026-03-24T12:25:47.551Z — VERIFY — ok

By: DOCS

Note: Command: node .agentplane/policy/check-routing.mjs | AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor | bunx prettier --check docs/user/commands.mdx docs/developer/recipes-spec.mdx | rg -n 'task run show|task run trace|task run tail|runner:codex:smoke|timeout_reason|policy_refusal' docs/user/commands.mdx docs/developer/recipes-spec.mdx; Result: pass; Evidence: routing check returned OK, doctor returned OK with repo-local runtime info only, prettier reported both touched docs formatted, and grep confirmed the new inspection workflow covers show/trace/tail, timeout interpretation, policy refusal, and the live Codex smoke harness; Scope: docs/user/commands.mdx, docs/developer/recipes-spec.mdx, .agentplane/tasks/202603241029-A79DQ5; Links: docs/user/commands.mdx, docs/developer/recipes-spec.mdx.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T12:25:37.506Z, excerpt_hash=sha256:7838377c7c532aadf8a59a2f7d85ba73787acfad7f2d4ea74c7dcbdcdac61a7c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
