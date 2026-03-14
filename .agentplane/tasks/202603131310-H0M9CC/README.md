---
id: "202603131310-H0M9CC"
title: "Decide future one-file YAML target"
result_summary: "The roadmap now has an explicit architectural decision: stay on one-file README.md for the current task model and revisit YAML only when defined migration criteria are met."
status: "DONE"
priority: "med"
owner: "PLANNER"
revision: 6
depends_on:
  - "202603131309-JYPPQS"
  - "202603131310-SE12RR"
  - "202603131310-MKYRHY"
tags:
  - "tasks"
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T04:27:35.244Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T04:28:45.128Z"
  updated_by: "PLANNER"
  note: |-
    Command: ./node_modules/.bin/prettier --check docs/developer/project-layout.mdx docs/developer/architecture.mdx && bun run docs:site:typecheck
    Result: pass
    Evidence: Prettier reported both MDX files clean; docs site typecheck exited 0.
    Scope: touched developer docs for the one-file task format decision.
    
    Command: git diff -- docs/developer/project-layout.mdx docs/developer/architecture.mdx
    Result: pass
    Evidence: docs now state README.md remains the canonical one-file task container, frontmatter is the source of truth, body is generated, and future task.yaml migration requires explicit revisit criteria.
    Scope: architectural decision record for the task-file target.
    
    Command: agentplane task show 202603131309-HSRN23 && agentplane task show 202603131309-JYPPQS && agentplane task show 202603131310-SE12RR && agentplane task show 202603131310-MKYRHY
    Result: pass
    Evidence: prerequisite tasks confirm canonical schema v1, generated body, legacy migration, and backend revision groundwork are complete, which matches the documented decision to stay on README.md for now.
    Scope: decision consistency against prerequisite implementation state.
commit:
  hash: "c7b2eb4105a197065616bb65dddfed3adf13eb64"
  message: "🧭 H0M9CC task: record one-file task format decision"
comments:
  -
    author: "PLANNER"
    body: "Start: record the post-stabilization decision for one-file task format, keep README.md as the current canonical container, and document concrete triggers that would justify a later move to single-file YAML."
  -
    author: "PLANNER"
    body: "Verified: developer docs now explicitly keep README.md as the current one-file task container, describe frontmatter as canonical state with generated body, and list the concrete triggers that would justify revisiting a future task.yaml migration."
events:
  -
    type: "status"
    at: "2026-03-14T04:27:42.141Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: record the post-stabilization decision for one-file task format, keep README.md as the current canonical container, and document concrete triggers that would justify a later move to single-file YAML."
  -
    type: "verify"
    at: "2026-03-14T04:28:45.128Z"
    author: "PLANNER"
    state: "ok"
    note: |-
      Command: ./node_modules/.bin/prettier --check docs/developer/project-layout.mdx docs/developer/architecture.mdx && bun run docs:site:typecheck
      Result: pass
      Evidence: Prettier reported both MDX files clean; docs site typecheck exited 0.
      Scope: touched developer docs for the one-file task format decision.
      
      Command: git diff -- docs/developer/project-layout.mdx docs/developer/architecture.mdx
      Result: pass
      Evidence: docs now state README.md remains the canonical one-file task container, frontmatter is the source of truth, body is generated, and future task.yaml migration requires explicit revisit criteria.
      Scope: architectural decision record for the task-file target.
      
      Command: agentplane task show 202603131309-HSRN23 && agentplane task show 202603131309-JYPPQS && agentplane task show 202603131310-SE12RR && agentplane task show 202603131310-MKYRHY
      Result: pass
      Evidence: prerequisite tasks confirm canonical schema v1, generated body, legacy migration, and backend revision groundwork are complete, which matches the documented decision to stay on README.md for now.
      Scope: decision consistency against prerequisite implementation state.
  -
    type: "status"
    at: "2026-03-14T04:29:02.946Z"
    author: "PLANNER"
    from: "DOING"
    to: "DONE"
    note: "Verified: developer docs now explicitly keep README.md as the current one-file task container, describe frontmatter as canonical state with generated body, and list the concrete triggers that would justify revisiting a future task.yaml migration."
