---
id: "202601041253-00023"
title: "Align agentctl with branch_pr spec (worktrees, PR checks, integrate)"
status: "DONE"
priority: "normal"
owner: "PLANNER"
depends_on: []
tags: ["agentctl", "workflow", "git"]
verify: ["python scripts/agentctl.py task lint", "python -m compileall scripts/agentctl.py"]
commit: { hash: "91b3760239846f01443b8550c9402dcc99c12c74", message: "Legacy completion (backfill)" }
comments:
  - { author: "CODER", body: "Implemented branch_pr enforcement + new commands; please run `python -m compileall scripts/agentctl.py` and spot-check `integrate 202601041253-00001` output." }
  - { author: "INTEGRATOR", body: "Verified: merged commit 91b3760 on main; pr check and verify T-067 passed; handoff notes captured from PR review." }
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Implement the stricter branch_pr workflow spec: worktrees under .agent-plane/worktrees, branch naming task/T-###/<slug>, new branch status, stricter pr open/update/check, integrate dry-run + verify in branch worktree, workflow_mode config in .agent-plane/swarm.config.json, and stronger finish/guard/verify guardrails + standardized outputs."
dirty: false
---
