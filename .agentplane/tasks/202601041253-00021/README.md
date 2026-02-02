---
id: "202601041253-00021"
title: "Move architecture.md content into README"
status: "DONE"
priority: "normal"
owner: "DOCS"
depends_on: []
tags: ["docs", "refactor"]
verify: ["python scripts/agentctl.py task lint"]
commit: { hash: "6b22130b391becfada866dfc8136dbe1decff850", message: "Legacy completion (backfill)" }
comments:
  - { author: "REVIEWER", body: "Verified: Ran python scripts/agentctl.py verify T-065 (task lint) and reviewed README/architecture pointer consistency." }
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Move the full contents of docs/architecture.md into README.md for easier discovery; leave docs/architecture.md as a thin pointer to avoid duplication."
dirty: false
---
