---
id: "202601200656-BZKZ6Z"
title: "Simplify core; move extensions to recipes"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["recipes", "workflow"]
commit: { hash: "7fef79d699df3ff52ab0cd6053234aca0deea2b7", message: "✅ TA55C1 verified: remaining AP roadmap tasks are DONE | details: closing the roadmap execution tracker." }
comments:
  - { author: "ORCHESTRATOR", body: "Subtasks: 202601200656-J6NW39 (core minimum + permissions), 202601200657-E52CV8 (migration plan), 202601200657-W1Y6ND (phase 1), 202601200657-VNFXH3 (phase 2), 202601200657-Y0P8RY (phase 3 cleanup)." }
  - { author: "ORCHESTRATOR", body: "Start: audit core vs recipes and plan simplification moves." }
  - { author: "ORCHESTRATOR", body: "verified: core minimum and migration plan tasks are complete | details: phase execution is tracked separately." }
doc_version: 2
doc_updated_at: "2026-01-30T12:01:46+00:00"
doc_updated_by: "agentctl"
description: "Define the minimal core agent/task workflow, allow recipe tool/agentctl usage with guardrails, and plan the migration of extension features into recipes."
---
## Summary

- Defined core-vs-recipes boundaries and enforced core minimum in docs and agents.\n- Scoped migration into phases with separate tasks for execution and cleanup.

## Scope

- Establish the minimal core workflow and permissions.\n- Plan migration of extension features into recipes and split execution into phased tasks.

## Risks

- Subsequent phase tasks could diverge from the planned core boundary if not kept in sync.\n- If recipes change, core/recipe separation guidance may need refresh.

## Verify Steps

- python .agent-plane/agentctl.py task show 202601200656-J6NW39\n- python .agent-plane/agentctl.py task show 202601200657-E52CV8\n- python .agent-plane/agentctl.py task show 202601200657-W1Y6ND

## Rollback Plan

- Reopen this task if core boundaries or migration scope change.\n- Update the phase tasks to reflect the corrected plan.

