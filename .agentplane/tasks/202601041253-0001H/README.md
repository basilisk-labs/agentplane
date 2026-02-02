---
id: "202601041253-0001H"
title: "Add tasks.html UI for browsing tasks.json"
status: "DONE"
priority: "normal"
owner: "DOCS"
depends_on: []
tags: ["ui", "tasks", "workflow"]
verify: []
commit: { hash: "5cc30b601bb86f224a984851dae8137374db7ded", message: "Legacy completion (backfill)" }
comments:
  - { author: "docs", body: "Added tasks.html as a local-first viewer for tasks.json (auto-load over HTTP, plus file picker/drag-drop when opened via file://)." }
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Add a standalone HTML interface to view and filter tasks.json (search, status/owner/priority/tag filters, sorting, and file:// fallback via file picker)."
dirty: false
---
