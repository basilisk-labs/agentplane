---
id: "202605021842-Q3814M"
title: "Document v0.6 eval and recursive improvement roadmap"
result_summary: "Merged via PR #762; documented v0.6 eval and recursive improvement roadmap."
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "evals"
  - "roadmap"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-02T18:42:38.499Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-02T18:58:46.984Z"
  updated_by: "DOCS"
  note: "Command: node .agentplane/policy/check-routing.mjs -> pass (policy routing OK). Command: git diff --check -> pass. Command: bun run docs:ia:check -> pass (docs IA/sidebar coverage aligned). Command: bun run docs:site:typecheck -> pass. Command: bun run format:check -- ROADMAP.md docs/index.mdx docs/developer/evaluation-and-recursive-improvement.mdx website/sidebars.ts -> pass. Command: agentplane doctor -> pass (doctor OK). Note: docs:site:build was attempted in nested .agentplane worktree and failed with duplicate / route SSG behavior; the same command passed on clean main, so CI remains the branch build authority."
commit:
  hash: "8418b6fb7bad2a07a3f8cee06cf780531ecbcf0d"
  message: "Merge pull request #762 from basilisk-labs/task/202605021842-Q3814M/v06-evals-roadmap"
comments:
  -
    author: "DOCS"
    body: "Start: update roadmap and developer documentation to make v0.6 an evals and recursive prompt/recipe improvement milestone without claiming runtime support exists yet."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #762 merged into main after hosted checks passed; local evidence includes policy routing, docs IA, docs site typecheck, format check, git diff --check, and agentplane doctor."
events:
  -
    type: "status"
    at: "2026-05-02T18:50:35.442Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: update roadmap and developer documentation to make v0.6 an evals and recursive prompt/recipe improvement milestone without claiming runtime support exists yet."
  -
    type: "verify"
    at: "2026-05-02T18:58:46.984Z"
    author: "DOCS"
    state: "ok"
    note: "Command: node .agentplane/policy/check-routing.mjs -> pass (policy routing OK). Command: git diff --check -> pass. Command: bun run docs:ia:check -> pass (docs IA/sidebar coverage aligned). Command: bun run docs:site:typecheck -> pass. Command: bun run format:check -- ROADMAP.md docs/index.mdx docs/developer/evaluation-and-recursive-improvement.mdx website/sidebars.ts -> pass. Command: agentplane doctor -> pass (doctor OK). Note: docs:site:build was attempted in nested .agentplane worktree and failed with duplicate / route SSG behavior; the same command passed on clean main, so CI remains the branch build authority."
  -
    type: "status"
    at: "2026-05-02T19:01:43.033Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #762 merged into main after hosted checks passed; local evidence includes policy routing, docs IA, docs site typecheck, format check, git diff --check, and agentplane doctor."
doc_version: 3
doc_updated_at: "2026-05-02T19:01:43.047Z"
doc_updated_by: "INTEGRATOR"
description: "Update developer documentation and ROADMAP so v0.6 is explicitly scoped to evals, recursive prompt/recipe improvement, and the planner-runner-evaluator loop."
sections:
  Summary: |-
    Document v0.6 eval and recursive improvement roadmap
    
    Update developer documentation and ROADMAP so v0.6 is explicitly scoped to evals, recursive prompt/recipe improvement, and the planner-runner-evaluator loop.
  Scope: |-
    - In scope: Update developer documentation and ROADMAP so v0.6 is explicitly scoped to evals, recursive prompt/recipe improvement, and the planner-runner-evaluator loop.
    - Out of scope: unrelated refactors not required for "Document v0.6 eval and recursive improvement roadmap".
  Plan: |-
    1. Update ROADMAP.md so v0.6 explicitly centers evals, recursive prompt/recipe improvement, planner-runner-evaluator loops, promotion gates, and benchmark/export separation.
    2. Update developer documentation to describe the future recursive improvement/eval architecture without claiming runtime implementation already exists.
    3. Verify docs-only checks and record evidence.
  Verify Steps: |-
    - Run `node .agentplane/policy/check-routing.mjs` for policy routing sanity.
    - Run `agentplane doctor` for repository diagnostics.
    - Run targeted docs checks if generated docs/navigation surfaces change.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-02T18:58:46.984Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: node .agentplane/policy/check-routing.mjs -> pass (policy routing OK). Command: git diff --check -> pass. Command: bun run docs:ia:check -> pass (docs IA/sidebar coverage aligned). Command: bun run docs:site:typecheck -> pass. Command: bun run format:check -- ROADMAP.md docs/index.mdx docs/developer/evaluation-and-recursive-improvement.mdx website/sidebars.ts -> pass. Command: agentplane doctor -> pass (doctor OK). Note: docs:site:build was attempted in nested .agentplane worktree and failed with duplicate / route SSG behavior; the same command passed on clean main, so CI remains the branch build authority.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T18:50:35.442Z, excerpt_hash=sha256:1d591e506552dcbfe0a8631ccf8d8f0bd9abd20a15f3fe4234e7505b5d7c68cd
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Document v0.6 eval and recursive improvement roadmap

Update developer documentation and ROADMAP so v0.6 is explicitly scoped to evals, recursive prompt/recipe improvement, and the planner-runner-evaluator loop.

## Scope

- In scope: Update developer documentation and ROADMAP so v0.6 is explicitly scoped to evals, recursive prompt/recipe improvement, and the planner-runner-evaluator loop.
- Out of scope: unrelated refactors not required for "Document v0.6 eval and recursive improvement roadmap".

## Plan

1. Update ROADMAP.md so v0.6 explicitly centers evals, recursive prompt/recipe improvement, planner-runner-evaluator loops, promotion gates, and benchmark/export separation.
2. Update developer documentation to describe the future recursive improvement/eval architecture without claiming runtime implementation already exists.
3. Verify docs-only checks and record evidence.

## Verify Steps

- Run `node .agentplane/policy/check-routing.mjs` for policy routing sanity.
- Run `agentplane doctor` for repository diagnostics.
- Run targeted docs checks if generated docs/navigation surfaces change.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-02T18:58:46.984Z — VERIFY — ok

By: DOCS

Note: Command: node .agentplane/policy/check-routing.mjs -> pass (policy routing OK). Command: git diff --check -> pass. Command: bun run docs:ia:check -> pass (docs IA/sidebar coverage aligned). Command: bun run docs:site:typecheck -> pass. Command: bun run format:check -- ROADMAP.md docs/index.mdx docs/developer/evaluation-and-recursive-improvement.mdx website/sidebars.ts -> pass. Command: agentplane doctor -> pass (doctor OK). Note: docs:site:build was attempted in nested .agentplane worktree and failed with duplicate / route SSG behavior; the same command passed on clean main, so CI remains the branch build authority.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T18:50:35.442Z, excerpt_hash=sha256:1d591e506552dcbfe0a8631ccf8d8f0bd9abd20a15f3fe4234e7505b5d7c68cd

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
