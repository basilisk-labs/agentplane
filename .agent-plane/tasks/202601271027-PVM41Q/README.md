---
id: "202601271027-PVM41Q"
title: "AP-012: task lint invariants"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on: ["202601271027-A6D5EF"]
tags: ["nodejs", "roadmap", "tasks", "lint"]
verify: ["bun run ci"]
doc_version: 2
doc_updated_at: "2026-01-27T10:27:47+00:00"
doc_updated_by: "agentctl"
description: "Implement task lint checks beyond schema: DONE must have commit hash+message, verify required for certain tags, owner exists, deps cycles, checksum matches export."
---
