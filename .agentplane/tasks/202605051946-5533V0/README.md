---
id: "202605051946-5533V0"
title: "Draft v0.5 blueprint and recipe roadmaps"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "docs"
  - "recipes"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T19:57:39.881Z"
  updated_by: "DOCS"
  note: "Verified v0.5 blueprint and recipe roadmap artifact after rebasing onto current main. Policy routing and formatting pass; agentplane doctor is OK with one pre-existing branch_pr projection warning for WCPBCX in this task worktree."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: create a temporary v0.5 planning document that captures recipe blueprint-extension work and blueprint integration work as epics with atomic implementation tasks."
events:
  -
    type: "status"
    at: "2026-05-05T19:47:26.400Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: create a temporary v0.5 planning document that captures recipe blueprint-extension work and blueprint integration work as epics with atomic implementation tasks."
  -
    type: "verify"
    at: "2026-05-05T19:49:41.580Z"
    author: "DOCS"
    state: "ok"
    note: "Created temporary v0.5 planning document at .agentplane/tmp/roadmaps/v0.5-blueprints-and-recipes.md with recipe and blueprint epics, atomic tasks, acceptance criteria, PR sequence, minimum v0.5 bar, and deferred scope. Checks passed: bunx prettier --check target markdown files; node .agentplane/policy/check-routing.mjs; node packages/agentplane/bin/agentplane.js doctor. Doctor returned OK with pre-existing warnings about hook shim path and unrelated shipped branch_pr projections."
  -
    type: "verify"
    at: "2026-05-05T19:50:17.470Z"
    author: "DOCS"
    state: "ok"
    note: "Created temporary v0.5 planning document at .agentplane/tmp/roadmaps/v0.5-blueprints-and-recipes.md with recipe and blueprint epics, atomic tasks, acceptance criteria, PR sequence, minimum v0.5 bar, and deferred scope. Rechecked after task plan alignment. Checks passed: bunx prettier --check target markdown files; node .agentplane/policy/check-routing.mjs; node packages/agentplane/bin/agentplane.js doctor."
  -
    type: "verify"
    at: "2026-05-05T19:57:39.881Z"
    author: "DOCS"
    state: "ok"
    note: "Verified v0.5 blueprint and recipe roadmap artifact after rebasing onto current main. Policy routing and formatting pass; agentplane doctor is OK with one pre-existing branch_pr projection warning for WCPBCX in this task worktree."
