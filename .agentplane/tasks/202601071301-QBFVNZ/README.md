---
id: "202601071301-QBFVNZ"
title: "Role-specific guardrails for commit and handoff"
status: "DONE"
priority: "normal"
owner: "PLANNER"
depends_on: []
tags: ["agents", "docs"]
verify: []
commit: { hash: "e55fa3aa761e778f65518407a0ac13d4fa5a32c7", message: "🧷 QBFVNZ tighten role guardrails: require agentctl commit wrapper for CODER/TESTER/DOCS; add integrator checklist; add orchestrator UPDATER trigger" }
comments:
  - { author: "ORCHESTRATOR", body: "Verified: not run; doc/instruction edits only, no runtime impact." }
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Tighten CODER/TESTER/DOCS rules to always commit via agentctl guard/commit and standardize handoff via pr note; simplify INTEGRATOR to a short checklist; add ORCHESTRATOR reminder to invoke UPDATER for agent-optimization requests."
---
## Summary

- Required CODER/TESTER/DOCS to use agentctl commit wrappers.
- Simplified INTEGRATOR workflow to a short checklist.
- Added ORCHESTRATOR trigger to invoke UPDATER on explicit optimization requests.

## Goal

- Tighten role-specific guardrails around commits and handoffs.

## Scope

- @.agent-plane/agents/CODER.json
- @.agent-plane/agents/TESTER.json
- @.agent-plane/agents/DOCS.json
- @.agent-plane/agents/INTEGRATOR.json
- @.agent-plane/agents/ORCHESTRATOR.json

## Risks

- Low: checklist wording may need adjustment if agentctl commands change.

## Verify Steps

- None (doc/instruction changes only).

## Rollback Plan

- Revert commit `e55fa3aa761e`.
