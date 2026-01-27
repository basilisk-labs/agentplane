---
id: "202601271027-D5D5MB"
title: "AP-010: Task doc set + metadata enforcement"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on: ["202601271008-63G26Q"]
tags: ["nodejs", "roadmap", "tasks"]
verify: ["bun run ci"]
doc_version: 2
doc_updated_at: "2026-01-27T10:27:10+00:00"
doc_updated_by: "agentctl"
description: "Implement task doc metadata (doc_version/doc_updated_at/doc_updated_by), add \"agentplane task doc set\" that updates metadata automatically, and add lint/guard check to prevent README edits without metadata bump."
---
