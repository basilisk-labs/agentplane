---
id: "202601041253-00022"
title: "Branch workflow: task branches + worktrees + local PR artifacts"
status: "DONE"
priority: "normal"
owner: "ORCHESTRATOR"
tags: ["workflow", "git", "agentctl"]
verify: ["python scripts/agentctl.py task lint", "python -m compileall scripts/agentctl.py"]
commit: { hash: "9fd7273c23ae3490637588e158ff485627d93e4a", message: "Legacy completion (backfill)" }
comments:
  - { author: "INTEGRATOR", body: "Verified: Ran python scripts/agentctl.py task lint; python -m compileall scripts/agentctl.py; checked agentctl branch/pr/integrate help output." }
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Introduce a branching workflow to enable parallel agent work without tasks.json conflicts: task branch per T-###, required git worktree under .agent-plane/worktrees, PR-like artifacts under docs/workflow/prs, and an INTEGRATOR role responsible for merge + finish on main."
dirty: false
---
