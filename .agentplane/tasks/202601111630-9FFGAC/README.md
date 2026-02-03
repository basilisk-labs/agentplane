---
id: "202601111630-9FFGAC"
title: "Route git commands via agentctl using comment-derived commits"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["workflow", "agentctl", "git"]
verify: []
commit: { hash: "7d1a7ea8188819b501f932d6cbb0db32a5c04fbb", message: "🚧 9FFGAC Start: Implement comment-driven agentctl commits; forbid direct git in agents/docs; document new flags." }
comments:
  - { author: "CODER", body: "Start: Implement comment-driven agentctl commits; forbid direct git in agents/docs; document new flags." }
  - { author: "CODER", body: "Verified: Ran python -m py_compile .agent-plane/agentctl.py; python .agent-plane/agentctl.py task lint." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:40.254Z"
doc_updated_by: "agentplane"
description: "Agents must stop using git directly; agentctl should stage/commit using their task comments as commit messages while agents only update task status."
---
## Summary

Route git staging/commits through agentctl so agents only change task status and agentctl builds <emoji> <task-suffix> <comment> subjects from their comments.


## Context

User requested removing direct git usage by agents; commits must be issued by agentctl using agent comments while keeping the <emoji> <suffix> extended comment format.


## Scope

Add comment-derived staging/commit helpers in agentctl for start/block/set-status/finish, document the flow in AGENTS.md + agentctl.md, and update CODER/TESTER/CREATOR agent specs to ban direct git usage.


## Risks

Auto-allow staging can capture unintended files if the working tree is dirty; finish comment commits are restricted to one task; start/block now export tasks snapshots before committing (extra output).


## Verify Steps

python -m py_compile .agent-plane/agentctl.py\npython .agent-plane/agentctl.py task lint


## Rollback Plan

Restore .agent-plane/agentctl.py, AGENTS.md, and the updated agent JSON files to the previous revision, re-export tasks via agentctl, and rerun task lint.


## Notes

Comment-driven commit flags auto-derive allowlists when 202601041253-00001 are provided; start/block/set-status default to staging tasks changes, and finish enables the status commit automatically when --commit-from-comment is used.
