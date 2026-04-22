---
id: "202604221442-K283A6"
title: "Document v0.4 prompt assembly migration"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "architecture"
  - "docs"
  - "recipes"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T14:42:59.515Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T14:43:54.442Z"
  updated_by: "DOCS"
  note: "Command: bunx prettier --check docs/user/breaking-changes.mdx | Result: pass | Evidence: All matched files use Prettier code style. | Scope: v0.4 prompt assembly breaking-change docs. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. | Scope: docs-only policy routing. Command: agentplane doctor | Result: pass | Evidence: doctor OK with 0 errors and 0 warnings; informational runtime/archive notes only. | Links: docs/user/breaking-changes.mdx, docs/developer/prompt-assembly-system.mdx"
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: add docs-only v0.4 prompt assembly migration guidance to the breaking changes page and verify with formatter, routing, and doctor checks."
events:
  -
    type: "status"
    at: "2026-04-22T14:43:04.368Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: add docs-only v0.4 prompt assembly migration guidance to the breaking changes page and verify with formatter, routing, and doctor checks."
  -
    type: "verify"
    at: "2026-04-22T14:43:54.442Z"
    author: "DOCS"
    state: "ok"
    note: "Command: bunx prettier --check docs/user/breaking-changes.mdx | Result: pass | Evidence: All matched files use Prettier code style. | Scope: v0.4 prompt assembly breaking-change docs. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. | Scope: docs-only policy routing. Command: agentplane doctor | Result: pass | Evidence: doctor OK with 0 errors and 0 warnings; informational runtime/archive notes only. | Links: docs/user/breaking-changes.mdx, docs/developer/prompt-assembly-system.mdx"
doc_version: 3
doc_updated_at: "2026-04-22T14:43:54.449Z"
doc_updated_by: "DOCS"
description: "Extend breaking-change and migration documentation for the planned v0.4 prompt assembly model, including compiled prompt files, module graph authority, recipe mutation behavior, and upgrade implications."
sections:
  Summary: |-
    Document v0.4 prompt assembly migration
    
    Extend breaking-change and migration documentation for the planned v0.4 prompt assembly model, including compiled prompt files, module graph authority, recipe mutation behavior, and upgrade implications.
  Scope: |-
    - In scope: Extend breaking-change and migration documentation for the planned v0.4 prompt assembly model, including compiled prompt files, module graph authority, recipe mutation behavior, and upgrade implications.
    - Out of scope: unrelated refactors not required for "Document v0.4 prompt assembly migration".
  Plan: |-
    Summary: continue v0.4 prompt assembly documentation by adding migration and breaking-change guidance.
    
    Scope:
    - Update docs/user/breaking-changes.mdx with a planned v0.4 prompt assembly section.
    - Ensure the section links to docs/developer/prompt-assembly-system.mdx and distinguishes target v0.4 behavior from current shipped v0.3 behavior.
    - Keep changes docs-only; no CLI/runtime implementation changes.
    
    Plan:
    1. Add a v0.4 prompt assembly breaking-change section to docs/user/breaking-changes.mdx.
    2. Include migration guidance for compiled AGENTS.md/policy/agent files, recipe modules, global cache vs project vendor authority, and drift handling.
    3. Run formatter and docs-policy checks.
    
    Verify Steps:
    - bunx prettier --check docs/user/breaking-changes.mdx
    - node .agentplane/policy/check-routing.mjs
    - agentplane doctor
    
    Rollback Plan:
    - Revert docs/user/breaking-changes.mdx edits for this task.
  Verify Steps: |-
    1. Review the requested outcome for "Document v0.4 prompt assembly migration". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T14:43:54.442Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: bunx prettier --check docs/user/breaking-changes.mdx | Result: pass | Evidence: All matched files use Prettier code style. | Scope: v0.4 prompt assembly breaking-change docs. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. | Scope: docs-only policy routing. Command: agentplane doctor | Result: pass | Evidence: doctor OK with 0 errors and 0 warnings; informational runtime/archive notes only. | Links: docs/user/breaking-changes.mdx, docs/developer/prompt-assembly-system.mdx
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T14:43:04.374Z, excerpt_hash=sha256:b2af660239429d16c598ede78cb6e03374ce44f120bff243f2868f48b83e8062
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Document v0.4 prompt assembly migration

Extend breaking-change and migration documentation for the planned v0.4 prompt assembly model, including compiled prompt files, module graph authority, recipe mutation behavior, and upgrade implications.

## Scope

- In scope: Extend breaking-change and migration documentation for the planned v0.4 prompt assembly model, including compiled prompt files, module graph authority, recipe mutation behavior, and upgrade implications.
- Out of scope: unrelated refactors not required for "Document v0.4 prompt assembly migration".

## Plan

Summary: continue v0.4 prompt assembly documentation by adding migration and breaking-change guidance.

Scope:
- Update docs/user/breaking-changes.mdx with a planned v0.4 prompt assembly section.
- Ensure the section links to docs/developer/prompt-assembly-system.mdx and distinguishes target v0.4 behavior from current shipped v0.3 behavior.
- Keep changes docs-only; no CLI/runtime implementation changes.

Plan:
1. Add a v0.4 prompt assembly breaking-change section to docs/user/breaking-changes.mdx.
2. Include migration guidance for compiled AGENTS.md/policy/agent files, recipe modules, global cache vs project vendor authority, and drift handling.
3. Run formatter and docs-policy checks.

Verify Steps:
- bunx prettier --check docs/user/breaking-changes.mdx
- node .agentplane/policy/check-routing.mjs
- agentplane doctor

Rollback Plan:
- Revert docs/user/breaking-changes.mdx edits for this task.

## Verify Steps

1. Review the requested outcome for "Document v0.4 prompt assembly migration". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T14:43:54.442Z — VERIFY — ok

By: DOCS

Note: Command: bunx prettier --check docs/user/breaking-changes.mdx | Result: pass | Evidence: All matched files use Prettier code style. | Scope: v0.4 prompt assembly breaking-change docs. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. | Scope: docs-only policy routing. Command: agentplane doctor | Result: pass | Evidence: doctor OK with 0 errors and 0 warnings; informational runtime/archive notes only. | Links: docs/user/breaking-changes.mdx, docs/developer/prompt-assembly-system.mdx

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T14:43:04.374Z, excerpt_hash=sha256:b2af660239429d16c598ede78cb6e03374ce44f120bff243f2868f48b83e8062

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
