---
id: "202601041253-00036"
title: "Harden agentctl depends_on parsing"
status: "DONE"
priority: "normal"
owner: "DOCS"
depends_on: []
tags: ["agentctl", "tasks"]
verify: []
commit: { hash: "0b222dfbd26ac511935b4a3026686a4685280d4f", message: "Legacy completion (backfill)" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Ignore literal '[]' and empty strings in --depends-on to avoid invalid dependencies in tasks.json, and update docs to prevent misuse."
dirty: false
---
