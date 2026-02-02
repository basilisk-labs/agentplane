---
id: "202601041253-0001J"
title: "Adopt agentctl-based agent workflow"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["agentctl", "agents", "workflow"]
verify: []
commit: { hash: "13721c623fd186abbaee48456aa242f7e4561119", message: "Legacy completion (backfill)" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Update AGENTS.md + .AGENTS/*.json to use scripts/agentctl.py for task operations (no manual tasks.json edits), add the new CLI to the repo, and make tasks.json pass agentctl task lint (meta+checksum, DONE tasks have commit metadata)."
dirty: false
id_source: "custom"
---
