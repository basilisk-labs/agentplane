---
id: "202603311328-8CPSMX"
title: "Instantiate the new REFACTOR wave as executable tasks and start the critical path"
result_summary: "integrate: squash task/202603311328-8CPSMX/instantiate-refactor-wave"
status: "DONE"
priority: "high"
owner: "PLANNER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "refactor"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T13:28:49.113Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T13:34:00.398Z"
  updated_by: "PLANNER"
  note: "Command: agentplane task list | rg '\\[(TODO|DOING|BLOCKED)\\]'; Result: pass; Evidence: 34 open tasks visible, including the planning task plus 33 N0-N6 execution tasks; Scope: backlog instantiation and dependency graph presence. Command: sed -n '1,160p' .agentplane/tasks/202603311331-WTQE65/README.md && sed -n '1,160p' .agentplane/tasks/202603311332-ACCPE4/README.md; Result: pass; Evidence: representative early and late wave tasks contain concrete Plan and Verify Steps sections instead of placeholders; Scope: task README contract quality across the new graph. Command: review REFACTOR.md against created titles and dependencies; Result: pass; Evidence: every pending N0-N6 item was instantiated exactly once with explicit depends_on links reflecting the intended rollout order; Scope: graph completeness and ordering."
commit:
  hash: "682c0a1e79d5b194bc54421d56946355094de810"
  message: "🧩 8CPSMX integrate: squash task/202603311328-8CPSMX/instantiate-refactor-wave"
comments:
  -
    author: "PLANNER"
    body: "Start: instantiate every pending N0-N6 item from REFACTOR.md as an executable task graph with concrete plans and verification contracts, then launch the first critical-path coding task."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311328-8CPSMX/pr."
events:
  -
    type: "status"
    at: "2026-03-31T13:29:29.398Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: instantiate every pending N0-N6 item from REFACTOR.md as an executable task graph with concrete plans and verification contracts, then launch the first critical-path coding task."
  -
    type: "verify"
    at: "2026-03-31T13:34:00.398Z"
    author: "PLANNER"
    state: "ok"
    note: "Command: agentplane task list | rg '\\[(TODO|DOING|BLOCKED)\\]'; Result: pass; Evidence: 34 open tasks visible, including the planning task plus 33 N0-N6 execution tasks; Scope: backlog instantiation and dependency graph presence. Command: sed -n '1,160p' .agentplane/tasks/202603311331-WTQE65/README.md && sed -n '1,160p' .agentplane/tasks/202603311332-ACCPE4/README.md; Result: pass; Evidence: representative early and late wave tasks contain concrete Plan and Verify Steps sections instead of placeholders; Scope: task README contract quality across the new graph. Command: review REFACTOR.md against created titles and dependencies; Result: pass; Evidence: every pending N0-N6 item was instantiated exactly once with explicit depends_on links reflecting the intended rollout order; Scope: graph completeness and ordering."
  -
    type: "status"
    at: "2026-03-31T13:35:15.941Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311328-8CPSMX/pr."
