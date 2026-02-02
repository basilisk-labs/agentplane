---
id: "202601041253-0001Q"
title: "Reduce per-task commits to 3-phase workflow"
status: "DONE"
priority: "normal"
owner: "CREATOR"
depends_on: []
tags: ["workflow", "git", "agents"]
verify: ["python scripts/agentctl.py task lint", "python scripts/agentctl.py agents"]
commit: { hash: "20b580ff017d997987112ec3bd46597cd7efe8db", message: "Legacy completion (backfill)" }
comments:
  - { author: "CREATOR", body: "Start: align agent prompts and commit workflow to a default 3-phase commit cadence (plan/docs, implementation, verification/finish) and avoid extra start/status commits." }
  - { author: "REVIEWER", body: "Verified: agent workflows now target a minimal 3-phase commit cadence (plan+artifact, implementation, verification/closure) and avoid extra status-only commits; agent registry and tasks lint pass." }
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Update agent workflows so they avoid extra commits beyond what is necessary. Target a default 3-commit cadence per task:\\\\n1) Planning: add the task + create initial workflow artifact @docs/workflow/T-###.md (skeleton/spec).\\\\n2) Implementation: implement the change set (preferably including tests) in a single work commit.\\\\n3) Verification/closure: run tests + review, update the workflow artifact with what was implemented, and mark the task DONE (tasks.json) in one final commit.\\\\n\\\\nAcceptance criteria:\\\\n- @AGENTS.md COMMIT_WORKFLOW reflects the 3-commit default and explicitly discourages extra 'start/status' commits.\\\\n- Agent prompts (.AGENTS/*.json) align: TESTER does not commit by default; DOCS artifacts are committed as part of planning/closure; REVIEWER closes tasks with a single final commit; CODER bundles implementation+tests into one work commit where practical.\\\\n- Existing guardrails (agentctl) remain usable (finish may reference the implementation commit hash)."
dirty: false
---