doc_version: 3
doc_updated_at: "2026-05-05T19:57:39.904Z"
doc_updated_by: "DOCS"
description: "Create a temporary roadmap document that captures recipe work needed for v0.5 and the blueprint roadmap to v0.5 without changing the canonical roadmap."
sections:
  Summary: |-
    Draft v0.5 blueprint and recipe roadmaps
    
    Create a temporary roadmap document that captures recipe work needed for v0.5 and the blueprint roadmap to v0.5 without changing the canonical roadmap.
  Scope: |-
    - In scope: Create a temporary roadmap document that captures recipe work needed for v0.5 and the blueprint roadmap to v0.5 without changing the canonical roadmap.
    - Out of scope: unrelated refactors not required for "Draft v0.5 blueprint and recipe roadmaps".
  Plan: "Create a temporary roadmap artifact for v0.5 planning. Scope: add one markdown document under .agentplane/tmp/roadmaps; capture the recipe blueprint-extension roadmap as epics and atomic tasks; add a matching blueprint roadmap to v0.5; keep the canonical ROADMAP.md unchanged; verify target markdown formatting, policy routing, and doctor. Docs IA is not required because the temporary document is not wired into public docs navigation."
  Verify Steps: |-
    1. Review the requested outcome for "Draft v0.5 blueprint and recipe roadmaps". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T19:49:41.580Z — VERIFY — ok
    
    By: DOCS
    
    Note: Created temporary v0.5 planning document at .agentplane/tmp/roadmaps/v0.5-blueprints-and-recipes.md with recipe and blueprint epics, atomic tasks, acceptance criteria, PR sequence, minimum v0.5 bar, and deferred scope. Checks passed: bunx prettier --check target markdown files; node .agentplane/policy/check-routing.mjs; node packages/agentplane/bin/agentplane.js doctor. Doctor returned OK with pre-existing warnings about hook shim path and unrelated shipped branch_pr projections.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T19:47:26.400Z, excerpt_hash=sha256:ae12c90c026805287117ad3ccf726f20f5c438a962d79ba3920bb01051c5c2f3
    
    ### 2026-05-05T19:50:17.470Z — VERIFY — ok
    
    By: DOCS
    
    Note: Created temporary v0.5 planning document at .agentplane/tmp/roadmaps/v0.5-blueprints-and-recipes.md with recipe and blueprint epics, atomic tasks, acceptance criteria, PR sequence, minimum v0.5 bar, and deferred scope. Rechecked after task plan alignment. Checks passed: bunx prettier --check target markdown files; node .agentplane/policy/check-routing.mjs; node packages/agentplane/bin/agentplane.js doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T19:49:58.750Z, excerpt_hash=sha256:ae12c90c026805287117ad3ccf726f20f5c438a962d79ba3920bb01051c5c2f3
    
    ### 2026-05-05T19:57:39.881Z — VERIFY — ok

    By: DOCS

    Note: Verified v0.5 blueprint and recipe roadmap artifact after rebasing onto current main. Policy routing and formatting pass; agentplane doctor is OK with one pre-existing branch_pr projection warning for WCPBCX in this task worktree.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T19:50:17.481Z, excerpt_hash=sha256:ae12c90c026805287117ad3ccf726f20f5c438a962d79ba3920bb01051c5c2f3

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Docs IA check was not run because the new artifact is intentionally temporary and not wired into public docs navigation.
      Impact: The roadmap is available for implementation planning without changing canonical ROADMAP.md or claiming shipped behavior.
      Resolution: Use the temporary document as planning input for the next blueprint/recipe implementation tasks.

    - Observation: Doctor was previously run and returned OK with pre-existing warnings about hook shim path and unrelated shipped branch_pr projections; docs IA check remains intentionally skipped because the artifact is temporary and not in docs navigation.
      Impact: The roadmap is available for implementation planning without changing canonical ROADMAP.md or claiming shipped behavior.
      Resolution: Use the temporary document as planning input for the next blueprint/recipe implementation tasks.

    - Observation: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: policy/load-rule invariants. Command: bunx prettier --check .agentplane/tmp/roadmaps/v0.5-blueprints-and-recipes.md .agentplane/tasks/202605051946-5533V0/README.md; Result: pass; Evidence: all matched files use Prettier style; Scope: changed roadmap/task docs. Command: node packages/agentplane/bin/agentplane.js doctor; Result: pass; Evidence: doctor OK with one warning about pre-existing WCPBCX branch_pr projection in this worktree; Scope: repository runtime and workflow diagnostics.
      Impact: Confirms the roadmap artifact is syntactically clean and the task branch no longer carries the stale 26C18X resolver implementation.
      Resolution: Rebased the branch onto origin/main after PR #935/#937 landed, leaving this PR as a docs-only v0.5 planning artifact.
id_source: "generated"
---
## Summary

Draft v0.5 blueprint and recipe roadmaps

Create a temporary roadmap document that captures recipe work needed for v0.5 and the blueprint roadmap to v0.5 without changing the canonical roadmap.

## Scope

- In scope: Create a temporary roadmap document that captures recipe work needed for v0.5 and the blueprint roadmap to v0.5 without changing the canonical roadmap.
- Out of scope: unrelated refactors not required for "Draft v0.5 blueprint and recipe roadmaps".

## Plan

