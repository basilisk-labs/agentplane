---
id: "202601041253-0002Q"
title: "Pin current git branch as base branch"
status: "DONE"
priority: "normal"
owner: "human"
depends_on: []
tags: ["workflow", "git", "branching"]
verify: []
commit: { hash: "4f93b993ecca14b9a7d9a464711cc9a75d5d5a2d", message: "Legacy completion (backfill)" }
comments:
  - { author: "INTEGRATOR", body: "Verified: Base branch now pins to local git config (agentplane.baseBranch); integrate/guard/cleanup use it; no-op integrates fail fast." }
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "When running Agent Plane in an existing git repo that is already on a branch, pin that branch into .agent-plane/swarm.config.json (base_branch) and use it as the base for creating task branches/worktrees and for integration; avoid touching main when base_branch is not main."
dirty: false
---
