---
id: "202601041253-0001Z"
title: "Redesign tasks.html (Agent Plane) + dependency visualization"
status: "DONE"
priority: "normal"
owner: "CODER"
tags: ["ui", "tasks", "deps"]
verify: ["python scripts/agentctl.py task lint"]
commit: { hash: "5e6efe85aa351635d1592525f06ad824f14b3d2c", message: "Legacy completion (backfill)" }
comments:
  - { author: "REVIEWER", body: "Verified: python scripts/agentctl.py task lint; manual check of tasks.html dependency inspector (lists + SVG graph + navigation)" }
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Refresh @tasks.html to be simpler/lighter and clearly show task dependencies.\\n\\nScope:\\n- Update UI styling to a minimal, airy Agent Plane-branded layout.\\n- Add a dependency inspector that makes it easy to see \\\"depends_on\\\" and reverse dependencies (tasks that depend on the selected task).\\n- Include a small visual graph (SVG) for the selected task to make upstream/downstream relationships obvious.\\n\\nAcceptance criteria:\\n- @tasks.html header is branded as Agent Plane.\\n- Dependencies are visible both as lists and as a small graph for the selected task.\\n- Clicking a dependency navigates/updates the selection.\\n- No server required: keep file picker + drag/drop fallback for file://.\\n"
dirty: false
---
