---
id: "202601041253-0002B"
title: "agentctl: add work start (branch+pr+scaffold)"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: ["202601041253-0002A"]
tags: ["agentctl", "workflow", "ergonomics"]
verify: ["python -m compileall scripts/agentctl.py", "python scripts/agentctl.py task lint"]
commit: { hash: "2a76efc28ea31c69c13e9c13e2494036db931d6c", message: "Legacy completion (backfill)" }
comments:
  - { author: "INTEGRATOR", body: "Verified: Squash-merged task/T-075/work-start; verify will be recorded via agentctl verify log in this closure; PR artifacts + README updated." }
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Add a single command to reduce startup friction for a task branch in workflow_mode=branch_pr.\\n\\nAcceptance:\\n- New command: `python scripts/agentctl.py work start T-123 --agent CODER --slug x --worktree`.\\n- Performs the equivalent of:\\n  - `python scripts/agentctl.py branch create T-123 --agent CODER --slug x --worktree`\\n  - `python scripts/agentctl.py pr open T-123 --author CODER --branch task/T-123/x`\\n  - `python scripts/agentctl.py task scaffold T-123` (writes `docs/workflow/T-123/README.md`)\\n- Creates PR artifacts at `docs/workflow/T-123/pr/` (meta/diffstat/verify.log/review.md).\\n- Idempotent with `--reuse`; does not clobber existing artifacts unless `--overwrite` is passed through to scaffold.\\n- Prints clear NEXT steps.\\n- Never writes `tasks.json`.\\n- Update `.agent-plane/agentctl.md` to document the new command."
dirty: false
---
