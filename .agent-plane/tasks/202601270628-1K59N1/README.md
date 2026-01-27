---
id: "202601270628-1K59N1"
title: "AgentPlane Node.js migration roadmap"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["nodejs"]
commit: { hash: "24b66f5d8c85bbeb344970da45c41d3ad760c33a", message: "✨ 1K59N1 roadmap: Node.js port plan" }
doc_version: 2
doc_updated_at: "2026-01-27T06:29:03+00:00"
doc_updated_by: "agentctl"
description: "Create a root ROADMAP.md that breaks down the work needed to port the current Python Agent Plane framework (agentctl/backends/recipes/viewer) into a Node.js + TypeScript + ESM CLI published to npm as agentplane, per v1 decisions (offline init, explicit upgrade, .agentplane)."
---
## Summary

Create ROADMAP.md (repo root) describing the full work breakdown to port the current Python Agent Plane framework into a Node.js + TypeScript CLI published to npm as agentplane.

## Scope

- Add a detailed roadmap in ROADMAP.md covering: init, task lifecycle, guard/commit/hooks, branch/pr/integrate/finish, backends (local + redmine), recipes toolchain, viewer, upgrade, CI/release.\n- Capture v1 constraints: Node 20+, TS+ESM, offline init, explicit upgrade, .agentplane (breaking change).\n- No implementation of the Node port in this task.

## Risks

- The roadmap may diverge from final product decisions (e.g., command naming for sync, viewer distribution).\n- Misreading current Python behavior could cause parity gaps; mitigate by treating agentctl/backends as the source of truth and validating with golden fixtures during implementation.

## Verify Steps

- Read ROADMAP.md and confirm it reflects v1 decisions and covers the full CLI surface (init/task/branch/pr/integrate/finish/guard/hooks/verify/upgrade/sync + recipes + viewer).\n- Run: python .agent-plane/agentctl.py task show 202601270628-1K59N1 (ensures task record and doc sections are present).

## Rollback Plan

- git revert <commit-hash> (reverts ROADMAP.md + task artifacts).\n- If tasks export becomes inconsistent, re-run: python .agent-plane/agentctl.py task export --format json --out .agent-plane/tasks.json