Create a temporary roadmap artifact for v0.5 planning. Scope: add one markdown document under .agentplane/tmp/roadmaps; capture the recipe blueprint-extension roadmap as epics and atomic tasks; add a matching blueprint roadmap to v0.5; keep the canonical ROADMAP.md unchanged; verify target markdown formatting, policy routing, and doctor. Docs IA is not required because the temporary document is not wired into public docs navigation.

## Verify Steps

1. Review the requested outcome for "Draft v0.5 blueprint and recipe roadmaps". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T19:49:41.580Z — VERIFY — ok

By: DOCS

Note: Created temporary v0.5 planning document at .agentplane/tmp/roadmaps/v0.5-blueprints-and-recipes.md with recipe and blueprint epics, atomic tasks, acceptance criteria, PR sequence, minimum v0.5 bar, and deferred scope. Checks passed: bunx prettier --check target markdown files; node .agentplane/policy/check-routing.mjs; node packages/agentplane/bin/agentplane.js doctor. Doctor returned OK with pre-existing warnings about hook shim path and unrelated shipped branch_pr projections.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T19:47:26.400Z, excerpt_hash=sha256:ae12c90c026805287117ad3ccf726f20f5c438a962d79ba3920bb01051c5c2f3

### 2026-05-05T19:50:17.470Z — VERIFY — ok

By: DOCS

Note: Created temporary v0.5 planning document at .agentplane/tmp/roadmaps/v0.5-blueprints-and-recipes.md with recipe and blueprint epics, atomic tasks, acceptance criteria, PR sequence, minimum v0.5 bar, and deferred scope. Rechecked after task plan alignment. Checks passed: bunx prettier --check target markdown files; node .agentplane/policy/check-routing.mjs; node packages/agentplane/bin/agentplane.js doctor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T19:49:58.750Z, excerpt_hash=sha256:ae12c90c026805287117ad3ccf726f20f5c438a962d79ba3920bb01051c5c2f3

### 2026-05-05T19:57:39.881Z — VERIFY — ok

By: DOCS

Note: Verified v0.5 blueprint and recipe roadmap artifact after rebasing onto current main. Policy routing and formatting pass; agentplane doctor is OK with one pre-existing branch_pr projection warning for WCPBCX in this task worktree.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T19:50:17.481Z, excerpt_hash=sha256:ae12c90c026805287117ad3ccf726f20f5c438a962d79ba3920bb01051c5c2f3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Docs IA check was not run because the new artifact is intentionally temporary and not wired into public docs navigation.
  Impact: The roadmap is available for implementation planning without changing canonical ROADMAP.md or claiming shipped behavior.
  Resolution: Use the temporary document as planning input for the next blueprint/recipe implementation tasks.

- Observation: Doctor was previously run and returned OK with pre-existing warnings about hook shim path and unrelated shipped branch_pr projections; docs IA check remains intentionally skipped because the artifact is temporary and not in docs navigation.
  Impact: The roadmap is available for implementation planning without changing canonical ROADMAP.md or claiming shipped behavior.
  Resolution: Use the temporary document as planning input for the next blueprint/recipe implementation tasks.

- Observation: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: policy/load-rule invariants. Command: bunx prettier --check .agentplane/tmp/roadmaps/v0.5-blueprints-and-recipes.md .agentplane/tasks/202605051946-5533V0/README.md; Result: pass; Evidence: all matched files use Prettier style; Scope: changed roadmap/task docs. Command: node packages/agentplane/bin/agentplane.js doctor; Result: pass; Evidence: doctor OK with one warning about pre-existing WCPBCX branch_pr projection in this worktree; Scope: repository runtime and workflow diagnostics.
  Impact: Confirms the roadmap artifact is syntactically clean and the task branch no longer carries the stale 26C18X resolver implementation.
  Resolution: Rebased the branch onto origin/main after PR #935/#937 landed, leaving this PR as a docs-only v0.5 planning artifact.
