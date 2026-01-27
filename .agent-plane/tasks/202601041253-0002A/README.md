---
id: "202601041253-0002A"
title: "Unify workflow artifact layout (single per-task folder)"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["workflow", "tasks"]
verify: null
commit: { hash: "77a7ec17750368061351c416f1aebafadf2903aa", message: "Legacy completion (backfill)" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Eliminate duplication between docs/workflow/T-###.md and docs/workflow/prs/T-###/description.md by moving to a single per-task folder layout under docs/workflow/T-###/. New canonical doc: docs/workflow/T-###/README.md. PR artifacts live at docs/workflow/T-###/pr/{meta.json,diffstat.txt,verify.log,review.md}. Update agentctl commands (task scaffold/add, pr open/update/check/note, verify --log, integrate meta sync) to use the new layout, while keeping backward compatibility for the old paths. Migrate existing tracked artifacts (T-055..T-073 and docs/workflow/prs/T-067..T-073) to the new layout and update all docs/agent texts that reference the old pipeline."
dirty: false
id_source: "custom"
---
