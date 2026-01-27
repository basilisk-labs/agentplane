---
id: "202601041253-0001P"
title: "Extend clean.sh to remove framework dev files"
status: "DONE"
priority: "normal"
owner: "CODER"
tags: ["cleanup", "workflow"]
verify: ["bash -n clean.sh", "python scripts/agentctl.py task lint"]
commit: { hash: "b1ff627216f332cc34652d0a2968c78e89c68d2d", message: "Legacy completion (backfill)" }
comments:
  - { author: "CODER", body: "Start: extend clean.sh to remove framework dev artifacts (including docs) while keeping cleanup idempotent and repo-root scoped." }
  - { author: "REVIEWER", body: "Verified: clean.sh now removes docs/ and other framework-development artifacts (tasks.html, .DS_Store) during cleanup; script syntax checks pass and tasks.json lints clean." }
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Update @clean.sh so cleanup removes framework-development artifacts (including @docs/) when preparing a reusable snapshot.\\\\n\\\\nAcceptance criteria:\\\\n- Running clean.sh removes @docs/ and other framework-specific files/directories it currently leaves behind.\\\\n- Script remains idempotent and safe (no unscoped rm outside repo root)."
dirty: false
---
