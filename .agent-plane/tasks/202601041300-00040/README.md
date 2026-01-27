---
id: "202601041300-00040"
title: "tasks.html kanban viewer with local server"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["ui", "tasks"]
verify: null
commit: { hash: "8ebac65cf3df403807155f58e430ba30e925692b", message: "Legacy completion (backfill)" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Build a local Python server module that serves tasks.html as a kanban board loaded from .agent-plane/tasks.json with drag-and-drop status updates via backend, filters/sort/search, and light/dark themes."
dirty: false
id_source: "custom"
---
# Summary

Build a local kanban viewer served by a single Python entrypoint, with drag-and-drop status updates backed by agentctl.

# Scope

- Move viewer assets into `.agent-plane/viewer/`.
- Serve the viewer and `/api/tasks` from `.agent-plane/viewer/tasks_server.py`.
- Support filters, sorting, search by title, and light/dark themes.
- Provide a Makefile flow for running and building a pywebview app.

# Risks

- pyinstaller packaging needs bundled viewer assets to render correctly.
- Drag-and-drop requires HTTP mode; file mode will be read-only.

# Verify Steps

- `./viewer.sh`
- Open `http://127.0.0.1:5179` and drag a card between columns.
- `make viewer-app` (after installing pywebview) to confirm app launch.

# Rollback Plan

- Revert the commit for this task.
