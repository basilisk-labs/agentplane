---
id: "202601041253-0002D"
title: "agentctl: cleanup merged task branches/worktrees"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: ["202601041253-0002A"]
tags: ["agentctl", "workflow", "cleanup"]
verify: ["python -m compileall scripts/agentctl.py", "python scripts/agentctl.py task lint"]
commit: { hash: "cedb50251e77482aecf066e0fe5e2baa2c3d4078", message: "Legacy completion (backfill)" }
comments:
  - { author: "INTEGRATOR", body: "Verified: Integrated via squash; verify=ran; pr=docs/workflow/T-077/pr." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:26.696Z"
doc_updated_by: "agentplane"
description: "Add a safe cleanup command to remove stale task branches and worktrees after tasks are DONE.\\n\\nAcceptance:\\n- `python scripts/agentctl.py cleanup merged` prints a dry-run list of candidate `task/*` branches and `.agent-plane/worktrees/*` paths.\\n- Requires explicit confirmation flag (e.g., `--yes`) to delete.\\n- Deletes only when:\\n  - task is `DONE` in `tasks.json`, AND\\n  - `git diff --name-only main...<branch>` is empty.\\n- Uses existing `python scripts/agentctl.py branch remove ...` implementation.\\n- Never writes `tasks.json`."
dirty: false
---
## Summary


## Scope


## Risks


## Verify Steps


## Rollback Plan