doc_version: 3
doc_updated_at: "2026-03-14T04:29:02.947Z"
doc_updated_by: "PLANNER"
description: "Evaluate whether the stabilized one-file canonical task format should remain README.md with generated body or later migrate to a single YAML file, with explicit tradeoffs and migration criteria."
sections:
  Summary: |-
    Decide future one-file YAML target
    
    Evaluate whether the stabilized one-file canonical task format should remain README.md with generated body or later migrate to a single YAML file, with explicit tradeoffs and migration criteria.
  Scope: |-
    - In scope: Evaluate whether the stabilized one-file canonical task format should remain README.md with generated body or later migrate to a single YAML file, with explicit tradeoffs and migration criteria.
    - Out of scope: unrelated refactors not required for "Decide future one-file YAML target".
  Plan: |-
    1. Review the now-stabilized one-file task model across schema v1, generated body rollout, legacy migration, and backend revision groundwork to identify the actual tradeoffs that remain.
    2. Record an explicit architecture decision in developer docs: keep README.md as the single canonical task file for now, with canonical frontmatter and generated body, instead of migrating immediately to task YAML.
    3. Document the concrete criteria that would justify revisiting a future one-file YAML target so the decision stays operational rather than becoming vague guidance.
  Verify Steps: |-
    1. Inspect the updated architecture/project-layout docs. Expected: they state the chosen one-file task target, the main tradeoffs, and the explicit triggers for reconsidering YAML.
    2. Run formatting or doc validation for the touched docs. Expected: the updated developer docs pass the relevant checks without introducing prose or MDX drift.
    3. Compare the written decision against the completed prerequisite tasks. Expected: the documented choice matches the implemented canonical frontmatter, generated-body, migration, and backend-groundwork state.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T04:28:45.128Z — VERIFY — ok
    
    By: PLANNER
    
    Note: Command: ./node_modules/.bin/prettier --check docs/developer/project-layout.mdx docs/developer/architecture.mdx && bun run docs:site:typecheck
    Result: pass
    Evidence: Prettier reported both MDX files clean; docs site typecheck exited 0.
    Scope: touched developer docs for the one-file task format decision.
    
    Command: git diff -- docs/developer/project-layout.mdx docs/developer/architecture.mdx
    Result: pass
    Evidence: docs now state README.md remains the canonical one-file task container, frontmatter is the source of truth, body is generated, and future task.yaml migration requires explicit revisit criteria.
    Scope: architectural decision record for the task-file target.
    
    Command: agentplane task show 202603131309-HSRN23 && agentplane task show 202603131309-JYPPQS && agentplane task show 202603131310-SE12RR && agentplane task show 202603131310-MKYRHY
    Result: pass
    Evidence: prerequisite tasks confirm canonical schema v1, generated body, legacy migration, and backend revision groundwork are complete, which matches the documented decision to stay on README.md for now.
    Scope: decision consistency against prerequisite implementation state.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T04:27:42.142Z, excerpt_hash=sha256:93b27d8bed3a679587b9a7a3c8bf51e936323302695eeb0994bdd5d480465bc4
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Decide future one-file YAML target

Evaluate whether the stabilized one-file canonical task format should remain README.md with generated body or later migrate to a single YAML file, with explicit tradeoffs and migration criteria.

## Scope

- In scope: Evaluate whether the stabilized one-file canonical task format should remain README.md with generated body or later migrate to a single YAML file, with explicit tradeoffs and migration criteria.
- Out of scope: unrelated refactors not required for "Decide future one-file YAML target".

## Plan

1. Review the now-stabilized one-file task model across schema v1, generated body rollout, legacy migration, and backend revision groundwork to identify the actual tradeoffs that remain.
2. Record an explicit architecture decision in developer docs: keep README.md as the single canonical task file for now, with canonical frontmatter and generated body, instead of migrating immediately to task YAML.
3. Document the concrete criteria that would justify revisiting a future one-file YAML target so the decision stays operational rather than becoming vague guidance.

## Verify Steps

1. Inspect the updated architecture/project-layout docs. Expected: they state the chosen one-file task target, the main tradeoffs, and the explicit triggers for reconsidering YAML.
2. Run formatting or doc validation for the touched docs. Expected: the updated developer docs pass the relevant checks without introducing prose or MDX drift.
3. Compare the written decision against the completed prerequisite tasks. Expected: the documented choice matches the implemented canonical frontmatter, generated-body, migration, and backend-groundwork state.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T04:28:45.128Z — VERIFY — ok

By: PLANNER

Note: Command: ./node_modules/.bin/prettier --check docs/developer/project-layout.mdx docs/developer/architecture.mdx && bun run docs:site:typecheck
Result: pass
Evidence: Prettier reported both MDX files clean; docs site typecheck exited 0.
Scope: touched developer docs for the one-file task format decision.

Command: git diff -- docs/developer/project-layout.mdx docs/developer/architecture.mdx
Result: pass
Evidence: docs now state README.md remains the canonical one-file task container, frontmatter is the source of truth, body is generated, and future task.yaml migration requires explicit revisit criteria.
Scope: architectural decision record for the task-file target.

Command: agentplane task show 202603131309-HSRN23 && agentplane task show 202603131309-JYPPQS && agentplane task show 202603131310-SE12RR && agentplane task show 202603131310-MKYRHY
Result: pass
Evidence: prerequisite tasks confirm canonical schema v1, generated body, legacy migration, and backend revision groundwork are complete, which matches the documented decision to stay on README.md for now.
Scope: decision consistency against prerequisite implementation state.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T04:27:42.142Z, excerpt_hash=sha256:93b27d8bed3a679587b9a7a3c8bf51e936323302695eeb0994bdd5d480465bc4

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