doc_version: 3
doc_updated_at: "2026-03-31T13:35:15.943Z"
doc_updated_by: "INTEGRATOR"
description: "Planning task: expand the N0-N6 backlog from REFACTOR.md into executable agentplane tasks with explicit dependencies, current acceptance contracts, and start the first critical-path implementation task under the updated optimization-first directive."
sections:
  Summary: |-
    Instantiate the new REFACTOR wave as executable tasks and start the critical path
    
    Planning task: expand the N0-N6 backlog from REFACTOR.md into executable agentplane tasks with explicit dependencies, current acceptance contracts, and start the first critical-path implementation task under the updated optimization-first directive.
  Scope: |-
    - In scope: Planning task: expand the N0-N6 backlog from REFACTOR.md into executable agentplane tasks with explicit dependencies, current acceptance contracts, and start the first critical-path implementation task under the updated optimization-first directive.
    - Out of scope: unrelated refactors not required for "Instantiate the new REFACTOR wave as executable tasks and start the critical path".
  Plan: "1. Convert every pending N0-N6 item from REFACTOR.md into one executable agentplane task with explicit owner, dependencies, and scope aligned to the current optimization-first directive. 2. Populate each created task with a concrete plan and verification contract, then integrate the task graph back to main through the branch_pr route. 3. Start the first critical-path coding task from the new graph so execution begins immediately after backlog instantiation."
  Verify Steps: |-
    1. Compare the executable task graph in `.agentplane/tasks/` against `REFACTOR.md`. Expected: every pending N0-N6 item has exactly one corresponding executable task with sensible dependencies.
    2. Inspect the created task READMEs. Expected: each new task has a concrete Plan section and non-placeholder Verify Steps aligned to its scope.
    3. Review the resulting open backlog ordering. Expected: the graph exposes the intended rollout shape from safety-net work through seam extraction, decomposition, and final testkit cleanup.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T13:34:00.398Z — VERIFY — ok
    
    By: PLANNER
    
    Note: Command: agentplane task list | rg '\[(TODO|DOING|BLOCKED)\]'; Result: pass; Evidence: 34 open tasks visible, including the planning task plus 33 N0-N6 execution tasks; Scope: backlog instantiation and dependency graph presence. Command: sed -n '1,160p' .agentplane/tasks/202603311331-WTQE65/README.md && sed -n '1,160p' .agentplane/tasks/202603311332-ACCPE4/README.md; Result: pass; Evidence: representative early and late wave tasks contain concrete Plan and Verify Steps sections instead of placeholders; Scope: task README contract quality across the new graph. Command: review REFACTOR.md against created titles and dependencies; Result: pass; Evidence: every pending N0-N6 item was instantiated exactly once with explicit depends_on links reflecting the intended rollout order; Scope: graph completeness and ordering.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T13:33:35.798Z, excerpt_hash=sha256:8051ef15d9c093a7eca852e87a9fb7822c4740f13e372e8c0451ecf8068357dd
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Instantiate the new REFACTOR wave as executable tasks and start the critical path

Planning task: expand the N0-N6 backlog from REFACTOR.md into executable agentplane tasks with explicit dependencies, current acceptance contracts, and start the first critical-path implementation task under the updated optimization-first directive.

## Scope

- In scope: Planning task: expand the N0-N6 backlog from REFACTOR.md into executable agentplane tasks with explicit dependencies, current acceptance contracts, and start the first critical-path implementation task under the updated optimization-first directive.
- Out of scope: unrelated refactors not required for "Instantiate the new REFACTOR wave as executable tasks and start the critical path".

## Plan

1. Convert every pending N0-N6 item from REFACTOR.md into one executable agentplane task with explicit owner, dependencies, and scope aligned to the current optimization-first directive. 2. Populate each created task with a concrete plan and verification contract, then integrate the task graph back to main through the branch_pr route. 3. Start the first critical-path coding task from the new graph so execution begins immediately after backlog instantiation.

## Verify Steps

1. Compare the executable task graph in `.agentplane/tasks/` against `REFACTOR.md`. Expected: every pending N0-N6 item has exactly one corresponding executable task with sensible dependencies.
2. Inspect the created task READMEs. Expected: each new task has a concrete Plan section and non-placeholder Verify Steps aligned to its scope.
3. Review the resulting open backlog ordering. Expected: the graph exposes the intended rollout shape from safety-net work through seam extraction, decomposition, and final testkit cleanup.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T13:34:00.398Z — VERIFY — ok

By: PLANNER

Note: Command: agentplane task list | rg '\[(TODO|DOING|BLOCKED)\]'; Result: pass; Evidence: 34 open tasks visible, including the planning task plus 33 N0-N6 execution tasks; Scope: backlog instantiation and dependency graph presence. Command: sed -n '1,160p' .agentplane/tasks/202603311331-WTQE65/README.md && sed -n '1,160p' .agentplane/tasks/202603311332-ACCPE4/README.md; Result: pass; Evidence: representative early and late wave tasks contain concrete Plan and Verify Steps sections instead of placeholders; Scope: task README contract quality across the new graph. Command: review REFACTOR.md against created titles and dependencies; Result: pass; Evidence: every pending N0-N6 item was instantiated exactly once with explicit depends_on links reflecting the intended rollout order; Scope: graph completeness and ordering.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T13:33:35.798Z, excerpt_hash=sha256:8051ef15d9c093a7eca852e87a9fb7822c4740f13e372e8c0451ecf8068357dd

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
