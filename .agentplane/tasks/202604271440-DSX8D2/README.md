---
id: "202604271440-DSX8D2"
title: "Align docs with current branch_pr runtime"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "docs"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-27T14:40:51.898Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-27T14:51:27.468Z"
  updated_by: "DOCS"
  note: "Docs aligned with current branch_pr runtime; stale intermediate/legacy public docs removed; docs/site/cli/routing/doctor checks passed."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: audit public and repository documentation for stale legacy or intermediate workflow data, then align docs with the current branch_pr runtime."
events:
  -
    type: "status"
    at: "2026-04-27T14:41:08.308Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: audit public and repository documentation for stale legacy or intermediate workflow data, then align docs with the current branch_pr runtime."
  -
    type: "verify"
    at: "2026-04-27T14:51:27.468Z"
    author: "DOCS"
    state: "ok"
    note: "Docs aligned with current branch_pr runtime; stale intermediate/legacy public docs removed; docs/site/cli/routing/doctor checks passed."
doc_version: 3
doc_updated_at: "2026-04-27T14:51:27.473Z"
doc_updated_by: "DOCS"
description: "Audit public and repository documentation for intermediate or legacy workflow data, remove stale references, and align docs with the current code and branch_pr merge-preserving runtime."
sections:
  Summary: |-
    Align docs with current branch_pr runtime
    
    Audit public and repository documentation for intermediate or legacy workflow data, remove stale references, and align docs with the current code and branch_pr merge-preserving runtime.
  Scope: |-
    - In scope: Audit public and repository documentation for intermediate or legacy workflow data, remove stale references, and align docs with the current code and branch_pr merge-preserving runtime.
    - Out of scope: unrelated refactors not required for "Align docs with current branch_pr runtime".
  Plan: "1. Audit docs and generated/help surfaces for stale workflow terms, intermediate task/release data, and legacy command names that conflict with current code. 2. Remove or rewrite stale public documentation so it describes the current branch_pr runtime, merge-preserving integrate default, current CLI names, and supported doc surfaces. 3. Regenerate docs outputs when source-driven surfaces changed. 4. Verify with docs freshness/format checks, policy routing, doctor, and targeted searches for removed legacy phrases."
  Verify Steps: |-
    1. Review the requested outcome for "Align docs with current branch_pr runtime". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-27T14:51:27.468Z — VERIFY — ok
    
    By: DOCS
    
    Note: Docs aligned with current branch_pr runtime; stale intermediate/legacy public docs removed; docs/site/cli/routing/doctor checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T14:51:26.891Z, excerpt_hash=sha256:affcd01bef65be9bec3f13082849d16558b638522043d83e73016f916cf56ed5
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    Verification evidence:
    - Removed intermediate/deferred public docs from active docs and sidebar: prompt assembly system, release-process architecture, blog redesign plan, v0.2.25 blog draft, and legacy docs/docs.json manifest.
    - Updated user/developer docs to current runtime: branch_pr merge-preserving integrate default, current task-doc sections, current upgrade recovery flow, current docs navigation source.
    - Targeted stale-doc search passed for removed pages, legacy visible labels, Mintlify/docs.json references, and planned v0.4 prompt-assembly wording.
    - Checks passed: prettier targeted write, git diff --check, docs:cli:check, docs:site:check, node .agentplane/policy/check-routing.mjs, agentplane doctor.
id_source: "generated"
---
## Summary

Align docs with current branch_pr runtime

Audit public and repository documentation for intermediate or legacy workflow data, remove stale references, and align docs with the current code and branch_pr merge-preserving runtime.

## Scope

- In scope: Audit public and repository documentation for intermediate or legacy workflow data, remove stale references, and align docs with the current code and branch_pr merge-preserving runtime.
- Out of scope: unrelated refactors not required for "Align docs with current branch_pr runtime".

## Plan

1. Audit docs and generated/help surfaces for stale workflow terms, intermediate task/release data, and legacy command names that conflict with current code. 2. Remove or rewrite stale public documentation so it describes the current branch_pr runtime, merge-preserving integrate default, current CLI names, and supported doc surfaces. 3. Regenerate docs outputs when source-driven surfaces changed. 4. Verify with docs freshness/format checks, policy routing, doctor, and targeted searches for removed legacy phrases.

## Verify Steps

1. Review the requested outcome for "Align docs with current branch_pr runtime". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-27T14:51:27.468Z — VERIFY — ok

By: DOCS

Note: Docs aligned with current branch_pr runtime; stale intermediate/legacy public docs removed; docs/site/cli/routing/doctor checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T14:51:26.891Z, excerpt_hash=sha256:affcd01bef65be9bec3f13082849d16558b638522043d83e73016f916cf56ed5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Verification evidence:
- Removed intermediate/deferred public docs from active docs and sidebar: prompt assembly system, release-process architecture, blog redesign plan, v0.2.25 blog draft, and legacy docs/docs.json manifest.
- Updated user/developer docs to current runtime: branch_pr merge-preserving integrate default, current task-doc sections, current upgrade recovery flow, current docs navigation source.
- Targeted stale-doc search passed for removed pages, legacy visible labels, Mintlify/docs.json references, and planned v0.4 prompt-assembly wording.
- Checks passed: prettier targeted write, git diff --check, docs:cli:check, docs:site:check, node .agentplane/policy/check-routing.mjs, agentplane doctor.
