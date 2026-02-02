---
id: "202601041253-0001N"
title: "Require DOCS workflow artifact before finishing tasks"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["docs", "workflow", "tasks"]
verify: []
commit: { hash: "13721c623fd186abbaee48456aa242f7e4561119", message: "Legacy completion (backfill)" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Change DOCS agent behavior so it runs before finishing any task and produces an atomic documentation artifact under @docs/workflow (e.g., @docs/workflow/T-025.md) describing what was implemented. Update orchestration guidance so plans include DOCS before REVIEWER marks tasks DONE.\\\\n\\\\nAcceptance criteria:\\\\n- @docs/workflow directory exists and is committed (with a short README describing artifact convention).\\\\n- @.AGENTS/DOCS.json instructs producing @docs/workflow/T-###.md artifacts (English, atomic, task-scoped).\\\\n- @AGENTS.md ORCHESTRATOR guidance schedules DOCS before finishing any task (DOCS before REVIEWER finish).\\\\n\\\\nNotes:\\\\n- Artifacts must be task-ID named, contain summary + changed files + verification commands (when available)."
dirty: false
id_source: "custom"
---
